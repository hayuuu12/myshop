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
                                            name="quantity"
                                            value="1"
                                            readonly>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-line qup" type="button">
                                            <i class="fa-solid fa-chevron-up"></i>
                                        </button>
                                    </div>
                                </div>
                                </li>                            
                            </ul>
                            <div class="tomoney col text-right"></div>
                            <i class="fa-solid fa-close remove-order"></i>
                        </li>                        
                    </ul>`;

    $('.size').change(function(){
        totalTextLength = $('.total-text').length;  //순서 
        const oradd = $('.addquantity').html();
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
            $('.total-text').eq(totalTextLength).html(optionText);  //선택한 색상, 사이즈 밑에 텍스트로 보여주기  //eq는 순서
            $('.quantity').eq(totalTextLength).val(1);
            $('.tomoney').eq(totalTextLength).html(tmoney.toLocaleString()+"원");
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
        $(this).parent().prev().val(quantity); 
        totalmoney = prprice * quantity;
        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>"+ tmoney + "원</strong>("+quantity+"개)";
        $('.totalmoney').html(txt);
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
        totalmoney = prprice * quantity;
        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>"+ tmoney + "원</strong>("+quantity+"개)";
        $('.totalmoney').html(txt);
    });

    //삭제 버튼
    $(document).on('click', '.remove-order', function(){
        $(this).parents('.add-opt').remove();  //parents : 조상태그  중 add-opt를 찾아 지우기.
    });

       


});//JQ
