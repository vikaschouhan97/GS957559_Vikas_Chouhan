"use strict";(self.webpackChunkmy_ts_app=self.webpackChunkmy_ts_app||[]).push([[164,565],{1565:(e,a,t)=>{t.r(a),t.d(a,{MainWrapper:()=>f,default:()=>m});var l=t(2791),r=t(3614),d=t(9633),o=t(6934),i=t(6029),n=t(4045),s=t(4420),h=t(2643),c=t(3763),u=t(184);d.O3h.registerModules([d.wUi,d.yir,d.imY,d.ICW]);const f=(0,o.ZP)(i.Z)((()=>({width:"100%",marginLeft:"170px",height:"93%",marginTop:"60px",padding:"16px",background:"#d0d0d0"}))),m=()=>{var e,a,t,o,i;const m=(0,s.I0)(),[v]=(0,l.useState)(0),{calendarData:p}=(0,s.v9)((e=>e.fileData)),[S,w]=(0,l.useState)((null===(e=p[v])||void 0===e||null===(a=e.children)||void 0===a?void 0:a.map((e=>[...e.children])).flat())||[]);(0,l.useEffect)((()=>{var e,a;w((null===(e=p[v])||void 0===e||null===(a=e.children)||void 0===a?void 0:a.map((e=>[...e.children])).flat())||[])}),[p]);const D=[{headerName:"Store",field:"storeLabel",pinned:"left",width:250},{headerName:"SKU",field:"skuLabel",pinned:"left",width:250},{headerName:null===(t=p[v])||void 0===t?void 0:t.headerName,children:null===(o=p[v])||void 0===o||null===(i=o.children)||void 0===i?void 0:i.map((e=>({headerName:e.headerName,children:[{headerName:"Sales Units",field:"SalesUnits",cellStyle:c.hD,width:130},{headerName:"Sales Dollars",field:"SalesDollar",valueFormatter:e=>"$".concat(e.value),cellStyle:c.hD,width:130},{headerName:"GM Dollars",field:"gmDollar",valueFormatter:e=>"$".concat(e.value),cellStyle:c.hD,width:130},{headerName:"GM Percent",field:"gmPercent",valueFormatter:e=>"".concat(e.value,"%"),cellStyle:c.hD,cellClassRules:c.e_,width:130}]})))}];return(0,u.jsx)(f,{children:(0,u.jsx)(r.s,{rowData:S,columnDefs:D,modules:[d.ICW],debug:!0,defaultColDef:c.KR,onGridReady:async()=>{try{const e=await fetch(c.Ye),a=await e.blob();if(!a)return;const t=new FileReader;t.readAsArrayBuffer(a),t.onload=e=>{var a;const t=null===(a=e.target)||void 0===a?void 0:a.result,l=n.ij(new Uint8Array(t),{type:"array"}),r=l.Sheets.Calendar,d=n.P6.sheet_to_json(r),o=l.Sheets.Planning,i=n.P6.sheet_to_json(o),s=l.Sheets.SKUs,c=n.P6.sheet_to_json(s),u={};c.forEach((e=>{let{ID:a,Label:t,Price:l,Cost:r}=e;u[a]={price:parseFloat(l),Label:t,cost:parseFloat(r)}}));const f=l.Sheets.Stores,v=n.P6.sheet_to_json(f),p={};v.forEach((e=>{let{ID:a,Label:t}=e;p[a]=t}));const S=[],w=[],D={};d.forEach((e=>{const{"Month Label":a,"Week Label":t,Week:l}=e;S.includes(a)||S.push(a),w.includes(l)||w.push(l),D[a]||(D[a]={headerName:a,children:[]});let r=D[a].children.find((e=>e.week===l));r||(r={headerName:t,week:l,children:[]},D[a].children.push(r))})),i.forEach((e=>{let{Store:a,SKU:t,Week:l,"Sales Units":r}=e;const d=u[t].price||0,o=u[t].cost||0,i=u[t].Label,n=p[a],s=d*r,h=s-r*o,c=Math.trunc(h/s*100)||0;Object.values(D).forEach((e=>{const d=e.children.find((e=>e.week===l));d&&d.children.push({Store:a,SKU:t,SalesUnits:r,SalesDollar:s.toFixed(2),skuLabel:i,storeLabel:n,gmDollar:h.toFixed(2),gmPercent:c})}))}));const b=S.map((e=>D[e])).filter(Boolean).map((e=>({...e,children:e.children.sort(((e,a)=>w.indexOf(e.week)-w.indexOf(a.week)))})));m((0,h.k2)(b))}}catch(e){console.error("Error fetching data:",e)}}})})}},164:(e,a,t)=>{t.r(a),t.d(a,{DeleteButtonRenderer:()=>v,default:()=>p});var l=t(2791),r=t(3614),d=t(9633),o=t(1565),i=t(4045),n=t(3400),s=t(6029),h=t(1668),c=t(4420),u=t(2643),f=(t(6704),t(3763)),m=t(184);d.O3h.registerModules([d.I6w,d.oUh,d.CBb,d.ICW,d.n4K,d.ZAx]);const v=e=>{const{storeData:a}=(0,c.v9)((e=>e.fileData)),t=(0,c.I0)();return(0,m.jsx)(n.Z,{onClick:()=>{const l=a.filter((a=>a.ID!==e.data.ID)).map(((e,a)=>({...e,seqNo:a+1})));t((0,u.og)(l))},size:"small",children:(0,m.jsx)(h.Z,{})})},p=()=>{const e=(0,c.I0)(),{storeData:a}=(0,c.v9)((e=>e.fileData)),t=(0,l.useMemo)((()=>({width:"100%",height:"100%"})),[]),d=(0,l.useMemo)((()=>({height:"100%",width:"100%"})),[]),[n]=(0,l.useState)([{headerName:"",field:"delete",width:50,cellRenderer:v},{headerName:"S.No.",field:"seqNo",width:100,rowDrag:!0},{headerName:"Store ID",field:"ID",width:150,editable:!0},{headerName:"Store Name",field:"Label",width:250,editable:!0},{headerName:"City",field:"City",width:200,editable:!0},{headerName:"State",field:"State",width:100,editable:!0}]),h={width:170,valueSetter:t=>{const l=t.data.ID,r=t.column.colId;if(null!==t&&void 0!==t&&t.newValue){const d=null===a||void 0===a?void 0:a.map((e=>e.ID===l?{...e,[r]:t.newValue}:e));e((0,u.og)(d))}}},p=(0,l.useCallback)((async a=>{w(a.api);const t=await fetch(f.Ye),l=await t.blob();if(!l)return;const r=new FileReader;r.onload=a=>{var t;const l=null===(t=a.target)||void 0===t?void 0:t.result,r=i.ij(l,{type:"binary"}).Sheets.Stores,d=i.P6.sheet_to_json(r).map(((e,a)=>({seqNo:e["Seq No."]||a+1,ID:e.ID,Label:e.Label,City:e.City,State:e.State})));e((0,u.og)(d))},r.readAsArrayBuffer(l)}),[]),[S,w]=(0,l.useState)(null),D=(0,l.useCallback)((()=>{var a;if(!S)return;const t=null===S||void 0===S||null===(a=S.getRenderedNodes())||void 0===a?void 0:a.map(((e,a)=>({...e.data,seqNo:a+1})));e((0,u.og)(t))}),[S,e]);return(0,m.jsx)(o.MainWrapper,{sx:{height:"85%"},children:(0,m.jsx)(s.Z,{style:t,children:(0,m.jsx)(s.Z,{style:d,children:(0,m.jsx)(r.s,{rowData:a,columnDefs:n,defaultColDef:h,rowDragManaged:!0,onGridReady:p,onDragStopped:D})})})})}},1668:(e,a,t)=>{var l=t(4836);a.Z=void 0;var r=l(t(5649)),d=t(184),o=(0,r.default)((0,d.jsx)("path",{d:"M6 21h12V7H6v14zm2.46-9.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"}),"DeleteForeverSharp");a.Z=o},6704:()=>{}}]);
//# sourceMappingURL=164.dcf1f0fc.chunk.js.map