$(function() {
	//! DOM
	// Sidebar & header
	const burgerBtn = $('.burger-btn');
	const fixedColumn = $('.fixed-column');
	const fixedEmptyBg = $('.fixed-empty-bg');
	const closeSidebarBtn = $('.sidebar__close-btn');
	// Accordion
	const accordionToggle = $('.accordion .accordion__toggle');
	// Modal
	const modal = $('.modal');
	const closeFormBtn = $('.contact-form__close-btn');
	const openFormBtn = $('.open-contact-form-btn');
	const contactForm = $('.contact-form');
	// Product slider
	const largeSlider = $('.product-large-slider');
	const smallSlider = $('.product-small-slider');
	// Reviews slider
	const reviewSlider = $('.reviews-slider');
	// Reviews form
	const reviewsForm = $('.reviews-form');
	const closeReviewsFormBtn = $('.reviews-form__close-btn');
	const openReviewsFormBtn = $('#open-reviews-form-btn');
	// Bottom navigation
	const bottomNav = $('.bottom-nav');
	const scrollTopBtn = $('#scrollTop');

	//! Bottom navigation
	// Показать кнопку при прокрутке
    $(window).scroll(function() {
        if ($(this).scrollTop() > $(document).height() * 0.6 && $(window).width() <= 576) {
            scrollTopBtn.addClass('active');
        } else {
            scrollTopBtn.removeClass('active');
        }
    });

	// Прокрутка вверх при клике на кнопку
    scrollTopBtn.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    // Прокрутка вверх при клике на кнопку
    $('#scrollTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

	//! Reviews form
	openReviewsFormBtn.on('click', function() {
		reviewsForm.slideDown();
	});

	closeReviewsFormBtn.on('click', function(e) {
		reviewsForm.slideUp();
	});

	//! Reviews slider
	reviewSlider.slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		appendArrows: '.reviews-slider-nav',
		prevArrow: '<button class="reviews-slider-nav__btn"><i class="fa-light fa-arrow-left-long"></i></button>',
		nextArrow: '<button class="reviews-slider-nav__btn"><i class="fa-light fa-arrow-right-long"></i></button>',
		dots: true,
		dotsClass: 'reviews-slider__dots slick-dots',
		autoplay: true,
		autoplaySpeed: 3000,

		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});

	//! Product slider
	largeSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="button button-circle product-large-slider__prev-btn"><i class="fa-regular fa-arrow-left-long"></i></button>',
		nextArrow: '<button class="button button-circle product-large-slider__next-btn"><i class="fa-regular fa-arrow-right-long"></i></button>',
		asNavFor: '.product-small-slider'
	});

	smallSlider.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.product-large-slider',
		focusOnSelect: true
	});

	//! Modal contact form
	contactForm.on('click', function(e) {
		e.stopPropagation();
	});

	modal.on('click', function() {
		modal.removeClass('opened');
	});

	openFormBtn.on('click', function() {
		modal.addClass('opened');
	});

	closeFormBtn.on('click', function() {
		modal.removeClass('opened');
	});

	//! Open menu for mobile
	burgerBtn.on('click', function() {
		fixedColumn.animate({
			right: 0
		});

		fixedEmptyBg.show();
	});

	fixedEmptyBg.on('click', function() {
		closeSidebar();
	});

	closeSidebarBtn.on('click', function() {
		closeSidebar();
	});

	function closeSidebar() {
		fixedColumn.css('right', '-100%');
		fixedEmptyBg.hide();
	}

	//! Accordion
	accordionToggle.on('click', function(e) {
		e.preventDefault();
		
		$(this).toggleClass('accordion__icon-collapsed');
		$(this).closest('.accordion').find('.accordion-content').slideToggle();

		if($(this).parent().hasClass('accordion__toggle')) {
			e.stopPropagation();
		}
	});
});
