/**
 * @author Alex Bruno Cáceres
 * @email git.alexbr@outlook.com
 * @date 2016-07-16 09:26:19
 * @desc Simple JS module to parse/serialize HTTP query/params, useful for Fetch API or AJAX requests
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.params = factory());
}(this, (function () { 'use strict';

  function params(a){return {get value(){return a},serialize(a,b){const{value:c}=this,d=Object.keys(a||c),e=d.map(a=>{const d=b?`${b}['${a}']`:a,e=b?b.replace(/\[\'/g,".").replace(/\'\]/g,""):a,f=b?`${e}.${a}`:a,g=f.split(".").reduce((b,a)=>b[a],c),h=g instanceof Object;return h?this.serialize(g,d):[d,g].join("=")});return e.join("&").replace(/\'/g,"")},parse(){const a={},{value:b}=this,c=b.startsWith("?")?b.substr(1):b,d=c.replace(/(;+|&+)/g,"&").split("&");return d.forEach(b=>{let[c,d]=b.split("=").map(decodeURIComponent);if(!c)return 0;if(d=d?isNaN(d)?d:new Number(d).valueOf():null,!c.includes("["))return a[c]=a.hasOwnProperty(c)?Array.isArray(a[c])?a[c].push(d):[a[c],d]:d;let[e,f]=c.split("["),g=f?f.replace("]",""):0,h=!isNaN(g),i=g?h?parseInt(g):g:0;return a[e]=a.hasOwnProperty(e)?a[e]:h?[]:{},i?a[e][i]=d:a[e].push(d)}),a},form(){let{value:a}=this;if("undefined"==typeof FormData)return console.error("FormData not supported");if(a instanceof FormData)return a;if("undefined"!=typeof HTMLFormElement&&a instanceof HTMLFormElement)return new FormData(a);"string"==typeof a&&(a=this.parse());const b=new FormData;try{Object.keys(a).forEach(c=>{b.append(c,a[c]);});}catch(a){console.error(a.message);}return b}}}

  return params;

})));
