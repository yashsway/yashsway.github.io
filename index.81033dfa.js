!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequirebe8b;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequirebe8b=i),i.register("8slrw",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if(Array.isArray(e))return e}})),i.register("7AJDX",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}})),i.register("ifqQW",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),i.register("auk6i",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(!e)return;if("string"==typeof e)return r.default(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r.default(e,t)};var n,r=(n=i("8NIkP"))&&n.__esModule?n:{default:n}})),i.register("8NIkP",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}})),i.register("5kgyu",(function(e,t){var n;n=function(){var e=null,t={};g();var n=[],r=function(t){if(void 0!==(t=t||{}).seed&&null!==t.seed&&t.seed===parseInt(t.seed,10))e=t.seed;else if("string"==typeof t.seed)e=y(t.seed);else{if(void 0!==t.seed&&null!==t.seed)throw new TypeError("The seed value must be an integer or string");e=null}var u,l;if(null!==t.count&&void 0!==t.count){for(var c=t.count,h=[],d=0;d<t.count;d++)n.push(!1);for(t.count=null;c>h.length;){var f=r(t);null!==e&&(t.seed=e),h.push(f)}return t.count=c,h}return s([u=i(t),l=o(u,t),a(u,l,t)],t)};function i(e){if(n.length>0){var t=d(o=m(e.hue)),r=(o[1]-o[0])/n.length,i=parseInt((t-o[0])/r);return!0===n[i]?i=(i+2)%n.length:n[i]=!0,(t=d(o=[(o[0]+i*r)%359,(o[0]+(i+1)*r)%359]))<0&&(t=360+t),t}var o;return(t=d(o=l(e.hue)))<0&&(t=360+t),t}function o(e,t){if("monochrome"===t.hue)return 0;if("random"===t.luminosity)return d([0,100]);var n=c(e),r=n[0],i=n[1];switch(t.luminosity){case"bright":r=55;break;case"dark":r=i-10;break;case"light":i=55}return d([r,i])}function a(e,t,n){var r=u(e,t),i=100;switch(n.luminosity){case"dark":i=r+20;break;case"light":r=(i+r)/2;break;case"random":r=0,i=100}return d([r,i])}function s(e,t){switch(t.format){case"hsvArray":return e;case"hslArray":return b(e);case"hsl":var n=b(e);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var r=b(e),i=t.alpha||Math.random();return"hsla("+r[0]+", "+r[1]+"%, "+r[2]+"%, "+i+")";case"rgbArray":return C(e);case"rgb":return"rgb("+C(e).join(", ")+")";case"rgba":var o=C(e);return i=t.alpha||Math.random(),"rgba("+o.join(", ")+", "+i+")";default:return f(e)}}function u(e,t){for(var n=h(e).lowerBounds,r=0;r<n.length-1;r++){var i=n[r][0],o=n[r][1],a=n[r+1][0],s=n[r+1][1];if(t>=i&&t<=a){var u=(s-o)/(a-i);return u*t+(o-u*i)}}return 0}function l(e){if("number"==typeof parseInt(e)){var n=parseInt(e);if(n<360&&n>0)return[n,n]}if("string"==typeof e)if(t[e]){var r=t[e];if(r.hueRange)return r.hueRange}else if(e.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)){var i=p(e)[0];return[i,i]}return[0,360]}function c(e){return h(e).saturationRange}function h(e){for(var n in e>=334&&e<=360&&(e-=360),t){var r=t[n];if(r.hueRange&&e>=r.hueRange[0]&&e<=r.hueRange[1])return t[n]}return"Color not found"}function d(t){if(null===e){var n=.618033988749895,r=Math.random();return r+=n,r%=1,Math.floor(t[0]+r*(t[1]+1-t[0]))}var i=t[1]||1,o=t[0]||0,a=(e=(9301*e+49297)%233280)/233280;return Math.floor(o+a*(i-o))}function f(e){var t=C(e);function n(e){var t=e.toString(16);return 1==t.length?"0"+t:t}return"#"+n(t[0])+n(t[1])+n(t[2])}function v(e,n,r){var i=r[0][0],o=r[r.length-1][0],a=r[r.length-1][1],s=r[0][1];t[e]={hueRange:n,lowerBounds:r,saturationRange:[i,o],brightnessRange:[a,s]}}function g(){v("monochrome",null,[[0,0],[100,0]]),v("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),v("orange",[18,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),v("yellow",[46,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),v("green",[62,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),v("blue",[178,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),v("purple",[257,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),v("pink",[282,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}function C(e){var t=e[0];0===t&&(t=1),360===t&&(t=359),t/=360;var n=e[1]/100,r=e[2]/100,i=Math.floor(6*t),o=6*t-i,a=r*(1-n),s=r*(1-o*n),u=r*(1-(1-o)*n),l=256,c=256,h=256;switch(i){case 0:l=r,c=u,h=a;break;case 1:l=s,c=r,h=a;break;case 2:l=a,c=r,h=u;break;case 3:l=a,c=s,h=r;break;case 4:l=u,c=a,h=r;break;case 5:l=r,c=a,h=s}return[Math.floor(255*l),Math.floor(255*c),Math.floor(255*h)]}function p(e){e=3===(e=e.replace(/^#/,"")).length?e.replace(/(.)/g,"$1$1"):e;var t=parseInt(e.substr(0,2),16)/255,n=parseInt(e.substr(2,2),16)/255,r=parseInt(e.substr(4,2),16)/255,i=Math.max(t,n,r),o=i-Math.min(t,n,r),a=i?o/i:0;switch(i){case t:return[(n-r)/o%6*60||0,a,i];case n:return[60*((r-t)/o+2)||0,a,i];case r:return[60*((t-n)/o+4)||0,a,i]}}function b(e){var t=e[0],n=e[1]/100,r=e[2]/100,i=(2-n)*r;return[t,Math.round(n*r/(i<1?i:2-i)*1e4)/100,i/2*100]}function y(e){for(var t=0,n=0;n!==e.length&&!(t>=Number.MAX_SAFE_INTEGER);n++)t+=e.charCodeAt(n);return t}function m(e){if(isNaN(e)){if("string"==typeof e)if(t[e]){var n=t[e];if(n.hueRange)return n.hueRange}else if(e.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i))return h(p(e)[0]).hueRange}else{var r=parseInt(e);if(r<360&&r>0)return h(e).hueRange}return[0,360]}return r}(),e&&e.exports&&(t=e.exports=n),t.randomColor=n}));var o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var a={};function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,t,n){t&&s(e.prototype,t);n&&s(e,n);return e};var u={};Object.defineProperty(u,"__esModule",{value:!0}),u.default=function(e,t){return l.default(e)||c.default(e,t)||d.default(e,t)||h.default()};var l=f(i("8slrw")),c=f(i("7AJDX")),h=f(i("ifqQW")),d=f(i("auk6i"));function f(e){return e&&e.__esModule?e:{default:e}}var v=function(e){for(var t,n,r=e.length;0!==r;)n=Math.floor(Math.random()*r),t=e[r-=1],e[r]=e[n],e[n]=t;return e};var g=function(){"use strict";function t(n,r,i){e(o)(this,t),this.templateSvgEl=n,this.generationIntervals=new Set,this.canvasArea=0,this.generatedHexColors=r,this.circlesInCanvas=[],this.hexColors=[],this.whichColorInSequence=1,this.options={idPrefix:"circle",generationIntervalInMs:4e3,generationIntervalCircleCount:1,areaCoveredThreshold:95},this.options=Object.assign(this.options,i),this.documentHiddenProperty="hidden",this.visibilityChangeEvent="visibilitychange",void 0!==document.hidden?(this.documentHiddenProperty="hidden",this.visibilityChangeEvent="visibilitychange"):void 0!==document.msHidden?(this.documentHiddenProperty="msHidden",this.visibilityChangeEvent="msvisibilitychange"):void 0!==document.webkitHidden&&(this.documentHiddenProperty="webkitHidden",this.visibilityChangeEvent="webkitvisibilitychange"),this.setup()}return e(a)(t,[{key:"setup",value:function(){this.canvasArea=this.calculateAreaOfCanvas(this.templateSvgEl.node),this.hexColors=this.hexColors.concat(this.generatedHexColors),this.hexColors=v(this.hexColors),this.startGenerationClock(this.options.generationIntervalCircleCount,this.options.generationIntervalInMs),this.bindWindowFocusSwitch(),this.bindIntersectionObserver()}},{key:"teardown",value:function(){this.canvasArea=0,this.hexColors=[],this.stopGenerationClock(),window.removeEventListener("focus",this.boundStartGenerationClock),window.removeEventListener("blur",this.boundCleanAndStopGenerationClock),document.removeEventListener(this.visibilityChangeEvent,this.boundOnVisibilityChange),this.observer.disconnect(),this.clean()}},{key:"calculateAreaOfCanvas",value:function(e){var t=e.getBoundingClientRect();if(t)return t.height*t.width}},{key:"calculateAreaOfCircle",value:function(e){return Math.PI*Math.round(e)*Math.round(e)}},{key:"calculatePercentageCoveredOfCanvas",value:function(e,t){return e/t*100}},{key:"isEnoughOfCanvasCoveredByColor",value:function(e){var t=this;if(!this.circlesInCanvas.length)return!1;var n=this.circlesInCanvas.filter((function(t){return t.node.getAttribute("fill")===e})).map((function(e){return t.calculateAreaOfCircle(parseInt(e.attr("r")))})).reduce((function(e,t){return e+t}),0);return this.calculatePercentageCoveredOfCanvas(n,this.canvasArea)>95}},{key:"startGenerationClock",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=this;this.generateCircles(e),this.generationIntervals.add(setInterval((function(){return n.generateCircles(e)}),t))}},{key:"stopGenerationClock",value:function(){var e=!0,t=!1,n=void 0;try{for(var r,i=this.generationIntervals[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value;window.clearInterval(o),this.generationIntervals.delete(o)}}catch(e){t=!0,n=e}finally{try{e||null==i.return||i.return()}finally{if(t)throw n}}}},{key:"bindWindowFocusSwitch",value:function(){var e=this;this.boundStartGenerationClock=this.startGenerationClock.bind(this),this.boundCleanAndStopGenerationClock=function(){e.clean(),e.stopGenerationClock()},this.boundOnVisibilityChange=this.onVisibilityChange.bind(this),window.addEventListener("focus",this.boundStartGenerationClock),window.addEventListener("blur",this.boundCleanAndStopGenerationClock),document.addEventListener(this.visibilityChangeEvent,this.boundOnVisibilityChange)}},{key:"onVisibilityChange",value:function(){this.clean(),document[this.documentHiddenProperty]||"hidden"===document.visibilityState?this.stopGenerationClock():this.startGenerationClock()}},{key:"bindIntersectionObserver",value:function(){var e=this;window.IntersectionObserver&&(this.observer=new IntersectionObserver((function(t,n){var r=e;t.forEach((function(e){e.intersectionRatio<=.1&&r.circlesInCanvas.length?(r.stopGenerationClock(),r.clean()):e.intersectionRatio>.1&&!r.circlesInCanvas.length&&r.startGenerationClock()}))}),{threshold:[.1,.6]}),this.observer.observe(this.templateSvgEl.node))}},{key:"generateID",value:function(){return this.options.idPrefix+Date.now()}},{key:"clean",value:function(){0!==this.circlesInCanvas.length?(this.circlesInCanvas.forEach((function(e){document.querySelector("#"+e.attr("id")).remove()})),this.circlesInCanvas=[],this.whichColorInSequence=1):this.whichColorInSequence=1}},{key:"cleanBasedOnCondition",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){return!!e};0!==this.circlesInCanvas.length?this.circlesInCanvas=this.circlesInCanvas.filter((function(t){return!!e(t)||(document.querySelector("#"+t.attr("id")).remove(),!1)})):this.whichColorInSequence=1}},{key:"animateCircle",value:function(e){var t=this;this.growCircle(e,1e4).then((function(){return e=5e3,new Promise((function(t,n){e&&"number"==typeof e||rej("Invalid time argument provided."),setTimeout((function(){return t()}),Math.abs(e))}));var e})).then((function(){return t.fadeCircle(e,1e3)})).then((function(){var n=document.querySelector("#"+e.attr("id"));n&&n.remove(),t.circlesInCanvas.splice(t.circlesInCanvas.indexOf(e),1)}))}},{key:"growCircle",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e4,n=Math.max(this.templateSvgEl.node.clientWidth,this.templateSvgEl.node.clientHeight)/1.25;return new Promise((function(r,i){e.animate({r:n},t,mina.easeInOut,(function(){return r(e)}))}))}},{key:"fadeCircle",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return new Promise((function(n,r){e.animate({opacity:0},t,mina.linear,(function(){return n(e)}))}))}},{key:"storeCircle",value:function(e){this.circlesInCanvas.push(e)}},{key:"getSequentialRandomColor",value:function(){var e=this.hexColors[this.whichColorInSequence-1];return this.whichColorInSequence>=this.hexColors.length-1&&(this.hexColors=v(this.hexColors),this.whichColorInSequence=1),this.isEnoughOfCanvasCoveredByColor(e)?(this.whichColorInSequence+=1,this.hexColors[this.whichColorInSequence-1]):e}},{key:"getRandomViewportCoordinate",value:function(){var e=this.templateSvgEl.node.clientHeight,t=this.templateSvgEl.node.clientWidth;return[Math.floor(Math.random()*(t-0+1)+1),Math.floor(Math.random()*e+1)+1]}},{key:"generateCircles",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.getRandomViewportCoordinate.bind(this),r=0;r<t;r++){var i=e(u)(n(),2),o=i[0],a=i[1],s=this.generateID(),l=this.templateSvgEl.circle(o,a,1).attr({fill:this.getSequentialRandomColor(),id:s});this.storeCircle(l),this.animateCircle(l)}}}]),t}(),C=i("5kgyu");window.addEventListener("load",(function(){new g(Snap("#circleCanvas"),e(C)({luminosity:"light",count:10}))}))}();
//# sourceMappingURL=index.81033dfa.js.map