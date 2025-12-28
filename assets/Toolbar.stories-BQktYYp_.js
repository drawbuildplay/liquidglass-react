import{j as a}from"./jsx-runtime-u17CrQMm.js";import{T as o}from"./Toolbar-BnnOoqQf.js";import{B as t}from"./Button-BGR4noIB.js";import{n as s,o as i,e as n}from"./index-Bz3qtrRO.js";import"./iframe-BCqvwenJ.js";import"./preload-helper-PPVm8Dsz.js";const f={title:"Components/Toolbar",component:o,parameters:{layout:"padded"},tags:["autodocs"]},r={args:{title:"Page Title",children:a.jsx(t,{icon:i,variant:"secondary",label:"Back"}),rightElement:a.jsx(t,{icon:s,variant:"primary"})}},e={args:{title:"Edit Item",children:a.jsx(t,{label:"Cancel",variant:"ghost"}),rightElement:a.jsxs("div",{style:{display:"flex",gap:"8px"},children:[a.jsx(t,{icon:n,variant:"secondary"}),a.jsx(t,{label:"Done",variant:"primary"})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Page Title',
    children: <Button icon={faArrowLeft} variant="secondary" label="Back" />,
    rightElement: <Button icon={faPlus} variant="primary" />
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Edit Item',
    children: <Button label="Cancel" variant="ghost" />,
    rightElement: <div style={{
      display: 'flex',
      gap: '8px'
    }}>
                <Button icon={faEllipsisH} variant="secondary" />
                <Button label="Done" variant="primary" />
            </div>
  }
}`,...e.parameters?.docs?.source}}};const g=["Default","GroupedButtons"];export{r as Default,e as GroupedButtons,g as __namedExportsOrder,f as default};
