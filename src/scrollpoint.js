(function($){

/*
	jQuery Viewport Checker
	Version 1.7.4
	The MIT License (MIT)
	Copyright (c) 2014 Dirk Groenen
	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
*/
$.fn.viewportChecker = function(useroptions){
		// Define options and extend with user
		var options = {
				classToAdd: 'visible',
				classToRemove : 'invisible',
				offset: 100,
				repeat: false,
				invertBottomOffset: true,
				callbackFunction: function(elem, action){},
				scrollHorizontal: false
		};
		$.extend(options, useroptions);

		// Cache the given element and height of the browser
		var $elem = this,
				windowSize = {height: $(window).height(), width: $(window).width()},
				scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') !== -1) ? 'body' : 'html');

		/*
		* Main method that checks the elements and adds or removes the class(es)
		*/
		this.checkElements = function(){
				var viewportStart, viewportEnd;

				// Set some vars to check with
				if(!options.scrollHorizontal){
						viewportStart = $(scrollElem).scrollTop();
						viewportEnd = (viewportStart + windowSize.height);
				}
				else{
						viewportStart = $(scrollElem).scrollLeft();
						viewportEnd = (viewportStart + windowSize.width);
				}

				// Loop through all given dom elements
				$elem.each(function(){
						var $obj = $(this),
								objOptions = {},
								attrOptions = {};

						//  Get any individual attribution data
						if ($obj.data('vp-add-class')) {
							attrOptions.classToAdd = $obj.data('vp-add-class');
						}

						if ($obj.data('vp-remove-class')) {
							attrOptions.classToRemove = $obj.data('vp-remove-class');
						}

						if ($obj.data('vp-offset')) {
							attrOptions.offset = $obj.data('vp-offset');
						}

						if ($obj.data('vp-repeat')) {
							attrOptions.repeat = $obj.data('vp-repeat');
						}

						if ($obj.data('vp-scrollHorizontal')) {
							attrOptions.scrollHorizontal = $obj.data('vp-scrollHorizontal');
						}

						if ($obj.data('vp-invertBottomOffset')) {
							attrOptions.scrollHorizontal = $obj.data('vp-invertBottomOffset');
						}


						// Extend objOptions with data attributes and default options
						$.extend(objOptions, options);
						$.extend(objOptions, attrOptions);

						// If class already exists; quit
						if ($obj.hasClass(objOptions.classToAdd) && !objOptions.repeat){
								return;
						}

						// define the top position of the element and include the offset which makes is appear earlier or later
						var elemStart = (!objOptions.scrollHorizontal) ? Math.round( $obj.offset().top ) + objOptions.offset : Math.round( $obj.offset().left ) + objOptions.offset,
								elemEnd = (!objOptions.scrollHorizontal) ? elemStart + $obj.height() : elemStart + $obj.width();

						if(objOptions.invertBottomOffset) {
							elemEnd -= (objOptions.offset * 2);
						}


						// Add class if in viewport
						if ((elemStart < viewportEnd) && (elemEnd > viewportStart)) {

								// remove class
								$obj.removeClass(objOptions.classToRemove);

								$obj.addClass(objOptions.classToAdd);

								// Do the callback function. Callback wil send the jQuery object as parameter
								objOptions.callbackFunction($obj, "add");

						// Remove class if not in viewport and repeat is true
						} else if ($obj.hasClass(objOptions.classToAdd) && (objOptions.repeat)) {
								$obj.removeClass(objOptions.classToAdd);

								// Do the callback function.
								objOptions.callbackFunction($obj, "remove");
						}
				});

		};

		// Run checkelements on load and scroll
		$(window).bind("load scroll touchmove MSPointerMove", this.checkElements);

		// On resize change the height var
		$(window).resize(function(e){
				windowSize = {height: $(window).height(), width: $(window).width()},
				$elem.checkElements();
		});

		// trigger inital check if elements already visible
		this.checkElements();

		// Default jquery plugin behaviour
		return this;
};//End viewport checker

$.elevator = {

  init : function(){

		//Add the scroll 'button' to the DOM
    $('body').append('<div id="next-nav">');

  },

	checkPoints : function(){

		//Find the total # of scroll points
		var total = $('.scroll-point').length;

		//go through each scroll point and add a class to the last one
		$('.scroll-point').each(function(i){

			if ( i === total - 1 ) {
				$(this).addClass('last-point');
				return false;
			}

		}); // end each

	},

	checkScroll : function(){

		//This checks the scroll position and changes the toggle state of the button
		$(document).on('scroll', function(){

			var lastPoint = $('.last-point').offset().top;
			var docTop = $(document).scrollTop() + $('#header-panel').outerHeight();

			if ( docTop >= lastPoint ) {

				$('#next-nav').addClass('to-top');

			} else {

				$('#next-nav').removeClass('to-top');

			}

		});

	},

  nextClick : function(){

		//Button action - this is where the magic happens

		var anchors = $('.scroll-point');
		var next_anchor = $(anchors[0]);

		$('#next-nav').on('click', function(e){

			//if we're on or past the last point, scroll to the top
			if ( $(this).hasClass('to-top') ) {

				e.preventDefault();
				$('body,html').animate({scrollTop: 0});

				//reset next_anchor
				next_anchor = $(anchors[0]);

			//otherwise..
			} else {

				e.preventDefault();
				var headHeight = $('#header-panel').outerHeight();

					$('.scroll-point').each(function(i){

						//add a 'current' class the the scrollpoint that's in the viewport when the next button is clicked
						$(this).viewportChecker({
							classToAdd: 'current',
							repeat: true,
							scrollHorizontal: false,
							offset: headHeight
						});

						//find the next scroll point
						if ( $(this).hasClass('current') ){
							next_anchor = $(anchors[i + 1]);
							return false;
						}


					}); // end each

				//scroll to the next scroll point
				$('body,html').animate({scrollTop: next_anchor.offset().top - headHeight + 1});

			}

		});
	}

};

  $(document).ready(function(){

    if ( $('.scroll-point').length ){
  		$.elevator.init();
  		$.elevator.checkPoints();
  		$.elevator.checkScroll();
  		$.elevator.nextClick();
  	}

  });


})(jQuery);
