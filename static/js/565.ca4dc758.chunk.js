"use strict";(self.webpackChunkmy_ts_app=self.webpackChunkmy_ts_app||[]).push([[565],{1565:(e,a,l)=>{l.r(a),l.d(a,{MainWrapper:()=>f,default:()=>p});var t=l(2791),r=l(3614),n=l(9633),o=l(6934),s=l(6029),d=l(4045),i=l(4420),c=l(2643),h=l(3763),u=l(184);n.O3h.registerModules([n.wUi,n.yir,n.imY,n.ICW]);const f=(0,o.ZP)(s.Z)((()=>({width:"100%",marginLeft:"170px",height:"93%",marginTop:"60px",padding:"16px",background:"#d0d0d0"}))),p=()=>{var e,a;const l=(0,i.I0)(),[o]=(0,t.useState)(0),[s,p]=(0,t.useState)(null),{calendarData:m,fileAdded:S}=(0,i.v9)((e=>e.fileData));(0,t.useEffect)((()=>{s&&v({api:s})}),[S,s]);const v=async e=>{p(e.api);try{const e=localStorage.getItem("file");let a;if(e){const l=JSON.parse(e),t=atob(l.split(",")[1]),r=new Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);const n=new Uint8Array(r);a=new Blob([n],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}else{const e=await fetch(h.Ye);a=await e.blob()}if(!a)return;const t=new FileReader;t.readAsArrayBuffer(a),t.onload=e=>{var a;const t=null===(a=e.target)||void 0===a?void 0:a.result,r=d.ij(new Uint8Array(t),{type:"array"}),n=r.Sheets.Calendar,o=d.P6.sheet_to_json(n),s=r.Sheets.Planning,i=d.P6.sheet_to_json(s),h=r.Sheets.SKUs,u=d.P6.sheet_to_json(h),f={};u.forEach((e=>{let{ID:a,Label:l,Price:t,Cost:r}=e;f[a]={price:parseFloat(t),Label:l,cost:parseFloat(r)}}));const p=r.Sheets.Stores,m=d.P6.sheet_to_json(p),S={};m.forEach((e=>{let{ID:a,Label:l}=e;S[a]=l}));const v=[],w=[],b={};o.forEach((e=>{const{"Month Label":a,"Week Label":l,Week:t}=e;v.includes(a)||v.push(a),w.includes(t)||w.push(t),b[a]||(b[a]={headerName:a,children:[]});let r=b[a].children.find((e=>e.week===t));r||(r={headerName:l,week:t,children:[]},b[a].children.push(r))})),i.forEach((e=>{let{Store:a,SKU:l,Week:t,"Sales Units":r}=e;const n=f[l].price||0,o=f[l].cost||0,s=f[l].Label,d=S[a],i=n*r,c=i-r*o,h=Math.trunc(c/i*100)||0;Object.values(b).forEach((e=>{const n=e.children.find((e=>e.week===t));n&&n.children.push({Store:a,SKU:l,SalesUnits:r,SalesDollar:i.toFixed(2),skuLabel:s,storeLabel:d,gmDollar:c.toFixed(2),gmPercent:h})}))}));const g=v.map((e=>b[e])).filter(Boolean).map((e=>({...e,children:e.children.sort(((e,a)=>w.indexOf(e.week)-w.indexOf(a.week)))})));l((0,c.k2)(g))}}catch(a){console.error("Error fetching data:",a)}},[w,b]=(0,t.useState)((null===(e=m[o])||void 0===e||null===(a=e.children)||void 0===a?void 0:a.map((e=>[...e.children])).flat())||[]);(0,t.useEffect)((()=>{var e,a;b((null===(e=m[o])||void 0===e||null===(a=e.children)||void 0===a?void 0:a.map((e=>[...e.children])).flat())||[])}),[m]);const g=[{headerName:"Store",field:"storeLabel",pinned:"left",width:250},{headerName:"SKU",field:"skuLabel",pinned:"left",width:250},...(null!==m&&void 0!==m?m:[]).map((e=>{var a;return{headerName:e.headerName,children:(null!==(a=e.children)&&void 0!==a?a:[]).map((e=>({headerName:e.headerName,children:[{headerName:"Sales Units",field:"SalesUnits",cellStyle:h.hD,width:130},{headerName:"Sales Dollars",field:"SalesDollar",valueFormatter:e=>"$".concat(e.value),cellStyle:h.hD,width:130},{headerName:"GM Dollars",field:"gmDollar",valueFormatter:e=>"$".concat(e.value),cellStyle:h.hD,width:130},{headerName:"GM Percent",field:"gmPercent",valueFormatter:e=>"".concat(e.value,"%"),cellStyle:h.hD,cellClassRules:h.e_,width:130}]})))}}))];return(0,u.jsx)(f,{children:(0,u.jsx)(r.s,{rowData:w,columnDefs:g,modules:[n.ICW],debug:!0,defaultColDef:h.KR,onGridReady:v})})}}}]);
//# sourceMappingURL=565.ca4dc758.chunk.js.map