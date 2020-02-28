//! Dropdown 2 level  
var dropdownLink2 = $('.main-nav .has-child-2');
var subMenu2 = $('.main-nav .has-child-2 .sub-menu-2');
var subMenu1 = $('.main-nav .sub-menu-1');


dropdownLink2.hover(function () {
    if ($(window).width() >= 1100) {  
        subMenu2.css('left', subMenu1.width() );      
        subMenu2.stop(false, true).show();

        if (subMenu2.offset().left + subMenu2.width() >= $(window).width()) {
            subMenu2.css("left", "-245px");
        }
    }

}, function () {
    if ($(window).width() >= 1100) {        
        subMenu2.stop(false, true).hide();
    }
});