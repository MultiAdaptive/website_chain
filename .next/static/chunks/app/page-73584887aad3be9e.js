(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2134:function(e,a,t){Promise.resolve().then(t.bind(t,7004))},3436:function(e,a,t){"use strict";t.d(a,{Z:function(){return f}});var n=t(7437),s=t(2265),l=t(6286),c=t(1768),r=t(8709),i=t(7834),o=t(6463),h=t(8472),d=t(6169),u=t.n(d);let b=l.Z.Search,_=[{value:"Bitcoin",label:"Bitcoin"},{value:"Etheram",label:"Etheram"}];function f(e){let{placeholder:a,onSearch:t}=e,l=(0,o.useRouter)(),[d,f]=(0,s.useState)("Bitcoin");async function m(e){let a=await h.Z.get("/api_btc/filter-blob",{params:e});if(200===a.status){if(null===a.data.data)c.ZP.warning({className:u().messageStyle,content:(0,n.jsxs)("div",{style:{display:"inline-block",textAlign:"left"},children:[(0,n.jsx)("p",{children:"Nothing was found "}),(0,n.jsx)("p",{children:"Use the hash of a block, transaction, "}),(0,n.jsx)("p",{children:"address or namespace for correct search"})]})});else{let e=a.data.data[0];l.push("/blobs/detail?commitment_hash=".concat(e.commitment_hash,"&chain=btc&id=").concat(e.blob_id))}}}async function p(e){let a=await h.Z.get("/api/filter-blob",{params:e});if(200===a.status){if(null===a.data)c.ZP.warning({className:u().messageStyle,content:(0,n.jsxs)("div",{style:{display:"inline-block",textAlign:"left"},children:[(0,n.jsx)("p",{children:"Nothing was found "}),(0,n.jsx)("p",{children:"Use the hash of a block, transaction, "}),(0,n.jsx)("p",{children:"address or namespace for correct search"})]})});else{let e=a.data.data[0];l.push("/blobs/detail?commitment_hash=".concat(e.commitment_hash,"&chain=eth&id=").concat(e.blob_id))}}}return(0,n.jsx)("div",{className:u().easySearchContainer,children:(0,n.jsxs)("div",{className:u().rightBox,children:[(0,n.jsx)(r.Z,{defaultValue:"Bitcoin",className:u().easySearchSelect,options:_,onChange:function(e){f(e)}}),(0,n.jsx)(b,{className:u().easySearch,enterButton:(0,n.jsx)(i.Z,{className:u().searchIcon}),placeholder:a,onSearch:e=>{t instanceof Function&&t(d,e),"Bitcoin"===d?m({filter:e,data_size:0,per_page:4,page:1}):p({filter:e,data_size:0,per_page:4,page:1})}})]})})}},7004:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return j}});var n=t(7437),s=t(2265),l=t(3436),c=t(3618),r=t(6648),i=t(7138),o=t(6463),h=t(7944),d=t(7783),u=t(4839),b=t(2779),_=t.n(b),f=t(5986);function m(e){let a=(0,o.useRouter)(),{blob:t,chain:s}=e;function l(e){if(null!=e)return e.slice(0,5)+"..."+e.slice(-5)}if("object"==typeof t){let e=new Date(t.receive_at).getTime(),c=(0,f.Jn)(e);return(0,n.jsxs)("div",{className:_().blobCard,onClick:()=>{var e,n;e=t.commitment_hash,n=t.blob_id,a.push("/blobs/detail?commitment_hash=".concat(e,"&chain=").concat(s,"&id=").concat(n))},children:[(0,n.jsxs)("div",{className:_().blobHeader,children:[(0,n.jsx)(h.Z,{twoToneColor:"#4682C8",className:"absolute left-3"}),(0,n.jsx)("p",{children:t.blob_id})]}),(0,n.jsxs)("div",{className:"hover:bg-slate-50 ".concat(_().blobContent),children:[(0,n.jsxs)("p",{className:"basic_blue",children:["CM: ",l(t.commitment)]}),(0,n.jsx)(i.default,{className:" basic_blue hover:underline",target:"_blank",href:"eth"==s?"https://etherscan.io/block/".concat(null==t?void 0:t.block_num):"http://13.228.170.151:3002/block-height/".concat(null==t?void 0:t.block_num),onClick:e=>{e.stopPropagation()},children:(0,n.jsx)("p",{children:t.block_num})}),(0,n.jsx)("p",{children:c}),(0,n.jsxs)("p",{children:["V: ",l(t.validators[0])]}),(0,n.jsxs)("p",{children:[t.fee," ","btc"==s?"Sat":"Eth"]})]})]})}return(0,n.jsxs)(c.Z,{className:(0,u.Z)(_().blobCard,_().noBorder),children:[(0,n.jsx)(r.default,{className:_().imgStyle,src:"/blob.svg",alt:"Logo",width:200,height:248}),(0,n.jsxs)("div",{className:_().linkWrapper,children:[(0,n.jsx)(i.default,{className:_().link,href:"/blobs/".concat("btc"===t?"bitcoin":"ethereum"),children:"All Blobs"}),(0,n.jsx)(d.Z,{className:_().arrow})]})]})}var p=t(8472),g=t(8518),x=t.n(g);function j(){let[e,a]=(0,s.useState)(["btc"]),[t,c]=(0,s.useState)(["eth"]);async function r(){try{await p.Z.all([p.Z.get("/api_btc/home-data"),p.Z.get("/api/home-data")]).then(p.Z.spread((e,t)=>{if(200===e.status){let t=[];t=e.data,a(["btc",...t])}if(200===t.status){let e=[];e=t.data,c(["eth",...e])}}))}catch(e){console.error(e)}}return(0,s.useEffect)(()=>{r();let e=setInterval(()=>(r(),()=>{clearInterval(e)}),6e4);return()=>{clearInterval(e)}},[r]),(0,n.jsxs)("div",{className:x().pageWrapper,children:[(0,n.jsx)(l.Z,{placeholder:"Search by TxHash / Blob / Commitment / Validator"}),(0,n.jsxs)("div",{className:(0,u.Z)("mt-8",x().cardBox),children:[(0,n.jsx)("h3",{className:(0,u.Z)("font-bold",x().title),style:{},children:"Bitcoin Blobs"}),(0,n.jsx)("div",{className:"flex flex-wrap gap-9 mt-4 justify-between",children:e.map((e,a)=>(0,n.jsx)(m,{blob:e,chain:"btc"},a))})]}),(0,n.jsxs)("div",{className:(0,u.Z)("mt-8",x().cardBox),children:[(0,n.jsx)("h3",{className:(0,u.Z)("font-bold",x().title),children:"Ethereum Blobs"}),(0,n.jsx)("div",{className:"flex flex-wrap gap-8 mt-4 justify-between",children:t.map((e,a)=>(0,n.jsx)(m,{blob:e,chain:"eth"},a))})]})]})}},5986:function(e,a,t){"use strict";function n(e){return e.charAt(0).toUpperCase()+e.slice(1)}function s(e){return/\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff)$/g.test(e)}function l(e){var a=new Date().getTime()-e;return a<6e4?Math.floor(a/1e3)+" secs ago":a<36e5?Math.floor(a/6e4)+" mins ago":a<864e5?Math.floor(a/36e5)+" hours ago":new Date(e).toLocaleDateString()}function c(e){if(null!=e)return e.slice(0,5)+"..."+e.slice(-5)}function r(e){return Date.now()-e>12096e5}t.d(a,{DG:function(){return n},Jn:function(){return l},VT:function(){return r},XR:function(){return c},qH:function(){return s}})},2779:function(e){e.exports={blobCard:"BlobCard_blobCard__igZhv",noBorder:"BlobCard_noBorder__4rrVB",blobHeader:"BlobCard_blobHeader__mMDD0",blobContent:"BlobCard_blobContent__NbKQr",imgStyle:"BlobCard_imgStyle__EHwHb",linkWrapper:"BlobCard_linkWrapper__2riNI",link:"BlobCard_link__N3xMB",arrow:"BlobCard_arrow__t4iRA"}},6169:function(e){e.exports={easySearchContainer:"EasySearch_easySearchContainer__zsncr",rightBox:"EasySearch_rightBox__9UJhJ",easySearchSelect:"EasySearch_easySearchSelect__AjqkP",easySearch:"EasySearch_easySearch__Lnbhk",searchIcon:"EasySearch_searchIcon__TzUko",messageStyle:"EasySearch_messageStyle__h3uRM"}},8518:function(e){e.exports={pageWrapper:"page_pageWrapper__KGwsZ","gap-8":"page_gap-8__OW2hq",title:"page_title__po7na"}}},function(e){e.O(0,[133,71,173,709,391,286,138,648,383,22,458,197,971,23,744],function(){return e(e.s=2134)}),_N_E=e.O()}]);