import{j as e}from"./jsx-runtime-u17CrQMm.js";import{S as n}from"./Sheet-BJRtOlX2.js";import{r as a}from"./iframe-BCqvwenJ.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"Components/Sheet",component:n,parameters:{layout:"fullscreen"},tags:["autodocs"]},i=r=>{const[o,s]=a.useState(!0);return e.jsxs("div",{style:{padding:20},children:[e.jsx("button",{onClick:()=>s(!0),children:"Open Sheet"}),e.jsx(n,{...r,isOpen:o,onClose:()=>s(!1),children:e.jsxs("div",{style:{padding:20},children:[e.jsx("h2",{children:"Sheet Content"}),e.jsx("p",{children:"This is a modal sheet that slides up from the bottom."}),e.jsx("p",{children:"It can contain any custom content."})]})})]})},t={render:r=>e.jsx(i,{...r}),args:{isOpen:!0,height:"50%",children:e.jsx("div",{children:"Sheet Content"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <Wrapper {...args} />,
  args: {
    isOpen: true,
    height: '50%',
    children: <div>Sheet Content</div>
  }
}`,...t.parameters?.docs?.source}}};const m=["Default"];export{t as Default,m as __namedExportsOrder,l as default};
