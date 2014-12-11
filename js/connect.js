// connect with parse.com 
$('#register-new-user').click(function() {
	if ($('#register-new-user').text() == "Please login") {
		$('.modal-login-btn').text('login');
		$('.login-link').fadeIn('fast');
		$('#register-new-user').text('New user please register');
	}
	else {
		$('.modal-login-btn').text('Register');
		$('.login-link').fadeOut('fast');
		$('#register-new-user').text('Please login');
	}
});

$('.modal-login-btn').click(function() {
	var username = $('#username').val();
	var password = $('#login-pass').val();
	
	if($('.modal-login-btn').text() == 'Register') {
		var user = new Parse.User();
		user.set('username', username);
		user.set('password', password);
		user.set('email', username);

		user.signUp(null, {
			success: function(user) {
				//user signed in
				alert('done');
			},
			error: function(user, error) {
				// show the error message to user
    		alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	else {
		alert ('login');
		alert(username);
		Parse.User.logIn(username, password, {
  			success: function(user) {
    			// Do stuff after successful login.
    			alert('done');
    			$('#login-modal').modal('hide');
  			},
  			error: function(user, error) {
    			// The login failed. Check error to see why.
    			alert("Error: " + error.code + " " + error.message);
  			}
		});
	}
});


