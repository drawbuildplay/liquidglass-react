import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-BCqvwenJ.js";import{F as p}from"./index-Bz3qtrRO.js";const l=({message:n,icon:o,visible:r,onDismiss:s,duration:t=3e3})=>(i.useEffect(()=>{if(r&&t>0){const a=setTimeout(()=>{s?.()},t);return()=>clearTimeout(a)}},[r,t,s]),r?e.jsxs("div",{style:{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:2e3,pointerEvents:"none",animation:"growl-slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"},children:[e.jsxs("div",{style:{pointerEvents:"auto",display:"flex",alignItems:"center",gap:"12px",padding:"12px 24px",borderRadius:"30px",background:"rgba(245, 245, 250, 0.65)",backdropFilter:"blur(40px) saturate(190%) contrast(115%)",WebkitBackdropFilter:"blur(40px) saturate(190%) contrast(115%)",boxShadow:"0 10px 40px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.4)",border:"1px solid rgba(255, 255, 255, 0.3)",fontFamily:"var(--lg-font-family)"},children:[o&&e.jsx(p,{icon:o,style:{color:"#007aff",fontSize:"16px"}}),e.jsx("span",{style:{fontWeight:500,fontSize:"15px",color:"#000000"},children:n})]}),e.jsx("style",{jsx:!0,children:`
                @keyframes growl-slide-down {
                    from {
                        transform: translate(-50%, -150%);
                        opacity: 0;
                    }
                    to {
                        transform: translate(-50%, 0);
                        opacity: 1;
                    }
                }
            `})]}):null);l.__docgenInfo={description:"",methods:[],displayName:"Growl",props:{message:{required:!0,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"IconProp"},description:""},visible:{required:!0,tsType:{name:"boolean"},description:""},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},duration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3000",computed:!1}}}};export{l as G};
