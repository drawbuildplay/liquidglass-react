import{j as e}from"./jsx-runtime-u17CrQMm.js";import{T as l}from"./TabBar-BAw154CJ.js";import{F as a,h as t,i as c,j as d,k as m,l as p,m as b}from"./index-Bz3qtrRO.js";import"./iframe-BCqvwenJ.js";import"./preload-helper-PPVm8Dsz.js";const T={title:"Components/TabBar",component:l,parameters:{layout:"padded"},tags:["autodocs"]},r=[{id:"1",label:"Home",icon:e.jsx(a,{icon:t})},{id:"2",label:"Profile",icon:e.jsx(a,{icon:c})},{id:"3",label:"Settings",icon:e.jsx(a,{icon:d})}],o={args:{items:r,activeTabId:"1"}},n={args:{items:[...r,{id:"4",label:"Notifications",icon:e.jsx(a,{icon:m})}],activeTabId:"1",showSearch:!0}},s={args:{items:[{id:"1",label:"Home",icon:e.jsx(a,{icon:t})},{id:"2",label:"Profile",icon:e.jsx(a,{icon:c})}],activeTabId:"1"}},i={args:{items:[...r,{id:"4",label:"Inbox",icon:e.jsx(a,{icon:p})},{id:"5",label:"Camera",icon:e.jsx(a,{icon:b})},{id:"6",label:"Alerts",icon:e.jsx(a,{icon:m})}],activeTabId:"1"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items,
    activeTabId: '1'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...items, {
      id: '4',
      label: 'Notifications',
      icon: <FontAwesomeIcon icon={faBell} />
    }],
    activeTabId: '1',
    showSearch: true
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: '1',
      label: 'Home',
      icon: <FontAwesomeIcon icon={faHome} />
    }, {
      id: '2',
      label: 'Profile',
      icon: <FontAwesomeIcon icon={faUser} />
    }],
    activeTabId: '1'
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: [...items, {
      id: '4',
      label: 'Inbox',
      icon: <FontAwesomeIcon icon={faEnvelope} />
    }, {
      id: '5',
      label: 'Camera',
      icon: <FontAwesomeIcon icon={faCamera} />
    }, {
      id: '6',
      label: 'Alerts',
      icon: <FontAwesomeIcon icon={faBell} />
    }],
    activeTabId: '1'
  }
}`,...i.parameters?.docs?.source}}};const j=["Default","WithSearch","TwoItems","ManyItems"];export{o as Default,i as ManyItems,s as TwoItems,n as WithSearch,j as __namedExportsOrder,T as default};
