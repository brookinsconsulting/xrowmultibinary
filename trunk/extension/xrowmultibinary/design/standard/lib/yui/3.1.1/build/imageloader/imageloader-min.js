/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.1
build: 47
*/
YUI.add("imageloader",function(B){B.ImgLoadGroup=function(){this._init();B.ImgLoadGroup.superclass.constructor.apply(this,arguments);};B.ImgLoadGroup.NAME="imgLoadGroup";B.ImgLoadGroup.ATTRS={name:{value:""},timeLimit:{value:null},foldDistance:{validator:B.Lang.isNumber,setter:function(D){this._setFoldTriggers();return D;},lazyAdd:false},className:{value:null,setter:function(D){this._className=D;return D;},lazyAdd:false}};var C={_init:function(){this._triggers=[];this._imgObjs={};this._timeout=null;this._classImageEls=null;this._className=null;this._areFoldTriggersSet=false;this._maxKnownHLimit=0;B.on("domready",this._onloadTasks,this);},addTrigger:function(F,E){if(!F||!E){return this;}var D=function(){this.fetch();};this._triggers.push(B.on(E,D,F,this));return this;},addCustomTrigger:function(D,F){if(!D){return this;}var E=function(){this.fetch();};if(B.Lang.isUndefined(F)){this._triggers.push(B.on(D,E,this));}else{this._triggers.push(F.on(D,E,this));}return this;},_setFoldTriggers:function(){if(this._areFoldTriggersSet){return;}var D=function(){this._foldCheck();};this._triggers.push(B.on("scroll",D,window,this));this._triggers.push(B.on("resize",D,window,this));this._areFoldTriggersSet=true;},_onloadTasks:function(){var D=this.get("timeLimit");if(D&&D>0){this._timeout=setTimeout(this._getFetchTimeout(),D*1000);}if(!B.Lang.isUndefined(this.get("foldDistance"))){this._foldCheck();}},_getFetchTimeout:function(){var D=this;return function(){D.fetch();};},registerImage:function(){var D=arguments[0].domId;if(!D){return null;}this._imgObjs[D]=new B.ImgLoadImgObj(arguments[0]);return this._imgObjs[D];},fetch:function(){this._clearTriggers();this._fetchByClass();for(var D in this._imgObjs){if(this._imgObjs.hasOwnProperty(D)){this._imgObjs[D].fetch();}}},_clearTriggers:function(){clearTimeout(this._timeout);for(var E=0,D=this._triggers.length;E<D;E++){this._triggers[E].detach();}},_foldCheck:function(){var I=true,J=B.DOM.viewportRegion(),H=J.bottom+this.get("foldDistance"),K,E,G,F,D;if(H<=this._maxKnownHLimit){return;}this._maxKnownHLimit=H;for(K in this._imgObjs){if(this._imgObjs.hasOwnProperty(K)){E=this._imgObjs[K].fetch(H);I=I&&E;}}if(this._className){if(this._classImageEls===null){this._classImageEls=[];G=B.all("."+this._className);G.each(function(L){this._classImageEls.push({el:L,y:L.getY(),fetched:false});},this);}G=this._classImageEls;for(F=0,D=G.length;F<D;F++){if(G[F].fetched){continue;}if(G[F].y&&G[F].y<=H){G[F].el.removeClass(this._className);G[F].fetched=true;}else{I=false;}}}if(I){this._clearTriggers();}},_fetchByClass:function(){if(!this._className){return;}B.all("."+this._className).removeClass(this._className);}};B.extend(B.ImgLoadGroup,B.Base,C);B.ImgLoadImgObj=function(){B.ImgLoadImgObj.superclass.constructor.apply(this,arguments);this._init();};B.ImgLoadImgObj.NAME="imgLoadImgObj";B.ImgLoadImgObj.ATTRS={domId:{value:null,writeOnce:true},bgUrl:{value:null},srcUrl:{value:null},width:{value:null},height:{value:null},setVisible:{value:false},isPng:{value:false},sizingMethod:{value:"scale"},enabled:{value:"true"}};var A={_init:function(){this._fetched=false;this._imgEl=null;this._yPos=null;},fetch:function(F){if(this._fetched){return true;}var D=this._getImgEl(),E;if(!D){return false;}if(F){E=this._getYPos();if(!E||E>F){return false;}}if(this.get("bgUrl")!==null){if(this.get("isPng")&&B.UA.ie&&B.UA.ie<=6){D.setStyle("filter",'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.get("bgUrl")+'", sizingMethod="'+this.get("sizingMethod")+'", enabled="'+this.get("enabled")+'")');}else{D.setStyle("backgroundImage","url('"+this.get("bgUrl")+"')");}}else{if(this.get("srcUrl")!==null){D.setAttribute("src",this.get("srcUrl"));}}if(this.get("setVisible")){D.setStyle("visibility","visible");}if(this.get("width")){D.setAttribute("width",this.get("width"));}if(this.get("height")){D.setAttribute("height",this.get("height"));}this._fetched=true;return true;},_getImgEl:function(){if(this._imgEl===null){this._imgEl=B.one("#"+this.get("domId"));}return this._imgEl;},_getYPos:function(){if(this._yPos===null){this._yPos=this._getImgEl().getY();}return this._yPos;}};B.extend(B.ImgLoadImgObj,B.Base,A);},"3.1.1",{requires:["base-base","node-style","node-screen"]});