import{j as r}from"./jsx-runtime-u17CrQMm.js";import{E as t}from"./EmptyState-B_OgP2HZ.js";import{B as a}from"./Button-BGR4noIB.js";import{b as s,c as n}from"./index-Bz3qtrRO.js";import"./iframe-BCqvwenJ.js";import"./preload-helper-PPVm8Dsz.js";const d={title:"Components/EmptyState",component:t,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{title:"No Items Found",description:"Try adjusting your search or filter to find what you are looking for.",icon:s}},e={args:{title:"No Messages",description:"You have no new messages in your inbox.",icon:n,action:r.jsx(a,{label:"Refresh",variant:"primary",onClick:()=>console.log("Refresh")})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No Items Found',
    description: 'Try adjusting your search or filter to find what you are looking for.',
    icon: faSearch
  }
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No Messages',
    description: 'You have no new messages in your inbox.',
    icon: faInbox,
    action: <Button label="Refresh" variant="primary" onClick={() => console.log('Refresh')} />
  }
}`,...e.parameters?.docs?.source}}};const f=["Default","WithAction"];export{o as Default,e as WithAction,f as __namedExportsOrder,d as default};
