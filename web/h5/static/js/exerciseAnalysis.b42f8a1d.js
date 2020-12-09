(window.webpackJsonp=window.webpackJsonp||[]).push([["exerciseAnalysis"],{"1fa4":function(t,e,s){"use strict";s.r(e),s("8e6e"),s("456d"),s("e7e5");var i=s("d399"),n=(s("c5f6"),s("6762"),s("2fdb"),s("ac6a"),s("bd86")),r=s("2f62"),a=s("faa5"),c=s("3ce7"),o=s("f5cc"),u=s("8ae7"),l=s("c8a5"),d=s("7c97");function h(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function p(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?h(Object(s),!0).forEach((function(e){Object(n.a)(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):h(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var f={name:"ExerciseAnalysis",filters:{type:function(t){switch(t){case"single_choice":return"单选题";case"choice":return"多选题";case"essay":return"问答题";case"uncertain_choice":return"不定项选择题";case"determine":return"判断题";case"fill":return"填空题";case"material":return"材料题"}}},components:{itemBank:o.a,OutFocusMask:d.a},mixins:[u.a,l.a],data:function(){return{result:null,items:{},info:[],isWrongMode:!1,allList:[],wrongList:[],wrongType:[],cardSeq:0,cardShow:!1,answer:{},slideIndex:0,canDo:!1}},computed:p({},Object(r.e)({isLoading:function(t){return t.isLoading},user:function(t){return t.user}})),mounted:function(){this.initReport(),this.setNavbarTitle(this.$route.query.title),this.getexerciseResult()},methods:p(p({},Object(r.d)({setNavbarTitle:a.u})),{},{initReport:function(){this.initReportData(this.$route.query.courseId,this.$route.query.taskId,"exercise")},getexerciseResult:function(){var t=this;c.a.exerciseResult({query:{exerciseId:this.$route.query.exerciseId,exerciseResultId:this.$route.query.exerciseResultId}}).then((function(e){t.result=e,t.setNavbarTitle(e.paperName),t.title=e.paperName,t.formatData(e)}))},formatData:function(t){var e=this;t.items.forEach((function(t){if("material"!=t.type){var s=e.analysisSixType(t.type,t);e.setData(s.item,s.answer)}"material"==t.type&&t.subs.forEach((function(t){var s=e.analysisSixType(t.type,t);e.setData(s.item,s.answer)}))}))},setData:function(t,e){if(this.$set(this.answer,t.id,e),this.info.push(t),this.allList.push(t),t.testResult&&"right"!==t.testResult.status||!t.testResult){var s=t.parentType?t.parentType:t.type;this.wrongType.includes(s)||this.wrongType.push(s),this.wrongList.push(t)}},formatStatus:function(t){if(t.testResult)switch(t.testResult.status){case"right":return"cicle-right";case"none":return"cicle-subjective";case"wrong":case"partRight":return"cicle-wrong";case"noAnswer":return""}},slideToNumber:function(t){var e=this,s=Number(t);this.isWrongMode?this.info.forEach((function(t,i){s===parseInt(t.seq)&&(e.cardSeq=i+1)})):this.cardSeq=s,this.cardShow=!1},showWrongList:function(){0!==this.wrongList.length?(Object(i.a)({message:"切换成功",duration:1e3}),this.isWrongMode=!this.isWrongMode,this.isWrongMode?(this.info=this.wrongList,this.cardSeq=this.isWrongItem()):(this.info=this.allList,this.cardSeq=parseInt(this.wrongList[this.slideIndex].seq)),this.slideIndex=this.cardSeq-1):Object(i.a)("当前没有错题")},isWrongItem:function(){var t=this.allList[this.slideIndex],e=1;return t.testResult&&"right"!==t.testResult.status&&this.wrongList.forEach((function(s,i){s.id==t.id&&(e=i+1)})),e}})},g=s("a6c2"),w=Object(g.a)(f,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"paper-swiper"},[s("out-focus-mask",{attrs:{type:t.outFocusMaskType,isShow:t.isShowOutFocusMask,reportType:t.reportType},on:{outFocusMask:t.outFocusMask}}),t.isLoading?s("e-loading"):t._e(),t.info.length>0?s("item-bank",{attrs:{"is-wrong-mode":t.isWrongMode,current:t.cardSeq,info:t.info,answer:t.answer,"slide-index":t.slideIndex,"can-do":t.canDo,all:t.allList.length,"is-exercise":!0},on:{"update:current":function(e){t.cardSeq=e},"update:slideIndex":function(e){t.slideIndex=e},"update:slide-index":function(e){t.slideIndex=e}}}):t._e(),s("div",{staticClass:"paper-footer"},[s("div",[s("span",{on:{click:function(e){t.cardShow=!0}}},[s("i",{staticClass:"iconfont icon-Questioncard"}),t._v("\n        题卡\n      ")])]),s("div",[s("span",{class:{"footer__div__span--active":t.isWrongMode},on:{click:t.showWrongList}},[s("i",{staticClass:"cuoti"},[s("img",{attrs:{src:t.isWrongMode?"static/images/cuoti-active.png":"static/images/cuoti.png",alt:""}})]),t._v("\n        错题\n      ")])])]),s("van-popup",{attrs:{position:"bottom"},model:{value:t.cardShow,callback:function(e){t.cardShow=e},expression:"cardShow"}},[t.info.length>0?s("div",{staticClass:"card"},[s("div",{staticClass:"card-title"},[s("div",[s("span",{staticClass:"card-right"},[t._v("正确")]),s("span",{staticClass:"card-wrong"},[t._v("错误")]),s("span",{staticClass:"card-nofinish"},[t._v("未作答")]),s("span",{staticClass:"card-subjective"},[t._v("主观题")])]),s("i",{staticClass:"iconfont icon-no",on:{click:function(e){t.cardShow=!1}}})]),s("div",{staticClass:"card-list"},[s("div",{staticClass:"card-homework-item"},[s("div",{staticClass:"card-item-list"},t._l(t.info,(function(e){return s("div",{key:e.id,class:["list-cicle",t.formatStatus(e)],on:{click:function(s){return t.slideToNumber(e.seq)}}},[t._v("\n              "+t._s(e.seq)+"\n            ")])})),0)])])]):t._e()])],1)}),[],!1,null,null,null);e.default=w.exports}}]);