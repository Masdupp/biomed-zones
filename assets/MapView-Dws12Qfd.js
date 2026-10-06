const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BLUdle5A.js","assets/expression-Bl_GL2tO.js","assets/index-BbWsdnUj.js","assets/index-eZB2m6Fr.css","assets/WebGLGuard-Bnq5BjkQ.js","assets/webgl-K7Q3KtXm.js","assets/WebGLGuard-B-YMMjus.css","assets/h3-js.es-D7xVzgmY.js","assets/index-dE-tjrYS.js"])))=>i.map(i=>d[i]);
var dp=Object.defineProperty;var gp=(i,e,t)=>e in i?dp(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var d=(i,e,t)=>gp(i,typeof e!="symbol"?e+"":e,t);import{_ as pr,am as pp,j as mr,r as Ie,an as mp,C as _p}from"./index-BbWsdnUj.js";import{W as bp,u as yp,m as Cs,b as rl,t as vp}from"./WebGLGuard-Bnq5BjkQ.js";import{cellToBoundary as wp,cellToLatLng as qa,getResolution as xp,isPentagon as Pp,getHexagonEdgeLengthAvg as Ep,latLngToCell as Sp,gridDistance as Lp}from"./h3-js.es-D7xVzgmY.js";function _r(i,e){if(!i)throw new Error(e||"loader assertion failed.")}const Za=!!(typeof process!="object"||String(process)!=="[object process]"||process.browser),sl=typeof process<"u"&&process.version&&/v([0-9]*)/.exec(process.version);sl&&parseFloat(sl[1]);const _t=globalThis,Gt=globalThis.process||{},Tp=globalThis.navigator||{};function sh(i){var n,r;if(typeof window<"u"&&((n=window.process)==null?void 0:n.type)==="renderer"||typeof process<"u"&&((r=process.versions)!=null&&r.electron))return!0;const t=typeof navigator<"u"&&navigator.userAgent;return!!(t&&t.indexOf("Electron")>=0)}function yi(){return!(typeof process=="object"&&String(process)==="[object process]"&&!(process!=null&&process.browser))||sh()}function Ap(i){return yi()?sh()?"Electron":(Tp.userAgent||"").indexOf("Edge")>-1?"Edge":globalThis.chrome?"Chrome":globalThis.safari?"Safari":globalThis.mozInnerScreenX?"Firefox":"Unknown":"Node"}const oh="4.1.2";function Xa(i,e){if(!i)throw new Error("Assertion failed")}function ah(i){if(!i)return 0;let e;switch(typeof i){case"number":e=i;break;case"object":e=i.logLevel||i.priority||0;break;default:return 0}return Xa(Number.isFinite(e)&&e>=0),e}function Cp(i){const{logLevel:e,message:t}=i;i.logLevel=ah(e);const n=i.args?Array.from(i.args):[];for(;n.length&&n.shift()!==t;);switch(typeof e){case"string":case"function":t!==void 0&&n.unshift(t),i.message=e;break;case"object":Object.assign(i,e);break}typeof i.message=="function"&&(i.message=i.message());const r=typeof i.message;return Xa(r==="string"||r==="object"),Object.assign(i,{args:n},i.opts)}const Qt=()=>{};class Mp{constructor({level:e=0}={}){this.userData={},this._onceCache=new Set,this._level=e}set level(e){this.setLevel(e)}get level(){return this.getLevel()}setLevel(e){return this._level=e,this}getLevel(){return this._level}warn(e,...t){return this._log("warn",0,e,t,{once:!0})}error(e,...t){return this._log("error",0,e,t)}log(e,t,...n){return this._log("log",e,t,n)}info(e,t,...n){return this._log("info",e,t,n)}once(e,t,...n){return this._log("once",e,t,n,{once:!0})}_log(e,t,n,r,s={}){const o=Cp({logLevel:t,message:n,args:this._buildArgs(t,n,r),opts:s});return this._createLogFunction(e,o,s)}_buildArgs(e,t,n){return[e,t,...n]}_createLogFunction(e,t,n){if(!this._shouldLog(t.logLevel))return Qt;const r=this._getOnceTag(n.tag??t.tag??t.message);if((n.once||t.once)&&r!==void 0){if(this._onceCache.has(r))return Qt;this._onceCache.add(r)}return this._emit(e,t)}_shouldLog(e){return this.getLevel()>=ah(e)}_getOnceTag(e){if(e!==void 0)try{return typeof e=="string"?e:String(e)}catch{return}}}function Ip(i){try{const e=window[i],t="__storage_test__";return e.setItem(t,t),e.removeItem(t),e}catch{return null}}class Rp{constructor(e,t,n="sessionStorage"){this.storage=Ip(n),this.id=e,this.config=t,this._loadConfiguration()}getConfiguration(){return this.config}setConfiguration(e){if(Object.assign(this.config,e),this.storage){const t=JSON.stringify(this.config);this.storage.setItem(this.id,t)}}_loadConfiguration(){let e={};if(this.storage){const t=this.storage.getItem(this.id);e=t?JSON.parse(t):{}}return Object.assign(this.config,e),this}}function Op(i){let e;return i<10?e=`${i.toFixed(2)}ms`:i<100?e=`${i.toFixed(1)}ms`:i<1e3?e=`${i.toFixed(0)}ms`:e=`${(i/1e3).toFixed(2)}s`,e}function Bp(i,e=8){const t=Math.max(e-i.length,0);return`${" ".repeat(t)}${i}`}var br;(function(i){i[i.BLACK=30]="BLACK",i[i.RED=31]="RED",i[i.GREEN=32]="GREEN",i[i.YELLOW=33]="YELLOW",i[i.BLUE=34]="BLUE",i[i.MAGENTA=35]="MAGENTA",i[i.CYAN=36]="CYAN",i[i.WHITE=37]="WHITE",i[i.BRIGHT_BLACK=90]="BRIGHT_BLACK",i[i.BRIGHT_RED=91]="BRIGHT_RED",i[i.BRIGHT_GREEN=92]="BRIGHT_GREEN",i[i.BRIGHT_YELLOW=93]="BRIGHT_YELLOW",i[i.BRIGHT_BLUE=94]="BRIGHT_BLUE",i[i.BRIGHT_MAGENTA=95]="BRIGHT_MAGENTA",i[i.BRIGHT_CYAN=96]="BRIGHT_CYAN",i[i.BRIGHT_WHITE=97]="BRIGHT_WHITE"})(br||(br={}));const kp=10;function ol(i){return typeof i!="string"?i:(i=i.toUpperCase(),br[i]||br.WHITE)}function Dp(i,e,t){return!yi&&typeof i=="string"&&(e&&(i=`\x1B[${ol(e)}m${i}\x1B[39m`),t&&(i=`\x1B[${ol(t)+kp}m${i}\x1B[49m`)),i}function Fp(i,e=["constructor"]){const t=Object.getPrototypeOf(i),n=Object.getOwnPropertyNames(t),r=i;for(const s of n){const o=r[s];typeof o=="function"&&(e.find(a=>s===a)||(r[s]=o.bind(i)))}}class ch{getHighResolutionTimer(){var t,n,r;let e;if(yi()&&_t.performance)e=(n=(t=_t==null?void 0:_t.performance)==null?void 0:t.now)==null?void 0:n.call(t);else if("hrtime"in Gt){const s=(r=Gt==null?void 0:Gt.hrtime)==null?void 0:r.call(Gt);e=s[0]*1e3+s[1]/1e6}else e=Date.now();return e}getMemoryUsageMB(){var n;const e=_t==null?void 0:_t.performance,t=(n=e==null?void 0:e.memory)==null?void 0:n.usedJSHeapSize;return t==null?null:Math.trunc(t/1024/1024)}}const wt=new ch;globalThis.Probe=ch;globalThis.probe=wt;const Vt={debug:yi()&&console.debug||console.log,log:console.log,info:console.info,warn:console.warn,error:console.error},Ms={enabled:!0,level:0};class _n extends Mp{constructor({id:e}={id:""}){super({level:0}),this.VERSION=oh,this._startTs=wt.getHighResolutionTimer(),this._deltaTs=wt.getHighResolutionTimer(),this.userData={},this.LOG_THROTTLE_TIMEOUT=0,this.id=e,this.userData={},this._storage=new Rp(`__probe-${this.id}__`,{[this.id]:Ms}),this.timeStamp(`${this.id} started`),Fp(this),Object.seal(this)}isEnabled(){return this._getConfiguration().enabled}getLevel(){return this._getConfiguration().level}getTotal(){return Number((wt.getHighResolutionTimer()-this._startTs).toPrecision(10))}getDelta(){return Number((wt.getHighResolutionTimer()-this._deltaTs).toPrecision(10))}set priority(e){this.level=e}get priority(){return this.level}getPriority(){return this.level}enable(e=!0){return this._updateConfiguration({enabled:e}),this}setLevel(e){return this._updateConfiguration({level:e}),this}get(e){return this._getConfiguration()[e]}set(e,t){this._updateConfiguration({[e]:t})}settings(){console.table?console.table(this._storage.config):console.log(this._storage.config)}assert(e,t){if(!e)throw new Error(t||"Assertion failed")}warn(e,...t){return this._log("warn",0,e,t,{method:Vt.warn,once:!0})}error(e,...t){return this._log("error",0,e,t,{method:Vt.error})}deprecated(e,t){return this.warn(`\`${e}\` is deprecated and will be removed in a later version. Use \`${t}\` instead`)}removed(e,t){return this.error(`\`${e}\` has been removed. Use \`${t}\` instead`)}probe(e,t,...n){const r=wt.getMemoryUsageMB();if(r!==null){const s=`${r}MB `;typeof t=="function"?t=()=>`${s}${t()}`:typeof t=="string"&&(t=`${s}${t}`)}return this._log("log",e,t,n,{method:Vt.log,time:!0,once:!0})}log(e,t,...n){return this._log("log",e,t,n,{method:Vt.debug})}info(e,t,...n){return this._log("info",e,t,n,{method:console.info})}once(e,t,...n){return this._log("once",e,t,n,{method:Vt.debug||Vt.info,once:!0})}table(e,t,n){return t?this._log("table",e,t,n&&[n]||[],{method:console.table||Qt,tag:Up(t)}):Qt}time(e,t){return this._log("time",e,t,[],{method:console.time?console.time:console.info})}timeEnd(e,t){return this._log("time",e,t,[],{method:console.timeEnd?console.timeEnd:console.info})}timeStamp(e,t){return this._log("time",e,t,[],{method:console.timeStamp||Qt})}group(e,t,n={collapsed:!1}){const r=(n.collapsed?console.groupCollapsed:console.group)||console.info;return this._log("group",e,t,[],{method:r})}groupCollapsed(e,t,n={}){return this.group(e,t,Object.assign({},n,{collapsed:!0}))}groupEnd(e){return this._log("groupEnd",e,"",[],{method:console.groupEnd||Qt})}withGroup(e,t,n){this.group(e,t)();try{n()}finally{this.groupEnd(e)()}}trace(){console.trace&&console.trace()}_shouldLog(e){return this.isEnabled()&&super._shouldLog(e)}_emit(e,t){const n=t.method;Xa(n),t.total=this.getTotal(),t.delta=this.getDelta(),this._deltaTs=wt.getHighResolutionTimer();const r=Np(this.id,t.message,t);return n.bind(console,r,...t.args)}_getConfiguration(){return this._storage.config[this.id]||this._updateConfiguration(Ms),this._storage.config[this.id]}_updateConfiguration(e){const t=this._storage.config[this.id]||{...Ms};this._storage.setConfiguration({[this.id]:{...t,...e}})}}_n.VERSION=oh;function Np(i,e,t){if(typeof e=="string"){const n=t.time?Bp(Op(t.total)):"";e=t.time?`${i}: ${n}  ${e}`:`${i}: ${e}`,e=Dp(e,t.color,t.background)}return e}function Up(i){for(const e in i)for(const t in i[e])return t||"untitled";return"empty"}const Is="4.5.2",zp=Is[0]>="0"&&Is[0]<="9"?`v${Is}`:"";function $p(){const i=new _n({id:"loaders.gl"});return globalThis.loaders||(globalThis.loaders={}),globalThis.loaders.log=i,globalThis.loaders.version=zp,globalThis.probe||(globalThis.probe={}),globalThis.probe.loaders=i,i}const Gp=$p(),Vp=i=>typeof i=="boolean",Xe=i=>typeof i=="function",Nt=i=>i!==null&&typeof i=="object",al=i=>Nt(i)&&i.constructor==={}.constructor,lh=i=>typeof SharedArrayBuffer<"u"&&i instanceof SharedArrayBuffer,Ka=i=>Nt(i)&&typeof i.byteLength=="number"&&typeof i.slice=="function",jp=i=>!!i&&Xe(i[Symbol.iterator]),Wp=i=>!!i&&Xe(i[Symbol.asyncIterator]),Ut=i=>typeof Response<"u"&&i instanceof Response||Nt(i)&&Xe(i.arrayBuffer)&&Xe(i.text)&&Xe(i.json),zt=i=>typeof Blob<"u"&&i instanceof Blob,Hp=i=>typeof ReadableStream<"u"&&i instanceof ReadableStream||Nt(i)&&Xe(i.tee)&&Xe(i.cancel)&&Xe(i.getReader),Yp=i=>Nt(i)&&Xe(i.read)&&Xe(i.pipe)&&Vp(i.readable),uh=i=>Hp(i)||Yp(i);function qp(i,e){return fh(i||{},e)}function fh(i,e,t=0){if(t>3)return e;const n={...i};for(const[r,s]of Object.entries(e))s&&typeof s=="object"&&!Array.isArray(s)?n[r]=fh(n[r]||{},e[r],t+1):n[r]=e[r];return n}const Zp="latest";function Xp(){var i;return(i=globalThis._loadersgl_)!=null&&i.version||(globalThis._loadersgl_=globalThis._loadersgl_||{},globalThis._loadersgl_.version="4.5.2"),globalThis._loadersgl_.version}const Kp=Xp();function dt(i,e){if(!i)throw new Error(e||"loaders.gl assertion failed.")}const St=typeof process!="object"||String(process)!=="[object process]"||process.browser,Qp=typeof window<"u"&&typeof window.orientation<"u",cl=typeof process<"u"&&process.version&&/v([0-9]*)/.exec(process.version);cl&&parseFloat(cl[1]);class Jp{constructor(e,t){d(this,"name");d(this,"workerThread");d(this,"isRunning",!0);d(this,"result");d(this,"_resolve",()=>{});d(this,"_reject",()=>{});this.name=e,this.workerThread=t,this.result=new Promise((n,r)=>{this._resolve=n,this._reject=r})}postMessage(e,t){this.workerThread.postMessage({source:"loaders.gl",type:e,payload:t})}done(e){dt(this.isRunning),this.isRunning=!1,this._resolve(e)}error(e){dt(this.isRunning),this.isRunning=!1,this._reject(e)}}class Rs{terminate(){}}const Os=new Map;function em(i){dt(i.source&&!i.url||!i.source&&i.url);let e=Os.get(i.source||i.url);return e||(i.url&&(e=tm(i.url),Os.set(i.url,e)),i.source&&(e=hh(i.source),Os.set(i.source,e))),dt(e),e}function tm(i){if(!i.startsWith("http"))return i;const e=im(i);return hh(e)}function hh(i){const e=new Blob([i],{type:"application/javascript"});return URL.createObjectURL(e)}function im(i){return`try {
  importScripts('${i}');
} catch (error) {
  console.error(error);
  throw error;
}`}function dh(i,e=!0,t){const n=t||new Set;if(i){if(ll(i))n.add(i);else if(ll(i.buffer))n.add(i.buffer);else if(!ArrayBuffer.isView(i)){if(e&&typeof i=="object")for(const r in i)dh(i[r],e,n)}}return t===void 0?Array.from(n):[]}function ll(i){return i?i instanceof ArrayBuffer||typeof MessagePort<"u"&&i instanceof MessagePort||typeof ImageBitmap<"u"&&i instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas:!1}const Bs=()=>{};class Do{constructor(e){d(this,"name");d(this,"source");d(this,"url");d(this,"terminated",!1);d(this,"worker");d(this,"onMessage");d(this,"onError");d(this,"_loadableURL","");const{name:t,source:n,url:r}=e;dt(n||r),this.name=t,this.source=n,this.url=r,this.onMessage=Bs,this.onError=s=>console.log(s),this.worker=St?this._createBrowserWorker():this._createNodeWorker()}static isSupported(){return typeof Worker<"u"&&St||typeof Rs<"u"&&!St}destroy(){this.onMessage=Bs,this.onError=Bs,this.worker.terminate(),this.terminated=!0}get isRunning(){return!!this.onMessage}postMessage(e,t){t=t||dh(e),this.worker.postMessage(e,t)}_getErrorFromErrorEvent(e){let t="Failed to load ";return t+=`worker ${this.name} from ${this.url}. `,e.message&&(t+=`${e.message} in `),e.lineno&&(t+=`:${e.lineno}:${e.colno}`),new Error(t)}_createBrowserWorker(){this._loadableURL=em({source:this.source,url:this.url});const e=new Worker(this._loadableURL,{name:this.name});return e.onmessage=t=>{t.data?this.onMessage(t.data):this.onError(new Error("No data received"))},e.onerror=t=>{this.onError(this._getErrorFromErrorEvent(t)),this.terminated=!0},e.onmessageerror=t=>console.error(t),e}_createNodeWorker(){let e;if(this.url){const n=this.url.includes(":/")||this.url.startsWith("/")?this.url:`./${this.url}`,r=this.url.endsWith(".ts")||this.url.endsWith(".mjs")?"module":"commonjs";e=new Rs(n,{eval:!1,type:r})}else if(this.source)e=new Rs(this.source,{eval:!0});else throw new Error("no worker");return e.on("message",t=>{this.onMessage(t)}),e.on("error",t=>{this.onError(t)}),e.on("exit",t=>{}),e}}class nm{constructor(e){d(this,"name","unnamed");d(this,"source");d(this,"url");d(this,"maxConcurrency",1);d(this,"maxMobileConcurrency",1);d(this,"onDebug",()=>{});d(this,"reuseWorkers",!0);d(this,"props",{});d(this,"jobQueue",[]);d(this,"idleQueue",[]);d(this,"count",0);d(this,"isDestroyed",!1);this.source=e.source,this.url=e.url,this.setProps(e)}static isSupported(){return Do.isSupported()}destroy(){this.idleQueue.forEach(e=>e.destroy()),this.isDestroyed=!0}setProps(e){this.props={...this.props,...e},e.name!==void 0&&(this.name=e.name),e.maxConcurrency!==void 0&&(this.maxConcurrency=e.maxConcurrency),e.maxMobileConcurrency!==void 0&&(this.maxMobileConcurrency=e.maxMobileConcurrency),e.reuseWorkers!==void 0&&(this.reuseWorkers=e.reuseWorkers),e.onDebug!==void 0&&(this.onDebug=e.onDebug)}async startJob(e,t=(r,s,o)=>r.done(o),n=(r,s)=>r.error(s)){const r=new Promise(s=>(this.jobQueue.push({name:e,onMessage:t,onError:n,onStart:s}),this));return this._startQueuedJob(),await r}async _startQueuedJob(){if(!this.jobQueue.length)return;const e=this._getAvailableWorker();if(!e)return;const t=this.jobQueue.shift();if(t){this.onDebug({message:"Starting job",name:t.name,workerThread:e,backlog:this.jobQueue.length});const n=new Jp(t.name,e);e.onMessage=r=>t.onMessage(n,r.type,r.payload),e.onError=r=>t.onError(n,r),t.onStart(n);try{await n.result}catch(r){console.error(`Worker exception: ${r}`)}finally{this.returnWorkerToQueue(e)}}}returnWorkerToQueue(e){!St||this.isDestroyed||!this.reuseWorkers||this.count>this._getMaxConcurrency()?(e.destroy(),this.count--):this.idleQueue.push(e),this.isDestroyed||this._startQueuedJob()}_getAvailableWorker(){if(this.idleQueue.length>0)return this.idleQueue.shift()||null;if(this.count<this._getMaxConcurrency()){this.count++;const e=`${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;return new Do({name:e,source:this.source,url:this.url})}return null}_getMaxConcurrency(){return Qp?this.maxMobileConcurrency:this.maxConcurrency}}const rm={maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:!0,onDebug:()=>{}},ot=class ot{constructor(e){d(this,"props");d(this,"workerPools",new Map);this.props={...rm},this.setProps(e),this.workerPools=new Map}static isSupported(){return Do.isSupported()}static getWorkerFarm(e={}){return ot._workerFarm=ot._workerFarm||new ot({}),ot._workerFarm.setProps(e),ot._workerFarm}destroy(){for(const e of this.workerPools.values())e.destroy();this.workerPools=new Map}setProps(e){this.props={...this.props,...e};for(const t of this.workerPools.values())t.setProps(this._getWorkerPoolProps())}getWorkerPool(e){const{name:t,source:n,url:r}=e;let s=this.workerPools.get(t);return s||(s=new nm({name:t,source:n,url:r}),s.setProps(this._getWorkerPoolProps()),this.workerPools.set(t,s)),s}_getWorkerPoolProps(){return{maxConcurrency:this.props.maxConcurrency,maxMobileConcurrency:this.props.maxMobileConcurrency,reuseWorkers:this.props.reuseWorkers,onDebug:this.props.onDebug}}};d(ot,"_workerFarm");let yr=ot;function sm(i,e={}){var o;const t=e[i.id]||{},n=St?i.workerFile||`${i.id}-worker.js`:`${i.id}-worker-node.js`;let r=t.workerUrl;if(!r&&i.id==="compression"&&(r=e.workerUrl),(e._workerType||((o=e==null?void 0:e.core)==null?void 0:o._workerType))==="test"&&(St?r=`modules/${i.module}/dist/${n}`:r=`modules/${i.module}/src/workers/${i.id}-worker-node.ts`),!r){let a=i.version;a==="latest"&&(a=Zp);const c=a?`@${a}`:"";r=`https://unpkg.com/@loaders.gl/${i.module}${c}/dist/${n}`}return dt(r),r}function om(i,e=Kp){dt(i,"no worker provided");const t=i.version;return!(!e||!t)}function am(i,e){var r,s;if(!yr.isSupported())return!1;const t=(e==null?void 0:e._nodeWorkers)??((r=e==null?void 0:e.core)==null?void 0:r._nodeWorkers);if(!St&&!t)return!1;const n=(e==null?void 0:e.worker)??((s=e==null?void 0:e.core)==null?void 0:s.worker);return!!(i.worker&&n)}async function cm(i,e,t,n,r){const s=i.id,o=sm(i,t),c=yr.getWorkerFarm(t==null?void 0:t.core).getWorkerPool({name:s,url:o});t=JSON.parse(JSON.stringify(t||{})),t._workerLoaderId=i.id,n=JSON.parse(JSON.stringify(n||{}));const l=await c.startJob("process-on-worker",lm.bind(null,r));return l.postMessage("process",{input:e,options:t,context:n}),await(await l.result).result}async function lm(i,e,t,n){switch(t){case"done":e.done(n);break;case"error":e.error(new Error(n.error));break;case"process":const{id:r,input:s,options:o}=n;try{const a=await i(s,o);e.postMessage("done",{id:r,result:a})}catch(a){const c=a instanceof Error?a.message:"unknown error";e.postMessage("error",{id:r,error:c})}break;default:console.warn(`parse-with-worker unknown message ${t}`)}}function um(i,e,t){if(t=t||i.byteLength,i.byteLength<t||e.byteLength<t)return!1;const n=new Uint8Array(i),r=new Uint8Array(e);for(let s=0;s<n.length;++s)if(n[s]!==r[s])return!1;return!0}function fm(...i){return hm(i)}function hm(i){const e=i.map(s=>s instanceof ArrayBuffer?new Uint8Array(s):s),t=e.reduce((s,o)=>s+o.byteLength,0),n=new Uint8Array(t);let r=0;for(const s of e)n.set(s,r),r+=s.byteLength;return n.buffer}async function dm(i){const e=[];for await(const t of i)e.push(gm(t));return fm(...e)}function gm(i){if(i instanceof ArrayBuffer)return i;if(ArrayBuffer.isView(i)){const{buffer:e,byteOffset:t,byteLength:n}=i;return ul(e,t,n)}return ul(i)}function ul(i,e=0,t=i.byteLength-e){const n=new Uint8Array(i,e,t),r=new Uint8Array(n.length);return r.set(n),r.buffer}function fl(){let i;if(typeof window<"u"&&window.performance)i=window.performance.now();else if(typeof process<"u"&&process.hrtime){const e=process.hrtime();i=e[0]*1e3+e[1]/1e6}else i=Date.now();return i}class hl{constructor(e,t){this.sampleSize=1,this.time=0,this.count=0,this.samples=0,this.lastTiming=0,this.lastSampleTime=0,this.lastSampleCount=0,this._count=0,this._time=0,this._samples=0,this._startTime=0,this._timerPending=!1,this.name=e,this.type=t,this.reset()}reset(){return this.time=0,this.count=0,this.samples=0,this.lastTiming=0,this.lastSampleTime=0,this.lastSampleCount=0,this._count=0,this._time=0,this._samples=0,this._startTime=0,this._timerPending=!1,this}setSampleSize(e){return this.sampleSize=e,this}incrementCount(){return this.addCount(1),this}decrementCount(){return this.subtractCount(1),this}addCount(e){return this._count+=e,this._samples++,this._checkSampling(),this}subtractCount(e){return this._count-=e,this._samples++,this._checkSampling(),this}addTime(e){return this._time+=e,this.lastTiming=e,this._samples++,this._checkSampling(),this}timeStart(){return this._startTime=fl(),this._timerPending=!0,this}timeEnd(){return this._timerPending?(this.addTime(fl()-this._startTime),this._timerPending=!1,this._checkSampling(),this):this}getSampleAverageCount(){return this.sampleSize>0?this.lastSampleCount/this.sampleSize:0}getSampleAverageTime(){return this.sampleSize>0?this.lastSampleTime/this.sampleSize:0}getSampleHz(){return this.lastSampleTime>0?this.sampleSize/(this.lastSampleTime/1e3):0}getAverageCount(){return this.samples>0?this.count/this.samples:0}getAverageTime(){return this.samples>0?this.time/this.samples:0}getHz(){return this.time>0?this.samples/(this.time/1e3):0}_checkSampling(){this._samples===this.sampleSize&&(this.lastSampleTime=this._time,this.lastSampleCount=this._count,this.count+=this._count,this.time+=this._time,this.samples+=this._samples,this._time=0,this._count=0,this._samples=0)}}class hs{constructor(e){this.stats={},this.id=e.id,this.stats={},this._initializeStats(e.stats),Object.seal(this)}get(e,t="count"){return this._getOrCreate({name:e,type:t})}get size(){return Object.keys(this.stats).length}reset(){for(const e of Object.values(this.stats))e.reset();return this}forEach(e){for(const t of Object.values(this.stats))e(t)}getTable(){const e={};return this.forEach(t=>{e[t.name]={time:t.time||0,count:t.count||0,average:t.getAverageTime()||0,hz:t.getHz()||0}}),e}_initializeStats(e=[]){e.forEach(t=>this._getOrCreate(t))}_getOrCreate(e){const{name:t,type:n}=e;let r=this.stats[t];return r||(e instanceof hl?r=e:r=new hl(t,n),this.stats[t]=r),r}}let pm="";const dl={};function mm(i){for(const e in dl)if(i.startsWith(e)){const t=dl[e];i=i.replace(e,t)}return!i.startsWith("http://")&&!i.startsWith("https://")&&(i=`${pm}${i}`),i}function gh(i){return i&&typeof i=="object"&&i.isBuffer}function Qa(i){if(gh(i))return i;if(i instanceof ArrayBuffer)return i;if(lh(i))return Fo(i);if(ArrayBuffer.isView(i)){const e=i.buffer;return i.byteOffset===0&&i.byteLength===i.buffer.byteLength?e:e.slice(i.byteOffset,i.byteOffset+i.byteLength)}if(typeof i=="string"){const e=i;return new TextEncoder().encode(e).buffer}if(i&&typeof i=="object"&&i._toArrayBuffer)return i._toArrayBuffer();throw new Error("toArrayBuffer")}function ph(i){if(i instanceof ArrayBuffer)return i;if(lh(i))return Fo(i);const{buffer:e,byteOffset:t,byteLength:n}=i;return e instanceof ArrayBuffer&&t===0&&n===e.byteLength?e:Fo(e,t,n)}function Fo(i,e=0,t=i.byteLength-e){const n=new Uint8Array(i,e,t),r=new Uint8Array(n.length);return r.set(n),r.buffer}function _m(i){return ArrayBuffer.isView(i)?i:new Uint8Array(i)}function mh(i){const e=i?i.lastIndexOf("/"):-1;return e>=0?i.substr(e+1):i}function _h(i){const e=i?i.lastIndexOf("/"):-1;return e>=0?i.substr(0,e):""}class bm extends Error{constructor(t,n){super(t);d(this,"reason");d(this,"url");d(this,"response");this.reason=n.reason,this.url=n.url,this.response=n.response}}const ym=/^data:([-\w.]+\/[-\w.+]+)(;|,)/,vm=/^([-\w.]+\/[-\w.+]+)/;function gl(i,e){return i.toLowerCase()===e.toLowerCase()}function wm(i){const e=vm.exec(i);return e?e[1]:i}function pl(i){const e=ym.exec(i);return e?e[1]:""}const bh=/\?.*/;function xm(i){const e=i.match(bh);return e&&e[0]}function ds(i){return i.replace(bh,"")}function Pm(i){if(i.length<50)return i;const e=i.slice(i.length-15);return`${i.substr(0,32)}...${e}`}function gs(i){return Ut(i)?i.url:zt(i)?("name"in i?i.name:"")||"":typeof i=="string"?i:""}function ps(i){if(Ut(i)){const e=i.headers.get("content-type")||"",t=ds(i.url);return wm(e)||pl(t)}return zt(i)?i.type||"":typeof i=="string"?pl(i):""}function Em(i){return Ut(i)?i.headers["content-length"]||-1:zt(i)?i.size:typeof i=="string"?i.length:i instanceof ArrayBuffer||ArrayBuffer.isView(i)?i.byteLength:-1}async function yh(i){if(Ut(i))return i;const e={},t=Em(i);t>=0&&(e["content-length"]=String(t));const n=gs(i),r=ps(i);r&&(e["content-type"]=r);const s=await Tm(i);s&&(e["x-first-bytes"]=s),typeof i=="string"&&(i=new TextEncoder().encode(i));const o=new Response(i,{headers:e});return Object.defineProperty(o,"url",{value:n}),o}async function Sm(i){if(!i.ok)throw await Lm(i)}async function Lm(i){const e=Pm(i.url);let t=`Failed to fetch resource (${i.status}) ${i.statusText}: ${e}`;t=t.length>100?`${t.slice(0,100)}...`:t;const n={reason:i.statusText,url:i.url,response:i};try{const r=i.headers.get("Content-Type");n.reason=!i.bodyUsed&&(r!=null&&r.includes("application/json"))?await i.json():await i.text()}catch{}return new bm(t,n)}async function Tm(i){if(typeof i=="string")return`data:,${i.slice(0,5)}`;if(i instanceof Blob){const t=i.slice(0,5);return await new Promise(n=>{const r=new FileReader;r.onload=s=>{var o;return n((o=s==null?void 0:s.target)==null?void 0:o.result)},r.readAsDataURL(t)})}if(i instanceof ArrayBuffer){const t=i.slice(0,5);return`data:base64,${Am(t)}`}return null}function Am(i){let e="";const t=new Uint8Array(i);for(let n=0;n<t.byteLength;n++)e+=String.fromCharCode(t[n]);return btoa(e)}function Cm(i){return!Mm(i)&&!Im(i)}function Mm(i){return i.startsWith("http:")||i.startsWith("https:")}function Im(i){return i.startsWith("data:")}async function ml(i,e){var t,n;if(typeof i=="string"){const r=mm(i);return Cm(r)&&(t=globalThis.loaders)!=null&&t.fetchNode?(n=globalThis.loaders)==null?void 0:n.fetchNode(r,e):await fetch(r,e)}return await yh(i)}const Tn=new _n({id:"loaders.gl"});class Rm{log(){return()=>{}}info(){return()=>{}}warn(){return()=>{}}error(){return()=>{}}}class Om{constructor(){d(this,"console");this.console=console}log(...e){return this.console.log.bind(this.console,...e)}info(...e){return this.console.info.bind(this.console,...e)}warn(...e){return this.console.warn.bind(this.console,...e)}error(...e){return this.console.error.bind(this.console,...e)}}const No={core:{baseUrl:void 0,fetch:null,mimeType:void 0,fallbackMimeType:void 0,ignoreRegisteredLoaders:void 0,nothrow:!1,log:new Om,useLocalLibraries:!1,CDN:"https://unpkg.com/@loaders.gl",worker:!0,maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:Za,_nodeWorkers:!1,_workerType:"",limit:0,_limitMB:0,batchSize:"auto",batchDebounceMs:0,metadata:!1,transforms:[]}},Bm={baseUri:"core.baseUrl",fetch:"core.fetch",mimeType:"core.mimeType",fallbackMimeType:"core.fallbackMimeType",ignoreRegisteredLoaders:"core.ignoreRegisteredLoaders",nothrow:"core.nothrow",log:"core.log",useLocalLibraries:"core.useLocalLibraries",CDN:"core.CDN",worker:"core.worker",maxConcurrency:"core.maxConcurrency",maxMobileConcurrency:"core.maxMobileConcurrency",reuseWorkers:"core.reuseWorkers",_nodeWorkers:"core.nodeWorkers",_workerType:"core._workerType",_worker:"core._workerType",limit:"core.limit",_limitMB:"core._limitMB",batchSize:"core.batchSize",batchDebounceMs:"core.batchDebounceMs",metadata:"core.metadata",transforms:"core.transforms",throws:"nothrow",dataType:"(no longer used)",uri:"core.baseUrl",method:"core.fetch.method",headers:"core.fetch.headers",body:"core.fetch.body",mode:"core.fetch.mode",credentials:"core.fetch.credentials",cache:"core.fetch.cache",redirect:"core.fetch.redirect",referrer:"core.fetch.referrer",referrerPolicy:"core.fetch.referrerPolicy",integrity:"core.fetch.integrity",keepalive:"core.fetch.keepalive",signal:"core.fetch.signal"},Ja=["baseUrl","fetch","mimeType","fallbackMimeType","ignoreRegisteredLoaders","nothrow","log","useLocalLibraries","CDN","worker","maxConcurrency","maxMobileConcurrency","reuseWorkers","_nodeWorkers","_workerType","limit","_limitMB","batchSize","batchDebounceMs","metadata","transforms"];function vh(){globalThis.loaders=globalThis.loaders||{};const{loaders:i}=globalThis;return i._state||(i._state={}),i._state}function wh(){const i=vh();return i.globalOptions=i.globalOptions||{...No,core:{...No.core}},Mt(i.globalOptions)}function km(i,e,t,n){return t=t||[],t=Array.isArray(t)?t:[t],Dm(i,t),Mt(Nm(e,i,n))}function Mt(i){const e=zm(i);xh(e);for(const t of Ja)e.core&&e.core[t]!==void 0&&delete e[t];return e.core&&e.core._workerType!==void 0&&delete e._worker,e}function Dm(i,e){_l(i,null,No,Bm,e);for(const t of e){const n=i&&i[t.id]||{},r=t.options&&t.options[t.id]||{},s=t.deprecatedOptions&&t.deprecatedOptions[t.id]||{};_l(n,t.id,r,s,e)}}function _l(i,e,t,n,r){const s=e||"Top level",o=e?`${e}.`:"";for(const a in i){const c=!e&&Nt(i[a]),l=a==="baseUri"&&!e,u=a==="workerUrl"&&e;if(!(a in t)&&!l&&!u){if(a in n)Tn.level>0&&Tn.warn(`${s} loader option '${o}${a}' no longer supported, use '${n[a]}'`)();else if(!c&&Tn.level>0){const f=Fm(a,r);Tn.warn(`${s} loader option '${o}${a}' not recognized. ${f}`)()}}}}function Fm(i,e){const t=i.toLowerCase();let n="";for(const r of e)for(const s in r.options){if(i===s)return`Did you mean '${r.id}.${s}'?`;const o=s.toLowerCase();(t.startsWith(o)||o.startsWith(t))&&(n=n||`Did you mean '${r.id}.${s}'?`)}return n}function Nm(i,e,t){var o;const n=i.options||{},r={...n};n.core&&(r.core={...n.core}),xh(r),((o=r.core)==null?void 0:o.log)===null&&(r.core={...r.core,log:new Rm}),bl(r,Mt(wh()));const s=Mt(e);return bl(r,s),Um(r,t),$m(r),r}function bl(i,e){for(const t in e)if(t in e){const n=e[t];al(n)&&al(i[t])?i[t]={...i[t],...e[t]}:i[t]=e[t]}}function Um(i,e){var n;if(!e)return;((n=i.core)==null?void 0:n.baseUrl)!==void 0||(i.core||(i.core={}),i.core.baseUrl=_h(ds(e)))}function zm(i){const e={...i};return i.core&&(e.core={...i.core}),e}function xh(i){i.baseUri!==void 0&&(i.core||(i.core={}),i.core.baseUrl===void 0&&(i.core.baseUrl=i.baseUri));for(const t of Ja)if(i[t]!==void 0){const r=i.core=i.core||{};r[t]===void 0&&(r[t]=i[t])}const e=i._worker;e!==void 0&&(i.core||(i.core={}),i.core._workerType===void 0&&(i.core._workerType=e))}function $m(i){const e=i.core;if(e)for(const t of Ja)e[t]!==void 0&&(i[t]=e[t])}function ec(i){return i?(Array.isArray(i)&&(i=i[0]),Array.isArray(i==null?void 0:i.extensions)):!1}function tc(i){_r(i,"null loader"),_r(ec(i),"invalid loader");let e;return Array.isArray(i)&&(e=i[1],i=i[0],i={...i,options:{...i.options,...e}}),(i!=null&&i.parseTextSync||i!=null&&i.parseText)&&(i.text=!0),i.text||(i.binary=!0),i}const Ph=()=>{const i=vh();return i.loaderRegistry=i.loaderRegistry||[],i.loaderRegistry};function Gm(i){const e=Ph();i=Array.isArray(i)?i:[i];for(const t of i){const n=tc(t);e.find(r=>n===r)||e.unshift(n)}}function Vm(){return Ph()}const jm=/\.([^.]+)$/;async function Wm(i,e=[],t,n){if(!Eh(i))return null;const r=Mt(t||{});if(r.core||(r.core={}),i instanceof Response&&yl(i)){const o=await i.clone().text(),a=An(o,e,{...r,core:{...r.core,nothrow:!0}},n);if(a)return a}let s=An(i,e,{...r,core:{...r.core,nothrow:!0}},n);if(s)return s;if(zt(i)&&(i=await i.slice(0,10).arrayBuffer(),s=An(i,e,r,n)),!s&&i instanceof Response&&yl(i)){const o=await i.clone().text();s=An(o,e,r,n)}if(!s&&!r.core.nothrow)throw new Error(Sh(i));return s}function yl(i){const e=ps(i);return!!(e&&(e.startsWith("text/")||e==="application/json"||e.endsWith("+json")))}function An(i,e=[],t,n){if(!Eh(i))return null;const r=Mt(t||{});if(r.core||(r.core={}),e&&!Array.isArray(e))return tc(e);let s=[];e&&(s=s.concat(e)),r.core.ignoreRegisteredLoaders||s.push(...Vm()),Ym(s);const o=Hm(i,s,r,n);if(!o&&!r.core.nothrow)throw new Error(Sh(i));return o}function Hm(i,e,t,n){var l,u,f,h,g;const r=gs(i),s=ps(i),o=ds(r)||(n==null?void 0:n.url);let a=null,c="";return(l=t==null?void 0:t.core)!=null&&l.mimeType&&(a=ks(e,(u=t==null?void 0:t.core)==null?void 0:u.mimeType),c=`match forced by supplied MIME type ${(f=t==null?void 0:t.core)==null?void 0:f.mimeType}`),a=a||qm(e,o),c=c||(a?`matched url ${o}`:""),a=a||ks(e,s),c=c||(a?`matched MIME type ${s}`:""),a=a||Xm(e,i),c=c||(a?`matched initial data ${Lh(i)}`:""),(h=t==null?void 0:t.core)!=null&&h.fallbackMimeType&&(a=a||ks(e,(g=t==null?void 0:t.core)==null?void 0:g.fallbackMimeType),c=c||(a?`matched fallback MIME type ${s}`:"")),c&&Gp.log(1,`selectLoader selected ${a==null?void 0:a.name}: ${c}.`),a}function Eh(i){return!(i instanceof Response&&i.status===204)}function Sh(i){const e=gs(i),t=ps(i);let n="No valid loader found (";n+=e?`${mh(e)}, `:"no url provided, ",n+=`MIME type: ${t?`"${t}"`:"not provided"}, `;const r=i?Lh(i):"";return n+=r?` first bytes: "${r}"`:"first bytes: not available",n+=")",n}function Ym(i){for(const e of i)tc(e)}function qm(i,e){const t=e&&jm.exec(e),n=t&&t[1];return n?Zm(i,n):null}function Zm(i,e){e=e.toLowerCase();for(const t of i)for(const n of t.extensions)if(n.toLowerCase()===e)return t;return null}function ks(i,e){var t;for(const n of i)if((t=n.mimeTypes)!=null&&t.some(r=>gl(e,r))||gl(e,`application/x.${n.id}`))return n;return null}function Xm(i,e){if(!e)return null;for(const t of i)if(typeof e=="string"){if(Km(e,t))return t}else if(ArrayBuffer.isView(e)){if(vl(e.buffer,e.byteOffset,t))return t}else if(e instanceof ArrayBuffer&&vl(e,0,t))return t;return null}function Km(i,e){return e.testText?e.testText(i):(Array.isArray(e.tests)?e.tests:[e.tests]).some(n=>i.startsWith(n))}function vl(i,e,t){return(Array.isArray(t.tests)?t.tests:[t.tests]).some(r=>Qm(i,e,t,r))}function Qm(i,e,t,n){if(Ka(n))return um(n,i,n.byteLength);switch(typeof n){case"function":return n(ph(i));case"string":const r=Uo(i,e,n.length);return n===r;default:return!1}}function Lh(i,e=5){return typeof i=="string"?i.slice(0,e):ArrayBuffer.isView(i)?Uo(i.buffer,i.byteOffset,e):i instanceof ArrayBuffer?Uo(i,0,e):""}function Uo(i,e,t){if(i.byteLength<e+t)return"";const n=new DataView(i);let r="";for(let s=0;s<t;s++)r+=String.fromCharCode(n.getUint8(e+s));return r}const Jm=256*1024;function*e_(i,e){const t=(e==null?void 0:e.chunkSize)||Jm;let n=0;const r=new TextEncoder;for(;n<i.length;){const s=Math.min(i.length-n,t),o=i.slice(n,n+s);n+=s,yield ph(r.encode(o))}}const t_=256*1024;function*i_(i,e={}){const{chunkSize:t=t_}=e;let n=0;for(;n<i.byteLength;){const r=Math.min(i.byteLength-n,t),s=new ArrayBuffer(r),o=new Uint8Array(i,n,r);new Uint8Array(s).set(o),n+=r,yield s}}const n_=1024*1024;async function*r_(i,e){const t=(e==null?void 0:e.chunkSize)||n_;let n=0;for(;n<i.size;){const r=n+t,s=await i.slice(n,r).arrayBuffer();n=r,yield s}}function wl(i,e){return Za?s_(i,e):o_(i)}async function*s_(i,e){const t=i.getReader();let n;try{for(;;){const r=n||t.read();e!=null&&e._streamReadAhead&&(n=t.read());const{done:s,value:o}=await r;if(s)return;yield Qa(o)}}catch{t.releaseLock()}}async function*o_(i,e){for await(const t of i)yield Qa(t)}function a_(i,e){if(typeof i=="string")return e_(i,e);if(i instanceof ArrayBuffer)return i_(i,e);if(zt(i))return r_(i,e);if(uh(i))return wl(i,e);if(Ut(i)){const t=i.body;if(!t)throw new Error("Readable stream not available on Response");return wl(t,e)}throw new Error("makeIterator")}const Th="Cannot convert supplied data type";function c_(i,e,t){if(e.text&&typeof i=="string")return i;if(gh(i)&&(i=i.buffer),Ka(i)){const n=_m(i);return e.text&&!e.binary?new TextDecoder("utf8").decode(n):Qa(n)}throw new Error(Th)}async function l_(i,e,t){if(typeof i=="string"||Ka(i))return c_(i,e);if(zt(i)&&(i=await yh(i)),Ut(i))return await Sm(i),e.binary?await i.arrayBuffer():await i.text();if(uh(i)&&(i=a_(i,t)),jp(i)||Wp(i))return dm(i);throw new Error(Th)}function Ah(i,e){var s;const t=wh(),n=i||t,r=n.fetch??((s=n.core)==null?void 0:s.fetch);return typeof r=="function"?r:Nt(r)?o=>ml(o,r):e!=null&&e.fetch?e==null?void 0:e.fetch:ml}function u_(i,e,t){if(t)return t;const n={fetch:Ah(e,i),...i};if(n.url){const r=ds(n.url);n.baseUrl=r,n.queryString=xm(n.url),n.filename=mh(r),n.baseUrl=_h(r)}return Array.isArray(n.loaders)||(n.loaders=null),n}function f_(i,e){if(i&&!Array.isArray(i))return i;let t;if(i&&(t=Array.isArray(i)?i:[i]),e&&e.loaders){const n=Array.isArray(e.loaders)?e.loaders:[e.loaders];t=t?[...t,...n]:n}return t&&t.length?t:void 0}async function vr(i,e,t,n){e&&!Array.isArray(e)&&!ec(e)&&(n=void 0,t=e,e=void 0),i=await i,t=t||{};const r=gs(i),o=f_(e,n),a=await Wm(i,o,t);if(!a)return null;const c=km(t,a,o,r);return n=u_({url:r,_parse:vr,loaders:o},c,n||null),await h_(a,i,c,n)}async function h_(i,e,t,n){if(om(i),t=qp(i.options,t),Ut(e)){const{ok:s,redirected:o,status:a,statusText:c,type:l,url:u}=e,f=Object.fromEntries(e.headers.entries());n.response={headers:f,ok:s,redirected:o,status:a,statusText:c,type:l,url:u}}e=await l_(e,i,t);const r=i;if(r.parseTextSync&&typeof e=="string")return r.parseTextSync(e,t,n);if(am(i,t))return await cm(i,e,t,n,vr);if(r.parseText&&typeof e=="string")return await r.parseText(e,t,n);if(r.parse)return await r.parse(e,t,n);throw dt(!r.parseSync),new Error(`${i.id} loader - no parser found and worker is disabled`)}function d_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function g_(i){return Array.isArray(i)?i.length===0||typeof i[0]=="number":!1}function Ch(i){return d_(i)||g_(i)}async function zo(i,e,t,n){var c;let r,s;!Array.isArray(e)&&!ec(e)?(r=[],s=e):(r=e,s=t);const o=Ah(s);let a=i;return typeof i=="string"&&(a=await o(i)),zt(i)&&(a=await o(i)),typeof i=="string"&&((c=Mt(s||{}).core)!=null&&c.baseUrl||(s={...s,core:{...s==null?void 0:s.core,baseUrl:i}})),Array.isArray(r)?await vr(a,r,s):await vr(a,r,s)}const p_="4.5.2";var rh;const m_=(rh=globalThis.loaders)==null?void 0:rh.parseImageNode,$o=typeof Image<"u",Go=typeof ImageBitmap<"u",__=!!m_,Vo=Za?!0:__;function b_(i){switch(i){case"auto":return Go||$o||Vo;case"imagebitmap":return Go;case"image":return $o;case"data":return Vo;default:throw new Error(`@loaders.gl/images: image ${i} not supported in this environment`)}}function y_(){if(Go)return"imagebitmap";if($o)return"image";if(Vo)return"data";throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js")}function v_(i){const e=x_(i);if(!e)throw new Error("Not an image");return e}function w_(i){switch(v_(i)){case"data":return i;case"image":case"imagebitmap":const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)throw new Error("getImageData");return e.width=i.width,e.height=i.height,t.drawImage(i,0,0),t.getImageData(0,0,i.width,i.height);default:throw new Error("getImageData")}}function x_(i){return typeof ImageBitmap<"u"&&i instanceof ImageBitmap?"imagebitmap":typeof Image<"u"&&i instanceof Image?"image":i&&typeof i=="object"&&i.data&&i.width&&i.height?"data":null}const P_=/^data:image\/svg\+xml/,E_=/\.svg((\?|#).*)?$/;function ic(i){return i&&(P_.test(i)||E_.test(i))}function S_(i,e){if(ic(e)){let n=new TextDecoder().decode(i);try{typeof unescape=="function"&&typeof encodeURIComponent=="function"&&(n=unescape(encodeURIComponent(n)))}catch(s){throw new Error(s.message)}return`data:image/svg+xml;base64,${btoa(n)}`}return Mh(i,e)}function Mh(i,e){if(ic(e))throw new Error("SVG cannot be parsed directly to imagebitmap");return new Blob([new Uint8Array(i)])}async function Ih(i,e,t){const n=S_(i,t),r=self.URL||self.webkitURL,s=typeof n!="string"&&r.createObjectURL(n);try{return await L_(s||n,e)}finally{s&&r.revokeObjectURL(s)}}async function L_(i,e){const t=new Image;return t.src=i,e.image&&e.image.decode&&t.decode?(await t.decode(),t):await new Promise((n,r)=>{try{t.onload=()=>n(t),t.onerror=s=>{const o=s instanceof Error?s.message:"error";r(new Error(o))}}catch(s){r(s)}})}let xl=!0;async function T_(i,e,t){let n;ic(t)?n=await Ih(i,e,t):n=Mh(i,t);const r=e&&e.imagebitmap;return await A_(n,r)}async function A_(i,e=null){if((C_(e)||!xl)&&(e=null),e)try{return await createImageBitmap(i,e)}catch(t){console.warn(t),xl=!1}return await createImageBitmap(i)}function C_(i){if(!i)return!0;for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function M_(i){return!B_(i,"ftyp",4)||(i[8]&96)===0?null:I_(i)}function I_(i){switch(R_(i,8,12).replace("\0"," ").trim()){case"avif":case"avis":return{extension:"avif",mimeType:"image/avif"};default:return null}}function R_(i,e,t){return String.fromCharCode(...i.slice(e,t))}function O_(i){return[...i].map(e=>e.charCodeAt(0))}function B_(i,e,t=0){const n=O_(e);for(let r=0;r<n.length;++r)if(n[r]!==i[r+t])return!1;return!0}const Ye=!1,Wi=!0;function Rh(i){const e=bn(i);return D_(e)||U_(e)||F_(e)||N_(e)||k_(e)}function k_(i){const e=new Uint8Array(i instanceof DataView?i.buffer:i),t=M_(e);return t?{mimeType:t.mimeType,width:0,height:0}:null}function D_(i){const e=bn(i);return e.byteLength>=24&&e.getUint32(0,Ye)===2303741511?{mimeType:"image/png",width:e.getUint32(16,Ye),height:e.getUint32(20,Ye)}:null}function F_(i){const e=bn(i);return e.byteLength>=10&&e.getUint32(0,Ye)===1195984440?{mimeType:"image/gif",width:e.getUint16(6,Wi),height:e.getUint16(8,Wi)}:null}function N_(i){const e=bn(i);return e.byteLength>=14&&e.getUint16(0,Ye)===16973&&e.getUint32(2,Wi)===e.byteLength?{mimeType:"image/bmp",width:e.getUint32(18,Wi),height:e.getUint32(22,Wi)}:null}function U_(i){const e=bn(i);if(!(e.byteLength>=3&&e.getUint16(0,Ye)===65496&&e.getUint8(2)===255))return null;const{tableMarkers:n,sofMarkers:r}=z_();let s=2;for(;s+9<e.byteLength;){const o=e.getUint16(s,Ye);if(r.has(o))return{mimeType:"image/jpeg",height:e.getUint16(s+5,Ye),width:e.getUint16(s+7,Ye)};if(!n.has(o))return null;s+=2,s+=e.getUint16(s,Ye)}return null}function z_(){const i=new Set([65499,65476,65484,65501,65534]);for(let t=65504;t<65520;++t)i.add(t);return{tableMarkers:i,sofMarkers:new Set([65472,65473,65474,65475,65477,65478,65479,65481,65482,65483,65485,65486,65487,65502])}}function bn(i){if(i instanceof DataView)return i;if(ArrayBuffer.isView(i))return new DataView(i.buffer);if(i instanceof ArrayBuffer)return new DataView(i);throw new Error("toDataView")}async function $_(i,e){var r;const{mimeType:t}=Rh(i)||{},n=(r=globalThis.loaders)==null?void 0:r.parseImageNode;return _r(n),await n(i,t)}async function G_(i,e,t){e=e||{};const r=(e.image||{}).type||"auto",{url:s}=t||{},o=V_(r);let a;switch(o){case"imagebitmap":a=await T_(i,e,s);break;case"image":a=await Ih(i,e,s);break;case"data":a=await $_(i);break;default:_r(!1)}return r==="data"&&(a=w_(a)),a}function V_(i){switch(i){case"auto":case"data":return y_();default:return b_(i),i}}const j_=["png","jpg","jpeg","gif","webp","bmp","ico","svg","avif"],W_=["image/png","image/jpeg","image/gif","image/webp","image/avif","image/bmp","image/vnd.microsoft.icon","image/svg+xml"],H_={image:{type:"auto",decode:!0}},Y_={dataType:null,batchType:null,id:"image",module:"images",name:"Images",version:p_,mimeTypes:W_,extensions:j_,parse:G_,tests:[i=>!!Rh(new DataView(i))],options:H_},q=new _n({id:"deck"});let jo={};function q_(i){jo=i}function _e(i,e,t,n){q.level>0&&jo[i]&&jo[i].call(null,e,t,n)}function Z_(i){const e=i[0],t=i[i.length-1];return e==="{"&&t==="}"||e==="["&&t==="]"}const X_={dataType:null,batchType:null,id:"JSON",name:"JSON",module:"",version:"",options:{},extensions:["json","geojson"],mimeTypes:["application/json","application/geo+json"],testText:Z_,parseTextSync:JSON.parse};function K_(){const i="9.4.0",e=globalThis.deck&&globalThis.deck.VERSION;if(e&&e!==i)throw new Error(`deck.gl - multiple versions detected: ${e} vs ${i}`);return e||(q.log(1,`deck.gl ${i}`)(),globalThis.deck={...globalThis.deck,VERSION:i,version:i,log:q,_registerLoggers:q_},Gm([X_,[Y_,{imagebitmap:{premultiplyAlpha:"none"}}]])),i}const Q_=K_(),Ae="(?:var<\\s*(uniform|storage(?:\\s*,\\s*[A-Za-z_][A-Za-z0-9_]*)?)\\s*>|var)\\s+([A-Za-z_][A-Za-z0-9_]*)",Ce="\\s*",an=[new RegExp(`@binding\\(\\s*(auto|\\d+)\\s*\\)${Ce}@group\\(\\s*(\\d+)\\s*\\)${Ce}${Ae}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)${Ce}@binding\\(\\s*(auto|\\d+)\\s*\\)${Ce}${Ae}`,"g")],Wo=[new RegExp(`@binding\\(\\s*(auto|\\d+)\\s*\\)${Ce}@group\\(\\s*(\\d+)\\s*\\)${Ce}${Ae}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)${Ce}@binding\\(\\s*(auto|\\d+)\\s*\\)${Ce}${Ae}`,"g")],J_=[new RegExp(`@binding\\(\\s*(\\d+)\\s*\\)${Ce}@group\\(\\s*(\\d+)\\s*\\)${Ce}${Ae}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)${Ce}@binding\\(\\s*(\\d+)\\s*\\)${Ce}${Ae}`,"g")],eb=[new RegExp(`@binding\\(\\s*(auto)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)\\s*${Ae}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(auto)\\s*\\)\\s*${Ae}`,"g"),new RegExp(`@binding\\(\\s*(auto)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)(?:[\\s\\n\\r]*@[A-Za-z_][^\\n\\r]*)*[\\s\\n\\r]*${Ae}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(auto)\\s*\\)(?:[\\s\\n\\r]*@[A-Za-z_][^\\n\\r]*)*[\\s\\n\\r]*${Ae}`,"g")];function ms(i){const e=i.split("");let t=0,n=0,r=!1,s=!1,o=!1;for(;t<i.length;){const a=i[t],c=i[t+1];if(s){o?o=!1:a==="\\"?o=!0:a==='"'&&(s=!1),t++;continue}if(r){a===`
`||a==="\r"?r=!1:e[t]=" ",t++;continue}if(n>0){if(a==="/"&&c==="*"){e[t]=" ",e[t+1]=" ",n++,t+=2;continue}if(a==="*"&&c==="/"){e[t]=" ",e[t+1]=" ",n--,t+=2;continue}a!==`
`&&a!=="\r"&&(e[t]=" "),t++;continue}if(a==='"'){s=!0,t++;continue}if(a==="/"&&c==="/"){e[t]=" ",e[t+1]=" ",r=!0,t+=2;continue}if(a==="/"&&c==="*"){e[t]=" ",e[t+1]=" ",n=1,t+=2;continue}t++}return e.join("")}function vi(i,e){var r;const t=ms(i),n=[];for(const s of e){s.lastIndex=0;let o;for(o=s.exec(t);o;){const a=s===e[0],c=o.index,l=o[0].length;n.push({match:i.slice(c,c+l),index:c,length:l,bindingToken:o[a?1:2],groupToken:o[a?2:1],accessDeclaration:(r=o[3])==null?void 0:r.trim(),name:o[4]}),o=s.exec(t)}}return n.sort((s,o)=>s.index-o.index)}function Oh(i,e,t){const n=vi(i,e);if(!n.length)return i;let r="",s=0;for(const o of n)r+=i.slice(s,o.index),r+=t(o),s=o.index+o.length;return r+=i.slice(s),r}function Bh(i){return/@binding\(\s*auto\s*\)/.test(ms(i))}function tb(i,e){return vi(i,e===an||e===Wo?eb:e).find(n=>n.bindingToken==="auto")}function kh(i,e={}){const t=Dh(i),n=ib(t);if(!n)return null;const r=nb(t,n);if(!r)return null;const s=sb(t,n,r);if(!s)return null;if(e.scanVertexAttributes===!1)return{attributes:[],bindings:s};const o=rb(t,n);if(!o)return null;const a=ub(t,n,r,o,e.vertexEntryPoint);return a?{attributes:a,bindings:s}:null}function Dh(i){const e=ms(i),t=/[A-Za-z_][A-Za-z0-9_]*|(?:0[xX][0-9A-Fa-f]+|\d+)|[@(){}<>\[\]:,;=]/g,n=[];let r=t.exec(e);for(;r;)n.push({value:r[0],index:r.index}),r=t.exec(e);return n}function ib(i){const e=[];let t=0;for(const n of i){if(n.value==="}"&&t===0)return null;e.push(t),n.value==="{"?t++:n.value==="}"&&t--}return t===0?e:null}function nb(i,e){var n,r;const t=new Map;for(let s=0;s<i.length;s++){if(e[s]!==0||i[s].value!=="alias")continue;const o=(n=i[s+1])==null?void 0:n.value;if(!yn(o)||((r=i[s+2])==null?void 0:r.value)!=="="||t.has(o))return null;const a=Uh(i,e,s+3,";");if(a<0||a===s+3)return null;t.set(o,wr(i.slice(s+3,a))),s=a}return t}function rb(i,e){var n,r;const t=new Map;for(let s=0;s<i.length;s++){if(e[s]!==0||i[s].value!=="struct")continue;const o=(n=i[s+1])==null?void 0:n.value,a=s+2;if(!yn(o)||t.has(o)||((r=i[a])==null?void 0:r.value)!=="{")return null;const c=rc(i,a,"{","}");if(c<0)return null;t.set(o,i.slice(a+1,c)),s=c}return t}function sb(i,e,t){var o,a,c;const n=[],r=new Set,s=new Set;for(let l=0;l<i.length;l++){if(e[l]!==0||i[l].value!=="var")continue;const u=zh(i,e,l),f=i.slice(u,l),h=Ho(f,"group"),g=Ho(f,"binding");if(h===null||g===null||h===void 0!=(g===void 0))return null;if(h===void 0||g===void 0)continue;let p=l+1,m=[];if(((o=i[p])==null?void 0:o.value)==="<"){const S=rc(i,p,"<",">");if(S<0)return null;const L=_s(i.slice(p+1,S),",");if(!L)return null;m=L.map(wr),p=S+1}const _=(a=i[p])==null?void 0:a.value;if(!yn(_)||((c=i[p+1])==null?void 0:c.value)!==":")return null;const y=Uh(i,e,p+2,";");if(y<0||y===p+2)return null;const w=nc(wr(i.slice(p+2,y)),t);if(!w)return null;const b=ob({name:_,group:h,location:g,addressSpace:m,resourceType:w}),x=`${h}:${g}`;if(!b||r.has(x)||s.has(_))return null;n.push(b),r.add(x),s.add(_),l=y}return lb(n),n.sort((l,u)=>l.group-u.group||l.location-u.location||l.name.localeCompare(u.name))}function ob(i){const{name:e,group:t,location:n,addressSpace:r,resourceType:s}=i,o={name:e,group:t,location:n};if(r[0]==="uniform"&&r.length===1)return{...o,type:"uniform"};if(r[0]==="storage"&&r.length<=2){const a=r[1]||"read";return a==="read"?{...o,type:"read-only-storage"}:a==="read_write"?{...o,type:"storage"}:null}return r.length>0?null:s==="sampler"||s==="sampler_comparison"?{...o,type:"sampler",...s==="sampler_comparison"?{samplerType:"comparison"}:{}}:s==="texture_external"?{...o,type:"external-texture"}:ab(o,s)||cb(o,s)}function ab(i,e){const t=/^texture_storage_(1d|2d|2d_array|3d)<([A-Za-z0-9_]+),(read|write|read_write)>$/.exec(e);if(!t)return null;const n={read:"read-only",write:"write-only",read_write:"read-write"}[t[3]];return{...i,type:"storage",format:t[2],access:n,viewDimension:Yo(t[1])}}function cb(i,e){const t=/^texture_(multisampled_)?(1d|2d|2d_array|cube|cube_array|3d)<(f32|i32|u32)>$/.exec(e);if(t){if(t[1]&&t[2]!=="2d")return null;const r={f32:"float",i32:"sint",u32:"uint"}[t[3]];return{...i,type:"texture",viewDimension:Yo(t[2]),sampleType:r,multisampled:!!t[1]}}const n=/^texture_depth_(multisampled_)?(2d|2d_array|cube|cube_array)$/.exec(e);return!n||n[1]&&n[2]!=="2d"?null:{...i,type:"texture",viewDimension:Yo(n[2]),sampleType:"depth",multisampled:!!n[1]}}function lb(i){for(const e of i){if(e.type!=="sampler"||e.samplerType||!e.name.endsWith("Sampler"))continue;const t=e.name.slice(0,-7),n=i.find(r=>r.type==="texture"&&r.name===t&&r.group===e.group);(n==null?void 0:n.sampleType)==="depth"&&(e.samplerType="non-filtering")}}function ub(i,e,t,n,r){const s=fb(i,e);if(!s)return null;const o=s.filter(g=>g.vertex),a=r?o.find(g=>g.name===r):o.length===1?o[0]:void 0;if(!a)return o.length===0&&!r?[]:null;const c=_s(a.parameters,",");if(!c)return null;const l=[],u=new Set,f=new Set,h=new Set;for(const g of c)if(g.length>0&&!Fh({declaration:g,aliases:t,structures:n,attributes:l,attributeLocations:u,attributeNames:f,visitedStructures:h}))return null;return l.sort((g,p)=>g.location-p.location||g.name.localeCompare(p.name))}function fb(i,e){var r,s;const t=[],n=new Set;for(let o=0;o<i.length;o++){if(e[o]!==0||i[o].value!=="fn")continue;const a=(r=i[o+1])==null?void 0:r.value,c=o+2;if(!yn(a)||n.has(a)||((s=i[c])==null?void 0:s.value)!=="(")return null;const l=rc(i,c,"(",")");if(l<0)return null;const u=zh(i,e,o);t.push({name:a,vertex:Nh(i.slice(u,o),"vertex"),parameters:i.slice(c+1,l)}),n.add(a),o=l}return t}function Fh(i){const{declaration:e,aliases:t,structures:n,attributes:r,attributeLocations:s,attributeNames:o,visitedStructures:a}=i,c=gb(e,":");if(c<1||c===e.length-1)return!1;const l=pb(e.slice(0,c)),u=Ho(e.slice(0,c),"location"),f=Nh(e.slice(0,c),"builtin"),h=nc(wr(e.slice(c+1)),t);if(!l||u===null||!h||u!==void 0&&f)return!1;if(u!==void 0){const m=db(h);return!m||s.has(u)||o.has(l)?!1:(r.push({name:l,location:u,type:m}),s.add(u),o.add(l),!0)}if(f)return!0;const g=n.get(h);if(!g||a.has(h))return!1;const p=_s(g,",");if(!p)return!1;a.add(h);for(const m of p)if(m.length>0&&!Fh({...i,declaration:m}))return!1;return a.delete(h),!0}function nc(i,e,t=new Set){const n=Dh(i);let r="";for(const s of n){const o=e.get(s.value);if(!o){r+=hb(s.value);continue}if(t.has(s.value))return null;const a=new Set(t);a.add(s.value);const c=nc(o,e,a);if(!c)return null;r+=c}return r}function hb(i){const e=/^(vec[234]|mat[234]x[234])([fiuh])$/.exec(i);if(!e)return i;const t={f:"f32",i:"i32",u:"u32",h:"f16"}[e[2]];return`${e[1]}<${t}>`}function db(i){return/^(?:i32|u32|f32|f16|vec[234]<(?:i32|u32|f32|f16)>)$/.test(i)?i:null}function Ho(i,e){var n,r,s,o;let t;for(let a=0;a<i.length;a++)if(!(i[a].value!=="@"||((n=i[a+1])==null?void 0:n.value)!==e)){if(t!==void 0||((r=i[a+2])==null?void 0:r.value)!=="("||!/^\d+$/.test(((s=i[a+3])==null?void 0:s.value)||"")||((o=i[a+4])==null?void 0:o.value)!==")")return null;t=Number(i[a+3].value)}return t}function Nh(i,e){return i.some((t,n)=>{var r;return t.value==="@"&&((r=i[n+1])==null?void 0:r.value)===e})}function Yo(i){return i.replace("_","-")}function rc(i,e,t,n){let r=0;for(let s=e;s<i.length;s++)if(i[s].value===t)r++;else if(i[s].value===n&&--r===0)return s;return-1}function _s(i,e){const t=[];let n=0;const r={"(":0,"<":0,"[":0,"{":0},s=Object.keys(r),o={")":"(",">":"<","]":"[","}":"{"};for(let a=0;a<i.length;a++){const c=i[a].value;if(c===e&&s.every(l=>r[l]===0)){t.push(i.slice(n,a)),n=a+1;continue}if(c in r)r[c]++;else if(c in o){const l=o[c];if(r[l]--,r[l]<0)return null}}return s.every(a=>r[a]===0)?(t.push(i.slice(n)),t):null}function gb(i,e){const t=_s(i,e);return t&&t.length===2?t[0].length:-1}function Uh(i,e,t,n){for(let r=t;r<i.length;r++)if(e[r]===0&&i[r].value===n)return r;return-1}function zh(i,e,t){for(let n=t-1;n>=0;n--)if(i[n].value===";"&&e[n]===0||i[n].value==="}"&&e[n]===1)return n+1;return 0}function pb(i){for(let e=i.length-1;e>=0;e--)if(yn(i[e].value))return i[e].value;return null}function wr(i){return i.map(e=>e.value).join("")}function yn(i){return!!(i&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(i))}function wi(i,e){var t;if(!i){const n=new Error(e||"shadertools: assertion failed.");throw(t=Error.captureStackTrace)==null||t.call(Error,n,wi),n}}const Ds={number:{type:"number",validate(i,e){return Number.isFinite(i)&&typeof e=="object"&&(e.max===void 0||i<=e.max)&&(e.min===void 0||i>=e.min)}},array:{type:"array",validate(i,e){return Array.isArray(i)||ArrayBuffer.isView(i)}}};function mb(i){const e={};for(const[t,n]of Object.entries(i))e[t]=_b(n);return e}function _b(i){let e=Pl(i);if(e!=="object")return{value:i,...Ds[e],type:e};if(typeof i=="object")return i?i.type!==void 0?{...i,...Ds[i.type],type:i.type}:i.value===void 0?{type:"object",value:i}:(e=Pl(i.value),{...i,...Ds[e],type:e}):{type:"object",value:null};throw new Error("props")}function Pl(i){return Array.isArray(i)||ArrayBuffer.isView(i)?"array":typeof i}const bb=`#ifdef MODULE_LOGDEPTH
  logdepth_adjustPosition(gl_Position);
#endif
`,yb=`#ifdef MODULE_MATERIAL
  fragColor = material_filterColor(fragColor);
#endif

#ifdef MODULE_LIGHTING
  fragColor = lighting_filterColor(fragColor);
#endif

#ifdef MODULE_FOG
  fragColor = fog_filterColor(fragColor);
#endif

#ifdef MODULE_PICKING
  fragColor = picking_filterHighlightColor(fragColor);
  fragColor = picking_filterPickingColor(fragColor);
#endif

#ifdef MODULE_LOGDEPTH
  logdepth_setFragDepth();
#endif
`,vb={vertex:bb,fragment:yb},El=/void\s+main\s*\([^)]*\)\s*\{\n?/,Sl=/}\n?[^{}]*$/,Fs=[],er="__LUMA_INJECT_DECLARATIONS__";function wb(i){const e={vertex:{},fragment:{}};for(const t in i){let n=i[t];const r=xb(t);typeof n=="string"&&(n={order:0,injection:n}),e[r][t]=n}return e}function xb(i){const e=i.slice(0,2);switch(e){case"vs":return"vertex";case"fs":return"fragment";default:throw new Error(e)}}function xr(i,e,t,n=!1,r="glsl",s={}){const o=e==="vertex";for(const a in t){const c=t[a];c.sort((u,f)=>u.order-f.order),Fs.length=c.length;for(let u=0,f=c.length;u<f;++u)Fs[u]=c[u].injection;const l=`${Fs.join(`
`)}
`;switch(a){case"vs:#decl":(r==="wgsl"||o)&&(i=i.replace(er,l));break;case"vs:#main-start":(r==="wgsl"||o)&&(i=r==="wgsl"?Cn(i,"vertex",l,"start",s.vertex):i.replace(El,u=>u+l));break;case"vs:#main-end":(r==="wgsl"||o)&&(i=r==="wgsl"?Cn(i,"vertex",l,"end",s.vertex):i.replace(Sl,u=>l+u));break;case"fs:#decl":(r==="wgsl"||!o)&&(i=i.replace(er,l));break;case"fs:#main-start":(r==="wgsl"||!o)&&(i=r==="wgsl"?Cn(i,"fragment",l,"start",s.fragment):i.replace(El,u=>u+l));break;case"fs:#main-end":(r==="wgsl"||!o)&&(i=r==="wgsl"?Cn(i,"fragment",l,"end",s.fragment):i.replace(Sl,u=>l+u));break;default:i=i.replace(a,u=>u+l)}}return i=i.replace(er,""),n&&(i=i.replace(/\}\s*$/,a=>a+vb[e])),i}function Cn(i,e,t,n,r){const s=Pb(i,e,r);if(!s)return i;if(n==="start"){const o=s.openBraceIndex+1;return`${i.slice(0,o)}
${t}${i.slice(o)}`}return`${i.slice(0,s.closeBraceIndex)}${t}${i.slice(s.closeBraceIndex)}`}function Pb(i,e,t){const n=e==="vertex"?"@vertex":"@fragment",r=i.indexOf(n);if(r<0)return null;const s=t?i.search(new RegExp(`\\bfn\\s+${Eb(t)}\\s*\\(`)):i.indexOf("fn",r);if(s<0)return null;const o=i.indexOf("{",s);if(o<0)return null;let a=0;for(let c=o;c<i.length;c++){const l=i[c];if(l==="{")a++;else if(l==="}"&&(a--,a===0))return{openBraceIndex:o,closeBraceIndex:c}}return null}function Eb(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Pr(i){i.map(e=>Sb(e))}function Sb(i){if(i.instance)return;Pr(i.dependencies||[]);const{propTypes:e={},deprecations:t=[],inject:n={}}=i,r={normalizedInjections:wb(n),parsedDeprecations:Lb(t)};e&&(r.propValidators=mb(e)),i.instance=r;let s={};e&&(s=Object.entries(e).reduce((o,[a,c])=>{const l=c==null?void 0:c.value;return l&&(o[a]=l),o},{})),i.defaultUniforms={...i.defaultUniforms,...s}}function $h(i,e,t){var n;(n=i.deprecations)==null||n.forEach(r=>{var s;(s=r.regex)!=null&&s.test(e)&&(r.deprecated?t.deprecated(r.old,r.new)():t.removed(r.old,r.new)())})}function Lb(i){return i.forEach(e=>{switch(e.type){case"function":e.regex=new RegExp(`\\b${e.old}\\(`);break;default:e.regex=new RegExp(`${e.type} ${e.old};`)}}),i}function Er(i){Pr(i);const e={},t={};Gh({modules:i,level:0,moduleMap:e,moduleDepth:t});const n=Object.keys(t).sort((r,s)=>t[s]-t[r]).map(r=>e[r]);return Pr(n),n}function Gh(i){const{modules:e,level:t,moduleMap:n,moduleDepth:r}=i;if(t>=5)throw new Error("Possible loop in shader dependency graph");for(const s of e)n[s.name]=s,(r[s.name]===void 0||r[s.name]<t)&&(r[s.name]=t);for(const s of e)s.dependencies&&Gh({modules:s.dependencies,level:t+1,moduleMap:n,moduleDepth:r})}const T=new _n({id:"luma.gl"}),Vh={id:null,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1,featureLevel:void 0,optionalFeatures:[],xrCompatible:!1,createCanvasContext:void 0,webgl:{},onError:(i,e)=>{},onResize:(i,e)=>{const[t,n]=i.getDevicePixelSize();T.log(1,`${i} resized => ${t}x${n}px`)()},onPositionChange:(i,e)=>{const[t,n]=i.getPosition();T.log(1,`${i} repositioned => ${t},${n}`)()},onVisibilityChange:i=>T.log(1,`${i} Visibility changed ${i.isVisible}`)(),onDevicePixelRatioChange:(i,e)=>T.log(1,`${i} DPR changed ${e.oldRatio} => ${i.devicePixelRatio}`)(),debug:Ab(),debugGPUTime:!1,debugShaders:T.get("debug-shaders")||void 0,debugFramebuffers:!!T.get("debug-framebuffers"),debugFactories:!!T.get("debug-factories"),debugWebGL:!!T.get("debug-webgl"),debugSpectorJS:void 0,debugSpectorJSUrl:void 0,_reuseDevices:!1,_cacheShaders:!0,_destroyShaders:!1,_cachePipelines:!0,_sharePipelines:!0,_destroyPipelines:!1,_initializeFeatures:!0,_disabledFeatures:{"compilation-status-async-webgl":!0},_handle:void 0};function Tb(i,e){return i!=null?!!i:e!==void 0?e!=="production":!1}function Ab(){return Tb(T.get("debug"),Cb())}function Cb(){const i=globalThis.process;if(i!=null&&i.env)return i.env.NODE_ENV}const Mb="GPU Time and Memory",Ib=["Adapter","GPU","GPU Type","GPU Backend","Frame Rate","CPU Time","GPU Time","GPU Memory","Buffer Memory","Texture Memory","External Buffer Memory","External Texture Memory","Swap Chain Texture"],Ll=new WeakMap,Tl=new WeakMap;class Rb{constructor(){d(this,"stats",new Map)}getStats(e){return this.get(e)}get(e){this.stats.has(e)||this.stats.set(e,new hs({id:e}));const t=this.stats.get(e);return e===Mb&&Ob(t,Ib),t}}const jh=new Rb;function Ob(i,e){const t=i.stats;let n=!1;for(const c of e)t[c]||(i.get(c),n=!0);const r=Object.keys(t).length,s=Ll.get(i);if(!n&&(s==null?void 0:s.orderedStatNames)===e&&s.statCount===r)return;const o={};let a=Tl.get(e);a||(a=new Set(e),Tl.set(e,a));for(const c of e)t[c]&&(o[c]=t[c]);for(const[c,l]of Object.entries(t))a.has(c)||(o[c]=l);for(const c of Object.keys(t))delete t[c];Object.assign(t,o),Ll.set(i,{orderedStatNames:e,statCount:r})}const Bb="set luma.log.level=1 (or higher) to trace rendering",Al="No matching device found. Ensure `@luma.gl/webgl` and/or `@luma.gl/webgpu` modules are imported.",tn=class tn{constructor(){d(this,"stats",jh);d(this,"log",T);d(this,"VERSION","9.4.2");d(this,"spector");d(this,"preregisteredAdapters",new Map);if(globalThis.luma){if(globalThis.luma.VERSION!==this.VERSION)throw T.error(`Found luma.gl ${globalThis.luma.VERSION} while initialzing ${this.VERSION}`)(),T.error("'yarn why @luma.gl/core' can help identify the source of the conflict")(),new Error("luma.gl - multiple versions detected: see console log");T.error("This version of luma.gl has already been initialized")()}T.log(1,`${this.VERSION} - ${Bb}`)(),globalThis.luma=this}async createDevice(e={}){const t={...tn.defaultProps,...e},n=this.selectAdapter(t.type,t.adapters);if(!n)throw new Error(Al);return t.waitForPageLoad&&await n.pageLoaded,await n.create(t)}async attachDevice(e,t){var s;const n=this._getTypeFromHandle(e,t.adapters),r=n&&this.selectAdapter(n,t.adapters);if(!r)throw new Error(Al);return await((s=r==null?void 0:r.attach)==null?void 0:s.call(r,e,t))}registerAdapters(e){for(const t of e)this.preregisteredAdapters.set(t.type,t)}getSupportedAdapters(e=[]){const t=this._getAdapterMap(e);return Array.from(t).map(([,n])=>n).filter(n=>{var r;return(r=n.isSupported)==null?void 0:r.call(n)}).map(n=>n.type)}getBestAvailableAdapterType(e=[]){var r,s;const t=["webgpu","webgl","null"],n=this._getAdapterMap(e);for(const o of t)if((s=(r=n.get(o))==null?void 0:r.isSupported)!=null&&s.call(r))return o;return null}selectAdapter(e,t=[]){let n=e;e==="best-available"&&(n=this.getBestAvailableAdapterType(t));const r=this._getAdapterMap(t);return n&&r.get(n)||null}enforceWebGL2(e=!0,t=[]){var s;const r=this._getAdapterMap(t).get("webgl");r||T.warn("enforceWebGL2: webgl adapter not found")(),(s=r==null?void 0:r.enforceWebGL2)==null||s.call(r,e)}setDefaultDeviceProps(e){Object.assign(tn.defaultProps,e)}_getAdapterMap(e=[]){const t=new Map(this.preregisteredAdapters);for(const n of e)t.set(n.type,n);return t}_getTypeFromHandle(e,t=[]){return e instanceof WebGL2RenderingContext?"webgl":typeof GPUDevice<"u"&&e instanceof GPUDevice||e!=null&&e.queue?"webgpu":e===null?"null":(e instanceof WebGLRenderingContext?T.warn("WebGL1 is not supported",e)():T.warn("Unknown handle type",e)(),null)}};d(tn,"defaultProps",{...Vh,type:"best-available",adapters:void 0,waitForPageLoad:!0});let qo=tn;const Zo=new qo;class kb{get pageLoaded(){return Nb()}}const Db=yi()&&typeof document<"u",Fb=()=>Db&&document.readyState==="complete";let Mn=null;function Nb(){return Mn||(Fb()||typeof window>"u"?Mn=Promise.resolve():Mn=new Promise(i=>window.addEventListener("load",()=>i()))),Mn}const Ns={};function vn(i="id"){Ns[i]=Ns[i]||1;const e=Ns[i]++;return`${i}-${e}`}const Ub="cpu-hotspot-profiler",Cl="GPU Resource Counts",Ml="Resource Counts",Il="GPU Time and Memory",zb=["Resources","Buffers","Textures","Samplers","TextureViews","Framebuffers","QuerySets","Shaders","RenderPipelines","ComputePipelines","PipelineLayouts","VertexArrays","RenderPasss","RenderBundleEncoders","RenderBundles","ComputePasss","CommandEncoders","CommandBuffers"],$b=["Resources","Buffers","Textures","Samplers","TextureViews","Framebuffers","QuerySets","Shaders","RenderPipelines","SharedRenderPipelines","ComputePipelines","PipelineLayouts","VertexArrays","RenderPasss","RenderBundleEncoders","RenderBundles","ComputePasss","CommandEncoders","CommandBuffers"],Gb=zb.flatMap(i=>[`${i} Created`,`${i} Active`]),Vb=$b.flatMap(i=>[`${i} Created`,`${i} Active`]),Rl=new WeakMap,Ol=new WeakMap;var ko;let H=(ko=class{constructor(e,t,n){d(this,"id");d(this,"props");d(this,"userData",{});d(this,"_device");d(this,"destroyed",!1);d(this,"allocatedBytes",0);d(this,"allocatedBytesName",null);d(this,"_attachedResources",new Set);if(!e)throw new Error("no device");this._device=e,this.props=jb(t,n);const r=this.props.id!=="undefined"?this.props.id:vn(this[Symbol.toStringTag]);this.props.id=r,this.id=r,this.userData=this.props.userData||{},this.addStats()}toString(){return`${this[Symbol.toStringTag]||this.constructor.name}:"${this.id}"`}toJSON(){return this.toString()}get ownsHandle(){return(this.props.handle===void 0||this.props.handle===null)&&!this.isHandleBorrowed}get isHandleBorrowed(){return!!this.props._isHandleBorrowed}destroy(){this.destroyed||this.destroyResource()}delete(){return this.destroy(),this}getProps(){return this.props}attachResource(e){this._attachedResources.add(e)}detachResource(e){this._attachedResources.delete(e)}destroyAttachedResource(e){this._attachedResources.delete(e)&&e.destroy()}destroyAttachedResources(){for(const e of this._attachedResources)e.destroy();this._attachedResources=new Set}destroyResource(){this.destroyed||(this.destroyAttachedResources(),this.removeStats(),this.destroyed=!0)}removeStats(){const e=zi(this._device),t=e?rt():0,n=[this._device.statsManager.getStats(Cl),this._device.statsManager.getStats(Ml)],r=kl(this._device);for(const o of n)Bl(o,r);const s=this.getStatsName();for(const o of n)o.get("Resources Active").decrementCount(),o.get(`${s}s Active`).decrementCount();e&&(e.statsBookkeepingCalls=(e.statsBookkeepingCalls||0)+1,e.statsBookkeepingTimeMs=(e.statsBookkeepingTimeMs||0)+(rt()-t))}trackAllocatedMemory(e,t=this.getStatsName()){const n=zi(this._device),r=n?rt():0,s=this._device.statsManager.getStats(Il);this.allocatedBytes>0&&this.allocatedBytesName&&(s.get("GPU Memory").subtractCount(this.allocatedBytes),s.get(`${this.allocatedBytesName} Memory`).subtractCount(this.allocatedBytes)),s.get("GPU Memory").addCount(e),s.get(`${t} Memory`).addCount(e),n&&(n.statsBookkeepingCalls=(n.statsBookkeepingCalls||0)+1,n.statsBookkeepingTimeMs=(n.statsBookkeepingTimeMs||0)+(rt()-r)),this.allocatedBytes=e,this.allocatedBytesName=t}trackReferencedMemory(e,t=this.getStatsName()){this.trackAllocatedMemory(e,`External ${t}`)}trackDeallocatedMemory(e=this.getStatsName()){if(this.allocatedBytes===0){this.allocatedBytesName=null;return}const t=zi(this._device),n=t?rt():0,r=this._device.statsManager.getStats(Il);r.get("GPU Memory").subtractCount(this.allocatedBytes),r.get(`${this.allocatedBytesName||e} Memory`).subtractCount(this.allocatedBytes),t&&(t.statsBookkeepingCalls=(t.statsBookkeepingCalls||0)+1,t.statsBookkeepingTimeMs=(t.statsBookkeepingTimeMs||0)+(rt()-n)),this.allocatedBytes=0,this.allocatedBytesName=null}trackDeallocatedReferencedMemory(e=this.getStatsName()){this.trackDeallocatedMemory(`Referenced ${e}`)}addStats(){const e=this.getStatsName(),t=zi(this._device),n=t?rt():0,r=[this._device.statsManager.getStats(Cl),this._device.statsManager.getStats(Ml)],s=kl(this._device);for(const o of r)Bl(o,s);for(const o of r)o.get("Resources Created").incrementCount(),o.get("Resources Active").incrementCount(),o.get(`${e}s Created`).incrementCount(),o.get(`${e}s Active`).incrementCount();t&&(t.statsBookkeepingCalls=(t.statsBookkeepingCalls||0)+1,t.statsBookkeepingTimeMs=(t.statsBookkeepingTimeMs||0)+(rt()-n)),Wb(this._device,e)}getStatsName(){return Hb(this)}},d(ko,"defaultProps",{id:"undefined",handle:void 0,_isHandleBorrowed:!1,userData:void 0}),ko);function jb(i,e){const t={...e};for(const n in i)i[n]!==void 0&&(t[n]=i[n]);return t}function Bl(i,e){const t=i.stats;let n=!1;for(const c of e)t[c]||(i.get(c),n=!0);const r=Object.keys(t).length,s=Rl.get(i);if(!n&&(s==null?void 0:s.orderedStatNames)===e&&s.statCount===r)return;const o={};let a=Ol.get(e);a||(a=new Set(e),Ol.set(e,a));for(const c of e)t[c]&&(o[c]=t[c]);for(const[c,l]of Object.entries(t))a.has(c)||(o[c]=l);for(const c of Object.keys(t))delete t[c];Object.assign(t,o),Rl.set(i,{orderedStatNames:e,statCount:r})}function kl(i){return i.type==="webgl"?Vb:Gb}function zi(i){const e=i.userData[Ub];return e!=null&&e.enabled?e:null}function rt(){var i,e;return((e=(i=globalThis.performance)==null?void 0:i.now)==null?void 0:e.call(i))??Date.now()}function Wb(i,e){const t=zi(i);if(!(!t||!t.activeDefaultFramebufferAcquireDepth))switch(t.transientCanvasResourceCreates=(t.transientCanvasResourceCreates||0)+1,e){case"Texture":t.transientCanvasTextureCreates=(t.transientCanvasTextureCreates||0)+1;break;case"TextureView":t.transientCanvasTextureViewCreates=(t.transientCanvasTextureViewCreates||0)+1;break;case"Sampler":t.transientCanvasSamplerCreates=(t.transientCanvasSamplerCreates||0)+1;break;case"Framebuffer":t.transientCanvasFramebufferCreates=(t.transientCanvasFramebufferCreates||0)+1;break}}function Hb(i){let e=Object.getPrototypeOf(i);for(;e;){const t=Object.getPrototypeOf(e);if(!t||t===H.prototype)return Yb(e)||i[Symbol.toStringTag]||i.constructor.name;e=t}return i[Symbol.toStringTag]||i.constructor.name}function Yb(i){const e=Object.getOwnPropertyDescriptor(i,Symbol.toStringTag);return typeof(e==null?void 0:e.get)=="function"?e.get.call(i):typeof(e==null?void 0:e.value)=="string"?e.value:null}const de=class de extends H{constructor(t,n){const r={...n};(n.usage||0)&de.INDEX&&!n.indexType&&(n.data instanceof Uint32Array?r.indexType="uint32":n.data instanceof Uint16Array?r.indexType="uint16":n.data instanceof Uint8Array&&(r.indexType="uint8")),delete r.data;super(t,r,de.defaultProps);d(this,"usage");d(this,"indexType");d(this,"updateTimestamp");d(this,"debugData",new ArrayBuffer(0));this.usage=r.usage||0,this.indexType=r.indexType,this.updateTimestamp=t.incrementTimestamp()}get[Symbol.toStringTag](){return"Buffer"}clone(t){return this.device.createBuffer({...this.props,...t})}_setDebugData(t,n,r){if(!this.device.props.debug)return;let s=null,o;ArrayBuffer.isView(t)?(s=t,o=t.buffer):o=t;const a=Math.min(t?t.byteLength:r,de.DEBUG_DATA_MAX_LENGTH);if(o===null)this.debugData=new ArrayBuffer(a);else{const c=Math.min((s==null?void 0:s.byteOffset)||0,o.byteLength),l=Math.max(0,o.byteLength-c),u=Math.min(a,l);this.debugData=new Uint8Array(o,c,u).slice().buffer}}};d(de,"INDEX",16),d(de,"VERTEX",32),d(de,"UNIFORM",64),d(de,"STORAGE",128),d(de,"INDIRECT",256),d(de,"QUERY_RESOLVE",512),d(de,"MAP_READ",1),d(de,"MAP_WRITE",2),d(de,"COPY_SRC",4),d(de,"COPY_DST",8),d(de,"DEBUG_DATA_MAX_LENGTH",32),d(de,"defaultProps",{...H.defaultProps,handle:void 0,usage:0,byteLength:0,byteOffset:0,data:null,indexType:"uint16",onMapped:void 0});let j=de;const Xo=globalThis.Float16Array;function qb(){return Xo??Uint16Array}function Zb(i){return!!(Xo&&i===Xo)}function Xb(i){const e=i.includes("norm"),t=!e&&!i.startsWith("float"),n=i.startsWith("s"),r=oc[i],[s,o,a]=r||["uint8 ","i32",1];return{signedType:s,primitiveType:o,byteLength:a,normalized:e,integer:t,signed:n}}function Kb(i){const e=i;switch(e){case"uint8":return"unorm8";case"sint8":return"snorm8";case"uint16":return"unorm16";case"sint16":return"snorm16";default:return e}}function qe(i,e){switch(e){case 1:return i;case 2:return i+i%2;default:return i+(4-i%4)%4}}function Wh(i){const e=ArrayBuffer.isView(i)?i.constructor:i;if(Zb(e))return"float16";if(e===Uint8ClampedArray)return"uint8";const t=Object.values(oc).find(n=>e===n[4]);if(!t)throw new Error(e.name);return t[0]}function Qb(i){return Wh(i)}function Hi(i){if(i==="float16")return qb();const e=oc[i];if(!e)throw new Error(i);const[,,,,t]=e;return t}function sc(i){return Hi(i)}const oc={uint8:["uint8","u32",1,!1,Uint8Array],sint8:["sint8","i32",1,!1,Int8Array],unorm8:["uint8","f32",1,!0,Uint8Array],snorm8:["sint8","f32",1,!0,Int8Array],uint16:["uint16","u32",2,!1,Uint16Array],sint16:["sint16","i32",2,!1,Int16Array],unorm16:["uint16","u32",2,!0,Uint16Array],snorm16:["sint16","i32",2,!0,Int16Array],float16:["float16","f16",2,!1,Uint16Array],float32:["float32","f32",4,!1,Float32Array],uint32:["uint32","u32",4,!1,Uint32Array],sint32:["sint32","i32",4,!1,Int32Array]};class Jb{getDataTypeInfo(e){return Xb(e)}getNormalizedDataType(e){return Kb(e)}alignTo(e,t){return qe(e,t)}getDataType(e){return Qb(e)}getTypedArrayConstructor(e){return sc(e)}}const Ke=new Jb;class ey{getVertexFormatInfo(e){if(e==="unorm10-10-10-2")return{type:"unorm8",components:4,byteLength:4,integer:!1,signed:!1,normalized:!0};let t=e==="unorm8x4-bgra"?"unorm8x4":e,n;t.endsWith("-webgl")&&(t=t.slice(0,-6),n=!0);const r=t.split("x");if(r.length>2)throw new Error(`Unsupported vertex format: ${e}`);const[s,o]=r,a=s,c=iy(e,o),l=ty(e,a);let u;try{u=n?ny(e,a,c):this.makeVertexFormat(l.signedType,c,l.normalized)}catch{throw new Error(`Unsupported vertex format: ${e}`)}if(u!==(n?e:t))throw new Error(`Unsupported vertex format: ${e}`);const f={type:a,components:c,byteLength:l.byteLength*c,integer:l.integer,signed:l.signed,normalized:l.normalized};return n&&(f.webglOnly=!0),f}makeVertexFormat(e,t,n){const r=n?Ke.getNormalizedDataType(e):e;switch(r){case"unorm8":return t===1?"unorm8":t===3?"unorm8x3-webgl":`${r}x${t}`;case"snorm8":return t===1?"snorm8":t===3?"snorm8x3-webgl":`${r}x${t}`;case"uint8":case"sint8":if(t===3)throw new Error(`size: ${t}`);return t===1?r:`${r}x${t}`;case"uint16":return t===1?"uint16":t===3?"uint16x3-webgl":`${r}x${t}`;case"sint16":return t===1?"sint16":t===3?"sint16x3-webgl":`${r}x${t}`;case"unorm16":return t===1?"unorm16":t===3?"unorm16x3-webgl":`${r}x${t}`;case"snorm16":return t===1?"snorm16":t===3?"snorm16x3-webgl":`${r}x${t}`;case"float16":if(t===3)throw new Error(`size: ${t}`);return t===1?r:`${r}x${t}`;default:return t===1?r:`${r}x${t}`}}getVertexFormatFromAttribute(e,t,n){if(!t||t>4)throw new Error(`size ${t}`);const r=t,s=Ke.getDataType(e);return this.makeVertexFormat(s,r,n)}getCompatibleVertexFormat(e){let t;switch(e.primitiveType){case"f32":t="float32";break;case"i32":t="sint32";break;case"u32":t="uint32";break;case"f16":return e.components<=2?"float16x2":"float16x4"}return e.components===1?t:`${t}x${e.components}`}}const be=new ey;function ty(i,e){try{return Ke.getDataTypeInfo(e)}catch{throw new Error(`Unsupported vertex format: ${i}`)}}function iy(i,e){if(!e)return 1;const t=Number(e);if(t===2||t===3||t===4)return t;throw new Error(`Unsupported vertex format: ${i}`)}function ny(i,e,t){if(t!==3)throw new Error(`Unsupported vertex format: ${i}`);switch(e){case"uint8":case"sint8":case"unorm8":case"snorm8":case"uint16":case"sint16":case"unorm16":case"snorm16":return`${e}x3-webgl`;default:throw new Error(`Unsupported vertex format: ${i}`)}}const me="texture-compression-bc",J="texture-compression-astc",ze="texture-compression-etc2",ry="texture-compression-etc1-webgl",In="texture-compression-pvrtc-webgl",Us="texture-compression-atc-webgl",Rn="float32-renderable-webgl",zs="float16-renderable-webgl",sy="rgb9e5ufloat-renderable-webgl",$s="snorm8-renderable-webgl",st="norm16-webgl",Gs="norm16-renderable-webgl",Vs="snorm16-renderable-webgl",On="float32-filterable",Dl="float16-filterable-webgl",wn=1,xn=2,ac=4,cc=8,xi=16,bs=5,Hh=10,ue=wn|xn,Bn=wn|ac,et=wn|xn|ac|cc,$e=wn|xn|xi,oy=wn|ac|xi,Ko=et|xi,Fl=(xn|cc|xi)<<bs,ay=(xn|cc)<<bs,ye=xi<<bs,jt=Ko<<bs,cy=et<<Hh,js=xi<<Hh;function lc(i){const e=Yh[i];if(!e)throw new Error(`Unsupported texture format ${i}`);return e}function ly(){return Yh}const uy={r8unorm:{webgpu:et|ye},rg8unorm:{webgpu:et|ye},"rgb8unorm-webgl":{},rgba8unorm:{webgpu:Ko},"rgba8unorm-srgb":{webgpu:et},r8snorm:{render:$s,webgpu:Bn|Fl},rg8snorm:{render:$s,webgpu:Bn|Fl},"rgb8snorm-webgl":{},rgba8snorm:{render:$s,webgpu:oy|ay},r8uint:{webgpu:ue|ye},rg8uint:{webgpu:ue|ye},rgba8uint:{webgpu:$e},r8sint:{webgpu:ue|ye},rg8sint:{webgpu:ue|ye},rgba8sint:{webgpu:$e},bgra8unorm:{webgpu:et},"bgra8unorm-srgb":{webgpu:cy},r16unorm:{f:st,render:Gs,webgpu:jt},rg16unorm:{f:st,render:Gs,webgpu:jt},"rgb16unorm-webgl":{f:st,render:!1},rgba16unorm:{f:st,render:Gs,webgpu:jt},r16snorm:{f:st,render:Vs,webgpu:jt},rg16snorm:{f:st,render:Vs,webgpu:jt},"rgb16snorm-webgl":{f:st,render:!1},rgba16snorm:{f:st,render:Vs,webgpu:jt},r16uint:{webgpu:ue|ye},rg16uint:{webgpu:ue|ye},rgba16uint:{webgpu:$e},r16sint:{webgpu:ue|ye},rg16sint:{webgpu:ue|ye},rgba16sint:{webgpu:$e},r16float:{render:zs,filter:"float16-filterable-webgl",webgpu:et|ye},rg16float:{render:zs,filter:Dl,webgpu:et|ye},rgba16float:{render:zs,filter:Dl,webgpu:Ko},r32uint:{webgpu:$e},rg32uint:{webgpu:ue|js},rgba32uint:{webgpu:$e},r32sint:{webgpu:$e},rg32sint:{webgpu:ue|js},rgba32sint:{webgpu:$e},r32float:{render:Rn,filter:On,webgpu:$e},rg32float:{render:!1,filter:On,webgpu:ue|js},"rgb32float-webgl":{render:Rn,filter:On},rgba32float:{render:Rn,filter:On,webgpu:$e},"rgba4unorm-webgl":{channels:"rgba",bitsPerChannel:[4,4,4,4],packed:!0},"rgb565unorm-webgl":{channels:"rgb",bitsPerChannel:[5,6,5,0],packed:!0},"rgb5a1unorm-webgl":{channels:"rgba",bitsPerChannel:[5,5,5,1],packed:!0},rgb9e5ufloat:{channels:"rgb",packed:!0,render:sy,webgpu:Bn},rg11b10ufloat:{channels:"rgb",bitsPerChannel:[11,11,10,0],packed:!0,p:1,render:Rn,webgpu:Bn|ye},rgb10a2unorm:{channels:"rgba",bitsPerChannel:[10,10,10,2],packed:!0,p:1,webgpu:et|ye},rgb10a2uint:{channels:"rgba",bitsPerChannel:[10,10,10,2],packed:!0,p:1,webgpu:ue|ye},stencil8:{attachment:"stencil",bitsPerChannel:[8,0,0,0],dataType:"uint8",webgpu:ue},depth16unorm:{attachment:"depth",bitsPerChannel:[16,0,0,0],dataType:"uint16",webgpu:ue},depth24plus:{attachment:"depth",bitsPerChannel:[24,0,0,0],dataType:"uint32",webgpu:ue},depth32float:{attachment:"depth",bitsPerChannel:[32,0,0,0],dataType:"float32",webgpu:ue},"depth24plus-stencil8":{attachment:"depth-stencil",bitsPerChannel:[24,8,0,0],packed:!0,webgpu:ue},"depth32float-stencil8":{attachment:"depth-stencil",bitsPerChannel:[32,8,0,0],packed:!0,f:"depth32float-stencil8",webgpu:ue}},fy={"bc1-rgb-unorm-webgl":{f:me},"bc1-rgb-unorm-srgb-webgl":{f:me},"bc1-rgba-unorm":{f:me},"bc1-rgba-unorm-srgb":{f:me},"bc2-rgba-unorm":{f:me},"bc2-rgba-unorm-srgb":{f:me},"bc3-rgba-unorm":{f:me},"bc3-rgba-unorm-srgb":{f:me},"bc4-r-unorm":{f:me},"bc4-r-snorm":{f:me},"bc5-rg-unorm":{f:me},"bc5-rg-snorm":{f:me},"bc6h-rgb-ufloat":{f:me},"bc6h-rgb-float":{f:me},"bc7-rgba-unorm":{f:me},"bc7-rgba-unorm-srgb":{f:me},"etc2-rgb8unorm":{f:ze},"etc2-rgb8unorm-srgb":{f:ze},"etc2-rgb8a1unorm":{f:ze},"etc2-rgb8a1unorm-srgb":{f:ze},"etc2-rgba8unorm":{f:ze},"etc2-rgba8unorm-srgb":{f:ze},"eac-r11unorm":{f:ze},"eac-r11snorm":{f:ze},"eac-rg11unorm":{f:ze},"eac-rg11snorm":{f:ze},"astc-4x4-unorm":{f:J},"astc-4x4-unorm-srgb":{f:J},"astc-5x4-unorm":{f:J},"astc-5x4-unorm-srgb":{f:J},"astc-5x5-unorm":{f:J},"astc-5x5-unorm-srgb":{f:J},"astc-6x5-unorm":{f:J},"astc-6x5-unorm-srgb":{f:J},"astc-6x6-unorm":{f:J},"astc-6x6-unorm-srgb":{f:J},"astc-8x5-unorm":{f:J},"astc-8x5-unorm-srgb":{f:J},"astc-8x6-unorm":{f:J},"astc-8x6-unorm-srgb":{f:J},"astc-8x8-unorm":{f:J},"astc-8x8-unorm-srgb":{f:J},"astc-10x5-unorm":{f:J},"astc-10x5-unorm-srgb":{f:J},"astc-10x6-unorm":{f:J},"astc-10x6-unorm-srgb":{f:J},"astc-10x8-unorm":{f:J},"astc-10x8-unorm-srgb":{f:J},"astc-10x10-unorm":{f:J},"astc-10x10-unorm-srgb":{f:J},"astc-12x10-unorm":{f:J},"astc-12x10-unorm-srgb":{f:J},"astc-12x12-unorm":{f:J},"astc-12x12-unorm-srgb":{f:J},"pvrtc-rgb4unorm-webgl":{f:In},"pvrtc-rgba4unorm-webgl":{f:In},"pvrtc-rgb2unorm-webgl":{f:In},"pvrtc-rgba2unorm-webgl":{f:In},"etc1-rbg-unorm-webgl":{f:ry},"atc-rgb-unorm-webgl":{f:Us},"atc-rgba-unorm-webgl":{f:Us},"atc-rgbai-unorm-webgl":{f:Us}},Yh={...uy,...fy},hy=/^(r|rg|rgb|rgba|bgra)([0-9]*)([a-z]*)(-srgb)?(-webgl)?$/,dy=["rgb","rgba","bgra"],gy=["depth","stencil"],py=5,my=["bc1","bc2","bc3","bc4","bc5","bc6","bc7","etc1","etc2","eac","atc","astc","pvrtc"];class _y{isColor(e){return dy.some(t=>e.startsWith(t))}isDepthStencil(e){return gy.some(t=>e.startsWith(t))}isCompressed(e){return my.some(t=>e.startsWith(t))}getInfo(e){return qh(e)}getCapabilities(e){return yy(e)}getWebGPUCapabilities(e){const t=lc(e);return t.webgpu!==void 0?t.webgpu:this.isCompressed(e)&&!e.endsWith("-webgl")?py:0}computeMemoryLayout(e){return by(e)}}const Be=new _y;function by({format:i,width:e,height:t,depth:n,byteAlignment:r}){const s=Be.getInfo(i),{bytesPerPixel:o,bytesPerBlock:a=o,blockWidth:c=1,blockHeight:l=1,compressed:u=!1}=s,f=u?Math.ceil(e/c):e,h=u?Math.ceil(t/l):t,g=f*a,p=Math.ceil(g/r)*r,m=h,_=p*m*n;return{bytesPerPixel:o,bytesPerRow:p,rowsPerImage:m,depthOrArrayLayers:n,bytesPerImage:p*m,byteLength:_}}function yy(i){const e=lc(i),t={format:i,create:e.f??!0,render:e.render??!0,filter:e.filter??!0,blend:e.blend??!0,store:e.store??!0},n=qh(i),r=i.startsWith("depth")||i.startsWith("stencil"),s=n==null?void 0:n.signed,o=n==null?void 0:n.integer,a=n==null?void 0:n.webgl,c=!!(n!=null&&n.compressed);return t.render&&(t.render=!r&&!c),t.filter&&(t.filter=!r&&!s&&!o&&!a),t}function qh(i){let e=vy(i);if(Be.isCompressed(i)){e.channels="rgb",e.components=3,e.bytesPerPixel=1,e.srgb=!1,e.compressed=!0,e.bytesPerBlock=xy(i);const n=wy(i);n&&(e.blockWidth=n.blockWidth,e.blockHeight=n.blockHeight)}const t=e.packed?null:hy.exec(i);if(t){const[,n,r,s,o,a]=t,c=`${s}${r}`,l=Ke.getDataTypeInfo(c),u=l.byteLength*8,f=(n==null?void 0:n.length)??1,h=[u,f>=2?u:0,f>=3?u:0,f>=4?u:0];e={format:i,attachment:e.attachment,dataType:l.signedType,components:f,channels:n,integer:l.integer,signed:l.signed,normalized:l.normalized,bitsPerChannel:h,bytesPerPixel:l.byteLength*f,packed:e.packed,srgb:e.srgb},a==="-webgl"&&(e.webgl=!0),o==="-srgb"&&(e.srgb=!0)}return i.endsWith("-webgl")&&(e.webgl=!0),i.endsWith("-srgb")&&(e.srgb=!0),e}function vy(i){var s;const e={...lc(i)},t=e.bytesPerPixel||1,n=e.bitsPerChannel||[8,8,8,8];return delete e.bitsPerChannel,delete e.bytesPerPixel,delete e.f,delete e.render,delete e.filter,delete e.blend,delete e.store,delete e.webgpu,{...e,format:i,attachment:e.attachment||"color",channels:e.channels||"r",components:e.components||((s=e.channels)==null?void 0:s.length)||1,bytesPerPixel:t,bitsPerChannel:n,dataType:e.dataType||"uint8",srgb:e.srgb??!1,packed:e.packed??!1,webgl:e.webgl??!1,integer:e.integer??!1,signed:e.signed??!1,normalized:e.normalized??!1,compressed:e.compressed??!1}}function wy(i){const t=/.*-(\d+)x(\d+)-.*/.exec(i);if(t){const[,n,r]=t;return{blockWidth:Number(n),blockHeight:Number(r)}}return i.startsWith("bc")||i.startsWith("etc1")||i.startsWith("etc2")||i.startsWith("eac")||i.startsWith("atc")?{blockWidth:4,blockHeight:4}:i.startsWith("pvrtc-rgb4")||i.startsWith("pvrtc-rgba4")?{blockWidth:4,blockHeight:4}:i.startsWith("pvrtc-rgb2")||i.startsWith("pvrtc-rgba2")?{blockWidth:8,blockHeight:4}:null}function xy(i){return i.startsWith("bc1")||i.startsWith("bc4")||i.startsWith("etc1")||i.startsWith("etc2-rgb8")||i.startsWith("etc2-rgb8a1")||i.startsWith("eac-r11")||i==="atc-rgb-unorm-webgl"?8:i.startsWith("bc2")||i.startsWith("bc3")||i.startsWith("bc5")||i.startsWith("bc6h")||i.startsWith("bc7")||i.startsWith("etc2-rgba8")||i.startsWith("eac-rg11")||i.startsWith("astc")||i==="atc-rgba-unorm-webgl"||i==="atc-rgbai-unorm-webgl"?16:i.startsWith("pvrtc")?8:16}function Py(i){return typeof ImageData<"u"&&i instanceof ImageData||typeof ImageBitmap<"u"&&i instanceof ImageBitmap||typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement||typeof VideoFrame<"u"&&i instanceof VideoFrame||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas}function Ey(i){if(typeof ImageData<"u"&&i instanceof ImageData||typeof ImageBitmap<"u"&&i instanceof ImageBitmap||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas)return{width:i.width,height:i.height};if(typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement)return{width:i.naturalWidth,height:i.naturalHeight};if(typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement)return{width:i.videoWidth,height:i.videoHeight};if(typeof VideoFrame<"u"&&i instanceof VideoFrame)return{width:i.displayWidth,height:i.displayHeight};throw new Error("Unknown image type")}class Sy{}function Ly(i,e){const t=Qo(i),n=e.map(Qo).filter(r=>r!==void 0);return[t,...n].filter(r=>r!==void 0)}function Qo(i){var e;if(i!==void 0){if(i===null||typeof i=="string"||typeof i=="number"||typeof i=="boolean")return i;if(i instanceof Error)return i.message;if(Array.isArray(i))return i.map(Qo);if(typeof i=="object"){if(Ty(i)){const t=String(i);if(t!=="[object Object]")return t}return Ay(i)?Cy(i):((e=i.constructor)==null?void 0:e.name)||"Object"}return String(i)}}function Ty(i){return"toString"in i&&typeof i.toString=="function"&&i.toString!==Object.prototype.toString}function Ay(i){return"message"in i&&"type"in i}function Cy(i){const e=typeof i.type=="string"?i.type:"message",t=typeof i.message=="string"?i.message:"",n=typeof i.lineNum=="number"?i.lineNum:null,r=typeof i.linePos=="number"?i.linePos:null,s=n!==null&&r!==null?` @ ${n}:${r}`:n!==null?` @ ${n}`:"";return`${e}${s}: ${t}`.trim()}class My{constructor(e=[],t){d(this,"features");d(this,"disabledFeatures");this.features=new Set(e),this.disabledFeatures=t||{}}*[Symbol.iterator](){yield*this.features}has(e){var t;return!((t=this.disabledFeatures)!=null&&t[e])&&this.features.has(e)}}function Iy(){if(typeof HTMLCanvasElement>"u")return!1;const i=HTMLCanvasElement.prototype;return"layoutSubtree"in i&&typeof i.requestPaint=="function"}const Xr=class Xr{constructor(e){d(this,"id");d(this,"props");d(this,"userData",{});d(this,"statsManager",jh);d(this,"_factories",{});d(this,"timestamp",0);d(this,"_reused",!1);d(this,"_moduleData",{});d(this,"wgslLanguageFeatures",new Set);d(this,"_textureCaps",{});d(this,"_debugGPUTimeQuery",null);this.props={...Xr.defaultProps,...e},this.id=this.props.id||vn(this[Symbol.toStringTag].toLowerCase())}get[Symbol.toStringTag](){return"Device"}toString(){return`Device(${this.id})`}toJSON(){return this.toString()}getVertexFormatInfo(e){return be.getVertexFormatInfo(e)}isVertexFormatSupported(e){return!0}getTextureFormatInfo(e){return Be.getInfo(e)}getTextureFormatCapabilities(e){let t=this._textureCaps[e];if(!t){const n=this._getDeviceTextureFormatCapabilities(e);t=this._getDeviceSpecificTextureFormatCapabilities(n),this._textureCaps[e]=t}return t}getMipLevelCount(e,t,n=1){const r=Math.max(e,t,n);return 1+Math.floor(Math.log2(r))}isExternalImage(e){return Py(e)}getExternalImageSize(e){return Ey(e)}isTextureFormatSupported(e){return this.getTextureFormatCapabilities(e).create}isTextureFormatFilterable(e){return this.getTextureFormatCapabilities(e).filter}isTextureFormatRenderable(e){return this.getTextureFormatCapabilities(e).render}isTextureFormatCompressed(e){return Be.isCompressed(e)}getSupportedCompressedTextureFormats(){const e=[];for(const t of Object.keys(ly()))this.isTextureFormatCompressed(t)&&this.isTextureFormatSupported(t)&&e.push(t);return e}pushDebugGroup(e){this.commandEncoder.pushDebugGroup(e)}popDebugGroup(){var e;(e=this.commandEncoder)==null||e.popDebugGroup()}insertDebugMarker(e){var t;(t=this.commandEncoder)==null||t.insertDebugMarker(e)}loseDevice(){return!1}incrementTimestamp(){return this.timestamp++}reportError(e,t,...n){if(!this.props.onError(e,t)){const s=Ly(t,n);return T.error(this.type==="webgl"?"%cWebGL":"%cWebGPU","color: white; background: red; padding: 2px 6px; border-radius: 3px;",e.message,...s)}return()=>{}}debug(){if(this.props.debug)debugger;else T.once(0,`'Type luma.log.set({debug: true}) in console to enable debug breakpoints',
or create a device with the 'debug: true' prop.`)()}getDefaultCanvasContext(){if(!this.canvasContext)throw new Error("Device has no default CanvasContext. See props.createCanvasContext");return this.canvasContext}createFence(){throw new Error("createFence() not implemented")}beginRenderPass(e){return this.commandEncoder.beginRenderPass(e)}beginComputePass(e){return this.commandEncoder.beginComputePass(e)}writeBufferViaCommandEncoder(e,t,n,r=0){throw new Error("writeBufferViaCommandEncoder() not implemented")}generateMipmapsWebGPU(e){throw new Error("not implemented")}_createSharedRenderPipelineWebGL(e){throw new Error("_createSharedRenderPipelineWebGL() not implemented")}_createBindGroupLayoutWebGPU(e,t){throw new Error("_createBindGroupLayoutWebGPU() not implemented")}_createBindGroupWebGPU(e,t,n,r,s){throw new Error("_createBindGroupWebGPU() not implemented")}_supportsDebugGPUTime(){return this.features.has("timestamp-query")&&!!(this.props.debug||this.props.debugGPUTime)}_enableDebugGPUTime(e=256){if(!this._supportsDebugGPUTime())return null;if(this._debugGPUTimeQuery)return this._debugGPUTimeQuery;try{this._debugGPUTimeQuery=this.createQuerySet({type:"timestamp",count:e}),this.commandEncoder=this.createCommandEncoder({id:this.commandEncoder.props.id,timeProfilingQuerySet:this._debugGPUTimeQuery})}catch{this._debugGPUTimeQuery=null}return this._debugGPUTimeQuery}_disableDebugGPUTime(){this._debugGPUTimeQuery&&(this.commandEncoder.getTimeProfilingQuerySet()===this._debugGPUTimeQuery&&(this.commandEncoder=this.createCommandEncoder({id:this.commandEncoder.props.id})),this._debugGPUTimeQuery.destroy(),this._debugGPUTimeQuery=null)}_isDebugGPUTimeEnabled(){return this._debugGPUTimeQuery!==null}getCanvasContext(){return this.getDefaultCanvasContext()}readPixelsToArrayWebGL(e,t){throw new Error("not implemented")}readPixelsToBufferWebGL(e,t){throw new Error("not implemented")}setParametersWebGL(e){throw new Error("not implemented")}getParametersWebGL(e){throw new Error("not implemented")}withParametersWebGL(e,t){throw new Error("not implemented")}clearWebGL(e){throw new Error("not implemented")}resetWebGL(){throw new Error("not implemented")}getModuleData(e){var t;return(t=this._moduleData)[e]||(t[e]={}),this._moduleData[e]}static _getCanvasContextProps(e){return e.createCanvasContext===!0?{}:e.createCanvasContext}_getDeviceTextureFormatCapabilities(e){const t=Be.getCapabilities(e),n=s=>(typeof s=="string"?this.features.has(s):s)??!0,r=n(t.create);return{format:e,create:r,render:r&&n(t.render),filter:r&&n(t.filter),blend:r&&n(t.blend),store:r&&n(t.store)}}_normalizeBufferProps(e){(e instanceof ArrayBuffer||ArrayBuffer.isView(e))&&(e={data:e});const t={...e};if((e.usage||0)&j.INDEX&&(e.indexType||(e.data instanceof Uint32Array?t.indexType="uint32":e.data instanceof Uint16Array?t.indexType="uint16":e.data instanceof Uint8Array&&(t.data=new Uint16Array(e.data),t.indexType="uint16")),!t.indexType))throw new Error("indices buffer content must be of type uint16 or uint32");return t}};d(Xr,"defaultProps",{...Vh});let li=Xr;class Ry{constructor(e){d(this,"props");d(this,"_resizeObserver");d(this,"_intersectionObserver");d(this,"_observeDevicePixelRatioTimeout",null);d(this,"_observeDevicePixelRatioMediaQuery",null);d(this,"_handleDevicePixelRatioChange",()=>this._refreshDevicePixelRatio());d(this,"_trackPositionInterval",null);d(this,"_started",!1);this.props=e}get started(){return this._started}start(){if(this._started||!this.props.canvas)return;this._started=!0,this._intersectionObserver||(this._intersectionObserver=new IntersectionObserver(t=>this.props.onIntersection(t))),this._resizeObserver||(this._resizeObserver=new ResizeObserver(t=>this.props.onResize(t))),this._intersectionObserver.observe(this.props.canvas);const e=this.props.resizeObserverBox;try{this._resizeObserver.observe(this.props.canvas,{box:e})}catch{this._resizeObserver.observe(this.props.canvas,{box:"content-box"})}this._observeDevicePixelRatioTimeout=setTimeout(()=>this._refreshDevicePixelRatio(),0),this.props.trackPosition&&this._trackPosition()}stop(){var e,t;this._started&&(this._started=!1,this._observeDevicePixelRatioTimeout&&(clearTimeout(this._observeDevicePixelRatioTimeout),this._observeDevicePixelRatioTimeout=null),this._observeDevicePixelRatioMediaQuery&&(this._observeDevicePixelRatioMediaQuery.removeEventListener("change",this._handleDevicePixelRatioChange),this._observeDevicePixelRatioMediaQuery=null),this._trackPositionInterval&&(clearInterval(this._trackPositionInterval),this._trackPositionInterval=null),(e=this._resizeObserver)==null||e.disconnect(),(t=this._intersectionObserver)==null||t.disconnect())}_refreshDevicePixelRatio(){var e;this._started&&(this.props.onDevicePixelRatioChange(),(e=this._observeDevicePixelRatioMediaQuery)==null||e.removeEventListener("change",this._handleDevicePixelRatioChange),this._observeDevicePixelRatioMediaQuery=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),this._observeDevicePixelRatioMediaQuery.addEventListener("change",this._handleDevicePixelRatioChange,{once:!0}))}_trackPosition(e=100){this._trackPositionInterval||(this._trackPositionInterval=setInterval(()=>{this._started?this.props.onPositionChange():this._trackPositionInterval&&(clearInterval(this._trackPositionInterval),this._trackPositionInterval=null)},e))}}function Oy(){let i,e;return{promise:new Promise((n,r)=>{i=n,e=r}),resolve:i,reject:e}}function cn(i,e){var t;if(!i){const n=new Error(e??"luma.gl assertion failed.");throw(t=Error.captureStackTrace)==null||t.call(Error,n,cn),n}}function Sr(i,e){return cn(i,e),i}const ni=class ni{constructor(e){d(this,"id");d(this,"props");d(this,"canvas");d(this,"htmlCanvas");d(this,"offscreenCanvas");d(this,"type");d(this,"initialized");d(this,"isInitialized",!1);d(this,"isVisible",!0);d(this,"cssWidth");d(this,"cssHeight");d(this,"devicePixelRatio");d(this,"devicePixelWidth");d(this,"devicePixelHeight");d(this,"drawingBufferWidth");d(this,"drawingBufferHeight");d(this,"_initializedResolvers",Oy());d(this,"_canvasObserver");d(this,"_position",[0,0]);d(this,"destroyed",!1);d(this,"_needsDrawingBufferResize",!0);d(this,"_configuredDrawingBufferSize",[0,0]);var t,n;this.props={...ni.defaultProps,...e},e=this.props,this.initialized=this._initializedResolvers.promise,yi()?e.canvas?typeof e.canvas=="string"?this.canvas=ky(e.canvas):this.canvas=e.canvas:this.canvas=Dy(e):this.canvas={width:e.width||1,height:e.height||1},ni.isHTMLCanvas(this.canvas)?(this.id=e.id||this.canvas.id,this.type="html-canvas",this.htmlCanvas=this.canvas):ni.isOffscreenCanvas(this.canvas)?(this.id=e.id||"offscreen-canvas",this.type="offscreen-canvas",this.offscreenCanvas=this.canvas):(this.id=e.id||"node-canvas-context",this.type="node"),this.cssWidth=((t=this.htmlCanvas)==null?void 0:t.clientWidth)||this.canvas.width,this.cssHeight=((n=this.htmlCanvas)==null?void 0:n.clientHeight)||this.canvas.height,this.devicePixelWidth=this.canvas.width,this.devicePixelHeight=this.canvas.height,this.drawingBufferWidth=this.canvas.width,this.drawingBufferHeight=this.canvas.height,this._configuredDrawingBufferSize=[this.canvas.width,this.canvas.height],this.devicePixelRatio=globalThis.devicePixelRatio||1,this._position=[0,0],this._canvasObserver=new Ry({canvas:this.htmlCanvas,trackPosition:this.props.trackPosition,resizeObserverBox:this.props.pixelSizeSource==="css-dpr"?"content-box":"device-pixel-content-box",onResize:r=>this._handleResize(r),onIntersection:r=>this._handleIntersection(r),onDevicePixelRatioChange:()=>this._observeDevicePixelRatio(),onPositionChange:()=>this.updatePosition()})}static isHTMLCanvas(e){return typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement}static isOffscreenCanvas(e){return typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas}toString(){return`${this[Symbol.toStringTag]}(${this.id})`}destroy(){this.destroyed||(this.destroyed=!0,this._stopObservers(),this.device=null)}setProps(e){return"useDevicePixels"in e&&(this.props.useDevicePixels=e.useDevicePixels||!1,this._updateDrawingBufferSize()),this}getCurrentFramebuffer(e){return this._resizeDrawingBufferIfNeeded(),this._getCurrentFramebuffer(e)}getCSSSize(){return[this.cssWidth,this.cssHeight]}getPosition(){return this._position}getDevicePixelSize(){return[this.devicePixelWidth,this.devicePixelHeight]}getDrawingBufferSize(){return[this.drawingBufferWidth,this.drawingBufferHeight]}getMaxDrawingBufferSize(){const e=this.device.limits.maxTextureDimension2D;return[e,e]}setDrawingBufferSize(e,t){e=Math.floor(e),t=Math.floor(t),!(this.drawingBufferWidth===e&&this.drawingBufferHeight===t)&&(this.drawingBufferWidth=e,this.drawingBufferHeight=t,this._needsDrawingBufferResize=!0)}getDevicePixelRatio(){return typeof window<"u"&&window.devicePixelRatio||1}cssToDevicePixels(e,t=!0){const n=this.cssToDeviceRatio(),[r,s]=this.getDrawingBufferSize();return Fy(e,n,r,s,t)}getPixelSize(){return this.getDevicePixelSize()}getAspect(){const[e,t]=this.getDrawingBufferSize();return e>0&&t>0?e/t:1}cssToDeviceRatio(){try{const[e]=this.getDrawingBufferSize(),[t]=this.getCSSSize();return t?e/t:1}catch{return 1}}resize(e){this.setDrawingBufferSize(e.width,e.height)}_setAutoCreatedCanvasId(e){var t;((t=this.htmlCanvas)==null?void 0:t.id)==="lumagl-auto-created-canvas"&&(this.htmlCanvas.id=e)}_startObservers(){this.destroyed||this._canvasObserver.start()}_stopObservers(){this._canvasObserver.stop()}_handleIntersection(e){if(this.destroyed)return;const t=e.find(r=>r.target===this.canvas);if(!t)return;const n=t.isIntersecting;this.isVisible!==n&&(this.isVisible=n,this.device.props.onVisibilityChange(this))}_handleResize(e){var s;if(this.destroyed)return;const t=e.find(o=>o.target===this.canvas);if(!t)return;const n=Sr((s=t.contentBoxSize)==null?void 0:s[0]);this.cssWidth=n.inlineSize,this.cssHeight=n.blockSize;const r=this.getDevicePixelSize();this._setDevicePixelSize(this._getDevicePixelSizeFromResizeEntry(t)),this._updateDrawingBufferSize(),this.device.props.onResize(this,{oldPixelSize:r})}_updateDrawingBufferSize(){if(this.props.autoResize)if(typeof this.props.useDevicePixels=="number"){const e=this.props.useDevicePixels;this.setDrawingBufferSize(this.cssWidth*e,this.cssHeight*e)}else this.props.useDevicePixels?this.setDrawingBufferSize(this.devicePixelWidth,this.devicePixelHeight):this.setDrawingBufferSize(this.cssWidth,this.cssHeight);this._initializedResolvers.resolve(),this.isInitialized=!0,this.updatePosition()}_getDevicePixelSizeFromResizeEntry(e){var n,r,s,o,a;const t=Sr((n=e.contentBoxSize)==null?void 0:n[0]);return this.props.pixelSizeSource==="css-dpr"?this._getDevicePixelSizeFromCSSSize(t.inlineSize,t.blockSize):{devicePixelWidth:((s=(r=e.devicePixelContentBoxSize)==null?void 0:r[0])==null?void 0:s.inlineSize)||t.inlineSize*devicePixelRatio,devicePixelHeight:((a=(o=e.devicePixelContentBoxSize)==null?void 0:o[0])==null?void 0:a.blockSize)||t.blockSize*devicePixelRatio}}_getDevicePixelSizeFromCSSSize(e,t){const n=this.getDevicePixelRatio();return{devicePixelWidth:Math.floor(e*n),devicePixelHeight:Math.floor(t*n)}}_setDevicePixelSize({devicePixelWidth:e,devicePixelHeight:t}){const[n,r]=this.getMaxDrawingBufferSize();this.devicePixelWidth=Math.max(1,Math.min(e,n)),this.devicePixelHeight=Math.max(1,Math.min(t,r))}_resizeDrawingBufferIfNeeded(){if(this._needsDrawingBufferResize){this._needsDrawingBufferResize=!1,(this.drawingBufferWidth!==this.canvas.width||this.drawingBufferHeight!==this.canvas.height)&&(this.canvas.width=this.drawingBufferWidth,this.canvas.height=this.drawingBufferHeight);const[t,n]=this._configuredDrawingBufferSize;(this.drawingBufferWidth!==t||this.drawingBufferHeight!==n)&&(this._configureDevice(),this._configuredDrawingBufferSize=[this.drawingBufferWidth,this.drawingBufferHeight])}}_observeDevicePixelRatio(){var t,n;if(this.destroyed||!this._canvasObserver.started)return;const e=this.devicePixelRatio;if(this.devicePixelRatio=window.devicePixelRatio,this.props.pixelSizeSource==="css-dpr"){const r=this.getDevicePixelSize();this._setDevicePixelSize(this._getDevicePixelSizeFromCSSSize(this.cssWidth,this.cssHeight)),this._updateDrawingBufferSize(),this.device.props.onResize(this,{oldPixelSize:r})}this.updatePosition(),(n=(t=this.device.props).onDevicePixelRatioChange)==null||n.call(t,this,{oldRatio:e})}updatePosition(){var t,n,r;if(this.destroyed)return;const e=(t=this.htmlCanvas)==null?void 0:t.getBoundingClientRect();if(e){const s=[e.left,e.top];if(this._position??(this._position=s),s[0]!==this._position[0]||s[1]!==this._position[1]){const a=this._position;this._position=s,(r=(n=this.device.props).onPositionChange)==null||r.call(n,this,{oldPosition:a})}}}};d(ni,"defaultProps",{id:void 0,canvas:null,width:800,height:600,useDevicePixels:!0,pixelSizeSource:"exact",autoResize:!0,container:null,visible:!0,alphaMode:"opaque",colorSpace:"srgb",colorFormat:void 0,toneMapping:"standard",trackPosition:!1});let ui=ni;function By(i){if(typeof i=="string"){const e=document.getElementById(i);if(!e)throw new Error(`${i} is not an HTML element`);return e}return i||document.body}function ky(i){const e=document.getElementById(i);if(!ui.isHTMLCanvas(e))throw new Error("Object is not a canvas element");return e}function Dy(i){const{width:e,height:t}=i,n=document.createElement("canvas");n.id=vn("lumagl-auto-created-canvas"),n.width=e||1,n.height=t||1,n.style.width=Number.isFinite(e)?`${e}px`:"100%",n.style.height=Number.isFinite(t)?`${t}px`:"100%",i!=null&&i.visible||(n.style.visibility="hidden");const r=By((i==null?void 0:i.container)||null);return r.insertBefore(n,r.firstChild),n}function Fy(i,e,t,n,r){const s=i,o=Nl(s[0],e,t);let a=Ul(s[1],e,n,r),c=Nl(s[0]+1,e,t);const l=c===t-1?c:c-1;c=Ul(s[1]+1,e,n,r);let u;return r?(c=c===0?c:c+1,u=a,a=c):u=c===n-1?c:c-1,{x:o,y:a,width:Math.max(l-o+1,1),height:Math.max(u-a+1,1)}}function Nl(i,e,t){return Math.min(Math.round(i*e),t-1)}function Ul(i,e,t,n){return n?Math.max(0,t-1-Math.round(i*e)):Math.min(Math.round(i*e),t-1)}class Zh extends ui{}d(Zh,"defaultProps",ui.defaultProps);class Ny extends ui{}const nn=class nn extends H{get[Symbol.toStringTag](){return"Sampler"}constructor(e,t){t=nn.normalizeProps(e,t),super(e,t,nn.defaultProps)}static normalizeProps(e,t){return t}};d(nn,"defaultProps",{...H.defaultProps,type:"color-sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge",magFilter:"nearest",minFilter:"nearest",mipmapFilter:"none",lodMinClamp:0,lodMaxClamp:32,compare:"less-equal",maxAnisotropy:1});let Lr=nn;const Uy={"1d":"1d","2d":"2d","2d-array":"2d",cube:"2d","cube-array":"2d","3d":"3d"},ee=class ee extends H{constructor(t,n,r){n=ee.normalizeProps(t,n);super(t,n,ee.defaultProps);d(this,"dimension");d(this,"baseDimension");d(this,"format");d(this,"width");d(this,"height");d(this,"depth");d(this,"mipLevels");d(this,"samples");d(this,"byteAlignment");d(this,"ready",Promise.resolve(this));d(this,"isReady",!0);d(this,"updateTimestamp");if(this.dimension=this.props.dimension,this.baseDimension=Uy[this.dimension],this.format=this.props.format,this.width=this.props.width,this.height=this.props.height,this.depth=this.props.depth,this.mipLevels=this.props.mipLevels,this.samples=this.props.samples||1,this.dimension==="cube"&&(this.depth=6),this.props.width===void 0||this.props.height===void 0)if(t.isExternalImage(n.data)){const s=t.getExternalImageSize(n.data);this.width=(s==null?void 0:s.width)||1,this.height=(s==null?void 0:s.height)||1}else this.width=1,this.height=1,(this.props.width===void 0||this.props.height===void 0)&&T.warn(`${this} created with undefined width or height. This is deprecated. Use DynamicTexture instead.`)();this.byteAlignment=(r==null?void 0:r.byteAlignment)||1,this.updateTimestamp=t.incrementTimestamp()}get[Symbol.toStringTag](){return"Texture"}toString(){return`Texture(${this.id},${this.format},${this.width}x${this.height})`}clone(t){return this.device.createTexture({...this.props,...t})}setSampler(t){this.sampler=t instanceof Lr?t:this.device.createSampler(t)}copyImageData(t){const{data:n,depth:r,...s}=t;this.writeData(n,{...s,depthOrArrayLayers:s.depthOrArrayLayers??r})}computeMemoryLayout(t={}){const n=this._normalizeTextureReadOptions(t),{width:r=this.width,height:s=this.height,depthOrArrayLayers:o=this.depth}=n,{format:a,byteAlignment:c}=this;return Be.computeMemoryLayout({format:a,width:r,height:s,depth:o,byteAlignment:c})}readBuffer(t,n){throw new Error("readBuffer not implemented")}readDataAsync(t){throw new Error("readBuffer not implemented")}writeBuffer(t,n){throw new Error("readBuffer not implemented")}writeData(t,n){throw new Error("readBuffer not implemented")}readDataSyncWebGL(t){throw new Error("readDataSyncWebGL not available")}generateMipmapsWebGL(){throw new Error("generateMipmapsWebGL not available")}static normalizeProps(t,n){const r={...n},{width:s,height:o}=r;return typeof s=="number"&&(r.width=Math.max(1,Math.ceil(s))),typeof o=="number"&&(r.height=Math.max(1,Math.ceil(o))),r}_initializeData(t){this.device.isExternalImage(t)?this.copyExternalImage({image:t,width:this.width,height:this.height,depth:this.depth,mipLevel:0,x:0,y:0,z:0,aspect:"all",colorSpace:"srgb",premultipliedAlpha:!1,flipY:!1}):t&&this.copyImageData({data:t,mipLevel:0,x:0,y:0,z:0,aspect:"all"})}_normalizeCopyImageDataOptions(t){const{data:n,depth:r,...s}=t,o=this._normalizeTextureWriteOptions({...s,depthOrArrayLayers:s.depthOrArrayLayers??r});return{data:n,depth:o.depthOrArrayLayers,...o}}_normalizeCopyExternalImageOptions(t){const n=ee._omitUndefined(t),r=n.mipLevel??0,s=this._getMipLevelSize(r),o=this.device.getExternalImageSize(t.image),a={...ee.defaultCopyExternalImageOptions,...s,...o,...n};return a.width=Math.min(a.width,s.width-a.x),a.height=Math.min(a.height,s.height-a.y),a.depth=Math.min(a.depth,s.depthOrArrayLayers-a.z),a}_normalizeCopyElementImageOptions(t){const n=ee._omitUndefined(t),r=n.mipLevel??0,s=this._getMipLevelSize(r),o={...ee.defaultCopyElementImageOptions,...s,...n};return o.width=Math.min(o.width,s.width-o.x),o.height=Math.min(o.height,s.height-o.y),o.depth=Math.min(o.depth,s.depthOrArrayLayers-o.z),o}_normalizeTextureReadOptions(t){const n=ee._omitUndefined(t),r=n.mipLevel??0,s=this._getMipLevelSize(r),o={...ee.defaultTextureReadOptions,...s,...n};return o.width=Math.min(o.width,s.width-o.x),o.height=Math.min(o.height,s.height-o.y),o.depthOrArrayLayers=Math.min(o.depthOrArrayLayers,s.depthOrArrayLayers-o.z),o}_getSupportedColorReadOptions(t){const n=this._normalizeTextureReadOptions(t),r=Be.getInfo(this.format);switch(this._validateColorReadAspect(n),this._validateColorReadFormat(r),this.dimension){case"2d":case"cube":case"cube-array":case"2d-array":case"3d":return n;default:throw new Error(`${this} color readback does not support ${this.dimension} textures`)}}_validateColorReadAspect(t){if(t.aspect!=="all")throw new Error(`${this} color readback only supports aspect 'all'`)}_validateColorReadFormat(t){if(t.compressed)throw new Error(`${this} color readback does not support compressed formats (${this.format})`);switch(t.attachment){case"color":return;case"depth":throw new Error(`${this} color readback does not support depth formats (${this.format})`);case"stencil":throw new Error(`${this} color readback does not support stencil formats (${this.format})`);case"depth-stencil":throw new Error(`${this} color readback does not support depth-stencil formats (${this.format})`);default:throw new Error(`${this} color readback does not support format ${this.format}`)}}_normalizeTextureWriteOptions(t){const n=ee._omitUndefined(t),r=n.mipLevel??0,s=this._getMipLevelSize(r),o={...ee.defaultTextureWriteOptions,...s,...n};o.width=Math.min(o.width,s.width-o.x),o.height=Math.min(o.height,s.height-o.y),o.depthOrArrayLayers=Math.min(o.depthOrArrayLayers,s.depthOrArrayLayers-o.z);const a=Be.computeMemoryLayout({format:this.format,width:o.width,height:o.height,depth:o.depthOrArrayLayers,byteAlignment:this.byteAlignment}),c=a.bytesPerPixel*o.width;if(o.bytesPerRow=n.bytesPerRow??a.bytesPerRow,o.rowsPerImage=n.rowsPerImage??o.height,o.bytesPerRow<c)throw new Error(`bytesPerRow (${o.bytesPerRow}) must be at least ${c} for ${this.format}`);if(o.rowsPerImage<o.height)throw new Error(`rowsPerImage (${o.rowsPerImage}) must be at least ${o.height} for ${this.format}`);const l=this.device.getTextureFormatInfo(this.format).bytesPerPixel;if(l&&o.bytesPerRow%l!==0)throw new Error(`bytesPerRow (${o.bytesPerRow}) must be a multiple of bytesPerPixel (${l}) for ${this.format}`);return o}_getMipLevelSize(t){const n=Math.max(1,this.width>>t),r=this.baseDimension==="1d"?1:Math.max(1,this.height>>t),s=this.dimension==="3d"?Math.max(1,this.depth>>t):this.depth;return{width:n,height:r,depthOrArrayLayers:s}}getAllocatedByteLength(){let t=0;for(let n=0;n<this.mipLevels;n++){const{width:r,height:s,depthOrArrayLayers:o}=this._getMipLevelSize(n);t+=Be.computeMemoryLayout({format:this.format,width:r,height:s,depth:o,byteAlignment:1}).byteLength}return t*this.samples}static _omitUndefined(t){return Object.fromEntries(Object.entries(t).filter(([,n])=>n!==void 0))}};d(ee,"SAMPLE",4),d(ee,"STORAGE",8),d(ee,"RENDER",16),d(ee,"COPY_SRC",1),d(ee,"COPY_DST",2),d(ee,"TEXTURE",4),d(ee,"RENDER_ATTACHMENT",16),d(ee,"defaultProps",{...H.defaultProps,data:null,dimension:"2d",format:"rgba8unorm",usage:ee.SAMPLE|ee.RENDER|ee.COPY_DST,width:void 0,height:void 0,depth:1,mipLevels:1,samples:void 0,sampler:{},view:void 0}),d(ee,"defaultCopyDataOptions",{data:void 0,byteOffset:0,bytesPerRow:void 0,rowsPerImage:void 0,width:void 0,height:void 0,depthOrArrayLayers:void 0,depth:1,mipLevel:0,x:0,y:0,z:0,aspect:"all"}),d(ee,"defaultCopyExternalImageOptions",{image:void 0,sourceX:0,sourceY:0,width:void 0,height:void 0,depth:1,mipLevel:0,x:0,y:0,z:0,aspect:"all",colorSpace:"srgb",premultipliedAlpha:!1,flipY:!1}),d(ee,"defaultCopyElementImageOptions",{element:void 0,width:void 0,height:void 0,sourceX:0,sourceY:0,sourceWidth:void 0,sourceHeight:void 0,depth:1,mipLevel:0,x:0,y:0,z:0,aspect:"all",colorSpace:"srgb",premultipliedAlpha:!1,flipY:!1}),d(ee,"defaultTextureReadOptions",{x:0,y:0,z:0,width:void 0,height:void 0,depthOrArrayLayers:1,mipLevel:0,aspect:"all"}),d(ee,"defaultTextureWriteOptions",{byteOffset:0,bytesPerRow:void 0,rowsPerImage:void 0,x:0,y:0,z:0,width:void 0,height:void 0,depthOrArrayLayers:1,mipLevel:0,aspect:"all"});let he=ee;const Kr=class Kr extends H{get[Symbol.toStringTag](){return"TextureView"}constructor(e,t){super(e,t,Kr.defaultProps)}};d(Kr,"defaultProps",{...H.defaultProps,format:void 0,dimension:void 0,aspect:"all",baseMipLevel:0,mipLevelCount:void 0,baseArrayLayer:0,arrayLayerCount:void 0});let Tr=Kr;const Qr=class Qr extends H{constructor(t,n){super(t,n,Qr.defaultProps);d(this,"width");d(this,"height");d(this,"updateTimestamp");const r=this.props.source?t.getExternalImageSize(this.props.source):null;this.width=this.props.width||(r==null?void 0:r.width)||0,this.height=this.props.height||(r==null?void 0:r.height)||0,this.updateTimestamp=t.incrementTimestamp()}get[Symbol.toStringTag](){return"ExternalTexture"}};d(Qr,"defaultProps",{...H.defaultProps,source:void 0,width:0,height:0,colorSpace:"srgb",sampler:{}});let Jo=Qr;function zy(i,e,t){let n="";const r=e.split(/\r?\n/),s=i.slice().sort((o,a)=>o.lineNum-a.lineNum);switch((t==null?void 0:t.showSourceCode)||"no"){case"all":let o=0;for(let a=1;a<=r.length;a++){const c=r[a-1],l=s[o];for(c&&l&&(n+=Xh(c,a,t));s.length>o&&l.lineNum===a;){const u=s[o++];u&&(n+=Ws(u,r,u.lineNum,{...t,inlineSource:!1}))}}for(;s.length>o;){const a=s[o++];a&&(n+=Ws(a,[],0,{...t,inlineSource:!1}))}return n;case"issues":case"no":for(const a of i)n+=Ws(a,r,a.lineNum,{inlineSource:(t==null?void 0:t.showSourceCode)!=="no"});return n}}function Ws(i,e,t,n){if(n!=null&&n.inlineSource){const s=$y(e,t),o=i.linePos>0?`${" ".repeat(i.linePos+5)}^^^
`:"";return`
${s}${o}${i.type.toUpperCase()}: ${i.message}

`}const r=i.type==="error"?"red":"orange";return n!=null&&n.html?`<div class='luma-compiler-log-${i.type}' style="color:${r};"><b> ${i.type.toUpperCase()}: ${i.message}</b></div>`:`${i.type.toUpperCase()}: ${i.message}`}function $y(i,e,t){let n="";for(let r=e-2;r<=e;r++){const s=i[r-1];s!==void 0&&(n+=Xh(s,e,t))}return n}function Xh(i,e,t){const n=t!=null&&t.html?Vy(i):i;return`${Gy(String(e),4)}: ${n}${t!=null&&t.html?"<br/>":`
`}`}function Gy(i,e){let t="";for(let n=i.length;n<e;++n)t+=" ";return t+i}function Vy(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Jr=class Jr extends H{constructor(t,n){n={...n,debugShaders:n.debugShaders||t.props.debugShaders||"errors"};super(t,{id:jy(n),...n},Jr.defaultProps);d(this,"stage");d(this,"source");d(this,"compilationStatus","pending");this.stage=this.props.stage,this.source=this.props.source}get[Symbol.toStringTag](){return"Shader"}getCompilationInfoSync(){return null}getTranslatedSource(){return null}async debugShader(){const t=this.props.debugShaders;switch(t){case"never":return;case"errors":if(this.compilationStatus==="success")return;break}try{const n=await this.getCompilationInfo();if(t==="warnings"&&(n==null?void 0:n.length)===0)return;this._displayShaderLog(n,this.id)}catch(n){T.warn(`Shader ${this.id}: failed to fetch compilation info during debug logging`,n)()}}_displayShaderLog(t,n){if(typeof document>"u"||!(document!=null&&document.createElement))return;const r=n,s=`${this.stage} shader "${r}"`,o=zy(t,this.source,{showSourceCode:"all",html:!0}),a=this.getTranslatedSource(),c=document.createElement("div");c.innerHTML=`<h1>Compilation error in ${s}</h1>
<div style="display:flex;position:fixed;top:10px;right:20px;gap:2px;">
<button id="copy">Copy source</button><br/>
<button id="close">Close</button>
</div>
<code><pre>${o}</pre></code>`,a&&(c.innerHTML+=`<br /><h1>Translated Source</h1><br /><br /><code><pre>${a}</pre></code>`),c.style.top="0",c.style.left="0",c.style.background="white",c.style.position="fixed",c.style.zIndex="9999",c.style.maxWidth="100vw",c.style.maxHeight="100vh",c.style.overflowY="auto",document.body.appendChild(c);const l=c.querySelector(".luma-compiler-log-error");l==null||l.scrollIntoView(),c.querySelector("button#close").onclick=()=>{c.remove()},c.querySelector("button#copy").onclick=()=>{navigator.clipboard.writeText(this.source)}}};d(Jr,"defaultProps",{...H.defaultProps,language:"auto",stage:void 0,source:"",sourceMap:null,entryPoint:"main",debugShaders:void 0});let Ar=Jr;function jy(i){return Wy(i.source)||i.id||vn(`unnamed ${i.stage}-shader`)}function Wy(i,e="unnamed"){const n=/#define[\s*]SHADER_NAME[\s*]([A-Za-z0-9_-]+)[\s*]/.exec(i);return(n==null?void 0:n[1])??e}const es=class es extends H{constructor(t,n={}){super(t,n,es.defaultProps);d(this,"width");d(this,"height");this.width=this.props.width,this.height=this.props.height}get[Symbol.toStringTag](){return"Framebuffer"}clone(t){const n=this.colorAttachments.map(s=>s.texture.clone(t)),r=this.depthStencilAttachment&&this.depthStencilAttachment.texture.clone(t);return this.device.createFramebuffer({...this.props,...t,colorAttachments:n,depthStencilAttachment:r})}resize(t){let n=!t;if(t){const[r,s]=Array.isArray(t)?t:[t.width,t.height];n=n||s!==this.height||r!==this.width,this.width=r,this.height=s}n&&(T.log(2,`Resizing framebuffer ${this.id} to ${this.width}x${this.height}`)(),this.resizeAttachments(this.width,this.height))}autoCreateAttachmentTextures(){if(this.props.colorAttachments.length===0&&!this.props.depthStencilAttachment)throw new Error("Framebuffer has noattachments");this.colorAttachments=this.props.colorAttachments.map((n,r)=>{if(typeof n=="string"){const s=this.createColorTexture(n,r);return this.attachResource(s),s.view}return n instanceof he?n.view:n});const t=this.props.depthStencilAttachment;if(t)if(typeof t=="string"){const n=this.createDepthStencilTexture(t);this.attachResource(n),this.depthStencilAttachment=n.view}else t instanceof he?this.depthStencilAttachment=t.view:this.depthStencilAttachment=t}createColorTexture(t,n){return this.device.createTexture({id:`${this.id}-color-attachment-${n}`,usage:he.RENDER_ATTACHMENT,format:t,width:this.width,height:this.height,sampler:{magFilter:"linear",minFilter:"linear"}})}createDepthStencilTexture(t){return this.device.createTexture({id:`${this.id}-depth-stencil-attachment`,usage:he.RENDER_ATTACHMENT|he.SAMPLE,format:t,width:this.width,height:this.height})}resizeAttachments(t,n){if(this.colorAttachments.forEach((r,s)=>{const o=r.texture.clone({width:t,height:n});this.destroyAttachedResource(r),this.colorAttachments[s]=o.view,this.attachResource(o.view)}),this.depthStencilAttachment){const r=this.depthStencilAttachment.texture.clone({width:t,height:n});this.destroyAttachedResource(this.depthStencilAttachment),this.depthStencilAttachment=r.view,this.attachResource(r)}this.updateAttachments()}};d(es,"defaultProps",{...H.defaultProps,width:1,height:1,colorAttachments:[],depthStencilAttachment:null});let Cr=es;const ts=class ts extends H{constructor(t,n){super(t,n,ts.defaultProps);d(this,"shaderLayout");d(this,"bufferLayout");d(this,"linkStatus","pending");d(this,"hash","");d(this,"sharedRenderPipeline",null);this.shaderLayout=this.props.shaderLayout,this.bufferLayout=this.props.bufferLayout||[],this.sharedRenderPipeline=this.props._sharedRenderPipeline||null}get[Symbol.toStringTag](){return"RenderPipeline"}get isPending(){var t;return this.linkStatus==="pending"||this.vs.compilationStatus==="pending"||((t=this.fs)==null?void 0:t.compilationStatus)==="pending"}get isErrored(){var t;return this.linkStatus==="error"||this.vs.compilationStatus==="error"||((t=this.fs)==null?void 0:t.compilationStatus)==="error"}};d(ts,"defaultProps",{...H.defaultProps,vs:null,vertexEntryPoint:"vertexMain",vsConstants:{},fs:null,fragmentEntryPoint:"fragmentMain",fsConstants:{},shaderLayout:null,bufferLayout:[],topology:"triangle-list",colorAttachmentFormats:void 0,depthStencilAttachmentFormat:void 0,parameters:{},varyings:void 0,bufferMode:void 0,disableWarnings:!1,_sharedRenderPipeline:void 0,_uniformBlockLayouts:[],bindings:void 0,bindGroups:void 0});let ct=ts;class Hy extends H{get[Symbol.toStringTag](){return"SharedRenderPipeline"}constructor(e,t){super(e,t,{...H.defaultProps,handle:void 0,vs:void 0,fs:void 0,varyings:void 0,bufferMode:void 0})}}const is=class is extends H{constructor(t,n){super(t,n,is.defaultProps);d(this,"hash","");d(this,"shaderLayout");this.shaderLayout=n.shaderLayout}get[Symbol.toStringTag](){return"ComputePipeline"}};d(is,"defaultProps",{...H.defaultProps,shader:void 0,entryPoint:void 0,constants:{},shaderLayout:void 0});let ln=is;const ns=class ns{constructor(e){d(this,"device");d(this,"_hashCounter",0);d(this,"_hashes",{});d(this,"_renderPipelineCache",{});d(this,"_computePipelineCache",{});d(this,"_sharedRenderPipelineCache",{});this.device=e}static getDefaultPipelineFactory(e){const t=e.getModuleData("@luma.gl/core");return t.defaultPipelineFactory||(t.defaultPipelineFactory=new ns(e)),t.defaultPipelineFactory}get[Symbol.toStringTag](){return"PipelineFactory"}toString(){return`PipelineFactory(${this.device.id})`}createRenderPipeline(e){var o;if(!this.device.props._cachePipelines)return this.device.createRenderPipeline(e);const t={...ct.defaultProps,...e},n=this._renderPipelineCache,r=this._hashRenderPipeline(t);let s=(o=n[r])==null?void 0:o.resource;if(s)n[r].useCount++,this.device.props.debugFactories&&T.log(3,`${this}: ${n[r].resource} reused, count=${n[r].useCount}, (id=${e.id})`)();else{const a=this.device.type==="webgl"&&this.device.props._sharePipelines?this.createSharedRenderPipeline(t):void 0;s=this.device.createRenderPipeline({...t,id:t.id?`${t.id}-cached`:vn("unnamed-cached"),_sharedRenderPipeline:a}),s.hash=r,n[r]={resource:s,useCount:1},this.device.props.debugFactories&&T.log(3,`${this}: ${s} created, count=${n[r].useCount}`)()}return s}createComputePipeline(e){var o;if(!this.device.props._cachePipelines)return this.device.createComputePipeline(e);const t={...ln.defaultProps,...e},n=this._computePipelineCache,r=this._hashComputePipeline(t);let s=(o=n[r])==null?void 0:o.resource;return s?(n[r].useCount++,this.device.props.debugFactories&&T.log(3,`${this}: ${n[r].resource} reused, count=${n[r].useCount}, (id=${e.id})`)()):(s=this.device.createComputePipeline({...t,id:t.id?`${t.id}-cached`:void 0}),s.hash=r,n[r]={resource:s,useCount:1},this.device.props.debugFactories&&T.log(3,`${this}: ${s} created, count=${n[r].useCount}`)()),s}release(e){if(!this.device.props._cachePipelines){e.destroy();return}const t=this._getCache(e),n=e.hash;t[n].useCount--,t[n].useCount===0?(this._destroyPipeline(e),this.device.props.debugFactories&&T.log(3,`${this}: ${e} released and destroyed`)()):t[n].useCount<0?(T.error(`${this}: ${e} released, useCount < 0, resetting`)(),t[n].useCount=0):this.device.props.debugFactories&&T.log(3,`${this}: ${e} released, count=${t[n].useCount}`)()}createSharedRenderPipeline(e){const t=this._hashSharedRenderPipeline(e);let n=this._sharedRenderPipelineCache[t];return n||(n={resource:this.device._createSharedRenderPipelineWebGL(e),useCount:0},this._sharedRenderPipelineCache[t]=n),n.useCount++,n.resource}releaseSharedRenderPipeline(e){if(!e.sharedRenderPipeline)return;const t=this._hashSharedRenderPipeline(e.sharedRenderPipeline.props),n=this._sharedRenderPipelineCache[t];n&&(n.useCount--,n.useCount===0&&(n.resource.destroy(),delete this._sharedRenderPipelineCache[t]))}_destroyPipeline(e){const t=this._getCache(e);return this.device.props._destroyPipelines?(delete t[e.hash],e.destroy(),e instanceof ct&&this.releaseSharedRenderPipeline(e),!0):!1}_getCache(e){let t;if(e instanceof ln&&(t=this._computePipelineCache),e instanceof ct&&(t=this._renderPipelineCache),!t)throw new Error(`${this}`);if(!t[e.hash])throw new Error(`${this}: ${e} matched incorrect entry`);return t}_hashComputePipeline(e){const{type:t}=this.device,n=this._getHash(e.shader.source),r=this._getHash(JSON.stringify(e.shaderLayout));return`${t}/C/${n}SL${r}`}_hashRenderPipeline(e){const t=e.vs?this._getHash(e.vs.source):0,n=e.fs?this._getHash(e.fs.source):0,r=this._getWebGLVaryingHash(e),s=this._getHash(JSON.stringify(e.shaderLayout)),o=this._getHash(JSON.stringify(e._uniformBlockLayouts)),a=this._getHash(JSON.stringify(e.bufferLayout)),{type:c}=this.device;switch(c){case"webgl":const l=this._getHash(JSON.stringify(e.parameters));return`${c}/R/${t}/${n}V${r}T${e.topology}P${l}SL${s}UBL${o}BL${a}`;case"webgpu":default:const u=this._getHash(JSON.stringify({vertexEntryPoint:e.vertexEntryPoint,fragmentEntryPoint:e.fragmentEntryPoint})),f=this._getHash(JSON.stringify(e.parameters)),h=this._getWebGPUAttachmentHash(e);return`${c}/R/${t}/${n}V${r}T${e.topology}EP${u}P${f}SL${s}BL${a}A${h}`}}_hashSharedRenderPipeline(e){const t=e.vs?this._getHash(e.vs.source):0,n=e.fs?this._getHash(e.fs.source):0,r=this._getWebGLVaryingHash(e);return`webgl/S/${t}/${n}V${r}`}_getHash(e){return this._hashes[e]===void 0&&(this._hashes[e]=this._hashCounter++),this._hashes[e]}_getWebGLVaryingHash(e){const{varyings:t=[],bufferMode:n=null}=e;return this._getHash(JSON.stringify({varyings:t,bufferMode:n}))}_getWebGPUAttachmentHash(e){var r;const t=e.colorAttachmentFormats??[this.device.preferredColorFormat],n=e.depthStencilAttachmentFormat??((r=e.parameters)!=null&&r.depthWriteEnabled?this.device.preferredDepthFormat:null);return this._getHash(JSON.stringify({colorAttachmentFormats:t,depthStencilAttachmentFormat:n}))}};d(ns,"defaultProps",{...ct.defaultProps});let Mr=ns;const rs=class rs{constructor(e){d(this,"device");d(this,"_cache",{});this.device=e}static getDefaultShaderFactory(e){const t=e.getModuleData("@luma.gl/core");return t.defaultShaderFactory||(t.defaultShaderFactory=new rs(e)),t.defaultShaderFactory}get[Symbol.toStringTag](){return"ShaderFactory"}toString(){return`${this[Symbol.toStringTag]}(${this.device.id})`}createShader(e){if(!this.device.props._cacheShaders)return this.device.createShader(e);const t=this._hashShader(e);let n=this._cache[t];if(n)n.useCount++,this.device.props.debugFactories&&T.log(3,`${this}: Reusing shader ${n.resource.id} count=${n.useCount}`)();else{const r=this.device.createShader({...e,id:e.id?`${e.id}-cached`:void 0});this._cache[t]=n={resource:r,useCount:1},this.device.props.debugFactories&&T.log(3,`${this}: Created new shader ${r.id}`)()}return n.resource}release(e){if(!this.device.props._cacheShaders){e.destroy();return}const t=this._hashShader(e),n=this._cache[t];if(n)if(n.useCount--,n.useCount===0)this.device.props._destroyShaders&&(delete this._cache[t],n.resource.destroy(),this.device.props.debugFactories&&T.log(3,`${this}: Releasing shader ${e.id}, destroyed`)());else{if(n.useCount<0)throw new Error(`ShaderFactory: Shader ${e.id} released too many times`);this.device.props.debugFactories&&T.log(3,`${this}: Releasing shader ${e.id} count=${n.useCount}`)()}}_hashShader(e){return`${e.stage}:${e.source}`}};d(rs,"defaultProps",{...Ar.defaultProps});let Ir=rs;function Kh(i,e,t){const n=i.bindings.find(r=>r.name===e||`${r.name.toLocaleLowerCase()}uniforms`===e.toLocaleLowerCase());return!n&&!(t!=null&&t.ignoreWarnings)&&T.warn(`Binding ${e} not set: Not found in shader layout.`)(),n||null}function uc(i,e){if(!e)return{};if(Yy(e))return Object.fromEntries(Object.entries(e).map(([r,s])=>[Number(r),{...s}]));const t={};for(const[n,r]of Object.entries(e)){const s=Kh(i,n),o=(s==null?void 0:s.group)??0;t[o]||(t[o]={}),t[o][n]=r}return t}function ea(i){const e={};for(const t of Object.values(i))Object.assign(e,t);return e}function Yy(i){const e=Object.keys(i);return e.length>0&&e.every(t=>/^\d+$/.test(t))}const Re=class Re extends H{get[Symbol.toStringTag](){return"RenderPass"}constructor(e,t,n=Re.defaultProps){t=Re.normalizeProps(e,t),super(e,t,n)}static normalizeProps(e,t){return t}};d(Re,"defaultClearColor",[0,0,0,1]),d(Re,"defaultClearDepth",1),d(Re,"defaultClearStencil",0),d(Re,"defaultProps",{...H.defaultProps,framebuffer:null,resolveTargets:void 0,parameters:void 0,clearColor:Re.defaultClearColor,clearColors:void 0,clearDepth:Re.defaultClearDepth,clearStencil:Re.defaultClearStencil,depthReadOnly:!1,stencilReadOnly:!1,discard:!1,occlusionQuerySet:void 0,timestampQuerySet:void 0,beginTimestampIndex:void 0,endTimestampIndex:void 0});let ta=Re;const ss=class ss extends H{constructor(t,n){super(t,n,ss.defaultProps);d(this,"_timeProfilingQuerySet",null);d(this,"_timeProfilingSlotCount",0);d(this,"_gpuTimeMs");this._timeProfilingQuerySet=n.timeProfilingQuerySet??null,this._timeProfilingSlotCount=0,this._gpuTimeMs=void 0}get[Symbol.toStringTag](){return"CommandEncoder"}async resolveTimeProfilingQuerySet(){if(this._gpuTimeMs=void 0,!this._timeProfilingQuerySet)return;const t=Math.floor(this._timeProfilingSlotCount/2);if(t<=0)return;const n=t*2,r=await this._timeProfilingQuerySet.readResults({firstQuery:0,queryCount:n});let s=0n;for(let o=0;o<n;o+=2)s+=r[o+1]-r[o];this._gpuTimeMs=Number(s)/1e6}getTimeProfilingSlotCount(){return this._timeProfilingSlotCount}getTimeProfilingQuerySet(){return this._timeProfilingQuerySet}_applyTimeProfilingToPassProps(t){const n=t||{};if(!this._supportsTimestampQueries()||!this._timeProfilingQuerySet||n.timestampQuerySet!==void 0||n.beginTimestampIndex!==void 0||n.endTimestampIndex!==void 0)return n;const r=this._timeProfilingSlotCount;return r+1>=this._timeProfilingQuerySet.props.count?n:(this._timeProfilingSlotCount+=2,{...n,timestampQuerySet:this._timeProfilingQuerySet,beginTimestampIndex:r,endTimestampIndex:r+1})}_supportsTimestampQueries(){return this.device.features.has("timestamp-query")}};d(ss,"defaultProps",{...H.defaultProps,measureExecutionTime:void 0,timeProfilingQuerySet:void 0});let ia=ss;const os=class os extends H{get[Symbol.toStringTag](){return"CommandBuffer"}constructor(e,t){super(e,t,os.defaultProps)}};d(os,"defaultProps",{...H.defaultProps});let na=os;const as=class as extends H{constructor(t,n){super(t,n,as.defaultProps);d(this,"maxVertexAttributes");d(this,"indexBuffer",null);d(this,"attributes");this.maxVertexAttributes=t.limits.maxVertexAttributes,this.attributes=new Array(this.maxVertexAttributes).fill(null)}get[Symbol.toStringTag](){return"VertexArray"}getBufferSlot(t){return null}getDrawValidationError(){return null}setConstantWebGL(t,n){this.device.reportError(new Error("constant attributes not supported"),this)()}};d(as,"defaultProps",{...H.defaultProps,shaderLayout:void 0,bufferLayout:[]});let ra=as;const cs=class cs extends H{get[Symbol.toStringTag](){return"TransformFeedback"}constructor(e,t){super(e,t,cs.defaultProps)}};d(cs,"defaultProps",{...H.defaultProps,layout:void 0,buffers:{}});let sa=cs;const ls=class ls extends H{get[Symbol.toStringTag](){return"QuerySet"}constructor(e,t){super(e,t,ls.defaultProps)}};d(ls,"defaultProps",{...H.defaultProps,type:void 0,count:void 0});let oa=ls;const us=class us extends H{get[Symbol.toStringTag](){return"Fence"}constructor(e,t={}){super(e,t,us.defaultProps)}};d(us,"defaultProps",{...H.defaultProps});let aa=us;function fc(i){const e=hc(i),t=Jy[e];if(!t)throw new Error(`Unsupported variable shader type: ${i}`);return t}function qy(i){const e=Qh(i),t=Qy[e];if(!t)throw new Error(`Unsupported attribute shader type: ${i}`);const[n,r]=t,s=n==="i32"||n==="u32",o=n!=="u32",a=Ky[n]*r;return{primitiveType:n,components:r,byteLength:a,integer:s,signed:o}}class Zy{getVariableShaderTypeInfo(e){return fc(e)}getAttributeShaderTypeInfo(e){return qy(e)}makeShaderAttributeType(e,t){return Xy(e,t)}resolveAttributeShaderTypeAlias(e){return Qh(e)}resolveVariableShaderTypeAlias(e){return hc(e)}}function Xy(i,e){return e===1?i:`vec${e}<${i}>`}function Qh(i){return ev[i]||i}function hc(i){return tv[i]||i}const Pi=new Zy,Ky={f32:4,f16:2,i32:4,u32:4},Qy={f32:["f32",1],"vec2<f32>":["f32",2],"vec3<f32>":["f32",3],"vec4<f32>":["f32",4],f16:["f16",1],"vec2<f16>":["f16",2],"vec3<f16>":["f16",3],"vec4<f16>":["f16",4],i32:["i32",1],"vec2<i32>":["i32",2],"vec3<i32>":["i32",3],"vec4<i32>":["i32",4],u32:["u32",1],"vec2<u32>":["u32",2],"vec3<u32>":["u32",3],"vec4<u32>":["u32",4]},Jy={f32:{type:"f32",components:1},f16:{type:"f16",components:1},i32:{type:"i32",components:1},u32:{type:"u32",components:1},"vec2<f32>":{type:"f32",components:2},"vec3<f32>":{type:"f32",components:3},"vec4<f32>":{type:"f32",components:4},"vec2<f16>":{type:"f16",components:2},"vec3<f16>":{type:"f16",components:3},"vec4<f16>":{type:"f16",components:4},"vec2<i32>":{type:"i32",components:2},"vec3<i32>":{type:"i32",components:3},"vec4<i32>":{type:"i32",components:4},"vec2<u32>":{type:"u32",components:2},"vec3<u32>":{type:"u32",components:3},"vec4<u32>":{type:"u32",components:4},"mat2x2<f32>":{type:"f32",components:4},"mat2x3<f32>":{type:"f32",components:6},"mat2x4<f32>":{type:"f32",components:8},"mat3x2<f32>":{type:"f32",components:6},"mat3x3<f32>":{type:"f32",components:9},"mat3x4<f32>":{type:"f32",components:12},"mat4x2<f32>":{type:"f32",components:8},"mat4x3<f32>":{type:"f32",components:12},"mat4x4<f32>":{type:"f32",components:16},"mat2x2<f16>":{type:"f16",components:4},"mat2x3<f16>":{type:"f16",components:6},"mat2x4<f16>":{type:"f16",components:8},"mat3x2<f16>":{type:"f16",components:6},"mat3x3<f16>":{type:"f16",components:9},"mat3x4<f16>":{type:"f16",components:12},"mat4x2<f16>":{type:"f16",components:8},"mat4x3<f16>":{type:"f16",components:12},"mat4x4<f16>":{type:"f16",components:16},"mat2x2<i32>":{type:"i32",components:4},"mat2x3<i32>":{type:"i32",components:6},"mat2x4<i32>":{type:"i32",components:8},"mat3x2<i32>":{type:"i32",components:6},"mat3x3<i32>":{type:"i32",components:9},"mat3x4<i32>":{type:"i32",components:12},"mat4x2<i32>":{type:"i32",components:8},"mat4x3<i32>":{type:"i32",components:12},"mat4x4<i32>":{type:"i32",components:16},"mat2x2<u32>":{type:"u32",components:4},"mat2x3<u32>":{type:"u32",components:6},"mat2x4<u32>":{type:"u32",components:8},"mat3x2<u32>":{type:"u32",components:6},"mat3x3<u32>":{type:"u32",components:9},"mat3x4<u32>":{type:"u32",components:12},"mat4x2<u32>":{type:"u32",components:8},"mat4x3<u32>":{type:"u32",components:12},"mat4x4<u32>":{type:"u32",components:16}},ev={vec2i:"vec2<i32>",vec3i:"vec3<i32>",vec4i:"vec4<i32>",vec2u:"vec2<u32>",vec3u:"vec3<u32>",vec4u:"vec4<u32>",vec2f:"vec2<f32>",vec3f:"vec3<f32>",vec4f:"vec4<f32>",vec2h:"vec2<f16>",vec3h:"vec3<f16>",vec4h:"vec4<f16>"},tv={vec2i:"vec2<i32>",vec3i:"vec3<i32>",vec4i:"vec4<i32>",vec2u:"vec2<u32>",vec3u:"vec3<u32>",vec4u:"vec4<u32>",vec2f:"vec2<f32>",vec3f:"vec3<f32>",vec4f:"vec4<f32>",vec2h:"vec2<f16>",vec3h:"vec3<f16>",vec4h:"vec4<f16>",mat2x2f:"mat2x2<f32>",mat2x3f:"mat2x3<f32>",mat2x4f:"mat2x4<f32>",mat3x2f:"mat3x2<f32>",mat3x3f:"mat3x3<f32>",mat3x4f:"mat3x4<f32>",mat4x2f:"mat4x2<f32>",mat4x3f:"mat4x3<f32>",mat4x4f:"mat4x4<f32>",mat2x2i:"mat2x2<i32>",mat2x3i:"mat2x3<i32>",mat2x4i:"mat2x4<i32>",mat3x2i:"mat3x2<i32>",mat3x3i:"mat3x3<i32>",mat3x4i:"mat3x4<i32>",mat4x2i:"mat4x2<i32>",mat4x3i:"mat4x3<i32>",mat4x4i:"mat4x4<i32>",mat2x2u:"mat2x2<u32>",mat2x3u:"mat2x3<u32>",mat2x4u:"mat2x4<u32>",mat3x2u:"mat3x2<u32>",mat3x3u:"mat3x3<u32>",mat3x4u:"mat3x4<u32>",mat4x2u:"mat4x2<u32>",mat4x3u:"mat4x3<u32>",mat4x4u:"mat4x4<u32>",mat2x2h:"mat2x2<f16>",mat2x3h:"mat2x3<f16>",mat2x4h:"mat2x4<f16>",mat3x2h:"mat3x2<f16>",mat3x3h:"mat3x3<f16>",mat3x4h:"mat3x4<f16>",mat4x2h:"mat4x2<f16>",mat4x3h:"mat4x3<f16>",mat4x4h:"mat4x4<f16>"};function dc(i,e={}){const t={...i},n=e.layout??"std140",r={};let s=0;for(const[o,a]of Object.entries(t))s=ca(r,o,a,s,n);return s=qe(s,gt(t,n)),{layout:n,byteLength:s*4,uniformTypes:t,fields:r}}function ys(i,e){const t=hc(i),n=fc(t),r=/^mat(\d)x(\d)<.+>$/.exec(t);if(r){const o=Number(r[1]),a=Number(r[2]),c=zl(a,t,n.type),l=nv(c.size,c.alignment,e);return{alignment:c.alignment,size:o*l,components:o*a,columns:o,rows:a,columnStride:l,shaderType:t,type:n.type}}const s=/^vec(\d)<.+>$/.exec(t);return s?zl(Number(s[1]),t,n.type):{alignment:1,size:1,components:1,columns:1,rows:1,columnStride:1,shaderType:t,type:n.type}}function Jh(i){return!!i&&typeof i=="object"&&!Array.isArray(i)}function ca(i,e,t,n,r){if(typeof t=="string"){const s=ys(t,r),o=qe(n,s.alignment);return i[e]={offset:o,...s},o+s.size}if(Array.isArray(t)){if(Array.isArray(t[0]))throw new Error(`Nested arrays are not supported for ${e}`);const s=t[0],o=t[1],a=td(s,r),c=qe(n,gt(t,r));for(let l=0;l<o;l++)ca(i,`${e}[${l}]`,s,c+l*a,r);return c+a*o}if(Jh(t)){const s=gt(t,r);let o=qe(n,s);for(const[a,c]of Object.entries(t))o=ca(i,`${e}.${a}`,c,o,r);return qe(o,s)}throw new Error(`Unsupported CompositeShaderType for ${e}`)}function ed(i,e){if(typeof i=="string")return ys(i,e).size;if(Array.isArray(i)){const n=i[0],r=i[1];if(Array.isArray(n))throw new Error("Nested arrays are not supported");return td(n,e)*r}let t=0;for(const n of Object.values(i)){const r=n;t=qe(t,gt(r,e)),t+=ed(r,e)}return qe(t,gt(i,e))}function gt(i,e){if(typeof i=="string")return ys(i,e).alignment;if(Array.isArray(i)){const n=i[0],r=gt(n,e);return id(e)?Math.max(r,4):r}let t=1;for(const n of Object.values(i)){const r=gt(n,e);t=Math.max(t,r)}return rv(e)?Math.max(t,4):t}function zl(i,e,t,n){return{alignment:i===2?2:4,size:i===3?3:i,components:i,columns:1,rows:i,columnStride:i===3?3:i,shaderType:e,type:t}}function td(i,e){const t=ed(i,e),n=gt(i,e);return iv(t,n,e)}function iv(i,e,t){return qe(i,id(t)?4:e)}function nv(i,e,t){return t==="std140"?4:qe(i,e)}function id(i){return i==="std140"||i==="wgsl-uniform"}function rv(i){return i==="std140"||i==="wgsl-uniform"}let kn;function nd(i){return(!kn||kn.byteLength<i)&&(kn=new ArrayBuffer(i)),kn}function sv(i,e){const t=nd(i.BYTES_PER_ELEMENT*e);return new i(t,0,e)}function ov(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Rr(i){return Array.isArray(i)?i.length===0||typeof i[0]=="number":ov(i)}class av{constructor(e){d(this,"layout");this.layout=e}has(e){return!!this.layout.fields[e]}get(e){const t=this.layout.fields[e];return t?{offset:t.offset,size:t.size}:void 0}getFlatUniformValues(e){const t={};for(const[n,r]of Object.entries(e)){const s=this.layout.uniformTypes[n];s?this._flattenCompositeValue(t,n,s,r):this.layout.fields[n]&&(t[n]=r)}return t}getData(e){const t=nd(this.layout.byteLength);new Uint8Array(t,0,this.layout.byteLength).fill(0);const n={i32:new Int32Array(t),u32:new Uint32Array(t),f32:new Float32Array(t),f16:new Uint16Array(t)},r=this.getFlatUniformValues(e);for(const[s,o]of Object.entries(r))this._writeLeafValue(n,s,o);return new Uint8Array(t,0,this.layout.byteLength)}_flattenCompositeValue(e,t,n,r){if(r!==void 0){if(typeof n=="string"||this.layout.fields[t]){e[t]=r;return}if(Array.isArray(n)){const s=n[0],o=n[1];if(Array.isArray(s))throw new Error(`Nested arrays are not supported for ${t}`);if(typeof s=="string"&&Rr(r)){this._flattenPackedArray(e,t,s,o,r);return}if(!Array.isArray(r)){T.warn(`Unsupported uniform array value for ${t}:`,r)();return}for(let a=0;a<Math.min(r.length,o);a++){const c=r[a];c!==void 0&&this._flattenCompositeValue(e,`${t}[${a}]`,s,c)}return}if(Jh(n)&&cv(r)){for(const[s,o]of Object.entries(r)){if(o===void 0)continue;const a=`${t}.${s}`;this._flattenCompositeValue(e,a,n[s],o)}return}T.warn(`Unsupported uniform value for ${t}:`,r)()}}_flattenPackedArray(e,t,n,r,s){const o=s,c=ys(n,this.layout.layout).components;for(let l=0;l<r;l++){const u=l*c;if(u>=o.length)break;c===1?e[`${t}[${l}]`]=Number(o[u]):e[`${t}[${l}]`]=lv(s,u,u+c)}}_writeLeafValue(e,t,n){const r=this.layout.fields[t];if(!r){T.warn(`Uniform ${t} not found in layout`)();return}const{type:s,components:o,columns:a,rows:c,offset:l,columnStride:u}=r,f=e[s];if(o===1){f[l]=Number(n);return}const h=n;if(a===1){for(let p=0;p<o;p++)f[l+p]=Number(h[p]??0);return}let g=0;for(let p=0;p<a;p++){const m=l+p*u;for(let _=0;_<c;_++)f[m+_]=Number(h[g++]??0)}}}function cv(i){return!!i&&typeof i=="object"&&!Array.isArray(i)&&!ArrayBuffer.isView(i)}function lv(i,e,t){return Array.prototype.slice.call(i,e,t)}const uv=128;function fv(i,e,t=16){if(i===e)return!0;const n=i,r=e;if(!Rr(n)||!Rr(r)||n.length!==r.length)return!1;const s=Math.min(t,uv);if(n.length>s)return!1;for(let o=0;o<n.length;++o)if(r[o]!==n[o])return!1;return!0}function hv(i){return Rr(i)?i.slice():i}class dv{constructor(e){d(this,"name");d(this,"uniforms",{});d(this,"modifiedUniforms",{});d(this,"modified",!0);d(this,"bindingLayout",{});d(this,"needsRedraw","initialized");var t;if(this.name=(e==null?void 0:e.name)||"unnamed",e!=null&&e.name&&(e!=null&&e.shaderLayout)){const n=(t=e==null?void 0:e.shaderLayout.bindings)==null?void 0:t.find(s=>s.type==="uniform"&&s.name===(e==null?void 0:e.name));if(!n)throw new Error(e==null?void 0:e.name);const r=n;for(const s of r.uniforms||[])this.bindingLayout[s.name]=s}}setUniforms(e){for(const[t,n]of Object.entries(e))this._setUniform(t,n)&&!this.needsRedraw&&this.setNeedsRedraw(`${this.name}.${t}=${n}`)}setNeedsRedraw(e){this.needsRedraw=this.needsRedraw||e}getAllUniforms(){return this.modifiedUniforms={},this.needsRedraw=!1,this.uniforms||{}}_setUniform(e,t){return fv(this.uniforms[e],t)?!1:(this.uniforms[e]=hv(t),this.modifiedUniforms[e]=!0,this.modified=!0,!0)}}const gv=1024;class rd{constructor(e,t){d(this,"device");d(this,"uniformBlocks",new Map);d(this,"shaderBlockLayouts",new Map);d(this,"shaderBlockWriters",new Map);d(this,"uniformBuffers",new Map);this.device=e;for(const[n,r]of Object.entries(t)){const s=n,o=dc(r.uniformTypes??{},{layout:r.layout??pv(e)}),a=new av(o);this.shaderBlockLayouts.set(s,o),this.shaderBlockWriters.set(s,a);const c=new dv({name:n});c.setUniforms(a.getFlatUniformValues(r.defaultUniforms||{})),this.uniformBlocks.set(s,c)}}destroy(){for(const e of this.uniformBuffers.values())e.destroy()}setUniforms(e,t){var n;for(const[r,s]of Object.entries(e)){const o=r,a=this.shaderBlockWriters.get(o),c=a==null?void 0:a.getFlatUniformValues(s||{});(n=this.uniformBlocks.get(o))==null||n.setUniforms(c||{})}this.updateUniformBuffers(t)}getUniformBufferByteLength(e){var n;const t=((n=this.shaderBlockLayouts.get(e))==null?void 0:n.byteLength)||0;return Math.max(t,gv)}getUniformBufferData(e){var r;const t=((r=this.uniformBlocks.get(e))==null?void 0:r.getAllUniforms())||{},n=this.shaderBlockWriters.get(e);return(n==null?void 0:n.getData(t))||new Uint8Array(0)}createUniformBuffer(e,t){t&&this.setUniforms(t);const n=this.getUniformBufferByteLength(e),r=this.device.createBuffer({usage:j.UNIFORM|j.COPY_DST,byteLength:n}),s=this.getUniformBufferData(e);return r.write(s),r}getManagedUniformBuffer(e){if(!this.uniformBuffers.get(e)){const t=this.getUniformBufferByteLength(e),n=this.device.createBuffer({usage:j.UNIFORM|j.COPY_DST,byteLength:t});this.uniformBuffers.set(e,n)}return this.uniformBuffers.get(e)}updateUniformBuffers(e){let t=!1;for(const n of this.uniformBlocks.keys()){const r=this.updateUniformBuffer(n,e);t||(t=r)}return t&&T.log(3,`UniformStore.updateUniformBuffers(): ${t}`)(),t}updateUniformBuffer(e,t){var o;const n=this.uniformBlocks.get(e);let r=this.uniformBuffers.get(e),s=!1;if(r&&(n!=null&&n.needsRedraw)){s||(s=n.needsRedraw);const a=this.getUniformBufferData(e);if(r=this.uniformBuffers.get(e),r&&(t?this.device.writeBufferViaCommandEncoder(t,r,a):r.write(a)),T.level>=4){const c=(o=this.uniformBlocks.get(e))==null?void 0:o.getAllUniforms();T.log(4,`Writing to uniform buffer ${String(e)}`,a,c)()}}return s}}function pv(i){return i.type==="webgpu"?"wgsl-uniform":"std140"}function la(i){return i.attributes?i.attributes.map(e=>e.attribute):[i.name]}function mv(i){return Object.fromEntries(i.attributes.map(e=>[e.name,e.location]))}function $l(i){let e=1/0;for(const t of i)t!==void 0&&(e=Math.min(e,t));return e}function _v(i,e,t){bv(e);const n=new Map;for(const r of e){const s=yv(r);if(r.attributes)for(const o of r.attributes)n.has(o.attribute)||n.set(o.attribute,{bufferName:r.name,stepMode:r.stepMode,vertexFormat:o.format,byteOffset:o.byteOffset,byteStride:s});else r.format&&!n.has(r.name)&&n.set(r.name,{bufferName:r.name,stepMode:r.stepMode,vertexFormat:r.format,byteOffset:0,byteStride:s})}return i.attributes.map(r=>{const s=n.get(r.name);!s&&(t!=null&&t.warnOnMissingBufferLayout)&&T.warn(`layout for attribute "${r.name}" not present in buffer layout`)();const o=Pi.getAttributeShaderTypeInfo(r.type),a=(s==null?void 0:s.vertexFormat)||be.getCompatibleVertexFormat(o);return{attributeName:r.name,bufferName:(s==null?void 0:s.bufferName)||r.name,location:r.location,vertexFormat:a,byteOffset:(s==null?void 0:s.byteOffset)??0,byteStride:(s==null?void 0:s.byteStride)??be.getVertexFormatInfo(a).byteLength,stepMode:(s==null?void 0:s.stepMode)||r.stepMode||(r.name.startsWith("instance")?"instance":"vertex")}}).sort((r,s)=>r.location-s.location)}function bv(i){for(const e of i)(e.attributes&&e.format||!e.attributes&&!e.format)&&T.warn(`BufferLayout ${e.name} must have either 'attributes' or 'format' field`)()}function yv(i){if(typeof i.byteStride=="number")return i.byteStride;if(i.attributes){let e=0;for(const t of i.attributes)e+=be.getVertexFormatInfo(t.format).byteLength;return e}return be.getVertexFormatInfo(i.format).byteLength}function sd(i,e){const t={},n=_v(i,e,{warnOnMissingBufferLayout:!0});for(const r of n){const s=vv(i,r);t[r.attributeName]=s}return t}function vv(i,e){const t=wv(i,e.attributeName),n=Pi.getAttributeShaderTypeInfo(t.type),r=e.vertexFormat,s=be.getVertexFormatInfo(r);return{attributeName:e.attributeName,bufferName:e.bufferName,location:t.location,shaderType:t.type,primitiveType:n.primitiveType,shaderComponents:n.components,vertexFormat:r,bufferDataType:s.type,bufferComponents:s.components,normalized:s.normalized,integer:n.integer,stepMode:e.stepMode,byteOffset:e.byteOffset,byteStride:e.byteStride}}function wv(i,e){const t=i.attributes.find(n=>n.name===e);return t||T.warn(`shader layout attribute "${e}" not present in shader`)(),t||null}const xv=/^(vs|fs):(?:#(?:decl|main-start|main-end)|[A-Za-z_][\w-]*)$/;function od(i=[],e){const t=[],n={},r={},s={},o={};for(const a of i)Gl({modules:t,defines:n,injections:r,vertexInputs:s,varyings:o},a),Gl({modules:t,defines:n,injections:r,vertexInputs:s,varyings:o},a[e]);for(const a of Object.keys(o))if(s[a])throw new Error(`ShaderPlugin name "${a}" cannot be both a vertex input and a varying`);return{modules:t,defines:n,injections:r,vertexInputs:s,varyings:o}}function ad(i=[],e=[]){const t=[...i],n=new Set(t.map(r=>r.name));for(const r of e)n.has(r.name)||(t.push(r),n.add(r.name));return t}function Gl(i,e){var t;if(e){(t=e.modules)!=null&&t.length&&i.modules.push(...e.modules),e.defines&&Object.assign(i.defines,e.defines);for(const[n,r]of Object.entries(e.vertexInputs||{})){Vl(n,"vertex input");const s=i.vertexInputs[n];if(s&&s!==r)throw new Error(`ShaderPlugin vertex input "${n}" has conflicting types "${s}" and "${r}"`);i.vertexInputs[n]=r}for(const[n,r]of Object.entries(e.varyings||{})){Vl(n,"varying");const s=Pv(n,r),o=i.varyings[n];if(o&&(o.type!==s.type||o.interpolation!==s.interpolation))throw new Error(`ShaderPlugin varying "${n}" has conflicting declarations "${o.type}/${o.interpolation}" and "${s.type}/${s.interpolation}"`);i.varyings[n]=s}for(const n of e.injections||[])Ev(n.target),i.injections[n.target]||(i.injections[n.target]=[]),i.injections[n.target].push({injection:n.injection,order:n.order??0})}}function Vl(i,e){if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(i)||i.startsWith("_luma_"))throw new Error(`ShaderPlugin ${e} "${i}" must be a valid non-reserved identifier`)}function Pv(i,e){const{primitiveType:t}=Pi.getAttributeShaderTypeInfo(e.type),n=t==="i32"||t==="u32",r=e.interpolation||(n?"flat":"smooth");if(n&&r==="smooth")throw new Error(`ShaderPlugin integer varying "${i}" must use flat interpolation`);return{type:e.type,interpolation:r}}function Ev(i){if(!xv.test(i))throw new Error(`ShaderPlugin injection target "${i}" must be a named shader anchor or hook`)}const Sv=/^(?:uniform\s+)?(?:(?:lowp|mediump|highp)\s+)?[A-Za-z0-9_]+(?:<[^>]+>)?\s+([A-Za-z0-9_]+)(?:\s*\[[^\]]+\])?\s*;/,Lv=/((?:layout\s*\([^)]*\)\s*)*)uniform\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{([\s\S]*?)\}\s*([A-Za-z_][A-Za-z0-9_]*)?\s*;/g;function gc(i){return`${i.name}Uniforms`}function Tv(i,e){const t=e==="wgsl"?i.source:e==="vertex"?i.vs:i.fs;if(!t)return null;const n=gc(i);return Iv(t,e==="wgsl"?"wgsl":"glsl",n)}function Av(i,e){const t=Object.keys(i.uniformTypes||{});if(!t.length)return null;const n=Tv(i,e);return n?{moduleName:i.name,uniformBlockName:gc(i),stage:e,expectedUniformNames:t,actualUniformNames:n,matches:Bv(t,n)}:null}function Cv(i,e,t={}){var s,o;const n=Av(i,e);if(!n||n.matches)return n;const r=kv(n);return(o=(s=t.log)==null?void 0:s.error)==null||o.call(s,r,n)(),t.throwOnError!==!1&&wi(!1,r),n}function pc(i){var n;const e=[],t=Dv(i);for(const r of t.matchAll(Lv)){const s=((n=r[1])==null?void 0:n.trim())||null;e.push({blockName:r[2],body:r[3],instanceName:r[4]||null,layoutQualifier:s,hasLayoutQualifier:!!s,isStd140:!!(s&&/\blayout\s*\([^)]*\bstd140\b[^)]*\)/.exec(s))})}return e}function Mv(i,e,t,n){var o;const r=pc(i).filter(a=>!a.isStd140),s=new Set;for(const a of r){if(s.has(a.blockName))continue;s.add(a.blockName);const c="",l=a.hasLayoutQualifier?`declares ${Fv(a.layoutQualifier)} instead of layout(std140)`:"does not declare layout(std140)",u=`${c}${e} shader uniform block ${a.blockName} ${l}. luma.gl host-side shader block packing assumes explicit layout(std140) for GLSL uniform blocks. Add \`layout(std140)\` to the block declaration.`;(o=t==null?void 0:t.warn)==null||o.call(t,u,a)()}return r}function Iv(i,e,t){const n=e==="wgsl"?Rv(i,t):Ov(i,t);if(!n)return null;const r=[];for(const s of n.split(`
`)){const o=s.replace(/\/\/.*$/,"").trim();if(!o||o.startsWith("#"))continue;const a=e==="wgsl"?o.match(/^([A-Za-z0-9_]+)\s*:/):o.match(Sv);a&&r.push(a[1])}return r}function Rv(i,e){const t=new RegExp(`\\bstruct\\s+${e}\\b`,"m").exec(i);if(!t)return null;const n=i.indexOf("{",t.index);if(n<0)return null;let r=0;for(let s=n;s<i.length;s++){const o=i[s];if(o==="{"){r++;continue}if(o==="}"&&(r--,r===0))return i.slice(n+1,s)}return null}function Ov(i,e){const t=pc(i).find(n=>n.blockName===e);return(t==null?void 0:t.body)||null}function Bv(i,e){if(i.length!==e.length)return!1;for(let t=0;t<i.length;t++)if(i[t]!==e[t])return!1;return!0}function kv(i){const{expectedUniformNames:e,actualUniformNames:t}=i,n=e.filter(a=>!t.includes(a)),r=t.filter(a=>!e.includes(a)),s=[`Expected ${e.length} fields, found ${t.length}.`],o=Nv(e,t);return o&&s.push(o),n.length&&s.push(`Missing from shader block (${n.length}): ${jl(n)}.`),r.length&&s.push(`Unexpected in shader block (${r.length}): ${jl(r)}.`),e.length<=12&&t.length<=12&&(n.length||r.length)&&(s.push(`Expected: ${e.join(", ")}.`),s.push(`Actual: ${t.join(", ")}.`)),`${i.moduleName}: ${i.stage} shader uniform block ${i.uniformBlockName} does not match module.uniformTypes. ${s.join(" ")}`}function Dv(i){return i.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,"")}function Fv(i){return i.replace(/\s+/g," ").trim()}function Nv(i,e){const t=Math.min(i.length,e.length);for(let n=0;n<t;n++)if(i[n]!==e[n])return`First mismatch at field ${n+1}: expected ${i[n]}, found ${e[n]}.`;return i.length>e.length?`Shader block ends after field ${e.length}; expected next field ${i[e.length]}.`:e.length>i.length?`Shader block has extra field ${e.length}: ${e[i.length]}.`:null}function jl(i,e=8){if(i.length<=e)return i.join(", ");const t=i.length-e;return`${i.slice(0,e).join(", ")}, ... (${t} more)`}function Uv(i){switch(i==null?void 0:i.gpu.toLowerCase()){case"apple":return`#define APPLE_GPU
// Apple optimizes away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1
// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow
#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1
`;case"nvidia":return`#define NVIDIA_GPU
// Nvidia optimizes away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
`;case"intel":return`#define INTEL_GPU
// Intel optimizes away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
// Intel's built-in 'tan' function doesn't have acceptable precision
#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1
// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow
#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1
`;case"amd":return`#define AMD_GPU
`;default:return`#define DEFAULT_GPU
// Prevent driver from optimizing away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
// Headless Chrome's software shader 'tan' function doesn't have acceptable precision
#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1
// If the GPU doesn't have full 32 bits precision, will causes overflow
#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1
`}}function zv(i,e){var n;if(Number(((n=i.match(/^#version[ \t]+(\d+)/m))==null?void 0:n[1])||100)!==300)throw new Error("luma.gl v9 only supports GLSL 3.00 shader sources");switch(e){case"vertex":return i=Wl(i,$v),i;case"fragment":return i=Wl(i,Gv),i;default:throw new Error(e)}}const cd=[[/^(#version[ \t]+(100|300[ \t]+es))?[ \t]*\n/,`#version 300 es
`],[/\btexture(2D|2DProj|Cube)Lod(EXT)?\(/g,"textureLod("],[/\btexture(2D|2DProj|Cube)(EXT)?\(/g,"texture("]],$v=[...cd,[ua("attribute"),"in $1"],[ua("varying"),"out $1"]],Gv=[...cd,[ua("varying"),"in $1"]];function Wl(i,e){for(const[t,n]of e)i=i.replace(t,n);return i}function ua(i){return new RegExp(`\\b${i}[ \\t]+(\\w+[ \\t]+\\w+(\\[\\w+\\])?;)`,"g")}function fa(i,e,t="glsl"){let n="";for(const r in i){const s=i[r];if(n+=`${t==="wgsl"?"fn":"void"} ${s.signature} {
`,s.header&&(n+=`  ${s.header}`),e[r]){const a=e[r];a.sort((c,l)=>c.order-l.order);for(const c of a)n+=`  ${c.injection}
`}s.footer&&(n+=`  ${s.footer}`),n+=`}
`}return n}function ld(i){const e={vertex:{},fragment:{}};for(const t of i){let n,r;typeof t!="string"?(n=t,r=n.hook):(n={},r=t),r=r.trim();const s=r.indexOf(":"),o=r.slice(0,s),a=r.slice(s+1),c=r.replace(/\(.+/,""),l=Object.assign(n,{signature:a});switch(o){case"vs":e.vertex[c]=l;break;case"fs":e.fragment[c]=l;break;default:throw new Error(o)}}return e}function Vv(i,e){return{name:jv(i,e),language:"glsl",version:Wv(i)}}function jv(i,e="unnamed"){const n=/#define[^\S\r\n]*SHADER_NAME[^\S\r\n]*([A-Za-z0-9_-]+)\s*/.exec(i);return n?n[1]:e}function Wv(i){let e=100;const t=i.match(/[^\s]+/g);if(t&&t.length>=2&&t[0]==="#version"){const n=parseInt(t[1],10);Number.isFinite(n)&&(e=n)}if(e!==100&&e!==300)throw new Error(`Invalid GLSL version ${e}`);return e}const Hl=[new RegExp(`@binding\\(\\s*(\\d+)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)\\s*${Ae}\\s*:\\s*([^;]+);`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(\\d+)\\s*\\)\\s*${Ae}\\s*:\\s*([^;]+);`,"g")];function ud(i,e=[]){var s;const t=ms(i),n=new Map;for(const o of e)n.set(Yl(o.name,o.group,o.location),o.moduleName);const r=[];for(const o of Hl){o.lastIndex=0;let a;for(a=o.exec(t);a;){const c=o===Hl[0],l=Number(a[c?1:2]),u=Number(a[c?2:1]),f=(s=a[3])==null?void 0:s.trim(),h=a[4],g=a[5].trim(),p=n.get(Yl(h,u,l));r.push(Hv({name:h,group:u,binding:l,owner:p?"module":"application",moduleName:p,accessDeclaration:f,resourceType:g})),a=o.exec(t)}}return r.sort((o,a)=>o.group!==a.group?o.group-a.group:o.binding!==a.binding?o.binding-a.binding:o.name.localeCompare(a.name))}function Hv(i){const e={name:i.name,group:i.group,binding:i.binding,owner:i.owner,kind:"unknown",moduleName:i.moduleName,resourceType:i.resourceType};if(i.accessDeclaration){const t=i.accessDeclaration.split(",").map(n=>n.trim());if(t[0]==="uniform")return{...e,kind:"uniform",access:"uniform"};if(t[0]==="storage"){const n=t[1]||"read_write";return{...e,kind:n==="read"?"read-only-storage":"storage",access:n}}}return i.resourceType==="sampler"||i.resourceType==="sampler_comparison"?{...e,kind:"sampler",samplerKind:i.resourceType==="sampler_comparison"?"comparison":"filtering"}:i.resourceType.startsWith("texture_storage_")?{...e,kind:"storage-texture",access:qv(i.resourceType),viewDimension:ql(i.resourceType)}:i.resourceType.startsWith("texture_")?{...e,kind:"texture",viewDimension:ql(i.resourceType),sampleType:Yv(i.resourceType),multisampled:i.resourceType.startsWith("texture_multisampled_")}:e}function Yl(i,e,t){return`${e}:${t}:${i}`}function ql(i){if(i.includes("cube_array"))return"cube-array";if(i.includes("2d_array"))return"2d-array";if(i.includes("cube"))return"cube";if(i.includes("3d"))return"3d";if(i.includes("2d"))return"2d";if(i.includes("1d"))return"1d"}function Yv(i){if(i.startsWith("texture_depth_"))return"depth";if(i.includes("<i32>"))return"sint";if(i.includes("<u32>"))return"uint";if(i.includes("<f32>"))return"float"}function qv(i){const e=/,\s*([A-Za-z_][A-Za-z0-9_]*)\s*>$/.exec(i);return e==null?void 0:e[1]}const Et="([a-zA-Z_][a-zA-Z0-9_]*)",Zv=/^\s*\#\s*if\s+(.+?)\s*(?:\/\/.*)?$/,Xv=new RegExp(`^\\s*\\#\\s*ifdef\\s*${Et}\\s*$`),Kv=new RegExp(`^\\s*\\#\\s*ifndef\\s*${Et}\\s*(?:\\/\\/.*)?$`),Qv=/^\s*\#\s*else\s*(?:\/\/.*)?$/,Jv=/^\s*\#\s*endif\s*$/,e0=new RegExp(`^\\s*\\#\\s*ifdef\\s*${Et}\\s*(?:\\/\\/.*)?$`),t0=/^\s*\#\s*endif\s*(?:\/\/.*)?$/;function un(i,e){var o,a;const t=i.split(`
`),n=[],r=[];let s=!0;for(const c of t){const l=c.match(Zv),u=c.match(e0)||c.match(Xv),f=c.match(Kv),h=c.match(Qv),g=c.match(t0)||c.match(Jv);if(l){const p=i0(l[1],(e==null?void 0:e.defines)||{}),m=s&&p;r.push({parentActive:s,branchTaken:p,active:m}),s=m}else if(u||f){const p=(o=u||f)==null?void 0:o[1],m=!!((a=e==null?void 0:e.defines)!=null&&a[p]),_=u?m:!m,y=s&&_;r.push({parentActive:s,branchTaken:_,active:y}),s=y}else if(h){const p=r[r.length-1];if(!p)throw new Error("Encountered #else without matching #if, #ifdef or #ifndef");p.active=p.parentActive&&!p.branchTaken,p.branchTaken=!0,s=p.active}else g?(r.pop(),s=r.length?r[r.length-1].active:!0):s&&n.push(c)}if(r.length>0)throw new Error("Unterminated conditional block in shader source");return n.join(`
`)}function i0(i,e){const t=i.trim();if(/^[+-]?\d+(?:\.\d+)?$/.test(t))return Number(t)!==0;if(t==="true")return!0;if(t==="false")return!1;const n=t.match(new RegExp(`^!\\s*${Et}$`));if(n)return!e[n[1]];const r=t.match(new RegExp(`^${Et}$`));if(r)return!!e[r[1]];const s=t.match(new RegExp(`^defined\\s*\\(\\s*${Et}\\s*\\)$`));if(s)return e[s[1]]!==void 0;const o=t.match(new RegExp(`^!\\s*defined\\s*\\(\\s*${Et}\\s*\\)$`));if(o)return e[o[1]]===void 0;throw new Error(`Unsupported #if expression "${i}"`)}function n0(i,e){const t=[];for(const[n,r]of Object.entries(e))s0(i,n),t.push(`in ${mc(r)} ${n};`);return t.join(`
`)}function r0(i,e,t){const n=Object.entries(t);if(n.length===0)return{source:i,declarations:"",initialization:""};const r=o0(i,e),s=i.slice(r.openParenthesis+1,r.closeParenthesis),o=a0(i,s),a=new Set(o.locations),c=[],l=[],u=[];for(const[m,_]of n){if(o.names.has(m)||u0(i,m))throw new Error(`ShaderPlugin vertex input "${m}" conflicts with an existing WGSL shader input or variable`);const y=f0(a);a.add(y);const w=`_luma_${m}`;c.push(`@location(${y}) ${w}: ${_}`),l.push(`var<private> ${m}: ${_};`),u.push(`${m} = ${w};`)}const f=s.trim()?`,
  `:`
  `,h=s.trim()?"":`
`,g=`${s}${f}${c.join(`,
  `)}${h}`;return{source:i.slice(0,r.openParenthesis+1)+g+i.slice(r.closeParenthesis),declarations:l.join(`
`),initialization:u.join(`
`)}}function mc(i){const{primitiveType:e,components:t}=Pi.getAttributeShaderTypeInfo(i),n=e==="i32"?"int":e==="u32"?"uint":"float";return t===1?n:`${n==="int"?"i":n==="uint"?"u":""}vec${t}`}function s0(i,e){const t=vs(e);if(new RegExp(`\\b(?:in|attribute)\\s+(?:(?:lowp|mediump|highp)\\s+)?[A-Za-z_][A-Za-z0-9_]*\\s+${t}\\s*(?:\\[|;)`).test(i))throw new Error(`ShaderPlugin vertex input "${e}" conflicts with an existing GLSL input`)}function o0(i,e){const n=new RegExp(`\\bfn\\s+${vs(e)}\\s*\\(`,"g").exec(i);if(!n)throw new Error(`ShaderPlugin vertex inputs require WGSL vertex entry point "${e}"`);const r=i.indexOf("(",n.index),s=fd(i,r,"(",")");if(s<0)throw new Error(`Unable to parse WGSL vertex entry point "${e}" parameters`);return{openParenthesis:r,closeParenthesis:s}}function a0(i,e){const t=Zl(e),n=new Set(Xl(e)),r=c0(e);for(const s of r){const o=l0(i,s);if(o!==null){t.push(...Zl(o));for(const a of Xl(o))n.add(a)}}return{locations:t,names:n}}function Zl(i){const e=[],t=/@location\s*\(\s*(\d+)\s*\)/g;let n=t.exec(i);for(;n;)e.push(Number(n[1])),n=t.exec(i);return e}function Xl(i){const e=[],t=/(?:^|,)\s*(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:/gm;let n=t.exec(i);for(;n;)e.push(n[1]),n=t.exec(i);return e}function c0(i){const e=[],t=/:\s*([A-Za-z_][\w]*)\b/g;let n=t.exec(i);for(;n;)e.push(n[1]),n=t.exec(i);return e}function l0(i,e){const n=new RegExp(`\\bstruct\\s+${vs(e)}\\s*\\{`,"g").exec(i);if(!n)return null;const r=i.indexOf("{",n.index),s=fd(i,r,"{","}");return s<0?null:i.slice(r+1,s)}function u0(i,e){const t=vs(e),n=new RegExp(`\\b(?:var(?:<[^>]+>)?|let|const)\\s+${t}\\b`,"g");let r=n.exec(i);for(;r;){if(h0(i,r.index)===0)return!0;r=n.exec(i)}return!1}function f0(i){let e=0;for(;i.has(e);)e++;return e}function fd(i,e,t,n){let r=0,s=0,o=!1;for(let a=e;a<i.length;a++){const c=i[a],l=i[a+1];if(o){c===`
`&&(o=!1);continue}if(s>0){c==="/"&&l==="*"?(s++,a++):c==="*"&&l==="/"&&(s--,a++);continue}if(c==="/"&&l==="/"){o=!0,a++;continue}if(c==="/"&&l==="*"){s=1,a++;continue}if(c===t&&r++,c===n&&--r===0)return a}return-1}function h0(i,e){let t=0,n=0,r=!1;for(let s=0;s<e;s++){const o=i[s],a=i[s+1];if(r){o===`
`&&(r=!1);continue}if(n>0){o==="/"&&a==="*"?(n++,s++):o==="*"&&a==="/"&&(n--,s++);continue}o==="/"&&a==="/"?(r=!0,s++):o==="/"&&a==="*"?(n=1,s++):o==="{"?t++:o==="}"&&t--}return t}function vs(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function d0(i,e,t){const n=[],r=[];for(const[s,o]of Object.entries(t)){T0(i,s);const a=o.interpolation==="flat"?"flat ":"",c=e==="vertex"?"out":"in";n.push(`${a}${c} ${mc(o.type)} ${s};`),e==="vertex"&&r.push(`${s} = ${S0(o.type)};`)}return{declarations:n.join(`
`),initialization:r.join(`
`)}}function g0(i,e,t,n){const r=Object.entries(n);if(r.length===0)return{source:i,declarations:"",vertexInitialization:"",fragmentInitialization:""};let s=i,o=Dn(s,e,"vertex");const a=p0(s,o);let c=Dn(s,t,"fragment");const l=m0(s,c),u=Hs(s,a),f=Hs(s,l.type),h=new Set([...Fn(o.parameters),...Fn(u.body),...Fn(c.parameters),...Fn(f.body)]),g=new Set([...Kl(u.body),...Kl(f.body)]),p=[],m=[],_=[],y=[];for(const[S,L]of r){if(h.has(S)||P0(s,S))throw new Error(`ShaderPlugin varying "${S}" conflicts with existing WGSL stage I/O or a module variable`);const R=E0(g);g.add(R);const O=L.interpolation==="flat"?" @interpolate(flat)":"";p.push(`  @location(${R})${O} ${S}: ${L.type},`),m.push(`var<private> ${S}: ${L.type};`),_.push(`${S} = ${L0(L.type)};`),y.push(`${S} = ${l.name}.${S};`)}_0(s,a,o.openBrace,o.closeBrace),s=b0(s,a,o,r.map(([S])=>S)),o=Dn(s,e,"vertex"),s=y0(s,o,r.map(([S])=>S));const b=(a===l.type?[a]:[a,l.type]).map(S=>Hs(s,S).closeBrace).sort((S,L)=>L-S);for(const S of b)s=s.slice(0,S)+`${p.join(`
`)}
`+s.slice(S);if(c=Dn(s,t,"fragment"),!new RegExp(`\\b${$t(l.name)}\\s*:`).test(c.parameters))throw new Error(`Unable to preserve WGSL fragment input "${l.name}"`);return{source:s,declarations:m.join(`
`),vertexInitialization:_.join(`
`),fragmentInitialization:y.join(`
`)}}function Dn(i,e,t){const r=new RegExp(`\\bfn\\s+${$t(e)}\\s*\\(`,"g").exec(i);if(!r)throw new Error(`ShaderPlugin varyings require WGSL ${t} entry point "${e}"`);const s=i.indexOf("(",r.index),o=Or(i,s,"(",")"),a=i.indexOf("{",o),c=Or(i,a,"{","}");if(o<0||a<0||c<0)throw new Error(`Unable to parse WGSL ${t} entry point "${e}"`);return{openParenthesis:s,closeParenthesis:o,openBrace:a,closeBrace:c,parameters:i.slice(s+1,o)}}function p0(i,e){const t=i.slice(e.closeParenthesis+1,e.openBrace),n=/->\s*([A-Za-z_][\w]*)\s*$/.exec(t.trim());if(!n||_c(i,n[1])===null)throw new Error("ShaderPlugin varyings require the WGSL vertex entry point to return a named struct");return n[1]}function m0(i,e){const t=[];for(const n of x0(e.parameters,",")){const r=/(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:\s*([A-Za-z_][\w]*)\s*$/.exec(n.trim());r&&_c(i,r[2])&&t.push({name:r[1],type:r[2]})}if(t.length!==1)throw new Error(`ShaderPlugin varyings require exactly one named WGSL fragment input struct; found ${t.length}`);return t[0]}function Hs(i,e){const t=_c(i,e);if(!t)throw new Error(`Unable to find WGSL stage I/O struct "${e}"`);return t}function _c(i,e){const n=new RegExp(`\\bstruct\\s+${$t(e)}\\s*\\{`,"g").exec(i);if(!n)return null;const r=i.indexOf("{",n.index),s=Or(i,r,"{","}");return s<0?null:{openBrace:r,closeBrace:s,body:i.slice(r+1,s)}}function _0(i,e,t,n){const r=new RegExp(`\\b${$t(e)}\\s*\\(`,"g");let s=r.exec(i);for(;s;){if(s.index<t||s.index>n)throw new Error(`ShaderPlugin varying output struct "${e}" is constructed outside the selected vertex entry point`);s=r.exec(i)}}function b0(i,e,t,n){const r=new RegExp(`\\b${$t(e)}\\s*\\(`,"g"),s=[];let o=r.exec(i);for(;o;){if(o.index>t.openBrace&&o.index<t.closeBrace){const a=i.indexOf("(",o.index),c=Or(i,a,"(",")");if(c<0||c>t.closeBrace)throw new Error(`Unable to parse WGSL output constructor "${e}"`);s.push({openParenthesis:a,closeParenthesis:c})}o=r.exec(i)}for(const a of s.sort((c,l)=>l.closeParenthesis-c.closeParenthesis)){const l=i.slice(a.openParenthesis+1,a.closeParenthesis).trim()?", ":"";i=i.slice(0,a.closeParenthesis)+l+n.join(", ")+i.slice(a.closeParenthesis)}return i}function y0(i,e,t){const n=v0(i,e.openBrace+1,e.closeBrace);for(let r=n.length-1;r>=0;r--){const s=n[r],o=i.slice(s.expressionStart,s.semicolon).trim();if(!o)throw new Error("ShaderPlugin varying vertex entry point cannot use an empty return");const a=`_luma_vertexOutput${r}`,c=t.map(u=>`${a}.${u} = ${u};`).join(`
`),l=`{
var ${a} = ${o};
${c}
return ${a};
}`;i=i.slice(0,s.start)+l+i.slice(s.semicolon+1)}return i}function v0(i,e,t){const n=[];let r=e;for(;r<t;)if(r=bc(i,r,t),i.slice(r,r+6)==="return"&&!/[A-Za-z0-9_]/.test(i[r+6]||"")){const s=r+6,o=w0(i,s,t);if(o<0)throw new Error("Unable to parse WGSL return statement in selected vertex entry point");n.push({start:r,expressionStart:s,semicolon:o}),r=o+1}else r++;return n}function w0(i,e,t){let n=0,r=0;for(let s=e;s<t;s++){const o=bc(i,s,t);if(o!==s){s=o-1;continue}const a=i[s];if(a==="("&&n++,a===")"&&n--,a==="["&&r++,a==="]"&&r--,a===";"&&n===0&&r===0)return s}return-1}function bc(i,e,t){let n=e;if(i[n]==="/"&&i[n+1]==="/"){const r=i.indexOf(`
`,n+2);return r<0||r>t?t:r+1}if(i[n]==="/"&&i[n+1]==="*"){let r=1;for(n+=2;n<t&&r>0;)i[n]==="/"&&i[n+1]==="*"?(r++,n+=2):i[n]==="*"&&i[n+1]==="/"?(r--,n+=2):n++}return n}function x0(i,e){const t=[];let n=0,r=0,s=0;for(let o=0;o<i.length;o++){const a=i[o];a==="("&&r++,a===")"&&r--,a==="<"&&s++,a===">"&&s--,a===e&&r===0&&s===0&&(t.push(i.slice(n,o)),n=o+1)}return t.push(i.slice(n)),t}function Kl(i){const e=[],t=/@location\s*\(\s*(\d+)\s*\)/g;let n=t.exec(i);for(;n;)e.push(Number(n[1])),n=t.exec(i);return e}function Fn(i){const e=[],t=/(?:^|,)\s*(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:/gm;let n=t.exec(i);for(;n;)e.push(n[1]),n=t.exec(i);return e}function P0(i,e){const t=new RegExp(`\\b(?:var(?:<[^>]+>)?|let|const)\\s+${$t(e)}\\b`,"g");let n=t.exec(i);for(;n;){if(A0(i,n.index)===0)return!0;n=t.exec(i)}return!1}function E0(i){let e=0;for(;i.has(e);)e++;return e}function S0(i){const{primitiveType:e,components:t}=Pi.getAttributeShaderTypeInfo(i),n=e==="u32"?"0u":e==="i32"?"0":"0.0";return t===1?n:`${mc(i)}(${n})`}function L0(i){const{primitiveType:e,components:t}=Pi.getAttributeShaderTypeInfo(i),n=`${e}(0)`;return t===1?n:`${i}(${n})`}function T0(i,e){if(new RegExp(`\\b(?:flat\\s+|smooth\\s+)?(?:in|out|varying)\\s+(?:(?:lowp|mediump|highp)\\s+)?[A-Za-z_][A-Za-z0-9_]*\\s+${$t(e)}\\s*(?:\\[|;)`).test(i))throw new Error(`ShaderPlugin varying "${e}" conflicts with existing GLSL stage I/O`)}function Or(i,e,t,n){let r=0,s=0,o=!1;for(let a=e;a<i.length;a++){const c=i[a],l=i[a+1];if(o){c===`
`&&(o=!1);continue}if(s>0){c==="/"&&l==="*"?(s++,a++):c==="*"&&l==="/"&&(s--,a++);continue}if(c==="/"&&l==="/"){o=!0,a++;continue}if(c==="/"&&l==="*"){s=1,a++;continue}if(c===t&&r++,c===n&&--r===0)return a}return-1}function A0(i,e){let t=0;for(let n=0;n<e;n++){const r=bc(i,n,e);if(r!==n){n=r-1;continue}i[n]==="{"&&t++,i[n]==="}"&&t--}return t}function $t(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const yc=`

${er}
`,fn=100,C0=`precision highp float;
`;function M0(i){const e=Er(i.modules||[]),{source:t,bindingAssignments:n}=R0(i.platformInfo,{...i,source:i.source,stage:"vertex",modules:e});return{source:t,getUniforms:hd(e),bindingAssignments:n,bindingTable:ud(t,n),shaderLayout:kh(t,{vertexEntryPoint:i.vertexEntryPoint,scanVertexAttributes:i.scanVertexAttributes})}}function I0(i){const{vs:e,fs:t}=i,n=Er(i.modules||[]);return{vs:Ql(i.platformInfo,{...i,source:e,stage:"vertex",modules:n}),fs:Ql(i.platformInfo,{...i,source:t,stage:"fragment",modules:n}),getUniforms:hd(n)}}function R0(i,e){const{source:t,stage:n,modules:r,defines:s={},hookFunctions:o=[],inject:a={},pluginInjections:c={},pluginVertexInputs:l={},pluginVaryings:u={},vertexEntryPoint:f="vertexMain",fragmentEntryPoint:h="fragmentMain",log:g}=e;wi(typeof t=="string","shader source must be a string");const p=un(t,{defines:s}),m=r0(p,f,l),_=g0(m.source,f,h,u),y=_.source;let w="";const b=ld(o),x={},S={},L={};dd(c,x,S,L);for(const $ in a){const N=typeof a[$]=="string"?{injection:a[$],order:0}:a[$],z=/^(v|f)s:(#)?([\w-]+)$/.exec($);if(z){const ie=z[2],v=z[3];ie?v==="decl"?S[$]=[N]:L[$]=[N]:x[$]=[N]}else L[$]=[N]}O0(m.declarations,m.initialization,S,L),B0(_,S,L);const R=r,O=z0(y),B=U0(O.source),k=j0(R,e._bindingRegistry,B,s),U=[];for(const $ of R){g&&$h($,y,g);const N=un(gd($,"wgsl",g),{defines:s}),z=$0(N,$,{usedBindingsByGroup:B,bindingRegistry:e._bindingRegistry,reservedBindingKeysByGroup:k});U.push(...z.bindingAssignments);const ie=z.source;w+=ie;const v=k0($);for(const E in v){const P=/^(v|f)s:#([\w-]+)$/.exec(E);if(P){const A=P[2]==="decl"?S:L;A[E]=A[E]||[],A[E].push(v[E])}else x[E]=x[E]||[],x[E].push(v[E])}}return w+=yc,w=xr(w,n,D0(S),!1,"wgsl",{vertex:f,fragment:h}),w+=F0(b,x),w+=X0(U),w+=O.source,w=xr(w,n,L,!1,"wgsl",{vertex:f,fragment:h}),Z0(w),{source:w,bindingAssignments:U}}function Ql(i,e){var k;const{source:t,stage:n,language:r="glsl",modules:s,defines:o={},hookFunctions:a=[],inject:c={},pluginInjections:l={},pluginVertexInputs:u={},pluginVaryings:f={},prologue:h=!0,log:g}=e;wi(typeof t=="string","shader source must be a string");const p=r==="glsl"?Vv(t).version:-1,m=i.shaderLanguageVersion,_=p===100?"#version 100":"#version 300 es",w=t.split(`
`).slice(1).join(`
`),b={};s.forEach(U=>{Object.assign(b,U.defines)}),Object.assign(b,o);let x="";switch(r){case"wgsl":break;case"glsl":x=h?`${_}

// ----- PROLOGUE -------------------------
${`#define SHADER_TYPE_${n.toUpperCase()}`}

${Uv(i)}
${n==="fragment"?C0:""}

// ----- APPLICATION DEFINES -------------------------

${N0(b)}

`:`${_}
`;break}const S=ld(a),L={},R={},O={};dd(l,L,R,O);for(const U in c){const $=typeof c[U]=="string"?{injection:c[U],order:0}:c[U],N=/^(v|f)s:(#)?([\w-]+)$/.exec(U);if(N){const z=N[2],ie=N[3];z?ie==="decl"?R[U]=[$]:O[U]=[$]:L[U]=[$]}else O[U]=[$]}if(n==="vertex"){const U=n0(w,u);U&&(R["vs:#decl"]=R["vs:#decl"]||[],R["vs:#decl"].push({injection:U,order:Number.MIN_SAFE_INTEGER}))}const B=d0(w,n,f);if(B.declarations){const U=n==="vertex"?"vs:#decl":"fs:#decl";R[U]=R[U]||[],R[U].push({injection:B.declarations,order:Number.MIN_SAFE_INTEGER})}B.initialization&&(O["vs:#main-start"]=O["vs:#main-start"]||[],O["vs:#main-start"].push({injection:B.initialization,order:Number.MIN_SAFE_INTEGER}));for(const U of s){g&&$h(U,w,g);const $=gd(U,n,g);x+=$;const N=((k=U.instance)==null?void 0:k.normalizedInjections[n])||{};for(const z in N){const ie=/^(v|f)s:#([\w-]+)$/.exec(z);if(ie){const E=ie[2]==="decl"?R:O;E[z]=E[z]||[],E[z].push(N[z])}else L[z]=L[z]||[],L[z].push(N[z])}}return x+="// ----- MAIN SHADER SOURCE -------------------------",x+=yc,x=xr(x,n,R),x+=fa(S[n],L),x+=w,x=xr(x,n,O),r==="glsl"&&p!==m&&(x=zv(x,n)),r==="glsl"&&Mv(x,n,g),x.trim()}function hd(i){return function(t){var r;const n={};for(const s of i){const o=(r=s.getUniforms)==null?void 0:r.call(s,t,n);Object.assign(n,o)}return n}}function dd(i,e,t,n){for(const r in i){const s=/^(v|f)s:(#)?([\w-]+)$/.exec(r);if(s){const o=s[2],a=s[3],c=o?a==="decl"?t:n:e;c[r]=c[r]||[],c[r].push(...i[r])}else n[r]=n[r]||[],n[r].push(...i[r])}}function O0(i,e,t,n){i&&(t["vs:#decl"]=t["vs:#decl"]||[],t["vs:#decl"].push({injection:i,order:Number.MIN_SAFE_INTEGER})),e&&(n["vs:#main-start"]=n["vs:#main-start"]||[],n["vs:#main-start"].push({injection:e,order:Number.MIN_SAFE_INTEGER}))}function B0(i,e,t){i.declarations&&(e["vs:#decl"]=e["vs:#decl"]||[],e["vs:#decl"].push({injection:i.declarations,order:Number.MIN_SAFE_INTEGER})),i.vertexInitialization&&(t["vs:#main-start"]=t["vs:#main-start"]||[],t["vs:#main-start"].push({injection:i.vertexInitialization,order:Number.MIN_SAFE_INTEGER})),i.fragmentInitialization&&(t["fs:#main-start"]=t["fs:#main-start"]||[],t["fs:#main-start"].push({injection:i.fragmentInitialization,order:Number.MIN_SAFE_INTEGER}))}function k0(i){var e,t;return{...((e=i.instance)==null?void 0:e.normalizedInjections.vertex)||{},...((t=i.instance)==null?void 0:t.normalizedInjections.fragment)||{}}}function D0(i){const e=[...i["vs:#decl"]||[],...i["fs:#decl"]||[]];return e.length?{"vs:#decl":e}:{}}function F0(i,e){return fa(i.vertex,e,"wgsl")+fa(i.fragment,e,"wgsl")}function N0(i={}){let e="";for(const t in i){const n=i[t];(n||Number.isFinite(n))&&(e+=`#define ${t.toUpperCase()} ${i[t]}
`)}return e}function gd(i,e,t){let n;switch(e){case"vertex":n=i.vs||"";break;case"fragment":n=i.fs||"";break;case"wgsl":n=i.source||"";break;default:wi(!1)}if(!i.name)throw new Error("Shader module must have a name");Cv(i,e,{log:t});const r=i.name.toUpperCase().replace(/[^0-9a-z]/gi,"_");let s=`// ----- MODULE ${i.name} ---------------

`;return e!=="wgsl"&&(s+=`#define MODULE_${r}
`),s+=`${n}
`,s}function U0(i){const e=new Map;for(const t of vi(i,J_)){const n=Number(t.bindingToken),r=Number(t.groupToken);vc(r,n,t.name),fi(e,r,n,`application binding "${t.name}"`)}return e}function z0(i){const e=vi(i,Wo),t=new Map;for(const s of e){if(s.bindingToken==="auto")continue;const o=Number(s.bindingToken),a=Number(s.groupToken);vc(a,o,s.name),fi(t,a,o,`application binding "${s.name}"`)}const n={sawSupportedBindingDeclaration:e.length>0},r=Oh(i,Wo,s=>V0(s,t,n));if(Bh(i)&&!n.sawSupportedBindingDeclaration)throw new Error('Unsupported @binding(auto) declaration form in application WGSL. Use adjacent "@group(N)" and "@binding(auto)" decorators followed by a bindable "var" declaration.');return{source:r}}function $0(i,e,t){const n=[],s={sawSupportedBindingDeclaration:vi(i,an).length>0,nextHintedBindingLocation:typeof e.firstBindingSlot=="number"?e.firstBindingSlot:null},o=Oh(i,an,a=>G0(a,{module:e,context:t,bindingAssignments:n,relocationState:s}));if(Bh(i)&&!s.sawSupportedBindingDeclaration)throw new Error(`Unsupported @binding(auto) declaration form in module "${e.name}". Use adjacent "@group(N)" and "@binding(auto)" decorators followed by a bindable "var" declaration.`);return{source:o,bindingAssignments:n}}function G0(i,e){var h,g;const{module:t,context:n,bindingAssignments:r,relocationState:s}=e,{match:o,bindingToken:a,groupToken:c,name:l}=i,u=Number(c);if(a==="auto"){const p=pd(u,t.name,l),m=(h=n.bindingRegistry)==null?void 0:h.get(p),_=m!==void 0?m:Y0(u,n.usedBindingsByGroup,t.name,s.nextHintedBindingLocation??void 0,n.bindingRegistry);return Jl(t.name,u,_,l),m!==void 0&&W0(n.reservedBindingKeysByGroup,u,_,p)?(r.push({moduleName:t.name,name:l,group:u,location:_}),o.replace(/@binding\(\s*auto\s*\)/,`@binding(${_})`)):(fi(n.usedBindingsByGroup,u,_,`module "${t.name}" binding "${l}"`),(g=n.bindingRegistry)==null||g.set(p,_),r.push({moduleName:t.name,name:l,group:u,location:_}),s.nextHintedBindingLocation!==null&&m===void 0&&(s.nextHintedBindingLocation=_+1),o.replace(/@binding\(\s*auto\s*\)/,`@binding(${_})`))}const f=Number(a);return Jl(t.name,u,f,l),fi(n.usedBindingsByGroup,u,f,`module "${t.name}" binding "${l}"`),r.push({moduleName:t.name,name:l,group:u,location:f}),o}function V0(i,e,t){const{match:n,bindingToken:r,groupToken:s,name:o}=i,a=Number(s);if(r==="auto"){const c=q0(a,e);return vc(a,c,o),fi(e,a,c,`application binding "${o}"`),n.replace(/@binding\(\s*auto\s*\)/,`@binding(${c})`)}return t.sawSupportedBindingDeclaration=!0,n}function j0(i,e,t,n){const r=new Map;if(!e)return r;for(const s of i)for(const o of H0(s,n)){const a=pd(o.group,s.name,o.name),c=e.get(a);if(c!==void 0){const l=r.get(o.group)||new Map,u=l.get(c);if(u&&u!==a)throw new Error(`Duplicate WGSL binding reservation for modules "${u}" and "${a}": group ${o.group}, binding ${c}.`);fi(t,o.group,c,`registered module binding "${a}"`),l.set(c,a),r.set(o.group,l)}}return r}function W0(i,e,t,n){const r=i.get(e);if(!r)return!1;const s=r.get(t);if(!s)return!1;if(s!==n)throw new Error(`Registered module binding "${n}" collided with "${s}": group ${e}, binding ${t}.`);return!0}function H0(i,e){const t=[],n=un(i.source||"",{defines:e});for(const r of vi(n,an))t.push({name:r.name,group:Number(r.groupToken)});return t}function vc(i,e,t){if(i===0&&e>=fn)throw new Error(`Application binding "${t}" in group 0 uses reserved binding ${e}. Application-owned explicit group-0 bindings must stay below ${fn}.`)}function Jl(i,e,t,n){if(e===0&&t<fn)throw new Error(`Module "${i}" binding "${n}" in group 0 uses reserved application binding ${t}. Module-owned explicit group-0 bindings must be ${fn} or higher.`)}function fi(i,e,t,n){const r=i.get(e)||new Set;if(r.has(t))throw new Error(`Duplicate WGSL binding assignment for ${n}: group ${e}, binding ${t}.`);r.add(t),i.set(e,r)}function Y0(i,e,t,n,r){const s=e.get(i)||new Set,o=new Set,a=`${i}:`,c=`${a}${t}:`;for(const[u,f]of r||[])u.startsWith(c)&&o.add(f);let l=n??(i===0?fn:s.size>0?Math.max(...s)+1:0);for(;s.has(l)||o.has(l);)l++;for(const[u,f]of r||[])f===l&&u.startsWith(a)&&(r==null||r.delete(u));return l}function q0(i,e){const t=e.get(i)||new Set;let n=0;for(;t.has(n);)n++;return n}function Z0(i){const e=tb(i,an);if(!e)return;const t=K0(i,e.index);throw t?new Error(`Unresolved @binding(auto) for module "${t}" binding "${e.name}" remained in assembled WGSL source.`):Q0(i,e.index)?new Error(`Unresolved @binding(auto) for application binding "${e.name}" remained in assembled WGSL source.`):new Error(`Unresolved @binding(auto) remained in assembled WGSL source near "${J0(e.match)}".`)}function X0(i){if(i.length===0)return"";let e=`// ----- MODULE WGSL BINDING ASSIGNMENTS ---------------
`;for(const t of i)e+=`// ${t.moduleName}.${t.name} -> @group(${t.group}) @binding(${t.location})
`;return e+=`
`,e}function pd(i,e,t){return`${i}:${e}:${t}`}function K0(i,e){const t=/^\/\/ ----- MODULE ([^\n]+) ---------------$/gm;let n,r;for(r=t.exec(i);r&&r.index<=e;)n=r[1],r=t.exec(i);return n}function Q0(i,e){const t=i.indexOf(yc);return t>=0?e>t:!0}function J0(i){return i.replace(/\s+/g," ").trim()}const tt=class tt{constructor(){d(this,"_hookFunctions",[]);d(this,"_defaultModules",[])}static getDefaultShaderAssembler(e){return wi(e==="glsl"||e==="wgsl"),e==="wgsl"?(tt.defaultShaderAssemblers.wgsl=tt.defaultShaderAssemblers.wgsl||new hi,tt.defaultShaderAssemblers.wgsl):(tt.defaultShaderAssemblers.glsl=tt.defaultShaderAssemblers.glsl||new ew,tt.defaultShaderAssemblers.glsl)}addDefaultModule(e){this._defaultModules.find(t=>t.name===(typeof e=="string"?e:e.name))||this._defaultModules.push(e)}removeDefaultModule(e){const t=typeof e=="string"?e:e.name;this._defaultModules=this._defaultModules.filter(n=>n.name!==t)}addShaderHook(e,t){t&&(e=Object.assign(t,{hook:e})),this._hookFunctions.push(e)}_getModuleList(e=[]){const t=new Array(this._defaultModules.length+e.length),n={};let r=0;for(let s=0,o=this._defaultModules.length;s<o;++s){const a=this._defaultModules[s],c=a.name;t[r++]=a,n[c]=!0}for(let s=0,o=e.length;s<o;++s){const a=e[s],c=a.name;n[c]||(t[r++]=a,n[c]=!0)}return t.length=r,Pr(t),t}};d(tt,"defaultShaderAssemblers",{});let pt=tt;class ew extends pt{constructor(){super(...arguments);d(this,"shaderLanguage","glsl")}assembleGLSLShaderPair(t){const n=this._getModuleList(t.modules),r=this._hookFunctions;return{...I0({...t,vs:t.vs,fs:t.fs,modules:n,hookFunctions:r}),modules:n}}}class hi extends pt{constructor(){super(...arguments);d(this,"shaderLanguage","wgsl");d(this,"_wgslBindingRegistry",new Map)}assembleWGSLShader(t){const n=this._getModuleList(t.modules),r=this._hookFunctions,s=hi.getShaderPreprocessorDefines(t,n),o=t.platformInfo.shaderLanguage==="wgsl"&&t.source?un(t.source,{defines:s}):t.source,{source:a,getUniforms:c,bindingAssignments:l}=M0({...t,source:o,defines:s,_bindingRegistry:this._wgslBindingRegistry,modules:n,hookFunctions:r}),u=t.platformInfo.shaderLanguage==="wgsl"?un(a,{defines:s}):a;return{source:u,getUniforms:c,modules:n,bindingAssignments:l,bindingTable:ud(u,l),shaderLayout:kh(u,{vertexEntryPoint:t.vertexEntryPoint,scanVertexAttributes:t.scanVertexAttributes})}}static getShaderPreprocessorDefines(t,n){return{...hi.getPlatformPreprocessorDefines(t.platformInfo),...n.reduce((r,s)=>(Object.assign(r,s.defines),r),{}),...t.defines}}static getPlatformPreprocessorDefines(t){const n=t.limits||{};return{LUMA_SUPPORTS_VERTEX_STORAGE_BUFFERS:t.type==="webgpu"&&(n.maxStorageBuffersInVertexStage||0)>0,LUMA_FP32_TAN_PRECISION_WORKAROUND:t.type==="webgpu"&&t.gpu.toLowerCase()!=="nvidia"&&t.gpu.toLowerCase()!=="amd",LUMA_FP64_INTEGER_ARITHMETIC:t.type==="webgpu"&&t.gpu.toLowerCase()==="apple"}}}const tw=`out vec4 transform_output;
void main() {
  transform_output = vec4(0);
}`,iw=`#version 300 es
${tw}`;function nw(i){const{input:e,inputChannels:t,output:n}={};if(!e)return iw;if(!t)throw new Error("inputChannels");const r=rw(t),s=sw(e,t);return`#version 300 es
in ${r} ${e};
out vec4 ${n};
void main() {
  ${n} = ${s};
}`}function rw(i){switch(i){case 1:return"float";case 2:return"vec2";case 3:return"vec3";case 4:return"vec4";default:throw new Error(`invalid channels: ${i}`)}}function sw(i,e){switch(e){case 1:return`vec4(${i}, 0.0, 0.0, 1.0)`;case 2:return`vec4(${i}, 0.0, 1.0)`;case 3:return`vec4(${i}, 1.0)`;case 4:return i;default:throw new Error(`invalid channels: ${e}`)}}const ow={EPSILON:1e-12,debug:!1,precision:4,printTypes:!1,printDegrees:!1,printRowMajor:!0,_cartographicRadians:!1};globalThis.mathgl=globalThis.mathgl||{config:{...ow}};const xe=globalThis.mathgl.config;function aw(i,{precision:e=xe.precision}={}){return i=cw(i),`${parseFloat(i.toPrecision(e))}`}function It(i){return Array.isArray(i)||ArrayBuffer.isView(i)&&!(i instanceof DataView)}function oe(i,e,t){return uw(i,n=>Math.max(e,Math.min(t,n)))}function di(i,e,t){return It(i)?i.map((n,r)=>di(n,e[r],t)):t*e+(1-t)*i}function ri(i,e,t){const n=xe.EPSILON;try{if(i===e)return!0;if(It(i)&&It(e)){if(i.length!==e.length)return!1;for(let r=0;r<i.length;++r)if(!ri(i[r],e[r]))return!1;return!0}return i&&i.equals?i.equals(e):e&&e.equals?e.equals(i):typeof i=="number"&&typeof e=="number"?Math.abs(i-e)<=xe.EPSILON*Math.max(1,Math.abs(i),Math.abs(e)):!1}finally{xe.EPSILON=n}}function cw(i){return Math.round(i/xe.EPSILON)*xe.EPSILON}function lw(i){return i.clone?i.clone():new Array(i.length)}function uw(i,e,t){if(It(i)){const n=i;t=t||lw(n);for(let r=0;r<t.length&&r<n.length;++r){const s=typeof i=="number"?i:i[r];t[r]=e(s,r,t)}return t}return e(i)}class wc extends Array{clone(){return new this.constructor().copy(this)}fromArray(e,t=0){for(let n=0;n<this.ELEMENTS;++n)this[n]=e[n+t];return this.check()}toArray(e=[],t=0){for(let n=0;n<this.ELEMENTS;++n)e[t+n]=this[n];return e}toObject(e){return e}from(e){return Array.isArray(e)?this.copy(e):this.fromObject(e)}to(e){return e===this?this:It(e)?this.toArray(e):this.toObject(e)}toTarget(e){return e?this.to(e):this}toFloat32Array(){return new Float32Array(this)}toString(){return this.formatString(xe)}formatString(e){let t="";for(let n=0;n<this.ELEMENTS;++n)t+=(n>0?", ":"")+aw(this[n],e);return`${e.printTypes?this.constructor.name:""}[${t}]`}equals(e){if(!e||this.length!==e.length)return!1;for(let t=0;t<this.ELEMENTS;++t)if(!ri(this[t],e[t]))return!1;return!0}exactEquals(e){if(!e||this.length!==e.length)return!1;for(let t=0;t<this.ELEMENTS;++t)if(this[t]!==e[t])return!1;return!0}negate(){for(let e=0;e<this.ELEMENTS;++e)this[e]=-this[e];return this.check()}lerp(e,t,n){if(n===void 0)return this.lerp(this,e,t);for(let r=0;r<this.ELEMENTS;++r){const s=e[r],o=typeof t=="number"?t:t[r];this[r]=s+n*(o-s)}return this.check()}min(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=Math.min(e[t],this[t]);return this.check()}max(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=Math.max(e[t],this[t]);return this.check()}clamp(e,t){for(let n=0;n<this.ELEMENTS;++n)this[n]=Math.min(Math.max(this[n],e[n]),t[n]);return this.check()}add(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]+=t[n];return this.check()}subtract(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]-=t[n];return this.check()}scale(e){if(typeof e=="number")for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;else for(let t=0;t<this.ELEMENTS&&t<e.length;++t)this[t]*=e[t];return this.check()}multiplyByScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;return this.check()}check(){if(xe.debug&&!this.validate())throw new Error(`math.gl: ${this.constructor.name} some fields set to invalid numbers'`);return this}validate(){let e=this.length===this.ELEMENTS;for(let t=0;t<this.ELEMENTS;++t)e=e&&Number.isFinite(this[t]);return e}sub(e){return this.subtract(e)}setScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=e;return this.check()}addScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]+=e;return this.check()}subScalar(e){return this.addScalar(-e)}multiplyScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;return this.check()}divideScalar(e){return this.multiplyByScalar(1/e)}clampScalar(e,t){for(let n=0;n<this.ELEMENTS;++n)this[n]=Math.min(Math.max(this[n],e),t);return this.check()}get elements(){return this}}function fw(i,e){if(i.length!==e)return!1;for(let t=0;t<i.length;++t)if(!Number.isFinite(i[t]))return!1;return!0}function te(i){if(!Number.isFinite(i))throw new Error(`Invalid number ${JSON.stringify(i)}`);return i}function tr(i,e,t=""){if(xe.debug&&!fw(i,e))throw new Error(`math.gl: ${t} some fields set to invalid numbers'`);return i}function eu(i,e){if(!i)throw new Error(`math.gl assertion ${e}`)}class md extends wc{get x(){return this[0]}set x(e){this[0]=te(e)}get y(){return this[1]}set y(e){this[1]=te(e)}len(){return Math.sqrt(this.lengthSquared())}magnitude(){return this.len()}lengthSquared(){let e=0;for(let t=0;t<this.ELEMENTS;++t)e+=this[t]*this[t];return e}magnitudeSquared(){return this.lengthSquared()}distance(e){return Math.sqrt(this.distanceSquared(e))}distanceSquared(e){let t=0;for(let n=0;n<this.ELEMENTS;++n){const r=this[n]-e[n];t+=r*r}return te(t)}dot(e){let t=0;for(let n=0;n<this.ELEMENTS;++n)t+=this[n]*e[n];return te(t)}normalize(){const e=this.magnitude();if(e!==0)for(let t=0;t<this.ELEMENTS;++t)this[t]/=e;return this.check()}multiply(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]*=t[n];return this.check()}divide(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]/=t[n];return this.check()}lengthSq(){return this.lengthSquared()}distanceTo(e){return this.distance(e)}distanceToSquared(e){return this.distanceSquared(e)}getComponent(e){return eu(e>=0&&e<this.ELEMENTS,"index is out of range"),te(this[e])}setComponent(e,t){return eu(e>=0&&e<this.ELEMENTS,"index is out of range"),this[e]=t,this.check()}addVectors(e,t){return this.copy(e).add(t)}subVectors(e,t){return this.copy(e).subtract(t)}multiplyVectors(e,t){return this.copy(e).multiply(t)}addScaledVector(e,t){return this.add(new this.constructor(e).multiplyScalar(t))}}const Yi=1e-6;let Ne=typeof Float32Array<"u"?Float32Array:Array;function hw(){const i=new Ne(2);return Ne!=Float32Array&&(i[0]=0,i[1]=0),i}function tu(i,e,t){return i[0]=e[0]+t[0],i[1]=e[1]+t[1],i}function dw(i,e,t){return i[0]=e[0]-t[0],i[1]=e[1]-t[1],i}function gw(i,e){return i[0]=-e[0],i[1]=-e[1],i}function _d(i,e,t,n){const r=e[0],s=e[1];return i[0]=r+n*(t[0]-r),i[1]=s+n*(t[1]-s),i}function pw(i,e,t){const n=e[0],r=e[1];return i[0]=t[0]*n+t[4]*r+t[12],i[1]=t[1]*n+t[5]*r+t[13],i}const mw=dw;(function(){const i=hw();return function(e,t,n,r,s,o){let a,c;for(t||(t=2),n||(n=0),r?c=Math.min(r*t+n,e.length):c=e.length,a=n;a<c;a+=t)i[0]=e[a],i[1]=e[a+1],s(i,i,o),e[a]=i[0],e[a+1]=i[1];return e}})();function _w(i,e,t){const n=e[0],r=e[1],s=t[3]*n+t[7]*r||1;return i[0]=(t[0]*n+t[4]*r)/s,i[1]=(t[1]*n+t[5]*r)/s,i}function bd(i,e,t){const n=e[0],r=e[1],s=e[2],o=t[3]*n+t[7]*r+t[11]*s||1;return i[0]=(t[0]*n+t[4]*r+t[8]*s)/o,i[1]=(t[1]*n+t[5]*r+t[9]*s)/o,i[2]=(t[2]*n+t[6]*r+t[10]*s)/o,i}function bw(i,e,t){const n=e[0],r=e[1];return i[0]=t[0]*n+t[2]*r,i[1]=t[1]*n+t[3]*r,i[2]=e[2],i}function yw(i,e,t){const n=e[0],r=e[1];return i[0]=t[0]*n+t[2]*r,i[1]=t[1]*n+t[3]*r,i[2]=e[2],i[3]=e[3],i}function vw(i,e,t){const n=e[0],r=e[1],s=e[2];return i[0]=t[0]*n+t[3]*r+t[6]*s,i[1]=t[1]*n+t[4]*r+t[7]*s,i[2]=t[2]*n+t[5]*r+t[8]*s,i[3]=e[3],i}function yd(){const i=new Ne(3);return Ne!=Float32Array&&(i[0]=0,i[1]=0,i[2]=0),i}function ww(i){const e=i[0],t=i[1],n=i[2];return Math.sqrt(e*e+t*t+n*n)}function iu(i,e,t){const n=new Ne(3);return n[0]=i,n[1]=e,n[2]=t,n}function xw(i,e,t){return i[0]=e[0]-t[0],i[1]=e[1]-t[1],i[2]=e[2]-t[2],i}function Pw(i){const e=i[0],t=i[1],n=i[2];return e*e+t*t+n*n}function Ew(i,e){return i[0]=-e[0],i[1]=-e[1],i[2]=-e[2],i}function ha(i,e){const t=e[0],n=e[1],r=e[2];let s=t*t+n*n+r*r;return s>0&&(s=1/Math.sqrt(s)),i[0]=e[0]*s,i[1]=e[1]*s,i[2]=e[2]*s,i}function Jt(i,e){return i[0]*e[0]+i[1]*e[1]+i[2]*e[2]}function We(i,e,t){const n=e[0],r=e[1],s=e[2],o=t[0],a=t[1],c=t[2];return i[0]=r*c-s*a,i[1]=s*o-n*c,i[2]=n*a-r*o,i}function Sw(i,e,t,n){const r=e[0],s=e[1],o=e[2];return i[0]=r+n*(t[0]-r),i[1]=s+n*(t[1]-s),i[2]=o+n*(t[2]-o),i}function xc(i,e,t){const n=e[0],r=e[1],s=e[2];let o=t[3]*n+t[7]*r+t[11]*s+t[15];return o=o||1,i[0]=(t[0]*n+t[4]*r+t[8]*s+t[12])/o,i[1]=(t[1]*n+t[5]*r+t[9]*s+t[13])/o,i[2]=(t[2]*n+t[6]*r+t[10]*s+t[14])/o,i}function Lw(i,e,t){const n=e[0],r=e[1],s=e[2];return i[0]=n*t[0]+r*t[3]+s*t[6],i[1]=n*t[1]+r*t[4]+s*t[7],i[2]=n*t[2]+r*t[5]+s*t[8],i}function Pc(i,e,t){const n=t[0],r=t[1],s=t[2],o=t[3],a=e[0],c=e[1],l=e[2];let u=r*l-s*c,f=s*a-n*l,h=n*c-r*a,g=r*h-s*f,p=s*u-n*h,m=n*f-r*u;const _=o*2;return u*=_,f*=_,h*=_,g*=2,p*=2,m*=2,i[0]=a+u+g,i[1]=c+f+p,i[2]=l+h+m,i}function Tw(i,e,t,n){const r=[],s=[];return r[0]=e[0]-t[0],r[1]=e[1]-t[1],r[2]=e[2]-t[2],s[0]=r[0],s[1]=r[1]*Math.cos(n)-r[2]*Math.sin(n),s[2]=r[1]*Math.sin(n)+r[2]*Math.cos(n),i[0]=s[0]+t[0],i[1]=s[1]+t[1],i[2]=s[2]+t[2],i}function Aw(i,e,t,n){const r=[],s=[];return r[0]=e[0]-t[0],r[1]=e[1]-t[1],r[2]=e[2]-t[2],s[0]=r[2]*Math.sin(n)+r[0]*Math.cos(n),s[1]=r[1],s[2]=r[2]*Math.cos(n)-r[0]*Math.sin(n),i[0]=s[0]+t[0],i[1]=s[1]+t[1],i[2]=s[2]+t[2],i}function Cw(i,e,t,n){const r=[],s=[];return r[0]=e[0]-t[0],r[1]=e[1]-t[1],r[2]=e[2]-t[2],s[0]=r[0]*Math.cos(n)-r[1]*Math.sin(n),s[1]=r[0]*Math.sin(n)+r[1]*Math.cos(n),s[2]=r[2],i[0]=s[0]+t[0],i[1]=s[1]+t[1],i[2]=s[2]+t[2],i}function Mw(i,e){const t=i[0],n=i[1],r=i[2],s=e[0],o=e[1],a=e[2],c=Math.sqrt((t*t+n*n+r*r)*(s*s+o*o+a*a)),l=c&&Jt(i,e)/c;return Math.acos(Math.min(Math.max(l,-1),1))}const vd=xw,Br=ww,Ys=Pw;(function(){const i=yd();return function(e,t,n,r,s,o){let a,c;for(t||(t=3),n||(n=0),r?c=Math.min(r*t+n,e.length):c=e.length,a=n;a<c;a+=t)i[0]=e[a],i[1]=e[a+1],i[2]=e[a+2],s(i,i,o),e[a]=i[0],e[a+1]=i[1],e[a+2]=i[2];return e}})();const qs=[0,0,0];let Nn;class Qe extends md{static get ZERO(){return Nn||(Nn=new Qe(0,0,0),Object.freeze(Nn)),Nn}constructor(e=0,t=0,n=0){super(-0,-0,-0),arguments.length===1&&It(e)?this.copy(e):(xe.debug&&(te(e),te(t),te(n)),this[0]=e,this[1]=t,this[2]=n)}set(e,t,n){return this[0]=e,this[1]=t,this[2]=n,this.check()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this.check()}fromObject(e){return xe.debug&&(te(e.x),te(e.y),te(e.z)),this[0]=e.x,this[1]=e.y,this[2]=e.z,this.check()}toObject(e){return e.x=this[0],e.y=this[1],e.z=this[2],e}get ELEMENTS(){return 3}get z(){return this[2]}set z(e){this[2]=te(e)}angle(e){return Mw(this,e)}cross(e){return We(this,this,e),this.check()}rotateX({radians:e,origin:t=qs}){return Tw(this,this,t,e),this.check()}rotateY({radians:e,origin:t=qs}){return Aw(this,this,t,e),this.check()}rotateZ({radians:e,origin:t=qs}){return Cw(this,this,t,e),this.check()}transform(e){return this.transformAsPoint(e)}transformAsPoint(e){return xc(this,this,e),this.check()}transformAsVector(e){return bd(this,this,e),this.check()}transformByMatrix3(e){return Lw(this,this,e),this.check()}transformByMatrix2(e){return bw(this,this,e),this.check()}transformByQuaternion(e){return Pc(this,this,e),this.check()}}let Un;class Ec extends md{static get ZERO(){return Un||(Un=new Ec(0,0,0,0),Object.freeze(Un)),Un}constructor(e=0,t=0,n=0,r=0){super(-0,-0,-0,-0),It(e)&&arguments.length===1?this.copy(e):(xe.debug&&(te(e),te(t),te(n),te(r)),this[0]=e,this[1]=t,this[2]=n,this[3]=r)}set(e,t,n,r){return this[0]=e,this[1]=t,this[2]=n,this[3]=r,this.check()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this.check()}fromObject(e){return xe.debug&&(te(e.x),te(e.y),te(e.z),te(e.w)),this[0]=e.x,this[1]=e.y,this[2]=e.z,this[3]=e.w,this}toObject(e){return e.x=this[0],e.y=this[1],e.z=this[2],e.w=this[3],e}get ELEMENTS(){return 4}get z(){return this[2]}set z(e){this[2]=te(e)}get w(){return this[3]}set w(e){this[3]=te(e)}transform(e){return xc(this,this,e),this.check()}transformByMatrix3(e){return vw(this,this,e),this.check()}transformByMatrix2(e){return yw(this,this,e),this.check()}transformByQuaternion(e){return Pc(this,this,e),this.check()}applyMatrix4(e){return e.transform(this,this),this}}class Iw extends wc{toString(){let e="[";if(xe.printRowMajor){e+="row-major:";for(let t=0;t<this.RANK;++t)for(let n=0;n<this.RANK;++n)e+=` ${this[n*this.RANK+t]}`}else{e+="column-major:";for(let t=0;t<this.ELEMENTS;++t)e+=` ${this[t]}`}return e+="]",e}getElementIndex(e,t){return t*this.RANK+e}getElement(e,t){return this[t*this.RANK+e]}setElement(e,t,n){return this[t*this.RANK+e]=te(n),this}getColumn(e,t=new Array(this.RANK).fill(-0)){const n=e*this.RANK;for(let r=0;r<this.RANK;++r)t[r]=this[n+r];return t}setColumn(e,t){const n=e*this.RANK;for(let r=0;r<this.RANK;++r)this[n+r]=t[r];return this}}function Rw(){const i=new Ne(9);return Ne!=Float32Array&&(i[1]=0,i[2]=0,i[3]=0,i[5]=0,i[6]=0,i[7]=0),i[0]=1,i[4]=1,i[8]=1,i}function Ow(i){return i[0]=1,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=1,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,i}function Bw(i,e){if(i===e){const t=e[1],n=e[2],r=e[3],s=e[6],o=e[7],a=e[11];i[1]=e[4],i[2]=e[8],i[3]=e[12],i[4]=t,i[6]=e[9],i[7]=e[13],i[8]=n,i[9]=s,i[11]=e[14],i[12]=r,i[13]=o,i[14]=a}else i[0]=e[0],i[1]=e[4],i[2]=e[8],i[3]=e[12],i[4]=e[1],i[5]=e[5],i[6]=e[9],i[7]=e[13],i[8]=e[2],i[9]=e[6],i[10]=e[10],i[11]=e[14],i[12]=e[3],i[13]=e[7],i[14]=e[11],i[15]=e[15];return i}function da(i,e){const t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],g=e[11],p=e[12],m=e[13],_=e[14],y=e[15],w=t*a-n*o,b=t*c-r*o,x=t*l-s*o,S=n*c-r*a,L=n*l-s*a,R=r*l-s*c,O=u*m-f*p,B=u*_-h*p,k=u*y-g*p,U=f*_-h*m,$=f*y-g*m,N=h*y-g*_;let z=w*N-b*$+x*U+S*k-L*B+R*O;return z?(z=1/z,i[0]=(a*N-c*$+l*U)*z,i[1]=(r*$-n*N-s*U)*z,i[2]=(m*R-_*L+y*S)*z,i[3]=(h*L-f*R-g*S)*z,i[4]=(c*k-o*N-l*B)*z,i[5]=(t*N-r*k+s*B)*z,i[6]=(_*x-p*R-y*b)*z,i[7]=(u*R-h*x+g*b)*z,i[8]=(o*$-a*k+l*O)*z,i[9]=(n*k-t*$-s*O)*z,i[10]=(p*L-m*x+y*w)*z,i[11]=(f*x-u*L-g*w)*z,i[12]=(a*B-o*U-c*O)*z,i[13]=(t*U-n*B+r*O)*z,i[14]=(m*b-p*S-_*w)*z,i[15]=(u*S-f*b+h*w)*z,i):null}function kw(i){const e=i[0],t=i[1],n=i[2],r=i[3],s=i[4],o=i[5],a=i[6],c=i[7],l=i[8],u=i[9],f=i[10],h=i[11],g=i[12],p=i[13],m=i[14],_=i[15],y=e*o-t*s,w=e*a-n*s,b=t*a-n*o,x=l*p-u*g,S=l*m-f*g,L=u*m-f*p,R=e*L-t*S+n*x,O=s*L-o*S+a*x,B=l*b-u*w+f*y,k=g*b-p*w+m*y;return c*R-r*O+_*B-h*k}function Lt(i,e,t){const n=e[0],r=e[1],s=e[2],o=e[3],a=e[4],c=e[5],l=e[6],u=e[7],f=e[8],h=e[9],g=e[10],p=e[11],m=e[12],_=e[13],y=e[14],w=e[15];let b=t[0],x=t[1],S=t[2],L=t[3];return i[0]=b*n+x*a+S*f+L*m,i[1]=b*r+x*c+S*h+L*_,i[2]=b*s+x*l+S*g+L*y,i[3]=b*o+x*u+S*p+L*w,b=t[4],x=t[5],S=t[6],L=t[7],i[4]=b*n+x*a+S*f+L*m,i[5]=b*r+x*c+S*h+L*_,i[6]=b*s+x*l+S*g+L*y,i[7]=b*o+x*u+S*p+L*w,b=t[8],x=t[9],S=t[10],L=t[11],i[8]=b*n+x*a+S*f+L*m,i[9]=b*r+x*c+S*h+L*_,i[10]=b*s+x*l+S*g+L*y,i[11]=b*o+x*u+S*p+L*w,b=t[12],x=t[13],S=t[14],L=t[15],i[12]=b*n+x*a+S*f+L*m,i[13]=b*r+x*c+S*h+L*_,i[14]=b*s+x*l+S*g+L*y,i[15]=b*o+x*u+S*p+L*w,i}function kr(i,e,t){const n=t[0],r=t[1],s=t[2];let o,a,c,l,u,f,h,g,p,m,_,y;return e===i?(i[12]=e[0]*n+e[4]*r+e[8]*s+e[12],i[13]=e[1]*n+e[5]*r+e[9]*s+e[13],i[14]=e[2]*n+e[6]*r+e[10]*s+e[14],i[15]=e[3]*n+e[7]*r+e[11]*s+e[15]):(o=e[0],a=e[1],c=e[2],l=e[3],u=e[4],f=e[5],h=e[6],g=e[7],p=e[8],m=e[9],_=e[10],y=e[11],i[0]=o,i[1]=a,i[2]=c,i[3]=l,i[4]=u,i[5]=f,i[6]=h,i[7]=g,i[8]=p,i[9]=m,i[10]=_,i[11]=y,i[12]=o*n+u*r+p*s+e[12],i[13]=a*n+f*r+m*s+e[13],i[14]=c*n+h*r+_*s+e[14],i[15]=l*n+g*r+y*s+e[15]),i}function Sc(i,e,t){const n=t[0],r=t[1],s=t[2];return i[0]=e[0]*n,i[1]=e[1]*n,i[2]=e[2]*n,i[3]=e[3]*n,i[4]=e[4]*r,i[5]=e[5]*r,i[6]=e[6]*r,i[7]=e[7]*r,i[8]=e[8]*s,i[9]=e[9]*s,i[10]=e[10]*s,i[11]=e[11]*s,i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15],i}function Dw(i,e,t,n){let r=n[0],s=n[1],o=n[2],a=Math.sqrt(r*r+s*s+o*o),c,l,u,f,h,g,p,m,_,y,w,b,x,S,L,R,O,B,k,U,$,N,z,ie;return a<Yi?null:(a=1/a,r*=a,s*=a,o*=a,l=Math.sin(t),c=Math.cos(t),u=1-c,f=e[0],h=e[1],g=e[2],p=e[3],m=e[4],_=e[5],y=e[6],w=e[7],b=e[8],x=e[9],S=e[10],L=e[11],R=r*r*u+c,O=s*r*u+o*l,B=o*r*u-s*l,k=r*s*u-o*l,U=s*s*u+c,$=o*s*u+r*l,N=r*o*u+s*l,z=s*o*u-r*l,ie=o*o*u+c,i[0]=f*R+m*O+b*B,i[1]=h*R+_*O+x*B,i[2]=g*R+y*O+S*B,i[3]=p*R+w*O+L*B,i[4]=f*k+m*U+b*$,i[5]=h*k+_*U+x*$,i[6]=g*k+y*U+S*$,i[7]=p*k+w*U+L*$,i[8]=f*N+m*z+b*ie,i[9]=h*N+_*z+x*ie,i[10]=g*N+y*z+S*ie,i[11]=p*N+w*z+L*ie,e!==i&&(i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i)}function wd(i,e,t){const n=Math.sin(t),r=Math.cos(t),s=e[4],o=e[5],a=e[6],c=e[7],l=e[8],u=e[9],f=e[10],h=e[11];return e!==i&&(i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=e[3],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i[4]=s*r+l*n,i[5]=o*r+u*n,i[6]=a*r+f*n,i[7]=c*r+h*n,i[8]=l*r-s*n,i[9]=u*r-o*n,i[10]=f*r-a*n,i[11]=h*r-c*n,i}function Fw(i,e,t){const n=Math.sin(t),r=Math.cos(t),s=e[0],o=e[1],a=e[2],c=e[3],l=e[8],u=e[9],f=e[10],h=e[11];return e!==i&&(i[4]=e[4],i[5]=e[5],i[6]=e[6],i[7]=e[7],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i[0]=s*r-l*n,i[1]=o*r-u*n,i[2]=a*r-f*n,i[3]=c*r-h*n,i[8]=s*n+l*r,i[9]=o*n+u*r,i[10]=a*n+f*r,i[11]=c*n+h*r,i}function xd(i,e,t){const n=Math.sin(t),r=Math.cos(t),s=e[0],o=e[1],a=e[2],c=e[3],l=e[4],u=e[5],f=e[6],h=e[7];return e!==i&&(i[8]=e[8],i[9]=e[9],i[10]=e[10],i[11]=e[11],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i[0]=s*r+l*n,i[1]=o*r+u*n,i[2]=a*r+f*n,i[3]=c*r+h*n,i[4]=l*r-s*n,i[5]=u*r-o*n,i[6]=f*r-a*n,i[7]=h*r-c*n,i}function Nw(i,e){const t=e[0],n=e[1],r=e[2],s=e[3],o=t+t,a=n+n,c=r+r,l=t*o,u=n*o,f=n*a,h=r*o,g=r*a,p=r*c,m=s*o,_=s*a,y=s*c;return i[0]=1-f-p,i[1]=u+y,i[2]=h-_,i[3]=0,i[4]=u-y,i[5]=1-l-p,i[6]=g+m,i[7]=0,i[8]=h+_,i[9]=g-m,i[10]=1-l-f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,i}function Uw(i,e,t,n,r,s,o){const a=1/(t-e),c=1/(r-n),l=1/(s-o);return i[0]=s*2*a,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=s*2*c,i[6]=0,i[7]=0,i[8]=(t+e)*a,i[9]=(r+n)*c,i[10]=(o+s)*l,i[11]=-1,i[12]=0,i[13]=0,i[14]=o*s*2*l,i[15]=0,i}function zw(i,e,t,n,r){const s=1/Math.tan(e/2);if(i[0]=s/t,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=s,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[11]=-1,i[12]=0,i[13]=0,i[15]=0,r!=null&&r!==1/0){const o=1/(n-r);i[10]=(r+n)*o,i[14]=2*r*n*o}else i[10]=-1,i[14]=-2*n;return i}const $w=zw;function Gw(i,e,t,n,r,s,o){const a=1/(e-t),c=1/(n-r),l=1/(s-o);return i[0]=-2*a,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=-2*c,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=2*l,i[11]=0,i[12]=(e+t)*a,i[13]=(r+n)*c,i[14]=(o+s)*l,i[15]=1,i}const Vw=Gw;function jw(i,e,t,n){let r,s,o,a,c,l,u,f,h,g;const p=e[0],m=e[1],_=e[2],y=n[0],w=n[1],b=n[2],x=t[0],S=t[1],L=t[2];return Math.abs(p-x)<Yi&&Math.abs(m-S)<Yi&&Math.abs(_-L)<Yi?Ow(i):(f=p-x,h=m-S,g=_-L,r=1/Math.sqrt(f*f+h*h+g*g),f*=r,h*=r,g*=r,s=w*g-b*h,o=b*f-y*g,a=y*h-w*f,r=Math.sqrt(s*s+o*o+a*a),r?(r=1/r,s*=r,o*=r,a*=r):(s=0,o=0,a=0),c=h*a-g*o,l=g*s-f*a,u=f*o-h*s,r=Math.sqrt(c*c+l*l+u*u),r?(r=1/r,c*=r,l*=r,u*=r):(c=0,l=0,u=0),i[0]=s,i[1]=c,i[2]=f,i[3]=0,i[4]=o,i[5]=l,i[6]=h,i[7]=0,i[8]=a,i[9]=u,i[10]=g,i[11]=0,i[12]=-(s*p+o*m+a*_),i[13]=-(c*p+l*m+u*_),i[14]=-(f*p+h*m+g*_),i[15]=1,i)}function Ww(){const i=new Ne(4);return Ne!=Float32Array&&(i[0]=0,i[1]=0,i[2]=0,i[3]=0),i}function Hw(i,e,t){return i[0]=e[0]+t[0],i[1]=e[1]+t[1],i[2]=e[2]+t[2],i[3]=e[3]+t[3],i}function Lc(i,e,t){return i[0]=e[0]*t,i[1]=e[1]*t,i[2]=e[2]*t,i[3]=e[3]*t,i}function Yw(i){const e=i[0],t=i[1],n=i[2],r=i[3];return Math.sqrt(e*e+t*t+n*n+r*r)}function qw(i){const e=i[0],t=i[1],n=i[2],r=i[3];return e*e+t*t+n*n+r*r}function Zw(i,e){const t=e[0],n=e[1],r=e[2],s=e[3];let o=t*t+n*n+r*r+s*s;return o>0&&(o=1/Math.sqrt(o)),i[0]=t*o,i[1]=n*o,i[2]=r*o,i[3]=s*o,i}function Xw(i,e){return i[0]*e[0]+i[1]*e[1]+i[2]*e[2]+i[3]*e[3]}function Kw(i,e,t,n){const r=e[0],s=e[1],o=e[2],a=e[3];return i[0]=r+n*(t[0]-r),i[1]=s+n*(t[1]-s),i[2]=o+n*(t[2]-o),i[3]=a+n*(t[3]-a),i}function Ei(i,e,t){const n=e[0],r=e[1],s=e[2],o=e[3];return i[0]=t[0]*n+t[4]*r+t[8]*s+t[12]*o,i[1]=t[1]*n+t[5]*r+t[9]*s+t[13]*o,i[2]=t[2]*n+t[6]*r+t[10]*s+t[14]*o,i[3]=t[3]*n+t[7]*r+t[11]*s+t[15]*o,i}function Qw(i,e,t){const n=e[0],r=e[1],s=e[2],o=t[0],a=t[1],c=t[2],l=t[3],u=l*n+a*s-c*r,f=l*r+c*n-o*s,h=l*s+o*r-a*n,g=-o*n-a*r-c*s;return i[0]=u*l+g*-o+f*-c-h*-a,i[1]=f*l+g*-a+h*-o-u*-c,i[2]=h*l+g*-c+u*-a-f*-o,i[3]=e[3],i}(function(){const i=Ww();return function(e,t,n,r,s,o){let a,c;for(t||(t=4),n||(n=0),r?c=Math.min(r*t+n,e.length):c=e.length,a=n;a<c;a+=t)i[0]=e[a],i[1]=e[a+1],i[2]=e[a+2],i[3]=e[a+3],s(i,i,o),e[a]=i[0],e[a+1]=i[1],e[a+2]=i[2],e[a+3]=i[3];return e}})();var ga;(function(i){i[i.COL0ROW0=0]="COL0ROW0",i[i.COL0ROW1=1]="COL0ROW1",i[i.COL0ROW2=2]="COL0ROW2",i[i.COL0ROW3=3]="COL0ROW3",i[i.COL1ROW0=4]="COL1ROW0",i[i.COL1ROW1=5]="COL1ROW1",i[i.COL1ROW2=6]="COL1ROW2",i[i.COL1ROW3=7]="COL1ROW3",i[i.COL2ROW0=8]="COL2ROW0",i[i.COL2ROW1=9]="COL2ROW1",i[i.COL2ROW2=10]="COL2ROW2",i[i.COL2ROW3=11]="COL2ROW3",i[i.COL3ROW0=12]="COL3ROW0",i[i.COL3ROW1=13]="COL3ROW1",i[i.COL3ROW2=14]="COL3ROW2",i[i.COL3ROW3=15]="COL3ROW3"})(ga||(ga={}));const Jw=45*Math.PI/180,ex=1,Zs=.1,Xs=500,tx=Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);class Ue extends Iw{static get IDENTITY(){return nx()}static get ZERO(){return ix()}get ELEMENTS(){return 16}get RANK(){return 4}get INDICES(){return ga}constructor(e){super(-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0),arguments.length===1&&Array.isArray(e)?this.copy(e):this.identity()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this[4]=e[4],this[5]=e[5],this[6]=e[6],this[7]=e[7],this[8]=e[8],this[9]=e[9],this[10]=e[10],this[11]=e[11],this[12]=e[12],this[13]=e[13],this[14]=e[14],this[15]=e[15],this.check()}set(e,t,n,r,s,o,a,c,l,u,f,h,g,p,m,_){return this[0]=e,this[1]=t,this[2]=n,this[3]=r,this[4]=s,this[5]=o,this[6]=a,this[7]=c,this[8]=l,this[9]=u,this[10]=f,this[11]=h,this[12]=g,this[13]=p,this[14]=m,this[15]=_,this.check()}setRowMajor(e,t,n,r,s,o,a,c,l,u,f,h,g,p,m,_){return this[0]=e,this[1]=s,this[2]=l,this[3]=g,this[4]=t,this[5]=o,this[6]=u,this[7]=p,this[8]=n,this[9]=a,this[10]=f,this[11]=m,this[12]=r,this[13]=c,this[14]=h,this[15]=_,this.check()}toRowMajor(e){return e[0]=this[0],e[1]=this[4],e[2]=this[8],e[3]=this[12],e[4]=this[1],e[5]=this[5],e[6]=this[9],e[7]=this[13],e[8]=this[2],e[9]=this[6],e[10]=this[10],e[11]=this[14],e[12]=this[3],e[13]=this[7],e[14]=this[11],e[15]=this[15],e}identity(){return this.copy(tx)}fromObject(e){return this.check()}fromQuaternion(e){return Nw(this,e),this.check()}frustum(e){const{left:t,right:n,bottom:r,top:s,near:o=Zs,far:a=Xs}=e;return a===1/0?rx(this,t,n,r,s,o):Uw(this,t,n,r,s,o,a),this.check()}lookAt(e){const{eye:t,center:n=[0,0,0],up:r=[0,1,0]}=e;return jw(this,t,n,r),this.check()}ortho(e){const{left:t,right:n,bottom:r,top:s,near:o=Zs,far:a=Xs}=e;return Vw(this,t,n,r,s,o,a),this.check()}orthographic(e){const{fovy:t=Jw,aspect:n=ex,focalDistance:r=1,near:s=Zs,far:o=Xs}=e;nu(t);const a=t/2,c=r*Math.tan(a),l=c*n;return this.ortho({left:-l,right:l,bottom:-c,top:c,near:s,far:o})}perspective(e){const{fovy:t=45*Math.PI/180,aspect:n=1,near:r=.1,far:s=500}=e;return nu(t),$w(this,t,n,r,s),this.check()}determinant(){return kw(this)}getScale(e=[-0,-0,-0]){return e[0]=Math.sqrt(this[0]*this[0]+this[1]*this[1]+this[2]*this[2]),e[1]=Math.sqrt(this[4]*this[4]+this[5]*this[5]+this[6]*this[6]),e[2]=Math.sqrt(this[8]*this[8]+this[9]*this[9]+this[10]*this[10]),e}getTranslation(e=[-0,-0,-0]){return e[0]=this[12],e[1]=this[13],e[2]=this[14],e}getRotation(e,t){e=e||[-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0],t=t||[-0,-0,-0];const n=this.getScale(t),r=1/n[0],s=1/n[1],o=1/n[2];return e[0]=this[0]*r,e[1]=this[1]*s,e[2]=this[2]*o,e[3]=0,e[4]=this[4]*r,e[5]=this[5]*s,e[6]=this[6]*o,e[7]=0,e[8]=this[8]*r,e[9]=this[9]*s,e[10]=this[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}getRotationMatrix3(e,t){e=e||[-0,-0,-0,-0,-0,-0,-0,-0,-0],t=t||[-0,-0,-0];const n=this.getScale(t),r=1/n[0],s=1/n[1],o=1/n[2];return e[0]=this[0]*r,e[1]=this[1]*s,e[2]=this[2]*o,e[3]=this[4]*r,e[4]=this[5]*s,e[5]=this[6]*o,e[6]=this[8]*r,e[7]=this[9]*s,e[8]=this[10]*o,e}transpose(){return Bw(this,this),this.check()}invert(){return da(this,this),this.check()}multiplyLeft(e){return Lt(this,e,this),this.check()}multiplyRight(e){return Lt(this,this,e),this.check()}rotateX(e){return wd(this,this,e),this.check()}rotateY(e){return Fw(this,this,e),this.check()}rotateZ(e){return xd(this,this,e),this.check()}rotateXYZ(e){return this.rotateX(e[0]).rotateY(e[1]).rotateZ(e[2])}rotateAxis(e,t){return Dw(this,this,e,t),this.check()}scale(e){return Sc(this,this,Array.isArray(e)?e:[e,e,e]),this.check()}translate(e){return kr(this,this,e),this.check()}transform(e,t){return e.length===4?(t=Ei(t||[-0,-0,-0,-0],e,this),tr(t,4),t):this.transformAsPoint(e,t)}transformAsPoint(e,t){const{length:n}=e;let r;switch(n){case 2:r=pw(t||[-0,-0],e,this);break;case 3:r=xc(t||[-0,-0,-0],e,this);break;default:throw new Error("Illegal vector")}return tr(r,e.length),r}transformAsVector(e,t){let n;switch(e.length){case 2:n=_w(t||[-0,-0],e,this);break;case 3:n=bd(t||[-0,-0,-0],e,this);break;default:throw new Error("Illegal vector")}return tr(n,e.length),n}transformPoint(e,t){return this.transformAsPoint(e,t)}transformVector(e,t){return this.transformAsPoint(e,t)}transformDirection(e,t){return this.transformAsVector(e,t)}makeRotationX(e){return this.identity().rotateX(e)}makeTranslation(e,t,n){return this.identity().translate([e,t,n])}}let zn,$n;function ix(){return zn||(zn=new Ue([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),Object.freeze(zn)),zn}function nx(){return $n||($n=new Ue,Object.freeze($n)),$n}function nu(i){if(i>Math.PI*2)throw Error("expected radians")}function rx(i,e,t,n,r,s){const o=2*s/(t-e),a=2*s/(r-n),c=(t+e)/(t-e),l=(r+n)/(r-n),u=-1,f=-1,h=-2*s;return i[0]=o,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=a,i[6]=0,i[7]=0,i[8]=c,i[9]=l,i[10]=u,i[11]=f,i[12]=0,i[13]=0,i[14]=h,i[15]=0,i}function ru(){const i=new Ne(4);return Ne!=Float32Array&&(i[0]=0,i[1]=0,i[2]=0),i[3]=1,i}function sx(i){return i[0]=0,i[1]=0,i[2]=0,i[3]=1,i}function Pd(i,e,t){t=t*.5;const n=Math.sin(t);return i[0]=n*e[0],i[1]=n*e[1],i[2]=n*e[2],i[3]=Math.cos(t),i}function su(i,e,t){const n=e[0],r=e[1],s=e[2],o=e[3],a=t[0],c=t[1],l=t[2],u=t[3];return i[0]=n*u+o*a+r*l-s*c,i[1]=r*u+o*c+s*a-n*l,i[2]=s*u+o*l+n*c-r*a,i[3]=o*u-n*a-r*c-s*l,i}function ox(i,e,t){t*=.5;const n=e[0],r=e[1],s=e[2],o=e[3],a=Math.sin(t),c=Math.cos(t);return i[0]=n*c+o*a,i[1]=r*c+s*a,i[2]=s*c-r*a,i[3]=o*c-n*a,i}function ax(i,e,t){t*=.5;const n=e[0],r=e[1],s=e[2],o=e[3],a=Math.sin(t),c=Math.cos(t);return i[0]=n*c-s*a,i[1]=r*c+o*a,i[2]=s*c+n*a,i[3]=o*c-r*a,i}function cx(i,e,t){t*=.5;const n=e[0],r=e[1],s=e[2],o=e[3],a=Math.sin(t),c=Math.cos(t);return i[0]=n*c+r*a,i[1]=r*c-n*a,i[2]=s*c+o*a,i[3]=o*c-s*a,i}function lx(i,e){const t=e[0],n=e[1],r=e[2];return i[0]=t,i[1]=n,i[2]=r,i[3]=Math.sqrt(Math.abs(1-t*t-n*n-r*r)),i}function ir(i,e,t,n){const r=e[0],s=e[1],o=e[2],a=e[3];let c=t[0],l=t[1],u=t[2],f=t[3],h,g,p,m,_;return h=r*c+s*l+o*u+a*f,h<0&&(h=-h,c=-c,l=-l,u=-u,f=-f),1-h>Yi?(g=Math.acos(h),_=Math.sin(g),p=Math.sin((1-n)*g)/_,m=Math.sin(n*g)/_):(p=1-n,m=n),i[0]=p*r+m*c,i[1]=p*s+m*l,i[2]=p*o+m*u,i[3]=p*a+m*f,i}function ux(i,e){const t=e[0],n=e[1],r=e[2],s=e[3],o=t*t+n*n+r*r+s*s,a=o?1/o:0;return i[0]=-t*a,i[1]=-n*a,i[2]=-r*a,i[3]=s*a,i}function fx(i,e){return i[0]=-e[0],i[1]=-e[1],i[2]=-e[2],i[3]=e[3],i}function Ed(i,e){const t=e[0]+e[4]+e[8];let n;if(t>0)n=Math.sqrt(t+1),i[3]=.5*n,n=.5/n,i[0]=(e[5]-e[7])*n,i[1]=(e[6]-e[2])*n,i[2]=(e[1]-e[3])*n;else{let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);const s=(r+1)%3,o=(r+2)%3;n=Math.sqrt(e[r*3+r]-e[s*3+s]-e[o*3+o]+1),i[r]=.5*n,n=.5/n,i[3]=(e[s*3+o]-e[o*3+s])*n,i[s]=(e[s*3+r]+e[r*3+s])*n,i[o]=(e[o*3+r]+e[r*3+o])*n}return i}const hx=Hw,dx=Lc,gx=Xw,px=Kw,mx=Yw,_x=qw,Sd=Zw,bx=(function(){const i=yd(),e=iu(1,0,0),t=iu(0,1,0);return function(n,r,s){const o=Jt(r,s);return o<-.999999?(We(i,e,r),Br(i)<1e-6&&We(i,t,r),ha(i,i),Pd(n,i,Math.PI),n):o>.999999?(n[0]=0,n[1]=0,n[2]=0,n[3]=1,n):(We(i,r,s),n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=1+o,Sd(n,n))}})();(function(){const i=ru(),e=ru();return function(t,n,r,s,o,a){return ir(i,n,o,a),ir(e,r,s,a),ir(t,i,e,2*a*(1-a)),t}})();(function(){const i=Rw();return function(e,t,n,r){return i[0]=n[0],i[3]=n[1],i[6]=n[2],i[1]=r[0],i[4]=r[1],i[7]=r[2],i[2]=-t[0],i[5]=-t[1],i[8]=-t[2],Sd(e,Ed(e,i))}})();const yx=[0,0,0,1];class vx extends wc{constructor(e=0,t=0,n=0,r=1){super(-0,-0,-0,-0),Array.isArray(e)&&arguments.length===1?this.copy(e):this.set(e,t,n,r)}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this.check()}set(e,t,n,r){return this[0]=e,this[1]=t,this[2]=n,this[3]=r,this.check()}fromObject(e){return this[0]=e.x,this[1]=e.y,this[2]=e.z,this[3]=e.w,this.check()}fromMatrix3(e){return Ed(this,e),this.check()}fromAxisRotation(e,t){return Pd(this,e,t),this.check()}identity(){return sx(this),this.check()}setAxisAngle(e,t){return this.fromAxisRotation(e,t)}get ELEMENTS(){return 4}get x(){return this[0]}set x(e){this[0]=te(e)}get y(){return this[1]}set y(e){this[1]=te(e)}get z(){return this[2]}set z(e){this[2]=te(e)}get w(){return this[3]}set w(e){this[3]=te(e)}len(){return mx(this)}lengthSquared(){return _x(this)}dot(e){return gx(this,e)}rotationTo(e,t){return bx(this,e,t),this.check()}add(e){return hx(this,this,e),this.check()}calculateW(){return lx(this,this),this.check()}conjugate(){return fx(this,this),this.check()}invert(){return ux(this,this),this.check()}lerp(e,t,n){return n===void 0?this.lerp(this,e,t):(px(this,e,t,n),this.check())}multiplyRight(e){return su(this,this,e),this.check()}multiplyLeft(e){return su(this,e,this),this.check()}normalize(){const e=this.len(),t=e>0?1/e:0;return this[0]=this[0]*t,this[1]=this[1]*t,this[2]=this[2]*t,this[3]=this[3]*t,e===0&&(this[3]=1),this.check()}rotateX(e){return ox(this,this,e),this.check()}rotateY(e){return ax(this,this,e),this.check()}rotateZ(e){return cx(this,this,e),this.check()}scale(e){return dx(this,this,e),this.check()}slerp(e,t,n){let r,s,o;switch(arguments.length){case 1:({start:r=yx,target:s,ratio:o}=e);break;case 2:r=this,s=e,o=t;break;default:r=e,s=t,o=n}return ir(this,r,s,o),this.check()}transformVector4(e,t=new Ec){return Qw(t,e,this),tr(t,4)}lengthSq(){return this.lengthSquared()}setFromAxisAngle(e,t){return this.setAxisAngle(e,t)}premultiply(e){return this.multiplyLeft(e)}multiply(e){return this.multiplyRight(e)}}function Ld(i,e=[],t=0){const n=Math.fround(i),r=i-n;return e[t]=n,e[t+1]=r,e}function wx(i){return i-Math.fround(i)}function xx(i){const e=new Float32Array(32);for(let t=0;t<4;++t)for(let n=0;n<4;++n){const r=t*4+n;Ld(i[n*4+t],e,r*2)}return e}function Td(i,e=!0){return i??e}function Ad(i=[0,0,0],e=!0){return e?i.map(t=>t/255):[...i]}function Px(i,e=!0){const t=Ad(i.slice(0,3),e),n=Number.isFinite(i[3]),r=n?i[3]:1;return[t[0],t[1],t[2],e&&n?r/255:r]}const Ex=`#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND

// All these functions are for substituting tan() function from Intel GPU only
const float TWO_PI = 6.2831854820251465;
const float PI_2 = 1.5707963705062866;
const float PI_16 = 0.1963495463132858;

const float SIN_TABLE_0 = 0.19509032368659973;
const float SIN_TABLE_1 = 0.3826834261417389;
const float SIN_TABLE_2 = 0.5555702447891235;
const float SIN_TABLE_3 = 0.7071067690849304;

const float COS_TABLE_0 = 0.9807852506637573;
const float COS_TABLE_1 = 0.9238795042037964;
const float COS_TABLE_2 = 0.8314695954322815;
const float COS_TABLE_3 = 0.7071067690849304;

const float INVERSE_FACTORIAL_3 = 1.666666716337204e-01; // 1/3!
const float INVERSE_FACTORIAL_5 = 8.333333767950535e-03; // 1/5!
const float INVERSE_FACTORIAL_7 = 1.9841270113829523e-04; // 1/7!
const float INVERSE_FACTORIAL_9 = 2.75573188446287533e-06; // 1/9!

float sin_taylor_fp32(float a) {
  float r, s, t, x;

  if (a == 0.0) {
    return 0.0;
  }

  x = -a * a;
  s = a;
  r = a;

  r = r * x;
  t = r * INVERSE_FACTORIAL_3;
  s = s + t;

  r = r * x;
  t = r * INVERSE_FACTORIAL_5;
  s = s + t;

  r = r * x;
  t = r * INVERSE_FACTORIAL_7;
  s = s + t;

  r = r * x;
  t = r * INVERSE_FACTORIAL_9;
  s = s + t;

  return s;
}

void sincos_taylor_fp32(float a, out float sin_t, out float cos_t) {
  if (a == 0.0) {
    sin_t = 0.0;
    cos_t = 1.0;
  }
  sin_t = sin_taylor_fp32(a);
  cos_t = sqrt(1.0 - sin_t * sin_t);
}

float tan_taylor_fp32(float a) {
    float sin_a;
    float cos_a;

    if (a == 0.0) {
        return 0.0;
    }

    // 2pi range reduction
    float z = floor(a / TWO_PI);
    float r = a - TWO_PI * z;

    float t;
    float q = floor(r / PI_2 + 0.5);
    int j = int(q);

    if (j < -2 || j > 2) {
        return 1.0 / 0.0;
    }

    t = r - PI_2 * q;

    q = floor(t / PI_16 + 0.5);
    int k = int(q);
    int abs_k = int(abs(float(k)));

    if (abs_k > 4) {
        return 1.0 / 0.0;
    } else {
        t = t - PI_16 * q;
    }

    float u = 0.0;
    float v = 0.0;

    float sin_t, cos_t;
    float s, c;
    sincos_taylor_fp32(t, sin_t, cos_t);

    if (k == 0) {
        s = sin_t;
        c = cos_t;
    } else {
        if (abs(float(abs_k) - 1.0) < 0.5) {
            u = COS_TABLE_0;
            v = SIN_TABLE_0;
        } else if (abs(float(abs_k) - 2.0) < 0.5) {
            u = COS_TABLE_1;
            v = SIN_TABLE_1;
        } else if (abs(float(abs_k) - 3.0) < 0.5) {
            u = COS_TABLE_2;
            v = SIN_TABLE_2;
        } else if (abs(float(abs_k) - 4.0) < 0.5) {
            u = COS_TABLE_3;
            v = SIN_TABLE_3;
        }
        if (k > 0) {
            s = u * sin_t + v * cos_t;
            c = u * cos_t - v * sin_t;
        } else {
            s = u * sin_t - v * cos_t;
            c = u * cos_t + v * sin_t;
        }
    }

    if (j == 0) {
        sin_a = s;
        cos_a = c;
    } else if (j == 1) {
        sin_a = c;
        cos_a = -s;
    } else if (j == -1) {
        sin_a = -c;
        cos_a = s;
    } else {
        sin_a = -s;
        cos_a = -c;
    }
    return sin_a / cos_a;
}
#endif

float tan_fp32(float a) {
#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND
  return tan_taylor_fp32(a);
#else
  return tan(a);
#endif
}
`,Sx=`#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND
const FP32_TWO_PI: f32 = 6.2831854820251465;
const FP32_PI_2: f32 = 1.5707963705062866;
const FP32_PI_16: f32 = 0.1963495463132858;

const FP32_SIN_TABLE_0: f32 = 0.19509032368659973;
const FP32_SIN_TABLE_1: f32 = 0.3826834261417389;
const FP32_SIN_TABLE_2: f32 = 0.5555702447891235;
const FP32_SIN_TABLE_3: f32 = 0.7071067690849304;

const FP32_COS_TABLE_0: f32 = 0.9807852506637573;
const FP32_COS_TABLE_1: f32 = 0.9238795042037964;
const FP32_COS_TABLE_2: f32 = 0.8314695954322815;
const FP32_COS_TABLE_3: f32 = 0.7071067690849304;

const FP32_INVERSE_FACTORIAL_3: f32 = 1.666666716337204e-01;
const FP32_INVERSE_FACTORIAL_5: f32 = 8.333333767950535e-03;
const FP32_INVERSE_FACTORIAL_7: f32 = 1.9841270113829523e-04;
const FP32_INVERSE_FACTORIAL_9: f32 = 2.75573188446287533e-06;
const FP32_OVERFLOW: f32 = 3.402823466e+38;

fn sin_taylor_fp32(a: f32) -> f32 {
  if (a == 0.0) {
    return 0.0;
  }

  let x = -a * a;
  var sum = a;
  var term = a;

  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_3;
  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_5;
  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_7;
  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_9;

  return sum;
}

fn tan_taylor_fp32(a: f32) -> f32 {
  if (a == 0.0) {
    return 0.0;
  }

  let z = floor(a / FP32_TWO_PI);
  let reduced = a - FP32_TWO_PI * z;

  var quadrantValue = floor(reduced / FP32_PI_2 + 0.5);
  let quadrant = i32(quadrantValue);
  if (quadrant < -2 || quadrant > 2) {
    return FP32_OVERFLOW;
  }

  var angle = reduced - FP32_PI_2 * quadrantValue;
  quadrantValue = floor(angle / FP32_PI_16 + 0.5);
  let tableIndex = i32(quadrantValue);
  let absoluteTableIndex = abs(tableIndex);
  if (absoluteTableIndex > 4) {
    return FP32_OVERFLOW;
  }

  angle = angle - FP32_PI_16 * quadrantValue;
  let sinAngle = sin_taylor_fp32(angle);
  let cosAngle = sqrt(1.0 - sinAngle * sinAngle);

  var tableCos = 0.0;
  var tableSin = 0.0;
  if (absoluteTableIndex == 1) {
    tableCos = FP32_COS_TABLE_0;
    tableSin = FP32_SIN_TABLE_0;
  } else if (absoluteTableIndex == 2) {
    tableCos = FP32_COS_TABLE_1;
    tableSin = FP32_SIN_TABLE_1;
  } else if (absoluteTableIndex == 3) {
    tableCos = FP32_COS_TABLE_2;
    tableSin = FP32_SIN_TABLE_2;
  } else if (absoluteTableIndex == 4) {
    tableCos = FP32_COS_TABLE_3;
    tableSin = FP32_SIN_TABLE_3;
  }

  var sinReduced = sinAngle;
  var cosReduced = cosAngle;
  if (tableIndex > 0) {
    sinReduced = tableCos * sinAngle + tableSin * cosAngle;
    cosReduced = tableCos * cosAngle - tableSin * sinAngle;
  } else if (tableIndex < 0) {
    sinReduced = tableCos * sinAngle - tableSin * cosAngle;
    cosReduced = tableCos * cosAngle + tableSin * sinAngle;
  }

  var sinValue = 0.0;
  var cosValue = 0.0;
  if (quadrant == 0) {
    sinValue = sinReduced;
    cosValue = cosReduced;
  } else if (quadrant == 1) {
    sinValue = cosReduced;
    cosValue = -sinReduced;
  } else if (quadrant == -1) {
    sinValue = -cosReduced;
    cosValue = sinReduced;
  } else {
    sinValue = -sinReduced;
    cosValue = -cosReduced;
  }

  return sinValue / cosValue;
}

fn tan_fp32(a: f32) -> f32 {
  return tan_taylor_fp32(a);
}
#else
fn tan_fp32(a: f32) -> f32 {
  return tan(a);
}
#endif
`,Lx={name:"fp32",source:Sx,vs:Ex},ou=`
layout(std140) uniform fp64arithmeticUniforms {
  uniform float ONE;
  uniform float SPLIT;
} fp64;

/*
About LUMA_FP64_CODE_ELIMINATION_WORKAROUND

The purpose of this workaround is to prevent shader compilers from
optimizing away necessary arithmetic operations by swapping their sequences
or transform the equation to some 'equivalent' form.

These helpers implement Dekker/Veltkamp-style error tracking. If the compiler
folds constants or reassociates the arithmetic, the high/low split can stop
tracking the rounding error correctly. That failure mode tends to look fine in
simple coordinate setup, but then breaks down inside iterative arithmetic such
as fp64 Mandelbrot loops.

The method is to multiply an artifical variable, ONE, which will be known to
the compiler to be 1 only at runtime. The whole expression is then represented
as a polynomial with respective to ONE. In the coefficients of all terms, only one a
and one b should appear

err = (a + b) * ONE^6 - a * ONE^5 - (a + b) * ONE^4 + a * ONE^3 - b - (a + b) * ONE^2 + a * ONE
*/

float prevent_fp64_optimization(float value) {
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  return value + fp64.ONE * 0.0;
#else
  return value;
#endif
}

// Divide float number to high and low floats to extend fraction bits
vec2 split(float a) {
  // Keep SPLIT as a runtime uniform so the compiler cannot fold the Dekker
  // split into a constant expression and reassociate the recovery steps.
  float split = prevent_fp64_optimization(fp64.SPLIT);
  float t = prevent_fp64_optimization(a * split);
  float temp = t - a;
  float a_hi = t - temp;
  float a_lo = a - a_hi;
  return vec2(a_hi, a_lo);
}

// Divide float number again when high float uses too many fraction bits
vec2 split2(vec2 a) {
  vec2 b = split(a.x);
  b.y += a.y;
  return b;
}

// Special sum operation when a > b
vec2 quickTwoSum(float a, float b) {
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float sum = (a + b) * fp64.ONE;
  float err = b - (sum - a) * fp64.ONE;
#else
  float sum = a + b;
  float err = b - (sum - a);
#endif
  return vec2(sum, err);
}

// General sum operation
vec2 twoSum(float a, float b) {
  float s = (a + b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * fp64.ONE - a) * fp64.ONE;
  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE + (b - v);
#else
  float v = s - a;
  float err = (a - (s - v)) + (b - v);
#endif
  return vec2(s, err);
}

vec2 twoSub(float a, float b) {
  float s = (a - b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * fp64.ONE - a) * fp64.ONE;
  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE - (b + v);
#else
  float v = s - a;
  float err = (a - (s - v)) - (b + v);
#endif
  return vec2(s, err);
}

vec2 twoSqr(float a) {
  float prod = a * a;
  vec2 a_fp64 = split(a);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float err = ((a_fp64.x * a_fp64.x - prod) * fp64.ONE + 2.0 * a_fp64.x *
    a_fp64.y * fp64.ONE * fp64.ONE) + a_fp64.y * a_fp64.y * fp64.ONE * fp64.ONE * fp64.ONE;
#else
  float err = ((a_fp64.x * a_fp64.x - prod) + 2.0 * a_fp64.x * a_fp64.y) + a_fp64.y * a_fp64.y;
#endif
  return vec2(prod, err);
}

vec2 twoProd(float a, float b) {
  float prod = a * b;
  vec2 a_fp64 = split(a);
  vec2 b_fp64 = split(b);
  // twoProd is especially sensitive because mul_fp64 and div_fp64 both depend
  // on the split terms and cross terms staying in the original evaluation
  // order. If the compiler folds or reassociates them, the low part tends to
  // collapse to zero or NaN on some drivers.
  float highProduct = prevent_fp64_optimization(a_fp64.x * b_fp64.x);
  float crossProduct1 = prevent_fp64_optimization(a_fp64.x * b_fp64.y);
  float crossProduct2 = prevent_fp64_optimization(a_fp64.y * b_fp64.x);
  float lowProduct = prevent_fp64_optimization(a_fp64.y * b_fp64.y);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float err1 = (highProduct - prod) * fp64.ONE;
  float err2 = crossProduct1 * fp64.ONE * fp64.ONE;
  float err3 = crossProduct2 * fp64.ONE * fp64.ONE * fp64.ONE;
  float err4 = lowProduct * fp64.ONE * fp64.ONE * fp64.ONE * fp64.ONE;
#else
  float err1 = highProduct - prod;
  float err2 = crossProduct1;
  float err3 = crossProduct2;
  float err4 = lowProduct;
#endif
  float err = ((err1 + err2) + err3) + err4;
  return vec2(prod, err);
}

vec2 sum_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSum(a.x, b.x);
  t = twoSum(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 sub_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSub(a.x, b.x);
  t = twoSub(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 mul_fp64(vec2 a, vec2 b) {
  vec2 prod = twoProd(a.x, b.x);
  // y component is for the error
  prod.y += a.x * b.y;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  prod.y += a.y * b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

vec2 div_fp64(vec2 a, vec2 b) {
  float xn = 1.0 / b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  vec2 yn = mul_fp64(a, vec2(xn, 0));
#else
  vec2 yn = a * xn;
#endif
  float diff = (sub_fp64(a, mul_fp64(b, yn))).x;
  vec2 prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

vec2 sqrt_fp64(vec2 a) {
  if (a.x == 0.0 && a.y == 0.0) return vec2(0.0, 0.0);
  if (a.x < 0.0) return vec2(0.0 / 0.0, 0.0 / 0.0);

  float x = 1.0 / sqrt(a.x);
  float yn = a.x * x;
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  vec2 yn_sqr = twoSqr(yn) * fp64.ONE;
#else
  vec2 yn_sqr = twoSqr(yn);
#endif
  float diff = sub_fp64(a, yn_sqr).x;
  vec2 prod = twoProd(x * 0.5, diff);
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2(yn, 0.0), prod);
#endif
}
`,Tx=`struct Fp64F32Bits {
  sign: u32,
  baseExponent: i32,
  significand: u32,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};

// Decode an f32 as (-1)^sign * significand * 2^baseExponent.
fn fp64_decode_f32_bits(bits: u32) -> Fp64F32Bits {
  let sign = bits >> 31u;
  let exponentBits = (bits >> 23u) & 0xffu;
  let fraction = bits & 0x7fffffu;

  if (exponentBits == 0xffu) {
    return Fp64F32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);
  }
  if (exponentBits == 0u) {
    return Fp64F32Bits(sign, -149, fraction, fraction == 0u, false, false);
  }
  return Fp64F32Bits(sign, i32(exponentBits) - 150, 0x800000u | fraction, false, false, false);
}

fn fp64_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  return select(-1, 1, aMagnitude > bMagnitude);
}

fn fp64_make_residual_f32_bits(
  exactSign: u32,
  exactMagnitude: vec2u,
  exactBaseExponent: i32,
  highBits: u32
) -> u32 {
  if (fp64_u64_is_zero(exactMagnitude)) {
    return 0u;
  }

  let high = fp64_decode_f32_bits(highBits);
  if (high.isInf || high.isNan) {
    return exactSign << 31u;
  }
  if (high.isZero) {
    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);
  }

  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);
  let exactShift = exactBaseExponent - commonBaseExponent;
  let highShift = high.baseExponent - commonBaseExponent;

  // A normal two-sum/two-product residual never needs a shift this large.
  // This guard gives deterministic underflow behavior outside that contract.
  if (exactShift >= 64 || highShift >= 64) {
    return exactSign << 31u;
  }

  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));
  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));
  let comparison = fp64_u64_compare(exactAligned, highAligned);
  if (comparison == 0) {
    return 0u;
  }

  var residualSign = exactSign;
  var residualMagnitude: vec2u;
  if (comparison > 0) {
    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);
  } else {
    residualSign = exactSign ^ 1u;
    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);
  }
  return fp64_make_f32_bits_from_u64(
    residualSign,
    residualMagnitude,
    commonBaseExponent
  );
}

fn fp64_split_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);
  let lowBits = fp64_make_residual_f32_bits(sign, magnitude, baseExponent, highBits);
  return vec2u(highBits, lowBits);
}

fn fp64_two_sum_integer_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_f32_bits(aBits);
  let b = fp64_decode_f32_bits(bBits);

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    if (a.isInf && b.isInf && a.sign != b.sign) {
      return vec2u(0x7fc00000u, 0u);
    }
    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);
  }
  if (a.isZero && b.isZero) {
    return vec2u((a.sign & b.sign) << 31u, 0u);
  }
  if (a.isZero) {
    return vec2u(bBits, 0u);
  }
  if (b.isZero) {
    return vec2u(aBits, 0u);
  }

  let exponentDifference = select(
    b.baseExponent - a.baseExponent,
    a.baseExponent - b.baseExponent,
    a.baseExponent >= b.baseExponent
  );

  // Beyond half an ulp, rounding cannot change the larger operand. Returning
  // the smaller operand intact also avoids an unbounded integer alignment.
  // At a power-of-two boundary the spacing below the larger operand is half
  // the spacing above it, so an opposite-sign gap-25 operand can still change
  // the rounded high limb. Gap 26 is the first universally safe early-out.
  if (exponentDifference > 25) {
    if (fp64_f32_magnitude_compare(aBits, bBits) >= 0) {
      return vec2u(aBits, bBits);
    }
    return vec2u(bBits, aBits);
  }

  let commonBaseExponent = min(a.baseExponent, b.baseExponent);
  let aMagnitude = fp64_u64_shift_left(
    vec2u(0u, a.significand),
    u32(a.baseExponent - commonBaseExponent)
  );
  let bMagnitude = fp64_u64_shift_left(
    vec2u(0u, b.significand),
    u32(b.baseExponent - commonBaseExponent)
  );

  var resultSign = a.sign;
  var resultMagnitude: vec2u;
  if (a.sign == b.sign) {
    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);
  } else {
    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);
    if (comparison == 0) {
      return vec2u(0u, 0u);
    }
    if (comparison > 0) {
      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);
    } else {
      resultSign = b.sign;
      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);
    }
  }

  return fp64_split_accumulator_bits(resultSign, resultMagnitude, commonBaseExponent);
}

fn fp64_two_sum_integer(a: f32, b: f32) -> vec2f {
  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bitcast<u32>(b));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn fp64_multiply_significands(a: u32, b: u32) -> vec2u {
  let aLow = a & 0xffffu;
  let aHigh = a >> 16u;
  let bLow = b & 0xffffu;
  let bHigh = b >> 16u;
  let lowProduct = aLow * bLow;
  let crossProduct = aLow * bHigh + aHigh * bLow;
  let highProduct = aHigh * bHigh;

  var result = vec2u(0u, lowProduct);
  result = fp64_u64_add(
    result,
    fp64_u64_shift_left(vec2u(0u, crossProduct), 16u)
  );
  result = fp64_u64_add(result, vec2u(highProduct, 0u));
  return result;
}

fn fp64_two_prod_integer_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_f32_bits(aBits);
  let b = fp64_decode_f32_bits(bBits);
  let resultSign = a.sign ^ b.sign;

  if (a.isNan || b.isNan || ((a.isZero || b.isZero) && (a.isInf || b.isInf))) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    return vec2u((resultSign << 31u) | 0x7f800000u, resultSign << 31u);
  }
  if (a.isZero || b.isZero) {
    return vec2u(resultSign << 31u, resultSign << 31u);
  }

  let magnitude = fp64_multiply_significands(a.significand, b.significand);
  return fp64_split_accumulator_bits(
    resultSign,
    magnitude,
    a.baseExponent + b.baseExponent
  );
}

fn fp64_two_prod_integer(a: f32, b: f32) -> vec2f {
  let resultBits = fp64_two_prod_integer_bits(bitcast<u32>(a), bitcast<u32>(b));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn fp64_round_add_integer(a: f32, b: f32) -> f32 {
  return fp64_two_sum_integer(a, b).x;
}

fn fp64_round_mul_integer(a: f32, b: f32) -> f32 {
  return fp64_two_prod_integer(a, b).x;
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_f32_finite_exponent(value: Fp64F32Bits) -> i32 {
  let mostSignificantBit = 31u - countLeadingZeros(value.significand);
  return value.baseExponent + i32(mostSignificantBit);
}

fn fp64_scale_f32_integer(value: f32, exponent: i32) -> f32 {
  let decoded = fp64_decode_f32_bits(bitcast<u32>(value));
  if (decoded.isZero || decoded.isInf || decoded.isNan) {
    return value;
  }
  let resultBits = fp64_make_f32_bits_from_u64(
    decoded.sign,
    vec2u(0u, decoded.significand),
    decoded.baseExponent + exponent
  );
  return bitcast<f32>(resultBits);
}

// Divide normalized significands so the hardware operation cannot overflow,
// underflow, or flush a subnormal result. Reapply the exponent with integer
// packing, which also produces subnormal correction limbs without relying on
// floating-point arithmetic to preserve them.
fn fp64_divide_f32_integer(aValue: f32, bValue: f32) -> f32 {
  let a = fp64_decode_f32_bits(bitcast<u32>(aValue));
  let b = fp64_decode_f32_bits(bitcast<u32>(bValue));
  if (a.isZero || b.isZero || a.isInf || b.isInf || a.isNan || b.isNan) {
    return aValue / bValue;
  }

  let aMostSignificantBit = 31u - countLeadingZeros(a.significand);
  let bMostSignificantBit = 31u - countLeadingZeros(b.significand);
  let normalizedABits = fp64_make_f32_bits_from_u64(
    a.sign,
    vec2u(0u, a.significand),
    -i32(aMostSignificantBit)
  );
  let normalizedBBits = fp64_make_f32_bits_from_u64(
    b.sign,
    vec2u(0u, b.significand),
    -i32(bMostSignificantBit)
  );
  let normalizedQuotient = bitcast<f32>(normalizedABits) / bitcast<f32>(normalizedBBits);
  let quotient = fp64_decode_f32_bits(bitcast<u32>(normalizedQuotient));
  let exponentShift =
    a.baseExponent + i32(aMostSignificantBit) -
    b.baseExponent - i32(bMostSignificantBit);
  let quotientBits = fp64_make_f32_bits_from_u64(
    quotient.sign,
    vec2u(0u, quotient.significand),
    quotient.baseExponent + exponentShift
  );
  return bitcast<f32>(quotientBits);
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn split(a: f32) -> vec2f {
  let aBits = bitcast<u32>(a);
  let decoded = fp64_decode_f32_bits(aBits);
  if (decoded.isZero || decoded.isInf || decoded.isNan) {
    return vec2f(a, 0.0);
  }

  var roundedHigh = decoded.significand >> 12u;
  let remainder = decoded.significand & 0xfffu;
  if (remainder > 0x800u || (remainder == 0x800u && (roundedHigh & 1u) == 1u)) {
    roundedHigh = roundedHigh + 1u;
  }
  var highMagnitude = vec2u(0u, roundedHigh << 12u);
  var highBits = fp64_make_f32_bits_from_u64(
    decoded.sign,
    highMagnitude,
    decoded.baseExponent
  );
  // Rounding the high limb of a maximum-exponent value can overflow even
  // though the original value is finite. Truncate only in that boundary case
  // so split remains an exact finite decomposition.
  if (fp64_decode_f32_bits(highBits).isInf) {
    roundedHigh = decoded.significand >> 12u;
    highMagnitude = vec2u(0u, roundedHigh << 12u);
    highBits = fp64_make_f32_bits_from_u64(
      decoded.sign,
      highMagnitude,
      decoded.baseExponent
    );
  }
  let lowBits = fp64_make_residual_f32_bits(
    decoded.sign,
    vec2u(0u, decoded.significand),
    decoded.baseExponent,
    highBits
  );
  return vec2f(bitcast<f32>(highBits), bitcast<f32>(lowBits));
}

fn split2(a: vec2f) -> vec2f {
  var result = split(a.x);
  result.y = fp64_round_add_integer(result.y, a.y);
  return result;
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn quickTwoSum(a: f32, b: f32) -> vec2f {
  return fp64_two_sum_integer(a, b);
}
#endif

fn twoSum(a: f32, b: f32) -> vec2f {
  return fp64_two_sum_integer(a, b);
}

fn twoSub(a: f32, b: f32) -> vec2f {
  let bBits = bitcast<u32>(b) ^ 0x80000000u;
  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bBits);
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn twoSqr(a: f32) -> vec2f {
  return fp64_two_prod_integer(a, a);
}

fn twoProd(a: f32, b: f32) -> vec2f {
  return fp64_two_prod_integer(a, b);
}
#endif

fn sum_fp64(a: vec2f, b: vec2f) -> vec2f {
  var sum = fp64_two_sum_integer(a.x, b.x);
  let lowSum = fp64_two_sum_integer(a.y, b.y);
  sum.y = fp64_round_add_integer(sum.y, lowSum.x);
  sum = fp64_two_sum_integer(sum.x, sum.y);
  sum.y = fp64_round_add_integer(sum.y, lowSum.y);
  return fp64_two_sum_integer(sum.x, sum.y);
}

fn sub_fp64(a: vec2f, b: vec2f) -> vec2f {
  let negatedB = vec2f(
    bitcast<f32>(bitcast<u32>(b.x) ^ 0x80000000u),
    bitcast<f32>(bitcast<u32>(b.y) ^ 0x80000000u)
  );
  return sum_fp64(a, negatedB);
}

fn mul_fp64(a: vec2f, b: vec2f) -> vec2f {
  var product = fp64_two_prod_integer(a.x, b.x);
  let crossProduct1 = fp64_round_mul_integer(a.x, b.y);
  product.y = fp64_round_add_integer(product.y, crossProduct1);
  product = fp64_two_sum_integer(product.x, product.y);
  let crossProduct2 = fp64_round_mul_integer(a.y, b.x);
  product.y = fp64_round_add_integer(product.y, crossProduct2);
  return fp64_two_sum_integer(product.x, product.y);
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_scale_fp64_integer(value: vec2f, exponent: i32) -> vec2f {
  let high = fp64_scale_f32_integer(value.x, exponent);
  let low = fp64_scale_f32_integer(value.y, exponent);
  return sum_fp64(vec2f(high, 0.0), vec2f(low, 0.0));
}

fn fp64_div_fp64_normalized(a: vec2f, b: vec2f) -> vec2f {
  let quotientHigh = fp64_divide_f32_integer(a.x, b.x);
  var quotient = vec2f(quotientHigh, 0.0);

  let remainder = sub_fp64(a, mul_fp64(b, quotient));
  let quotientLow = fp64_divide_f32_integer(remainder.x, b.x);
  quotient = sum_fp64(quotient, vec2f(quotientLow, 0.0));

  let secondRemainder = sub_fp64(a, mul_fp64(b, quotient));
  let correction = fp64_divide_f32_integer(secondRemainder.x, b.x);
  return sum_fp64(quotient, vec2f(correction, 0.0));
}

fn div_fp64(a: vec2f, b: vec2f) -> vec2f {
  let decodedA = fp64_decode_f32_bits(bitcast<u32>(a.x));
  let decodedB = fp64_decode_f32_bits(bitcast<u32>(b.x));
  if (
    decodedA.isZero || decodedB.isZero ||
    decodedA.isInf || decodedB.isInf ||
    decodedA.isNan || decodedB.isNan
  ) {
    return fp64_div_fp64_normalized(a, b);
  }

  let exponentA = fp64_f32_finite_exponent(decodedA);
  let exponentB = fp64_f32_finite_exponent(decodedB);
  // Correct the quotient near unity so b * q and the remainder stay clear of
  // both f32 underflow and overflow. The exponent difference is applied once.
  let normalizedA = fp64_scale_fp64_integer(a, -exponentA);
  let normalizedB = fp64_scale_fp64_integer(b, -exponentB);
  let normalizedQuotient = fp64_div_fp64_normalized(normalizedA, normalizedB);
  return fp64_scale_fp64_integer(normalizedQuotient, exponentA - exponentB);
}

fn fp64_sqrt_fp64_normalized(a: vec2f) -> vec2f {
  let estimate = sqrt(a.x);
  let difference = sub_fp64(a, fp64_two_prod_integer(estimate, estimate)).x;
  let denominator = fp64_round_add_integer(estimate, estimate);
  let correction = fp64_divide_f32_integer(difference, denominator);
  return sum_fp64(vec2f(estimate, 0.0), vec2f(correction, 0.0));
}

fn sqrt_fp64(a: vec2f) -> vec2f {
  let decoded = fp64_decode_f32_bits(bitcast<u32>(a.x));
  let decodedLow = fp64_decode_f32_bits(bitcast<u32>(a.y));
  if (decoded.isZero && decodedLow.isZero) {
    return vec2f(0.0, 0.0);
  }
  if (decoded.sign == 1u) {
    let nanValue = fp64_nan(a.x);
    return vec2f(nanValue, nanValue);
  }

  if (decoded.isInf || decoded.isNan) {
    return fp64_sqrt_fp64_normalized(a);
  }
  let exponent = fp64_f32_finite_exponent(decoded);
  // An even scale lets the final square-root rescale use an integer exponent.
  let evenExponent = exponent - (exponent & 1);
  let normalizedA = fp64_scale_fp64_integer(a, -evenExponent);
  let normalizedRoot = fp64_sqrt_fp64_normalized(normalizedA);
  return fp64_scale_fp64_integer(normalizedRoot, evenExponent / 2);
}
#endif
`,Ax=`struct Fp64ArithmeticUniforms {
  ONE: f32,
  SPLIT: f32,
};

@group(0) @binding(auto) var<uniform> fp64arithmetic : Fp64ArithmeticUniforms;

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64Bits {
  sign: u32,
  exponent: i32,
  significand: vec2u,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_nan(seed: f32) -> f32 {
  let nanBits = 0x7fc00000u | select(0u, 1u, seed < 0.0);
  return bitcast<f32>(nanBits);
}
#endif

fn fp64_u64_is_zero(value: vec2u) -> bool {
  return value.x == 0u && value.y == 0u;
}

fn fp64_u64_compare(a: vec2u, b: vec2u) -> i32 {
  if (a.x != b.x) {
    return select(-1, 1, a.x > b.x);
  }
  if (a.y != b.y) {
    return select(-1, 1, a.y > b.y);
  }
  return 0;
}

fn fp64_u64_add(a: vec2u, b: vec2u) -> vec2u {
  let low = a.y + b.y;
  let carry = select(0u, 1u, low < a.y);
  return vec2u(a.x + b.x + carry, low);
}

fn fp64_u64_sub(a: vec2u, b: vec2u) -> vec2u {
  let borrow = select(0u, 1u, a.y < b.y);
  return vec2u(a.x - b.x - borrow, a.y - b.y);
}

fn fp64_u64_shift_left(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u((value.x << shift) | (value.y >> (32u - shift)), value.y << shift);
  }
  if (shift == 32u) {
    return vec2u(value.y, 0u);
  }
  if (shift < 64u) {
    return vec2u(value.y << (shift - 32u), 0u);
  }
  return vec2u(0u);
}

fn fp64_u64_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u(value.x >> shift, (value.y >> shift) | (value.x << (32u - shift)));
  }
  if (shift == 32u) {
    return vec2u(0u, value.x);
  }
  if (shift < 64u) {
    return vec2u(0u, value.x >> (shift - 32u));
  }
  return vec2u(0u);
}

fn fp64_u64_get_bit(value: vec2u, bitIndex: u32) -> bool {
  if (bitIndex >= 64u) {
    return false;
  }
  if (bitIndex >= 32u) {
    return ((value.x >> (bitIndex - 32u)) & 1u) != 0u;
  }
  return ((value.y >> bitIndex) & 1u) != 0u;
}

fn fp64_u64_has_bits_below(value: vec2u, bitCount: u32) -> bool {
  if (bitCount == 0u) {
    return false;
  }
  if (bitCount >= 64u) {
    return !fp64_u64_is_zero(value);
  }
  if (bitCount > 32u) {
    let highBitCount = bitCount - 32u;
    let highMask = (1u << highBitCount) - 1u;
    return value.y != 0u || (value.x & highMask) != 0u;
  }
  if (bitCount == 32u) {
    return value.y != 0u;
  }
  let lowMask = (1u << bitCount) - 1u;
  return (value.y & lowMask) != 0u;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_u64_shift_right_sticky(value: vec2u, shift: u32) -> vec2u {
  var shifted = fp64_u64_shift_right(value, shift);
  if (fp64_u64_has_bits_below(value, shift)) {
    shifted.y = shifted.y | 1u;
  }
  return shifted;
}
#endif

fn fp64_u64_count_leading_zeros(value: vec2u) -> u32 {
  if (value.x != 0u) {
    return countLeadingZeros(value.x);
  }
  return 32u + countLeadingZeros(value.y);
}

fn fp64_round_shift_right_to_u32(value: vec2u, shift: u32) -> u32 {
  if (shift == 0u) {
    return value.y;
  }

  let truncated = fp64_u64_shift_right(value, shift);
  var rounded = truncated.y;
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded & 1u) == 1u)) {
    rounded = rounded + 1u;
  }
  return rounded;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_round_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }

  var rounded = fp64_u64_shift_right(value, shift);
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded.y & 1u) == 1u)) {
    rounded = fp64_u64_add(rounded, vec2u(0u, 1u));
  }
  return rounded;
}
#endif

fn fp64_make_f32_bits_from_u64(sign: u32, significand: vec2u, baseExponent: i32) -> u32 {
  if (fp64_u64_is_zero(significand)) {
    return sign << 31u;
  }

  let leadingZeros = fp64_u64_count_leading_zeros(significand);
  let mostSignificantBit = 63u - leadingZeros;
  var exponent = baseExponent + i32(mostSignificantBit);

  if (exponent > 127) {
    return (sign << 31u) | 0x7f800000u;
  }

  if (exponent >= -126) {
    let shift = i32(mostSignificantBit) - 23;
    var significand24: u32;
    if (shift > 0) {
      significand24 = fp64_round_shift_right_to_u32(significand, u32(shift));
    } else {
      significand24 = fp64_u64_shift_left(significand, u32(-shift)).y;
    }

    if (significand24 >= 0x1000000u) {
      significand24 = significand24 >> 1u;
      exponent = exponent + 1;
      if (exponent > 127) {
        return (sign << 31u) | 0x7f800000u;
      }
    }

    return (sign << 31u) | (u32(exponent + 127) << 23u) | (significand24 & 0x7fffffu);
  }

  let scaleExponent = baseExponent + 149;
  var mantissa: u32;
  if (scaleExponent >= 0) {
    mantissa = fp64_u64_shift_left(significand, u32(scaleExponent)).y;
  } else {
    mantissa = fp64_round_shift_right_to_u32(significand, u32(-scaleExponent));
  }

  if (mantissa >= 0x800000u) {
    return (sign << 31u) | 0x00800000u;
  }
  return (sign << 31u) | mantissa;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_decode_bits(bits: vec2u) -> Fp64Bits {
  let sign = bits.x >> 31u;
  let exponentBits = (bits.x >> 20u) & 0x7ffu;
  let fractionHigh = bits.x & 0xfffffu;
  let fractionLow = bits.y;
  let fraction = vec2u(fractionHigh, fractionLow);

  if (exponentBits == 0x7ffu) {
    let isInf = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, 0, vec2u(0u), false, isInf, !isInf);
  }

  if (exponentBits == 0u) {
    let isZero = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, -1022, fraction, isZero, false, false);
  }

  return Fp64Bits(sign, i32(exponentBits) - 1023, vec2u((1u << 20u) | fractionHigh, fractionLow), false, false, false);
}

fn fp64_finite_magnitude_compare(a: Fp64Bits, b: Fp64Bits) -> i32 {
  if (a.exponent != b.exponent) {
    return select(-1, 1, a.exponent > b.exponent);
  }
  return fp64_u64_compare(a.significand, b.significand);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64RawF32Bits {
  sign: u32,
  baseExponent: i32,
  significand: u32,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};

// Decode an f32 as (-1)^sign * significand * 2^baseExponent. This shared
// integer representation lets normalization remain independent of the
// selected double-single arithmetic implementation.
fn fp64_decode_raw_f32_bits(bits: u32) -> Fp64RawF32Bits {
  let sign = bits >> 31u;
  let exponentBits = (bits >> 23u) & 0xffu;
  let fraction = bits & 0x7fffffu;

  if (exponentBits == 0xffu) {
    return Fp64RawF32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);
  }
  if (exponentBits == 0u) {
    return Fp64RawF32Bits(sign, -149, fraction, fraction == 0u, false, false);
  }
  return Fp64RawF32Bits(
    sign,
    i32(exponentBits) - 150,
    0x800000u | fraction,
    false,
    false,
    false
  );
}

fn fp64_raw_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  return select(-1, 1, aMagnitude > bMagnitude);
}

fn fp64_make_raw_residual_f32_bits(
  exactSign: u32,
  exactMagnitude: vec2u,
  exactBaseExponent: i32,
  highBits: u32
) -> u32 {
  if (fp64_u64_is_zero(exactMagnitude)) {
    return 0u;
  }

  let high = fp64_decode_raw_f32_bits(highBits);
  if (high.isInf || high.isNan) {
    return 0u;
  }
  if (high.isZero) {
    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);
  }

  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);
  let exactShift = exactBaseExponent - commonBaseExponent;
  let highShift = high.baseExponent - commonBaseExponent;
  if (exactShift >= 64 || highShift >= 64) {
    return 0u;
  }

  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));
  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));
  let comparison = fp64_u64_compare(exactAligned, highAligned);
  if (comparison == 0) {
    return 0u;
  }

  var residualSign = exactSign;
  var residualMagnitude: vec2u;
  if (comparison > 0) {
    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);
  } else {
    residualSign = exactSign ^ 1u;
    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);
  }
  return fp64_make_f32_bits_from_u64(
    residualSign,
    residualMagnitude,
    commonBaseExponent
  );
}

fn fp64_split_raw_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }
  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);
  let rawLowBits = fp64_make_raw_residual_f32_bits(sign, magnitude, baseExponent, highBits);
  let lowBits = select(rawLowBits, 0u, (rawLowBits & 0x7fffffffu) == 0u);
  if ((highBits & 0x7fffffffu) == 0u && (lowBits & 0x7fffffffu) == 0u) {
    return vec2u(0u);
  }
  return vec2u(highBits, lowBits);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
// Round an arithmetic accumulator to binary64 before splitting it. The
// aligned add/subtract paths retain three guard bits plus a sticky bit, which
// is sufficient for round-to-nearest-even at the binary64 boundary.
fn fp64_split_binary64_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }

  let mostSignificantBit = 63u - fp64_u64_count_leading_zeros(magnitude);
  let exponent = baseExponent + i32(mostSignificantBit);
  if (exponent > 1023) {
    return vec2u((sign << 31u) | 0x7f800000u, 0u);
  }

  var roundedMagnitude = magnitude;
  var roundedBaseExponent = baseExponent;
  if (exponent >= -1022) {
    if (mostSignificantBit > 52u) {
      let shift = mostSignificantBit - 52u;
      roundedMagnitude = fp64_round_shift_right(magnitude, shift);
      roundedBaseExponent = baseExponent + i32(shift);
    }
  } else {
    let shift = -1074 - baseExponent;
    if (shift > 0) {
      roundedMagnitude = fp64_round_shift_right(magnitude, u32(shift));
      roundedBaseExponent = -1074;
    }
  }

  if (fp64_u64_is_zero(roundedMagnitude)) {
    return vec2u(0u);
  }
  return fp64_split_raw_accumulator_bits(sign, roundedMagnitude, roundedBaseExponent);
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_add_raw_f32_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_raw_f32_bits(aBits);
  let b = fp64_decode_raw_f32_bits(bBits);

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    if (a.isInf && b.isInf && a.sign != b.sign) {
      return vec2u(0x7fc00000u, 0u);
    }
    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }
  if (a.isZero) {
    return vec2u(bBits, 0u);
  }
  if (b.isZero) {
    return vec2u(aBits, 0u);
  }

  let exponentDifference = abs(a.baseExponent - b.baseExponent);
  if (exponentDifference > 25) {
    if (fp64_raw_f32_magnitude_compare(aBits, bBits) >= 0) {
      return vec2u(aBits, bBits);
    }
    return vec2u(bBits, aBits);
  }

  let commonBaseExponent = min(a.baseExponent, b.baseExponent);
  let aMagnitude = fp64_u64_shift_left(
    vec2u(0u, a.significand),
    u32(a.baseExponent - commonBaseExponent)
  );
  let bMagnitude = fp64_u64_shift_left(
    vec2u(0u, b.significand),
    u32(b.baseExponent - commonBaseExponent)
  );

  var resultSign = a.sign;
  var resultMagnitude: vec2u;
  if (a.sign == b.sign) {
    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);
  } else {
    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);
    if (comparison == 0) {
      return vec2u(0u);
    }
    if (comparison > 0) {
      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);
    } else {
      resultSign = b.sign;
      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);
    }
  }

  return fp64_split_raw_accumulator_bits(
    resultSign,
    resultMagnitude,
    commonBaseExponent
  );
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_add_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_sub_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_add_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

fn fp64_sub_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

// Subtract two raw binary64 values and round the exact result once to f32.
// The input words are canonical high/low words: .x contains sign/exponent/high
// fraction bits, and .y contains the low 32 fraction bits.
fn sub_fp64u32_to_f32_bits(aBits: vec2u, bBits: vec2u) -> u32 {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return 0x7fc00000u;
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return (a.sign << 31u) | 0x7f800000u;
    }
    return 0x7fc00000u;
  }
  if (a.isInf) {
    return (a.sign << 31u) | 0x7f800000u;
  }
  if (b.isInf) {
    return (bSubtractionSign << 31u) | 0x7f800000u;
  }
  if (a.isZero && b.isZero) {
    return select(0u, 0x80000000u, a.sign == 1u && b.sign == 0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return 0u;
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_f32_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_f32_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_f32(aBits: vec2u, bBits: vec2u) -> f32 {
  return bitcast<f32>(sub_fp64u32_to_f32_bits(aBits, bBits));
}

// Subtract two raw binary64 values, round once to binary64, then split the
// result into normalized f32 limbs. Finite results must fit within the f32
// exponent range; larger magnitudes map to infinity and smaller magnitudes
// map to zero. The input words use canonical high/low word order.
fn sub_fp64u32_to_fp64_bits(aBits: vec2u, bBits: vec2u) -> vec2u {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
    }
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf) {
    return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
  }
  if (b.isInf) {
    return vec2u((bSubtractionSign << 31u) | 0x7f800000u, 0u);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return vec2u(0u);
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_fp64_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_fp64(aBits: vec2u, bBits: vec2u) -> vec2f {
  let resultBits = sub_fp64u32_to_fp64_bits(aBits, bBits);
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_runtime_zero() -> f32 {
  return fp64arithmetic.ONE * 0.0;
}

fn prevent_fp64_optimization(value: f32) -> f32 {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  return value + fp64_runtime_zero();
#else
  return value;
#endif
}
#endif

#ifdef LUMA_FP64_INTEGER_ARITHMETIC
${Tx}
#else
fn split(a: f32) -> vec2f {
  let splitValue = prevent_fp64_optimization(fp64arithmetic.SPLIT + fp64_runtime_zero());
  let t = prevent_fp64_optimization(a * splitValue);
  let temp = prevent_fp64_optimization(t - a);
  let aHi = prevent_fp64_optimization(t - temp);
  let aLo = prevent_fp64_optimization(a - aHi);
  return vec2f(aHi, aLo);
}

fn split2(a: vec2f) -> vec2f {
  var b = split(a.x);
  b.y = b.y + a.y;
  return b;
}

fn quickTwoSum(a: f32, b: f32) -> vec2f {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let sum = prevent_fp64_optimization((a + b) * fp64arithmetic.ONE);
  let err = prevent_fp64_optimization(b - (sum - a) * fp64arithmetic.ONE);
#else
  let sum = prevent_fp64_optimization(a + b);
  let err = prevent_fp64_optimization(b - (sum - a));
#endif
  return vec2f(sum, err);
}

fn twoSum(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a + b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) +
    prevent_fp64_optimization(b - v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) + prevent_fp64_optimization(b - v);
#endif
  return vec2f(s, err);
}

fn twoSub(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a - b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) -
    prevent_fp64_optimization(b + v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) - prevent_fp64_optimization(b + v);
#endif
  return vec2f(s, err);
}

fn twoSqr(a: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * a);
  let aFp64 = split(a);
  let highProduct = prevent_fp64_optimization(aFp64.x * aFp64.x);
  let crossProduct = prevent_fp64_optimization(2.0 * aFp64.x * aFp64.y);
  let lowProduct = prevent_fp64_optimization(aFp64.y * aFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err =
    (prevent_fp64_optimization(highProduct - prod) * fp64arithmetic.ONE +
      crossProduct * fp64arithmetic.ONE * fp64arithmetic.ONE) +
    lowProduct * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
#else
  let err = ((prevent_fp64_optimization(highProduct - prod) + crossProduct) + lowProduct);
#endif
  return vec2f(prod, err);
}

fn twoProd(a: f32, b: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * b);
  let aFp64 = split(a);
  let bFp64 = split(b);
  let highProduct = prevent_fp64_optimization(aFp64.x * bFp64.x);
  let crossProduct1 = prevent_fp64_optimization(aFp64.x * bFp64.y);
  let crossProduct2 = prevent_fp64_optimization(aFp64.y * bFp64.x);
  let lowProduct = prevent_fp64_optimization(aFp64.y * bFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err1 = (highProduct - prod) * fp64arithmetic.ONE;
  let err2 = crossProduct1 * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err3 = crossProduct2 * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err4 =
    lowProduct *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE;
#else
  let err1 = highProduct - prod;
  let err2 = crossProduct1;
  let err3 = crossProduct2;
  let err4 = lowProduct;
#endif
  let err12InputA = prevent_fp64_optimization(err1);
  let err12InputB = prevent_fp64_optimization(err2);
  let err12 = prevent_fp64_optimization(err12InputA + err12InputB);
  let err123InputA = prevent_fp64_optimization(err12);
  let err123InputB = prevent_fp64_optimization(err3);
  let err123 = prevent_fp64_optimization(err123InputA + err123InputB);
  let err1234InputA = prevent_fp64_optimization(err123);
  let err1234InputB = prevent_fp64_optimization(err4);
  let err = prevent_fp64_optimization(err1234InputA + err1234InputB);
  return vec2f(prod, err);
}

fn sum_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSum(a.x, b.x);
  let t = twoSum(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn sub_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSub(a.x, b.x);
  let t = twoSub(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn mul_fp64(a: vec2f, b: vec2f) -> vec2f {
  var prod = twoProd(a.x, b.x);
  let crossProduct1 = prevent_fp64_optimization(a.x * b.y);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct1);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  let crossProduct2 = prevent_fp64_optimization(a.y * b.x);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct2);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn div_fp64(a: vec2f, b: vec2f) -> vec2f {
  let xn = prevent_fp64_optimization(1.0 / b.x);
  let yn = mul_fp64(a, vec2f(xn, fp64_runtime_zero()));
  let diff = prevent_fp64_optimization(sub_fp64(a, mul_fp64(b, yn)).x);
  let prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

fn sqrt_fp64(a: vec2f) -> vec2f {
  if (a.x == 0.0 && a.y == 0.0) {
    return vec2f(0.0, 0.0);
  }
  if (a.x < 0.0) {
    let nanValue = fp64_nan(a.x);
    return vec2f(nanValue, nanValue);
  }

  let x = prevent_fp64_optimization(1.0 / sqrt(a.x));
  let yn = prevent_fp64_optimization(a.x * x);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let ynSqr = twoSqr(yn) * fp64arithmetic.ONE;
#else
  let ynSqr = twoSqr(yn);
#endif
  let diff = prevent_fp64_optimization(sub_fp64(a, ynSqr).x);
  let prod = twoProd(prevent_fp64_optimization(x * 0.5), diff);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2f(yn, 0.0), prod);
#endif
}
#endif
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_f32_bits_is_nan(bits: u32) -> bool {
  return (bits & 0x7fffffffu) > 0x7f800000u;
}

fn fp64_f32_bits_is_inf(bits: u32) -> bool {
  return (bits & 0x7fffffffu) == 0x7f800000u;
}

fn fp64_compare_f32_bits(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == 0u && bMagnitude == 0u) {
    return 0;
  }
  let aSign = aBits >> 31u;
  let bSign = bBits >> 31u;
  if (aSign != bSign) {
    return select(1, -1, aSign == 1u);
  }
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  let magnitudeComparison = select(-1, 1, aMagnitude > bMagnitude);
  return select(magnitudeComparison, -magnitudeComparison, aSign == 1u);
}

// Normalize an arbitrary pair of finite f32 limbs with integer accumulation.
// This is independent of LUMA_FP64_INTEGER_ARITHMETIC and canonicalizes every
// representation of zero to vec2f(+0.0, +0.0).
fn normalize_fp64(value: vec2f) -> vec2f {
  let resultBits = fp64_add_raw_f32_bits(bitcast<u32>(value.x), bitcast<u32>(value.y));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn is_nan_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  return fp64_f32_bits_is_nan(bitcast<u32>(normalized.x)) ||
    fp64_f32_bits_is_nan(bitcast<u32>(normalized.y));
}

fn is_finite_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  return !fp64_f32_bits_is_nan(highBits) && !fp64_f32_bits_is_nan(lowBits) &&
    !fp64_f32_bits_is_inf(highBits) && !fp64_f32_bits_is_inf(lowBits);
}

// Returns -1, 0, or 1. NaN is unordered and returns 0; call is_nan_fp64 or
// is_finite_fp64 first when 0 must mean a finite zero.
fn sign_fp64(value: vec2f) -> i32 {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  if (fp64_f32_bits_is_nan(highBits) || fp64_f32_bits_is_nan(lowBits)) {
    return 0;
  }
  if ((highBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (highBits >> 31u) == 1u);
  }
  if ((lowBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (lowBits >> 31u) == 1u);
  }
  return 0;
}

// Compares double-single values and returns -1, 0, or 1. NaN is unordered
// and returns 0; callers that require equality semantics must first check
// is_nan_fp64 or is_finite_fp64.
fn compare_fp64(a: vec2f, b: vec2f) -> i32 {
  let normalizedA = normalize_fp64(a);
  let normalizedB = normalize_fp64(b);
  let aHighBits = bitcast<u32>(normalizedA.x);
  let aLowBits = bitcast<u32>(normalizedA.y);
  let bHighBits = bitcast<u32>(normalizedB.x);
  let bLowBits = bitcast<u32>(normalizedB.y);
  if (fp64_f32_bits_is_nan(aHighBits) || fp64_f32_bits_is_nan(aLowBits) ||
      fp64_f32_bits_is_nan(bHighBits) || fp64_f32_bits_is_nan(bLowBits)) {
    return 0;
  }
  let highComparison = fp64_compare_f32_bits(aHighBits, bHighBits);
  if (highComparison != 0) {
    return highComparison;
  }
  return fp64_compare_f32_bits(aLowBits, bLowBits);
}
#endif
`,Cx={ONE:1,SPLIT:4097},Mx={name:"fp64arithmetic",source:Ax,fs:ou,vs:ou,defaultUniforms:Cx,uniformTypes:{ONE:"f32",SPLIT:"f32"},fp64ify:Ld,fp64LowPart:wx,fp64ifyMatrix4:xx},Ix={useByteColors:"f32"},Rx={useByteColors:!0},au=Bx("floatColors"),Ox=kx("floatColors");function Bx(i){return`layout(std140) uniform ${i}Uniforms {
  float useByteColors;
} ${i};

vec3 ${i}_normalize(vec3 inputColor) {
  return ${i}.useByteColors > 0.5 ? inputColor / 255.0 : inputColor;
}

vec4 ${i}_normalize(vec4 inputColor) {
  return ${i}.useByteColors > 0.5 ? inputColor / 255.0 : inputColor;
}

vec4 ${i}_premultiplyAlpha(vec4 inputColor) {
  return vec4(inputColor.rgb * inputColor.a, inputColor.a);
}

vec4 ${i}_unpremultiplyAlpha(vec4 inputColor) {
  return inputColor.a > 0.0 ? vec4(inputColor.rgb / inputColor.a, inputColor.a) : vec4(0.0);
}

vec4 ${i}_premultiply_alpha(vec4 inputColor) {
  return ${i}_premultiplyAlpha(inputColor);
}

vec4 ${i}_unpremultiply_alpha(vec4 inputColor) {
  return ${i}_unpremultiplyAlpha(inputColor);
}
`}function kx(i){return`struct ${i}Uniforms {
  useByteColors: f32
};

@group(0) @binding(auto) var<uniform> ${i} : ${i}Uniforms;

fn ${i}_normalize(inputColor: vec3<f32>) -> vec3<f32> {
  return select(inputColor, inputColor / 255.0, ${i}.useByteColors > 0.5);
}

fn ${i}_normalize4(inputColor: vec4<f32>) -> vec4<f32> {
  return select(inputColor, inputColor / 255.0, ${i}.useByteColors > 0.5);
}

fn ${i}_premultiplyAlpha(inputColor: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(inputColor.rgb * inputColor.a, inputColor.a);
}

fn ${i}_unpremultiplyAlpha(inputColor: vec4<f32>) -> vec4<f32> {
  return select(
    vec4<f32>(0.0),
    vec4<f32>(inputColor.rgb / inputColor.a, inputColor.a),
    inputColor.a > 0.0
  );
}

fn ${i}_premultiply_alpha(inputColor: vec4<f32>) -> vec4<f32> {
  return ${i}_premultiplyAlpha(inputColor);
}

fn ${i}_unpremultiply_alpha(inputColor: vec4<f32>) -> vec4<f32> {
  return ${i}_unpremultiplyAlpha(inputColor);
}
`}const Cd={name:"floatColors",props:{},uniforms:{},vs:au,fs:au,source:Ox,uniformTypes:Ix,defaultUniforms:Rx},Dx=[0,1,1,1],Fx=`layout(std140) uniform pickingUniforms {
  float isActive;
  float isAttribute;
  float isHighlightActive;
  float useByteColors;
  vec3 highlightedObjectColor;
  vec4 highlightColor;
} picking;

out vec4 picking_vRGBcolor_Avalid;

// Normalize unsigned byte color to 0-1 range
vec3 picking_normalizeColor(vec3 color) {
  return picking.useByteColors > 0.5 ? color / 255.0 : color;
}

// Normalize unsigned byte color to 0-1 range
vec4 picking_normalizeColor(vec4 color) {
  return picking.useByteColors > 0.5 ? color / 255.0 : color;
}

bool picking_isColorZero(vec3 color) {
  return dot(color, vec3(1.0)) < 0.00001;
}

bool picking_isColorValid(vec3 color) {
  return dot(color, vec3(1.0)) > 0.00001;
}

// Check if this vertex is highlighted 
bool isVertexHighlighted(vec3 vertexColor) {
  vec3 highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
  return
    bool(picking.isHighlightActive) && picking_isColorZero(abs(vertexColor - highlightedObjectColor));
}

// Set the current picking color
void picking_setPickingColor(vec3 pickingColor) {
  pickingColor = picking_normalizeColor(pickingColor);

  if (bool(picking.isActive)) {
    // Use alpha as the validity flag. If pickingColor is [0, 0, 0] fragment is non-pickable
    picking_vRGBcolor_Avalid.a = float(picking_isColorValid(pickingColor));

    if (!bool(picking.isAttribute)) {
      // Stores the picking color so that the fragment shader can render it during picking
      picking_vRGBcolor_Avalid.rgb = pickingColor;
    }
  } else {
    // Do the comparison with selected item color in vertex shader as it should mean fewer compares
    picking_vRGBcolor_Avalid.a = float(isVertexHighlighted(pickingColor));
  }
}

void picking_setPickingAttribute(float value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.r = value;
  }
}

void picking_setPickingAttribute(vec2 value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.rg = value;
  }
}

void picking_setPickingAttribute(vec3 value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.rgb = value;
  }
}
`,Nx=`layout(std140) uniform pickingUniforms {
  float isActive;
  float isAttribute;
  float isHighlightActive;
  float useByteColors;
  vec3 highlightedObjectColor;
  vec4 highlightColor;
} picking;

in vec4 picking_vRGBcolor_Avalid;

/*
 * Returns highlight color if this item is selected.
 */
vec4 picking_filterHighlightColor(vec4 color) {
  // If we are still picking, we don't highlight
  if (picking.isActive > 0.5) {
    return color;
  }

  bool selected = bool(picking_vRGBcolor_Avalid.a);

  if (selected) {
    // Blend in highlight color based on its alpha value
    float highLightAlpha = picking.highlightColor.a;
    float blendedAlpha = highLightAlpha + color.a * (1.0 - highLightAlpha);
    float highLightRatio = highLightAlpha / blendedAlpha;

    vec3 blendedRGB = mix(color.rgb, picking.highlightColor.rgb, highLightRatio);
    return vec4(blendedRGB, blendedAlpha);
  } else {
    return color;
  }
}

/*
 * Returns picking color if picking enabled else unmodified argument.
 */
vec4 picking_filterPickingColor(vec4 color) {
  if (bool(picking.isActive)) {
    if (picking_vRGBcolor_Avalid.a == 0.0) {
      discard;
    }
    return picking_vRGBcolor_Avalid;
  }
  return color;
}

/*
 * Returns picking color if picking is enabled if not
 * highlight color if this item is selected, otherwise unmodified argument.
 */
vec4 picking_filterColor(vec4 color) {
  vec4 highlightColor = picking_filterHighlightColor(color);
  return picking_filterPickingColor(highlightColor);
}
`,Wt={props:{},uniforms:{},name:"picking",uniformTypes:{isActive:"f32",isAttribute:"f32",isHighlightActive:"f32",useByteColors:"f32",highlightedObjectColor:"vec3<f32>",highlightColor:"vec4<f32>"},defaultUniforms:{isActive:!1,isAttribute:!1,isHighlightActive:!1,useByteColors:!0,highlightedObjectColor:[0,0,0],highlightColor:Dx},vs:Fx,fs:Nx,getUniforms:Ux};function Ux(i={},e){const t={},n=Td(i.useByteColors,!0);if(i.highlightedObjectColor!==void 0)if(i.highlightedObjectColor===null)t.isHighlightActive=!1;else{t.isHighlightActive=!0;const r=i.highlightedObjectColor.slice(0,3);t.highlightedObjectColor=r}return i.highlightColor&&(t.highlightColor=Px(i.highlightColor,n)),i.isActive!==void 0&&(t.isActive=!!i.isActive,t.isAttribute=!!i.isAttribute),i.useByteColors!==void 0&&(t.useByteColors=!!i.useByteColors),t}const cu=`precision highp int;

// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
struct AmbientLight {
  vec3 color;
};

struct PointLight {
  vec3 color;
  vec3 position;
  vec3 attenuation; // 2nd order x:Constant-y:Linear-z:Exponential
};

struct SpotLight {
  vec3 color;
  vec3 position;
  vec3 direction;
  vec3 attenuation;
  vec2 coneCos;
};

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

struct UniformLight {
  vec3 color;
  vec3 position;
  vec3 direction;
  vec3 attenuation;
  vec2 coneCos;
};

layout(std140) uniform lightingUniforms {
  int enabled;
  int directionalLightCount;
  int pointLightCount;
  int spotLightCount;
  vec3 ambientColor;
  UniformLight lights[5];
} lighting;

PointLight lighting_getPointLight(int index) {
  UniformLight light = lighting.lights[index];
  return PointLight(light.color, light.position, light.attenuation);
}

SpotLight lighting_getSpotLight(int index) {
  UniformLight light = lighting.lights[lighting.pointLightCount + index];
  return SpotLight(light.color, light.position, light.direction, light.attenuation, light.coneCos);
}

DirectionalLight lighting_getDirectionalLight(int index) {
  UniformLight light =
    lighting.lights[lighting.pointLightCount + lighting.spotLightCount + index];
  return DirectionalLight(light.color, light.direction);
}

float getPointLightAttenuation(PointLight pointLight, float distance) {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

float getSpotLightAttenuation(SpotLight spotLight, vec3 positionWorldspace) {
  vec3 light_direction = normalize(positionWorldspace - spotLight.position);
  float coneFactor = smoothstep(
    spotLight.coneCos.y,
    spotLight.coneCos.x,
    dot(normalize(spotLight.direction), light_direction)
  );
  float distanceAttenuation = getPointLightAttenuation(
    PointLight(spotLight.color, spotLight.position, spotLight.attenuation),
    distance(spotLight.position, positionWorldspace)
  );
  return distanceAttenuation / max(coneFactor, 0.0001);
}

// #endif
`,zx=`// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
const MAX_LIGHTS: i32 = 5;

struct AmbientLight {
  color: vec3<f32>,
};

struct PointLight {
  color: vec3<f32>,
  position: vec3<f32>,
  attenuation: vec3<f32>, // 2nd order x:Constant-y:Linear-z:Exponential
};

struct SpotLight {
  color: vec3<f32>,
  position: vec3<f32>,
  direction: vec3<f32>,
  attenuation: vec3<f32>,
  coneCos: vec2<f32>,
};

struct DirectionalLight {
  color: vec3<f32>,
  direction: vec3<f32>,
};

struct UniformLight {
  color: vec3<f32>,
  position: vec3<f32>,
  direction: vec3<f32>,
  attenuation: vec3<f32>,
  coneCos: vec2<f32>,
};

struct lightingUniforms {
  enabled: i32,
  directionalLightCount: i32,
  pointLightCount: i32,
  spotLightCount: i32,
  ambientColor: vec3<f32>,
  lights: array<UniformLight, 5>,
};

@group(2) @binding(auto) var<uniform> lighting : lightingUniforms;

fn lighting_getPointLight(index: i32) -> PointLight {
  let light = lighting.lights[index];
  return PointLight(light.color, light.position, light.attenuation);
}

fn lighting_getSpotLight(index: i32) -> SpotLight {
  let light = lighting.lights[lighting.pointLightCount + index];
  return SpotLight(light.color, light.position, light.direction, light.attenuation, light.coneCos);
}

fn lighting_getDirectionalLight(index: i32) -> DirectionalLight {
  let light = lighting.lights[lighting.pointLightCount + lighting.spotLightCount + index];
  return DirectionalLight(light.color, light.direction);
}

fn getPointLightAttenuation(pointLight: PointLight, distance: f32) -> f32 {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

fn getSpotLightAttenuation(spotLight: SpotLight, positionWorldspace: vec3<f32>) -> f32 {
  let lightDirection = normalize(positionWorldspace - spotLight.position);
  let coneFactor = smoothstep(
    spotLight.coneCos.y,
    spotLight.coneCos.x,
    dot(normalize(spotLight.direction), lightDirection)
  );
  let distanceAttenuation = getPointLightAttenuation(
    PointLight(spotLight.color, spotLight.position, spotLight.attenuation),
    distance(spotLight.position, positionWorldspace)
  );
  return distanceAttenuation / max(coneFactor, 0.0001);
}
`,xt=5,$x={color:"vec3<f32>",position:"vec3<f32>",direction:"vec3<f32>",attenuation:"vec3<f32>",coneCos:"vec2<f32>"},Md={props:{},uniforms:{},name:"lighting",defines:{},uniformTypes:{enabled:"i32",directionalLightCount:"i32",pointLightCount:"i32",spotLightCount:"i32",ambientColor:"vec3<f32>",lights:[$x,xt]},defaultUniforms:nr(),bindingLayout:[{name:"lighting",group:2}],firstBindingSlot:0,source:zx,vs:cu,fs:cu,getUniforms:Gx};function Gx(i,e={}){if(i=i&&{...i},!i)return nr();i.lights&&(i={...i,...jx(i.lights),lights:void 0});const{useByteColors:t,ambientLight:n,pointLights:r,spotLights:s,directionalLights:o}=i||{};if(!(n||r&&r.length>0||s&&s.length>0||o&&o.length>0))return{...nr(),enabled:0};const c={...nr(),...Vx({useByteColors:t,ambientLight:n,pointLights:r,spotLights:s,directionalLights:o})};return i.enabled!==void 0&&(c.enabled=i.enabled?1:0),c}function Vx({useByteColors:i,ambientLight:e,pointLights:t=[],spotLights:n=[],directionalLights:r=[]}){const s=Id();let o=0,a=0,c=0,l=0;for(const u of t){if(o>=xt)break;s[o]={...s[o],color:Gn(u,i),position:u.position,attenuation:u.attenuation||[1,0,0]},o++,a++}for(const u of n){if(o>=xt)break;s[o]={...s[o],color:Gn(u,i),position:u.position,direction:u.direction,attenuation:u.attenuation||[1,0,0],coneCos:Hx(u)},o++,c++}for(const u of r){if(o>=xt)break;s[o]={...s[o],color:Gn(u,i),direction:u.direction},o++,l++}return t.length+n.length+r.length>xt&&T.warn(`MAX_LIGHTS exceeded, truncating to ${xt}`)(),{ambientColor:Gn(e,i),directionalLightCount:l,pointLightCount:a,spotLightCount:c,lights:s}}function jx(i){var t,n,r;const e={pointLights:[],spotLights:[],directionalLights:[]};for(const s of i||[])switch(s.type){case"ambient":e.ambientLight=s;break;case"directional":(t=e.directionalLights)==null||t.push(s);break;case"point":(n=e.pointLights)==null||n.push(s);break;case"spot":(r=e.spotLights)==null||r.push(s);break}return e}function Gn(i={},e){const{color:t=[0,0,0],intensity:n=1}=i;return Ad(t,Td(e,!0)).map(s=>s*n)}function nr(){return{enabled:1,directionalLightCount:0,pointLightCount:0,spotLightCount:0,ambientColor:[.1,.1,.1],lights:Id()}}function Id(){return Array.from({length:xt},()=>Wx())}function Wx(){return{color:[1,1,1],position:[1,1,2],direction:[1,1,1],attenuation:[1,0,0],coneCos:[1,0]}}function Hx(i){const e=i.innerConeAngle??0,t=i.outerConeAngle??Math.PI/4;return[Math.cos(e),Math.cos(t)]}const Rd=`layout(std140) uniform phongMaterialUniforms {
  uniform bool unlit;
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;
`,Od=`layout(std140) uniform phongMaterialUniforms {
  uniform bool unlit;
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 light_direction, vec3 view_direction, vec3 normal_worldspace, vec3 color) {
  vec3 halfway_direction = normalize(light_direction + view_direction);
  float lambertian = dot(light_direction, normal_worldspace);
  float specular = 0.0;
  if (lambertian > 0.0) {
    float specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, material.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (lambertian * material.diffuse * surfaceColor + specular * floatColors_normalize(material.specularColor)) * color;
}

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = surfaceColor;

  if (material.unlit) {
    return surfaceColor;
  }

  if (lighting.enabled == 0) {
    return lightColor;
  }

  vec3 view_direction = normalize(cameraPosition - position_worldspace);
  lightColor = material.ambient * surfaceColor * lighting.ambientColor;

  for (int i = 0; i < lighting.pointLightCount; i++) {
    PointLight pointLight = lighting_getPointLight(i);
    vec3 light_position_worldspace = pointLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getPointLightAttenuation(pointLight, distance(light_position_worldspace, position_worldspace));
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color / light_attenuation);
  }

  for (int i = 0; i < lighting.spotLightCount; i++) {
    SpotLight spotLight = lighting_getSpotLight(i);
    vec3 light_position_worldspace = spotLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, spotLight.color / light_attenuation);
  }

  for (int i = 0; i < lighting.directionalLightCount; i++) {
    DirectionalLight directionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  
  return lightColor;
}
`,Bd=`struct phongMaterialUniforms {
  unlit: u32,
  ambient: f32,
  diffuse: f32,
  shininess: f32,
  specularColor: vec3<f32>,
};

@group(3) @binding(auto) var<uniform> phongMaterial : phongMaterialUniforms;

fn lighting_getLightColor(surfaceColor: vec3<f32>, light_direction: vec3<f32>, view_direction: vec3<f32>, normal_worldspace: vec3<f32>, color: vec3<f32>) -> vec3<f32> {
  let halfway_direction: vec3<f32> = normalize(light_direction + view_direction);
  var lambertian: f32 = dot(light_direction, normal_worldspace);
  var specular: f32 = 0.0;
  if (lambertian > 0.0) {
    let specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, phongMaterial.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (
    lambertian * phongMaterial.diffuse * surfaceColor +
    specular * floatColors_normalize(phongMaterial.specularColor)
  ) * color;
}

fn lighting_getLightColor2(surfaceColor: vec3<f32>, cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32> {
  var lightColor: vec3<f32> = surfaceColor;

  if (phongMaterial.unlit != 0u) {
    return surfaceColor;
  }

  if (lighting.enabled == 0) {
    return lightColor;
  }

  let view_direction: vec3<f32> = normalize(cameraPosition - position_worldspace);
  lightColor = phongMaterial.ambient * surfaceColor * lighting.ambientColor;

  for (var i: i32 = 0; i < lighting.pointLightCount; i++) {
    let pointLight: PointLight = lighting_getPointLight(i);
    let light_position_worldspace: vec3<f32> = pointLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    let light_attenuation = getPointLightAttenuation(
      pointLight,
      distance(light_position_worldspace, position_worldspace)
    );
    lightColor += lighting_getLightColor(
      surfaceColor,
      light_direction,
      view_direction,
      normal_worldspace,
      pointLight.color / light_attenuation
    );
  }

  for (var i: i32 = 0; i < lighting.spotLightCount; i++) {
    let spotLight: SpotLight = lighting_getSpotLight(i);
    let light_position_worldspace: vec3<f32> = spotLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    let light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
    lightColor += lighting_getLightColor(
      surfaceColor,
      light_direction,
      view_direction,
      normal_worldspace,
      spotLight.color / light_attenuation
    );
  }

  for (var i: i32 = 0; i < lighting.directionalLightCount; i++) {
    let directionalLight: DirectionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }  
  
  return lightColor;
}

fn lighting_getSpecularLightColor(cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32>{
  var lightColor = vec3<f32>(0, 0, 0);
  let surfaceColor = vec3<f32>(0, 0, 0);

  if (lighting.enabled != 0) {
    let view_direction = normalize(cameraPosition - position_worldspace);

    for (var i: i32 = 0; i < lighting.pointLightCount; i++) {
      let pointLight: PointLight = lighting_getPointLight(i);
      let light_position_worldspace: vec3<f32> = pointLight.position;
      let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
      let light_attenuation = getPointLightAttenuation(
        pointLight,
        distance(light_position_worldspace, position_worldspace)
      );
      lightColor += lighting_getLightColor(
        surfaceColor,
        light_direction,
        view_direction,
        normal_worldspace,
        pointLight.color / light_attenuation
      );
    }

    for (var i: i32 = 0; i < lighting.spotLightCount; i++) {
      let spotLight: SpotLight = lighting_getSpotLight(i);
      let light_position_worldspace: vec3<f32> = spotLight.position;
      let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
      let light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
      lightColor += lighting_getLightColor(
        surfaceColor,
        light_direction,
        view_direction,
        normal_worldspace,
        spotLight.color / light_attenuation
      );
    }

    for (var i: i32 = 0; i < lighting.directionalLightCount; i++) {
        let directionalLight: DirectionalLight = lighting_getDirectionalLight(i);
        lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
    }
  }
  return lightColor;
}
`,Yx=[38.25,38.25,38.25],Tc={props:{},name:"gouraudMaterial",bindingLayout:[{name:"gouraudMaterial",group:3}],vs:Od.replace("phongMaterial","gouraudMaterial"),fs:Rd.replace("phongMaterial","gouraudMaterial"),source:Bd.replaceAll("phongMaterial","gouraudMaterial"),defines:{LIGHTING_VERTEX:!0},dependencies:[Md,Cd],uniformTypes:{unlit:"i32",ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{unlit:!1,ambient:.35,diffuse:.6,shininess:32,specularColor:Yx},getUniforms(i){return{...Tc.defaultUniforms,...i}}},qx=[38.25,38.25,38.25],kd={name:"phongMaterial",firstBindingSlot:0,bindingLayout:[{name:"phongMaterial",group:3}],dependencies:[Md,Cd],source:Bd,vs:Rd,fs:Od,defines:{LIGHTING_FRAGMENT:!0},uniformTypes:{unlit:"i32",ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{unlit:!1,ambient:.35,diffuse:.6,shininess:32,specularColor:qx},getUniforms(i){return{...kd.defaultUniforms,...i}}},Zx=`struct LayerUniforms {
  opacity: f32,
};

@group(0) @binding(auto)
var<uniform> layer: LayerUniforms;
`,lu=`layout(std140) uniform layerUniforms {
  uniform float opacity;
} layer;
`,Xx={name:"layer",source:Zx,vs:lu,fs:lu,getUniforms:i=>({opacity:Math.pow(i.opacity,1/2.2)}),uniformTypes:{opacity:"f32"}},Kx=`

@must_use
fn deckgl_premultiplied_alpha(fragColor: vec4<f32>) -> vec4<f32> {
    return vec4(fragColor.rgb * fragColor.a, fragColor.a); 
};
`,Ac={name:"color",dependencies:[],source:Kx,getUniforms:i=>({})},Qx=`const SMOOTH_EDGE_RADIUS: f32 = 0.5;

struct VertexGeometry {
  position: vec4<f32>,
  worldPosition: vec3<f32>,
  worldPositionAlt: vec3<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  pickingColor: vec3<f32>,
};

var<private> geometry_: VertexGeometry = VertexGeometry(
  vec4<f32>(0.0, 0.0, 1.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec2<f32>(0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0)
);

struct FragmentGeometry {
  uv: vec2<f32>,
};

var<private> fragmentGeometry: FragmentGeometry;

fn smoothedge(edge: f32, x: f32) -> f32 {
  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);
}
`,Dd="#define SMOOTH_EDGE_RADIUS 0.5",Jx=`${Dd}

struct VertexGeometry {
  vec4 position;
  vec3 worldPosition;
  vec3 worldPositionAlt;
  vec3 normal;
  vec2 uv;
  vec3 pickingColor;
} geometry = VertexGeometry(
  vec4(0.0, 0.0, 1.0, 0.0),
  vec3(0.0),
  vec3(0.0),
  vec3(0.0),
  vec2(0.0),
  vec3(0.0)
);
`,eP=`${Dd}

struct FragmentGeometry {
  vec2 uv;
};
FragmentGeometry geometry;

float smoothedge(float edge, float x) {
  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);
}
`,Fd={name:"geometry",source:Qx,vs:Jx,fs:eP},tP=25;var W;(function(i){i[i.Start=1]="Start",i[i.Move=2]="Move",i[i.End=4]="End",i[i.Cancel=8]="Cancel"})(W||(W={}));var fe;(function(i){i[i.None=0]="None",i[i.Left=1]="Left",i[i.Right=2]="Right",i[i.Up=4]="Up",i[i.Down=8]="Down",i[i.Horizontal=3]="Horizontal",i[i.Vertical=12]="Vertical",i[i.All=15]="All"})(fe||(fe={}));var F;(function(i){i[i.Possible=1]="Possible",i[i.Began=2]="Began",i[i.Changed=4]="Changed",i[i.Ended=8]="Ended",i[i.Recognized=8]="Recognized",i[i.Cancelled=16]="Cancelled",i[i.Failed=32]="Failed"})(F||(F={}));const iP="compute",nP="auto",Dr="manipulation",rr="none",pa="pan-x",ma="pan-y";function rP(i){if(i.includes(rr))return rr;const e=i.includes(pa),t=i.includes(ma);return e&&t?rr:e||t?e?pa:ma:i.includes(Dr)?Dr:nP}class sP{constructor(e,t){this.actions="",this.manager=e,this.set(t)}set(e){e===iP&&(e=this.compute()),this.manager.element&&(this.manager.element.style.touchAction=e,this.actions=e)}update(){this.set(this.manager.options.touchAction)}compute(){let e=[];for(const t of this.manager.recognizers)t.options.enable&&(e=e.concat(t.getTouchAction()));return rP(e.join(" "))}}function Fr(i){return i.trim().split(/\s+/g)}function Ks(i,e,t){if(i)for(const n of Fr(e))i.addEventListener(n,t,!1)}function Qs(i,e,t){if(i)for(const n of Fr(e))i.removeEventListener(n,t,!1)}function uu(i){return(i.ownerDocument||i).defaultView}function oP(i,e){let t=i;for(;t;){if(t===e)return!0;t=t.parentNode}return!1}function Nd(i){const e=i.length;if(e===1)return{x:Math.round(i[0].clientX),y:Math.round(i[0].clientY)};let t=0,n=0,r=0;for(;r<e;)t+=i[r].clientX,n+=i[r].clientY,r++;return{x:Math.round(t/e),y:Math.round(n/e)}}function fu(i){const e=[];let t=0;for(;t<i.pointers.length;)e[t]={clientX:Math.round(i.pointers[t].clientX),clientY:Math.round(i.pointers[t].clientY)},t++;return{timeStamp:Date.now(),pointers:e,center:Nd(e),deltaX:i.deltaX,deltaY:i.deltaY}}function Cc(i,e){const t=e.x-i.x,n=e.y-i.y;return Math.sqrt(t*t+n*n)}function _a(i,e){const t=e.clientX-i.clientX,n=e.clientY-i.clientY;return Math.sqrt(t*t+n*n)}function aP(i,e){const t=e.x-i.x,n=e.y-i.y;return Math.atan2(n,t)*180/Math.PI}function hu(i,e){const t=e.clientX-i.clientX,n=e.clientY-i.clientY;return Math.atan2(n,t)*180/Math.PI}function Mc(i,e){return i===e?fe.None:Math.abs(i)>=Math.abs(e)?i<0?fe.Left:fe.Right:e<0?fe.Up:fe.Down}function cP(i,e){const t=e.center;let n=i.offsetDelta,r=i.prevDelta;const s=i.prevInput;return(e.eventType===W.Start||(s==null?void 0:s.eventType)===W.End)&&(r=i.prevDelta={x:(s==null?void 0:s.deltaX)||0,y:(s==null?void 0:s.deltaY)||0},n=i.offsetDelta={x:t.x,y:t.y}),{deltaX:r.x+(t.x-n.x),deltaY:r.y+(t.y-n.y)}}function Ud(i,e,t){return{x:e/i||0,y:t/i||0}}function lP(i,e){return _a(e[0],e[1])/_a(i[0],i[1])}function uP(i,e){return hu(e[1],e[0])-hu(i[1],i[0])}function fP(i,e){const t=i.lastInterval||e,n=e.timeStamp-t.timeStamp;let r,s,o,a;if(e.eventType!==W.Cancel&&(n>tP||t.velocity===void 0)){const c=e.deltaX-t.deltaX,l=e.deltaY-t.deltaY,u=Ud(n,c,l);s=u.x,o=u.y,r=Math.abs(u.x)>Math.abs(u.y)?u.x:u.y,a=Mc(c,l),i.lastInterval=e}else r=t.velocity,s=t.velocityX,o=t.velocityY,a=t.direction;e.velocity=r,e.velocityX=s,e.velocityY=o,e.direction=a}function ba(i,e){return"pointerId"in i?i.pointerId:e}function du(i,e){i.movementOrigin=new Map(e.map((t,n)=>[ba(t,n),{clientX:t.clientX,clientY:t.clientY}])),i.firstMovementTime=void 0}function hP(i,e){var r;const t=e.pointers.map(ba);if(((r=i.movementOrigin)==null?void 0:r.size)===t.length&&t.every(s=>i.movementOrigin.has(s))||du(i,e.pointers),e.distancePerPointer=e.pointers.map((s,o)=>_a(i.movementOrigin.get(t[o]),s)),e.eventType&W.Move&&e.distancePerPointer.some(s=>s>0)&&(i.firstMovementTime??(i.firstMovementTime=e.timeStamp)),e.movementDeltaTime=i.firstMovementTime===void 0?0:e.timeStamp-i.firstMovementTime,e.eventType&(W.End|W.Cancel)){const s=e.changedPointers.map(o=>ba(o,e.pointers.indexOf(o)));du(i,e.pointers.filter((o,a)=>!s.includes(t[a])))}}function dP(i,e){const{session:t}=i,{pointers:n}=e,{length:r}=n;t.firstInput||(t.firstInput=fu(e)),r>1&&!t.firstMultiple?t.firstMultiple=fu(e):r===1&&(t.firstMultiple=!1);const{firstInput:s,firstMultiple:o}=t,a=o?o.center:s.center,c=e.center=Nd(n);e.timeStamp=Date.now(),e.deltaTime=e.timeStamp-s.timeStamp,hP(t,e),e.angle=aP(a,c),e.distance=Cc(a,c);const{deltaX:l,deltaY:u}=cP(t,e);e.deltaX=l,e.deltaY=u,e.offsetDirection=Mc(e.deltaX,e.deltaY);const f=Ud(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=f.x,e.overallVelocityY=f.y,e.overallVelocity=Math.abs(f.x)>Math.abs(f.y)?f.x:f.y,e.scale=o?lP(o.pointers,n):1,e.rotation=o?uP(o.pointers,n):0,e.maxPointers=t.prevInput?e.pointers.length>t.prevInput.maxPointers?e.pointers.length:t.prevInput.maxPointers:e.pointers.length;let h=i.element;return oP(e.srcEvent.target,h)&&(h=e.srcEvent.target),e.target=h,fP(t,e),e}function gP(i,e,t){const n=t.pointers.length,r=t.changedPointers.length,s=e&W.Start&&n-r===0,o=e&(W.End|W.Cancel)&&n-r===0;t.isFirst=!!s,t.isFinal=!!o,s&&(i.session={}),t.eventType=e;const a=dP(i,t);i.emit("hammer.input",a),i.recognize(a),i.session.prevInput=a}let pP=class{constructor(e){this.evEl="",this.evWin="",this.evTarget="",this.domHandler=t=>{this.manager.options.enable&&this.handler(t)},this.manager=e,this.element=e.element,this.target=e.options.inputTarget||e.element}callback(e,t){gP(this.manager,e,t)}init(){Ks(this.element,this.evEl,this.domHandler),Ks(this.target,this.evTarget,this.domHandler),Ks(uu(this.element),this.evWin,this.domHandler)}destroy(){Qs(this.element,this.evEl,this.domHandler),Qs(this.target,this.evTarget,this.domHandler),Qs(uu(this.element),this.evWin,this.domHandler)}};const mP={pointerdown:W.Start,pointermove:W.Move,pointerup:W.End,pointercancel:W.Cancel,pointerout:W.Cancel},_P="pointerdown",bP="pointermove pointerup pointercancel";class yP extends pP{constructor(e){super(e),this.evEl=_P,this.evWin=bP,this.store=this.manager.session.pointerEvents=[],this.init()}handler(e){const{store:t}=this;let n=!1;const r=mP[e.type],s=e.pointerType,o=s==="touch";let a=t.findIndex(c=>c.pointerId===e.pointerId);r&W.Start&&(e.buttons||o)?a<0&&(t.push(e),a=t.length-1):r&(W.End|W.Cancel)&&(n=!0),!(a<0)&&(t[a]=e,this.callback(r,{pointers:t,changedPointers:[e],eventType:r,pointerType:s,srcEvent:e}),n&&t.splice(a,1))}}const vP=["","webkit","Moz","MS","ms","o"];function wP(i,e){const t=e[0].toUpperCase()+e.slice(1);for(const n of vP){const r=n?n+t:e;if(r in i)return r}}const xP=1,gu=2,pu={touchAction:"compute",enable:!0,inputTarget:null,cssProps:{userSelect:"none",userDrag:"none",touchCallout:"none",tapHighlightColor:"rgba(0,0,0,0)"}};class PP{constructor(e,t){this.options={...pu,...t,cssProps:{...pu.cssProps,...t.cssProps},inputTarget:t.inputTarget||e},this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=e,this.input=new yP(this),this.touchAction=new sP(this,this.options.touchAction),this.toggleCssProps(!0)}set(e){return Object.assign(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this}stop(e){this.session.stopped=e?gu:xP}recognize(e){const{session:t}=this;if(t.stopped)return;this.session.prevented&&e.srcEvent.preventDefault();let n;const{recognizers:r}=this;let{curRecognizer:s}=t;(!s||s&&s.state&F.Recognized)&&(s=t.curRecognizer=null);let o=0;for(;o<r.length;)n=r[o],t.stopped!==gu&&(!s||n===s||n.canRecognizeWith(s))?n.recognize(e):n.reset(),!s&&n.state&(F.Began|F.Changed|F.Ended)&&(s=t.curRecognizer=n),o++}get(e){const{recognizers:t}=this;for(let n=0;n<t.length;n++)if(t[n].options.event===e)return t[n];return null}add(e){if(Array.isArray(e)){for(const n of e)this.add(n);return this}const t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e}remove(e){if(Array.isArray(e)){for(const n of e)this.remove(n);return this}const t=typeof e=="string"?this.get(e):e;if(t){const{recognizers:n}=this,r=n.indexOf(t);r!==-1&&(n.splice(r,1),this.touchAction.update())}return this}on(e,t){if(!e||!t)return;const{handlers:n}=this;for(const r of Fr(e))n[r]=n[r]||[],n[r].push(t)}off(e,t){if(!e)return;const{handlers:n}=this;for(const r of Fr(e))t?n[r]&&n[r].splice(n[r].indexOf(t),1):delete n[r]}emit(e,t){const n=this.handlers[e]&&this.handlers[e].slice();if(!n||!n.length)return;const r=t;r.type=e,r.preventDefault=function(){t.srcEvent.preventDefault()};let s=0;for(;s<n.length;)n[s](r),s++}destroy(){this.toggleCssProps(!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}toggleCssProps(e){const{element:t}=this;if(t){for(const[n,r]of Object.entries(this.options.cssProps)){const s=wP(t.style,n);e?(this.oldCssProps[s]=t.style[s],t.style[s]=r):t.style[s]=this.oldCssProps[s]||""}e||(this.oldCssProps={})}}}let EP=1;function SP(){return EP++}function mu(i){return i&F.Cancelled?"cancel":i&F.Ended?"end":i&F.Changed?"move":i&F.Began?"start":""}class Ic{constructor(e){this.options=e,this.id=SP(),this.state=F.Possible,this.simultaneous={},this.requireFail=[]}set(e){return Object.assign(this.options,e),this.manager.touchAction.update(),this}recognizeWith(e){if(Array.isArray(e)){for(const r of e)this.recognizeWith(r);return this}let t;if(typeof e=="string"){if(t=this.manager.get(e),!t)throw new Error(`Cannot find recognizer ${e}`)}else t=e;const{simultaneous:n}=this;return n[t.id]||(n[t.id]=t,t.recognizeWith(this)),this}dropRecognizeWith(e){if(Array.isArray(e)){for(const n of e)this.dropRecognizeWith(n);return this}let t;return typeof e=="string"?t=this.manager.get(e):t=e,t&&delete this.simultaneous[t.id],this}requireFailure(e){if(Array.isArray(e)){for(const r of e)this.requireFailure(r);return this}let t;if(typeof e=="string"){if(t=this.manager.get(e),!t)throw new Error(`Cannot find recognizer ${e}`)}else t=e;const{requireFail:n}=this;return n.indexOf(t)===-1&&(n.push(t),t.requireFailure(this)),this}dropRequireFailure(e){if(Array.isArray(e)){for(const n of e)this.dropRequireFailure(n);return this}let t;if(typeof e=="string"?t=this.manager.get(e):t=e,t){const n=this.requireFail.indexOf(t);n>-1&&this.requireFail.splice(n,1)}return this}hasRequireFailures(){return!!this.requireFail.find(e=>e.options.enable)}canRecognizeWith(e){return!!this.simultaneous[e.id]}emit(e){if(!e)return;const{state:t}=this;t<F.Ended&&this.manager.emit(this.options.event+mu(t),e),this.manager.emit(this.options.event,e),e.additionalEvent&&this.manager.emit(e.additionalEvent,e),t>=F.Ended&&this.manager.emit(this.options.event+mu(t),e)}tryEmit(e){this.canEmit()?this.emit(e):this.state=F.Failed}canEmit(){let e=0;for(;e<this.requireFail.length;){if(!(this.requireFail[e].state&(F.Failed|F.Possible)))return!1;e++}return!0}recognize(e){const t={...e};if(!this.options.enable){this.reset(),this.state=F.Failed;return}this.state&(F.Recognized|F.Cancelled|F.Failed)&&(this.state=F.Possible),this.state=this.process(t),this.state&(F.Began|F.Changed|F.Ended|F.Cancelled)&&this.tryEmit(t)}getEventNames(){return[this.options.event]}reset(){}}function LP(i){return Math.abs(((i+180)%360+360)%360-180)}function TP(i,e){return(e.distance===void 0||i.distance>=e.distance)&&(e.distancePerPointer===void 0||i.distancePerPointer.length>0&&i.distancePerPointer.every(t=>t>=e.distancePerPointer))&&(e.movementDeltaTime===void 0||i.movementDeltaTime>=e.movementDeltaTime)&&(e.rotation===void 0||LP(i.rotation)>=e.rotation)&&(e.scale===void 0||Math.abs(i.scale-1)>=e.scale)}class AP extends Ic{attrTest(e){const t=this.options.pointers;return t===0||e.pointers.length===t}coherentTest(e){const t=this.options.coherent;return!(t!=null&&t.length)||t.some(n=>TP(e,n))}process(e){const{state:t}=this,{eventType:n}=e,r=t&(F.Began|F.Changed),s=this.attrTest(e);return r&&(n&W.Cancel||!s)?t|F.Cancelled:r||s?n&W.End?t|F.Ended:t&F.Began?t|F.Changed:F.Began:F.Failed}}const CP=["","start","move","end","cancel"];class MP extends Ic{constructor(e={}){super({enable:!0,event:"doubleclickdrag",pointers:1,interval:500,time:350,threshold:28,dragThreshold:1,pixelsPerScale:120,...e}),this._tapStart=null,this._lastTap=null,this._drag=null,this._emittedStart=!1}getTouchAction(){return[Dr]}getEventNames(){return CP.map(e=>this.options.event+e)}process(e){const{options:t}=this;return e.pointers.length===t.pointers?e.eventType&W.Start?this._handleStart(e):e.eventType&W.Move?this._handleMove(e):e.eventType&W.Cancel?this._handleEnd(e,!0):e.eventType&W.End?this._handleEnd(e,!1):F.Failed:(this.reset(),F.Failed)}reset(){this._tapStart=null,this._lastTap=null,this._drag=null,this._emittedStart=!1}emit(e){var t;if(e){if(this.state===F.Began){if(!((t=this._drag)!=null&&t.active)||this._emittedStart)return;this._emittedStart=!0,this.manager.emit(`${this.options.event}start`,e),this.manager.emit(this.options.event,e);return}if(this.state===F.Changed){if(!this._emittedStart)return;this.manager.emit(`${this.options.event}move`,e),this.manager.emit(this.options.event,e);return}if(this.state===F.Ended){if(!this._emittedStart)return;this.manager.emit(this.options.event,e),this.manager.emit(`${this.options.event}end`,e),this._emittedStart=!1;return}if(this.state===F.Cancelled){if(!this._emittedStart)return;this.manager.emit(this.options.event,e),this.manager.emit(`${this.options.event}cancel`,e),this._emittedStart=!1}}}_handleStart(e){const t=this._getPointerId(e);return this._lastTap&&this._isTapMatch(e,this._lastTap)?(this._tapStart=null,this._lastTap=null,this._drag={startCenter:e.center,pointerId:t,active:!1},this._emittedStart=!1,F.Began):(this._tapStart={center:e.center,timeStamp:e.timeStamp,pointerId:t},this._lastTap=null,this._drag=null,this._emittedStart=!1,F.Failed)}_handleMove(e){if(!this._drag||!this._isSamePointer(e,this._drag.pointerId))return F.Failed;const t=this._drag.startCenter.y-e.center.y;return!this._drag.active&&Math.abs(t)<this.options.dragThreshold?F.Began:(this._drag.active=!0,e.scale=Math.pow(2,t/this.options.pixelsPerScale),this._emittedStart?F.Changed:F.Began)}_handleEnd(e,t){if(this._drag&&this._isSamePointer(e,this._drag.pointerId)){const{active:n,startCenter:r}=this._drag;if(this._drag=null,this._tapStart=null,this._lastTap=null,!n)return this._emittedStart=!1,F.Failed;const s=r.y-e.center.y;return e.scale=Math.pow(2,s/this.options.pixelsPerScale),t?F.Cancelled:F.Ended}return!this._tapStart||!this._isSamePointer(e,this._tapStart.pointerId)?(t&&this.reset(),F.Failed):(this._isValidTap(e)?this._lastTap={center:e.center,timeStamp:e.timeStamp,pointerId:this._tapStart.pointerId}:this._lastTap=null,this._tapStart=null,F.Failed)}_isTapMatch(e,t){return e.timeStamp-t.timeStamp<=this.options.interval&&Cc(e.center,t.center)<=this.options.threshold}_isValidTap(e){return e.deltaTime<=this.options.time&&e.distance<=this.options.threshold}_getPointerId(e){return"pointerId"in e.srcEvent?e.srcEvent.pointerId:null}_isSamePointer(e,t){return t===null||this._getPointerId(e)===t}}class _u extends Ic{constructor(e={}){super({enable:!0,event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10,...e}),this.pTime=null,this.pCenter=null,this._timer=null,this._input=null,this.count=0}getTouchAction(){return[Dr]}process(e){const{options:t}=this,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,s=e.deltaTime<t.time;if(this.reset(),e.eventType&W.Start&&this.count===0)return this.failTimeout();if(r&&s&&n){if(e.eventType!==W.End)return this.failTimeout();const o=this.pTime?e.timeStamp-this.pTime<t.interval:!0,a=!this.pCenter||Cc(this.pCenter,e.center)<t.posThreshold;if(this.pTime=e.timeStamp,this.pCenter=e.center,!a||!o?this.count=1:this.count+=1,this._input=e,this.count%t.taps===0)return this.hasRequireFailures()?(this._timer=setTimeout(()=>{this.state=F.Recognized,this.tryEmit(this._input)},t.interval),F.Began):F.Recognized}return F.Failed}failTimeout(){return this._timer=setTimeout(()=>{this.state=F.Failed},this.options.interval),F.Failed}reset(){clearTimeout(this._timer)}emit(e){this.state===F.Recognized&&(e.tapCount=this.count,this.manager.emit(this.options.event,e))}}class zd extends AP{constructor(){super(...arguments),this.wheelSession=null,this.wheelSessionUnsubscribe=null,this.handleWheelSessionEvent=e=>{e.device==="trackpad"&&this.handleTrackpadEvent(e)}}set(e){var r;const{wheelSession:t,...n}=e;return t&&t!==this.wheelSession&&((r=this.wheelSessionUnsubscribe)==null||r.call(this),this.wheelSessionUnsubscribe=null,this.wheelSession=t),super.set(n),this.updateWheelSessionSubscription(),this}getTrackpadInput(e,t={}){const{srcEvent:n}=e,r=t.deltaX??e.deltaX,s=t.deltaY??e.deltaY,o=Mc(r,s),a=Math.sqrt(e.deltaX*e.deltaX+e.deltaY*e.deltaY),c=n;return{pointers:[c,c],changedPointers:[c,c],pointerType:"trackpad",srcEvent:c,eventType:e.eventType,timeStamp:e.timeStamp,deltaTime:e.deltaTime,center:e.center,deltaX:r,deltaY:s,angle:Math.atan2(s,r)*180/Math.PI,distance:Math.sqrt(r*r+s*s),distancePerPointer:[a,a],movementDeltaTime:e.deltaTime,scale:1,rotation:0,direction:o,offsetDirection:o,velocity:e.velocity,velocityX:e.velocityX,velocityY:e.velocityY,overallVelocity:e.overallVelocity,overallVelocityX:e.overallVelocityX,overallVelocityY:e.overallVelocityY,maxPointers:2,target:n.target||this.manager.element,additionalEvent:"",...t}}updateWheelSessionSubscription(){const e=!!(this.wheelSession&&this.options.enable&&this.options.trackpad&&this.options.pointers===2);e&&!this.wheelSessionUnsubscribe?this.wheelSessionUnsubscribe=this.wheelSession.on(this.handleWheelSessionEvent):!e&&this.wheelSessionUnsubscribe&&(this.wheelSessionUnsubscribe(),this.wheelSessionUnsubscribe=null)}}const IP=["","start","move","end","cancel","up","down","left","right"];class bu extends zd{constructor(e={}){super({enable:!0,pointers:1,event:"pan",threshold:10,direction:fe.All,trackpad:!1,coherent:[],...e}),this.trackpadGesture=!1,this.pX=null,this.pY=null}getTouchAction(){const{options:{direction:e}}=this,t=[];return e&fe.Horizontal&&t.push(ma),e&fe.Vertical&&t.push(pa),t}getEventNames(){return IP.map(e=>this.options.event+e)}directionTest(e){const{options:t}=this;let n=!0,{distance:r}=e,{direction:s}=e;const o=e.deltaX,a=e.deltaY;return s&t.direction||(t.direction&fe.Horizontal?(s=o===0?fe.None:o<0?fe.Left:fe.Right,n=o!==this.pX,r=Math.abs(e.deltaX)):(s=a===0?fe.None:a<0?fe.Up:fe.Down,n=a!==this.pY,r=Math.abs(e.deltaY))),e.direction=s,n&&r>t.threshold&&!!(s&t.direction)}attrTest(e){var r;const t=!!(this.state&F.Began),n=!((r=this.options.coherent)!=null&&r.length&&e.eventType&(W.End|W.Cancel));return super.attrTest(e)&&(t||n&&this.coherentTest(e)&&this.directionTest(e))}emit(e){this.pX=e.deltaX,this.pY=e.deltaY;const t=fe[e.direction].toLowerCase();t&&(e.additionalEvent=this.options.event+t),super.emit(e)}handleTrackpadEvent(e){e.isFirst&&(this.trackpadGesture=!e.srcEvent.ctrlKey,!this.trackpadGesture&&this.state&(F.Recognized|F.Cancelled|F.Failed)&&(this.state=F.Possible)),this.trackpadGesture&&(this.recognize(this.getTrackpadInput(e,{deltaX:-e.deltaX,deltaY:-e.deltaY,velocity:-e.velocity,velocityX:-e.velocityX,velocityY:-e.velocityY,overallVelocity:-e.overallVelocity,overallVelocityX:-e.overallVelocityX,overallVelocityY:-e.overallVelocityY})),e.isFinal&&(this.trackpadGesture=!1))}}const RP=["","start","move","end","cancel","in","out"];class OP extends zd{constructor(e={}){super({enable:!0,event:"pinch",threshold:0,pointers:2,trackpad:!1,coherent:[],...e}),this.trackpadGesture=!1}getTouchAction(){return[rr]}getEventNames(){return RP.map(e=>this.options.event+e)}attrTest(e){var s;const t=!!((s=this.options.coherent)!=null&&s.length),n=!!(this.state&F.Began),r=!(t&&e.eventType&(W.End|W.Cancel));return super.attrTest(e)&&(n||r&&(t?this.coherentTest(e):Math.abs(e.scale-1)>this.options.threshold))}emit(e){if(e.scale!==1){const t=e.scale<1?"in":"out";e.additionalEvent=this.options.event+t}super.emit(e)}handleTrackpadEvent(e){e.isFirst&&(this.trackpadGesture=e.srcEvent.ctrlKey,!this.trackpadGesture&&this.state&(F.Recognized|F.Cancelled|F.Failed)&&(this.state=F.Possible)),this.trackpadGesture&&(this.recognize(this.getTrackpadInput(e,{deltaX:0,deltaY:0,velocity:0,velocityX:0,velocityY:0,overallVelocity:0,overallVelocityX:0,overallVelocityY:0,scale:Math.exp(-e.deltaY/100)})),e.isFinal&&(this.trackpadGesture=!1))}}class ws{constructor(e,t,n){this.element=e,this.callback=t,this.options=n}listen(e,t){t?this.element.addEventListener(e,this.handleEvent,{passive:!1}):this.element.removeEventListener(e,this.handleEvent)}}const BP=typeof navigator<"u"&&navigator.userAgent?navigator.userAgent.toLowerCase():"",kP=BP.indexOf("firefox")!==-1,DP=40,FP=.25;class NP extends ws{constructor(e,t,n){var r;n.enable=n.enable??!1,super(e,t,n),this.handleEvent=s=>{var a;if(!this.options.enable)return;let o=s.deltaY;globalThis.WheelEvent&&(kP&&s.deltaMode===globalThis.WheelEvent.DOM_DELTA_PIXEL&&(o/=globalThis.devicePixelRatio),s.deltaMode===globalThis.WheelEvent.DOM_DELTA_LINE&&(o*=DP)),s.shiftKey&&o&&(o=o*FP),this.callback({type:"wheel",center:{x:s.clientX,y:s.clientY},delta:-o,device:((a=this.options.wheelSession)==null?void 0:a.device)??"unknown",srcEvent:s,pointerType:"mouse",target:s.target})},n.enable&&(this.wheelSessionUnsubscribe=(r=this.options.wheelSession)==null?void 0:r.on(()=>{}),this.listen("wheel",!0))}destroy(){var e;this.listen("wheel",!1),(e=this.wheelSessionUnsubscribe)==null||e.call(this),this.wheelSessionUnsubscribe=void 0}enableEventType(e,t){var n,r;e==="wheel"&&this.options.enable!==t&&(this.options.enable=t,t&&!this.wheelSessionUnsubscribe&&(this.wheelSessionUnsubscribe=(n=this.options.wheelSession)==null?void 0:n.on(()=>{})),this.listen("wheel",t),t||((r=this.wheelSessionUnsubscribe)==null||r.call(this),this.wheelSessionUnsubscribe=void 0))}}const UP=4.000244140625,yu=40,zP=0,$P=1,GP=40,vu=40,VP=120,jP={classificationDelay:32,endDelay:80};class WP{constructor(e,t={}){var n;this.subscriptions=new Map,this.session=null,this.classificationTimer=null,this.endTimer=null,this.pressedControlKeys=new Set,this.listeningForControlKeys=!1,this.handleEvent=r=>{if(!this.hasSubscribers)return"unknown";const s=YP(r,this.pressedControlKeys.size>0);let o=this.session;if(o&&s.timeStamp-o.lastTimeStamp>=this.options.endDelay){if(this.end(),!this.hasSubscribers)return"unknown";o=null}o?(this.scheduleEnd(),this.addSample(o,s)):(o=this.startPendingSession(s),this.scheduleEnd());let{device:a}=o;return a==="unknown"&&(a=Js(o.samples,!1),a!=="unknown"&&this.begin(o,a)),a},this.finishClassification=()=>{if(this.classificationTimer=null,!this.session||this.session.device!=="unknown")return;const r=this.session,s=Js(r.samples,!0);this.begin(r,s==="unknown"?"mouse":s)},this.end=()=>{if(!this.session)return;if(this.session.device==="unknown"){const s=this.session,o=Js(s.samples,!0);this.begin(s,o==="unknown"?"mouse":o)}if(!this.session)return;const r=this.session;this.emit(W.End,r.lastEvent),this.reset()},this.handleKeyDown=r=>{r.key==="Control"&&this.pressedControlKeys.add(r.code||r.key)},this.handleKeyUp=r=>{r.key==="Control"&&(r.code?this.pressedControlKeys.delete(r.code):this.pressedControlKeys.clear())},this.handleWindowBlur=()=>{this.pressedControlKeys.clear()},this.element=e,this.options={...jP,...t},(n=this.element)==null||n.addEventListener("wheel",this.handleEvent,{passive:!0})}get hasSubscribers(){return this.subscriptions.size>0}get device(){var e;return((e=this.session)==null?void 0:e.device)??"unknown"}on(e){const t={listener:e};return this.subscriptions.set(e,t),this.updateControlKeyEventListeners(),()=>{this.subscriptions.get(e)===t&&this.off(e)}}off(e){this.subscriptions.delete(e),this.updateControlKeyEventListeners(),this.hasSubscribers||this.reset()}cancel(){const e=this.session;e&&e.device!=="unknown"&&this.emit(W.Cancel,e.lastEvent),this.reset()}destroy(){var e;this.cancel(),this.subscriptions.clear(),this.updateControlKeyEventListeners(),(e=this.element)==null||e.removeEventListener("wheel",this.handleEvent)}startPendingSession(e){const t={samples:[e],device:"unknown",firstTimeStamp:e.timeStamp,lastTimeStamp:e.timeStamp,totalDeltaX:e.deltaX,totalDeltaY:e.deltaY,velocityX:0,velocityY:0,lastEvent:e.event};return this.session=t,this.classificationTimer=globalThis.setTimeout(this.finishClassification,this.options.classificationDelay),t}addSample(e,t){if(e.samples.push(t),e.lastTimeStamp=t.timeStamp,e.lastEvent=t.event,e.totalDeltaX+=t.deltaX,e.totalDeltaY+=t.deltaY,e.device!=="unknown"){const n=e.samples[e.samples.length-2],r=t.timeStamp-n.timeStamp;e.velocityX=r>0?t.deltaX/r:0,e.velocityY=r>0?t.deltaY/r:0,this.emit(W.Move,t.event,{velocityX:e.velocityX,velocityY:e.velocityY})}}begin(e,t){e.device=t,this.clearClassificationTimer(),this.emit(W.Start,e.samples[0].event);const n=e.lastTimeStamp-e.firstTimeStamp;e.velocityX=n>0?e.totalDeltaX/n:0,e.velocityY=n>0?e.totalDeltaY/n:0,this.emit(W.Move,e.lastEvent,{velocityX:e.velocityX,velocityY:e.velocityY})}scheduleEnd(){this.clearEndTimer(),this.endTimer=globalThis.setTimeout(this.end,this.options.endDelay)}emit(e,t,n){const r=this.session;if(!r||r.device==="unknown")return;const s=e===W.Start,o=e===W.End||e===W.Cancel,a=s?r.firstTimeStamp:r.lastTimeStamp,c=s?0:Math.max(0,a-r.firstTimeStamp),l=s?0:r.totalDeltaX,u=s?0:r.totalDeltaY,f=c>0?l/c:0,h=c>0?u/c:0,g=s?0:(n==null?void 0:n.velocityX)??r.velocityX,p=s?0:(n==null?void 0:n.velocityY)??r.velocityY,m={eventType:e,device:r.device,srcEvent:t,timeStamp:a,center:{x:t.clientX,y:t.clientY},deltaX:l,deltaY:u,deltaTime:c,velocity:Math.abs(g)>Math.abs(p)?g:p,velocityX:g,velocityY:p,overallVelocity:Math.abs(f)>Math.abs(h)?f:h,overallVelocityX:f,overallVelocityY:h,isFirst:s,isFinal:o};for(const{listener:_}of[...this.subscriptions.values()])_(m)}reset(){this.clearClassificationTimer(),this.clearEndTimer(),this.session=null}clearClassificationTimer(){this.classificationTimer!==null&&(globalThis.clearTimeout(this.classificationTimer),this.classificationTimer=null)}clearEndTimer(){this.endTimer!==null&&(globalThis.clearTimeout(this.endTimer),this.endTimer=null)}updateControlKeyEventListeners(){const e=this.hasSubscribers,t=HP();!t||e===this.listeningForControlKeys||(this.listeningForControlKeys=e,e?(t.addEventListener("keydown",this.handleKeyDown,!0),t.addEventListener("keyup",this.handleKeyUp,!0),t.addEventListener("blur",this.handleWindowBlur)):(t.removeEventListener("keydown",this.handleKeyDown,!0),t.removeEventListener("keyup",this.handleKeyUp,!0),t.removeEventListener("blur",this.handleWindowBlur),this.pressedControlKeys.clear()))}}function HP(){var i;return typeof window<"u"?window:(i=globalThis.document)==null?void 0:i.defaultView}function YP(i,e){let t=i.deltaX,n=i.deltaY;return i.deltaMode===$P&&(t*=yu,n*=yu),{event:i,timeStamp:i.timeStamp,deltaX:t,deltaY:n,isControlKeyDown:e}}function Js(i,e){return i.some(({event:t,isControlKeyDown:n})=>t.ctrlKey&&!n)?"trackpad":i.some(({event:t})=>t.deltaMode!==zP)||i.some(qP)||i.every(({event:t})=>{const n=t.wheelDelta;return n!==void 0&&Math.abs(n)%40===0})?"mouse":i.some(({deltaX:t})=>t!==0)||i.length>1&&ZP(i)?"trackpad":e?"mouse":"unknown"}function qP({event:i,deltaX:e,deltaY:t}){if(e!==0||t===0)return!1;const n=Math.abs(t/UP);if(Number.isInteger(n))return!0;const r=i.wheelDelta;return typeof r=="number"&&r!==0&&r%VP===0}function ZP(i){for(let e=0;e<i.length;e++){const t=i[e];if(Math.abs(t.deltaX)>vu||Math.abs(t.deltaY)>vu||e>0&&t.timeStamp-i[e-1].timeStamp>GP)return!1}return!0}const wu=["mousedown","mousemove","mouseup","mouseover","mouseout","mouseenter","mouseleave"];class XP extends ws{constructor(e,t,n){super(e,t,{enable:!0,...n}),this.handleEvent=s=>{this.handleOverEvent(s),this.handleOutEvent(s),this.handleEnterEvent(s),this.handleLeaveEvent(s),this.handleMoveEvent(s)},this.pressed=!1;const{enable:r=!1}=this.options;this.enableMoveEvent=r,this.enableLeaveEvent=r,this.enableEnterEvent=r,this.enableOutEvent=r,this.enableOverEvent=r,r&&wu.forEach(s=>this.listen(s,!0))}destroy(){wu.forEach(e=>this.listen(e,!1))}enableEventType(e,t){switch(e){case"pointermove":this.enableMoveEvent!==t&&(this.enableMoveEvent=t,this.listen("mousedown",t),this.listen("mousemove",t),this.listen("mouseup",t));break;case"pointerover":this.enableOverEvent!==t&&(this.enableOverEvent=t,this.listen("mouseover",t));break;case"pointerout":this.enableOutEvent!==t&&(this.enableOutEvent=t,this.listen("mouseout",t));break;case"pointerenter":this.enableEnterEvent!==t&&(this.enableEnterEvent=t,this.listen("mouseenter",t));break;case"pointerleave":this.enableLeaveEvent!==t&&(this.enableLeaveEvent=t,this.listen("mouseleave",t));break}}handleOverEvent(e){this.enableOverEvent&&e.type==="mouseover"&&this._emit("pointerover",e)}handleOutEvent(e){this.enableOutEvent&&e.type==="mouseout"&&this._emit("pointerout",e)}handleEnterEvent(e){this.enableEnterEvent&&e.type==="mouseenter"&&this._emit("pointerenter",e)}handleLeaveEvent(e){this.enableLeaveEvent&&e.type==="mouseleave"&&this._emit("pointerleave",e)}handleMoveEvent(e){if(this.enableMoveEvent)switch(e.type){case"mousedown":e.button>=0&&(this.pressed=!0);break;case"mousemove":e.buttons===0&&(this.pressed=!1),this.pressed||this._emit("pointermove",e);break;case"mouseup":this.pressed=!1;break}}_emit(e,t){this.callback({type:e,center:{x:t.clientX,y:t.clientY},srcEvent:t,pointerType:"mouse",target:t.target})}}const xu=["keydown","keyup"];class KP extends ws{constructor(e,t,n){super(e,t,{enable:!0,tabIndex:0,...n}),this.handleEvent=s=>{const o=s.target||s.srcElement;o.tagName==="INPUT"&&o.type==="text"||o.tagName==="TEXTAREA"||(this.enableDownEvent&&s.type==="keydown"&&this.callback({type:"keydown",srcEvent:s,key:s.key,target:s.target}),this.enableUpEvent&&s.type==="keyup"&&this.callback({type:"keyup",srcEvent:s,key:s.key,target:s.target}))};const{enable:r=!1}=this.options;this.enableDownEvent=r,this.enableUpEvent=r,e.tabIndex=this.options.tabIndex,e.style.outline="none",r&&xu.forEach(s=>this.listen(s,!0))}destroy(){xu.forEach(e=>this.listen(e,!1))}enableEventType(e,t){e==="keydown"&&this.enableDownEvent!==t&&(this.enableDownEvent=t,this.listen(e,t)),e==="keyup"&&this.enableUpEvent!==t&&(this.enableUpEvent=t,this.listen(e,t))}}class QP extends ws{constructor(e,t,n){n.enable=n.enable??!1,super(e,t,n),this.handleEvent=r=>{this.options.enable&&this.callback({type:"contextmenu",center:{x:r.clientX,y:r.clientY},srcEvent:r,pointerType:"mouse",target:r.target})},n.enable&&this.listen("contextmenu",!0)}destroy(){this.listen("contextmenu",!1)}enableEventType(e,t){e==="contextmenu"&&this.options.enable!==t&&(this.options.enable=t,this.listen("contextmenu",t))}}const Pu=1,ya=2,Eu=4,JP={pointerdown:Pu,pointermove:ya,pointerup:Eu,mousedown:Pu,mousemove:ya,mouseup:Eu},eE=0,tE=1,iE=2,nE=1,rE=2,sE=4;function oE(i){const e=JP[i.srcEvent.type];if(!e)return null;const{buttons:t,button:n}=i.srcEvent;let r=!1,s=!1,o=!1;return e===ya?(r=!!(t&nE),s=!!(t&sE),o=!!(t&rE)):(r=n===eE,s=n===tE,o=n===iE),{leftButton:r,middleButton:s,rightButton:o}}function aE(i,e){const t=i.center;if(!t)return null;const n=e.getBoundingClientRect(),r=n.width/e.offsetWidth||1,s=n.height/e.offsetHeight||1,o={x:(t.x-n.left-e.clientLeft)/r,y:(t.y-n.top-e.clientTop)/s};return{center:t,offsetCenter:o}}const cE={srcElement:"root",priority:0};class lE{constructor(e,t){this.handleEvent=n=>{if(this.isEmpty())return;const r=this._normalizeEvent(n);let s=n.srcEvent.target;for(;s&&s!==r.rootElement;){if(this._emit(r,s),r.handled)return;s=s.parentNode}this._emit(r,"root")},this.eventManager=e,this.recognizerName=t,this.handlers=[],this.handlersByElement=new Map,this._active=!1}isEmpty(){return!this._active}add(e,t,n,r=!1,s=!1){const{handlers:o,handlersByElement:a}=this,c={...cE,...n};let l=a.get(c.srcElement);l||(l=[],a.set(c.srcElement,l));const u={type:e,handler:t,srcElement:c.srcElement,priority:c.priority};r&&(u.once=!0),s&&(u.passive=!0),o.push(u),this._active=this._active||!u.passive;let f=l.length-1;for(;f>=0&&!(l[f].priority>=u.priority);)f--;l.splice(f+1,0,u)}remove(e,t){const{handlers:n,handlersByElement:r}=this;for(let s=n.length-1;s>=0;s--){const o=n[s];if(o.type===e&&o.handler===t){n.splice(s,1);const a=r.get(o.srcElement);a.splice(a.indexOf(o),1),a.length===0&&r.delete(o.srcElement)}}this._active=n.some(s=>!s.passive)}_emit(e,t){const n=this.handlersByElement.get(t);if(n){let r=!1;const s=()=>{e.handled=!0},o=()=>{e.handled=!0,r=!0},a=[];for(let c=0;c<n.length;c++){const{type:l,handler:u,once:f}=n[c];if(u({...e,type:l,stopPropagation:s,stopImmediatePropagation:o}),f&&a.push(n[c]),r)break}for(let c=0;c<a.length;c++){const{type:l,handler:u}=a[c];this.remove(l,u)}}}_normalizeEvent(e){const t=this.eventManager.getElement();return{...e,...oE(e),...aE(e,t),preventDefault:()=>{e.srcEvent.preventDefault()},stopImmediatePropagation:null,stopPropagation:null,handled:!1,rootElement:t}}}function uE(i){if("recognizer"in i)return i;let e;const t=Array.isArray(i)?[...i]:[i];if(typeof t[0]=="function"){const n=t.shift(),r=t.shift()||{};e=new n(r)}else e=t.shift();return{recognizer:e,recognizeWith:typeof t[0]=="string"?[t[0]]:t[0],requireFailure:typeof t[1]=="string"?[t[1]]:t[1]}}class fE{constructor(e=null,t={}){if(this._onBasicInput=n=>{this.manager.emit(n.srcEvent.type,n)},this._onOtherEvent=n=>{this.manager.emit(n.type,n)},this.options={recognizers:[],events:{},touchAction:"compute",tabIndex:0,cssProps:{},...t},this.events=new Map,this.element=e,this.wheelSession=new WP(e),!!e){this.manager=new PP(e,this.options);for(const n of this.options.recognizers){const{recognizer:r,recognizeWith:s,requireFailure:o}=uE(n);this.manager.add(r),s&&r.recognizeWith(s),o&&r.requireFailure(o)}this.manager.on("hammer.input",this._onBasicInput),this.wheelInput=new NP(e,this._onOtherEvent,{enable:!1,wheelSession:this.wheelSession}),this.moveInput=new XP(e,this._onOtherEvent,{enable:!1}),this.keyInput=new KP(e,this._onOtherEvent,{enable:!1,tabIndex:t.tabIndex}),this.contextmenuInput=new QP(e,this._onOtherEvent,{enable:!1}),this.on(this.options.events)}}getElement(){return this.element}destroy(){if(!this.element){this.wheelSession.destroy();return}this.wheelInput.destroy(),this.wheelSession.destroy(),this.moveInput.destroy(),this.keyInput.destroy(),this.contextmenuInput.destroy(),this.manager.destroy()}on(e,t,n){this._addEventHandler(e,t,n,!1)}once(e,t,n){this._addEventHandler(e,t,n,!0)}watch(e,t,n){this._addEventHandler(e,t,n,!1,!0)}off(e,t){this._removeEventHandler(e,t)}emit(e){var t;(t=this.manager)==null||t.emit(e.type,e)}_toggleRecognizer(e,t){var s,o,a,c;const{manager:n}=this;if(!n)return;const r=n.get(e);r&&(r.set({enable:t,wheelSession:this.wheelSession}),n.touchAction.update()),(s=this.wheelInput)==null||s.enableEventType(e,t),(o=this.moveInput)==null||o.enableEventType(e,t),(a=this.keyInput)==null||a.enableEventType(e,t),(c=this.contextmenuInput)==null||c.enableEventType(e,t)}_addEventHandler(e,t,n,r,s){if(typeof e!="string"){n=t;for(const[l,u]of Object.entries(e))this._addEventHandler(l,u,n,r,s);return}const{manager:o,events:a}=this;if(!o)return;let c=a.get(e);if(!c){const l=this._getRecognizerName(e)||e;c=new lE(this,l),a.set(e,c),o&&o.on(e,c.handleEvent)}c.add(e,t,n,r,s),c.isEmpty()||this._toggleRecognizer(c.recognizerName,!0)}_removeEventHandler(e,t){if(typeof e!="string"){for(const[s,o]of Object.entries(e))this._removeEventHandler(s,o);return}const{events:n}=this,r=n.get(e);if(r&&(r.remove(e,t),r.isEmpty())){const{recognizerName:s}=r;let o=!1;for(const a of n.values())if(a.recognizerName===s&&!a.isEmpty()){o=!0;break}o||this._toggleRecognizer(s,!1)}}_getRecognizerName(e){var t;return(t=this.manager.recognizers.find(n=>n.getEventNames().includes(e)))==null?void 0:t.options.event}}const ve={WEB_MERCATOR:1,GLOBE:2,WEB_MERCATOR_AUTO_OFFSET:4,IDENTITY:0},Rt={common:0,meters:1,pixels:2},sr={click:"onClick",dblclick:"onClick",panstart:"onDragStart",panmove:"onDrag",panend:"onDragEnd"},Su={multipan:[bu,{threshold:10,pointers:2,trackpad:!0}],pinch:[OP,{trackpad:!0},null,["multipan"]],pan:[bu,{threshold:1},["pinch"],["multipan"]],dblclick:[_u,{event:"dblclick",taps:2,enable:!1}],dblclickdrag:[MP,{event:"dblclickdrag",enable:!1},["dblclick"],null],click:[_u,{event:"click"},["dblclickdrag"],["dblclick","dblclickdrag"]]};function hE(i,e){if(i===e)return!0;if(Array.isArray(i)){const t=i.length;if(!e||e.length!==t)return!1;for(let n=0;n<t;n++)if(i[n]!==e[n])return!1;return!0}return!1}function Pn(i){let e={},t;return n=>{for(const r in n)if(!hE(n[r],e[r])){t=i(n),e=n;break}return t}}const Lu=[0,0,0,0],dE=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],$d=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],gE=[0,0,0],Gd=[0,0,0],pE={default:-1,cartesian:0,lnglat:1,"meter-offsets":2,"lnglat-offsets":3};function xs(i){const e=pE[i];if(e===void 0)throw new Error(`Invalid coordinateSystem: ${i}`);return e}const mE=Pn(yE);function Vd(i,e,t=Gd){t.length<3&&(t=[t[0],t[1],0]);let n=t,r,s=!0;switch(e==="lnglat-offsets"||e==="meter-offsets"?r=t:r=i.isGeospatial?[Math.fround(i.longitude),Math.fround(i.latitude),0]:null,i.projectionMode){case ve.WEB_MERCATOR:(e==="lnglat"||e==="cartesian")&&(r=[0,0,0],s=!1);break;case ve.WEB_MERCATOR_AUTO_OFFSET:e==="lnglat"?n=r:e==="cartesian"&&(n=[Math.fround(i.center[0]),Math.fround(i.center[1]),0],r=i.unprojectPosition(n),n[0]-=t[0],n[1]-=t[1],n[2]-=t[2]);break;case ve.IDENTITY:n=i.position.map(Math.fround),n[2]=n[2]||0;break;case ve.GLOBE:s=!1,r=null;break;default:s=!1}return{geospatialOrigin:r,shaderCoordinateOrigin:n,offsetMode:s}}function _E(i,e,t){const{viewMatrixUncentered:n,projectionMatrix:r}=i;let{viewMatrix:s,viewProjectionMatrix:o}=i,a=Lu,c=Lu,l=i.cameraPosition;const{geospatialOrigin:u,shaderCoordinateOrigin:f,offsetMode:h}=Vd(i,e,t);return h&&(c=i.projectPosition(u||f),l=[l[0]-c[0],l[1]-c[1],l[2]-c[2]],c[3]=1,a=Ei([],c,o),s=n||s,o=Lt([],r,s),o=Lt([],o,dE)),{viewMatrix:s,viewProjectionMatrix:o,projectionCenter:a,originCommon:c,cameraPosCommon:l,shaderCoordinateOrigin:f,geospatialOrigin:u}}function bE({viewport:i,devicePixelRatio:e=1,modelMatrix:t=null,coordinateSystem:n="default",coordinateOrigin:r=Gd,autoWrapLongitude:s=!1}){n==="default"&&(n=i.isGeospatial?"lnglat":"cartesian");const o=mE({viewport:i,devicePixelRatio:e,coordinateSystem:n,coordinateOrigin:r});return o.wrapLongitude=s,o.modelMatrix=t||$d,o}function yE({viewport:i,devicePixelRatio:e,coordinateSystem:t,coordinateOrigin:n}){const{projectionCenter:r,viewProjectionMatrix:s,originCommon:o,cameraPosCommon:a,shaderCoordinateOrigin:c,geospatialOrigin:l}=_E(i,t,n),u=i.getDistanceScales(),f=[i.width*e,i.height*e],h=Ei([],[0,0,-i.focalDistance,1],i.projectionMatrix)[3]||1,g={coordinateSystem:xs(t),projectionMode:i.projectionMode,coordinateOrigin:c,commonOrigin:o.slice(0,3),center:r,pseudoMeters:!!i._pseudoMeters,viewportSize:f,devicePixelRatio:e,focalDistance:h,commonUnitsPerMeter:u.unitsPerMeter,commonUnitsPerWorldUnit:u.unitsPerMeter,commonUnitsPerWorldUnit2:gE,scale:i.scale,wrapLongitude:!1,viewProjectionMatrix:s,modelMatrix:$d,cameraPosition:a};if(l){const p=i.getDistanceScales(l);switch(t){case"meter-offsets":g.commonUnitsPerWorldUnit=p.unitsPerMeter,g.commonUnitsPerWorldUnit2=p.unitsPerMeter2;break;case"lnglat":case"lnglat-offsets":i._pseudoMeters||(g.commonUnitsPerMeter=p.unitsPerMeter),g.commonUnitsPerWorldUnit=p.unitsPerDegree,g.commonUnitsPerWorldUnit2=p.unitsPerDegree2;break;case"cartesian":g.commonUnitsPerWorldUnit=[1,1,p.unitsPerMeter[2]],g.commonUnitsPerWorldUnit2=[0,0,p.unitsPerMeter2[2]];break}}if(i.projectionMode===ve.GLOBE&&t==="meter-offsets"){const _=n[0]*Math.PI/180,y=n[1]*Math.PI/180,w=Math.cos(y),b=((n[2]||0)/6370972+1)*256;g.commonOrigin=[Math.sin(_)*w*b,-Math.cos(_)*w*b,Math.sin(y)*b]}return g}const vE=["default","lnglat","meter-offsets","lnglat-offsets","cartesian"],wE=vE.map(i=>`const COORDINATE_SYSTEM_${i.toUpperCase().replaceAll("-","_")}: i32 = ${xs(i)};`).join(""),xE=Object.keys(ve).map(i=>`const PROJECTION_MODE_${i}: i32 = ${ve[i]};`).join(""),PE=Object.keys(Rt).map(i=>`const UNIT_${i.toUpperCase()}: i32 = ${Rt[i]};`).join(""),EE=`${wE}
${xE}
${PE}

const TILE_SIZE: f32 = 512.0;
const PI: f32 = 3.1415926536;
const WORLD_SCALE: f32 = TILE_SIZE / (PI * 2.0);
const ZERO_64_LOW: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);
const EARTH_RADIUS: f32 = 6370972.0; // meters
const GLOBE_RADIUS: f32 = 256.0;

// -----------------------------------------------------------------------------
// Uniform block (converted from GLSL uniform block)
// -----------------------------------------------------------------------------
struct ProjectUniforms {
  wrapLongitude: i32,
  coordinateSystem: i32,
  commonUnitsPerMeter: vec3<f32>,
  projectionMode: i32,
  scale: f32,
  commonUnitsPerWorldUnit: vec3<f32>,
  commonUnitsPerWorldUnit2: vec3<f32>,
  center: vec4<f32>,
  modelMatrix: mat4x4<f32>,
  viewProjectionMatrix: mat4x4<f32>,
  viewportSize: vec2<f32>,
  devicePixelRatio: f32,
  focalDistance: f32,
  cameraPosition: vec3<f32>,
  coordinateOrigin: vec3<f32>,
  commonOrigin: vec3<f32>,
  pseudoMeters: i32,
};

@group(0) @binding(auto)
var<uniform> project: ProjectUniforms;

// -----------------------------------------------------------------------------
// Geometry data shared across the project helpers.
// The active layer shader is responsible for populating this private module
// state before calling the project functions below.
// -----------------------------------------------------------------------------

// Structure to carry additional geometry data used by deck.gl filters.
struct Geometry {
  worldPosition: vec3<f32>,
  worldPositionAlt: vec3<f32>,
  position: vec4<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  pickingColor: vec3<f32>,
};

var<private> geometry: Geometry;
`,SE=`${EE}

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

// Returns an adjustment factor for commonUnitsPerMeter
fn _project_size_at_latitude(lat: f32) -> f32 {
  let y = clamp(lat, -89.9, 89.9);
  return 1.0 / cos(radians(y));
}

// Overloaded version: scales a value in meters at a given latitude.
fn _project_size_at_latitude_m(meters: f32, lat: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * _project_size_at_latitude(lat);
}

// Computes a non-linear scale factor based on geometry.
// (Note: This function relies on "geometry" being provided.)
fn project_size() -> f32 {
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
      project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
      project.pseudoMeters == 0) {
    if (geometry.position.w == 0.0) {
      return _project_size_at_latitude(geometry.worldPosition.y);
    }
    let y: f32 = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
    let y2 = y * y;
    let y4 = y2 * y2;
    let y6 = y4 * y2;
    return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
  }
  return 1.0;
}

// Overloads to scale offsets (meters to world units)
fn project_size_float(meters: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * project_size();
}

fn project_size_vec2(meters: vec2<f32>) -> vec2<f32> {
  return meters * project.commonUnitsPerMeter.xy * project_size();
}

fn project_size_vec3(meters: vec3<f32>) -> vec3<f32> {
  return meters * project.commonUnitsPerMeter * project_size();
}

fn project_size_vec4(meters: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(meters.xyz * project.commonUnitsPerMeter, meters.w);
}

// Returns a rotation matrix aligning the z‑axis with the given up vector.
fn project_get_orientation_matrix(up: vec3<f32>) -> mat3x3<f32> {
  let uz = normalize(up);
  let ux = select(
    vec3<f32>(1.0, 0.0, 0.0),
    normalize(vec3<f32>(uz.y, -uz.x, 0.0)),
    abs(uz.z) == 1.0
  );
  let uy = cross(uz, ux);
  return mat3x3<f32>(ux, uy, uz);
}

// Since WGSL does not support "out" parameters, we return a struct.
struct RotationResult {
  needsRotation: bool,
  transform: mat3x3<f32>,
};

fn project_needs_rotation(commonPosition: vec3<f32>) -> RotationResult {
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    return RotationResult(true, project_get_orientation_matrix(commonPosition));
  } else {
    return RotationResult(false, mat3x3<f32>());  // identity alternative if needed
  };
}

// Projects a normal vector from the current coordinate system to world space.
fn project_normal(vector: vec3<f32>) -> vec3<f32> {
  let normal_modelspace = project.modelMatrix * vec4<f32>(vector, 0.0);
  var n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
  let rotResult = project_needs_rotation(geometry.position.xyz);
  if (rotResult.needsRotation) {
    n = rotResult.transform * n;
  }
  return n;
}

// Applies a scale offset based on y-offset (dy)
fn project_offset_(offset: vec4<f32>) -> vec4<f32> {
  let dy: f32 = offset.y;
  let commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
  return vec4<f32>(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}

// Projects lng/lat coordinates to a unit tile [0,1]
fn project_mercator_(lnglat: vec2<f32>) -> vec2<f32> {
  var x = lnglat.x;
  if (project.wrapLongitude != 0) {
    x = ((x + 180.0) % 360.0) - 180.0;
  }
  let y = clamp(lnglat.y, -89.9, 89.9);
  return vec2<f32>(
    radians(x) + PI,
    PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
  ) * WORLD_SCALE;
}

// Projects lng/lat/z coordinates for a globe projection.
fn project_globe_(lnglatz: vec3<f32>) -> vec3<f32> {
  let lambda = radians(lnglatz.x);
  let phi = radians(lnglatz.y);
  let cosPhi = cos(phi);
  let D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
  return vec3<f32>(
    sin(lambda) * cosPhi,
    -cos(lambda) * cosPhi,
    sin(phi)
  ) * D;
}

// Projects positions (with an optional 64-bit low part) from the input
// coordinate system to the common space.
fn project_position_vec4_f64(position: vec4<f32>, position64Low: vec3<f32>) -> vec4<f32> {
  var position_world = project.modelMatrix * position;

  // Work around for a Mac+NVIDIA bug:
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_mercator_(position_world.xy),
        _project_size_at_latitude_m(position_world.z, position_world.y),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
      position_world = vec4f(position_world.xyz + project.coordinateOrigin, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_globe_(position_world.xyz),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
      let enuMatrix = project_get_orientation_matrix(project.commonOrigin);
      let metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
      let offsetCommon = (enuMatrix * vec3<f32>(-position_world.x, -position_world.y, position_world.z)) * metersToCommon;
      return vec4<f32>(project.commonOrigin + offsetCommon, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
        return vec4<f32>(
          project_mercator_(position_world.xy) - project.commonOrigin.xy,
          project_size_float(position_world.z),
          position_world.w
        );
      }
    }
  }
  if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
      (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
       (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
        project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
    position_world = vec4f(position_world.xyz - project.coordinateOrigin, position_world.w);
  }

  return project_offset_(position_world) +
         project_offset_(project.modelMatrix * vec4<f32>(position64Low, 0.0));
}

// Overloaded versions for different input types.
fn project_position_vec4_f32(position: vec4<f32>) -> vec4<f32> {
  return project_position_vec4_f64(position, ZERO_64_LOW);
}

fn project_position_vec3_f64(position: vec3<f32>, position64Low: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), position64Low);
  return projected_position.xyz;
}

fn project_position_vec3_f32(position: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), ZERO_64_LOW);
  return projected_position.xyz;
}

fn project_position_vec2_f32(position: vec2<f32>) -> vec2<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 0.0, 1.0), ZERO_64_LOW);
  return projected_position.xy;
}

// Transforms a common space position to clip space.
fn project_common_position_to_clipspace_with_projection(position: vec4<f32>, viewProjectionMatrix: mat4x4<f32>, center: vec4<f32>) -> vec4<f32> {
  var clipPosition = viewProjectionMatrix * position + center;
  // deck.gl projection matrices use WebGL's [-w, w] depth range; WebGPU clips z to [0, w].
  clipPosition.z = (clipPosition.z + clipPosition.w) * 0.5;
  return clipPosition;
}

// Uses the project viewProjectionMatrix and center.
fn project_common_position_to_clipspace(position: vec4<f32>) -> vec4<f32> {
  return project_common_position_to_clipspace_with_projection(position, project.viewProjectionMatrix, project.center);
}

// Returns a clip space offset corresponding to a given number of screen pixels.
fn project_pixel_size_to_clipspace(pixels: vec2<f32>) -> vec2<f32> {
  let offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
  return offset * project.focalDistance;
}

fn project_meter_size_to_pixel(meters: f32) -> f32 {
  return project_size_float(meters) * project.scale;
}

fn project_unit_size_to_pixel(size: f32, unit: i32) -> f32 {
  if (unit == UNIT_METERS) {
    return project_meter_size_to_pixel(size);
  } else if (unit == UNIT_COMMON) {
    return size * project.scale;
  }
  // UNIT_PIXELS: no scaling applied.
  return size;
}

fn project_pixel_size_float(pixels: f32) -> f32 {
  return pixels / project.scale;
}

fn project_pixel_size_vec2(pixels: vec2<f32>) -> vec2<f32> {
  return pixels / project.scale;
}
`,LE=["default","lnglat","meter-offsets","lnglat-offsets","cartesian"],TE=LE.map(i=>`const int COORDINATE_SYSTEM_${i.toUpperCase().replaceAll("-","_")} = ${xs(i)};`).join(""),AE=Object.keys(ve).map(i=>`const int PROJECTION_MODE_${i} = ${ve[i]};`).join(""),CE=Object.keys(Rt).map(i=>`const int UNIT_${i.toUpperCase()} = ${Rt[i]};`).join(""),ME=`${TE}
${AE}
${CE}
layout(std140) uniform projectUniforms {
bool wrapLongitude;
int coordinateSystem;
vec3 commonUnitsPerMeter;
int projectionMode;
float scale;
vec3 commonUnitsPerWorldUnit;
vec3 commonUnitsPerWorldUnit2;
vec4 center;
mat4 modelMatrix;
mat4 viewProjectionMatrix;
vec2 viewportSize;
float devicePixelRatio;
float focalDistance;
vec3 cameraPosition;
vec3 coordinateOrigin;
vec3 commonOrigin;
bool pseudoMeters;
} project;
const float TILE_SIZE = 512.0;
const float PI = 3.1415926536;
const float WORLD_SCALE = TILE_SIZE / (PI * 2.0);
const vec3 ZERO_64_LOW = vec3(0.0);
const float EARTH_RADIUS = 6370972.0;
const float GLOBE_RADIUS = 256.0;
float project_size_at_latitude(float lat) {
float y = clamp(lat, -89.9, 89.9);
return 1.0 / cos(radians(y));
}
float project_size() {
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
project.pseudoMeters == false) {
if (geometry.position.w == 0.0) {
return project_size_at_latitude(geometry.worldPosition.y);
}
float y = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
float y2 = y * y;
float y4 = y2 * y2;
float y6 = y4 * y2;
return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
}
return 1.0;
}
float project_size_at_latitude(float meters, float lat) {
return meters * project.commonUnitsPerMeter.z * project_size_at_latitude(lat);
}
float project_size(float meters) {
return meters * project.commonUnitsPerMeter.z * project_size();
}
vec2 project_size(vec2 meters) {
return meters * project.commonUnitsPerMeter.xy * project_size();
}
vec3 project_size(vec3 meters) {
return meters * project.commonUnitsPerMeter * project_size();
}
vec4 project_size(vec4 meters) {
return vec4(meters.xyz * project.commonUnitsPerMeter, meters.w);
}
mat3 project_get_orientation_matrix(vec3 up) {
vec3 uz = normalize(up);
vec3 ux = abs(uz.z) == 1.0 ? vec3(1.0, 0.0, 0.0) : normalize(vec3(uz.y, -uz.x, 0));
vec3 uy = cross(uz, ux);
return mat3(ux, uy, uz);
}
bool project_needs_rotation(vec3 commonPosition, out mat3 transform) {
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
transform = project_get_orientation_matrix(commonPosition);
return true;
}
return false;
}
vec3 project_normal(vec3 vector) {
vec4 normal_modelspace = project.modelMatrix * vec4(vector, 0.0);
vec3 n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
mat3 rotation;
if (project_needs_rotation(geometry.position.xyz, rotation)) {
n = rotation * n;
}
return n;
}
vec4 project_offset_(vec4 offset) {
float dy = offset.y;
vec3 commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
return vec4(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}
vec2 project_mercator_(vec2 lnglat) {
float x = lnglat.x;
if (project.wrapLongitude) {
x = mod(x + 180., 360.0) - 180.;
}
float y = clamp(lnglat.y, -89.9, 89.9);
return vec2(
radians(x) + PI,
PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
) * WORLD_SCALE;
}
vec3 project_globe_(vec3 lnglatz) {
float lambda = radians(lnglatz.x);
float phi = radians(lnglatz.y);
float cosPhi = cos(phi);
float D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
return vec3(
sin(lambda) * cosPhi,
-cos(lambda) * cosPhi,
sin(phi)
) * D;
}
vec4 project_position(vec4 position, vec3 position64Low) {
vec4 position_world = project.modelMatrix * position;
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_mercator_(position_world.xy),
project_size_at_latitude(position_world.z, position_world.y),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
position_world.xyz += project.coordinateOrigin;
}
}
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_globe_(position_world.xyz),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
mat3 enuMatrix = project_get_orientation_matrix(project.commonOrigin);
float metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
vec3 offsetCommon = (enuMatrix * vec3(-position_world.xy, position_world.z)) * metersToCommon;
return vec4(project.commonOrigin + offsetCommon, position_world.w);
}
}
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
return vec4(
project_mercator_(position_world.xy) - project.commonOrigin.xy,
project_size(position_world.z),
position_world.w
);
}
}
}
if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
(project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
(project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
position_world.xyz -= project.coordinateOrigin;
}
return project_offset_(position_world) + project_offset_(project.modelMatrix * vec4(position64Low, 0.0));
}
vec4 project_position(vec4 position) {
return project_position(position, ZERO_64_LOW);
}
vec3 project_position(vec3 position, vec3 position64Low) {
vec4 projected_position = project_position(vec4(position, 1.0), position64Low);
return projected_position.xyz;
}
vec3 project_position(vec3 position) {
vec4 projected_position = project_position(vec4(position, 1.0), ZERO_64_LOW);
return projected_position.xyz;
}
vec2 project_position(vec2 position) {
vec4 projected_position = project_position(vec4(position, 0.0, 1.0), ZERO_64_LOW);
return projected_position.xy;
}
vec4 project_common_position_to_clipspace(vec4 position, mat4 viewProjectionMatrix, vec4 center) {
return viewProjectionMatrix * position + center;
}
vec4 project_common_position_to_clipspace(vec4 position) {
return project_common_position_to_clipspace(position, project.viewProjectionMatrix, project.center);
}
vec2 project_pixel_size_to_clipspace(vec2 pixels) {
vec2 offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
return offset * project.focalDistance;
}
float project_size_to_pixel(float meters) {
return project_size(meters) * project.scale;
}
vec2 project_size_to_pixel(vec2 meters) {
return project_size(meters) * project.scale;
}
float project_size_to_pixel(float size, int unit) {
if (unit == UNIT_METERS) return project_size_to_pixel(size);
if (unit == UNIT_COMMON) return size * project.scale;
return size;
}
float project_pixel_size(float pixels) {
return pixels / project.scale;
}
vec2 project_pixel_size(vec2 pixels) {
return pixels / project.scale;
}
`,IE={};function RE(i=IE){return"viewport"in i?bE(i):{}}const Ps={name:"project",dependencies:[Lx,Fd],source:SE,vs:ME,getUniforms:RE,uniformTypes:{wrapLongitude:"f32",coordinateSystem:"i32",commonUnitsPerMeter:"vec3<f32>",projectionMode:"i32",scale:"f32",commonUnitsPerWorldUnit:"vec3<f32>",commonUnitsPerWorldUnit2:"vec3<f32>",center:"vec4<f32>",modelMatrix:"mat4x4<f32>",viewProjectionMatrix:"mat4x4<f32>",viewportSize:"vec2<f32>",devicePixelRatio:"f32",focalDistance:"f32",cameraPosition:"vec3<f32>",coordinateOrigin:"vec3<f32>",commonOrigin:"vec3<f32>",pseudoMeters:"f32"}},OE=`// Define a structure to hold both the clip-space position and the common position.
struct ProjectResult {
  clipPosition: vec4<f32>,
  commonPosition: vec4<f32>,
};

// This function mimics the GLSL version with the 'out' parameter by returning both values.
fn project_position_to_clipspace_and_commonspace(
    position: vec3<f32>,
    position64Low: vec3<f32>,
    offset: vec3<f32>
) -> ProjectResult {
  // Compute the projected position.
  let projectedPosition: vec3<f32> = project_position_vec3_f64(position, position64Low);

  // Start with the provided offset.
  var finalOffset: vec3<f32> = offset;

  // Get whether a rotation is needed and the rotation matrix.
  let rotationResult = project_needs_rotation(projectedPosition);

  // If rotation is needed, update the offset.
  if (rotationResult.needsRotation) {
    finalOffset = rotationResult.transform * offset;
  }

  // Compute the common position.
  let commonPosition: vec4<f32> = vec4<f32>(projectedPosition + finalOffset, 1.0);

  // Convert to clip-space.
  let clipPosition: vec4<f32> = project_common_position_to_clipspace(commonPosition);

  return ProjectResult(clipPosition, commonPosition);
}

// A convenience overload that returns only the clip-space position.
fn project_position_to_clipspace(
    position: vec3<f32>,
    position64Low: vec3<f32>,
    offset: vec3<f32>
) -> vec4<f32> {
  return project_position_to_clipspace_and_commonspace(position, position64Low, offset).clipPosition;
}
`,BE=`vec4 project_position_to_clipspace(
  vec3 position, vec3 position64Low, vec3 offset, out vec4 commonPosition
) {
  vec3 projectedPosition = project_position(position, position64Low);
  mat3 rotation;
  if (project_needs_rotation(projectedPosition, rotation)) {
    // offset is specified as ENU
    // when in globe projection, rotate offset so that the ground alighs with the surface of the globe
    offset = rotation * offset;
  }
  commonPosition = vec4(projectedPosition + offset, 1.0);
  return project_common_position_to_clipspace(commonPosition);
}

vec4 project_position_to_clipspace(
  vec3 position, vec3 position64Low, vec3 offset
) {
  vec4 commonPosition;
  return project_position_to_clipspace(position, position64Low, offset, commonPosition);
}
`,Rc={name:"project32",dependencies:[Ps],source:OE,vs:BE};function kE(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function si(i,e){const t=Ei([],e,i);return Lc(t,t,1/t[3]),t}function va(i,e,t){return i<e?e:i>t?t:i}function DE(i){return Math.log(i)*Math.LOG2E}const jd=Math.log2||DE;function nt(i,e){if(!i)throw new Error(e||"@math.gl/web-mercator: assertion failed.")}const ke=Math.PI,Wd=ke/4,Me=ke/180,wa=180/ke,gi=512,Nr=4003e4,Oe=85.051129,FE=1.5;function NE(i){return jd(i)}function Ot(i){const[e,t]=i;nt(Number.isFinite(e)),nt(Number.isFinite(t)&&t>=-90&&t<=90,"invalid latitude");const n=e*Me,r=t*Me,s=gi*(n+ke)/(2*ke),o=gi*(ke+Math.log(Math.tan(Wd+r*.5)))/(2*ke);return[s,o]}function En(i){const[e,t]=i,n=e/gi*(2*ke)-ke,r=2*(Math.atan(Math.exp(t/gi*(2*ke)-ke))-Wd);return[n*wa,r*wa]}function UE(i){const{latitude:e}=i;nt(Number.isFinite(e));const t=Math.cos(e*Me);return NE(Nr*t)-9}function or(i){const e=Math.cos(i*Me);return gi/Nr/e}function xa(i){const{latitude:e,longitude:t,highPrecision:n=!1}=i;nt(Number.isFinite(e)&&Number.isFinite(t));const r=gi,s=Math.cos(e*Me),o=r/360,a=o/s,c=r/Nr/s,l={unitsPerMeter:[c,c,c],metersPerUnit:[1/c,1/c,1/c],unitsPerDegree:[o,a,c],degreesPerUnit:[1/o,1/a,1/c]};if(n){const u=Me*Math.tan(e*Me)/s,f=o*u/2,h=r/Nr*u,g=h/a*c;l.unitsPerDegree2=[0,f,h],l.unitsPerMeter2=[g,0,g]}return l}function Hd(i,e){const[t,n,r]=i,[s,o,a]=e,{unitsPerMeter:c,unitsPerMeter2:l}=xa({longitude:t,latitude:n,highPrecision:!0}),u=Ot(i);u[0]+=s*(c[0]+l[0]*o),u[1]+=o*(c[1]+l[1]*o);const f=En(u),h=(r||0)+(a||0);return Number.isFinite(r)||Number.isFinite(a)?[f[0],f[1],h]:f}function zE(i){const{height:e,pitch:t,bearing:n,altitude:r,scale:s,center:o}=i,a=kE();kr(a,a,[0,0,-r]),wd(a,a,-t*Me),xd(a,a,n*Me);const c=s/e;return Sc(a,a,[c,c,c]),o&&kr(a,a,Ew([],o)),a}function $E(i){const{width:e,height:t,altitude:n,pitch:r=0,offset:s,center:o,scale:a,nearZMultiplier:c=1,farZMultiplier:l=1}=i;let{fovy:u=hn(FE)}=i;n!==void 0&&(u=hn(n));const f=u*Me,h=r*Me,g=Oc(u);let p=g;o&&(p+=o[2]*a/Math.cos(h)/t);const m=f*(.5+(s?s[1]:0)/t),_=Math.sin(m)*p/Math.sin(va(Math.PI/2-h-m,.01,Math.PI-.01)),y=Math.sin(h)*_+p,w=p*10,b=Math.min(y*l,w);return{fov:f,aspect:e/t,focalDistance:g,near:c,far:b}}function hn(i){return 2*Math.atan(.5/i)*wa}function Oc(i){return .5/Math.tan(.5*i*Me)}function Bc(i,e){const[t,n,r=0]=i;return nt(Number.isFinite(t)&&Number.isFinite(n)&&Number.isFinite(r)),si(e,[t,n,r,1])}function kc(i,e,t=0){const[n,r,s]=i;if(nt(Number.isFinite(n)&&Number.isFinite(r),"invalid pixel coordinate"),Number.isFinite(s))return si(e,[n,r,s,1]);const o=si(e,[n,r,0,1]),a=si(e,[n,r,1,1]),c=o[2],l=a[2],u=c===l?0:((t||0)-c)/(l-c);return _d([],o,a,u)}function GE(i){const{width:e,height:t,bounds:n,minExtent:r=0,maxZoom:s=24,offset:o=[0,0]}=i,[[a,c],[l,u]]=n,f=VE(i.padding),h=Ot([a,va(u,-Oe,Oe)]),g=Ot([l,va(c,-Oe,Oe)]),p=[Math.max(Math.abs(g[0]-h[0]),r),Math.max(Math.abs(g[1]-h[1]),r)],m=[e-f.left-f.right-Math.abs(o[0])*2,t-f.top-f.bottom-Math.abs(o[1])*2];nt(m[0]>0&&m[1]>0);const _=m[0]/p[0],y=m[1]/p[1],w=(f.right-f.left)/2/_,b=(f.top-f.bottom)/2/y,x=[(g[0]+h[0])/2+w,(g[1]+h[1])/2+b],S=En(x),L=Math.min(s,jd(Math.abs(Math.min(_,y))));return nt(Number.isFinite(L)),{longitude:S[0],latitude:S[1],zoom:L}}function VE(i=0){return typeof i=="number"?{top:i,bottom:i,left:i,right:i}:(nt(Number.isFinite(i.top)&&Number.isFinite(i.bottom)&&Number.isFinite(i.left)&&Number.isFinite(i.right)),i)}const Tu=Math.PI/180;function jE(i,e=0){const{width:t,height:n,unproject:r}=i,s={targetZ:e},o=r([0,n],s),a=r([t,n],s);let c,l;const u=i.fovy?.5*i.fovy*Tu:Math.atan(.5/i.altitude),f=(90-i.pitch)*Tu;return u>f-.01?(c=Au(i,0,e),l=Au(i,t,e)):(c=r([0,0],s),l=r([t,0],s)),[o,a,l,c]}function Au(i,e,t){const{pixelUnprojectionMatrix:n}=i,r=si(n,[e,0,1,1]),s=si(n,[e,i.height,1,1]),a=(t*i.distanceScales.unitsPerMeter[2]-r[2])/(s[2]-r[2]),c=_d([],r,s,a),l=En(c);return l.push(t),l}const Yd=`
layout(std140) uniform shadowUniforms {
  bool drawShadowMap;
  bool useShadowMap;
  vec4 color;
  highp int lightId;
  float lightCount;
  mat4 viewProjectionMatrix0;
  mat4 viewProjectionMatrix1;
  vec4 projectCenter0;
  vec4 projectCenter1;
} shadow;
`,WE=`
const int max_lights = 2;

out vec3 shadow_vPosition[max_lights];

vec4 shadow_setVertexPosition(vec4 position_commonspace) {
  mat4 viewProjectionMatrices[max_lights];
  viewProjectionMatrices[0] = shadow.viewProjectionMatrix0;
  viewProjectionMatrices[1] = shadow.viewProjectionMatrix1;
  vec4 projectCenters[max_lights];
  projectCenters[0] = shadow.projectCenter0;
  projectCenters[1] = shadow.projectCenter1;

  if (shadow.drawShadowMap) {
    return project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[shadow.lightId], projectCenters[shadow.lightId]);
  }
  if (shadow.useShadowMap) {
    for (int i = 0; i < max_lights; i++) {
      if(i < int(shadow.lightCount)) {
        vec4 shadowMap_position = project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[i], projectCenters[i]);
        shadow_vPosition[i] = (shadowMap_position.xyz / shadowMap_position.w + 1.0) / 2.0;
      }
    }
  }
  return gl_Position;
}
`,HE=`
${Yd}
${WE}
`,YE=`
const int max_lights = 2;
uniform sampler2D shadow_uShadowMap0;
uniform sampler2D shadow_uShadowMap1;

in vec3 shadow_vPosition[max_lights];

const vec4 bitPackShift = vec4(1.0, 255.0, 65025.0, 16581375.0);
const vec4 bitUnpackShift = 1.0 / bitPackShift;
const vec4 bitMask = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0,  0.0);

float shadow_getShadowWeight(vec3 position, sampler2D shadowMap) {
  vec4 rgbaDepth = texture(shadowMap, position.xy);

  float z = dot(rgbaDepth, bitUnpackShift);
  return smoothstep(0.001, 0.01, position.z - z);
}

vec4 shadow_filterShadowColor(vec4 color) {
  if (shadow.drawShadowMap) {
    vec4 rgbaDepth = fract(gl_FragCoord.z * bitPackShift);
    rgbaDepth -= rgbaDepth.gbaa * bitMask;
    return rgbaDepth;
  }
  if (shadow.useShadowMap) {
    float shadowAlpha = 0.0;
    shadowAlpha += shadow_getShadowWeight(shadow_vPosition[0], shadow_uShadowMap0);
    if(shadow.lightCount > 1.0) {
      shadowAlpha += shadow_getShadowWeight(shadow_vPosition[1], shadow_uShadowMap1);
    }
    shadowAlpha *= shadow.color.a / shadow.lightCount;
    float blendedAlpha = shadowAlpha + color.a * (1.0 - shadowAlpha);

    return vec4(
      mix(color.rgb, shadow.color.rgb, shadowAlpha / blendedAlpha),
      blendedAlpha
    );
  }
  return color;
}
`,qE=`
${Yd}
${YE}
`,ZE=Pn(eS),XE=Pn(tS),KE=[0,0,0,1],QE=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0];function JE(i,e){const[t,n,r]=i,s=kc([t,n,r],e);return Number.isFinite(r)?s:[s[0],s[1],0]}function eS({viewport:i,center:e}){return new Ue(i.viewProjectionMatrix).invert().transform(e)}function tS({viewport:i,shadowMatrices:e}){const t=[],n=i.pixelUnprojectionMatrix,r=i.isGeospatial?void 0:1,s=[[0,0,r],[i.width,0,r],[0,i.height,r],[i.width,i.height,r],[0,0,-1],[i.width,0,-1],[0,i.height,-1],[i.width,i.height,-1]].map(o=>JE(o,n));for(const o of e){const a=o.clone().translate(new Qe(i.center).negate()),c=s.map(u=>a.transform(u)),l=new Ue().ortho({left:Math.min(...c.map(u=>u[0])),right:Math.max(...c.map(u=>u[0])),bottom:Math.min(...c.map(u=>u[1])),top:Math.max(...c.map(u=>u[1])),near:Math.min(...c.map(u=>-u[2])),far:Math.max(...c.map(u=>-u[2]))});t.push(l.multiplyRight(o))}return t}function iS(i){const{shadowEnabled:e=!0,project:t}=i;if(!e||!t||!i.shadowMatrices||!i.shadowMatrices.length)return{drawShadowMap:!1,useShadowMap:!1,shadow_uShadowMap0:i.dummyShadowMap,shadow_uShadowMap1:i.dummyShadowMap};const n=Ps.getUniforms(t),r=ZE({viewport:t.viewport,center:n.center}),s=[],o=XE({shadowMatrices:i.shadowMatrices,viewport:t.viewport}).slice();for(let c=0;c<i.shadowMatrices.length;c++){const l=o[c],u=l.clone().translate(new Qe(t.viewport.center).negate());n.coordinateSystem===xs("lnglat")&&n.projectionMode===ve.WEB_MERCATOR?(o[c]=u,s[c]=r):(o[c]=l.clone().multiplyRight(QE),s[c]=u.transform(r))}const a={drawShadowMap:!!i.drawToShadowMap,useShadowMap:i.shadowMaps?i.shadowMaps.length>0:!1,color:i.shadowColor||KE,lightId:i.shadowLightId||0,lightCount:i.shadowMatrices.length,shadow_uShadowMap0:i.dummyShadowMap,shadow_uShadowMap1:i.dummyShadowMap};for(let c=0;c<o.length;c++)a[`viewProjectionMatrix${c}`]=o[c],a[`projectCenter${c}`]=s[c];for(let c=0;c<2;c++)a[`shadow_uShadowMap${c}`]=i.shadowMaps&&i.shadowMaps[c]||i.dummyShadowMap;return a}const Cu={name:"shadow",dependencies:[Ps],vs:HE,fs:qE,inject:{"vs:DECKGL_FILTER_GL_POSITION":`
    position = shadow_setVertexPosition(geometry.position);
    `,"fs:DECKGL_FILTER_COLOR":`
    color = shadow_filterShadowColor(color);
    `},getUniforms:iS,uniformTypes:{drawShadowMap:"f32",useShadowMap:"f32",color:"vec4<f32>",lightId:"i32",lightCount:"f32",viewProjectionMatrix0:"mat4x4<f32>",viewProjectionMatrix1:"mat4x4<f32>",projectCenter0:"vec4<f32>",projectCenter1:"vec4<f32>"}},Ur=10,zr=16777215;function nS(i,e){i.length===Ur?q.warn(`pickMultipleObjects can only exclude ${Ur} previously picked objects for layers without picking buffers`)():i.push(e)}const rS=`  float disabledPickingIndexCount;
  vec4 disabledPickingIndices0;
  vec4 disabledPickingIndices1;
  vec4 disabledPickingIndices2;
`;function Mu(i){return i.replace(`  vec4 highlightColor;
} picking;`,`  vec4 highlightColor;
${rS}} picking;`)}function eo(i,e){return[i[e]||0,i[e+1]||0,i[e+2]||0,i[e+3]||0]}const sS=`vec3 picking_getPickingColorFromIndex(float objectIndex) {
  if (objectIndex < 0.0 || objectIndex >= ${zr}.0) {
    return vec3(0.0);
  }

  for (int i = 0; i < ${Ur}; i++) {
    if (float(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    vec4 disabledIndices = i < 4
      ? picking.disabledPickingIndices0
      : (i < 8 ? picking.disabledPickingIndices1 : picking.disabledPickingIndices2);
    float disabledIndex = disabledIndices[i - (i / 4) * 4];
    if (disabledIndex == objectIndex) {
      return vec3(0.0);
    }
  }

  float encodedIndex = objectIndex + 1.0;
  return vec3(
    mod(encodedIndex, 256.0),
    mod(floor(encodedIndex / 256.0), 256.0),
    mod(floor(encodedIndex / 65536.0), 256.0)
  );
}

vec3 picking_getPickingColorFromIndex(uint objectIndex) {
  return picking_getPickingColorFromIndex(float(objectIndex));
}

vec3 picking_getPickingColorFromInstanceID() {
  return picking_getPickingColorFromIndex(float(gl_InstanceID));
}

void picking_setPickingColorFromInstanceID() {
  picking_setPickingColor(picking_getPickingColorFromInstanceID());
}
`,oS=`struct pickingUniforms {
  isActive: f32,
  isAttribute: f32,
  isHighlightActive: f32,
  useByteColors: f32,
  highlightedObjectColor: vec3<f32>,
  highlightColor: vec4<f32>,
  disabledPickingIndexCount: f32,
  disabledPickingIndices0: vec4<f32>,
  disabledPickingIndices1: vec4<f32>,
  disabledPickingIndices2: vec4<f32>,
};

@group(0) @binding(auto) var<uniform> picking: pickingUniforms;

fn picking_normalizeColor(color: vec3<f32>) -> vec3<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_normalizeColor4(color: vec4<f32>) -> vec4<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_isColorZero(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) < 0.00001;
}

fn picking_isColorValid(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) > 0.00001;
}

fn picking_getPickingColorFromIndex(objectIndex: u32) -> vec3<f32> {
  if (objectIndex >= ${zr}u) {
    return vec3<f32>(0.0);
  }

  for (var i = 0; i < ${Ur}; i = i + 1) {
    if (f32(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    let disabledIndices = select(
      picking.disabledPickingIndices2,
      select(picking.disabledPickingIndices1, picking.disabledPickingIndices0, i < 4),
      i < 8
    );
    let disabledIndex = disabledIndices[i % 4];
    if (disabledIndex == f32(objectIndex)) {
      return vec3<f32>(0.0);
    }
  }

  let encodedIndex = objectIndex + 1u;
  return vec3<f32>(
    f32(encodedIndex % 256u),
    f32((encodedIndex / 256u) % 256u),
    f32((encodedIndex / 65536u) % 256u)
  ) / 255.0;
}
`,Dc={...Wt,vs:`${Mu(Wt.vs)}
${sS}`,fs:Mu(Wt.fs),source:oS,uniformTypes:{...Wt.uniformTypes,disabledPickingIndexCount:"f32",disabledPickingIndices0:"vec4<f32>",disabledPickingIndices1:"vec4<f32>",disabledPickingIndices2:"vec4<f32>"},defaultUniforms:{...Wt.defaultUniforms,useByteColors:!0,disabledPickingIndexCount:0,disabledPickingIndices0:[0,0,0,0],disabledPickingIndices1:[0,0,0,0],disabledPickingIndices2:[0,0,0,0]},getUniforms(i,e){const t=Wt.getUniforms(i),n=i.disabledPickingIndices||[];return t.disabledPickingIndexCount=n.length,t.disabledPickingIndices0=eo(n,0),t.disabledPickingIndices1=eo(n,4),t.disabledPickingIndices2=eo(n,8),t},inject:{"vs:DECKGL_FILTER_GL_POSITION":`
    // for picking depth values
    picking_setPickingAttribute(position.z / position.w);
  `,"vs:DECKGL_FILTER_COLOR":`
  picking_setPickingColor(geometry.pickingColor);
  `,"fs:DECKGL_FILTER_COLOR":{order:99,injection:`
  // use highlight color if this fragment belongs to the selected object.
  color = picking_filterHighlightColor(color);

  // use picking color if rendering to picking FBO.
  color = picking_filterPickingColor(color);
    `}}},aS=[Fd],cS=["vs:DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)","vs:DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)","vs:DECKGL_FILTER_COLOR(inout vec4 color, VertexGeometry geometry)","fs:DECKGL_FILTER_COLOR(inout vec4 color, FragmentGeometry geometry)"],lS=[];function uS(i){const e=pt.getDefaultShaderAssembler(i);for(const n of aS)e.addDefaultModule(n);e._hookFunctions.length=0;const t=i==="glsl"?cS:lS;for(const n of t)e.addShaderHook(n);return e}const fS=[255,255,255],hS=1;let dS=0;class gS{constructor(e={}){this.type="ambient";const{color:t=fS}=e,{intensity:n=hS}=e;this.id=e.id||`ambient-${dS++}`,this.color=t,this.intensity=n}}const pS=[255,255,255],mS=1,_S=[0,0,-1];let bS=0;class Iu{constructor(e={}){this.type="directional";const{color:t=pS}=e,{intensity:n=mS}=e,{direction:r=_S}=e,{_shadow:s=!1}=e;this.id=e.id||`directional-${bS++}`,this.color=t,this.intensity=n,this.type="directional",this.direction=new Qe(r).normalize().toArray(),this.shadow=s}getProjectedLight(e){return this}}class yS{constructor(e,t={id:"pass"}){const{id:n}=t;this.id=n,this.device=e,this.props={...t}}setProps(e){Object.assign(this.props,e)}render(e){}cleanup(){}}const vS={depthWriteEnabled:!0,depthCompare:"less-equal",blendColorOperation:"add",blendColorSrcFactor:"one",blendColorDstFactor:"one-minus-src-alpha",blendAlphaOperation:"add",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one-minus-src-alpha"};class Fc extends yS{constructor(){super(...arguments),this._lastRenderIndex=-1}render(e){this._render(e)}_render(e){const{canvasContext:t=this.device.canvasContext}=e,n=e.target??t.getCurrentFramebuffer(),[r,s]=t.getDrawingBufferSize(),o=e.clearCanvas??!0;let a=e.clearColor??(o?[0,0,0,0]:!1),c=o?1:!1,l=o?0:!1;const u=e.colorMask??15,f={viewport:[0,0,r,s]};e.colorMask&&(f.colorMask=u),e.scissorRect&&(f.scissorRect=e.scissorRect);const{shaderModuleProps:h,viewports:g,views:p,onViewportActive:m,clearStack:_=!0}=e,y=e.pass||"unknown",w=this.device.type==="webgpu";_&&(this._lastRenderIndex=-1);const b=[];if(!g.length)return this.device.beginRenderPass({framebuffer:n,parameters:f,clearColor:a,clearDepth:c,clearStencil:l}).end(),this.device.submit(),b;try{for(const x of g){m==null||m(x);const S=this._getDrawLayerParams(x,e),L=p&&p[x.id],R=x.subViewports||[x],O=w?R.map(B=>[B]):[R];for(const B of O){const k=this.device.beginRenderPass({framebuffer:n,parameters:f,clearColor:a,clearDepth:c,clearStencil:l});try{for(const U of B){const $=this._drawLayersInViewport(k,{target:n,canvasContext:t,shaderModuleProps:h,viewport:U,view:L,pass:y,layers:e.layers,isPicking:e.isPicking},S);b.push($)}}finally{k.end(),w&&this.device.submit()}a=!1,c=!1,l=!1}}return b}finally{w||this.device.submit()}}_getDrawLayerParams(e,{layers:t,pass:n,isPicking:r=!1,layerFilter:s,cullRect:o,views:a,effects:c,canvasContext:l=this.device.canvasContext,shaderModuleProps:u},f=!1){var _,y;const h=[],g=qd(this._lastRenderIndex+1),p={layer:t[0],viewport:e,isPicking:r,renderPass:n,cullRect:o},m={};for(let w=0;w<t.length;w++){const b=t[w],x=this._shouldDrawLayer(b,p,s,m),S={shouldDrawLayer:x};if(x&&!f){S.shouldDrawLayer=!0,S.layerRenderIndex=g(b,x),S.shaderModuleProps=this._getShaderModuleProps(b,c,n,l,u);const L=b.context.device.type==="webgpu"?vS:null;S.layerParameters={...L,...(_=b.context.deck)==null?void 0:_.props.parameters,...(y=a==null?void 0:a[e.id])==null?void 0:y.props.parameters,...this.getLayerParameters(b,w,e)}}h[w]=S}return h}_drawLayersInViewport(e,{layers:t,shaderModuleProps:n,pass:r,target:s,canvasContext:o,viewport:a,view:c,isPicking:l},u){const f=wS(this.device,{canvasContext:o,shaderModuleProps:n,target:s,viewport:a});if(c){const{clear:g,clearColor:p,clearDepth:m,clearStencil:_}=c.props;if(g){let y=[0,0,0,0],w=1,b=0;Array.isArray(p)&&!l?y=[...p.slice(0,3),p[3]||255].map(S=>S/255):p===!1&&(y=!1),m!==void 0&&(w=m),_!==void 0&&(b=_),this.device.beginRenderPass({framebuffer:s,parameters:{viewport:f,scissorRect:f},clearColor:y,clearDepth:w,clearStencil:b}).end()}}const h={totalCount:t.length,visibleCount:0,compositeCount:0,pickableCount:0};e.setParameters({viewport:f});for(let g=0;g<t.length;g++){const p=t[g],m=u[g],{shouldDrawLayer:_}=m;if(_&&p.props.pickable&&h.pickableCount++,p.isComposite&&h.compositeCount++,p.isDrawable&&m.shouldDrawLayer){const{layerRenderIndex:y,shaderModuleProps:w,layerParameters:b}=m;h.visibleCount++,this._lastRenderIndex=Math.max(this._lastRenderIndex,y),w.project&&(w.project.viewport=a),p.context.renderPass=e;try{p._drawLayer({renderPass:e,shaderModuleProps:w,uniforms:{layerIndex:y},parameters:b})}catch(x){p.raiseError(x,`drawing ${p} to ${r}`)}}}return h}shouldDrawLayer(e){return!0}getShaderModuleProps(e,t,n){return null}getLayerParameters(e,t,n){return e.props.parameters}_shouldDrawLayer(e,t,n,r){if(!(e.props.visible&&this.shouldDrawLayer(e)))return!1;t.layer=e;let o=e.parent;for(;o;){if(!o.props.visible||!o.filterSubLayer(t))return!1;t.layer=o,o=o.parent}if(n){const a=t.layer.id;if(a in r||(r[a]=n(t)),!r[a])return!1}return e.activateViewport(t.viewport),!0}_getShaderModuleProps(e,t,n,r,s){var l,u;const o=r.cssToDeviceRatio(),a=((l=e.internalState)==null?void 0:l.propsInTransition)||e.props,c={layer:a,picking:{isActive:!1},project:{viewport:e.context.viewport,devicePixelRatio:o,modelMatrix:a.modelMatrix,coordinateSystem:a.coordinateSystem,coordinateOrigin:a.coordinateOrigin,autoWrapLongitude:e.wrapLongitude}};if(t)for(const f of t)Ru(c,(u=f.getShaderModuleProps)==null?void 0:u.call(f,e,c));for(const f of e.context.defaultShaderModules)f.name in c||(c[f.name]={});return Ru(c,this.getShaderModuleProps(e,t,c),s)}}function qd(i=0,e={}){const t={},n=(r,s)=>{const o=r.props._offset,a=r.id,c=r.parent&&r.parent.id;let l;if(c&&!(c in e)&&n(r.parent,!1),c in t){const u=t[c]=t[c]||qd(e[c],e);l=u(r,s),t[a]=u}else Number.isFinite(o)?(l=o+(e[c]||0),t[a]=null):l=i;return s&&l>=i&&(i=l+1),e[a]=l,l};return n}function wS(i,{canvasContext:e=i.canvasContext,shaderModuleProps:t,target:n,viewport:r}){var l;const s=((l=t==null?void 0:t.project)==null?void 0:l.devicePixelRatio)??e.cssToDeviceRatio(),[,o]=e.getDrawingBufferSize(),a=n?n.height:o,c=r;return[c.x*s,a-(c.y+c.height)*s,c.width*s,c.height*s]}function Ru(i,...e){for(const t of e)if(t)for(const n in t)i[n]?Object.assign(i[n],t[n]):i[n]=t[n];return i}class xS extends Fc{constructor(e,t){super(e,t);const n=e.createTexture({format:"rgba8unorm",width:1,height:1,sampler:{minFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}}),r=e.createTexture({format:"depth16unorm",width:1,height:1});this.fbo=e.createFramebuffer({id:"shadowmap",width:1,height:1,colorAttachments:[n],depthStencilAttachment:r})}delete(){this.fbo&&(this.fbo.destroy(),this.fbo=null)}getShadowMap(){return this.fbo.colorAttachments[0].texture}render(e){const t=this.fbo,n=this.device.canvasContext.cssToDeviceRatio(),r=e.viewports[0],s=r.width*n,o=r.height*n,a=[1,1,1,1];(s!==t.width||o!==t.height)&&t.resize({width:s,height:o}),super.render({...e,clearColor:a,target:t,pass:"shadow"})}getLayerParameters(e,t,n){return{...e.props.parameters,blend:!1,depthWriteEnabled:!0,depthCompare:"less-equal"}}shouldDrawLayer(e){return e.props.shadowEnabled!==!1}getShaderModuleProps(e,t,n){return{shadow:{project:n.project,drawToShadowMap:!0}}}}const PS={color:[255,255,255],intensity:1},Ou=[{color:[255,255,255],intensity:1,direction:[-1,3,-1]},{color:[255,255,255],intensity:.9,direction:[1,-8,-2.5]}],ES=[0,0,0,200/255];class Zd{constructor(e={}){this.id="lighting-effect",this.shadowColor=ES,this.shadow=!1,this.directionalLights=[],this.pointLights=[],this.shadowPasses=[],this.dummyShadowMap=null,this.setProps(e)}setup(e){this.context=e;const{device:t,deck:n}=e;this.shadow&&!this.dummyShadowMap&&(this._createShadowPasses(t),n._addDefaultShaderModule(Cu),this.dummyShadowMap=t.createTexture({width:1,height:1}))}setProps(e){this.ambientLight=void 0,this.directionalLights=[],this.pointLights=[];for(const t in e){const n=e[t];switch(n.type){case"ambient":this.ambientLight=n;break;case"directional":this.directionalLights.push(n);break;case"point":this.pointLights.push(n);break}}this._applyDefaultLights(),this.shadow=this.directionalLights.some(t=>t.shadow),this.context&&this.setup(this.context),this.props=e}preRender({layers:e,layerFilter:t,viewports:n,onViewportActive:r,views:s}){if(this.shadow){this.shadowMatrices=this._calculateMatrices();for(let o=0;o<this.shadowPasses.length;o++)this.shadowPasses[o].render({layers:e,layerFilter:t,viewports:n,onViewportActive:r,views:s,shaderModuleProps:{shadow:{shadowLightId:o,dummyShadowMap:this.dummyShadowMap,shadowMatrices:this.shadowMatrices}}})}}getShaderModuleProps(e,t){const n=this.shadow?{project:t.project,shadowMaps:this.shadowPasses.map(o=>o.getShadowMap()),dummyShadowMap:this.dummyShadowMap,shadowColor:this.shadowColor,shadowMatrices:this.shadowMatrices}:{},r={enabled:!0,lights:this._getLights(e)},s=e.props.material;return{shadow:n,lighting:r,phongMaterial:s,gouraudMaterial:s}}cleanup(e){for(const t of this.shadowPasses)t.delete();this.shadowPasses.length=0,this.dummyShadowMap&&(this.dummyShadowMap.destroy(),this.dummyShadowMap=null,e.deck._removeDefaultShaderModule(Cu))}_calculateMatrices(){const e=[];for(const t of this.directionalLights){const n=new Ue().lookAt({eye:new Qe(t.direction).negate()});e.push(n)}return e}_createShadowPasses(e){for(let t=0;t<this.directionalLights.length;t++){const n=new xS(e);this.shadowPasses[t]=n}}_applyDefaultLights(){const{ambientLight:e,pointLights:t,directionalLights:n}=this;!e&&t.length===0&&n.length===0&&(this.ambientLight=new gS(PS),this.directionalLights.push(new Iu(Ou[0]),new Iu(Ou[1])))}_getLights(e){const t=[];this.ambientLight&&t.push(this.ambientLight);for(const n of this.pointLights)t.push(n.getProjectedLight({layer:e}));for(const n of this.directionalLights)t.push(n.getProjectedLight({layer:e}));return t}}class SS{constructor(e={}){this._pool=[],this.opts={overAlloc:2,poolSize:100},this.setOptions(e)}setOptions(e){Object.assign(this.opts,e)}allocate(e,t,{size:n=1,type:r,padding:s=0,copy:o=!1,initialize:a=!1,maxCount:c}){const l=r||e&&e.constructor||Float32Array,u=t*n+s;if(ArrayBuffer.isView(e)){if(u<=e.length)return e;if(u*e.BYTES_PER_ELEMENT<=e.buffer.byteLength)return new l(e.buffer,0,u)}let f=1/0;c&&(f=c*n+s);const h=this._allocate(l,u,a,f);return e&&o?h.set(e):a||h.fill(0,0,4),this._release(e),h}release(e){this._release(e)}_allocate(e,t,n,r){let s=Math.max(Math.ceil(t*this.opts.overAlloc),1);s>r&&(s=r);const o=this._pool,a=e.BYTES_PER_ELEMENT*s,c=o.findIndex(l=>l.byteLength>=a);if(c>=0){const l=new e(o.splice(c,1)[0],0,s);return n&&l.fill(0),l}return new e(s)}_release(e){if(!ArrayBuffer.isView(e))return;const t=this._pool,{buffer:n}=e,{byteLength:r}=n,s=t.findIndex(o=>o.byteLength>=r);s<0?t.push(n):(s>0||t.length<this.opts.poolSize)&&t.splice(s,0,n),t.length>this.opts.poolSize&&t.shift()}}const pi=new SS;function $i(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function mi(i,e){const t=i%e;return t<0?e+t:t}function LS(i){return[i[12],i[13],i[14]]}function TS(i){return{left:Ht(i[3]+i[0],i[7]+i[4],i[11]+i[8],i[15]+i[12]),right:Ht(i[3]-i[0],i[7]-i[4],i[11]-i[8],i[15]-i[12]),bottom:Ht(i[3]+i[1],i[7]+i[5],i[11]+i[9],i[15]+i[13]),top:Ht(i[3]-i[1],i[7]-i[5],i[11]-i[9],i[15]-i[13]),near:Ht(i[3]+i[2],i[7]+i[6],i[11]+i[10],i[15]+i[14]),far:Ht(i[3]-i[2],i[7]-i[6],i[11]-i[10],i[15]-i[14])}}const Bu=new Qe;function Ht(i,e,t,n){Bu.set(i,e,t);const r=Bu.len();return{distance:n/r,normal:new Qe(-i/r,-e/r,-t/r)}}function AS(i){return i-Math.fround(i)}let Mi;function ar(i,e){const{size:t=1,startIndex:n=0}=e,r=e.endIndex!==void 0?e.endIndex:i.length,s=(r-n)/t;Mi=pi.allocate(Mi,s,{type:Float32Array,size:t*2});let o=n,a=0;for(;o<r;){for(let c=0;c<t;c++){const l=i[o++];Mi[a+c]=l,Mi[a+c+t]=AS(l)}a+=t*2}return Mi.subarray(0,s*t*2)}function CS(i){let e=null,t=!1;for(const n of i)n&&(e?(t||(e=[[e[0][0],e[0][1]],[e[1][0],e[1][1]]],t=!0),e[0][0]=Math.min(e[0][0],n[0][0]),e[0][1]=Math.min(e[0][1],n[0][1]),e[1][0]=Math.max(e[1][0],n[1][0]),e[1][1]=Math.max(e[1][1],n[1][1])):e=n);return e}const MS=Math.PI/180,IS=$i(),ku=[0,0,0],RS={unitsPerMeter:[1,1,1],metersPerUnit:[1,1,1]};function OS({width:i,height:e,orthographic:t,fovyRadians:n,focalDistance:r,padding:s,near:o,far:a}){const c=i/e,l=t?new Ue().orthographic({fovy:n,aspect:c,focalDistance:r,near:o,far:a}):new Ue().perspective({fovy:n,aspect:c,near:o,far:a});if(s){const{left:u=0,right:f=0,top:h=0,bottom:g=0}=s,p=oe((u+i-f)/2,0,i)-i/2,m=oe((h+e-g)/2,0,e)-e/2;l[8]-=p*2/i,l[9]+=m*2/e}return l}class Si{constructor(e={}){this._frustumPlanes={},this.id=e.id||this.constructor.displayName||"viewport",this.x=e.x||0,this.y=e.y||0,this.width=e.width||1,this.height=e.height||1,this.zoom=e.zoom||0,this.padding=e.padding,this.distanceScales=e.distanceScales||RS,this.focalDistance=e.focalDistance||1,this.position=e.position||ku,this.modelMatrix=e.modelMatrix||null;const{longitude:t,latitude:n}=e;this.isGeospatial=Number.isFinite(n)&&Number.isFinite(t),this._initProps(e),this._initMatrices(e),this.equals=this.equals.bind(this),this.project=this.project.bind(this),this.unproject=this.unproject.bind(this),this.projectPosition=this.projectPosition.bind(this),this.unprojectPosition=this.unprojectPosition.bind(this),this.projectFlat=this.projectFlat.bind(this),this.unprojectFlat=this.unprojectFlat.bind(this)}get subViewports(){return null}get metersPerPixel(){return this.distanceScales.metersPerUnit[2]/this.scale}get projectionMode(){return this.isGeospatial?this.zoom<12?ve.WEB_MERCATOR:ve.WEB_MERCATOR_AUTO_OFFSET:ve.IDENTITY}equals(e){return e instanceof Si?this===e?!0:e.width===this.width&&e.height===this.height&&e.scale===this.scale&&e.projectionMode===this.projectionMode&&e.resolution===this.resolution&&ri(e.distanceScales.unitsPerMeter,this.distanceScales.unitsPerMeter)&&ri(e.projectionMatrix,this.projectionMatrix)&&ri(e.viewMatrix,this.viewMatrix):!1}project(e,{topLeft:t=!0}={}){const n=this.projectPosition(e),r=Bc(n,this.pixelProjectionMatrix),[s,o]=r,a=t?o:this.height-o;return e.length===2?[s,a]:[s,a,r[2]]}unproject(e,{topLeft:t=!0,targetZ:n}={}){const[r,s,o]=e,a=t?s:this.height-s,c=n&&n*this.distanceScales.unitsPerMeter[2],l=kc([r,a,o],this.pixelUnprojectionMatrix,c),[u,f,h]=this.unprojectPosition(l);return Number.isFinite(o)?[u,f,h]:Number.isFinite(n)?[u,f,n]:[u,f]}projectPosition(e){const[t,n]=this.projectFlat(e),r=(e[2]||0)*this.distanceScales.unitsPerMeter[2];return[t,n,r]}unprojectPosition(e){const[t,n]=this.unprojectFlat(e),r=(e[2]||0)*this.distanceScales.metersPerUnit[2];return[t,n,r]}projectFlat(e){if(this.isGeospatial){const t=Ot(e);return t[1]=oe(t[1],-318,830),t}return e}unprojectFlat(e){return this.isGeospatial?En(e):e}getBounds(e={}){const t={targetZ:e.z||0},n=this.unproject([0,0],t),r=this.unproject([this.width,0],t),s=this.unproject([0,this.height],t),o=this.unproject([this.width,this.height],t);return[Math.min(n[0],r[0],s[0],o[0]),Math.min(n[1],r[1],s[1],o[1]),Math.max(n[0],r[0],s[0],o[0]),Math.max(n[1],r[1],s[1],o[1])]}getDistanceScales(e){return e&&this.isGeospatial?xa({longitude:e[0],latitude:e[1],highPrecision:!0}):this.distanceScales}containsPixel({x:e,y:t,width:n=1,height:r=1}){return e<this.x+this.width&&this.x<e+n&&t<this.y+this.height&&this.y<t+r}getFrustumPlanes(){return this._frustumPlanes.near?this._frustumPlanes:(Object.assign(this._frustumPlanes,TS(this.viewProjectionMatrix)),this._frustumPlanes)}panByPosition(e,t,n){return null}_initProps(e){const t=e.longitude,n=e.latitude;this.isGeospatial&&(Number.isFinite(e.zoom)||(this.zoom=UE({latitude:n})+Math.log2(this.focalDistance)),this.distanceScales=e.distanceScales||xa({latitude:n,longitude:t}));const r=Math.pow(2,this.zoom);this.scale=r;const{position:s,modelMatrix:o}=e;let a=ku;if(s&&(a=o?new Ue(o).transformAsVector(s,[]):s),this.isGeospatial){const c=this.projectPosition([t,n,0]);this.center=new Qe(a).scale(this.distanceScales.unitsPerMeter).add(c)}else this.center=this.projectPosition(a)}_initMatrices(e){const{viewMatrix:t=IS,projectionMatrix:n=null,orthographic:r=!1,fovyRadians:s,fovy:o=75,near:a=.1,far:c=1e3,padding:l=null,focalDistance:u=1}=e;this.viewMatrixUncentered=t,this.viewMatrix=new Ue().multiplyRight(t).translate(new Qe(this.center).negate()),this.projectionMatrix=n||OS({width:this.width,height:this.height,orthographic:r,fovyRadians:s||o*MS,focalDistance:u,padding:l,near:a,far:c});const f=$i();Lt(f,f,this.projectionMatrix),Lt(f,f,this.viewMatrix),this.viewProjectionMatrix=f,this.viewMatrixInverse=da([],this.viewMatrix)||this.viewMatrix,this.cameraPosition=LS(this.viewMatrixInverse);const h=$i(),g=$i();Sc(h,h,[this.width/2,-this.height/2,1]),kr(h,h,[1,-1,0]),Lt(g,h,this.viewProjectionMatrix),this.pixelProjectionMatrix=g,this.pixelUnprojectionMatrix=da($i(),this.pixelProjectionMatrix),this.pixelUnprojectionMatrix||q.warn("Pixel project matrix not invertible")()}}Si.displayName="Viewport";class it extends Si{constructor(e={}){const{latitude:t=0,longitude:n=0,zoom:r=0,pitch:s=0,bearing:o=0,nearZMultiplier:a=.1,farZMultiplier:c=1.01,nearZ:l,farZ:u,orthographic:f=!1,projectionMatrix:h,repeat:g=!1,worldOffset:p=0,position:m,padding:_,legacyMeterSizes:y=!1}=e;let{width:w,height:b,altitude:x=1.5}=e;const S=Math.pow(2,r);w=w||1,b=b||1;let L,R=null;if(h)x=h[5]/2,L=hn(x);else{e.fovy?(L=e.fovy,x=Oc(L)):L=hn(x);let B;if(_){const{top:k=0,bottom:U=0}=_;B=[0,oe((k+b-U)/2,0,b)-b/2]}R=$E({width:w,height:b,scale:S,center:m&&[0,0,m[2]*or(t)],offset:B,pitch:s,fovy:L,nearZMultiplier:a,farZMultiplier:c}),Number.isFinite(l)&&(R.near=l),Number.isFinite(u)&&(R.far=u)}let O=zE({height:b,pitch:s,bearing:o,scale:S,altitude:x});p&&(O=new Ue().translate([512*p,0,0]).multiplyLeft(O)),super({...e,width:w,height:b,viewMatrix:O,longitude:n,latitude:t,zoom:r,...R,fovy:L,focalDistance:x}),this.latitude=t,this.longitude=n,this.zoom=r,this.pitch=s,this.bearing=o,this.altitude=x,this.fovy=L,this.orthographic=f,this._subViewports=g?[]:null,this._pseudoMeters=y,Object.freeze(this)}get subViewports(){if(this._subViewports&&!this._subViewports.length){const e=this.getBounds(),t=Math.floor((e[0]+180)/360),n=Math.ceil((e[2]-180)/360);for(let r=t;r<=n;r++){const s=r?new it({...this,worldOffset:r}):this;this._subViewports.push(s)}}return this._subViewports}equals(e){return e instanceof it&&e._pseudoMeters===this._pseudoMeters&&super.equals(e)}projectPosition(e){if(this._pseudoMeters)return super.projectPosition(e);const[t,n]=this.projectFlat(e),r=(e[2]||0)*or(e[1]);return[t,n,r]}unprojectPosition(e){if(this._pseudoMeters)return super.unprojectPosition(e);const[t,n]=this.unprojectFlat(e),r=(e[2]||0)/or(n);return[t,n,r]}addMetersToLngLat(e,t){return Hd(e,t)}panByPosition(e,t,n){const r=kc(t,this.pixelUnprojectionMatrix),s=this.projectFlat(e),o=tu([],s,gw([],r)),a=tu([],this.center,o),[c,l]=this.unprojectFlat(a);return{longitude:c,latitude:l}}panByPosition3D(e,t){const n=e[2]||0,r=mw([],e,this.unproject(t,{targetZ:n}));return{longitude:this.longitude+r[0],latitude:this.latitude+r[1]}}getBounds(e={}){const t=jE(this,e.z||0);return[Math.min(t[0][0],t[1][0],t[2][0],t[3][0]),Math.min(t[0][1],t[1][1],t[2][1],t[3][1]),Math.max(t[0][0],t[1][0],t[2][0],t[3][0]),Math.max(t[0][1],t[1][1],t[2][1],t[3][1])]}fitBounds(e,t={}){const{width:n,height:r}=this,{longitude:s,latitude:o,zoom:a}=GE({width:n,height:r,bounds:e,...t});return new it({width:n,height:r,longitude:s,latitude:o,zoom:a})}}it.displayName="WebMercatorViewport";const Du=[0,0,0];function to(i,e,t=!1){const n=e.projectPosition(i);if(t&&e instanceof it){const[r,s,o=0]=i,a=e.getDistanceScales([r,s]);n[2]=o*a.unitsPerMeter[2]}return n}function BS(i){const{viewport:e,modelMatrix:t,coordinateOrigin:n}=i;let{coordinateSystem:r,fromCoordinateSystem:s,fromCoordinateOrigin:o}=i;return r==="default"&&(r=e.isGeospatial?"lnglat":"cartesian"),s===void 0?s=r:s==="default"&&(s=e.isGeospatial?"lnglat":"cartesian"),o===void 0&&(o=n),{viewport:e,coordinateSystem:r,coordinateOrigin:n,modelMatrix:t,fromCoordinateSystem:s,fromCoordinateOrigin:o}}function Nc(i,{viewport:e,modelMatrix:t,coordinateSystem:n,coordinateOrigin:r,offsetMode:s}){let[o,a,c=0]=i;switch(t&&([o,a,c]=Ei([],[o,a,c,1],t)),n){case"default":return Nc(i,{viewport:e,modelMatrix:t,coordinateSystem:e.isGeospatial?"lnglat":"cartesian",coordinateOrigin:r,offsetMode:s});case"lnglat":return to([o,a,c],e,s);case"lnglat-offsets":return to([o+r[0],a+r[1],c+(r[2]||0)],e,s);case"meter-offsets":return to(Hd(r,[o,a,c]),e,s);case"cartesian":return e.isGeospatial?[o+r[0],a+r[1],c+r[2]]:e.projectPosition([o,a,c]);default:throw new Error(`Invalid coordinateSystem: ${n}`)}}function kS(i,e){const{viewport:t,coordinateSystem:n,coordinateOrigin:r,modelMatrix:s,fromCoordinateSystem:o,fromCoordinateOrigin:a}=BS(e),{autoOffset:c=!0}=e,{geospatialOrigin:l=Du,shaderCoordinateOrigin:u=Du,offsetMode:f=!1}=c?Vd(t,n,r):{},h=Nc(i,{viewport:t,modelMatrix:s,coordinateSystem:o,coordinateOrigin:a,offsetMode:f});if(f){const g=t.projectPosition(l||u);vd(h,h,g)}return h}const io={};function Sn(i="id"){io[i]=io[i]||1;const e=io[i]++;return`${i}-${e}`}class Bt{constructor(e){d(this,"id");d(this,"topology");d(this,"vertexCount");d(this,"indices");d(this,"attributes");d(this,"bufferLayout");d(this,"userData",{});const{attributes:t={},indices:n=null,vertexCount:r=null}=e;this.id=e.id||Sn("geometry"),this.topology=e.topology,n&&(this.indices=ArrayBuffer.isView(n)?{value:n,size:1}:n),this.attributes={};for(const[s,o]of Object.entries(t)){const a=ArrayBuffer.isView(o)?{value:o}:o;if(!ArrayBuffer.isView(a.value))throw new Error(`${this._print(s)}: must be typed array or object with value as typed array`);if((s==="POSITION"||s==="positions")&&!a.size&&(a.size=3),s==="indices"){if(this.indices)throw new Error("Multiple indices detected");this.indices=a}else{const c=dn(s),l=Object.keys(this.attributes).find(u=>dn(u)===c);l&&delete this.attributes[l],this.attributes[s]=a}}this.indices&&this.indices.isIndexed!==void 0&&(this.indices=Object.assign({},this.indices),delete this.indices.isIndexed),this.vertexCount=r||this._calculateVertexCount(this.attributes,this.indices),this.bufferLayout=e.bufferLayout||DS(this.attributes)}getVertexCount(){return this.vertexCount}getAttributes(){return this.indices?{indices:this.indices,...this.attributes}:this.attributes}_print(e){return`Geometry ${this.id} attribute ${e}`}_setAttributes(e,t){return this}_calculateVertexCount(e,t){if(t)return t.value.length;let n=1/0;for(const r of Object.values(e)){if(!r)continue;const{value:s,size:o,constant:a}=r;!a&&s&&o!==void 0&&o>=1&&(n=Math.min(n,s.length/o))}return n}}function dn(i){switch(i){case"POSITION":return"positions";case"NORMAL":return"normals";case"TEXCOORD_0":return"texCoords";case"TEXCOORD_1":return"texCoords1";case"COLOR_0":return"colors";default:return i}}function DS(i){const e=[];for(const[t,n]of Object.entries(i)){if(!n)continue;const{value:r,size:s,normalized:o}=n;if(s===void 0)throw new Error(`Attribute ${t} is missing a size`);e.push({name:dn(t),format:be.getVertexFormatFromAttribute(r,s,o)})}return e}function cr(i,e={}){const t=e.bufferName||"geometry";if(FS(i,t))return i;const n=e.minAttributeAlignment||4,r=NS(i,e.attributes),s=[];let o=0,a=1/0;for(const[u,f]of r){if(!f)continue;if(f.constant)throw new Error(`Attribute ${u} is constant`);const{value:h,size:g,normalized:p}=f;if(!ArrayBuffer.isView(h))throw new Error(`Attribute ${u} is missing typed array data`);if(g===void 0)throw new Error(`Attribute ${u} is missing a size`);const m=be.getVertexFormatFromAttribute(h,g,p),_=be.getVertexFormatInfo(m);o=Fu(o,n),s.push({sourceName:u,attributeName:dn(u),value:h,size:g,format:m,byteOffset:o,byteLength:_.byteLength}),o+=_.byteLength;const y=h.length/g;if(!Number.isInteger(y))throw new Error(`Attribute ${u} length is not divisible by size`);a=Math.min(a,y)}if(s.length===0||!Number.isFinite(a))throw new Error(`Geometry ${i.id} has no interleavable attributes`);const c=Fu(o,n),l=new ArrayBuffer(a*c);for(const u of s)US(l,a,c,u);return new Bt({id:i.id,topology:i.topology||"triangle-list",vertexCount:i.vertexCount,indices:i.indices,attributes:{[t]:{value:new Uint8Array(l),size:c,byteStride:c}},bufferLayout:[{name:t,stepMode:"vertex",byteStride:c,attributes:s.map(u=>({attribute:u.attributeName,format:u.format,byteOffset:u.byteOffset}))}]})}function FS(i,e){var n;if(i.bufferLayout.length!==1)return!1;const t=i.bufferLayout[0];return t.name===e&&!!((n=t.attributes)!=null&&n.length)&&!!i.attributes[e]}function NS(i,e){return e?e.map(t=>[t,i.attributes[t]]):Object.entries(i.attributes)}function US(i,e,t,n){const r=n.value.constructor,s=r.BYTES_PER_ELEMENT;if(n.byteOffset%s!==0||t%s!==0)throw new Error(`Attribute ${n.sourceName} is not aligned to its component type`);const o=new r(i),a=n.value,c=n.byteOffset/s,l=t/s;for(let u=0;u<e;u++){const f=u*n.size,h=u*l+c;for(let g=0;g<n.size;g++)o[h+g]=a[f+g]}}function Fu(i,e){return Math.ceil(i/e)*e}let zS=1,$S=1;class Xd{constructor(){d(this,"time",0);d(this,"channels",new Map);d(this,"animations",new Map);d(this,"playing",!1);d(this,"lastEngineTime",-1)}addChannel(e){const{delay:t=0,duration:n=Number.POSITIVE_INFINITY,rate:r=1,repeat:s=1}=e,o=zS++,a={time:0,delay:t,duration:n,rate:r,repeat:s};return this._setChannelTime(a,this.time),this.channels.set(o,a),o}removeChannel(e){this.channels.delete(e);for(const[t,n]of this.animations)n.channel===e&&this.detachAnimation(t)}isFinished(e){const t=this.channels.get(e);return t===void 0?!1:this.time>=t.delay+t.duration*t.repeat}getTime(e){if(e===void 0)return this.time;const t=this.channels.get(e);return t===void 0?-1:t.time}setTime(e){this.time=Math.max(0,e);const t=this.channels.values();for(const r of t)this._setChannelTime(r,this.time);const n=this.animations.values();for(const r of n){const{animation:s,channel:o}=r;s.setTime(this.getTime(o))}}play(){this.playing=!0}pause(){this.playing=!1,this.lastEngineTime=-1}reset(){this.setTime(0)}attachAnimation(e,t){const n=$S++;return this.animations.set(n,{animation:e,channel:t}),e.setTime(this.getTime(t)),n}detachAnimation(e){this.animations.delete(e)}update(e){this.playing&&(this.lastEngineTime===-1&&(this.lastEngineTime=e),this.setTime(this.time+(e-this.lastEngineTime)),this.lastEngineTime=e)}_setChannelTime(e,t){const n=t-e.delay,r=e.duration*e.repeat;n>=r?e.time=e.duration*e.rate:(e.time=Math.max(0,n)%e.duration,e.time*=e.rate)}}function GS(i){const e=typeof window<"u"?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame:null;return e?e.call(window,i):setTimeout(()=>i(typeof performance<"u"?performance.now():Date.now()),1e3/60)}function VS(i){const e=typeof window<"u"?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame:null;if(e){e.call(window,i);return}clearTimeout(i)}let jS=0;const WS="Animation Loop",Nu={requestAnimationFrame:i=>GS(i),cancelAnimationFrame:i=>VS(i)},rn=class rn{constructor(e){d(this,"device",null);d(this,"canvas",null);d(this,"props");d(this,"animationProps",null);d(this,"timeline",null);d(this,"stats");d(this,"sharedStats");d(this,"cpuTime");d(this,"gpuTime");d(this,"frameRate");d(this,"display");d(this,"_needsRedraw","initialized");d(this,"_initialized",!1);d(this,"_running",!1);d(this,"_animationFrameId",null);d(this,"_nextFramePromise",null);d(this,"_resolveNextFrame",null);d(this,"_cpuStartTime",0);d(this,"_error",null);d(this,"_lastFrameTime",0);if(this.props={...rn.defaultAnimationLoopProps,...e},e=this.props,!e.device)throw new Error("No device provided");this.stats=e.stats||new hs({id:`animation-loop-${jS++}`}),this.sharedStats=Zo.stats.get(WS),this.frameRate=this.stats.get("Frame Rate"),this.frameRate.setSampleSize(1),this.cpuTime=this.stats.get("CPU Time"),this.gpuTime=this.stats.get("GPU Time"),this.setProps({autoResizeViewport:e.autoResizeViewport,animationFrameProvider:e.animationFrameProvider}),this.start=this.start.bind(this),this.stop=this.stop.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onMouseleave=this._onMouseleave.bind(this)}destroy(){var e;this.stop(),this._setDisplay(null),(e=this.device)==null||e._disableDebugGPUTime()}delete(){this.destroy()}reportError(e){this._error=e,this.props.onError(e),this.props.onError===rn.defaultAnimationLoopProps.onError&&typeof window<"u"&&typeof ErrorEvent<"u"&&window.dispatchEvent(new ErrorEvent("error",{error:e,message:e.message}))}setNeedsRedraw(e){return this._needsRedraw=this._needsRedraw||e,this}needsRedraw(){const e=this._needsRedraw;return this._needsRedraw=!1,e}setProps(e){if("autoResizeViewport"in e&&(this.props.autoResizeViewport=e.autoResizeViewport||!1),"animationFrameProvider"in e){const t=e.animationFrameProvider||Nu;if(t!==this.props.animationFrameProvider){const n=this._animationFrameId!==null;n&&this._cancelAnimationFrame(),this.props.animationFrameProvider=t,n&&this._requestAnimationFrame()}}return this}async start(){if(this._running)return this;this._running=!0;try{let e;if(!this._initialized){if(this._initialized=!0,await this._initDevice(),this._initialize(),!this._running)return null;await this.props.onInitialize(this._getAnimationProps())}return this._running?(e!==!1&&(this._cancelAnimationFrame(),this._requestAnimationFrame()),this):null}catch(e){const t=e instanceof Error?e:new Error("Unknown error");throw this.props.onError(t),t}}stop(){if(this._running){const e=this.animationProps;this._cancelAnimationFrame(),this._nextFramePromise=null,this._resolveNextFrame=null,this._running=!1,this._lastFrameTime=0,e&&this.props.onFinalize(e)}return this}redraw(e,t=null){var n;return(n=this.device)!=null&&n.isLost||this._error?this:(this._beginFrameTimers(e),this._setupFrame(),this.animationProps&&(this.animationProps.animationFrame=t),this._updateAnimationProps(),this._renderFrame(this._getAnimationProps()),this._clearNeedsRedraw(),this._resolveNextFrame&&(this._resolveNextFrame(this),this._nextFramePromise=null,this._resolveNextFrame=null),this._endFrameTimers(),this)}attachTimeline(e){return this.timeline=e,this.timeline}detachTimeline(){this.timeline=null}waitForRender(){return this.setNeedsRedraw("waitForRender"),this._nextFramePromise||(this._nextFramePromise=new Promise(e=>{this._resolveNextFrame=e})),this._nextFramePromise}async toDataURL(){if(this.setNeedsRedraw("toDataURL"),await this.waitForRender(),this.canvas instanceof HTMLCanvasElement)return this.canvas.toDataURL();throw new Error("OffscreenCanvas")}_initialize(){var e;this._startEventHandling(),this._initializeAnimationProps(),this._updateAnimationProps(),this._resizeViewport(),(e=this.device)==null||e._enableDebugGPUTime()}_setDisplay(e){this.display&&(this.display.destroy(),this.display.animationLoop=null),e&&(e.animationLoop=this),this.display=e}_requestAnimationFrame(){this._running&&(this._animationFrameId=this.props.animationFrameProvider.requestAnimationFrame(this._animationFrame.bind(this)))}_cancelAnimationFrame(){this._animationFrameId!==null&&(this.props.animationFrameProvider.cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null)}_animationFrame(e,t){if(this._running)try{this.redraw(e,t??null),this._requestAnimationFrame()}catch(n){const r=n instanceof Error?n:new Error(String(n));this.reportError(r),this.stop()}}_renderFrame(e){if(this.display){this.display._renderFrame(e);return}const t=this.props.onRender(this._getAnimationProps());this.device&&t!==!1&&this.device.submit()}_clearNeedsRedraw(){this._needsRedraw=!1}_setupFrame(){this._resizeViewport()}_initializeAnimationProps(){var r;const e=(r=this.device)==null?void 0:r.getDefaultCanvasContext();if(!this.device||!e)throw new Error("loop");const t=e==null?void 0:e.canvas,n=e.props.useDevicePixels;this.animationProps={animationLoop:this,device:this.device,canvasContext:e,canvas:t,useDevicePixels:n,timeline:this.timeline,needsRedraw:!1,width:1,height:1,aspect:1,time:0,startTime:Date.now(),engineTime:0,tick:0,tock:0,animationFrame:null,_mousePosition:null}}_getAnimationProps(){if(!this.animationProps)throw new Error("animationProps");return this.animationProps}_updateAnimationProps(){if(!this.animationProps)return;const{width:e,height:t,aspect:n}=this._getSizeAndAspect();(e!==this.animationProps.width||t!==this.animationProps.height)&&this.setNeedsRedraw("drawing buffer resized"),n!==this.animationProps.aspect&&this.setNeedsRedraw("drawing buffer aspect changed"),this.animationProps.width=e,this.animationProps.height=t,this.animationProps.aspect=n,this.animationProps.needsRedraw=this._needsRedraw,this.animationProps.engineTime=Date.now()-this.animationProps.startTime,this.timeline&&this.timeline.update(this.animationProps.engineTime),this.animationProps.tick=Math.floor(this.animationProps.time/1e3*60),this.animationProps.tock++,this.animationProps.time=this.timeline?this.timeline.getTime():this.animationProps.engineTime}async _initDevice(){if(this.device=await this.props.device,!this.device)throw new Error("No device provided");this.canvas=this.device.getDefaultCanvasContext().canvas||null}_createInfoDiv(){if(this.canvas&&this.props.onAddHTML){const e=document.createElement("div");document.body.appendChild(e),e.style.position="relative";const t=document.createElement("div");t.style.position="absolute",t.style.left="10px",t.style.bottom="10px",t.style.width="300px",t.style.background="white",this.canvas instanceof HTMLCanvasElement&&e.appendChild(this.canvas),e.appendChild(t);const n=this.props.onAddHTML(t);n&&(t.innerHTML=n)}}_getSizeAndAspect(){if(!this.device)return{width:1,height:1,aspect:1};const[e,t]=this.device.getDefaultCanvasContext().getDrawingBufferSize(),n=e>0&&t>0?e/t:1;return{width:e,height:t,aspect:n}}_resizeViewport(){this.props.autoResizeViewport&&this.device.gl&&this.device.gl.viewport(0,0,this.device.gl.drawingBufferWidth,this.device.gl.drawingBufferHeight)}_beginFrameTimers(e){var n;const t=e??(typeof performance<"u"?performance.now():Date.now());if(this._lastFrameTime){const r=t-this._lastFrameTime;r>0&&this.frameRate.addTime(r)}this._lastFrameTime=t,(n=this.device)!=null&&n._isDebugGPUTimeEnabled()&&this._consumeEncodedGpuTime(),this.cpuTime.timeStart()}_endFrameTimers(){var e;(e=this.device)!=null&&e._isDebugGPUTimeEnabled()&&this._consumeEncodedGpuTime(),this.cpuTime.timeEnd(),this._updateSharedStats()}_consumeEncodedGpuTime(){if(!this.device)return;const e=this.device.commandEncoder._gpuTimeMs;e!==void 0&&(this.gpuTime.addTime(e),this.device.commandEncoder._gpuTimeMs=void 0)}_updateSharedStats(){if(this.stats!==this.sharedStats){for(const e of Object.keys(this.sharedStats.stats))this.stats.stats[e]||delete this.sharedStats.stats[e];this.stats.forEach(e=>{const t=this.sharedStats.get(e.name,e.type);t.sampleSize=e.sampleSize,t.time=e.time,t.count=e.count,t.samples=e.samples,t.lastTiming=e.lastTiming,t.lastSampleTime=e.lastSampleTime,t.lastSampleCount=e.lastSampleCount,t._count=e._count,t._time=e._time,t._samples=e._samples,t._startTime=e._startTime,t._timerPending=e._timerPending})}}_startEventHandling(){this.canvas&&(this.canvas.addEventListener("mousemove",this._onMousemove.bind(this)),this.canvas.addEventListener("mouseleave",this._onMouseleave.bind(this)))}_onMousemove(e){e instanceof MouseEvent&&(this._getAnimationProps()._mousePosition=[e.offsetX,e.offsetY])}_onMouseleave(e){this._getAnimationProps()._mousePosition=null}};d(rn,"defaultAnimationLoopProps",{device:null,onAddHTML:()=>"",onInitialize:async()=>null,onRender:()=>{},onFinalize:()=>{},onError:e=>{console.error(e)},stats:void 0,autoResizeViewport:!1,animationFrameProvider:Nu});let Pa=rn;class Uu{constructor(e){d(this,"id");d(this,"userData",{});d(this,"topology");d(this,"bufferLayout",[]);d(this,"vertexCount");d(this,"indices");d(this,"attributes");if(this.id=e.id||Sn("geometry"),this.topology=e.topology,this.indices=e.indices||null,this.attributes=e.attributes,this.vertexCount=e.vertexCount,this.bufferLayout=e.bufferLayout||[],this.indices&&!(this.indices.usage&j.INDEX))throw new Error("Index buffer must have INDEX usage")}destroy(){var e;(e=this.indices)==null||e.destroy();for(const t of Object.values(this.attributes))t.destroy()}getVertexCount(){return this.vertexCount}getAttributes(){return this.attributes}getIndexes(){return this.indices||null}_calculateVertexCount(e){return e.byteLength/12}}function HS(i,e){if(e instanceof Uu)return e;const t=cr(e),n=YS(i,t),{attributes:r,bufferLayout:s}=qS(i,t);return new Uu({topology:t.topology||"triangle-list",bufferLayout:s,vertexCount:t.vertexCount,indices:n,attributes:r})}function YS(i,e){if(!e.indices)return;const t=e.indices.value;return i.createBuffer({usage:j.INDEX,data:t})}function qS(i,e){var n;const t={};for(const[r,s]of Object.entries(e.attributes)){const o=((n=e.bufferLayout.find(a=>a.name===r))==null?void 0:n.name)||dn(r);s&&(t[o]=i.createBuffer({data:s.value,id:`${r}-buffer`}))}return{attributes:t,bufferLayout:e.bufferLayout,vertexCount:e.vertexCount}}function ZS(i,e){var r;const t={},n="Values";if(i.attributes.length===0&&!((r=i.varyings)!=null&&r.length))return{"No attributes or varyings":{[n]:"N/A"}};for(const s of i.attributes)if(s){const o=`${s.location} ${s.name}: ${s.type}`;t[`in ${o}`]={[n]:s.stepMode||"vertex"}}for(const s of i.varyings||[]){const o=`${s.location} ${s.name}`;t[`out ${o}`]={[n]:JSON.stringify(s)}}return t}const Vn="__debugFramebufferState",no=8;function XS(i,e,t){if(i.device.type!=="webgl")return;const n=JS(i.device);if(!n.flushing){if(t2(i)){KS(i,t,n);return}e&&e2(e)&&e.handle!==null&&(n.queuedFramebuffers.includes(e)||n.queuedFramebuffers.push(e))}}function KS(i,e,t){if(t.queuedFramebuffers.length===0)return;const n=i.device,{gl:r}=n,s=r.getParameter(36010),o=r.getParameter(36006),[a,c]=i.device.getDefaultCanvasContext().getDrawingBufferSize();let l=zu(e.top,no);const u=zu(e.left,no);t.flushing=!0;try{for(const f of t.queuedFramebuffers){const[h,g,p,m,_]=QS({framebuffer:f,targetWidth:a,targetHeight:c,topPx:l,leftPx:u,minimap:e.minimap});r.bindFramebuffer(36008,f.handle),r.bindFramebuffer(36009,null),r.blitFramebuffer(0,0,f.width,f.height,h,g,p,m,16384,9728),l+=_+no}}finally{r.bindFramebuffer(36008,s),r.bindFramebuffer(36009,o),t.flushing=!1}}function QS(i){const{framebuffer:e,targetWidth:t,targetHeight:n,topPx:r,leftPx:s}=i,o=Math.max(Math.floor(t/4),1),a=Math.max(Math.floor(n/4),1),c=Math.min(o/e.width,a/e.height),l=Math.max(Math.floor(e.width*c),1),u=Math.max(Math.floor(e.height*c),1),f=s,h=Math.max(n-r-u,0),g=f+l,p=h+u;return[f,h,g,p,u]}function JS(i){var e;return(e=i.userData)[Vn]||(e[Vn]={flushing:!1,queuedFramebuffers:[]}),i.userData[Vn]}function e2(i){return"colorAttachments"in i}function t2(i){const e=i.props.framebuffer;return!e||e.handle===null}function zu(i,e){if(!i)return e;const t=Number.parseInt(i,10);return Number.isFinite(t)?t:e}function qi(i,e,t){if(i===e)return!0;if(!t||!i||!e)return!1;if(Array.isArray(i)){if(!Array.isArray(e)||i.length!==e.length)return!1;for(let n=0;n<i.length;n++)if(!qi(i[n],e[n],t-1))return!1;return!0}if(Array.isArray(e))return!1;if(typeof i=="object"&&typeof e=="object"){const n=Object.keys(i),r=Object.keys(e);if(n.length!==r.length)return!1;for(const s of n)if(!e.hasOwnProperty(s)||!qi(i[s],e[s],t-1))return!1;return!0}return!1}class ro{constructor(e){d(this,"bufferLayouts");this.bufferLayouts=e}getBufferLayout(e){return this.bufferLayouts.find(t=>t.name===e)||null}getAttributeNamesForBuffer(e){return la(e)}mergeBufferLayouts(e,t){const n=[...e];for(const r of t){const s=n.findIndex(o=>o.name===r.name);s<0?n.push(r):n[s]=r}return n}}function i2(i,e){const t=mv(i),n=e.slice();return n.sort((r,s)=>{const o=$l(la(r).map(c=>t[c])),a=$l(la(s).map(c=>t[c]));return o-a}),n}function $r(i,e){if(!i||!e.some(n=>{var r;return(r=n.bindingLayout)==null?void 0:r.length}))return i;const t={...i,bindings:i.bindings.map(n=>({...n}))};"attributes"in(i||{})&&(t.attributes=(i==null?void 0:i.attributes)||[]);for(const n of e)for(const r of n.bindingLayout||[])for(const s of s2(r.name)){const o=t.bindings.find(a=>a.name===s);(o==null?void 0:o.group)===0&&(o.group=r.group),o&&r.visibility!==void 0&&(o.visibility=r.visibility)}return t}function n2(i,e,t=[]){return i?e?{...i,attributes:i.attributes.length?c2(i.attributes,e.attributes.filter(n=>t.includes(n.name))):e.attributes,bindings:a2(i.bindings,e.bindings)}:i:e}function Uc(i){return!!(i.uniformTypes&&!o2(i.uniformTypes))}function r2(i){const e=[];for(const t of i){const n=gc(t),r=new Set([t.vs,t.fs].flatMap(o=>o?pc(o).filter(a=>a.isStd140).map(a=>a.blockName):[])),s=r.has(n)?n:r.size===1?r.values().next().value:void 0;Uc(t)&&s&&e.push({name:s,uniformTypes:t.uniformTypes})}return e}function Kd(i,e){const t=[],n=new Set;for(const r of[...i||[],...e||[]])n.has(r.name)||(n.add(r.name),t.push(r));return t}function s2(i){const e=new Set([i,`${i}Uniforms`]);return i.endsWith("Uniforms")||e.add(`${i}Sampler`),[...e]}function o2(i){for(const e in i)return!1;return!0}function a2(i,e){const t=i.map(s=>({...s})),n=new Set(i.map(s=>s.name)),r=new Set(i.map(s=>`${s.group}:${s.location}`));for(const s of e){const o=`${s.group}:${s.location}`;!n.has(s.name)&&!r.has(o)&&t.push({...s})}return t}function c2(i,e){const t=i.map(s=>({...s})),n=new Map(i.map(s=>[s.name,s])),r=new Map(i.map(s=>[s.location,s]));for(const s of e){const o=n.get(s.name);if(o){if(o.type!==s.type||o.location!==s.location)throw new Error(`Shader attribute "${s.name}" conflicts with its inferred type or location`);continue}const a=r.get(s.location);if(a)throw new Error(`Shader attributes "${a.name}" and "${s.name}" both use location ${s.location}`);t.push({...s})}return t}function l2(i){return Ch(i)||typeof i=="number"||typeof i=="boolean"}function u2(i,e={}){const t={bindings:{},uniforms:{}};return Object.keys(i).forEach(n=>{const r=i[n];Object.prototype.hasOwnProperty.call(e,n)||l2(r)?t.uniforms[n]=r:t.bindings[n]=r}),t}class Qd{constructor(e,t){d(this,"options",{disableWarnings:!1});d(this,"modules");d(this,"moduleUniforms");d(this,"moduleBindings");d(this,"directBindings",{});Object.assign(this.options,t);const n=Er(Object.values(e).filter(f2));for(const r of n)e[r.name]=r;T.log(1,"Creating ShaderInputs with modules",Object.keys(e))(),this.modules=e,this.moduleUniforms={},this.moduleBindings={};for(const[r,s]of Object.entries(e))s&&(this._addModule(s),s.name&&r!==s.name&&!this.options.disableWarnings&&T.warn(`Module name: ${r} vs ${s.name}`)())}destroy(){}setProps(e){var t;e.bindings&&Object.assign(this.directBindings,e.bindings);for(const n of Object.keys(e)){if(n==="bindings")continue;const r=n,s=e[r]||{},o=this.modules[r];if(!o)this.options.disableWarnings||T.warn(`Module ${n} not found`)();else{const a=this.moduleUniforms[r],c=this.moduleBindings[r],l=((t=o.getUniforms)==null?void 0:t.call(o,s,a))||s,{uniforms:u,bindings:f}=u2(l,o.uniformTypes);this.moduleUniforms[r]=$u(a,u,o.uniformTypes),this.moduleBindings[r]={...c,...f}}}}getModules(){return Object.values(this.modules)}addModules(e){const t=Er(e);for(const n of t){const r=n.name;this.modules[r]||(this.modules[r]=n,this._addModule(n))}}getUniformValues(){return this.moduleUniforms}getBindingValues(){const e={};for(const t of Object.values(this.moduleBindings))Object.assign(e,t);return Object.assign(e,this.directBindings),e}getModuleBindingValues(e){const t=this.moduleBindings[e];return t?{...t}:{}}getDebugTable(){var t;const e={};for(const[n,r]of Object.entries(this.moduleUniforms))for(const[s,o]of Object.entries(r))e[`${n}.${s}`]={type:(t=this.modules[n].uniformTypes)==null?void 0:t[s],value:String(o)};return e}_addModule(e){const t=e.name;this.moduleUniforms[t]=$u({},e.defaultUniforms||{},e.uniformTypes),this.moduleBindings[t]={}}}function $u(i={},e={},t={}){const n={...i};for(const[r,s]of Object.entries(e))s!==void 0&&(n[r]=Ea(i[r],s,t[r]));return n}function Ea(i,e,t){if(!t||typeof t=="string")return Zi(e);if(Array.isArray(t)){if(Sa(e)||!Array.isArray(e))return Zi(e);const o=Array.isArray(i)&&!Sa(i)?[...i]:[],a=o.slice();for(let c=0;c<e.length;c++){const l=e[c];l!==void 0&&(a[c]=Ea(o[c],l,t[0]))}return a}if(!La(e))return Zi(e);const n=t,r=La(i)?i:{},s={...r};for(const[o,a]of Object.entries(e))a!==void 0&&(s[o]=Ea(r[o],a,n[o]));return s}function Zi(i){return ArrayBuffer.isView(i)?Array.prototype.slice.call(i):Array.isArray(i)?Sa(i)?i.slice():i.map(t=>t===void 0?void 0:Zi(t)):La(i)?Object.fromEntries(Object.entries(i).map(([e,t])=>[e,t===void 0?void 0:Zi(t)])):i}function Sa(i){return ArrayBuffer.isView(i)||Array.isArray(i)&&(i.length===0||typeof i[0]=="number")}function La(i){return!!i&&typeof i=="object"&&!Array.isArray(i)&&!ArrayBuffer.isView(i)}function f2(i){return!!(i!=null&&i.dependencies)}const h2=j.DEBUG_DATA_MAX_LENGTH;class He{constructor(e,t){d(this,"device");d(this,"id");d(this,"ready");d(this,"usage");d(this,"props");d(this,"isReady",!0);d(this,"destroyed",!1);d(this,"generation",0);d(this,"updateTimestamp");d(this,"debugData",new ArrayBuffer(0));d(this,"_debugDataEnabled");d(this,"_maxDebugDataByteLength");d(this,"_ownsBuffer");d(this,"_buffer");const{debugData:n=!1,buffer:r,ownsBuffer:s=!0,...o}=t;if(r&&r.device!==e)throw new Error("DynamicBuffer adopted buffers must belong to the supplied device");if(r&&(o.byteLength!==void 0||o.data!==void 0))throw new Error("DynamicBuffer cannot combine an adopted buffer with byteLength or data");const a=t.id||(r==null?void 0:r.id)||Sn("dynamic-buffer"),c={...o,id:a,usage:o.usage??(r==null?void 0:r.usage),indexType:o.indexType??(r==null?void 0:r.indexType)};(c.usage||0)&j.INDEX&&!c.indexType&&(o.data instanceof Uint32Array?c.indexType="uint32":o.data instanceof Uint16Array?c.indexType="uint16":o.data instanceof Uint8Array&&(c.indexType="uint8")),delete c.data,delete c.byteOffset,this.device=e,this.id=a,this.props=c,this.usage=c.usage||0,this._debugDataEnabled=!!n,this._maxDebugDataByteLength=typeof n=="object"&&n.maxByteLength!==void 0?n.maxByteLength:h2,this._ownsBuffer=s,this._buffer=r??this.device.createBuffer({...o,id:a}),this.ready=Promise.resolve(this._buffer),this.updateTimestamp=this._buffer.updateTimestamp,this._resetDebugData(this._buffer.byteLength),o.data&&this._writeDebugData(o.data,o.byteOffset||0)}get buffer(){return this._buffer}get byteLength(){return this._buffer.byteLength}get[Symbol.toStringTag](){return"DynamicBuffer"}toString(){return`DynamicBuffer:"${this.id}":${this.byteLength}B`}toJSON(){return this.toString()}write(e,t=0){this._buffer.write(e,t),this._touch(),this._writeDebugData(e,t)}async mapAndWriteAsync(e,t=0,n=this.byteLength-t){let r=null;await this._buffer.mapAndWriteAsync(async(s,o)=>{await e(s,o),r=new Uint8Array(s.slice(0,n))},t,n),this._touch(),r&&this._writeDebugData(r,t)}async readAsync(e=0,t=this.byteLength-e){const n=await this._buffer.readAsync(e,t);return this._writeDebugData(n,e)&&this._touch(),n}async mapAndReadAsync(e,t=0,n=this.byteLength-t){let r=null;const s=await this._buffer.mapAndReadAsync(async(o,a)=>(r=new Uint8Array(o.slice(0)),await e(o,a)),t,n);return r&&this._writeDebugData(r,t)&&this._touch(),s}resize(e){const{byteLength:t,preserveData:n=!1}=e;if(t===this.byteLength)return!1;const r=Math.min(e.copyByteLength??Math.min(this.byteLength,t),this.byteLength,t),s=this._buffer,o=this.debugData.slice(0),{data:a,byteOffset:c,...l}=this.props,u=this.device.createBuffer({...l,byteLength:t});return n&&r>0&&this._copyBufferContents(s,u,r),this._buffer=u,this._resetDebugData(t),n&&o.byteLength>0&&this._writeDebugData(o,0),this._ownsBuffer&&s.destroy(),this._ownsBuffer=!0,this.generation++,this._touch(),!0}ensureSize(e,t){return e<=this.byteLength?!1:this.resize({byteLength:e,preserveData:t==null?void 0:t.preserveData})}getBinding(e){return(e==null?void 0:e.offset)===void 0&&(e==null?void 0:e.size)===void 0?this._buffer:{buffer:this._buffer,offset:e==null?void 0:e.offset,size:e==null?void 0:e.size}}destroy(){this.destroyed||(this._ownsBuffer&&this._buffer.destroy(),this.destroyed=!0,this.debugData=new ArrayBuffer(0))}_copyBufferContents(e,t,n){const r=this.device.type==="webgpu"?Math.ceil(n/4)*4:n,s=this.device.createCommandEncoder();s.copyBufferToBuffer({sourceBuffer:e,destinationBuffer:t,size:r}),this.device.submit(s.finish())}_touch(){this.updateTimestamp=this.device.incrementTimestamp()}_resetDebugData(e){if(!this._debugDataEnabled){this.debugData=new ArrayBuffer(0);return}this.debugData=new ArrayBuffer(Math.min(e,this._maxDebugDataByteLength))}_writeDebugData(e,t){if(!this._debugDataEnabled||this.debugData.byteLength===0||t>=this.debugData.byteLength)return!1;const n=ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),r=new Uint8Array(this.debugData),s=Math.min(n.byteLength,r.byteLength-t);return r.set(n.subarray(0,s),t),s>0}}function Jd(i){return i!==null&&typeof i=="object"&&"buffer"in i}function d2(i){return i instanceof He?i.buffer:i}function g2(i){return{buffer:d2(i.buffer),offset:i.offset,size:i.size}}function lr(i){return i!==null&&typeof i=="object"&&"resolveTextureBinding"in i&&typeof i.resolveTextureBinding=="function"}function p2(i){return(i==null?void 0:i.type)==="texture"||(i==null?void 0:i.type)==="external-texture"}function m2(i,e,t){const n=Kh(i,e,{ignoreWarnings:!0});return p2(n)?n:i.bindings.length===0&&(t==null?void 0:t.fallbackGroup)!==void 0?{type:"texture",name:e,group:t.fallbackGroup,location:0}:null}const Ge=2,_2=1e4,so="render pipeline initialization failed",b2=["stencil8","depth16unorm","depth24plus","depth24plus-stencil8","depth32float","depth32float-stencil8"],sn=class sn{constructor(e,t){d(this,"device");d(this,"id");d(this,"source");d(this,"vs");d(this,"fs");d(this,"pipelineFactory");d(this,"shaderFactory");d(this,"userData",{});d(this,"parameters");d(this,"topology");d(this,"bufferLayout");d(this,"isInstanced");d(this,"instanceCount",0);d(this,"vertexCount");d(this,"indexCount");d(this,"firstVertex");d(this,"firstIndex");d(this,"indexBuffer",null);d(this,"bufferAttributes",{});d(this,"constantAttributes",{});d(this,"bindings",{});d(this,"vertexArray");d(this,"transformFeedback",null);d(this,"pipeline");d(this,"shaderInputs");d(this,"material",null);d(this,"_uniformStore");d(this,"_attributeInfos",{});d(this,"_gpuGeometry",null);d(this,"props");d(this,"_dynamicIndexBufferSource",null);d(this,"_dynamicAttributeBufferSources",{});d(this,"_colorAttachmentFormats");d(this,"_depthStencilAttachmentFormat");d(this,"_pipelineNeedsUpdate","newly created");d(this,"_needsRedraw","initializing");d(this,"_drawBlockedReason",!1);d(this,"_destroyed",!1);d(this,"_vertexCountSet",!1);d(this,"_lastDrawTimestamp",-1);d(this,"_bindingTable",[]);d(this,"_lastLogTime",0);d(this,"_logOpen",!1);d(this,"_drawCount",0);var g;const n=sn.defaultProps.shaderAssembler,r=t.vertexCount!==void 0;this.props={...sn.defaultProps,...t,shaderAssembler:t.shaderAssembler??(oo(n,e.info.shadingLanguage)?n:pt.getDefaultShaderAssembler(e.info.shadingLanguage))},this._vertexCountSet=r,t=this.props,this.id=t.id||Sn("model"),this.device=e,Object.assign(this.userData,t.userData),this.material=t.material||null;const s=P2(e),o=od(this.props.plugins,s.shaderLanguage),a=ad(this.props.modules,o.modules),c=Object.fromEntries(a.map(p=>[p.name,p])),l=t.shaderInputs||new Qd(c,{disableWarnings:this.props.disableWarnings});t.shaderInputs&&o.modules.length>0&&l.addModules(o.modules),this.setShaderInputs(l);const u=Kd(this.props.modules,l.getModules()),f={...o.defines,...this.props.defines};if(this.device.type==="webgl"&&(this.props._uniformBlockLayouts=r2(u)),this.props.shaderLayout=$r(this.props.shaderLayout,u)||null,this.device.type==="webgpu"&&this.props.source){const p=this.props.shaderAssembler;cn(oo(p,"wgsl"));const{source:m,getUniforms:_,bindingTable:y,shaderLayout:w}=p.assembleWGSLShader({platformInfo:s,...this.props,modules:u,defines:f,pluginInjections:o.injections,pluginVertexInputs:o.vertexInputs,pluginVaryings:o.varyings});this.source=m,this._getModuleUniforms=_,this._bindingTable=y;const b=w??((g=e.getShaderLayout)==null?void 0:g.call(e,this.source)),x=y2(b,o.vertexInputs),S=n2(this.props.shaderLayout,x,Object.keys(o.vertexInputs));this.props.shaderLayout=$r(S||null,u)||null}else{const p=this.props.shaderAssembler;cn(oo(p,"glsl"));const{vs:m,fs:_,getUniforms:y}=p.assembleGLSLShaderPair({platformInfo:s,...this.props,modules:u,defines:f,pluginInjections:o.injections,pluginVertexInputs:o.vertexInputs,pluginVaryings:o.varyings});this.vs=m,this.fs=_,this._getModuleUniforms=y,this._bindingTable=[]}this.vertexCount=this.props.vertexCount,this.indexCount=this.props.indexCount,this.firstVertex=this.props.firstVertex,this.firstIndex=this.props.firstIndex,this.instanceCount=this.props.instanceCount,this.topology=this.props.topology,this.bufferLayout=this.props.bufferLayout,this.parameters=this.props.parameters,this._colorAttachmentFormats=this.props.colorAttachmentFormats,this._depthStencilAttachmentFormat=this.props.depthStencilAttachmentFormat,t.geometry&&this.setGeometry(t.geometry),this.pipelineFactory=t.pipelineFactory||Mr.getDefaultPipelineFactory(this.device),this.shaderFactory=t.shaderFactory||Ir.getDefaultShaderFactory(this.device),this.pipeline=this._updatePipeline(),this.vertexArray=e.createVertexArray({shaderLayout:this.pipeline.shaderLayout,bufferLayout:this.pipeline.bufferLayout}),this._gpuGeometry&&this._setGeometryAttributes(this._gpuGeometry),"isInstanced"in t&&(this.isInstanced=t.isInstanced),t.instanceCount&&this.setInstanceCount(t.instanceCount),t.vertexCount&&this.setVertexCount(t.vertexCount),t.indexBuffer&&this.setIndexBuffer(t.indexBuffer),t.attributes&&this.setAttributes(t.attributes),t.constantAttributes&&this.setConstantAttributes(t.constantAttributes),t.bindings&&this.setBindings(t.bindings),t.transformFeedback&&(this.transformFeedback=t.transformFeedback)}get[Symbol.toStringTag](){return"Model"}toString(){return`Model(${this.id})`}destroy(){var e;this._destroyed||(this.pipelineFactory.release(this.pipeline),this.shaderFactory.release(this.pipeline.vs),this.pipeline.fs&&this.pipeline.fs!==this.pipeline.vs&&this.shaderFactory.release(this.pipeline.fs),this._uniformStore.destroy(),(e=this._gpuGeometry)==null||e.destroy(),this._destroyed=!0)}needsRedraw(){this._getBindingsUpdateTimestamp()>this._lastDrawTimestamp&&this.setNeedsRedraw("contents of bound textures or buffers updated");const e=this._needsRedraw;return this._needsRedraw=!1,e}setNeedsRedraw(e){this._needsRedraw||(this._needsRedraw=e)}getBindingDebugTable(){return this._bindingTable}predraw(e){var t;this._syncDynamicBuffers(),this.updateShaderInputs(e),(t=this.material)==null||t.updateShaderInputs(e),this.pipeline=this._updatePipeline()}draw(e){var s;if(this._drawBlockedReason&&!this._pipelineNeedsUpdate)return T.info(Ge,`>>> DRAWING ABORTED ${this.id}: ${this._drawBlockedReason}`)(),!1;const t=this._areBindingsLoading();if(t)return T.info(Ge,`>>> DRAWING ABORTED ${this.id}: ${t} not loaded`)(),!1;this._syncAttachmentFormats(e);try{e.pushDebugGroup(`${this}.predraw(${e})`),this.device.type==="webgpu"?(this.updateShaderInputs(),(s=this.material)==null||s.updateShaderInputs(),this._syncDynamicBuffers(),this.pipeline=this._updatePipeline()):this.predraw(this.device.commandEncoder)}finally{e.popDebugGroup()}let n,r=this.pipeline.isErrored;try{if(e.pushDebugGroup(`${this}.draw(${e})`),this._logDrawCallStart(),this.pipeline=this._updatePipeline(),r=this.pipeline.isErrored,r)T.info(Ge,`>>> DRAWING ABORTED ${this.id}: ${so}`)(),n=!1;else{const o=this.vertexArray.getDrawValidationError();if(o)T.info(Ge,`>>> DRAWING ABORTED ${this.id}: ${o}`)(),this._drawBlockedReason=o,n=!1;else{const a=this._getCurrentShaderLayout(),c=this._getBindings(a),l=this._getBindGroups(a,c),{indexBuffer:u}=this.vertexArray,f=u?this.indexCount??(this._vertexCountSet?this.vertexCount:u.byteLength/(u.indexType==="uint32"?4:2)):void 0;e.setPipeline(this.pipeline),e.setBindings(l,{_bindGroupCacheKeys:this._getBindGroupCacheKeys()}),e.setVertexArray(this.vertexArray),n=this.isInstanced===!0&&this.instanceCount===0?!0:e.draw({isInstanced:this.isInstanced,vertexCount:this.vertexCount,instanceCount:this.isInstanced?this.instanceCount:void 0,indexCount:f,firstVertex:this.firstVertex,firstIndex:this.firstIndex,transformFeedback:this.transformFeedback||void 0,uniforms:this.props.uniforms,parameters:this.parameters,topology:this.topology})}}}finally{e.popDebugGroup(),this._logDrawCallEnd()}return this._logFramebuffer(e),n?(this._lastDrawTimestamp=this.device.timestamp,this._needsRedraw=!1):r?(this._needsRedraw=so,this._drawBlockedReason=so):this._drawBlockedReason?this._needsRedraw=this._drawBlockedReason:this._needsRedraw="waiting for resource initialization",n}setGeometry(e){var n;(n=this._gpuGeometry)==null||n.destroy();const t=e&&HS(this.device,e);if(t){this.setTopology(t.topology||"triangle-list");const r=new ro(this.bufferLayout);this.bufferLayout=r.mergeBufferLayouts(t.bufferLayout,this.bufferLayout),this.vertexArray&&this._setGeometryAttributes(t)}this._gpuGeometry=t}setTopology(e){e!==this.topology&&(this.topology=e,this._setPipelineNeedsUpdate("topology"))}setBufferLayout(e){const t=new ro(this.bufferLayout),n=this._gpuGeometry?t.mergeBufferLayouts(e,this._gpuGeometry.bufferLayout):e;qi(n,this.bufferLayout,-1)||(this.bufferLayout=n,this._setPipelineNeedsUpdate("bufferLayout"),this.pipeline=this._updatePipeline(),this.vertexArray=this.device.createVertexArray({shaderLayout:this.pipeline.shaderLayout,bufferLayout:this.pipeline.bufferLayout}),this._gpuGeometry&&this._setGeometryAttributes(this._gpuGeometry))}setParameters(e){qi(e,this.parameters,2)||(this.parameters=e,this._setPipelineNeedsUpdate("parameters"))}setInstanceCount(e){this.instanceCount=e,this.isInstanced===void 0&&e>0&&(this.isInstanced=!0),this.setNeedsRedraw("instanceCount")}setVertexCount(e){this.vertexCount=e,this._vertexCountSet=!0,this.setNeedsRedraw("vertexCount")}setIndexCount(e){this.indexCount=e,this.setNeedsRedraw("indexCount")}setDrawOffsets({firstVertex:e,firstIndex:t}){this.firstVertex=e,this.firstIndex=t,this.setNeedsRedraw("drawOffsets")}setShaderInputs(e){var t;this.shaderInputs=e,this._uniformStore=new rd(this.device,this.shaderInputs.modules);for(const[n,r]of Object.entries(this.shaderInputs.modules))if(Uc(r)&&!((t=this.material)!=null&&t.ownsModule(n))){const s=this._uniformStore.getManagedUniformBuffer(n);this.bindings[`${n}Uniforms`]=s}this.setNeedsRedraw("shaderInputs")}setMaterial(e){this.material=e,this.setNeedsRedraw("material")}updateShaderInputs(e){this._uniformStore.setUniforms(this.shaderInputs.getUniformValues(),e),this.setBindings(this._getNonMaterialBindings(this.shaderInputs.getBindingValues())),this.setNeedsRedraw("shaderInputs")}setBindings(e){Object.assign(this.bindings,e),this.setNeedsRedraw("bindings")}setTransformFeedback(e){this.transformFeedback=e,this.setNeedsRedraw("transformFeedback")}setIndexBuffer(e){const t=e instanceof He?e.buffer:e;this.indexBuffer=t,this._dynamicIndexBufferSource=e instanceof He?{source:e,generation:e.generation}:null,this.vertexArray.setIndexBuffer(t),this.setNeedsRedraw("indexBuffer")}setAttributes(e,t){this._drawBlockedReason=!1;const n=(t==null?void 0:t.disableWarnings)??this.props.disableWarnings;e.indices&&T.warn(`Model:${this.id} setAttributes() - indexBuffer should be set using setIndexBuffer()`)(),this.bufferLayout=i2(this.pipeline.shaderLayout,this.bufferLayout);const r=new ro(this.bufferLayout);for(const[s,o]of Object.entries(e)){const a=o instanceof He?o.buffer:o,c=r.getBufferLayout(s);if(!c){n||T.warn(`Model(${this.id}): Missing layout for buffer "${s}".`)();continue}const l=r.getAttributeNamesForBuffer(c);let u=!1;for(const f of l){const h=this._attributeInfos[f];if(h){const g=this.device.type==="webgpu"?this.vertexArray.getBufferSlot(h.bufferName):h.location;if(g===null){n||T.warn(`Model(${this.id}): Missing vertex array slot for buffer "${h.bufferName}".`)();continue}this.vertexArray.setBuffer(g,a),o instanceof He?this._dynamicAttributeBufferSources[g]={source:o,generation:o.generation}:delete this._dynamicAttributeBufferSources[g],u=!0}}!u&&!n&&T.warn(`Model(${this.id}): Ignoring buffer "${a.id}" for unknown attribute "${s}"`)()}this.setNeedsRedraw("attributes")}setConstantAttributes(e,t){for(const[n,r]of Object.entries(e)){const s=this._attributeInfos[n];s?this.vertexArray.setConstantWebGL(s.location,r):((t==null?void 0:t.disableWarnings)??this.props.disableWarnings)||T.warn(`Model "${this.id}: Ignoring constant supplied for unknown attribute "${n}"`)()}this.setNeedsRedraw("constants")}_areBindingsLoading(){var e;for(const t of Object.values(this.bindings))if(lr(t)&&!t.isReady)return t.id;for(const t of Object.values(((e=this.material)==null?void 0:e.bindings)||{}))if(lr(t)&&!t.isReady)return t.id;return!1}_getBindings(e=this._getCurrentShaderLayout()){const t={};for(const[n,r]of Object.entries(this.bindings)){const s=v2(n,r,e);s&&(t[n]=s)}return t}_getBindGroups(e=this._getCurrentShaderLayout(),t=this._getBindings(e)){const n=e.bindings.length?uc(e,t):{0:t};if(!this.material)return n;for(const[r,s]of Object.entries(this.material.getBindingsByGroup(e))){const o=Number(r);n[o]={...n[o]||{},...s}}return n}_getBindGroupCacheKeys(){var t;const e=(t=this.material)==null?void 0:t.getBindGroupCacheKey(3);return e?{3:e}:{}}_getBindingsUpdateTimestamp(){var t;let e=0;this._dynamicIndexBufferSource&&(e=Math.max(e,this._dynamicIndexBufferSource.source.updateTimestamp));for(const n of Object.values(this._dynamicAttributeBufferSources))e=Math.max(e,n.source.updateTimestamp);for(const n of Object.values(this.bindings))n instanceof Tr?e=Math.max(e,n.texture.updateTimestamp):n instanceof j||n instanceof he||n instanceof Jo||n instanceof He?e=Math.max(e,n.updateTimestamp):lr(n)?e=n.isReady?Math.max(e,n.updateTimestamp):1/0:Jd(n)&&(e=Math.max(e,(n.buffer instanceof He,n.buffer.updateTimestamp)));return Math.max(e,((t=this.material)==null?void 0:t.getBindingsUpdateTimestamp())||0)}_setGeometryAttributes(e){const t={...e.attributes};for(const[n]of Object.entries(t))!this.pipeline.shaderLayout.attributes.find(r=>r.name===n)&&n!=="positions"&&delete t[n];this.vertexCount=e.vertexCount,this._vertexCountSet=!0,this.setIndexBuffer(e.indices||null),this.setAttributes(e.attributes,{disableWarnings:!0}),this.setAttributes(t,{disableWarnings:this.props.disableWarnings}),this.setNeedsRedraw("geometry attributes")}_setPipelineNeedsUpdate(e){this._pipelineNeedsUpdate||(this._pipelineNeedsUpdate=e),this._drawBlockedReason=!1,this.setNeedsRedraw(e)}_updatePipeline(){if(this._pipelineNeedsUpdate){let e=null,t=null;this.pipeline&&(T.log(1,`Model ${this.id}: Recreating pipeline because "${this._pipelineNeedsUpdate}".`)(),e=this.pipeline.vs,t=this.pipeline.fs),this._pipelineNeedsUpdate=!1;const n=this.shaderFactory.createShader({id:`${this.id}-vertex`,stage:"vertex",source:this.source||this.vs,debugShaders:this.props.debugShaders});let r=null;this.source?r=n:this.fs&&(r=this.shaderFactory.createShader({id:`${this.id}-fragment`,stage:"fragment",source:this.source||this.fs,debugShaders:this.props.debugShaders})),this.pipeline=this.pipelineFactory.createRenderPipeline({...this.props,bindings:void 0,bufferLayout:this.bufferLayout,colorAttachmentFormats:this._colorAttachmentFormats,depthStencilAttachmentFormat:this._depthStencilAttachmentFormat,topology:this.topology,parameters:this.parameters,bindGroups:void 0,vs:n,fs:r}),this._attributeInfos=sd(this.pipeline.shaderLayout,this.bufferLayout),e&&this.shaderFactory.release(e),t&&t!==e&&this.shaderFactory.release(t)}return this.pipeline}_logDrawCallStart(){const e=T.level>3?0:_2;T.level<2||Date.now()-this._lastLogTime<e||(this._lastLogTime=Date.now(),this._logOpen=!0,T.group(Ge,`>>> DRAWING MODEL ${this.id}`,{collapsed:T.level<=2})())}_logDrawCallEnd(){if(this._logOpen){const e=ZS(this.pipeline.shaderLayout,this.id);T.table(Ge,e)();const t=this.shaderInputs.getDebugTable();T.table(Ge,t)();const n=this._getAttributeDebugTable();T.table(Ge,this._attributeInfos)(),T.table(Ge,n)(),T.groupEnd(Ge)(),this._logOpen=!1}}_logFramebuffer(e){const t=this.device.props.debugFramebuffers;if(this._drawCount++,!t)return;const n=e.props.framebuffer;XS(e,n,{id:(n==null?void 0:n.id)||`${this.id}-framebuffer`,minimap:!0})}_getAttributeDebugTable(){const e={};for(const[t,n]of Object.entries(this._attributeInfos)){const r=this.vertexArray.attributes[n.location];e[n.location]={name:t,type:n.shaderType,values:r?this._getBufferOrConstantValues(r,n.bufferDataType):"null"}}if(this.vertexArray.indexBuffer){const{indexBuffer:t}=this.vertexArray,n=t.indexType==="uint32"?new Uint32Array(t.debugData):new Uint16Array(t.debugData);e.indices={name:"indices",type:t.indexType,values:n.toString()}}return e}_getBufferOrConstantValues(e,t){const n=Ke.getTypedArrayConstructor(t);return(e instanceof j?new n(e.debugData):e).toString()}_getNonMaterialBindings(e){if(!this.material)return e;const t={};for(const[n,r]of Object.entries(e))this.material.ownsBinding(n)||(t[n]=r);return t}_getCurrentShaderLayout(){var e;return((e=this.pipeline)==null?void 0:e.shaderLayout)||this.props.shaderLayout||{bindings:[]}}_syncDynamicBuffers(){if(this._dynamicIndexBufferSource&&this._dynamicIndexBufferSource.generation!==this._dynamicIndexBufferSource.source.generation){const e=this._dynamicIndexBufferSource.source.buffer;this.indexBuffer=e,this.vertexArray.setIndexBuffer(e),this._dynamicIndexBufferSource.generation=this._dynamicIndexBufferSource.source.generation,this.setNeedsRedraw("dynamic index buffer")}for(const[e,t]of Object.entries(this._dynamicAttributeBufferSources))t.generation!==t.source.generation&&(this.vertexArray.setBuffer(Number(e),t.source.buffer),t.generation=t.source.generation,this.setNeedsRedraw("dynamic attribute buffer"))}_syncAttachmentFormats(e){var o,a,c;if(this.device.type!=="webgpu")return;const t=e.framebuffer||e.props.framebuffer,n=e.props,r=n.colorAttachmentFormats??((o=t==null?void 0:t.colorAttachments)==null?void 0:o.map(l=>{var u;return w2((u=l==null?void 0:l.texture)==null?void 0:u.format)})),s=n.depthStencilAttachmentFormat===!1?void 0:n.depthStencilAttachmentFormat??x2((c=(a=t==null?void 0:t.depthStencilAttachment)==null?void 0:a.texture)==null?void 0:c.format);(!qi(this._colorAttachmentFormats,r,1)||this._depthStencilAttachmentFormat!==s)&&(this._colorAttachmentFormats=r,this._depthStencilAttachmentFormat=s,this._setPipelineNeedsUpdate("attachment formats"))}};d(sn,"defaultProps",{...ct.defaultProps,source:void 0,vs:null,fs:null,id:"unnamed",handle:void 0,userData:{},defines:{},modules:[],plugins:[],geometry:null,indexBuffer:null,indexCount:void 0,firstVertex:0,firstIndex:0,attributes:{},constantAttributes:{},bindings:{},uniforms:{},varyings:[],isInstanced:void 0,instanceCount:0,vertexCount:0,shaderInputs:void 0,material:void 0,pipelineFactory:void 0,shaderFactory:void 0,transformFeedback:void 0,shaderAssembler:pt.getDefaultShaderAssembler("glsl"),debugShaders:void 0,disableWarnings:void 0});let Fe=sn;function oo(i,e){return i.shaderLanguage!==void 0&&i.shaderLanguage!==e?!1:e==="glsl"?"assembleGLSLShaderPair"in i&&typeof i.assembleGLSLShaderPair=="function":"assembleWGSLShader"in i&&typeof i.assembleWGSLShader=="function"}function y2(i,e){return!i||Object.keys(e).length===0?i:{...i,attributes:i.attributes.map(t=>{const n=t.name.startsWith("_luma_")?t.name.slice(6):null;return n&&e[n]?{...t,name:n}:t})}}function v2(i,e,t){if(lr(e)){const n=m2(t,i,{fallbackGroup:0});return n?e.resolveTextureBinding(n):null}return e instanceof He?e.buffer:Jd(e)?g2(e):e}function w2(i){return i&&!eg(i)?i:null}function x2(i){return i&&eg(i)?i:void 0}function eg(i){return b2.includes(i)}function P2(i){return{type:i.type,shaderLanguage:i.info.shadingLanguage,shaderLanguageVersion:i.info.shadingLanguageVersion,gpu:i.info.gpu,limits:i.limits,features:i.features}}const E2=35980,S2=35981,on=class on{constructor(e,t=on.defaultProps){d(this,"device");d(this,"model");d(this,"transformFeedback");if(!on.isSupported(e))throw new Error("BufferTransform not yet implemented on WebGPU");this.device=e,this.model=new Fe(this.device,{id:t.id||"buffer-transform-model",fs:t.fs||nw(),topology:t.topology||"point-list",varyings:t.outputs||t.varyings,...t,bufferMode:t.bufferMode||(t.feedbackBufferMode==="interleaved"?E2:S2)}),this.transformFeedback=this.device.createTransformFeedback({layout:this.model.pipeline.shaderLayout,buffers:t.feedbackBuffers}),this.model.setTransformFeedback(this.transformFeedback)}static isSupported(e){var t;return((t=e==null?void 0:e.info)==null?void 0:t.type)==="webgl"}destroy(){this.model&&this.model.destroy()}delete(){this.destroy()}run(e){e!=null&&e.inputBuffers&&this.model.setAttributes(e.inputBuffers),e!=null&&e.outputBuffers&&this.transformFeedback.setBuffers(e.outputBuffers);const t=this.device.beginRenderPass({discard:!0,...e});this.model.draw(t),t.end()}getBuffer(e){return this.transformFeedback.getBuffer(e)}readAsync(e){const t=this.getBuffer(e);if(!t)throw new Error("BufferTransform#getBuffer");if(t instanceof j)return t.readAsync();const{buffer:n,byteOffset:r=0,byteLength:s=n.byteLength}=t;return n.readAsync(r,s)}};d(on,"defaultProps",{...Fe.defaultProps,feedbackBufferMode:"separate",outputs:void 0,feedbackBuffers:void 0});let gn=on;const ao=2,L2=1e4,fs=class fs{constructor(e,t){d(this,"device");d(this,"id");d(this,"pipelineFactory");d(this,"shaderFactory");d(this,"userData",{});d(this,"bindings",{});d(this,"pipeline");d(this,"source");d(this,"shader");d(this,"shaderInputs");d(this,"_uniformStore");d(this,"_pipelineNeedsUpdate","newly created");d(this,"_getModuleUniforms");d(this,"props");d(this,"_destroyed",!1);d(this,"_lastLogTime",0);d(this,"_logOpen",!1);d(this,"_drawCount",0);var p,m;if(e.type!=="webgpu")throw new Error("Computation is only supported in WebGPU");this.props={...fs.defaultProps,...t},t=this.props,this.id=t.id||Sn("model"),this.device=e,Object.assign(this.userData,t.userData);const n=T2(e),r=od(this.props.plugins,n.shaderLanguage);if(Object.keys(r.vertexInputs).length>0||Object.keys(r.varyings).length>0)throw new Error("Computation does not support ShaderPlugin vertex inputs or varyings");const s=ad(this.props.modules,r.modules),o=Object.fromEntries(s.map(_=>[_.name,_]));this.shaderInputs=t.shaderInputs||new Qd(o),t.shaderInputs&&r.modules.length>0&&this.shaderInputs.addModules(r.modules),this.setShaderInputs(this.shaderInputs);const a=Kd(this.props.modules,(p=this.shaderInputs)==null?void 0:p.getModules()),c={...r.defines,...this.props.defines};this.props.shaderLayout=$r(this.props.shaderLayout,a)||null,this.pipelineFactory=t.pipelineFactory||Mr.getDefaultPipelineFactory(this.device),this.shaderFactory=t.shaderFactory||Ir.getDefaultShaderFactory(this.device);const l=this.props.shaderAssembler;cn(l instanceof hi);const{source:u,getUniforms:f,shaderLayout:h}=l.assembleWGSLShader({platformInfo:n,...this.props,modules:a,defines:c,scanVertexAttributes:!1,pluginInjections:r.injections});this.source=u,this._getModuleUniforms=f;const g=h??((m=e.getShaderLayout)==null?void 0:m.call(e,this.source,{scanVertexAttributes:!1}));this.props.shaderLayout=$r(this.props.shaderLayout||g||null,a)||null,this.pipeline=this._updatePipeline(),t.bindings&&this.setBindings(t.bindings)}destroy(){this._destroyed||(this.pipelineFactory.release(this.pipeline),this.shaderFactory.release(this.shader),this._uniformStore.destroy(),this._destroyed=!0)}predraw(e){this.updateShaderInputs(e)}dispatch(e,t,n,r){try{this._logDrawCallStart(),this._setPipeline(e),e.dispatch(t,n,r)}finally{this._logDrawCallEnd()}}dispatchIndirect(e,t,n=0){try{this._logDrawCallStart(),this._setPipeline(e),e.dispatchIndirect(t,n)}finally{this._logDrawCallEnd()}}_setPipeline(e){this.pipeline=this._updatePipeline(),this.pipeline.setBindings(this.bindings),e.setPipeline(this.pipeline),e.setBindings({})}setVertexCount(e){}setInstanceCount(e){}setShaderInputs(e){this.shaderInputs=e,this._uniformStore=new rd(this.device,this.shaderInputs.modules);for(const[t,n]of Object.entries(this.shaderInputs.modules))if(Uc(n)){const r=this._uniformStore.getManagedUniformBuffer(t);this.bindings[`${t}Uniforms`]=r}}setShaderModuleProps(e){const t=this._getModuleUniforms(e),n=Object.keys(t).filter(r=>{const s=t[r];return!Ch(s)&&typeof s!="number"&&typeof s!="boolean"});for(const r of n)t[r],delete t[r]}updateShaderInputs(e){this._uniformStore.setUniforms(this.shaderInputs.getUniformValues(),e)}setBindings(e){Object.assign(this.bindings,e)}_setPipelineNeedsUpdate(e){this._pipelineNeedsUpdate=this._pipelineNeedsUpdate||e}_updatePipeline(){if(this._pipelineNeedsUpdate){let e=null;this.pipeline&&(T.log(1,`Model ${this.id}: Recreating pipeline because "${this._pipelineNeedsUpdate}".`)(),e=this.shader),this._pipelineNeedsUpdate=!1,this.shader=this.shaderFactory.createShader({id:`${this.id}-fragment`,stage:"compute",source:this.source,debugShaders:this.props.debugShaders}),this.pipeline=this.pipelineFactory.createComputePipeline({...this.props,shader:this.shader}),e&&this.shaderFactory.release(e)}return this.pipeline}_logDrawCallStart(){const e=T.level>3?0:L2;T.level<2||Date.now()-this._lastLogTime<e||(this._lastLogTime=Date.now(),this._logOpen=!0,T.group(ao,`>>> DRAWING MODEL ${this.id}`,{collapsed:T.level<=2})())}_logDrawCallEnd(){if(this._logOpen){const e=this.shaderInputs.getDebugTable();T.table(ao,e)(),T.groupEnd(ao)(),this._logOpen=!1}}_getBufferOrConstantValues(e,t){const n=Ke.getTypedArrayConstructor(t);return(e instanceof j?new n(e.debugData):e).toString()}};d(fs,"defaultProps",{...ln.defaultProps,id:"unnamed",handle:void 0,userData:{},source:"",modules:[],defines:{},plugins:[],bindings:void 0,shaderInputs:void 0,pipelineFactory:void 0,shaderFactory:void 0,shaderAssembler:pt.getDefaultShaderAssembler("wgsl"),debugShaders:void 0});let Ta=fs;function T2(i){return{type:i.type,shaderLanguage:i.info.shadingLanguage,shaderLanguageVersion:i.info.shadingLanguageVersion,gpu:i.info.gpu,limits:i.limits,features:i.features}}const A2={blendColorOperation:"add",blendColorSrcFactor:"one",blendColorDstFactor:"zero",blendAlphaOperation:"add",blendAlphaSrcFactor:"constant",blendAlphaDstFactor:"zero"};class tg extends Fc{constructor(){super(...arguments),this._colorEncoderState=null}render(e){return"pickingFBO"in e?this._drawPickingBuffer(e):{decodePickingColor:null,stats:super._render(e)}}_drawPickingBuffer({layers:e,layerFilter:t,views:n,viewports:r,onViewportActive:s,pickingFBO:o,deviceRect:{x:a,y:c,width:l,height:u},cullRect:f,effects:h,pass:g="picking",pickZ:p,canvasContext:m,shaderModuleProps:_,clearColor:y}){this.pickZ=p;const w=this._resetColorEncoder(p),b=[a,c,l,u],x=super._render({target:o,layers:e,layerFilter:t,views:n,viewports:r,onViewportActive:s,cullRect:f,effects:h==null?void 0:h.filter(L=>L.useInPicking),pass:g,canvasContext:m,isPicking:!0,shaderModuleProps:_,clearColor:y??[0,0,0,0],colorMask:15,scissorRect:b});return this._colorEncoderState=null,{decodePickingColor:w&&C2.bind(null,w),stats:x}}shouldDrawLayer(e){const{pickable:t,operation:n}=e.props;return t&&n.includes("draw")||n.includes("terrain")||n.includes("mask")}getShaderModuleProps(e,t,n){var r;return{picking:{isActive:1,isAttribute:this.pickZ,disabledPickingIndices:(r=e.internalState)==null?void 0:r.disabledPickingIndices},lighting:{enabled:!1}}}getLayerParameters(e,t,n){var a;const r={...e.props.parameters},{pickable:s,operation:o}=e.props;return this._colorEncoderState?s&&o.includes("draw")?(Object.assign(r,A2),r.blend=!0,this.device.type==="webgpu"?r.blendConstant=Gu(this._colorEncoderState,e,n):r.blendColor=Gu(this._colorEncoderState,e,n),o.includes("terrain")&&((a=e.state)!=null&&a._hasPickingCover)&&(r.blendAlphaSrcFactor="one")):o.includes("terrain")&&(r.blend=!1):r.blend=!1,r}_resetColorEncoder(e){return this._colorEncoderState=e?null:{byLayer:new Map,byAlpha:[]},this._colorEncoderState}}function Gu(i,e,t){const{byLayer:n,byAlpha:r}=i;let s,o=n.get(e);return o?(o.viewports.push(t),s=o.a):(s=n.size+1,s<=255?(o={a:s,layer:e,viewports:[t]},n.set(e,o),r[s]=o):(q.warn("Too many pickable layers, only picking the first 255")(),s=0)),[0,0,0,s/255]}function C2(i,e){const t=i.byAlpha[e[3]];return t&&{pickedLayer:t.layer,pickedViewports:t.viewports,pickedObjectIndex:t.layer.decodePickingColor(e)}}const Xt={NO_STATE:"Awaiting state",MATCHED:"Matched. State transferred from previous layer",INITIALIZED:"Initialized",AWAITING_GC:"Discarded. Awaiting garbage collection",AWAITING_FINALIZATION:"No longer matched. Awaiting garbage collection",FINALIZED:"Finalized! Awaiting garbage collection"},Gr=Symbol.for("component"),ht=Symbol.for("propTypes"),co=Symbol.for("deprecatedProps"),oi=Symbol.for("asyncPropDefaults"),kt=Symbol.for("asyncPropOriginal"),lt=Symbol.for("asyncPropResolved");function _i(i,e=()=>!0){return Array.isArray(i)?ig(i,e,[]):e(i)?[i]:[]}function ig(i,e,t){let n=-1;for(;++n<i.length;){const r=i[n];Array.isArray(r)?ig(r,e,t):e(r)&&t.push(r)}return t}function M2({target:i,source:e,start:t=0,count:n=1}){const r=e.length,s=n*r;let o=0;for(let a=t;o<r;o++)i[a++]=e[o];for(;o<s;)o<s-o?(i.copyWithin(t+o,t,t+o),o*=2):(i.copyWithin(t+o,t,t+s-o),o=s);return i}class I2{constructor(e,t,n){this._loadCount=0,this._subscribers=new Set,this.id=e,this.context=n,this.setData(t)}subscribe(e){this._subscribers.add(e)}unsubscribe(e){this._subscribers.delete(e)}inUse(){return this._subscribers.size>0}delete(){}getData(){return this.isLoaded?this._error?Promise.reject(this._error):this._content:this._loader.then(()=>this.getData())}setData(e,t){if(e===this._data&&!t)return;this._data=e;const n=++this._loadCount;let r=e;typeof e=="string"&&(r=zo(e)),r instanceof Promise?(this.isLoaded=!1,this._loader=r.then(s=>{this._loadCount===n&&(this.isLoaded=!0,this._error=void 0,this._content=s)}).catch(s=>{this._loadCount===n&&(this.isLoaded=!0,this._error=s||!0)})):(this.isLoaded=!0,this._error=void 0,this._content=e);for(const s of this._subscribers)s.onChange(this.getData())}}class R2{constructor(e){var t;this.protocol=e.protocol||"resource://",this._context={device:e.device,gl:(t=e.device)==null?void 0:t.gl,resourceManager:this},this._resources={},this._consumers={},this._pruneRequest=null}contains(e){return e.startsWith(this.protocol)?!0:e in this._resources}add({resourceId:e,data:t,forceUpdate:n=!1,persistent:r=!0}){let s=this._resources[e];s?s.setData(t,n):(s=new I2(e,t,this._context),this._resources[e]=s),s.persistent=r}remove(e){const t=this._resources[e];t&&(t.delete(),delete this._resources[e])}unsubscribe({consumerId:e}){const t=this._consumers[e];if(t){for(const n in t){const r=t[n],s=this._resources[r.resourceId];s&&s.unsubscribe(r)}delete this._consumers[e],this.prune()}}subscribe({resourceId:e,onChange:t,consumerId:n,requestId:r="default"}){const{_resources:s,protocol:o}=this;e.startsWith(o)&&(e=e.replace(o,""),s[e]||this.add({resourceId:e,data:null,persistent:!1}));const a=s[e];if(this._track(n,r,a,t),a)return a.getData()}prune(){this._pruneRequest||(this._pruneRequest=setTimeout(()=>this._prune(),0))}finalize(){for(const e in this._resources)this._resources[e].delete()}_track(e,t,n,r){const s=this._consumers,o=s[e]=s[e]||{};let a=o[t];const c=a&&a.resourceId&&this._resources[a.resourceId];c&&(c.unsubscribe(a),this.prune()),n&&(a?(a.onChange=r,a.resourceId=n.id):a={onChange:r,resourceId:n.id},o[t]=a,n.subscribe(a))}_prune(){this._pruneRequest=null;for(const e of Object.keys(this._resources)){const t=this._resources[e];!t.persistent&&!t.inUse()&&(t.delete(),delete this._resources[e])}}}const O2="layerManager.setLayers",B2="layerManager.activateViewport";class k2{constructor(e,t){var a;this._lastRenderedLayers=[],this._needsRedraw=!1,this._needsUpdate=!1,this._nextLayers=null,this._debug=!1,this._defaultShaderModulesChanged=!1,this.activateViewport=c=>{_e(B2,this,c),c&&(this.context.viewport=c)};const{deck:n,stats:r,viewport:s,timeline:o}=t||{};this.layers=[],this.resourceManager=new R2({device:e,protocol:"deck://"}),this.context={mousePosition:null,userData:{},layerManager:this,device:e,gl:e==null?void 0:e.gl,deck:n,shaderAssembler:uS(((a=e==null?void 0:e.info)==null?void 0:a.shadingLanguage)||"glsl"),defaultShaderModules:[Xx],renderPass:void 0,stats:r||new hs({id:"deck.gl"}),viewport:s||new Si({id:"DEFAULT-INITIAL-VIEWPORT"}),timeline:o||new Xd,resourceManager:this.resourceManager,onError:void 0},Object.seal(this)}finalize(){this.resourceManager.finalize();for(const e of this.layers)this._finalizeLayer(e)}needsRedraw(e={clearRedrawFlags:!1}){let t=this._needsRedraw;e.clearRedrawFlags&&(this._needsRedraw=!1);for(const n of this.layers){const r=n.getNeedsRedraw(e);t=t||r}return t}needsUpdate(){return this._nextLayers&&this._nextLayers!==this._lastRenderedLayers?"layers changed":this._defaultShaderModulesChanged?"shader modules changed":this._needsUpdate}setNeedsRedraw(e){this._needsRedraw=this._needsRedraw||e}setNeedsUpdate(e){this._needsUpdate=this._needsUpdate||e}getLayers({layerIds:e}={}){return e?this.layers.filter(t=>e.find(n=>t.id.indexOf(n)===0)):this.layers}setProps(e){"debug"in e&&(this._debug=e.debug),"userData"in e&&(this.context.userData=e.userData),"layers"in e&&(this._nextLayers=e.layers),"onError"in e&&(this.context.onError=e.onError)}setLayers(e,t){_e(O2,this,t,e),this._lastRenderedLayers=e;const n=_i(e,Boolean);for(const r of n)r.context=this.context;this._updateLayers(this.layers,n)}updateLayers(){const e=this.needsUpdate();e&&(this.setNeedsRedraw(`updating layers: ${e}`),this.setLayers(this._nextLayers||this._lastRenderedLayers,e)),this._nextLayers=null}addDefaultShaderModule(e){const{defaultShaderModules:t}=this.context;t.find(n=>n.name===e.name)||(t.push(e),this._defaultShaderModulesChanged=!0)}removeDefaultShaderModule(e){const{defaultShaderModules:t}=this.context,n=t.findIndex(r=>r.name===e.name);n>=0&&(t.splice(n,1),this._defaultShaderModulesChanged=!0)}_handleError(e,t,n){n.raiseError(t,`${e} of ${n}`)}_updateLayers(e,t){const n={};for(const o of e)n[o.id]?q.warn(`Multiple old layers with same id ${o.id}`)():n[o.id]=o;if(this._defaultShaderModulesChanged){for(const o of e)o.setNeedsUpdate(),o.setChangeFlags({extensionsChanged:!0});this._defaultShaderModulesChanged=!1}const r=[];this._updateSublayersRecursively(t,n,r),this._finalizeOldLayers(n);let s=!1;for(const o of r)if(o.hasUniformTransition()){s=`Uniform transition in ${o}`;break}this._needsUpdate=s,this.layers=r}_updateSublayersRecursively(e,t,n){for(const r of e){r.context=this.context;const s=t[r.id];s===null&&q.warn(`Multiple new layers with same id ${r.id}`)(),t[r.id]=null;let o=null;try{this._debug&&s!==r&&r.validateProps(),s?(this._transferLayerState(s,r),this._updateLayer(r)):this._initializeLayer(r),n.push(r),o=r.isComposite?r.getSubLayers():null}catch(a){this._handleError("matching",a,r)}o&&this._updateSublayersRecursively(o,t,n)}}_finalizeOldLayers(e){for(const t in e){const n=e[t];n&&this._finalizeLayer(n)}}_initializeLayer(e){try{e._initialize(),e.lifecycle=Xt.INITIALIZED}catch(t){this._handleError("initialization",t,e)}}_transferLayerState(e,t){t._transferState(e),t.lifecycle=Xt.MATCHED,t!==e&&(e.lifecycle=Xt.AWAITING_GC)}_updateLayer(e){try{e._update()}catch(t){this._handleError("update",t,e)}}_finalizeLayer(e){this._needsRedraw=this._needsRedraw||`finalized ${e}`,e.lifecycle=Xt.AWAITING_FINALIZATION;try{e._finalize(),e.lifecycle=Xt.FINALIZED}catch(t){this._handleError("finalization",t,e)}}}function we(i,e,t){if(i===e)return!0;if(!t||!i||!e)return!1;if(Array.isArray(i)){if(!Array.isArray(e)||i.length!==e.length)return!1;for(let n=0;n<i.length;n++)if(!we(i[n],e[n],t-1))return!1;return!0}if(Array.isArray(e))return!1;if(typeof i=="object"&&typeof e=="object"){const n=Object.keys(i),r=Object.keys(e);if(n.length!==r.length)return!1;for(const s of n)if(!e.hasOwnProperty(s)||!we(i[s],e[s],t-1))return!1;return!0}return!1}const ai="default-canvas";class D2{constructor(e){this.views=[],this.width=100,this.height=100,this.viewState={},this.controllers={},this.timeline=e.timeline,this._viewports=[],this._viewportMap={},this._isUpdating=!1,this._needsRedraw="First render",this._needsUpdate="Initialize",this._eventManager=e.eventManager,this._eventManagers=e.eventManagers||{},this._viewEventManagers={},this._eventCallbacks={onViewStateChange:e.onViewStateChange,onInteractionStateChange:e.onInteractionStateChange},this._pickPosition=e.pickPosition,this._getCanvasContext=e.getCanvasContext,Object.seal(this),this.setProps(e)}finalize(){for(const e in this.controllers){const t=this.controllers[e];t&&t.finalize()}this.controllers={}}needsRedraw(e={clearRedrawFlags:!1}){const t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}setNeedsUpdate(e){this._needsUpdate=this._needsUpdate||e,this._needsRedraw=this._needsRedraw||e}updateViewStates(){for(const e in this.controllers){const t=this.controllers[e];t&&t.updateTransition()}}getViewports(e){return e?this._viewports.filter(t=>{const n=!e.canvasId||this.getCanvasId(t.id)===e.canvasId,r=!("x"in e)||t.containsPixel(e);return n&&r}):this._viewports}getViews(){const e={};return this.views.forEach(t=>{e[t.id]=t}),e}getView(e){return this.views.find(t=>t.id===e)}getViewState(e){const t=typeof e=="string"?this.getView(e):e,n=t&&this.viewState[t.getViewStateId()]||this.viewState;return t?t.filterViewState(n):n}getViewport(e){return this._viewportMap[e]}getCanvasId(e){var n;const t=typeof e=="string"?this.getView(e):e;return t?((n=this._viewEventManagers[t.id])==null?void 0:n.canvasId)||this._getCanvasIdFromView(t):void 0}unproject(e,t){const n=this.getViewports(),r={x:e[0],y:e[1]};for(let s=n.length-1;s>=0;--s){const o=n[s];if(o.containsPixel(r)){const a=e.slice();return a[0]-=o.x,a[1]-=o.y,o.unproject(a,t)}}return null}setProps(e){e.views&&this._setViews(e.views),e.viewState&&this._setViewState(e.viewState),("width"in e||"height"in e)&&this._setSize(e.width,e.height),"pickPosition"in e&&(this._pickPosition=e.pickPosition),"eventManagers"in e&&this._setEventManagers(e.eventManagers||{}),this._isUpdating||this._update()}_update(){this._isUpdating=!0,this._needsUpdate&&(this._needsUpdate=!1,this._rebuildViewports()),this._needsUpdate&&(this._needsUpdate=!1,this._rebuildViewports()),this._isUpdating=!1}_setSize(e,t){(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,this.setNeedsUpdate("Size changed"))}_setViews(e){e=_i(e,Boolean),this._diffViews(e,this.views)&&this.setNeedsUpdate("views changed"),this.views=e}_setViewState(e){e?(!we(e,this.viewState,3)&&this.setNeedsUpdate("viewState changed"),this.viewState=e):q.warn("missing `viewState` or `initialViewState`")()}_setEventManagers(e){this._eventManagers!==e&&(this._eventManagers=e,this.setNeedsUpdate("eventManagers changed"))}_getCanvasIdFromView(e){var t,n;return e.props.canvasId||((n=(t=this._getCanvasContext)==null?void 0:t.call(this,e.id))==null?void 0:n.id)||ai}_getCanvasDimensions(e){var s;const t=(s=this._getCanvasContext)==null?void 0:s.call(this,e.id),[n,r]=(t==null?void 0:t.getCSSSize())||[this.width,this.height];return{width:n,height:r}}_getViewEventManager(e){const t=this.getCanvasId(e)||ai;return{canvasId:t,eventManager:this._eventManagers[t]||this._eventManager}}_startViewportRebuild(){const e=this.controllers,t=this._viewEventManagers;return this._viewports=[],this.controllers={},this._viewEventManagers={},{oldControllers:e,oldViewEventManagers:t}}_getReusableController(e,t,n){return e&&((t==null?void 0:t.canvasId)!==n.canvasId||(t==null?void 0:t.eventManager)!==n.eventManager)?(e.finalize(),null):e}_createController(e,t){const n=t.type;return new n({timeline:this.timeline,eventManager:this._getViewEventManager(e).eventManager,onViewStateChange:this._eventCallbacks.onViewStateChange,onStateChange:this._eventCallbacks.onInteractionStateChange,makeViewport:s=>{var o;return(o=this.getView(e.id))==null?void 0:o.makeViewport({viewState:s,...this._getCanvasDimensions(e)})},pickPosition:(s,o)=>{var a;return(a=this._pickPosition)==null?void 0:a.call(this,s,o,e.id)}})}_updateController(e,t,n,r){const s=e.controller;if(s&&n){const o={...t,...s,id:e.id,x:n.x,y:n.y,width:n.width,height:n.height};return(!r||r.constructor!==s.type)&&(r=this._createController(e,o)),r&&r.setProps(o),r}return null}_rebuildViewports(){const{views:e}=this,{oldControllers:t,oldViewEventManagers:n}=this._startViewportRebuild();let r=!1;for(let s=e.length;s--;){const o=e[s],{width:a,height:c}=this._getCanvasDimensions(o),l=this._getViewEventManager(o);this._viewEventManagers[o.id]=l;const u=this.getViewState(o),f=o.makeViewport({viewState:u,width:a,height:c});let h=this._getReusableController(t[o.id],n[o.id],l);const g=!!o.controller;g&&!h&&(r=!0),(r||!g)&&h&&(h.finalize(),h=null),this.controllers[o.id]=this._updateController(o,u,f,h),f&&this._viewports.unshift(f)}for(const s in t){const o=t[s];o&&!this.controllers[s]&&o.finalize()}this._buildViewportMap()}_buildViewportMap(){this._viewportMap={},this._viewports.forEach(e=>{e.id&&(this._viewportMap[e.id]=this._viewportMap[e.id]||e)})}_diffViews(e,t){return e.length!==t.length?!0:e.some((n,r)=>!e[r].equals(t[r]))}}const F2=/^(?:\d+\.?\d*|\.\d+)$/;function Le(i){switch(typeof i){case"number":if(!Number.isFinite(i))throw new Error(`Could not parse position string ${i}`);return{type:"literal",value:i};case"string":try{const e=N2(i);return new U2(e).parseExpression()}catch(e){const t=e instanceof Error?e.message:String(e);throw new Error(`Could not parse position string ${i}: ${t}`)}default:throw new Error(`Could not parse position string ${i}`)}}function Aa(i,e){switch(i.type){case"literal":return i.value;case"percentage":return Math.round(i.value*e);case"binary":const t=Aa(i.left,e),n=Aa(i.right,e);return i.operator==="+"?t+n:t-n;default:throw new Error("Unknown layout expression type")}}function Te(i,e){return Aa(i,e)}function N2(i){const e=[];let t=0;for(;t<i.length;){const n=i[t];if(/\s/.test(n)){t++;continue}if(n==="+"||n==="-"||n==="("||n===")"||n==="%"){e.push({type:"symbol",value:n}),t++;continue}if(Vu(n)||n==="."){const r=t;let s=n===".";for(t++;t<i.length;){const a=i[t];if(Vu(a)){t++;continue}if(a==="."&&!s){s=!0,t++;continue}break}const o=i.slice(r,t);if(!F2.test(o))throw new Error("Invalid number token");e.push({type:"number",value:parseFloat(o)});continue}if(ju(n)){const r=t;for(;t<i.length&&ju(i[t]);)t++;const s=i.slice(r,t).toLowerCase();e.push({type:"word",value:s});continue}throw new Error("Invalid token in position string")}return e}class U2{constructor(e){this.index=0,this.tokens=e}parseExpression(){const e=this.parseBinaryExpression();if(this.index<this.tokens.length)throw new Error("Unexpected token at end of expression");return e}parseBinaryExpression(){let e=this.parseFactor(),t=this.peek();for(;z2(t);){this.index++;const n=this.parseFactor();e={type:"binary",operator:t.value,left:e,right:n},t=this.peek()}return e}parseFactor(){const e=this.peek();if(!e)throw new Error("Unexpected end of expression");if(e.type==="symbol"&&e.value==="+")return this.index++,this.parseFactor();if(e.type==="symbol"&&e.value==="-"){this.index++;const t=this.parseFactor();return{type:"binary",operator:"-",left:{type:"literal",value:0},right:t}}if(e.type==="symbol"&&e.value==="("){this.index++;const t=this.parseBinaryExpression();if(!this.consumeSymbol(")"))throw new Error("Missing closing parenthesis");return t}if(e.type==="word"&&e.value==="calc"){if(this.index++,!this.consumeSymbol("("))throw new Error("Missing opening parenthesis after calc");const t=this.parseBinaryExpression();if(!this.consumeSymbol(")"))throw new Error("Missing closing parenthesis");return t}if(e.type==="number"){this.index++;const t=e.value,n=this.peek();return n&&n.type==="symbol"&&n.value==="%"?(this.index++,{type:"percentage",value:t/100}):n&&n.type==="word"&&n.value==="px"?(this.index++,{type:"literal",value:t}):{type:"literal",value:t}}throw new Error("Unexpected token in expression")}consumeSymbol(e){const t=this.peek();return t&&t.type==="symbol"&&t.value===e?(this.index++,!0):!1}peek(){return this.tokens[this.index]||null}}function Vu(i){return i>="0"&&i<="9"}function ju(i){return i>="a"&&i<="z"||i>="A"&&i<="Z"}function z2(i){return!!(i&&i.type==="symbol"&&(i.value==="+"||i.value==="-"))}function $2(i,e){const t={...i};for(const n in e)n!=="id"&&(Array.isArray(t[n])&&Array.isArray(e[n])?t[n]=G2(t[n],e[n]):t[n]=e[n]);return t}function G2(i,e){i=i.slice();for(let t=0;t<e.length;t++){const n=e[t];Number.isFinite(n)&&(i[t]=n)}return i}class ng{constructor(e){const{id:t,x:n=0,y:r=0,width:s="100%",height:o="100%",padding:a=null}=e;this.id=t||this.constructor.displayName||"view",this.props={...e,id:this.id},this._x=Le(n),this._y=Le(r),this._width=Le(s),this._height=Le(o),this._padding=a&&{left:Le(a.left||0),right:Le(a.right||0),top:Le(a.top||0),bottom:Le(a.bottom||0)},this.equals=this.equals.bind(this),Object.seal(this)}equals(e){return this===e?!0:this.constructor===e.constructor&&we(this.props,e.props,2)}clone(e){const t=this.constructor;return new t({...this.props,...e})}makeViewport({width:e,height:t,viewState:n}){n=this.filterViewState(n);const r=this.getDimensions({width:e,height:t});if(!r.height||!r.width)return null;const s=this.getViewportType(n);return new s({...n,...this.props,...r})}getViewStateId(){const{viewState:e}=this.props;return typeof e=="string"?e:(e==null?void 0:e.id)||this.id}filterViewState(e){return this.props.viewState&&typeof this.props.viewState=="object"?this.props.viewState.id?$2(e,this.props.viewState):this.props.viewState:e}getDimensions({width:e,height:t}){const n={x:Te(this._x,e),y:Te(this._y,t),width:Te(this._width,e),height:Te(this._height,t)};return this._padding&&(n.padding={left:Te(this._padding.left,e),top:Te(this._padding.top,t),right:Te(this._padding.right,e),bottom:Te(this._padding.bottom,t)}),n}get controller(){const e=this.props.controller;return e?e===!0?{type:this.ControllerType}:typeof e=="function"?{type:e}:{type:this.ControllerType,...e}:null}}class Es{constructor(e){this._inProgress=!1,this._handle=null,this.time=0,this.settings={duration:0},this._timeline=e}get inProgress(){return this._inProgress}start(e){var t,n;this.cancel(),this.settings=e,this._inProgress=!0,(n=(t=this.settings).onStart)==null||n.call(t,this)}end(){var e,t;this._inProgress&&(this._timeline.removeChannel(this._handle),this._handle=null,this._inProgress=!1,(t=(e=this.settings).onEnd)==null||t.call(e,this))}cancel(){var e,t;this._inProgress&&((t=(e=this.settings).onInterrupt)==null||t.call(e,this),this._timeline.removeChannel(this._handle),this._handle=null,this._inProgress=!1)}update(){var e,t;if(!this._inProgress)return!1;if(this._handle===null){const{_timeline:n,settings:r}=this;this._handle=n.addChannel({delay:n.getTime(),duration:r.duration})}return this.time=this._timeline.getTime(this._handle),this._onUpdate(),(t=(e=this.settings).onUpdate)==null||t.call(e,this),this._timeline.isFinished(this._handle)&&this.end(),!0}_onUpdate(){}}const Wu=()=>{},Hu={mode:"preserve"},V2={mode:"hard"},Ca={BREAK:1,SNAP_TO_END:2,IGNORE:3},j2=i=>i,W2=Ca.BREAK;class H2{constructor(e){this._onTransitionUpdate=t=>{const{time:n,settings:{interpolator:r,startProps:s,endProps:o,duration:a,easing:c}}=t,l=c(n/a),u=r.interpolateProps(s,o,l);this.propsInTransition=this.getControllerState({...this.props,...u},Hu).getViewportProps(),this.onViewStateChange({viewState:this.propsInTransition,oldViewState:this.props})},this.getControllerState=e.getControllerState,this.propsInTransition=null,this.transition=new Es(e.timeline),this.onViewStateChange=e.onViewStateChange||Wu,this.onStateChange=e.onStateChange||Wu}finalize(){this.transition.cancel()}getViewportInTransition(){return this.propsInTransition}processViewStateChange(e){let t=!1;const n=this.props;if(this.props=e,!n||this._shouldIgnoreViewportChange(n,e))return!1;if(this._isTransitionEnabled(e)){let r=n;if(this.transition.inProgress){const{interruption:s,endProps:o}=this.transition.settings;r={...n,...s===Ca.SNAP_TO_END?o:this.propsInTransition||n}}this._triggerTransition(r,e),t=!0}else this.transition.cancel();return t}updateTransition(){this.transition.update()}_isTransitionEnabled(e){const{transitionDuration:t,transitionInterpolator:n}=e;return(t>0||t==="auto")&&!!n}_isUpdateDueToCurrentTransition(e){return this.transition.inProgress&&this.propsInTransition?this.transition.settings.interpolator.arePropsEqual(e,this.propsInTransition):!1}_shouldIgnoreViewportChange(e,t){return this.transition.inProgress?this.transition.settings.interruption===Ca.IGNORE||this._isUpdateDueToCurrentTransition(t):this._isTransitionEnabled(t)?t.transitionInterpolator.arePropsEqual(e,t):!0}_triggerTransition(e,t){const n=this.getControllerState(e,Hu),r=this.getControllerState(t,V2).shortestPathFrom(n),s=t.transitionInterpolator,o=s.getDuration?s.getDuration(e,t):t.transitionDuration;if(o===0)return;const a=s.initializeProps(e,r);this.propsInTransition={};const c={duration:o,easing:t.transitionEasing||j2,interpolator:s,interruption:t.transitionInterruption||W2,startProps:a.start,endProps:a.end,onStart:t.onTransitionStart,onUpdate:this._onTransitionUpdate,onInterrupt:this._onTransitionEnd(t.onTransitionInterrupt),onEnd:this._onTransitionEnd(t.onTransitionEnd)};this.transition.start(c),this.onStateChange({inTransition:!0}),this.updateTransition()}_onTransitionEnd(e){return t=>{this.propsInTransition=null,this.onStateChange({inTransition:!1,isZooming:!1,isPanning:!1,isRotating:!1}),e==null||e(t)}}}function Q(i,e){if(!i)throw new Error(e||"deck.gl: assertion failed.")}class rg{constructor(e){const{compare:t,extract:n,required:r}=e;this._propsToCompare=t,this._propsToExtract=n||t,this._requiredProps=r}arePropsEqual(e,t){for(const n of this._propsToCompare)if(!(n in e)||!(n in t)||!ri(e[n],t[n]))return!1;return!0}initializeProps(e,t){const n={},r={};for(const s of this._propsToExtract)(s in e||s in t)&&(n[s]=e[s],r[s]=t[s]);return this._checkRequiredProps(n),this._checkRequiredProps(r),{start:n,end:r}}getDuration(e,t){return t.transitionDuration}_checkRequiredProps(e){this._requiredProps&&this._requiredProps.forEach(t=>{const n=e[t];Q(Number.isFinite(n)||Array.isArray(n),`${t} is required for transition`)})}}const Y2=["longitude","latitude","zoom","bearing","pitch"],q2=["longitude","latitude","zoom"];class zc extends rg{constructor(e={}){const t=Array.isArray(e)?e:e.transitionProps,n=Array.isArray(e)?{}:e;n.transitionProps=Array.isArray(t)?{compare:t,required:t}:t||{compare:Y2,required:q2},super(n.transitionProps),this.opts=n}initializeProps(e,t){const n=super.initializeProps(e,t),{makeViewport:r,around:s}=this.opts;if(r&&s){const o=r(e),a=r(t),c=o.unproject(s);n.start.around=s,Object.assign(n.end,{around:a.project(c),aroundPosition:c,width:t.width,height:t.height})}return n}interpolateProps(e,t,n){const r={};for(const s of this._propsToExtract)r[s]=di(e[s]||0,t[s]||0,n);if(t.aroundPosition&&this.opts.makeViewport){const s=this.opts.makeViewport({...t,...r});Object.assign(r,s.panByPosition(t.aroundPosition,di(e.around,t.around,n)))}return r}}const Ve={transitionDuration:0},Z2=300,X2=300,lo=i=>1-(1-i)*(1-i),K2=i=>i===1?1:1-Math.pow(2,-10*i),bt={WHEEL:["wheel"],PAN:["panstart","panmove","panend"],PINCH:["pinchstart","pinchmove","pinchend"],MULTI_PAN:["multipanstart","multipanmove","multipanend"],DOUBLE_CLICK:["dblclick"],DOUBLE_CLICK_DRAG:["dblclickdragstart","dblclickdragmove","dblclickdragend","dblclickdragcancel"],KEYBOARD:["keydown"]},yt={};class sg{constructor(e){this.state={},this._events={},this._interactionState={isDragging:!1},this._customEvents=[],this._eventStartBlocked=null,this._panMove=!1,this._multiPanMode=null,this._multiPanStartCenter=null,this._doubleClickDragAnchor=null,this._suppressDoubleClickUntil=0,this.invertPan=!1,this.dragMode="rotate",this.inertia=0,this.scrollZoom=!0,this.dragPan=!0,this.dragRotate=!0,this.doubleClickZoom=!0,this.doubleClickDragZoom=!0,this.touchZoom=!0,this.touchRotate=!1,this.multiTouchDrag=null,this.trackpadGesture=!1,this.zoomAround="pointer",this.keyboard=!0,this.transitionManager=new H2({...e,getControllerState:(t,n)=>new this.ControllerState({...t,constraintContext:n,makeViewport:e.makeViewport}),onViewStateChange:this._onTransition.bind(this),onStateChange:this._setInteractionState.bind(this)}),this.handleEvent=this.handleEvent.bind(this),this.eventManager=e.eventManager,this.onViewStateChange=e.onViewStateChange||(()=>{}),this.onStateChange=e.onStateChange||(()=>{}),this.makeViewport=e.makeViewport,this.pickPosition=e.pickPosition}set events(e){this.toggleEvents(this._customEvents,!1),this.toggleEvents(e,!0),this._customEvents=e,this.props&&this.setProps(this.props)}finalize(){var e;for(const t in this._events)this._events[t]&&((e=this.eventManager)==null||e.off(t,this.handleEvent));this.transitionManager.finalize()}handleEvent(e){this._controllerState=void 0;const t=this._eventStartBlocked;switch(e.type){case"panstart":return t?!1:this._onPanStart(e);case"panmove":return this._onPan(e);case"panend":return this._onPanEnd(e);case"pinchstart":return t||!this._isTrackpadGestureAllowed(e)?!1:this._onPinchStart(e);case"pinchmove":return this._isTrackpadGestureAllowed(e)?this._onPinch(e):!1;case"pinchend":return this._isTrackpadGestureAllowed(e)?this._onPinchEnd(e):!1;case"multipanstart":return t?!1:this._onMultiPanStart(e);case"multipanmove":return this._onMultiPan(e);case"multipanend":return this._onMultiPanEnd(e);case"dblclick":return this._onDoubleClick(e);case"dblclickdragstart":return t?!1:this._onDoubleClickDragStart(e);case"dblclickdragmove":return this._onDoubleClickDrag(e);case"dblclickdragend":case"dblclickdragcancel":return this._onDoubleClickDragEnd(e);case"wheel":return this._onWheel(e);case"keydown":return this._onKeyDown(e);default:return!1}}get controllerState(){return this._controllerState=this._controllerState||new this.ControllerState({makeViewport:this.makeViewport,...this.props,...this.state}),this._controllerState}getCenter(e){const{x:t,y:n}=this.props,{offsetCenter:r}=e;return[r.x-t,r.y-n]}getZoomPosition(e){if(this.zoomAround==="pointer")return e;const t=this.makeViewport(this.controllerState.getViewportProps()),[n,r]=Bc(t.center,t.pixelProjectionMatrix);return[n,r]}isPointInBounds(e,t){const{width:n,height:r}=this.props;if(t&&t.handled)return!1;const s=e[0]>=0&&e[0]<=n&&e[1]>=0&&e[1]<=r;return s&&t&&t.stopPropagation(),s}isFunctionKeyPressed(e){const{srcEvent:t}=e;return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}isDragging(){return this._interactionState.isDragging||!1}blockEvents(e){const t=setTimeout(()=>{this._eventStartBlocked===t&&(this._eventStartBlocked=null)},e);this._eventStartBlocked=t}setProps(e){e.maxBoundsPadding===void 0&&(e.maxBoundsPadding=null),e.dragMode&&(this.dragMode=e.dragMode);const t=this.props;this.props=e,"transitionInterpolator"in e||(e.transitionInterpolator=this._getTransitionProps().transitionInterpolator),this.transitionManager.processViewStateChange(e);const{inertia:n}=e;this.inertia=Number.isFinite(n)?n:n===!0?Z2:0;const{scrollZoom:r=!0,dragPan:s=!0,dragRotate:o=!0,doubleClickZoom:a=!0,doubleClickDragZoom:c=!1,touchZoom:l=!0,touchRotate:u=!1,multiTouchDrag:f=u?"rotate":null,trackpadGesture:h=!1,zoomAround:g="pointer",keyboard:p=!0}=e,m=!!this.onViewStateChange;if(this.toggleEvents(bt.WHEEL,m&&r),this.toggleEvents(bt.PAN,m),this.toggleEvents(bt.PINCH,m&&(l||f==="rotate")),this.toggleEvents(bt.MULTI_PAN,m&&!!f),this.toggleEvents(bt.DOUBLE_CLICK,m&&a),this.toggleEvents(bt.DOUBLE_CLICK_DRAG,m&&c),this.toggleEvents(bt.KEYBOARD,m&&p),this.scrollZoom=r,this.dragPan=s,this.dragRotate=o,this.doubleClickZoom=a,this.doubleClickDragZoom=c,this.touchZoom=l,this.touchRotate=f==="rotate",this.multiTouchDrag=f,this.trackpadGesture=h,this.zoomAround=g,this.keyboard=p,(!t||t.height!==e.height||t.width!==e.width||t.maxBounds!==e.maxBounds||t.maxBoundsPadding!==e.maxBoundsPadding)&&e.maxBounds){const y=new this.ControllerState({...e,makeViewport:this.makeViewport}),w=y.getViewportProps();Object.keys(w).some(x=>!we(w[x],e[x],1))&&this.updateViewport(y)}}updateTransition(){this.transitionManager.updateTransition()}toggleEvents(e,t){this.eventManager&&e.forEach(n=>{this._events[n]!==t&&(this._events[n]=t,t?this.eventManager.on(n,this.handleEvent):this.eventManager.off(n,this.handleEvent))})}updateViewport(e,t=null,n={}){const r={...e.getViewportProps(),...t},s=this.controllerState!==e;if(this.state=e.getState(),this._setInteractionState(n),s){const o=this.controllerState&&this.controllerState.getViewportProps();this.onViewStateChange&&this.onViewStateChange({viewState:r,interactionState:this._interactionState,oldViewState:o,viewId:this.props.id})}}_onTransition(e){this.onViewStateChange({...e,interactionState:this._interactionState,viewId:this.props.id})}_setInteractionState(e){Object.assign(this._interactionState,e),this.onStateChange(this._interactionState)}_getConstraintContext(e,t){return this.props.rubberBand?{mode:t==="update"?"elastic":t==="end"?"rebound":"hard"}:{mode:"hard"}}_getReboundTransition(e,t){if(e.mode!=="rebound")return null;const n=t.getViewportProps();return Object.keys(n).some(s=>!we(this.props[s],n[s],1))?{...this._getTransitionProps(),transitionDuration:X2,transitionEasing:K2}:null}_onPanStart(e){const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;let n=this.isFunctionKeyPressed(e)||e.rightButton||!1;(this.invertPan||this.dragMode==="pan")&&(n=!n);const r=n?"pan":"rotate",s=this._getConstraintContext(r,"start"),o=n?this.controllerState.panStart({pos:t},s):this.controllerState.rotateStart({pos:t},s);return this._panMove=n,this.updateViewport(o,Ve,{isDragging:!0}),!0}_onPan(e){return this.isDragging()?this._panMove?this._onPanMove(e):this._onPanRotate(e):!1}_onPanEnd(e){return this.isDragging()?this._panMove?this._onPanMoveEnd(e):this._onPanRotateEnd(e):!1}_onPanMove(e){if(!this.dragPan)return!1;const t=this.getCenter(e),n=this.controllerState.pan({pos:t},this._getConstraintContext("pan","update"));return this.updateViewport(n,Ve,{isDragging:!0,isPanning:!0}),!0}_onPanMoveEnd(e){const{inertia:t}=this;if(this.dragPan&&t&&e.velocity){const n=this.getCenter(e),r=[n[0]+e.velocityX*t/2,n[1]+e.velocityY*t/2],s=this.controllerState.pan({pos:r}).panEnd();this.updateViewport(s,{...this._getTransitionProps(),transitionDuration:t,transitionEasing:lo},{isDragging:!1,isPanning:!0})}else{const n=this.controllerState,r=this._getConstraintContext("pan","end"),s=n.panEnd(r),o=this._getReboundTransition(r,s);this.updateViewport(s,o,{isDragging:!1,isPanning:!!o})}return!0}_onPanRotate(e){if(!this.dragRotate)return!1;const t=this.getCenter(e),n=this.controllerState.rotate({pos:t},this._getConstraintContext("rotate","update"));return this.updateViewport(n,Ve,{isDragging:!0,isRotating:!0}),!0}_onPanRotateEnd(e){const{inertia:t}=this;if(this.dragRotate&&t&&e.velocity){const n=this.getCenter(e),r=[n[0]+e.velocityX*t/2,n[1]+e.velocityY*t/2],s=this.controllerState.rotate({pos:r}).rotateEnd();this.updateViewport(s,{...this._getTransitionProps(),transitionDuration:t,transitionEasing:lo},{isDragging:!1,isRotating:!0})}else{const n=this.controllerState,r=this._getConstraintContext("rotate","end"),s=n.rotateEnd(r),o=this._getReboundTransition(r,s);this.updateViewport(s,o,{isDragging:!1,isRotating:!!o})}return!0}_onWheel(e){if(!this.scrollZoom||this.trackpadGesture&&e.device!=="mouse")return!1;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;e.srcEvent.preventDefault();const{speed:n=.01,smooth:r=!1}=this.scrollZoom===!0?{}:this.scrollZoom,{delta:s}=e;let o=2/(1+Math.exp(-Math.abs(s*n)));s<0&&o!==0&&(o=1/o);const a=this.getZoomPosition(t),c=r?{...this._getTransitionProps({around:a}),transitionDuration:250}:Ve,l=this.controllerState.zoom({pos:a,scale:o});return this.updateViewport(l,c,{isZooming:!0,isPanning:!0}),r||this._setInteractionState({isZooming:!1,isPanning:!1}),!0}_onMultiPanStart(e){const{multiTouchDrag:t}=this;if(!t||!this._isMultiPanEventAllowed(e,t))return!1;const n=e.offsetCenter;if(!this.isPointInBounds(this.getCenter(e),e))return!1;const r=e.pointerType==="trackpad",s={x:n.x-(r?0:e.deltaX),y:n.y-(r?0:e.deltaY)},o={...e,offsetCenter:s},a=this.getCenter(o),c=t==="pan"?this.controllerState.panStart({pos:a},this._getConstraintContext("pan","start")):this.controllerState.rotateStart({pos:a},this._getConstraintContext("rotate","start"));return this._multiPanMode=t,this._multiPanStartCenter=s,this.updateViewport(c,Ve,{isDragging:!0}),!0}_onMultiPan(e){const{mode:t,event:n}=this._getMultiPanEvent(e);return!t||!n||!this.isDragging()?!1:t==="pan"?this._onPanMove(n):this._onPanRotate(n)}_onMultiPanEnd(e){const{mode:t,event:n}=this._getMultiPanEvent(e);if(!t||!n||!this.isDragging())return this._resetMultiPan(),!1;const r=t==="pan"?this._onPanMoveEnd(n):this._onPanRotateEnd(n);return this._resetMultiPan(),r}_isTrackpadGestureAllowed(e){return e.pointerType!=="trackpad"||this.trackpadGesture}_isMultiPanEventAllowed(e,t){return e.pointerType==="trackpad"?this.trackpadGesture&&(t==="pan"?this.dragPan:this.dragRotate):e.pointerType==="touch"&&(t==="pan"?this.dragPan:this.dragRotate)}_getMultiPanEvent(e){const t=this._multiPanMode,n=this._multiPanStartCenter;return!t||!n?{mode:null,event:null}:{mode:t,event:{...e,offsetCenter:{x:n.x+e.deltaX,y:n.y+e.deltaY}}}}_resetMultiPan(){this._multiPanMode=null,this._multiPanStartCenter=null}_onPinchStart(e){this._doubleClickDragAnchor=null;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;const n=this.controllerState.zoomStart({pos:this.getZoomPosition(t)},this._getConstraintContext("zoom","start")).rotateStart({pos:t},this._getConstraintContext("rotate","start"));return yt._startPinchRotation=e.rotation,yt._lastPinchEvent=e,this.updateViewport(n,Ve,{isDragging:!0}),!0}_onPinch(e){if(!this.touchZoom&&!this.touchRotate||!this.isDragging())return!1;let t=this.controllerState;if(this.touchZoom){const{scale:n}=e,r=this.getCenter(e);t=t.zoom({pos:this.getZoomPosition(r),scale:n},this._getConstraintContext("zoom","update"))}if(this.touchRotate){const{rotation:n}=e;t=t.rotate({deltaAngleX:yt._startPinchRotation-n},this._getConstraintContext("rotate","update"))}return this.updateViewport(t,Ve,{isDragging:!0,isPanning:this.touchZoom,isZooming:this.touchZoom,isRotating:this.touchRotate}),yt._lastPinchEvent=e,!0}_onPinchEnd(e){if(!this.isDragging())return!1;const{inertia:t}=this,{_lastPinchEvent:n}=yt;if(this.touchZoom&&t&&n&&e.scale!==n.scale){const r=this.getCenter(e),s=this.getZoomPosition(r);let o=this.controllerState.rotateEnd();const a=Math.log2(e.scale),c=(a-Math.log2(n.scale))/(e.deltaTime-n.deltaTime),l=Math.pow(2,a+c*t/2);o=o.zoom({pos:s,scale:l}).zoomEnd(),this.updateViewport(o,{...this._getTransitionProps({around:s}),transitionDuration:t,transitionEasing:lo},{isDragging:!1,isPanning:this.touchZoom,isZooming:this.touchZoom,isRotating:!1}),this.blockEvents(t)}else{const r=this.controllerState,s=this._getConstraintContext("zoom","end"),o=this._getConstraintContext("rotate","end"),a=r.zoomEnd(s).rotateEnd(o),c=this._getReboundTransition(this.touchZoom?s:o,a);this.updateViewport(a,c,{isDragging:!1,isPanning:!!c&&this.touchZoom,isZooming:!!c&&this.touchZoom,isRotating:!!c&&this.touchRotate})}return yt._startPinchRotation=null,yt._lastPinchEvent=null,!0}_onDoubleClick(e){if(!this.doubleClickZoom||Date.now()<this._suppressDoubleClickUntil)return!1;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;const n=this.isFunctionKeyPressed(e),r=this.getZoomPosition(t),s=this.controllerState.zoom({pos:r,scale:n?.5:2});return this.updateViewport(s,this._getTransitionProps({around:r}),{isZooming:!0,isPanning:!0}),this.blockEvents(100),!0}_onDoubleClickDragStart(e){if(!this.doubleClickDragZoom)return this._doubleClickDragAnchor=null,!1;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return this._doubleClickDragAnchor=null,!1;this._doubleClickDragAnchor=this.getZoomPosition(t);let n=this.controllerState.zoomStart({pos:this._doubleClickDragAnchor},this._getConstraintContext("zoom","start"));return e.scale!==1&&(n=n.zoom({pos:this._doubleClickDragAnchor,scale:e.scale},this._getConstraintContext("zoom","update"))),this.updateViewport(n,Ve,{isDragging:!0,isPanning:!0,isZooming:!0}),!0}_onDoubleClickDrag(e){const t=this._doubleClickDragAnchor;if(!t)return!1;const n=this.controllerState.zoom({pos:t,scale:e.scale},this._getConstraintContext("zoom","update"));return this.updateViewport(n,Ve,{isDragging:!0,isPanning:!0,isZooming:!0}),!0}_onDoubleClickDragEnd(e){if(!this._doubleClickDragAnchor)return!1;this._doubleClickDragAnchor=null;const n=this.controllerState,r=this._getConstraintContext("zoom","end"),s=n.zoomEnd(r),o=this._getReboundTransition(r,s);return this.updateViewport(s,o,{isDragging:!1,isPanning:!!o,isZooming:!!o}),this._suppressDoubleClickUntil=Date.now()+100,this.blockEvents(100),!0}_onKeyDown(e){if(!this.keyboard)return!1;const t=this.isFunctionKeyPressed(e),{zoomSpeed:n,moveSpeed:r,rotateSpeedX:s,rotateSpeedY:o}=this.keyboard===!0?{}:this.keyboard,{controllerState:a}=this;let c;const l={};switch(e.srcEvent.code){case"Minus":c=t?a.zoomOut(n).zoomOut(n):a.zoomOut(n),l.isZooming=!0;break;case"Equal":c=t?a.zoomIn(n).zoomIn(n):a.zoomIn(n),l.isZooming=!0;break;case"ArrowLeft":t?(c=a.rotateLeft(s),l.isRotating=!0):(c=a.moveLeft(r),l.isPanning=!0);break;case"ArrowRight":t?(c=a.rotateRight(s),l.isRotating=!0):(c=a.moveRight(r),l.isPanning=!0);break;case"ArrowUp":t?(c=a.rotateUp(o),l.isRotating=!0):(c=a.moveUp(r),l.isPanning=!0);break;case"ArrowDown":t?(c=a.rotateDown(o),l.isRotating=!0):(c=a.moveDown(r),l.isPanning=!0);break;default:return!1}return this.updateViewport(c,this._getTransitionProps(),l),!0}_getTransitionProps(e){const{transition:t}=this;return!t||!t.transitionInterpolator?Ve:e?{...t,transitionInterpolator:new zc({...e,...t.transitionInterpolator.opts,makeViewport:this.controllerState.makeViewport})}:t}}const Pt=Symbol("constraintAround");class Q2{constructor(e,t,n,r){this.makeViewport=n,this._viewportProps=this.applyConstraints(e,r),this._state=t}getViewportProps(){return this._viewportProps}getState(){return this._state}}function uo(i,e,t){const n=i-e;return n&&Number.isFinite(n)?e+n*t/(t+Math.abs(n)):e}function Vr(i,e,t){const n=Te(Le((t==null?void 0:t.left)??0),i),r=Te(Le((t==null?void 0:t.right)??0),i),s=Te(Le((t==null?void 0:t.top)??0),e),o=Te(Le((t==null?void 0:t.bottom)??0),e);return{x:n,y:s,width:i-n-r,height:e-s-o}}function og(i,e,t){let[n,r]=i.project(e);return n=Number.isFinite(n)?n:i.width/2,r=Number.isFinite(r)?r:i.height/2,{left:n-t.x,right:t.x+t.width-n,top:r-t.y,bottom:t.y+t.height-r}}const Yu=5,J2=1.2,qu=512,ag=[[-1/0,-90],[1/0,90]],e3=1;function Ii([i,e]){if(Math.abs(e)>90&&(e=Math.sign(e)*90),Number.isFinite(i)){const[n,r]=Ot([i,e]);return[n,oe(r,0,qu)]}const[,t]=Ot([0,e]);return[i,oe(t,0,qu)]}class cg extends Q2{constructor(e){const{width:t,height:n,latitude:r,longitude:s,zoom:o,bearing:a=0,pitch:c=0,altitude:l=1.5,position:u=[0,0,0],maxZoom:f=20,minZoom:h=0,maxPitch:g=60,minPitch:p=0,startPanLngLat:m,startZoomLngLat:_,startRotatePos:y,startRotateLngLat:w,startBearing:b,startPitch:x,startZoom:S,normalize:L=!0,rubberBand:R=!1}=e,{[Pt]:O}=e;Q(Number.isFinite(s)),Q(Number.isFinite(r)),Q(Number.isFinite(o));const B=e.maxBounds||(L?ag:null),k=e.maxBoundsPadding||null;super({width:t,height:n,latitude:r,longitude:s,zoom:o,bearing:a,pitch:c,altitude:l,maxZoom:f,minZoom:h,maxPitch:g,minPitch:p,normalize:L,position:u,maxBounds:B,maxBoundsPadding:k,rubberBand:R,[Pt]:O},{startPanLngLat:m,startZoomLngLat:_,startRotatePos:y,startRotateLngLat:w,startBearing:b,startPitch:x,startZoom:S},e.makeViewport,e.constraintContext),this.getAltitude=e.getAltitude}panStart({pos:e},t){return this._getUpdatedState({startPanLngLat:this._unproject(e)},t)}pan({pos:e,startPos:t},n){const r=this.getState().startPanLngLat||this._unproject(t);if(!r)return this;const o=this.makeViewport(this.getViewportProps()).panByPosition(r,e);return this._getUpdatedState(o,n)}panEnd(e){return this._getUpdatedState({startPanLngLat:null},e)}rotateStart({pos:e}){var n;const t=(n=this.getAltitude)==null?void 0:n.call(this,e);return this._getUpdatedState({startRotatePos:e,startRotateLngLat:t!==void 0?this._unproject3D(e,t):void 0,startBearing:this.getViewportProps().bearing,startPitch:this.getViewportProps().pitch})}rotate({pos:e,deltaAngleX:t=0,deltaAngleY:n=0}){const{startRotatePos:r,startRotateLngLat:s,startBearing:o,startPitch:a}=this.getState();if(!r||o===void 0||a===void 0)return this;let c;if(e?c=this._getNewRotation(e,r,a,o):c={bearing:o+t,pitch:a+n},s){const l=this.makeViewport({...this.getViewportProps(),...c}),u="panByPosition3D"in l?"panByPosition3D":"panByPosition";return this._getUpdatedState({...c,...l[u](s,r)})}return this._getUpdatedState(c)}rotateEnd(){return this._getUpdatedState({startRotatePos:null,startRotateLngLat:null,startBearing:null,startPitch:null})}zoomStart({pos:e},t){return this._getUpdatedState({startZoomLngLat:this._unproject(e),startZoom:this.getViewportProps().zoom},t)}zoom({pos:e,startPos:t,scale:n},r){let{startZoom:s,startZoomLngLat:o}=this.getState();return o||(s=this.getViewportProps().zoom,o=this._unproject(t)||this._unproject(e)),o?this._getUpdatedState({zoom:s+Math.log2(n),[Pt]:{position:o,screenPosition:e}},r):this}zoomEnd(e){return this._getUpdatedState({startZoomLngLat:null,startZoom:null},e)}zoomIn(e=2,t){return this._zoomFromCenter(e,t)}zoomOut(e=2,t){return this._zoomFromCenter(1/e,t)}moveLeft(e=100,t){return this._panFromCenter([e,0],t)}moveRight(e=100,t){return this._panFromCenter([-e,0],t)}moveUp(e=100,t){return this._panFromCenter([0,e],t)}moveDown(e=100,t){return this._panFromCenter([0,-e],t)}rotateLeft(e=15){return this._getUpdatedState({bearing:this.getViewportProps().bearing-e})}rotateRight(e=15){return this._getUpdatedState({bearing:this.getViewportProps().bearing+e})}rotateUp(e=10){return this._getUpdatedState({pitch:this.getViewportProps().pitch+e})}rotateDown(e=10){return this._getUpdatedState({pitch:this.getViewportProps().pitch-e})}shortestPathFrom(e){const t=e.getViewportProps(),n={...this.getViewportProps()},{bearing:r,longitude:s}=n;return Math.abs(r-t.bearing)>180&&(n.bearing=r<0?r+360:r-360),Math.abs(s-t.longitude)>180&&(n.longitude=s<0?s+360:s-360),n}applyConstraints(e,t){const n=e,r=n[Pt];delete n[Pt];const{maxPitch:s,minPitch:o,pitch:a,bearing:c,normalize:l,maxBounds:u,rubberBand:f}=e;l&&(c<-180||c>180)&&(e.bearing=mi(c+180,360)-180),e.pitch=oe(a,o,s);const h=this._constrainZoom(e.zoom,e),g=f&&(t==null?void 0:t.mode)==="elastic";if(e.zoom=(t==null?void 0:t.mode)==="preserve"?e.zoom:g?uo(e.zoom,h,e3):h,r){const p=this.makeViewport(e);Object.assign(e,p.panByPosition(r.position,r.screenPosition))}if(l&&(e.longitude<-180||e.longitude>180)&&(e.longitude=mi(e.longitude+180,360)-180),u){const p=Vr(e.width,e.height,e.maxBoundsPadding),m=this.makeViewport({...e,bearing:0,pitch:0}),_=og(m,[e.longitude,e.latitude],p),y=Ii(u[0]),w=Ii(u[1]),b=2**e.zoom,x=[y[0]+_.left/b,y[1]+_.bottom/b],S=[w[0]-_.right/b,w[1]-_.top/b],L=Ii([e.longitude,e.latitude]),R=[oe(L[0],x[0],S[0]),oe(L[1],x[1],S[1])],O=L.slice();if(p.width>=0&&(O[0]=(t==null?void 0:t.mode)==="preserve"?L[0]:g?uo(L[0],R[0],p.width/2/b):R[0]),p.height>=0&&(O[1]=(t==null?void 0:t.mode)==="preserve"?L[1]:g?uo(L[1],R[1],p.height/2/b):R[1]),O[0]!==L[0]||O[1]!==L[1]){const[B,k]=En(O);O[0]!==L[0]&&(e.longitude=B),O[1]!==L[1]&&(e.latitude=k)}}return e}_constrainZoom(e,t){t||(t=this.getViewportProps());const{maxZoom:n,maxBounds:r}=t,s=r!==null&&t.width>0&&t.height>0;let{minZoom:o}=t;if(s){const a=Vr(t.width,t.height,t.maxBoundsPadding),c=Ii(r[0]),l=Ii(r[1]),u=l[0]-c[0],f=l[1]-c[1];a.width>0&&Number.isFinite(u)&&u>0&&(o=Math.max(o,Math.log2(a.width/u))),a.height>0&&Number.isFinite(f)&&f>0&&(o=Math.max(o,Math.log2(a.height/f))),o>n&&(o=n)}return oe(e,o,n)}_zoomFromCenter(e,t){const{width:n,height:r}=this.getViewportProps();return this.zoom({pos:[n/2,r/2],scale:e},t)}_panFromCenter(e,t){const{width:n,height:r}=this.getViewportProps();return this.pan({startPos:[n/2,r/2],pos:[n/2+e[0],r/2+e[1]]},t)}_getUpdatedState(e,t){return new this.constructor({makeViewport:this.makeViewport,...this.getViewportProps(),...this.getState(),...e,constraintContext:t})}_unproject(e){const t=this.makeViewport(this.getViewportProps());return e&&t.unproject(e)}_unproject3D(e,t){return this.makeViewport(this.getViewportProps()).unproject(e,{targetZ:t})}_getNewRotation(e,t,n,r){const s=e[0]-t[0],o=e[1]-t[1],a=e[1],c=t[1],{width:l,height:u}=this.getViewportProps(),f=s/l;let h=0;o>0?Math.abs(u-c)>Yu&&(h=o/(c-u)*J2):o<0&&c>Yu&&(h=1-a/c),h=oe(h,-1,1);const{minPitch:g,maxPitch:p}=this.getViewportProps(),m=r+180*f;let _=n;return h>0?_=n+h*(p-n):h<0&&(_=n-h*(g-n)),{pitch:_,bearing:m}}}class t3 extends sg{constructor(){super(...arguments),this.ControllerState=cg,this.transition={transitionDuration:300,transitionInterpolator:new zc({transitionProps:{compare:["longitude","latitude","zoom","bearing","pitch","position"],required:["longitude","latitude","zoom"]}})},this.dragMode="pan",this.rotationPivot="center",this._getAltitude=e=>{if(this.rotationPivot==="2d")return 0;if(this.rotationPivot==="3d"&&this.pickPosition){const{x:t,y:n}=this.props,r=this.pickPosition(t+e[0],n+e[1]);if(r&&r.coordinate&&r.coordinate.length>=3)return r.coordinate[2]}}}setProps(e){"rotationPivot"in e&&(this.rotationPivot=e.rotationPivot||"center"),e.getAltitude=this._getAltitude,e.position=e.position||[0,0,0],e.maxBounds=e.maxBounds||(e.normalize===!1?null:ag),super.setProps(e)}updateViewport(e,t=null,n={}){const r=e.getState();n.isDragging&&r.startRotateLngLat?n={...n,rotationPivotPosition:r.startRotateLngLat}:n.isDragging===!1&&(n={...n,rotationPivotPosition:void 0}),super.updateViewport(e,t,n)}}let $c=class extends ng{constructor(e={}){super(e)}getViewportType(){return it}get ControllerType(){return t3}};$c.displayName="MapView";const i3=new Zd;function n3(i,e){const t=i.order??1/0,n=e.order??1/0;return t-n}class r3{constructor(e){this._resolvedEffects=[],this._defaultEffects=[],this.effects=[],this._context=e,this._needsRedraw="Initial render",this._setEffects([])}addDefaultEffect(e){const t=this._defaultEffects;if(!t.find(n=>n.id===e.id)){const n=t.findIndex(r=>n3(r,e)>0);n<0?t.push(e):t.splice(n,0,e),e.setup(this._context),this._setEffects(this.effects)}}setProps(e){"effects"in e&&(we(e.effects,this.effects,1)||this._setEffects(e.effects))}needsRedraw(e={clearRedrawFlags:!1}){const t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}getEffects(){return this._resolvedEffects}_setEffects(e){const t={};for(const r of this.effects)t[r.id]=r;const n=[];for(const r of e){const s=t[r.id];let o=r;s&&s!==r?s.setProps?(s.setProps(r.props),o=s):s.cleanup(this._context):s||r.setup(this._context),n.push(o),delete t[r.id]}for(const r in t)t[r].cleanup(this._context);this.effects=n,this._resolvedEffects=n.concat(this._defaultEffects),e.some(r=>r instanceof Zd)||this._resolvedEffects.push(i3),this._needsRedraw="effects changed"}finalize(){for(const e of this._resolvedEffects)e.cleanup(this._context);this.effects.length=0,this._resolvedEffects.length=0,this._defaultEffects.length=0}}class s3 extends Fc{shouldDrawLayer(e){const{operation:t}=e.props;return t.includes("draw")||t.includes("terrain")}render(e){return this._render(e)}}const o3="deckRenderer.renderLayers";class a3{constructor(e,t={}){this.device=e,this.stats=t.stats,this.layerFilter=null,this.drawPickingColors=!1,this.drawLayersPass=new s3(e),this.pickLayersPass=new tg(e),this.renderCount=0,this._needsRedraw="Initial render",this.renderBuffers=[],this.lastPostProcessEffect=null}setProps(e){this.layerFilter!==e.layerFilter&&(this.layerFilter=e.layerFilter,this._needsRedraw="layerFilter changed"),this.drawPickingColors!==e.drawPickingColors&&(this.drawPickingColors=e.drawPickingColors,this._needsRedraw="drawPickingColors changed")}renderLayers(e){const t=this.drawPickingColors?this.pickLayersPass:this.drawLayersPass,n={layerFilter:this.layerFilter,isPicking:this.drawPickingColors,...e};if(!e.viewports.length){const a=t.render(n),c="stats"in a?a.stats:a;this._updateStats(c);return}n.effects&&this._preRender(n.effects,n);const r=this.lastPostProcessEffect?this.renderBuffers[0]:n.target;this.lastPostProcessEffect&&(n.clearColor=[0,0,0,0],n.clearCanvas=!0);const s=t.render({...n,target:r}),o="stats"in s?s.stats:s;n.effects&&(this.lastPostProcessEffect&&(n.clearCanvas=e.clearCanvas===void 0?!0:e.clearCanvas),this._postRender(n.effects,n)),this.renderCount++,_e(o3,this,o,e),this._updateStats(o)}needsRedraw(e={clearRedrawFlags:!1}){const t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}finalize(){const{renderBuffers:e}=this;for(const t of e)t.delete();e.length=0}_updateStats(e){if(!this.stats)return;let t=0;for(const{visibleCount:n}of e)t+=n;this.stats.get("Layers rendered").addCount(t)}_preRender(e,t){this.lastPostProcessEffect=null,t.preRenderStats=t.preRenderStats||{};for(const n of e)t.preRenderStats[n.id]=n.preRender(t),n.postRender&&(this.lastPostProcessEffect=n.id);this.lastPostProcessEffect&&this._resizeRenderBuffers(t.canvasContext)}_resizeRenderBuffers(e=this.device.canvasContext){const{renderBuffers:t}=this,n=e.getDrawingBufferSize(),[r,s]=n;t.length===0&&[0,1].map(o=>{const a=this.device.createTexture({sampler:{minFilter:"linear",magFilter:"linear"},width:r,height:s});t.push(this.device.createFramebuffer({id:`deck-renderbuffer-${o}`,colorAttachments:[a]}))});for(const o of t)o.resize(n)}_postRender(e,t){var o;const{renderBuffers:n}=this,r=t.target??((o=t.canvasContext)==null?void 0:o.getCurrentFramebuffer())??t.target,s={...t,inputBuffer:n[0],swapBuffer:n[1]};for(const a of e)if(a.postRender){s.target=a.id===this.lastPostProcessEffect?r:void 0;const c=a.postRender(s);s.inputBuffer=c,s.swapBuffer=c===n[0]?n[1]:n[0]}}}const c3={pickedColor:null,pickedObjectIndex:-1};function Zu({pickedColors:i,decodePickingColor:e,deviceX:t,deviceY:n,deviceRadius:r,deviceRect:s}){const{x:o,y:a,width:c,height:l}=s;let u=r*r,f=-1,h=0;for(let g=0;g<l;g++){const p=g+a-n,m=p*p;if(m>u)h+=4*c;else for(let _=0;_<c;_++){if(i[h+3]-1>=0){const w=_+o-t,b=w*w+m;b<=u&&(u=b,f=h)}h+=4}}if(f>=0){const g=i.slice(f,f+4),p=e(g);if(p){const m=Math.floor(f/4/c),_=f/4-m*c;return{...p,pickedColor:g,pickedX:o+_,pickedY:a+m}}q.error("Picked non-existent layer. Is picking buffer corrupt?")()}return c3}function Xu({pickedColors:i,decodePickingColor:e}){const t=new Map;if(i){for(let n=0;n<i.length;n+=4)if(i[n+3]-1>=0){const s=i.slice(n,n+4),o=s.join(",");if(!t.has(o)){const a=e(s);a?t.set(o,{...a,color:s}):q.error("Picked non-existent layer. Is picking buffer corrupt?")()}}}return Array.from(t.values())}function Ma({pickInfo:i,viewports:e,pixelRatio:t,x:n,y:r,z:s}){let o=e[0];e.length>1&&(o=l3((i==null?void 0:i.pickedViewports)||e,{x:n,y:r}));let a;if(o){const c=[n-o.x,r-o.y];s!==void 0&&(c[2]=s),a=o.unproject(c)}return{color:null,layer:null,viewport:o,index:-1,picked:!1,x:n,y:r,pixel:[n,r],coordinate:a,devicePixel:i&&"pickedX"in i?[i.pickedX,i.pickedY]:void 0,pixelRatio:t}}function Ku(i){const{pickInfo:e,lastPickedInfo:t,mode:n,layers:r}=i,{pickedColor:s,pickedLayer:o,pickedObjectIndex:a}=e,c=o?[o]:[];if(n==="hover"){const f=t.index,h=t.layerId,g=o?o.props.id:null;if(g!==h||a!==f){if(g!==h){const p=r.find(m=>m.props.id===h);p&&c.unshift(p)}t.layerId=g,t.index=a,t.info=null}}const l=Ma(i),u=new Map;return u.set(null,l),c.forEach(f=>{let h={...l};f===o&&(h.color=s,h.index=a,h.picked=!0),h=Ia({layer:f,info:h,mode:n});const g=h.layer;f===o&&n==="hover"&&(t.info=h),u.set(g.id,h),n==="hover"&&g.updateAutoHighlight(h)}),u}function Ia({layer:i,info:e,mode:t}){for(;i&&e;){const n=e.layer||null;e.sourceLayer=n,e.layer=i,e=i.getPickingInfo({info:e,mode:t,sourceLayer:n}),i=i.parent}return e}function l3(i,e){for(let t=i.length-1;t>=0;t--){const n=i[t];if(n.containsPixel(e))return n}return i[0]}class u3{constructor(e,t={}){this._pickable=!0,this.device=e,this.stats=t.stats,this.pickLayersPass=new tg(e),this.lastPickedInfo={index:-1,layerId:null,info:null}}setProps(e){"layerFilter"in e&&(this.layerFilter=e.layerFilter),"_pickable"in e&&(this._pickable=e._pickable)}finalize(){this.pickingFBO&&this.pickingFBO.destroy(),this.depthFBO&&this.depthFBO.destroy()}pickObjectAsync(e){return this._pickClosestObjectAsync(e)}pickObjectsAsync(e){return this._pickVisibleObjectsAsync(e)}pickObject(e){return this._pickClosestObject(e)}pickObjects(e){return this._pickVisibleObjects(e)}getLastPickedObject({x:e,y:t,layers:n,viewports:r},s=this.lastPickedInfo.info){const o=s&&s.layer&&s.layer.id,a=s&&s.viewport&&s.viewport.id,c=o?n.find(h=>h.id===o):null,l=a&&r.find(h=>h.id===a)||r[0],u=l&&l.unproject([e-l.x,t-l.y]);return{...s,...{x:e,y:t,viewport:l,coordinate:u,layer:c}}}_resizeBuffer(e=this.device.getDefaultCanvasContext()){var r,s;if(!this.pickingFBO){const o=this.device.createTexture({format:"rgba8unorm",width:1,height:1,usage:he.RENDER_ATTACHMENT|he.COPY_SRC});if(this.pickingFBO=this.device.createFramebuffer({colorAttachments:[o],depthStencilAttachment:"depth16unorm"}),this.device.isTextureFormatRenderable("rgba32float")){const a=this.device.createTexture({format:"rgba32float",width:1,height:1,usage:he.RENDER_ATTACHMENT|he.COPY_SRC}),c=this.device.createFramebuffer({colorAttachments:[a],depthStencilAttachment:"depth16unorm"});this.depthFBO=c}}const[t,n]=e.getDrawingBufferSize();(r=this.pickingFBO)==null||r.resize({width:t,height:n}),(s=this.depthFBO)==null||s.resize({width:t,height:n})}_getPickable(e){if(this._pickable===!1)return null;const t=e.filter(n=>this.pickLayersPass.shouldDrawLayer(n)&&!n.isComposite);return t.length?t:null}async _pickClosestObjectAsync({layers:e,views:t,viewports:n,x:r,y:s,radius:o=0,depth:a=1,mode:c="query",unproject3D:l,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:h}){const g=u.cssToDeviceRatio(),p=this._getPickable(e);if(!p||n.length===0)return{result:[],emptyInfo:Ma({viewports:n,x:r,y:s,pixelRatio:g})};this._resizeBuffer(u);const m=u.cssToDevicePixels([r,s],!0),_=[m.x+Math.floor(m.width/2),m.y+Math.floor(m.height/2)],y=Math.round(o*g),{width:w,height:b}=this.pickingFBO,x=this._getPickingRect({deviceX:_[0],deviceY:_[1],deviceRadius:y,deviceWidth:w,deviceHeight:b}),S={x:r-o,y:s-o,width:o*2+1,height:o*2+1};let L;const R=[],O=new Set;for(let B=0;B<a;B++){let k;if(x){const N=await this._drawAndSampleAsync({layers:p,views:t,viewports:n,onViewportActive:f,deviceRect:x,cullRect:S,effects:h,pass:`picking:${c}`,canvasContext:u});k=Zu({...N,deviceX:_[0],deviceY:_[1],deviceRadius:y,deviceRect:x})}else k={pickedColor:null,pickedObjectIndex:-1};let U;const $=this._getDepthLayers(k,p,l);if($.length>0){const{pickedColors:N}=await this._drawAndSampleAsync({layers:$,views:t,viewports:n,onViewportActive:f,deviceRect:{x:k.pickedX??_[0],y:k.pickedY??_[1],width:1,height:1},cullRect:S,effects:h,pass:`picking:${c}:z`,canvasContext:u},!0);N[3]&&(U=N[0])}k.pickedLayer&&B+1<a&&(O.add(k.pickedLayer),k.pickedLayer.disablePickingIndex(k.pickedObjectIndex)),L=Ku({pickInfo:k,lastPickedInfo:this.lastPickedInfo,mode:c,layers:p,viewports:n,x:r,y:s,z:U,pixelRatio:g});for(const N of L.values())N.layer&&R.push(N);if(!k.pickedColor)break}for(const B of O)B.restorePickingColors();return{result:R,emptyInfo:L.get(null)}}_pickClosestObject({layers:e,views:t,viewports:n,x:r,y:s,radius:o=0,depth:a=1,mode:c="query",unproject3D:l,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:h}){const g=u.cssToDeviceRatio(),p=this._getPickable(e);if(!p||n.length===0)return{result:[],emptyInfo:Ma({viewports:n,x:r,y:s,pixelRatio:g})};this._resizeBuffer(u);const m=u.cssToDevicePixels([r,s],!0),_=[m.x+Math.floor(m.width/2),m.y+Math.floor(m.height/2)],y=Math.round(o*g),{width:w,height:b}=this.pickingFBO,x=this._getPickingRect({deviceX:_[0],deviceY:_[1],deviceRadius:y,deviceWidth:w,deviceHeight:b}),S={x:r-o,y:s-o,width:o*2+1,height:o*2+1};let L;const R=[],O=new Set;for(let B=0;B<a;B++){let k;if(x){const N=this._drawAndSample({layers:p,views:t,viewports:n,onViewportActive:f,deviceRect:x,cullRect:S,effects:h,pass:`picking:${c}`,canvasContext:u});k=Zu({...N,deviceX:_[0],deviceY:_[1],deviceRadius:y,deviceRect:x})}else k={pickedColor:null,pickedObjectIndex:-1};let U;const $=this._getDepthLayers(k,p,l);if($.length>0){const{pickedColors:N}=this._drawAndSample({layers:$,views:t,viewports:n,onViewportActive:f,deviceRect:{x:k.pickedX??_[0],y:k.pickedY??_[1],width:1,height:1},cullRect:S,effects:h,pass:`picking:${c}:z`,canvasContext:u},!0);N[3]&&(U=N[0])}k.pickedLayer&&B+1<a&&(O.add(k.pickedLayer),k.pickedLayer.disablePickingIndex(k.pickedObjectIndex)),L=Ku({pickInfo:k,lastPickedInfo:this.lastPickedInfo,mode:c,layers:p,viewports:n,x:r,y:s,z:U,pixelRatio:g});for(const N of L.values())N.layer&&R.push(N);if(!k.pickedColor)break}for(const B of O)B.restorePickingColors();return{result:R,emptyInfo:L.get(null)}}async _pickVisibleObjectsAsync({layers:e,views:t,viewports:n,x:r,y:s,width:o=1,height:a=1,mode:c="query",maxObjects:l=null,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:h}){const g=this._getPickable(e);if(!g||n.length===0)return[];this._resizeBuffer(u);const p=u.cssToDeviceRatio(),m=u.cssToDevicePixels([r,s],!0),_=m.x,y=m.y+m.height,w=u.cssToDevicePixels([r+o,s+a],!0),b=w.x+w.width,x=w.y,S={x:_,y:x,width:b-_,height:y-x},L=await this._drawAndSampleAsync({layers:g,views:t,viewports:n,onViewportActive:f,deviceRect:S,cullRect:{x:r,y:s,width:o,height:a},effects:h,pass:`picking:${c}`,canvasContext:u}),R=Xu(L),O=new Map,B=[],k=Number.isFinite(l);for(let U=0;U<R.length&&!(k&&B.length>=l);U++){const $=R[U];let N={color:$.pickedColor,layer:null,index:$.pickedObjectIndex,picked:!0,x:r,y:s,pixelRatio:p};N=Ia({layer:$.pickedLayer,info:N,mode:c});const z=N.layer.id;O.has(z)||O.set(z,new Set);const ie=O.get(z),v=N.object??N.index;ie.has(v)||(ie.add(v),B.push(N))}return B}_pickVisibleObjects({layers:e,views:t,viewports:n,x:r,y:s,width:o=1,height:a=1,mode:c="query",maxObjects:l=null,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:h}){const g=this._getPickable(e);if(!g||n.length===0)return[];this._resizeBuffer(u);const p=u.cssToDeviceRatio(),m=u.cssToDevicePixels([r,s],!0),_=m.x,y=m.y+m.height,w=u.cssToDevicePixels([r+o,s+a],!0),b=w.x+w.width,x=w.y,S={x:_,y:x,width:b-_,height:y-x},L=this._drawAndSample({layers:g,views:t,viewports:n,onViewportActive:f,deviceRect:S,cullRect:{x:r,y:s,width:o,height:a},effects:h,pass:`picking:${c}`,canvasContext:u}),R=Xu(L),O=new Map,B=[],k=Number.isFinite(l);for(let U=0;U<R.length&&!(k&&B.length>=l);U++){const $=R[U];let N={color:$.pickedColor,layer:null,index:$.pickedObjectIndex,picked:!0,x:r,y:s,pixelRatio:p};N=Ia({layer:$.pickedLayer,info:N,mode:c});const z=N.layer.id;O.has(z)||O.set(z,new Set);const ie=O.get(z),v=N.object??N.index;ie.has(v)||(ie.add(v),B.push(N))}return B}async _drawAndSampleAsync({layers:e,views:t,viewports:n,onViewportActive:r,deviceRect:s,cullRect:o,effects:a,pass:c,canvasContext:l},u=!1){var S;const f=u?this.depthFBO:this.pickingFBO,h={layers:e,layerFilter:this.layerFilter,views:t,viewports:n,onViewportActive:r,pickingFBO:f,deviceRect:s,cullRect:o,effects:a,pass:c,canvasContext:l,pickZ:u,preRenderStats:{},isPicking:!0};for(const L of a)L.useInPicking&&(h.preRenderStats[L.id]=L.preRender(h));const{decodePickingColor:g,stats:p}=this.pickLayersPass.render(h);this._updateStats(p);const{x:m,y:_,width:y,height:w}=s,b=(S=f.colorAttachments[0])==null?void 0:S.texture;if(!b)throw new Error("Picking framebuffer color attachment is missing");const x=await this._readTextureDataAsync(b,{x:m,y:_,width:y,height:w},u?Float32Array:Uint8Array);if(!u){let L=!1;for(let R=3;R<x.length;R+=4)if(x[R]!==0){L=!0;break}!L&&x.length>0&&q.warn("Async pick readback returned only zero alpha values",{deviceRect:s,bytes:Array.from(x.subarray(0,Math.min(x.length,16)))})()}return{pickedColors:x,decodePickingColor:g}}async _readTextureDataAsync(e,t,n){const{width:r,height:s}=t,o=e.computeMemoryLayout(t),a=this.device.createBuffer({byteLength:o.byteLength,usage:j.COPY_DST|j.MAP_READ});try{e.readBuffer(t,a);const c=await a.readAsync(0,o.byteLength),l=n.BYTES_PER_ELEMENT;if(o.bytesPerRow%l!==0)throw new Error(`Texture readback row stride ${o.bytesPerRow} is not aligned to ${l}-byte elements.`);const u=new n(c.buffer,c.byteOffset,o.byteLength/l),f=r*4,h=o.bytesPerRow/l;if(h<f)throw new Error(`Texture readback row stride ${h} is smaller than packed row length ${f}.`);const g=new n(r*s*4);for(let p=0;p<s;p++){const m=p*h;g.set(u.subarray(m,m+f),p*f)}return g}finally{a.destroy()}}_drawAndSample({layers:e,views:t,viewports:n,onViewportActive:r,deviceRect:s,cullRect:o,effects:a,pass:c,canvasContext:l},u=!1){const f=u?this.depthFBO:this.pickingFBO,h={layers:e,layerFilter:this.layerFilter,views:t,viewports:n,onViewportActive:r,pickingFBO:f,deviceRect:s,cullRect:o,effects:a,pass:c,canvasContext:l,pickZ:u,preRenderStats:{},isPicking:!0};for(const x of a)x.useInPicking&&(h.preRenderStats[x.id]=x.preRender(h));const{decodePickingColor:g,stats:p}=this.pickLayersPass.render(h);this._updateStats(p);const{x:m,y:_,width:y,height:w}=s,b=new(u?Float32Array:Uint8Array)(y*w*4);return this.device.readPixelsToArrayWebGL(f,{sourceX:m,sourceY:_,sourceWidth:y,sourceHeight:w,target:b}),{pickedColors:b,decodePickingColor:g}}_updateStats(e){if(!this.stats)return;let t=0;for(const{visibleCount:n}of e)t+=n;this.stats.get("Layers picked").addCount(t)}_getDepthLayers(e,t,n){var o;if(!n||!this.depthFBO)return[];const{pickedLayer:r}=e,s=((o=r==null?void 0:r.state)==null?void 0:o.terrainDrawMode)==="drape";return r&&!s?[r]:t.filter(a=>a.props.operation.includes("terrain"))}_getPickingRect({deviceX:e,deviceY:t,deviceRadius:n,deviceWidth:r,deviceHeight:s}){const o=Math.max(0,e-n),a=Math.max(0,t-n),c=Math.min(r,e+n+1)-o,l=Math.min(s,t+n+1)-a;return c<=0||l<=0?null:{x:o,y:a,width:c,height:l}}}const f3={"top-left":{top:0,left:0},"top-right":{top:0,right:0},"bottom-left":{bottom:0,left:0},"bottom-right":{bottom:0,right:0},fill:{top:0,left:0,bottom:0,right:0}},h3="top-left",Qu="root";class d3{constructor({deck:e,parentElement:t}){this.defaultWidgets=[],this.widgets=[],this.resolvedWidgets=[],this.containers={},this.lastViewports={},this.deck=e,t==null||t.classList.add("deck-widget-container"),this.parentElement=t}getWidgets(){return this.resolvedWidgets}setProps(e){if(e.widgets&&!we(e.widgets,this.widgets,1)){const t=e.widgets.filter(Boolean);this._setWidgets(t)}}finalize(){for(const e of this.getWidgets())this._removeWidget(e);this.defaultWidgets.length=0,this.resolvedWidgets.length=0;for(const e in this.containers)this.containers[e].remove()}addDefault(e){this.defaultWidgets.find(t=>t.id===e.id)||(this._addWidget(e),this.defaultWidgets.push(e),this._setWidgets(this.widgets))}onRedraw({viewports:e,layers:t}){var r,s;const n=e.reduce((o,a)=>(o[a.id]=a,o),{});for(const o of this.getWidgets()){const{viewId:a}=o;if(a){const c=n[a];c&&(o.onViewportChange&&o.onViewportChange(c),(r=o.onRedraw)==null||r.call(o,{viewports:[c],layers:t}))}else{if(o.onViewportChange)for(const c of e)o.onViewportChange(c);(s=o.onRedraw)==null||s.call(o,{viewports:e,layers:t})}}this.lastViewports=n,this._updateContainers()}onHover(e,t){var n,r;for(const s of this.getWidgets()){const{viewId:o}=s;(!o||o===((n=e.viewport)==null?void 0:n.id))&&((r=s.onHover)==null||r.call(s,e,t))}}getCanvasBounds(e){var o,a,c,l,u,f,h;const t=(a=(o=this.deck)==null?void 0:o.getCanvas)==null?void 0:a.call(o),n=t==null?void 0:t.getBoundingClientRect(),r=(c=this.parentElement)==null?void 0:c.getBoundingClientRect(),s=(u=(l=this.deck)==null?void 0:l.getCanvasContext)==null?void 0:u.call(l,e==null?void 0:e.id);if(s&&r){s.updatePosition();const[g,p]=s.getPosition(),[m,_]=s.getCSSSize();return{x:g-r.left,y:p-r.top,width:m,height:_}}return{x:n&&r?n.left-r.left:0,y:n&&r?n.top-r.top:0,width:(n==null?void 0:n.width)||((f=this.deck)==null?void 0:f.width)||0,height:(n==null?void 0:n.height)||((h=this.deck)==null?void 0:h.height)||0}}onEvent(e,t){var r,s;const n=sr[t.type];if(n)for(const o of this.getWidgets()){const{viewId:a}=o;(!a||a===((r=e.viewport)==null?void 0:r.id))&&((s=o[n])==null||s.call(o,e,t))}}_setWidgets(e){const t={};for(const n of this.resolvedWidgets)t[n.id]=n;this.resolvedWidgets.length=0;for(const n of this.defaultWidgets)t[n.id]=null,this.resolvedWidgets.push(n);for(let n of e){const r=t[n.id];r?r.viewId!==n.viewId||r.placement!==n.placement?(this._removeWidget(r),this._addWidget(n)):n!==r&&(r.setProps(n.props),n=r):this._addWidget(n),t[n.id]=null,this.resolvedWidgets.push(n)}for(const n in t){const r=t[n];r&&this._removeWidget(r)}this.widgets=e}_addWidget(e){const{viewId:t=null,placement:n=h3}=e,r=e.props._container??t;e.widgetManager=this,e.deck=this.deck,e.rootElement=e._onAdd({deck:this.deck,viewId:t}),e.rootElement&&this._getContainer(r,n).append(e.rootElement),e.updateHTML()}_removeWidget(e){var t;(t=e.onRemove)==null||t.call(e),e.rootElement&&e.rootElement.remove(),e.rootElement=void 0,e.deck=void 0,e.widgetManager=void 0}_getContainer(e,t){var o;if(e&&typeof e!="string")return e;const n=e||Qu;let r=this.containers[n];r||(r=document.createElement("div"),r.style.pointerEvents="none",r.style.position="absolute",r.style.overflow="hidden",(o=this.parentElement)==null||o.append(r),this.containers[n]=r);let s=r.querySelector(`.${t}`);return s||(s=globalThis.document.createElement("div"),s.className=t,s.style.position="absolute",s.style.zIndex="2",Object.assign(s.style,f3[t]),r.append(s)),s}_updateContainers(){for(const e in this.containers){const t=this.lastViewports[e]||null,n=e===Qu||t,r=this.containers[e];if(n){const s=this._getContainerBounds(t);r.style.display="block",r.style.left=`${s.x}px`,r.style.top=`${s.y}px`,r.style.width=`${s.width}px`,r.style.height=`${s.height}px`}else r.style.display="none"}}_getContainerBounds(e){var n,r;if(!e)return{x:0,y:0,width:((n=this.parentElement)==null?void 0:n.clientWidth)||this.deck.width,height:((r=this.parentElement)==null?void 0:r.clientHeight)||this.deck.height};const t=this.getCanvasBounds(e);return{x:t.x+e.x,y:t.y+e.y,width:e.width,height:e.height}}}function Ju(i,e){e&&Object.entries(e).map(([t,n])=>{t.startsWith("--")?i.style.setProperty(t,n):i.style[t]=n})}function g3(i,e){e&&Object.keys(e).map(t=>{t.startsWith("--")?i.style.removeProperty(t):i.style[t]=""})}class Gc{constructor(e){this.viewId=null,this.props={...this.constructor.defaultProps,...e},this.id=this.props.id}setProps(e){const t=this.props,n=this.rootElement;n&&t.className!==e.className&&(t.className&&n.classList.remove(t.className),e.className&&n.classList.add(e.className)),n&&!we(t.style,e.style,1)&&(g3(n,t.style),Ju(n,e.style)),Object.assign(this.props,e),this.updateHTML()}updateHTML(){this.rootElement&&this.onRenderHTML(this.rootElement)}get viewIds(){var e;return this.viewId?[this.viewId]:((e=this.deck)==null?void 0:e.getViews().map(t=>t.id))??[]}getViewState(e){var t,n;return((n=(t=this.deck)==null?void 0:t.viewManager)==null?void 0:n.getViewState(e))||{}}setViewState(e,t){var n;(n=this.deck)==null||n._onViewStateChange({viewId:e,viewState:t,interactionState:{}})}onCreateRootElement(){const e=["deck-widget",this.className,this.props.className],t=document.createElement("div");return e.filter(n=>typeof n=="string"&&n.length>0).forEach(n=>t.classList.add(n)),Ju(t,this.props.style),t}_onAdd(e){return this.onAdd(e)??this.onCreateRootElement()}onAdd(e){}onRemove(){}onViewportChange(e){}onRedraw(e){}onHover(e,t){}onClick(e,t){}onDrag(e,t){}onDragStart(e,t){}onDragEnd(e,t){}}Gc.defaultProps={id:"widget",style:{},_container:null,className:""};const p3={zIndex:"1",position:"absolute",pointerEvents:"none",color:"#a0a7b4",backgroundColor:"#29323c",padding:"10px",top:"0",left:"0",display:"none"};class lg extends Gc{constructor(e={}){super(e),this.id="default-tooltip",this.placement="fill",this.className="deck-tooltip",this.isVisible=!1,this.setProps(e)}onCreateRootElement(){const e=document.createElement("div");return e.className=this.className,Object.assign(e.style,p3),e}onRenderHTML(e){}onViewportChange(e){var t;this.isVisible&&e.id===((t=this.lastViewport)==null?void 0:t.id)&&!e.equals(this.lastViewport)&&this.setTooltip(null),this.lastViewport=e}onHover(e){var c;const{deck:t}=this,n=t&&t.props.getTooltip;if(!n)return;const r=n(e),s=(c=this.widgetManager)==null?void 0:c.getCanvasBounds(e.viewport),o=e.x+((s==null?void 0:s.x)||0),a=e.y+((s==null?void 0:s.y)||0);this.setTooltip(r,o,a)}setTooltip(e,t,n){const r=this.rootElement;if(r){if(typeof e=="string")r.innerText=e;else if(e)e.text&&(r.innerText=e.text),e.html&&(r.innerHTML=e.html),e.className&&(r.className=e.className);else{this.isVisible=!1,r.style.display="none";return}this.isVisible=!0,r.style.display="block",r.style.transform=`translate(${t}px, ${n}px)`,e&&typeof e=="object"&&"style"in e&&Object.assign(r.style,e.style)}}}lg.defaultProps={...Gc.defaultProps};class m3{constructor(e){this.targets={},this.order=[],this.eventManagers={},this._eventRootToCanvasId=new WeakMap,this._createEventManager=e.createEventManager,this._getEventRoot=e.getEventRoot}finalize(){for(const e of Object.values(this.targets))e.eventManager.destroy(),e.presentationContext.destroy();this.targets={},this.order=[],this.eventManagers={},this._eventRootToCanvasId=new WeakMap}syncCanvasEntries(e){const t=this._normalizeCanvasList(e.canvases),n={},r=[],s=new Map;for(const{canvas:a}of t){const c=this._getEventRoot(a);s.set(c,(s.get(c)||0)+1)}for(const{id:a,canvas:c}of t){const l=this._getEventRoot(c),u=s.get(l)===1?l:c;let f=this.targets[a];if(!f||f.device!==e.device||f.canvas!==c||f.eventRoot!==u){f==null||f.eventManager.destroy(),f==null||f.presentationContext.destroy();const h=e.device.createPresentationContext({id:a,canvas:c,useDevicePixels:e.useDevicePixels,autoResize:!0});f={id:a,device:e.device,canvas:c,eventRoot:u,presentationContext:h,eventManager:this._createEventManager(u)}}this._eventRootToCanvasId.set(u,a),this._eventRootToCanvasId.set(c,a),n[a]=f,r.push(a)}for(const[a,c]of Object.entries(this.targets))n[a]||(c.eventManager.destroy(),c.presentationContext.destroy());this.targets=n,this.order=r;const o=Object.fromEntries(Object.entries(n).map(([a,c])=>[a,c.eventManager]));this._haveSameEventManagers(o)||(this.eventManagers=o)}getCanvasIdFromEvent(e){return e?this._eventRootToCanvasId.get(e):void 0}getTarget(e){return this.targets[e||this.order[0]||ai]||null}_normalizeCanvasList(e=[]){const t=new Set;return e.map((n,r)=>{let s,o;return typeof n=="string"?(s=document.getElementById(n),Q(s,`Canvas with id ${n} not found`),o=n):(s=n,o=s.id||`deckgl-canvas-${r}`),Q(!t.has(o),`Duplicate canvas id ${o}`),t.add(o),{id:o,canvas:s}})}_haveSameEventManagers(e){const t=Object.keys(e),n=Object.keys(this.eventManagers);return t.length===n.length&&t.every(r=>e[r]===this.eventManagers[r])}}const _3={WEBGL_depth_texture:{UNSIGNED_INT_24_8_WEBGL:34042},OES_element_index_uint:{},OES_texture_float:{},OES_texture_half_float:{HALF_FLOAT_OES:5131},EXT_color_buffer_float:{},OES_standard_derivatives:{FRAGMENT_SHADER_DERIVATIVE_HINT_OES:35723},EXT_frag_depth:{},EXT_blend_minmax:{MIN_EXT:32775,MAX_EXT:32776},EXT_shader_texture_lod:{}},b3=i=>({drawBuffersWEBGL(e){return i.drawBuffers(e)},COLOR_ATTACHMENT0_WEBGL:36064,COLOR_ATTACHMENT1_WEBGL:36065,COLOR_ATTACHMENT2_WEBGL:36066,COLOR_ATTACHMENT3_WEBGL:36067}),y3=i=>({VERTEX_ARRAY_BINDING_OES:34229,createVertexArrayOES(){return i.createVertexArray()},deleteVertexArrayOES(e){return i.deleteVertexArray(e)},isVertexArrayOES(e){return i.isVertexArray(e)},bindVertexArrayOES(e){return i.bindVertexArray(e)}}),v3=i=>({VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE:35070,drawArraysInstancedANGLE(...e){return i.drawArraysInstanced(...e)},drawElementsInstancedANGLE(...e){return i.drawElementsInstanced(...e)},vertexAttribDivisorANGLE(...e){return i.vertexAttribDivisor(...e)}});function w3(i=!0){const e=HTMLCanvasElement.prototype;if(!i&&e.originalGetContext){e.getContext=e.originalGetContext,e.originalGetContext=void 0;return}e.originalGetContext=e.getContext,e.getContext=function(t,n){if(t==="webgl"||t==="experimental-webgl"){const r=this.originalGetContext("webgl2",n);return r instanceof HTMLElement&&x3(r),r}return this.originalGetContext(t,n)}}function x3(i){i.getExtension("EXT_color_buffer_float");const e={..._3,WEBGL_disjoint_timer_query:i.getExtension("EXT_disjoint_timer_query_webgl2"),WEBGL_draw_buffers:b3(i),OES_vertex_array_object:y3(i),ANGLE_instanced_arrays:v3(i)},t=i.getExtension.bind(i);i.getExtension=function(r){const s=t(r);return s||(r in e?e[r]:null)};const n=i.getSupportedExtensions;i.getSupportedExtensions=function(){const r=n.apply(i)||[];return r==null?void 0:r.concat(Object.keys(e))}}let ef=!1;async function P3(){{Vc();return}}function E3(i,e){return Vc(),i}async function S3(i){{Vc();return}}function L3(i){return null}function Vc(){ef||(ef=!0,T.warn("Import @luma.gl/webgl/debug before enabling WebGL debugging.")())}const Ri=1;class T3 extends kb{constructor(){super(...arguments);d(this,"type","webgl")}enforceWebGL2(t){w3(t)}isSupported(){return typeof WebGL2RenderingContext<"u"}isDeviceHandle(t){return typeof WebGL2RenderingContext<"u"&&t instanceof WebGL2RenderingContext?!0:(typeof WebGLRenderingContext<"u"&&t instanceof WebGLRenderingContext&&T.warn("WebGL1 is not supported",t)(),!1)}async attach(t,n={}){const{WebGLDevice:r}=await pr(async()=>{const{WebGLDevice:a}=await Promise.resolve().then(()=>bf);return{WebGLDevice:a}},void 0);if(t instanceof r)return t;const s=r.getDeviceFromContext(t);if(s)return s;if(!A3(t))throw new Error("Invalid WebGL2RenderingContext");n=tf(n),await nf(n);const o=n.createCanvasContext===!0?{}:n.createCanvasContext;return new r({...n,_handle:t,createCanvasContext:{canvas:t.canvas,autoResize:!1,...o}})}async create(t={}){const{WebGLDevice:n}=await pr(async()=>{const{WebGLDevice:r}=await Promise.resolve().then(()=>bf);return{WebGLDevice:r}},void 0);t=tf(t),await nf(t);try{const r=new n(t);T.groupCollapsed(Ri,`WebGLDevice ${r.id} created`)();const s=`${r._reused?"Reusing":"Created"} device with WebGL2 ${r.props.debug?"debug ":""}context: ${r.info.vendor}, ${r.info.renderer} for canvas: ${r.canvasContext.id}`;return T.probe(Ri,s)(),T.table(Ri,r.info)(),r}finally{T.groupEnd(Ri)(),T.info(Ri,"%cWebGL call tracing: luma.log.set('debug-webgl') ","color: white; background: blue; padding: 2px 6px; border-radius: 3px;")()}}}function A3(i){return typeof WebGL2RenderingContext<"u"&&i instanceof WebGL2RenderingContext?!0:!!(i&&typeof i.createVertexArray=="function")}const fo=new T3;function tf(i){return{...i,debug:i.debug??li.defaultProps.debug,debugWebGL:i.debugWebGL??li.defaultProps.debugWebGL,debugSpectorJS:i.debugSpectorJS??!!T.get("debug-spectorjs")}}async function nf(i){const e=[];(i.debugWebGL||i.debug)&&e.push(P3()),i.debugSpectorJS&&e.push(S3());const t=await Promise.allSettled(e);for(const n of t)n.status==="rejected"&&T.error(`Failed to initialize debug libraries ${n.reason}`)()}const jc={3042:!1,32773:new Float32Array([0,0,0,0]),32777:32774,34877:32774,32969:1,32968:0,32971:1,32970:0,3106:new Float32Array([0,0,0,0]),3107:[!0,!0,!0,!0],2884:!1,2885:1029,2929:!1,2931:1,2932:513,2928:new Float32Array([0,1]),2930:!0,3024:!0,35725:null,36006:null,36007:null,34229:null,34964:null,2886:2305,33170:4352,2849:1,32823:!1,32824:0,10752:0,32926:!1,32928:!1,32938:1,32939:!1,3089:!1,3088:new Int32Array([0,0,1024,1024]),2960:!1,2961:0,2968:4294967295,36005:4294967295,2962:519,2967:0,2963:4294967295,34816:519,36003:0,36004:4294967295,2964:7680,2965:7680,2966:7680,34817:7680,34818:7680,34819:7680,2978:[0,0,1024,1024],36389:null,36662:null,36663:null,35053:null,35055:null,35723:4352,36010:null,35977:!1,3333:4,3317:4,37440:!1,37441:!1,37443:37444,3330:0,3332:0,3331:0,3314:0,32878:0,3316:0,3315:0,32877:0},le=(i,e,t)=>e?i.enable(t):i.disable(t),rf=(i,e,t)=>i.hint(t,e),Ee=(i,e,t)=>i.pixelStorei(t,e),sf=(i,e,t)=>{const n=t===36006?36009:36008;return i.bindFramebuffer(n,e)},Oi=(i,e,t)=>{const r={34964:34962,36662:36662,36663:36663,35053:35051,35055:35052}[t];i.bindBuffer(r,e)};function ho(i){return Array.isArray(i)||ArrayBuffer.isView(i)&&!(i instanceof DataView)}const C3={3042:le,32773:(i,e)=>i.blendColor(...e),32777:"blendEquation",34877:"blendEquation",32969:"blendFunc",32968:"blendFunc",32971:"blendFunc",32970:"blendFunc",3106:(i,e)=>i.clearColor(...e),3107:(i,e)=>i.colorMask(...e),2884:le,2885:(i,e)=>i.cullFace(e),2929:le,2931:(i,e)=>i.clearDepth(e),2932:(i,e)=>i.depthFunc(e),2928:(i,e)=>i.depthRange(...e),2930:(i,e)=>i.depthMask(e),3024:le,35723:rf,35725:(i,e)=>i.useProgram(e),36007:(i,e)=>i.bindRenderbuffer(36161,e),36389:(i,e)=>{var t;return(t=i.bindTransformFeedback)==null?void 0:t.call(i,36386,e)},34229:(i,e)=>i.bindVertexArray(e),36006:sf,36010:sf,34964:Oi,36662:Oi,36663:Oi,35053:Oi,35055:Oi,2886:(i,e)=>i.frontFace(e),33170:rf,2849:(i,e)=>i.lineWidth(e),32823:le,32824:"polygonOffset",10752:"polygonOffset",35977:le,32926:le,32928:le,32938:"sampleCoverage",32939:"sampleCoverage",3089:le,3088:(i,e)=>i.scissor(...e),2960:le,2961:(i,e)=>i.clearStencil(e),2968:(i,e)=>i.stencilMaskSeparate(1028,e),36005:(i,e)=>i.stencilMaskSeparate(1029,e),2962:"stencilFuncFront",2967:"stencilFuncFront",2963:"stencilFuncFront",34816:"stencilFuncBack",36003:"stencilFuncBack",36004:"stencilFuncBack",2964:"stencilOpFront",2965:"stencilOpFront",2966:"stencilOpFront",34817:"stencilOpBack",34818:"stencilOpBack",34819:"stencilOpBack",2978:(i,e)=>i.viewport(...e),34383:le,10754:le,12288:le,12289:le,12290:le,12291:le,12292:le,12293:le,12294:le,12295:le,3333:Ee,3317:Ee,37440:Ee,37441:Ee,37443:Ee,3330:Ee,3332:Ee,3331:Ee,3314:Ee,32878:Ee,3316:Ee,3315:Ee,32877:Ee,framebuffer:(i,e)=>{const t=e&&"handle"in e?e.handle:e;return i.bindFramebuffer(36160,t)},blend:(i,e)=>e?i.enable(3042):i.disable(3042),blendColor:(i,e)=>i.blendColor(...e),blendEquation:(i,e)=>{const t=typeof e=="number"?[e,e]:e;i.blendEquationSeparate(...t)},blendFunc:(i,e)=>{const t=(e==null?void 0:e.length)===2?[...e,...e]:e;i.blendFuncSeparate(...t)},clearColor:(i,e)=>i.clearColor(...e),clearDepth:(i,e)=>i.clearDepth(e),clearStencil:(i,e)=>i.clearStencil(e),colorMask:(i,e)=>i.colorMask(...e),cull:(i,e)=>e?i.enable(2884):i.disable(2884),cullFace:(i,e)=>i.cullFace(e),depthTest:(i,e)=>e?i.enable(2929):i.disable(2929),depthFunc:(i,e)=>i.depthFunc(e),depthMask:(i,e)=>i.depthMask(e),depthRange:(i,e)=>i.depthRange(...e),dither:(i,e)=>e?i.enable(3024):i.disable(3024),derivativeHint:(i,e)=>{i.hint(35723,e)},frontFace:(i,e)=>i.frontFace(e),mipmapHint:(i,e)=>i.hint(33170,e),lineWidth:(i,e)=>i.lineWidth(e),polygonOffsetFill:(i,e)=>e?i.enable(32823):i.disable(32823),polygonOffset:(i,e)=>i.polygonOffset(...e),sampleCoverage:(i,e)=>i.sampleCoverage(e[0],e[1]||!1),scissorTest:(i,e)=>e?i.enable(3089):i.disable(3089),scissor:(i,e)=>i.scissor(...e),stencilTest:(i,e)=>e?i.enable(2960):i.disable(2960),stencilMask:(i,e)=>{e=ho(e)?e:[e,e];const[t,n]=e;i.stencilMaskSeparate(1028,t),i.stencilMaskSeparate(1029,n)},stencilFunc:(i,e)=>{e=ho(e)&&e.length===3?[...e,...e]:e;const[t,n,r,s,o,a]=e;i.stencilFuncSeparate(1028,t,n,r),i.stencilFuncSeparate(1029,s,o,a)},stencilOp:(i,e)=>{e=ho(e)&&e.length===3?[...e,...e]:e;const[t,n,r,s,o,a]=e;i.stencilOpSeparate(1028,t,n,r),i.stencilOpSeparate(1029,s,o,a)},viewport:(i,e)=>i.viewport(...e)};function ce(i,e,t){return e[i]!==void 0?e[i]:t[i]}const M3={blendEquation:(i,e,t)=>i.blendEquationSeparate(ce(32777,e,t),ce(34877,e,t)),blendFunc:(i,e,t)=>i.blendFuncSeparate(ce(32969,e,t),ce(32968,e,t),ce(32971,e,t),ce(32970,e,t)),polygonOffset:(i,e,t)=>i.polygonOffset(ce(32824,e,t),ce(10752,e,t)),sampleCoverage:(i,e,t)=>i.sampleCoverage(ce(32938,e,t),ce(32939,e,t)),stencilFuncFront:(i,e,t)=>i.stencilFuncSeparate(1028,ce(2962,e,t),ce(2967,e,t),ce(2963,e,t)),stencilFuncBack:(i,e,t)=>i.stencilFuncSeparate(1029,ce(34816,e,t),ce(36003,e,t),ce(36004,e,t)),stencilOpFront:(i,e,t)=>i.stencilOpSeparate(1028,ce(2964,e,t),ce(2965,e,t),ce(2966,e,t)),stencilOpBack:(i,e,t)=>i.stencilOpSeparate(1029,ce(34817,e,t),ce(34818,e,t),ce(34819,e,t))},of={enable:(i,e)=>i({[e]:!0}),disable:(i,e)=>i({[e]:!1}),pixelStorei:(i,e,t)=>i({[e]:t}),hint:(i,e,t)=>i({[e]:t}),useProgram:(i,e)=>i({35725:e}),bindRenderbuffer:(i,e,t)=>i({36007:t}),bindTransformFeedback:(i,e,t)=>i({36389:t}),bindVertexArray:(i,e)=>i({34229:e}),bindFramebuffer:(i,e,t)=>{switch(e){case 36160:return i({36006:t,36010:t});case 36009:return i({36006:t});case 36008:return i({36010:t});default:return null}},bindBuffer:(i,e,t)=>{const n={34962:[34964],36662:[36662],36663:[36663],35051:[35053],35052:[35055]}[e];return n?i({[n]:t}):{valueChanged:!0}},blendColor:(i,e,t,n,r)=>i({32773:new Float32Array([e,t,n,r])}),blendEquation:(i,e)=>i({32777:e,34877:e}),blendEquationSeparate:(i,e,t)=>i({32777:e,34877:t}),blendFunc:(i,e,t)=>i({32969:e,32968:t,32971:e,32970:t}),blendFuncSeparate:(i,e,t,n,r)=>i({32969:e,32968:t,32971:n,32970:r}),clearColor:(i,e,t,n,r)=>i({3106:new Float32Array([e,t,n,r])}),clearDepth:(i,e)=>i({2931:e}),clearStencil:(i,e)=>i({2961:e}),colorMask:(i,e,t,n,r)=>i({3107:[e,t,n,r]}),cullFace:(i,e)=>i({2885:e}),depthFunc:(i,e)=>i({2932:e}),depthRange:(i,e,t)=>i({2928:new Float32Array([e,t])}),depthMask:(i,e)=>i({2930:e}),frontFace:(i,e)=>i({2886:e}),lineWidth:(i,e)=>i({2849:e}),polygonOffset:(i,e,t)=>i({32824:e,10752:t}),sampleCoverage:(i,e,t)=>i({32938:e,32939:t}),scissor:(i,e,t,n,r)=>i({3088:new Int32Array([e,t,n,r])}),stencilMask:(i,e)=>i({2968:e,36005:e}),stencilMaskSeparate:(i,e,t)=>i({[e===1028?2968:36005]:t}),stencilFunc:(i,e,t,n)=>i({2962:e,2967:t,2963:n,34816:e,36003:t,36004:n}),stencilFuncSeparate:(i,e,t,n,r)=>i({[e===1028?2962:34816]:t,[e===1028?2967:36003]:n,[e===1028?2963:36004]:r}),stencilOp:(i,e,t,n)=>i({2964:e,2965:t,2966:n,34817:e,34818:t,34819:n}),stencilOpSeparate:(i,e,t,n,r)=>i({[e===1028?2964:34817]:t,[e===1028?2965:34818]:n,[e===1028?2966:34819]:r}),viewport:(i,e,t,n,r)=>i({2978:[e,t,n,r]})},je=(i,e)=>i.isEnabled(e),af={3042:je,2884:je,2929:je,3024:je,32823:je,32926:je,32928:je,3089:je,2960:je,35977:je},I3=new Set([34016,36388,36387,35983,35368,34965,35739,35738,3074,34853,34854,34855,34856,34857,34858,34859,34860,34861,34862,34863,34864,34865,34866,34867,34868,35097,32873,35869,32874,34068]);function Li(i,e){var r;if(O3(e))return;const t={};for(const s in e){const o=Number(s),a=C3[s];a&&(typeof a=="string"?t[a]=!0:a(i,e[s],o))}const n=(r=i.lumaState)==null?void 0:r.cache;if(n)for(const s in t){const o=M3[s];o(i,e,n)}}function ug(i,e=jc){if(typeof e=="number"){const r=e,s=af[r];return s?s(i,r):i.getParameter(r)}const t=Array.isArray(e)?e:Object.keys(e),n={};for(const r of t){const s=af[r];n[r]=s?s(i,Number(r)):i.getParameter(Number(r))}return n}function R3(i){Li(i,jc)}function O3(i){for(const e in i)return!1;return!0}function B3(i,e){if(i===e)return!0;if(cf(i)&&cf(e)&&i.length===e.length){for(let t=0;t<i.length;++t)if(i[t]!==e[t])return!1;return!0}return!1}function cf(i){return Array.isArray(i)||ArrayBuffer.isView(i)}class Tt{constructor(e,t){d(this,"gl");d(this,"program",null);d(this,"stateStack",[]);d(this,"enable",!0);d(this,"cache",null);d(this,"log");d(this,"initialized",!1);this.gl=e,this.log=(t==null?void 0:t.log)||(()=>{}),this._updateCache=this._updateCache.bind(this),Object.seal(this)}static get(e){return e.lumaState}push(e={}){this.stateStack.push({})}pop(){const e=this.stateStack[this.stateStack.length-1];Li(this.gl,e),this.stateStack.pop()}trackState(e,t){if(this.cache=t!=null&&t.copyState?ug(e):Object.assign({},jc),this.initialized)throw new Error("WebGLStateTracker");this.initialized=!0,this.gl.lumaState=this,D3(e);for(const n in of){const r=of[n];k3(e,n,r)}lf(e,"getParameter"),lf(e,"isEnabled")}_updateCache(e){let t=!1,n;const r=this.stateStack.length>0?this.stateStack[this.stateStack.length-1]:null;for(const s in e){const o=e[s],a=this.cache[s];B3(o,a)||(t=!0,n=a,r&&!(s in r)&&(r[s]=a),this.cache[s]=o)}return{valueChanged:t,oldValue:n}}}function lf(i,e){const t=i[e].bind(i);i[e]=function(r){if(r===void 0||I3.has(r))return t(r);const s=Tt.get(i);return r in s.cache||(s.cache[r]=t(r)),s.enable?s.cache[r]:t(r)},Object.defineProperty(i[e],"name",{value:`${e}-from-cache`,configurable:!1})}function k3(i,e,t){if(!i[e])return;const n=i[e].bind(i);i[e]=function(...s){const o=Tt.get(i),{valueChanged:a,oldValue:c}=t(o._updateCache,...s);return a&&n(...s),c},Object.defineProperty(i[e],"name",{value:`${e}-to-cache`,configurable:!1})}function D3(i){const e=i.useProgram.bind(i);i.useProgram=function(n){const r=Tt.get(i);r.program!==n&&(e(n),r.program=n)}}function Ra(i){const e=i.luma||{_polyfilled:!1,extensions:{},softwareRenderer:!1};return e._polyfilled??(e._polyfilled=!1),e.extensions||(e.extensions={}),i.luma=e,e}function F3(i,e,t){let n="";const r=c=>{const l=c.statusMessage;l&&(n||(n=l))};i.addEventListener("webglcontextcreationerror",r,!1);const s=t.failIfMajorPerformanceCaveat!==!0,o={preserveDrawingBuffer:!0,...t,failIfMajorPerformanceCaveat:!0};let a=null;try{a||(a=i.getContext("webgl2",o)),!a&&o.failIfMajorPerformanceCaveat&&(n||(n="Only software GPU is available. Set `failIfMajorPerformanceCaveat: false` to allow."));let c=!1;if(!a&&s&&(o.failIfMajorPerformanceCaveat=!1,a=i.getContext("webgl2",o),c=!0),a||(a=i.getContext("webgl",{}),a&&(a=null,n||(n="Your browser only supports WebGL1"))),!a)throw n||(n="Your browser does not support WebGL"),new Error(`Failed to create WebGL context: ${n}`);const l=Ra(a);l.softwareRenderer=c;const{onContextLost:u,onContextRestored:f}=e;return i.addEventListener("webglcontextlost",h=>u(h),!1),i.addEventListener("webglcontextrestored",h=>f(h),!1),a}finally{i.removeEventListener("webglcontextcreationerror",r,!1)}}function Dt(i,e,t){return t[e]===void 0&&(t[e]=i.getExtension(e)||null),t[e]}function N3(i,e){const t=i.getParameter(7936),n=i.getParameter(7937);Dt(i,"WEBGL_debug_renderer_info",e);const r=e.WEBGL_debug_renderer_info,s=i.getParameter(r?r.UNMASKED_VENDOR_WEBGL:7936),o=i.getParameter(r?r.UNMASKED_RENDERER_WEBGL:7937),a=s||t,c=o||n,l=i.getParameter(7938),u=fg(a,c),f=U3(a,c),h=z3(a,c);return{type:"webgl",gpu:u,gpuType:h,gpuBackend:f,vendor:a,renderer:c,version:l,shadingLanguage:"glsl",shadingLanguageVersion:300}}function fg(i,e){return/NVIDIA/i.exec(i)||/NVIDIA/i.exec(e)?"nvidia":/INTEL/i.exec(i)||/INTEL/i.exec(e)?"intel":/Apple/i.exec(i)||/Apple/i.exec(e)?"apple":/AMD/i.exec(i)||/AMD/i.exec(e)||/ATI/i.exec(i)||/ATI/i.exec(e)?"amd":/SwiftShader/i.exec(i)||/SwiftShader/i.exec(e)?"software":"unknown"}function U3(i,e){return/Metal/i.exec(i)||/Metal/i.exec(e)?"metal":/ANGLE/i.exec(i)||/ANGLE/i.exec(e)?"opengl":"unknown"}function z3(i,e){if(/SwiftShader/i.exec(i)||/SwiftShader/i.exec(e))return"cpu";switch(fg(i,e)){case"apple":return $3(i,e)?"integrated":"unknown";case"intel":return"integrated";case"software":return"cpu";case"unknown":return"unknown";default:return"discrete"}}function $3(i,e){return/Apple (M\d|A\d|GPU)/i.test(`${i} ${e}`)}function hg(i){switch(i){case"uint8":return 5121;case"sint8":return 5120;case"unorm8":return 5121;case"snorm8":return 5120;case"uint16":return 5123;case"sint16":return 5122;case"unorm16":return 5123;case"snorm16":return 5122;case"uint32":return 5125;case"sint32":return 5124;case"float16":return 5131;case"float32":return 5126}throw new Error(String(i))}const Gi="WEBGL_compressed_texture_s3tc",Vi="WEBGL_compressed_texture_s3tc_srgb",ei="EXT_texture_compression_rgtc",ti="EXT_texture_compression_bptc",G3="WEBGL_compressed_texture_etc",V3="WEBGL_compressed_texture_astc",j3="WEBGL_compressed_texture_etc1",W3="WEBGL_compressed_texture_pvrtc",H3="WEBGL_compressed_texture_atc",Y3="EXT_texture_norm16",uf="EXT_render_snorm",dg="EXT_color_buffer_float",go="snorm8-renderable-webgl",po="norm16-renderable-webgl",mo="snorm16-renderable-webgl",_o="float16-renderable-webgl",jn="float32-renderable-webgl",q3="rgb9e5ufloat-renderable-webgl",Wc={"float32-renderable-webgl":{extensions:[dg]},"float16-renderable-webgl":{extensions:["EXT_color_buffer_half_float"]},"rgb9e5ufloat-renderable-webgl":{extensions:["WEBGL_render_shared_exponent"]},"snorm8-renderable-webgl":{extensions:[uf]},"norm16-webgl":{extensions:[Y3]},"norm16-renderable-webgl":{features:["norm16-webgl"]},"snorm16-renderable-webgl":{features:["norm16-webgl"],extensions:[uf]},"float32-filterable":{extensions:["OES_texture_float_linear"]},"float16-filterable-webgl":{extensions:["OES_texture_half_float_linear"]},"texture-filterable-anisotropic-webgl":{extensions:["EXT_texture_filter_anisotropic"]},"texture-blend-float-webgl":{extensions:["EXT_float_blend"]},"texture-compression-bc":{extensions:[Gi,Vi,ei,ti]},"texture-compression-bc5-webgl":{extensions:[ei]},"texture-compression-bc7-webgl":{extensions:[ti]},"texture-compression-etc2":{extensions:[G3]},"texture-compression-astc":{extensions:[V3]},"texture-compression-etc1-webgl":{extensions:[j3]},"texture-compression-pvrtc-webgl":{extensions:[W3]},"texture-compression-atc-webgl":{extensions:[H3]}};function Z3(i){return i in Wc}function gg(i,e,t){return pg(i,e,t,new Set)}function pg(i,e,t,n){const r=Wc[e];if(!r||n.has(e))return!1;n.add(e);const s=(r.features||[]).every(o=>pg(i,o,t,n));return n.delete(e),s?(r.extensions||[]).every(o=>!!Dt(i,o,t)):!1}const Ss={r8unorm:{gl:33321,rb:!0},r8snorm:{gl:36756,r:go},r8uint:{gl:33330,rb:!0},r8sint:{gl:33329,rb:!0},rg8unorm:{gl:33323,rb:!0},rg8snorm:{gl:36757,r:go},rg8uint:{gl:33336,rb:!0},rg8sint:{gl:33335,rb:!0},r16uint:{gl:33332,rb:!0},r16sint:{gl:33331,rb:!0},r16float:{gl:33325,rb:!0,r:_o},r16unorm:{gl:33322,rb:!0,r:po},r16snorm:{gl:36760,r:mo},"rgba4unorm-webgl":{gl:32854,rb:!0},"rgb565unorm-webgl":{gl:36194,rb:!0},"rgb5a1unorm-webgl":{gl:32855,rb:!0},"rgb8unorm-webgl":{gl:32849},"rgb8snorm-webgl":{gl:36758},rgba8unorm:{gl:32856},"rgba8unorm-srgb":{gl:35907},rgba8snorm:{gl:36759,r:go},rgba8uint:{gl:36220},rgba8sint:{gl:36238},bgra8unorm:{},"bgra8unorm-srgb":{},rg16uint:{gl:33338},rg16sint:{gl:33337},rg16float:{gl:33327,rb:!0,r:_o},rg16unorm:{gl:33324,r:po},rg16snorm:{gl:36761,r:mo},r32uint:{gl:33334,rb:!0},r32sint:{gl:33333,rb:!0},r32float:{gl:33326,r:jn},rgb9e5ufloat:{gl:35901,r:q3},rg11b10ufloat:{gl:35898,rb:!0},rgb10a2unorm:{gl:32857,rb:!0},rgb10a2uint:{gl:36975,rb:!0},"rgb16unorm-webgl":{gl:32852,r:!1},"rgb16snorm-webgl":{gl:36762,r:!1},rg32uint:{gl:33340,rb:!0},rg32sint:{gl:33339,rb:!0},rg32float:{gl:33328,rb:!0,r:jn},rgba16uint:{gl:36214,rb:!0},rgba16sint:{gl:36232,rb:!0},rgba16float:{gl:34842,r:_o},rgba16unorm:{gl:32859,rb:!0,r:po},rgba16snorm:{gl:36763,r:mo},"rgb32float-webgl":{gl:34837,x:dg,r:jn,dataFormat:6407,types:[5126]},rgba32uint:{gl:36208,rb:!0},rgba32sint:{gl:36226,rb:!0},rgba32float:{gl:34836,rb:!0,r:jn},stencil8:{gl:36168,rb:!0},depth16unorm:{gl:33189,dataFormat:6402,types:[5123],rb:!0},depth24plus:{gl:33190,dataFormat:6402,types:[5125]},depth32float:{gl:36012,dataFormat:6402,types:[5126],rb:!0},"depth24plus-stencil8":{gl:35056,rb:!0,depthTexture:!0,dataFormat:34041,types:[34042]},"depth32float-stencil8":{gl:36013,dataFormat:34041,types:[36269],rb:!0},"bc1-rgb-unorm-webgl":{gl:33776,x:Gi},"bc1-rgb-unorm-srgb-webgl":{gl:35916,x:Vi},"bc1-rgba-unorm":{gl:33777,x:Gi},"bc1-rgba-unorm-srgb":{gl:35916,x:Vi},"bc2-rgba-unorm":{gl:33778,x:Gi},"bc2-rgba-unorm-srgb":{gl:35918,x:Vi},"bc3-rgba-unorm":{gl:33779,x:Gi},"bc3-rgba-unorm-srgb":{gl:35919,x:Vi},"bc4-r-unorm":{gl:36283,x:ei},"bc4-r-snorm":{gl:36284,x:ei},"bc5-rg-unorm":{gl:36285,x:ei},"bc5-rg-snorm":{gl:36286,x:ei},"bc6h-rgb-ufloat":{gl:36495,x:ti},"bc6h-rgb-float":{gl:36494,x:ti},"bc7-rgba-unorm":{gl:36492,x:ti},"bc7-rgba-unorm-srgb":{gl:36493,x:ti},"etc2-rgb8unorm":{gl:37492},"etc2-rgb8unorm-srgb":{gl:37494},"etc2-rgb8a1unorm":{gl:37496},"etc2-rgb8a1unorm-srgb":{gl:37497},"etc2-rgba8unorm":{gl:37493},"etc2-rgba8unorm-srgb":{gl:37495},"eac-r11unorm":{gl:37488},"eac-r11snorm":{gl:37489},"eac-rg11unorm":{gl:37490},"eac-rg11snorm":{gl:37491},"astc-4x4-unorm":{gl:37808},"astc-4x4-unorm-srgb":{gl:37840},"astc-5x4-unorm":{gl:37809},"astc-5x4-unorm-srgb":{gl:37841},"astc-5x5-unorm":{gl:37810},"astc-5x5-unorm-srgb":{gl:37842},"astc-6x5-unorm":{gl:37811},"astc-6x5-unorm-srgb":{gl:37843},"astc-6x6-unorm":{gl:37812},"astc-6x6-unorm-srgb":{gl:37844},"astc-8x5-unorm":{gl:37813},"astc-8x5-unorm-srgb":{gl:37845},"astc-8x6-unorm":{gl:37814},"astc-8x6-unorm-srgb":{gl:37846},"astc-8x8-unorm":{gl:37815},"astc-8x8-unorm-srgb":{gl:37847},"astc-10x5-unorm":{gl:37816},"astc-10x5-unorm-srgb":{gl:37848},"astc-10x6-unorm":{gl:37817},"astc-10x6-unorm-srgb":{gl:37849},"astc-10x8-unorm":{gl:37818},"astc-10x8-unorm-srgb":{gl:37850},"astc-10x10-unorm":{gl:37819},"astc-10x10-unorm-srgb":{gl:37851},"astc-12x10-unorm":{gl:37820},"astc-12x10-unorm-srgb":{gl:37852},"astc-12x12-unorm":{gl:37821},"astc-12x12-unorm-srgb":{gl:37853},"pvrtc-rgb4unorm-webgl":{gl:35840},"pvrtc-rgba4unorm-webgl":{gl:35842},"pvrtc-rgb2unorm-webgl":{gl:35841},"pvrtc-rgba2unorm-webgl":{gl:35843},"etc1-rbg-unorm-webgl":{gl:36196},"atc-rgb-unorm-webgl":{gl:35986},"atc-rgba-unorm-webgl":{gl:35986},"atc-rgbai-unorm-webgl":{gl:34798}};function X3(i,e,t){let n=e.create;const r=Ss[e.format];(r==null?void 0:r.gl)===void 0&&(n=!1),r!=null&&r.x&&(n=n&&!!Dt(i,r.x,t)),e.format==="stencil8"&&(n=!1);const s=(r==null?void 0:r.r)===!1?!1:(r==null?void 0:r.r)===void 0||gg(i,r.r,t),o=n&&e.render&&s&&K3(i,e.format,t);return{format:e.format,create:n&&e.create,render:o,filter:n&&e.filter,blend:n&&e.blend,store:n&&e.store}}function K3(i,e,t){const n=Ss[e],r=n==null?void 0:n.gl;if(r===void 0||n!=null&&n.x&&!Dt(i,n.x,t))return!1;const s=i.getParameter(32873),o=i.getParameter(36006),a=i.createTexture(),c=i.createFramebuffer();if(!a||!c)return!1;const l=0;let u=Number(i.getError());for(;u!==l;)u=i.getError();let f=!1;try{if(i.bindTexture(3553,a),i.texStorage2D(3553,1,r,1,1),Number(i.getError())!==l)return!1;i.bindFramebuffer(36160,c),i.framebufferTexture2D(36160,36064,3553,a,0),f=Number(i.checkFramebufferStatus(36160))===36053&&Number(i.getError())===l}finally{i.bindFramebuffer(36160,o),i.deleteFramebuffer(c),i.bindTexture(3553,s),i.deleteTexture(a)}return f}function mg(i){var r;const e=Ss[i],t=eL(i),n=Be.getInfo(i);return n.compressed&&(e.dataFormat=t),{internalFormat:t,format:(e==null?void 0:e.dataFormat)||J3(n.channels,n.integer,n.normalized,t),type:n.dataType?hg(n.dataType):((r=e==null?void 0:e.types)==null?void 0:r[0])||5121,compressed:n.compressed||!1}}function Q3(i){switch(Be.getInfo(i).attachment){case"depth":return 36096;case"stencil":return 36128;case"depth-stencil":return 33306;default:throw new Error(`Not a depth stencil format: ${i}`)}}function J3(i,e,t,n){if(n===6408||n===6407)return n;switch(i){case"r":return e&&!t?36244:6403;case"rg":return e&&!t?33320:33319;case"rgb":return e&&!t?36248:6407;case"rgba":return e&&!t?36249:6408;case"bgra":throw new Error("bgra pixels not supported by WebGL");default:return 6408}}function eL(i){const e=Ss[i],t=e==null?void 0:e.gl;if(t===void 0)throw new Error(`Unsupported texture format ${i}`);return t}const ff={"depth-clip-control":"EXT_depth_clamp","timestamp-query":"EXT_disjoint_timer_query_webgl2","compilation-status-async-webgl":"KHR_parallel_shader_compile","html-in-canvas":i=>Iy()&&typeof i.texElementImage2D=="function","polygon-mode-webgl":"WEBGL_polygon_mode","provoking-vertex-webgl":"WEBGL_provoking_vertex","shader-clip-cull-distance-webgl":"WEBGL_clip_cull_distance","shader-noperspective-interpolation-webgl":"NV_shader_noperspective_interpolation","shader-conservative-depth-webgl":"EXT_conservative_depth"};class tL extends My{constructor(t,n,r){super([],r);d(this,"gl");d(this,"extensions");d(this,"testedFeatures",new Set);this.gl=t,this.extensions=n,Dt(t,"EXT_color_buffer_float",n)}*[Symbol.iterator](){const t=this.getFeatures();for(const n of t)this.has(n)&&(yield n);return[]}has(t){var n;return(n=this.disabledFeatures)!=null&&n[t]?!1:(this.testedFeatures.has(t)||(this.testedFeatures.add(t),Z3(t)&&gg(this.gl,t,this.extensions)&&this.features.add(t),this.getWebGLFeature(t)&&this.features.add(t)),this.features.has(t))}initializeFeatures(){const t=this.getFeatures().filter(n=>n!=="polygon-mode-webgl");for(const n of t)this.has(n)}getFeatures(){return[...Object.keys(ff),...Object.keys(Wc)]}getWebGLFeature(t){const n=ff[t];return typeof n=="string"?!!Dt(this.gl,n,this.extensions):typeof n=="function"?n(this.gl):!!n}}class iL extends Sy{constructor(t){super();d(this,"gl");d(this,"limits",{});this.gl=t}get maxTextureDimension1D(){return 0}get maxTextureDimension2D(){return this.getParameter(3379)}get maxTextureDimension3D(){return this.getParameter(32883)}get maxTextureArrayLayers(){return this.getParameter(35071)}get maxBindGroups(){return 0}get maxBindGroupsPlusVertexBuffers(){return 0}get maxBindingsPerBindGroup(){return 0}get maxDynamicUniformBuffersPerPipelineLayout(){return 0}get maxDynamicStorageBuffersPerPipelineLayout(){return 0}get maxSampledTexturesPerShaderStage(){return this.getParameter(35660)}get maxSamplersPerShaderStage(){return this.getParameter(35661)}get maxStorageBuffersPerShaderStage(){return 0}get maxStorageBuffersInVertexStage(){return 0}get maxStorageBuffersInFragmentStage(){return 0}get maxStorageTexturesPerShaderStage(){return 0}get maxStorageTexturesInVertexStage(){return 0}get maxStorageTexturesInFragmentStage(){return 0}get maxUniformBuffersPerShaderStage(){return this.getParameter(35375)}get maxUniformBufferBindingSize(){return this.getParameter(35376)}get maxStorageBufferBindingSize(){return 0}get maxBufferSize(){return Number.MAX_SAFE_INTEGER}get minUniformBufferOffsetAlignment(){return this.getParameter(35380)}get minStorageBufferOffsetAlignment(){return 0}get maxVertexBuffers(){return 16}get maxVertexAttributes(){return this.getParameter(34921)}get maxVertexBufferArrayStride(){return 2048}get maxInterStageShaderVariables(){return this.getParameter(35659)}get maxColorAttachments(){return this.getParameter(36063)}get maxColorAttachmentBytesPerSample(){return 0}get maxComputeWorkgroupStorageSize(){return 0}get maxComputeInvocationsPerWorkgroup(){return 0}get maxComputeWorkgroupSizeX(){return 0}get maxComputeWorkgroupSizeY(){return 0}get maxComputeWorkgroupSizeZ(){return 0}get maxComputeWorkgroupsPerDimension(){return 0}getParameter(t){return this.limits[t]===void 0&&(this.limits[t]=this.gl.getParameter(t)),this.limits[t]||0}}class Xi extends Cr{constructor(t,n){super(t,n);d(this,"device");d(this,"gl");d(this,"handle");d(this,"colorAttachments",[]);d(this,"depthStencilAttachment",null);const r=n.handle,s=r===null;this.device=t,this.gl=t.gl,this.handle=r||s?r:this.gl.createFramebuffer(),s||(t._setWebGLDebugMetadata(this.handle,this,{spector:this.props}),n.handle||(this.autoCreateAttachmentTextures(),this.updateAttachments()))}destroy(){super.destroy(),!this.destroyed&&this.handle!==null&&!this.props.handle&&this.gl.deleteFramebuffer(this.handle)}updateAttachments(){const t=this.gl.bindFramebuffer(36160,this.handle);for(let n=0;n<this.colorAttachments.length;++n){const r=this.colorAttachments[n];if(r){const s=36064+n;this._attachTextureView(s,r)}}if(this.depthStencilAttachment){const n=Q3(this.depthStencilAttachment.props.format);this._attachTextureView(n,this.depthStencilAttachment)}if(this.device.props.debug){const n=this.gl.checkFramebufferStatus(36160);if(n!==36053)throw new Error(`Framebuffer ${rL(n)}`)}this.gl.bindFramebuffer(36160,t)}_attachTextureView(t,n){const{gl:r}=this.device,{texture:s}=n,o=n.props.baseMipLevel,a=n.props.baseArrayLayer;switch(r.bindTexture(s.glTarget,s.handle),s.glTarget){case 35866:case 32879:r.framebufferTextureLayer(36160,t,s.handle,o,a);break;case 34067:const c=nL(a);r.framebufferTexture2D(36160,t,c,s.handle,o);break;case 3553:r.framebufferTexture2D(36160,t,3553,s.handle,o);break;default:throw new Error("Illegal texture type")}r.bindTexture(s.glTarget,null)}resizeAttachments(t,n){if(this.handle===null){this.width=t,this.height=n;return}super.resizeAttachments(t,n)}}function nL(i){return i<34069?i+34069:i}function rL(i){switch(i){case 36053:return"success";case 36054:return"Mismatched attachments";case 36055:return"No attachments";case 36057:return"Height/width mismatch";case 36061:return"Unsupported or split attachments";case 36182:return"Samples mismatch";default:return`${i}`}}class sL extends Zh{constructor(t,n){super(n);d(this,"device");d(this,"handle",null);d(this,"_framebuffer",null);this.device=t,this._setAutoCreatedCanvasId(`${this.device.id}-canvas`),this._configureDevice()}get[Symbol.toStringTag](){return"WebGLCanvasContext"}_configureDevice(){var n,r,s;(this.drawingBufferWidth!==((n=this._framebuffer)==null?void 0:n.width)||this.drawingBufferHeight!==((r=this._framebuffer)==null?void 0:r.height))&&((s=this._framebuffer)==null||s.resize([this.drawingBufferWidth,this.drawingBufferHeight]))}_getCurrentFramebuffer(){return this._framebuffer||(this._framebuffer=new Xi(this.device,{id:"canvas-context-framebuffer",handle:null,width:this.drawingBufferWidth,height:this.drawingBufferHeight})),this._framebuffer}}class oL extends Ny{constructor(t,n={}){super(n);d(this,"device");d(this,"handle",null);d(this,"context2d");this.device=t;const r=`${this[Symbol.toStringTag]}(${this.id})`;if(!this.device.getDefaultCanvasContext().offscreenCanvas)throw new Error(`${r}: WebGL PresentationContext requires the default CanvasContext canvas to be an OffscreenCanvas`);const o=this.canvas.getContext("2d");if(!o)throw new Error(`${r}: Failed to create 2d presentation context`);this.context2d=o,this._setAutoCreatedCanvasId(`${this.device.id}-presentation-canvas`),this._configureDevice(),this._startObservers()}get[Symbol.toStringTag](){return"WebGLPresentationContext"}present(){this._resizeDrawingBufferIfNeeded(),this.device.submit();const t=this.device.getDefaultCanvasContext(),[n,r]=t.getDrawingBufferSize();if(!(this.drawingBufferWidth===0||this.drawingBufferHeight===0||n===0||r===0||t.canvas.width===0||t.canvas.height===0)){if(n!==this.drawingBufferWidth||r!==this.drawingBufferHeight||t.canvas.width!==this.drawingBufferWidth||t.canvas.height!==this.drawingBufferHeight)throw new Error(`${this[Symbol.toStringTag]}(${this.id}): Default canvas context size ${n}x${r} does not match presentation size ${this.drawingBufferWidth}x${this.drawingBufferHeight}`);this.context2d.clearRect(0,0,this.drawingBufferWidth,this.drawingBufferHeight),this.context2d.drawImage(t.canvas,0,0)}}_configureDevice(){}_getCurrentFramebuffer(t){const n=this.device.getDefaultCanvasContext();return n.setDrawingBufferSize(this.drawingBufferWidth,this.drawingBufferHeight),n.getCurrentFramebuffer(t)}}const bo={};function aL(i="id"){bo[i]=bo[i]||1;const e=bo[i]++;return`${i}-${e}`}class Ki extends j{constructor(t,n={}){super(t,n);d(this,"device");d(this,"gl");d(this,"handle");d(this,"glTarget");d(this,"glUsage");d(this,"glIndexType",5123);d(this,"byteLength",0);d(this,"bytesUsed",0);this.device=t,this.gl=this.device.gl;const r=typeof n=="object"?n.handle:void 0;this.handle=r||this.gl.createBuffer(),t._setWebGLDebugMetadata(this.handle,this,{spector:{...this.props,data:typeof this.props.data}}),this.glTarget=cL(this.props.usage),this.glUsage=lL(this.props.usage),this.glIndexType=this.props.indexType==="uint32"?5125:5123,n.data?this._initWithData(n.data,n.byteOffset,n.byteLength):this._initWithByteLength(n.byteLength||0)}destroy(){!this.destroyed&&this.handle&&(this.removeStats(),this.props.handle?this.trackDeallocatedReferencedMemory("Buffer"):(this.trackDeallocatedMemory(),this.gl.deleteBuffer(this.handle)),this.destroyed=!0,this.handle=null)}_initWithData(t,n=0,r=t.byteLength+n){const s=this.glTarget;this.gl.bindBuffer(s,this.handle),this.gl.bufferData(s,r,this.glUsage),this.gl.bufferSubData(s,n,t),this.gl.bindBuffer(s,null),this.bytesUsed=r,this.byteLength=r,this._setDebugData(t,n,r),this.props.handle?this.trackReferencedMemory(r,"Buffer"):this.trackAllocatedMemory(r)}_initWithByteLength(t){let n=t;t===0&&(n=new Float32Array(0));const r=this.glTarget;return this.gl.bindBuffer(r,this.handle),this.gl.bufferData(r,n,this.glUsage),this.gl.bindBuffer(r,null),this.bytesUsed=t,this.byteLength=t,this._setDebugData(null,0,t),this.props.handle?this.trackReferencedMemory(t,"Buffer"):this.trackAllocatedMemory(t),this}write(t,n=0){const r=ArrayBuffer.isView(t)?t:new Uint8Array(t),s=36663;this.gl.bindBuffer(s,this.handle),this.gl.bufferSubData(s,n,r),this.gl.bindBuffer(s,null),this._setDebugData(t,n,t.byteLength)}async mapAndWriteAsync(t,n=0,r=this.byteLength-n){const s=new ArrayBuffer(r);await t(s,"copied"),this.write(s,n)}async readAsync(t=0,n){return this.readSyncWebGL(t,n)}async mapAndReadAsync(t,n=0,r){const s=await this.readAsync(n,r);return await t(s.buffer,"copied")}readSyncWebGL(t=0,n){n=n??this.byteLength-t;const r=new Uint8Array(n),s=0;return this.gl.bindBuffer(36662,this.handle),this.gl.getBufferSubData(36662,t,r,s,n),this.gl.bindBuffer(36662,null),this._setDebugData(r,t,n),r}}function cL(i){return i&j.INDEX?34963:i&j.VERTEX?34962:i&j.UNIFORM?35345:34962}function lL(i){return i&j.INDEX||i&j.VERTEX?35044:i&j.UNIFORM?35048:35044}function uL(i){var n;const e=i.split(/\r?\n/),t=[];for(const r of e){if(r.length<=1)continue;const s=r.trim(),o=r.split(":"),a=(n=o[0])==null?void 0:n.trim();if(o.length===2){const[p,m]=o;if(!p||!m){t.push({message:s,type:Wn(a||"info"),lineNum:0,linePos:0});continue}t.push({message:m.trim(),type:Wn(p),lineNum:0,linePos:0});continue}const[c,l,u,...f]=o;if(!c||!l||!u){t.push({message:o.slice(1).join(":").trim()||s,type:Wn(a||"info"),lineNum:0,linePos:0});continue}let h=parseInt(u,10);Number.isNaN(h)&&(h=0);let g=parseInt(l,10);Number.isNaN(g)&&(g=0),t.push({message:f.join(":").trim(),type:Wn(c),lineNum:h,linePos:g})}return t}function Wn(i){const e=["warning","error","info"],t=i.toLowerCase();return e.includes(t)?t:"info"}class fL extends Ar{constructor(t,n){super(t,n);d(this,"device");d(this,"handle");d(this,"_compilationInfoLog","");this.device=t;const r=this.props.handle;switch(this.props.stage){case"vertex":this.handle=r||this.device.gl.createShader(35633);break;case"fragment":this.handle=r||this.device.gl.createShader(35632);break;default:throw new Error(this.props.stage)}t._setWebGLDebugMetadata(this.handle,this,{spector:this.props});const s=this._compile(this.source);s&&typeof s.catch=="function"&&s.catch(()=>{this.compilationStatus="error"})}destroy(){this.handle&&(this.removeStats(),this.device.gl.deleteShader(this.handle),this.destroyed=!0,this.handle.destroyed=!0)}get asyncCompilationStatus(){return this._waitForCompilationComplete().then(()=>(this._getCompilationStatus(),this.compilationStatus))}async getCompilationInfo(){return await this._waitForCompilationComplete(),this.getCompilationInfoSync()}getCompilationInfoSync(){const t=this._getCompilationInfoLog();return t?uL(t):[]}getTranslatedSource(){const n=this.device.getExtension("WEBGL_debug_shaders").WEBGL_debug_shaders;return(n==null?void 0:n.getTranslatedShaderSource(this.handle))||null}_compile(t){t=t.startsWith("#version ")?t:`#version 300 es
${t}`;const{gl:n}=this.device;if(n.shaderSource(this.handle,t),n.compileShader(this.handle),!this.device.props.debug){this.compilationStatus="pending";return}if(!this.device.features.has("compilation-status-async-webgl")){if(this._getCompilationStatus(),this.debugShader(),this.compilationStatus==="error")throw new Error(this._getCompilationErrorMessage(t));return}return T.once(1,"Shader compilation is asynchronous")(),this._waitForCompilationComplete().then(()=>{T.info(2,`Shader ${this.id} - async compilation complete: ${this.compilationStatus}`)(),this._getCompilationStatus(),this.debugShader()})}async _waitForCompilationComplete(){const t=async s=>await new Promise(o=>setTimeout(o,s));if(!this.device.features.has("compilation-status-async-webgl")){await t(10);return}const{gl:r}=this.device;for(;;){if(r.getShaderParameter(this.handle,37297))return;await t(10)}}_getCompilationStatus(){this.compilationStatus=this.device.gl.getShaderParameter(this.handle,35713)?"success":"error",this.compilationStatus==="error"&&this._getCompilationInfoLog()}_getCompilationErrorMessage(t){var f;const n=`${this.props.stage} shader ${this.props.id}`,r=hL(this._getCompilationInfoLog()),s=this.getCompilationInfoSync(),o=s.find(h=>h.type==="error"&&h.message.trim())||s.find(h=>h.message.trim())||s.find(h=>h.type==="error")||s[0];if(!o)return r?`GLSL compilation errors in ${n}: ${r}`:`GLSL compilation errors in ${n}: WebGL did not provide a shader compiler log`;const a=o.lineNum?(f=t.split(/\r?\n/)[o.lineNum-1])==null?void 0:f.trim():void 0,c=o.lineNum?` line ${o.lineNum}`:"",l=a?`
Source: ${a}`:"",u=o.message.trim()||r||"WebGL did not provide a shader compiler log";return`GLSL compilation errors in ${n}:${c}: ${u}${l}`}_getCompilationInfoLog(){var n;const t=(n=this.device.gl.getShaderInfoLog(this.handle))==null?void 0:n.trim();return t&&(this._compilationInfoLog=t),this._compilationInfoLog}}function hL(i){var e;return(e=i.split(/\r?\n/).find(t=>t.trim()))==null?void 0:e.trim()}function dL(i,e,t,n){if(_L(e))return n(i);const r=i;r.pushState();try{return gL(i,e),Li(r.gl,t),n(i)}finally{r.popState()}}function gL(i,e){const t=i,{gl:n}=t;if(e.cullMode)switch(e.cullMode){case"none":n.disable(2884);break;case"front":n.enable(2884),n.cullFace(1028);break;case"back":n.enable(2884),n.cullFace(1029);break}if(e.frontFace&&n.frontFace(At("frontFace",e.frontFace,{ccw:2305,cw:2304})),e.unclippedDepth&&i.features.has("depth-clip-control")&&n.enable(34383),e.depthBias!==void 0&&(n.enable(32823),n.polygonOffset(e.depthBias,e.depthBiasSlopeScale||0)),e.provokingVertex&&i.features.has("provoking-vertex-webgl")){const s=t.getExtension("WEBGL_provoking_vertex").WEBGL_provoking_vertex,o=At("provokingVertex",e.provokingVertex,{first:36429,last:36430});s==null||s.provokingVertexWEBGL(o)}if((e.polygonMode||e.polygonOffsetLine)&&i.features.has("polygon-mode-webgl")){if(e.polygonMode){const s=t.getExtension("WEBGL_polygon_mode").WEBGL_polygon_mode,o=At("polygonMode",e.polygonMode,{fill:6914,line:6913});s==null||s.polygonModeWEBGL(1028,o),s==null||s.polygonModeWEBGL(1029,o)}e.polygonOffsetLine&&n.enable(10754)}if(i.features.has("shader-clip-cull-distance-webgl")&&(e.clipDistance0&&n.enable(12288),e.clipDistance1&&n.enable(12289),e.clipDistance2&&n.enable(12290),e.clipDistance3&&n.enable(12291),e.clipDistance4&&n.enable(12292),e.clipDistance5&&n.enable(12293),e.clipDistance6&&n.enable(12294),e.clipDistance7&&n.enable(12295)),e.depthWriteEnabled!==void 0&&n.depthMask(mL("depthWriteEnabled",e.depthWriteEnabled)),e.depthCompare&&(e.depthCompare!=="always"?n.enable(2929):n.disable(2929),n.depthFunc(Oa("depthCompare",e.depthCompare))),e.clearDepth!==void 0&&n.clearDepth(e.clearDepth),e.stencilWriteMask){const r=e.stencilWriteMask;n.stencilMaskSeparate(1028,r),n.stencilMaskSeparate(1029,r)}if(e.stencilReadMask&&T.warn("stencilReadMask not supported under WebGL"),e.stencilCompare){const r=e.stencilReadMask||4294967295,s=Oa("depthCompare",e.stencilCompare);e.stencilCompare!=="always"?n.enable(2960):n.disable(2960),n.stencilFuncSeparate(1028,s,0,r),n.stencilFuncSeparate(1029,s,0,r)}if(e.stencilPassOperation&&e.stencilFailOperation&&e.stencilDepthFailOperation){const r=yo("stencilPassOperation",e.stencilPassOperation),s=yo("stencilFailOperation",e.stencilFailOperation),o=yo("stencilDepthFailOperation",e.stencilDepthFailOperation);n.stencilOpSeparate(1028,s,o,r),n.stencilOpSeparate(1029,s,o,r)}switch(e.blend){case!0:n.enable(3042);break;case!1:n.disable(3042);break}if(e.blendColorOperation||e.blendAlphaOperation){const r=hf("blendColorOperation",e.blendColorOperation||"add"),s=hf("blendAlphaOperation",e.blendAlphaOperation||"add");n.blendEquationSeparate(r,s);const o=Hn("blendColorSrcFactor",e.blendColorSrcFactor||"one"),a=Hn("blendColorDstFactor",e.blendColorDstFactor||"zero"),c=Hn("blendAlphaSrcFactor",e.blendAlphaSrcFactor||"one"),l=Hn("blendAlphaDstFactor",e.blendAlphaDstFactor||"zero");n.blendFuncSeparate(o,a,c,l)}}function Oa(i,e){return At(i,e,{never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519})}function yo(i,e){return At(i,e,{keep:7680,zero:0,replace:7681,invert:5386,"increment-clamp":7682,"decrement-clamp":7683,"increment-wrap":34055,"decrement-wrap":34056})}function hf(i,e){return At(i,e,{add:32774,subtract:32778,"reverse-subtract":32779,min:32775,max:32776})}function Hn(i,e,t="color"){return At(i,e,{one:1,zero:0,src:768,"one-minus-src":769,dst:774,"one-minus-dst":775,"src-alpha":770,"one-minus-src-alpha":771,"dst-alpha":772,"one-minus-dst-alpha":773,"src-alpha-saturated":776,constant:t==="color"?32769:32771,"one-minus-constant":t==="color"?32770:32772,src1:768,"one-minus-src1":769,"src1-alpha":770,"one-minus-src1-alpha":771})}function pL(i,e){return`Illegal parameter ${e} for ${i}`}function At(i,e,t){if(!(e in t))throw new Error(pL(i,e));return t[e]}function mL(i,e){return e}function _L(i){let e=!0;for(const t in i){e=!1;break}return e}function _g(i){const e={};return i.addressModeU&&(e[10242]=vo(i.addressModeU)),i.addressModeV&&(e[10243]=vo(i.addressModeV)),i.addressModeW&&(e[32882]=vo(i.addressModeW)),i.magFilter&&(e[10240]=Ba(i.magFilter)),(i.minFilter||i.mipmapFilter)&&(e[10241]=bL(i.minFilter||"linear",i.mipmapFilter)),i.lodMinClamp!==void 0&&(e[33082]=i.lodMinClamp),i.lodMaxClamp!==void 0&&(e[33083]=i.lodMaxClamp),i.type==="comparison-sampler"&&(e[34892]=34894),i.compare&&(e[34893]=Oa("compare",i.compare)),i.maxAnisotropy&&(e[34046]=i.maxAnisotropy),e}function vo(i){switch(i){case"clamp-to-edge":return 33071;case"repeat":return 10497;case"mirror-repeat":return 33648}}function Ba(i){switch(i){case"nearest":return 9728;case"linear":return 9729}}function bL(i,e="none"){if(!e)return Ba(i);switch(e){case"none":return Ba(i);case"nearest":switch(i){case"nearest":return 9984;case"linear":return 9985}break;case"linear":switch(i){case"nearest":return 9986;case"linear":return 9987}}}class yL extends Lr{constructor(t,n){super(t,n);d(this,"device");d(this,"handle");d(this,"parameters");this.device=t,this.parameters=_g(n),this.handle=n.handle||this.device.gl.createSampler(),this._setSamplerParameters(this.parameters)}destroy(){this.handle&&(this.device.gl.deleteSampler(this.handle),this.handle=void 0)}toString(){return`Sampler(${this.id},${JSON.stringify(this.props)})`}_setSamplerParameters(t){for(const[n,r]of Object.entries(t)){const s=Number(n);switch(s){case 33082:case 33083:this.device.gl.samplerParameterf(this.handle,s,r);break;default:this.device.gl.samplerParameteri(this.handle,s,r);break}}}}function at(i,e,t){if(vL(e))return t(i);const{nocatch:n=!0}=e,r=Tt.get(i);r.push(),Li(i,e);let s;if(n)s=t(i),r.pop();else try{s=t(i)}finally{r.pop()}return s}function vL(i){for(const e in i)return!1;return!0}class ii extends Tr{constructor(t,n){super(t,{...he.defaultProps,...n});d(this,"device");d(this,"gl");d(this,"handle");d(this,"texture");this.device=t,this.gl=this.device.gl,this.handle=null,this.texture=n.texture}}function bg(i){return wL[i]}const wL={5124:"sint32",5125:"uint32",5122:"sint16",5123:"uint16",5120:"sint8",5121:"uint8",5126:"float32",5131:"float16",33635:"uint16",32819:"uint16",32820:"uint16",33640:"uint32",35899:"uint32",35902:"uint32",34042:"uint32",36269:"uint32"};class Qi extends he{constructor(t,n){super(t,n,{byteAlignment:1});d(this,"device");d(this,"gl");d(this,"handle");d(this,"sampler");d(this,"view");d(this,"glTarget");d(this,"glFormat");d(this,"glType");d(this,"glInternalFormat");d(this,"compressed");d(this,"_textureUnit",0);d(this,"_framebuffer",null);d(this,"_framebufferAttachmentKey",null);this.device=t,this.gl=this.device.gl;const r=mg(this.props.format);if(this.glTarget=EL(this.props.dimension),this.glInternalFormat=r.internalFormat,this.glFormat=r.format,this.glType=r.type,this.compressed=r.compressed,this.isHandleBorrowed&&this.props.handle===void 0)throw new Error("Borrowed WebGL textures require a texture handle");if(this.handle=this.props.handle||this.gl.createTexture(),this.device._setWebGLDebugMetadata(this.handle,this,{spector:this.props}),!this.isHandleBorrowed){this.gl.bindTexture(this.glTarget,this.handle);const{dimension:s,width:o,height:a,depth:c,mipLevels:l,glTarget:u,glInternalFormat:f}=this;if(!this.compressed)switch(s){case"2d":case"cube":this.gl.texStorage2D(u,l,f,o,a);break;case"2d-array":case"3d":this.gl.texStorage3D(u,l,f,o,a,c);break;default:throw new Error(s)}this.gl.bindTexture(this.glTarget,null),this._initializeData(n.data)}this.ownsHandle?this.trackAllocatedMemory(this.getAllocatedByteLength(),"Texture"):this.trackReferencedMemory(this.getAllocatedByteLength(),"Texture"),this.isHandleBorrowed||this.setSampler(this.props.sampler),this.view=new ii(this.device,{...this.props,texture:this}),Object.seal(this)}destroy(){var t;this.handle&&((t=this._framebuffer)==null||t.destroy(),this._framebuffer=null,this._framebufferAttachmentKey=null,this.removeStats(),this.ownsHandle?(this.gl.deleteTexture(this.handle),this.trackDeallocatedMemory("Texture")):this.trackDeallocatedReferencedMemory("Texture"),this.destroyed=!0)}createView(t){return new ii(this.device,{...t,texture:this})}clone(t){if(this.isHandleBorrowed&&t&&(t.width!==this.width||t.height!==this.height))throw new Error(`Cannot resize borrowed read-only ${this}`);return super.clone(t)}setSampler(t={}){this._assertWritable("set sampler parameters on"),super.setSampler(t);const n=_g(this.sampler.props);this._setSamplerParameters(n)}copyExternalImage(t){this._assertWritable("copy external image data into");const n=this._normalizeCopyExternalImageOptions(t);if(n.sourceX||n.sourceY)throw new Error("WebGL does not support sourceX/sourceY)");const{glFormat:r,glType:s}=this,{image:o,depth:a,mipLevel:c,x:l,y:u,z:f,width:h,height:g}=n,p=Bi(this.glTarget,this.dimension,f),m=n.flipY?{37440:!0}:{};return this.gl.bindTexture(this.glTarget,this.handle),at(this.gl,m,()=>{switch(this.dimension){case"2d":case"cube":this.gl.texSubImage2D(p,c,l,u,h,g,r,s,o);break;case"2d-array":case"3d":this.gl.texSubImage3D(p,c,l,u,f,h,g,a,r,s,o);break;default:}}),this.gl.bindTexture(this.glTarget,null),{width:n.width,height:n.height}}copyElementImage(t){this._assertWritable("copy element image data into");const n=this._normalizeCopyElementImageOptions(t),{glFormat:r}=this,{element:s,depth:o,mipLevel:a,sourceX:c,sourceY:l,sourceWidth:u,sourceHeight:f,x:h,y:g,z:p,width:m,height:_}=n,y=Bi(this.glTarget,this.dimension,p),w=n.flipY?{37440:!0}:{},b=this.gl;if(o!==1||this.dimension!=="2d"&&this.dimension!=="cube")throw new Error(`${this} copyElementImage only supports 2d and cube textures on WebGL`);if(a!==0||h!==0||g!==0)throw new Error(`${this} copyElementImage only supports full base-level uploads on WebGL`);if(typeof b.texElementImage2D!="function")throw new Error(`${this} copyElementImage is not supported by this WebGL implementation`);return this.gl.bindTexture(this.glTarget,this.handle),at(this.gl,w,()=>{var x;(x=b.texElementImage2D)==null||x.call(b,y,r,s,{sx:c,sy:l,swidth:u??m,sheight:f??_,width:m,height:_})}),this.gl.bindTexture(this.glTarget,null),{width:n.width,height:n.height}}copyImageData(t){super.copyImageData(t)}readBuffer(t={},n){if(!n)throw new Error(`${this} readBuffer requires a destination buffer`);const r=this._getSupportedColorReadOptions(t),s=t.byteOffset??0,o=this.computeMemoryLayout(r);if(n.byteLength<s+o.byteLength)throw new Error(`${this} readBuffer target is too small (${n.byteLength} < ${s+o.byteLength})`);const a=n;this.gl.bindBuffer(35051,a.handle);try{this._readColorTextureLayers(r,o,c=>{this.gl.readPixels(r.x,r.y,r.width,r.height,this.glFormat,this.glType,s+c)})}finally{this.gl.bindBuffer(35051,null)}return n}async readDataAsync(t={}){throw new Error(`${this} readDataAsync is deprecated; use readBuffer() with an explicit destination buffer or DynamicTexture.readAsync()`)}writeBuffer(t,n={}){this._assertWritable("write buffer data into");const r=this._normalizeTextureWriteOptions(n),{width:s,height:o,depthOrArrayLayers:a,mipLevel:c,byteOffset:l,x:u,y:f,z:h}=r,{glFormat:g,glType:p,compressed:m}=this,_=Bi(this.glTarget,this.dimension,h);if(m)throw new Error("writeBuffer for compressed textures is not implemented in WebGL");const{bytesPerPixel:y}=this.device.getTextureFormatInfo(this.format),w=y?r.bytesPerRow/y:void 0,b={3317:this.byteAlignment,...w!==void 0?{3314:w}:{},32878:r.rowsPerImage};this.gl.bindTexture(this.glTarget,this.handle),this.gl.bindBuffer(35052,t.handle),at(this.gl,b,()=>{switch(this.dimension){case"2d":case"cube":this.gl.texSubImage2D(_,c,u,f,s,o,g,p,l);break;case"2d-array":case"3d":this.gl.texSubImage3D(_,c,u,f,h,s,o,a,g,p,l);break;default:}}),this.gl.bindBuffer(35052,null),this.gl.bindTexture(this.glTarget,null)}writeData(t,n={}){this._assertWritable("write data into");const r=this._normalizeTextureWriteOptions(n),s=ArrayBuffer.isView(t)?t:new Uint8Array(t),{width:o,height:a,depthOrArrayLayers:c,mipLevel:l,x:u,y:f,z:h,byteOffset:g}=r,{glFormat:p,glType:m,compressed:_}=this,y=Bi(this.glTarget,this.dimension,h);let w;if(!_){const{bytesPerPixel:O}=this.device.getTextureFormatInfo(this.format);O&&(w=r.bytesPerRow/O)}const b=this.compressed?{}:{3317:this.byteAlignment,...w!==void 0?{3314:w}:{},32878:r.rowsPerImage},x=PL(s,g),S=_?xL(s,g):s,L=this._getMipLevelSize(l),R=u===0&&f===0&&h===0&&o===L.width&&a===L.height&&c===L.depthOrArrayLayers;this.gl.bindTexture(this.glTarget,this.handle),this.gl.bindBuffer(35052,null),at(this.gl,b,()=>{switch(this.dimension){case"2d":case"cube":_?R?this.gl.compressedTexImage2D(y,l,p,o,a,0,S):this.gl.compressedTexSubImage2D(y,l,u,f,o,a,p,S):this.gl.texSubImage2D(y,l,u,f,o,a,p,m,s,x);break;case"2d-array":case"3d":_?R?this.gl.compressedTexImage3D(y,l,p,o,a,c,0,S):this.gl.compressedTexSubImage3D(y,l,u,f,h,o,a,c,p,S):this.gl.texSubImage3D(y,l,u,f,h,o,a,c,p,m,s,x);break;default:}}),this.gl.bindTexture(this.glTarget,null)}_getRowByteAlignment(t,n){return 1}_getFramebuffer(){return this._framebuffer||(this._framebuffer=this.device.createFramebuffer({id:`framebuffer-for-${this.id}`,width:this.width,height:this.height,colorAttachments:[this]})),this._framebuffer}readDataSyncWebGL(t={}){const n=this._getSupportedColorReadOptions(t),r=this.computeMemoryLayout(n),s=bg(this.glType),o=sc(s),a=new o(r.byteLength/o.BYTES_PER_ELEMENT);return this._readColorTextureLayers(n,r,c=>{const l=new o(a.buffer,a.byteOffset+c,r.bytesPerImage/o.BYTES_PER_ELEMENT);this.gl.readPixels(n.x,n.y,n.width,n.height,this.glFormat,this.glType,l)}),a.buffer}_readColorTextureLayers(t,n,r){const s=this._getFramebuffer(),o=n.bytesPerRow/n.bytesPerPixel,a={3333:this.byteAlignment,...o!==t.width?{3330:o}:{}},c=this.gl.getParameter(3074),l=this.gl.bindFramebuffer(36160,s.handle);try{this.gl.readBuffer(36064),at(this.gl,a,()=>{for(let u=0;u<t.depthOrArrayLayers;u++)this._attachReadSubresource(s,t.mipLevel,t.z+u),r(u*n.bytesPerImage)})}finally{this.gl.bindFramebuffer(36160,l||null),this.gl.readBuffer(c)}}_attachReadSubresource(t,n,r){const s=`${n}:${r}`;if(this._framebufferAttachmentKey!==s){switch(this.dimension){case"2d":this.gl.framebufferTexture2D(36160,36064,3553,this.handle,n);break;case"cube":this.gl.framebufferTexture2D(36160,36064,Bi(this.glTarget,this.dimension,r),this.handle,n);break;case"2d-array":case"3d":this.gl.framebufferTextureLayer(36160,36064,this.handle,n,r);break;default:throw new Error(`${this} color readback does not support ${this.dimension} textures`)}if(this.device.props.debug){const o=Number(this.gl.checkFramebufferStatus(36160));if(o!==36053)throw new Error(`${t} incomplete for ${this} readback (${o})`)}this._framebufferAttachmentKey=s}}generateMipmapsWebGL(t){if(this._assertWritable("generate mipmaps for"),!(!(this.device.isTextureFormatRenderable(this.props.format)&&this.device.isTextureFormatFilterable(this.props.format))&&(T.warn(`${this} is not renderable or filterable, may not be able to generate mipmaps`)(),!(t!=null&&t.force))))try{this.gl.bindTexture(this.glTarget,this.handle),this.gl.generateMipmap(this.glTarget)}catch(r){T.warn(`Error generating mipmap for ${this}: ${r.message}`)()}finally{this.gl.bindTexture(this.glTarget,null)}}_setSamplerParameters(t){T.level>=2&&T.log(2,`${this.id} sampler parameters`,this.device.getGLKeys(t))(),this.gl.bindTexture(this.glTarget,this.handle);for(const[n,r]of Object.entries(t)){const s=Number(n),o=r;switch(s){case 33082:case 33083:this.gl.texParameterf(this.glTarget,s,o);break;case 10240:case 10241:this.gl.texParameteri(this.glTarget,s,o);break;case 10242:case 10243:case 32882:this.gl.texParameteri(this.glTarget,s,o);break;case 34046:this.device.features.has("texture-filterable-anisotropic-webgl")&&this.gl.texParameteri(this.glTarget,s,o);break;case 34892:case 34893:this.gl.texParameteri(this.glTarget,s,o);break}}this.gl.bindTexture(this.glTarget,null)}_getActiveUnit(){return this.gl.getParameter(34016)-33984}_bind(t){const{gl:n}=this;return t!==void 0&&(this._textureUnit=t,n.activeTexture(33984+t)),n.bindTexture(this.glTarget,this.handle),t}_unbind(t){const{gl:n}=this;return t!==void 0&&(this._textureUnit=t,n.activeTexture(33984+t)),n.bindTexture(this.glTarget,null),t}_assertWritable(t){if(this.isHandleBorrowed)throw new Error(`Cannot ${t} borrowed read-only ${this}`)}}function xL(i,e=0){return e?new i.constructor(i.buffer,i.byteOffset+e,(i.byteLength-e)/i.BYTES_PER_ELEMENT):i}function PL(i,e){if(e%i.BYTES_PER_ELEMENT!==0)throw new Error(`Texture byteOffset ${e} must align to typed array element size ${i.BYTES_PER_ELEMENT}`);return e/i.BYTES_PER_ELEMENT}function EL(i){switch(i){case"1d":break;case"2d":return 3553;case"3d":return 32879;case"cube":return 34067;case"2d-array":return 35866}throw new Error(i)}function Bi(i,e,t){return e==="cube"?34069+t:i}function SL(i,e,t,n){const r=i;let s=n;s===!0&&(s=1),s===!1&&(s=0);const o=typeof s=="number"?[s]:s;switch(t){case 35678:case 35680:case 35679:case 35682:case 36289:case 36292:case 36293:case 36298:case 36299:case 36300:case 36303:case 36306:case 36307:case 36308:case 36311:if(typeof n!="number")throw new Error("samplers must be set to integers");return i.uniform1i(e,n);case 5126:return i.uniform1fv(e,o);case 35664:return i.uniform2fv(e,o);case 35665:return i.uniform3fv(e,o);case 35666:return i.uniform4fv(e,o);case 5124:return i.uniform1iv(e,o);case 35667:return i.uniform2iv(e,o);case 35668:return i.uniform3iv(e,o);case 35669:return i.uniform4iv(e,o);case 35670:return i.uniform1iv(e,o);case 35671:return i.uniform2iv(e,o);case 35672:return i.uniform3iv(e,o);case 35673:return i.uniform4iv(e,o);case 5125:return r.uniform1uiv(e,o,1);case 36294:return r.uniform2uiv(e,o,2);case 36295:return r.uniform3uiv(e,o,3);case 36296:return r.uniform4uiv(e,o,4);case 35674:return i.uniformMatrix2fv(e,!1,o);case 35675:return i.uniformMatrix3fv(e,!1,o);case 35676:return i.uniformMatrix4fv(e,!1,o);case 35685:return r.uniformMatrix2x3fv(e,!1,o);case 35686:return r.uniformMatrix2x4fv(e,!1,o);case 35687:return r.uniformMatrix3x2fv(e,!1,o);case 35688:return r.uniformMatrix3x4fv(e,!1,o);case 35689:return r.uniformMatrix4x2fv(e,!1,o);case 35690:return r.uniformMatrix4x3fv(e,!1,o)}throw new Error("Illegal uniform")}function LL(i){return CL[i]}function Hc(i){return AL[i]}function yg(i){return!!vg[i]}function TL(i){return vg[i]}const AL={5126:"f32",35664:"vec2<f32>",35665:"vec3<f32>",35666:"vec4<f32>",5124:"i32",35667:"vec2<i32>",35668:"vec3<i32>",35669:"vec4<i32>",5125:"u32",36294:"vec2<u32>",36295:"vec3<u32>",36296:"vec4<u32>",35670:"f32",35671:"vec2<f32>",35672:"vec3<f32>",35673:"vec4<f32>",35674:"mat2x2<f32>",35685:"mat2x3<f32>",35686:"mat2x4<f32>",35687:"mat3x2<f32>",35675:"mat3x3<f32>",35688:"mat3x4<f32>",35689:"mat4x2<f32>",35690:"mat4x3<f32>",35676:"mat4x4<f32>"},vg={35678:{viewDimension:"2d",sampleType:"float"},35680:{viewDimension:"cube",sampleType:"float"},35679:{viewDimension:"3d",sampleType:"float"},35682:{viewDimension:"3d",sampleType:"depth"},36289:{viewDimension:"2d-array",sampleType:"float"},36292:{viewDimension:"2d-array",sampleType:"depth"},36293:{viewDimension:"cube",sampleType:"float"},36298:{viewDimension:"2d",sampleType:"sint"},36299:{viewDimension:"3d",sampleType:"sint"},36300:{viewDimension:"cube",sampleType:"sint"},36303:{viewDimension:"2d-array",sampleType:"uint"},36306:{viewDimension:"2d",sampleType:"uint"},36307:{viewDimension:"3d",sampleType:"uint"},36308:{viewDimension:"cube",sampleType:"uint"},36311:{viewDimension:"2d-array",sampleType:"uint"}},CL={uint8:5121,sint8:5120,unorm8:5121,snorm8:5120,uint16:5123,sint16:5122,unorm16:5123,snorm16:5122,uint32:5125,sint32:5124,float16:5131,float32:5126};function ML(i,e,t={}){const n={attributes:[],bindings:[]};n.attributes=IL(i,e);const r=BL(i,e,t);for(const c of r){const l=c.uniforms.map(u=>({name:u.name,format:u.format,byteOffset:u.byteOffset,byteStride:u.byteStride,arrayLength:u.arrayLength}));n.bindings.push({type:"uniform",name:c.name,group:0,location:c.location,visibility:(c.vertex?1:0)|(c.fragment?2:0),minBindingSize:c.byteLength,uniforms:l})}const s=OL(i,e);let o=0;for(const c of s)if(yg(c.type)){const{viewDimension:l,sampleType:u}=TL(c.type);n.bindings.push({type:"texture",name:c.name,group:0,location:o,viewDimension:l,sampleType:u}),c.textureUnit=o,o+=1}s.length&&(n.uniforms=s);const a=RL(i,e);return a!=null&&a.length&&(n.varyings=a),n}function IL(i,e){const t=[],n=i.getProgramParameter(e,35721);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r);if(!s)throw new Error("activeInfo");const{name:o,type:a}=s,c=i.getAttribLocation(e,o);if(c>=0){const l=Hc(a),u=/instance/i.test(o)?"instance":"vertex";t.push({name:o,location:c,stepMode:u,type:l})}}return t.sort((r,s)=>r.location-s.location),t}function RL(i,e){const t=[],n=i.getProgramParameter(e,35971);for(let r=0;r<n;r++){const s=i.getTransformFeedbackVarying(e,r);if(!s)throw new Error("activeInfo");const{name:o,type:a,size:c}=s,l=Hc(a),{type:u,components:f}=fc(l);t.push({location:r,name:o,type:u,size:c*f})}return t.sort((r,s)=>r.location-s.location),t}function OL(i,e){const t=[],n=i.getProgramParameter(e,35718);for(let r=0;r<n;r++){const s=i.getActiveUniform(e,r);if(!s)throw new Error("activeInfo");const{name:o,size:a,type:c}=s,{name:l,isArray:u}=$L(o);let f=i.getUniformLocation(e,l);const h={location:f,name:l,size:a,type:c,isArray:u};if(t.push(h),h.size>1)for(let g=0;g<h.size;g++){const p=`${l}[${g}]`;f=i.getUniformLocation(e,p);const m={...h,name:p,location:f};t.push(m)}}return t}function BL(i,e,t){const n=[],r=DL(i,e,t);for(const[o,a]of r){n.push(a);try{const c=df(i,e,o,a.name);kL(c,a)}catch(c){const l=c instanceof Error?c.message:String(c);T.once(0,`WebGL uniform block reflection failed for "${a.name}"; using supplied std140 metadata. ${l}`)()}}const s=i.getProgramParameter(e,35382);if(!Number.isInteger(s)||s<0)throw new Error(`Failed to reflect WebGL uniform blocks: ACTIVE_UNIFORM_BLOCKS returned ${String(s)}`);for(let o=0;o<s;o++)r.has(o)||n.push(df(i,e,o));return n.sort((o,a)=>o.location-a.location),n}function kL(i,e){for(const t of i.uniforms){const n=e.uniforms.find(r=>t.name===r.name||t.name.endsWith(`.${r.name}`));if(!n)throw new Error(`Failed to validate WebGL uniform block "${e.name}": reflected unexpected member "${t.name}"`);if(t.format!==n.format||t.arrayLength!==n.arrayLength||t.byteOffset!==n.byteOffset||t.byteStride!==n.byteStride)throw new Error(`Failed to validate WebGL uniform block "${e.name}": reflected layout for "${t.name}" does not match supplied std140 metadata`)}}function DL(i,e,t){var s;const n=new Map;for(const o of t.uniformBlockLayouts||[])n.set(o.name,NL(o));for(const o of((s=t.shaderLayout)==null?void 0:s.bindings)||[])zL(o)&&n.set(o.name,o);const r=new Map;for(const o of n.values()){const a=FL(i,e,o.name);if(!a)continue;const{blockIndex:c,blockName:l}=a;if(r.has(c))throw new Error(`Multiple supplied uniform block layouts resolve to active WebGL block "${l}"`);r.set(c,{name:l,location:c,byteLength:o.minBindingSize,vertex:!!(o.visibility&&o.visibility&1),fragment:!!(o.visibility&&o.visibility&2),uniformCount:o.uniforms.length,uniforms:o.uniforms.map(u=>({...u}))})}return r}function FL(i,e,t){const n=t.endsWith("Uniforms")?[t,t.slice(0,-8)]:[t,`${t}Uniforms`];for(const r of n){const s=i.getUniformBlockIndex(e,r);if(s!==4294967295){if(!Number.isInteger(s)||s<0)throw new Error(`Failed to resolve WebGL uniform block "${r}": getUniformBlockIndex returned ${String(s)}`);return{blockIndex:s,blockName:r}}}return null}function df(i,e,t,n){const r=n||i.getActiveUniformBlockName(e,t);if(!r)throw new Error(`Failed to reflect WebGL uniform block at index ${t}: missing block name`);const s=(b,x)=>{const S=i.getActiveUniformBlockParameter(e,t,b);if(S==null)throw new Error(`Failed to reflect WebGL uniform block "${r}": ${x} returned null`);return S},o=vt(s(35391,"UNIFORM_BLOCK_BINDING"),r,"UNIFORM_BLOCK_BINDING",0),a=vt(s(35392,"UNIFORM_BLOCK_DATA_SIZE"),r,"UNIFORM_BLOCK_DATA_SIZE",0),c=vt(s(35394,"UNIFORM_BLOCK_ACTIVE_UNIFORMS"),r,"UNIFORM_BLOCK_ACTIVE_UNIFORMS",0),l=wg(s(35395,"UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES"),r,"UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES",c),u=ki(i,e,l,35383,"UNIFORM_TYPE",r,c),f=ki(i,e,l,35384,"UNIFORM_SIZE",r,c),h=ki(i,e,l,35386,"UNIFORM_BLOCK_INDEX",r,c),g=ki(i,e,l,35387,"UNIFORM_OFFSET",r,c),p=ki(i,e,l,35388,"UNIFORM_ARRAY_STRIDE",r,c),m=[];for(let b=0;b<c;b++){if(h[b]!==t)throw new Error(`Failed to reflect WebGL uniform block "${r}": active uniform index ${l[b]} belongs to block ${h[b]}, expected ${t}`);const x=l[b],S=i.getActiveUniform(e,x);if(!S)throw new Error(`Failed to reflect WebGL uniform block "${r}": getActiveUniform(${x}) returned null`);const L=vt(u[b],r,`UNIFORM_TYPE[${b}]`,1),R=vt(f[b],r,`UNIFORM_SIZE[${b}]`,1),O=vt(g[b],r,`UNIFORM_OFFSET[${b}]`,0),B=vt(p[b],r,`UNIFORM_ARRAY_STRIDE[${b}]`,0);if(S.type!==L||S.size!==R)throw new Error(`Failed to reflect WebGL uniform block "${r}": getActiveUniform(${x}) disagrees with getActiveUniforms`);m.push({name:S.name,format:Hc(L),arrayLength:R,byteOffset:O,byteStride:B})}const _={name:r,location:o,byteLength:a,vertex:!!s(35396,"UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER"),fragment:!!s(35398,"UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER"),uniformCount:c,uniforms:m},y=new Set(_.uniforms.map(b=>b.name.split(".")[0]).filter(b=>!!b)),w=_.name.replace(/Uniforms$/,"");if(y.size===1&&!y.has(_.name)&&!y.has(w)){const[b]=y;T.warn(`Uniform block "${_.name}" uses GLSL instance "${b}". luma.gl binds uniform buffers by block name ("${_.name}") and alias ("${w}"). Prefer matching the instance name to one of those to avoid confusing silent mismatches.`)()}return _}function ki(i,e,t,n,r,s,o){const a=i.getActiveUniforms(e,t,n);if(a===null)throw new Error(`Failed to reflect WebGL uniform block "${s}": ${r} returned null`);return wg(a,s,r,o)}function wg(i,e,t,n){if(!Array.isArray(i)&&!ArrayBuffer.isView(i))throw new Error(`Failed to reflect WebGL uniform block "${e}": ${t} returned a non-array value`);const r=Array.from(i);if(r.length!==n||r.some(s=>!Number.isInteger(s)))throw new Error(`Failed to reflect WebGL uniform block "${e}": ${t} returned ${r.length} invalid values, expected ${n}`);return r}function vt(i,e,t,n){if(!Number.isInteger(i)||i<n)throw new Error(`Failed to reflect WebGL uniform block "${e}": ${t} returned ${String(i)}`);return i}function NL(i){const e=dc(i.uniformTypes,{layout:"std140"}),t=UL(i.uniformTypes,e.fields);return{type:"uniform",name:i.name,group:0,location:0,minBindingSize:e.byteLength,uniforms:t}}function UL(i,e){const t=[],n=(s,o)=>{if(typeof o=="string"){const a=e[s];if(!a)throw new Error(`Missing std140 layout field ${s}`);t.push({name:s,format:a.shaderType,arrayLength:1,byteOffset:a.offset*4,byteStride:0});return}if(Array.isArray(o)){r(s,o[0],o[1]);return}for(const[a,c]of Object.entries(o))n(`${s}.${a}`,c)},r=(s,o,a)=>{if(typeof o=="string"){const c=e[`${s}[0]`],l=a>1?e[`${s}[1]`]:void 0;if(!c)throw new Error(`Missing std140 array layout field ${s}[0]`);t.push({name:`${s}[0]`,format:c.shaderType,arrayLength:a,byteOffset:c.offset*4,byteStride:l?(l.offset-c.offset)*4:0});return}if(Array.isArray(o))throw new Error(`Nested uniform arrays are not supported for ${s}`);for(const[c,l]of Object.entries(o)){if(typeof l!="string")throw new Error(`Composite uniform array members are not supported for ${s}`);const u=`${s}[0].${c}`,f=`${s}[1].${c}`,h=e[u],g=a>1?e[f]:void 0;if(!h)throw new Error(`Missing std140 array layout field ${u}`);t.push({name:u,format:h.shaderType,arrayLength:a,byteOffset:h.offset*4,byteStride:g?(g.offset-h.offset)*4:0})}};for(const[s,o]of Object.entries(i))n(s,o);return t}function zL(i){return i.type==="uniform"&&Number.isInteger(i.minBindingSize)&&i.minBindingSize>=0&&Array.isArray(i.uniforms)&&i.uniforms.every(e=>typeof e.name=="string"&&typeof e.format=="string"&&Number.isInteger(e.arrayLength)&&e.arrayLength>0&&Number.isInteger(e.byteOffset)&&e.byteOffset>=0&&Number.isInteger(e.byteStride)&&e.byteStride>=0)}function $L(i){if(i[i.length-1]!=="]")return{name:i,length:1,isArray:!1};const t=/([^[]*)(\[[0-9]+\])?/.exec(i);return{name:Sr(t==null?void 0:t[1],`Failed to parse GLSL uniform name ${i}`),length:t!=null&&t[2]?1:0,isArray:!!(t!=null&&t[2])}}class GL extends ct{constructor(t,n){super(t,n);d(this,"device");d(this,"handle");d(this,"vs");d(this,"fs");d(this,"introspectedLayout");d(this,"bindings",{});d(this,"uniforms",{});d(this,"varyings",null);d(this,"_uniformCount",0);d(this,"_uniformSetters",{});this.device=t;const r=this.sharedRenderPipeline||this.device._createSharedRenderPipelineWebGL(n);this.sharedRenderPipeline=r,this.handle=r.handle,this.vs=r.vs,this.fs=r.fs,this.linkStatus=r.linkStatus,this.introspectedLayout=ML(this.device.gl,this.handle,{uniformBlockLayouts:n._uniformBlockLayouts,shaderLayout:n.shaderLayout}),this.device._setWebGLDebugMetadata(this.handle,this,{spector:{id:this.props.id}}),this.shaderLayout=n.shaderLayout?VL(this.introspectedLayout,n.shaderLayout):this.introspectedLayout}get[Symbol.toStringTag](){return"WEBGLRenderPipeline"}destroy(){this.destroyed||(this.sharedRenderPipeline&&!this.props._sharedRenderPipeline&&this.sharedRenderPipeline.destroy(),this.destroyResource())}setBindings(t,n){const r=ea(uc(this.shaderLayout,t));for(const[s,o]of Object.entries(r)){const a=xg(this.shaderLayout,s);if(a){switch(o||T.warn(`Unsetting binding "${s}" in render pipeline "${this.id}"`)(),a.type){case"uniform":if(!(o instanceof Ki)&&!(o.buffer instanceof Ki))throw new Error("buffer value");break;case"texture":if(!(o instanceof ii||o instanceof Qi||o instanceof Xi))throw new Error(`${this} Bad texture binding for ${s}`);break;case"sampler":T.warn(`Ignoring sampler ${s}`)();break;default:throw new Error(a.type)}this.bindings[s]=o}else{const c=this.shaderLayout.bindings.map(l=>`"${l.name}"`).join(", ");n!=null&&n.disableWarnings||T.warn(`No binding "${s}" in render pipeline "${this.id}", expected one of ${c}`,o)()}}}draw(t){const n=t.renderPass,r=t.bindGroups?ea(t.bindGroups):t.bindings||this.bindings;return n.setPipeline(this),n.setBindings(r),n.setVertexArray(t.vertexArray),n.draw({parameters:t.parameters,topology:t.topology,isInstanced:t.isInstanced,vertexCount:t.vertexCount,indexCount:t.indexCount,instanceCount:t.instanceCount,firstVertex:t.firstVertex,firstIndex:t.firstIndex,firstInstance:t.firstInstance,baseVertex:t.baseVertex,transformFeedback:t.transformFeedback,uniforms:t.uniforms})}_areTexturesRenderable(t){let n=!0;for(const r of this.shaderLayout.bindings)gf(t,r.name)||(T.warn(`Binding ${r.name} not found in ${this.id}`)(),n=!1);return n}_applyBindings(t,n){if(this._syncLinkStatus(),this.linkStatus!=="success")return;const{gl:r}=this.device;r.useProgram(this.handle);let s=0,o=0;for(const a of this.shaderLayout.bindings){const c=gf(t,a.name);if(!c)throw new Error(`No value for binding ${a.name} in ${this.id}`);switch(a.type){case"uniform":const{name:l}=a,u=r.getUniformBlockIndex(this.handle,l);if(u===4294967295)throw new Error(`Invalid uniform block name ${l}`);if(r.uniformBlockBinding(this.handle,u,o),c instanceof Ki)r.bindBufferBase(35345,o,c.handle);else{const h=c;r.bindBufferRange(35345,o,h.buffer.handle,h.offset||0,h.size||h.buffer.byteLength-(h.offset||0))}o+=1;break;case"texture":if(!(c instanceof ii||c instanceof Qi||c instanceof Xi))throw new Error("texture");let f;if(c instanceof ii)f=c.texture;else if(c instanceof Qi)f=c;else if(c instanceof Xi&&c.colorAttachments[0]instanceof ii)T.warn("Passing framebuffer in texture binding may be deprecated. Use fbo.colorAttachments[0] instead")(),f=c.colorAttachments[0].texture;else throw new Error("No texture");r.activeTexture(33984+s),r.bindTexture(f.glTarget,f.handle),s+=1;break;case"sampler":break;case"storage":case"read-only-storage":throw new Error(`binding type '${a.type}' not supported in WebGL`)}}}_applyUniforms(t){for(const n of this.shaderLayout.uniforms||[]){const{name:r,location:s,type:o,textureUnit:a}=n,c=t[r]??a;c!==void 0&&SL(this.device.gl,s,o,c)}}_syncLinkStatus(){this.linkStatus=this.sharedRenderPipeline.linkStatus}}function VL(i,e){const t={...i,attributes:i.attributes.map(n=>({...n})),bindings:i.bindings.map(n=>({...n}))};for(const n of(e==null?void 0:e.attributes)||[]){const r=t.attributes.find(s=>s.name===n.name);r?(r.type=n.type||r.type,r.stepMode=n.stepMode||r.stepMode):T.warn(`shader layout attribute ${n.name} not present in shader`)}for(const n of(e==null?void 0:e.bindings)||[]){const r=xg(t,n.name);if(!r){T.warn(`shader layout binding ${n.name} not present in shader`);continue}Object.assign(r,n)}return t}function xg(i,e){return i.bindings.find(t=>t.name===e||t.name===`${e}Uniforms`||`${t.name}Uniforms`===e)}function gf(i,e){return i[e]||i[`${e}Uniforms`]||i[e.replace(/Uniforms$/,"")]}const pf=4;class jL extends Hy{constructor(t,n){super(t,n);d(this,"device");d(this,"handle");d(this,"vs");d(this,"fs");d(this,"linkStatus","pending");this.device=t,this.handle=n.handle||this.device.gl.createProgram(),this.vs=n.vs,this.fs=n.fs,n.varyings&&n.varyings.length>0&&this.device.gl.transformFeedbackVaryings(this.handle,n.varyings,n.bufferMode||35981),this._linkShaders()}destroy(){this.destroyed||(this.device.gl.useProgram(null),this.device.gl.deleteProgram(this.handle),this.handle.destroyed=!0,this.destroyResource())}async _linkShaders(){const{gl:t}=this.device;if(t.attachShader(this.handle,this.vs.handle),t.attachShader(this.handle,this.fs.handle),T.time(pf,`linkProgram for ${this.id}`)(),t.linkProgram(this.handle),T.timeEnd(pf,`linkProgram for ${this.id}`)(),!this.device.features.has("compilation-status-async-webgl")){const r=this._getLinkStatus();this._reportLinkStatus(r);return}T.once(1,"RenderPipeline linking is asynchronous")(),await this._waitForLinkComplete(),T.info(2,`RenderPipeline ${this.id} - async linking complete: ${this.linkStatus}`)();const n=this._getLinkStatus();this._reportLinkStatus(n)}async _reportLinkStatus(t){var n;switch(t){case"success":return;default:const r=t==="link-error"?"Link error":"Validation error";switch(this.vs.compilationStatus){case"error":throw this.vs.debugShader(),new Error(`${this} ${r} during compilation of ${this.vs}`);case"pending":await this.vs.asyncCompilationStatus,this.vs.debugShader();break}switch((n=this.fs)==null?void 0:n.compilationStatus){case"error":throw this.fs.debugShader(),new Error(`${this} ${r} during compilation of ${this.fs}`);case"pending":await this.fs.asyncCompilationStatus,this.fs.debugShader();break}const s=this.device.gl.getProgramInfoLog(this.handle);this.device.reportError(new Error(`${r} during ${t}: ${s}`),this)(),this.device.debug()}}_getLinkStatus(){const{gl:t}=this.device;return t.getProgramParameter(this.handle,35714)?(this._initializeSamplerUniforms(),t.validateProgram(this.handle),t.getProgramParameter(this.handle,35715)?(this.linkStatus="success","success"):(this.linkStatus="error","validation-error")):(this.linkStatus="error","link-error")}_initializeSamplerUniforms(){const{gl:t}=this.device;t.useProgram(this.handle);let n=0;const r=t.getProgramParameter(this.handle,35718);for(let s=0;s<r;s++){const o=t.getActiveUniform(this.handle,s);if(o&&yg(o.type)){const a=o.name.endsWith("[0]"),c=a?o.name.slice(0,-3):o.name,l=t.getUniformLocation(this.handle,c);l!==null&&(n=this._assignSamplerUniform(l,o,a,n))}}}_assignSamplerUniform(t,n,r,s){const{gl:o}=this.device;if(r&&n.size>1){const a=Int32Array.from({length:n.size},(c,l)=>s+l);return o.uniform1iv(t,a),s+n.size}return o.uniform1i(t,s),s+1}async _waitForLinkComplete(){const t=async s=>await new Promise(o=>setTimeout(o,s));if(!this.device.features.has("compilation-status-async-webgl")){await t(10);return}const{gl:r}=this.device;for(;;){if(r.getProgramParameter(this.handle,37297))return;await t(10)}}}class WL extends na{constructor(t,n={}){super(t,n);d(this,"device");d(this,"handle",null);d(this,"commands",[]);this.device=t}_executeCommands(t=this.commands){for(const n of t)switch(n.name){case"copy-buffer-to-buffer":HL(this.device,n.options);break;case"copy-buffer-to-texture":YL(this.device,n.options);break;case"copy-texture-to-buffer":qL(this.device,n.options);break;case"copy-texture-to-texture":ZL(this.device,n.options);break;default:throw new Error(n.name)}}}function HL(i,e){const t=e.sourceBuffer,n=e.destinationBuffer;i.gl.bindBuffer(36662,t.handle),i.gl.bindBuffer(36663,n.handle),i.gl.copyBufferSubData(36662,36663,e.sourceOffset??0,e.destinationOffset??0,e.size),i.gl.bindBuffer(36662,null),i.gl.bindBuffer(36663,null)}function YL(i,e){const{sourceBuffer:t,byteOffset:n=0,destinationTexture:r,mipLevel:s=0,origin:o=[0,0,0],aspect:a="all",bytesPerRow:c,rowsPerImage:l,size:u}=e;if(a!=="all")throw new Error("copyBufferToTexture aspect is not supported in WebGL");r.writeBuffer(t,{byteOffset:n,bytesPerRow:c,rowsPerImage:l,mipLevel:s,x:o[0]??0,y:o[1]??0,z:o[2]??0,width:u[0],height:u[1],depthOrArrayLayers:u[2]})}function qL(i,e){const{sourceTexture:t,mipLevel:n=0,aspect:r="all",width:s=e.sourceTexture.width,height:o=e.sourceTexture.height,depthOrArrayLayers:a,origin:c=[0,0,0],destinationBuffer:l,byteOffset:u=0,bytesPerRow:f,rowsPerImage:h}=e;if(t instanceof he){t.readBuffer({x:c[0]??0,y:c[1]??0,z:c[2]??0,width:s,height:o,depthOrArrayLayers:a,mipLevel:n,aspect:r,byteOffset:u},l);return}if(r!=="all")throw new Error("aspect not supported in WebGL");if(n!==0||a!==void 0||f||h)throw new Error("not implemented");const{framebuffer:g,destroyFramebuffer:p}=Pg(t);let m;try{const _=l,y=s||g.width,w=o||g.height,b=Sr(g.colorAttachments[0]),x=mg(b.texture.props.format),S=x.format,L=x.type;i.gl.bindBuffer(35051,_.handle),m=i.gl.bindFramebuffer(36160,g.handle),i.gl.readPixels(c[0],c[1],y,w,S,L,u)}finally{i.gl.bindBuffer(35051,null),m!==void 0&&i.gl.bindFramebuffer(36160,m),p&&g.destroy()}}function ZL(i,e){const{sourceTexture:t,destinationMipLevel:n=0,origin:r=[0,0],destinationOrigin:s=[0,0,0],destinationTexture:o}=e;let{width:a=e.destinationTexture.width,height:c=e.destinationTexture.height}=e;const{framebuffer:l,destroyFramebuffer:u}=Pg(t),[f=0,h=0]=r,[g,p,m]=s,_=i.gl.bindFramebuffer(36160,l.handle);let y,w;if(o instanceof Qi)y=o,a=Number.isFinite(a)?a:y.width,c=Number.isFinite(c)?c:y.height,y._bind(0),w=y.glTarget;else throw new Error("invalid destination");switch(w){case 3553:case 34067:i.gl.copyTexSubImage2D(w,n,g,p,f,h,a,c);break;case 35866:case 32879:i.gl.copyTexSubImage3D(w,n,g,p,m,f,h,a,c);break}y&&y._unbind(),i.gl.bindFramebuffer(36160,_),u&&l.destroy()}function Pg(i){if(i instanceof he){const{width:e,height:t,id:n}=i;return{framebuffer:i.device.createFramebuffer({id:`framebuffer-for-${n}`,width:e,height:t,colorAttachments:[i]}),destroyFramebuffer:!0}}return{framebuffer:i,destroyFramebuffer:!1}}function XL(i){switch(i){case"point-list":return 0;case"line-list":return 1;case"line-strip":return 3;case"triangle-list":return 4;case"triangle-strip":return 5;default:throw new Error(i)}}function KL(i){switch(i){case"point-list":return 0;case"line-list":return 1;case"line-strip":return 1;case"triangle-list":return 4;case"triangle-strip":return 4;default:throw new Error(i)}}const QL=[1,2,4,8];class JL extends ta{constructor(t,n){var a;super(t,n);d(this,"device");d(this,"handle",null);d(this,"glParameters",{});d(this,"pipeline",null);d(this,"bindings",{});d(this,"bindingsPipeline",null);d(this,"vertexArray",null);this.device=t;const r=this.props.framebuffer,s=!r||r.handle===null;s&&t.getDefaultCanvasContext()._resizeDrawingBufferIfNeeded();let o;if(!((a=n==null?void 0:n.parameters)!=null&&a.viewport))if(!s&&r){const{width:c,height:l}=r;o=[0,0,c,l]}else{const[c,l]=t.getDefaultCanvasContext().getDrawingBufferSize();o=[0,0,c,l]}if(this.device.pushState(),this.setParameters({viewport:o,...this.props.parameters}),!s&&(r!=null&&r.colorAttachments.length)){const c=r.colorAttachments.map((l,u)=>36064+u);this.device.gl.drawBuffers(c)}else s&&this.device.gl.drawBuffers([1029]);this.clear(),this.props.timestampQuerySet&&this.props.beginTimestampIndex!==void 0&&this.props.timestampQuerySet.writeTimestamp(this.props.beginTimestampIndex)}end(){this.destroyed||(this.props.timestampQuerySet&&this.props.endTimestampIndex!==void 0&&this.props.timestampQuerySet.writeTimestamp(this.props.endTimestampIndex),this.device.popState(),this.destroy())}pushDebugGroup(t){}popDebugGroup(){}insertDebugMarker(t){}executeBundles(t){throw new Error("Render bundles are only supported in WebGPU")}setParameters(t={}){const n={...this.glParameters};n.framebuffer=this.props.framebuffer||null,this.props.depthReadOnly&&(n.depthMask=!this.props.depthReadOnly),n.stencilMask=this.props.stencilReadOnly?0:1,n[35977]=this.props.discard,t.viewport&&(t.viewport.length>=6?(n.viewport=t.viewport.slice(0,4),n.depthRange=[t.viewport[4],t.viewport[5]]):n.viewport=t.viewport),t.scissorRect&&(n.scissorTest=!0,n.scissor=t.scissorRect),t.blendConstant&&(n.blendColor=t.blendConstant),t.stencilReference!==void 0&&(n[2967]=t.stencilReference,n[36003]=t.stencilReference),"colorMask"in t&&(n.colorMask=QL.map(r=>!!(r&t.colorMask))),this.glParameters=n,Li(this.device.gl,n)}setPipeline(t){this.pipeline=t}setBindings(t,n){if(!this.pipeline)throw new Error("RenderPass.setPipeline() must be called before setBindings()");this.bindings=ea(uc(this.pipeline.shaderLayout,t)),this.bindingsPipeline=this.pipeline}setVertexArray(t){this.vertexArray=t}draw(t){var b;const n=this.pipeline,r=this.vertexArray;if(!n)throw new Error("RenderPass.setPipeline() must be called before draw()");if(!r)throw new Error("RenderPass.setVertexArray() must be called before draw()");if(n.shaderLayout.bindings.length>0&&this.bindingsPipeline!==n)throw new Error("RenderPass.setBindings() must be called after setPipeline() before draw()");n._syncLinkStatus();const{parameters:s=n.props.parameters,topology:o=n.props.topology,vertexCount:a,indexCount:c,instanceCount:l,isInstanced:u=!1,firstVertex:f=0,transformFeedback:h,uniforms:g=n.uniforms}=t,p=XL(o),m=!!r.indexBuffer,_=(b=r.indexBuffer)==null?void 0:b.glIndexType,y=c??a??0;if(n.linkStatus!=="success")return T.info(2,`RenderPipeline:${n.id}.draw() aborted - waiting for shader linking`)(),!1;if(!n._areTexturesRenderable(this.bindings))return T.info(2,`RenderPipeline:${n.id}.draw() aborted - textures not yet loaded`)(),!1;this.device.gl.useProgram(n.handle),r.bindBeforeRender(this);const w=h;return w&&w.begin(n.props.topology),n._applyBindings(this.bindings,{disableWarnings:n.props.disableWarnings}),n._applyUniforms(g),dL(this.device,s,this.glParameters,()=>{m&&u?this.device.gl.drawElementsInstanced(p,y,_,f,l||0):m?this.device.gl.drawElements(p,y,_,f):u?this.device.gl.drawArraysInstanced(p,f,a||0,l||0):this.device.gl.drawArrays(p,f,a||0),w&&w.end()}),r.unbindAfterRender(this),!0}drawIndirect(t,n=0){throw new Error("Indirect drawing is only supported in WebGPU")}drawIndexedIndirect(t,n=0){throw new Error("Indirect drawing is only supported in WebGPU")}beginOcclusionQuery(t){const n=this.props.occlusionQuerySet;n==null||n.beginOcclusionQuery()}endOcclusionQuery(){const t=this.props.occlusionQuerySet;t==null||t.endOcclusionQuery()}clear(){const t={...this.glParameters};let n=0;this.props.clearColors&&this.props.clearColors.forEach((r,s)=>{r&&this.clearColorBuffer(s,r)}),this.props.clearColor!==!1&&this.props.clearColors===void 0&&(n|=16384,t.clearColor=this.props.clearColor),this.props.clearDepth!==!1&&(n|=256,t.clearDepth=this.props.clearDepth),this.props.clearStencil!==!1&&(n|=1024,t.clearStencil=this.props.clearStencil),n!==0&&at(this.device.gl,t,()=>{this.device.gl.clear(n)})}clearColorBuffer(t=0,n=[0,0,0,0]){at(this.device.gl,{framebuffer:this.props.framebuffer},()=>{switch(n.constructor){case Int8Array:case Int16Array:case Int32Array:this.device.gl.clearBufferiv(6144,t,n);break;case Uint8Array:case Uint8ClampedArray:case Uint16Array:case Uint32Array:this.device.gl.clearBufferuiv(6144,t,n);break;case Float32Array:this.device.gl.clearBufferfv(6144,t,n);break;default:throw new Error("clearColorBuffer: color must be typed array")}})}}class mf extends ia{constructor(t,n){super(t,n);d(this,"device");d(this,"handle",null);d(this,"commandBuffer");this.device=t,this.commandBuffer=new WL(t,{id:this.id,userData:this.userData})}destroy(){this.destroyResource()}finish(){return this.destroy(),this.commandBuffer}beginRenderPass(t={}){return new JL(this.device,this._applyTimeProfilingToPassProps(t))}beginComputePass(t={}){throw new Error("ComputePass not supported in WebGL")}copyBufferToBuffer(t){this.commandBuffer.commands.push({name:"copy-buffer-to-buffer",options:t})}copyBufferToTexture(t){this.commandBuffer.commands.push({name:"copy-buffer-to-texture",options:t})}copyTextureToBuffer(t){this.commandBuffer.commands.push({name:"copy-texture-to-buffer",options:t})}copyTextureToTexture(t){this.commandBuffer.commands.push({name:"copy-texture-to-texture",options:t})}pushDebugGroup(t){}popDebugGroup(){}insertDebugMarker(t){}resolveQuerySet(t,n,r){throw new Error("resolveQuerySet is not supported in WebGL")}writeTimestamp(t,n){t.writeTimestamp(n)}}function e1(i){const{target:e,source:t,start:n=0,count:r=1}=i,s=t.length,o=r*s;let a=0;for(let c=n;a<s;a++)e[c++]=t[a]??0;for(;a<o;)a<o-a?(e.copyWithin(n+a,n,n+a),a*=2):(e.copyWithin(n+a,n,n+o-a),a=o);return i.target}class Yc extends ra{constructor(t,n){super(t,n);d(this,"device");d(this,"handle");d(this,"attributeInfosByLocation");d(this,"buffer",null);d(this,"bufferValue",null);this.device=t,this.handle=this.device.gl.createVertexArray(),this.attributeInfosByLocation=new Array(this.maxVertexAttributes).fill(null);for(const r of Object.values(sd(n.shaderLayout,n.bufferLayout)))this.attributeInfosByLocation[r.location]=r}get[Symbol.toStringTag](){return"VertexArray"}static isConstantAttributeZeroSupported(t){return Ap()==="Chrome"}destroy(){var t;super.destroy(),this.buffer&&((t=this.buffer)==null||t.destroy()),this.handle&&(this.device.gl.deleteVertexArray(this.handle),this.handle=void 0)}setIndexBuffer(t){const n=t;if(n&&n.glTarget!==34963)throw new Error("Use .setBuffer()");this.device.gl.bindVertexArray(this.handle),this.device.gl.bindBuffer(34963,n?n.handle:null),this.indexBuffer=n,this.device.gl.bindVertexArray(null)}setBuffer(t,n){const r=n;if(r.glTarget===34963)throw new Error("Use .setIndexBuffer()");const{size:s,type:o,stride:a,offset:c,normalized:l,integer:u,divisor:f}=this._getAccessor(t);this.device.gl.bindVertexArray(this.handle),this.device.gl.bindBuffer(34962,r.handle),u?this.device.gl.vertexAttribIPointer(t,s,o,a,c):this.device.gl.vertexAttribPointer(t,s,o,l,a,c),this.device.gl.bindBuffer(34962,null),this.device.gl.enableVertexAttribArray(t),this.device.gl.vertexAttribDivisor(t,f||0),this.attributes[t]=r,this.device.gl.bindVertexArray(null)}setConstantWebGL(t,n){this._enable(t,!1),this.attributes[t]=n}bindBeforeRender(){this.device.gl.bindVertexArray(this.handle),this._applyConstantAttributes()}unbindAfterRender(){this.device.gl.bindVertexArray(null)}_applyConstantAttributes(){for(let t=0;t<this.maxVertexAttributes;++t){const n=this.attributes[t];ArrayBuffer.isView(n)&&this.device.setConstantAttributeWebGL(t,n)}}_getAccessor(t){const n=this.attributeInfosByLocation[t];if(!n)throw new Error(`Unknown attribute location ${t}`);const r=hg(n.bufferDataType);return{size:n.bufferComponents,type:r,stride:n.byteStride,offset:n.byteOffset,normalized:n.normalized,integer:n.integer,divisor:n.stepMode==="instance"?1:0}}_enable(t,n=!0){const s=Yc.isConstantAttributeZeroSupported(this.device)||t!==0;(n||s)&&(t=Number(t),this.device.gl.bindVertexArray(this.handle),n?this.device.gl.enableVertexAttribArray(t):this.device.gl.disableVertexAttribArray(t),this.device.gl.bindVertexArray(null))}getConstantBuffer(t,n){const r=t1(n),s=r.byteLength*t,o=r.length*t;if(this.buffer&&s!==this.buffer.byteLength)throw new Error(`Buffer size is immutable, byte length ${s} !== ${this.buffer.byteLength}.`);let a=!this.buffer;if(this.buffer=this.buffer||this.device.createBuffer({byteLength:s}),a||(a=!i1(r,this.bufferValue)),a){const c=sv(n.constructor,o);e1({target:c,source:r,start:0,count:o}),this.buffer.write(c),this.bufferValue=n}return this.buffer}}function t1(i){return Array.isArray(i)?new Float32Array(i):i}function i1(i,e){if(!i||!e||i.length!==e.length||i.constructor!==e.constructor)return!1;for(let t=0;t<i.length;++t)if(i[t]!==e[t])return!1;return!0}class n1 extends sa{constructor(t,n){super(t,n);d(this,"device");d(this,"gl");d(this,"handle");d(this,"layout");d(this,"buffers",{});d(this,"unusedBuffers",{});d(this,"bindOnUse",!0);d(this,"_bound",!1);this.device=t,this.gl=t.gl,this.handle=this.props.handle||this.gl.createTransformFeedback(),this.layout=this.props.layout,n.buffers&&this.setBuffers(n.buffers),Object.seal(this)}destroy(){this.gl.deleteTransformFeedback(this.handle),super.destroy()}begin(t="point-list"){this.gl.bindTransformFeedback(36386,this.handle),this.bindOnUse&&this._bindBuffers(),this.gl.beginTransformFeedback(KL(t))}end(){this.gl.endTransformFeedback(),this.bindOnUse&&this._unbindBuffers(),this.gl.bindTransformFeedback(36386,null)}setBuffers(t){this.buffers={},this.unusedBuffers={},this.bind(()=>{for(const[n,r]of Object.entries(t))this.setBuffer(n,r)})}setBuffer(t,n){const r=this._getVaryingIndex(t),{buffer:s,byteLength:o,byteOffset:a}=this._getBufferRange(n);if(r<0){this.unusedBuffers[t]=s,T.warn(`${this.id} unusedBuffers varying buffer ${t}`)();return}this.buffers[r]={buffer:s,byteLength:o,byteOffset:a},this.bindOnUse||this._bindBuffer(r,s,a,o)}getBuffer(t){if(_f(t))return this.buffers[t]||null;const n=this._getVaryingIndex(t);return this.buffers[n]??null}bind(t=this.handle){if(typeof t!="function")return this.gl.bindTransformFeedback(36386,t),this;let n;return this._bound?n=t():(this.gl.bindTransformFeedback(36386,this.handle),this._bound=!0,n=t(),this._bound=!1,this.gl.bindTransformFeedback(36386,null)),n}unbind(){this.bind(null)}_getBufferRange(t){if(t instanceof Ki)return{buffer:t,byteOffset:0,byteLength:t.byteLength};const{buffer:n,byteOffset:r=0,byteLength:s=t.buffer.byteLength}=t;return{buffer:n,byteOffset:r,byteLength:s}}_getVaryingIndex(t){if(_f(t))return Number(t);for(const n of this.layout.varyings||[])if(t===n.name)return n.location;return-1}_bindBuffers(){for(const[t,n]of Object.entries(this.buffers)){const{buffer:r,byteLength:s,byteOffset:o}=this._getBufferRange(n);this._bindBuffer(Number(t),r,o,s)}}_unbindBuffers(){for(const t in this.buffers)this.gl.bindBufferBase(35982,Number(t),null)}_bindBuffer(t,n,r=0,s){const o=n&&n.handle;!o||s===void 0?this.gl.bindBufferBase(35982,t,o):this.gl.bindBufferRange(35982,t,o,r,s)}}function _f(i){return typeof i=="number"?Number.isInteger(i):/^\d+$/.test(i)}class r1 extends oa{constructor(t,n){super(t,n);d(this,"device");d(this,"handle");d(this,"_timestampPairs",[]);d(this,"_pendingReads",new Set);d(this,"_occlusionQuery",null);d(this,"_occlusionActive",!1);if(this.device=t,n.type==="timestamp"){if(n.count<2)throw new Error("Timestamp QuerySet requires at least two query slots");this._timestampPairs=new Array(Math.ceil(n.count/2)).fill(null).map(()=>({activeQuery:null,completedQueries:[]})),this.handle=null}else{if(n.count>1)throw new Error("WebGL occlusion QuerySet can only have one value");const r=this.device.gl.createQuery();if(!r)throw new Error("WebGL query not supported");this.handle=r}Object.seal(this)}get[Symbol.toStringTag](){return"QuerySet"}destroy(){if(!this.destroyed){this.handle&&this.device.gl.deleteQuery(this.handle);for(const t of this._timestampPairs){t.activeQuery&&(this._cancelPendingQuery(t.activeQuery),this.device.gl.deleteQuery(t.activeQuery.handle));for(const n of t.completedQueries)this._cancelPendingQuery(n),this.device.gl.deleteQuery(n.handle)}this._occlusionQuery&&(this._cancelPendingQuery(this._occlusionQuery),this.device.gl.deleteQuery(this._occlusionQuery.handle));for(const t of Array.from(this._pendingReads))this._cancelPendingQuery(t);this.destroyResource()}}isResultAvailable(t){return this.props.type==="timestamp"?t===void 0?this._timestampPairs.some((n,r)=>this._isTimestampPairAvailable(r)):this._isTimestampPairAvailable(this._getTimestampPairIndex(t)):this._occlusionQuery?this._pollQueryAvailability(this._occlusionQuery):!1}async readResults(t){const n=(t==null?void 0:t.firstQuery)||0,r=(t==null?void 0:t.queryCount)||this.props.count-n;if(this._validateRange(n,r),this.props.type==="timestamp"){const s=new Array(r).fill(0n),o=Math.floor(n/2),a=Math.floor((n+r-1)/2);for(let c=o;c<=a;c++){const l=await this._consumeTimestampPairResult(c),u=c*2,f=u+1;u>=n&&u<n+r&&(s[u-n]=0n),f>=n&&f<n+r&&(s[f-n]=l)}return s}if(!this._occlusionQuery)throw new Error("Occlusion query has not been started");return[await this._consumeQueryResult(this._occlusionQuery)]}async readTimestampDuration(t,n){if(this.props.type!=="timestamp")throw new Error("Timestamp durations require a timestamp QuerySet");if(t<0||n>=this.props.count||n<=t)throw new Error("Timestamp duration range is out of bounds");if(t%2!==0||n!==t+1)throw new Error("WebGL timestamp durations require adjacent even/odd query indices");const r=await this._consumeTimestampPairResult(this._getTimestampPairIndex(t));return Number(r)/1e6}beginOcclusionQuery(){if(this.props.type!=="occlusion")throw new Error("Occlusion queries require an occlusion QuerySet");if(!this.handle)throw new Error("WebGL occlusion query is not available");if(this._occlusionActive)throw new Error("Occlusion query is already active");this.device.gl.beginQuery(35887,this.handle),this._occlusionQuery={handle:this.handle,promise:null,result:null,disjoint:!1,cancelled:!1,pollRequestId:null,resolve:null,reject:null},this._occlusionActive=!0}endOcclusionQuery(){if(!this._occlusionActive)throw new Error("Occlusion query is not active");this.device.gl.endQuery(35887),this._occlusionActive=!1}writeTimestamp(t){if(this.props.type!=="timestamp")throw new Error("Timestamp writes require a timestamp QuerySet");const n=this._getTimestampPairIndex(t),r=this._timestampPairs[n];if(t%2===0){if(r.activeQuery)throw new Error("Timestamp query pair is already active");const s=this.device.gl.createQuery();if(!s)throw new Error("WebGL query not supported");const o={handle:s,promise:null,result:null,disjoint:!1,cancelled:!1,pollRequestId:null,resolve:null,reject:null};this.device.gl.beginQuery(35007,s),r.activeQuery=o;return}if(!r.activeQuery)throw new Error("Timestamp query pair was ended before it was started");this.device.gl.endQuery(35007),r.completedQueries.push(r.activeQuery),r.activeQuery=null}_validateRange(t,n){if(t<0||n<0||t+n>this.props.count)throw new Error("Query read range is out of bounds")}_getTimestampPairIndex(t){if(t<0||t>=this.props.count)throw new Error("Query index is out of bounds");return Math.floor(t/2)}_isTimestampPairAvailable(t){const n=this._timestampPairs[t];return!n||n.completedQueries.length===0?!1:this._pollQueryAvailability(n.completedQueries[0])}_pollQueryAvailability(t){if(t.cancelled||this.destroyed)return t.result=0n,!0;if(t.result!==null||t.disjoint)return!0;if(!this.device.gl.getQueryParameter(t.handle,34919))return!1;const r=!!this.device.gl.getParameter(36795);return t.disjoint=r,t.result=r?0n:BigInt(this.device.gl.getQueryParameter(t.handle,34918)),!0}async _consumeTimestampPairResult(t){const n=this._timestampPairs[t];if(!n||n.completedQueries.length===0)throw new Error("Timestamp query pair has no completed result");const r=n.completedQueries.shift();try{return await this._consumeQueryResult(r)}finally{this.device.gl.deleteQuery(r.handle)}}_consumeQueryResult(t){return t.promise||(this._pendingReads.add(t),t.promise=new Promise((n,r)=>{t.resolve=n,t.reject=r;const s=()=>{if(t.pollRequestId=null,t.cancelled||this.destroyed){this._pendingReads.delete(t),t.promise=null,t.resolve=null,t.reject=null,n(0n);return}if(!this._pollQueryAvailability(t)){t.pollRequestId=this._requestAnimationFrame(s);return}this._pendingReads.delete(t),t.promise=null,t.resolve=null,t.reject=null,t.disjoint?r(new Error("GPU timestamp query was invalidated by a disjoint event")):n(t.result||0n)};s()})),t.promise}_cancelPendingQuery(t){if(this._pendingReads.delete(t),t.cancelled=!0,t.pollRequestId!==null&&(this._cancelAnimationFrame(t.pollRequestId),t.pollRequestId=null),t.resolve){const n=t.resolve;t.promise=null,t.resolve=null,t.reject=null,n(0n)}}_requestAnimationFrame(t){return requestAnimationFrame(t)}_cancelAnimationFrame(t){cancelAnimationFrame(t)}}class s1 extends aa{constructor(t,n={}){super(t,{});d(this,"device");d(this,"gl");d(this,"handle");d(this,"signaled");d(this,"_signaled",!1);this.device=t,this.gl=t.gl;const r=this.props.handle||this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE,0);if(!r)throw new Error("Failed to create WebGL fence");this.handle=r,this.signaled=new Promise(s=>{const o=()=>{const a=this.gl.clientWaitSync(this.handle,0,0);a===this.gl.ALREADY_SIGNALED||a===this.gl.CONDITION_SATISFIED?(this._signaled=!0,s()):setTimeout(o,1)};o()})}isSignaled(){if(this._signaled)return!0;const t=this.gl.getSyncParameter(this.handle,this.gl.SYNC_STATUS);return this._signaled=t===this.gl.SIGNALED,this._signaled}destroy(){this.destroyed||this.gl.deleteSync(this.handle)}}function Eg(i){switch(i){case 6406:case 33326:case 6403:case 36244:return 1;case 33339:case 33340:case 33328:case 33320:case 33319:return 2;case 6407:case 36248:case 34837:return 3;case 6408:case 36249:case 34836:return 4;default:return 0}}function o1(i){switch(i){case 5121:return 1;case 33635:case 32819:case 32820:return 2;case 5126:return 4;default:return 0}}function a1(i,e){var w;const{sourceX:t=0,sourceY:n=0,sourceAttachment:r=0}=e||{};let{target:s=null,sourceWidth:o,sourceHeight:a,sourceDepth:c,sourceFormat:l,sourceType:u}=e||{};const{framebuffer:f,deleteFramebuffer:h}=Sg(i),{gl:g,handle:p}=f;o||(o=f.width),a||(a=f.height);const m=(w=f.colorAttachments[r])==null?void 0:w.texture;if(!m)throw new Error(`Invalid framebuffer attachment ${r}`);c=(m==null?void 0:m.depth)||1,l||(l=(m==null?void 0:m.glFormat)||6408),u||(u=(m==null?void 0:m.glType)||5121),s=u1(s,u,l,o,a);const _=Ke.getDataType(s);u=u||LL(_);const y=g.bindFramebuffer(36160,p);return g.readBuffer(36064+r),g.readPixels(t,n,o,a,l,u,s),g.readBuffer(36064),g.bindFramebuffer(36160,y||null),h&&f.destroy(),s}function c1(i,e){const{target:t,sourceX:n=0,sourceY:r=0,sourceFormat:s=6408,targetByteOffset:o=0}=e||{};let{sourceWidth:a,sourceHeight:c,sourceType:l}=e||{};const{framebuffer:u,deleteFramebuffer:f}=Sg(i);a=a||u.width,c=c||u.height;const h=u;l=l||5121;let g=t;if(!g){const m=Eg(s),_=o1(l),y=o+a*c*m*_;g=h.device.createBuffer({byteLength:y})}const p=i.device.createCommandEncoder();return p.copyTextureToBuffer({sourceTexture:i,width:a,height:c,origin:[n,r],destinationBuffer:g,byteOffset:o}),p.destroy(),f&&u.destroy(),g}function Sg(i){return i instanceof Cr?{framebuffer:i,deleteFramebuffer:!1}:{framebuffer:l1(i),deleteFramebuffer:!0}}function l1(i,e){const{device:t,width:n,height:r,id:s}=i;return t.createFramebuffer({...e,id:`framebuffer-for-${s}`,width:n,height:r,colorAttachments:[i]})}function u1(i,e,t,n,r,s){if(i)return i;e||(e=5121);const o=bg(e),a=Ke.getTypedArrayConstructor(o),c=Eg(t);return new a(n*r*c)}function f1(i){const e=new Map;for(const t in i){const n=i[t];if(t<"a"){const r=e.get(n);e.set(n,r?`${r}, GL.${t}`:`GL.${t}`)}}return e}class Ct extends li{constructor(t){var f;super({...t,id:t.id||aL("webgl-device")});d(this,"type","webgl");d(this,"handle");d(this,"features");d(this,"limits");d(this,"info");d(this,"canvasContext");d(this,"preferredColorFormat","rgba8unorm");d(this,"preferredDepthFormat","depth24plus");d(this,"commandEncoder");d(this,"lost");d(this,"_resolveContextLost");d(this,"_isLost",!1);d(this,"gl");d(this,"_glKeyByValue",null);d(this,"_constants");d(this,"extensions");d(this,"_polyfilled",!1);d(this,"spectorJS");const n=li._getCanvasContextProps(t);if(!n)throw new Error("WebGLDevice requires props.createCanvasContext to be set");const r=((f=n.canvas)==null?void 0:f.gl)??null;let s=Ct.getDeviceFromContext(r);if(s)throw new Error(`WebGL context already attached to device ${s.id}`);this.canvasContext=new sL(this,n),this.lost=new Promise(h=>{this._resolveContextLost=h});const o={...t.webgl};n.alphaMode==="premultiplied"&&(o.premultipliedAlpha=!0),t.powerPreference!==void 0&&(o.powerPreference=t.powerPreference),t.failIfMajorPerformanceCaveat!==void 0&&(o.failIfMajorPerformanceCaveat=t.failIfMajorPerformanceCaveat);const c=this.props._handle||F3(this.canvasContext.canvas,{onContextLost:h=>{var g;return(g=this._resolveContextLost)==null?void 0:g.call(this,{reason:"destroyed",message:"Entered sleep mode, or too many apps or browser tabs are using the GPU."})},onContextRestored:h=>{console.log("WebGL context restored")}},o);if(!c)throw new Error("WebGL context creation failed");if(s=Ct.getDeviceFromContext(c),s){if(t._reuseDevices)return T.log(1,`Not creating a new Device, instead returning a reference to Device ${s.id} already attached to WebGL context`,s)(),this.canvasContext.destroy(),s._reused=!0,s;throw new Error(`WebGL context already attached to device ${s.id}`)}this.handle=c,this.gl=c,this.spectorJS=L3({...this.props,gl:this.handle});const l=Ra(this.handle);l.device=this,l.extensions||(l.extensions={}),this.extensions=l.extensions,this.info=N3(this.gl,this.extensions),this.limits=new iL(this.gl),this.features=new tL(this.gl,this.extensions,this.props._disabledFeatures),this.props._initializeFeatures&&this.features.initializeFeatures(),new Tt(this.gl,{log:(...h)=>T.log(1,...h)()}).trackState(this.gl,{copyState:!1}),(t.debug||t.debugWebGL)&&(this.gl=E3(this.gl,{traceWebGL:t.debugWebGL}),T.warn("WebGL debug mode activated. Performance reduced.")()),t.debugWebGL&&(T.level=Math.max(T.level,1)),this.commandEncoder=new mf(this,{id:`${this}-command-encoder`}),this.canvasContext._startObservers()}static getDeviceFromContext(t){var n;return t?((n=t.luma)==null?void 0:n.device)??null:null}get[Symbol.toStringTag](){return"WebGLDevice"}toString(){return`${this[Symbol.toStringTag]}(${this.id})`}isVertexFormatSupported(t){switch(t){case"unorm8x4-bgra":return!1;default:return!0}}destroy(){var t;if(!this.props._reuseDevices&&!this._reused){this._isLost=!0,(t=this.commandEncoder)==null||t.destroy();const n=Ra(this.handle);n.device=null}}get isLost(){return this._isLost||this.gl.isContextLost()}createCanvasContext(t){throw new Error("WebGL only supports a single canvas")}createPresentationContext(t){return new oL(this,t||{})}createBuffer(t){const n=this._normalizeBufferProps(t);return new Ki(this,n)}createTexture(t){return new Qi(this,t)}createExternalTexture(t){throw new Error("ExternalTexture is not available on WebGL")}createSampler(t){return new yL(this,t)}createShader(t){return new fL(this,t)}createFramebuffer(t){return new Xi(this,t)}createVertexArray(t){return new Yc(this,t)}createTransformFeedback(t){return new n1(this,t)}createQuerySet(t){return new r1(this,t)}createFence(){return new s1(this)}createRenderPipeline(t){return new GL(this,t)}_createSharedRenderPipelineWebGL(t){return new jL(this,t)}createComputePipeline(t){throw new Error("ComputePipeline not supported in WebGL")}createRenderBundleEncoder(t){throw new Error("Render bundles are only supported in WebGPU")}createCommandEncoder(t={}){return new mf(this,t)}submit(t){let n=null;t||({submittedCommandEncoder:n,commandBuffer:t}=this._finalizeDefaultCommandEncoderForSubmit());try{t._executeCommands(),n&&n.resolveTimeProfilingQuerySet().then(()=>{this.commandEncoder._gpuTimeMs=n._gpuTimeMs}).catch(()=>{})}finally{t.destroy()}}writeBufferViaCommandEncoder(t,n,r,s=0){n.write(r,s)}_finalizeDefaultCommandEncoderForSubmit(){const t=this.commandEncoder,n=t.finish();return this.commandEncoder.destroy(),this.commandEncoder=this.createCommandEncoder({id:t.props.id,timeProfilingQuerySet:t.getTimeProfilingQuerySet()}),{submittedCommandEncoder:t,commandBuffer:n}}readPixelsToArrayWebGL(t,n){return a1(t,n)}readPixelsToBufferWebGL(t,n){return c1(t,n)}setParametersWebGL(t){Li(this.gl,t)}getParametersWebGL(t){return ug(this.gl,t)}withParametersWebGL(t,n){return at(this.gl,t,n)}resetWebGL(){T.warn("WebGLDevice.resetWebGL is deprecated, use only for debugging")(),R3(this.gl)}_getDeviceSpecificTextureFormatCapabilities(t){return X3(this.gl,t,this.extensions)}loseDevice(){var s;let t=!1;const r=this.getExtension("WEBGL_lose_context").WEBGL_lose_context;return r&&(t=!0,r.loseContext()),(s=this._resolveContextLost)==null||s.call(this,{reason:"destroyed",message:"Application triggered context loss"}),t}pushState(){Tt.get(this.gl).push()}popState(){Tt.get(this.gl).pop()}getGLKey(t,n){const r=this._getGLKeyByValue().get(Number(t));return r||(n!=null&&n.emptyIfUnknown?"":String(t))}getGLKeys(t){const n={emptyIfUnknown:!0};return Object.entries(t).reduce((r,[s,o])=>(r[`${s}:${this.getGLKey(s,n)}`]=`${o}:${this.getGLKey(o,n)}`,r),{})}_getGLKeyByValue(){return this._glKeyByValue??(this._glKeyByValue=f1(this.gl)),this._glKeyByValue}setConstantAttributeWebGL(t,n){const r=this.limits.maxVertexAttributes;this._constants=this._constants||new Array(r).fill(null);const s=this._constants[t];switch(s&&p1(s,n)&&T.info(1,`setConstantAttributeWebGL(${t}) could have been skipped, value unchanged`)(),this._constants[t]=n,n.constructor){case Float32Array:h1(this,t,n);break;case Int32Array:d1(this,t,n);break;case Uint32Array:g1(this,t,n);break;default:throw new Error("constant")}}getExtension(t){return Dt(this.gl,t,this.extensions),this.extensions}_setWebGLDebugMetadata(t,n,r){t.luma=n;const s={props:r.spector,id:r.spector.id};t.__SPECTOR_Metadata=s}}function h1(i,e,t){switch(t.length){case 1:i.gl.vertexAttrib1fv(e,t);break;case 2:i.gl.vertexAttrib2fv(e,t);break;case 3:i.gl.vertexAttrib3fv(e,t);break;case 4:i.gl.vertexAttrib4fv(e,t);break}}function d1(i,e,t){i.gl.vertexAttribI4iv(e,t)}function g1(i,e,t){i.gl.vertexAttribI4uiv(e,t)}function p1(i,e){if(!i||!e||i.length!==e.length||i.constructor!==e.constructor)return!1;for(let t=0;t<i.length;++t)if(i[t]!==e[t])return!1;return!0}const bf=Object.freeze(Object.defineProperty({__proto__:null,WebGLDevice:Ct},Symbol.toStringTag,{value:"Module"}));function Je(){}const m1=({isDragging:i})=>i?"grabbing":"grab",Lg={id:"",width:"100%",height:"100%",style:null,viewState:null,initialViewState:null,pickingRadius:0,pickAsync:"auto",layerFilter:null,parameters:{},parent:null,device:null,deviceProps:{},gl:null,canvas:null,_canvases:null,layers:[],effects:[],views:null,controller:null,useDevicePixels:!0,touchAction:"none",eventRecognizerOptions:{},_framebuffer:null,_animate:!1,_pickable:!0,_typedArrayManagerProps:{},_customRender:null,widgets:[],onDeviceInitialized:Je,onWebGLInitialized:Je,onResize:Je,onViewStateChange:Je,onInteractionStateChange:Je,onBeforeRender:Je,onAfterRender:Je,onLoad:Je,onError:i=>q.error(i.message,i.cause)(),onHover:null,onClick:null,onDragStart:null,onDrag:null,onDragEnd:null,_onMetrics:null,getCursor:m1,getTooltip:null,debug:!1,drawPickingColors:!1};class jr{constructor(e){this.width=0,this.height=0,this.userData={},this.device=null,this.canvas=null,this.viewManager=null,this.layerManager=null,this.effectManager=null,this.deckRenderer=null,this.deckPicker=null,this.eventManager=null,this.eventManagers={},this.widgetManager=null,this.tooltip=null,this.animationLoop=null,this._canvasContext=null,this._deviceResizeHandler=null,this.cursorState={isHovering:!1,isDragging:!1},this.stats=new hs({id:"deck.gl"}),this.metrics={fps:0,setPropsTime:0,layersCount:0,drawLayersCount:0,updateLayersCount:0,updateAttributesCount:0,updateAttributesTime:0,framesRedrawn:0,pickTime:0,pickCount:0,pickLayersCount:0,gpuTime:0,gpuTimePerFrame:0,cpuTime:0,cpuTimePerFrame:0,bufferMemory:0,textureMemory:0,renderbufferMemory:0,gpuMemory:0},this._metricsCounter=0,this._hoverPickSequence=0,this._pointerDownPickSequence=0,this._needsRedraw="Initial render",this._canvasManager=new m3({createEventManager:r=>this._createEventManager(r),getEventRoot:r=>this._getEventRoot(r)}),this._ownedCanvas=null,this._pickRequest={mode:"hover",x:-1,y:-1,radius:0,canvasId:void 0,event:null,unproject3D:!1},this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=null,this._onPointerMove=r=>{const{_pickRequest:s}=this,o=this._getCanvasIdFromEvent(r);if(r.type==="pointerleave")s.x=-1,s.y=-1,s.radius=0,s.canvasId=o;else{if(r.leftButton||r.rightButton)return;{const a=r.offsetCenter;if(!a)return;s.x=a.x,s.y=a.y,s.radius=this.props.pickingRadius,s.canvasId=o}}this.layerManager&&(this.layerManager.context.mousePosition={x:s.x,y:s.y}),s.event=r},this._onEvent=r=>{const s=sr[r.type],o=r.offsetCenter,a=this._getCanvasIdFromEvent(r);if(!s||!o||!this.layerManager)return;const c=this.layerManager.getLayers(),l=this._getInternalPickingMode();if(!l)return;if(l==="sync"){const f=r.type==="click"&&this._shouldUnproject3D(c)?this._getFirstPickedInfo(this._pickPointSync(this._getPointPickOptions(o.x,o.y,{unproject3D:!0,canvasId:a},c))):this._getLastPointerDownPickingInfo(o.x,o.y,a,c);this._dispatchPickingEvent(f,r);return}(this._lastPointerDownInfoPromise||Promise.resolve(this._getLastPointerDownPickingInfo(o.x,o.y,a,c))).then(f=>{this._dispatchPickingEvent(f,r)}).catch(f=>{var h,g;return(g=(h=this.props).onError)==null?void 0:g.call(h,f)})},this._onPointerDown=r=>{var f;const s=r.offsetCenter,o=this._getCanvasIdFromEvent(r);if(!s)return;const a=this._getInternalPickingMode();if(!a)return;const c=((f=this.layerManager)==null?void 0:f.getLayers())||[],l=++this._pointerDownPickSequence;if(a==="sync"){const h=this._pickPointSync({x:s.x,y:s.y,canvasId:o,radius:this.props.pickingRadius}),g=this._getFirstPickedInfo(h);this._lastPointerDownInfo=g,this._lastPointerDownInfoPromise=Promise.resolve(g);return}const u=this._pickPointAsync(this._getPointPickOptions(s.x,s.y,{canvasId:o},c)).then(h=>this._getFirstPickedInfo(h)).then(h=>(l===this._pointerDownPickSequence&&(this._lastPointerDownInfo=h),h)).catch(h=>{var p,m;(m=(p=this.props).onError)==null||m.call(p,h);const g=this.deckPicker&&this.viewManager?this._getLastPointerDownPickingInfo(s.x,s.y,o,c):{};return l===this._pointerDownPickSequence&&(this._lastPointerDownInfo=g),g});this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=u};const t=e;this.props={...Lg,...e},e=this.props,this._validateCanvasConfiguration(e),e.viewState&&e.initialViewState&&q.warn("View state tracking is disabled. Use either `initialViewState` for auto update or `viewState` for manual update.")(),this.viewState=this.props.initialViewState,e.device&&(this.device=e.device,this._setDeviceCanvasContext(e.device));let n=this.device;!n&&e.gl&&(e.gl instanceof WebGLRenderingContext&&q.error("WebGL1 context not supported.")(),n=fo.attach(e.gl,{_cacheShaders:!0,_cachePipelines:!0,...this.props.deviceProps})),n||(n=this._createDevice(e)),this.animationLoop=this._createAnimationLoop(n,e),this.setProps(t),e._typedArrayManagerProps&&pi.setOptions(e._typedArrayManagerProps),this.animationLoop.start()}finalize(){var e,t,n,r,s,o,a,c,l,u;this._restoreDeviceResizeHandler(),(e=this.animationLoop)==null||e.stop(),(t=this.animationLoop)==null||t.destroy(),this.animationLoop=null,this._hoverPickSequence++,this._pointerDownPickSequence++,this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=null,(n=this.layerManager)==null||n.finalize(),this.layerManager=null,(r=this.viewManager)==null||r.finalize(),this.viewManager=null,(s=this.effectManager)==null||s.finalize(),this.effectManager=null,(o=this.deckRenderer)==null||o.finalize(),this.deckRenderer=null,(a=this.deckPicker)==null||a.finalize(),this.deckPicker=null,Object.keys(this._canvasManager.targets).length||(c=this.eventManager)==null||c.destroy(),this.eventManager=null,this.eventManagers={},(l=this.widgetManager)==null||l.finalize(),this.widgetManager=null,this._canvasManager.finalize(),this._isMultiCanvasMode()?this.canvas=null:this.canvas&&this.canvas===this._ownedCanvas&&((u=this.canvas.parentElement)==null||u.removeChild(this.canvas),this.canvas=null,this._ownedCanvas=null),this._canvasContext=null}setProps(e){var n,r,s,o,a,c;this.stats.get("setProps Time").timeStart(),"onLayerHover"in e&&q.removed("onLayerHover","onHover")(),"onLayerClick"in e&&q.removed("onLayerClick","onClick")(),e.initialViewState&&!we(this.props.initialViewState,e.initialViewState,3)&&(this.viewState=e.initialViewState),Q(!("_canvases"in e)||Array.isArray(e._canvases)===this._isMultiCanvasMode()),Object.assign(this.props,e),this._validateCanvasConfiguration(this.props),this._validateInternalPickingMode(),this.device&&this._isMultiCanvasMode()&&this._syncCanvasTargets(),this._setCanvasSize(this.props);const t=Object.create(this.props);if(Object.assign(t,{views:this._getViews(),width:this.width,height:this.height,viewState:this._getViewState(),eventManagers:this.eventManagers}),e.device&&e.device.id!==((n=this.device)==null?void 0:n.id)){const l=e.device.getDefaultCanvasContext();(r=this.animationLoop)==null||r.stop(),!this._isMultiCanvasMode()&&this.canvas!==l.canvas&&((s=this.canvas)==null||s.remove(),(o=this.eventManager)==null||o.destroy(),this.canvas=null),this._setDeviceCanvasContext(e.device),q.log(`recreating animation loop for new device! id=${e.device.id}`)(),this.animationLoop=this._createAnimationLoop(e.device,e),this.animationLoop.start()}if((a=this.animationLoop)==null||a.setProps(t),e.useDevicePixels!==void 0&&((c=this._canvasContext)!=null&&c.setProps)){this._canvasContext.setProps({useDevicePixels:e.useDevicePixels});for(const l of Object.values(this._canvasManager.targets))l.presentationContext.setProps({useDevicePixels:e.useDevicePixels})}this.layerManager&&(this.viewManager.setProps(t),this.layerManager.activateViewport(this.getViewports()[0]),this.layerManager.setProps(t),this.effectManager.setProps(t),this.deckRenderer.setProps(t),this.deckPicker.setProps(t),this.widgetManager.setProps(t)),this.stats.get("setProps Time").timeEnd()}needsRedraw(e={clearRedrawFlags:!1}){if(!this.layerManager)return!1;if(this.props._animate)return"Deck._animate";let t=this._needsRedraw;e.clearRedrawFlags&&(this._needsRedraw=!1);const n=this.viewManager.needsRedraw(e),r=this.layerManager.needsRedraw(e),s=this.effectManager.needsRedraw(e),o=this.deckRenderer.needsRedraw(e);return t=t||n||r||s||o,t}redraw(e){if(!this.layerManager)return;let t=this.needsRedraw({clearRedrawFlags:!0});t=e||t,t&&(this.stats.get("Redraw Count").incrementCount(),this.props._customRender?this.props._customRender(t):this._drawLayers(t))}get isInitialized(){return this.viewManager!==null}getViews(){return Q(this.viewManager),this.viewManager.views}getView(e){return Q(this.viewManager),this.viewManager.getView(e)}getViewports(e){return Q(this.viewManager),this.viewManager.getViewports(e)}getCanvas(){return this.canvas}getCanvasContext(e){var n,r;const t=e?(r=(n=this.viewManager)==null?void 0:n.getView(e))==null?void 0:r.props.canvasId:void 0;return this._getCanvasContext(t)}getEventManager(e){if(!e||!this.viewManager)return this.eventManager;const t=this.viewManager.getCanvasId(e)||ai;return this.eventManagers[t]||this.eventManager}async pickObjectAsync(e){const t=(await this._pickAsync("pickObjectAsync","pickObject Time",e)).result;return t.length?t[0]:null}async pickObjectsAsync(e){return await this._pickAsync("pickObjectsAsync","pickObjects Time",e)}pickObject(e){const t=this._pick("pickObject","pickObject Time",e).result;return t.length?t[0]:null}pickMultipleObjects(e){return e.depth=e.depth||10,this._pick("pickObject","pickMultipleObjects Time",e).result}pickObjects(e){return this._pick("pickObjects","pickObjects Time",e)}_pickPositionForController(e,t,n){var s;return this._getInternalPickingMode()!=="sync"?null:this.pickObject({x:e,y:t,radius:0,unproject3D:!0,canvasId:n?(s=this.viewManager)==null?void 0:s.getCanvasId(n):void 0})}_addResources(e,t=!1){for(const n in e)this.layerManager.resourceManager.add({resourceId:n,data:e[n],forceUpdate:t})}_removeResources(e){for(const t of e)this.layerManager.resourceManager.remove(t)}_addDefaultEffect(e){this.effectManager.addDefaultEffect(e)}_addDefaultShaderModule(e){this.layerManager.addDefaultShaderModule(e)}_removeDefaultShaderModule(e){var t;(t=this.layerManager)==null||t.removeDefaultShaderModule(e)}_resolveInternalPickingMode(){var n,r;const{pickAsync:e}=this.props,t=((n=this.device)==null?void 0:n.type)||((r=this.props.deviceProps)==null?void 0:r.type);if(e==="auto")return t==="webgpu"?"async":"sync";if(e==="sync"&&t==="webgpu")throw new Error('`pickAsync: "sync"` is not supported when Deck is using a WebGPU device.');return e}_getInternalPickingMode(){var e,t;try{return this._resolveInternalPickingMode()}catch(n){return(t=(e=this.props).onError)==null||t.call(e,n),null}}_validateInternalPickingMode(){this._getInternalPickingMode()}_getFirstPickedInfo({result:e,emptyInfo:t}){return e[0]||t}_shouldUnproject3D(e=(t=>(t=this.layerManager)==null?void 0:t.getLayers())()||[]){return e.some(n=>n.props.pickable==="3d")}_getPointPickOptions(e,t,n={},r=(s=>(s=this.layerManager)==null?void 0:s.getLayers())()||[]){return{x:e,y:t,canvasId:n.canvasId,radius:this.props.pickingRadius,unproject3D:this._shouldUnproject3D(r),...n}}_pickPointSync(e){return this._pick("pickObject","pickObject Time",e)}_pickPointAsync(e){return this._pickAsync("pickObjectAsync","pickObject Time",e)}_getLastPointerDownPickingInfo(e,t,n,r=(s=>(s=this.layerManager)==null?void 0:s.getLayers())()||[]){return this.deckPicker.getLastPickedObject({x:e,y:t,layers:r,viewports:this.getViewports({x:e,y:t,canvasId:n})},this._lastPointerDownInfo)}_applyHoverCallbacks({result:e,emptyInfo:t},n){var o,a,c;if(!this.widgetManager)return;this.cursorState.isHovering=e.length>0;let r=t,s=!1;for(const l of e)r=l,s=((o=l.layer)==null?void 0:o.onHover(l,n))||s;s||((c=(a=this.props).onHover)==null||c.call(a,r,n),this.widgetManager.onHover(r,n))}_dispatchPickingEvent(e,t){if(!this.layerManager||!this.widgetManager)return;const n=sr[t.type];if(!n)return;const{layer:r}=e,s=r&&(r[n]||r.props[n]),o=this.props[n];let a=!1;s&&(a=s.call(r,e,t)),a||(o==null||o(e,t),this.widgetManager.onEvent(e,t))}_pickAsync(e,t,n){Q(this.deckPicker);const{stats:r}=this,s=this._isMultiCanvasMode()?n.canvasId||this._getDefaultCanvasId():n.canvasId,o=this._getCanvasContext(s)||void 0;r.get("Pick Count").incrementCount(),r.get(t).timeStart(),this._resizeForCanvasTarget(s);const a=this.deckPicker[e]({layers:this.layerManager.getLayers(n),views:this.viewManager.getViews(),viewports:this.getViewports({...n,canvasId:s}),onViewportActive:this.layerManager.activateViewport,effects:this.effectManager.getEffects(),...n,canvasId:s,canvasContext:o});return r.get(t).timeEnd(),a}_pick(e,t,n){Q(this.deckPicker);const{stats:r}=this,s=this._isMultiCanvasMode()?n.canvasId||this._getDefaultCanvasId():n.canvasId,o=this._getCanvasContext(s)||void 0;r.get("Pick Count").incrementCount(),r.get(t).timeStart(),this._resizeForCanvasTarget(s);const a=this.deckPicker[e]({layers:this.layerManager.getLayers(n),views:this.viewManager.getViews(),viewports:this.getViewports({...n,canvasId:s}),onViewportActive:this.layerManager.activateViewport,effects:this.effectManager.getEffects(),...n,canvasId:s,canvasContext:o});return r.get(t).timeEnd(),a}_createCanvas(e){let t=e.canvas;return typeof t=="string"&&(t=document.getElementById(t),Q(t)),t?this._ownedCanvas=null:(t=document.createElement("canvas"),t.id=e.id||"deckgl-overlay",e.width&&typeof e.width=="number"&&(t.width=e.width),e.height&&typeof e.height=="number"&&(t.height=e.height),(e.parent||document.body).appendChild(t),this._ownedCanvas=t),Object.assign(t.style,e.style),t}_isMultiCanvasMode(){return Array.isArray(this.props._canvases)}_getDefaultCanvasId(){return this._canvasManager.order[0]||ai}_validateCanvasConfiguration(e){var t;Array.isArray(e._canvases)&&(Q(!e.canvas),Q(!e.gl),Q(!((t=e.device)!=null&&t.canvasContext)||e.device.getDefaultCanvasContext().offscreenCanvas))}_createEventManager(e){const t=new fE(e,{touchAction:this.props.touchAction,recognizers:Object.keys(Su).map(n=>{var u;const[r,s,o,a]=Su[n],c=(u=this.props.eventRecognizerOptions)==null?void 0:u[n],l={...s,...c,event:n};return{recognizer:new r(l),recognizeWith:o,requireFailure:a}}),events:{pointerdown:this._onPointerDown,pointermove:this._onPointerMove,pointerleave:this._onPointerMove}});for(const n in sr)n==="dblclick"?t.watch(n,this._onEvent):t.on(n,this._onEvent);return t}_getEventRoot(e){var t;return e.closest(".deck-events-root")||((t=this.props.parent)==null?void 0:t.querySelector(".deck-events-root"))||e}_syncCanvasTargets(){var t;if(!this.device||!this._isMultiCanvasMode())return;this._canvasManager.syncCanvasEntries({device:this.device,canvases:this.props._canvases||[],useDevicePixels:this.props.useDevicePixels}),this.eventManagers=this._canvasManager.eventManagers;const e=this._getDefaultCanvasId();this.eventManager=this.eventManagers[e]||null,this.canvas=((t=this._canvasManager.targets[e])==null?void 0:t.canvas)||null}_setCanvasContext(e){this._canvasContext=e,"style"in e.canvas&&(this.canvas=e.canvas)}_setDeviceCanvasContext(e,t={}){const n=e.getDefaultCanvasContext();this._setCanvasContext(n),this._setDeviceResizeHandler(e,t)}_setDeviceResizeHandler(e,t={}){var s;const n=!!t.syncDrawingBuffer;if(((s=this._deviceResizeHandler)==null?void 0:s.device)===e){this._deviceResizeHandler.syncDrawingBuffer=n;return}this._restoreDeviceResizeHandler();const r=o=>{var a;this._isMultiCanvasMode()?this._updateMultiCanvasDimensions():o===this._canvasContext&&this._canvasContext&&this._onCanvasContextResize(this._canvasContext,{syncDrawingBuffer:(a=this._deviceResizeHandler)==null?void 0:a.syncDrawingBuffer})};e.props.onResize=r,this._deviceResizeHandler={device:e,onResize:r,syncDrawingBuffer:n}}_restoreDeviceResizeHandler(){var t;const e=this._deviceResizeHandler;e&&((t=e.device.props)==null?void 0:t.onResize)===e.onResize&&(e.device.props.onResize=Je),this._deviceResizeHandler=null}_setCanvasSize(e){var r;if(this._isMultiCanvasMode()||!this.canvas)return;const{width:t,height:n}=e;if(t||t===0){const s=Number.isFinite(t)?`${t}px`:t;this.canvas.style.width=s}if(n||n===0){const s=Number.isFinite(n)?`${n}px`:n;this.canvas.style.position=((r=e.style)==null?void 0:r.position)||"absolute",this.canvas.style.height=s}}_getCanvasIdFromEvent(e){return this._canvasManager.getCanvasIdFromEvent(e==null?void 0:e.rootElement)}_getCanvasContext(e){var t;return((t=this._canvasManager.getTarget(e))==null?void 0:t.presentationContext)||this._canvasContext}_resizeForCanvasTarget(e){var s;const t=this._canvasManager.getTarget(e);if(!t||!((s=this.device)!=null&&s.canvasContext))return;const[n,r]=t.presentationContext.getDrawingBufferSize();this.device.canvasContext.setDrawingBufferSize(n,r)}_createDeviceCanvas(e){if(this._isMultiCanvasMode()){const t=globalThis.OffscreenCanvas;if(!t)throw new Error("`_canvases` requires OffscreenCanvas support.");const n=typeof e.width=="number"&&Number.isFinite(e.width)?e.width:1,r=typeof e.height=="number"&&Number.isFinite(e.height)?e.height:1;return new t(n,r)}return this._createCanvas(e)}_updateCanvasSize(e=this._canvasContext){var s,o;if(this._isMultiCanvasMode()){this._updateMultiCanvasDimensions();return}const{canvas:t}=this,[n,r]=e?e.getCSSSize():[(t==null?void 0:t.clientWidth)??(t==null?void 0:t.width)??0,(t==null?void 0:t.clientHeight)??(t==null?void 0:t.height)??0];(n!==this.width||r!==this.height)&&(this.width=n,this.height=r,(s=this.viewManager)==null||s.setProps({width:n,height:r}),(o=this.layerManager)==null||o.activateViewport(this.getViewports()[0]),this.props.onResize({width:n,height:r},e||void 0))}_onCanvasContextResize(e,t={}){if(t.syncDrawingBuffer){const{width:n,height:r}=e.canvas;e.setDrawingBufferSize(n,r)}this._needsRedraw="Canvas resized",this._updateCanvasSize(e)}_updateMultiCanvasDimensions(){var n,r,s;const[e,t]=((n=this._getCanvasContext())==null?void 0:n.getCSSSize())||[0,0];(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,this.props.onResize({width:e,height:t})),this._needsRedraw="Canvas resized",(r=this.viewManager)==null||r.setNeedsUpdate("Canvas resized"),(s=this.viewManager)==null||s.setProps({width:this.width,height:this.height})}_createAnimationLoop(e,t){const{gl:n,onError:r}=t;return new Pa({device:e,autoResizeDrawingBuffer:!n&&!Array.isArray(t._canvases),autoResizeViewport:!1,onInitialize:s=>this._setDevice(s.device),onRender:this._onRenderFrame.bind(this),onError:r})}_createDevice(e){var o,a;const t=(o=this.props.deviceProps)==null?void 0:o.createCanvasContext,n=typeof t=="object"?t:void 0,r={adapters:[],_cacheShaders:!0,_cachePipelines:!0,...e.deviceProps};r.adapters.includes(fo)||r.adapters.push(fo);const s={alphaMode:((a=this.props.deviceProps)==null?void 0:a.type)==="webgpu"?"premultiplied":void 0};return Zo.createDevice({_reuseDevices:!0,type:"webgl",...r,createCanvasContext:{...s,...n,canvas:this._createDeviceCanvas(e),useDevicePixels:this.props.useDevicePixels,autoResize:!0}})}_getViewState(){return this.props.viewState||this.viewState}_getViews(){const{views:e}=this.props,t=Array.isArray(e)?e:e?[e]:[new $c({id:"default-view"})];return t.length&&this.props.controller&&(t[0]=t[0].clone({controller:this.props.controller})),t}_onContextLost(){const{onError:e}=this.props;this.animationLoop&&e&&e(new Error("WebGL context is lost"))}_pickAndCallback(){var t;const{_pickRequest:e}=this;if(e.event){const n=e.event,r=((t=this.layerManager)==null?void 0:t.getLayers())||[],s=this._getPointPickOptions(e.x,e.y,{canvasId:e.canvasId,radius:e.radius,mode:e.mode},r),o=this._getInternalPickingMode(),a=++this._hoverPickSequence;if(e.event=null,e.canvasId=void 0,!o)return;if(o==="sync"){this._applyHoverCallbacks(this._pickPointSync(s),n);return}this._pickPointAsync(s).then(({result:c,emptyInfo:l})=>{a===this._hoverPickSequence&&this._applyHoverCallbacks({result:c,emptyInfo:l},n)}).catch(c=>{var l,u;return(u=(l=this.props).onError)==null?void 0:u.call(l,c)})}}_updateCursor(){const e=this.props.getCursor(this.cursorState);if(this._isMultiCanvasMode()){for(const n of Object.values(this._canvasManager.targets))n.canvas.style.cursor=e;return}const t=this.props.parent||this.canvas;t&&(t.style.cursor=e)}_setDevice(e){var s,o,a;if(this.device=e,this._validateInternalPickingMode(),!this.animationLoop)return;this._setDeviceCanvasContext(e,{syncDrawingBuffer:!!(this.props.gl&&this.props.device!==e)}),this._isMultiCanvasMode()?this._syncCanvasTargets():this.canvas&&!this.canvas.isConnected&&this.props.parent&&this.props.parent.insertBefore(this.canvas,this.props.parent.firstChild),this.device.type==="webgl"&&this.device.setParametersWebGL({blend:!0,blendFunc:[770,771,1,771],polygonOffsetFill:!0,depthTest:!0,depthFunc:515}),this.props.onDeviceInitialized(this.device),this.device.type==="webgl"&&this.props.onWebGLInitialized(this.device.gl);const t=new Xd;if(t.play(),this.animationLoop.attachTimeline(t),!this._isMultiCanvasMode()){const c=this.canvas&&this._getEventRoot(this.canvas);Q(c),this.eventManager=this._createEventManager(c),this.eventManagers={[ai]:this.eventManager}}this.viewManager=new D2({timeline:t,eventManager:this.eventManager,eventManagers:this.eventManagers,getCanvasContext:this._isMultiCanvasMode()?this.getCanvasContext.bind(this):void 0,onViewStateChange:this._onViewStateChange.bind(this),onInteractionStateChange:this._onInteractionStateChange.bind(this),pickPosition:this._pickPositionForController.bind(this),views:this._getViews(),viewState:this._getViewState(),width:this.width,height:this.height});const n=this.viewManager.getViewports()[0];this.layerManager=new k2(this.device,{deck:this,stats:this.stats,viewport:n,timeline:t}),this.effectManager=new r3({deck:this,device:this.device}),this.deckRenderer=new a3(this.device,{stats:this.stats}),this.deckPicker=new u3(this.device,{stats:this.stats});const r=((s=this.props.parent)==null?void 0:s.querySelector(".deck-widgets-root"))||(this._isMultiCanvasMode()?this.props.parent||((o=this.canvas)==null?void 0:o.parentElement):null)||((a=this.canvas)==null?void 0:a.parentElement);this.widgetManager=new d3({deck:this,parentElement:r}),this.widgetManager.addDefault(new lg),this.setProps({}),this._updateCanvasSize(this._canvasContext),this.props.onLoad()}_drawLayers(e,t){var o,a,c;const{device:n,gl:r}=this.layerManager.context;this.props.onBeforeRender({device:n,gl:r});const s={target:this.props._framebuffer,layers:this.layerManager.getLayers(),viewports:this.viewManager.getViewports(),onViewportActive:this.layerManager.activateViewport,views:this.viewManager.getViews(),pass:"screen",effects:this.effectManager.getEffects(),...t};if(this._isMultiCanvasMode()&&s.pass==="screen"&&!s.target&&this._canvasManager.order.length)for(const l of this._canvasManager.order){const u=s.viewports.filter(g=>this.viewManager.getCanvasId(g.id)===l);if(!u.length){const g=this._canvasManager.targets[l];this._resizeForCanvasTarget(l),(o=this.deckRenderer)==null||o.renderLayers({...s,canvasContext:g.presentationContext,target:g.presentationContext.getCurrentFramebuffer(),viewports:[],clearCanvas:!0}),g.presentationContext.present();continue}const f=this._canvasManager.targets[l];this._resizeForCanvasTarget(l);const h=f.presentationContext.getCurrentFramebuffer();(a=this.deckRenderer)==null||a.renderLayers({...s,canvasContext:f.presentationContext,target:h,viewports:u}),f.presentationContext.present()}else(c=this.deckRenderer)==null||c.renderLayers(s);s.pass==="screen"&&this.widgetManager.onRedraw({viewports:s.viewports,layers:s.layers}),this.props.onAfterRender({device:n,gl:r})}_onRenderFrame(){this._getFrameStats(),this._metricsCounter++%60===0&&(this._getMetrics(),this.stats.reset(),q.table(4,this.metrics)(),this.props._onMetrics&&this.props._onMetrics(this.metrics)),this._updateCursor(),this.layerManager.updateLayers(),this._pickAndCallback(),this.redraw(),this.viewManager&&this.viewManager.updateViewStates()}_onViewStateChange(e){const t=this.props.onViewStateChange(e)||e.viewState;this.viewState&&(this.viewState={...this.viewState,[e.viewId]:t},this.props.viewState||this.viewManager&&this.viewManager.setProps({viewState:this.viewState}))}_onInteractionStateChange(e){this.cursorState.isDragging=e.isDragging||!1,this.props.onInteractionStateChange(e)}_getFrameStats(){const{stats:e}=this;e.get("frameRate").timeEnd(),e.get("frameRate").timeStart();const t=this.animationLoop.stats;e.get("GPU Time").addTime(t.get("GPU Time").lastTiming),e.get("CPU Time").addTime(t.get("CPU Time").lastTiming)}_getMetrics(){var r;const{metrics:e,stats:t}=this;e.fps=t.get("frameRate").getHz(),e.setPropsTime=t.get("setProps Time").time,e.updateAttributesTime=t.get("Update Attributes").time,e.framesRedrawn=t.get("Redraw Count").count,e.pickTime=t.get("pickObject Time").time+t.get("pickMultipleObjects Time").time+t.get("pickObjects Time").time,e.pickCount=t.get("Pick Count").count,e.layersCount=((r=this.layerManager)==null?void 0:r.layers.length)??0,e.drawLayersCount=t.get("Layers rendered").lastSampleCount,e.pickLayersCount=t.get("Layers picked").lastSampleCount,e.updateLayersCount=t.get("Layer updates").count,e.updateAttributesCount=t.get("Attributes updated").count,e.gpuTime=t.get("GPU Time").time,e.cpuTime=t.get("CPU Time").time,e.gpuTimePerFrame=t.get("GPU Time").getAverageTime(),e.cpuTimePerFrame=t.get("CPU Time").getAverageTime();const n=Zo.stats.get("GPU Time and Memory");e.bufferMemory=n.get("Buffer Memory").count,e.textureMemory=n.get("Texture Memory").count,e.renderbufferMemory=n.get("Renderbuffer Memory").count,e.gpuMemory=n.get("GPU Memory").count}}jr.defaultProps=Lg;jr.VERSION=Q_;function _1(i){switch(i){case"float64":return Float64Array;case"uint8":case"unorm8":return Uint8ClampedArray;default:return sc(i)}}const b1=Ke.getDataType.bind(Ke);function Yn(i,e,t){if(e.size>4)return null;const n=t==="webgpu"&&e.type==="uint8"?"unorm8":e.type,r=e.size,s=!!(t!=="webgpu"&&r===3&&n&&["uint8","sint8","unorm8","snorm8","uint16","sint16","unorm16","snorm16"].includes(n));return{attribute:i,format:r>1?`${n}x${r}${s?"-webgl":""}`:e.type,byteOffset:e.offset||0}}function Ze(i){return i.stride||i.size*i.bytesPerElement}function y1(i,e){return i.type===e.type&&i.size===e.size&&Ze(i)===Ze(e)&&(i.offset||0)===(e.offset||0)}function ka(i,e){e.offset&&q.removed("shaderAttribute.offset","vertexOffset, elementOffset")();const t=Ze(i),n=e.vertexOffset!==void 0?e.vertexOffset:i.vertexOffset||0,r=e.elementOffset||0,s=n*t+r*i.bytesPerElement+(i.offset||0);return{...e,offset:s,stride:t}}function v1(i,e){const t=ka(i,e);return{high:t,low:{...t,offset:t.offset+i.size*4}}}class w1{constructor(e,t,n){this._buffer=null,this.device=e,this.id=t.id||"",this.size=t.size||1;const r=t.logicalType||t.type,s=r==="float64";let{defaultValue:o}=t;o=Number.isFinite(o)?[o]:o||new Array(this.size).fill(0);let a;s?a="float32":!r&&t.isIndexed?a="uint32":a=r||"float32";let c=_1(r||a);this.doublePrecision=s,s&&t.fp64===!1&&(c=Float32Array),this.value=null,this.settings={...t,defaultType:c,defaultValue:o,logicalType:r,type:a,normalized:a.includes("norm"),size:this.size,bytesPerElement:c.BYTES_PER_ELEMENT},this.state={...n,externalBuffer:null,bufferAccessor:this.settings,allocatedValue:null,numInstances:0,bounds:null,constant:!1}}get isConstant(){return this.state.constant}get buffer(){return this._buffer}get byteOffset(){const e=this.getAccessor();return e.vertexOffset?e.vertexOffset*Ze(e):0}get numInstances(){return this.state.numInstances}set numInstances(e){this.state.numInstances=e}get isDoublePrecisionBuffer(){return this._shouldSplitDoublePrecisionValue(this.value)}delete(){this._buffer&&(this._buffer.delete(),this._buffer=null),pi.release(this.state.allocatedValue),this.state.allocatedValue=null}getBuffer(){return this.state.constant&&this.device.type!=="webgpu"?null:this.state.externalBuffer||this._buffer}getValue(e=this.id,t=null){const n={};if(this.state.constant){const r=this.value;if(this.device.type==="webgpu"&&this._buffer)n[e]=this._buffer;else if(t){const s=ka(this.getAccessor(),t),o=s.offset/r.BYTES_PER_ELEMENT,a=s.size||this.size;n[e]=r.subarray(o,o+a)}else n[e]=r}else n[e]=this.getBuffer();return this.doublePrecision&&(this.isDoublePrecisionBuffer?n[`${e}64Low`]=n[e]:n[`${e}64Low`]=new Float32Array(this.size)),n}_getBufferLayout(e=this.id,t=null){const n=this.getAccessor(),r=[],s={name:this.id,byteStride:this.device.type==="webgpu"&&this.state.constant?0:Ze(n)};if(this.doublePrecision){const o=v1(n,t||{});r.push(Yn(e,{...n,...o.high},this.device.type),Yn(`${e}64Low`,{...n,...o.low},this.device.type))}else if(t){const o=ka(n,t);r.push(Yn(e,{...n,...o},this.device.type))}else r.push(Yn(e,n,this.device.type));return s.attributes=r.filter(Boolean),s}setAccessor(e){this.state.bufferAccessor=e}getAccessor(){return this.state.bufferAccessor}getBounds(){if(this.state.bounds)return this.state.bounds;let e=null;if(this.state.constant&&this.value){const t=Array.from(this.value);e=[t,t]}else{const{value:t,numInstances:n,size:r}=this,s=n*r;if(t&&s&&t.length>=s){const o=new Array(r).fill(1/0),a=new Array(r).fill(-1/0);for(let c=0;c<s;)for(let l=0;l<r;l++){const u=t[c++];u<o[l]&&(o[l]=u),u>a[l]&&(a[l]=u)}e=[o,a]}}return this.state.bounds=e,e}setData(e){const{state:t}=this;let n;ArrayBuffer.isView(e)?n={value:e}:e instanceof j?n={buffer:e}:n=e;const r={...this.settings,...n};if(ArrayBuffer.isView(n.value)){if(!n.type)if(this.doublePrecision&&n.value instanceof Float64Array)r.type="float32";else{const o=b1(n.value);r.type=r.normalized?o.replace("int","norm"):o}r.bytesPerElement=n.value.BYTES_PER_ELEMENT,r.stride=Ze(r)}if(t.bounds=null,n.constant){let s=n.value;if(s=this._normalizeValue(s,[],0),this.settings.normalized&&(s=this.normalizeConstant(s)),!(!t.constant||!this._areValuesEqual(s,this.value)))return!1;t.externalBuffer=null,t.constant=!0,this.value=ArrayBuffer.isView(s)?s:new Float32Array(s)}else if(n.buffer){const s=n.buffer;t.externalBuffer=s,t.constant=!1,this.value=n.value||null}else if(n.value){this._checkExternalBuffer(n);const s=n.value;let o=s;t.externalBuffer=null,t.constant=!1,this.value=s,this._shouldSplitDoublePrecisionValue(o)&&(o=ar(o,r),s instanceof Float32Array&&(r.stride=r.size*2*Float32Array.BYTES_PER_ELEMENT));let{buffer:a}=this;const c=Ze(r),l=(r.vertexOffset||0)*c;if(this.settings.isIndexed){const f=this.settings.defaultType;o.constructor!==f&&(o=new f(o))}const u=o.byteLength+l+c*2;(!a||a.byteLength<u)&&(a=this._createBuffer(u)),a.write(o,l)}return this.setAccessor(r),!0}updateSubBuffer(e={}){this.state.bounds=null;const t=this.value,{startOffset:n=0,endOffset:r}=e,s=this._shouldSplitDoublePrecisionValue(t);this.buffer.write(s?ar(t,{size:this.size,startIndex:n,endIndex:r}):t.subarray(n,r),n*(s?8:t.BYTES_PER_ELEMENT)+this.byteOffset)}allocate(e,t=!1){const{state:n}=this,r=n.allocatedValue,s=pi.allocate(r,e+1,{size:this.size,type:this.settings.defaultType,copy:t});this.value=s;const o=this._shouldSplitDoublePrecisionValue(s),a=o&&s instanceof Float32Array?{...this.settings,stride:this.size*2*Float32Array.BYTES_PER_ELEMENT}:this.settings;this.setAccessor(a);const{byteOffset:c}=this;let{buffer:l}=this;const u=s.byteLength*(o&&s instanceof Float32Array?2:1);return(!l||l.byteLength<u+c)&&(l=this._createBuffer(u+c),t&&r&&l.write(this._shouldSplitDoublePrecisionValue(r)?ar(r,this):r,c)),n.allocatedValue=s,n.constant=!1,n.externalBuffer=null,!0}_shouldSplitDoublePrecisionValue(e){return!!(this.doublePrecision&&(e instanceof Float64Array||this.device.type==="webgpu"&&e instanceof Float32Array))}_checkExternalBuffer(e){const{value:t}=e;if(!ArrayBuffer.isView(t))throw new Error(`Attribute ${this.id} value is not TypedArray`);const n=this.settings.defaultType;let r=!1;if(this.doublePrecision&&(r=t.BYTES_PER_ELEMENT<4),r)throw new Error(`Attribute ${this.id} does not support ${t.constructor.name}`);!(t instanceof n)&&this.settings.normalized&&!("normalized"in e)&&q.warn(`Attribute ${this.id} is normalized`)()}normalizeConstant(e){switch(this.settings.type){case"snorm8":return new Float32Array(e).map(t=>(t+128)/255*2-1);case"snorm16":return new Float32Array(e).map(t=>(t+32768)/65535*2-1);case"unorm8":return new Float32Array(e).map(t=>t/255);case"unorm16":return new Float32Array(e).map(t=>t/65535);default:return e}}_normalizeValue(e,t,n){const{defaultValue:r,size:s}=this.settings;if(Number.isFinite(e))return t[n]=e,t;if(!e){let o=s;for(;--o>=0;)t[n+o]=r[o];return t}switch(s){case 4:t[n+3]=Number.isFinite(e[3])?e[3]:r[3];case 3:t[n+2]=Number.isFinite(e[2])?e[2]:r[2];case 2:t[n+1]=Number.isFinite(e[1])?e[1]:r[1];case 1:t[n+0]=Number.isFinite(e[0])?e[0]:r[0];break;default:let o=s;for(;--o>=0;)t[n+o]=Number.isFinite(e[o])?e[o]:r[o]}return t}_areValuesEqual(e,t){if(!e||!t)return!1;const{size:n}=this;for(let r=0;r<n;r++)if(e[r]!==t[r])return!1;return!0}_createBuffer(e){var s;this._buffer&&this._buffer.destroy();const{isIndexed:t,type:n}=this.settings,r=this.device.type==="webgpu"&&!t?j.VERTEX|j.STORAGE|j.COPY_DST|j.COPY_SRC:(t?j.INDEX:j.VERTEX)|j.COPY_DST;return this._buffer=this.device.createBuffer({...(s=this._buffer)==null?void 0:s.props,id:this.id,usage:r,indexType:t?n:void 0,byteLength:e}),this._buffer}}const yf=[],vf=[];function Ls(i,e=0,t=1/0){let n=yf;const r={index:-1,data:i,target:[]};return i?typeof i[Symbol.iterator]=="function"?n=i:i.length>0&&(vf.length=i.length,n=vf):n=yf,(e>0||Number.isFinite(t))&&(n=(Array.isArray(n)?n:Array.from(n)).slice(e,t),r.index=e-1),{iterable:n,objectInfo:r}}function Tg(i){return i&&i[Symbol.asyncIterator]}function Ag(i,e){const{size:t,stride:n,offset:r,startIndices:s,nested:o}=e,a=i.BYTES_PER_ELEMENT,c=n?n/a:t,l=r?r/a:0,u=Math.floor((i.length-l)/c);return(f,{index:h,target:g})=>{if(!s){const y=h*c+l;for(let w=0;w<t;w++)g[w]=i[y+w];return g}const p=s[h],m=s[h+1]||u;let _;if(o){_=new Array(m-p);for(let y=p;y<m;y++){const w=y*c+l;g=new Array(t);for(let b=0;b<t;b++)g[b]=i[w+b];_[y-p]=g}}else if(c===t)_=i.subarray(p*t+l,m*t+l);else{_=new i.constructor((m-p)*t);let y=0;for(let w=p;w<m;w++){const b=w*c+l;for(let x=0;x<t;x++)_[y++]=i[b+x]}}return _}}const x1=[],ur=[[0,1/0]];function P1(i,e){if(i===ur||(e[0]<0&&(e[0]=0),e[0]>=e[1]))return i;const t=[],n=i.length;let r=0;for(let s=0;s<n;s++){const o=i[s];o[1]<e[0]?(t.push(o),r=s+1):o[0]>e[1]?t.push(o):e=[Math.min(o[0],e[0]),Math.max(o[1],e[1])]}return t.splice(r,0,e),t}const E1={interpolation:{duration:0,easing:i=>i},spring:{stiffness:.05,damping:.5}};function Cg(i,e){if(!i)return null;Number.isFinite(i)&&(i={type:"interpolation",duration:i});const t=i.type||"interpolation";return{...E1[t],...e,...i,type:t}}class Mg extends w1{constructor(e,t){super(e,t,{startIndices:null,constantValue:null,lastExternalBuffer:null,binaryValue:null,binaryAccessor:null,needsUpdate:!0,needsRedraw:!1,layoutChanged:!1,updateRanges:ur}),this.constant=!1,this.settings.update=t.update||(t.accessor?this._autoUpdater:void 0),Object.seal(this.settings),Object.seal(this.state),this._validateAttributeUpdaters()}get startIndices(){return this.state.startIndices}set startIndices(e){this.state.startIndices=e}needsUpdate(){return this.state.needsUpdate}needsRedraw({clearChangedFlags:e=!1}={}){const t=this.state.needsRedraw;return this.state.needsRedraw=t&&!e,t}layoutChanged(){return this.state.layoutChanged}setAccessor(e){var t;(t=this.state).layoutChanged||(t.layoutChanged=!y1(e,this.getAccessor())),super.setAccessor(e)}getUpdateTriggers(){const{accessor:e}=this.settings;return[this.id].concat(typeof e!="function"&&e||[])}supportsTransition(){return!!this.settings.transition}getTransitionSetting(e){if(!e||!this.supportsTransition())return null;const{accessor:t}=this.settings,n=this.settings.transition,r=Array.isArray(t)?e[t.find(s=>e[s])]:e[t];return Cg(r,n)}setNeedsUpdate(e=this.id,t){if(this.state.needsUpdate=this.state.needsUpdate||e,this.setNeedsRedraw(e),t){const{startRow:n=0,endRow:r=1/0}=t;this.state.updateRanges=P1(this.state.updateRanges,[n,r])}else this.state.updateRanges=ur}clearNeedsUpdate(){this.state.needsUpdate=!1,this.state.updateRanges=x1}setNeedsRedraw(e=this.id){this.state.needsRedraw=this.state.needsRedraw||e}allocate(e){const{state:t,settings:n}=this;if(n.noAlloc)return!1;if(n.update){const r=this.isConstant;return super.allocate(e,t.updateRanges!==ur),t.layoutChanged||(t.layoutChanged=r&&this.device.type==="webgpu"),!0}return!1}updateBuffer({numInstances:e,data:t,props:n,context:r}){if(!this.needsUpdate())return!1;const{state:{updateRanges:s},settings:{update:o,noAlloc:a}}=this;let c=!0;if(o){for(const[l,u]of s)o.call(r,this,{data:t,startRow:l,endRow:u,props:n,numInstances:e});if(this.value)if(this.constant||!this.buffer||this.buffer.byteLength<this.value.byteLength+this.byteOffset){if(this.constant){const l=this.value;this.value=null,this.setConstantValue(r,l)}else this.setData({value:this.value,constant:this.constant});this.constant=!1}else for(const[l,u]of s){const f=Number.isFinite(l)?this.getVertexOffset(l):0,h=Number.isFinite(u)?this.getVertexOffset(u):a||!Number.isFinite(e)?this.value.length:e*this.size;super.updateSubBuffer({startOffset:f,endOffset:h})}this._checkAttributeArray()}else c=!1;return this.clearNeedsUpdate(),this.setNeedsRedraw(),c}setConstantValue(e,t){var n;if(t===void 0||typeof t=="function")return!1;const r=this.isConstant,s=this.settings.transform&&e?this.settings.transform.call(e,t):t,o=this.settings.defaultType;this.state.constantValue=this._normalizeValue(s,new o(this.size),0);const a=this.setData({constant:!0,value:s});if(this.device.type==="webgpu"){let c=this.state.constantValue;this.doublePrecision&&(c instanceof Float32Array||c instanceof Float64Array)&&(c=ar(c,{size:this.size}),this.setAccessor({...this.getAccessor(),stride:this.size*2*Float32Array.BYTES_PER_ELEMENT}));let l=this._buffer;(!l||l.byteLength<c.byteLength)&&(l=this._createBuffer(c.byteLength)),l.write(c),(n=this.state).layoutChanged||(n.layoutChanged=!r),this.constant=!1}return a&&this.setNeedsRedraw(),this.clearNeedsUpdate(),!0}getConstantValue(){return this.isConstant?this.state.constantValue:null}setExternalBuffer(e){const{state:t}=this;return e?(this.clearNeedsUpdate(),t.lastExternalBuffer===e||(t.lastExternalBuffer=e,this.setNeedsRedraw(),this.setData(e)),!0):(t.lastExternalBuffer=null,!1)}setBinaryValue(e,t=null){const{state:n,settings:r}=this;if(!e)return n.binaryValue=null,n.binaryAccessor=null,!1;if(r.noAlloc)return!1;if(n.binaryValue===e)return this.clearNeedsUpdate(),!0;if(n.binaryValue=e,this.setNeedsRedraw(),r.transform||t!==this.startIndices){ArrayBuffer.isView(e)&&(e={value:e});const o=e;Q(ArrayBuffer.isView(o.value),`invalid ${r.accessor}`);const a=!!o.size&&o.size!==this.size;return n.binaryAccessor=Ag(o.value,{size:o.size||this.size,stride:o.stride,offset:o.offset,startIndices:t,nested:a}),!1}return this.clearNeedsUpdate(),this.setData(e),!0}getVertexOffset(e){const{startIndices:t}=this;return(t?e<t.length?t[e]:this.numInstances:e)*this.size}getValue(){const e=this.settings.shaderAttributes,t=super.getValue();if(!e)return t;for(const n in e)Object.assign(t,super.getValue(n,e[n]));return t}getBufferLayout(e){this.state.layoutChanged=!1;const t=this.settings.shaderAttributes,n=super._getBufferLayout(),{stepMode:r}=this.settings;if(r==="dynamic"?n.stepMode=e?e.isInstanced?"instance":"vertex":"instance":n.stepMode=r??"vertex",!t)return n;for(const s in t){const o=super._getBufferLayout(s,t[s]);n.attributes.push(...o.attributes)}return n}_autoUpdater(e,{data:t,startRow:n,endRow:r,props:s,numInstances:o}){const{settings:a,state:c,value:l,size:u,startIndices:f}=e,{accessor:h,transform:g}=a,p=c.binaryAccessor||(typeof h=="function"?h:s[h]);Q(typeof p=="function",`accessor "${h}" is not a function`);let m=e.getVertexOffset(n);const{iterable:_,objectInfo:y}=Ls(t,n,r);for(const w of _){y.index++;let b=p(w,y);if(g&&(b=g.call(this,b)),f){const x=(y.index<f.length-1?f[y.index+1]:o)-f[y.index];if(b&&Array.isArray(b[0])){let S=m;for(const L of b)e._normalizeValue(L,l,S),S+=u}else b&&b.length>u?l.set(b,m):(e._normalizeValue(b,y.target,0),M2({target:l,source:y.target,start:m,count:x}));m+=x*u}else e._normalizeValue(b,l,m),m+=u}}_validateAttributeUpdaters(){const{settings:e}=this;if(!(e.noAlloc||typeof e.update=="function"))throw new Error(`Attribute ${this.id} missing update or accessor`)}_checkAttributeArray(){const{value:e}=this,t=Math.min(4,this.size);if(e&&e.length>=t){let n=!0;switch(t){case 4:n=n&&Number.isFinite(e[3]);case 3:n=n&&Number.isFinite(e[2]);case 2:n=n&&Number.isFinite(e[1]);case 1:n=n&&Number.isFinite(e[0]);break;default:n=!1}if(!n)throw new Error(`Illegal attribute generated for ${this.id}`)}}}const Ig=/^vertex-list<([^<>]+)>$/,Rg=/^value-list<([^<>]+)>$/;function Og(i){return Ig.test(i)}function Bg(i){return Rg.test(i)}function S1(i){const e=Ig.exec(i),t=Rg.exec(i),n=(e==null?void 0:e[1])??(t==null?void 0:t[1])??i;try{be.getVertexFormatInfo(n)}catch{throw new Error(`Unsupported GPUVector format ${i}`)}return n}function Ln(i){const e=S1(i),t=Og(i),n=Bg(i),r=be.getVertexFormatInfo(e),s=r.type,o=r.normalized,a=L1(s,o);return{format:i,elementFormat:e,vertexList:t,valueList:n,type:s,signedDataType:T1(e,s),primitiveType:a,components:r.components,byteLength:r.byteLength,integer:r.integer,signed:r.signed,normalized:o,...r.webglOnly?{webglOnly:!0}:{}}}function L1(i,e){if(e)return"f32";switch(i){case"float32":return"f32";case"float16":return"f16";case"uint8":case"uint16":case"uint32":return"u32";case"sint8":case"sint16":case"sint32":return"i32";default:throw new Error(`Unsupported GPUVector component type ${i}`)}}function T1(i,e){if(i==="unorm10-10-10-2")return"uint32";switch(e){case"unorm8":return"uint8";case"snorm8":return"sint8";case"unorm16":return"uint16";case"snorm16":return"sint16";default:return e}}class Wr{constructor(e){d(this,"buffer");d(this,"format");d(this,"length");d(this,"byteOffset");d(this,"byteStride");const t=be.getVertexFormatInfo(e.format).byteLength,n=e.byteOffset??0,r=e.byteStride??t;if(wo(e.length,"GPUDataView length"),wo(n,"GPUDataView byteOffset"),wo(r,"GPUDataView byteStride"),r<t)throw new Error(`GPUDataView byteStride ${r} is smaller than ${e.format} byte length ${t}`);const s=e.length===0?0:(e.length-1)*r+t,o=n+s;if(!Number.isSafeInteger(s)||!Number.isSafeInteger(o))throw new Error("GPUDataView byte range must use safe integers");if(o>e.buffer.byteLength)throw new Error("GPUDataView exceeds its backing buffer byte length");this.buffer=e.buffer,this.format=e.format,this.length=e.length,this.byteOffset=n,this.byteStride=r}get elementByteLength(){return be.getVertexFormatInfo(this.format).byteLength}get byteLength(){return this.length===0?0:(this.length-1)*this.byteStride+this.elementByteLength}}function wo(i,e){if(!Number.isSafeInteger(i)||i<0)throw new Error(`${e} must be a non-negative safe integer`)}function xo(i){return!!(i&&typeof i=="object"&&i.type==="struct")}function A1(i,e){const t=Object.entries(i);if(t.length===0)throw new Error("GPUData struct format must declare at least one field");return e==="packed"?C1(t):M1(t)}function C1(i){const e=[];let t=0,n=0;for(const[r,s]of i){const o=be.getVertexFormatInfo(s);if(o.webglOnly)throw new Error(`Packed GPUData struct field "${r}" uses WebGL-only format ${s}`);t=wf(t,Math.min(4,o.byteLength)),e.push([r,Object.freeze({format:s,byteOffset:t,byteLength:o.byteLength})]),t+=o.byteLength,n+=o.components}return Object.freeze({type:"struct",layout:"packed",fields:Object.freeze(Object.fromEntries(e)),components:n,byteStride:wf(t,4),rowByteLength:t})}function M1(i){const e=Object.fromEntries(i.map(([o,a])=>[o,I1(a)])),t=dc(e,{layout:"wgsl-storage"}),n=[];let r=0,s=0;for(const[o,a]of i){const c=be.getVertexFormatInfo(a),l=t.fields[o].offset*4;n.push([o,Object.freeze({format:a,byteOffset:l,byteLength:c.byteLength})]),r=Math.max(r,l+c.byteLength),s+=c.components}return Object.freeze({type:"struct",layout:"wgsl-storage",fields:Object.freeze(Object.fromEntries(n)),components:s,byteStride:t.byteLength,rowByteLength:r})}function I1(i){const e=be.getVertexFormatInfo(i);switch(e.type){case"float32":return qn("f32",e.components);case"sint32":return qn("i32",e.components);case"uint32":return qn("u32",e.components);default:{const t=Math.ceil(e.byteLength/4);return qn("u32",t)}}}function qn(i,e){return e===1?i:`vec${e}<${i}>`}function wf(i,e){return Math.ceil(i/e)*e}class R1{constructor(e,t){d(this,"buffer");d(this,"ownsDataBuffer");this.buffer=e,this.ownsDataBuffer=t}get ownsBuffer(){return this.ownsDataBuffer}transferBufferOwnership(e){if(e.buffer!==this.buffer)throw new Error("GPUData ownership can only be transferred to the same buffer");e.ownsDataBuffer=this.ownsDataBuffer,this.ownsDataBuffer=!1}destroy(){this.ownsDataBuffer&&(this.buffer.destroy(),this.ownsDataBuffer=!1)}}class O1 extends R1{constructor(t){const{buffer:n,format:r,length:s,valueLength:o,stride:a,byteOffset:c=0,byteStride:l,rowByteLength:u,ownsBuffer:f=!1,readbackMetadata:h,valueOffsets:g,nullBitmap:p,valueByteLength:m,dataType:_}=t;super(n,f);d(this,"dataType");d(this,"format");d(this,"length");d(this,"valueLength");d(this,"stride");d(this,"byteOffset");d(this,"byteStride");d(this,"rowByteLength");d(this,"readbackMetadata");d(this,"valueOffsets");d(this,"nullBitmap");d(this,"valueByteLength");let y;r?typeof r=="string"?y=r:y=A1(r,t.layout??"wgsl-storage"):y=void 0;const w=xo(y)?y:void 0,b=typeof y=="string"?Ln(y):void 0;if(this.dataType=_,this.format=y,this.length=s,this.valueLength=o??s,this.stride=a??(b==null?void 0:b.components)??(w==null?void 0:w.components)??l??u??1,this.byteOffset=c,this.rowByteLength=u??(w==null?void 0:w.rowByteLength)??(b==null?void 0:b.byteLength)??l??this.stride,this.byteStride=l??(w==null?void 0:w.byteStride)??this.rowByteLength,w){if(this.rowByteLength<w.rowByteLength)throw new Error(`GPUData rowByteLength ${this.rowByteLength} is smaller than struct format row byte length ${w.rowByteLength}`);if(this.byteStride<Math.max(w.byteStride,this.rowByteLength))throw new Error(`GPUData byteStride ${this.byteStride} is smaller than its struct row layout`)}this.readbackMetadata=h,this.valueOffsets=g,this.nullBitmap=p,this.valueByteLength=m}getChild(t){if(!xo(this.format))return null;const n=this.format.fields[t];return n?new Wr({buffer:this.buffer,format:n.format,length:this.length,byteOffset:this.byteOffset+n.byteOffset,byteStride:this.byteStride}):null}getChildAt(t){if(!xo(this.format))return null;const n=Object.values(this.format.fields)[t];return n?new Wr({buffer:this.buffer,format:n.format,length:this.length,byteOffset:this.byteOffset+n.byteOffset,byteStride:this.byteStride}):null}}const Da=O1;class Ji{constructor(e){d(this,"name");d(this,"dataType");d(this,"format");d(this,"length");d(this,"valueLength");d(this,"stride");d(this,"byteOffset");d(this,"byteStride");d(this,"rowByteLength");d(this,"bufferLayout");d(this,"data",[]);d(this,"device");d(this,"bufferProps");d(this,"isAppendable",!1);d(this,"ownsDataChunks",!0);d(this,"ownedVectors",[]);d(this,"appendableByteLength",0);var t,n,r;switch(e.type){case"buffer":{const{name:s,buffer:o,format:a,length:c,valueLength:l=c,byteOffset:u=0,ownsBuffer:f=!1}=e,{stride:h,byteStride:g,rowByteLength:p}=xf(e);this.name=s,this.dataType=e.dataType,this.format=a,this.length=c,this.valueLength=l,this.stride=h,this.byteOffset=u,this.byteStride=g,this.rowByteLength=p,this.data.push(new Da({buffer:o,format:a,length:c,valueLength:l,stride:h,byteOffset:u,byteStride:g,rowByteLength:p,ownsBuffer:f,dataType:e.dataType}));return}case"interleaved":{const{name:s,buffer:o,format:a,length:c,valueLength:l=c,byteOffset:u=0,byteStride:f,attributes:h,ownsBuffer:g=!1}=e;this.name=s,this.dataType=e.dataType,this.format=a,this.length=c,this.valueLength=l,this.stride=f,this.byteOffset=u,this.byteStride=f,this.rowByteLength=f,this.bufferLayout={name:s,byteStride:f,attributes:h},this.data.push(new Da({buffer:o,format:a,length:c,valueLength:l,stride:f,byteOffset:u,byteStride:f,rowByteLength:f,ownsBuffer:g,dataType:e.dataType}));return}case"data":{const s=e.format??B1(e.data),o=s?Ln(s):void 0,{name:a,data:c,stride:l=((t=c[0])==null?void 0:t.stride)??(o==null?void 0:o.components)??1,valueLength:u=c.reduce((m,_)=>m+_.valueLength,0),byteStride:f=((n=c[0])==null?void 0:n.byteStride)??(o==null?void 0:o.byteLength),rowByteLength:h=((r=c[0])==null?void 0:r.rowByteLength)??(o==null?void 0:o.byteLength),bufferLayout:g,ownsData:p=!1}=e;if(f===void 0||h===void 0)throw new Error("GPUVector requires format or explicit byte layout metadata");s&&k1(c,s),this.name=a,this.dataType=e.dataType,this.format=s,this.length=c.reduce((m,_)=>m+_.length,0),this.valueLength=u,this.stride=l,this.byteOffset=c.length===1?c[0].byteOffset:0,this.byteStride=f,this.rowByteLength=h,this.bufferLayout=g,this.ownsDataChunks=p,this.data.push(...c);return}case"appendable":{const{name:s,device:o,format:a,valueLength:c=0,bufferProps:l}=e,{stride:u,byteStride:f,rowByteLength:h}=xf(e);this.name=s,this.dataType=e.dataType,this.format=a,this.length=0,this.valueLength=c,this.stride=u,this.byteOffset=0,this.byteStride=f,this.rowByteLength=h,this.device=o,this.bufferProps=l,this.isAppendable=!0;return}}}get ownsBuffer(){return this.ownsDataChunks&&this.data.some(e=>e.ownsBuffer)||this.ownedVectors.some(e=>e.ownsBuffer)}get capacityRows(){return this.isAppendable?this.length:void 0}get appendedByteLength(){return this.appendableByteLength}addData(e){if(this.format&&e.format!==this.format)throw new Error("GPUVector.addData() requires matching formats");if(e.byteStride!==this.byteStride)throw new Error("GPUVector.addData() requires matching byteStride");if(e.rowByteLength!==this.rowByteLength)throw new Error("GPUVector.addData() requires matching rowByteLength");return this.data.push(e),this.length+=e.length,this.valueLength+=e.valueLength,this}appendDataChunk(e,t=this.appendableByteLength+e.buffer.byteLength){if(!this.isAppendable)throw new Error("GPUVector.appendDataChunk() requires appendable vector storage");if(this.format&&e.format!==this.format)throw new Error("GPUVector.appendDataChunk() requires matching formats");if(e.byteStride!==this.byteStride||e.rowByteLength!==this.rowByteLength)throw new Error("GPUVector.appendDataChunk() requires matching byte layout metadata");return this.data.push(e),this.length+=e.length,this.valueLength+=e.valueLength,this.appendableByteLength=t,this}resetLastBatch(){if(!this.isAppendable)throw new Error("GPUVector.resetLastBatch() requires appendable vector storage");for(const e of this.data.splice(0))e.destroy();return this.length=0,this.valueLength=0,this.appendableByteLength=0,this}retainOwnedVectors(e){return this.ownedVectors.push(...e),this}transferBufferOwnership(e){const t=this.data[0],n=e.data[0];if(!t||!n||t.buffer!==n.buffer)throw new Error("GPUVector ownership can only be transferred to the same buffer");t.transferBufferOwnership(n)}destroy(){if(this.ownsDataChunks)for(const e of this.data)e.destroy();for(const e of this.ownedVectors.splice(0))e.destroy()}}function xf(i){const e=i.format?Ln(i.format):void 0,t=i.rowByteLength??i.byteStride??(e==null?void 0:e.byteLength);if(t===void 0)throw new Error("GPUVector requires format or explicit rowByteLength");return{stride:i.stride??(e==null?void 0:e.components)??1,byteStride:i.byteStride??t,rowByteLength:t}}function B1(i){var e;return(e=i[0])==null?void 0:e.format}function k1(i,e){if(i.find(n=>n.format!==e))throw new Error("GPUVector data chunks must share the declared format")}class D1{constructor(){d(this,"poolSize",20);d(this,"bufferPools");this.bufferPools=new Map}createOrReuse(e,t){if(t>e.limits.maxBufferSize)throw new Error(`Buffer pool cannot allocate ${t} bytes: device.limits.maxBufferSize is ${e.limits.maxBufferSize}`);const n=this.bufferPools.get(e),r=n?n.findIndex(o=>o.byteLength>=t):-1;if(r<0)return e.createBuffer({usage:j.VERTEX|j.STORAGE|j.COPY_DST|j.COPY_SRC,byteLength:t});const[s]=n.splice(r,1);return s}recycle(e){const t=e.device;this.bufferPools.has(t)||this.bufferPools.set(t,[]);const n=this.bufferPools.get(t),r=n.findIndex(s=>s.byteLength>e.byteLength);r<0?n.push(e):n.splice(r,0,e),this.purge()}purge(){for(const[e,t]of this.bufferPools){const n=e.isLost?0:this.poolSize;for(;t.length>n;)t.shift().destroy();t.length===0&&this.bufferPools.delete(e)}}}const Di=new D1;class se{constructor(e){d(this,"type");d(this,"size");d(this,"normalized");d(this,"isConstant");d(this,"length");d(this,"ValueType");d(this,"source",null);d(this,"format");d(this,"_id");d(this,"_destroyed",!1);d(this,"_value");d(this,"_offset");d(this,"_stride");d(this,"_byteLength");d(this,"_gpuVector");d(this,"_bufferOwnership","owned");d(this,"_targetBuffer");const{id:t,value:n,buffer:r,gpuData:s,format:o,source:a=null,isConstant:c=!1}=e;if(!a&&!n&&!r&&!s)throw new Error("GPUDataEvaluator must have a value source");let{type:l,size:u,offset:f,stride:h,normalized:g,length:p}=e;if(a instanceof se?(l=l??a.type,u=u??a.size,f=f??a.offset,h=h??a.stride,g=g??a.normalized,p=p??a.length):(u=u??1,f=f??0,g=g??!1,p=c?1:p),!l)throw new Error("GPUDataEvaluator: type not defined");if(this._id=t,this.type=l,this.size=u,this.ValueType=Hi(this.type),this._offset=f,this._stride=h||this.ValueType.BYTES_PER_ELEMENT*u,this.normalized=g,this.source=a,this.format=o,p===void 0)if(c)p=1;else{if(!n)throw new Error("GPUDataEvaluator: length not defined");p=Math.ceil(n.byteLength/this.stride)}this.isConstant=c,this.length=p;const m=this.ValueType.BYTES_PER_ELEMENT*this.size;this._byteLength=p===0?0:(p-1)*this.stride+m,this._value=n,this._bufferOwnership=a instanceof se||r||s?"borrowed":"owned",s?this._gpuVector=new Ji({type:"data",name:this._id??"data",format:s.format,data:[s],stride:s.stride,byteStride:s.byteStride,rowByteLength:s.rowByteLength}):r&&(this._gpuVector=this.createGPUVectorView({buffer:r,name:this._id,format:this.format}))}static get bufferPoolSize(){return Di.poolSize}static set bufferPoolSize(e){if(!Number.isSafeInteger(e)||e<0)throw new Error("GPUDataEvaluator.bufferPoolSize must be a non-negative safe integer");Di.poolSize=e,Di.purge()}get offset(){return this._offset}get stride(){return this._stride}get byteLength(){return this._byteLength}static fromArray(e,{type:t,size:n=1,offset:r=0,stride:s=0,normalized:o=!1}){let a=t,c;if(Array.isArray(e)){a=a||"float32";const u=Hi(a);c=new u(e)}else e instanceof Float64Array?(a="uint32",n*=2,r*=2,s*=2,c=new Uint32Array(e.buffer,e.byteOffset,e.byteLength/4)):(a=a||Wh(e),c=e);const l=`<${a} * ${n}>`;return new se({id:l,type:a,size:n,offset:r,stride:s,normalized:o,value:c})}static fromConstant(e,t="float32"){const n=Hi(t);let r;return Array.isArray(e)?r=`[${e.join(",")}]`:(r=String(e),e=[e]),new se({id:r,isConstant:!0,type:t,size:e.length,value:new n(e)})}static fromGPUData(e,t={}){N1(e);const n=new Wr({buffer:e.buffer,format:e.format,length:e.length,byteOffset:e.byteOffset,byteStride:e.byteStride});return new se({...Ef(n),id:t.id,gpuData:e})}static fromGPUDataView(e,t={}){return new se({...Ef(e),id:t.id,buffer:e.buffer})}get value(){return this._value||(this.source instanceof se?this.source.value:void 0)}get evaluated(){return!!this._gpuVector}get id(){return this._id}get gpuVector(){if(!this._gpuVector)throw new Error(`${this} not evaluated`);return this._gpuVector}get buffer(){return Zn(this.gpuVector)}setTargetBuffer({buffer:e,byteOffset:t=0,byteStride:n=this.stride}){if(this._destroyed)throw new Error(`GPUDataEvaluator ${this} already destroyed`);if(this._gpuVector)throw new Error(`GPUDataEvaluator ${this} already evaluated`);if(!this.source||this.source instanceof se)throw new Error("GPUDataEvaluator target buffers require a deferred operation source");this._targetBuffer={buffer:e,byteOffset:t,byteStride:n}}async evaluate(e,t={}){if(this._destroyed)throw new Error(`GPUDataEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;let n;if(this.source instanceof se){const r=await this.source.evaluate(e);return this._gpuVector=this.createGPUVectorView({...t,buffer:Zn(r)}),this._gpuVector}if(n=this._getEvaluationBuffer(e),this._value)n.write(this._value);else{const r=await this.source.execute(e,n);if(!r.success)throw r.error||new Error(`${this.source} evaluation failed`);r.value&&(this._value=r.value)}return this._gpuVector=this.createGPUVectorView({...t,buffer:n}),this._gpuVector}evaluateSync(e,t={}){if(this._destroyed)throw new Error(`GPUDataEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;let n;if(this.source instanceof se){const r=this.source.evaluateSync(e);return this._gpuVector=this.createGPUVectorView({...t,buffer:Zn(r)}),this._gpuVector}if(n=this._getEvaluationBuffer(e),this._value)n.write(this._value);else{const r=this.source.executeSync(e,n);if(!r.success)throw r.error||new Error(`${this.source} evaluation failed`);r.value&&(this._value=r.value)}return this._gpuVector=this.createGPUVectorView({...t,buffer:n}),this._gpuVector}createGPUVectorView(e){const t=e.name??this._id??"vector",n=e.format??this.format??$1(this.type,this.size,this.normalized);if(e.interleaved){const r=typeof e.interleaved=="object"&&e.interleaved.attributes?e.interleaved.attributes:z1(this);return new Ji({type:"interleaved",name:t,buffer:e.buffer,format:e.format??this.format,length:this.length,byteOffset:this.offset,byteStride:this.stride,attributes:r,ownsBuffer:!1})}return new Ji({type:"buffer",name:t,buffer:e.buffer,format:n,length:this.length,stride:this.size,byteOffset:this.offset,byteStride:this.stride,rowByteLength:this.ValueType.BYTES_PER_ELEMENT*this.size,ownsBuffer:!1})}_getEvaluationBuffer(e){const t=this._targetBuffer;if(!t)return Di.createOrReuse(e,this.byteLength);if(t.buffer.device!==e)throw new Error("GPUDataEvaluator target buffer belongs to a different device");const n=this.ValueType.BYTES_PER_ELEMENT*this.size,r=this.length===0?0:(this.length-1)*t.byteStride+n;if(t.byteOffset+r>t.buffer.byteLength)throw new Error("GPUDataEvaluator target buffer is too small for the output layout");return this._offset=t.byteOffset,this._stride=t.byteStride,this._byteLength=r,this._bufferOwnership="borrowed",this._targetBuffer=void 0,t.buffer}async readValue(e=0,t){const{ValueType:n}=this,{size:r,offset:s,stride:o,length:a}=this,c=n.BYTES_PER_ELEMENT*r;if(t=t??a,e=Math.max(0,Math.min(a,e)),t=Math.max(e,Math.min(a,t)),this._value)return F1(this,this._value,e,t);const l=t-e;if(l===0)return new n(0);const u=s+e*o,f=o===c?l*c:(l-1)*o+c,h=await this.buffer.readAsync(u,f),g=new n(h.buffer,h.byteOffset,h.byteLength/n.BYTES_PER_ELEMENT);if(o===c)return g;const p=new Uint8Array(c*l);for(let m=0;m<l;m++){const _=m*o;p.set(h.subarray(_,_+c),m*c)}return new n(p.buffer)}async ensureCPUValue(){const e=this.value;if(e)return e;const t=await this.buffer.readAsync(0,this.offset+this.byteLength);if(t.byteLength%this.ValueType.BYTES_PER_ELEMENT!==0)throw new Error(`${this} backing buffer byte length is not aligned to its scalar type`);const n=t.slice();return this._value=new this.ValueType(n.buffer,n.byteOffset,n.byteLength/this.ValueType.BYTES_PER_ELEMENT),this._value}ensureCPUValueSync(){const e=this.value;if(e)return e;throw new Error(`${this} CPU value is not available for synchronous evaluation`)}toString(){var e;return this._id??((e=this.source)==null?void 0:e.toString())??this.constructor.name}destroy(){this._gpuVector&&(this._bufferOwnership==="owned"&&Di.recycle(Zn(this._gpuVector)),this._gpuVector=void 0),this._targetBuffer=void 0,this._destroyed=!0}}function F1(i,e,t,n){const{ValueType:r,size:s,offset:o,stride:a}=i,c=a/r.BYTES_PER_ELEMENT,l=o/r.BYTES_PER_ELEMENT,u=n-t;if(c===s){const h=l+t*c;return e.subarray(h,h+u*s)}const f=new r(u*s);for(let h=0;h<u;h++){const g=l+(t+h)*c;f.set(e.subarray(g,g+s),h*s)}return f}function Pf(i){if(i instanceof se)return i;if(typeof i=="number"||Array.isArray(i))return se.fromConstant(i);if(i instanceof Da)return se.fromGPUData(i);if(i instanceof Wr)return se.fromGPUDataView(i);throw new Error("getGPUDataEvaluator() requires GPUDataEvaluator, GPUData, GPUDataView, number, or number[]")}function N1(i){if(!i.format)throw new Error("GPUDataEvaluator.fromGPUData() requires GPUData format metadata");if(Og(i.format)||Bg(i.format))throw new Error("GPUDataEvaluator.fromGPUData() does not support variable-length input");const t=Ln(i.format).byteLength;if(i.rowByteLength!==t)throw new Error(`GPUDataEvaluator.fromGPUData() requires rowByteLength ${t} for GPUData`)}function Ef(i){const e=Ln(i.format),t=Hi(e.signedDataType),n=t.BYTES_PER_ELEMENT*e.components;if(e.byteLength!==n)throw new Error(`GPUDataEvaluator does not support packed vertex format ${i.format}: ${e.byteLength} physical bytes cannot expose ${e.components} ${e.signedDataType} components`);if(i.byteOffset%t.BYTES_PER_ELEMENT!==0||i.byteStride%t.BYTES_PER_ELEMENT!==0)throw new Error(`GPUDataEvaluator requires ${i.format} offset and stride aligned to ${t.BYTES_PER_ELEMENT} bytes`);return{type:e.signedDataType,size:e.components,offset:i.byteOffset,stride:i.byteStride,normalized:e.normalized,length:i.length,format:i.format}}function Zn(i){const e=U1(i).buffer;return e instanceof He?e.buffer:e}function U1(i){const[e,...t]=i.data;if(!e||t.length>0)throw new Error(`GPUDataEvaluator requires exactly one GPUData chunk for "${i.name}"`);return e}function z1(i){const e=[];return kg(i,e,{byteOffset:0}),e}function kg(i,e,t){const n=i.source;if(n&&!(n instanceof se)&&n.name==="interleave"){for(const r of Object.values(n.inputs))r instanceof se&&kg(r,e,t);return}e.push({attribute:i.id??i.toString(),format:Dg(i.type,i.size,i.normalized),byteOffset:t.byteOffset}),t.byteOffset+=i.ValueType.BYTES_PER_ELEMENT*i.size}function Dg(i,e,t=!1){if(e<1||e>4)throw new Error(`Cannot synthesize a GPUVector vertex format with ${e} components`);let n=i;if(t)switch(i){case"uint8":n="unorm8";break;case"sint8":n="snorm8";break;case"uint16":n="unorm16";break;case"sint16":n="snorm16";break;case"float32":n="float32";break;default:throw new Error(`Unsupported normalized vertex format for ${i}`)}return(n==="uint8"||n==="sint8"||n==="uint16"||n==="sint16"||n==="unorm8"||n==="snorm8"||n==="unorm16"||n==="snorm16")&&e===3?`${n}x3-webgl`:`${n}${e===1?"":`x${e}`}`}function $1(i,e,t=!1){return e>=1&&e<=4?Dg(i,e,t):void 0}class ci{constructor({id:e,gpuDataEvaluators:t,gpuVector:n,format:r}){d(this,"gpuDataEvaluators");d(this,"format");d(this,"length");d(this,"id");d(this,"_gpuVector");d(this,"_ownsGPUDataEvaluators");d(this,"_destroyed",!1);if(t.length===0)throw new Error("GPUVectorEvaluator requires at least one GPUData evaluator");G1(t),this.id=e,this.gpuDataEvaluators=t,this.format=r??t[0].format,this.length=t.reduce((s,o)=>s+o.length,0),this._gpuVector=n,this._ownsGPUDataEvaluators=!n}static fromGPUVector(e){if(e.bufferLayout)throw new Error(`GPUVectorEvaluator.fromGPUVector() does not accept interleaved vector "${e.name}"`);if(e.data.length===0)throw new Error(`GPUVectorEvaluator.fromGPUVector() requires GPUData for "${e.name}"`);return new ci({id:e.name,gpuDataEvaluators:e.data.map(t=>se.fromGPUData(t,{id:e.name})),gpuVector:e,format:e.format})}static fromGPUDataEvaluators(e,t={}){return new ci({id:t.id,gpuDataEvaluators:e,format:t.format})}get evaluated(){return!!this._gpuVector}get gpuVector(){if(!this._gpuVector)throw new Error(`${this} not evaluated`);return this._gpuVector}mapGPUData(e){return ci.fromGPUDataEvaluators(this.gpuDataEvaluators.map((t,n)=>e(t,n)),{id:this.id})}async evaluate(e,t={}){if(this._destroyed)throw new Error(`GPUVectorEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;const n=await Promise.all(this.gpuDataEvaluators.map(a=>a.evaluate(e,t))),r=n[0],s=n.map(Sf),o=t.format??this.format??r.format;return this._gpuVector=new Ji({type:"data",name:t.name??this.id??"vector",format:o,data:s,stride:r.stride,byteStride:r.byteStride,rowByteLength:r.rowByteLength,bufferLayout:r.bufferLayout}),this._gpuVector}evaluateSync(e,t={}){if(this._destroyed)throw new Error(`GPUVectorEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;const n=this.gpuDataEvaluators.map(a=>a.evaluateSync(e,t)),r=n[0],s=n.map(Sf),o=t.format??this.format??r.format;return this._gpuVector=new Ji({type:"data",name:t.name??this.id??"vector",format:o,data:s,stride:r.stride,byteStride:r.byteStride,rowByteLength:r.rowByteLength,bufferLayout:r.bufferLayout}),this._gpuVector}destroy(){if(this._ownsGPUDataEvaluators)for(const e of this.gpuDataEvaluators)e.destroy();this._gpuVector=void 0,this._destroyed=!0}toString(){return this.id??this.constructor.name}}function G1(i){const e=i[0];for(const t of i.slice(1))if(t.type!==e.type||t.size!==e.size||t.normalized!==e.normalized||t.format!==e.format)throw new Error("GPUVectorEvaluator requires matching GPUData evaluator layouts")}function Sf(i){const[e,...t]=i.data;if(!e||t.length>0)throw new Error(`GPUVectorEvaluator requires one GPUData chunk for "${i.name}"`);return e}const V1={add:{arity:2,symbol:"arithmetic_add"},subtract:{arity:2,symbol:"arithmetic_subtract"},multiply:{arity:2,symbol:"arithmetic_multiply"},divide:{arity:2,symbol:"arithmetic_divide"},pow:{arity:2,symbol:"pow"},sqrt:{arity:1,symbol:"sqrt"},abs:{arity:1,symbol:"abs"},sin:{arity:1,symbol:"sin"},cos:{arity:1,symbol:"cos"},tan:{arity:1,symbol:"arithmetic_tan"},exp:{arity:1,symbol:"exp"},log:{arity:1,symbol:"log"}};function qc({elementWise:i,func:e,inputs:t,output:n,outputBuffer:r}){const s=Array.isArray(t)?t:Object.values(t);for(const p of s)if(!p.value)throw new Error(`${p} does not have CPU value`);const o=n.length,a=n.size,c=new n.ValueType(o*a);for(let p=0;p<o;p++){const m=s.map(_=>Pe(_,p));if(i)for(let _=0;_<a;_++)c[p*a+_]=e.apply(null,m.map(y=>y[_]));else e.call(null,c.subarray(p*a,p*a+a),...m)}const l=n.ValueType.BYTES_PER_ELEMENT,u=n.offset/l,f=n.stride/l,h=a;let g=c;if(u!==0||f!==h){g=new n.ValueType(u+n.byteLength/l);for(let p=0;p<o;p++){const m=p*h,_=u+p*f,y=c.subarray(m,m+a);g.set(y,_),r.write(y,_*l)}}else r.write(c);return{success:!0,value:g}}function Pe(i,e){const t=i.value,n=i.size,r=i.offset/i.ValueType.BYTES_PER_ELEMENT,s=i.stride/i.ValueType.BYTES_PER_ELEMENT,o=i.isConstant?0:e,a=r+o*s,c=t.slice(a,a+n);if(!i.normalized)return c;const l=new Float32Array(n);for(let u=0;u<n;u++)l[u]=j1(c[u],i.type);return l}function j1(i,e){switch(e){case"uint8":return i/255;case"uint16":return i/65535;case"uint32":return i/4294967295;case"sint8":return Math.max(i/127,-1);case"sint16":return Math.max(i/32767,-1);case"sint32":return Math.max(i/2147483647,-1);case"float32":return i;default:throw new Error(`Unsupported normalized source type ${e}`)}}const W1=({inputs:i,output:e,target:t})=>{for(const r of Object.values(i.namedInputs))if(!r.value)throw new Error(`${r} does not have CPU value`);const n=new e.ValueType(e.length*e.size);for(let r=0;r<e.length;r++){const s=Object.fromEntries(Object.entries(i.namedInputs).map(([o,a])=>[o,Pe(a,r)]));for(let o=0;o<e.size;o++)n[r*e.size+o]=Fg(i.expression,s,o)}return t.write(n),{success:!0,value:n}};function Fg(i,e,t){switch(i.kind){case"input":{const n=e[i.name];return t<n.length?n[t]:n.length===1?n[0]:0}case"literal":return Array.isArray(i.value)?i.value[t]??0:i.value;case"call":{H1(i.op,i.args.length);const n=i.args.map(r=>Fg(r,e,t));switch(i.op){case"add":return n[0]+n[1];case"subtract":return n[0]-n[1];case"multiply":return n[0]*n[1];case"divide":return n[0]/n[1];case"pow":return Math.pow(n[0],n[1]);case"sqrt":return Math.sqrt(n[0]);case"abs":return Math.abs(n[0]);case"sin":return Math.sin(n[0]);case"cos":return Math.cos(n[0]);case"tan":return Math.tan(n[0]);case"exp":return Math.exp(n[0]);case"log":return Math.log(n[0]);default:{const r=i.op;throw new Error(`Unsupported arithmetic op ${r}`)}}}default:{const n=i;throw new Error(`Unsupported expression node ${n.kind}`)}}}function H1(i,e){const t=V1[i].arity;if(e!==t)throw new Error(`Arithmetic op '${i}' expects ${t} args, got ${e}`)}const Y1=({inputs:i,output:e,target:t})=>{const{sourceValues:n}=i;if(!n.value)throw new Error(`${n} does not have CPU value`);const s=new e.ValueType(e.length*e.size);if(n.length===0)return{success:!1,error:new Error(`${n} is empty`)};for(let o=0;o<n.size;o++){const a=Pe(n,0)[o],c=o*e.size,l=c+1;s[c]=a,s[l]=a;for(let u=1;u<n.length;u++){const f=Pe(n,u)[o];f<s[c]&&(s[c]=f),f>s[l]&&(s[l]=f)}}return t.write(s),{success:!0,value:s}},q1=({inputs:i,output:e,target:t})=>qc({func:(n,r)=>{const s=n.length/2,o=new Float64Array(r.buffer);for(let a=0;a<s;a++){const c=o[a];n[a]=Math.fround(c),n[a+s]=c-n[a]}return n},inputs:i,output:e,outputBuffer:t}),Z1=async({inputs:i,output:e,target:t})=>{const{ids:n,sourceValues:r}=i,s=n.value,o=r.value;if(!s)throw new Error(`${n} does not have CPU value`);if(!o)throw new Error(`${r} does not have CPU value`);const a=new e.ValueType(e.length*e.size),c=new Array(e.size).fill(0);for(let l=0;l<e.length;l++){const u=Pe(n,l),f=Number(u[0]),h=X1(f,r.length)?Pe(r,f):c;a.set(h,l*e.size)}return t.write(a),{success:!0,value:a}};function X1(i,e){return Number.isInteger(i)&&i>=0&&i<e}const K1=({inputs:i,output:e,target:t})=>qc({func:(n,...r)=>{let s=0;for(const o of r)n.set(o,s),s+=o.length},inputs:i,output:e,outputBuffer:t}),Q1=({inputs:i,output:e,target:t})=>{const{x:n,y:r}=i,s=new e.ValueType(e.length);for(let o=0;o<e.length;o++){const a=Pe(n,o),c=Pe(r,o);let l=0;for(let u=0;u<n.size;u++)l+=a[u]*c[u];s[o]=l}return t.write(s),{success:!0,value:s}},J1=({inputs:i,output:e,target:t})=>{const{x:n,y:r}=i,s=new e.ValueType(e.length);for(let o=0;o<e.length;o++){const a=Pe(n,o),c=Pe(r,o);let l=1;for(let u=0;u<n.size;u++)if(a[u]!==c[u]){l=0;break}s[o]=l}return t.write(s),{success:!0,value:s}},eT=({inputs:i,output:e,target:t})=>{const{x:n}=i,r=new e.ValueType(e.length);for(let s=0;s<e.length;s++){const o=Pe(n,s);let a=0;for(let c=0;c<n.size;c++)a+=o[c]*o[c];r[s]=Math.sqrt(a)}return t.write(r),{success:!0,value:r}},tT=async({inputs:i,output:e,target:t})=>{const{segments:n,vertexCount:r}=i,s=n.value;if(!s)throw new Error(`${n} does not have CPU value`);iT(s,n,r);const o=new e.ValueType(e.length*e.size);let a=0;for(let c=0;c<r;c++){for(;a+1<n.length&&s[Fa(n,a+1)]<=c;)a++;const l=s[Fa(n,a)],u=c*e.size;o[u]=a,o[u+1]=c-l}return t.write(o),{success:!0,value:o}};function iT(i,e,t){if(e.length<1)throw new Error("segmentedMap segments must contain at least one segment start");let n=0;for(let r=0;r<e.length;r++){const s=i[Fa(e,r)];if(r===0&&s!==0)throw new Error(`segmentedMap segments must start at 0, got ${s}`);if(r>0&&s<n)throw new Error(`segmentedMap segments must be non-decreasing, got ${s} after ${n}`);n=s}if(n>t)throw new Error(`segmentedMap last segment start must be <= vertexCount, got ${n} > ${t}`)}function Fa(i,e){return i.offset/i.ValueType.BYTES_PER_ELEMENT+e*(i.stride/i.ValueType.BYTES_PER_ELEMENT)}const nT=async({inputs:i,output:e,target:t})=>{const{condition:n,whenTrue:r,whenFalse:s}=i,o=new e.ValueType(e.length*e.size);for(let a=0;a<e.length;a++){const c=Pe(n,a),l=Pe(r,a),u=Pe(s,a);for(let f=0;f<e.size;f++){const h=Po(c,n.size,f);o[a*e.size+f]=h!==0?Po(l,r.size,f):Po(u,s.size,f)}}return t.write(o),{success:!0,value:o}};function Po(i,e,t){return t<e?i[t]:e===1?i[0]:0}const rT=({inputs:i,output:e,target:t})=>{const n=new e.ValueType(e.length);for(let r=0;r<e.length;r++)n[r]=i.start+r*i.step;return t.write(n),{success:!0,value:n}},sT=({inputs:i,output:e,target:t})=>{const{columns:n}=i;return qc({func:(r,s)=>{for(let o=0;o<n.length;o++)r[o]=s[n[o]]},inputs:{x:i.x},output:e,outputBuffer:t})},oT=Object.freeze(Object.defineProperty({__proto__:null,arithmetic:W1,dot:Q1,equalAll:J1,extent:Y1,fround:q1,gather:Z1,interleave:K1,length:eT,segmentedMap:tT,select:nT,sequence:rT,swizzle:sT},Symbol.toStringTag,{value:"Module"}));class aT{constructor(){d(this,"_modules",{cpu:oT})}add(e,t){const n=this._modules[e];if(typeof t.then=="function"){const s=Promise.all([Promise.resolve(n||{}),t]).then(([o,a])=>({...o,...a}));return this._modules[e]=s,s.then(o=>{this._modules[e]=o}).catch(o=>{T.error(`Failed to register ${e} backend: ${o}`)()}),s}if(n&&typeof n.then=="function"){const s=Promise.resolve(n).then(o=>({...o,...t})).then(o=>(this._modules[e]=o,o)).catch(o=>{throw T.error(`Failed to register ${e} backend: ${o}`)(),o});return this._modules[e]=s,s}const r={...n||{},...t};return this._modules[e]=r,Promise.resolve(r)}async get(e,t){let n=this._modules[e];if(!n)if(e==="webgl")n=this.add("webgl",pr(()=>import("./index-BLUdle5A.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])));else if(e==="webgpu")n=this.add("webgpu",pr(()=>import("./index-dE-tjrYS.js"),__vite__mapDeps([8,1,2,3,4,5,6,7])));else throw new Error(`${e} backend not registered`);const s=(await n)[t];if(typeof s!="function")throw new Error(`${e} backend does not implement ${t}`);return s}getSync(e,t){const n=this._modules[e];if(!n)throw new Error(`${e} backend not registered`);if(typeof n.then=="function")throw new Error(`${e} backend is not loaded yet`);const s=n[t];if(typeof s!="function")throw new Error(`${e} backend does not implement ${t}`);return s}clear(){this._modules={}}}const Na=new aT;class cT{constructor(e){d(this,"inputs");d(this,"dependencies");this.inputs=e,this.dependencies=Array.from(e instanceof Array?e:Object.values(e)).filter(t=>t instanceof se)}async execute(e,t){return await this._resolveDependencies(e),await this._executeWithHandler(await Na.get(this._getHandlerRegistry(e),this.name),t)}executeSync(e,t){this._resolveDependenciesSync(e);const n=this._executeWithHandler(Na.getSync(this._getHandlerRegistry(e),this.name),t);if(lT(n))throw new Error(`${this.name} returned a Promise in executeSync()`);return n}shouldExecuteOnCPU(){return this.output.length<=1&&Array.from(this.dependencies).every(e=>!!e.value)}_getHandlerRegistry(e){return this.shouldExecuteOnCPU()?"cpu":e.type}async _resolveDependencies(e){for(const n of this.dependencies)await n.evaluate(e);if(this._getHandlerRegistry(e)==="cpu"||e.type==="null")for(const n of this.dependencies)await n.ensureCPUValue()}_resolveDependenciesSync(e){for(const n of this.dependencies)n.evaluateSync(e);if(this._getHandlerRegistry(e)==="cpu"||e.type==="null")for(const n of this.dependencies)n.ensureCPUValueSync()}_executeWithHandler(e,t){return e({device:t.device,inputs:this.inputs,output:this.output,target:t})}}function lT(i){return typeof(i==null?void 0:i.then)=="function"}function uT(...i){let e=fT(i.map(t=>t.type));return e[0]!=="f"&&i.some(t=>t.normalized)&&(e="float32"),{isConstant:i.every(t=>t.isConstant),type:e,size:i.reduce((t,n)=>Math.max(t,n.size),0),length:i.reduce((t,n)=>Math.max(t,n.length),0)}}function fT(i){let e=0,t=0;for(const n of i){if(n[0]==="f")return"float32";const r=n.endsWith("8")?8:n.endsWith("6")?16:32;n[0]==="u"?e=Math.max(e,r):t=Math.max(t,r)}return e&&!t?`uint${e}`:t&&e<32?`sint${Math.max(t,e*2)}`:"float32"}class hT extends cT{constructor(t){super(t);d(this,"name","interleave");d(this,"output");const{isConstant:n,type:r,length:s}=uT(...t);this.output=new se({isConstant:n,type:r,size:t.reduce((o,a)=>o+a.size,0),length:s,source:this})}toString(){return`_${this.inputs.join("_")}_`}}function dT(...i){if(i.length===0)throw new Error("interleave() requires at least one input");return i.length===1?Pf(i[0]):new hT(i.map(Pf)).output}function gT(i,e){const t=mT(e);for(const n of t)n.evaluateSync(i);return pT(t),e}function pT(i){const e=new Set(i.flatMap(bT)),t=new Set;for(const n of i)fr(n,t);for(const n of t)n.evaluated&&!e.has(n.buffer)&&n.destroy()}function mT(i){const e=new Set;return Ua(i,e,new Set),Array.from(e)}function Ua(i,e,t){if(yT(i)){e.add(i);return}if(!(!i||typeof i!="object"||t.has(i))){if(t.add(i),Array.isArray(i)){for(const n of i)Ua(n,e,t);return}if(_T(i))for(const n of Object.values(i))Ua(n,e,t)}}function _T(i){const e=Object.getPrototypeOf(i);return e===Object.prototype||e===null}function fr(i,e){if(i instanceof ci){for(const n of i.gpuDataEvaluators)fr(n,e);return}const t=i.source;if(t){if(t instanceof se){e.has(t)||(e.add(t),fr(t,e));return}for(const n of t.dependencies)e.has(n)||(e.add(n),fr(n,e))}}function bT(i){return i instanceof se?[i.buffer]:i.gpuVector.data.map(e=>e.buffer instanceof He?e.buffer.buffer:e.buffer)}function yT(i){return i instanceof se||i instanceof ci}const vT=65535;function wT(i,e){const t=ET(e),n=Math.max(1,Math.ceil(i)),r=Math.min(n,t),s=Math.min(Math.ceil(n/r),t),o=Math.ceil(n/r/s);if(o>t)throw new Error(`WebGPU dispatch requires ${n} workgroups, exceeding the 3D dispatch limit of ${t} per dimension`);return{x:r,y:s,z:o}}function xT(i,e="workgroupId"){return`((${e}.z * ${i.y}u + ${e}.y) * ${i.x}u + ${e}.x)`}function PT(i,e,t="workgroupId",n="localId"){return`(${xT(i,t)} * ${e}u + ${n}.x)`}function ET(i){return Number.isFinite(i)&&i>0?Math.floor(i):vT}function za(i,e){switch(i){case"u32":return`${e}u`;case"f32":return Number.isInteger(e)?`${e}.0`:`${e}`;default:return`${e}`}}function zM(i,e){switch(i){case"uint32":return za("u32",Math.trunc(e));case"sint32":return`${Math.trunc(e)}`;case"float32":return za("f32",e);default:throw new Error(`WebGPU operations only support 32-bit output types, got ${i}`)}}function ST(i){switch(i){case"uint32":return"0u";case"sint32":return"0";case"float32":return"0.0";default:throw new Error(`WebGPU operations only support 32-bit output types, got ${i}`)}}function mt(i){switch(i){case"uint32":return"u32";case"sint32":return"i32";case"float32":return"f32";default:throw new Error(`WebGPU operations only support 32-bit storage types, got ${i}`)}}const Eo=64,LT="GPGPU Operation Counts",TT="Computation Runs",AT=new hi;function CT({module:i,elementWise:e=!1,expression:t,inputs:n,output:r,operationType:s=r.type,outputBuffer:o}){if(!i.source)throw new Error(`WebGPU computation ${i.name} requires WGSL source`);const a=kT(n),c=a.map(([w,b])=>({name:w,input:b})),l=c.filter(({input:w})=>!w.isConstant).map((w,b)=>({...w,index:b})),u=mt(s),f=mt(r.type),h={TYPE:u,RESULT_LEN:r.size.toString()},g=wT(Math.ceil(r.length/Eo),o.device.limits.maxComputeWorkgroupsPerDimension);for(const[w,b]of a)h[`${w.toUpperCase()}_LEN`]=b.size.toString();const p=`
${FT(i.source,h)}
${l.map(({name:w,input:b,index:x})=>MT(w,b,x)).join(`
`)}
${c.map(({name:w,input:b})=>IT(w,b,s)).join(`
`)}
${RT(r,l.length)}
${OT(r)}

@compute @workgroup_size(${Eo}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${PT(g,Eo)};
  if (rowIndex >= ${r.length}u) {
    return;
  }

${c.map(({name:w})=>`  let ${w} = read_${w}(rowIndex);`).join(`
`)}
  var result: array<${f}, ${r.size}>;
${BT(i.name,a,r,e,t)}
  write_result(rowIndex, result);
}
`,m=new Ta(o.device,{source:p,modules:i.dependencies,shaderAssembler:AT,shaderLayout:{bindings:[...l.map(({name:w},b)=>({name:w,type:"storage",group:0,location:b})),{name:"result",type:"storage",group:0,location:l.length}]}}),_=Object.fromEntries(l.map(({name:w,input:b})=>[w,b.buffer]));_.result=o,m.setBindings(_);const y=o.device.beginComputePass({});o.device.statsManager.getStats(LT).get(TT).incrementCount(),m.dispatch(y,g.x,g.y,g.z),y.end(),o.device.submit(),m.destroy()}function MT(i,e,t){if(e.isConstant)return"";const n=mt(e.type);return`@group(0) @binding(${t}) var<storage, read> ${i}: array<${n}>;`}function IT(i,e,t){const n=mt(t),r=e.type===t?"":n,s=e.stride/e.ValueType.BYTES_PER_ELEMENT,o=e.offset/e.ValueType.BYTES_PER_ELEMENT;return e.isConstant?`fn read_${i}(_rowIndex: u32) -> array<${n}, ${e.size}> {
  return array<${n}, ${e.size}>(${DT(e,r)});
}`:`fn read_${i}(rowIndex: u32) -> array<${n}, ${e.size}> {
  var value: array<${n}, ${e.size}>;
  let rowOffset = ${o}u + rowIndex * ${s}u;
${Array.from({length:e.size},(a,c)=>r?`  value[${c}] = ${r}(${i}[rowOffset + ${c}u]);`:`  value[${c}] = ${i}[rowOffset + ${c}u];`).join(`
`)}
  return value;
}`}function RT(i,e){const t=mt(i.type);return`@group(0) @binding(${e}) var<storage, read_write> result: array<${t}>;`}function OT(i){const e=i.stride/i.ValueType.BYTES_PER_ELEMENT,t=i.offset/i.ValueType.BYTES_PER_ELEMENT;return`fn write_result(rowIndex: u32, value: array<${mt(i.type)}, ${i.size}>) {
  let rowOffset = ${t}u + rowIndex * ${e}u;
${Array.from({length:i.size},(r,s)=>`  result[rowOffset + ${s}u] = value[${s}];`).join(`
`)}
}`}function BT(i,e,t,n,r){let s="";if(r)for(let o=0;o<t.size;o++)s+=`  result[${o}] = ${r(o)};
`;else if(n){const o=ST(t.type),a=mt(t.type);for(let c=0;c<t.size;c++){const l=e.map(([u,f])=>c<f.size?mt(f.type)===a?`${u}[${c}]`:`${a}(${u}[${c}])`:o);s+=`  result[${c}] = ${i}(${l.join(", ")});
`}}else s+=`result = ${i}(${e.map(([o])=>o).join(", ")});`;return s.trimEnd()}function kT(i){return Array.isArray(i)?i.map((e,t)=>[`x${t}`,e]):Object.entries(i)}function DT(i,e){const t=i.value;if(!t)throw new Error(`Constant input ${i} is missing CPU values`);return Array.from({length:i.size},(n,r)=>za(e,t[r]??0)).join(", ")}function FT(i,e){for(const t in e)i=i.replaceAll(`{${t}}`,e[t]);return i}const NT=({inputs:i,output:e,target:t})=>{const n=i.map((c,l)=>[`x${l}`,c]);UT(t.device.limits,n);const r=n.map(([c,l])=>`${c}: array<{TYPE}, ${l.size}>`).join(", ");let s=0;const o=n.map(([c,l])=>{const u=Array.from({length:l.size},(f,h)=>`  out[${s+h}] = ${c}[${h}];`).join(`
`);return s+=l.size,u}).join(`
`),a=`fn interleave(${r}) -> array<{TYPE}, {RESULT_LEN}> {
  var out: array<{TYPE}, {RESULT_LEN}>;
${o}
  return out;
}
`;return CT({module:{name:"interleave",source:a},inputs:i,output:e,outputBuffer:t}),{success:!0}};function UT(i,e){const n=e.filter(([,r])=>!r.isConstant).length+1;if(n>i.maxStorageBuffersPerShaderStage)throw new Error(`interleave() requires ${n} storage buffers, exceeding device limit ${i.maxStorageBuffersPerShaderStage}`);if(n>i.maxBindingsPerBindGroup)throw new Error(`interleave() requires ${n} bindings, exceeding bind group limit ${i.maxBindingsPerBindGroup}`)}class zT{constructor(e,{id:t,isTransitionAttribute:n}){this.packedBuffers={},this.device=e,this.id=t,this.isTransitionAttribute=n,this.device.type==="webgpu"&&Na.add("webgpu",{interleave:NT})}hasGroups(e){return this.device.type==="webgpu"&&Object.values(e).some(t=>!!t.settings.bufferGroup)}finalize(){for(const e of Object.values(this.packedBuffers))e.packed.destroy();this.packedBuffers={}}getBufferLayouts(e,t){const n=this._getPackedGroups(e,t,{requireValues:!1,excludeAttributes:{}});return this._getBufferLayouts(e,n,t)}getBindings(e,t,n,r){const s=this._getPackedGroups(e,n,{requireValues:!0,excludeAttributes:r}),o={},a=new Set;for(const c of s.values()){const l=!this.packedBuffers[c.id]||c.attributes.some(u=>!!t[u.id]);o[c.id]=this._getPackedBuffer(c,l);for(const u of c.attributes)a.add(u.id)}return{bufferLayouts:this._getBufferLayouts(e,s,n).filter(c=>{var l;return!r[c.name]&&!((l=e[c.name])!=null&&l.settings.isIndexed)}),buffers:o,groupedAttributeIds:a}}_getPackedGroups(e,t,{requireValues:n,excludeAttributes:r}){const s=new Map;for(const a of Object.values(e)){const c=a.settings.bufferGroup;if(!c)continue;const l=s.get(c)||[];l.push(a),s.set(c,l)}const o=new Map;for(const[a,c]of s){const l=this._getPackedGroup(a,c,t,n,r);l&&o.set(a,l)}return o}_getPackedGroup(e,t,n,r,s){if(t.length<2)return null;const o=t.map(g=>g.getBufferLayout(n)),a=o[0].stepMode,c=Math.max(1,t[0].numInstances),l=r&&t.every(g=>g.isConstant);for(let g=0;g<t.length;g++){const p=t[g],m=p.getAccessor(),_=m.size*m.bytesPerElement;if(s[p.id]||p.settings.isIndexed||p.settings.noAlloc||p.doublePrecision||this.isTransitionAttribute(p.id)||o[g].stepMode!==a||p.numInstances!==t[0].numInstances||(m.offset||0)!==0||(m.vertexOffset||0)!==0||Ze(m)!==_||r&&(p.isConstant?!p.getConstantValue()||p.getConstantValue().byteLength<_:!ArrayBuffer.isView(p.value)||p.value.byteLength<c*_))return null}const u={},f=[];let h=0;for(let g=0;g<t.length;g++){const p=t[g];h=Lf(h),u[p.id]=h;for(const m of o[g].attributes||[])f.push({...m,byteOffset:h+(m.byteOffset||0)});h+=Ze(p.getAccessor())}return h=Lf(h),{id:e,attributes:t,byteStride:h,byteOffsets:u,rowCount:c,layout:{name:e,byteStride:l?0:h,stepMode:a,attributes:f}}}_getBufferLayouts(e,t,n){const r=[],s=new Set,o=new Set;for(const a of t.values())for(const c of a.attributes)o.add(c.id);for(const a of Object.values(e)){const c=a.settings.bufferGroup,l=c&&t.get(c);l&&o.has(a.id)?s.has(l.id)||(r.push(l.layout),s.add(l.id)):r.push(a.getBufferLayout(n))}return r}_getPackedBuffer(e,t){const n=JSON.stringify({byteStride:e.layout.byteStride,attributes:e.layout.attributes}),r=this.packedBuffers[e.id];if((!r||r.layoutKey!==n)&&(t=!0),t){r&&(r.packed.destroy(),delete this.packedBuffers[e.id]);const s=this._interleavePackedGroup(e);return this.packedBuffers[e.id]={packed:s,layoutKey:n},s.buffer}if(!r)throw new Error(`Attribute buffer group ${e.id} has no packed buffer`);return r.packed.buffer}_interleavePackedGroup(e){const t=e.attributes.map(r=>this._getInterleaveInput(e,r)),n=dT(...t);return gT(this.device,n),n}_getInterleaveInput(e,t){const n=Ze(t.getAccessor()),r=e.byteOffsets[t.id];if(Fi(`${e.id}.${t.id} rowByteLength`,n),Fi(`${e.id}.${t.id} groupByteOffset`,r),t.isConstant){const c=t.getConstantValue();if(!c)throw new Error(`Attribute group ${e.id} is missing constant value ${t.id}`);return Fi(`${e.id}.${t.id} constant byteOffset`,c.byteOffset),new se({id:t.id,type:"uint32",size:n/4,isConstant:!0,value:new Uint32Array(c.buffer,c.byteOffset,n/Uint32Array.BYTES_PER_ELEMENT)})}const s=t.getBuffer(),o=t.byteOffset,a=t.getAccessor().stride||n;if(Fi(`${e.id}.${t.id} byteOffset`,o),Fi(`${e.id}.${t.id} stride`,a),!s)throw new Error(`Attribute group ${e.id} cannot interleave missing buffer ${t.id}`);return new se({id:t.id,type:"uint32",size:n/4,offset:o,stride:a,length:e.rowCount,buffer:s})}}function Lf(i){return Math.ceil(i/4)*4}function Fi(i,e){if(e%4!==0)throw new Error(`Attribute buffer groups require 32-bit alignment: ${i}=${e}`)}function So(i){const{source:e,target:t,start:n=0,size:r,getData:s}=i,o=i.end||t.length,a=e.length,c=o-n;if(a>c){t.set(e.subarray(0,c),n);return}if(t.set(e,n),!s)return;let l=a;for(;l<c;){const u=s(l,e);for(let f=0;f<r;f++)t[n+l]=u[f]||0,l++}}function $T({source:i,target:e,size:t,getData:n,sourceStartIndices:r,targetStartIndices:s}){if(!r||!s)return So({source:i,target:e,size:t,getData:n}),e;let o=0,a=0;const c=n&&((u,f)=>n(u+a,f)),l=Math.min(r.length,s.length);for(let u=1;u<l;u++){const f=r[u]*t,h=s[u]*t;So({source:i.subarray(o,f),target:e,start:a,end:h,size:t,getData:c}),o=f,a=h}return a<e.length&&So({source:[],target:e,start:a,size:t,getData:c}),e}function GT(i){const{device:e,settings:t,value:n}=i,r=new Mg(e,t);return r.setData({value:n instanceof Float64Array?new Float64Array(0):new Float32Array(0),normalized:t.normalized}),r}function Ng(i){switch(i){case 1:return"float";case 2:return"vec2";case 3:return"vec3";case 4:return"vec4";default:throw new Error(`No defined attribute type for size "${i}"`)}}function Ug(i){switch(i){case 1:return"float32";case 2:return"float32x2";case 3:return"float32x3";case 4:return"float32x4";default:throw new Error("invalid type size")}}function zg(i){i.push(i.shift())}function VT(i,e){const{settings:t,value:n,size:r}=i,s=i.isDoublePrecisionBuffer?2:1;let o=0;const{shaderAttributes:a}=i.settings;if(a)for(const c of Object.values(a))o=Math.max(o,c.vertexOffset??0);return(t.noAlloc?n.length:(e+o)*r)*s}function $g({device:i,source:e,target:t}){return(!t||t.byteLength<e.byteLength)&&(t==null||t.destroy(),t=i.createBuffer({byteLength:e.byteLength,usage:e.usage})),t}function Gg({device:i,buffer:e,attribute:t,fromLength:n,toLength:r,fromStartIndices:s,getData:o=a=>a}){const a=t.isDoublePrecisionBuffer?2:1,c=t.size*a,l=t.byteOffset,u=t.settings.bytesPerElement<4?l/t.settings.bytesPerElement*4:l,f=t.startIndices,h=s&&f,g=t.isConstant;if(!h&&e&&n>=r)return e;const p=t.value instanceof Float64Array?Float32Array:t.value.constructor,m=g?t.value:new p(t.getBuffer().readSyncWebGL(l,r*p.BYTES_PER_ELEMENT).buffer);if(t.settings.normalized&&!g){const b=o;o=(x,S)=>t.normalizeConstant(b(x,S))}const _=g?(b,x)=>o(m,x):(b,x)=>o(m.subarray(b+l,b+l+c),x),y=e?new Float32Array(e.readSyncWebGL(u,n*4).buffer):new Float32Array(0),w=new Float32Array(r);return $T({source:y,target:w,sourceStartIndices:s,targetStartIndices:f,size:c,getData:_}),(!e||e.byteLength<w.byteLength+u)&&(e==null||e.destroy(),e=i.createBuffer({byteLength:w.byteLength+u,usage:35050})),e.write(w,u),e}class Vg{constructor({device:e,attribute:t,timeline:n}){this.buffers=[],this.currentLength=0,this.device=e,this.transition=new Es(n),this.attribute=t,this.attributeInTransition=GT(t),this.currentStartIndices=t.startIndices}get inProgress(){return this.transition.inProgress}start(e,t,n=1/0){this.settings=e,this.currentStartIndices=this.attribute.startIndices,this.currentLength=VT(this.attribute,t),this.transition.start({...e,duration:n})}update(){const e=this.transition.update();return e&&this.onUpdate(),e}setBuffer(e){const{stride:t}=this.attributeInTransition.getAccessor();this.attributeInTransition.setData({buffer:e,normalized:this.attribute.settings.normalized,value:this.attributeInTransition.value,stride:t})}cancel(){this.transition.cancel()}delete(){this.cancel();for(const e of this.buffers)e.destroy();this.buffers.length=0}}class jT extends Vg{constructor({device:e,attribute:t,timeline:n}){super({device:e,attribute:t,timeline:n}),this.type="interpolation",this.transform=qT(e,t)}start(e,t){const n=this.currentLength,r=this.currentStartIndices;if(super.start(e,t,e.duration),e.duration<=0){this.transition.cancel();return}const{buffers:s,attribute:o}=this;zg(s),s[0]=Gg({device:this.device,buffer:s[0],attribute:o,fromLength:n,toLength:this.currentLength,fromStartIndices:r,getData:e.enter}),s[1]=$g({device:this.device,source:s[0],target:s[1]}),this.setBuffer(s[1]);const{transform:a}=this,c=a.model;let l=Math.floor(this.currentLength/o.size);jg(o)&&(l/=2),c.setVertexCount(l),o.isConstant?(c.setAttributes({aFrom:s[0]}),c.setConstantAttributes({aTo:o.value})):c.setAttributes({aFrom:s[0],aTo:o.getBuffer()}),a.transformFeedback.setBuffers({vCurrent:s[1]})}onUpdate(){const{duration:e,easing:t}=this.settings,{time:n}=this.transition;let r=n/e;t&&(r=t(r));const{model:s}=this.transform,o={time:r};s.shaderInputs.setProps({interpolation:o}),this.transform.run({discard:!0})}delete(){super.delete(),this.transform.destroy()}}const WT=`layout(std140) uniform interpolationUniforms {
  float time;
} interpolation;
`,Tf={name:"interpolation",vs:WT,uniformTypes:{time:"f32"}},HT=`#version 300 es
#define SHADER_NAME interpolation-transition-vertex-shader

in ATTRIBUTE_TYPE aFrom;
in ATTRIBUTE_TYPE aTo;
out ATTRIBUTE_TYPE vCurrent;

void main(void) {
  vCurrent = mix(aFrom, aTo, interpolation.time);
  gl_Position = vec4(0.0);
}
`,YT=`#version 300 es
#define SHADER_NAME interpolation-transition-vertex-shader

in ATTRIBUTE_TYPE aFrom;
in ATTRIBUTE_TYPE aFrom64Low;
in ATTRIBUTE_TYPE aTo;
in ATTRIBUTE_TYPE aTo64Low;
out ATTRIBUTE_TYPE vCurrent;
out ATTRIBUTE_TYPE vCurrent64Low;

vec2 mix_fp64(vec2 a, vec2 b, float x) {
  vec2 range = sub_fp64(b, a);
  return sum_fp64(a, mul_fp64(range, vec2(x, 0.0)));
}

void main(void) {
  for (int i=0; i<ATTRIBUTE_SIZE; i++) {
    vec2 value = mix_fp64(vec2(aFrom[i], aFrom64Low[i]), vec2(aTo[i], aTo64Low[i]), interpolation.time);
    vCurrent[i] = value.x;
    vCurrent64Low[i] = value.y;
  }
  gl_Position = vec4(0.0);
}
`;function jg(i){return i.isDoublePrecisionBuffer}function qT(i,e){const t=e.size,n=Ng(t),r=Ug(t),s=e.getBufferLayout();return jg(e)?new gn(i,{vs:YT,bufferLayout:[{name:"aFrom",byteStride:8*t,attributes:[{attribute:"aFrom",format:r,byteOffset:0},{attribute:"aFrom64Low",format:r,byteOffset:4*t}]},{name:"aTo",byteStride:8*t,attributes:[{attribute:"aTo",format:r,byteOffset:0},{attribute:"aTo64Low",format:r,byteOffset:4*t}]}],modules:[Mx,Tf],defines:{ATTRIBUTE_TYPE:n,ATTRIBUTE_SIZE:t},moduleSettings:{},varyings:["vCurrent","vCurrent64Low"],bufferMode:35980,disableWarnings:!0}):new gn(i,{vs:HT,bufferLayout:[{name:"aFrom",format:r},{name:"aTo",format:s.attributes[0].format}],modules:[Tf],defines:{ATTRIBUTE_TYPE:n},varyings:["vCurrent"],disableWarnings:!0})}class ZT extends Vg{constructor({device:e,attribute:t,timeline:n}){super({device:e,attribute:t,timeline:n}),this.type="spring",this.texture=tA(e),this.framebuffer=iA(e,this.texture),this.transform=eA(e,t)}start(e,t){const n=this.currentLength,r=this.currentStartIndices;super.start(e,t);const{buffers:s,attribute:o}=this;for(let c=0;c<2;c++)s[c]=Gg({device:this.device,buffer:s[c],attribute:o,fromLength:n,toLength:this.currentLength,fromStartIndices:r,getData:e.enter});s[2]=$g({device:this.device,source:s[0],target:s[2]}),this.setBuffer(s[1]);const{model:a}=this.transform;a.setVertexCount(Math.floor(this.currentLength/o.size)),o.isConstant?a.setConstantAttributes({aTo:o.value}):a.setAttributes({aTo:o.getBuffer()})}onUpdate(){const{buffers:e,transform:t,framebuffer:n,transition:r}=this,s=this.settings;t.model.setAttributes({aPrev:e[0],aCur:e[1]}),t.transformFeedback.setBuffers({vNext:e[2]});const o={stiffness:s.stiffness,damping:s.damping};t.model.shaderInputs.setProps({spring:o}),t.run({framebuffer:n,discard:!1,parameters:{viewport:[0,0,1,1]},clearColor:[0,0,0,0]}),zg(e),this.setBuffer(e[1]),this.device.readPixelsToArrayWebGL(n)[0]>0||r.end()}delete(){super.delete(),this.transform.destroy(),this.texture.destroy(),this.framebuffer.destroy()}}const XT=`layout(std140) uniform springUniforms {
  float damping;
  float stiffness;
} spring;
`,KT={name:"spring",vs:XT,uniformTypes:{damping:"f32",stiffness:"f32"}},QT=`#version 300 es
#define SHADER_NAME spring-transition-vertex-shader

#define EPSILON 0.00001

in ATTRIBUTE_TYPE aPrev;
in ATTRIBUTE_TYPE aCur;
in ATTRIBUTE_TYPE aTo;
out ATTRIBUTE_TYPE vNext;
out float vIsTransitioningFlag;

ATTRIBUTE_TYPE getNextValue(ATTRIBUTE_TYPE cur, ATTRIBUTE_TYPE prev, ATTRIBUTE_TYPE dest) {
  ATTRIBUTE_TYPE velocity = cur - prev;
  ATTRIBUTE_TYPE delta = dest - cur;
  ATTRIBUTE_TYPE force = delta * spring.stiffness;
  ATTRIBUTE_TYPE resistance = velocity * spring.damping;
  return force - resistance + velocity + cur;
}

void main(void) {
  bool isTransitioning = length(aCur - aPrev) > EPSILON || length(aTo - aCur) > EPSILON;
  vIsTransitioningFlag = isTransitioning ? 1.0 : 0.0;

  vNext = getNextValue(aCur, aPrev, aTo);
  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 100.0;
}
`,JT=`#version 300 es
#define SHADER_NAME spring-transition-is-transitioning-fragment-shader

in float vIsTransitioningFlag;

out vec4 fragColor;

void main(void) {
  if (vIsTransitioningFlag == 0.0) {
    discard;
  }
  fragColor = vec4(1.0);
}`;function eA(i,e){const t=Ng(e.size),n=Ug(e.size);return new gn(i,{vs:QT,fs:JT,bufferLayout:[{name:"aPrev",format:n},{name:"aCur",format:n},{name:"aTo",format:e.getBufferLayout().attributes[0].format}],varyings:["vNext"],modules:[KT],defines:{ATTRIBUTE_TYPE:t},parameters:{depthCompare:"always",blendColorOperation:"max",blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaOperation:"max",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one"}})}function tA(i){return i.createTexture({data:new Uint8Array(4),format:"rgba8unorm",width:1,height:1})}function iA(i,e){return i.createFramebuffer({id:"spring-transition-is-transitioning-framebuffer",width:1,height:1,colorAttachments:[e]})}const nA={interpolation:jT,spring:ZT};class rA{constructor(e,{id:t,timeline:n}){if(!e)throw new Error("AttributeTransitionManager is constructed without device");this.id=t,this.device=e,this.timeline=n,this.transitions={},this.needsRedraw=!1,this.numInstances=1}finalize(){for(const e in this.transitions)this._removeTransition(e)}update({attributes:e,transitions:t,numInstances:n}){this.numInstances=n||1;for(const r in e){const s=e[r],o=s.getTransitionSetting(t);o&&this._updateAttribute(r,s,o)}for(const r in this.transitions){const s=e[r];(!s||!s.getTransitionSetting(t))&&this._removeTransition(r)}}hasAttribute(e){const t=this.transitions[e];return t&&t.inProgress}getAttributes(){const e={};for(const t in this.transitions){const n=this.transitions[t];n.inProgress&&(e[t]=n.attributeInTransition)}return e}run(){if(this.numInstances===0)return!1;for(const t in this.transitions)this.transitions[t].update()&&(this.needsRedraw=!0);const e=this.needsRedraw;return this.needsRedraw=!1,e}_removeTransition(e){this.transitions[e].delete(),delete this.transitions[e]}_updateAttribute(e,t,n){const r=this.transitions[e];let s=!r||r.type!==n.type;if(s){r&&this._removeTransition(e);const o=nA[n.type];o?this.transitions[e]=new o({attribute:t,timeline:this.timeline,device:this.device}):(q.error(`unsupported transition type '${n.type}'`)(),s=!1)}(s||t.needsRedraw())&&(this.needsRedraw=!0,this.transitions[e].start(n,this.numInstances))}}const Af="attributeManager.invalidate",sA="attributeManager.updateStart",oA="attributeManager.updateEnd",aA="attribute.updateStart",cA="attribute.allocate",lA="attribute.updateEnd";class uA{constructor(e,{id:t="attribute-manager",stats:n,timeline:r}={}){this.mergeBoundsMemoized=Pn(CS),this.id=t,this.device=e,this.attributes={},this.updateTriggers={},this.needsRedraw=!0,this.userData={},this.stats=n,this.attributeTransitionManager=new rA(e,{id:`${t}-transitions`,timeline:r}),this.attributeBufferGroups=e.type==="webgpu"?new zT(e,{id:t,isTransitionAttribute:s=>this.attributeTransitionManager.hasAttribute(s)}):null,Object.seal(this)}finalize(){var e;(e=this.attributeBufferGroups)==null||e.finalize();for(const t in this.attributes)this.attributes[t].delete();this.attributeTransitionManager.finalize()}getNeedsRedraw(e={clearRedrawFlags:!1}){const t=this.needsRedraw;return this.needsRedraw=this.needsRedraw&&!e.clearRedrawFlags,t&&this.id}setNeedsRedraw(){this.needsRedraw=!0}add(e){this._add(e)}addInstanced(e){this._add(e,{stepMode:"instance"})}remove(e){for(const t of e)this.attributes[t]!==void 0&&(this.attributes[t].delete(),delete this.attributes[t])}invalidate(e,t){const n=this._invalidateTrigger(e,t);_e(Af,this,e,n)}invalidateAll(e){for(const t in this.attributes)this.attributes[t].setNeedsUpdate(t,e);_e(Af,this,"all")}update({data:e,numInstances:t,startIndices:n=null,transitions:r,props:s={},buffers:o={},context:a={}}){let c=!1;_e(sA,this),this.stats&&this.stats.get("Update Attributes").timeStart();for(const l in this.attributes){const u=this.attributes[l],f=u.settings.accessor;u.startIndices=n,u.numInstances=t,s[l]&&q.removed(`props.${l}`,`data.attributes.${l}`)(),u.setExternalBuffer(o[l])||u.setBinaryValue(typeof f=="string"?o[f]:void 0,e.startIndices)||typeof f=="string"&&!o[f]&&u.setConstantValue(a,s[f])||u.needsUpdate()&&(c=!0,this._updateAttribute({attribute:u,numInstances:t,data:e,props:s,context:a})),this.needsRedraw=this.needsRedraw||u.needsRedraw()}c&&_e(oA,this,t),this.stats&&(this.stats.get("Update Attributes").timeEnd(),c&&this.stats.get("Attributes updated").incrementCount()),this.attributeTransitionManager.update({attributes:this.attributes,numInstances:t,transitions:r})}updateTransition(){const{attributeTransitionManager:e}=this,t=e.run();return this.needsRedraw=this.needsRedraw||t,t}getAttributes(){return{...this.attributes,...this.attributeTransitionManager.getAttributes()}}getBounds(e){const t=e.map(n=>{var r;return(r=this.attributes[n])==null?void 0:r.getBounds()});return this.mergeBoundsMemoized(t)}getChangedAttributes(e={clearChangedFlags:!1}){const{attributes:t,attributeTransitionManager:n}=this,r={...n.getAttributes()};for(const s in t){const o=t[s];o.needsRedraw(e)&&!n.hasAttribute(s)&&(r[s]=o)}return r}getBufferLayouts(e){return this.hasBufferGroups()?this.attributeBufferGroups.getBufferLayouts(this.getAttributes(),e):Object.values(this.getAttributes()).map(t=>t.getBufferLayout(e))}hasBufferGroups(){var e;return!!((e=this.attributeBufferGroups)!=null&&e.hasGroups(this.attributes))}getBufferGroupBindings(e,t,n={}){return this.attributeBufferGroups?this.attributeBufferGroups.getBindings(this.getAttributes(),e,t,n):{bufferLayouts:this.getBufferLayouts(t),buffers:{},groupedAttributeIds:new Set}}_add(e,t){for(const n in e){const r=e[n],s={...r,id:n,size:r.isIndexed&&1||r.size||1,...t};this.attributes[n]=new Mg(this.device,s)}this._mapUpdateTriggersToAttributes()}_mapUpdateTriggersToAttributes(){const e={};for(const t in this.attributes)this.attributes[t].getUpdateTriggers().forEach(r=>{e[r]||(e[r]=[]),e[r].push(t)});this.updateTriggers=e}_invalidateTrigger(e,t){const{attributes:n,updateTriggers:r}=this,s=r[e];return s&&s.forEach(o=>{const a=n[o];a&&a.setNeedsUpdate(a.id,t)}),s}_updateAttribute(e){const{attribute:t,numInstances:n}=e;if(_e(aA,t),t.constant){t.setConstantValue(e.context,t.value);return}t.allocate(n)&&_e(cA,t,n),t.updateBuffer(e)&&(this.needsRedraw=!0,_e(lA,t,n))}}class fA extends Es{get value(){return this._value}_onUpdate(){const{time:e,settings:{fromValue:t,toValue:n,duration:r,easing:s}}=this,o=s(e/r);this._value=di(t,n,o)}}const Cf=1e-5;function Mf(i,e,t,n,r){const s=e-i,a=(t-e)*r,c=-s*n;return a+c+s+e}function hA(i,e,t,n,r){if(Array.isArray(t)){const s=[];for(let o=0;o<t.length;o++)s[o]=Mf(i[o],e[o],t[o],n,r);return s}return Mf(i,e,t,n,r)}function If(i,e){if(Array.isArray(i)){let t=0;for(let n=0;n<i.length;n++){const r=i[n]-e[n];t+=r*r}return Math.sqrt(t)}return Math.abs(i-e)}class dA extends Es{get value(){return this._currValue}_onUpdate(){const{fromValue:e,toValue:t,damping:n,stiffness:r}=this.settings,{_prevValue:s=e,_currValue:o=e}=this;let a=hA(s,o,t,n,r);const c=If(a,t),l=If(a,o);c<Cf&&l<Cf&&(a=t,this.end()),this._prevValue=o,this._currValue=a}}const gA={interpolation:fA,spring:dA};class pA{constructor(e){this.transitions=new Map,this.timeline=e}get active(){return this.transitions.size>0}add(e,t,n,r){const{transitions:s}=this;if(s.has(e)){const c=s.get(e),{value:l=c.settings.fromValue}=c;t=l,this.remove(e)}if(r=Cg(r),!r)return;const o=gA[r.type];if(!o){q.error(`unsupported transition type '${r.type}'`)();return}const a=new o(this.timeline);a.start({...r,fromValue:t,toValue:n}),s.set(e,a)}remove(e){const{transitions:t}=this;t.has(e)&&(t.get(e).cancel(),t.delete(e))}update(){const e={};for(const[t,n]of this.transitions)n.update(),e[t]=n.value,n.inProgress||this.remove(t);return e}clear(){for(const e of this.transitions.keys())this.remove(e)}}function mA(i){const e=i[ht];for(const t in e){const n=e[t],{validate:r}=n;if(r&&!r(i[t],n))throw new Error(`Invalid prop ${t}: ${i[t]}`)}}function _A(i,e){const t=Wg({newProps:i,oldProps:e,propTypes:i[ht],ignoreProps:{data:null,updateTriggers:null,extensions:null,transitions:null}}),n=yA(i,e);let r=!1;return n||(r=vA(i,e)),{dataChanged:n,propsChanged:t,updateTriggersChanged:r,extensionsChanged:wA(i,e),transitionsChanged:bA(i,e)}}function bA(i,e){if(!i.transitions)return!1;const t={},n=i[ht];let r=!1;for(const s in i.transitions){const o=n[s],a=o&&o.type;(a==="number"||a==="color"||a==="array")&&$a(i[s],e[s],o)&&(t[s]=!0,r=!0)}return r?t:!1}function Wg({newProps:i,oldProps:e,ignoreProps:t={},propTypes:n={},triggerName:r="props"}){if(e===i)return!1;if(typeof i!="object"||i===null)return`${r} changed shallowly`;if(typeof e!="object"||e===null)return`${r} changed shallowly`;for(const s of Object.keys(i))if(!(s in t)){if(!(s in e))return`${r}.${s} added`;const o=$a(i[s],e[s],n[s]);if(o)return`${r}.${s} ${o}`}for(const s of Object.keys(e))if(!(s in t)){if(!(s in i))return`${r}.${s} dropped`;if(!Object.hasOwnProperty.call(i,s)){const o=$a(i[s],e[s],n[s]);if(o)return`${r}.${s} ${o}`}}return!1}function $a(i,e,t){let n=t&&t.equal;return n&&!n(i,e,t)||!n&&(n=i&&e&&i.equals,n&&!n.call(i,e))?"changed deeply":!n&&e!==i?"changed shallowly":null}function yA(i,e){if(e===null)return"oldProps is null, initial diff";let t=!1;const{dataComparator:n,_dataDiff:r}=i;return n?n(i.data,e.data)||(t="Data comparator detected a change"):i.data!==e.data&&(t="A new data container was supplied"),t&&r&&(t=r(i.data,e.data)||t),t}function vA(i,e){if(e===null)return{all:!0};if("all"in i.updateTriggers&&Rf(i,e,"all"))return{all:!0};const t={};let n=!1;for(const r in i.updateTriggers)r!=="all"&&Rf(i,e,r)&&(t[r]=!0,n=!0);return n?t:!1}function wA(i,e){if(e===null)return!0;const t=e.extensions,{extensions:n}=i;if(n===t)return!1;if(!t||!n||n.length!==t.length)return!0;for(let r=0;r<n.length;r++)if(!n[r].equals(t[r]))return!0;return!1}function Rf(i,e,t){let n=i.updateTriggers[t];n=n??{};let r=e.updateTriggers[t];return r=r??{},Wg({oldProps:r,newProps:n,triggerName:t})}const xA="count(): argument not an object",PA="count(): argument not a container";function EA(i){if(!LA(i))throw new Error(xA);if(typeof i.count=="function")return i.count();if(Number.isFinite(i.size))return i.size;if(Number.isFinite(i.length))return i.length;if(SA(i))return Object.keys(i).length;throw new Error(PA)}function SA(i){return i!==null&&typeof i=="object"&&i.constructor===Object}function LA(i){return i!==null&&typeof i=="object"}function Of(i,e){if(!e)return i;const t={...i,...e};if("defines"in e&&(t.defines={...i.defines,...e.defines}),"modules"in e&&(t.modules=(i.modules||[]).concat(e.modules),e.modules.some(n=>n.name==="project64"))){const n=t.modules.findIndex(r=>r.name==="project32");n>=0&&t.modules.splice(n,1)}if("inject"in e)if(!i.inject)t.inject=e.inject;else{const n={...i.inject};for(const r in e.inject)n[r]=(n[r]||"")+e.inject[r];t.inject=n}return t}const TA={minFilter:"linear",mipmapFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},Ga={};function AA(i,e,t,n){if(t instanceof he)return t;t.constructor&&t.constructor.name!=="Object"&&(t={data:t});let r=null;t.compressed&&(r={minFilter:"linear",mipmapFilter:t.data.length>1?"nearest":"linear"});const{width:s,height:o}=t.data,a=e.createTexture({...t,sampler:{...TA,...r,...n},mipLevels:e.getMipLevelCount(s,o)});return e.type==="webgl"?a.generateMipmapsWebGL():e.type==="webgpu"&&e.generateMipmapsWebGPU(a),Ga[a.id]=i,a}function CA(i,e){!e||!(e instanceof he)||Ga[e.id]===i&&(e.delete(),delete Ga[e.id])}const MA={boolean:{validate(i,e){return!0},equal(i,e,t){return!!i==!!e}},number:{validate(i,e){return Number.isFinite(i)&&(!("max"in e)||i<=e.max)&&(!("min"in e)||i>=e.min)}},color:{validate(i,e){return e.optional&&!i||Va(i)&&(i.length===3||i.length===4)},equal(i,e,t){return we(i,e,1)}},accessor:{validate(i,e){const t=Hr(i);return t==="function"||t===Hr(e.value)},equal(i,e,t){return typeof e=="function"?!0:we(i,e,1)}},array:{validate(i,e){return e.optional&&!i||Va(i)},equal(i,e,t){const{compare:n}=t,r=Number.isInteger(n)?n:n?1:0;return n?we(i,e,r):i===e}},object:{equal(i,e,t){if(t.ignore)return!0;const{compare:n}=t,r=Number.isInteger(n)?n:n?1:0;return n?we(i,e,r):i===e}},function:{validate(i,e){return e.optional&&!i||typeof i=="function"},equal(i,e,t){return!t.compare&&t.ignore!==!1||i===e}},data:{transform:(i,e,t)=>{if(!i)return i;const{dataTransform:n}=t.props;return n?n(i):typeof i.shape=="string"&&i.shape.endsWith("-table")&&Array.isArray(i.data)?i.data:i}},image:{transform:(i,e,t)=>{const n=t.context;return!n||!n.device?null:AA(t.id,n.device,i,{...e.parameters,...t.props.textureParameters})},release:(i,e,t)=>{CA(t.id,i)}}};function IA(i){const e={},t={},n={};for(const[r,s]of Object.entries(i)){const o=s==null?void 0:s.deprecatedFor;if(o)n[r]=Array.isArray(o)?o:[o];else{const a=RA(r,s);e[r]=a,t[r]=a.value}}return{propTypes:e,defaultProps:t,deprecatedProps:n}}function RA(i,e){switch(Hr(e)){case"object":return Ni(i,e);case"array":return Ni(i,{type:"array",value:e,compare:!1});case"boolean":return Ni(i,{type:"boolean",value:e});case"number":return Ni(i,{type:"number",value:e});case"function":return Ni(i,{type:"function",value:e,compare:!0});default:return{name:i,type:"unknown",value:e}}}function Ni(i,e){return"type"in e?{name:i,...MA[e.type],...e}:"value"in e?{name:i,type:Hr(e.value),...e}:{name:i,type:"object",value:e}}function Va(i){return Array.isArray(i)||ArrayBuffer.isView(i)}function Hr(i){return Va(i)?"array":i===null?"null":typeof i}function OA(i,e){let t;for(let s=e.length-1;s>=0;s--){const o=e[s];"extensions"in o&&(t=o.extensions)}const n=ja(i.constructor,t),r=Object.create(n);r[Gr]=i,r[kt]={},r[lt]={};for(let s=0;s<e.length;++s){const o=e[s];for(const a in o)r[a]=o[a]}return Object.freeze(r),r}const BA="_mergedDefaultProps";function ja(i,e){if(!(i instanceof Ts.constructor))return{};let t=BA;if(e)for(const r of e){const s=r.constructor;s&&(t+=`:${s.extensionName||s.name}`)}const n=Hg(i,t);return n||(i[t]=kA(i,e||[]))}function kA(i,e){if(!i.prototype)return null;const n=Object.getPrototypeOf(i),r=ja(n),s=Hg(i,"defaultProps")||{},o=IA(s),a=Object.assign(Object.create(null),r,o.defaultProps),c=Object.assign(Object.create(null),r==null?void 0:r[ht],o.propTypes),l=Object.assign(Object.create(null),r==null?void 0:r[co],o.deprecatedProps);for(const u of e){const f=ja(u.constructor);f&&(Object.assign(a,f),Object.assign(c,f[ht]),Object.assign(l,f[co]))}return DA(a,i),NA(a,c),FA(a,l),a[ht]=c,a[co]=l,e.length===0&&!Zc(i,"_propTypes")&&(i._propTypes=c),a}function DA(i,e){const t=zA(e);Object.defineProperties(i,{id:{writable:!0,value:t}})}function FA(i,e){for(const t in e)Object.defineProperty(i,t,{enumerable:!1,set(n){const r=`${this.id}: ${t}`;for(const s of e[t])Zc(this,s)||(this[s]=n);q.deprecated(r,e[t].join("/"))()}})}function NA(i,e){const t={},n={};for(const r in e){const s=e[r],{name:o,value:a}=s;s.async&&(t[o]=a,n[o]=UA(o))}i[oi]=t,i[kt]={},Object.defineProperties(i,n)}function UA(i){return{enumerable:!0,set(e){typeof e=="string"||e instanceof Promise||Tg(e)?this[kt][i]=e:this[lt][i]=e},get(){if(this[lt]){if(i in this[lt])return this[lt][i]||this[oi][i];if(i in this[kt]){const e=this[Gr]&&this[Gr].internalState;if(e&&e.hasAsyncProp(i))return e.getAsyncProp(i)||this[oi][i]}}return this[oi][i]}}}function Zc(i,e){return Object.prototype.hasOwnProperty.call(i,e)}function Hg(i,e){return Zc(i,e)&&i[e]}function zA(i){const e=i.componentName;return e||q.warn(`${i.name}.componentName not specified`)(),e||i.name}let $A=0;class Ts{constructor(...e){this.props=OA(this,e),this.id=this.props.id,this.count=$A++}clone(e){const{props:t}=this,n={};for(const r in t[oi])r in t[lt]?n[r]=t[lt][r]:r in t[kt]&&(n[r]=t[kt][r]);return new this.constructor({...t,...n,...e})}}Ts.componentName="Component";Ts.defaultProps={};const GA=Object.freeze({});class VA{constructor(e){this.component=e,this.asyncProps={},this.onAsyncPropUpdated=()=>{},this.oldProps=null,this.oldAsyncProps=null}finalize(){for(const e in this.asyncProps){const t=this.asyncProps[e];t&&t.type&&t.type.release&&t.type.release(t.resolvedValue,t.type,this.component)}this.asyncProps={},this.component=null,this.resetOldProps()}getOldProps(){return this.oldAsyncProps||this.oldProps||GA}resetOldProps(){this.oldAsyncProps=null,this.oldProps=this.component?this.component.props:null}hasAsyncProp(e){return e in this.asyncProps}getAsyncProp(e){const t=this.asyncProps[e];return t&&t.resolvedValue}isAsyncPropLoading(e){if(e){const t=this.asyncProps[e];return!!(t&&t.pendingLoadCount>0&&t.pendingLoadCount!==t.resolvedLoadCount)}for(const t in this.asyncProps)if(this.isAsyncPropLoading(t))return!0;return!1}reloadAsyncProp(e,t){this._watchPromise(e,Promise.resolve(t))}setAsyncProps(e){this.component=e[Gr]||this.component;const t=e[lt]||{},n=e[kt]||e,r=e[oi]||{};for(const s in t){const o=t[s];this._createAsyncPropData(s,r[s]),this._updateAsyncProp(s,o),t[s]=this.getAsyncProp(s)}for(const s in n){const o=n[s];this._createAsyncPropData(s,r[s]),this._updateAsyncProp(s,o)}}_fetch(e,t){return null}_onResolve(e,t){}_onError(e,t){}_updateAsyncProp(e,t){if(this._didAsyncInputValueChange(e,t)){if(typeof t=="string"&&(t=this._fetch(e,t)),t instanceof Promise){this._watchPromise(e,t);return}if(Tg(t)){this._resolveAsyncIterable(e,t);return}this._setPropValue(e,t)}}_freezeAsyncOldProps(){if(!this.oldAsyncProps&&this.oldProps){this.oldAsyncProps=Object.create(this.oldProps);for(const e in this.asyncProps)Object.defineProperty(this.oldAsyncProps,e,{enumerable:!0,value:this.oldProps[e]})}}_didAsyncInputValueChange(e,t){const n=this.asyncProps[e];return t===n.resolvedValue||t===n.lastValue?!1:(n.lastValue=t,!0)}_setPropValue(e,t){this._freezeAsyncOldProps();const n=this.asyncProps[e];n&&(t=this._postProcessValue(n,t),n.resolvedValue=t,n.pendingLoadCount++,n.resolvedLoadCount=n.pendingLoadCount)}_setAsyncPropValue(e,t,n){const r=this.asyncProps[e];r&&n>=r.resolvedLoadCount&&t!==void 0&&(this._freezeAsyncOldProps(),r.resolvedValue=t,r.resolvedLoadCount=n,this.onAsyncPropUpdated(e,t))}_watchPromise(e,t){const n=this.asyncProps[e];if(n){n.pendingLoadCount++;const r=n.pendingLoadCount;t.then(s=>{this.component&&(s=this._postProcessValue(n,s),this._setAsyncPropValue(e,s,r),this._onResolve(e,s))}).catch(s=>{this._onError(e,s)})}}async _resolveAsyncIterable(e,t){if(e!=="data"){this._setPropValue(e,t);return}const n=this.asyncProps[e];if(!n)return;n.pendingLoadCount++;const r=n.pendingLoadCount;let s=[],o=0;for await(const a of t){if(!this.component)return;const{dataTransform:c}=this.component.props;c?s=c(a,s):s=s.concat(a),Object.defineProperty(s,"__diff",{enumerable:!1,value:[{startRow:o,endRow:s.length}]}),o=s.length,this._setAsyncPropValue(e,s,r)}this._onResolve(e,s)}_postProcessValue(e,t){const n=e.type;return n&&this.component&&(n.release&&n.release(e.resolvedValue,n,this.component),n.transform)?n.transform(t,n,this.component):t}_createAsyncPropData(e,t){if(!this.asyncProps[e]){const r=this.component&&this.component.props[ht];this.asyncProps[e]={type:r&&r[e],lastValue:null,resolvedValue:t,pendingLoadCount:0,resolvedLoadCount:0}}}}class jA extends VA{constructor({attributeManager:e,layer:t}){super(t),this.attributeManager=e,this.needsRedraw=!0,this.needsUpdate=!0,this.subLayers=null,this.usesPickingColorCache=!1,this.disabledPickingIndices=[]}get layer(){return this.component}_fetch(e,t){const n=this.layer,r=n==null?void 0:n.props.fetch;return r?r(t,{propName:e,layer:n}):super._fetch(e,t)}_onResolve(e,t){const n=this.layer;if(n){const r=n.props.onDataLoad;e==="data"&&r&&r(t,{propName:e,layer:n})}}_onError(e,t){const n=this.layer;n&&n.raiseError(t,`loading ${e} of ${this.layer}`)}}const WA="layer.changeFlag",HA="layer.initialize",YA="layer.update",qA="layer.finalize",ZA="layer.matched",Bf=2**24-1,XA=Object.freeze([]),KA=Pn(({oldViewport:i,viewport:e})=>i.equals(e));let Se=new Uint8ClampedArray(0);function kf(i){return i.rowIndexes||i.pickingColors||i.instancePickingColors}function Lo(i){return i.rowIndexes}function To(i){return i.pickingColors||i.instancePickingColors}const QA={data:{type:"data",value:XA,async:!0},dataComparator:{type:"function",value:null,optional:!0},_dataDiff:{type:"function",value:i=>i&&i.__diff,optional:!0},dataTransform:{type:"function",value:null,optional:!0},onDataLoad:{type:"function",value:null,optional:!0},onError:{type:"function",value:null,optional:!0},fetch:{type:"function",value:(i,{propName:e,layer:t,loaders:n,loadOptions:r,signal:s})=>{var c;const{resourceManager:o}=t.context;r=r||t.getLoadOptions(),n=n||t.props.loaders,s&&(r={...r,core:{...r==null?void 0:r.core,fetch:{...(c=r==null?void 0:r.core)==null?void 0:c.fetch,signal:s}}});let a=o.contains(i);return!a&&!r&&(o.add({resourceId:i,data:zo(i,n),persistent:!1}),a=!0),a?o.subscribe({resourceId:i,onChange:l=>{var u;return(u=t.internalState)==null?void 0:u.reloadAsyncProp(e,l)},consumerId:t.id,requestId:e}):zo(i,n,r)}},updateTriggers:{},visible:!0,pickable:!1,opacity:{type:"number",min:0,max:1,value:1},operation:"draw",onHover:{type:"function",value:null,optional:!0},onClick:{type:"function",value:null,optional:!0},onDragStart:{type:"function",value:null,optional:!0},onDrag:{type:"function",value:null,optional:!0},onDragEnd:{type:"function",value:null,optional:!0},coordinateSystem:"default",coordinateOrigin:{type:"array",value:[0,0,0],compare:!0},modelMatrix:{type:"array",value:null,compare:!0,optional:!0},wrapLongitude:!1,positionFormat:"XYZ",colorFormat:"RGBA",parameters:{type:"object",value:{},optional:!0,compare:2},loadOptions:{type:"object",value:null,optional:!0,ignore:!0},transitions:null,extensions:[],loaders:{type:"array",value:[],optional:!0,ignore:!0},getPolygonOffset:{type:"function",value:({layerIndex:i})=>[0,-i*100]},highlightedObjectIndex:null,autoHighlight:!1,highlightColor:{type:"accessor",value:[0,0,128,128]}};class Ti extends Ts{constructor(){super(...arguments),this.internalState=null,this.lifecycle=Xt.NO_STATE,this.parent=null}static get componentName(){return Object.prototype.hasOwnProperty.call(this,"layerName")?this.layerName:""}get root(){let e=this;for(;e.parent;)e=e.parent;return e}toString(){return`${this.constructor.layerName||this.constructor.name}({id: '${this.props.id}'})`}project(e){Q(this.internalState);const t=this.internalState.viewport||this.context.viewport,n=Nc(e,{viewport:t,modelMatrix:this.props.modelMatrix,coordinateOrigin:this.props.coordinateOrigin,coordinateSystem:this.props.coordinateSystem}),[r,s,o]=Bc(n,t.pixelProjectionMatrix);return e.length===2?[r,s]:[r,s,o]}unproject(e){return Q(this.internalState),(this.internalState.viewport||this.context.viewport).unproject(e)}projectPosition(e,t){Q(this.internalState);const n=this.internalState.viewport||this.context.viewport;return kS(e,{viewport:n,modelMatrix:this.props.modelMatrix,coordinateOrigin:this.props.coordinateOrigin,coordinateSystem:this.props.coordinateSystem,...t})}get isComposite(){return!1}get isDrawable(){return!0}setState(e){this.setChangeFlags({stateChanged:!0}),Object.assign(this.state,e),this.setNeedsRedraw()}setNeedsRedraw(){this.internalState&&(this.internalState.needsRedraw=!0)}setNeedsUpdate(){this.internalState&&(this.context.layerManager.setNeedsUpdate(String(this)),this.internalState.needsUpdate=!0)}get isLoaded(){return this.internalState?!this.internalState.isAsyncPropLoading():!1}get wrapLongitude(){return this.props.wrapLongitude}isPickable(){return this.props.pickable&&this.props.visible}getModels(){const e=this.state;return e&&(e.models||e.model&&[e.model])||[]}setShaderModuleProps(...e){for(const t of this.getModels())t.shaderInputs.setProps(...e)}getAttributeManager(){return this.internalState&&this.internalState.attributeManager}getCurrentLayer(){return this.internalState&&this.internalState.layer}getLoadOptions(){return this.props.loadOptions}use64bitPositions(){const{coordinateSystem:e}=this.props;return e==="default"||e==="lnglat"||e==="cartesian"}onHover(e,t){return this.props.onHover&&this.props.onHover(e,t)||!1}onClick(e,t){return this.props.onClick&&this.props.onClick(e,t)||!1}nullPickingColor(){return[0,0,0]}encodePickingColor(e,t=[]){return t[0]=e+1&255,t[1]=e+1>>8&255,t[2]=e+1>>8>>8&255,t}decodePickingColor(e){Q(e instanceof Uint8Array);const[t,n,r]=e;return t+n*256+r*65536-1}getNumInstances(){return Number.isFinite(this.props.numInstances)?this.props.numInstances:this.state&&this.state.numInstances!==void 0?this.state.numInstances:EA(this.props.data)}getStartIndices(){return this.props.startIndices?this.props.startIndices:this.state&&this.state.startIndices?this.state.startIndices:null}getBounds(){var e;return(e=this.getAttributeManager())==null?void 0:e.getBounds(["positions","instancePositions"])}getShaders(e){e=Of(e,{disableWarnings:!0,modules:this.context.defaultShaderModules});for(const t of this.props.extensions)e=Of(e,t.getShaders.call(this,t));return e}shouldUpdateState(e){return e.changeFlags.propsOrDataChanged}updateState(e){const t=this.getAttributeManager(),{dataChanged:n}=e.changeFlags;if(n&&t)if(Array.isArray(n))for(const r of n)t.invalidateAll(r);else t.invalidateAll();if(t){const{props:r}=e,s=this.internalState.hasPickingBuffer,o=Number.isInteger(r.highlightedObjectIndex)||!!r.pickable||r.extensions.some(a=>a.getNeedsPickingBuffer.call(this,a));if(s!==o){this.internalState.hasPickingBuffer=o;const a=kf(t.attributes);a&&(o&&a.constant&&(a.constant=!1,t.invalidate(a.id)),!a.value&&!o&&(a.constant=!0,a.value=Lo(t.attributes)?[zr]:[0,0,0]))}}}finalizeState(e){for(const n of this.getModels())n.destroy();const t=this.getAttributeManager();t&&t.finalize(),this.context&&this.context.resourceManager.unsubscribe({consumerId:this.id}),this.internalState&&(this.internalState.uniformTransitions.clear(),this.internalState.finalize())}draw(e){for(const t of this.getModels())t.draw(e.renderPass)}getPickingInfo({info:e,mode:t,sourceLayer:n}){const{index:r}=e;return r>=0&&Array.isArray(this.props.data)&&(e.object=this.props.data[r]),e}raiseError(e,t){var n,r,s,o;t&&(e=new Error(`${t}: ${e.message}`,{cause:e})),(r=(n=this.props).onError)!=null&&r.call(n,e)||(o=(s=this.context)==null?void 0:s.onError)==null||o.call(s,e,this)}getNeedsRedraw(e={clearRedrawFlags:!1}){return this._getNeedsRedraw(e)}needsUpdate(){return this.internalState?this.internalState.needsUpdate||this.hasUniformTransition()||this.shouldUpdateState(this._getUpdateParams()):!1}hasUniformTransition(){var e;return((e=this.internalState)==null?void 0:e.uniformTransitions.active)||!1}activateViewport(e){if(!this.internalState)return;const t=this.internalState.viewport;this.internalState.viewport=e,(!t||!KA({oldViewport:t,viewport:e}))&&(this.setChangeFlags({viewportChanged:!0}),this.isComposite?this.needsUpdate()&&this.setNeedsUpdate():this._update())}invalidateAttribute(e="all"){const t=this.getAttributeManager();t&&(e==="all"?t.invalidateAll():t.invalidate(e))}updateAttributes(e){let t=!1;for(const n in e)e[n].layoutChanged()&&(t=!0);for(const n of this.getModels())this._setModelAttributes(n,e,t)}_updateAttributes(){const e=this.getAttributeManager();if(!e)return;const t=this.props,n=this.getNumInstances(),r=this.getStartIndices();e.update({data:t.data,numInstances:n,startIndices:r,props:t,transitions:t.transitions,buffers:t.data.attributes,context:this});const s=e.getChangedAttributes({clearChangedFlags:!0});this.updateAttributes(s)}_updateAttributeTransition(){const e=this.getAttributeManager();e&&e.updateTransition()}_updateUniformTransition(){const{uniformTransitions:e}=this.internalState;if(e.active){const t=e.update(),n=Object.create(this.props);for(const r in t)Object.defineProperty(n,r,{value:t[r]});return n}return this.props}calculateInstancePickingColors(e,{numInstances:t}){if(e.constant)return;const n=Math.floor(Se.length/4);this.internalState.usesPickingColorCache=!0;const r=t>0&&Se[0]===0;if(n<t||r){t>Bf&&q.warn("Layer has too many data objects. Picking might not be able to distinguish all objects.")(),Se=pi.allocate(Se,t,{size:4,copy:!0,maxCount:Math.max(t,Bf)});const s=Math.floor(Se.length/4),o=[0,0,0],a=r?0:n;for(let c=a;c<s;c++)this.encodePickingColor(c,o),Se[c*4+0]=o[0],Se[c*4+1]=o[1],Se[c*4+2]=o[2],Se[c*4+3]=0}e.value=Se.subarray(0,t*4)}_setModelAttributes(e,t,n=!1){var c;if(!Object.keys(t).length)return;const r=this.getAttributeManager();if(r!=null&&r.hasBufferGroups()){this._setGroupedModelAttributes(e,r,t);return}if(n){const l=this.getAttributeManager();e.setBufferLayout(l.getBufferLayouts(e)),t=l.getAttributes()}const s=((c=e.userData)==null?void 0:c.excludeAttributes)||{},o={},a={};for(const l in t){if(s[l])continue;const u=t[l].getValue();for(const f in u){const h=u[f];h instanceof j?t[l].settings.isIndexed?e.setIndexBuffer(h):o[f]=h:h&&(a[f]=h)}}e.setAttributes(o),e.setConstantAttributes(a)}_setGroupedModelAttributes(e,t,n){var l;const r=((l=e.userData)==null?void 0:l.excludeAttributes)||{},s=t.getBufferGroupBindings(n,e,r);e.setBufferLayout(s.bufferLayouts);const o={...s.buffers},a={},c=t.getAttributes();for(const u in c){if(r[u]||s.groupedAttributeIds.has(u))continue;const f=c[u],h=f.getValue();for(const g in h){const p=h[g];p instanceof j?f.settings.isIndexed?e.setIndexBuffer(p):o[g]=p:p&&(a[g]=p)}}e.setAttributes(o),e.setConstantAttributes(a)}disablePickingIndex(e){const t=this.props.data;if(!("attributes"in t)){this._disablePickingIndex(e);return}const n=this.getAttributeManager().attributes,r=Lo(n),s=To(n),o=r&&t.attributes&&t.attributes[r.id];if(o&&o.value){const c=o.value;for(let l=0;l<t.length;l++){const u=r.getVertexOffset(l);c[u]===e&&this._disablePickingIndex(l)}return}const a=s&&t.attributes&&t.attributes[s.id];if(a&&a.value){const c=a.value,l=this.encodePickingColor(e);for(let u=0;u<t.length;u++){const f=s.getVertexOffset(u);c[f]===l[0]&&c[f+1]===l[1]&&c[f+2]===l[2]&&this._disablePickingIndex(u)}}else this._disablePickingIndex(e)}_disablePickingIndex(e){const t=this.getAttributeManager().attributes,n=Lo(t);if(n){const a=n.getVertexOffset(e),c=n.getVertexOffset(e+1),l=new Uint32Array(c-a);l.fill(zr),n.buffer.write(l,a*l.BYTES_PER_ELEMENT);return}const r=To(t);if(!r){this.internalState&&nS(this.internalState.disabledPickingIndices,e);return}const s=r.getVertexOffset(e),o=r.getVertexOffset(e+1);r.buffer.write(new Uint8Array(o-s),s)}restorePickingColors(){const e=this.getAttributeManager().attributes,t=kf(e);if(!t){this.internalState&&(this.internalState.disabledPickingIndices.length=0);return}const n=To(e);this.internalState.usesPickingColorCache&&n&&n.value.buffer!==Se.buffer&&(n.value=Se.subarray(0,n.value.length)),t.updateSubBuffer({startOffset:0})}_initialize(){Q(!this.internalState),_e(HA,this);const e=this._getAttributeManager();this.internalState=new jA({attributeManager:e,layer:this}),this._clearChangeFlags(),this.state={},Object.defineProperty(this.state,"attributeManager",{get:()=>(q.deprecated("layer.state.attributeManager","layer.getAttributeManager()")(),e)}),this.internalState.uniformTransitions=new pA(this.context.timeline),this.internalState.onAsyncPropUpdated=this._onAsyncPropUpdated.bind(this),this.internalState.setAsyncProps(this.props),this.initializeState(this.context);for(const t of this.props.extensions)t.initializeState.call(this,this.context,t);this.setChangeFlags({dataChanged:"init",propsChanged:"init",viewportChanged:!0,extensionsChanged:!0}),this._update()}_transferState(e){_e(ZA,this,this===e);const{state:t,internalState:n}=e;this!==e&&(this.internalState=n,this.state=t,this.internalState.setAsyncProps(this.props),this._diffProps(this.props,this.internalState.getOldProps()))}_update(){const e=this.needsUpdate();if(_e(YA,this,e),!e)return;this.context.stats.get("Layer updates").incrementCount();const t=this.props,n=this.context,r=this.internalState,s=n.viewport,o=this._updateUniformTransition();r.propsInTransition=o,n.viewport=r.viewport||s,this.props=o;try{const a=this._getUpdateParams(),c=this.getModels();if(n.device)this.updateState(a);else try{this.updateState(a)}catch{}for(const u of this.props.extensions)u.updateState.call(this,a,u);this.setNeedsRedraw(),this._updateAttributes();const l=this.getModels()[0]!==c[0];this._postUpdate(a,l)}finally{n.viewport=s,this.props=t,this._clearChangeFlags(),r.needsUpdate=!1,r.resetOldProps()}}_finalize(){_e(qA,this),this.finalizeState(this.context);for(const e of this.props.extensions)e.finalizeState.call(this,this.context,e)}_drawLayer({renderPass:e,shaderModuleProps:t=null,uniforms:n={},parameters:r={}}){this._updateAttributeTransition();const s=this.props,o=this.context;this.props=this.internalState.propsInTransition||s;try{t&&this.setShaderModuleProps(t);const{getPolygonOffset:a}=this.props,c=a&&a(n)||[0,0];o.device instanceof Ct&&o.device.setParametersWebGL({polygonOffset:c});const l=o.device instanceof Ct?null:JA(r);if(eC(this.getModels(),e,r,l),o.device instanceof Ct)o.device.withParametersWebGL(r,()=>{const u={renderPass:e,shaderModuleProps:t,uniforms:n,parameters:r,context:o};for(const f of this.props.extensions)f.draw.call(this,u,f);this.draw(u)});else{l!=null&&l.renderPassParameters&&e.setParameters(l.renderPassParameters);const u={renderPass:e,shaderModuleProps:t,uniforms:n,parameters:r,context:o};for(const f of this.props.extensions)f.draw.call(this,u,f);this.draw(u)}}finally{this.props=s}}getChangeFlags(){var e;return(e=this.internalState)==null?void 0:e.changeFlags}setChangeFlags(e){if(!this.internalState)return;const{changeFlags:t}=this.internalState;for(const r in e)if(e[r]){let s=!1;switch(r){case"dataChanged":const o=e[r],a=t[r];o&&Array.isArray(a)&&(t.dataChanged=Array.isArray(o)?a.concat(o):o,s=!0);default:t[r]||(t[r]=e[r],s=!0)}s&&_e(WA,this,r,e)}const n=!!(t.dataChanged||t.updateTriggersChanged||t.propsChanged||t.extensionsChanged);t.propsOrDataChanged=n,t.somethingChanged=n||t.viewportChanged||t.stateChanged}_clearChangeFlags(){this.internalState.changeFlags={dataChanged:!1,propsChanged:!1,updateTriggersChanged:!1,viewportChanged:!1,stateChanged:!1,extensionsChanged:!1,propsOrDataChanged:!1,somethingChanged:!1}}_diffProps(e,t){var r;const n=_A(e,t);if(n.updateTriggersChanged)for(const s in n.updateTriggersChanged)n.updateTriggersChanged[s]&&this.invalidateAttribute(s);if(n.transitionsChanged)for(const s in n.transitionsChanged)this.internalState.uniformTransitions.add(s,t[s],e[s],(r=e.transitions)==null?void 0:r[s]);return this.setChangeFlags(n)}validateProps(){mA(this.props)}updateAutoHighlight(e){this.props.autoHighlight&&!Number.isInteger(this.props.highlightedObjectIndex)&&this._updateAutoHighlight(e)}_updateAutoHighlight(e){const t={highlightedObjectColor:e.picked?e.color:null},{highlightColor:n}=this.props;e.picked&&typeof n=="function"&&(t.highlightColor=n(e)),this.setShaderModuleProps({picking:t}),this.setNeedsRedraw()}_getAttributeManager(){const e=this.context;return new uA(e.device,{id:this.props.id,stats:e.stats,timeline:e.timeline})}_postUpdate(e,t){const{props:n,oldProps:r}=e,s=this.state.model;s!=null&&s.isInstanced&&s.setInstanceCount(this.getNumInstances());const{autoHighlight:o,highlightedObjectIndex:a,highlightColor:c}=n;if(t||r.autoHighlight!==o||r.highlightedObjectIndex!==a||r.highlightColor!==c){const l={};Array.isArray(c)&&(l.highlightColor=c),(t||r.autoHighlight!==o||a!==r.highlightedObjectIndex)&&(l.highlightedObjectColor=Number.isFinite(a)&&a>=0?this.encodePickingColor(a):null),this.setShaderModuleProps({picking:l})}}_getUpdateParams(){return{props:this.props,oldProps:this.internalState.getOldProps(),context:this.context,changeFlags:this.internalState.changeFlags}}_getNeedsRedraw(e){if(!this.internalState)return!1;let t=!1;t=t||this.internalState.needsRedraw&&this.id;const n=this.getAttributeManager(),r=n?n.getNeedsRedraw(e):!1;if(t=t||r,t)for(const s of this.props.extensions)s.onNeedsRedraw.call(this,s);return this.internalState.needsRedraw=this.internalState.needsRedraw&&!e.clearRedrawFlags,t}_onAsyncPropUpdated(){this._diffProps(this.props,this.internalState.getOldProps()),this.setNeedsUpdate()}}Ti.defaultProps=QA;Ti.layerName="Layer";function JA(i){const{blendConstant:e,...t}=i;return e?{pipelineParameters:t,renderPassParameters:{blendConstant:e}}:{pipelineParameters:t}}function eC(i,e,t,n){for(const r of i)r.device.type==="webgpu"?(tC(r,e),r.setParameters({...r.parameters,...n==null?void 0:n.pipelineParameters})):r.setParameters(t)}function tC(i,e){var o,a;const t=e.props.framebuffer||(e.framebuffer??null);if(!t)return;const n=t.colorAttachments.map(c=>{var l;return((l=c==null?void 0:c.texture)==null?void 0:l.format)??null}),r=(a=(o=t.depthStencilAttachment)==null?void 0:o.texture)==null?void 0:a.format,s=i;(!iC(s.props.colorAttachmentFormats,n)||s.props.depthStencilAttachmentFormat!==r)&&(s.props.colorAttachmentFormats=n,s.props.depthStencilAttachmentFormat=r,s._setPipelineNeedsUpdate("attachment formats"))}function iC(i,e){if(i===e)return!0;if(!i||!e||i.length!==e.length)return!1;for(let t=0;t<i.length;t++)if(i[t]!==e[t])return!1;return!0}const nC="compositeLayer.renderLayers";class Xc extends Ti{get isComposite(){return!0}get isDrawable(){return!1}get isLoaded(){return super.isLoaded&&this.getSubLayers().every(e=>e.isLoaded)}getSubLayers(){return this.internalState&&this.internalState.subLayers||[]}initializeState(e){}setState(e){super.setState(e),this.setNeedsUpdate()}getPickingInfo({info:e}){const{object:t}=e;return t&&t.__source&&t.__source.parent&&t.__source.parent.id===this.id&&(e.object=t.__source.object,e.index=t.__source.index),e}filterSubLayer(e){return!0}shouldRenderSubLayer(e,t){return t&&t.length}getSubLayerClass(e,t){const{_subLayerProps:n}=this.props;return n&&n[e]&&n[e].type||t}getSubLayerRow(e,t,n){return e.__source={parent:this,object:t,index:n},e}getSubLayerAccessor(e){if(typeof e=="function"){const t={index:-1,data:this.props.data,target:[]};return(n,r)=>n&&n.__source?(t.index=n.__source.index,e(n.__source.object,t)):e(n,r)}return e}getSubLayerProps(e={}){var R;const{opacity:t,pickable:n,visible:r,parameters:s,getPolygonOffset:o,highlightedObjectIndex:a,autoHighlight:c,highlightColor:l,coordinateSystem:u,coordinateOrigin:f,wrapLongitude:h,positionFormat:g,modelMatrix:p,extensions:m,fetch:_,operation:y,_subLayerProps:w}=this.props,b={id:"",updateTriggers:{},opacity:t,pickable:n,visible:r,parameters:s,getPolygonOffset:o,highlightedObjectIndex:a,autoHighlight:c,highlightColor:l,coordinateSystem:u,coordinateOrigin:f,wrapLongitude:h,positionFormat:g,modelMatrix:p,extensions:m,fetch:_,operation:y},x=w&&e.id&&w[e.id],S=x&&x.updateTriggers,L=e.id||"sublayer";if(x){const O=this.props[ht],B=e.type?e.type._propTypes:{};for(const k in x){const U=B[k]||O[k];U&&U.type==="accessor"&&(x[k]=this.getSubLayerAccessor(x[k]))}}Object.assign(b,e,x),b.id=`${this.props.id}-${L}`,b.updateTriggers={all:(R=this.props.updateTriggers)==null?void 0:R.all,...e.updateTriggers,...S};for(const O of m){const B=O.getSubLayerProps.call(this,O);B&&Object.assign(b,B,{updateTriggers:Object.assign(b.updateTriggers,B.updateTriggers)})}return b}_updateAutoHighlight(e){for(const t of this.getSubLayers())t.updateAutoHighlight(e)}_getAttributeManager(){return null}_postUpdate(e,t){let n=this.internalState.subLayers;const r=!n||this.needsUpdate();if(r){const s=this.renderLayers();n=_i(s,Boolean),this.internalState.subLayers=n}_e(nC,this,r,n);for(const s of n)s.parent=this}}Xc.layerName="CompositeLayer";const Yt=Math.PI/180,Df=180/Math.PI,rC=1,hr=6370972,ut=256,Ff=.75,Nf=1.15;function Uf(i){const e=mi(i+180,360)-180;return Math.abs(e)<rC}function sC(){const i=ut/hr,e=Math.PI/180*ut;return{unitsPerMeter:[i,i,i],unitsPerMeter2:[0,0,0],metersPerUnit:[1/i,1/i,1/i],unitsPerDegree:[e,e,i],unitsPerDegree2:[0,0,0],degreesPerUnit:[1/e,1/e,1/i]}}class Yg extends Si{constructor(e={}){const{longitude:t=0,bearing:n=0,pitch:r=0,zoom:s=0,nearZMultiplier:o=.5,farZMultiplier:a=1,resolution:c=10}=e;let{latitude:l=0,height:u,altitude:f=1.5,fovy:h}=e;l=Math.max(Math.min(l,90),-90),u=u||1,h?f=Oc(h):h=hn(f);const g=Math.max(Math.min(l,Oe),-Oe),p=Math.pow(2,s-ge(g)),m=r*Yt,_=e.nearZ??o,y=e.farZ??(f+ut*2*p/u/Math.max(Math.cos(m),.1))*a,w=new Ue().lookAt({eye:[0,-f,0],up:[0,0,1]}).rotateX(-m).rotateY(-n*Yt).rotateX(l*Yt).rotateZ(-t*Yt).scale(p/u);super({...e,height:u,viewMatrix:w,longitude:t,latitude:l,zoom:s,distanceScales:sC(),fovy:h,focalDistance:f,near:_,far:y}),this.scale=p,this.latitude=l,this.longitude=t,this.bearing=n,this.pitch=r,this.fovy=h,this.resolution=c}get projectionMode(){return ve.GLOBE}getDistanceScales(){return this.distanceScales}getBounds(e={}){const t={targetZ:e.z||0},n=this.unproject([0,this.height/2],t),r=this.unproject([this.width/2,0],t),s=this.unproject([this.width,this.height/2],t),o=this.unproject([this.width/2,this.height],t);return s[0]<this.longitude&&(s[0]+=360),n[0]>this.longitude&&(n[0]-=360),[Math.min(n[0],s[0],r[0],o[0]),Math.min(n[1],s[1],r[1],o[1]),Math.max(n[0],s[0],r[0],o[0]),Math.max(n[1],s[1],r[1],o[1])]}_getRayToGlobe(e,{topLeft:t=!0,targetZ:n}={}){const[r,s]=e,o=t?s:this.height-s,{pixelUnprojectionMatrix:a}=this,c=Ao(a,[r,o,-1,1]),l=Ao(a,[r,o,1,1]),u=((n||0)/hr+1)*ut,f=Ys(vd([],c,l)),h=Ys(c),g=Ys(l),m=4*((4*h*g-(f-h-g)**2)/16)/f;return{rayStartPosition:c,rayEndPosition:l,radius:u,rayLengthSquared:f,rayStartDistanceSquared:h,distanceToCenterSquared:m}}_getRayDistanceToGlobeCenterRatio(e,t){const{distanceToCenterSquared:n,radius:r}=this._getRayToGlobe(e,t);return Math.sqrt(Math.max(0,n))/r}getZoomAnchorStrength(e){const t=this._getRayDistanceToGlobeCenterRatio(e);if(t>=Nf)return 0;const n=Math.max(0,Math.min(1,(t-Ff)/(Nf-Ff)));return 1-n*n*(3-2*n)}unproject(e,{topLeft:t=!0,targetZ:n}={}){const[r,s,o]=e,a=t?s:this.height-s,{pixelUnprojectionMatrix:c}=this;let l;if(Number.isFinite(o))l=Ao(c,[r,a,o,1]);else{const{rayStartPosition:g,rayEndPosition:p,radius:m,rayLengthSquared:_,rayStartDistanceSquared:y,distanceToCenterSquared:w}=this._getRayToGlobe(e,{topLeft:t,targetZ:n}),b=Math.sqrt(y-w),x=Math.sqrt(Math.max(0,m*m-w)),S=(b-x)/Math.sqrt(_);l=Sw([],g,p,S)}const[u,f,h]=this.unprojectPosition(l);return Number.isFinite(o)?[u,f,h]:Number.isFinite(n)?[u,f,n]:[u,f]}projectPosition(e){const[t,n,r=0]=e,s=t*Yt,o=n*Yt,a=Math.cos(o),c=(r/hr+1)*ut;return[Math.sin(s)*a*c,-Math.cos(s)*a*c,Math.sin(o)*c]}unprojectPosition(e){const[t,n,r]=e,s=Br(e),o=Math.asin(r/s),c=Math.atan2(t,-n)*Df,l=o*Df,u=(s/ut-1)*hr;return[c,l,u]}projectFlat(e){return e}unprojectFlat(e){return e}panByPosition(e,t,n){if(!n){let h=this.getZoomAnchorStrength(t);if(h===0)return{longitude:this.longitude,latitude:this.latitude};const g=this.unproject(t),p=mi(e[0]-g[0]+180,360)-180,m=e[1]-g[1],_=Math.abs(g[1])>Oe||Math.abs(p)>90;if(Uf(this.bearing)&&_)return{longitude:this.longitude,latitude:this.latitude};if(Uf(this.bearing)&&m!==0){const x=((m>0?Oe:-Oe)-this.latitude)/m;h=Math.min(h,Math.max(0,x))}const y=this.longitude+p*h,w=Math.max(Math.min(this.latitude+m*h,90),-90);return{longitude:y,latitude:w}}const[r,s,o]=e,c=.25/Math.pow(2,this.zoom-ge(this.latitude)),l=r+c*(n[0]-t[0]);let u=s-c*(n[1]-t[1]);u=Math.max(Math.min(u,90),-90);const f={longitude:l,latitude:u,zoom:o-ge(s)};return f.zoom+=ge(f.latitude),f}}Yg.displayName="GlobeViewport";function ge(i,e){e&&(i=Math.max(Math.min(i,Oe),-Oe));const t=Math.PI*Math.cos(i*Math.PI/180);return Math.log2(t)}function Ao(i,e){const t=Ei([],e,i);return Lc(t,t,1/t[3]),t}const qt=Math.PI/180,Co=180/Math.PI;class Y{static toPosition(e,t){const n=t*qt,r=e*qt,s=Math.cos(n);return[s*Math.cos(r),s*Math.sin(r),Math.sin(n)]}static toLngLat(e){return[Math.atan2(e[1],e[0])*Co,Math.asin(oe(e[2],-1,1))*Co]}static tangentBasis(e,t){const n=t*qt,r=e*qt,s=Math.sin(n),o=Math.cos(n),a=Math.sin(r),c=Math.cos(r);return{N:[-s*c,-s*a,o],E:[-a,c,0]}}static upVector(e,t,n){const{N:r,E:s}=Y.tangentBasis(e,t),o=n*qt,a=Math.cos(o),c=Math.sin(o);return[r[0]*a+s[0]*c,r[1]*a+s[1]*c,r[2]*a+s[2]*c]}static bearing(e,t,n){const{N:r,E:s}=Y.tangentBasis(t,n);return Math.atan2(Jt(e,s),Jt(e,r))*Co}static cameraFrame(e,t,n){const r=Y.toPosition(e,t),s=Y.upVector(e,t,n),{N:o,E:a}=Y.tangentBasis(e,t),c=n*qt,l=Math.cos(c),u=Math.sin(c),f=[a[0]*l-o[0]*u,a[1]*l-o[1]*u,a[2]*l-o[2]*u];return{position:r,up:s,axisHorizontal:We([],r,f),axisVertical:We([],r,s),longitude:e,latitude:t,bearing:n}}static angularDistance(e,t){const n=Y.toPosition(e.longitude,e.latitude),r=Y.toPosition(t.longitude,t.latitude);return Math.acos(oe(Jt(n,r),-1,1))}static greatCircleAxis(e,t){const n=Y.toPosition(e.longitude,e.latitude),r=Y.toPosition(t.longitude,t.latitude);return ha([],We([],n,r))}static rotate(e,t,n){const r=new vx().fromAxisRotation(t,n);return Pc([],e,r)}static rotateFrame(e,t,n,r){let s=Y.rotate(e.position,e.axisHorizontal,t);s=Y.rotate(s,e.axisVertical,n);let o=Y.rotate(e.up,e.axisHorizontal,t);o=Y.rotate(o,e.axisVertical,n);const[a,c]=Y.toLngLat(s),l=r?0:Y.bearing(o,a,c);return{...e,position:s,up:o,longitude:a,latitude:c,bearing:l}}static rotateFrameToMatch(e,t,n,r=1){const s=Y.toPosition(...t),o=Y.toPosition(...n);let a=We([],s,o);const c=Br(a),l=oe(Jt(s,o),-1,1);if(c<1e-12){if(l>0)return e;a=We([],s,e.up),Br(a)<1e-12&&(a=We([],s,e.axisVertical))}ha(a,a);const u=Math.atan2(c,l)*oe(r,0,1),f=Y.rotate(e.position,a,u),h=Y.rotate(e.up,a,u),[g,p]=Y.toLngLat(f);return{...e,position:f,up:h,longitude:g,latitude:p,bearing:Y.bearing(h,g,p)}}}const oC=1/(1-Math.exp(-5)),aC=i=>(1-Math.exp(-5*i))*oC;class cC extends rg{constructor(e){const t="axis"in e;super({compare:["longitude","latitude"],extract:t?["longitude","latitude","zoom","bearing"]:["longitude","latitude","zoom"],required:["longitude","latitude"]}),t?(this._mode="rotation",this._axis=e.axis,this._totalAngle=e.totalAngle):(this._mode="linear",this._targetLongitude=e.targetLongitude)}initializeProps(e,t){const n=super.initializeProps(e,t);return this._startZoom=e.zoom,this._mode==="rotation"?this._startFrame={...Y.cameraFrame(e.longitude,e.latitude,e.bearing||0),axisHorizontal:this._axis}:n.end.longitude=this._targetLongitude,n}interpolateProps(e,t,n){if(this._mode==="rotation"){const{longitude:a,latitude:c,bearing:l}=Y.rotateFrame(this._startFrame,this._totalAngle*n,0),u=this._startZoom+ge(c,!0)-ge(this._startFrame.latitude,!0);return{bearing:l,longitude:a,latitude:c,zoom:u}}const r=e.longitude+(t.longitude-e.longitude)*n,s=e.latitude+(t.latitude-e.latitude)*n,o=this._startZoom+ge(s,!0)-ge(e.latitude,!0);return{longitude:r,latitude:s,zoom:o}}}const Kt=Math.PI/180,lC=180/Math.PI;function zf(i,e=0){const t=Math.min(180,i)*Kt;return ut*2*Math.sin(t/2)*Math.pow(2,e)}function Zt(i,e=0){const t=i/Math.pow(2,e);return Math.asin(Math.min(1,t/ut/2))*2*lC}class uC extends cg{constructor(e){const{startPanPos:t,startPanCameraFrame:n,startPanAngularRate:r,...s}=e;s.normalize=!1,super(s);const o=this._state;t!==void 0&&(o.startPanPos=t),n!==void 0&&(o.startPanCameraFrame=n),r!==void 0&&(o.startPanAngularRate=r)}panStart({pos:e}){const{latitude:t,longitude:n,zoom:r,bearing:s=0}=this.getViewportProps(),o=Y.cameraFrame(n,t,s),c=.25/Math.pow(2,r-ge(t,!0))*Kt;return this._getUpdatedState({startPanPos:e,startPanCameraFrame:o,startPanAngularRate:c,startZoom:r})}pan({pos:e,startPos:t}){const n=this.getState(),r=n.startPanPos||t;if(!r)return this;const s=n.startPanCameraFrame,o=n.startPanAngularRate,a=n.startZoom??this.getViewportProps().zoom;if(!s||!o)return this;const c=r[0]-e[0],l=r[1]-e[1],u=c*o,f=-l*o,h=Y.rotateFrame(s,u,f),g=a+ge(h.latitude,!0)-ge(s.latitude,!0);return this._getUpdatedState({longitude:h.longitude,latitude:h.latitude,bearing:h.bearing,zoom:g})}panEnd(){return this._getUpdatedState({startPanPos:null,startPanCameraFrame:null,startPanAngularRate:null,startZoom:null})}_panFromCenter(e){const{width:t,height:n}=this.getViewportProps(),r=[t/2,n/2];return this.panStart({pos:r}).pan({pos:[r[0]+e[0],r[1]+e[1]]}).panEnd()}applyConstraints(e){const t=e,n=t[Pt];delete t[Pt];const{latitude:r,maxBounds:s}=e;if(e.zoom=this._constrainZoom(e.zoom,e),n){const a=this.makeViewport(e),c=a.getZoomAnchorStrength(n.screenPosition);if(c>0){const l=a.unproject(n.screenPosition),u=Y.cameraFrame(e.longitude,e.latitude,e.bearing||0),f=Y.rotateFrameToMatch(u,[l[0],l[1]],[n.position[0],n.position[1]],c);e.longitude=f.longitude,e.latitude=f.latitude,e.bearing=f.bearing}}(e.longitude<-180||e.longitude>180)&&(e.longitude=mi(e.longitude+180,360)-180),(e.bearing<-180||e.bearing>180)&&(e.bearing=mi(e.bearing+180,360)-180),e.latitude=oe(e.latitude,-90,90),e.pitch=oe(e.pitch,e.minPitch,e.maxPitch);const o=s?Vr(e.width,e.height,e.maxBoundsPadding):null;if(s&&o&&(o.width>=0&&(e.longitude=oe(e.longitude,s[0][0],s[1][0])),o.height>=0&&(e.latitude=oe(e.latitude,s[0][1],s[1][1]))),s&&o){const a=this.makeViewport({...e,bearing:0,pitch:0}),c=og(a,[e.longitude,e.latitude],o),l=e.zoom-ge(r),u=s[1][0]-s[0][0],f=s[1][1]-s[0][1];if(o.height>=0&&f>0&&f<180){const h=Math.min(Zt(o.height,l),f),g=o.height?h*c.bottom/o.height:Zt(c.bottom,l),p=o.height?h*c.top/o.height:Zt(c.top,l);e.latitude=oe(e.latitude,s[0][1]+g,s[1][1]-p)}if(o.width>=0&&u>0&&u<360){const h=Math.min(Zt(o.width/Math.cos(e.latitude*Kt),l),u),g=o.width?h*c.left/o.width:Zt(c.left/Math.cos(e.latitude*Kt),l),p=o.width?h*c.right/o.width:Zt(c.right/Math.cos(e.latitude*Kt),l);e.longitude=oe(e.longitude,s[0][0]+g,s[1][0]-p)}}return e.latitude=oe(e.latitude,-90,90),e.latitude!==r&&(e.zoom+=ge(e.latitude,!0)-ge(r,!0)),e}_constrainZoom(e,t){t||(t=this.getViewportProps());const{maxZoom:n,maxBounds:r}=t;let{minZoom:s}=t;if(r!==null&&t.width>0&&t.height>0){const c=Vr(t.width,t.height,t.maxBoundsPadding),l=r[0][1],u=r[1][1],f=Math.sign(l)===Math.sign(u)?Math.min(Math.abs(l),Math.abs(u)):0,h=ge(0),g=zf(r[1][0]-r[0][0])*Math.cos(f*Kt),p=zf(r[1][1]-r[0][1]);c.width>0&&g>0&&(s=Math.max(s,Math.log2(c.width/g)+h)),c.height>0&&p>0&&(s=Math.max(s,Math.log2(c.height/p)+h)),s>n&&(s=n)}const a=ge(t.latitude,!0)-ge(0,!0);return oe(e,s+a,n+a)}}class fC extends sg{constructor(){super(...arguments),this.ControllerState=uC,this.transition={transitionDuration:300,transitionInterpolator:new zc({transitionProps:{compare:["longitude","latitude","zoom","bearing","pitch"],required:["longitude","latitude","zoom"]}})},this.dragMode="pan",this._panHistory=[]}_onPanStart(e){return this._panHistory=[],super._onPanStart(e)}_onMultiPanStart(e){return this._panHistory=[],super._onMultiPanStart(e)}_onPanMove(e){if(!this.dragPan)return!1;const t=this.getCenter(e),n=this.controllerState.pan({pos:t});this.updateViewport(n,{transitionDuration:0},{isDragging:!0,isPanning:!0});const{longitude:r,latitude:s}=n.getViewportProps();return this._panHistory.push({longitude:r,latitude:s,timestamp:Date.now()}),this._panHistory.length>5&&this._panHistory.shift(),!0}_onPanMoveEnd(e){const{inertia:t}=this;if(this.dragPan&&t&&this._panHistory.length>=2){const r=this._panHistory[0],s=this._panHistory[this._panHistory.length-1],o=s.timestamp-r.timestamp;if(o>0){const a=this.controllerState.getViewportProps(),l=Y.angularDistance(r,s)/o;if(l>1e-6){const u=l*t/2,f=Y.greatCircleAxis(r,s),h=Y.cameraFrame(a.longitude,a.latitude,a.bearing||0),g=Y.rotateFrame({...h,axisHorizontal:f},u,0),p=g.longitude,m=oe(g.latitude,-90,90),_=new cC({axis:f,totalAngle:u}),y=this.controllerState.panEnd();return this.updateViewport(y,{transitionInterpolator:_,transitionDuration:t,transitionEasing:aC,longitude:p,latitude:m},{isDragging:!1,isPanning:!0}),this._panHistory=[],!0}}}this._panHistory=[];const n=this.controllerState.panEnd();return this.updateViewport(n,null,{isDragging:!1,isPanning:!1}),!0}}const hC={cullMode:"back"};class qg extends ng{constructor(e={}){super({...e,parameters:{...hC,...e.parameters}})}getViewportType(e){return e.zoom>12?it:Yg}get ControllerType(){return fC}}qg.displayName="GlobeView";class Zg{constructor(e){this.indexStarts=[0],this.vertexStarts=[0],this.vertexCount=0,this.instanceCount=0;const{attributes:t={}}=e;this.typedArrayManager=pi,this.attributes={},this._attributeDefs=t,this.opts=e,this.updateGeometry(e)}updateGeometry(e){Object.assign(this.opts,e);const{data:t,buffers:n={},getGeometry:r,geometryBuffer:s,positionFormat:o,dataChanged:a,normalize:c=!0}=this.opts;if(this.data=t,this.getGeometry=r,this.positionSize=s&&s.size||(o==="XY"?2:3),this.buffers=n,this.normalize=c,s&&(Q(t.startIndices),this.getGeometry=this.getGeometryFromBuffer(s),c||(n.vertexPositions=s)),this.geometryBuffer=n.vertexPositions,Array.isArray(a))for(const l of a)this._rebuildGeometry(l);else this._rebuildGeometry()}updatePartialGeometry({startRow:e,endRow:t}){this._rebuildGeometry({startRow:e,endRow:t})}getGeometryFromBuffer(e){const t=e.value||e;return ArrayBuffer.isView(t)?Ag(t,{size:this.positionSize,offset:e.offset,stride:e.stride,startIndices:this.data.startIndices}):null}_allocate(e,t){const{attributes:n,buffers:r,_attributeDefs:s,typedArrayManager:o}=this;for(const a in s)if(a in r)o.release(n[a]),n[a]=null;else{const c=s[a];c.copy=t,n[a]=o.allocate(n[a],e,c)}}_forEachGeometry(e,t,n){const{data:r,getGeometry:s}=this,{iterable:o,objectInfo:a}=Ls(r,t,n);for(const c of o){a.index++;const l=s?s(c,a):null;e(l,a.index)}}_rebuildGeometry(e){if(!this.data)return;let{indexStarts:t,vertexStarts:n,instanceCount:r}=this;const{data:s,geometryBuffer:o}=this,{startRow:a=0,endRow:c=1/0}=e||{},l={};if(e||(t=[0],n=[0]),this.normalize||!o)this._forEachGeometry((f,h)=>{const g=f&&this.normalizeGeometry(f);l[h]=g,n[h+1]=n[h]+(g?this.getGeometrySize(g):0)},a,c),r=n[n.length-1];else if(n=s.startIndices,r=n[s.length]||0,ArrayBuffer.isView(o))r=r||o.length/this.positionSize;else if(o instanceof j){const f=this.positionSize*4;r=r||o.byteLength/f}else if(o.buffer){const f=o.stride||this.positionSize*4;r=r||o.buffer.byteLength/f}else if(o.value){const f=o.value,h=o.stride/f.BYTES_PER_ELEMENT||this.positionSize;r=r||f.length/h}this._allocate(r,!!e),this.indexStarts=t,this.vertexStarts=n,this.instanceCount=r;const u={};this._forEachGeometry((f,h)=>{const g=l[h]||f;u.vertexStart=n[h],u.indexStart=t[h];const p=h<n.length-1?n[h+1]:r;u.geometrySize=p-n[h],u.geometryIndex=h,this.updateGeometryAttributes(g,u)},a,c),this.vertexCount=t[t.length-1]}}class dC{constructor(e){Q(e.id,"id is required"),this.id=e.id,this.type="custom",this.renderingMode=e.renderingMode||"3d",this.slot=e.slot,this.beforeId=e.beforeId,this.map=null}onAdd(e,t){this.map=e}render(e,t){this.map&&bC(this.map.__deck,this.map,this,t)}}const Mo="__UNDEFINED__";function en(i){return i.props.beforeId?`deck-layer-group-before:${i.props.beforeId}`:i.props.slot?`deck-layer-group-slot:${i.props.slot}`:"deck-layer-group-last"}function gC(i,e,t){if(!i||!i.style||!i.style._loaded)return;const n=_i(t,Boolean);if(e!==t){const o=_i(e,Boolean),a=new Set(o.map(l=>en(l))),c=new Set(n.map(l=>en(l)));for(const l of a)c.has(l)||i.getLayer(l)&&i.removeLayer(l)}const r={};for(const o of n){const a=en(o),c=i.getLayer(a);if(c){const l=c.implementation||c;r[a]=l}else{const l=new dC({id:a,slot:o.props.slot,beforeId:o.props.beforeId});r[a]=l,i.addLayer(l,o.props.beforeId)}}const s=i.style._order;for(const[o,a]of Object.entries(r)){const c=a.beforeId||Mo,l=c===Mo?s.length:s.indexOf(c);if(l===-1)continue;if(s.indexOf(o)!==l-1){const f=c===Mo?void 0:c;i.moveLayer(o,f)}}}const bi="mapbox",Io=512,pC=Math.PI/180;function mC({map:i,deck:e}){if(i.__deck)return i.__deck;const t=e.props._customRender,n=e.props.onLoad,r={...e.props,_customRender:()=>{i.triggerRepaint(),t==null||t("")}};return r.views||(r.views=Yr(i)),Object.assign(r,{width:null,height:null,touchAction:"unset",viewState:pn(i)}),e.isInitialized?$f(e,i):r.onLoad=()=>{n==null||n(),$f(e,i)},e.setProps(r),i.__deck=e,i.on("render",()=>{e.isInitialized&&vC(e,i)}),e}function $f(i,e){const t=()=>{i.isInitialized?wC(i,e):e.off("move",t)};e.on("move",t)}function _C(i){var e;(e=i.__deck)==null||e.finalize(),i.__deck=null}function Ro(i,e){return e?{depthWriteEnabled:!0,depthCompare:"less-equal",depthBias:0,blend:!0,blendColorSrcFactor:"src-alpha",blendColorDstFactor:"one-minus-src-alpha",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one-minus-src-alpha",blendColorOperation:"add",blendAlphaOperation:"add"}:{}}function bC(i,e,t,n){if(!i.isInitialized)return;let{currentViewport:r}=i.userData,s=!1;r||(r=Kg(i,e,n),i.userData.currentViewport=r,s=!0),r&&i._drawLayers("mapbox-repaint",{viewports:[r],layerFilter:o=>{if(i.props.layerFilter&&!i.props.layerFilter(o))return!1;const a=o.layer;return a.props.beforeId===t.beforeId&&a.props.slot===t.slot},clearStack:s,clearCanvas:!1})}function Xg(i){var n;const e=(n=i.getProjection)==null?void 0:n.call(i),t=(e==null?void 0:e.type)||(e==null?void 0:e.name);if(t==="globe")return"globe";if(t&&t!=="mercator")throw new Error("Unsupported projection");return"mercator"}function Yr(i){return Xg(i)==="globe"?new qg({id:bi}):new $c({id:bi})}function pn(i){var r;const{lng:e,lat:t}=i.getCenter(),n={longitude:(e+540)%360-180,latitude:t,zoom:i.getZoom(),bearing:i.getBearing(),pitch:i.getPitch(),padding:i.getPadding(),repeat:i.getRenderWorldCopies()};return(r=i.getTerrain)!=null&&r.call(i)&&yC(i,n),n}function yC(i,e){if(i.getFreeCameraOptions){const{position:t}=i.getFreeCameraOptions();if(!t||t.z===void 0)return;const n=i.transform.height,{longitude:r,latitude:s,pitch:o}=e,a=t.x*Io,c=(1-t.y)*Io,l=t.z*Io,u=Ot([r,s]),f=a-u[0],h=c-u[1],g=Math.sqrt(f*f+h*h),p=o*pC,m=1.5*n,_=p<.001?m*Math.cos(p)/l:m*Math.sin(p)/g;e.zoom=Math.log2(_);const y=m*Math.cos(p)/_,w=l-y;e.position=[0,0,w/or(s)]}else typeof i.transform.elevation=="number"&&(e.position=[0,0,i.transform.elevation])}function Kg(i,e,t){const n=pn(e),r=i.getView(bi)||Yr(e);t&&(r.props.nearZMultiplier=.2);const s=(t==null?void 0:t.nearZ)??e.transform._nearZ,o=(t==null?void 0:t.farZ)??e.transform._farZ;return Number.isFinite(s)&&(n.nearZ=s/e.transform.height,n.farZ=o/e.transform.height),r.makeViewport({width:i.width,height:i.height,viewState:n})}function vC(i,e){var a,c,l,u;const n=_i(i.props.layers,Boolean).some(f=>f&&!e.getLayer(en(f)));let r=i.getViewports();const s=r.findIndex(f=>f.id===bi),o=r.length>1||s<0;if(n||o){if(s>=0){r=r.slice();const f=Kg(i,e);f?r[s]=f:r.splice(s,1)}i._drawLayers("mapbox-repaint",{viewports:r,layerFilter:f=>(!i.props.layerFilter||i.props.layerFilter(f))&&(f.viewport.id!==bi||!e.getLayer(en(f.layer))),clearCanvas:!1})}else{const f=i.device,h=f==null?void 0:f.gl;(c=(a=i.props).onBeforeRender)==null||c.call(a,{device:f,gl:h}),(u=(l=i.props).onAfterRender)==null||u.call(l,{device:f,gl:h})}i.userData.currentViewport=null}function wC(i,e){i.setProps({viewState:pn(e)}),i.needsRedraw({clearRedrawFlags:!0})}class xC{constructor(e){this._handleStyleChange=()=>{var r;if(this._resolveLayers(this._map,this._deck,this._props.layers,this._props.layers),!this._map)return;Xg(this._map)&&((r=this._deck)==null||r.setProps({views:this._getViews(this._map)}))},this._updateContainerSize=()=>{if(this._map&&this._container){const{clientWidth:n,clientHeight:r}=this._map.getContainer();Object.assign(this._container.style,{width:`${n}px`,height:`${r}px`})}},this._updateViewState=()=>{const n=this._deck,r=this._map;n&&r&&(n.setProps({views:this._getViews(r),viewState:pn(r)}),n.isInitialized&&n.redraw())},this._handleMouseEvent=n=>{const r=this._deck;if(!r||!r.isInitialized)return;const s={type:n.type,offsetCenter:n.point,srcEvent:n},o=this._lastMouseDownPoint;switch(!n.point&&o&&(s.deltaX=n.originalEvent.clientX-o.clientX,s.deltaY=n.originalEvent.clientY-o.clientY,s.offsetCenter={x:o.x+s.deltaX,y:o.y+s.deltaY}),s.type){case"mousedown":r._onPointerDown(s),this._lastMouseDownPoint={...n.point,clientX:n.originalEvent.clientX,clientY:n.originalEvent.clientY};break;case"dragstart":s.type="panstart",r._onEvent(s);break;case"drag":s.type="panmove",r._onEvent(s);break;case"dragend":s.type="panend",r._onEvent(s);break;case"click":s.tapCount=1,r._onEvent(s);break;case"dblclick":s.type="click",s.tapCount=2,r._onEvent(s);break;case"mousemove":s.type="pointermove",r._onPointerMove(s);break;case"mouseout":s.type="pointerleave",r._onPointerMove(s);break;default:return}};const{interleaved:t=!1}=e;this._interleaved=t,this._props=this.filterProps(e)}filterProps(e){const{interleaved:t,useDevicePixels:n,...r}=e;return!this._interleaved&&n!==void 0&&(r.useDevicePixels=n),r}setProps(e){this._interleaved&&e.layers&&this._resolveLayers(this._map,this._deck,this._props.layers,e.layers),Object.assign(this._props,this.filterProps(e)),this._deck&&this._map&&this._deck.setProps({...this._props,views:this._getViews(this._map),parameters:{...Ro(this._map,this._interleaved),...this._props.parameters}})}onAdd(e){return this._map=e,this._interleaved?this._onAddInterleaved(e):this._onAddOverlaid(e)}_onAddOverlaid(e){var n;const t=document.createElement("div");return Object.assign(t.style,{position:"absolute",left:0,top:0,textAlign:"initial",pointerEvents:"none"}),this._container=t,this._deck=new jr({...this._props,parent:t,deviceProps:{...this._props.deviceProps,createCanvasContext:{...typeof((n=this._props.deviceProps)==null?void 0:n.createCanvasContext)=="object"?this._props.deviceProps.createCanvasContext:void 0,pixelSizeSource:"css-dpr"}},parameters:{...Ro(e,!1),...this._props.parameters},views:this._getViews(e),viewState:pn(e)}),e.on("resize",this._updateContainerSize),e.on("render",this._updateViewState),e.on("mousedown",this._handleMouseEvent),e.on("dragstart",this._handleMouseEvent),e.on("drag",this._handleMouseEvent),e.on("dragend",this._handleMouseEvent),e.on("mousemove",this._handleMouseEvent),e.on("mouseout",this._handleMouseEvent),e.on("click",this._handleMouseEvent),e.on("dblclick",this._handleMouseEvent),this._updateContainerSize(),t}_onAddInterleaved(e){const t=e.painter.context.gl;return t instanceof WebGLRenderingContext&&q.warn("Incompatible basemap library. See: https://deck.gl/docs/api-reference/mapbox/overview#compatibility")(),this._deck=mC({map:e,deck:new jr({...this._props,views:this._getViews(e),gl:t,parameters:{...Ro(e,!0),...this._props.parameters}})}),e.on("styledata",this._handleStyleChange),this._resolveLayers(e,this._deck,[],this._props.layers),document.createElement("div")}_resolveLayers(e,t,n,r){gC(e,n,r)}onRemove(){const e=this._map;e&&(this._interleaved?this._onRemoveInterleaved(e):this._onRemoveOverlaid(e)),this._deck=void 0,this._map=void 0,this._container=void 0}_onRemoveOverlaid(e){var t;e.off("resize",this._updateContainerSize),e.off("render",this._updateViewState),e.off("mousedown",this._handleMouseEvent),e.off("dragstart",this._handleMouseEvent),e.off("drag",this._handleMouseEvent),e.off("dragend",this._handleMouseEvent),e.off("mousemove",this._handleMouseEvent),e.off("mouseout",this._handleMouseEvent),e.off("click",this._handleMouseEvent),e.off("dblclick",this._handleMouseEvent),(t=this._deck)==null||t.finalize()}_onRemoveInterleaved(e){e.off("styledata",this._handleStyleChange),this._resolveLayers(e,this._deck,this._props.layers,[]),_C(e)}getDefaultPosition(){return"top-left"}pickObject(e){return Q(this._deck),this._deck.pickObject(e)}pickMultipleObjects(e){return Q(this._deck),this._deck.pickMultipleObjects(e)}pickObjects(e){return Q(this._deck),this._deck.pickObjects(e)}finalize(){this._map&&this._map.removeControl(this)}getCanvas(){return this._map?this._interleaved?this._map.getCanvas():this._deck.getCanvas():null}_getViews(e){if(!this._props.views)return Yr(e);const t=Array.isArray(this._props.views)?this._props.views:[this._props.views];return t.some(r=>r.id===bi)?this._props.views:[Yr(e),...t]}}const Wa=0,Qg=1,PC=`struct ClipUniforms {
  enabled: i32,
  mode: i32,
  bounds: vec4<f32>,
};

@group(2) @binding(auto) var<uniform> clipUniforms: ClipUniforms;

fn clip_isInBounds(coordinates: vec2<f32>) -> bool {
  return coordinates.x >= clipUniforms.bounds.x &&
    coordinates.y >= clipUniforms.bounds.y &&
    coordinates.x < clipUniforms.bounds.z &&
    coordinates.y < clipUniforms.bounds.w;
}

fn clip_filterPosition(position: ptr<function, vec4<f32>>, instanceCoordinates: vec2<f32>) {
  if (
    clipUniforms.enabled != 0 &&
    clipUniforms.mode == ${Qg} &&
    !clip_isInBounds(instanceCoordinates)
  ) {
    *position = vec4<f32>(2.0, 2.0, 2.0, 1.0);
  }
}

fn clip_filterColor(geometryCoordinates: vec2<f32>) {
  if (
    clipUniforms.enabled != 0 &&
    clipUniforms.mode == ${Wa} &&
    !clip_isInBounds(geometryCoordinates)
  ) {
    discard;
  }
}
`,Jg={name:"clip",source:PC,props:{},uniforms:{},bindingLayout:[{name:"clip",group:2}],uniformTypes:{enabled:"i32",mode:"i32",bounds:"vec4<f32>"},defaultUniforms:{enabled:0,mode:Wa,bounds:[0,0,1,1]},getUniforms(i={}){const e={};return i.enabled!==void 0&&(e.enabled=i.enabled?1:0),i.mode!==void 0&&(e.mode=i.mode==="instance"?Qg:Wa),i.bounds!==void 0&&(e.bounds=i.bounds),e}},Kc={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function Qc(i,e,t={}){return EC(i,t)!==e?(LC(i,t),!0):!1}function EC(i,e={}){return Math.sign(SC(i,e))}const Gf={x:0,y:1,z:2};function SC(i,e={}){const{start:t=0,end:n=i.length,plane:r="xy"}=e,s=e.size||2;let o=0;const a=Gf[r[0]],c=Gf[r[1]];for(let l=t,u=n-s;l<n;l+=s)o+=(i[l+a]-i[u+a])*(i[l+c]+i[u+c]),u=l;return o/2}function LC(i,e){const{start:t=0,end:n=i.length,size:r=2}=e,s=(n-t)/r,o=Math.floor(s/2);for(let a=0;a<o;++a){const c=t+a*r,l=t+(s-1-a)*r;for(let u=0;u<r;++u){const f=i[c+u];i[c+u]=i[l+u],i[l+u]=f}}}function De(i,e){const t=e.length,n=i.length;if(n>0){let r=!0;for(let s=0;s<t;s++)if(i[n-t+s]!==e[s]){r=!1;break}if(r)return!1}for(let r=0;r<t;r++)i[n+r]=e[r];return!0}function Ha(i,e){const t=e.length;for(let n=0;n<t;n++)i[n]=e[n]}function mn(i,e,t,n,r=[]){const s=n+e*t;for(let o=0;o<t;o++)r[o]=i[s+o];return r}function Ya(i,e,t,n,r=[]){let s,o;if(t&8)s=(n[3]-i[1])/(e[1]-i[1]),o=3;else if(t&4)s=(n[1]-i[1])/(e[1]-i[1]),o=1;else if(t&2)s=(n[2]-i[0])/(e[0]-i[0]),o=2;else if(t&1)s=(n[0]-i[0])/(e[0]-i[0]),o=0;else return null;for(let a=0;a<i.length;a++)r[a]=(o&1)===a?n[o]:s*(e[a]-i[a])+i[a];return r}function dr(i,e){let t=0;return i[0]<e[0]?t|=1:i[0]>e[2]&&(t|=2),i[1]<e[1]?t|=4:i[1]>e[3]&&(t|=8),t}function ep(i,e){const{size:t=2,broken:n=!1,gridResolution:r=10,gridOffset:s=[0,0],startIndex:o=0,endIndex:a=i.length}=e||{},c=(a-o)/t;let l=[];const u=[l],f=mn(i,0,t,o);let h,g;const p=ip(f,r,s,[]),m=[];De(l,f);for(let _=1;_<c;_++){for(h=mn(i,_,t,o,h),g=dr(h,p);g;){Ya(f,h,g,p,m);const y=dr(m,p);y&&(Ya(f,m,y,p,m),g=y),De(l,m),Ha(f,m),AC(p,r,g),n&&l.length>t&&(l=[],u.push(l),De(l,f)),g=dr(h,p)}De(l,h),Ha(f,h)}return n?u:u[0]}const Vf=0,TC=1;function tp(i,e=null,t){if(!i.length)return[];const{size:n=2,gridResolution:r=10,gridOffset:s=[0,0],edgeTypes:o=!1}=t||{},a=[],c=[{pos:i,types:o?new Array(i.length/n).fill(TC):null,holes:e||[]}],l=[[],[]];let u=[];for(;c.length;){const{pos:f,types:h,holes:g}=c.shift();CC(f,n,g[0]||f.length,l),u=ip(l[0],r,s,u);const p=dr(l[1],u);if(p){let m=jf(f,h,n,0,g[0]||f.length,u,p);const _={pos:m[0].pos,types:m[0].types,holes:[]},y={pos:m[1].pos,types:m[1].types,holes:[]};c.push(_,y);for(let w=0;w<g.length;w++)m=jf(f,h,n,g[w],g[w+1]||f.length,u,p),m[0]&&(_.holes.push(_.pos.length),_.pos=Xn(_.pos,m[0].pos),o&&(_.types=Xn(_.types,m[0].types))),m[1]&&(y.holes.push(y.pos.length),y.pos=Xn(y.pos,m[1].pos),o&&(y.types=Xn(y.types,m[1].types)))}else{const m={positions:f};o&&(m.edgeTypes=h),g.length&&(m.holeIndices=g),a.push(m)}}return a}function jf(i,e,t,n,r,s,o){const a=(r-n)/t,c=[],l=[],u=[],f=[],h=[];let g,p,m;const _=mn(i,a-1,t,n);let y=Math.sign(o&8?_[1]-s[3]:_[0]-s[2]),w=e&&e[a-1],b=0,x=0;for(let S=0;S<a;S++)g=mn(i,S,t,n,g),p=Math.sign(o&8?g[1]-s[3]:g[0]-s[2]),m=e&&e[n/t+S],p&&y&&y!==p&&(Ya(_,g,o,s,h),De(c,h)&&u.push(w),De(l,h)&&f.push(w)),p<=0?(De(c,g)&&u.push(m),b-=p):u.length&&(u[u.length-1]=Vf),p>=0?(De(l,g)&&f.push(m),x+=p):f.length&&(f[f.length-1]=Vf),Ha(_,g),y=p,w=m;return[b?{pos:c,types:e&&u}:null,x?{pos:l,types:e&&f}:null]}function ip(i,e,t,n){const r=Math.floor((i[0]-t[0])/e)*e+t[0],s=Math.floor((i[1]-t[1])/e)*e+t[1];return n[0]=r,n[1]=s,n[2]=r+e,n[3]=s+e,n}function AC(i,e,t){t&8?(i[1]+=e,i[3]+=e):t&4?(i[1]-=e,i[3]-=e):t&2?(i[0]+=e,i[2]+=e):t&1&&(i[0]-=e,i[2]-=e)}function CC(i,e,t,n){let r=1/0,s=-1/0,o=1/0,a=-1/0;for(let c=0;c<t;c+=e){const l=i[c],u=i[c+1];r=l<r?l:r,s=l>s?l:s,o=u<o?u:o,a=u>a?u:a}return n[0][0]=r,n[0][1]=o,n[1][0]=s,n[1][1]=a,n}function Xn(i,e){for(let t=0;t<e.length;t++)i.push(e[t]);return i}const MC=85.051129;function IC(i,e){const{size:t=2,startIndex:n=0,endIndex:r=i.length,normalize:s=!0}=e||{},o=i.slice(n,r);np(o,t,0,r-n);const a=ep(o,{size:t,broken:!0,gridResolution:360,gridOffset:[-180,-180]});if(s)for(const c of a)rp(c,t);return a}function RC(i,e=null,t){const{size:n=2,normalize:r=!0,edgeTypes:s=!1}=t||{};e=e||[];const o=[],a=[];let c=0,l=0;for(let f=0;f<=e.length;f++){const h=e[f]||i.length,g=l,p=OC(i,n,c,h);for(let m=p;m<h;m++)o[l++]=i[m];for(let m=c;m<p;m++)o[l++]=i[m];np(o,n,g,l),BC(o,n,g,l,t==null?void 0:t.maxLatitude),c=h,a[f]=l}a.pop();const u=tp(o,a,{size:n,gridResolution:360,gridOffset:[-180,-180],edgeTypes:s});if(r)for(const f of u)rp(f.positions,n);return u}function OC(i,e,t,n){let r=-1,s=-1;for(let o=t+1;o<n;o+=e){const a=Math.abs(i[o]);a>r&&(r=a,s=o-1)}return s}function BC(i,e,t,n,r=MC){const s=i[t],o=i[n-e];if(Math.abs(s-o)>180){const a=mn(i,0,e,t);a[0]+=Math.round((o-s)/360)*360,De(i,a),a[1]=Math.sign(a[1])*r,De(i,a),a[0]=s,De(i,a)}}function np(i,e,t,n){let r=i[0],s;for(let o=t;o<n;o+=e){s=i[o];const a=s-r;(a>180||a<-180)&&(s-=Math.round(a/360)*360),i[o]=r=s}}function rp(i,e){let t;const n=i.length/e;for(let s=0;s<n&&(t=i[s*e],(t+180)%360===0);s++);const r=-Math.round(t/360)*360;if(r!==0)for(let s=0;s<n;s++)i[s*e]+=r}class kC extends Bt{constructor(e){const{indices:t,attributes:n}=DC(e);super({...e,topology:"line-list",indices:t,attributes:n})}}function DC(i){const{radius:e,height:t=1,nradial:n=10}=i;let{vertices:r}=i;r&&(q.assert(r.length>=n),r=r.flatMap(g=>[g[0],g[1]]),Qc(r,Kc.COUNTER_CLOCKWISE));const s=t>0,o=n+1,a=s?o*3+1:n,c=Math.PI*2/n,l=new Uint16Array(s?n*3*2:0),u=new Float32Array(a*3),f=new Float32Array(a*3);let h=0;if(s){for(let g=0;g<o;g++){const p=g*c,m=g%n,_=Math.sin(p),y=Math.cos(p);for(let w=0;w<2;w++)u[h+0]=r?r[m*2]:y*e,u[h+1]=r?r[m*2+1]:_*e,u[h+2]=(1/2-w)*t,f[h+0]=r?r[m*2]:y,f[h+1]=r?r[m*2+1]:_,h+=3}u[h+0]=u[h-3],u[h+1]=u[h-2],u[h+2]=u[h-1],h+=3}for(let g=s?0:1;g<o;g++){const p=Math.floor(g/2)*Math.sign(.5-g%2),m=p*c,_=(p+n)%n,y=Math.sin(m),w=Math.cos(m);u[h+0]=r?r[_*2]:w*e,u[h+1]=r?r[_*2+1]:y*e,u[h+2]=t/2,f[h+2]=1,h+=3}if(s){let g=0;for(let p=0;p<n;p++)l[g++]=p*2+0,l[g++]=p*2+2,l[g++]=p*2+0,l[g++]=p*2+1,l[g++]=p*2+1,l[g++]=p*2+3}return{indices:l,attributes:{POSITION:{size:3,value:u},NORMAL:{size:3,value:f}}}}const FC=`struct ColumnUniforms {
  radius: f32,
  angle: f32,
  offset: vec2<f32>,
  extruded: f32,
  stroked: f32,
  isStroke: f32,
  coverage: f32,
  elevationScale: f32,
  edgeDistance: f32,
  widthScale: f32,
  widthMinPixels: f32,
  widthMaxPixels: f32,
  radiusUnits: i32,
  widthUnits: i32,
};

@group(0) @binding(auto) var<uniform> column: ColumnUniforms;
`,Wf=`layout(std140) uniform columnUniforms {
  float radius;
  float angle;
  vec2 offset;
  bool extruded;
  bool stroked;
  bool isStroke;
  float coverage;
  float elevationScale;
  float edgeDistance;
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  highp int radiusUnits;
  highp int widthUnits;
} column;
`,NC={name:"column",source:FC,vs:Wf,fs:Wf,uniformTypes:{radius:"f32",angle:"f32",offset:"vec2<f32>",extruded:"f32",stroked:"f32",isStroke:"f32",coverage:"f32",elevationScale:"f32",edgeDistance:"f32",widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",radiusUnits:"i32",widthUnits:"i32"}},sp=`struct Attributes {
  @builtin(instance_index) instanceIndex: u32,
  @location(0) positions: vec3<f32>,
  @location(1) normals: vec3<f32>,
  @location(2) instancePositions: vec3<f32>,
  @location(3) instancePositions64Low: vec3<f32>,
  @location(4) instanceElevations: f32,
  @location(5) instanceFillColors: vec4<f32>,
  @location(6) instanceLineColors: vec4<f32>,
  @location(7) instanceStrokeWidths: f32
};

fn getRotationMatrix(angle: f32) -> mat2x2<f32> {
  let s = sin(angle);
  let c = cos(angle);
  return mat2x2<f32>(
    vec2<f32>(c, s),
    vec2<f32>(-s, c)
  );
}

fn getOffset(
  positions: vec3<f32>,
  strokeOffsetRatio: f32,
  dotRadius: f32,
  rotationMatrix: mat2x2<f32>
) -> vec3<f32> {
  var offset = (rotationMatrix * positions.xy * strokeOffsetRatio + column.offset) * dotRadius;
  if (column.radiusUnits == UNIT_METERS) {
    offset = project_size_vec2(offset);
  } else if (column.radiusUnits == UNIT_PIXELS) {
    offset = project_pixel_size_vec2(offset);
  }
  return vec3<f32>(offset, 0.0);
}
`,UC=`${sp}

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  geometry.worldPosition = attributes.instancePositions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.instanceIndex);

  let isStroke = column.isStroke > 0.5;
  let baseColor = select(attributes.instanceFillColors, attributes.instanceLineColors, isStroke);
  let rotationMatrix = getRotationMatrix(column.angle);

  var elevation = 0.0;
  var strokeOffsetRatio = 1.0;

  if (column.extruded > 0.5) {
    elevation =
      attributes.instanceElevations * (attributes.positions.z + 1.0) / 2.0 * column.elevationScale;
  } else if (column.stroked > 0.5) {
    let widthPixels = clamp(
      project_unit_size_to_pixel(attributes.instanceStrokeWidths * column.widthScale, column.widthUnits),
      column.widthMinPixels,
      column.widthMaxPixels
    ) / 2.0;
    let halfOffset =
      project_pixel_size_float(widthPixels) /
      project_size_float(column.edgeDistance * column.coverage * column.radius);
    if (isStroke) {
      strokeOffsetRatio -= sign(attributes.positions.z) * halfOffset;
    } else {
      strokeOffsetRatio -= halfOffset;
    }
  }

  let shouldRender = select(0.0, 1.0, baseColor.a > 0.0 && attributes.instanceElevations >= 0.0);
  let dotRadius = column.radius * column.coverage * shouldRender;
  let centroidPosition =
    vec3<f32>(
      attributes.instancePositions.xy,
      attributes.instancePositions.z + elevation
    );
  let offset = getOffset(attributes.positions, strokeOffsetRatio, dotRadius, rotationMatrix);
  let projected = project_position_to_clipspace_and_commonspace(
    centroidPosition,
    attributes.instancePositions64Low,
    offset
  );

  geometry.position = projected.commonPosition;
  geometry.normal = project_normal(vec3<f32>(rotationMatrix * attributes.normals.xy, attributes.normals.z));

  let lightColor = lighting_getLightColor2(
    baseColor.rgb,
    project.cameraPosition,
    geometry.position.xyz,
    geometry.normal
  );

  varyings.position = projected.clipPosition;
  varyings.color = vec4<f32>(
    select(baseColor.rgb, lightColor, column.extruded > 0.5 && !isStroke),
    baseColor.a * layer.opacity
  );

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = vec2<f32>(0.0);
  return deckgl_premultiplied_alpha(varyings.color);
}
`,zC=`${sp}

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) cameraPosition: vec3<f32>,
  @location(2) positionCommonspace: vec4<f32>
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  geometry.worldPosition = attributes.instancePositions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.instanceIndex);

  let isStroke = column.isStroke > 0.5;
  let baseColor = select(attributes.instanceFillColors, attributes.instanceLineColors, isStroke);
  let rotationMatrix = getRotationMatrix(column.angle);

  var elevation = 0.0;
  var strokeOffsetRatio = 1.0;

  if (column.extruded > 0.5) {
    elevation =
      attributes.instanceElevations * (attributes.positions.z + 1.0) / 2.0 * column.elevationScale;
  } else if (column.stroked > 0.5) {
    let widthPixels = clamp(
      project_unit_size_to_pixel(attributes.instanceStrokeWidths * column.widthScale, column.widthUnits),
      column.widthMinPixels,
      column.widthMaxPixels
    ) / 2.0;
    let halfOffset =
      project_pixel_size_float(widthPixels) /
      project_size_float(column.edgeDistance * column.coverage * column.radius);
    if (isStroke) {
      strokeOffsetRatio -= sign(attributes.positions.z) * halfOffset;
    } else {
      strokeOffsetRatio -= halfOffset;
    }
  }

  let shouldRender = select(0.0, 1.0, baseColor.a > 0.0 && attributes.instanceElevations >= 0.0);
  let dotRadius = column.radius * column.coverage * shouldRender;
  let centroidPosition =
    vec3<f32>(
      attributes.instancePositions.xy,
      attributes.instancePositions.z + elevation
    );
  let offset = getOffset(attributes.positions, strokeOffsetRatio, dotRadius, rotationMatrix);
  let projected = project_position_to_clipspace_and_commonspace(
    centroidPosition,
    attributes.instancePositions64Low,
    offset
  );

  geometry.position = projected.commonPosition;
  geometry.normal = project_normal(vec3<f32>(rotationMatrix * attributes.normals.xy, attributes.normals.z));

  varyings.position = projected.clipPosition;
  varyings.color = vec4<f32>(baseColor.rgb, baseColor.a * layer.opacity);
  varyings.cameraPosition = project.cameraPosition;
  varyings.positionCommonspace = projected.commonPosition;

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = vec2<f32>(0.0);

  var fragColor = varyings.color;
  if (column.extruded > 0.5 && column.isStroke < 0.5) {
    // WebGPU's screen-space Y axis reverses the derivative orientation used by GLSL flat shading.
    let normal = normalize(cross(dpdy(varyings.positionCommonspace.xyz), dpdx(varyings.positionCommonspace.xyz)));
    fragColor = vec4<f32>(
      lighting_getLightColor2(
        varyings.color.rgb,
        varyings.cameraPosition,
        varyings.positionCommonspace.xyz,
        normal
      ),
      varyings.color.a
    );
  }

  return deckgl_premultiplied_alpha(fragColor);
}
`;function $C(i){return i?zC:UC}const GC=`#version 300 es
#define SHADER_NAME column-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec3 instancePositions;
in float instanceElevations;
in vec3 instancePositions64Low;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in float instanceStrokeWidths;
out vec4 vColor;
#ifdef FLAT_SHADING
out vec3 cameraPosition;
out vec4 position_commonspace;
#endif
void main(void) {
geometry.worldPosition = instancePositions;
vec4 color = column.isStroke ? instanceLineColors : instanceFillColors;
mat2 rotationMatrix = mat2(cos(column.angle), sin(column.angle), -sin(column.angle), cos(column.angle));
float elevation = 0.0;
float strokeOffsetRatio = 1.0;
if (column.extruded) {
elevation = instanceElevations * (positions.z + 1.0) / 2.0 * column.elevationScale;
} else if (column.stroked) {
float widthPixels = clamp(
project_size_to_pixel(instanceStrokeWidths * column.widthScale, column.widthUnits),
column.widthMinPixels, column.widthMaxPixels) / 2.0;
float halfOffset = project_pixel_size(widthPixels) / project_size(column.edgeDistance * column.coverage * column.radius);
if (column.isStroke) {
strokeOffsetRatio -= sign(positions.z) * halfOffset;
} else {
strokeOffsetRatio -= halfOffset;
}
}
float shouldRender = float(color.a > 0.0 && instanceElevations >= 0.0);
float dotRadius = column.radius * column.coverage * shouldRender;
geometry.pickingColor = picking_getPickingColorFromInstanceID();
vec3 centroidPosition = vec3(instancePositions.xy, instancePositions.z + elevation);
vec3 centroidPosition64Low = instancePositions64Low;
vec2 offset = (rotationMatrix * positions.xy * strokeOffsetRatio + column.offset) * dotRadius;
if (column.radiusUnits == UNIT_METERS) {
offset = project_size(offset);
} else if (column.radiusUnits == UNIT_PIXELS) {
offset = project_pixel_size(offset);
}
vec3 pos = vec3(offset, 0.);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);
geometry.normal = project_normal(vec3(rotationMatrix * normals.xy, normals.z));
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (column.extruded && !column.isStroke) {
#ifdef FLAT_SHADING
cameraPosition = project.cameraPosition;
position_commonspace = geometry.position;
vColor = vec4(color.rgb, color.a * layer.opacity);
#else
vec3 lightColor = lighting_getLightColor(color.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, color.a * layer.opacity);
#endif
} else {
vColor = vec4(color.rgb, color.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,VC=`#version 300 es
#define SHADER_NAME column-layer-fragment-shader
precision highp float;
out vec4 fragColor;
in vec4 vColor;
#ifdef FLAT_SHADING
in vec3 cameraPosition;
in vec4 position_commonspace;
#endif
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
#ifdef FLAT_SHADING
if (column.extruded && !column.isStroke && !bool(picking.isActive)) {
vec3 normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
fragColor.rgb = lighting_getLightColor(vColor.rgb, cameraPosition, position_commonspace.xyz, normal);
}
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,qr=[0,0,0,255],jC={name:"geometry",stepMode:"vertex",byteStride:24,attributes:[{attribute:"positions",format:"float32x3",byteOffset:0},{attribute:"normals",format:"float32x3",byteOffset:12}]},WC={diskResolution:{type:"number",min:4,value:20},vertices:null,radius:{type:"number",min:0,value:1e3},angle:{type:"number",value:0},offset:{type:"array",value:[0,0]},coverage:{type:"number",min:0,max:1,value:1},elevationScale:{type:"number",min:0,value:1},radiusUnits:"meters",lineWidthUnits:"meters",lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:Number.MAX_SAFE_INTEGER,extruded:!0,wireframe:!1,filled:!0,stroked:!1,flatShading:!1,getPosition:{type:"accessor",value:i=>i.position},getFillColor:{type:"accessor",value:qr},getLineColor:{type:"accessor",value:qr},getLineWidth:{type:"accessor",value:1},getElevation:{type:"accessor",value:1e3},material:!0,getColor:{deprecatedFor:["getFillColor","getLineColor"]}};class Jc extends Ti{getShaders(){const e={},{flatShading:t}=this.props;return t&&(e.FLAT_SHADING=1),super.getShaders({vs:GC,fs:VC,source:$C(t),defines:e,modules:[Rc,Ac,t?kd:Tc,Dc,NC]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceElevations:{size:1,transition:!0,accessor:"getElevation"},instanceFillColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getFillColor",defaultValue:qr},instanceLineColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getLineColor",defaultValue:qr},instanceStrokeWidths:{size:1,accessor:"getLineWidth",transition:!0}})}updateState(e){var a;super.updateState(e);const{props:t,oldProps:n,changeFlags:r}=e,s=r.extensionsChanged||t.flatShading!==n.flatShading;s&&((a=this.state.models)==null||a.forEach(c=>c.destroy()),this.setState(this._getModels()),this.getAttributeManager().invalidateAll());const o=this.getNumInstances();this.state.fillModel.setInstanceCount(o),this.state.strokeModel.setInstanceCount(o),this.state.wireframeModel.setInstanceCount(o),(s||t.diskResolution!==n.diskResolution||t.vertices!==n.vertices||t.extruded!==n.extruded||t.stroked!==n.stroked)&&this._updateGeometry(t)}getGeometry(e,t,n){const r=new kC({radius:1,height:n?2:0,vertices:t,nradial:e});let s=0;if(t)for(let o=0;o<e;o++){const a=t[o],c=Math.sqrt(a[0]*a[0]+a[1]*a[1]);s+=c/e}else s=1;return this.setState({edgeDistance:Math.cos(Math.PI/e)*s}),r}_getModels(){const e=this.getShaders(),t=[...this.getAttributeManager().getBufferLayouts(),jC],n=new Fe(this.context.device,{...e,id:`${this.props.id}-fill`,bufferLayout:t,isInstanced:!0}),r=new Fe(this.context.device,{...e,id:`${this.props.id}-stroke`,bufferLayout:t,isInstanced:!0}),s=new Fe(this.context.device,{...e,id:`${this.props.id}-wireframe`,bufferLayout:t,isInstanced:!0});return{fillModel:n,strokeModel:r,wireframeModel:s,models:[s,n,r]}}_updateGeometry({diskResolution:e,vertices:t,extruded:n,stroked:r}){const s=this.getGeometry(e,t,n||r),o=s.attributes.POSITION,a=s.attributes.NORMAL;if(this._setFillGeometry(new Bt({topology:"triangle-strip",attributes:{POSITION:o,NORMAL:a}})),!n&&r){const c=o.value.length/3;this._setStrokeGeometry(new Bt({topology:"triangle-strip",vertexCount:c-e-1,attributes:{POSITION:o,NORMAL:a}}))}n&&this._setWireframeGeometry(s)}_setFillGeometry(e){const t=cr(e,{attributes:["POSITION","NORMAL"]});this.state.fillModel.setGeometry(t)}_setStrokeGeometry(e){const t=cr(e,{attributes:["POSITION","NORMAL"]});this.state.strokeModel.setGeometry(t)}_setWireframeGeometry(e){const t=cr(e,{attributes:["POSITION","NORMAL"]}),n=this.state.wireframeModel;n.setGeometry(t),n.setTopology("line-list")}draw({uniforms:e}){const{lineWidthUnits:t,lineWidthScale:n,lineWidthMinPixels:r,lineWidthMaxPixels:s,radiusUnits:o,elevationScale:a,extruded:c,filled:l,stroked:u,wireframe:f,offset:h,coverage:g,radius:p,angle:m}=this.props,_=this.state.fillModel,y=this.state.strokeModel,w=this.state.wireframeModel,{edgeDistance:b}=this.state,x={radius:p,angle:m/180*Math.PI,offset:h,extruded:c,stroked:u,coverage:g,elevationScale:a,edgeDistance:b,radiusUnits:Rt[o],widthUnits:Rt[t],widthScale:n,widthMinPixels:r,widthMaxPixels:s};c&&f&&(w.shaderInputs.setProps({column:{...x,isStroke:!0}}),w.draw(this.context.renderPass)),l&&(_.shaderInputs.setProps({column:{...x,isStroke:!1}}),_.draw(this.context.renderPass)),!c&&u&&(y.shaderInputs.setProps({column:{...x,isStroke:!0}}),y.draw(this.context.renderPass))}}Jc.layerName="ColumnLayer";Jc.defaultProps=WC;function HC(i,e,t,n){let r;if(Array.isArray(i[0])){const s=i.length*e;r=new Array(s);for(let o=0;o<i.length;o++)for(let a=0;a<e;a++)r[o*e+a]=i[o][a]||0}else r=i;return t?ep(r,{size:e,gridResolution:t}):n?IC(r,{size:e}):r}const YC=1,qC=2,Ui=4;class ZC extends Zg{constructor(e){super({...e,attributes:{positions:{size:3,padding:18,initialize:!0,type:e.fp64?Float64Array:Float32Array},segmentTypes:{size:1,type:e.isWebGPU?Float32Array:Uint8ClampedArray}}})}get(e){return this.attributes[e]}getPathSegmentIndices(e){const t=this.attributes.segmentTypes,n=this.vertexStarts[e],r=Math.min(this.vertexStarts[e+1]??this.instanceCount,this.instanceCount),s=[];for(let o=n;o<r-1;o++)(t[o]&Ui)===0&&s.push(o);return s.length&&(t[n]&Ui)!==0&&s.unshift(s.pop()),s}getGeometryFromBuffer(e){return this.normalize||this.opts.isWebGPU?super.getGeometryFromBuffer(e):null}normalizeGeometry(e){return this.normalize?HC(e,this.positionSize,this.opts.resolution,this.opts.wrapLongitude):e}getGeometrySize(e){if(Hf(e)){let n=0;for(const r of e)n+=this.getGeometrySize(r);return n}const t=this.getPathLength(e);return t<2?0:this.isClosed(e)?t<3?0:t+2:t}updateGeometryAttributes(e,t){if(t.geometrySize!==0)if(e&&Hf(e))for(const n of e){const r=this.getGeometrySize(n);t.geometrySize=r,this.updateGeometryAttributes(n,t),t.vertexStart+=r}else this._updateSegmentTypes(e,t),this._updatePositions(e,t)}_updateSegmentTypes(e,t){const n=this.attributes.segmentTypes,r=e?this.isClosed(e):!1,{vertexStart:s,geometrySize:o}=t;n.fill(0,s,s+o),r?(n[s]=Ui,n[s+o-2]=Ui):(n[s]+=YC,n[s+o-2]+=qC),n[s+o-1]=Ui}_updatePositions(e,t){const{positions:n}=this.attributes;if(!n||!e)return;const{vertexStart:r,geometrySize:s}=t,o=new Array(3);for(let a=r,c=0;c<s;a++,c++)this.getPointOnPath(e,c,o),n[a*3]=o[0],n[a*3+1]=o[1],n[a*3+2]=o[2]}getPathLength(e){return e.length/this.positionSize}getPointOnPath(e,t,n=[]){const{positionSize:r}=this;t*r>=e.length&&(t+=1-e.length/r);const s=t*r;return n[0]=e[s],n[1]=e[s+1],n[2]=r===3&&e[s+2]||0,n}isClosed(e){if(!this.normalize)return!!this.opts.loop;const{positionSize:t}=this,n=e.length-t;return e[0]===e[n]&&e[1]===e[n+1]&&(t===2||e[2]===e[n+2])}}function Hf(i){return Array.isArray(i[0])}const XC=`struct PathUniforms {
  widthScale: f32,
  widthMinPixels: f32,
  widthMaxPixels: f32,
  jointType: f32,
  capType: f32,
  miterLimit: f32,
  billboard: f32,
  widthUnits: i32,
};

@group(0) @binding(auto)
var<uniform> path: PathUniforms;
`,Yf=`layout(std140) uniform pathUniforms {
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  float jointType;
  float capType;
  float miterLimit;
  bool billboard;
  highp int widthUnits;
} path;
`,KC={name:"path",source:XC,vs:Yf,fs:Yf,uniformTypes:{widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",jointType:"f32",capType:"f32",miterLimit:"f32",billboard:"f32",widthUnits:"i32"}},QC=`const EPSILON: f32 = 0.001;
const ZERO_OFFSET: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);

struct JoinResult {
  offset: vec3<f32>,
  cornerOffset: vec2<f32>,
  miterLength: f32,
  pathPosition: vec2<f32>,
  pathLength: f32,
  jointType: f32,
};

struct Attributes {
  @location(0) positions: vec2<f32>,
  @location(1) instanceTypes: f32,
  @location(2) instanceLeftPositions: vec3<f32>,
  @location(3) instanceStartPositions: vec3<f32>,
  @location(4) instanceEndPositions: vec3<f32>,
  @location(5) instanceRightPositions: vec3<f32>,
  @location(6) instanceLeftPositions64Low: vec3<f32>,
  @location(7) instanceStartPositions64Low: vec3<f32>,
  @location(8) instanceEndPositions64Low: vec3<f32>,
  @location(9) instanceRightPositions64Low: vec3<f32>,
  @location(10) instanceStrokeWidths: f32,
  @location(11) instanceColors: vec4<f32>,
  @location(12) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) vCornerOffset: vec2<f32>,
  @location(2) vMiterLength: f32,
  @location(3) vPathPosition: vec2<f32>,
  @location(4) vPathLength: f32,
  @location(5) vJointType: f32,
  // Location 6 is reserved for TripsLayer's injected vTime varying.
  @location(7) clipCoordinates: vec2<f32>,
#ifdef DASH_ENABLED
  @location(8) vPathBounds: vec2<f32>,
#endif
};

fn flipIfTrue(flag: bool) -> f32 {
  return select(1.0, -1.0, flag);
}

fn clipLine(position: vec4<f32>, refPosition: vec4<f32>) -> vec4<f32> {
  if (position.w < EPSILON) {
    let r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
    return refPosition + (position - refPosition) * r;
  }
  return position;
}

#ifdef DASH_ENABLED
// Return the visible interval of the original segment before clipLine moves either endpoint.
fn getClippedPathRange(startW: f32, endW: f32) -> vec2<f32> {
  let startClipped = startW < EPSILON;
  let endClipped = endW < EPSILON;
  if (startClipped && endClipped) {
    return vec2<f32>(0.0, 0.0);
  }
  if (startClipped || endClipped) {
    let intersection = clamp((EPSILON - startW) / (endW - startW), 0.0, 1.0);
    if (startClipped) {
      return vec2<f32>(intersection, 1.0);
    }
    return vec2<f32>(0.0, intersection);
  }
  return vec2<f32>(0.0, 1.0);
}
#endif

fn getLineJoinOffset(
  prevPoint: vec3<f32>,
  currPoint: vec3<f32>,
  nextPoint: vec3<f32>,
  width: vec2<f32>,
#ifdef DASH_ENABLED
  sourcePathLength: f32,
  sourcePathRange: vec2<f32>,
#endif
#ifdef ANTIALIASING
  coverageScale: f32,
#endif
  positions: vec2<f32>,
  instanceTypes: f32
) -> JoinResult {
  let isEnd = positions.x > 0.0;
  let sideOfPath = positions.y;
  let isJoint = select(0.0, 1.0, sideOfPath == 0.0);

  var deltaA3 = currPoint - prevPoint;
  var deltaB3 = nextPoint - currPoint;

  let rotationResult = project_needs_rotation(currPoint);
  if (path.billboard == 0.0 && rotationResult.needsRotation) {
    deltaA3 = rotationResult.transform * deltaA3;
    deltaB3 = rotationResult.transform * deltaB3;
  }

  let deltaA = deltaA3.xy / width;
  let deltaB = deltaB3.xy / width;

  let lenA = length(deltaA);
  let lenB = length(deltaB);

  let dirA = select(vec2<f32>(0.0, 0.0), normalize(deltaA), lenA > 0.0);
  let dirB = select(vec2<f32>(0.0, 0.0), normalize(deltaB), lenB > 0.0);

  let perpA = vec2<f32>(-dirA.y, dirA.x);
  let perpB = vec2<f32>(-dirB.y, dirB.x);

  var tangent = dirA + dirB;
  tangent = select(perpA, normalize(tangent), length(tangent) > 0.0);
  let miterVec = vec2<f32>(-tangent.y, tangent.x);
  let dir = select(dirB, dirA, isEnd);
  let perp = select(perpB, perpA, isEnd);
#ifdef DASH_ENABLED
  let segmentLength2D = select(lenB, lenA, isEnd);

  // Extrusion happens in the XY plane, so segmentLength2D is a 2D length and pathPosition.y
  // below measures 2D distance along the segment. For a path that also moves in Z the true
  // arc length is longer by this ratio. Scaling pathLength and pathPosition.y by it makes
  // the coordinate measure real 3D distance while leaving the joint tests unchanged, since
  // they compare the two against each other and both are scaled alike. Billboard mode
  // extrudes in clip space, where the perspective divide has already reduced the segment to
  // its screen projection, so its complete common-space length is supplied by the caller.
  // Mirrors path-layer-vertex.glsl.ts.
  let currDelta3 = select(deltaB3, deltaA3, isEnd);
  let currLength2D = length(currDelta3.xy);
  // Do not clamp a valid denominator to EPSILON: high-zoom Web Mercator deltas are often
  // smaller than that in common space, and changing their scale corrupts even flat paths.
  let safeLength2D = select(1.0, currLength2D, currLength2D > 0.0);
  var arcLengthRatio = 1.0;
  var pathPositionOffset = 0.0;
  var pathLength = segmentLength2D;
  if (path.billboard != 0.0) {
    // clipLine may shorten the visible screen-space segment. Preserve the corresponding interval
    // of the complete common-space arclength instead of compressing the full dash period into the
    // visible span. Keep pathLength complete so justification is stable as the camera clips it.
    let visiblePathLength = sourcePathLength * (sourcePathRange.y - sourcePathRange.x);
    arcLengthRatio = 0.0;
    if (segmentLength2D > 0.0) {
      arcLengthRatio = visiblePathLength / segmentLength2D;
    }
    pathPositionOffset = sourcePathLength * sourcePathRange.x;
    pathLength = sourcePathLength;
  } else if (currLength2D > 0.0) {
    arcLengthRatio = length(currDelta3) / safeLength2D;
    pathLength = segmentLength2D * arcLengthRatio;
  }
#else
  let pathLength = select(lenB, lenA, isEnd);
#endif

  let sinHalfA = abs(dot(miterVec, perp));
  let cosHalfA = abs(dot(dirA, miterVec));
  let turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
  let cornerPosition = sideOfPath * turnDirection;

  var miterSize = 1.0 / max(sinHalfA, EPSILON);
  miterSize = mix(
    min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
    miterSize,
    step(0.0, cornerPosition)
  );

  var offsetVec =
    mix(miterVec * miterSize, perp, step(0.5, cornerPosition)) *
    (sideOfPath + isJoint * turnDirection);

  let isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
  let isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
  let isCap = isStartCap || isEndCap;

  var jointType = path.jointType;
  if (isCap) {
    offsetVec = mix(
      perp * sideOfPath,
      dir * path.capType * 4.0 * flipIfTrue(isStartCap),
      isJoint
    );
    jointType = path.capType;
  }

#ifdef ANTIALIASING
  let coverageOffsetVec = offsetVec * coverageScale;
  var miterLength = dot(coverageOffsetVec, miterVec * turnDirection);
#else
  var miterLength = dot(offsetVec, miterVec * turnDirection);
#endif
  miterLength = select(miterLength, isJoint, isCap);

#ifdef ANTIALIASING
  let offsetFromStartOfPath = coverageOffsetVec + deltaA * select(0.0, 1.0, isEnd);
#else
  let offsetFromStartOfPath = offsetVec + deltaA * select(0.0, 1.0, isEnd);
#endif
  let pathPosition = vec2<f32>(
    dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
    pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
    dot(offsetFromStartOfPath, dir)
#endif
  );
  let isValid = step(f32(instanceTypes), 3.5);
#ifdef ANTIALIASING
  var offset = vec3<f32>(coverageOffsetVec * width * isValid, 0.0);
#else
  var offset = vec3<f32>(offsetVec * width * isValid, 0.0);
#endif

  if (path.billboard == 0.0 && rotationResult.needsRotation) {
    offset = rotationResult.transform * offset;
  }

#ifdef ANTIALIASING
  return JoinResult(
    offset, coverageOffsetVec, miterLength, pathPosition, pathLength, jointType
  );
#else
  return JoinResult(offset, offsetVec, miterLength, pathPosition, pathLength, jointType);
#endif
}

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let isEnd = attributes.positions.x;

  let prevPosition = mix(attributes.instanceLeftPositions, attributes.instanceStartPositions, isEnd);
  let prevPosition64Low = mix(
    attributes.instanceLeftPositions64Low,
    attributes.instanceStartPositions64Low,
    isEnd
  );
  let currPosition = mix(attributes.instanceStartPositions, attributes.instanceEndPositions, isEnd);
  let currPosition64Low = mix(
    attributes.instanceStartPositions64Low,
    attributes.instanceEndPositions64Low,
    isEnd
  );
  let nextPosition = mix(attributes.instanceEndPositions, attributes.instanceRightPositions, isEnd);
  let nextPosition64Low = mix(
    attributes.instanceEndPositions64Low,
    attributes.instanceRightPositions64Low,
    isEnd
  );

  geometry.worldPosition = currPosition;

  let widthPixels =
    clamp(
      project_unit_size_to_pixel(attributes.instanceStrokeWidths * path.widthScale, path.widthUnits),
      path.widthMinPixels,
      path.widthMaxPixels
    ) / 2.0;

  if (path.billboard != 0.0) {
#ifdef DASH_ENABLED
    let prevProjection = project_position_to_clipspace_and_commonspace(
      prevPosition, prevPosition64Low, ZERO_OFFSET
    );
    let nextProjection = project_position_to_clipspace_and_commonspace(
      nextPosition, nextPosition64Low, ZERO_OFFSET
    );
    let prevPositionCommon = prevProjection.commonPosition.xyz;
    let nextPositionCommon = nextProjection.commonPosition.xyz;
    var prevPositionScreen = prevProjection.clipPosition;
    var nextPositionScreen = nextProjection.clipPosition;
#else
    var prevPositionScreen = project_position_to_clipspace(
      prevPosition, prevPosition64Low, ZERO_OFFSET
    );
    var nextPositionScreen = project_position_to_clipspace(
      nextPosition, nextPosition64Low, ZERO_OFFSET
    );
#endif
    let currProjection = project_position_to_clipspace_and_commonspace(
      currPosition, currPosition64Low, ZERO_OFFSET
    );
    geometry.position = currProjection.commonPosition;
    var currPositionScreen = currProjection.clipPosition;
#ifdef DASH_ENABLED
    let currPositionCommon = currProjection.commonPosition.xyz;
    let sourcePathStartScreen = mix(currPositionScreen, prevPositionScreen, isEnd);
    let sourcePathEndScreen = mix(nextPositionScreen, currPositionScreen, isEnd);
    let billboardPathRange = getClippedPathRange(
      sourcePathStartScreen.w, sourcePathEndScreen.w
    );
#endif

    prevPositionScreen = clipLine(prevPositionScreen, currPositionScreen);
    nextPositionScreen = clipLine(nextPositionScreen, currPositionScreen);
    currPositionScreen = clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));

#ifdef ANTIALIASING
    let coverageScale = select(
      1.0,
      (widthPixels + 0.5 / project.devicePixelRatio) / max(widthPixels, 1e-6),
      widthPixels > 0.0
    );
#endif
#ifdef DASH_ENABLED
    let currentDeltaCommon = select(
      nextPositionCommon - currPositionCommon,
      currPositionCommon - prevPositionCommon,
      isEnd > 0.0
    );
    let billboardPathLength = select(
      0.0,
      length(currentDeltaCommon) * project.scale / (widthPixels * project.focalDistance),
      widthPixels > 0.0
    );
#endif
    let join = getLineJoinOffset(
      prevPositionScreen.xyz / prevPositionScreen.w,
      currPositionScreen.xyz / currPositionScreen.w,
      nextPositionScreen.xyz / nextPositionScreen.w,
      project_pixel_size_to_clipspace(vec2<f32>(widthPixels, widthPixels)),
#ifdef DASH_ENABLED
      billboardPathLength,
      billboardPathRange,
#endif
#ifdef ANTIALIASING
      coverageScale,
#endif
      attributes.positions,
      attributes.instanceTypes
    );
#ifdef DASH_ENABLED
    // Phase and justification use the complete source segment, while cap and joint coverage
    // must still recognize the endpoints moved by clipLine.
    varyings.vPathBounds = billboardPathLength * billboardPathRange;
#endif

    geometry.uv = join.pathPosition;
    varyings.position = vec4<f32>(
      currPositionScreen.xyz + join.offset * currPositionScreen.w,
      currPositionScreen.w
    );
    varyings.vCornerOffset = join.cornerOffset;
    varyings.vMiterLength = join.miterLength;
    varyings.vPathPosition = join.pathPosition;
    varyings.vPathLength = join.pathLength;
    varyings.vJointType = join.jointType;
  } else {
    let prevPositionCommon = project_position_vec3_f64(prevPosition, prevPosition64Low);
    let currPositionCommon = project_position_vec3_f64(currPosition, currPosition64Low);
    let nextPositionCommon = project_position_vec3_f64(nextPosition, nextPosition64Low);

    let width = vec2<f32>(
      project_pixel_size_float(widthPixels),
      project_pixel_size_float(widthPixels)
    );
#ifdef ANTIALIASING
    let coverageScale = select(
      1.0,
      (widthPixels + 0.5 / project.devicePixelRatio) / max(widthPixels, 1e-6),
      widthPixels > 0.0
    );
#endif
    let join = getLineJoinOffset(
      prevPositionCommon,
      currPositionCommon,
      nextPositionCommon,
      width,
#ifdef DASH_ENABLED
      1.0,
      vec2<f32>(0.0, 1.0),
#endif
#ifdef ANTIALIASING
      coverageScale,
#endif
      attributes.positions,
      attributes.instanceTypes
    );
#ifdef DASH_ENABLED
    varyings.vPathBounds = vec2<f32>(0.0, join.pathLength);
#endif

    geometry.position = vec4<f32>(currPositionCommon + join.offset, 1.0);
    geometry.uv = join.pathPosition;
    varyings.position = project_common_position_to_clipspace(geometry.position);
    varyings.vCornerOffset = join.cornerOffset;
    varyings.vMiterLength = join.miterLength;
    varyings.vPathPosition = join.pathPosition;
    varyings.vPathLength = join.pathLength;
    varyings.vJointType = join.jointType;
  }

  varyings.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&varyings.position, geometry.worldPosition.xy);

  varyings.vColor = vec4<f32>(
    attributes.instanceColors.rgb,
    attributes.instanceColors.a * layer.opacity
  );
  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = varyings.vPathPosition;

#ifdef ANTIALIASING
  // Coordinates of the outer silhouette, in units of half-width: rounded joints and caps are
  // bounded by the corner offset, everywhere else by the edge of the stroke. Dividing by the
  // screen-space derivative converts the distance to the boundary into device pixels, which stays
  // correct under perspective foreshortening and under extensions that rescale the stroke.
#ifdef DASH_ENABLED
  let isCorner =
    varyings.vPathPosition.y < varyings.vPathBounds.x ||
    varyings.vPathPosition.y > varyings.vPathBounds.y;
#else
  let isCorner = varyings.vPathPosition.y < 0.0 || varyings.vPathPosition.y > varyings.vPathLength;
#endif
  let isRound = varyings.vJointType > 0.5;

  // Distance to the silhouette in device pixels, from the derivative of the coordinate that
  // bounds it. Computed before the discards below: derivatives need uniform control flow and are
  // undefined after a discard in the quad. See dev-docs/RFCs/v9.4/analytic-antialiasing-rfc.md
  let bodyCoord = abs(varyings.vPathPosition.x);
  let cornerCoord = length(varyings.vCornerOffset);
  // Both evaluated so each derivative stays on one field across the corner/body boundary
  let bodyPixels = (1.0 - bodyCoord) / max(fwidth(bodyCoord), 1e-6);
  let cornerPixels = (1.0 - cornerCoord) / max(fwidth(cornerCoord), 1e-6);
#ifdef PATH_STYLE_OFFSET
  // Rounded corners still intersect the stroke-width envelope. Extensions may remap
  // vPathPosition.x independently of vCornerOffset, as PathStyleExtension does for offsets.
  let edgePixels = select(bodyPixels, min(cornerPixels, bodyPixels), isRound && isCorner);
#else
  let edgePixels = select(bodyPixels, cornerPixels, isRound && isCorner);
#endif

  // Fragments outside the coverage ramp must not write depth or picking colors.
  if (edgePixels <= -SMOOTH_EDGE_RADIUS) {
    discard;
  }

  if (isCorner) {
    if (!isRound && varyings.vMiterLength > path.miterLimit + 1.0) {
      discard;
    }
  }

  var color = varyings.vColor;

  // Feather one device pixel across the width only, before premultiplication. edgePixels is a
  // signed device-pixel distance and SMOOTH_EDGE_RADIUS is 0.5, so this ramps across one pixel.
  color.a *= smoothedge(0.0, edgePixels);
#else
#ifdef DASH_ENABLED
  if (
    varyings.vPathPosition.y < varyings.vPathBounds.x ||
    varyings.vPathPosition.y > varyings.vPathBounds.y
  ) {
#else
  if (
    varyings.vPathPosition.y < 0.0 ||
    varyings.vPathPosition.y > varyings.vPathLength
  ) {
#endif
    if (varyings.vJointType > 0.5 && length(varyings.vCornerOffset) > 1.0) {
      discard;
    }
    if (
      varyings.vJointType < 0.5 &&
      varyings.vMiterLength > path.miterLimit + 1.0
    ) {
      discard;
    }
  }
#endif

  // Fragment-layer injections that discard pixels must run after analytic coverage derivatives.
  // See TripsLayer, which rejects fragments outside of the active time window at this anchor.
  // DECKGL_FILTER_COLOR
  clip_filterColor(varyings.clipCoordinates);
#ifdef ANTIALIASING
  return deckgl_premultiplied_alpha(color);
#else
  return deckgl_premultiplied_alpha(varyings.vColor);
#endif
}
`,JC=`#version 300 es
#define SHADER_NAME path-layer-vertex-shader
in vec2 positions;
in float instanceTypes;
in vec3 instanceStartPositions;
in vec3 instanceEndPositions;
in vec3 instanceLeftPositions;
in vec3 instanceRightPositions;
in vec3 instanceLeftPositions64Low;
in vec3 instanceStartPositions64Low;
in vec3 instanceEndPositions64Low;
in vec3 instanceRightPositions64Low;
in float instanceStrokeWidths;
in vec4 instanceColors;
in float rowIndexes;
uniform float opacity;
out vec4 vColor;
out vec2 vCornerOffset;
out float vMiterLength;
out vec2 vPathPosition;
out float vPathLength;
out float vJointType;
#ifdef DASH_ENABLED
out vec2 vPathBounds;
#endif
const float EPSILON = 0.001;
const vec3 ZERO_OFFSET = vec3(0.0);
float flipIfTrue(bool flag) {
return -(float(flag) * 2. - 1.);
}
vec3 getLineJoinOffset(
vec3 prevPoint, vec3 currPoint, vec3 nextPoint,
vec2 width
#ifdef DASH_ENABLED
, float sourcePathLength, vec2 sourcePathRange
#endif
#ifdef ANTIALIASING
, float coverageScale
#endif
) {
bool isEnd = positions.x > 0.0;
float sideOfPath = positions.y;
float isJoint = float(sideOfPath == 0.0);
vec3 deltaA3 = (currPoint - prevPoint);
vec3 deltaB3 = (nextPoint - currPoint);
mat3 rotationMatrix;
bool needsRotation = !path.billboard && project_needs_rotation(currPoint, rotationMatrix);
if (needsRotation) {
deltaA3 = deltaA3 * rotationMatrix;
deltaB3 = deltaB3 * rotationMatrix;
}
vec2 deltaA = deltaA3.xy / width;
vec2 deltaB = deltaB3.xy / width;
float lenA = length(deltaA);
float lenB = length(deltaB);
vec2 dirA = lenA > 0. ? normalize(deltaA) : vec2(0.0, 0.0);
vec2 dirB = lenB > 0. ? normalize(deltaB) : vec2(0.0, 0.0);
vec2 perpA = vec2(-dirA.y, dirA.x);
vec2 perpB = vec2(-dirB.y, dirB.x);
vec2 tangent = dirA + dirB;
tangent = length(tangent) > 0. ? normalize(tangent) : perpA;
vec2 miterVec = vec2(-tangent.y, tangent.x);
vec2 dir = isEnd ? dirA : dirB;
vec2 perp = isEnd ? perpA : perpB;
float L = isEnd ? lenA : lenB;
#ifdef DASH_ENABLED
vec3 currDelta3 = isEnd ? deltaA3 : deltaB3;
float currLength2D = length(currDelta3.xy);
float arcLengthRatio = 1.0;
float pathPositionOffset = 0.0;
float pathLength = L;
if (path.billboard) {
float visiblePathLength = sourcePathLength * (sourcePathRange.y - sourcePathRange.x);
arcLengthRatio = L > 0.0 ? visiblePathLength / L : 0.0;
pathPositionOffset = sourcePathLength * sourcePathRange.x;
pathLength = sourcePathLength;
} else if (currLength2D > 0.0) {
arcLengthRatio = length(currDelta3) / currLength2D;
pathLength = L * arcLengthRatio;
}
#endif
float sinHalfA = abs(dot(miterVec, perp));
float cosHalfA = abs(dot(dirA, miterVec));
float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
float cornerPosition = sideOfPath * turnDirection;
float miterSize = 1.0 / max(sinHalfA, EPSILON);
miterSize = mix(
min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
miterSize,
step(0.0, cornerPosition)
);
vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))
* (sideOfPath + isJoint * turnDirection);
bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
bool isCap = isStartCap || isEndCap;
if (isCap) {
offsetVec = mix(perp * sideOfPath, dir * path.capType * 4.0 * flipIfTrue(isStartCap), isJoint);
vJointType = path.capType;
} else {
vJointType = path.jointType;
}
#ifdef ANTIALIASING
vec2 coverageOffsetVec = offsetVec * coverageScale;
#ifdef DASH_ENABLED
vPathLength = pathLength;
#else
vPathLength = L;
#endif
vCornerOffset = coverageOffsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = coverageOffsetVec + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
dot(offsetFromStartOfPath, dir)
#endif
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(coverageOffsetVec * width * isValid, 0.0);
#else
#ifdef DASH_ENABLED
vPathLength = pathLength;
#else
vPathLength = L;
#endif
vCornerOffset = offsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = vCornerOffset + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
dot(offsetFromStartOfPath, dir)
#endif
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(offsetVec * width * isValid, 0.0);
#endif
if (needsRotation) {
offset = rotationMatrix * offset;
}
return offset;
}
void clipLine(inout vec4 position, vec4 refPosition) {
if (position.w < EPSILON) {
float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
position = refPosition + (position - refPosition) * r;
}
}
#ifdef DASH_ENABLED
vec2 getClippedPathRange(float startW, float endW) {
bool startClipped = startW < EPSILON;
bool endClipped = endW < EPSILON;
if (startClipped && endClipped) {
return vec2(0.0);
}
if (startClipped || endClipped) {
float intersection = clamp((EPSILON - startW) / (endW - startW), 0.0, 1.0);
return startClipped ? vec2(intersection, 1.0) : vec2(0.0, intersection);
}
return vec2(0.0, 1.0);
}
#endif
void main() {
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
float isEnd = positions.x;
vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);
vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);
vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);
vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);
vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);
vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);
geometry.worldPosition = currPosition;
vec2 widthPixels = vec2(clamp(
project_size_to_pixel(instanceStrokeWidths * path.widthScale, path.widthUnits),
path.widthMinPixels, path.widthMaxPixels) / 2.0);
vec3 width;
if (path.billboard) {
#ifdef DASH_ENABLED
vec4 prevPositionCommon;
vec4 nextPositionCommon;
vec4 prevPositionScreen = project_position_to_clipspace(
prevPosition, prevPosition64Low, ZERO_OFFSET, prevPositionCommon
);
#else
vec4 prevPositionScreen = project_position_to_clipspace(
prevPosition, prevPosition64Low, ZERO_OFFSET
);
#endif
vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);
#ifdef DASH_ENABLED
vec4 nextPositionScreen = project_position_to_clipspace(
nextPosition, nextPosition64Low, ZERO_OFFSET, nextPositionCommon
);
#else
vec4 nextPositionScreen = project_position_to_clipspace(
nextPosition, nextPosition64Low, ZERO_OFFSET
);
#endif
#ifdef DASH_ENABLED
vec4 sourcePathStartScreen = mix(currPositionScreen, prevPositionScreen, isEnd);
vec4 sourcePathEndScreen = mix(nextPositionScreen, currPositionScreen, isEnd);
vec2 billboardPathRange = getClippedPathRange(
sourcePathStartScreen.w, sourcePathEndScreen.w
);
#endif
clipLine(prevPositionScreen, currPositionScreen);
clipLine(nextPositionScreen, currPositionScreen);
clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));
width = vec3(widthPixels, 0.0);
DECKGL_FILTER_SIZE(width, geometry);
#ifdef ANTIALIASING
vec2 coveragePadding = vec2(0.5 / project.devicePixelRatio);
float coverageScale = length(width.xy) > 0.0
? length(width.xy + coveragePadding) / length(width.xy)
: 1.0;
#endif
#ifdef DASH_ENABLED
vec3 currentDeltaCommon = isEnd > 0.0
? geometry.position.xyz - prevPositionCommon.xyz
: nextPositionCommon.xyz - geometry.position.xyz;
float billboardPathLength = width.x > 0.0
? length(currentDeltaCommon) * project.scale / (width.x * project.focalDistance)
: 0.0;
#endif
vec3 offset = getLineJoinOffset(
prevPositionScreen.xyz / prevPositionScreen.w,
currPositionScreen.xyz / currPositionScreen.w,
nextPositionScreen.xyz / nextPositionScreen.w,
project_pixel_size_to_clipspace(width.xy)
#ifdef DASH_ENABLED
,
billboardPathLength, billboardPathRange
#endif
#ifdef ANTIALIASING
,
coverageScale
#endif
);
#ifdef DASH_ENABLED
vPathBounds = billboardPathLength * billboardPathRange;
#endif
DECKGL_FILTER_GL_POSITION(currPositionScreen, geometry);
gl_Position = vec4(currPositionScreen.xyz + offset * currPositionScreen.w, currPositionScreen.w);
} else {
prevPosition = project_position(prevPosition, prevPosition64Low);
currPosition = project_position(currPosition, currPosition64Low);
nextPosition = project_position(nextPosition, nextPosition64Low);
width = vec3(project_pixel_size(widthPixels), 0.0);
DECKGL_FILTER_SIZE(width, geometry);
#ifdef ANTIALIASING
vec2 coveragePadding = project_pixel_size(vec2(0.5 / project.devicePixelRatio));
float coverageScale = length(width.xy) > 0.0
? length(width.xy + coveragePadding) / length(width.xy)
: 1.0;
#endif
vec3 offset = getLineJoinOffset(
prevPosition, currPosition, nextPosition, width.xy
#ifdef DASH_ENABLED
, 1.0, vec2(0.0, 1.0)
#endif
#ifdef ANTIALIASING
, coverageScale
#endif
);
#ifdef DASH_ENABLED
vPathBounds = vec2(0.0, vPathLength);
#endif
geometry.position = vec4(currPosition + offset, 1.0);
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,eM=`#version 300 es
#define SHADER_NAME path-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vCornerOffset;
in float vMiterLength;
in vec2 vPathPosition;
in float vPathLength;
in float vJointType;
#ifdef DASH_ENABLED
in vec2 vPathBounds;
#endif
out vec4 fragColor;
void main(void) {
geometry.uv = vPathPosition;
#ifdef ANTIALIASING
#ifdef DASH_ENABLED
bool isCorner = vPathPosition.y < vPathBounds.x || vPathPosition.y > vPathBounds.y;
#else
bool isCorner = vPathPosition.y < 0.0 || vPathPosition.y > vPathLength;
#endif
bool isRound = vJointType > 0.5;
float bodyCoord = abs(vPathPosition.x);
float cornerCoord = length(vCornerOffset);
float bodyPixels = (1.0 - bodyCoord) / max(fwidth(bodyCoord), 1e-6);
float cornerPixels = (1.0 - cornerCoord) / max(fwidth(cornerCoord), 1e-6);
#ifdef PATH_STYLE_OFFSET
float edgePixels = isRound && isCorner ? min(cornerPixels, bodyPixels) : bodyPixels;
#else
float edgePixels = isRound && isCorner ? cornerPixels : bodyPixels;
#endif
if (edgePixels <= -SMOOTH_EDGE_RADIUS) {
discard;
}
if (isCorner) {
if (!isRound && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
fragColor.a *= smoothedge(0.0, edgePixels);
#else
#ifdef DASH_ENABLED
if (vPathPosition.y < vPathBounds.x || vPathPosition.y > vPathBounds.y) {
#else
if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
#endif
if (vJointType > 0.5 && length(vCornerOffset) > 1.0) {
discard;
}
if (vJointType < 0.5 && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,op=[0,0,0,255],tM={widthUnits:"meters",widthScale:{type:"number",min:0,value:1},widthMinPixels:{type:"number",min:0,value:0},widthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},jointRounded:!1,capRounded:!1,miterLimit:{type:"number",min:0,value:4},antialiasing:!1,billboard:!1,_pathType:null,getPath:{type:"accessor",value:i=>i.path},getColor:{type:"accessor",value:op},getWidth:{type:"accessor",value:1},rounded:{deprecatedFor:["jointRounded","capRounded"]}},Oo={enter:(i,e)=>e.length?e.subarray(e.length-i.length):i};function iM(i){if(i.isGeospatial)return null;const{unitsPerMeter:e}=i.distanceScales;return[e[0],e[1],e[2]]}function qf(i,e){return i===e||!!(i&&e&&i.length===e.length&&i.every((t,n)=>t===e[n]))}class el extends Ti{getShaders(){const{antialiasing:e}=this.props;return super.getShaders({vs:JC,fs:eM,source:QC,defines:e?{ANTIALIASING:1}:{},modules:[Rc,Ac,Dc,KC,...this.context.device.type==="webgpu"?[Jg]:[]]})}get wrapLongitude(){return!1}getBounds(){var e;return this.context.device.type==="webgpu"?null:(e=this.getAttributeManager())==null?void 0:e.getBounds(["vertexPositions"])}getPathProjectionScale(e){var o;const t=this.props.coordinateSystem;if(!!!((o=this.getAttributeManager())!=null&&o.getAttributes().instanceDashOffsets))return null;if(e instanceof it&&e.zoom>=12&&(t==="default"||t==="lnglat"||t==="cartesian")){const a=Ps.getUniforms({viewport:e,coordinateSystem:t,coordinateOrigin:this.props.coordinateOrigin,autoWrapLongitude:this.wrapLongitude});return[e.projectionMode,a.coordinateOrigin[1],a.commonOrigin[1],...a.commonUnitsPerWorldUnit,...a.commonUnitsPerWorldUnit2,a.commonUnitsPerMeter[2]]}const s=iM(e);return s?[e.projectionMode,...s]:[e.projectionMode]}shouldUpdateState(e){var n,r;const{viewport:t}=this.context;return super.shouldUpdateState(e)||((n=this.state)==null?void 0:n.tessellationResolution)!==t.resolution||!qf((r=this.state)==null?void 0:r.pathProjectionScale,this.getPathProjectionScale(t))}initializeState(){const t=this.context.device.type==="webgpu";this.getAttributeManager().addInstanced({...t?{pathPositions:{size:24,type:"float32",transition:!1,accessor:"getPath",update:this.calculateWebGPUPositions,shaderAttributes:{instanceLeftPositions:{size:3,elementOffset:0},instanceStartPositions:{size:3,elementOffset:3},instanceEndPositions:{size:3,elementOffset:6},instanceRightPositions:{size:3,elementOffset:9},instanceLeftPositions64Low:{size:3,elementOffset:12},instanceStartPositions64Low:{size:3,elementOffset:15},instanceEndPositions64Low:{size:3,elementOffset:18},instanceRightPositions64Low:{size:3,elementOffset:21}},noAlloc:!0}}:{vertexPositions:{size:3,vertexOffset:1,type:"float64",fp64:this.use64bitPositions(),transition:Oo,accessor:"getPath",update:this.calculatePositions,noAlloc:!0,shaderAttributes:{instanceLeftPositions:{vertexOffset:0},instanceStartPositions:{vertexOffset:1},instanceEndPositions:{vertexOffset:2},instanceRightPositions:{vertexOffset:3}}}},instanceTypes:{size:1,type:t?"float32":"uint8",update:this.calculateSegmentTypes,noAlloc:!0},instanceStrokeWidths:{size:1,accessor:"getWidth",transition:t?!1:Oo,defaultValue:1,bufferGroup:"path-instance-data"},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",accessor:"getColor",transition:t?!1:Oo,defaultValue:op,bufferGroup:"path-instance-data"},rowIndexes:{size:1,type:"uint32",accessor:(r,{index:s})=>r&&r.__source?r.__source.index:s,bufferGroup:"path-instance-data"}}),this.setState({pathTesselator:new ZC({fp64:this.use64bitPositions(),isWebGPU:t}),tessellationResolution:this.context.viewport.resolution,pathProjectionScale:this.getPathProjectionScale(this.context.viewport)})}updateState(e){var g;super.updateState(e);const{props:t,oldProps:n,changeFlags:r}=e,s=this.getAttributeManager(),{viewport:o}=this.context,a=this.state.tessellationResolution!==o.resolution,c=this.getPathProjectionScale(o),l=!qf(this.state.pathProjectionScale,c),f=r.updateTriggersChanged&&(r.updateTriggersChanged.all||r.updateTriggersChanged.getPath)||t._pathType!==n._pathType||t.positionFormat!==n.positionFormat||t.wrapLongitude!==n.wrapLongitude||a;if(r.dataChanged||f){const{pathTesselator:p}=this.state,m=t.data.attributes||{};p.updateGeometry({data:t.data,geometryBuffer:m.getPath,buffers:m,normalize:!t._pathType,loop:t._pathType==="loop",getGeometry:t.getPath,positionFormat:t.positionFormat,wrapLongitude:t.wrapLongitude,resolution:o.resolution,dataChanged:f?void 0:r.dataChanged}),this.setState({numInstances:p.instanceCount,startIndices:p.vertexStarts,tessellationResolution:o.resolution,pathProjectionScale:c}),!r.dataChanged||f?s.invalidateAll():l&&s.invalidate("instanceDashOffsets")}else l&&(this.setState({pathProjectionScale:c}),s.invalidate("instanceDashOffsets"));(r.extensionsChanged||t.antialiasing!==n.antialiasing)&&((g=this.state.model)==null||g.destroy(),this.state.model=this._getModel(),s.invalidateAll())}getPickingInfo(e){const t=super.getPickingInfo(e),{index:n}=t,r=this.props.data;return r[0]&&r[0].__source&&(t.object=r.find(s=>s.__source.index===n)),t}disablePickingIndex(e){const t=this.props.data;if(t[0]&&t[0].__source)for(let n=0;n<t.length;n++)t[n].__source.index===e&&this._disablePickingIndex(n);else super.disablePickingIndex(e)}draw({uniforms:e}){const{jointRounded:t,capRounded:n,billboard:r,miterLimit:s,widthUnits:o,widthScale:a,widthMinPixels:c,widthMaxPixels:l}=this.props,u=this.state.model,f={jointType:Number(t),capType:Number(n),billboard:r,widthUnits:Rt[o],widthScale:a,miterLimit:s,widthMinPixels:c,widthMaxPixels:l};u.shaderInputs.setProps({path:f}),u.draw(this.context.renderPass)}_getModel(){const e=[0,1,2,1,4,2,1,3,4,3,5,4],t=[0,0,0,-1,0,1,1,-1,1,1,1,0];return new Fe(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new Bt({topology:"triangle-list",attributes:{indices:new Uint16Array(e),positions:{value:new Float32Array(t),size:2}}}),isInstanced:!0})}calculatePositions(e){const{pathTesselator:t}=this.state;e.startIndices=t.vertexStarts,e.value=t.get("positions")}calculateSegmentTypes(e){const{pathTesselator:t}=this.state;e.startIndices=t.vertexStarts,e.value=t.get("segmentTypes")}calculateWebGPUPositions(e){const{pathTesselator:t}=this.state,n=t.get("positions");if(!n){e.value=null;return}const r=t.instanceCount,s=new Float32Array(r*24),o=[-1,0,1,2];for(let a=0;a<r;a++){const c=a*24;for(let l=0;l<4;l++){const u=a+o[l],f=c+l*3;for(let h=0;h<3;h++){const g=u>=0&&u<r?n[u*3+h]:0,p=Math.fround(g);s[f+h]=p,s[f+h+12]=g-p}}}e.startIndices=t.vertexStarts,e.value=s}}el.defaultProps=tM;el.layerName="PathLayer";var Kn={exports:{}},Zf;function nM(){if(Zf)return Kn.exports;Zf=1,Kn.exports=i,Kn.exports.default=i;function i(v,E,P){P=P||2;var C=E&&E.length,A=C?E[0]*P:v.length,M=e(v,0,A,P,!0),I=[];if(!M||M.next===M.prev)return I;var D,V,G,ae,ne,Z,pe;if(C&&(M=c(v,E,M,P)),v.length>80*P){D=G=v[0],V=ae=v[1];for(var re=P;re<A;re+=P)ne=v[re],Z=v[re+1],ne<D&&(D=ne),Z<V&&(V=Z),ne>G&&(G=ne),Z>ae&&(ae=Z);pe=Math.max(G-D,ae-V),pe=pe!==0?32767/pe:0}return n(M,I,P,D,V,pe,0),I}function e(v,E,P,C,A){var M,I;if(A===ie(v,E,P,C)>0)for(M=E;M<P;M+=C)I=$(M,v[M],v[M+1],I);else for(M=P-C;M>=E;M-=C)I=$(M,v[M],v[M+1],I);return I&&x(I,I.next)&&(N(I),I=I.next),I}function t(v,E){if(!v)return v;E||(E=v);var P=v,C;do if(C=!1,!P.steiner&&(x(P,P.next)||b(P.prev,P,P.next)===0)){if(N(P),P=E=P.prev,P===P.next)break;C=!0}else P=P.next;while(C||P!==E);return E}function n(v,E,P,C,A,M,I){if(v){!I&&M&&g(v,C,A,M);for(var D=v,V,G;v.prev!==v.next;){if(V=v.prev,G=v.next,M?s(v,C,A,M):r(v)){E.push(V.i/P|0),E.push(v.i/P|0),E.push(G.i/P|0),N(v),v=G.next,D=G.next;continue}if(v=G,v===D){I?I===1?(v=o(t(v),E,P),n(v,E,P,C,A,M,2)):I===2&&a(v,E,P,C,A,M):n(t(v),E,P,C,A,M,1);break}}}}function r(v){var E=v.prev,P=v,C=v.next;if(b(E,P,C)>=0)return!1;for(var A=E.x,M=P.x,I=C.x,D=E.y,V=P.y,G=C.y,ae=A<M?A<I?A:I:M<I?M:I,ne=D<V?D<G?D:G:V<G?V:G,Z=A>M?A>I?A:I:M>I?M:I,pe=D>V?D>G?D:G:V>G?V:G,re=C.next;re!==E;){if(re.x>=ae&&re.x<=Z&&re.y>=ne&&re.y<=pe&&y(A,D,M,V,I,G,re.x,re.y)&&b(re.prev,re,re.next)>=0)return!1;re=re.next}return!0}function s(v,E,P,C){var A=v.prev,M=v,I=v.next;if(b(A,M,I)>=0)return!1;for(var D=A.x,V=M.x,G=I.x,ae=A.y,ne=M.y,Z=I.y,pe=D<V?D<G?D:G:V<G?V:G,re=ae<ne?ae<Z?ae:Z:ne<Z?ne:Z,Ai=D>V?D>G?D:G:V>G?V:G,Ci=ae>ne?ae>Z?ae:Z:ne>Z?ne:Z,il=m(pe,re,E,P,C),nl=m(Ai,Ci,E,P,C),X=v.prevZ,K=v.nextZ;X&&X.z>=il&&K&&K.z<=nl;){if(X.x>=pe&&X.x<=Ai&&X.y>=re&&X.y<=Ci&&X!==A&&X!==I&&y(D,ae,V,ne,G,Z,X.x,X.y)&&b(X.prev,X,X.next)>=0||(X=X.prevZ,K.x>=pe&&K.x<=Ai&&K.y>=re&&K.y<=Ci&&K!==A&&K!==I&&y(D,ae,V,ne,G,Z,K.x,K.y)&&b(K.prev,K,K.next)>=0))return!1;K=K.nextZ}for(;X&&X.z>=il;){if(X.x>=pe&&X.x<=Ai&&X.y>=re&&X.y<=Ci&&X!==A&&X!==I&&y(D,ae,V,ne,G,Z,X.x,X.y)&&b(X.prev,X,X.next)>=0)return!1;X=X.prevZ}for(;K&&K.z<=nl;){if(K.x>=pe&&K.x<=Ai&&K.y>=re&&K.y<=Ci&&K!==A&&K!==I&&y(D,ae,V,ne,G,Z,K.x,K.y)&&b(K.prev,K,K.next)>=0)return!1;K=K.nextZ}return!0}function o(v,E,P){var C=v;do{var A=C.prev,M=C.next.next;!x(A,M)&&S(A,C,C.next,M)&&B(A,M)&&B(M,A)&&(E.push(A.i/P|0),E.push(C.i/P|0),E.push(M.i/P|0),N(C),N(C.next),C=v=M),C=C.next}while(C!==v);return t(C)}function a(v,E,P,C,A,M){var I=v;do{for(var D=I.next.next;D!==I.prev;){if(I.i!==D.i&&w(I,D)){var V=U(I,D);I=t(I,I.next),V=t(V,V.next),n(I,E,P,C,A,M,0),n(V,E,P,C,A,M,0);return}D=D.next}I=I.next}while(I!==v)}function c(v,E,P,C){var A=[],M,I,D,V,G;for(M=0,I=E.length;M<I;M++)D=E[M]*C,V=M<I-1?E[M+1]*C:v.length,G=e(v,D,V,C,!1),G===G.next&&(G.steiner=!0),A.push(_(G));for(A.sort(l),M=0;M<A.length;M++)P=u(A[M],P);return P}function l(v,E){return v.x-E.x}function u(v,E){var P=f(v,E);if(!P)return E;var C=U(P,v);return t(C,C.next),t(P,P.next)}function f(v,E){var P=E,C=v.x,A=v.y,M=-1/0,I;do{if(A<=P.y&&A>=P.next.y&&P.next.y!==P.y){var D=P.x+(A-P.y)*(P.next.x-P.x)/(P.next.y-P.y);if(D<=C&&D>M&&(M=D,I=P.x<P.next.x?P:P.next,D===C))return I}P=P.next}while(P!==E);if(!I)return null;var V=I,G=I.x,ae=I.y,ne=1/0,Z;P=I;do C>=P.x&&P.x>=G&&C!==P.x&&y(A<ae?C:M,A,G,ae,A<ae?M:C,A,P.x,P.y)&&(Z=Math.abs(A-P.y)/(C-P.x),B(P,v)&&(Z<ne||Z===ne&&(P.x>I.x||P.x===I.x&&h(I,P)))&&(I=P,ne=Z)),P=P.next;while(P!==V);return I}function h(v,E){return b(v.prev,v,E.prev)<0&&b(E.next,v,v.next)<0}function g(v,E,P,C){var A=v;do A.z===0&&(A.z=m(A.x,A.y,E,P,C)),A.prevZ=A.prev,A.nextZ=A.next,A=A.next;while(A!==v);A.prevZ.nextZ=null,A.prevZ=null,p(A)}function p(v){var E,P,C,A,M,I,D,V,G=1;do{for(P=v,v=null,M=null,I=0;P;){for(I++,C=P,D=0,E=0;E<G&&(D++,C=C.nextZ,!!C);E++);for(V=G;D>0||V>0&&C;)D!==0&&(V===0||!C||P.z<=C.z)?(A=P,P=P.nextZ,D--):(A=C,C=C.nextZ,V--),M?M.nextZ=A:v=A,A.prevZ=M,M=A;P=C}M.nextZ=null,G*=2}while(I>1);return v}function m(v,E,P,C,A){return v=(v-P)*A|0,E=(E-C)*A|0,v=(v|v<<8)&16711935,v=(v|v<<4)&252645135,v=(v|v<<2)&858993459,v=(v|v<<1)&1431655765,E=(E|E<<8)&16711935,E=(E|E<<4)&252645135,E=(E|E<<2)&858993459,E=(E|E<<1)&1431655765,v|E<<1}function _(v){var E=v,P=v;do(E.x<P.x||E.x===P.x&&E.y<P.y)&&(P=E),E=E.next;while(E!==v);return P}function y(v,E,P,C,A,M,I,D){return(A-I)*(E-D)>=(v-I)*(M-D)&&(v-I)*(C-D)>=(P-I)*(E-D)&&(P-I)*(M-D)>=(A-I)*(C-D)}function w(v,E){return v.next.i!==E.i&&v.prev.i!==E.i&&!O(v,E)&&(B(v,E)&&B(E,v)&&k(v,E)&&(b(v.prev,v,E.prev)||b(v,E.prev,E))||x(v,E)&&b(v.prev,v,v.next)>0&&b(E.prev,E,E.next)>0)}function b(v,E,P){return(E.y-v.y)*(P.x-E.x)-(E.x-v.x)*(P.y-E.y)}function x(v,E){return v.x===E.x&&v.y===E.y}function S(v,E,P,C){var A=R(b(v,E,P)),M=R(b(v,E,C)),I=R(b(P,C,v)),D=R(b(P,C,E));return!!(A!==M&&I!==D||A===0&&L(v,P,E)||M===0&&L(v,C,E)||I===0&&L(P,v,C)||D===0&&L(P,E,C))}function L(v,E,P){return E.x<=Math.max(v.x,P.x)&&E.x>=Math.min(v.x,P.x)&&E.y<=Math.max(v.y,P.y)&&E.y>=Math.min(v.y,P.y)}function R(v){return v>0?1:v<0?-1:0}function O(v,E){var P=v;do{if(P.i!==v.i&&P.next.i!==v.i&&P.i!==E.i&&P.next.i!==E.i&&S(P,P.next,v,E))return!0;P=P.next}while(P!==v);return!1}function B(v,E){return b(v.prev,v,v.next)<0?b(v,E,v.next)>=0&&b(v,v.prev,E)>=0:b(v,E,v.prev)<0||b(v,v.next,E)<0}function k(v,E){var P=v,C=!1,A=(v.x+E.x)/2,M=(v.y+E.y)/2;do P.y>M!=P.next.y>M&&P.next.y!==P.y&&A<(P.next.x-P.x)*(M-P.y)/(P.next.y-P.y)+P.x&&(C=!C),P=P.next;while(P!==v);return C}function U(v,E){var P=new z(v.i,v.x,v.y),C=new z(E.i,E.x,E.y),A=v.next,M=E.prev;return v.next=E,E.prev=v,P.next=A,A.prev=P,C.next=P,P.prev=C,M.next=C,C.prev=M,C}function $(v,E,P,C){var A=new z(v,E,P);return C?(A.next=C.next,A.prev=C,C.next.prev=A,C.next=A):(A.prev=A,A.next=A),A}function N(v){v.next.prev=v.prev,v.prev.next=v.next,v.prevZ&&(v.prevZ.nextZ=v.nextZ),v.nextZ&&(v.nextZ.prevZ=v.prevZ)}function z(v,E,P){this.i=v,this.x=E,this.y=P,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}i.deviation=function(v,E,P,C){var A=E&&E.length,M=A?E[0]*P:v.length,I=Math.abs(ie(v,0,M,P));if(A)for(var D=0,V=E.length;D<V;D++){var G=E[D]*P,ae=D<V-1?E[D+1]*P:v.length;I-=Math.abs(ie(v,G,ae,P))}var ne=0;for(D=0;D<C.length;D+=3){var Z=C[D]*P,pe=C[D+1]*P,re=C[D+2]*P;ne+=Math.abs((v[Z]-v[re])*(v[pe+1]-v[Z+1])-(v[Z]-v[pe])*(v[re+1]-v[Z+1]))}return I===0&&ne===0?0:Math.abs((ne-I)/I)};function ie(v,E,P,C){for(var A=0,M=E,I=P-C;M<P;M+=C)A+=(v[I]-v[M])*(v[M+1]+v[I+1]),I=M;return A}return i.flatten=function(v){for(var E=v[0][0].length,P={vertices:[],holes:[],dimensions:E},C=0,A=0;A<v.length;A++){for(var M=0;M<v[A].length;M++)for(var I=0;I<E;I++)P.vertices.push(v[A][M][I]);A>0&&(C+=v[A-1].length,P.holes.push(C))}return P},Kn.exports}var rM=nM();const sM=pp(rM),Qn=Kc.CLOCKWISE,Xf=Kc.COUNTER_CLOCKWISE,ft={};function oM(i){if(i=i&&i.positions||i,!Array.isArray(i)&&!ArrayBuffer.isView(i))throw new Error("invalid polygon")}function ji(i){return"positions"in i?i.positions:i}function gr(i){return"holeIndices"in i?i.holeIndices:null}function aM(i){return Array.isArray(i[0])}function cM(i){return i.length>=1&&i[0].length>=2&&Number.isFinite(i[0][0])}function lM(i){const e=i[0],t=i[i.length-1];return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function uM(i,e,t,n){for(let r=0;r<e;r++)if(i[t+r]!==i[n-e+r])return!1;return!0}function Kf(i,e,t,n,r){let s=e;const o=t.length;for(let a=0;a<o;a++)for(let c=0;c<n;c++)i[s++]=t[a][c]||0;if(!lM(t))for(let a=0;a<n;a++)i[s++]=t[0][a]||0;return ft.start=e,ft.end=s,ft.size=n,Qc(i,r,ft),s}function Qf(i,e,t,n,r=0,s,o){s=s||t.length;const a=s-r;if(a<=0)return e;let c=e;for(let l=0;l<a;l++)i[c++]=t[r+l];if(!uM(t,n,r,s))for(let l=0;l<n;l++)i[c++]=t[r+l];return ft.start=e,ft.end=c,ft.size=n,Qc(i,o,ft),c}function ap(i,e){oM(i);const t=[],n=[];if("positions"in i){const{positions:r,holeIndices:s}=i;if(s){let o=0;for(let a=0;a<=s.length;a++)o=Qf(t,o,r,e,s[a-1],s[a],a===0?Qn:Xf),n.push(o);return n.pop(),{positions:t,holeIndices:n}}i=r}if(!aM(i))return Qf(t,0,i,e,0,t.length,Qn),t;if(!cM(i)){let r=0;for(const[s,o]of i.entries())r=Kf(t,r,o,e,s===0?Qn:Xf),n.push(r);return n.pop(),{positions:t,holeIndices:n}}return Kf(t,0,i,e,Qn),t}function Bo(i,e,t){const n=i.length/3;let r=0;for(let s=0;s<n;s++){const o=(s+1)%n;r+=i[s*3+e]*i[o*3+t],r-=i[o*3+e]*i[s*3+t]}return Math.abs(r/2)}function Jf(i,e,t,n){const r=i.length/3;for(let s=0;s<r;s++){const o=s*3,a=i[o+0],c=i[o+1],l=i[o+2];i[o+e]=a,i[o+t]=c,i[o+n]=l}}function fM(i,e,t,n){let r=gr(i);r&&(r=r.map(a=>a/e));let s=ji(i);const o=n&&e===3;if(t){const a=s.length;s=s.slice();const c=[];for(let l=0;l<a;l+=e){c[0]=s[l],c[1]=s[l+1],o&&(c[2]=s[l+2]);const u=t(c);s[l]=u[0],s[l+1]=u[1],o&&(s[l+2]=u[2])}}if(o){const a=Bo(s,0,1),c=Bo(s,0,2),l=Bo(s,1,2);if(!a&&!c&&!l)return[];a>c&&a>l||(c>l?(t||(s=s.slice()),Jf(s,0,2,1)):(t||(s=s.slice()),Jf(s,2,0,1)))}return sM(s,r,e)}class hM extends Zg{constructor(e){const{fp64:t,IndexType:n=Uint32Array}=e;super({...e,attributes:{positions:{size:3,type:t?Float64Array:Float32Array},vertexValid:{type:Uint16Array,size:1},indices:{type:n,size:1}}})}get(e){const{attributes:t}=this;return e==="indices"?t.indices&&t.indices.subarray(0,this.vertexCount):t[e]}updateGeometry(e){super.updateGeometry(e);const t=this.buffers.indices;if(t)this.vertexCount=(t.value||t).length;else if(this.data&&!this.getGeometry)throw new Error("missing indices buffer")}normalizeGeometry(e){if(this.normalize){const t=ap(e,this.positionSize);return this.opts.resolution?tp(ji(t),gr(t),{size:this.positionSize,gridResolution:this.opts.resolution,edgeTypes:!0}):this.opts.wrapLongitude?RC(ji(t),gr(t),{size:this.positionSize,maxLatitude:86,edgeTypes:!0}):t}return e}getGeometrySize(e){if(eh(e)){let t=0;for(const n of e)t+=this.getGeometrySize(n);return t}return ji(e).length/this.positionSize}getGeometryFromBuffer(e){return this.normalize||!this.buffers.indices?super.getGeometryFromBuffer(e):null}updateGeometryAttributes(e,t){if(e&&eh(e))for(const n of e){const r=this.getGeometrySize(n);t.geometrySize=r,this.updateGeometryAttributes(n,t),t.vertexStart+=r,t.indexStart=this.indexStarts[t.geometryIndex+1]}else{const n=e;this._updateIndices(n,t),this._updatePositions(n,t),this._updateVertexValid(n,t)}}_updateIndices(e,{geometryIndex:t,vertexStart:n,indexStart:r}){const{attributes:s,indexStarts:o,typedArrayManager:a}=this;let c=s.indices;if(!c||!e)return;let l=r;const u=fM(e,this.positionSize,this.opts.preproject,this.opts.full3d);c=a.allocate(c,r+u.length,{copy:!0});for(let f=0;f<u.length;f++)c[l++]=u[f]+n;o[t+1]=r+u.length,s.indices=c}_updatePositions(e,{vertexStart:t,geometrySize:n}){const{attributes:{positions:r},positionSize:s}=this;if(!r||!e)return;const o=ji(e);for(let a=t,c=0;c<n;a++,c++){const l=o[c*s],u=o[c*s+1],f=s>2?o[c*s+2]:0;r[a*3]=l,r[a*3+1]=u,r[a*3+2]=f}}_updateVertexValid(e,{vertexStart:t,geometrySize:n}){const{positionSize:r}=this,s=this.attributes.vertexValid,o=e&&gr(e);if(e&&e.edgeTypes?s.set(e.edgeTypes,t):s.fill(1,t,t+n),o)for(let a=0;a<o.length;a++)s[t+o[a]/r-1]=0;s[t+n-1]=0}}function eh(i){return Array.isArray(i)&&i.length>0&&!Number.isFinite(i[0])}const dM=`struct SolidPolygonUniforms {
  extruded: f32,
  isWireframe: f32,
  elevationScale: f32,
};

@group(0) @binding(auto) var<uniform> solidPolygon: SolidPolygonUniforms;
`,th=`layout(std140) uniform solidPolygonUniforms {
  bool extruded;
  bool isWireframe;
  float elevationScale;
} solidPolygon;
`,gM={name:"solidPolygon",source:dM,vs:th,fs:th,uniformTypes:{extruded:"f32",isWireframe:"f32",elevationScale:"f32"}},cp=`in vec4 fillColors;
in vec4 lineColors;
in float rowIndexes;
out vec4 vColor;
struct PolygonProps {
vec3 positions;
vec3 positions64Low;
vec3 normal;
float elevations;
};
vec3 project_offset_normal(vec3 vector) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
return normalize(vector * project.commonUnitsPerWorldUnit);
}
return project_normal(vector);
}
void calculatePosition(PolygonProps props) {
vec3 pos = props.positions;
vec3 pos64Low = props.positions64Low;
vec3 normal = props.normal;
vec4 colors = solidPolygon.isWireframe ? lineColors : fillColors;
geometry.worldPosition = props.positions;
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
if (solidPolygon.extruded) {
pos.z += props.elevations * solidPolygon.elevationScale;
}
gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (solidPolygon.extruded) {
#ifdef IS_SIDE_VERTEX
normal = project_offset_normal(normal);
#else
normal = project_normal(normal);
#endif
geometry.normal = normal;
vec3 lightColor = lighting_getLightColor(colors.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, colors.a * layer.opacity);
} else {
vColor = vec4(colors.rgb, colors.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,pM=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader
in vec3 vertexPositions;
in vec3 vertexPositions64Low;
in float elevations;
${cp}
void main(void) {
PolygonProps props;
props.positions = vertexPositions;
props.positions64Low = vertexPositions64Low;
props.elevations = elevations;
props.normal = vec3(0.0, 0.0, 1.0);
calculatePosition(props);
}
`,mM=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader-side
#define IS_SIDE_VERTEX
in vec2 positions;
in vec3 vertexPositions;
in vec3 nextVertexPositions;
in vec3 vertexPositions64Low;
in vec3 nextVertexPositions64Low;
in float elevations;
in float instanceVertexValid;
${cp}
void main(void) {
if(instanceVertexValid < 0.5){
gl_Position = vec4(0.);
return;
}
PolygonProps props;
vec3 pos;
vec3 pos64Low;
vec3 nextPos;
vec3 nextPos64Low;
#if RING_WINDING_ORDER_CW == 1
pos = vertexPositions;
pos64Low = vertexPositions64Low;
nextPos = nextVertexPositions;
nextPos64Low = nextVertexPositions64Low;
#else
pos = nextVertexPositions;
pos64Low = nextVertexPositions64Low;
nextPos = vertexPositions;
nextPos64Low = vertexPositions64Low;
#endif
props.positions = mix(pos, nextPos, positions.x);
props.positions64Low = mix(pos64Low, nextPos64Low, positions.x);
props.normal = vec3(
pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
0.0);
props.elevations = elevations * positions.y;
calculatePosition(props);
}
`,_M=`#version 300 es
#define SHADER_NAME solid-polygon-layer-fragment-shader
precision highp float;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;function lp(){return`fn project_offset_normal(vector: vec3<f32>) -> vec3<f32> {
  if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
      project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
    return normalize(vector * project.commonUnitsPerWorldUnit);
  }
  return project_normal(vector);
}

fn apply_polygon_color(
  colors: vec4<f32>,
  normal: vec3<f32>,
  position: vec4<f32>
) -> vec4<f32> {
  if (solidPolygon.extruded > 0.5) {
    let lightColor = lighting_getLightColor2(
      colors.rgb,
      project.cameraPosition,
      position.xyz,
      normal
    );
    return vec4<f32>(lightColor, colors.a * layer.opacity);
  }
  return vec4<f32>(colors.rgb, colors.a * layer.opacity);
}
`}function up(){return`@fragment
fn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = vec2<f32>(0.0, 0.0);

  clip_filterColor(inp.clipCoordinates);

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(inp.pickingColor)) {
      discard;
    }
    return vec4<f32>(inp.pickingColor, 1.0);
  }

  var fragColor = inp.vColor;

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return deckgl_premultiplied_alpha(fragColor);
}
`}function bM(){return`${lp()}

struct Attributes {
  @location(0) vertexPositions: vec3<f32>,
  @location(1) vertexPositions64Low: vec3<f32>,
  @location(2) elevations: f32,
  @location(3) fillColors: vec4<f32>,
  @location(4) lineColors: vec4<f32>,
  @location(5) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) pickingColor: vec3<f32>,
  @location(2) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var outp: Varyings;

  var pos = attributes.vertexPositions;
  if (solidPolygon.extruded > 0.5) {
    pos.z += attributes.elevations * solidPolygon.elevationScale;
  }

  geometry.worldPosition = attributes.vertexPositions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let projectedPosition = project_position_to_clipspace_and_commonspace(
    pos,
    attributes.vertexPositions64Low,
    vec3<f32>(0.0)
  );
  geometry.position = projectedPosition.commonPosition;
  outp.position = projectedPosition.clipPosition;

  let normal = project_normal(vec3<f32>(0.0, 0.0, 1.0));
  geometry.normal = normal;

  let colors = select(
    attributes.fillColors,
    attributes.lineColors,
    solidPolygon.isWireframe > 0.5
  );
  outp.vColor = apply_polygon_color(colors, normal, geometry.position);
  outp.pickingColor = geometry.pickingColor;

  outp.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&outp.position, geometry.worldPosition.xy);

  return outp;
}

${up()}
`}function yM(i){return`const RING_WINDING_ORDER_CW: bool = ${i?"true":"false"};

${lp()}

struct Attributes {
  @location(0) positions: vec2<f32>,
  @location(1) vertexPositions: vec3<f32>,
  @location(2) vertexPositions64Low: vec3<f32>,
  @location(3) nextVertexPositions: vec3<f32>,
  @location(4) nextVertexPositions64Low: vec3<f32>,
  @location(5) vertexValid: f32,
  @location(6) elevations: f32,
  @location(7) fillColors: vec4<f32>,
  @location(8) lineColors: vec4<f32>,
  @location(9) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) pickingColor: vec3<f32>,
  @location(2) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var outp: Varyings;
  outp.position = vec4<f32>(0.0);
  outp.vColor = vec4<f32>(0.0);
  outp.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);
  outp.clipCoordinates = vec2<f32>(0.0);

  if (attributes.vertexValid < 0.5) {
    return outp;
  }

  let pos = select(attributes.nextVertexPositions, attributes.vertexPositions, RING_WINDING_ORDER_CW);
  let pos64Low = select(
    attributes.nextVertexPositions64Low,
    attributes.vertexPositions64Low,
    RING_WINDING_ORDER_CW
  );
  let nextPos = select(attributes.vertexPositions, attributes.nextVertexPositions, RING_WINDING_ORDER_CW);
  let nextPos64Low = select(
    attributes.vertexPositions64Low,
    attributes.nextVertexPositions64Low,
    RING_WINDING_ORDER_CW
  );

  let position = mix(pos, nextPos, attributes.positions.x);
  let position64Low = mix(pos64Low, nextPos64Low, attributes.positions.x);

  var worldPosition = position;
  if (solidPolygon.extruded > 0.5) {
    worldPosition.z += attributes.elevations * attributes.positions.y * solidPolygon.elevationScale;
  }

  geometry.worldPosition = position;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let projectedPosition = project_position_to_clipspace_and_commonspace(
    worldPosition,
    position64Low,
    vec3<f32>(0.0)
  );
  geometry.position = projectedPosition.commonPosition;
  outp.position = projectedPosition.clipPosition;

  let normal = project_offset_normal(vec3<f32>(
    pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
    nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
    0.0
  ));
  geometry.normal = normal;

  let colors = select(
    attributes.fillColors,
    attributes.lineColors,
    solidPolygon.isWireframe > 0.5
  );
  outp.vColor = apply_polygon_color(colors, normal, geometry.position);
  outp.pickingColor = geometry.pickingColor;

  outp.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&outp.position, geometry.worldPosition.xy);

  return outp;
}

${up()}
`}function vM(i,e){return i==="top"?bM():yM(e)}const Zr=[0,0,0,255],wM={filled:!0,extruded:!1,wireframe:!1,_normalize:!0,_windingOrder:"CW",_full3d:!1,elevationScale:{type:"number",min:0,value:1},getPolygon:{type:"accessor",value:i=>i.polygon},getElevation:{type:"accessor",value:1e3},getFillColor:{type:"accessor",value:Zr},getLineColor:{type:"accessor",value:Zr},material:!0},Jn={enter:(i,e)=>e.length?e.subarray(e.length-i.length):i};class tl extends Ti{getShaders(e){const t=!this.props._normalize&&this.props._windingOrder==="CCW"?0:1;return super.getShaders({vs:e==="top"?pM:mM,fs:_M,source:vM(e,!!t),defines:{RING_WINDING_ORDER_CW:t},modules:[Rc,Ac,Tc,Dc,gM,...this.context.device.type==="webgpu"?[Jg]:[]]})}get wrapLongitude(){return!1}getBounds(){var e;return(e=this.getAttributeManager())==null?void 0:e.getBounds(["vertexPositions"])}initializeState(){const{viewport:e}=this.context;let{coordinateSystem:t}=this.props;const{_full3d:n}=this.props;e.isGeospatial&&t==="default"&&(t="lnglat");let r;t==="lnglat"&&(n?r=e.projectPosition.bind(e):r=e.projectFlat.bind(e)),this.setState({numInstances:0,polygonTesselator:new hM({preproject:r,fp64:this.use64bitPositions(),IndexType:Uint32Array})});const s=this.getAttributeManager(),o=!0,a=this.context.device.type==="webgpu";s.add({indices:{size:1,isIndexed:!0,update:this.calculateIndices,noAlloc:o},vertexPositions:{size:3,type:"float64",stepMode:"dynamic",fp64:this.use64bitPositions(),transition:Jn,accessor:"getPolygon",update:this.calculatePositions,noAlloc:o,...a?{}:{shaderAttributes:{nextVertexPositions:{vertexOffset:1}}}},...a?{nextVertexPositions:{size:3,type:"float64",stepMode:"dynamic",fp64:this.use64bitPositions(),transition:!1,update:this.calculateNextPositions,noAlloc:o}}:{},[a?"vertexValid":"instanceVertexValid"]:{size:1,type:a?"float32":"uint16",stepMode:"instance",update:this.calculateVertexValid,noAlloc:o},elevations:{size:1,stepMode:"dynamic",transition:Jn,accessor:"getElevation",bufferGroup:"solid-polygon-instance-data"},fillColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:Jn,accessor:"getFillColor",defaultValue:Zr,bufferGroup:"solid-polygon-instance-data"},lineColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:Jn,accessor:"getLineColor",defaultValue:Zr,bufferGroup:"solid-polygon-instance-data"},rowIndexes:{size:1,type:"uint32",stepMode:"dynamic",accessor:(c,{index:l})=>c&&c.__source?c.__source.index:l,bufferGroup:"solid-polygon-instance-data"}})}getPickingInfo(e){const t=super.getPickingInfo(e),{index:n}=t,r=this.props.data;return r[0]&&r[0].__source&&(t.object=r.find(s=>s.__source.index===n)),t}disablePickingIndex(e){const t=this.props.data;if(t[0]&&t[0].__source)for(let n=0;n<t.length;n++)t[n].__source.index===e&&this._disablePickingIndex(n);else super.disablePickingIndex(e)}draw({uniforms:e}){const{extruded:t,filled:n,wireframe:r,elevationScale:s}=this.props,{topModel:o,sideModel:a,wireframeModel:c,polygonTesselator:l}=this.state,u={extruded:!!t,elevationScale:s,isWireframe:!1};c&&r&&(c.setInstanceCount(l.instanceCount-1),c.shaderInputs.setProps({solidPolygon:{...u,isWireframe:!0}}),c.draw(this.context.renderPass)),a&&n&&(a.setInstanceCount(l.instanceCount-1),a.shaderInputs.setProps({solidPolygon:u}),a.draw(this.context.renderPass)),o&&n&&(o.setVertexCount(l.vertexCount),o.shaderInputs.setProps({solidPolygon:u}),o.draw(this.context.renderPass))}updateState(e){var a;super.updateState(e),this.updateGeometry(e);const{props:t,oldProps:n,changeFlags:r}=e,s=this.getAttributeManager();(r.extensionsChanged||t.filled!==n.filled||t.extruded!==n.extruded)&&((a=this.state.models)==null||a.forEach(c=>c.destroy()),this.setState(this._getModels()),s.invalidateAll())}updateGeometry({props:e,oldProps:t,changeFlags:n}){if(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getPolygon)){const{polygonTesselator:s}=this.state,o=e.data.attributes||{};s.updateGeometry({data:e.data,normalize:e._normalize,geometryBuffer:o.getPolygon,buffers:this.context.device.type==="webgpu"?{...o}:o,getGeometry:e.getPolygon,positionFormat:e.positionFormat,wrapLongitude:e.wrapLongitude,resolution:this.context.viewport.resolution,fp64:this.use64bitPositions(),dataChanged:n.dataChanged,full3d:e._full3d}),this.setState({numInstances:s.instanceCount,startIndices:s.vertexStarts}),n.dataChanged||this.getAttributeManager().invalidateAll()}}_getModels(){const{id:e,filled:t,extruded:n}=this.props;let r,s,o;if(t){const a=this.getShaders("top");a.defines={...a.defines,NON_INSTANCED_MODEL:1};let c=this.getAttributeManager().getBufferLayouts({isInstanced:!1});this.context.device.type==="webgpu"&&(c=c.filter(l=>l.name!=="indices"&&l.name!=="vertexValid"&&l.name!=="instanceVertexValid"&&l.name!=="nextVertexPositions")),r=new Fe(this.context.device,{...a,id:`${e}-top`,topology:"triangle-list",bufferLayout:c,isIndexed:!0,userData:{excludeAttributes:{vertexValid:!0,instanceVertexValid:!0,nextVertexPositions:!0}}})}if(n){let a=this.getAttributeManager().getBufferLayouts({isInstanced:!0});this.context.device.type==="webgpu"&&(a=a.filter(c=>c.name!=="indices")),s=new Fe(this.context.device,{...this.getShaders("side"),id:`${e}-side`,bufferLayout:a,geometry:new Bt({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,1,1,0,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}}),o=new Fe(this.context.device,{...this.getShaders("side"),id:`${e}-wireframe`,bufferLayout:a,geometry:new Bt({topology:"line-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,0,1,1,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}})}return{models:[s,o,r].filter(Boolean),topModel:r,sideModel:s,wireframeModel:o}}calculateIndices(e){const{polygonTesselator:t}=this.state;e.startIndices=t.indexStarts,e.value=t.get("indices")}calculatePositions(e){var r;const{polygonTesselator:t}=this.state;e.startIndices=t.vertexStarts;const n=(r=this.props.data.attributes)==null?void 0:r.getPolygon;if(this.context.device.type==="webgpu"&&ArrayBuffer.isView(n==null?void 0:n.value)){const{value:s,size:o=3,offset:a=0,stride:c}=n,l=a/s.BYTES_PER_ELEMENT,u=c?c/s.BYTES_PER_ELEMENT:o,f=new Float64Array(t.instanceCount*3);for(let h=0;h<t.instanceCount;h++){const g=l+h*u,p=h*3;f[p]=s[g],f[p+1]=s[g+1],f[p+2]=o>2?s[g+2]:0}e.value=f;return}e.value=t.get("positions")}calculateVertexValid(e){var r,s;const t=(s=(r=this.props.data.attributes)==null?void 0:r.instanceVertexValid)==null?void 0:s.value,n=this.context.device.type==="webgpu"&&t?t:this.state.polygonTesselator.get("vertexValid");e.value=this.context.device.type==="webgpu"&&n?Float32Array.from(n):n}calculateNextPositions(e){var c,l,u;const{polygonTesselator:t}=this.state,n=this.getAttributeManager().getAttributes(),r=n.vertexPositions.value,s=((l=(c=this.props.data.attributes)==null?void 0:c.instanceVertexValid)==null?void 0:l.value)||((u=n.vertexValid)==null?void 0:u.value)||t.get("vertexValid");if(e.startIndices=t.vertexStarts,!r){e.value=r;return}const o=r.length/3,a=new r.constructor(r.length);for(let f=0;f<o;f++){const h=f*3,g=s!=null&&s[f]&&f+1<o?h+3:h;for(let p=0;p<3;p++)a[h+p]=r[g+p]}e.value=a}}tl.defaultProps=wM;tl.layerName="SolidPolygonLayer";function xM({data:i,getIndex:e,dataRange:t,replace:n}){const{startRow:r=0,endRow:s=1/0}=t,o=i.length;let a=o,c=o;for(let h=0;h<o;h++){const g=e(i[h]);if(a>h&&g>=r&&(a=h),g>=s){c=h;break}}let l=a;const f=c-a!==n.length?i.slice(c):void 0;for(let h=0;h<n.length;h++)i[l++]=n[h];if(f){for(let h=0;h<f.length;h++)i[l++]=f[h];i.length=l}return{startRow:a,endRow:a+n.length}}const fp=[0,0,0,255],PM=[0,0,0,255],EM={stroked:!0,filled:!0,extruded:!1,elevationScale:1,wireframe:!1,_normalize:!0,_windingOrder:"CW",lineWidthUnits:"meters",lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:Number.MAX_SAFE_INTEGER,lineJointRounded:!1,lineMiterLimit:4,lineAntialiasing:!1,getPolygon:{type:"accessor",value:i=>i.polygon},getFillColor:{type:"accessor",value:PM},getLineColor:{type:"accessor",value:fp},getLineWidth:{type:"accessor",value:1},getElevation:{type:"accessor",value:1e3},material:!0};class As extends Xc{initializeState(){this.state={paths:[],pathsDiff:null},this.props.getLineDashArray&&q.removed("getLineDashArray","PathStyleExtension")()}updateState({changeFlags:e}){const t=e.dataChanged||e.updateTriggersChanged&&(e.updateTriggersChanged.all||e.updateTriggersChanged.getPolygon);if(t&&Array.isArray(e.dataChanged)){const n=this.state.paths.slice(),r=e.dataChanged.map(s=>xM({data:n,getIndex:o=>o.__source.index,dataRange:s,replace:this._getPaths(s)}));this.setState({paths:n,pathsDiff:r})}else t&&this.setState({paths:this._getPaths(),pathsDiff:null})}_getPaths(e={}){const{data:t,getPolygon:n,positionFormat:r,_normalize:s}=this.props,o=[],a=r==="XY"?2:3,{startRow:c,endRow:l}=e,{iterable:u,objectInfo:f}=Ls(t,c,l);for(const h of u){f.index++;let g=n(h,f);s&&(g=ap(g,a));const{holeIndices:p}=g,m=g.positions||g;if(p)for(let _=0;_<=p.length;_++){const y=m.slice(p[_-1]||0,p[_]||m.length);o.push(this.getSubLayerRow({path:y},h,f.index))}else o.push(this.getSubLayerRow({path:m},h,f.index))}return o}renderLayers(){const{data:e,_dataDiff:t,stroked:n,filled:r,extruded:s,wireframe:o,_normalize:a,_windingOrder:c,elevationScale:l,transitions:u,positionFormat:f}=this.props,{lineWidthUnits:h,lineWidthScale:g,lineWidthMinPixels:p,lineWidthMaxPixels:m,lineJointRounded:_,lineMiterLimit:y,lineAntialiasing:w,lineDashJustified:b}=this.props,{getFillColor:x,getLineColor:S,getLineWidth:L,getLineDashArray:R,getElevation:O,getPolygon:B,updateTriggers:k,material:U}=this.props,{paths:$,pathsDiff:N}=this.state,z=this.getSubLayerClass("fill",tl),ie=this.getSubLayerClass("stroke",el),v=this.shouldRenderSubLayer("fill",$)&&new z({_dataDiff:t,extruded:s,elevationScale:l,filled:r,wireframe:o,_normalize:a,_windingOrder:c,getElevation:O,getFillColor:x,getLineColor:s&&o?S:fp,material:U,transitions:u},this.getSubLayerProps({id:"fill",updateTriggers:k&&{getPolygon:k.getPolygon,getElevation:k.getElevation,getFillColor:k.getFillColor,lineColors:s&&o,getLineColor:k.getLineColor}}),{data:e,positionFormat:f,getPolygon:B}),E=!s&&n&&this.shouldRenderSubLayer("stroke",$)&&new ie({_dataDiff:N&&(()=>N),widthUnits:h,widthScale:g,widthMinPixels:p,widthMaxPixels:m,jointRounded:_,miterLimit:y,antialiasing:w,dashJustified:b,_pathType:"loop",transitions:u&&{getWidth:u.getLineWidth,getColor:u.getLineColor,getPath:u.getPolygon},getColor:this.getSubLayerAccessor(S),getWidth:this.getSubLayerAccessor(L),getDashArray:this.getSubLayerAccessor(R)},this.getSubLayerProps({id:"stroke",updateTriggers:k&&{getWidth:k.getLineWidth,getColor:k.getLineColor,getDashArray:k.getLineDashArray}}),{data:$,positionFormat:f,getPath:P=>P.path});return[!s&&v,E,s&&v]}}As.layerName="PolygonLayer";As.defaultProps=EM;function hp(i,e){e=e===void 0?i[0][0]:e;for(const t of i){const n=t[0]-e;n>180?t[0]-=360:n<-180&&(t[0]+=360)}}function SM(i,e,t){const[n,r]=qa(i),s=e.length;hp(e,r);const o=e[0]===e[s-1]?s-1:s;for(let a=0;a<o;a++)e[a][0]=di(r,e[a][0],t),e[a][1]=di(n,e[a][1],t)}function LM(i,e,t){const n=i(e,t),[r,s]=qa(n);return[s,r]}function ih(i,e=1){const t=wp(i,!0);return e!==1?SM(i,t,e):hp(t),t}function TM(i){const e=new Float64Array(i.length*2);let t=0;for(const n of i)e[t++]=n[0],e[t++]=n[1];return e}const AM=10;function CM(i,e){let t;return i==null?t=e:typeof i=="object"?t={...i,coverage:e}:t={getHexagon:i,coverage:e},t}const MM={...As.defaultProps,highPrecision:"auto",coverage:{type:"number",min:0,max:1,value:1},centerHexagon:null,getHexagon:{type:"accessor",value:i=>i.hexagon},extruded:!0};class Ft extends Xc{initializeState(){Ft._checkH3Lib(),this.state={edgeLengthKM:0,resolution:-1}}shouldUpdateState({changeFlags:e}){return this._shouldUseHighPrecision()?e.propsOrDataChanged:e.somethingChanged}updateState({props:e,changeFlags:t}){if(e.highPrecision!==!0&&(t.dataChanged||t.updateTriggersChanged&&t.updateTriggersChanged.getHexagon)){const n=this._calculateH3DataProps();this.setState(n)}this._updateVertices(this.context.viewport)}_calculateH3DataProps(){let e=-1,t=!1,n=!1;const{iterable:r,objectInfo:s}=Ls(this.props.data);for(const o of r){s.index++;const a=this.props.getHexagon(o,s),c=xp(a);if(e<0){if(e=c,!this.props.highPrecision)break}else if(e!==c){n=!0;break}if(Pp(a)){t=!0;break}}return{resolution:e,edgeLengthKM:e>=0?Ep(e,"km"):0,hasMultipleRes:n,hasPentagon:t}}_shouldUseHighPrecision(){if(this.props.highPrecision==="auto"){const{resolution:e,hasPentagon:t,hasMultipleRes:n}=this.state,{viewport:r}=this.context;return!!(r!=null&&r.resolution)||n||t||e>=0&&e<=5}return this.props.highPrecision}_updateVertices(e){if(this._shouldUseHighPrecision())return;const{resolution:t,edgeLengthKM:n,centerHex:r}=this.state;if(t<0)return;const s=this.props.centerHexagon||Sp(e.latitude,e.longitude,t);if(r===s)return;if(r)try{if(Lp(r,s)*n<AM)return}catch{}const{unitsPerMeter:o}=e.distanceScales;let a=ih(s);const[c,l]=qa(s),[u,f]=e.projectFlat([l,c]);a=a.map(h=>{const g=e.projectFlat(h);return[(g[0]-u)/o[0],(g[1]-f)/o[1]]}),this.setState({centerHex:s,vertices:a})}renderLayers(){return this._shouldUseHighPrecision()?this._renderPolygonLayer():this._renderColumnLayer()}_getForwardProps(){const{elevationScale:e,material:t,coverage:n,extruded:r,wireframe:s,stroked:o,filled:a,lineWidthUnits:c,lineWidthScale:l,lineWidthMinPixels:u,lineWidthMaxPixels:f,getFillColor:h,getElevation:g,getLineColor:p,getLineWidth:m,transitions:_,updateTriggers:y}=this.props;return{elevationScale:e,extruded:r,coverage:n,wireframe:s,stroked:o,filled:a,lineWidthUnits:c,lineWidthScale:l,lineWidthMinPixels:u,lineWidthMaxPixels:f,material:t,getElevation:g,getFillColor:h,getLineColor:p,getLineWidth:m,transitions:_,updateTriggers:{getFillColor:y.getFillColor,getElevation:y.getElevation,getLineColor:y.getLineColor,getLineWidth:y.getLineWidth}}}_renderPolygonLayer(){const{data:e,getHexagon:t,updateTriggers:n,coverage:r}=this.props,s=this.getSubLayerClass("hexagon-cell-hifi",As),o=this._getForwardProps();return o.updateTriggers.getPolygon=CM(n.getHexagon,r),new s(o,this.getSubLayerProps({id:"hexagon-cell-hifi",updateTriggers:o.updateTriggers}),{data:e,_normalize:!1,_windingOrder:"CCW",positionFormat:"XY",getPolygon:(a,c)=>{const l=t(a,c);return TM(ih(l,r))}})}_renderColumnLayer(){const{data:e,getHexagon:t,updateTriggers:n}=this.props,r=this.getSubLayerClass("hexagon-cell",Jc),s=this._getForwardProps();return s.updateTriggers.getPosition=n.getHexagon,new r(s,this.getSubLayerProps({id:"hexagon-cell",flatShading:!0,updateTriggers:s.updateTriggers}),{data:e,diskResolution:6,radius:1,vertices:this.state.vertices,getPosition:LM.bind(null,t)})}}Ft.defaultProps=MM;Ft.layerName="H3HexagonLayer";Ft._checkH3Lib=()=>{};const nh=()=>{var i;return((i=window.matchMedia)==null?void 0:i.call(window,"(prefers-reduced-motion: reduce)").matches)??!1};function IM({cells:i,selected:e,onSelect:t,onView:n,focus:r,interactive:s=!0,initialBounds:o=[[-5.6,41.2],[9.8,51.3]],ariaLabel:a,className:c,formatTooltip:l}){const u=Ie.useRef(null),f=Ie.useRef(null),h=Ie.useRef(null),g=yp(),p=Ie.useRef({onSelect:t,onView:n});p.current={onSelect:t,onView:n},Ie.useEffect(()=>{if(!u.current)return;const b=new Cs.Map({container:u.current,style:rl(g),bounds:o,fitBoundsOptions:{padding:16},interactive:s,attributionControl:!1,dragRotate:!1,pitchWithRotate:!1,maxZoom:12,minZoom:1.5});b.touchZoomRotate.disableRotation(),s&&b.addControl(new Cs.AttributionControl({compact:!0,customAttribution:"Basemap: Natural Earth, Marine Regions · Scores: BioMed Zones model"})),s&&b.addControl(new Cs.NavigationControl({showCompass:!1}),"top-right");const x=new xC({interleaved:!1,layers:[]});b.addControl(x);const S=()=>{var O,B;const R=b.getBounds();(B=(O=p.current).onView)==null||B.call(O,{zoom:b.getZoom(),bbox:[R.getWest(),R.getSouth(),R.getEast(),R.getNorth()]})};b.on("load",S),b.on("moveend",S),f.current=b,h.current=x;const L=vp(b,u.current);return()=>{L(),b.remove(),f.current=null,h.current=null}},[]),Ie.useEffect(()=>{var b;(b=f.current)==null||b.setStyle(rl(g))},[g]),Ie.useEffect(()=>{!r||!f.current||f.current.fitBounds(r.bounds,{padding:24,duration:nh()?0:700,essential:!0})},[r]);const m=Ie.useRef(!1),[_,y]=Ie.useState(!1),w=Ie.useMemo(()=>{const b=new Ft({id:"cells",data:i,getHexagon:S=>S[0],getFillColor:S=>mp(S[1],S[2]),extruded:!1,stroked:!1,pickable:s,highPrecision:!1,autoHighlight:s,highlightColor:[255,255,255,70],transitions:_&&!nh()?{getFillColor:200}:void 0}),x=e?new Ft({id:"selected",data:[e],getHexagon:S=>S,filled:!1,stroked:!0,getLineColor:g?[255,255,255,255]:[12,17,22,255],lineWidthUnits:"pixels",getLineWidth:2.5}):null;return x?[b,x]:[b]},[i,e,s,g,_]);return Ie.useEffect(()=>{var b;(b=h.current)==null||b.setProps({layers:w,onAfterRender:()=>{!m.current&&i.length>0&&(m.current=!0,performance.mark("bz:map-ready"),y(!0))},onClick:x=>{var S,L;x.object&&((L=(S=p.current).onSelect)==null||L.call(S,x.object[0]))},getTooltip:s?x=>x.object?{text:l?l(x.object):`${_p[x.object[2]]??x.object[2]} · score ${x.object[1].toFixed(0)}
${x.object[0]}`,style:{background:"var(--surface)",color:"var(--ink)",border:"1px solid var(--border-strong)",borderRadius:"4px",fontFamily:"var(--font-mono)",fontSize:"11px",padding:"4px 6px",whiteSpace:"pre"}}:null:void 0,getCursor:({isHovering:x})=>x?"pointer":"grab"})},[w,s,l,i.length]),mr.jsx("div",{className:c,children:mr.jsx("div",{ref:u,className:"h-full w-full",role:"region","aria-label":a,"aria-roledescription":"map"})})}function RM(i){return mr.jsx(bp,{className:i.className,compact:i.interactive===!1,children:mr.jsx(IM,{...i})})}const $M=Object.freeze(Object.defineProperty({__proto__:null,MapView:RM},Symbol.toStringTag,{value:"Module"}));export{V1 as A,gn as B,Ta as C,se as G,RM as M,he as T,ew as a,Di as b,Fe as c,ST as d,zM as e,Lx as f,mt as g,za as h,wT as i,xT as j,PT as k,NT as l,$M as m,CT as r};
