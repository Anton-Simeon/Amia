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


});
