$(document).ready(function() {

    function updateBtnText(btnDonAmount, value) {

        console.log(btnDonAmount, value);
        btnDonAmount.text(value);
    }

    function replaceAmount(btnDon, nb) {
        if (!btnDon || btnDon.length === 0 || !nb)
            return false;
        
        const btnDonAmount = btnDon.find('.btn-don-amount');
    
        btnDonAmount.text(nb);
        
        addOrModifyQueryParameter(btnDon, 'amount', parseInt(nb * 100), 'href');
    }


    //WHEN SELECT ANY RADIO EXCEPT FREE
    $('input[name="don-amount"]:not(.free-amount-radio)').on('change', function() {
        const btnDon = $(this).parents('.don').find('.btn-don');

        addOrModifyQueryParameter(btnDon, 'free_amount', 0, 'href');
        addOrModifyQueryParameter(btnDon, 'frequency', 'once', 'href');

        replaceAmount(btnDon, $(this).val());
    });

    //WHEN SELECT THE RADIO OF FREE INPUT
    $('input[name="don-amount"].free-amount-radio').on('change', function() {
        const btnDon = $(this).parents('.don').find('.btn-don');

        addOrModifyQueryParameter(btnDon, 'free_amount', 1, 'href');
        addOrModifyQueryParameter(btnDon, 'frequency', 'once', 'href');

        replaceAmount(btnDon, $(this).val());
    });

    $('#free-amount, #free-amount-mobile').on('input', function() {
        const val = $(this).val();
        
        if (!val)
        return false;
        
        const nb = Number(val);
            
        if (!isNaN(nb)) {
            const btnDon = $(this).parents('.don').find('.btn-don');
            
            addOrModifyQueryParameter(btnDon, 'free_amount', '1', 'href');
            addOrModifyQueryParameter(btnDon, 'frequency', 'once', 'href');
    
            $('.free-amount-radio').val(nb);
            replaceAmount(btnDon, nb);
        }
    });

    $('.free-amount-label').on('click', function(e) {
        $(this).find('input[name="don-amount"]').prop('checked', 'true');

        $('#free-amount, #free-amount-mobile').trigger('input');
        $(this).find('input[type="text"]').focus();
    })
});