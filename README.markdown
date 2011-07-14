BigMenu
=======

A menu system designed to emulate the functionality of http://www.bu.edu/.

Requires Dojo.

Usage
-----
If you download this as an archive, make sure you include Dojo. Download the full build of dojo and drop dojo-release-1.6.1 into the root folder. It should 'just work'!

    // assumes that it resides in /innovate, and that /innovate is in your djConfig = { modulePaths: { "innovate":"path/to/innovate" } };
    dojo.require('innovate.BigMenu');
    dojo.ready(function(){
        var bm = new innovate.BigMenu({ /* options */ }, dojo.byId('menu'));
    });

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