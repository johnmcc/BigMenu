BigMenu
=======

A menu system designed to emulate the functionality of http://www.bu.edu/. 

[Demo](http://media.360innovate.co.uk/demos/bigmenu/) and [blog post](http://www.360innovate.co.uk/blog/2011/08/dojo-drop-down-menus/)

Requires Dojo.

Usage
-----
If you download this as an archive, make sure you include Dojo. Download the full build of dojo and drop dojo-release-1.6.1 into the root folder. Change the path to Dojo in index.html. It should 'just work'!

    // assumes that it resides in /innovate, and that /innovate is in your djConfig = { modulePaths: { "innovate":"path/to/innovate" } };
    dojo.require('innovate.BigMenu');
    dojo.ready(function(){
        var bm = new innovate.BigMenu({ /* options */ }, dojo.byId('menu'));
    });
    
Alternatively, you can use the declarative syntax, if you like. Make sure you set parseOnLoad: true and modulePaths as before:

    var djConfig = {
        parseOnLoad: true,
        modulePaths: {
            "innovate":"../../" // points to root folder. Some jiggery-pokery for release purposes
        }
    }

Require BigMenu:

    dojo.require('innovate.BigMenu');

Add the dojoType and any other options to the UL. Using pre-HTML5 syntax:

    <ul dojoType="innovate.BigMenu" animInTime="1000" id="menu">

Or HTML5 sytanx:

    <ul data-dojo-type="innovate.BigMenu" data-dojo-props="animInTime:1000" id="menu">

Options and defaults
--------------------
    animInTime: 200,     // length of time to animate in
    animOutTime: 200,    // length of time to animate out
    hideDelay: 400,      // length of time that the user needs to mouseout before the hide animation starts
    showDelay: 150,      // length of time that the user needs to mouseover before the show animation starts
    easingIn: 'linear',  // easing for the show animation
    easingOut: 'linear', // easing for the hide animation

You can also connect to the animateIn and animateOut methods:

    dojo.connect(bm, 'animateIn', function(){ console.log('animate in'); });
