(function($){

$.fn.elevator = function(useroptions){

	// Define options and extend with user
	var options = {
			scrollpointClass: 'scroll-point'
	};
	$.extend(options, useroptions);

	//Add the scroll 'button' to the DOM
	$('body').append('<div id="next-nav">');

	this.checkPoints = function(){

		//Find the total # of scroll points
		var total = $('.'+options.scrollpointClass).length;

		//go through each scroll point and add a class to the last one
		$('.'+options.scrollpointClass).each(function(i){

			if ( i === total - 1 ) {
				$(this).addClass('last-point');
				return false;
			}

		}); // end each

	};

	this.checkScroll = function(){

		//This checks the scroll position and changes the toggle state of the button
		$(document).on('scroll', function(){

			var lastPoint = $('.last-point').offset().top;
			//This var is for measuring the height of any kind of fixed element
			//(#header-panel in this case) at the top of the page and adding it to the scroll offset
			var docTop = $(document).scrollTop() + $('#header-panel').outerHeight();
			var scrollBottom = $(window).scrollTop() + $(window).height();
			var fooTop = $('#main-footer').offset().top;

			//If we're at the last point (or footer is at bottom) - make next-nav click go to top
			if ( docTop >= lastPoint || scrollBottom >= fooTop ) {

				$('#next-nav').addClass('to-top');

			} else {

				$('#next-nav').removeClass('to-top');

			}

		});

	};

	this.nextClick = function(){

		//Button action - this is where the button things happen

		var anchors = $('.'+options.scrollpointClass);
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

					$('.'+options.scrollpointClass).each(function(i){

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
	};

	this.checkPoints();
	this.checkScroll();
	this.nextClick();

	// Default jquery plugin behaviour
	return this;

};

})(jQuery);
