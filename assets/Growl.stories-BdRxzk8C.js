import{j as r}from"./jsx-runtime-u17CrQMm.js";import{G as o}from"./Growl-kkCxy9b5.js";import{r as n}from"./iframe-BCqvwenJ.js";import{d as i}from"./index-Bz3qtrRO.js";import"./preload-helper-PPVm8Dsz.js";const f={title:"Components/Growl",component:o,parameters:{layout:"centered"},tags:["autodocs"]},c=s=>{const[a,t]=n.useState(!0);return r.jsxs("div",{style:{height:"200px",display:"flex",alignItems:"center"},children:[r.jsx("button",{onClick:()=>t(!0),children:"Show Notification"}),r.jsx(o,{...s,visible:a,onDismiss:()=>t(!1)})]})},e={render:s=>r.jsx(c,{...s}),args:{message:"Action completed successfully",icon:i,visible:!0,duration:3e3}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => <Wrapper {...args} />,
  args: {
    message: 'Action completed successfully',
    icon: faCheckCircle,
    visible: true,
    duration: 3000
  }
}`,...e.parameters?.docs?.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,f as default};
