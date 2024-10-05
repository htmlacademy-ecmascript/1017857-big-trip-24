(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var d=[].concat(t[c]);i&&o[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),e.push(d))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:a,d:o,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",b={};b[y]=v;var g=function(t){return t instanceof E},w=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();b[r]&&(s=r),n&&(b[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;b[a]=e,s=a}return!i&&s&&(y=s),s||!i&&y},C=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new E(n)},$=_;$.l=w,$.i=g,$.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var E=function(){function v(t){this.$L=w(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if($.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return $},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=C(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return C(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<C(t)},m.$g=function(t,e,n){return $.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!$.u(e)||e,p=$.p(t),f=function(t,e){var i=$.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},h=function(t,e){return $.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case d:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case a:var b=this.$locale().weekStart||0,g=(v<b?v+7:v)-b;return f(c?_-g:_+(6-g),m);case o:case u:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,c=$.p(t),p="set"+(this.$u?"UTC":""),f=(a={},a[o]=p+"Date",a[u]=p+"Date",a[l]=p+"Month",a[d]=p+"FullYear",a[r]=p+"Hours",a[s]=p+"Minutes",a[i]=p+"Seconds",a[n]=p+"Milliseconds",a)[c],h=c===o?this.$D+(e-this.$W):e;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[f](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[$.p(t)]()},m.add=function(n,c){var u,p=this;n=Number(n);var f=$.p(c),h=function(t){var e=C(p);return $.w(e.date(e.date()+Math.round(t*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===o)return h(1);if(f===a)return h(7);var v=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[f]||1,m=this.$d.getTime()+n*v;return $.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=$.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return $.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:$.s(a+1,2,"0"),MMM:d(n.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:$.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:$.s(r,2,"0"),h:u(1),hh:u(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:$.s(o,2,"0"),s:String(this.$s),ss:$.s(this.$s,2,"0"),SSS:$.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,p){var f,h=$.p(u),v=C(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=$.m(this,v);return y=(f={},f[d]=y/12,f[l]=y,f[c]=y/3,f[a]=(_-m)/6048e5,f[o]=(_-m)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[h]||_,p?y:$.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return b[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=w(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return $.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),k=E.prototype;return C.prototype=k,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",u]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),C.extend=function(t,e){return t.$i||(t(e,E,C),t.$i=!0),C},C.locale=w,C.isDayjs=g,C.unix=function(t){return C(1e3*t)},C.en=b[y],C.Ls=b,C.p={},C}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var p=n(u),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var h=s(f,i);i.byIndex=a,e.splice(a,0,{identifier:u,updater:h,references:1})}o.push(u)}return o}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=i(t,s),c=0;c<r.length;c++){var d=n(r[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";function t(t,e,n="beforeend"){if(!(t instanceof b))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function e(t,e){if(!(t instanceof b&&e instanceof b))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function i(t){if(null!==t){if(!(t instanceof b))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}var s=n(379),r=n.n(s),o=n(795),a=n.n(o),l=n(569),c=n.n(l),d=n(565),u=n.n(d),p=n(216),f=n.n(p),h=n(589),v=n.n(h),m=n(10),_={};_.styleTagTransform=v(),_.setAttributes=u(),_.insert=c().bind(null,"head"),_.domAPI=a(),_.insertStyleElement=f(),r()(m.Z,_),m.Z&&m.Z.locals&&m.Z.locals;const y="shake";class b{#t=null;constructor(){if(new.target===b)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(y),setTimeout((()=>{this.element.classList.remove(y),t?.()}),600)}}const g=class extends b{get template(){return'<section class="trip-main__trip-info  trip-info"></section>'}},w=class extends b{get template(){return'\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n    </div>\n  '}},C=class extends b{get template(){return'<p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>'}},$=class extends b{get template(){return'\n      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n        <div class="trip-sort__item  trip-sort__item--day">\n          <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n          <label class="trip-sort__btn" for="sort-day">Day</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--event">\n          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n          <label class="trip-sort__btn" for="sort-event">Event</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--time">\n          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n          <label class="trip-sort__btn" for="sort-time">Time</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--price">\n          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n          <label class="trip-sort__btn" for="sort-price">Price</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--offer">\n          <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n          <label class="trip-sort__btn" for="sort-offer">Offers</label>\n        </div>\n      </form>\n    '}},E=class extends b{get template(){return'\n      <ul class="trip-events__list"></ul>\n    '}},k=class extends b{get template(){return'\n      <p class="trip-events__msg">Click New Event to create your first point</p>\n  '}};var M=n(484),x=n.n(M);const S="HH:mm",D="everything",A="future",T="present",O="past";function L(t,e){return x()(t).format(e)}function z(t,e){return t&&e?x()(t).format(e):""}const H=class extends b{#e=null;#n=null;#i=null;#s=null;#r=null;constructor(t,e,n,i,s){super(),this.#e=t,this.#n=e,this.#i=n,this.#s=i,this.#r=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#a)}get template(){return function(t,e,n){const i=z(t.date_from,"MMM DD"),s=z(t.date_from,S),r=z(t.date_to,S),o=n.map((t=>function(t){return`\n      <li class="event__offer">\n        <span class="event__offer-title">${t.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </li>\n    `}(t))).join("");return`\n      <li class="trip-events__item">\n        <div class="event">\n          <time class="event__date" datetime="2019-03-18">${i}</time>\n          <div class="event__type">\n            <img class="event__type-icon" width="42" height="42" src="img/icons/${t.type}.png" alt="Event type icon">\n          </div>\n          <h3 class="event__title">${e.name}</h3>\n          <div class="event__schedule">\n            <p class="event__time">\n              <time class="event__start-time" datetime="${t.date_from}">${s}</time>\n              &mdash;\n              <time class="event__end-time" datetime="${t.date_to}">${r}</time>\n            </p>\n            <p class="event__duration">${function(t,e){const n=x()(e).diff(t,"minutes"),i=Math.trunc(n/1440),s=Math.trunc(n/60),r=n%60;return`${i?`${i}D `:""}${s?`${s}H `:""}${r?`${r}M`:""}`}(t.date_from,t.date_to)}</p>\n          </div>\n          <p class="event__price">\n            &euro;&nbsp;<span class="event__price-value">${t.base_price}</span>\n          </p>\n          <h4 class="visually-hidden">Offers:</h4>\n          <ul class="event__selected-offers">\n            ${o}\n          </ul>\n          <button class="event__favorite-btn ${t.is_favorite&&"event__favorite-btn--active"}" type="button">\n            <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n          </button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </div>\n      </li>\n    `}(this.#e,this.#n,this.#i)}#o=t=>{t.preventDefault(),this.#s()};#a=t=>{t.preventDefault(),this.#r()}},I=class extends b{#e=null;#i=null;#n=null;#l=null;#c=null;#d=null;constructor(t,e,n,i,s,r){super(),this.#e=t,this.#i=e,this.#n=n,this.#l=i,this.#c=s,this.#d=r,this.element.querySelector(".event--edit").addEventListener("submit",this.#u),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#u)}get template(){return function(t,e,n,i,s){const r=i.map((t=>function(t){return`\n    <div class="event__type-item">\n      <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n      <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${e=t,e.charAt(0).toUpperCase()+e.slice(1)}</label>\n    </div>\n  `;var e}(t))).join(""),o=e.offers.map((t=>function(t,e){return`\n    <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${e.some((e=>e.id===t.id))&&"checked"}>\n      <label class="event__offer-label" for="event-offer-luggage-1">\n        <span class="event__offer-title">${t.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </label>\n    </div>\n  `}(t,s))).join("");return`\n      <li class="trip-events__item">\n        <form class="event event--edit" action="#" method="post">\n          <header class="event__header">\n            <div class="event__type-wrapper">\n              <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                <span class="visually-hidden">Choose event type</span>\n                <img class="event__type-icon" width="17" height="17" src="img/icons/${t.type}.png" alt="Event type icon">\n              </label>\n              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n              <div class="event__type-list">\n                <fieldset class="event__type-group">\n                  <legend class="visually-hidden">Event type</legend>\n                  ${r}\n                </fieldset>\n              </div>\n            </div>\n\n            <div class="event__field-group  event__field-group--destination">\n              <label class="event__label  event__type-output" for="event-destination-1">\n                ${t.type}\n              </label>\n              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${n.name}" list="destination-list-1">\n              <datalist id="destination-list-1">\n                <option value="Amsterdam"></option>\n              </datalist>\n            </div>\n\n            <div class="event__field-group  event__field-group--time">\n              <label class="visually-hidden" for="event-start-time-1">From</label>\n              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${L(t.date_from,"YY/MM/DD HH:mm")}">\n              &mdash;\n              <label class="visually-hidden" for="event-end-time-1">To</label>\n              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${L(t.date_to,"YY/MM/DD HH:mm")}">\n            </div>\n\n            <div class="event__field-group  event__field-group--price">\n              <label class="event__label" for="event-price-1">\n                <span class="visually-hidden">Price</span>\n                &euro;\n              </label>\n              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${t.base_price}">\n            </div>\n\n            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n            <button class="event__reset-btn" type="reset">Delete</button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </header>\n          <section class="event__details">\n            <section class="event__section  event__section--offers">\n              <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n              <div class="event__available-offers">\n                ${o}\n              </div>\n            </section>\n\n            <section class="event__section  event__section--destination">\n              <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n              <p class="event__destination-description">${n.description}</p>\n            </section>\n          </section>\n        </form>\n      </li>\n    `}(this.#e,this.#i,this.#n,this.#l,this.#c)}#u=t=>{t.preventDefault(),this.#d()}},j="DEFAULT",q="EDITING",F=class{#p=null;#f=null;#h=null;#v=null;#m=null;#e=null;#n=null;#i=null;#_=null;#y=null;#b=null;#g=null;#c=null;#w=j;constructor(t,e,n){this.#p=t,this.#v=e,this.#m=n}init(n,s,r){this.#e=n,this.#n=s.getDestinationsById(this.#e.destination),this.#i=r.getOffersById(this.#e.type,this.#e.offers),this.#_=n.id,this.#y=r.getOffersByType(this.#e.type),this.#b=s.getDestinationsById(this.#e.destination),this.#g=r.getOffersType(),this.#c=r.getOffersById(this.#e.type,this.#e.offers);const o=this.#f,a=this.#h;this.#f=new H(this.#e,this.#n,this.#i,this.#C,this.#r),this.#h=new I(this.#e,this.#y,this.#b,this.#g,this.#c,this.#$),null!==o&&null!==a?(this.#w===j&&e(this.#f,o),this.#w===q&&e(this.#h,a),i(o),i(a)):t(this.#f,this.#p)}destroy(){i(this.#f),i(this.#h)}resetView(){this.#w!==j&&this.#E()}#k=t=>{"Escape"===t.key&&(t.preventDefault(),this.#E(),document.removeEventListener("keydown",this.#k))};#C=()=>{this.#M(),document.addEventListener("keydown",this.#k)};#$=()=>{this.#E(),document.removeEventListener("keydown",this.#k)};#r=()=>{this.#v({...this.#e,is_favorite:!this.#e.is_favorite})};#M(){e(this.#h,this.#f),document.addEventListener("keydown",this.#k),this.#m(),this.#w=q}#E(){e(this.#f,this.#h),document.addEventListener("keydown",this.#k),this.#w=j}},B=class extends b{#x=null;constructor(t){super(),this.#x=t}get template(){return function(t){const e=t.map(((t,e)=>function(t,e){const{type:n,count:i}=t;return`\n      <div class="trip-filters__filter">\n        <input\n          id="filter-${n}"\n          class="trip-filters__filter-input  visually-hidden"\n          type="radio"\n          name="trip-filter"\n          value="${n}"\n          ${e?"checked":""}\n          ${0===i&&"disabled"}\n        />\n        <label\n          class="trip-filters__filter-label"\n          for="filter-${n}"\n        >\n          ${t.type}\n        </label>\n      </div>\n    `}(t,0===e))).join("");return`\n      <form class="trip-filters" action="#" method="get">\n        ${e}\n        <button class="visually-hidden" type="submit">Accept filter</button>\n      </form>\n    `}(this.#x)}};let P=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+((e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_")),"");const Z=[{base_price:1500,date_from:"2024-10-20T22:55:56.845Z",date_to:"2024-10-22T09:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",is_favorite:!1,offers:["b4c3e4e6-9053-42ce-b747-e281314baa31","i68kn1fy-vu6y-i0wo-xejv-m6fu0sx8njih","kirzg5it-4l5b-bzab-ax6j-bg3009ugj7tg"],type:"taxi"},{base_price:2100,date_from:"2024-09-13T10:55:56.845Z",date_to:"2024-09-30T11:22:13.375Z",destination:"qthxu1kk-fzd9-0te7-9r3g-j0onvu7uzvqr",is_favorite:!0,offers:["c8iplez6-r9vb-ce6h-2zd0-379i08bde2n8","9fa92592-9304-4ee5-a7ff-ff4a9bc30fc6","26111e09-cdbc-4156-af31-75f287d9b799"],type:"train"},{base_price:1800,date_from:"2019-07-10T06:55:56.845Z",date_to:"2019-07-11T05:22:13.375Z",destination:"ik84hyo8-mki7-szaa-fvqt-ed3f1lz3o8cz",is_favorite:!1,offers:["kirzg5it-4l5b-bzab-ax6j-bg3009ugj7tg"],type:"bus"},{base_price:2800,date_from:"2024-11-10T06:55:56.845Z",date_to:"2024-11-11T05:22:13.375Z",destination:"qthxu1kk-fzd9-0te7-9r3g-j0onvu7uzvqr",is_favorite:!0,offers:["2db2e669-cd94-4b13-987c-a9b23b94d5b7","953c360a-678d-4522-ba97-a28f553adbb2"],type:"flight"},{base_price:2200,date_from:"2024-11-23T06:55:56.845Z",date_to:"2024-11-25T05:22:13.375Z",destination:"heqqq4fm-oolb-6tgl-1xwe-hhutu0ah1r6k",is_favorite:!0,offers:[],type:"check-in"},{base_price:3200,date_from:"2024-12-23T06:55:56.845Z",date_to:"2024-12-25T05:22:13.375Z",destination:"ik84hyo8-mki7-szaa-fvqt-ed3f1lz3o8cz",is_favorite:!0,offers:["35d0e171-b3f2-45e8-8314-4660f0d09448","9fa92592-9304-4ee5-a7ff-ff4a9bc30fc6","43106a55-2fc2-42cb-9431-aba23e7b9f1f","67e6e41b-e2b3-4d62-a561-e17025935615"],type:"ship"}],Y=()=>{return{id:P(),...(t=Z,t[Math.floor(Math.random()*t.length)])};var t},U=[{type:"taxi",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade to a business class",price:120}]},{type:"train",offers:[{id:"c8iplez6-r9vb-ce6h-2zd0-379i08bde2n8",title:"extra food",price:80},{id:"i68kn1fy-vu6y-i0wo-xejv-m6fu0sx8njih",title:"first class",price:180}]},{type:"restaurant",offers:[{id:"kirzg5it-4l5b-bzab-ax6j-bg3009ugj7tg",title:"business lunch",price:210}]},{type:"bus",offers:[]},{type:"ship",offers:[{id:"35d0e171-b3f2-45e8-8314-4660f0d09448",title:"Mediterranean Cruise",price:693},{id:"9fa92592-9304-4ee5-a7ff-ff4a9bc30fc6",title:"Sailing Through Paradise",price:690},{id:"43106a55-2fc2-42cb-9431-aba23e7b9f1f",title:"Ocean Explorer Adventure",price:477},{id:"67e6e41b-e2b3-4d62-a561-e17025935615",title:"Luxury Island Getaway",price:760}]},{type:"drive",offers:[{id:"26111e09-cdbc-4156-af31-75f287d9b799",title:"Cross-Country Road Trip",price:956}]},{type:"flight",offers:[{id:"2db2e669-cd94-4b13-987c-a9b23b94d5b7",title:"First-Class Flight to Paris",price:411},{id:"953c360a-678d-4522-ba97-a28f553adbb2",title:"Luxury Flight to Dubai",price:609}]},{type:"check-in",offers:[{id:"6b81b376-5fdc-4084-8313-f8d0036daf5f",title:"5-Star Hotel Stay",price:853}]},{type:"sightseeing",offers:[{id:"e6c9dea2-7c07-4975-ac89-909749dba892",title:"Guided Museum Walk",price:673}]}],N=[{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]},{id:"09bq4w5r-zcod-t71l-in6n-anknc84d2kj8",description:"City of bright lights and sunny beaches.",name:"Lumina",pictures:[{src:"http://picsum.photos/300/200?r=0.0762584136563317",description:"Vibrant cityscape with dazzling lights and golden sands."},{src:"http://picsum.photos/300/200?r=0.0762584105163333",description:"City skyline aglow with neon lights against a twilight sky, with bustling streets and sandy beach in the foreground."}]},{id:"ik84hyo8-mki7-szaa-fvqt-ed3f1lz3o8cz",description:"Tranquil spot amid dense forests.",name:"Silverwood",pictures:[{src:"http://picsum.photos/300/200?r=0.7462547564542345",description:"Serene forest path surrounded by lush greenery."},{src:"http://picsum.photos/300/200?r=0.5678254615763317",description:"A quiet forest trail winding through towering trees, bathed in soft sunlight filtering through the dense canopy."},{src:"http://picsum.photos/300/200?r=0.9667833005163317",description:"Lush greenery surrounds a peaceful clearing, where sunlight dances on the leaves and a gentle breeze rustles the branches."}]},{id:"jdjcz8ak-aen1-1uyl-mfb7-sbi4h8qzymke",description:"Scenic views and water activities.",name:"Elderstone",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005343236",description:"Snow-capped mountains rise high into the clouds, casting long shadows over the valley below."},{src:"http://picsum.photos/300/200?r=0.4726543005163111",description:"Gleaming crystal formations shimmer within a dark cave, reflecting the soft glow of lantern light."}]},{id:"71sdpvsr-w55n-5x53-6zke-zxhnsmb8jrzc",description:"Scenic views and water activities.",name:"Sky Lake",pictures:[{src:"http://picsum.photos/300/200?r=0.0777804005163111",description:"Peaceful lake reflecting the clear blue sky."}]},{id:"heqqq4fm-oolb-6tgl-1xwe-hhutu0ah1r6k",description:"Coastal city known for its majestic lighthouses and clear waters.",name:"Brighthaven",pictures:[{src:"http://picsum.photos/300/200?r=0.0762463008894111",description:"A towering white lighthouse stands tall on rugged cliffs, overlooking the vast blue ocean."},{src:"http://picsum.photos/300/200?r=0.0794632005163111",description:"Golden rays of the setting sun shimmer over the calm sea as boats gently sway by the pier."}]},{id:"qthxu1kk-fzd9-0te7-9r3g-j0onvu7uzvqr",description:"Historic architecture and old streets.",name:"Golden Fortress",pictures:[]}],V={[D]:t=>t,[A]:t=>t.filter((t=>function(t){return t.date_from&&x()().isBefore(t.date_from,"day")}(t))),[T]:t=>t.filter((t=>function(t){return t.date_from&&x()().isSame(t.date_from,"day")}(t))),[O]:t=>t.filter((t=>function(t){return t.date_from&&x()().isAfter(t.date_from,"day")}(t)))},W=document.querySelector(".page-header"),G=document.querySelector(".trip-main"),K=W.querySelector(".trip-controls__filters"),R=document.querySelector(".page-main").querySelector(".trip-events"),J=new class{#S=Array.from({length:5},Y);get points(){return this.#S}getPointById(t){return this.points.find((e=>e.id===t))}},X=new class{#i=(()=>U)();get offers(){return this.#i}getOffersType(){const t=this.offers,e=[];for(let n=0;n<t.length;n++)e.push(t[n].type);return e}getOffersByType(t){return this.offers.find((e=>e.type===t))}getOffersById(t,e){return this.getOffersByType(t).offers.filter((t=>e.find((e=>t.id===e))))}},Q=new class{#D=(()=>N)();get destinations(){return this.#D}getDestinationsById(t){return this.destinations.find((e=>e.id===t))}},tt=(et=J,Object.entries(V).map((([t,e])=>({type:t,count:e(et.points).length}))));var et;const nt=new class{#A=null;#T=null;#O=new g;constructor(t,e){this.#A=t,this.#T=e}init(){t(this.#O,this.#A,"afterbegin"),t(new w,this.#O.element),t(new C,this.#O.element)}}(G,K),it=new class{#L=null;#x=null;constructor(t,e){this.#L=t,this.#x=e}init(){t(new B(this.#x),this.#L)}}(K,tt),st=new class{#z=null;#H=null;#I=null;#j=null;#q=new $;#F=new E;#B=new k;#P=new Map;#Z=[];constructor(t,e,n,i){this.#z=t,this.#H=e,this.#I=n,this.#j=i}init(){this.#Z=[...this.#H.points],this.#Y()}#U(t,e,n){const i=new F(this.#F.element,this.#N,this.#m);i.init(t,e,n),this.#P.set(t.id,i)}#V(){t(this.#B,this.#z)}#W(){t(this.#q,this.#z)}#G(){t(this.#F,this.#z);for(let t=0;t<this.#Z.length;t++)this.#U(this.#Z[t],this.#j,this.#I)}#Y(){0!==this.#Z.length?(this.#W(),this.#G()):this.#V()}#N=t=>{var e,n;this.#Z=(e=this.#Z,n=t,e.map((t=>t.id===n.id?n:t))),this.#P.get(t.id).init(t,this.#j,this.#I)};#m=()=>{this.#P.forEach((t=>t.resetView()))}}(R,J,X,Q);nt.init(),it.init(),st.init()})()})();
//# sourceMappingURL=bundle.21481204a82b84020135.js.map