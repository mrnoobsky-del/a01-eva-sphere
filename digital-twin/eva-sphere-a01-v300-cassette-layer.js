/*__A01_CASSETTE_LAYOUT_DATA__*/

const cassetteGroup=new THREE.Group();
cassetteGroup.name='A-01 · 144 параметрические кассеты внешней оболочки';
cassetteGroup.visible=true;
exteriorGroup.add(cassetteGroup);
const cassetteById=new Map();
const cassetteMeshes=new Map();
let selectedCassetteId=null;
let cassetteVisible=true;
const cassetteBandColors=[0x9ab9c2,0x8eafb9,0x88aab5,0x83a5b0,0x7d9faa,0x7899a4];
const cassetteBandMaterials=cassetteBandColors.map(color=>new THREE.MeshPhysicalMaterial({color,roughness:.27,metalness:.32,transparent:true,opacity:.25,side:THREE.DoubleSide,depthWrite:false,clearcoat:.5,clearcoatRoughness:.2}));
const cassetteOutlineMaterial=new THREE.LineBasicMaterial({color:0x9ebdc5,transparent:true,opacity:.52});
const cassetteSelectionMaterial=new THREE.LineBasicMaterial({color:0xffd18a,transparent:false,opacity:1});
const cassetteSelectionOutline=new THREE.Line(new THREE.BufferGeometry(),cassetteSelectionMaterial);
cassetteSelectionOutline.visible=false;
cassetteSelectionOutline.renderOrder=9;
cassetteGroup.add(cassetteSelectionOutline);

function cassettePoint(azimuthDeg,thetaDeg){
 const p=cassetteLayoutData.parametricParameters;
 const phi=azimuthDeg*Math.PI/180,theta=thetaDeg*Math.PI/180,R=p.baseRadius*p.panelRadialFactor;
 return new THREE.Vector3(-R*Math.cos(phi)*Math.sin(theta)*p.scaleXZ,p.centerY+p.baseRadius*Math.cos(theta)*p.scaleY,R*Math.sin(phi)*Math.sin(theta)*p.scaleXZ);
}
function cassetteBoundaryGeometry(bounds){
 const points=[],steps=12;
 const addEdge=(a,b)=>{for(let i=0;i<steps;i++)points.push(a.clone().lerp(b,i/steps));};
 const a=cassettePoint(bounds.azimuthStartDeg,bounds.thetaStartDeg),b=cassettePoint(bounds.azimuthEndDeg,bounds.thetaStartDeg),c=cassettePoint(bounds.azimuthEndDeg,bounds.thetaEndDeg),d=cassettePoint(bounds.azimuthStartDeg,bounds.thetaEndDeg);
 addEdge(a,b);addEdge(b,c);addEdge(c,d);addEdge(d,a);
 return new THREE.BufferGeometry().setFromPoints(points);
}
function cassetteSurfaceGeometry(bounds){
 const segments=6,positions=[],indices=[];
 for(let v=0;v<=segments;v++){
  const theta=THREE.MathUtils.lerp(bounds.thetaStartDeg,bounds.thetaEndDeg,v/segments);
  for(let u=0;u<=segments;u++){
   const azimuth=THREE.MathUtils.lerp(bounds.azimuthStartDeg,bounds.azimuthEndDeg,u/segments);
   const p=cassettePoint(azimuth,theta);positions.push(p.x,p.y,p.z);
  }
 }
 for(let v=0;v<segments;v++)for(let u=0;u<segments;u++){
  const a=v*(segments+1)+u,b=a+1,c=a+segments+1,d=c+1;
  indices.push(a,c,b,b,c,d);
 }
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 geometry.setIndex(indices);geometry.computeVertexNormals();
 return geometry;
}
for(const source of cassetteLayoutData.panels){
 const bounds=source.parametricBounds,band=source.band;
 const mesh=new THREE.Mesh(cassetteSurfaceGeometry(bounds),cassetteBandMaterials[band-1]);
 mesh.name=source.panelId;mesh.userData.cassetteId=source.panelId;mesh.userData.cassetteBounds=bounds;
 mesh.frustumCulled=false;mesh.castShadow=false;mesh.receiveShadow=false;mesh.renderOrder=3;
 cassetteGroup.add(mesh);cassetteMeshes.set(source.panelId,mesh);
 const edge=new THREE.LineSegments(cassetteBoundaryGeometry(bounds),cassetteOutlineMaterial);
 edge.renderOrder=4;cassetteGroup.add(edge);
 cassetteById.set(source.panelId,{
  id:source.panelId,sector:source.parentSector,column:source.column,band,bounds,
  area:source.geometryMetrics.surfaceArea_modelUnit2,
  side:source.geometryMetrics.meridionalSideLength_modelUnit,
  crown:source.geometryMetrics.crownEdgeArcLength_modelUnit,
  rim:source.geometryMetrics.rimEdgeArcLength_modelUnit,
  vertical:source.geometryMetrics.verticalProjection_modelUnit,
  verification:source.engineeringValues.verificationState
 });
}
function renderCassettePanel(id){
 const p=cassetteById.get(id);if(!p)return;
 $('objectName').textContent='Наружная кассета · '+id;
 $('objectDesc').textContent='Сменный ненесущий модуль внешней оболочки. Геометрия получена из параметрической сетки A-01; панель не считается несущим элементом и не подтверждает пригодность конструкции.';
 $('objectTag').textContent='КАССЕТА · КАНДИДАТ ГЕОМЕТРИИ';
 $('objectCode').textContent=p.id;
 $('objectLevel').textContent='ВНЕШНЯЯ ОБОЛОЧКА · СЕКТОР '+String(p.sector).padStart(2,'0');
 $('objectConnections').textContent='Колонка '+String(p.column).padStart(2,'0')+' · Курс '+String(p.band).padStart(2,'0')+' · соседние панели определяются сеткой';
 $('objectMarket').textContent='Заменяемый ненесущий модуль · статус proposed';
 $('objectOffer').textContent='Площадь '+p.area.toFixed(3)+' model-unit² · проверка: '+p.verification;
 $('marketNote').textContent='Габарит по меридиану: '+p.side.toFixed(3)+' model-unit · верхняя дуга: '+p.crown.toFixed(3)+' · нижняя дуга: '+p.rim.toFixed(3)+' · вертикальная проекция: '+p.vertical.toFixed(3)+' model-unit. Материал, масса, крепёж, нагрузки, пожарные и водные испытания пока не определены.';
}
function selectCassette(id){
 const p=cassetteById.get(id);if(!p)return;
 selectedCassetteId=id;selectedId=null;hoveredId=null;highlight();
 const b=p.bounds,steps=16,points=[];
 const pushEdge=(a,c)=>{for(let i=0;i<steps;i++)points.push(a.clone().lerp(c,i/steps));};
 const a=cassettePoint(b.azimuthStartDeg,b.thetaStartDeg),c=cassettePoint(b.azimuthEndDeg,b.thetaStartDeg),d=cassettePoint(b.azimuthEndDeg,b.thetaEndDeg),e=cassettePoint(b.azimuthStartDeg,b.thetaEndDeg);
 pushEdge(a,c);pushEdge(c,d);pushEdge(d,e);pushEdge(e,a);points.push(points[0].clone());
 cassetteSelectionOutline.geometry.dispose();
 cassetteSelectionOutline.geometry=new THREE.BufferGeometry().setFromPoints(points);
 cassetteSelectionOutline.visible=true;
 renderCassettePanel(id);
}
