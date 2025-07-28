$(document).ready(function() {

	var main01_slider = new Swiper('#main01 .main_slider', {
		slidesPerView: 1,
        spaceBetween: 25,
		loop:true,
		centeredSlides: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		  },
		pagination: {
          el: "#main01 .pages .pgNum",
          type: "fraction",
        },
		});
	$("#main01 .pages .pause").click(function(){
		main01_slider.autoplay.stop();
	});
	$("#main01 .pages .prev").click(function(){
		main01_slider.slidePrev();
	});
	$("#main01 .pages .next").click(function(){
		main01_slider.slideNext();
	});

});