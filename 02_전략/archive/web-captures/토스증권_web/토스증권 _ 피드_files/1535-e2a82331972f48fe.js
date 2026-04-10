try{!function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="2e78445b-6c57-4c86-bb34-e4f77f87989f",e._sentryDebugIdIdentifier="sentry-dbid-2e78445b-6c57-4c86-bb34-e4f77f87989f")}()}catch(e){}!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e._sentryModuleMetadata=e._sentryModuleMetadata||{},e._sentryModuleMetadata[(new e.Error).stack]=function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];if(null!=r)for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}return e}({},e._sentryModuleMetadata[(new e.Error).stack],{"_sentryBundlerPluginAppKey:tossinvest_wts":!0})}catch(e){}}(),(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1535],{6752:()=>{},29984:(e,t,r)=>{"use strict";r.d(t,{f:()=>i});var n=r(35446),i=({block:e,children:t,...r})=>(0,n.Y)("ol",{...r,children:t})},39895:(e,t,r)=>{"use strict";r.d(t,{Q:()=>i});var n=r(35446),i=({block:e,children:t,...r})=>(0,n.Y)("ul",{...r,children:t})},41398:(e,t,r)=>{"use strict";r.d(t,{f:()=>i});var n=r(35446),i=({block:e,contents:t,children:r,...i})=>(0,n.FD)("p",{...i,children:[t,r]})},41787:(e,t,r)=>{"use strict";r.d(t,{M:()=>o,b:()=>l});var n=r(39950),i=r(35446),l=(0,n.createContext)({}),o=({children:e,...t})=>(0,i.Y)(l.Provider,{value:t,children:e})},43106:(e,t,r)=>{"use strict";r.d(t,{X:()=>a});var n=r(89694),i=r(946),l=r(74482),o=r(35446),a=({block:e,children:t,...r})=>(0,o.Y)(n.u,{value:e.table,children:(0,o.Y)("div",{css:(0,i.AH)`
          width: 100%;
          padding: 0px;
          border-top: 1px solid ${l.Tj.black};
          border-left: 1px solid ${l.Tj.black};
        `,...r,children:t})})},53762:(e,t,r)=>{"use strict";r.d(t,{X:()=>ed});var n=r(946);function i(e,t,r){return null==r?Math.min(e,t):Math.min(Math.max(e,t),r)}var l=e=>i(2*Math.round((10.5*e-.5)/2),10,32),o=(0,n.AH)`
  display: flex;
  flex-direction: column;
  flex: none;
`,a=r(35446),s=({children:e,className:t})=>null==e?null:(0,a.Y)("div",{className:t,css:o,children:e}),c=({lineHeight:e,className:t,children:r})=>(0,a.Y)("span",{css:{lineHeight:0,display:"block"},children:(0,a.Y)("span",{className:t,css:{display:"contents",lineHeight:e},children:r})}),d=r(39950),u=(0,d.createContext)({env:"pc",isTossApp:!1,fontScale:1}),p=()=>(0,d.useContext)(u),h={Large:100,xLarge:110,xxLarge:120,xxxLarge:135,A11y_Medium:160,A11y_Large:190,A11y_xLarge:235,A11y_xxLarge:275,A11y_xxxLarge:310},g=()=>{let e=p();return(0,d.useMemo)(()=>"ios"===e.env&&null!=e.fontA11y?h[e.fontA11y]/100:"android"===e.env&&null!=e.fontScale?e.fontScale/100:1,[e])},m={32:e=>Math.round(i(6.68*e+25.3,31,46)),30:e=>Math.round(i(7.12*e+22.9,29,45)),26:e=>Math.round(i(7.47*e+18.9,25,42)),24:e=>Math.round(i(8.55*e+15.55,22,42)),22:e=>Math.round(i(8.09*e+13.9,20,39)),21:e=>Math.round(i(7.84*e+12.7,19,37)),19:e=>Math.round(i(7.78*e+10.9,17,35)),17:e=>Math.round(i(7.62*e+9.38,15,33)),16:e=>Math.round(i(7.74*e+8,14,32)),15:e=>Math.round(i(7.27*e+7.47,13,30)),14:e=>Math.round(i(7.27*e+6.47,12,29)),13:e=>Math.round(i(7.27*e+5.47,11,28))},f=({fontLevel:e})=>{let t=g();return(0,d.useMemo)(()=>{let r=m[e](t),n=(e=>e<=15?1.7:e>15&&e<=26?1.6:e>26&&e<=37?1.55:1.5)(r),i=r<=32?"keep-all":"break-all",l=r<=36?"0em":"-0.02em";return{fontSize:r,lineHeight:n,wordBreak:i,letterSpacing:l}},[e,t])},b=r(74482),x=({block:e,contents:t,children:r,className:i})=>{let{env:l}=p(),{fontSize:o,letterSpacing:d,lineHeight:u,wordBreak:h}=f({fontLevel:19}),g=(0,n.AH)({fontSize:o,letterSpacing:d,lineHeight:u,fontWeight:"bold",color:b.lP.grey900,whiteSpace:"pre-wrap",margin:"24px 0",paddingLeft:20}),m=(0,n.AH)({fontSize:o,letterSpacing:d,lineHeight:u,wordBreak:h,fontWeight:"bold",color:b.lP.grey800,whiteSpace:"pre-wrap",margin:24,paddingLeft:20}),{borderWeight:x,borderVerticalMargin:v}=(e=>e<=21?{borderWeight:2,borderVerticalMargin:4}:e<=30?{borderWeight:3,borderVerticalMargin:6}:{borderWeight:4,borderVerticalMargin:8})(o),w=(0,n.AH)`
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: ${v}px;
      left: 0;
      width: ${x}px;
      height: calc(100% - ${v}px * 2);
      padding: ${v}px 0;
      background-color: ${b.lP.grey800};
    }
  `;return(0,a.FD)("blockquote",{id:e.id,css:["pc"===l?g:m,w],className:i,children:[(0,a.Y)(c,{lineHeight:u,children:t}),(0,a.Y)(s,{css:y,children:r})]})},y=(0,n.AH)`
  & > * {
    margin-left: 0;
    margin-right: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }

  blockquote > &:first-child > :first-child {
    margin-top: 0;
  }
`,v={},w={},_=(...e)=>e.filter(Boolean).join(" ");function Y({name:e,alt:t,className:r,size:i,color:l,style:o,onClick:s,role:c,...u},p){let[h,g]=(0,d.useState)(w[e]),[m,f]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{if(w[e])return void g(w[e]);let t=!1;return async function(){void 0===v[e]&&(v[e]=A(e));try{let r=await v[e];t||(w[e]=r,g(w[e]))}catch(e){t||f(!0)}}(),()=>{t=!0}},[h,e]),(0,a.FD)(a.FK,{children:[(0,a.Y)(n.mL,{styles:T}),(0,a.FD)("span",{className:_("svg-icon-wrapper",r),style:{width:i,height:i},onClick:s,ref:p,role:c??s?"button":void 0,...u,children:[(0,a.Y)("span",{className:_("svg-icon",m&&"svg-icon--hide"),style:{width:i,height:i,color:l,...o},"aria-label":t,"aria-hidden":null==h||null==t||!!m||void 0,role:null==t?"presentation":"img",dangerouslySetInnerHTML:h?{__html:h}:void 0}),(0,a.Y)("img",{className:_("svg-icon-fallback",m&&"svg-icon-fallback--show"),alt:m?t:void 0,role:null!=t&&m?void 0:"presentation",src:j(e)})]})]})}var k=(0,d.forwardRef)(Y);async function A(e){return(await fetch(j(e))).text()}function j(e){let t=e.startsWith("icn-")||e.startsWith("icon-")?e:`icn-${e}`;return`https://static.toss.im/icons/svg/${t}.svg`}Y.displayName="Icon";var T=(0,n.AH)`
  .svg-icon-wrapper {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;

    /* NOTE: svg fetch전이더라도 color 커스텀이 있는 경우에는 fallback img를 보여주지 않는다. */
    > .svg-icon:empty + .svg-icon-fallback {
      visibility: visible;
      z-index: inherit;
    }
  }

  .svg-icon {
    color: var(--adaptiveGrey900);
    display: inline-block;
    width: 24px;
    height: 24px;
    display: block;
    width: 100%;
    height: 100%;

    svg,
    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    &--hide {
      display: none;
    }
  }

  .svg-icon-fallback {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: z-index(hidden);
    visibility: hidden;
    display: block;
    width: 100%;
    height: 100%;

    &--show {
      visibility: visible;
      z-index: inherit;
    }
  }
`,$=({block:e,contents:t,children:r,className:i})=>{let{env:l}=p(),{fontSize:o,letterSpacing:d,lineHeight:u,wordBreak:h}=f({fontLevel:"pc"===l?19:17}),g=(0,n.AH)({fontSize:o,letterSpacing:d,lineHeight:u,margin:"24px 0 0",fontWeight:400,color:b.lP.grey900,backgroundColor:"transparent"}),m=(0,n.AH)({fontSize:o,letterSpacing:d,lineHeight:u,wordBreak:h,margin:"10px 24px 0",fontWeight:400,color:b.lP.grey900,backgroundColor:"transparent"});return(0,a.FD)(M,{id:e.id,isPC:"pc"===l,className:i,children:[t?(0,a.Y)("h4",{css:"pc"===l?g:m,children:(0,a.Y)(c,{lineHeight:u,children:t})}):null,(0,a.Y)(s,{children:r})]})},H=(0,n.AH)`
  margin: 24px 0 8px;
  padding: 16px 40px 32px;
  border-radius: 16px;
  background-color: ${b.lP.grey100};
`,P=(0,n.AH)`
  margin: 10px 20px 6px;
  padding: 10px 0 14px;
  border-radius: 16px;
  background-color: ${b.lP.grey100};
`,M=({isPC:e,children:t})=>(0,a.Y)("aside",{css:e?H:P,children:t}),C=(0,n.AH)`
  width: ${16}px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`,L=({block:e,title:t,description:r,className:i})=>{let{open:s,onClickTrigger:u}=(e=>{let[t,r]=(0,d.useState)(e?.defaultOpen??!1);return{open:t,onClickTrigger:()=>{r(e=>!e)}}})(),h=g(),{env:m}=p(),x=f({fontLevel:17}),y=(0,n.AH)({...x,margin:`24px 0 ${s?"0":"8px"}`,cursor:"pointer",display:"flex",alignItems:"center",color:b.lP.grey700}),v=(0,n.AH)({...x,margin:`${l(h)}px 24px ${s?"0":"6px"}`,cursor:"pointer",display:"flex",alignItems:"center",color:b.lP.grey700}),w=s?(0,n.AH)`
        transform: rotateZ(90deg);
      `:void 0;return(0,a.FD)("div",{id:e.id,className:i,children:[(0,a.FD)("div",{role:"button",css:"pc"===m?y:v,onClick:u,children:[(0,a.Y)("div",{css:C,children:(0,a.Y)(k,{name:"icon-play-mono",color:b.lP.grey400,size:11.2,css:w})}),(0,a.Y)(c,{lineHeight:x.lineHeight,children:t})]}),s&&(0,a.Y)(M,{css:o,isPC:"pc"===m,children:r})]})},S=r(69378),W=(0,n.AH)({fontSize:"75%",lineHeight:0,position:"relative",verticalAlign:"top",top:"0.7em"}),D=({text:e,textColor:t,backgroundColor:r,shouldSplitTextWithAsterisk:i=!0,className:l})=>{let o=(0,S.kj)(),s=(0,d.useMemo)(()=>i?e.plain_text.split("*").flatMap((e,t)=>[e,(0,a.Y)("sup",{css:W,children:"*"},`ast-${t}`)]).slice(0,-1):e.plain_text,[i,e.plain_text]);if(""===e.plain_text)return null;let c=(({text:e,textColor:t,backgroundColor:r})=>(0,n.AH)({whiteSpace:"pre-wrap"},null!=e.href&&{cursor:"pointer"},null!==t&&{color:t},null!=r&&{backgroundColor:((e,t)=>{if(t<=0)return"rgba(255, 255, 255, 0)";if(t>=100)return e;if(e.startsWith("#")&&7===e.length)return`${e}${(t/100*225).toString(16).toUpperCase().slice(0,2)}`;if(e.startsWith("rgb(")){let r=Math.round(t);return`${e.slice(0,e.length-1)}, ${r/100})`}return e})(r,24)},e.annotations.italic&&{fontStyle:"italic"},(e.annotations.underline||null!=e.href)&&{textDecoration:"underline !important"},e.annotations.strikethrough&&{textDecoration:"line-through"},e.annotations.bold&&{fontWeight:"bold"}))({text:e,textColor:t,backgroundColor:r});return null!=e.href?(0,a.Y)(o.link,{className:l,css:c,href:e.href,children:s}):(0,a.Y)("span",{className:l,css:c,children:s})},F=e=>{let t=f({fontLevel:13}),r=(0,n.AH)({...t,color:b.lP.grey600,whiteSpace:"pre-wrap"});return(0,a.Y)(D,{css:r,...e})};function N(e){return e.includes("?")&&(e=e.split("?")[0]),e.includes("/")&&(e=e.split("/")[0]),e.includes("&")&&(e=e.split("&")[0]),e}function q(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var l=[],o=!0,a=!1;try{for(i=i.call(e);!(o=(r=i.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){a=!0,n=e}finally{try{o||null==i.return||i.return()}finally{if(a)throw n}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return I(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}let z=function(e){if("string"!=typeof e)throw TypeError("get-video-id expects a string");var t=e;/<iframe/gi.test(t)&&(t=function(e){if("string"!=typeof e)throw TypeError("getSrc expected a string");var t=/src="(.*?)"/gm.exec(e);if(t&&t.length>=2)return t[1]}(t)||""),t=(t=(t=t.trim()).replace("-nocookie","")).replace("/www.","/");var r={id:null,service:null};if(/\/\/google/.test(t)){var n=t.match(/url=([^&]+)&/);n&&(t=decodeURIComponent(n[1]))}return/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(t)?r={id:function(e){var t=e;t=(t=t.replace(/#t=.*$/,"")).replace(/^https?:\/\//,"");var r=/youtube:\/\/|youtu\.be\/|y2u\.be\//g;if(r.test(t))return N(t.split(r)[1]);var n=/\/shorts\//g;if(n.test(t))return N(t.split(n)[1]);var i=/v=|vi=/g;if(i.test(t))return N(t.split(i)[1].split("&")[0]);var l=/\/v\/|\/vi\/|\/watch\//g;if(l.test(t))return N(t.split(l)[1]);var o=/\/an_webp\//g;if(o.test(t))return N(t.split(o)[1]);var a=/\/e\//g;if(a.test(t))return N(t.split(a)[1]);var s=/\/embed\//g;if(s.test(t))return N(t.split(s)[1]);if(!/\/user\/([a-zA-Z\d]*)$/g.test(t)){if(/\/user\/(?!.*videos)/g.test(t))return N(t.split("/").pop());var c=/\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;if(c.test(t))return N(t.match(c)[1])}}(t),service:"youtube"}:/vimeo/.test(t)?r={id:function(e){var t,r,n=e;n.includes("#")&&(n=q(n.split("#"),1)[0]),n.includes("?")&&!n.includes("clip_id=")&&(n=q(n.split("?"),1)[0]);var i=/https?:\/\/vimeo\.com\/event\/(\d+)$/.exec(n);if(i&&i[1])return i[1];var l=/https?:\/\/vimeo\.com\/(\d+)/.exec(n);return l&&l[1]?l[1]:(RegExp("https?://player.vimeo.com/video/[0-9]+$|https?://vimeo.com/channels|groups|album","gim").test(n)?(r=n.split("/"))&&r.length>0&&(t=r.pop()):/clip_id=/gim.test(n)&&(r=n.split("clip_id="))&&r.length>0&&(t=q(r[1].split("&"),1)[0]),t)}(t),service:"vimeo"}:/vine/.test(t)?r={id:function(e){var t=/https:\/\/vine\.co\/v\/([a-zA-Z\d]*)\/?/.exec(e);if(t&&t.length>1)return t[1]}(t),service:"vine"}:/videopress/.test(t)?r={id:function(e){if(e.includes("embed"))return t=/embed\/(\w{8})/,e.match(t)[1];var t=/\/v\/(\w{8})/,r=e.match(t);if(r&&r.length>0)return r[1]}(t),service:"videopress"}:/microsoftstream/.test(t)?r={id:function(e){var t=(e.includes("embed")?/https:\/\/web\.microsoftstream\.com\/embed\/video\/([a-zA-Z\d-]*)\/?/:/https:\/\/web\.microsoftstream\.com\/video\/([a-zA-Z\d-]*)\/?/).exec(e);if(t&&t.length>1)return t[1]}(t),service:"microsoftstream"}:/tiktok\.com/.test(t)?r={id:function(e){var t=/tiktok\.com(.*)\/video\/(\d+)/gm.exec(e);if(t&&t.length>2)return t[2]}(t),service:"tiktok"}:/(dailymotion\.com|dai\.ly)/.test(t)&&(r={id:function(e){var t=/dailymotion\.com(.*)(video)\/([a-zA-Z\d]+)/gm.exec(e);if(t)return t[3];var r=/dai\.ly\/([a-zA-Z\d]+)/gm.exec(e);if(r&&r.length>1)return r[1];var n=/dailymotion\.com(.*)video=([a-zA-Z\d]+)/gm.exec(e);if(n&&n.length>2)return n[2]}(t),service:"dailymotion"}),r};var E=e=>{let{service:t}=z(e);return"youtube"===t},R=(0,n.AH)({position:"relative",width:"100%",height:0,paddingBottom:"56.25%"}),B=(0,n.AH)({position:"absolute",top:0,left:0,width:"100%",height:"100%"}),O=(0,n.AH)({width:"100%"}),U=({block:e,className:t})=>{let{env:r}=p(),i=g(),o=(0,n.AH)({margin:"24px 0 8px",textAlign:"center"}),s=(0,n.AH)({margin:`${l(i)}px 0 6px`}),c=e.video[e.video.type].url;return(0,a.FD)("figure",{id:e.id,css:"pc"===r?o:s,className:t,children:[E(c)?(0,a.Y)("div",{css:R,children:(0,a.Y)("iframe",{css:B,src:(e=>{if(!E(e))return e;let{id:t}=z(e);return`https://www.youtube.com/embed/${t}`})(c),frameBorder:"0",allowFullScreen:!0,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"})}):(0,a.Y)("video",{css:O,muted:!0,loop:!0,autoPlay:!0,playsInline:!0,children:(0,a.Y)("source",{src:c})}),e.video.caption.length>0&&(0,a.Y)("figcaption",{css:{textAlign:"center",marginTop:6},children:e.video.caption.map((e,t)=>(0,a.Y)(F,{text:e,shouldSplitTextWithAsterisk:!1},t))})]})},Z=()=>(0,a.Y)(a.FK,{}),K=({block:e,contents:t,className:r})=>{let{env:l}=p(),o=g(),{fontSize:s,letterSpacing:d,lineHeight:u,wordBreak:h}=f({fontLevel:"pc"===l?30:24}),m=(0,n.AH)({fontSize:s,letterSpacing:d,lineHeight:u,fontWeight:"bold",color:b.lP.grey900,margin:"40px 0 4px"}),x=(0,n.AH)({fontSize:s,letterSpacing:d,lineHeight:u,wordBreak:h,fontWeight:"bold",color:b.lP.grey900,margin:`${i(4*Math.round((19*o+61)/4),80,120)}px 24px 0`,whiteSpace:s<=32?"pre-wrap":"normal"});return(0,a.Y)("h2",{id:e.id,css:"pc"===l?m:x,className:r,children:(0,a.Y)(c,{lineHeight:u,children:t})})},G=({block:e,contents:t,className:r})=>{let{env:l}=p(),o=g(),{fontSize:s,letterSpacing:d,lineHeight:u,wordBreak:h}=f({fontLevel:"pc"===l?24:19}),m=(0,n.AH)({fontSize:s,letterSpacing:d,lineHeight:u,fontWeight:"bold",color:b.lP.grey900,margin:"24px 0 4px"}),x=(0,n.AH)({fontSize:s,letterSpacing:d,lineHeight:u,wordBreak:h,fontWeight:"bold",color:b.lP.grey800,margin:`${i(4*Math.round((19*o+21)/4),40,80)}px 24px 0`,whiteSpace:s<=32?"pre-wrap":"normal"});return(0,a.Y)("h3",{id:e.id,css:"pc"===l?m:x,className:r,children:(0,a.Y)(c,{lineHeight:u,children:t})})},V=({block:e,className:t})=>{let{env:r}=p(),i=g(),o=(0,n.AH)({margin:"24px 0 8px",textAlign:"center"}),s=(0,n.AH)({margin:`${l(i)}px 0 6px`,textAlign:"center"}),c=(0,n.AH)({maxWidth:"100%",borderRadius:16}),d=(0,n.AH)({maxWidth:"100%"}),u=(0,n.AH)({display:"block",marginTop:6}),h=(0,n.AH)({textAlign:"center",margin:"6px 24px 0",display:"block"});return(0,a.FD)("figure",{id:e.id,css:"pc"===r?o:s,className:t,children:[(0,a.Y)("img",{src:e.image[e.image.type].url,alt:"",css:"pc"===r?c:d}),e.image.caption.length>0&&(0,a.Y)("figcaption",{css:"pc"===r?u:h,children:e.image.caption.map((e,t)=>(0,a.Y)(F,{text:e,shouldSplitTextWithAsterisk:!1},t))})]})},X=r(84905),Q={default:b.lP.grey800,gray:b.lP.grey500,brown:b.Tj.yellow900,orange:b.Tj.orange500,yellow:b.Tj.yellow500,green:b.Tj.green400,blue:b.Tj.blue400,purple:b.Tj.purple300,pink:b.Tj.red300,red:b.Tj.red500},J={gray_background:b.Tj.grey500,brown_background:b.Tj.yellow900,orange_background:b.Tj.orange500,yellow_background:b.Tj.yellow500,green_background:b.Tj.green300,blue_background:b.Tj.blue300,purple_background:b.Tj.purple300,pink_background:b.Tj.red200,red_background:b.Tj.red500},ee=({text:e,color:t,blockTextColor:r})=>null!=t?t:null!=e.href&&"default"===e.annotations.color?b.lP.grey600:null!=Q[e.annotations.color]&&Q[e.annotations.color]!==Q.default?Q[e.annotations.color]:null!=r&&r!==Q.default?r:void 0,et=({text:e,color:t,blockColor:r,enableSuperscript:n,className:i})=>{let{textReplacer:l}=(0,X.U)(),o={...e,plain_text:l?.(e.plain_text)??e.plain_text};if(o.annotations.code)return(0,a.Y)("code",{style:{fontFamily:'Consolas, Menlo, Monaco, source-code-pro, "Courier New", monospace',fontSize:"0.9em",backgroundColor:b.lP.opacity100,border:`1px solid ${b.lP.opacity200}`,borderRadius:3},className:i,children:(0,a.Y)(D,{text:o,textColor:ee({text:o,color:null!=t?t:null!=r?Q[r]:void 0}),shouldSplitTextWithAsterisk:n})});if("gray_background"===o.annotations.color||"gray_background"===r){let e={...o,annotations:{...o.annotations,color:"default"}};return(0,a.Y)(F,{text:e,shouldSplitTextWithAsterisk:!1,className:i})}let s=null!=J[o.annotations.color]?J[o.annotations.color]:null!=r&&null!=J[r]?J[r]:void 0;return null!=s?(0,a.Y)(D,{text:o,textColor:ee({text:o,color:null!=t?t:null!=r?Q[r]:void 0}),backgroundColor:s,shouldSplitTextWithAsterisk:n,className:i}):(0,a.Y)(D,{text:o,textColor:ee({text:o,color:t,blockTextColor:null==r?void 0:Q[r]}),shouldSplitTextWithAsterisk:n,className:i})},er=e=>e>2.35?28:e>1.9?24:e>1.35?20:16,en={BulletedList:({children:e,className:t})=>{let{env:r}=p(),i=g(),s=(0,n.AH)`
    ${o}
    margin: 24px 0 8px;
    padding: 0;
    list-style: none;

    & ul,
    & ol {
      margin: 16px 0 0;
    }

    /* Note(dongheekim): List > ListItem */
    & > li {
      margin-bottom: 16px;
      padding-left: 24px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    /* Note(dongheekim): List > ListItem > ContentsWrapper */
    & > li > span {
      position: relative;
    }

    /* Note(dongheekim): List > ListItem > ContentsWrapper > Leaf:first-child::before */
    & > li > span > :first-child::before {
      content: '•';
      font-weight: 500;
      color: ${b.lP.grey800};
      position: absolute;
      left: -24px;
    }
  `,c=(0,n.AH)`
    ${o}
    margin: ${l(i)}px 24px 6px;
    padding: 0;
    list-style: none;

    & ul,
    & ol {
      margin: 8px 0 0;
    }

    & > li {
      margin-bottom: 8px;
      padding-left: ${er(i)+8}px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    & > li > span {
      position: relative;
    }

    & > li > span > :first-child::before {
      content: '•';
      width: ${er(i)}px;
      text-align: center;
      font-weight: 400;
      color: ${b.lP.grey700};
      position: absolute;
      left: -${er(i)+8}px;
    }
  `;return(0,a.Y)("ul",{css:"pc"===r?s:c,className:t,children:e})},NumberedList:({children:e,className:t})=>{let{env:r}=p(),i=g(),s=(0,n.AH)`
    ${o}
    margin: 24px 0 8px;
    padding: 0;
    list-style: none;
    counter-reset: numberedList;

    & ul,
    & ol {
      margin: 16px 0 0;
    }

    & > li {
      counter-increment: numberedList;
      margin-bottom: 16px;
      padding-left: 24px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    & > li > span {
      position: relative;
    }

    & > li > span > :first-child::before {
      content: counter(numberedList) '.';
      font-weight: 500;
      color: ${b.lP.grey800};
      position: absolute;
      left: -24px;
    }
  `,c=(0,n.AH)`
    ${o}
    margin: ${l(i)}px 24px 6px;
    padding: 0;
    list-style: none;
    counter-reset: numberedList;

    & ul,
    & ol {
      margin: 8px 0 0;
    }

    & > li {
      counter-increment: numberedList;
      margin-bottom: 8px;
      padding-left: ${er(i)+8}px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    & > li > span {
      position: relative;
    }

    & > li > span > :first-child::before {
      content: counter(numberedList) '.';
      font-weight: 500;
      color: ${b.lP.grey700};
      position: absolute;
      left: -${er(i)+8}px;
    }
  `;return(0,a.Y)("ol",{css:"pc"===r?s:c,className:t,children:e})},ListItem:({block:e,contents:t,children:r,className:i})=>{let{env:l}=p(),o=f({fontLevel:17}),d=(0,n.AH)({...o,fontWeight:400,color:"pc"===l?b.lP.grey800:b.lP.grey700});return(0,a.FD)("li",{id:e.id,css:d,className:i,children:[(0,a.Y)(c,{lineHeight:o.lineHeight,children:t}),(0,a.Y)(s,{children:r})]})}},ei=({block:e,contents:t,children:r,className:i})=>{let{env:o}=p(),d=g(),{fontSize:u,letterSpacing:h,lineHeight:m,wordBreak:x}=f({fontLevel:17}),y=(0,n.AH)({fontSize:u,letterSpacing:h,lineHeight:m,fontWeight:"normal",color:b.lP.grey800,margin:"24px 0 8px"}),v=(0,n.AH)({fontSize:u,letterSpacing:h,wordBreak:x,lineHeight:m,fontWeight:"normal",color:b.lP.grey700,margin:`${l(d)}px 24px 6px`});return(0,a.FD)("p",{id:e.id,css:"pc"===o?y:v,className:i,children:[(0,a.Y)(c,{lineHeight:m,children:t}),(0,a.Y)(s,{children:r})]})},el=({block:e,className:t})=>{let{env:r}=p(),i=(0,n.AH)({margin:"10px 0 6px",color:b.lP.grey600,textAlign:"center"}),l=(0,n.AH)({margin:"10px 24px 6px",color:b.lP.grey600,textAlign:"center"}),o=(0,n.AH)({display:"block",marginTop:6}),s=(0,n.AH)({textAlign:"center",margin:"6px 24px 0",display:"block"});return(0,a.FD)("figure",{css:"pc"===r?i:l,className:t,children:[(0,a.Y)("audio",{css:{width:"100%"},controls:!0,children:(0,a.Y)("source",{src:e.audio[e.audio.type].url})}),e.audio.caption.length>0&&(0,a.Y)("figcaption",{css:"pc"===r?o:s,children:e.audio.caption.map((e,t)=>(0,a.Y)(F,{text:e,shouldSplitTextWithAsterisk:!1},t))})]})},eo=({className:e})=>{let{env:t}=p(),r=(0,n.AH)`
    border: 0;
    margin-top: 0;
    margin-bottom: 0;
    height: 1px;
    opacity: 1;
    background: var(--tHairlineBackground);
  `,i=(0,n.AH)(r,{margin:0}),l=(0,n.AH)(r,{margin:"0 24px"});return(0,a.Y)("hr",{css:"pc"===t?i:l,className:e})},ea=({block:e})=>{let t=(0,S.kj)(),r=(e,r)=>0===e.length?null:e.map((e,n)=>(0,a.Y)(t.leaf,{text:e,blockColor:r},`text-${n}`)),n=e=>null==e||0===e.length?null:e?.map(e=>(0,a.Y)(ea,{block:e},e.id));switch(e.type){case"heading_1":return(0,a.Y)(t.heading_1,{block:e,contents:r(e[e.type].rich_text,e[e.type].color),children:n(e.children)});case"heading_2":return(0,a.Y)(t.heading_2,{block:e,contents:r(e[e.type].rich_text,e[e.type].color)});case"heading_3":return(0,a.Y)(t.heading_3,{block:e,contents:r(e[e.type].rich_text,e[e.type].color)});case"equation":return(0,a.Y)(t.equation,{block:e,contents:e[e.type].expression});case"paragraph":return(0,a.Y)(t.paragraph,{block:e,contents:r(e[e.type].rich_text,e[e.type].color),children:n(e.children)});case"callout":return(0,a.Y)(t.callout,{block:e,contents:r(e[e.type].rich_text),children:n(e.children)});case"quote":return(0,a.Y)(t.quote,{block:e,contents:r(e[e.type].rich_text,e[e.type].color),children:n(e.children)});case"bulleted_list_item":case"numbered_list_item":return(0,a.Y)(t.list_item,{block:e,contents:r(e[e.type].rich_text,e[e.type].color),children:n(e.children)});case"bulleted_list":return(0,a.Y)(t.bulleted_list,{block:e,children:n(e.children)});case"numbered_list":return(0,a.Y)(t.numbered_list,{block:e,children:n(e.children)});case"divider":return(0,a.Y)(t.divider,{block:e});case"image":return(0,a.Y)(t.image,{block:e});case"video":return(0,a.Y)(t.video,{block:e});case"audio":return(0,a.Y)(t.audio,{block:e});case"table":let i;return(0,a.Y)(t.table,{block:e,children:(i=e.children,i?.map((e,r)=>(0,a.Y)(t.table_row,{block:e,index:r},e.id)))});case"column_list":return(0,a.Y)(t.column_list,{block:e,children:n(e.children)});case"column":return(0,a.Y)(t.column,{block:e,children:n(e.children)});case"toggle":return(0,a.Y)(t.toggle,{block:e,title:r(e[e.type].rich_text,e[e.type].color),description:n(e.children)});case"to_do":return(0,a.Y)(t.to_do,{block:e,contents:r(e[e.type].rich_text,e[e.type].color),children:n(e.children)});default:{let r=t[e.type];if(null==r)return(0,a.Y)(a.FK,{});return(0,a.Y)(r,{block:e})}}},es=r(41787),ec=({blocks:e,components:t,...r})=>{let n=(0,d.useMemo)(()=>(e=>{let t={},r=e=>{if(null==e)return e;let n=[];return e.forEach((e,i,l)=>{if("bulleted_list_item"!==e.type&&"numbered_list_item"!==e.type){e.children=r(e.children),n.push(e);return}let o=`${"bulleted_list_item"===e.type?"bulleted":"numbered"}-${(e=>{switch(e.parent.type){case"block_id":return e.parent.block_id;case"page_id":return e.parent.page_id;case"database_id":return e.parent.database_id;case"workspace":return e.parent.workspace}})(e)}`;null==t[o]&&(t[o]=[]),t[o]?.push(e),e.type!==l[i+1]?.type&&(n.push({id:String(Math.random()),type:"bulleted_list_item"===e.type?"bulleted_list":"numbered_list",children:t[o]?.map(e=>(e.children=r(e.children),e))??[]}),delete t[o])}),n};return r(e)??[]})(e),[e]);return(0,a.Y)(es.M,{...r,children:(0,a.Y)(S.pe,{components:t,children:n.map((e,t)=>(0,a.Y)(ea,{block:e},t))})})},ed=({blocks:e,components:t,enableSuperscript:r=!1,...n})=>{let i=(0,d.useMemo)(()=>({heading_1:Z,heading_2:K,heading_3:G,paragraph:ei,callout:$,quote:x,toggle:L,list_item:en.ListItem,bulleted_list:en.BulletedList,numbered_list:en.NumberedList,image:V,audio:el,video:U,divider:eo,leaf:e=>(0,a.Y)(et,{enableSuperscript:r,...e}),...t}),[t,r]);return(0,a.Y)(s,{children:(0,a.Y)(ec,{components:i,blocks:e,...n})})}},69378:(e,t,r)=>{"use strict";r.d(t,{pe:()=>N,Hj:()=>D,kj:()=>q});var n=r(35446),i=()=>{},l=({block:e,children:t,contents:r,...l})=>(0,n.FD)("div",{...l,children:[(0,n.Y)("input",{type:"checkbox",checked:e.to_do.checked,onChange:i}),r,t]}),o=r(39950),a=e=>{let[t,r]=(0,o.useState)(e?.defaultOpen??!1);return{open:t,onClickTrigger:()=>{r(e=>!e)}}},s=({block:e,title:t,description:r,...i})=>{let{open:l,onClickTrigger:o}=a();return(0,n.FD)("div",{...i,children:[(0,n.Y)("div",{onClick:o,children:t}),l&&(0,n.Y)("div",{children:r})]})},c=r(946),d=({block:e,...t})=>(0,n.FD)("figure",{...t,children:[(0,n.Y)("video",{css:(0,c.AH)`
          width: 100%;
          margin-bottom: 16px;
        `,children:(0,n.Y)("source",{src:e.video[e.video.type].url})}),e.video.caption.length>0&&(0,n.Y)("figcaption",{css:{textAlign:"center",marginTop:4},children:e.video.caption.map(e=>e.plain_text)})]}),u=r(74482),p=(0,c.AH)`
  width: 100%;
`,h=({block:e,...t})=>(0,n.FD)("figure",{css:{margin:0},...t,children:[(0,n.Y)("img",{src:e.image[e.image.type].url,css:p,alt:""}),e.image.caption.length>0&&(0,n.Y)("figcaption",{css:{textAlign:"center",marginTop:4,color:u.lP.grey900},children:e.image.caption.map(e=>e.plain_text)})]}),g=({children:e,...t})=>(0,n.Y)("a",{target:"_blank",rel:"noreferrer noopener",...t,children:e}),m=r(86785),f=r(29984),b=r(41398),x=({block:e,contents:t,children:r,...i})=>(0,n.FD)("blockquote",{...i,children:[t,r]}),y=r(43106),v=({block:e,...t})=>(0,n.Y)("a",{href:e.id,style:{lineHeight:1.6875},...t,children:e.child_page.title}),w=({block:e,children:t,...r})=>(0,n.Y)("div",{...r,children:t}),_=({children:e,block:t,...r})=>{let i=t.children?.map(()=>"1fr").join(" ");return(0,n.Y)("div",{css:(0,c.AH)`
        display: grid;
        grid-template-columns: ${i};
      `,...r,children:e})},Y=({block:e,...t})=>(0,n.Y)("hr",{...t}),k=({block:e,contents:t,...r})=>(0,n.Y)("div",{...r,children:t}),A=({block:e,contents:t,children:r,...i})=>{let{open:l,onClickTrigger:o}=a();return(0,n.FD)("div",{...i,children:[(0,n.Y)("h1",{onClick:o,children:t}),l&&(0,n.Y)(n.FK,{children:r})]})},j=({block:e,contents:t,children:r,...i})=>e.heading_1.is_toggleable?(0,n.Y)(A,{block:e,contents:t,...i,children:r}):(0,n.Y)("h1",{...i,children:t}),T=({block:e,contents:t,children:r,...i})=>{let{open:l,onClickTrigger:o}=a();return(0,n.FD)("div",{...i,children:[(0,n.Y)("h2",{onClick:o,children:t}),l&&(0,n.Y)(n.FK,{children:r})]})},$=({block:e,contents:t,children:r,...i})=>e.heading_2.is_toggleable?(0,n.Y)(T,{block:e,contents:t,...i,children:r}):(0,n.Y)("h2",{...i,children:t}),H=({block:e,contents:t,children:r,...i})=>{let{open:l,onClickTrigger:o}=a();return(0,n.FD)("div",{...i,children:[(0,n.Y)("h3",{onClick:o,children:t}),l&&(0,n.Y)(n.FK,{children:r})]})},P=({block:e,contents:t,children:r,...i})=>e.heading_3.is_toggleable?(0,n.Y)(H,{block:e,contents:t,...i,children:r}):(0,n.Y)("h3",{...i,children:t}),M=r(84905),C=r(89694),L=({block:e,...t})=>(0,n.FD)("figure",{...t,children:[(0,n.Y)("audio",{css:{width:"100%"},controls:!0,children:(0,n.Y)("source",{src:e.audio[e.audio.type].url})}),e.audio.caption.length>0&&(0,n.Y)("figcaption",{css:{textAlign:"center",marginTop:4},children:e.audio.caption.map(e=>e.plain_text)})]}),S=r(39895),W=({block:e,contents:t,children:r,...i})=>(0,n.FD)("aside",{...i,children:[t,r]}),D=({block:e,index:t,...r})=>{let i=(()=>{if(null==(0,o.useContext)(C.G))throw Error("TableContext must not be null");return(0,o.useContext)(C.G)})();return(0,n.Y)("div",{css:(0,c.AH)`
        display: grid;
        width: 100%;
        min-height: 34px;
        background-color: ${i?.has_row_header===!0&&0===t?u.Tj.grey100:"transparent"};
        grid-template-columns: ${e.table_row.cells.map(()=>"1fr").join(" ")};

        > div {
          border-right: 1px solid ${u.Tj.black};
          border-bottom: 1px solid ${u.Tj.black};
        }
      `,...r,children:e.table_row.cells.map((e,t)=>(0,n.Y)("div",{style:{backgroundColor:i?.has_column_header===!0&&0===t?u.Tj.grey100:"transparent"},children:0===e.length?(0,n.Y)("div",{}):e.map((e,t)=>(0,n.Y)(R,{text:e},t))},t))})},F=(0,o.createContext)(null),N=({children:e,components:t})=>{let r=(0,o.useMemo)(()=>({...{heading_1:j,heading_2:$,heading_3:P,paragraph:b.f,callout:W,quote:x,toggle:s,leaf:R,equation:k,bulleted_list:S.Q,numbered_list:f.f,list_item:m.c,to_do:l,image:h,video:d,audio:L,divider:Y,table:y.X,table_row:D,child_page:v,column_list:_,column:w,link:g},...t}),[t]);return(0,n.Y)(F.Provider,{value:r,children:e})},q=()=>{let e=(0,o.useContext)(F);if(null==e)throw Error("Components is supposed to be not null");return e},I={default:u.lP.grey800,gray:u.lP.grey500,brown:u.Tj.yellow900,orange:u.Tj.orange500,yellow:u.Tj.yellow500,green:u.Tj.green400,blue:u.Tj.blue400,purple:u.Tj.purple300,pink:u.Tj.red300,red:u.Tj.red500},z={gray_background:u.Tj.grey500,brown_background:u.Tj.yellow900,orange_background:u.Tj.orange500,yellow_background:u.Tj.yellow500,green_background:u.Tj.green300,blue_background:u.Tj.blue300,purple_background:u.Tj.purple300,pink_background:u.Tj.red200,red_background:u.Tj.red500},E=({text:e,color:t,blockTextColor:r,backgroundColor:i,...l})=>{let{textReplacer:a}=(0,M.U)(),s=q(),d=(0,o.useMemo)(()=>null!=t?t:null!=e.href?u.lP.grey700:null!=I[e.annotations.color]&&I[e.annotations.color]!==I.default?I[e.annotations.color]:null!=r?r:I.default,[e,t,r]);return null!=e.href?(0,n.Y)(s.link,{href:e.href,...l,children:a?.(e.plain_text)??e.plain_text}):e.annotations.code?(0,n.Y)("code",{...l,css:{fontSize:"0.9em",backgroundColor:u.lP.greyOpacity100,border:`1px solid ${u.lP.greyOpacity200}`,borderRadius:3},children:a?.(e.plain_text)??e.plain_text}):(0,n.Y)("span",{css:(0,c.AH)`
        color: ${d};
        line-height: 1.6875;
        ${null==i?"":`background-color: ${((e,t)=>{if(t<=0)return"rgba(255, 255, 255, 0)";if(t>=100)return e;if(e.startsWith("#")&&7===e.length)return`${e}${(t/100*225).toString(16).toUpperCase().slice(0,2)}`;if(e.startsWith("rgb(")){let r=Math.round(t);return`${e.slice(0,e.length-1)}, ${r/100})`}return e})(i,24)};`}
        ${e.annotations.bold?" font-weight: bold;":""}
        ${e.annotations.italic?"font-style: italic;":""}
        ${e.annotations.underline||null!=e.href?"text-decoration: underline;":""}
        ${e.annotations.strikethrough?"text-decoration: line-through;":""}
      `,...l,children:a?.(e.plain_text)??e.plain_text})},R=({text:e,color:t,blockColor:r,...i})=>{let l=null!=z[e.annotations.color]?z[e.annotations.color]:null!=r&&null!=z[r]?z[r]:void 0;return null!=l?(0,n.Y)(E,{text:e,backgroundColor:l,color:null!=t?t:null!=r?I[r]:void 0,...i}):(0,n.Y)(E,{text:e,blockTextColor:null==r?void 0:I[r],color:t,...i})}},73251:(e,t,r)=>{"use strict";r.d(t,{Y:()=>N});var n=r(45182),i=()=>(0,n.jsx)("div",{className:"tw3v-eukrxq0"}),l=r(39950),o=(0,l.createContext)(null),a=e=>{let{typography:t,children:r}=e;return(0,n.jsx)(o.Provider,{value:t,children:r})},s=()=>{let e=(0,l.useContext)(o);if(null==e)throw Error("useHeaderContext는 HeaderProvider 내부에서만 사용 가능합니다.");return e},c=r(14483),d=r(71535),u=(0,l.forwardRef)((e,t)=>{let{children:r,variants:i="normal",...l}=e,o=s();return(0,n.jsx)(d.D,{ref:t,color:p[i],fontWeight:h[i],typography:g[o],...l,children:r})}),p={weak:c.lP.grey600,normal:c.lP.grey700,strong:c.lP.grey700},h={weak:"medium",normal:"medium",strong:"semibold"},g={small:"xsmall",p:"xsmall",h7:"xsmall",h6:"small",h5_text:"p",h5_number:"p"},m=r(3638),f=(0,l.forwardRef)((e,t)=>{let{children:r,className:i,variants:l="normal",...o}=e,a=s();return(0,n.jsx)(d.D,{ref:t,className:(0,m.A)("tw3v-1awtx4k0",i),color:b[l],fontWeight:x[l],typography:y[a],...o,children:r})}),b={weak:c.lP.grey600,normal:c.lP.grey700,strong:c.lP.grey700},x={weak:"medium",normal:"medium",strong:"semibold"},y={small:"small",p:"p",h7:"p",h6:"p",h5_text:"p",h5_number:"p"},v={small:"tw3v-brd2nw1",p:"tw3v-brd2nw2",h6:"tw3v-brd2nw3",h7:"tw3v-brd2nw4",h5_text:"tw3v-brd2nw5",h5_number:"tw3v-brd2nw6"},w=(0,l.forwardRef)((e,t)=>{let{children:r,variants:i="normal",className:l,...o}=e,a=s();return(0,n.jsx)(d.D,{ref:t,className:(0,m.A)("tw3v-brd2nw0",v[a],l),color:_[i],fontWeight:Y[i],typography:k[a],...o,children:r})}),_={weak:c.lP.grey600,normal:c.lP.grey600,strong:c.lP.grey700},Y={weak:"regular",normal:"regular",strong:"medium"},k={small:"xsmall",p:"xsmall",h7:"xsmall",h6:"small",h5_text:"p",h5_number:"p"},A=(0,l.forwardRef)((e,t)=>{let{children:r,className:i,...l}=e,o=s();return(0,n.jsx)(d.D,{ref:t,color:c.lP.grey800,fontWeight:"bold",typography:j[o],className:(0,m.A)("tw3v-1pv95pb0","h5_number"===o&&"tw3v-1pv95pb1",i),...l,children:r})}),j={small:"small",p:"p",h7:"h7",h6:"h6",h5_text:"h5",h5_number:"h5"},T={xsmall:"tw3v-1jveq9o1",small:"tw3v-1jveq9o2",p:"tw3v-1jveq9o3",h7:"tw3v-1jveq9o4",h6:"tw3v-1jveq9o5",h5_text:"tw3v-1jveq9o6",h5_number:"tw3v-1jveq9o7"},$="tw3v-1jveq9o8",H={right:"tw3v-1jveq9oa",bottom:"tw3v-1jveq9ob"},P=r(40382),M=(0,l.forwardRef)((e,t)=>{let{children:r,className:i,arrowDirection:l="right",...o}=e,a=s();return(0,n.jsx)("button",{ref:t,className:(0,m.A)("tw3v-1jveq9o0",T[a],i),children:(0,n.jsxs)(A,{className:$,...o,children:[(0,n.jsx)("span",{children:r}),(0,n.jsx)(P.In,{size:C[a]?.width,name:"icon-arrow-right-small-mono",color:c.lP.grey400,className:H[l]})]})})}),C={xsmall:{width:12},small:{width:14},p:{width:17},h7:{width:19},h6:{width:22},h5_text:{width:27},h5_number:{width:29}},L=(0,l.forwardRef)((e,t)=>{let{children:r,className:i,arrowDirection:l="right",...o}=e,a=s();return(0,n.jsx)("button",{ref:t,className:(0,m.A)("tw3v-ydlavm0 tw3v-1jveq9o0",T[k[a]],i),children:(0,n.jsxs)(w,{className:$,...o,children:[(0,n.jsx)("span",{className:$,children:r}),(0,n.jsx)(P.In,{size:C[k[a]]?.width,name:"icon-arrow-right-small-mono",color:c.lP.grey400,className:(0,m.A)(H[l])})]})})}),S=(0,l.forwardRef)((e,t)=>{let{children:r,variants:i="normal",...l}=e,o=s();return(0,n.jsx)(d.D,{ref:t,color:W[i],fontWeight:D[i],typography:F[o],...l,children:r})}),W={weak:c.lP.grey600,normal:c.lP.grey700,strong:c.lP.grey700},D={weak:"medium",normal:"medium",strong:"semibold"},F={small:"xsmall",p:"xsmall",h7:"xsmall",h6:"small",h5_text:"p",h5_number:"p"},N=(0,l.forwardRef)((e,t)=>{let{className:r,typography:l,showBorder:o,upper:s,title:c,subtitle:d,right:p,lower:h,...g}=e;return(0,n.jsx)(a,{typography:l,children:(0,n.jsxs)("div",{ref:t,className:(0,m.A)("tw3v-1wmz9lv0",r),...g,children:["string"==typeof s?(0,n.jsx)(S,{children:s}):s,(0,n.jsxs)("div",{className:"tw3v-1wmz9lv1",children:["string"==typeof c?(0,n.jsx)(A,{children:c}):c,"string"==typeof d?(0,n.jsx)(w,{children:d}):d,"string"==typeof p?(0,n.jsx)(f,{children:p}):p]}),"string"==typeof h?(0,n.jsx)(u,{children:h}):h,o?(0,n.jsx)(i,{}):null]})})});N.UpperText=S,N.LowerText=u,N.RightText=f,N.Title=A,N.TitleButton=M,N.Subtitle=w,N.SubtitleButton=L},84905:(e,t,r)=>{"use strict";r.d(t,{U:()=>l});var n=r(41787),i=r(39950),l=()=>(0,i.useContext)(n.b)},86785:(e,t,r)=>{"use strict";r.d(t,{c:()=>i});var n=r(35446),i=({block:e,contents:t,children:r,...i})=>(0,n.FD)("li",{...i,children:[t,r]})},89694:(e,t,r)=>{"use strict";r.d(t,{G:()=>l,u:()=>o});var n=r(39950),i=r(35446),l=(0,n.createContext)(null),o=({value:e,children:t})=>(0,i.Y)(l.Provider,{value:e,children:t})}}]);