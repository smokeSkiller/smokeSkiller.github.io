$(function() {

	// DOM
  const header = $('.header.fixed-for-menu');

	const burgerBtn = $('header .burger-btn');
  const sliderBody = $('.slider__body');

  //! Fixed header
  $(window).on("scroll", function() {
    if($(this).scrollTop() > $('.static-header').outerHeight()) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  });

  //! Slider
  sliderBody.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
  });

	//! Menu
	new Mmenu( "#my-menu", {
    	// Extensions
        "extensions": [
          "border-none",
          "pagedim-black",
          "position-right",
       ],

       navbar: {
       	title: "Меню",
       },

       "pageScroll": true,
    }, {
        // configuration
        classNames: {
          fixedElements: {
              fixed: "fixed-for-menu"
          }
        }
    });

  // Close and open btn
  burgerBtn.on("click", function () {
    $(this).addClass("active");
  });

  $(".mm-wrapper__blocker").on("touchstart", function() {
    closeMenuBtn();
  });

  $(".mm-wrapper__blocker").on("click", function() {
    closeMenuBtn();
  });

  function closeMenuBtn() {
    burgerBtn.removeClass("active");
  }

});
