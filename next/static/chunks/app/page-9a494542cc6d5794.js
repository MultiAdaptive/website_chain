(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2134:function(e,a,l){Promise.resolve().then(l.bind(l,7004))},3436:function(e,a,l){"use strict";l.d(a,{Z:function(){return _}});var s=l(7437),t=l(2265),r=l(6286),n=l(2007),c=l(8709),o=l(7834),i=l(6463),h=l(8472),d=l(6169),b=l.n(d);let u=r.Z.Search,m=[{value:"All Filters",label:"All Filters"},{value:"BlobID",label:"BlobID"},{value:"BlockNum",label:"BlockNum"},{value:"Validator",label:"Validator"},{value:"TxHash",label:"TxHash"},{value:"Commitment",label:"Commitment"}];function _(e){let{placeholder:a,onSearch:l}=e,r=(0,i.useRouter)(),[d,_]=(0,t.useState)("All Filters");async function x(e){let a=await h.Z.get("/api/search",{params:e});if(200===a.status){if(null===a.data)n.ZP.warning({className:b().messageStyle,content:(0,s.jsxs)("div",{style:{display:"inline-block",textAlign:"left"},children:[(0,s.jsx)("p",{children:"Nothing was found "}),(0,s.jsx)("p",{children:"Use the hash of a block, transaction, "}),(0,s.jsx)("p",{children:"address or namespace for correct search"})]})});else{let e=a.data[0],l=e.chain||"btc";r.push("/blobs/detail/?blobID=".concat(e.BlobID,"&chain=").concat(l))}}}return(0,s.jsx)("div",{className:b().easySearchContainer,children:(0,s.jsxs)("div",{className:b().rightBox,children:[(0,s.jsx)(c.Z,{defaultValue:"All Filters",className:b().easySearchSelect,options:m,onChange:function(e){_(e)}}),(0,s.jsx)(u,{className:b().easySearch,enterButton:(0,s.jsx)(o.Z,{className:b().searchIcon}),placeholder:a,onSearch:e=>{l instanceof Function&&l(d,e),x({q:e,category:"All Filters"===d?"All":d})}})]})})}},7004:function(e,a,l){"use strict";l.r(a),l.d(a,{default:function(){return f}});var s=l(7437),t=l(2265),r=l(3436),n=l(3618),c=l(6648),o=l(7138),i=l(6463),h=l(7783),d=l(4839),b=l(2779),u=l.n(b);function m(e){let a=(0,i.useRouter)(),{blob:l,chain:t}=e;if("object"==typeof l){var r,b;let e=(r=new Date(l.Timestamp).getTime(),(b=new Date().getTime()-r)<6e4?Math.floor(b/1e3)+" secs ago":b<36e5?Math.floor(b/6e4)+" mins ago":b<864e5?Math.floor(b/36e5)+" hours ago":new Date(r).toLocaleDateString());return(0,s.jsxs)("div",{className:u().blobCard,onClick:()=>{var e;e=l.BlobID,a.push("/blobs/detail?blobID=".concat(e,"&chain=").concat(t))},children:[(0,s.jsxs)("div",{className:u().blobHeader,children:[(0,s.jsx)(c.default,{src:"/right.svg",alt:"cardicon",width:24,height:24}),(0,s.jsx)("p",{children:l.BlobID})]}),(0,s.jsxs)("div",{className:u().blobContent,children:[(0,s.jsxs)("p",{className:"basic_blue",children:["CM: ",l.Commitment]}),(0,s.jsx)("p",{className:"basic_blue",children:l.Block}),(0,s.jsx)("p",{children:e}),(0,s.jsxs)("p",{children:["V: ",l.Validator]}),(0,s.jsxs)("p",{children:[l.Fee," ","btc"==t?"Sat":"Eth"]})]})]})}return(0,s.jsxs)(n.Z,{className:(0,d.Z)(u().blobCard,u().noBorder),children:[(0,s.jsx)(c.default,{className:u().imgStyle,src:"/blob.svg",alt:"Logo",width:200,height:248}),(0,s.jsxs)("div",{className:u().linkWrapper,children:[(0,s.jsx)(o.default,{className:u().link,href:"/blobs/".concat("btc"===l?"bitcoin":"ethereum"),children:"All Blobs"}),(0,s.jsx)(h.Z,{className:u().arrow})]})]})}var _=l(8472),x=l(8518),p=l.n(x);function f(){let[e,a]=(0,t.useState)(["btc"]),[l,n]=(0,t.useState)(["eth"]);async function c(){let e=await _.Z.get("/api/home-data");if(200===e.status){var l,s,t,r;let c=[],o=[];c=null===(s=e.data)||void 0===s?void 0:null===(l=s.result)||void 0===l?void 0:l.find(e=>"btc"===e.chain).blobs,o=null===(r=e.data)||void 0===r?void 0:null===(t=r.result)||void 0===t?void 0:t.find(e=>"eth"===e.chain).blobs,a(["btc",...c].slice(0,6)),n(["eth",...o].slice(0,6))}}return(0,t.useEffect)(()=>{c();let e=setInterval(()=>(c(),()=>{clearInterval(e)}),6e4);return()=>{clearInterval(e)}},[]),(0,s.jsxs)("div",{className:p().pageWrapper,children:[(0,s.jsx)(r.Z,{placeholder:"Search by Address / Txn / Hash / Blob / Commitment"}),(0,s.jsxs)("div",{className:(0,d.Z)("fmt-16 mt-8",p().cardBox),children:[(0,s.jsx)("h3",{className:(0,d.Z)("font-bold",p().title),style:{},children:"Bitcoin Blobs"}),(0,s.jsx)("div",{className:"flex flex-wrap gap-8 mt-4",children:e.map((e,a)=>(0,s.jsx)(m,{blob:e,chain:"btc"},a))})]}),(0,s.jsxs)("div",{className:(0,d.Z)("mt-8",p().cardBox),children:[(0,s.jsx)("h3",{className:(0,d.Z)("font-bold",p().title),children:"Ethereum Blobs"}),(0,s.jsx)("div",{className:"flex flex-wrap gap-8 mt-4",children:l.map((e,a)=>(0,s.jsx)(m,{blob:e,chain:"eth"},a))})]})]})}},2779:function(e){e.exports={blobCard:"BlobCard_blobCard__igZhv",noBorder:"BlobCard_noBorder__4rrVB",blobHeader:"BlobCard_blobHeader__mMDD0",blobContent:"BlobCard_blobContent__NbKQr",imgStyle:"BlobCard_imgStyle__EHwHb",linkWrapper:"BlobCard_linkWrapper__2riNI",link:"BlobCard_link__N3xMB",arrow:"BlobCard_arrow__t4iRA"}},6169:function(e){e.exports={easySearchContainer:"EasySearch_easySearchContainer__zsncr",rightBox:"EasySearch_rightBox__9UJhJ",easySearchSelect:"EasySearch_easySearchSelect__AjqkP",easySearch:"EasySearch_easySearch__Lnbhk",searchIcon:"EasySearch_searchIcon__TzUko",messageStyle:"EasySearch_messageStyle__h3uRM"}},8518:function(e){e.exports={pageWrapper:"page_pageWrapper__KGwsZ",title:"page_title__po7na",cardBox:"page_cardBox__YOLhB"}}},function(e){e.O(0,[133,575,554,472,286,716,458,138,648,588,971,23,744],function(){return e(e.s=2134)}),_N_E=e.O()}]);