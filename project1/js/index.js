$(document).ready(function() {

    var main01_slider = new Swiper('#main01 .main_slider', {
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            slideChange: function() {
                // 슬라이드 변경 시 quick_form 애니메이션 추가
                $('#main01 .quick_form').removeClass('animate');
                
                // 잠깐 올라갔다가 내려오는 애니메이션
                setTimeout(function() {
                    $('#main01 .quick_form').addClass('animate');
                }, 50); // 애니메이션 재시작 시간 (작게 설정하여 딜레이 주기)
            }
        }
    });

});
