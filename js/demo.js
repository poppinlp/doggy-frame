var doggy={};$(document).ready(function(){doggy.dataApi={tab:[],dropdown:[],select:[],smoothscroll:[],dialog:[],placeholder:[],tooltip:[],checkbox:[],autohide:[],radio:[]},$("[data-uix]").each(function(){var a=$(this),b=a.data("params");doggy.dataApi[a.data("uix")].push({element:a,params:b})})}),doggy.throttle=function(a,b){var c=!0;return function(){var d=this,e=arguments;c&&(a.apply(d,e),c=!1,setTimeout(function(){c=!0},b))}},doggy.initLazyload=function(){function a(){var a=$(window).scrollTop(),c=$(window).height();b=b.filter(function(){var b=$(this);return b.offset().top<=a+c?(b.attr("src",b.data("src")),!1):!0}),0===b.length&&$(document).off("scroll")}var b=$(".lazy");$(window).scroll(doggy.throttle(a,50))},doggy.initTab=function(a,b){var c=$(a);if(c&&!c.data("init")){var d={selToggle:".tab__nav a",selSheet:".tab__sheet",currentClass:"current",effect:"show",trigger:"click"};$.extend(d,b);var e=c.find(d.selToggle),f=c.find(d.selSheet);e.bind(d.trigger,function(){var a=$(this);switch(e.removeClass(d.currentClass),a.addClass(d.currentClass),d.effect){case"fade":f.hide().removeClass("current"),f.eq(e.index(a)).addClass("current").fadeIn();break;case"slide":f.hide().removeClass("current"),f.eq(e.index(a)).addClass("current").slideDown();break;case"show":f.hide().removeClass("current"),f.eq(e.index(a)).addClass("current").show()}}),c.data("init",!0)}},$(document).ready(function(){for(var a=doggy.dataApi.tab,b=a.length;b--;)doggy.initTab(a[b].element,a[b].params)}),doggy.setCookie=function(a,b,c){var d=864e5,e=new Date,f=c?c:30;e.setTime(e.getTime()+f*d),document.cookie=a+"="+encodeURIComponent(b)+"; path=/; expires="+e.toGMTString()},doggy.getCookie=function(a){for(var b,c=document.cookie.split("; "),d=c.length;d--;)if(b=c[d].split("="),b[0]===a)return decodeURIComponent(b[1])},doggy.initDropdown=function(a,b){var c=$(a);if(c&&!c.data("init")){var d={selToggle:".dropdown__trigger",selContent:".dropdown__content",trigger:"click",effect:"show",offset:5,speed:"fast"};$.extend(d,b);var e=c.children(d.selToggle),f=c.children(d.selContent);f.width(e.outerWidth()-2).css("top",c.outerHeight()+d.offset),e.bind(d.trigger,function(a){switch(a.stopPropagation(),d.effect){case"slide":f.slideToggle(d.speed);break;case"fade":f.fadeToggle(d.speed);break;case"show":f.toggle()}}),c.data("init",!0)}},$(document).ready(function(){for(var a=doggy.dataApi.dropdown,b=a.length;b--;)doggy.initDropdown(a[b].element,a[b].params)}),doggy.initSelect=function(a,b){var c=$(a);if(c&&!c.data("init")){var d={selToggle:".select__trigger",selContent:".select__content",trigger:"click"};$.extend(d,b);var e=c.find(d.selToggle),f=c.find(d.selContent),g=e.children("p"),h=g.data("placeholder");g.html()||g.html(h),f.width(c.width()-2).css("top",c.height()),e.bind(d.trigger,function(a){a.stopPropagation(),f.toggle(),e.toggleClass("active")}),f.delegate("a","click",function(){g.html($(this).html()).data("val",$(this).data("val")),f.hide(),e.removeClass("active")}),c.data("init",!0)}},$(document).ready(function(){for(var a=doggy.dataApi.select,b=a.length;b--;)doggy.initSelect(a[b].element,a[b].params)}),doggy.initSmoothscroll=function(a,b){var c=$(a);if(c&&!c.data("init")){var d={selToggle:"a",easing:"swing",duration:300};$.extend(d,b),c.delegate(d.selToggle,"click",function(){var a=$(this).data("scroll"),b=doggy.ua.webkit?document.body:document.documentElement;a||(a=0),a=$.isNumeric(a)?a:$(a).offset().top,$(b).animate({scrollTop:a},{duration:d.duration,easing:d.easing})}),c.data("init",!0)}},$(document).ready(function(){for(var a=doggy.dataApi.smoothscroll,b=a.length;b--;)doggy.initSmoothscroll(a[b].element,a[b].params)}),doggy.initAutoHide=function(a,b){function c(){if("block"===d.css("display"))switch(e.effect){case"slide":d.slideUp(e.speed);break;case"fade":d.fadeOut(e.speed);break;case"show":d.hide()}}var d=$(a);if(d&&!d.data("init")){var e={trigger:"",effect:"show",speed:"fast"};$.extend(e,b),$.isNumeric(e.trigger)?d.on("autohide",function(){setTimeout(c,e.trigger)}):(e.trigger=$(e.trigger?e.trigger:window),e.trigger.on("click",function(){setTimeout(c,50)})),d.data("init")}},$(document).ready(function(){for(var a=doggy.dataApi.autohide,b=a.length;b--;)doggy.initAutoHide(a[b].element,a[b].params)}),doggy.initDialog=function(a,b){var c=$(a);c&&!c.data("init")&&""!==b.content&&(c.on("click",function(){var a=new doggy.Dialog;a.render(c,b),a.show()}),c.data("init",!0))},doggy.Dialog=function(){var a=this;if(a.ndDialog=$(".dialog"),!a.ndDialog.length){var b=$("body");a.ndDialog=$(['<div class="dialog">','<div class="mask"></div>','<div class="dialog__wrapper">','<p class="dialog__content"></p>','<a href="javascript:void(0)" class="J-close dialog__close">x</a>','<div class="dialog__button">','<a href="javascript:void(0)" class="btn J-yes">确定</a>','<a href="javascript:void(0)" class="btn btn--grey J-close">取消</a>',"</div>","</div>","</div>"].join("")),doggy.ua.ie6&&a.ndDialog.children(".mask").height(b.outerHeight()).width(b.outerWidth()),b.append(a.ndDialog),a.ndDialog.delegate(".J-close","click",function(){a.hide()})}},doggy.Dialog.prototype={constructor:doggy.Dialog,show:function(){this.ndDialog.addClass("dialog--active")},hide:function(){this.ndDialog.removeClass("dialog--active")},render:function(a,b){var c={type:"alert",content:"",modal:!0,position:"bl",autoHide:!1,color:"blue",callback:function(){}};$.extend(c,b);var d=this,e=d.ndDialog,f="dialog";if("confirm"===c.type&&(f+=" dialog--confirm",e.undelegate(".J-yes","click").delegate(".J-yes","click",function(){d.hide(),c.callback()})),e.find(".dialog__content").html(c.content),"red"===c.color&&(f+=" dialog--red"),c.modal){e.css("top","-100%").addClass("dialog--active");var g=e.children(".dialog__wrapper");g.css(doggy.ua.ie6?{top:$(window).scrollTop()+$(window).height()/2-g.outerHeight()/2,left:$(window).scrollLeft()+$(window).width()/2-g.outerWidth()/2}:{"margin-left":-g.outerWidth()/2,"margin-top":-g.outerHeight()/2}),e.removeClass("dialog--active").css("top","50%")}else f+=" dialog--modeless",doggy.initPosition({selSelf:e,selTarget:a,position:c.position});e.removeClass().addClass(f),c.autoHide&&setTimeout(function(){d.hide()},c.autoHide)}},doggy.Dialog.alert=function(a,b){var c=new doggy.Dialog;c.render("",{content:a,color:b}),c.show()},doggy.Dialog.confirm=function(a,b){var c=new doggy.Dialog;c.render("",{content:a,type:"confirm",callback:b}),c.show()},$(document).ready(function(){for(var a=doggy.dataApi.dialog,b=a.length;b--;)doggy.initDialog(a[b].element,a[b].params)}),doggy.initCheckbox=function(a,b){var c=$(a);if(c&&!c.data("init")){var d={label:""};if($.extend(d,b),c.on("click",function(){c.attr("checked")?c.removeClass("checkbox--active").removeAttr("checked"):c.addClass("checkbox--active").attr("checked","checked")}),d.label){var e=$(d.label);e.length&&e.css({cursor:"pointer","line-height":"20px","vertical-align":"middle"}).on("click",function(){c.trigger("click")})}c.data("init",!0)}},$(document).ready(function(){for(var a=doggy.dataApi.checkbox,b=a.length;b--;)doggy.initCheckbox(a[b].element,a[b].params)}),doggy.initRadio=function(a,b){var c=$(a);if(c&&!c.data("init")){var d={label:""};if($.extend(d,b),c.on("click",function(){var a=$(".radio[name="+$(this).attr("name")+"]");a.removeClass("radio--active").removeAttr("checked"),c.attr("checked")?c.removeClass("radio--active").removeAttr("checked"):c.addClass("radio--active").attr("checked","checked")}),d.label){var e=$(d.label);e.length&&e.css({cursor:"pointer","line-height":"20px","vertical-align":"middle"}).on("click",function(){c.trigger("click")})}c.data("init",!0)}},$(document).ready(function(){for(var a=doggy.dataApi.radio,b=a.length;b--;)doggy.initRadio(a[b].element,a[b].params)}),doggy.initTooltip=function(a,b){var c=$(a);if(c&&!c.data("init")){var d={position:"tc"};$.extend(d,b),c.on("mouseenter",function(){var a=new doggy.Tooltip;a.content(c.data("tooltip")),a.render(c,d.position),a.show()}).on("mouseleave",function(){var a=new doggy.Tooltip;a.hide()}).data("init",!0)}},doggy.Tooltip=function(){this.ndTooltip=$(".tooltip"),this.ndTooltip.length||(this.ndTooltip=$(['<span class="tooltip">','<span class="tooltip__content"></span>','<i class="tooltip__arrow"></i>','<i class="tooltip__arrow tooltip__arrow--mask"></i>',"</span>"].join("")),$("body").append(this.ndTooltip))},doggy.Tooltip.prototype={constructor:doggy.Tooltip,show:function(){this.ndTooltip.addClass("tooltip--active")},hide:function(){this.ndTooltip.removeClass("tooltip--active")},render:function(a,b){this.ndTooltip.removeClass().addClass("tooltip tooltip--"+b),doggy.initPosition({selSelf:this.ndTooltip,selTarget:a,position:b,offset:10})},content:function(a){this.ndTooltip.children(".tooltip__content").html(a)}},$(document).ready(function(){for(var a=doggy.dataApi.tooltip,b=a.length;b--;)doggy.initTooltip(a[b].element,a[b].params)}),doggy.initPosition=function(a){function b(){switch(c.position){case"tl":d.css({left:f.left,top:f.top-c.offset-i});break;case"tc":d.css({left:f.left+h/2-j/2,top:f.top-c.offset-i});break;case"tr":d.css({left:f.left+h-j,top:f.top-c.offset-i});break;case"rt":d.css({left:f.left+h+c.offset,top:f.top});break;case"rc":d.css({left:f.left+h+c.offset,top:f.top+g/2-i/2});break;case"rb":d.css({left:f.left+h+c.offset,top:f.top+g-i});break;case"br":d.css({left:f.left+h-j,top:f.top+g+c.offset});break;case"bc":d.css({left:f.left+h/2-j/2,top:f.top+g+c.offset});break;case"bl":d.css({left:f.left,top:f.top+g+c.offset});break;case"lb":d.css({left:f.left-j-c.offset,top:f.top+g-i});break;case"lc":d.css({left:f.left-j-c.offset,top:f.top+g/2-i/2});break;case"lt":d.css({left:f.left-j-c.offset,top:f.top})}}var c={selSelf:"",selTarget:"",position:"",offset:1};$.extend(c,a);var d=$(c.selSelf),e=$(c.selTarget);if(d&&e){var f=e.offset(),g=e.height(),h=e.width(),i=d.outerHeight(),j=d.outerWidth();b()}},doggy.initPlaceholder=function(a,b){if(!("placeholder"in document.createElement("input"))){var c=$(a);if(c&&!c.data("init")){var d={hide:"focus"};$.extend(d,b);var e,f=c.attr("placeholder"),g=!0;c.css("color","#999").val(f),"focus"===d.hide?c.on("focus",function(){c.val()===f&&c.css("color","#000").val("")}).on("blur",function(){""===c.val()&&c.css("color","#999").val(f)}):c.on("keyup",function(){e=c.val(),""===e?(c.css("color","#999").val(f),g=!0):g&&(c.css("color","#000").val(e.slice(f.length)),g=!1)}),c.data("init",!0)}}},$(document).ready(function(){for(var a=doggy.dataApi.placeholder,b=a.length;b--;)doggy.initPlaceholder(a[b].element,a[b].params)}),doggy.ua={webkit:-1!==navigator.userAgent.toLowerCase().indexOf("webkit"),msie:-1!==navigator.userAgent.toLowerCase().indexOf("msie"),ie6:-1!==navigator.userAgent.toLowerCase().indexOf("msie 6.0")};
//# sourceMappingURL=demo.map