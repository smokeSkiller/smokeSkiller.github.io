$(function() {
	//! DOM
	// Header
	const header = $('.header');
	const scrollToLink = $('.scroll-to-link');
	const topEmptySpace = $('.top-empty-space');
	const burgerBtn = $('.burger-btn');
	const headerNavCloseBtn = $('.header-nav__close-btn');
	const headerNav = $('.header-nav');
	const headerNavMobileBox = $('.header-nav-mobile-box');
	// Section a
	const snakeBlock = $('.section-a-snake-block');
	const verticalGallery = $('.vertical-gallery');
	const verticalGalleryWrapper = $('.vertical-gallery-wrapper');
	const verticalGalleryRows = $('.vertical-gallery-row');
	const verticalGalleryRowsLength = verticalGalleryRows.length;
	const verticalSlideItem = $('.vertical-gallery__item');
	// Section b
	const sectionBslider = $('.section-b-slider');
	// Section c
	const sectionClight = $('.section-c-tabs-content__item-light');
	// Section g
	const sectionGscroll = $('.section-g-scroll');
	const sectionGscrollWrapper = $('.section-g-scroll__wrapper');
	const sectionGrows = $('.section-g-scroll-row');
	const sectionGrowsCount = sectionGrows.length;
	// Reviews slider
	const reviewsSlider = $('.section-reviews-slider');
	// FAQ
	const faqItem = $('.section-faq-item');
	// Tabs
	const tab = $('.tab')
	const tabContent = $('.tab-content');
	// Modals&popup
	const openModalBtn = $('.open-modal-btn');
	const closeModalBtn = $('.modal-close-btn');
	const modalBox = $('.modal-box');
	const modalCardBox = $('.modal-card-box');
	const modal = $('.modal');
	// Tel field
	const telField = $('.tel-field');

	//! Yandex map
	ymaps.ready(init);
	function init() {
		// Создание карты.
		const myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			center: [55.729397, 37.734524],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 17,
			controls: []
		});

		const placemark = new ymaps.Placemark([55.729397, 37.734524], {
			balloonContent: "Рязанский проспект, 2к3, Москва, 109052"
		});

		myMap.geoObjects.add(placemark);
	}  

	//! Header&menu 
	// Fixed header
	$(window).on('scroll', function() {
		if($(this).scrollTop() >= 100) {
			header.addClass('fixed');
			topEmptySpace.show();
		} else {
			header.removeClass('fixed');
			topEmptySpace.hide();
		}
	});

	// Open menu
	burgerBtn.on('click', function() {
		headerNav.slideDown({
			start: function () {
				$(this).css({
					display: "flex"
				})
			}
		});
	});

	// Close menu
	headerNav.on('click', function() {
		if($(window).width() < 512) {
			headerNav.fadeOut();
		}
	});

	// Stop propagation Header Nav Mobile box
	headerNavMobileBox.on('click', function (e) {
		e.stopPropagation();
	});

	// Clicking to close button
	headerNavCloseBtn.on('click', function() {
		headerNav.fadeOut();
	});

	// Smooth scroll of menu links
	scrollToLink.on("click", (e)=> {
		e.stopPropagation();

		// Get attribute value of current link
		let currentLink = $(e.currentTarget).attr("href");
		// Slice id of the url
		let currentLinkId = currentLink.slice(currentLink.indexOf("#"), currentLink.length);

		$("html, body").animate({ scrollTop: $('' + currentLinkId + '').position().top - 25 }, "slow");
	});

	$('.header-nav-mobile-menu__item a').on('click', function() {
		headerNav.fadeOut();
	});

	//!  Modals&popup
	//* Open modal
	openModalBtn.on('click', function() {
		modal.fadeOut();

		const modalId = $(this).attr('target');
		$(`#${modalId}`).fadeIn();

		if($(`#${modalId}`).has('.modal-card-box').length) {
			$(`#${modalId}`).find('.modal-card-box-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				appendArrows: '.modal-card-box-slider-arrows',
				nextArrow: '<button type="button" class="slide-next slick-arrow"><i class="fa-solid fa-arrow-right"></i></button>',
				prevArrow: '<button type="button" class="slide-prev slick-arrow"><i class="fa-solid fa-arrow-left"></i></button>',
			});
		}
	});

	//* Close modal
	// Stop propagtion of modal boxes
	modalBox.add(modalCardBox).on('click', function(e) {
		e.stopPropagation();
	});

	// Modal
	modal.on('click', function() {
		$(this).fadeOut();

		// Unslick slider
		if($(this).has('.modal-card-box').length) {
			setTimeout(() => {
				$(this).find('.modal-card-box-slider').slick('unslick');
			}, 500);
		}
	});

	// Button
	closeModalBtn.on('click', function() {
		$(this).closest('.modal').fadeOut();

		// Unslick slider
		if($(this).closest('.modal').has('.modal-card-box').length) {
			setTimeout(() => {
				$(this).closest('.modal').find('.modal-card-box-slider').slick('unslick');
			}, 500);
		}
	});

	//* Tel mask
	telField.mask('+7 (999) 999-99-99');

	//! Tabs
	tab.on('click', function () {
		const tabTargetAttr = $(this).attr('tab-target');
		const tabTarget = $(`#${tabTargetAttr}`);

		if($(this).hasClass('active') == false) {
			// Add class to tab link
			$(this).parent().find('.tab').removeClass('active');
			$(this).addClass('active');

			// Remove active in all tab-content
			$(this).closest('.tabs').find('.tab-content').hide().removeClass('active');

			// Remove fade effect from section c
			if($(this).hasClass('section-c-tabs-tab')) {
				tabTarget.show().css('display', 'flex').addClass('active');
			} else {
				// Add active class to tab target
				tabTarget.fadeIn({
					start: function () {
						$(this).addClass('active');
						$(this).css('display', 'flex');
					}
				});
			}
		}

		// Hide blur effect
		if($(this).hasClass('blured') == true) {
			// $(this).removeClass('blured');
			tabTarget.removeClass('blured');
		}
	});
	
	//! Section a
	//* Vertical gallery
	// Assign height to vertical gallery
	if($(window).width() <= 992) {
		verticalGallery.height(verticalSlideItem.outerHeight() * 3 + 10);
	} else {
		verticalGallery.height(verticalSlideItem.outerHeight() * 2 + 15);
	}

	// Clone rows for infinite scrolling
	verticalGalleryWrapper.append(
		verticalGalleryRows.clone().each(function() {
			$(this).attr('data-row', verticalGalleryRows.length++);
		})
	);

	const verticalScrollSpeed = 50; // pixels per second
	const verticalRowHeight = verticalGalleryRows.outerHeight(true);
	let verticalScrollPosition = verticalGallery.outerHeight() / 2;
	let verticalLastTime = null;

	let activeZoomedRow = null;

	//! Scroll animation
	function startInfiniteScroll(lastTime, scrollPosition, scrollSpeed, rowHeight, rowsLength, boxToMove,enableZoom=false) {
		// Image zooming
		function getRandomImageFromRow(row) {
			const images = $(row).find('.vertical-gallery__item');
			return images[Math.floor(Math.random() * images.length)];
		}

		// New Row Appear
		function handleNewRowAppearing() {
			// Определяем текущую позицию прокрутки в рядах
			let currentRowIndex = Math.floor((-scrollPosition) / rowHeight) % verticalGalleryRows.length + 1;

			// Если это новый ряд (не тот, что был в прошлый раз)
			if (currentRowIndex !== activeZoomedRow) {
				// Убираем все zoom-эффекты
				$('.vertical-gallery__item').removeClass('zoomed');
				
				// Находим новый появляющийся ряд
				const rows = $('.vertical-gallery-row[data-row]');
				const newRow = rows.filter(`[data-row="${currentRowIndex}"]`)[0];
				
				if (newRow) {
					// Выбираем случайное изображение в этом ряду
					const randomImg = getRandomImageFromRow(newRow);
	
					$(randomImg).addClass('zoomed');
					
					// Устанавливаем текущий активный ряд
					activeZoomedRow = currentRowIndex;
				}
			}
		}

		function animateScroll(timestamp) {
			if (!lastTime) lastTime = timestamp;
			const deltaTime = timestamp - lastTime;
			lastTime = timestamp;
			
			// Рассчитываем новую позицию
			scrollPosition -= (scrollSpeed * deltaTime) / 1000;
			
			// Если прокрутили всю высоту оригинальных рядов - сбрасываем позицию
			if (scrollPosition <= -rowHeight * rowsLength) {
				scrollPosition = 0;
			}

			boxToMove.css('top', scrollPosition + 'px');

			if(enableZoom == true) {
				// Обрабатываем появление новых рядов
				handleNewRowAppearing();
			}
			

			requestAnimationFrame(animateScroll);
		}

		requestAnimationFrame(animateScroll);
	}

	startInfiniteScroll(verticalLastTime, verticalScrollPosition, verticalScrollSpeed, verticalRowHeight, verticalGalleryRowsLength, verticalGalleryWrapper, true);

	//* Snakes 
	let angles = [0, 100, 230];
	const speed = .7; // Speed (frame per second)

	function animateSnakes() {
		angles = angles.map(a => (a + speed) % 360);

		snakeBlock.each((i, el) => {
			$(el).css('--border-angle', `${angles[i]}deg`);
		});
		requestAnimationFrame(animateSnakes);
	}

	animateSnakes();

	//! Section b
	// Slider
	sectionBslider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		draggable: false,
		speed: 1200,
		fade: true,
		autoplay: true,
		swipe: false,
		autoplaySpeed: 4000,
		pauseOnHover: false,
		pauseOnFocus: false,
	}); 

	//! Section c
	$('.section-c-tabs-tab.light-on').on('click', function () {
		$(this).toggleClass('active');
		sectionClight.toggleClass('on');
	});

	//! Section g
	let isTriggered = false; 
	// Vertical scroll
	sectionGscroll.height($('.section-g-scroll-row__item').outerHeight() * 3 + 10);
	sectionGscrollWrapper.append(sectionGrows.clone());

	$(window).on('scroll', function() {
		if (isTriggered) return; // Если уже сработало, выходим

		const gPosition = sectionGscroll.offset().top; // Позиция блока
		const scrollPosition = $(window).scrollTop(); // Текущая прокрутка
		const windowHeight = $(window).height(); // Высота окна

		const gScrollSpeed = 55; // pixels per second
		const gRowHeight = $('.section-g-scroll-row').outerHeight(true);
		let gScrollPosition = 0;
		let gLastTime = null;

		if (scrollPosition + windowHeight > gPosition + sectionGscroll.outerHeight() / 1.25) {
			startInfiniteScroll(gLastTime, gScrollPosition, gScrollSpeed, gRowHeight, sectionGrowsCount, sectionGscrollWrapper);

			isTriggered = true;
		}
	});

	//! About section
	$(document).ready(function() {
		$('.section-about-video-item').magnificPopup({
			type: 'ajax', // Используем ajax вместо inline
			callbacks: {
				parseAjax: function(mfpResponse) {
					// Вставляем видео напрямую
					mfpResponse.data = `
					<div class="mfp-video-container">
						<video controls width="100%">
							<source src="${this.st.el.data('video')}" type="video/mp4">
						</video>
					</div>
					`;
				},
				ajaxContentAdded: function() {
					// Автовоспроизведение после загрузки
					const video = this.content.find('video')[0];
					if(video) {
						video.play().catch(e => {
							video.muted = true;
							video.play();
						});
					}
				}
			}
		});
	});

	//! Reviews slider
	reviewsSlider.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: false,
		appendArrows: '.section-reviews__arrows',
		nextArrow: '<button type="button" class="slide-next slick-arrow"><i class="fa-solid fa-arrow-right"></i></button>',
		prevArrow: '<button type="button" class="slide-prev slick-arrow"><i class="fa-solid fa-arrow-left"></i></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 512,
				settings: {
					slidesToShow: 1,
					variableWidth: true
				}
			},
		]
		// autoplay: true,
		// autoplaySpeed: 4000,
	});

	const players = Plyr.setup('.reviews-plyr', {
		toplay: false,   // Запрещает авто-воспроизведение
		controls: ['play'], // Оставляем только кнопку Play
	});

	//! FAQ
	faqItem.on('click', function() {
		$(this).find('.section-faq-item__value').slideToggle();
		$(this).toggleClass('opened');
	});

	//! Resize window
	$(window).on('resize', function () {
		if($(window).width() > 512) {
			headerNav.css('display', 'flex');
		}
	});

	// AOS
	AOS.init({
		once: true,
		duration: 600, // values from 0 to 3000, with step 50ms
		// disable: 'phone',
	});
});
