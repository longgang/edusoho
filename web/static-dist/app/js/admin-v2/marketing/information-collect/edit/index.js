!function(i){function e(e){for(var t,a,r=e[0],n=e[1],o=e[2],c=0,s=[];c<r.length;c++)a=r[c],Object.prototype.hasOwnProperty.call(d,a)&&d[a]&&s.push(d[a][0]),d[a]=0;for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(i[t]=n[t]);for(p&&p(e);s.length;)s.shift()();return u.push.apply(u,o||[]),l()}function l(){for(var e,t=0;t<u.length;t++){for(var a=u[t],r=!0,n=1;n<a.length;n++){var o=a[n];0!==d[o]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=a[0]))}return e}var a={},d={59:0},u=[];function c(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=i,c.c=a,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(a,r,function(e){return t[e]}.bind(null,r));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/static-dist/";var t=window.webpackJsonp=window.webpackJsonp||[],r=t.push.bind(t);t.push=e,t=t.slice();for(var n=0;n<t.length;n++)e(t[n]);var p=r;u.push([868,0]),l()}({14:function(e,t){e.exports=jQuery},547:function(e,t){$(".js-checkbox-group").length&&$(".js-checkbox-group").on("click",".js-location-type",function(e){var t=$(e.currentTarget).parent().find(".js-target-type-checkbox-group");t.hasClass("hidden")&&t.removeClass("hidden");var a=$(e.currentTarget).parents(".action-type-group").siblings(".action-type-group").find(".js-target-type-checkbox-group");a.hasClass("hidden")||a.addClass("hidden")})},868:function(e,t,a){"use strict";a.r(t);var r=a(18),n=a.n(r),o=a(4);a(94),a(547),a(391);$(".selected-form-item-list").sortable({distance:20}),$(".selected-form-item-list").on("click",".js-item-required",function(e){var t=$(e.currentTarget),a=$(t.data("targetLabel")),r=$(t.data("targetItem"));$(e.currentTarget).is(":checked")?(a.hasClass("control-label-required")||a.addClass("control-label-required"),r.data("required",!0)):(a.hasClass("control-label-required")&&a.removeClass("control-label-required"),r.data("required",!1))}),$(".js-selecte-form-items").on("click",".js-add-item-btn",function(e){var t=$($(e.currentTarget).data("targetItem")),a=$('input[name="items"]').val()?JSON.parse($('input[name="items"]').val()):[];a.push(t.data("code")),t.insertAfter($(".selected-form-item-list").children(".list-group-item:last-child")),t.hasClass("hidden")&&t.removeClass("hidden"),t.data("selected",!0),$(e.currentTarget).hasClass("disabled")||$(e.currentTarget).addClass("disabled"),$('input[name="items"]').val(n()(a))}),$(".selected-form-item-list").on("click",".js-delete-item-btn",function(e){var t=$($(e.currentTarget).data("targetItem")),a=$($(e.currentTarget).data("targetButton")),r=$('input[name="items"]').val()?JSON.parse($('input[name="items"]').val()):[];r.indexOf(t.data("code"))<0||r.splice(r.indexOf(t.data("code")),1),t.hasClass("hidden")||t.addClass("hidden"),t.data("selected",!1),a.hasClass("disabled")&&a.removeClass("disabled"),0<r.length?$('input[name="items"]').val(n()(r)):$('input[name="items"]').val(null)}),$.each($('input[name="action"]'),function(e,n){$.each($('input[name="targetTypes[]"]'),function(e,t){var a=$(n).val(),r=$(t).val();store.get("information_collect_"+a+"_"+r+"_ids",[])&&store.set("information_collect_"+a+"_"+r+"_ids",[]),store.get("information_collect_selected_"+a+"_"+r+"_ids",[])&&store.set("information_collect_selected_"+a+"_"+r+"_ids",[]),$('input[name="'+a+"_"+r+'_ids"]').val()&&(store.set("information_collect_"+a+"_"+r+"_ids",JSON.parse($('input[name="'+a+"_"+r+'_ids"]').val())),store.set("information_collect_selected_"+a+"_"+r+"_ids",JSON.parse($('input[name="'+a+"_"+r+'_ids"]').val())))})});var c=$("#information-collect-form"),s=c.validate({rules:{title:{required:!0,byte_maxlength:100},action:{required:!0},allowSkip:{required:!0},status:{required:!0},formTitle:{required:!0,byte_maxlength:30},selectedTargetTypes:{checkoutTargetTypes:!0},courseIds:{checkSelectedCourseIds:!0},classroomIds:{checkSelectedClassroomIds:!0},items:{required:!0}},messages:{items:{required:Translator.trans("admin_v2.information_collect.chooser.items.hint")}}});$.validator.addMethod("checkoutTargetTypes",function(e,t){if(void 0===$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").val())return!1;if("all"==$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").val()&&!$("[name='action']:checked").parents(".js-action-radio").find(".target-types-all:checked").length)return!1;if("part"==$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").val()&&!$("[name='action']:checked").parents(".js-action-radio").find(".target-types-part:checked").length)return!1;return!0},$.validator.format(Translator.trans("admin_v2.information_collect.chooser.target_hint"))),$.validator.addMethod("checkSelectedCourseIds",function(e,t){if("all"==$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").val())return!0;var a=$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").parents(".action-type-group").find(".target-course:checked");return!a.length||a.length&&0<store.get("information_collect_selected_"+$("[name='action']:checked").val()+"_course_ids").length},$.validator.format(Translator.trans("admin_v2.information_collect.chooser.target_course_hint"))),$.validator.addMethod("checkSelectedClassroomIds",function(e,t){if("all"==$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").val())return!0;var a=$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").parents(".action-type-group").find(".target-classroom:checked");return!a.length||a.length&&0<store.get("information_collect_selected_"+$("[name='action']:checked").val()+"_classroom_ids").length},$.validator.format(Translator.trans("admin_v2.information_collect.chooser.target_classroom_hint"))),$(".js-save-btn").on("click",function(t){s&&s.form()&&$.post(c.data("url"),function(){var a={};$.each(c.serializeArray(),function(e,t){"targetTypes[]"!=t.name&&(a[t.name]=t.value)}),"all"==$("[name='action']:checked").parents(".js-action-radio").find(".js-location-type:checked").val()?(a.targetTypes=[$(".js-checkbox-group .action-type-group-all").find(".target-course:checked").length?"course":null,$(".js-checkbox-group .action-type-group-all").find(".target-classroom:checked").length?"classroom":null],a.courseIds=n()(["0"]),a.classroomIds=n()(["0"])):(a.targetTypes=[$(".js-checkbox-group .action-type-group-part").find(".target-course:checked").length?"course":null,$(".js-checkbox-group .action-type-group-part").find(".target-classroom:checked").length?"classroom":null],a.courseIds=store.get("information_collect_selected_"+a.action+"_course_ids"),a.classroomIds=store.get("information_collect_selected_"+a.action+"_classroom_ids"));a.items=[];var r=1;return $.each($(".list-group-item"),function(e,t){$(t).data("selected")&&(a.items.push({code:$(t).data("code"),labelName:$(t).data("labelName"),required:$(t).data("required")?1:0,seq:r}),r++)}),a}()).success(function(e){Object(o.a)("success",Translator.trans("site.save_success_hint")),window.location.href=$(t.currentTarget).data("redirectUrl")}).fail(function(e,t,a){Object(o.a)("danger",e.responseJSON.error.message)})}),$('input[name="action"]').length&&$('input[name="action"]').on("click",function(e){var t=$(e.currentTarget).parents(".js-action-radio").find(".js-checkbox-group"),a=$(e.currentTarget).parents(".js-action-radio").siblings(".js-action-radio").find(".js-checkbox-group");t.hasClass("hidden")&&t.removeClass("hidden"),a.hasClass("hidden")||a.addClass("hidden"),"buy_after"==$(e.currentTarget).val()?($(".allow-skip-help-block").hasClass("hidden")&&$(".allow-skip-help-block").removeClass("hidden"),$('input[name="allowSkip"]').eq("0").prop("checked",!0),$('input[name="allowSkip"]').eq("1").prop("disabled",!0)):($(".allow-skip-help-block").hasClass("hidden")||$(".allow-skip-help-block").addClass("hidden"),$('input[name="allowSkip"]').eq("1").removeProp("disabled"),$('input[name="allowSkip"]').eq("1").prop("checked",!0))})}});