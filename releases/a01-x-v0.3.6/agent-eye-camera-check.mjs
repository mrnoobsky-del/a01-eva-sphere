import assert from 'node:assert/strict';
import { A01AgentEyeCamera } from './agent-eye-camera.js';

function createHarness() {
  const listeners = new Map(), frames = new Map(), timers = new Map();
  let nextFrame = 1, nextTimer = 1, now = Date.parse('2026-11-22T04:00:00.000Z');
  class FakeEvent { constructor(type, options = {}) { this.type = type; this.detail = options.detail; } }
  class Vector3 { set(x, y, z) { Object.assign(this, { x, y, z }); } }
  class Euler { set(x, y, z) { Object.assign(this, { x, y, z }); } }
  class PerspectiveCamera {
    constructor(fov, aspect, near, far) { Object.assign(this, { fov, aspect, near, far, name: '', position: new Vector3(), rotation: new Euler() }); this.children=[]; this.parent=null; }
    updateProjectionMatrix() {} updateMatrixWorld() {}
  }
  class Bone {
    constructor() { this.children=[]; this.matrixWorld={}; }
    add(child) { child.parent=this; this.children.push(child); }
    remove(child) { this.children=this.children.filter(item=>item!==child); child.parent=null; }
    updateMatrixWorld() {}
  }
  class Renderer {
    constructor(options) { this.options=options; this.renderCount=0; this.disposed=false; this.shadowMap={}; }
    setPixelRatio(value) { this.pixelRatio=value; }
    setSize(width,height) { this.width=width; this.height=height; }
    render() { this.renderCount++; }
    dispose() { this.disposed=true; }
  }
  const tracks=[];
  const canvas={width:0,height:0,setAttribute(){},captureStream(fps){const track={stopped:false,stop(){this.stopped=true;}};tracks.push(track);return{fps,getTracks:()=>[track]};},toBlob(cb,type){cb({size:128,type});}};
  const documentRef={createElement(name){assert.equal(name,'canvas');return canvas;}};
  const windowRef={
    CustomEvent:FakeEvent,
    dispatchEvent(event){(listeners.get(event.type)||[]).forEach(fn=>fn(event));},
    requestAnimationFrame(fn){const id=nextFrame++;frames.set(id,fn);return id;},
    cancelAnimationFrame(id){frames.delete(id);},
    setTimeout(fn,delay){const id=nextTimer++;timers.set(id,{callback:fn,delay});return id;},
    clearTimeout(id){timers.delete(id);}
  };
  const THREE={PerspectiveCamera,WebGLRenderer:Renderer,SRGBColorSpace:'srgb'};
  const scene={updateMatrixWorld(){}},head=new Bone(),mainRenderer={toneMapping:1,toneMappingExposure:1.2,shadowMap:{enabled:true,type:2}};
  const eye=new A01AgentEyeCamera(THREE,{scene,headObject:head,mainRenderer,documentRef,windowRef,now:()=>now,options:{width:320,height:180,fps:5}});
  return{eye,head,mainRenderer,frames,timers,tracks,canvas,advance(ms){now+=ms;},getNow(){return now;}};
}
const approval=now=>({authorizationId:'test-local-approval',grantedBy:'operator',grantedAt:new Date(now-1000).toISOString(),expiresAt:new Date(now+60000).toISOString(),scope:['local_eye_stream']});
const h=createHarness();
assert.equal(h.eye.getStatus().status,'attached');
assert.equal(h.head.children[0].name,'A01-ANDROID-01-EYE-CAMERA');
assert.equal(h.eye.camera.rotation.y,Math.PI);
console.log('PASS: attaches to the actual head Bone and points forward.');
assert.throws(()=>h.eye.start(),/отдельное разрешение/);
assert.throws(()=>h.eye.start({authorization:{...approval(h.getNow()),expiresAt:new Date(h.getNow()-1).toISOString()}}),/истекло/);
console.log('PASS: rejects missing or expired permission.');
const video={muted:false,playsInline:false,srcObject:null,play(){return Promise.resolve();},pause(){}};
const stream=h.eye.start({authorization:approval(h.getNow()),videoElement:video});
assert.equal(h.eye.getStatus().status,'streaming');
assert.equal(video.srcObject,stream);
assert.equal(video.muted,true);
const [frameId,callback]=h.frames.entries().next().value;
h.frames.delete(frameId); callback(1000);
assert.ok(h.eye.renderer.renderCount>=2);
const captured=await h.eye.captureFrame();
assert.equal(captured.blob.size,128);
assert.equal(captured.metadata.provenance,'simulated');
assert.equal(captured.metadata.destination,'local_only');
console.log('PASS: renders local eye frames and returns a simulated Blob.');
h.eye.stop();
assert.equal(h.eye.getStatus().status,'attached');
assert.equal(stream.getTracks()[0].stopped,true);
assert.equal(video.srcObject,null);
console.log('PASS: stop releases media tracks and preview.');
const stream2=h.eye.start({authorization:approval(h.getNow())});
const [timerId,timer]=h.timers.entries().next().value;
assert.ok(timer.delay>0);h.timers.delete(timerId);timer.callback();
assert.equal(h.eye.getStatus().status,'attached');
assert.equal(stream2.getTracks()[0].stopped,true);
console.log('PASS: permission expiry stops the stream.');
h.eye.destroy();
assert.equal(h.head.children.length,0);
assert.equal(h.eye.getStatus().status,'destroyed');
assert.equal(h.mainRenderer.shadowMap.enabled,true);
console.log('PASS: destroy detaches camera without changing the main renderer.');
console.log('A-01 AgentEyeCamera: PASS.');
