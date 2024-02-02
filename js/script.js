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

    $('.listview').click(function(e){
        e.preventDefault();  //e의 기능 중지
        const view = $(this).data("view");
        $("#pdlist>div").removeClass();
        $(".listview rect").removeClass('list-act-color').addClass('list-color');
        if(view == 3){
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
            $("#pdlist>div").addClass("col-md-4 mb-5");
        }else if(view == 4 ){
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
            $("#pdlist>div").addClass("col-md-3 mb-5");
        }else if(view == 5 ){
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
            $("#pdlist>div").addClass("col-md-55 mb-5");
        }
    });

});//