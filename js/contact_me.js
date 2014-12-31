$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM

            // order tracking
            $('#order-tracking-submit').click(function(){
                var phone = $("input#order-tracking-phone").val();
                var invoice = $("input#order-tracking-invoice").val();
                var i=0;
                $('#order-tracking-track > div').each(function(){
                    if (i>invoice) {
                        return false;
                    }
                    $(this).removeClass('disabled').addClass('complete');
                    i++;
                });                
                /*

                var Order = Parse.Object.extend("order");
                var order = new Parse.Query(Order);
                order.equalTo("phone",phone);
                order.equalTo("invoice", invoice);
                order.find(null, {
                    success: function() {
                        // Success message
                        

                        //clear all fields
                        $('#trackorderForm').trigger("reset");
                    },
                   error: function() {
                        // Fail message
                        $('#order-tracking-error').html("<div class='alert alert-danger'>");
                        $('#order-tracking-error > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#order-tracking-error > .alert-danger').append("<strong>Invalid phone number or inovice number. Please login and check your order history.</strong>");
                        $('#order-tracking-error > .alert-danger').append('</div>');
                        //clear all fields
                        $('#trackorderForm').trigger("reset");
                    }
                });
                */
            });

            // Send Feedback
            $('#send-feedback').click(function(){
                var name = $("input#name").val();
                var email = $("input#email").val();
                var phone = $("input#phone").val();
                var message = $("textarea#message").val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                var Feedback = Parse.Object.extend("Feedback");
                var feedback = new Feedback();
                feedback.set("name", name);
                feedback.set("phone", phone);
                feedback.set("email", email);
                feedback.set("message", message);
                feedback.save(null, {
                    success: function() {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Thanks for your feedback, we will . </strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#contactForm').trigger("reset");
                    },
                   error: function() {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that internet or my server is down. Please try again later!</strong>");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                });
            });
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


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});