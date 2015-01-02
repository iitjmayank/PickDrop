

$('#user-section').load('place_pickup.html');

$('#place-pickup').click(function() {
    $('#user-section').load('place_pickup.html');
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

$('#customer-help').click(function() {
    //Load the FAQ page
    $('#user-section').load('help.html');
});

$(function() {
    if (!currentUser) {
    $('#login-modal').modal('show');
}
});