$(function() {
	//! DOM
	// Header
	const topLine = $("header .top-line");
	const emptyTopLine = $("header .top-line-empty");
	const navMenu = $("header .nav-menu");
	const burgerBtn = $("header .burger-btn");
	const headerSlider = $("header .header-slider");

	// Recommended posts
	const postsSlider = $(".recommended-posts .posts-slider");
	const postsLeft = $(".recommended-posts .left-btn");
	const postsRight = $(".recommended-posts .right-btn");

	// Widget slider 
	const widgetSlider = $("aside .widget-slider");

	//* Grid of articles
	setGrid();

	$(window).on("scroll", function () {
		setGrid();
	});

	// Set grid
	function setGrid() {
		$(".grid").masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			horizontalOrder: true,
			percentPosition: true,
		});
	}

	//* Header
	// Fixed menu
	$(window).on("scroll", function () {
		if($(this).scrollTop() > topLine.height()) {
			topLine.addClass("fixed");
			emptyTopLine.addClass("active");
		} else {
			topLine.removeClass("fixed");
			emptyTopLine.removeClass("active");
		}
	});

	// Header menu
	burgerBtn.on("click", function(e) {
		e.stopPropagation();
		$(this).toggleClass("on");
		navMenu.slideToggle();
	});

	navMenu.on("click", function (e) {
		e.stopPropagation();
	});

	$(document.body).on("click", function () {
		burgerBtn.removeClass("on");
		// header
		navMenu.slideUp(150);
	});

	//! Sliders
	// Widget slider
	widgetSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		zIndex: 111,
		dots: false,
		arrows: true,
		draggable: true,
		prevArrow: "<div class='widget-slider-btn left'><i class='fas fa-long-arrow-alt-left'></i></div>",
		nextArrow: "<div class='widget-slider-btn right'><i class='fas fa-long-arrow-alt-right'></i></div>",
	});

	// Posts slider
	postsSlider.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		zIndex: 111,
		dots: false,
		arrows: false,
		draggable: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	postsLeft.on("click", function() {
		$(this).closest(".recommended-posts").find(".posts-slider").slick("slickPrev");
	});

	postsRight.on("click", function() {
		$(this).closest(".recommended-posts").find(".posts-slider").slick("slickNext");
	});

	// Header slider
	headerSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		zIndex: 111,
		dots: true,
		dotsClass: "slider-dots",
		verticalSwiping: true,
		arrows: false,
		vertical: true,
		draggable: false,
		swipe: false
	});

	$("header .header-slider .slider-dots").after("<nav class='slider-nav'><button class='item slide-left'><i class='fas fa-long-arrow-alt-left'></i></button><span class='item title'>Featured Article</span><button class='item slide-right'><i class='fas fa-long-arrow-alt-right'></i></button></nav>");

	const slideLeft = $("header .header-slider .slide-left");
	const slideRight = $("header .header-slider .slide-right");

	slideLeft.on("click", function() {
		$(this).closest(".slick-slider").slick("slickNext");
	});

	slideRight.on("click", function() {
		$(this).closest(".slick-slider").slick("slickPrev");
	});
});
