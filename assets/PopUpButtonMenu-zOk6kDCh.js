import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-BCqvwenJ.js";import{F as m,f}from"./index-Bz3qtrRO.js";const x=({trigger:l,items:p,align:c="left"})=>{const[r,s]=i.useState(!1),a=i.useRef(null),o=i.useRef(null);i.useEffect(()=>{const e=n=>{a.current&&!a.current.contains(n.target)&&o.current&&!o.current.contains(n.target)&&s(!1)};return r&&document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[r]);const u=e=>{e.type!=="separator"&&(e.onClick(),s(!1))};return t.jsxs("div",{style:{position:"relative",display:"inline-block"},children:[t.jsx("div",{ref:o,onClick:()=>s(!r),style:{cursor:"pointer",display:"inline-flex"},children:l}),r&&t.jsx("div",{ref:a,style:{position:"absolute",top:"100%",[c==="right"?"right":"left"]:0,marginTop:"8px",minWidth:"220px",zIndex:1e3,background:"rgba(245, 245, 250, 0.65)",backdropFilter:"blur(40px) saturate(190%) contrast(115%)",WebkitBackdropFilter:"blur(40px) saturate(190%) contrast(115%)",border:"1px solid rgba(255, 255, 255, 0.3)",borderRadius:"16px",fontFamily:"var(--lg-font-family)",boxShadow:`
                            0 25px 60px rgba(0,0,0,0.3),
                            inset 0 1px 2px rgba(255, 255, 255, 0.7),
                            inset 0 -1px 1px rgba(0, 0, 0, 0.05)
                        `,padding:"6px",display:"flex",flexDirection:"column",transformOrigin:"top center",animation:"liquid-menu-swoosh 0.2s cubic-bezier(0.16, 1, 0.3, 1)"},children:p.map((e,n)=>{if(e.type==="separator")return t.jsx("div",{style:{height:"1px",background:"rgba(0,0,0,0.08)",margin:"4px 10px"}},`sep-${n}`);const d=e.variant==="destructive";return t.jsxs("button",{onClick:()=>u(e),className:"liquid-menu-item",style:{all:"unset",padding:"10px 12px",display:"flex",alignItems:"center",gap:"12px",fontSize:"15px",fontWeight:500,color:d?"#FF3B30":"#000000",borderRadius:"10px",cursor:"pointer",transition:"background 0.15s",userSelect:"none"},children:[t.jsx("div",{style:{width:"20px",display:"flex",justifyContent:"center",color:"#007AFF",opacity:e.checked?1:0},children:e.checked&&t.jsx(m,{icon:f,size:"sm"})}),t.jsx("span",{style:{flex:1},children:e.label})]},e.id)})}),t.jsx("style",{jsx:!0,children:`
                @keyframes liquid-menu-swoosh {
                    from { transform: scale(0.95) translateY(-5px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .liquid-menu-item:hover {
                    background: rgba(0,0,0,0.06) !important;
                }
                .liquid-menu-item:active {
                    background: rgba(0,0,0,0.1) !important;
                }
            `})]})};x.__docgenInfo={description:"",methods:[],displayName:"PopUpButtonMenu",props:{trigger:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"PopUpMenuItem"}],raw:"PopUpMenuItem[]"},description:""},align:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'left'",computed:!1}}}};export{x as P};
