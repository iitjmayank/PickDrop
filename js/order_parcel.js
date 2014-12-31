
var currentUser = Parse.User.current();

if (!currentUser) {
    $('#login-modal').modal('show');
}

if (sessionStorage.getItem("RetailerName")) {
    $('#order h2').text(sessionStorage.getItem("RetailerName"));
}


$(function() {
    $('#retailers-list a').click(function() {
        $('#order-retailer-name').text($(this).text());
        // dismiss dialog box
        $('#retailers-modal').modal('hide');
    });
});

$(function() {

    $("input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            // order pickup
            if ($('#order-submit').click() ) {
                var pickup_retailer = $('#order-retailer-name').text();
                var invoice_number = $('input#order-invoice').val();
                var pickup_date = $('input#order-pickupdate').val();
                var pickup_time = $('#order-pickupTime option:selected').text();
                var drop_address = $('#order-dropAddress option:selected').text();
                var phone_number = $('#input#order-phone').val();
    
                var PickUpOrder = Parse.Object.extend('order');
                var pickupOrder = new PickUpOrder();
                pickUpOrder.set("retailer", pickup_retailer);
                pickupOrder.set("invoice", invoice_number);
                pickupOrder.set("date", pickup_date);
                pickUpOrder.set("time", pickup_time);
                pickUpOrder.set("address", drop_address);
                pickUpOrder.set("phone", phone_number);

                pickUpOrder.save(null, {
                    success: function() {
                        //Submit page
                    },
                    error: function() {
                        //show error
                    }
                });
            }
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});