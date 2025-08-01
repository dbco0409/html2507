$(document).ready(function() {
	$("#map_header .m_nav").click(function(){
		if($(window).width() < 950){
		$("#allMenu").fadeIn();
		$("#map_header .m_nav").hide();
		$("#map_header .inner .m_close").show();
		}
	});
	$("#map_header .inner .m_close").click(function(){
		if($(window).width() < 950){
		$("#allMenu").fadeOut();
		$("#map_header .m_nav").show();
		$("#map_header .inner .m_close").hide();
		}
	});
	$(".f_list .map_show .col-right .col-opt").click(function(){
		if($(".f_list .map_show .col-right .col-opt > div").css("display")=="none"){
			$("#f_wrap .f_list .map_show .col-right .col-opt > div").show();
		}else{
			$("#f_wrap .f_list .map_show .col-right .col-opt > div").hide();
		}
	});

	$(".f_list .map_show .col-right .col-opt > div .btn").click(function(){
		if($(".f_list .map_show .col-right .col-opt .btn-active").text()=="장기요양병원"){
			$(".f_list .map_show .col-right .col-opt .btn-active").text("요양병원");
			$(this).text("장기요양시설");
		}else{
			$(".f_list .map_show .col-right .col-opt .btn-active").text("장기요양병원");
			$(this).text("요양시설");
		}
	});

	var w=0;
	$(".f_list .arraw_opt").click(function(){
		w=$("#f_wrap").width() - 450;

		if($(".f_list").css("left")=="0px"){
		$(".f_list").animate({"left":"-450px"});
		$(".f_map").animate({"left":"0px","width":"100%"});
		$(".fix_l").animate({"left":"2%"});
		$(".f_list .arraw_opt img").css("transform","rotate(180deg)");
		}else{
		$(".f_list").animate({"left":"0px"});
		$(".f_map").animate({"left":"450px","width":w});
		$(".fix_l").animate({"left":"470px"});
		$(".f_list .arraw_opt img").css("transform","rotate(0deg)");	
		}
	});
	$(".f_list .order-group").click(function(){
		if(!$(this).hasClass("over")){
			$(this).addClass("over");
		}else{
			$(this).removeClass("over");
		}
	});
	$(".f_list .order-group").mouseleave(function(){
		$(this).removeClass("over");
	});
	$(".fix_l .btn-filter, .map_show .col-left .btn-filter").click(function(){
		if($(".fix_l .m-filter").css("display")=="none"){
			$(".fix_l").show();
			$(".fix_l .m-filter").show();
			$(".fix_l .h-tag").hide();
		}else{
			$(".fix_l").hide();
			$(".fix_l .m-filter").hide();
		}
	});
	$(".fix_l .btn-tag, .map_show .col-left .btn-tag").click(function(){
		if($(".fix_l .h-tag").css("display")=="none"){
			$(".fix_l, .fix_l .h-tag").show();
			$(".fix_l .m-filter").hide();
		}else{
			$(".fix_l, .fix_l .h-tag").hide();
		}
	});
	$(".fix_l .h-tag .inner a").each(function(e){
		$(".fix_l .h-tag .inner a").eq(e).click(function(){
			$(".fix_l .h-tag .inner a").removeClass("active");
			$(".fix_l .h-tag .inner a").eq(e).addClass("active");
		});
	});
	$(".fix_l .btn_back").click(function(){
		$(".fix_l, .fix_l .h-tag, .fix_l .m-filter").hide();
	});
	$(".fix_p .close").click(function(){
		$(".fix_p").removeClass("active");
	});
	$(".fix_r .btn-active").click(function(){
		if($(".fix_r div").css("display")=="none"){
			$(".fix_r div").addClass("show");
		}else{
			$(".fix_r div").removeClass("show");
		}
	});
	$(".fix_l").mouseleave(function(){
		$(".fix_l .m-filter").hide();
		$(".fix_l .h-tag").hide();
		if($(window).width() < 950){
			$(".fix_l").hide();
		}
	});
	$(".fix_r").mouseleave(function(){
		$(".fix_r div").removeClass("show");
	});
});

$(window).resize(function(){
	location.reload();
});

function show_p(n){
	$(".fix_p").addClass("active");
}

function m_set(n){ // 모바일용 
	var h=0
	if(n==1){ // 지도일 때
		h=$("#f_wrap .f_list").height()+$("#map_header").height();
		$(".search_set .input-btn .btn-list").addClass("btn-active");
		$(".search_set .input-btn .btn-map").removeClass("btn-active");
		$("#f_wrap .f_list").css("height","auto");
		$("#f_wrap .f_map").css("height",h);
		$("#f_wrap .f_list .search_opt, #f_wrap .f_list .conts,#f_wrap .f_map .fix_l .btns, #f_wrap .f_map .fix_r").hide();
		$("#f_wrap .f_map").show();
	}else{ // 목록일 때
		$(".search_set .input-btn .btn-list").removeClass("btn-active");
		$(".search_set .input-btn .btn-map").addClass("btn-active");
		$("#f_wrap .f_list").css("height","100%");
		$("#f_wrap .f_list .search_opt, #f_wrap .f_list .conts,#f_wrap .f_map .fix_l, #f_wrap .f_map .fix_r").show();
		$("#f_wrap .f_map").hide();
	}
}

function on_star(n){ // 모바일용
	$(".col-star a").removeClass("active");
	for(i=0; i<n; i++){
		$(".col-star a").eq(i).addClass("active");
	}
}