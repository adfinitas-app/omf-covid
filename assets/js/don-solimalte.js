$(document).ready(function() {

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

        replaceAmount(btnDon, $(this).val());

        addOrModifyQueryParameter(btnDon, 'free_amount', 0, 'href');
        addOrModifyQueryParameter(btnDon, 'frequency', 'once', 'href');
    });

    //WHEN SELECT THE RADIO OF FREE INPUT
    $('input[name="don-amount"].free-amount-radio').on('change', function() {
        const btnDon = $(this).parents('.don').find('.btn-don');

        replaceAmount(btnDon, $(this).val());
        addOrModifyQueryParameter(btnDon, 'free_amount', 1, 'href');
        addOrModifyQueryParameter(btnDon, 'frequency', 'once', 'href');
    });

    $('#free-amount, #free-amount-mobile').on('input', function() {
        const val = $(this).val();
        
        if (!val)
        return false;
        
        const nb = Number(val);
            
        if (!isNaN(nb)) {
            const btnDon = $(this).parents('.don').find('.btn-don');
            
            $('.free-amount-radio').val(nb);
            replaceAmount(btnDon, nb);
            addOrModifyQueryParameter(btnDon, 'free_amount', '1', 'href');
            addOrModifyQueryParameter(btnDon, 'frequency', 'once', 'href');
        }
    });

    $('.free-amount-label').on('click', function(e) {
        $(this).find('input[name="don-amount"]').prop('checked', 'true');

        $('#free-amount, #free-amount-mobile').trigger('input');
        $(this).find('input[type="text"]').focus();
    })
});