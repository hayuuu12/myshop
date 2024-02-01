$(function(){
    $(document)
    .on("mouseenter", '.pr-category>li', function(){
        $(this).find('.sub-cate').fadeIn();  //sub-cate를 js에 만들었을 때
    })
    .on("mouseleave", '.pr-category>li', function(){
        $('.pr-category>li>.sub-cate').fadeOut();
    });
    // $('.pr-category>li').hover(function(){
    //     $(this).find('.sub-cate').fadeToggle();  //sub-cate를 html에 만들었을 때
    // });
    $('.category').mouseenter(function(){
        $(this).find('.category-subnav').css('display', 'flex');
    }).mouseleave(function(){
        $(this).find('.category-subnav').css('display', 'none');
    });

});//