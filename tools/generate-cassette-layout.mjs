#!/usr/bin/env node
/**
 * Rebuild the proposed A-01 cassette layout from geometry/a01-shell-parameters-v0.1.json.
 * Run from repository root: node tools/generate-cassette-layout.mjs
 * Outputs model-space geometry only; this is not structural design.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const p=JSON.parse(readFileSync(resolve(root,'geometry/a01-shell-parameters-v0.1.json'),'utf8'));
const e=p.ellipsoid,R=e.baseRadius*e.panelRadialFactor,a=R*e.scaleXZ,b=R*e.scaleY,t0=e.thetaStartRad,t1=Math.PI*e.thetaEndPiFactor,y0=e.centerY;
const dz=2*Math.PI/e.azimuthSectorCount,dp=dz/e.columnsPerSector,dt=(t1-t0)/e.meridionalCourses;
const rnd=(x,n=6)=>Number(x.toFixed(n));
const integrate=(f,l,h,n=2000)=>{const d=(h-l)/n;let s=f(l)+f(h);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(l+i*d);return s*d/3;};
const point=(p,t)=>({x:rnd(-a*Math.cos(p)*Math.sin(t)),y:rnd(y0+b*Math.cos(t)),z:rnd(a*Math.sin(p)*Math.sin(t))});
const sample=(l,h,n,f)=>Array.from({length:n},(_,i)=>f(l+(h-l)*i/(n-1)));
const panels=[],rows=[];
for(let s=1;s<=e.azimuthSectorCount;s++)for(let c=1;c<=e.columnsPerSector;c++){
 const p0=(s-1)*dz+(c-1)*dp,p1=p0+dp;
 for(let k=1;k<=e.meridionalCourses;k++){
  const q0=t0+(k-1)*dt,q1=q0+dt,id='A01-CAS-P'+String(s).padStart(2,'0')+'-C'+String(c).padStart(2,'0')+'-B'+String(k).padStart(2,'0');
  const area=dp*integrate(t=>a*Math.sin(t)*Math.sqrt(a*a*Math.cos(t)**2+b*b*Math.sin(t)**2),q0,q1);
  const side=integrate(t=>Math.sqrt(a*a*Math.cos(t)**2+b*b*Math.sin(t)**2),q0,q1),mid=point((p0+p1)/2,(q0+q1)/2);
  const nx=mid.x/(a*a),ny=(mid.y-y0)/(b*b),nz=mid.z/(a*a),nm=Math.hypot(nx,ny,nz),n=e.boundarySamplesPerEdge;
  const edge={crownEdge:sample(p0,p1,n,p=>point(p,q0)),sideEdgeB:sample(q0,q1,n,t=>point(p1,t)),rimEdge:sample(p1,p0,n,p=>point(p,q1)),sideEdgeA:sample(q1,q0,n,t=>point(p0,t))};
  const m={surfaceArea_modelUnit2:rnd(area),meridionalSideLength_modelUnit:rnd(side),crownEdgeArcLength_modelUnit:rnd(a*Math.sin(q0)*dp),rimEdgeArcLength_modelUnit:rnd(a*Math.sin(q1)*dp),crownEdgeChord_modelUnit:rnd(2*a*Math.sin(q0)*Math.sin(dp/2)),rimEdgeChord_modelUnit:rnd(2*a*Math.sin(q1)*Math.sin(dp/2)),verticalProjection_modelUnit:rnd(b*(Math.cos(q0)-Math.cos(q1)))};
  const bds={azimuthStartDeg:rnd(p0*180/Math.PI,4),azimuthEndDeg:rnd(p1*180/Math.PI,4),thetaStartDeg:rnd(q0*180/Math.PI,4),thetaEndDeg:rnd(q1*180/Math.PI,4)};
  const zone='A01-CAS-ZONE-P'+String(s).padStart(2,'0');
  panels.push({panelId:id,assetTag:id,parentZoneId:zone,parentSector:s,column:c,band:k,status:'proposed',coordinateUnit:p.units,parametricBounds:bds,boundaryCorners:{crownSideStart:point(p0,q0),crownSideEnd:point(p1,q0),rimSideEnd:point(p1,q1),rimSideStart:point(p0,q1)},surfaceMidpoint:mid,outwardNormalAtMidpoint:{x:rnd(nx/nm),y:rnd(ny/nm),z:rnd(nz/nm)},boundarySamples:edge,geometryMetrics:m,engineeringValues:{mass_kg:null,designWindPressure_Pa:null,designWindSuction_Pa:null,fastenerScheduleId:null,supportSpacing_modelUnit:null,verificationState:'unknown'}});
  rows.push([id,zone,s,c,k,bds.azimuthStartDeg,bds.azimuthEndDeg,bds.thetaStartDeg,bds.thetaEndDeg,m.surfaceArea_modelUnit2,m.meridionalSideLength_modelUnit,m.crownEdgeArcLength_modelUnit,m.rimEdgeArcLength_modelUnit,m.crownEdgeChord_modelUnit,m.rimEdgeChord_modelUnit,m.verticalProjection_modelUnit,p.units,'TBD','TBD']);
 }
}
const data={schemaVersion:'0.1.0',layoutId:p.layoutId,generatedAt:'reproducible-build; timestamp intentionally omitted',status:'proposed-digital-geometry',units:p.units,sourceGeometry:p.sourceGeometry,parametricParameters:{baseRadius:e.baseRadius,panelRadialFactor:e.panelRadialFactor,scaledPanelRadius:rnd(R),scaleXZ:e.scaleXZ,scaleY:e.scaleY,semiAxisA_modelUnit:rnd(a),semiAxisB_modelUnit:rnd(b),centerY:y0,thetaStartRad:t0,thetaEndRad:rnd(t1),sectorCount:e.azimuthSectorCount,degreesPerSector:rnd(dz*180/Math.PI),columnsPerSector:e.columnsPerSector,degreesPerPanelColumn:rnd(dp*180/Math.PI),meridionalCourses:e.meridionalCourses,boundarySamplesPerEdge:e.boundarySamplesPerEdge},counts:{parentSectors:e.azimuthSectorCount,columnsPerSector:e.columnsPerSector,coursesPerColumn:e.meridionalCourses,proposedReplaceablePanelCandidates:panels.length},conventions:{thetaZero:'crown/apex',thetaIncreasing:'towards lower rim',azimuthZero:'model +Z reference is not aligned to geographic north; orientation TBD',parentSectorNumbering:'1-based; azimuth increases by 30 degrees',moduleTag:'A01-CAS-P{sector}-C{column}-B{band}',areaMethod:'Numerical integration of the ellipsoid surface element for the anisotropically scaled sphere',panelBoundary:'Constant-azimuth meridian edges and constant-theta curved edges'},warnings:['Model units are not metres. No scale-to-metres calibration was found in the source files.','The radial factor 1.006 and y offset 0.58 are legacy rendering offsets to separate the visible cassette surface from the dome skin; they are not construction clearances.','The v2.0.27 experimental 12-petal panels are divided into 2 columns and 6 courses here. The 144 entries are geometry candidates, not a released bill of materials.','The v2.1.0 baseline shares the dome radius/scales but has no integrated shell-cassette objects. This layout file does not modify the digital-twin HTML.','No mass, material, support spacing, fastener size, wind capacity, snow/ice capacity, fire rating, water rating or service-life value is inferred.'],panels};
const headers=['panel_id','parent_zone_id','parent_sector','column','band','azimuth_start_deg','azimuth_end_deg','theta_start_deg','theta_end_deg','surface_area_model_unit2','meridional_side_model_unit','crown_arc_model_unit','rim_arc_model_unit','crown_chord_model_unit','rim_chord_model_unit','vertical_projection_model_unit','coordinate_unit','mass_kg','verification_state'];
const cell=v=>{const s=String(v??'');return /[",\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;};
writeFileSync(resolve(root,'geometry/a01-cassette-layout-v0.1.json'),JSON.stringify(data,null,2)+'\n');
writeFileSync(resolve(root,'templates/cassette-layout-register-v0.1.csv'),[headers,...rows].map(r=>r.map(cell).join(',')).join('\n')+'\n');
console.log('Generated '+panels.length+' proposed geometry records.');
