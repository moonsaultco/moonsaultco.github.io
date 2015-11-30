
// jQuery for page scrolling feature - requires jQuery Easing plugin
// from Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
// Code licensed under the Apache License v2.0.

$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});


// from https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
// http://jsfiddle.net/mariusc23/s6mLJ/31/

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();

$(window).scroll(function(event){
	didScroll = true;
});

setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);

function hasScrolled() {
	var st = $(this).scrollTop();

	// Make sure they scroll more than delta
	if(Math.abs(lastScrollTop - st) <= delta)
		return;

	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight){
		// Scroll Down
		$('nav').removeClass('nav-down').addClass('nav-up');
	} else {
		// Scroll Up
		if(st + $(window).height() < $(document).height()) {
			$('nav').removeClass('nav-up').addClass('nav-down');
		}
	}

	lastScrollTop = st;
}