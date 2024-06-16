(()=>{var e={};e.id=272,e.ids=[272],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},5151:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>d,routeModule:()=>p,tree:()=>c}),s(9158),s(2947),s(1258),s(6560);var r=s(3191),a=s(8716),i=s(7922),n=s.n(i),o=s(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["blobs",{children:["detail",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9158)),"/Users/new/Documents/GitHub/website-chain/app/blobs/detail/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,2947)),"/Users/new/Documents/GitHub/website-chain/app/blobs/layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,1258)),"/Users/new/Documents/GitHub/website-chain/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,6560)),"/Users/new/Documents/GitHub/website-chain/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/new/Documents/GitHub/website-chain/app/blobs/detail/page.tsx"],m="/blobs/detail/page",u={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/blobs/detail/page",pathname:"/blobs/detail",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},9280:(e,t,s)=>{Promise.resolve().then(s.bind(s,7304))},7304:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>p});var r=s(326),a=s(7577),i=s(5047);s(4099);var n=s(9094),o=s.n(n);function l({label:e,value:t}){return(0,r.jsxs)("div",{className:o().wrapper,children:[r.jsx("p",{children:e}),r.jsx("p",{children:t})]})}var c=s(1912),d=s(8992),m=s(9676),u=s.n(m);function p(){(0,i.useRouter)(),(0,a.useContext)(c.Z);let[e,t]=(0,a.useState)();return(0,r.jsxs)("div",{className:u().detail,children:[(0,r.jsxs)("div",{className:u().rowFirst,children:[(0,r.jsxs)("div",{className:u().overview,children:[r.jsx("h3",{className:u().title,children:"Overview"}),(0,r.jsxs)("div",{className:u().overviewContent,children:[r.jsx(l,{label:"Blob Index:",value:e?.BlobID}),r.jsx(l,{label:"Status:",value:e?.Status}),r.jsx(l,{label:"Block:",value:e?.BlockNum}),r.jsx(l,{label:"Timestamp:",value:e?.Timestamp}),r.jsx(l,{label:"Fee:",value:e?.Fee}),r.jsx(l,{label:"Size:",value:e?.Size}),r.jsx(l,{label:"Validator:",value:e?.Validator})]})]}),(0,r.jsxs)("div",{className:u().commitment,children:[r.jsx("h3",{className:u().title,children:"Blob Commitment"}),(0,r.jsxs)("div",{className:u().commitmentContent,children:[(0,r.jsxs)("div",{className:u().commitmentContentItem,children:[r.jsx("p",{children:"Hash"}),r.jsx("p",{children:e?.Hash})]}),(0,r.jsxs)("div",{className:u().commitmentContentItem,children:[r.jsx("p",{children:"Commitment"}),r.jsx("p",{children:e?.Commitment}),(0,r.jsxs)("p",{children:["x: ",e?.Commitment_xy.x]}),(0,r.jsxs)("p",{children:["y: ",e?.Commitment_xy.y]})]}),(0,r.jsxs)("div",{className:u().commitmentContentItem,children:[r.jsx("p",{children:"proof"}),r.jsx("p",{children:e?.Proof})]})]})]})]}),(0,r.jsxs)("div",{className:u().rowSecond,children:[r.jsx("h3",{className:u().title,children:"Data"}),(0,r.jsxs)("div",{className:u().dataContent,children:[r.jsx("div",{className:u().validBtn,children:e?.StorageState==="valid"?(0,r.jsxs)(r.Fragment,{children:[r.jsx("img",{src:"/valid.svg",alt:"valid"}),"valid"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx("img",{src:"/invalid.svg",alt:"invalid"}),"invalid"]})}),(0,d.q)(e?.Data||"")?r.jsx("img",{src:e?.Data,alt:"img"}):e?.Data]})]})]})}},863:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o});var r=s(5353),a=s(7577);let i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"swap",theme:"outlined"};var n=s(4082);let o=a.forwardRef(function(e,t){return a.createElement(n.Z,(0,r.Z)({},e,{ref:t,icon:i}))})},5621:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o});var r=s(5353),a=s(7577);let i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"unordered-list",theme:"outlined"};var n=s(4082);let o=a.forwardRef(function(e,t){return a.createElement(n.Z,(0,r.Z)({},e,{ref:t,icon:i}))})},9676:e=>{e.exports={detail:"page_detail__4aEz9",title:"page_title__5mcIE",rowFirst:"page_rowFirst__CyFne",overview:"page_overview__mPz1n",overviewContent:"page_overviewContent__av6ef",commitment:"page_commitment__xtyrg",commitmentContent:"page_commitmentContent__IAD_S",commitmentContentItem:"page_commitmentContentItem__s2bCA",rowSecond:"page_rowSecond__Sy5Oq",dataContent:"page_dataContent__LAqG9",validBtn:"page_validBtn__sQ95D"}},9094:e=>{e.exports={wrapper:"Keyval_wrapper__xkPUW"}},9158:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>o});var r=s(8570);let a=(0,r.createProxy)(String.raw`/Users/new/Documents/GitHub/website-chain/app/blobs/detail/page.tsx`),{__esModule:i,$$typeof:n}=a;a.default;let o=(0,r.createProxy)(String.raw`/Users/new/Documents/GitHub/website-chain/app/blobs/detail/page.tsx#default`)}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[948,836,523,436],()=>s(5151));module.exports=r})();