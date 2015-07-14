jQuery(function ($) {

//region ===== QuantifyClick =====

    $('.quantify-table a').click(function (e) {
        e.preventDefault();

        var $this = $(this),
            $closestInput = $this.closest('.quantify-table').find('input'),
            $closestInputVal = parseInt($closestInput.val());

        if ($this.hasClass('next')) {
            $closestInputVal -= 1;
        } else {
            $closestInputVal += 1;
        }

        if ($closestInputVal == 0) $closestInputVal = 1;

        $closestInput.val($closestInputVal);
    });

    //endregion

    //region ===== InputFilter =====
    $(".item-numbers").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    //endregion


    // checkout

     $(".validate").each(function(){
        $(this).validate({
          submitHandler: function(form) {
            $(form).ajaxSubmit();
          }
      });
    });


    function checkedFun(){
        if($('#byz_chk_method_codevpaspstdlookupLV5').is(':checked')){
            $('#StroOther1').attr('disabled', 'disabled');
            if($('#StroOther1').is(':checked')){
                $('#StroOther1').removeAttr('checked');
            }
            $('.wrap-map-canvas-hide').show();
        }
        if($('#byz_chk_method_codevpaspstdlookupLV3').is(':checked')){
            $('#StroOther1').removeAttr('disabled');
            $('.wrap-map-canvas-hide').hide();
        }
    }

    checkedFun();

    $('#byz_chk_method_codevpaspstdlookupLV5, #byz_chk_method_codevpaspstdlookupLV3').change(function(){
        checkedFun();
    });


    function translation(){
        $('.bank-card input, .bank-translation input').removeAttr('checked');
        if($('#StroOther1').is(':checked')){
            $('.bank-card').hide();
            $('.bank-translation').hide();
        }
        if($('#StroOther2').is(':checked')){
            $('.bank-card').show();
            $('.bank-translation').hide();

            thisCheck = $('.card-block input:checked');
            cardblock();
        }
        if($('#StroOther3').is(':checked')){
            $('.bank-card').hide();
            $('.bank-translation').show();
            $('.bank-translation .customRadio:first-child input').prop('checked', true);
            thisCheck = $('.card-block input:checked');
            cardblock();
        }
    }

    translation();


    $('#StroOther1, #StroOther2, #StroOther3').change(function(){

        translation();
    });

    // END checkout

    var thisCheck;

    function cardblock(){
        var thisCheckId = thisCheck.attr('id');
        $('.info-bank').removeClass('info-bank-active');
        $('.info-bank[data-id="' + thisCheckId + '"]').addClass('info-bank-active');
    }


    $('.card-block input').change(function(){
        thisCheck = $(this);
        console.log('sdsa');
        cardblock();
    });


    thisCheck = $('.card-block input:checked');
    cardblock();


    $('.card-block .customRadio').hover(function(){
        thisCheck = $(this).children('input');
        cardblock();
    }, function(){
        var thisCheckId = $('.card-block input:checked').attr('id');
        $('.info-bank').removeClass('info-bank-active');
        $('.info-bank[data-id="' + thisCheckId + '"]').addClass('info-bank-active');
    });


});
