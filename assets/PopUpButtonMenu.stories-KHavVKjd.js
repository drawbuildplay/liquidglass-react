import{j as e}from"./jsx-runtime-u17CrQMm.js";import{P as r}from"./PopUpButtonMenu-zOk6kDCh.js";import{B as i}from"./Button-BGR4noIB.js";import{e as a,g as n}from"./index-Bz3qtrRO.js";import"./iframe-BCqvwenJ.js";import"./preload-helper-PPVm8Dsz.js";const C={title:"Components/PopUpButtonMenu",component:r,parameters:{layout:"centered"},tags:["autodocs"],decorators:[s=>e.jsx("div",{style:{height:"300px",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"50px"},children:e.jsx(s,{})})]},l={args:{trigger:e.jsx(i,{label:"Options",variant:"secondary",icon:a}),items:[{id:"1",label:"Edit",onClick:()=>console.log("Edit")},{id:"2",label:"Duplicate",onClick:()=>console.log("Duplicate")},{id:"sep1",label:"",onClick:()=>{},type:"separator"},{id:"3",label:"Delete",onClick:()=>console.log("Delete"),variant:"destructive"}]}},o={args:{trigger:e.jsx(i,{label:"Filter By",variant:"primary",icon:n}),items:[{id:"all",label:"All Items",onClick:()=>console.log("All"),checked:!0},{id:"active",label:"Active",onClick:()=>console.log("Active")},{id:"completed",label:"Completed",onClick:()=>console.log("Completed")},{id:"sep1",label:"",onClick:()=>{},type:"separator"},{id:"custom",label:"Custom Range...",onClick:()=>console.log("Custom")}]}},t={args:{align:"right",trigger:e.jsx(i,{variant:"ghost",icon:a}),items:[{id:"1",label:"Settings",onClick:()=>console.log("Settings")},{id:"2",label:"Profile",onClick:()=>console.log("Profile")}]}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <Button label="Options" variant="secondary" icon={faEllipsisH} />,
    items: [{
      id: '1',
      label: 'Edit',
      onClick: () => console.log('Edit')
    }, {
      id: '2',
      label: 'Duplicate',
      onClick: () => console.log('Duplicate')
    }, {
      id: 'sep1',
      label: '',
      onClick: () => {},
      type: 'separator'
    }, {
      id: '3',
      label: 'Delete',
      onClick: () => console.log('Delete'),
      variant: 'destructive'
    }]
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: <Button label="Filter By" variant="primary" icon={faFilter} />,
    items: [{
      id: 'all',
      label: 'All Items',
      onClick: () => console.log('All'),
      checked: true
    }, {
      id: 'active',
      label: 'Active',
      onClick: () => console.log('Active')
    }, {
      id: 'completed',
      label: 'Completed',
      onClick: () => console.log('Completed')
    }, {
      id: 'sep1',
      label: '',
      onClick: () => {},
      type: 'separator'
    }, {
      id: 'custom',
      label: 'Custom Range...',
      onClick: () => console.log('Custom')
    }]
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'right',
    trigger: <Button variant="ghost" icon={faEllipsisH} />,
    items: [{
      id: '1',
      label: 'Settings',
      onClick: () => console.log('Settings')
    }, {
      id: '2',
      label: 'Profile',
      onClick: () => console.log('Profile')
    }]
  }
}`,...t.parameters?.docs?.source}}};const b=["Default","FilterMenu","RightAligned"];export{l as Default,o as FilterMenu,t as RightAligned,b as __namedExportsOrder,C as default};
