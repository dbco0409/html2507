$(document).ready(function() {

	var sub_slider = new Swiper('.sub_slider', {
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
    });
	
	$(".contents .inner .tit3").each(function(e){
		$(".contents .inner .tit3").eq(e).click(function(){
			if($(".contents .inner .tit3").eq(e).hasClass("active")==false){
				$(".contents .inner .show").eq(e).hide();
				$(".contents .inner .tit3").eq(e).addClass("active");
			}else{
				$(".contents .inner .show").eq(e).show();
				$(".contents .inner .tit3").eq(e).removeClass("active");
			}
		});
	});
	$(".contents .btn-set .btn").each(function(e){
		$(".contents .btn-set .btn").eq(e).click(function(){
			$(".contents .btn-set .btn").removeClass("btn-active");
			$(this).addClass("btn-active");
			$(".contents .inner .group").hide();
			$(".contents .inner .group").eq(e).show();
		});
	});
	$("#fixedbg").click(function(){
		pop_close();
	});
	var num=1;
	var content = "";
	$(".fixed1 .f-group .f-text").keydown(function(){
		content = $(this).val();
		num=parseInt(content.length);
		$(".fixed1 .f-group .blue .num").text(content.length);

		if(num>1000){
			alert("최대 1000자까지 입력 가능합니다.");
			$(this).val(content.substring(0, 1000));
		}
	});
});
function pop_open(id){
	$(".fixed").hide();
	$("#"+id).show();
	$("#fixedbg").show();
}

function pop_close(){
	$(".fixed").hide();
	$("#fixedbg").hide();
}
