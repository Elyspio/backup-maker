var _e=Object.defineProperty;var Se=(n,e,r)=>e in n?_e(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r;var l=(n,e,r)=>(Se(n,typeof e!="symbol"?e+"":e,r),r);import{c as Oe,a as De,b as de,g as O,d as D,e as ue,f as T,i as j,h as C,C as $e,Q as M,j as ke,k as Ee,u as Ue,l as Ie,R as b,r as m,m as W,n as i,M as Ne,o as Re,T as he,p as $,q as U,S as Le,s as Je,G as d,I as z,t as Me,P as X,v as Fe,w as qe,x as Ge,y as Be,D as Ve,z as Ke,A as We,B as ze,E as Xe,F as Ye,H as ne,J as He,K as I,L as Qe,N as Ze,O as F,U as et,V as tt,W as rt,X as st,Y as nt,Z as ot,_ as at,$ as it,a0 as ct,a1 as lt,a2 as dt,a3 as ut,a4 as ht,a5 as pt,a6 as ft,a7 as mt}from"./vendor-a8a1e02c.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();function A(n,e){const{container:r}=e;return r.get(n)}function Y(n){return function(r,s){return Oe(`${n}/${r}`,s)}}function pe(n){return e=>De(`${n}/${e}`)}const fe=pe("theme"),me=fe("set"),ge=fe("toggle"),gt=de({palette:{mode:"dark",secondary:{...O,main:O[500]},primary:{...D,main:D[400]},background:{paper:"#1d1d1d",default:"#181818"}},components:{MuiPaper:{styleOverrides:{root:{"&.MuiPaper-root":{backgroundImage:"unset !important"}}}}}}),wt=de({palette:{mode:"light",secondary:{...O,main:O[900]},primary:{...D,main:D[400]},background:{paper:"#ffffff",default:"#e6e6e6"}},components:{MuiPaper:{styleOverrides:{root:{"&.MuiPaper-root":{backgroundImage:"unset !important"}}}}}}),oe={dark:gt,light:wt},vt=()=>new URL(window.location.toString()).searchParams.get("theme")||"dark",xt={current:vt()},jt=ue(xt,n=>{n.addCase(me,(e,r)=>{e.current=r.payload}),n.addCase(ge,e=>{e.current=e.current==="light"?"dark":"light"})}),Pt=pe("authentication"),H=Pt("setUserFromToken");class bt{constructor(e,r){l(this,"jsonParseReviver");l(this,"instance");l(this,"baseUrl");this.instance=r||T.create(),this.baseUrl=e??"http://localhost:4000"}getAll(e){let r=this.baseUrl+"/api/todo";r=r.replace(/[?&]$/,"");let s={method:"GET",url:r,headers:{Accept:"application/json"},cancelToken:e};return this.instance.request(s).catch(t=>{if(w(t)&&t.response)return t.response;throw t}).then(t=>this.processGetAll(t))}add(e,r){let s=this.baseUrl+"/api/todo";s=s.replace(/[?&]$/,"");let o={data:JSON.stringify(e),method:"POST",url:s,headers:{"Content-Type":"application/json",Accept:"application/json"},cancelToken:r};return this.instance.request(o).catch(a=>{if(w(a)&&a.response)return a.response;throw a}).then(a=>this.processAdd(a))}check(e,r){let s=this.baseUrl+"/api/todo/{id}/toggle";if(e==null)throw new Error("The parameter 'id' must be defined.");s=s.replace("{id}",encodeURIComponent(""+e)),s=s.replace(/[?&]$/,"");let t={method:"PUT",url:s,headers:{Accept:"application/json"},cancelToken:r};return this.instance.request(t).catch(o=>{if(w(o)&&o.response)return o.response;throw o}).then(o=>this.processCheck(o))}delete(e,r){let s=this.baseUrl+"/api/todo/{id}";if(e==null)throw new Error("The parameter 'id' must be defined.");s=s.replace("{id}",encodeURIComponent(""+e)),s=s.replace(/[?&]$/,"");let t={method:"DELETE",url:s,headers:{},cancelToken:r};return this.instance.request(t).catch(o=>{if(w(o)&&o.response)return o.response;throw o}).then(o=>this.processDelete(o))}processGetAll(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processAdd(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processCheck(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processDelete(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===204)return e.data,Promise.resolve(null);if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}}class Ct{constructor(e,r){l(this,"jsonParseReviver");l(this,"instance");l(this,"baseUrl");this.instance=r||T.create(),this.baseUrl=e??"http://localhost:4000"}deleteForUser(e,r){let s=this.baseUrl+"/api/todo/user/{id}";if(e==null)throw new Error("The parameter 'id' must be defined.");s=s.replace("{id}",encodeURIComponent(""+e)),s=s.replace(/[?&]$/,"");let t={method:"DELETE",url:s,headers:{},cancelToken:r};return this.instance.request(t).catch(o=>{if(w(o)&&o.response)return o.response;throw o}).then(o=>this.processDeleteForUser(o))}addForUser(e,r){let s=this.baseUrl+"/api/todo/user";s=s.replace(/[?&]$/,"");let o={data:JSON.stringify(e),method:"POST",url:s,headers:{"Content-Type":"application/json",Accept:"application/json"},cancelToken:r};return this.instance.request(o).catch(a=>{if(w(a)&&a.response)return a.response;throw a}).then(a=>this.processAddForUser(a))}getAllForUser(e){let r=this.baseUrl+"/api/todo/user";r=r.replace(/[?&]$/,"");let s={method:"GET",url:r,headers:{Accept:"application/json"},cancelToken:e};return this.instance.request(s).catch(t=>{if(w(t)&&t.response)return t.response;throw t}).then(t=>this.processGetAllForUser(t))}checkForUser(e,r){let s=this.baseUrl+"/api/todo/user/{id}/toggle";if(e==null)throw new Error("The parameter 'id' must be defined.");s=s.replace("{id}",encodeURIComponent(""+e)),s=s.replace(/[?&]$/,"");let t={method:"PUT",url:s,headers:{Accept:"application/json"},cancelToken:r};return this.instance.request(t).catch(o=>{if(w(o)&&o.response)return o.response;throw o}).then(o=>this.processCheckForUser(o))}processDeleteForUser(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===204)return e.data,Promise.resolve(null);if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processAddForUser(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===201){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processGetAllForUser(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processCheckForUser(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return g("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}}let yt=class extends Error{constructor(r,s,t,o,a){super();l(this,"message");l(this,"status");l(this,"response");l(this,"headers");l(this,"result");l(this,"isApiException",!0);this.message=r,this.status=s,this.response=t,this.headers=o,this.result=a}static isApiException(r){return r.isApiException===!0}};function g(n,e,r,s,t){throw t??new yt(n,e,r,s,null)}function w(n){return n&&n.isAxiosError===!0}var Tt=Object.defineProperty,At=Object.getOwnPropertyDescriptor,_t=(n,e,r,s)=>{for(var t=s>1?void 0:s?At(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&Tt(e,r,t),t};let _=class{unWrapAxios(n){return n.data}};_=_t([j()],_);const N={localStorage:{jwt:Symbol.for("authentication:jwt")}};var St=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,we=(n,e,r,s)=>{for(var t=s>1?void 0:s?Ot(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&St(e,r,t),t};let v=class extends _{constructor(){super(...arguments);l(this,"localStorage")}parseJwt(e){const s=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),t=decodeURIComponent(window.atob(s).split("").map(o=>"%"+("00"+o.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(t).data}getToken(){return this.localStorage.get()}setToken(e){return this.localStorage.set(e)}delete(){this.localStorage.remove()}};we([C(N.localStorage.jwt)],v.prototype,"localStorage",2);v=we([j()],v);var Dt=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,kt=(n,e,r,s)=>{for(var t=s>1?void 0:s?$t(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&Dt(e,r,t),t},Et=(n,e)=>(r,s)=>e(r,s,n);let k=class{constructor(n){l(this,"todo");const e=T.create({withCredentials:!0,transformResponse:[]});e.interceptors.request.use(r=>(r.headers.Authorization=`Bearer ${n.getToken()}`,r)),this.todo={common:new bt(window.config.endpoints.core,e),user:new Ct(window.config.endpoints.core,e)}}};k=kt([j(),Et(0,C(v))],k);class Ut{constructor(e,r){l(this,"jsonParseReviver");l(this,"instance");l(this,"baseUrl");this.instance=r||T.create(),this.baseUrl=e??"http://localhost:4001"}register(e,r,s){let t=this.baseUrl+"/api/auth/{username}";if(e==null)throw new Error("The parameter 'username' must be defined.");t=t.replace("{username}",encodeURIComponent(""+e)),t=t.replace(/[?&]$/,"");let a={data:JSON.stringify(r),method:"POST",url:t,headers:{"Content-Type":"application/json",Accept:"application/json"},cancelToken:s};return this.instance.request(a).catch(c=>{if(f(c)&&c.response)return c.response;throw c}).then(c=>this.processRegister(c))}changePassword(e,r,s){let t=this.baseUrl+"/api/auth/{username}";if(e==null)throw new Error("The parameter 'username' must be defined.");t=t.replace("{username}",encodeURIComponent(""+e)),t=t.replace(/[?&]$/,"");let a={data:JSON.stringify(r),method:"PUT",url:t,headers:{"Content-Type":"application/json"},cancelToken:s};return this.instance.request(a).catch(c=>{if(f(c)&&c.response)return c.response;throw c}).then(c=>this.processChangePassword(c))}initRegister(e,r){let s=this.baseUrl+"/api/auth/{username}/init";if(e==null)throw new Error("The parameter 'username' must be defined.");s=s.replace("{username}",encodeURIComponent(""+e)),s=s.replace(/[?&]$/,"");let t={method:"POST",url:s,headers:{Accept:"application/json"},cancelToken:r};return this.instance.request(t).catch(o=>{if(f(o)&&o.response)return o.response;throw o}).then(o=>this.processInitRegister(o))}initChangePassword(e,r){let s=this.baseUrl+"/api/auth/{username}/init";if(e==null)throw new Error("The parameter 'username' must be defined.");s=s.replace("{username}",encodeURIComponent(""+e)),s=s.replace(/[?&]$/,"");let t={method:"PUT",url:s,headers:{Accept:"application/json"},cancelToken:r};return this.instance.request(t).catch(o=>{if(f(o)&&o.response)return o.response;throw o}).then(o=>this.processInitChangePassword(o))}login(e,r,s){let t=this.baseUrl+"/api/auth/{username}/login";if(e==null)throw new Error("The parameter 'username' must be defined.");t=t.replace("{username}",encodeURIComponent(""+e)),t=t.replace(/[?&]$/,"");let a={data:JSON.stringify(r),method:"POST",url:t,headers:{"Content-Type":"application/json",Accept:"application/json"},cancelToken:s};return this.instance.request(a).catch(c=>{if(f(c)&&c.response)return c.response;throw c}).then(c=>this.processLogin(c))}initLogin(e,r){let s=this.baseUrl+"/api/auth/{username}/login/init";if(e==null)throw new Error("The parameter 'username' must be defined.");s=s.replace("{username}",encodeURIComponent(""+e)),s=s.replace(/[?&]$/,"");let t={method:"POST",url:s,headers:{Accept:"application/json"},cancelToken:r};return this.instance.request(t).catch(o=>{if(f(o)&&o.response)return o.response;throw o}).then(o=>this.processInitLogin(o))}processRegister(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===201){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processChangePassword(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===204)return e.data,Promise.resolve(null);if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processInitRegister(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processInitChangePassword(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processLogin(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processInitLogin(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}}class ve{constructor(e,r){l(this,"jsonParseReviver");l(this,"instance");l(this,"baseUrl");this.instance=r||T.create(),this.baseUrl=e??"http://localhost:4001"}verify(e){let r=this.baseUrl+"/api/jwt/verify";r=r.replace(/[?&]$/,"");let s={method:"GET",url:r,headers:{Accept:"application/json"},cancelToken:e};return this.instance.request(s).catch(t=>{if(f(t)&&t.response)return t.response;throw t}).then(t=>this.processVerify(t))}getValidationKey(e){let r=this.baseUrl+"/api/jwt/validation-key";r=r.replace(/[?&]$/,"");let s={method:"GET",url:r,headers:{Accept:"application/json"},cancelToken:e};return this.instance.request(s).catch(t=>{if(f(t)&&t.response)return t.response;throw t}).then(t=>this.processGetValidationKey(t))}refreshJwt(e){let r=this.baseUrl+"/api/jwt/refresh";r=r.replace(/[?&]$/,"");let s={method:"POST",url:r,headers:{Accept:"application/json"},cancelToken:e};return this.instance.request(s).catch(t=>{if(f(t)&&t.response)return t.response;throw t}).then(t=>this.processRefreshJwt(t))}processVerify(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processGetValidationKey(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}processRefreshJwt(e){const r=e.status;let s={};if(e.headers&&typeof e.headers=="object")for(let t in e.headers)e.headers.hasOwnProperty(t)&&(s[t]=e.headers[t]);if(r===200){const t=e.data;let o=null;return o=JSON.parse(t),Promise.resolve(o)}else if(r!==200&&r!==204){const t=e.data;return p("An unexpected server error occurred.",r,t,s)}return Promise.resolve(null)}}var xe=(n=>(n.Dark="Dark",n.Light="Light",n.System="System",n))(xe||{});class It extends Error{constructor(r,s,t,o,a){super();l(this,"message");l(this,"status");l(this,"response");l(this,"headers");l(this,"result");l(this,"isApiException",!0);this.message=r,this.status=s,this.response=t,this.headers=o,this.result=a}static isApiException(r){return r.isApiException===!0}}function p(n,e,r,s,t){throw t??new It(n,e,r,s,null)}function f(n){return n&&n.isAxiosError===!0}var Nt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,Lt=(n,e,r,s)=>{for(var t=s>1?void 0:s?Rt(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&Nt(e,r,t),t},Jt=(n,e)=>(r,s)=>e(r,s,n);let E=class{constructor(n){l(this,"auth");l(this,"jwt");const e=T.create({withCredentials:!0,transformResponse:[]});e.interceptors.request.use(r=>(r.headers.Authorization=`Bearer ${n.getToken()}`,r)),this.auth=new Ut(window.config.endpoints.authentication,e),this.jwt=new ve(window.config.endpoints.authentication,e)}};E=Lt([j(),Jt(0,C(v))],E);const Mt=n=>{n.bind(k).toSelf(),n.bind(E).toSelf(),n.bind(ve).toSelf()};class Ft{constructor(){l(this,"internal",new EventTarget)}on(e,r){this.internal.addEventListener(e,s=>r.call(r,...s.detail))}emit(e,...r){console.log("EventManager emit",e),this.internal.dispatchEvent(new CustomEvent(e,{detail:r}))}}function qt(n){return window.open(n)}var Gt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,Vt=(n,e,r,s)=>{for(var t=s>1?void 0:s?Bt(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&Gt(e,r,t),t},ae=(n,e)=>(r,s)=>e(r,s,n);let y=class extends _{constructor(n,e){super(),this.localStorage=n,this.authenticationApi=e}openLoginPage(){return qt(`${window.config.endpoints.authentication}/login`)}async logout(){await this.localStorage.remove(),R.emit("logout")}isValid(){return this.authenticationApi.jwt.verify()}};y=Vt([j(),ae(0,C(N.localStorage.jwt)),ae(1,C(E))],y);const R=new Ft;var Kt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,zt=(n,e,r,s)=>{for(var t=s>1?void 0:s?Wt(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&Kt(e,r,t),t};let B=class{getThemeFromSystem(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}};B=zt([j()],B);var Xt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,Ht=(n,e,r,s)=>{for(var t=s>1?void 0:s?Yt(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&Xt(e,r,t),t};let V=class{constructor(n){this.base=n}set(n,e){let r=this.base;e!==void 0&&(r+=" "+e),window.localStorage.setItem(r,JSON.stringify(n))}get(n){let e=this.base;n!==void 0&&(e+=" "+n);const r=window.localStorage.getItem(e);if(r!==null)return JSON.parse(r)}remove(n){let e=this.base;n!==void 0&&(e+=" "+n),window.localStorage.removeItem(e)}};V=Ht([j()],V);var Qt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,je=(n,e,r,s)=>{for(var t=s>1?void 0:s?Zt(e,r):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(t=(s?a(e,r,t):a(t))||t);return s&&t&&Qt(e,r,t),t};let x=class extends _{constructor(){super(...arguments);l(this,"backendApiClient");l(this,"common",{get:async e=>await this.backendApiClient.todo.common.getAll(e),add:async e=>await this.backendApiClient.todo.common.add(e),check:async e=>await this.backendApiClient.todo.common.check(e),remove:async e=>{await this.backendApiClient.todo.common.delete(e)}});l(this,"user",{get:async e=>await this.backendApiClient.todo.user.getAllForUser(e),add:async e=>await this.backendApiClient.todo.user.addForUser(e),check:async e=>await this.backendApiClient.todo.user.checkForUser(e),remove:async e=>{await this.backendApiClient.todo.user.deleteForUser(e)}})}};je([C(k)],x.prototype,"backendApiClient",2);x=je([j()],x);const er=n=>{n.bind(y).toSelf(),n.bind(v).toSelf(),n.bind(x).toSelf(),n.bind(B).toSelf(),n.bind(N.localStorage.jwt).toConstantValue(new V("authentication:jwt"))},S=new $e({defaultScope:"Singleton"});Mt(S);er(S);const Q=Y("authentication"),Pe=S.get(N.localStorage.jwt);function tr(n){return new Promise(e=>{let r;const s=()=>r!==void 0&&clearInterval(r);n.onclose=s;const t=()=>(console.debug("Checking if user is logged from local storage"),Pe.get()!==void 0?(s(),e(),!0):!1);t()||(r=setInterval(()=>{t()},250))})}const rr=Q("login",async(n,{getState:e,dispatch:r,extra:s})=>{const t=A(v,s),o=A(y,s),{logged:a}=e().authentication;if(!a){const c=M.info("Connecting",{autoClose:!1}),u=o.openLoginPage();if(u!=null){await tr(u),u.close();const h=t.parseJwt(Pe.get());R.emit("login",h),M.update(c,{type:"success",render:"Logged",autoClose:3e3}),r(H(h))}else throw M.update(c,{type:"error",render:"Could not login",autoClose:3e3}),new Error("An error occurred while opening the login page")}}),sr=Q("silentLogin",async(n,{extra:e,dispatch:r})=>{const s=A(y,e),t=A(v,e),o=t.getToken();if(o&&await s.isValid()){const a=t.parseJwt(o);R.emit("login",a),r(H(a))}else t.delete()}),be=Q("logout",async(n,{extra:e})=>{await A(y,e).logout(),R.emit("logout")});window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",n=>{const e=n.matches?"dark":"light",{settings:r}=K.getState().authentication;(r==null?void 0:r.theme)===xe.System&&K.dispatch(me(e))});const ie={logged:!1},nr=ue(ie,n=>{n.addCase(H,(e,r)=>{e.logged=!0,e.user=r.payload}),n.addCase(be.fulfilled,e=>{e.logged=ie.logged,e.user=void 0})}),L=Y("todo"),Z=L("getTodo",async(n,{extra:e})=>{const{container:r}=e,s=r.get(x);return await(n==="user"?s.user.get:s.common.get)()}),ee=L("addTodo",async({mode:n,label:e},{extra:r})=>{const{container:s}=r,t=s.get(x);return await(n==="user"?t.user.add:t.common.add)(e)}),te=L("deleteTodo",async({mode:n,id:e},{extra:r})=>{const{container:s}=r,t=s.get(x);return await(n==="user"?t.user.remove:t.common.remove)(e)}),re=L("checkTodo",async({mode:n,id:e},{extra:r})=>{const{container:s}=r,t=s.get(x);return await(n==="user"?t.user.check:t.common.check)(e)}),or={todos:{public:[],user:[]}},ar=ke({name:"todo",initialState:or,reducers:{},extraReducers:n=>{n.addCase(Z.fulfilled,(e,r)=>{e.todos[r.meta.arg]=r.payload}),n.addCase(ee.fulfilled,(e,r)=>{e.todos[r.meta.arg.mode].push(r.payload)}),n.addCase(te.fulfilled,(e,r)=>{e.todos[r.meta.arg.mode]=e.todos[r.meta.arg.mode].filter(s=>s.id!==r.meta.arg.id)}),n.addCase(re.fulfilled,(e,r)=>{e.todos[r.meta.arg.mode]=e.todos[r.meta.arg.mode].filter(s=>s.id!==r.meta.arg.id),e.todos[r.meta.arg.mode].push(r.payload)})}}),ir=ar.reducer,cr=Ee({reducer:{theme:jt,authentication:nr,todo:ir},devTools:!1,middleware:n=>n({thunk:{extraArgument:{container:S}}})}),se=()=>Ie(),J=Ue,K=cr;function lr(n){const[e,r]=b.useState(n);return{open:e,setOpen:o=>{o==null||o.stopPropagation(),e||r(!0)},setClose:o=>{o==null||o.stopPropagation(),e&&r(!1)}}}function dr(){const[n,e]=b.useState(null),r=b.useCallback(t=>{t.preventDefault(),e(o=>o===null?{mouseX:t.clientX-2,mouseY:t.clientY-4}:null)},[]),s=b.useCallback(()=>{e(null)},[]);return{open:n!==null,position:n?{top:n.mouseY,left:n.mouseX}:void 0,closeMenu:s,onContextMenu:r}}function ur({data:n,mode:e}){const{open:r,closeMenu:s,onContextMenu:t,position:o}=dr(),a=se(),c=m.useMemo(()=>W({addTodo:ee,deleteTodo:te,checkTodo:re,getTodos:Z},a),[a]),u=m.useCallback(async()=>{await c.checkTodo({mode:e,id:n.id})},[c,e,n]),h=m.useCallback(async()=>{s(),await c.deleteTodo({id:n.id,mode:e})},[e,c,n,s]);return i.jsxs(i.Fragment,{children:[i.jsx(Ne,{open:r,onClose:s,anchorReference:"anchorPosition",anchorPosition:o,children:i.jsx(Re,{color:"error",onClick:h,children:"Delete"})}),i.jsxs(he,{onContextMenu:t,sx:{"&:last-child td, &:last-child th":{border:0}},children:[i.jsx($,{scope:"row",children:i.jsx(U,{children:n.label})}),i.jsx($,{align:"right",children:i.jsx(Le,{onClick:u,checked:n.checked})})]},n.id)]})}function ce({mode:n}){const{todos:e,logged:r}=J(P=>({todos:[...P.todo.todos[n]].sort((Te,Ae)=>Te.label.localeCompare(Ae.label)),logged:P.authentication.logged})),s=se(),t=m.useMemo(()=>W({addTodo:ee,deleteTodo:te,checkTodo:re,getTodos:Z},s),[s]),[o,a]=b.useState(""),{open:c,setOpen:u,setClose:h}=lr(!1),Ce=m.useCallback(async()=>{h(),await t.addTodo({label:o,mode:n})},[n,t,o,h]);m.useEffect(()=>{t.getTodos(n)},[t,n]);const{palette:ye}=Je();return i.jsxs(d,{container:!0,direction:"column",alignItems:"center",justifyContent:"center",p:3,children:[i.jsxs(d,{container:!0,item:!0,my:3,alignItems:"center",justifyContent:"space-between",children:[i.jsx(d,{item:!0,children:i.jsx(U,{variant:"overline",children:n})}),r&&i.jsx(d,{item:!0,children:i.jsx(z,{color:"success",onClick:u,children:i.jsx(Me,{})})})]}),i.jsx(d,{item:!0,width:"100%",children:i.jsx(X,{sx:{backgroundColor:ye.background.default},children:i.jsx(Fe,{children:i.jsxs(qe,{sx:{},"aria-label":"simple table",children:[i.jsx(Ge,{children:i.jsxs(he,{children:[i.jsx($,{children:"Label"}),i.jsx($,{align:"right",children:"Done"})]})}),i.jsx(Be,{children:e.map(P=>i.jsx(ur,{mode:n,data:P},P.id))})]})})})}),i.jsxs(Ve,{open:c,onClose:h,children:[i.jsx(Ke,{children:"Add a todo"}),i.jsxs(We,{children:[i.jsx(ze,{children:"Enter a label for the new todo"}),i.jsx(Xe,{autoFocus:!0,margin:"dense",id:"todo-label",label:"Label",fullWidth:!0,variant:"standard",value:o,onChange:P=>a(P.target.value)})]}),i.jsxs(Ye,{children:[i.jsx(ne,{onClick:h,children:"Cancel"}),i.jsx(ne,{onClick:Ce,children:"Add"})]})]})]})}const hr=()=>{const n=J(e=>e.authentication.logged);return i.jsx(He,{className:"Test",children:i.jsx(X,{children:i.jsx(I,{p:2,children:i.jsxs(d,{container:!0,spacing:2,children:[i.jsx(d,{item:!0,xs:!0,children:i.jsx(ce,{mode:"public"})}),n&&i.jsx(d,{item:!0,xs:6,children:i.jsx(ce,{mode:"user"})})]})})})})},pr=({children:n,icon:e,onClick:r,className:s})=>i.jsxs("div",{className:"Action "+(s??""),onClick:r,children:[i.jsx("div",{className:"icon",children:i.jsx(z,{size:"medium",children:e})}),i.jsx("div",{className:"description",children:n})]}),fr=n=>i.jsx(U,{className:"MuiButton-label ActionDescription",children:n.children});const q=210,le=46,mr=Qe(n=>({drawer:{width:q,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:q,transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.enteringScreen})},drawerClose:{transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.leavingScreen}),overflowX:"hidden",width:le},mainSmaller:{width:`calc(100% - ${q}px) !important`,transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.enteringScreen})},main:{width:`calc(100% - ${le}px)`,transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.enteringScreen})}})),gr=n=>{const r=n.map((t,o)=>t.text===null?o:null).filter(t=>t!==null).map((t,o,a)=>n.slice(t,a[o+1])),s=(r.length>0?r:[n]).map((t,o)=>i.jsx(st,{className:"toolbar",children:t.map((a,c)=>i.jsxs(nt,{button:!0,onClick:u=>a.onClick&&a.onClick(u),children:[i.jsx(ot,{children:a.icon}),a.text]},c))},o));return i.jsx(i.Fragment,{children:s.map((t,o)=>i.jsxs(b.Fragment,{children:[t," ",o+1<s.length]},o))})};function wr(n){const[e,r]=b.useState(!1),s=mr(),t=a=>{r(!0),a.stopPropagation()},o=()=>{r(!1)};return i.jsxs("div",{className:"Drawer",children:[i.jsxs(Ze,{anchor:n.position,variant:"permanent",className:F(s.drawer,{[s.drawerOpen]:e,[s.drawerClose]:!e})+" toolbar",classes:{paper:F({[s.drawerOpen]:e,[s.drawerClose]:!e})},children:[i.jsx("div",{onClick:o,className:"drawer-btn",children:i.jsx(z,{onClick:e?o:t,size:"medium",children:e?i.jsx(et,{}):i.jsx(tt,{})})}),i.jsx(rt,{}),i.jsxs("div",{className:"actions",children:[n.actionsComponent,n.actions&&gr(n.actions)]})]}),i.jsx("main",{className:F({[s.mainSmaller]:e,[s.main]:!e}),children:n.children})]})}function vr(n){return i.jsx(I,{className:"Actions",children:n.elements.map(e=>{var r;return i.jsx(pr,{...e.component,children:i.jsx(fr,{children:e.description.children})},(r=e.description.children)==null?void 0:r.toString())})})}function xr({component:n,title:e,actions:r}){return i.jsxs(I,{className:"Drawer-hoc",children:[i.jsx(X,{elevation:1,color:"red",children:i.jsx(d,{className:"header",alignItems:"center",justifyContent:"center",container:!0,children:i.jsx(d,{item:!0,children:i.jsx(U,{variant:"h4",align:"center",children:e})})})}),i.jsx(wr,{position:"right",actionsComponent:i.jsx(vr,{elements:r}),children:i.jsx("div",{className:"content",children:n})})]})}function G(n,e){return{description:{children:n},component:e}}const jr=Y("workflow"),Pr=jr("initApp",(n,{dispatch:e})=>{e(sr())});function br(){const n=se(),{theme:e,themeIcon:r,logged:s}=J(c=>({theme:c.theme.current,themeIcon:c.theme.current==="dark"?i.jsx(at,{}):i.jsx(it,{}),logged:c.authentication.logged})),t=m.useMemo(()=>W({toggleTheme:ge,logout:be,login:rr},n),[n]),o=m.useMemo(()=>{const c=[G(e==="dark"?"Light Mode":"Dark Mode",{icon:r,onClick:()=>t.toggleTheme()})];return s?c.push(G("Logout",{icon:i.jsx(ct,{fill:"currentColor"}),onClick:t.logout})):c.push(G("Login",{icon:i.jsx(lt,{fill:"currentColor"}),onClick:t.login})),c},[e,r,s,t]),a=xr({component:i.jsx(hr,{}),actions:o,title:"Todos"});return m.useEffect(()=>{n(Pr())},[n]),i.jsx(I,{className:"Application",bgcolor:"background.default",children:a})}function Cr(){const{theme:n,current:e}=J(r=>({theme:r.theme.current==="dark"?oe.dark:oe.light,current:r.theme.current}));return i.jsx(pt,{injectFirst:!0,children:i.jsxs(ft,{theme:n,children:[i.jsx(br,{}),i.jsx(mt,{theme:e,position:"top-right"})]})})}function yr(){return i.jsx(ut.Provider,{container:S,children:i.jsx(ht,{store:K,children:i.jsx(Cr,{})})})}dt(document.getElementById("root")).render(i.jsx(yr,{}));