"use strict";(self.webpackChunkmy_ts_app=self.webpackChunkmy_ts_app||[]).push([[393,234,565],{1565:(e,a,t)=>{t.r(a),t.d(a,{MainWrapper:()=>f,default:()=>g});var l=t(2791),r=t(3614),o=t(9633),n=t(6934),s=t(6029),d=t(4045),i=t(4420),c=t(2643),h=t(3763),u=t(184);o.O3h.registerModules([o.wUi,o.yir,o.imY,o.ICW]);const f=(0,n.ZP)(s.Z)((()=>({width:"100%",marginLeft:"170px",height:"93%",marginTop:"60px",padding:"16px",background:"#d0d0d0"}))),g=()=>{var e,a;const t=(0,i.I0)(),[n]=(0,l.useState)(0),[s,g]=(0,l.useState)(null),{calendarData:m,fileAdded:p}=(0,i.v9)((e=>e.fileData));(0,l.useEffect)((()=>{s&&v({api:s})}),[p,s]);const v=async e=>{g(e.api);try{const e=localStorage.getItem("file");let a;if(e){const t=JSON.parse(e),l=atob(t.split(",")[1]),r=new Array(l.length);for(let e=0;e<l.length;e++)r[e]=l.charCodeAt(e);const o=new Uint8Array(r);a=new Blob([o],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}else{const e=await fetch(h.Ye);a=await e.blob()}if(!a)return;const l=new FileReader;l.readAsArrayBuffer(a),l.onload=e=>{var a;const l=null===(a=e.target)||void 0===a?void 0:a.result,r=d.ij(new Uint8Array(l),{type:"array"}),o=r.Sheets.Calendar,n=d.P6.sheet_to_json(o),s=r.Sheets.Planning,i=d.P6.sheet_to_json(s),h=r.Sheets.SKUs,u=d.P6.sheet_to_json(h),f={};u.forEach((e=>{let{ID:a,Label:t,Price:l,Cost:r}=e;f[a]={price:parseFloat(l),Label:t,cost:parseFloat(r)}}));const g=r.Sheets.Stores,m=d.P6.sheet_to_json(g),p={};m.forEach((e=>{let{ID:a,Label:t}=e;p[a]=t}));const v=[],b=[],S={};n.forEach((e=>{const{"Month Label":a,"Week Label":t,Week:l}=e;v.includes(a)||v.push(a),b.includes(l)||b.push(l),S[a]||(S[a]={headerName:a,children:[]});let r=S[a].children.find((e=>e.week===l));r||(r={headerName:t,week:l,children:[]},S[a].children.push(r))})),i.forEach((e=>{let{Store:a,SKU:t,Week:l,"Sales Units":r}=e;const o=f[t].price||0,n=f[t].cost||0,s=f[t].Label,d=p[a],i=o*r,c=i-r*n,h=Math.trunc(c/i*100)||0;Object.values(S).forEach((e=>{const o=e.children.find((e=>e.week===l));o&&o.children.push({Store:a,SKU:t,SalesUnits:r,SalesDollar:i.toFixed(2),skuLabel:s,storeLabel:d,gmDollar:c.toFixed(2),gmPercent:h})}))}));const w=v.map((e=>S[e])).filter(Boolean).map((e=>({...e,children:e.children.sort(((e,a)=>b.indexOf(e.week)-b.indexOf(a.week)))})));t((0,c.k2)(w))}}catch(a){console.error("Error fetching data:",a)}},[b,S]=(0,l.useState)((null===(e=m[n])||void 0===e||null===(a=e.children)||void 0===a?void 0:a.map((e=>[...e.children])).flat())||[]);(0,l.useEffect)((()=>{var e,a;S((null===(e=m[n])||void 0===e||null===(a=e.children)||void 0===a?void 0:a.map((e=>[...e.children])).flat())||[])}),[m]);const w=[{headerName:"Store",field:"storeLabel",pinned:"left",width:250},{headerName:"SKU",field:"skuLabel",pinned:"left",width:250},...(null!==m&&void 0!==m?m:[]).map((e=>{var a;return{headerName:e.headerName,children:(null!==(a=e.children)&&void 0!==a?a:[]).map((e=>({headerName:e.headerName,children:[{headerName:"Sales Units",field:"SalesUnits",cellStyle:h.hD,width:130},{headerName:"Sales Dollars",field:"SalesDollar",valueFormatter:e=>"$".concat(e.value),cellStyle:h.hD,width:130},{headerName:"GM Dollars",field:"gmDollar",valueFormatter:e=>"$".concat(e.value),cellStyle:h.hD,width:130},{headerName:"GM Percent",field:"gmPercent",valueFormatter:e=>"".concat(e.value,"%"),cellStyle:h.hD,cellClassRules:h.e_,width:130}]})))}}))];return(0,u.jsx)(f,{children:(0,u.jsx)(r.s,{rowData:b,columnDefs:w,modules:[o.ICW],debug:!0,defaultColDef:h.KR,onGridReady:v})})}},1393:(e,a,t)=>{t.r(a),t.d(a,{default:()=>x});var l=t(2791),r=t(3614),o=t(9633),n=t(1565),s=t(4045),d=t(6029),i=t(4294),c=t(4420),h=t(2643),u=(t(6704),t(1234)),f=t(3763),g=t(5289),m=t(7123),p=t(9157),v=t(5661),b=t(7665),S=t(184);function w(){const e=(0,c.I0)(),{addSkuDialog:a,skuData:t}=(0,c.v9)((e=>e.fileData)),[r,o]=(0,l.useState)(""),[n,s]=(0,l.useState)(""),[d,u]=(0,l.useState)(""),[f,w]=(0,l.useState)(""),[x,D]=(0,l.useState)(""),y=()=>{e((0,h.v9)(!1)),o(""),s(""),u(""),w(""),D("")};return(0,S.jsxs)(g.Z,{open:a,onClose:y,children:[(0,S.jsx)(v.Z,{children:"Add New SKU"}),(0,S.jsxs)(p.Z,{children:[(0,S.jsx)(b.Z,{label:"SKU",fullWidth:!0,margin:"dense",value:r,onChange:e=>o(e.target.value)}),(0,S.jsx)(b.Z,{label:"Price ($)",fullWidth:!0,margin:"dense",value:n,onChange:e=>s(e.target.value),error:isNaN(Number(n)),helperText:isNaN(Number(n))?"Enter a valid price":""}),(0,S.jsx)(b.Z,{label:"Cost ($)",fullWidth:!0,margin:"dense",value:d,onChange:e=>u(e.target.value),error:isNaN(Number(d)),helperText:isNaN(Number(d))?"Enter a valid cost":""}),(0,S.jsx)(b.Z,{label:"ID",fullWidth:!0,margin:"dense",value:f,onChange:e=>w(e.target.value),error:!!x,helperText:x})]}),(0,S.jsxs)(m.Z,{children:[(0,S.jsx)(i.Z,{onClick:y,sx:{background:"red",color:"#ffff","&:hover":{background:"red",opacity:.7}},children:"Cancel"}),(0,S.jsx)(i.Z,{onClick:()=>{r&&n&&d&&f?(e=>t.some((a=>a.ID===e)))(f)?D("ID already exists. Please use a unique ID."):isNaN(Number(n))||isNaN(Number(d))?D("Price and Cost must be valid numbers."):(e((0,h.JY)([...t,{ID:f,name:r,price:parseFloat(n),cost:parseFloat(d)}])),y()):D("All fields are required.")},sx:{background:"gray",color:"#ffff","&:hover":{background:"gray",opacity:.7}},disabled:!r||!n||!d||!f,children:"Add"})]})]})}o.O3h.registerModules([o.I6w,o.oUh,o.CBb,o.ICW,o.n4K,o.wUi,o.yir,o.ZAx]);const x=()=>{const e=(0,c.I0)(),[a,t]=(0,l.useState)(null),{skuData:o,fileAdded:g}=(0,c.v9)((e=>e.fileData)),m=(0,l.useMemo)((()=>({width:"100%",height:"100%"})),[]),p=(0,l.useMemo)((()=>({height:"100%",width:"100%"})),[]),[v]=(0,l.useState)([{headerName:"",field:"delete",width:50,cellRenderer:u.DeleteButtonRenderer},{headerName:"SKU",field:"name",width:300,editable:!0},{headerName:"Price",field:"price",width:150,editable:!0},{headerName:"Cost",field:"cost",width:150,editable:!0}]),b={width:170,valueSetter:a=>{const t=a.data.ID,l=a.column.colId;if(null!==a&&void 0!==a&&a.newValue){const r=null===o||void 0===o?void 0:o.map((e=>e.ID===t?{...e,[l]:a.newValue}:e));e((0,h.JY)(r))}}};(0,l.useEffect)((()=>{a&&x({api:a})}),[g,a]);const x=(0,l.useCallback)((async a=>{t(a.api);const l=localStorage.getItem("file");let r;if(l){const e=JSON.parse(l),a=atob(e.split(",")[1]),t=new Array(a.length);for(let l=0;l<a.length;l++)t[l]=a.charCodeAt(l);const o=new Uint8Array(t);r=new Blob([o],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}else{const e=await fetch(f.Ye);r=await e.blob()}if(!r)return;const o=new FileReader;o.onload=a=>{var t;const l=null===(t=a.target)||void 0===t?void 0:t.result,r=s.ij(l,{type:"binary"}).Sheets.SKUs,o=s.P6.sheet_to_json(r).map((e=>({ID:e.ID,name:e.Label,price:e.Price,cost:e.Cost.toFixed(2)})));e((0,h.JY)(o))},o.readAsArrayBuffer(r)}),[]),D=(0,l.useCallback)((()=>{var t;if(!a)return;const l=null===a||void 0===a||null===(t=a.getRenderedNodes())||void 0===t?void 0:t.map(((e,a)=>({...e.data,seqNo:a+1})));e((0,h.JY)(l))}),[a,e]);return(0,S.jsxs)(n.MainWrapper,{sx:{height:"85%"},children:[(0,S.jsx)(d.Z,{style:m,children:(0,S.jsx)(d.Z,{style:p,children:(0,S.jsx)(r.s,{rowData:o,columnDefs:v,defaultColDef:b,rowDragManaged:!0,onGridReady:x,onDragStopped:D})})}),(0,S.jsx)(i.Z,{onClick:()=>e((0,h.v9)(!0)),sx:{mt:2,background:"gray",color:"#ffff",px:2,"&:hover":{background:"gray",opacity:.7}},children:"Add SKU"}),(0,S.jsx)(w,{})]})}},1234:(e,a,t)=>{t.r(a),t.d(a,{DeleteButtonRenderer:()=>D,default:()=>y});var l=t(2791),r=t(3614),o=t(9633),n=t(1565),s=t(4045),d=t(3400),i=t(6029),c=t(4294),h=t(1668),u=t(4420),f=t(2643),g=(t(6704),t(3763)),m=t(5289),p=t(7123),v=t(9157),b=t(5661),S=t(7665),w=t(184);function x(){const e=(0,u.I0)(),{addStoreDialog:a,storeData:t}=(0,u.v9)((e=>e.fileData)),[r,o]=(0,l.useState)(""),[n,s]=(0,l.useState)(""),[d,i]=(0,l.useState)(""),[h,g]=(0,l.useState)(""),[x,D]=(0,l.useState)(""),y=()=>{e((0,f.jp)(!1)),o(""),s(""),i(""),g(""),D("")};return(0,w.jsxs)(m.Z,{open:a,onClose:y,children:[(0,w.jsx)(b.Z,{children:"Add New Store"}),(0,w.jsxs)(v.Z,{children:[(0,w.jsx)(S.Z,{label:"Store",fullWidth:!0,margin:"dense",value:r,onChange:e=>o(e.target.value)}),(0,w.jsx)(S.Z,{label:"City",fullWidth:!0,margin:"dense",value:n,onChange:e=>s(e.target.value)}),(0,w.jsx)(S.Z,{label:"State",fullWidth:!0,margin:"dense",value:d,onChange:e=>i(e.target.value)}),(0,w.jsx)(S.Z,{label:"ID",fullWidth:!0,margin:"dense",value:h,onChange:e=>g(e.target.value),error:!!x,helperText:x})]}),(0,w.jsxs)(p.Z,{children:[(0,w.jsx)(c.Z,{onClick:y,sx:{background:"red",color:"#ffff","&:hover":{background:"red",opacity:.7}},children:"Cancel"}),(0,w.jsx)(c.Z,{onClick:()=>{r&&n&&d&&h?(e=>t.some((a=>a.ID===e)))(h)?D("ID already exists. Please use a unique ID."):(e((0,f.og)([...t,{seqNo:t.length+1,City:n,State:d,Label:r,ID:h}])),y()):D("All fields are required.")},sx:{background:"gray",color:"#ffff","&:hover":{background:"gray",opacity:.7}},disabled:!r||!n||!d||!h,children:"Add"})]})]})}o.O3h.registerModules([o.I6w,o.oUh,o.CBb,o.ICW,o.n4K,o.ZAx]);const D=e=>{const{storeData:a}=(0,u.v9)((e=>e.fileData)),t=(0,u.I0)();return(0,w.jsx)(d.Z,{onClick:()=>{const l=a.filter((a=>a.ID!==e.data.ID)).map(((e,a)=>({...e,seqNo:a+1})));t((0,f.og)(l))},size:"small",children:(0,w.jsx)(h.Z,{})})},y=()=>{const e=(0,u.I0)(),{storeData:a,fileAdded:t}=(0,u.v9)((e=>e.fileData)),[o,d]=(0,l.useState)(null),h=(0,l.useMemo)((()=>({width:"100%",height:"100%"})),[]),m=(0,l.useMemo)((()=>({height:"100%",width:"100%"})),[]),[p]=(0,l.useState)([{headerName:"",field:"delete",width:50,cellRenderer:D},{headerName:"S.No.",field:"seqNo",width:100,rowDrag:!0},{headerName:"Store ID",field:"ID",width:150,editable:!0},{headerName:"Store Name",field:"Label",width:250,editable:!0},{headerName:"City",field:"City",width:200,editable:!0},{headerName:"State",field:"State",width:100,editable:!0}]),v={width:170,valueSetter:t=>{const l=t.data.ID,r=t.column.colId;if(null!==t&&void 0!==t&&t.newValue){const o=null===a||void 0===a?void 0:a.map((e=>e.ID===l?{...e,[r]:t.newValue}:e));e((0,f.og)(o))}}};(0,l.useEffect)((()=>{o&&b({api:o})}),[t,o]);const b=(0,l.useCallback)((async a=>{d(a.api);const t=localStorage.getItem("file");let l;if(t){const e=JSON.parse(t),a=atob(e.split(",")[1]),r=new Array(a.length);for(let t=0;t<a.length;t++)r[t]=a.charCodeAt(t);const o=new Uint8Array(r);l=new Blob([o],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}else{const e=await fetch(g.Ye);l=await e.blob()}if(!l)return;const r=new FileReader;r.onload=a=>{var t;const l=null===(t=a.target)||void 0===t?void 0:t.result,r=s.ij(l,{type:"binary"}).Sheets.Stores,o=s.P6.sheet_to_json(r).map(((e,a)=>({seqNo:e["Seq No."]||a+1,ID:e.ID,Label:e.Label,City:e.City,State:e.State})));e((0,f.og)(o))},r.readAsArrayBuffer(l)}),[t,e]),S=(0,l.useCallback)((()=>{var a;if(!o)return;const t=null===o||void 0===o||null===(a=o.getRenderedNodes())||void 0===a?void 0:a.map(((e,a)=>({...e.data,seqNo:a+1})));e((0,f.og)(t))}),[o,e]);return(0,w.jsxs)(n.MainWrapper,{sx:{height:"85%"},children:[(0,w.jsx)(i.Z,{style:h,children:(0,w.jsx)(i.Z,{style:m,children:(0,w.jsx)(r.s,{rowData:a,columnDefs:p,defaultColDef:v,rowDragManaged:!0,onGridReady:b,onDragStopped:S})})}),(0,w.jsx)(c.Z,{onClick:()=>e((0,f.jp)(!0)),sx:{mt:2,background:"gray",color:"#ffff",px:2,"&:hover":{background:"gray",opacity:.7}},children:"Add Store"}),(0,w.jsx)(x,{})]})}},6704:()=>{}}]);
//# sourceMappingURL=393.ad2b0d7c.chunk.js.map