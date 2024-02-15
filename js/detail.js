$(function(){

    $('.img-thumb-box>img').click(function(){
        const src = $(this).attr('src');
        $('.img-box>img').attr('src', src);
    });

    $('.colors input[type=radio]').click(function(){
        const color = $(this).val();
        $('.selected').text(color + "색");
    })

    //상품가격 계산
    const prcode = $("#prcode").val();
    const prprice = Number($("#prprice").val());
    const reserves = parseInt($("#reserves").val());  
    const delivery = parseInt($("#delivery").val());
    const prtitle = $("#title").val();
    let totalmoney = prprice;
    let tmoney = prprice;
    let totalTextLength, opt1, opt11, colortxt, color ,opt2, opt21, size, sizetxt, optionText;

    $('input[name="color"]').change(function(){
       $('.size').find("option:first").prop("selected", true);
       opt1 = $(this).data('color');  //추가금액
       colortxt = $(this).data('colorname');  
       color = $(this).val();                //폼으로 전송할 색상값
       //console.log(opt1, color, colortxt);
       if(opt1 > 0){
        opt11 = "(+" + opt1.toLocaleString() + "원)";
       }else{
        opt11 = "";
       }
       colortxt += " " + opt11;        //화면에 출력할 색상이름
       $('.size').attr('disabled', false); // size 박스 활성화
    });

    let opthtml =  `
                    <ul class="add-opt">
                        <li class="d-flex align-items-center">
                            <div class="total-text col"></div>
                            <ul class="add-opts col">
                                <li class="addbox d-flex align-items-center">
                                <label class="title-label">수량</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-outline-line qdown" type="button">
                                            <i class="fa-solid fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    <input type="number"
                                            class="quantity"
                                            name="quantity[]"
                                            readonly>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-line qup" type="button">
                                            <i class="fa-solid fa-chevron-up"></i>
                                        </button>
                                    </div>
                                </div>
                                </li>                            
                            </ul>
                            <input type="hidden" name="subtitle[]" class="subtitle">
                            <input type="hidden" name="toptmoney[]" class="toptmoney">
                            <div class="tomoney col text-right"></div>
                            <i class="fa-solid fa-close remove-order"></i>
                        </li>                        
                    </ul>`;

    $('.size').change(function(){
        totalTextLength = $('.total-text').length;  //순서 
        const oradd = $('.addquantity').html();
        let quantityArray = [];  //quantity value 값을 따로 읽어서 배열에 저장
        for(let i = 0 ; i< $('.quantity').length; i++){
            quantityArray[i] = $('.quantity').eq(i).val();
        }

        opt2 = Number($(this).find("option:selected").data('size'));  
        size = $(this).find("option:selected").val();
        sizetxt = $(this).find("option:selected").text();
        //console.log(opt2, size , sizetxt);
        if(opt2 > 0){
            opt21 = "(+" + opt2.toLocaleString() + "원)";
        }else{
            opt21 = "";
        }
        if(size){
            tmoney = prprice + (opt1 + opt2);
            sizetxt += " " + opt21;
            optionText=`<p>${colortxt}-${sizetxt}</p>`;
            $('.addquantity').html(oradd + opthtml);

            for(let i = 0; i < $('.quantity').length; i++){
                $('.quantity').eq(i).val(quantityArray[i]);
            }
            $('.subtitle').eq(totalTextLength).val(`${colortxt}-${sizetxt}`); //input type hidden 에 정보 저장
            $('.toptmoney').eq(totalTextLength).val(tmoney);  //가격 저장
            $('.total-text').eq(totalTextLength).html(optionText);  //선택한 색상, 사이즈 밑에 텍스트로 보여주기  //eq는 순서
            $('.quantity').eq(totalTextLength).val(1);
            $('.tomoney').eq(totalTextLength).html(tmoney.toLocaleString()+"원");
            $('#submit, #cart').attr('disabled', false);
            totalMoney(delivery);
        }
     });

    //$('#qup').click(function(){                     //해당 부분을 html에서 만들었을 때 
    $(document).on('click', ".qup", function(){       //해당 부분을 js에서 만들었을 때 
        let quantity = Number($(this).parent().prev().val());         //부모태그의 앞에 있는 형제태그
        //let quantity = Number($('.quantity').eq(totalTextLength).val());
        quantity += 1;
        if(quantity > 9){
            alert("최대수량입니다.");
            quantity = 9;
        }
        
        //$('.quantity').eq(totalTextLength).val(quantity);
        $(this).parent().prev().val(quantity);   //가져온 수량을 input에 넣기
        tmoney = $(this).parents('.add-opt').find('.toptmoney').val();  //inpuut에 저장된 상품+ 옵션 가져오기
        let ttmoney = tmoney * quantity;     //(상품가격+옵션)*수량
        ttmoney = ttmoney.toLocaleString();   //세 자리 콤마
        $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원"); //수량에 따른 액수 표시 (출력)

        //let ind = $('.qup').index(this);   //수량에 따른 액수 표시 (출력)
        //$('.tomoney').eq(ind).html(tmoney + "원");  //수량에 따른 액수 표시 (출력)

        // let txt = "총 상품금액(수량) : <strong>"+ ttmoney + "원</strong>("+quantity+"개)";
        // $('.totalmoney').html(txt);
        totalMoney(delivery);
    });

    //$('#qdown').click(function(){
    $(document).on('click', ".qdown", function(){
        //let quantity = Number($('.quantity').eq(totalTextLength).val());
        let quantity = Number($(this).parent().next().val());     //부모태그의 뒤에 있는 형제태그
        quantity -= 1;
        if(quantity < 1){
            quantity =1;
        }
        //$('.quantity').eq(totalTextLength).val(quantity);
        $(this).parent().next().val(quantity);
        tmoney = $(this).parents('.add-opt').find('.toptmoney').val();
        let ttmoney = tmoney * quantity;     //(상품가격+옵션)*수량
        ttmoney = ttmoney.toLocaleString();   //세 자리 콤마
        $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원"); //수량에 따른 액수 표시 (출력)

        
        totalMoney(delivery);
    });

    //삭제 버튼
    $(document).on('click', '.remove-order', function(){
        $(this).parents('.add-opt').remove();  //parents : 조상태그  중 add-opt를 찾아 지우기.
        if($('.addquantity').children().hasClass('add-opt')){  //addquantity 자식에 add-opt가 있는 지 확인
            totalMoney(delivery);
        }else{
            $('.size').find("option:first").prop("selected", true);  //사이즈 표기 초기화   //prop : 셀렉트 박스에 true, false 줄 수 있는 명령
            $('#submit, #cart').attr('disabled', true);   //주문하기 버튼, 카트추가 버튼 비활성화 
            $('.totalmoney').html("");  //총 액수 표기 초기화 
        }
    });    

    //본문 상세보기 스크립트
    $('.nav-pills li').click(function(){
        $('.nav-pills>li').removeClass('active');
        $(this).addClass('active');
    });



});//JQ

function totalMoney(delivery){
    let tm = 0;
        $('input[name="toptmoney[]"]').each(function(index){
            let moneyVal = parseInt($(this).val());  //parseInt 정수타입으로 바꾸기
            let qt = parseInt($(".quantity").eq(index).val());
            tm += moneyVal*qt;
            console.log(tm);
            //배송정책
            if(tm > 200000){
                delivery = 0;   //금액이 20만원 이상이면 배송비 0원 
            }
            let txt = "총 상품금액(수량) : <strong>"+ tm.toLocaleString() + "원</strong>+(배송비 :"+delivery.toLocaleString()+"원)";
            $('.totalmoney').html(txt);
            
        });
}
