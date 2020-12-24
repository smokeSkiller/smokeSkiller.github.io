$(function() {

	// Custom JS
	var priceSlider = $('.price .price-slider');
	var partnersSlider = $('.partners .partners-slider');

	// Price slider
	priceSlider.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0px',
		arrows: true,
		prevArrow: '<button type="button" class="slide-to-left"><i class="fas fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slide-to-right"><i class="fas fa-angle-right"></i></button>', 
		responsive: [
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
				centerMode: false
			  }
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					fade: true,
				}
			}
		]
	});

	// Partners slider
	partnersSlider.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
		responsive: [
			{
			  breakpoint: 992,
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
	})
});
