// Array forEach
if (typeof NodeList.prototype.forEach !== 'function') {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
// Array from
if (!Array.from) {
  Array.from=function(){function h(r){return"function"==typeof r||"[object Function]"===t.call(r)}function l(r){var t,n=(t=Number(r),isNaN(t)?0:0!==t&&isFinite(t)?(0<t?1:-1)*Math.floor(Math.abs(t)):t);return Math.min(Math.max(n,0),e)}var t=Object.prototype.toString,e=Math.pow(2,53)-1;return function(r,t,n){var e=Object(r);if(null==r)throw new TypeError("Array.from requires an array-like object - not null or undefined");var o,i=1<arguments.length?t:void 0;if(void 0!==i){if(!h(i))throw new TypeError("Array.from: when provided, the second argument must be a function");2<arguments.length&&(o=n)}for(var a,u=l(e.length),f=h(this)?Object(new this(u)):new Array(u),c=0;c<u;)a=e[c],f[c]=i?void 0===o?i(a,c):i.call(o,a,c):a,c+=1;return f.length=u,f}}();
}
// Node closest
if (!Element.prototype.closest) {
  Element.prototype.closest=function(t){for(var e=this;e;){if(e.matches(t))return e;e=e.parentElement}return null};
}
// Node matches
if (!Element.prototype.matches) {
  Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector;
}