import { IdfDocument, writeIdf } from '@idfkit/core';

export const ZONE_NAME = 'A01_DOME_VOLUME';
const ALWAYS_ON = 'A01_AlwaysOn';
const CONTROL_TYPE = 'A01_Control_Type';
const HEATING_SETPOINT = 'A01_Heating_Setpoint';
const COOLING_SETPOINT = 'A01_Cooling_Setpoint';
const THERMOSTAT = 'A01_Thermostat';
const IDEAL_LOADS = 'A01_Ideal_Loads';
const EQUIPMENT_LIST = 'A01_Zone_Equipment';

const number = (value, label, { min = -Infinity, max = Infinity, exclusiveMin = false } = {}) => {
  const n = Number(value);
  if (!Number.isFinite(n) || (exclusiveMin ? n <= min : n < min) || n > max) {
    throw new Error(\`\${label} is outside the allowed range.\`);
  }
  return n;
};

const vertexGroups = (vertices) => vertices.map(([x, y, z]) => ({
  vertex_x_coordinate: x,
  vertex_y_coordinate: y,
  vertex_z_coordinate: z
}));

const outwardNormalZ = (triangle) => {
  const [a, b, c] = triangle;
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  const nz = ux * vy - uy * vx;
  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const length = Math.hypot(nx, ny, nz) || 1;
  return nz / length;
};

export function parseEpwLocation(epwText) {
  if (typeof epwText !== 'string' || !epwText.trim()) {
    throw new Error('The EPW weather file is empty.');
  }
  const firstLine = epwText.split(/\r?\n/, 1)[0];
  const fields = firstLine.split(',');
  if (fields[0]?.trim().toUpperCase() !== 'LOCATION' || fields.length < 10) {
    throw new Error('The selected file does not have a valid EPW LOCATION header.');
  }
  const [city, state, country, source, station, latitudeRaw, longitudeRaw, timeZoneRaw, elevationRaw] =
    fields.slice(1, 10).map((part) => part.trim());
  const latitude = number(latitudeRaw, 'EPW latitude', { min: -90, max: 90 });
  const longitude = number(longitudeRaw, 'EPW longitude', { min: -180, max: 180 });
  const timeZone = number(timeZoneRaw, 'EPW time zone', { min: -14, max: 14 });
  const elevation = number(elevationRaw, 'EPW elevation', { min: -500, max: 9000 });
  return { city, state, country, source, station, latitude, longitude, timeZone, elevation };
}

export function buildEnergyPlusModel({ schema, geometry, settings, epwText }) {
  if (!schema) throw new Error('EnergyPlus schema bundle is not ready.');
  if (!geometry?.calibrated || geometry.coordinateUnits !== 'm') {
    throw new Error('Set a real support-ring diameter in metres before generating the EnergyPlus model.');
  }
  if (!Array.isArray(geometry.shellTriangles) || !geometry.shellTriangles.length || !geometry.floorVertices?.length) {
    throw new Error('The A-01 dome mesh is empty.');
  }

  const uValue = number(settings.shellU, 'Dome shell U-value', { min: 0, max: 20, exclusiveMin: true });
  const absorptance = number(settings.solarAbsorptance, 'Solar absorptance', { min: 0, max: 1 });
  const heatSetpoint = number(settings.heatingSetpoint, 'Heating setpoint', { min: 5, max: 30 });
  const coolSetpoint = number(settings.coolingSetpoint, 'Cooling setpoint', { min: 16, max: 40 });
  if (coolSetpoint <= heatSetpoint) {
    throw new Error('The cooling setpoint must be higher than the heating setpoint.');
  }
  const infiltrationAch = number(settings.infiltrationAch ?? 0, 'Infiltration ACH', { min: 0, max: 20 });
  const ventilationAch = number(settings.ventilationAch ?? 0, 'Ventilation ACH', { min: 0, max: 30 });
  const site = parseEpwLocation(epwText);

  const doc = new IdfDocument(schema);
  doc.add('Version', null, { version_identifier: '26.1' });
  doc.add('Timestep', null, { number_of_timesteps_per_hour: 4 });
  doc.add('Building', 'A-01 Sphere of Eva', {
    north_axis: 0,
    terrain: 'Suburbs',
    loads_convergence_tolerance_value: 0.04,
    temperature_convergence_tolerance_value: 0.004,
    solar_distribution: 'FullExterior',
    maximum_number_of_warmup_days: 30,
    minimum_number_of_warmup_days: 6
  });
  doc.add('GlobalGeometryRules', null, {
    starting_vertex_position: 'UpperLeftCorner',
    vertex_entry_direction: 'CounterClockWise',
    coordinate_system: 'World'
  });
  doc.add('HeatBalanceAlgorithm', null, { algorithm: 'ConductionTransferFunction' });
  doc.add('SurfaceConvectionAlgorithm:Inside', null, { algorithm: 'TARP' });
  doc.add('SurfaceConvectionAlgorithm:Outside', null, { algorithm: 'DOE-2' });
  doc.add('ShadowCalculation', null, {
    shading_calculation_update_frequency_method: 'Periodic',
    shading_calculation_update_frequency: 20,
    sky_diffuse_modeling_algorithm: 'SimpleSkyDiffuseModeling'
  });
  doc.add('SimulationControl', null, {
    do_zone_sizing_calculation: 'No',
    do_system_sizing_calculation: 'No',
    do_plant_sizing_calculation: 'No',
    run_simulation_for_sizing_periods: 'No',
    run_simulation_for_weather_file_run_periods: 'Yes',
    do_hvac_sizing_simulation_for_sizing_periods: 'No',
    maximum_number_of_hvac_sizing_simulation_passes: 1
  });
  doc.add('RunPeriod', 'A01 EPW Annual Period', {
    begin_month: 1,
    begin_day_of_month: 1,
    end_month: 12,
    end_day_of_month: 31,
    use_weather_file_holidays_and_special_days: 'Yes',
    use_weather_file_daylight_saving_period: 'Yes',
    apply_weekend_holiday_rule: 'No',
    use_weather_file_rain_indicators: 'Yes',
    use_weather_file_snow_indicators: 'Yes'
  });
  doc.add('Site:Location', site.city || 'EPW Site', {
    latitude: site.latitude,
    longitude: site.longitude,
    time_zone: site.timeZone,
    elevation: site.elevation
  });

  doc.add('ScheduleTypeLimits', 'A01 On Off', {
    lower_limit_value: 0,
    upper_limit_value: 1,
    numeric_type: 'DISCRETE'
  });
  doc.add('ScheduleTypeLimits', 'A01 Temperature', {
    lower_limit_value: -60,
    upper_limit_value: 200,
    numeric_type: 'CONTINUOUS'
  });
  doc.add('ScheduleTypeLimits', 'A01 Control Type Limits', {
    lower_limit_value: 0,
    upper_limit_value: 4,
    numeric_type: 'DISCRETE'
  });
  doc.add('Schedule:Constant', ALWAYS_ON, {
    schedule_type_limits_name: 'A01 On Off',
    hourly_value: 1
  });
  doc.add('Schedule:Constant', CONTROL_TYPE, {
    schedule_type_limits_name: 'A01 Control Type Limits',
    hourly_value: 4
  });
  doc.add('Schedule:Constant', HEATING_SETPOINT, {
    schedule_type_limits_name: 'A01 Temperature',
    hourly_value: heatSetpoint
  });
  doc.add('Schedule:Constant', COOLING_SETPOINT, {
    schedule_type_limits_name: 'A01 Temperature',
    hourly_value: coolSetpoint
  });

  doc.add('Material:NoMass', 'A01 Dome Opaque Layer', {
    roughness: 'MediumRough',
    thermal_resistance: 1 / uValue,
    thermal_absorptance: 0.9,
    solar_absorptance: absorptance,
    visible_absorptance: 0.6
  });
  doc.add('Construction', 'A01 Dome Shell Construction', {
    outside_layer: 'A01 Dome Opaque Layer'
  });
  doc.add('Material:NoMass', 'A01 Adiabatic Base Layer', {
    roughness: 'MediumRough',
    thermal_resistance: 1,
    thermal_absorptance: 0.9,
    solar_absorptance: 0.6,
    visible_absorptance: 0.6
  });
  doc.add('Construction', 'A01 Adiabatic Base Construction', {
    outside_layer: 'A01 Adiabatic Base Layer'
  });

  doc.add('Zone', ZONE_NAME, {
    direction_of_relative_north: 0,
    x_origin: 0,
    y_origin: 0,
    z_origin: 0,
    type: 1,
    multiplier: 1,
    ceiling_height: 'Autocalculate',
    volume: 'Autocalculate'
  });

  const floor = doc.add('BuildingSurface:Detailed', 'A01_DOME_BASE', {
    surface_type: 'Floor',
    construction_name: 'A01 Adiabatic Base Construction',
    zone_name: ZONE_NAME,
    outside_boundary_condition: 'Adiabatic',
    sun_exposure: 'NoSun',
    wind_exposure: 'NoWind',
    view_factor_to_ground: 1,
    number_of_vertices: geometry.floorVertices.length
  });
  floor.set('vertices', vertexGroups(geometry.floorVertices));

  geometry.shellTriangles.forEach((triangle, index) => {
    const isRoof = outwardNormalZ(triangle) > 0.25;
    const surface = doc.add('BuildingSurface:Detailed', \`A01_DOME_SHELL_\${String(index + 1).padStart(4, '0')}\`, {
      surface_type: isRoof ? 'Roof' : 'Wall',
      construction_name: 'A01 Dome Shell Construction',
      zone_name: ZONE_NAME,
      outside_boundary_condition: 'Outdoors',
      sun_exposure: 'SunExposed',
      wind_exposure: 'WindExposed',
      view_factor_to_ground: 0.5,
      number_of_vertices: 3
    });
    surface.set('vertices', vertexGroups(triangle));
  });

  doc.add('ThermostatSetpoint:DualSetpoint', 'A01 Dual Setpoints', {
    heating_setpoint_temperature_schedule_name: HEATING_SETPOINT,
    cooling_setpoint_temperature_schedule_name: COOLING_SETPOINT
  });
  doc.add('ZoneControl:Thermostat', THERMOSTAT, {
    zone_or_zonelist_name: ZONE_NAME,
    control_type_schedule_name: CONTROL_TYPE,
    control_1_object_type: 'ThermostatSetpoint:DualSetpoint',
    control_1_name: 'A01 Dual Setpoints'
  });

  const idealLoads = doc.add('ZoneHVAC:IdealLoadsAirSystem', IDEAL_LOADS, {
    availability_schedule_name: ALWAYS_ON,
    zone_supply_air_node_name: 'A01_DOME_SUPPLY_NODE',
    maximum_heating_supply_air_temperature: 40,
    minimum_cooling_supply_air_temperature: 13,
    heating_limit: 'NoLimit',
    cooling_limit: 'NoLimit',
    dehumidification_control_type: 'None',
    cooling_sensible_heat_ratio: 0.7,
    humidification_control_type: 'None'
  });
  void idealLoads;

  const equipment = doc.add('ZoneHVAC:EquipmentList', EQUIPMENT_LIST, {
    load_distribution_scheme: 'SequentialLoad'
  });
  equipment.set('equipment', [{
    zone_equipment_object_type: 'ZoneHVAC:IdealLoadsAirSystem',
    zone_equipment_name: IDEAL_LOADS,
    zone_equipment_cooling_sequence: 1,
    zone_equipment_heating_or_no_load_sequence: 1
  }]);
  doc.add('ZoneHVAC:EquipmentConnections', 'A01 Zone Connections', {
    zone_name: ZONE_NAME,
    zone_conditioning_equipment_list_name: EQUIPMENT_LIST,
    zone_air_inlet_node_or_nodelist_name: 'A01_DOME_SUPPLY_NODE',
    zone_air_node_name: 'A01_DOME_AIR_NODE',
    zone_return_air_node_or_nodelist_name: 'A01_DOME_RETURN_NODE'
  });

  if (infiltrationAch > 0) {
    doc.add('ZoneInfiltration:DesignFlowRate', 'A01 Infiltration Screening', {
      zone_or_zonelist_or_space_or_spacelist_name: ZONE_NAME,
      schedule_name: ALWAYS_ON,
      design_flow_rate_calculation_method: 'AirChanges/Hour',
      air_changes_per_hour: infiltrationAch,
      constant_term_coefficient: 1,
      temperature_term_coefficient: 0,
      velocity_term_coefficient: 0,
      velocity_squared_term_coefficient: 0
    });
  }
  if (ventilationAch > 0) {
    doc.add('ZoneVentilation:DesignFlowRate', 'A01 Outdoor Air Screening', {
      zone_or_zonelist_or_space_or_spacelist_name: ZONE_NAME,
      schedule_name: ALWAYS_ON,
      design_flow_rate_calculation_method: 'AirChanges/Hour',
      air_changes_per_hour: ventilationAch,
      ventilation_type: 'Natural',
      fan_pressure_rise: 0,
      fan_total_efficiency: 0.7,
      constant_term_coefficient: 1,
      temperature_term_coefficient: 0,
      velocity_term_coefficient: 0,
      velocity_squared_term_coefficient: 0
    });
  }

  doc.add('Output:Variable', null, {
    key_value: ZONE_NAME,
    variable_name: 'Zone Mean Air Temperature',
    reporting_frequency: 'Hourly'
  });
  doc.add('Output:Variable', null, {
    key_value: ZONE_NAME,
    variable_name: 'Zone Ideal Loads Supply Air Total Heating Energy',
    reporting_frequency: 'Hourly'
  });
  doc.add('Output:Variable', null, {
    key_value: ZONE_NAME,
    variable_name: 'Zone Ideal Loads Supply Air Total Cooling Energy',
    reporting_frequency: 'Hourly'
  });
  doc.add('Output:VariableDictionary', null, { key_field: 'IDF' });
  doc.add('Output:Table:SummaryReports', null).extensible.push({ report_name: 'AllSummary' });
  doc.add('OutputControl:Table:Style', null, { column_separator: 'All' });

  return {
    document: doc,
    idf: writeIdf(doc),
    site,
    objects: {
      zone: ZONE_NAME,
      shellSurfaces: geometry.shellTriangles.length,
      baseSurfaces: 1,
      idealLoads: true,
      infiltrationAch,
      ventilationAch
    }
  };
}
