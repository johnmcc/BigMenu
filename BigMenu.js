/*
Copyright (c) 2011, John McCollum / Allan MacIver / 360innovate
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// change this to suit your needs
dojo.provide("innovate.BigMenu");

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dojo.fx.easing');

// change this to suit your needs
dojo.declare("innovate.BigMenu", [dijit._Widget, dijit._Templated], {
   // private
   _maxHeight: 0,
   _animObj: null,
   _submenuHidden: true,
   _origHeight: 0,
   _animOutTimer: null,
   _animInTimer:null,
   
   // public options
   animInTime: 200,     // length of time to animate in
   animOutTime: 200,    // length of time to animate out
   hideDelay: 400,      // length of time that the user needs to mouseout before the hide animation starts
   showDelay: 150,      // length of time that the user needs to mouseover before the show animation starts
   easingIn: 'linear',  // easing for the show animation
   easingOut: 'linear', // easing for the hide animation
   
   buildRendering: function(){
      this.domNode = this.srcNodeRef;
      // call this._attachTemplateNodes to parse the template,
      // which is actually just the srcnode
      this._attachTemplateNodes(this.domNode);
   },
   
   constructor: function(){
      this.inherited(arguments);
   },
   
   postCreate: function(){
      this.inherited(arguments);

      dojo.style(this.domNode, {"overflow": 'hidden', "cursor": "pointer"});
      
      dojo.query("ul", this.domNode).forEach(dojo.hitch(this, function(item, i){
         var menuHeight = dojo.position(item).h;
         this._maxHeight = menuHeight > this._maxHeight ? menuHeight:this._maxHeight;
      }));
      
      dojo.query("ul", this.domNode).forEach(dojo.hitch(this, function(item, i){ dojo.style(item, 'height', this._maxHeight + 'px'); }));
      
      this._origHeight = dojo.position(this.domNode).h;
      
      dojo.query('a', this.domNode).forEach(dojo.hitch(this, function(item, i){
         dojo.connect(item, 'onfocus', dojo.hitch(this, this._attachIn))
      }));
      
      dojo.query('a', this.domNode).forEach(dojo.hitch(this, function(item, i){
         dojo.connect(item, 'onblur', dojo.hitch(this, this._attachOut))
      }));
      
      dojo.connect(this.domNode, "onmouseenter", dojo.hitch(this, this._attachIn));
      dojo.connect(this.domNode, "onmouseleave", dojo.hitch(this, this._attachOut));
   },
   
   _attachIn: function(){
      clearTimeout(this._animOutTimer);
      this._animInTimer = setTimeout(dojo.hitch(this, function(){
        if(this._submenuHidden){
            this.animateIn(this.domNode);
         } 
      }),this.showDelay);
   },

   _attachOut: function(){
      clearTimeout(this._animInTimer);
      this._animOutTimer = setTimeout(dojo.hitch(this, function(){
         this.animateOut(this.domNode);
      }), this.hideDelay);
   },
   
   animateIn: function(menu){
      if(this._animObj != null){
         this._animObj.stop();
      }
      
      this._animObj = dojo.animateProperty({
         node: menu,
         duration: this.animInTime,
         easing: dojo.fx.easing[this.easingIn],
         properties: {
            height: {start: this._origHeight, end: this._maxHeight + this._origHeight + dojo.style(this.domNode, 'paddingTop')}
         },
         onEnd: dojo.hitch(this, function(){ this._submenuHidden = false; })
      }).play();
   },
   
   animateOut: function(menu){
      if(this._animObj != null){
         this._animObj.stop();
      }
      
      this._animObj = dojo.animateProperty({
         node: menu,
         duration: this.animOutTime,
         easing: dojo.fx.easing[this.easingOut],
         properties: {
            height: {start: dojo.position(menu).h, end: this._origHeight}
         },
         onEnd: dojo.hitch(this, function(){ this._submenuHidden = true; })
      }).play();
   }
});