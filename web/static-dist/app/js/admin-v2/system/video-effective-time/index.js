!function(l){function e(e){for(var t,n,i=e[0],r=e[1],a=e[2],o=0,s=[];o<i.length;o++)n=i[o],Object.prototype.hasOwnProperty.call(u,n)&&u[n]&&s.push(u[n][0]),u[n]=0;for(t in r)Object.prototype.hasOwnProperty.call(r,t)&&(l[t]=r[t]);for(f&&f(e);s.length;)s.shift()();return p.push.apply(p,a||[]),c()}function c(){for(var e,t=0;t<p.length;t++){for(var n=p[t],i=!0,r=1;r<n.length;r++){var a=n[r];0!==u[a]&&(i=!1)}i&&(p.splice(t--,1),e=o(o.s=n[0]))}return e}var n={},u={80:0},p=[];function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=l,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/static-dist/";var t=window.webpackJsonp=window.webpackJsonp||[],i=t.push.bind(t);t.push=e,t=t.slice();for(var r=0;r<t.length;r++)e(t[r]);var f=i;p.push([569,0]),c()}({14:function(e,t){e.exports=jQuery},569:function(e,t,n){"use strict";n.r(t);var i=n(4),r=$("#video-effective-time-form");$(".js-setting-submit").click(function(){cd.confirm({content:'<div style="text-align:center;">'+Translator.trans("admin_v2.video_effective_time_setting.cancel.hint")+"</div>",okText:Translator.trans("site.confirm"),cancelText:Translator.trans("site.cancel"),className:""}).on("ok",function(){$.post(r.data("url"),r.serialize()).success(function(e){Object(i.a)("success",Translator.trans("site.save_success_hint"))}).fail(function(e,t,n){Object(i.a)("danger",e.responseJSON.error.message)})}).on("cancel",function(){})}),$('input:radio[name="play_rule"]').click(function(){"auto_pause"==$('input:radio[name="play_rule"]:checked').val()?$(".js-play-role-help").html(Translator.trans("admin_v2.video_effective_time_setting.play_rule.auto_pause.help_block")):$(".js-play-role-help").html(Translator.trans("admin_v2.video_effective_time_setting.play_rule.no_action.help_block"))}),$('input:radio[name="statistical_dimension"]').click(function(){"playing"==$('input:radio[name="statistical_dimension"]:checked').val()?$(".js-statistical-dimension-help").html(Translator.trans("admin_v2.video_effective_time_setting.statistical_dimension.playing.help_block")):$(".js-statistical-dimension-help").html(Translator.trans("admin_v2.video_effective_time_setting.statistical_dimension.page.help_block"))})}});