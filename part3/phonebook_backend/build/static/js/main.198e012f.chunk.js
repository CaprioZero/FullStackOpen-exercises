(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(6),a=t(3),u=t(2),i=t(0),s=function(e){var n=e.value,t=e.onChange;return Object(i.jsxs)(i.Fragment,{children:["filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},l=function(e){var n=e.addPerson,t=e.newName,c=e.handleNameChange,r=e.newNumber,o=e.handleNumberChange;return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:c})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:r,onChange:o})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},d=function(e){var n=e.persons,t=e.handleDeletePerson;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)("ul",{children:n.map((function(e){return Object(i.jsxs)("li",{children:[e.name," ",e.number," ",Object(i.jsx)("button",{onClick:function(){return t(e.name,e.id)},children:"delete"})]},e.id)}))})})},b=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{className:n.includes("failed")?"error":"success",children:n})},j=t(4),f=t.n(j),h="/api/persons",m=function(){return f.a.get(h).then((function(e){return e.data}))},O=function(e){return f.a.post(h,e,{data:null,headers:{"Content-Type":"application/json"}}).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},x=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),j=Object(a.a)(r,2),f=j[0],h=j[1],x=Object(u.useState)(""),v=Object(a.a)(x,2),w=v[0],N=v[1],C=Object(u.useState)(""),k=Object(a.a)(C,2),T=k[0],S=k[1],y=Object(u.useState)(null),P=Object(a.a)(y,2),D=P[0],F=P[1];Object(u.useEffect)((function(){m().then((function(e){console.log("promise fulfilled"),c(e)}))}),[]);return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(b,{message:D}),Object(i.jsx)("br",{}),Object(i.jsx)(s,{value:T,onChange:function(e){S(e.target.value);var n=new RegExp(T,"gi");c((function(){return t.filter((function(e){return e.name.match(n)}))}))}}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(l,{addPerson:function(e){e.preventDefault();var n={name:f,number:w},r=t.find((function(e){return e.name===f})),a=Object(o.a)(Object(o.a)({},r),{},{number:w});t.filter((function(e){return e.name===f})).length>0?window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))&&p(r.id,a).then((function(e){c(t.map((function(n){return n.name===f?e:n}))),h(""),N(""),F("".concat(e.name,"'s number updated to ").concat(e.number)),setTimeout((function(){F(null)}),3e3)})).catch((function(e){e.response.status===Number("404")?(c(t.filter((function(e){return e.id!==a.id}))),h(""),N(""),F("failed: Information of ".concat(a.name," has already been removed from server")),setTimeout((function(){F(null)}),3e3)):e.response.status===Number("400")&&(console.log(e.response.data.error),F("".concat(e.response.data.error)),setTimeout((function(){F(null)}),3e3))})):O(n).then((function(e){c(t.concat(e)),h(""),N(""),F("Added ".concat(e.name)),setTimeout((function(){F(null)}),3e3)})).catch((function(e){console.log(e.response.data.error),F("".concat(e.response.data.error)),setTimeout((function(){F(null)}),3e3)}))},newName:f,handleNameChange:function(e){h(e.target.value)},newNumber:w,handleNumberChange:function(e){N(e.target.value)}}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(d,{persons:t,handleDeletePerson:function(e,n){window.confirm("Delete ".concat(e," ?"))&&g(n).then(console.log("".concat(e," deleted")),c(t.filter((function(e){return e.id!==n}))),F("".concat(e," deleted")),setTimeout((function(){F(null)}),3e3))}})]})};t(39);r.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.198e012f.chunk.js.map