(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[514],{4690:function(e,a,t){Promise.resolve().then(t.bind(t,7513))},3436:function(e,a,t){"use strict";t.d(a,{Z:function(){return p}});var s=t(7437),n=t(2265),c=t(6286),r=t(1768),i=t(8709),d=t(7834),o=t(6463),l=t(8472),h=t(6169),_=t.n(h);let u=c.Z.Search,m=[{value:"Bitcoin",label:"Bitcoin"},{value:"Etheram",label:"Etheram"}];function p(e){let{placeholder:a,onSearch:t}=e,c=(0,o.useRouter)(),[h,p]=(0,n.useState)("Bitcoin");async function f(e){let a=await l.Z.get("/api_btc/filter-blob",{params:e});if(200===a.status){if(null===a.data.data)r.ZP.warning({className:_().messageStyle,content:(0,s.jsxs)("div",{style:{display:"inline-block",textAlign:"left"},children:[(0,s.jsx)("p",{children:"Nothing was found "}),(0,s.jsx)("p",{children:"Use the hash of a block, transaction, "}),(0,s.jsx)("p",{children:"address or namespace for correct search"})]})});else{let e=a.data.data[0];c.push("/blobs/detail?commitment_hash=".concat(e.commitment_hash,"&chain=btc&id=").concat(e.blob_id))}}}async function g(e){let a=await l.Z.get("/api/filter-blob",{params:e});if(200===a.status){if(null===a.data)r.ZP.warning({className:_().messageStyle,content:(0,s.jsxs)("div",{style:{display:"inline-block",textAlign:"left"},children:[(0,s.jsx)("p",{children:"Nothing was found "}),(0,s.jsx)("p",{children:"Use the hash of a block, transaction, "}),(0,s.jsx)("p",{children:"address or namespace for correct search"})]})});else{let e=a.data.data[0];c.push("/blobs/detail?commitment_hash=".concat(e.commitment_hash,"&chain=eth&id=").concat(e.blob_id))}}}return(0,s.jsx)("div",{className:_().easySearchContainer,children:(0,s.jsxs)("div",{className:_().rightBox,children:[(0,s.jsx)(i.Z,{defaultValue:"Bitcoin",className:_().easySearchSelect,options:m,onChange:function(e){p(e)}}),(0,s.jsx)(u,{className:_().easySearch,enterButton:(0,s.jsx)(d.Z,{className:_().searchIcon}),placeholder:a,onSearch:e=>{t instanceof Function&&t(h,e),"Bitcoin"===h?f({filter:e,data_size:0,per_page:4,page:1}):g({filter:e,data_size:0,per_page:4,page:1})}})]})})}},7513:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return N}});var s=t(7437),n=t(2265),c=t(4051),r=t(8924),i=t(3436),d=t(7953),o=t.n(d),l=t(4839),h=t(6648),_={src:"/_next/static/media/broadcast_blue.ac2a5508.svg",height:20,width:25,blurWidth:0,blurHeight:0},u={src:"/_next/static/media/broadcast_orange.68c28215.svg",height:20,width:25,blurWidth:0,blurHeight:0},m={src:"/_next/static/media/storage_blue.7d174f92.svg",height:22,width:22,blurWidth:0,blurHeight:0},p={src:"/_next/static/media/storage_orange.ecae8356.svg",height:22,width:22,blurWidth:0,blurHeight:0};function f(e){let a,{node:t}=e;return(0,s.jsx)("div",{className:(0,l.Z)(o().cardContainer,"eth"===t.chain&&o().blue),children:(0,s.jsxs)("div",{className:o().square,children:[(0,s.jsxs)("div",{className:o().cardHeader,children:[(0,s.jsx)(h.default,{className:o().cardIcon,src:(a=t.node_type.split(" ")[0].toLowerCase(),"eth"===t.chain?"broadcast"==a?_:m:"broadcast"==a?u:p),alt:"icon",width:20,height:20}),(0,s.jsx)("p",{children:t.name}),(0,s.jsx)("p",{children:t.node_string})]}),(0,s.jsx)("div",{className:o().cardContent,children:t.node_address}),(0,s.jsxs)("div",{className:o().cardFooter,children:[(0,s.jsxs)("p",{children:["Chain: ",t.chain]}),(0,s.jsxs)("p",{children:["Stake: ",t.staked_tokens]}),(0,s.jsx)("p",{children:t.node_type})]})]})})}var g=t(4190),x=t.n(g),b=t(8472);let j=["All","Bitcoin","Ethereum"],y=new Map([["All","all"],["Bitcoin","btc"],["Ethereum","eth"]]);function N(){let[e,a]=(0,n.useState)("All"),[t,d]=(0,n.useState)([]),[o,l]=(0,n.useState)([]),h=e=>{a(e)},_=async e=>{let a=await b.Z.get("/api/nodes",{params:e});200===a.status&&(d(a.data),l(a.data))};return(0,n.useEffect)(()=>{_({chain:"eth"})},[]),(0,n.useEffect)(()=>{let a=y.get(e);"all"===a?l(t):l(t.filter(e=>e.chain===a))},[e,t]),(0,s.jsxs)("div",{className:x().nodesWrapper,children:[(0,s.jsx)(c.ZP,{theme:{components:{Button:{colorPrimary:"#4682C8",algorithm:!0}}},children:(0,s.jsxs)("div",{className:x().nodesHeader,children:[(0,s.jsx)("div",{className:x().nodeRadios,children:j.map(a=>(0,s.jsx)(r.ZP,{className:x().nodeButton,onClick:()=>{h(a)},type:e===a?"primary":"default",children:a},a))}),(0,s.jsx)(i.Z,{placeholder:"Search by Address / Txn / Hash / Commitment"})]})}),(0,s.jsx)("div",{className:x().nodeContent,children:o.map((e,a)=>(0,s.jsx)(f,{node:e},a))})]})}},6169:function(e){e.exports={easySearchContainer:"EasySearch_easySearchContainer__zsncr",rightBox:"EasySearch_rightBox__9UJhJ",easySearchSelect:"EasySearch_easySearchSelect__AjqkP",easySearch:"EasySearch_easySearch__Lnbhk",searchIcon:"EasySearch_searchIcon__TzUko",messageStyle:"EasySearch_messageStyle__h3uRM"}},7953:function(e){e.exports={cardContainer:"NodeCard_cardContainer__5CXGa",square:"NodeCard_square__M2FTS",blue:"NodeCard_blue__f0Rvp",cardHeader:"NodeCard_cardHeader__euGsa",cardIcon:"NodeCard_cardIcon__9I7Bn",cardContent:"NodeCard_cardContent__docq7",cardFooter:"NodeCard_cardFooter__3Nbox"}},4190:function(e){e.exports={nodesWrapper:"page_nodesWrapper__KsD0I",nodesHeader:"page_nodesHeader__0ulVD",nodeRadios:"page_nodeRadios__yGagv",nodeContent:"page_nodeContent__EeUN_"}}},function(e){e.O(0,[133,71,173,709,391,286,648,383,22,971,23,744],function(){return e(e.s=4690)}),_N_E=e.O()}]);