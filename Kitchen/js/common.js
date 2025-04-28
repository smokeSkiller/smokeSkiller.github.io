$(function() {
	//! DOM
	// Header
	const header = $('.header');
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
	// const verticalSlide = $('.vertical-gallery-row:not(.slick-cloned)');
	// Section b
	const sectionBslider = $('.section-b-slider');
	// Section c
	const sectionCnavTabs = $('.section-c-tabs-tab');
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

	//!  Modals&popup
	//* Open modal
	openModalBtn.on('click', function() {
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
		const tabTarget = $(this).attr('tab-target');

		if($(this).hasClass('active') == false) {
			// Add class to tab link
			$(this).parent().find('.tab').removeClass('active');
			$(this).addClass('active');

			// Remove active in all tab-content
			$(this).closest('.tabs').find('.tab-content').hide().removeClass('active');

			// Add active class to tab target
			$(`#${tabTarget}`).fadeIn({
				start: function () {
					$(this).addClass('active');
					$(this).css('display', 'flex');
				}
			});
		}

		// Hide blur effect
		if($(this).hasClass('blured') == true) {
			$(this).removeClass('blured');
			$(`#${tabTarget}`).removeClass('blured');
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
	const rowHeight = verticalGalleryRows.outerHeight(true);
	let scrollPosition = verticalGallery.outerHeight() / 2;
	let lastTime = null;

	let activeZoomedRow = null;

	function getRandomImageFromRow(row) {
		const images = $(row).find('.vertical-gallery__item');
		return images[Math.floor(Math.random() * images.length)];
	}
	
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

	// Scroll
	function animateScroll(timestamp) {
		if (!lastTime) lastTime = timestamp;
		const deltaTime = timestamp - lastTime;
		lastTime = timestamp;
		
		// Рассчитываем новую позицию
		scrollPosition -= (verticalScrollSpeed * deltaTime) / 1000;
		
		// Если прокрутили всю высоту оригинальных рядов - сбрасываем позицию
		if (scrollPosition <= -rowHeight * verticalGalleryRowsLength) {
			scrollPosition = 0;
		}
		
		verticalGalleryWrapper.css('top', scrollPosition + 'px');

		// Обрабатываем появление новых рядов
		handleNewRowAppearing();
		
		requestAnimationFrame(animateScroll);
	}
	
	// Запускаем анимацию
	requestAnimationFrame(animateScroll);

	// Old code
	// verticalGallery.slick({
	// 	slidesToShow: 2,
	// 	slidesToScroll: 1,
	// 	infinite: true,
	// 	vertical: true,
	// 	draggable: false,
	// 	speed: 600,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1200,
	// 			settings: {
	// 			slidesToShow: 3,
	// 			}
	// 		},
	// 		]
	// }); 

	// // Transition&scaling
	// let verticalSlidesCount = verticalSlide.length;
	// let rowIndex = 0;
	// let itemIndex = -1;

	// setInterval(function () {
	// 	verticalSlide.removeClass('top-active');
	// 	verticalSlide.removeClass('bottom-active');
	// 	$('.vertical-gallery__item').removeClass('active');

	// 	// Increase item index
	// 	itemIndex++;

	// 	// Increase row index
	// 	if(itemIndex === 3) {
	// 		itemIndex = 0;
	// 		rowIndex++;

	// 		if(rowIndex > verticalSlidesCount) {
	// 			rowIndex = 1;
	// 		}
	// 	}

	// 	// Slide next
	// 	if($(`.vertical-gallery-row[data-slick-index=${rowIndex}]`).hasClass('slick-active') == false) {
	// 		$('.vertical-gallery').slick('slickNext');
	// 	}

	// 	// Add top&bottom active classes to row
	// 	if($(window).width() >= 1200) {
	// 		$('.vertical-gallery-row.slick-active').eq(0).addClass('top-active');
	// 		$('.vertical-gallery-row.slick-active').eq(1).addClass('bottom-active');
	// 	} else {
	// 		$('.vertical-gallery-row.slick-active').eq(0).addClass('top-active');
	// 		$('.vertical-gallery-row.slick-active').eq(1).addClass('top-active');
	// 		$('.vertical-gallery-row.slick-active').eq(2).addClass('bottom-active');
	// 	}

	// 	// Add active class to grid item
	// 	$(`.vertical-gallery-row[data-slick-index=${rowIndex}]`).find('.vertical-gallery__item').eq(itemIndex).addClass('active');
	// }, 2000);

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

	//! Resize window
	$(window).on('resize', function () {
		if($(window).width() > 512) {
			headerNav.css('display', 'flex');
		}
	});
});
