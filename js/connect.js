// connect with parse.com 
Parse.initialize("bXkP2s23KZh0HNmKCRUlczT6oVADedZm1aw9Jj0r", "pxjEtmnNSkAQwJARrv5j4BrmeaylUelBp7jJwodG");
var currentUser = Parse.User.current();

$(function() {
    if (currentUser) {
        setNavSignInAfterLogin();
    }

    $('#logout-btn').click(function() {
        Parse.User.logOut();
        var navSignIn = $('#nav-sign-in');
        navSignIn.attr('data-target','#login-modal');
        navSignIn.attr('data-toggle', 'modal');
    });
});

function setSignedInUsername() {
    var firstname = currentUser.get("firstname");
    if (!firstname) {
        var username = currentUser.get("username").split("@");
        firstname = username[0];
    }
    return firstname;
}

function validation() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM

            switch($form[0].id) {
                // User sign-in or register
                case 'loginForm':
                    var username = $('input#username').val();
                    var password = $('input#login-pass').val();
                    
                    if($('.modal-login-btn').text() == 'Register') {
                        var user = new Parse.User();
                        user.set("username", username);
                        user.set("password", password);
                        user.set("email", username);

                        user.signUp(null, {
                            success: function(user) {
                                //user signed in
                                loginSuccess();

                            },
                            error: function(user, error) {
                                // show the error message to user
                                //alert("Error: " + error.code + " " + error.message);
                                $('#login-error').html("<div class='alert alert-danger'>");
                                $('#login-error > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                    .append("</button>");
                                $('#login-error > .alert-danger').append("<strong>" + error.code + " " + error.message +"</strong>");
                                $('#success > .alert-danger').append('</div>');
                                //clear all fields
                                $('#loginForm').trigger("reset");
                            }
                        });
                    }
                    else {
                        userLoginin(username, password);
                    } 
                break; // loginform 

                case 'trackorderForm':
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
                break; // track order

                case 'contactForm':
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

                break;

                case 'orderForm':
                    if (currentUser) {
                        var pickup_retailer = $('#order-retailer-name').text();
                        var invoice_number = $('input#order-invoice').val();
                        var pickup_date = $('input#order-pickupdate').val();
                        var pickup_time = $('#order-pickupTime option:selected').text();
                        var drop_address = $('#order-dropAddress option:selected').val();
                        var phone_number = $('input#order-phone').val();

                        var PlaceOrder = Parse.Object.extend("OrderList");
                        var order = new PlaceOrder();
                        order.save({
                            Username: currentUser.get("username"),
                            Retailer: pickup_retailer,
                            Invoice: invoice_number,
                            PickUpDate: pickup_date,
                            PickUpTime: pickup_time,
                            DropAddress: drop_address,
                            Phone: phone_number,
                            Status: 0
                        },{
                            success: function() {
                                //show the exit page
                                $('#user-section').load('placeorder_success.html');
                            },
                            error: function() {
                                //print some error
                            }
                        });
                    }
                    else {
                       $('#login-modal').modal('show');
                    }
                break;

                case addLocation:
                    var houseNumber = $('#houseNumber').val();
                    var landmark = $('#landmark').val();
                    var area = $('#area option:selected').val();
                    var addressalias = $('#address-alias').val();
                    currentUser.save( currentUser.addUnique("address", addressalias+"~"+ houseNumber + "\n" +landmark +"\n"+ area), {
                        success: function() {
                            $('#addlocation-modal').modal('hide');
                        }
                    });
                break;
                
            };
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
};


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

function userLoginin(username, password) {
    Parse.User.logIn(username, password, {
        success: function(user) {
            // Do stuff after successful login.
            loginSuccess();
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
            //alert("Error: " + error.code + " " + error.message);
            $('#login-error').html("<div class='alert alert-danger'>");
            $('#login-error > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#login-error > .alert-danger').append("<strong>" + error.code + " " + error.message +"</strong>");
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#loginForm').trigger("reset");
        }
    });
}

function loginSuccess () {
	$('#login-modal').modal('hide');
	currentUser = Parse.User.current();
    setNavSignInAfterLogin();
    $('#loginForm').trigger("reset");
}

function setNavSignInAfterLogin() {
    var navSignIn = $('#nav-sign-in');
    navSignIn.text("Hi, " +setSignedInUsername());
    navSignIn.attr('data-target','');
    navSignIn.attr('data-toggle', 'dropdown');
}

function fbLogin() {
window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '349312431907109', // Facebook App ID
      status     : true,
      cookie     : true, // enable cookies to allow Parse to access the session
      xfbml      : true,
      version    : 'v2.1'
    });
 
    Parse.FacebookUtils.logIn(null, {
	  success: function(user) {
	    $('#login-modal').modal('hide');
    	$('#nav-sign-in').text('Log out');
    	$('#nav-sign-in').attr("data-target", "#");
	  },
	  error: function(user, error) {
	    alert("User cancelled the Facebook login or did not fully authorize.");
	  }
	});
  };
 
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

};