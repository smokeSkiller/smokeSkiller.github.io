$(document).ready(function() {
	//! Main pahe
	if ($('body').hasClass('main-page')) {
		//* Vertical slider
		$('#fullpage').fullpage({
			//options here
			autoScrolling: true,
			dragAndMove: true,
			// fadingEffect: true,
			scrollBar: true,
		});

		//methods
		$.fn.fullpage.setAllowScrolling(true);

		//* DOM
		var cardMenuItem = $('.section-card-menu__item');
		var cardMenuItemLink = $('.section-card-menu__item a');

		var sectionCardRight = $('.section-card.right');
		var robotImg = $('.section-card.right .robot-img');

		//* margin bottom for robot img
		if ($(window).width() <= 768) {
			robotImg.css('top', '' + sectionCardRight.height() - 230 + 'px');
		}

		//* Dropdown list 
		if ($(window).width() >= 992) {
			cardMenuItemLink.hover(function () {
			$(this).next().stop(false, true).fadeIn().addClass("active");
			}, function () {
				$(this).next().stop(false, true).fadeOut().removeClass("active");
			});
		} else if ($(window).width() < 992) {
			cardMenuItem.hover(function () {
			$(this).children(".section-card-submenu").stop(false, true).slideDown().addClass("active");
			}, function () {
				$(this).children(".section-card-submenu").stop(false, true).slideUp().removeClass("active");
			});
		}
	}
	
	//! Case page
	if ($('body').hasClass('case-page')) { 
		
	}
});