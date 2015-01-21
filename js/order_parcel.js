
$(function() {
    $('#login-modal').load('login_register.html', function() {
        test();
    });
    
function test() {
    if (!currentUser) {
        $('#login-modal').modal('show');
    }
    $('#addlocation').load('add_new_location.html');
    $('#user-section').load('placeorder_success.html', function() {
                                    validation();
                                });

    $('#place-pickup').click(function() {
        $('#user-section').load('place_pickup.html', function() {
            validation();
        });
    });

    $('#user-history').click(function() {
        if (currentUser) {
            $('#user-section').load('order_history.html');
        }
        else {
            $('#login-modal').modal('show');
        }
    });

    $('#user-profile').click(function() {
        if (currentUser) {
            $('#user-section').load('profile.html');    }
        else {
            $('#login-modal').modal('show');
        }
    });
}

    $('#customer-help').click(function() {
        //Load the FAQ page
        $('#user-section').load('help.html');
    });
});