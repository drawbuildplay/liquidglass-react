import{j as n}from"./jsx-runtime-u17CrQMm.js";import{A as a}from"./Alert-DcmOR3dm.js";import{r as c}from"./iframe-BCqvwenJ.js";import"./index-CdgFrt_C.js";import"./index-DL-fLDY9.js";import"./preload-helper-PPVm8Dsz.js";const C={title:"Components/Alert",component:a,parameters:{layout:"centered"},tags:["autodocs"]},o=e=>{const[l,r]=c.useState(!0);return n.jsxs("div",{children:[n.jsx("button",{onClick:()=>r(!0),children:"Open Alert"}),n.jsx(a,{...e,isOpen:l,onClose:()=>r(!1)})]})},t={render:e=>n.jsx(o,{...e}),args:{isOpen:!0,title:"Delete Item?",message:"This action cannot be undone.",actions:[{label:"Cancel",onClick:()=>console.log("Cancel"),variant:"cancel"},{label:"Delete",onClick:()=>console.log("Delete"),variant:"destructive"}]}},s={render:e=>n.jsx(o,{...e}),args:{isOpen:!0,title:"Success",message:"Item has been saved successfully.",actions:[{label:"OK",onClick:()=>console.log("OK"),variant:"default"}]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <AlertWrapper {...args} />,
  args: {
    isOpen: true,
    title: 'Delete Item?',
    message: 'This action cannot be undone.',
    actions: [{
      label: 'Cancel',
      onClick: () => console.log('Cancel'),
      variant: 'cancel'
    }, {
      label: 'Delete',
      onClick: () => console.log('Delete'),
      variant: 'destructive'
    }]
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <AlertWrapper {...args} />,
  args: {
    isOpen: true,
    title: 'Success',
    message: 'Item has been saved successfully.',
    actions: [{
      label: 'OK',
      onClick: () => console.log('OK'),
      variant: 'default'
    }]
  }
}`,...s.parameters?.docs?.source}}};const O=["Default","SingleAction"];export{t as Default,s as SingleAction,O as __namedExportsOrder,C as default};
