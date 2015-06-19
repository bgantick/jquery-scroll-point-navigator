# jquery-scroll-point-navigator
A small(ish) jQuery plugin that detects defined scroll points on a page and navigates between them.

## Requirements

* jQuery (duh)
* Dirk Groenen's awesome [jQuery-viewport-checker](https://github.com/dirkgroenen/jQuery-viewport-checker)

Just `cd` into the plugin directory and run `bower install`
You do have [Bower](http://bower.io/) installed, right? It requires [Node and npm](https://nodejs.org/). Also, [Git](http://git-scm.com/).

## Using it

Just call the function on document.ready and change some options if you want. Like this:

        $(document).ready(function(){
          $(this).scrollpointNav({
            scrollpointClass: 'custom-class',
            $triggerObj: $('#custom-next'),
            $scollOffset: $('#header-panel'),
      			$scrollEnd: $('#main-footer')
          });
        });
