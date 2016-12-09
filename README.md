# jquery-scroll-point-navigator
A small(ish) jQuery plugin that detects defined scroll points on a page and navigates between them.

## Requirements

* jQuery (duh)
* Dirk Groenen's awesome [jQuery-viewport-checker](https://github.com/dirkgroenen/jQuery-viewport-checker)

Just `cd` into the plugin directory and run `bower install`
You do have [Bower](http://bower.io/) installed, right? It requires [Node and npm](https://nodejs.org/).

## Using it

Just call the function on document.ready and change some options if you want. Like this:

        $(document).ready(function(){
          $(this).scrollpointNav({
            //This determines what get's scrolled to
            //(must be a class name - default is 'scroll-point')
            
            scrollpointClass: 'custom-class',
            
            //This is what triggers the scrolling
            //(must be an object - default is $('#next-nav') - get's automagically added to the dom)
            
            $triggerObj: $('#custom-next'),
            
            //Offset from the top if you have a fixed header for navigation
            //(must be an object - default is $('#header-panel'))
            
            $scollOffset: $('#header-panel'),
            
            //The point at which the trigger brings you back to the top if the distance between the top
            //of the last scroll point and the bottom of the page is too short for the last scroll point
            //to actually reach the top of the page. Thats a lot of words.
            //(must be an object - default is $('#main-footer'))
            
            $scrollEnd: $('#main-footer')
          });
        });
