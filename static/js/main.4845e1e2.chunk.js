(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(7),o=n.n(a),u=n(8),l=n(4),s=n(3),i=n(1),f=(n(6),n(2)),b=Object(r.createContext)();function p(e){var t=e.value,n=Object(r.useRef)("item"),a=Object(r.useContext)(b).registerSelectedItem;return Object(r.useEffect)(function(){n.current&&a(n,e)},[n,a,e]),c.a.createElement("div",{className:"item",ref:n,style:{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"center",height:"100px",width:"10%",backgroundColor:"#7080A0",margin:"1rem"}},t)}var m=["Segunda","Ter\xe7a","Quarta","Quinta","Sexta","Sabado"];function d(){return c.a.createElement("div",{className:"container"},m.map(function(e,t){return c.a.createElement(p,{value:e,key:t})}))}var y=document.getElementById("root");o.a.render(c.a.createElement(function(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=Object(r.useState)(!1),a=Object(i.a)(n,2),o=a[0],p=a[1],m=Object(r.useState)([]),y=Object(i.a)(m,2),j=y[0],x=y[1],O=Object(r.useState)([]),g=Object(i.a)(O,2),v=g[0],h=g[1],E=Object(r.useState)({x1:0,x2:0,y1:0,y2:0}),k=Object(i.a)(E,2),w=k[0],C=k[1],S=Object(r.useCallback)(function(e,t){h(function(n){return n.find(function(t){return t.ref.current===e.current})?n:[].concat(Object(s.a)(n),[{ref:e,props:t}])})},[]),N=Object(r.useCallback)(function(e){var t=e.ref,n=e.props;x(function(e){return e.find(function(e){return e.ref.current===t.current})?e:[].concat(Object(s.a)(e),[{ref:t,props:n}])})},[]),M=Object(r.useCallback)(function(e){x(e)},[]),I=Object(r.useCallback)(function(e){var t=e.x1,n=e.x2,r=e.y1,c=e.y2;C(function(e){return e.x1=t,e.x2=n,e.y1=r,e.y2=c,e})},[]),P=Object(r.useCallback)(function(t){var n=t.x1,r=t.x2,c=t.y1,a=t.y2,o=Math.min(n,r),u=Math.max(n,r),l=Math.min(c,a),s=Math.max(c,a);isNaN(o)||isNaN(l)||(e.current&&o&&l&&(e.current.style.width="".concat(u-o,"px"),e.current.style.height="".concat(s-l,"px"),e.current.style.left="".concat(o,"px"),e.current.style.top="".concat(l,"px")),I({x1:n,x2:r,y1:c,y2:a}))},[I]),R=function(){var t=e.current&&e.current,n=t.offsetTop,r=t.offsetLeft,c=t.offsetWidth,a=t.offsetHeight,o=v.filter(function(e){if(!e||!e.ref||!e.ref.current)return!1;var t=e.ref.current,o=t.offsetTop,u=t.offsetLeft,l=t.offsetWidth;return t.offsetHeight,u<r+c&&u+l>r&&o<n+a&&n+a>o});M(o)},T=Object(r.useCallback)(function(t){t.stopPropagation(),p(!1),e.current&&(e.current.style.width="0px",e.current.style.height="0px",e.current.style.left="0px",e.current.style.top="0px"),I({x1:0,x2:0,y1:0,y2:0})},[I]),W=Object(r.useCallback)(function(e){e.target,e.stopPropagation(),o&&(R(),P(Object(l.a)({},w,{x2:e.clientX,y2:e.clientY})))},[o,P,N,w,v]),z=Object(r.useCallback)(function(e){e.target;var t=Object(u.a)(e,["target"]);x([]),e.stopPropagation(),p(!0),R(),P(Object(l.a)({},w,{x1:t.clientX,y1:t.clientY}))},[P,N,w,v]);return Object(r.useEffect)(function(){window.onmouseup=T,window.onmousemove=W},[T,W]),c.a.createElement("div",{className:Object(f.a)("App","noselect")},c.a.createElement("h1",null,"Select area component"),c.a.createElement("div",{ref:t,className:"selectable-group",onMouseDown:z,onMouseMove:W,onMouseUp:T,style:{height:400,backgroundColor:"#f5f5f5",padding:"1rem"}},c.a.createElement(b.Provider,{value:{registerSelectedItem:S}},c.a.createElement(d,null))),c.a.createElement("div",null,c.a.createElement("span",{style:{fontSize:18}},"Item selecionados: "),!o&&j.map(function(e,t){return c.a.createElement("span",{key:t,style:{fontSize:16,fontWeight:"bold",margin:"2rem"}},e.props.value)})),c.a.createElement("div",{ref:e,className:Object(f.a)("selector","noselect"),style:{cursor:"default"}}))},null),y)},6:function(e,t,n){},9:function(e,t,n){e.exports=n(14)}},[[9,1,2]]]);
//# sourceMappingURL=main.4845e1e2.chunk.js.map