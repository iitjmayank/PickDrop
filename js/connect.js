// connect with parse.com 
Parse.initialize("bXkP2s23KZh0HNmKCRUlczT6oVADedZm1aw9Jj0r", "pxjEtmnNSkAQwJARrv5j4BrmeaylUelBp7jJwodG");

var navSignIn = $('#nav-sign-in');
navSignIn.click(function() {
	var currentUser = Parse.User.current();
	if (currentUser) {
		//logout the user
		Parse.User.logOut();
		navSignIn.text('sign in');
		$('#nav-sign-in').attr("data-target", "#login-modal");
	}
	else {
		//login user
	}
});

$('.modal-login-btn').click(function() {
	var username = $('#username').val();
	var password = $('#login-pass').val();
	
	if($('.modal-login-btn').text() == 'Register') {
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", username);

		user.signUp(null, {
			success: function(user) {
				//user signed in
				userLoginin(username, password);

			},
			error: function(user, error) {
				// show the error message to user
    		alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	else {
		userLoginin(username, password);
	}
});

function userLoginin(username, password) {
	Parse.User.logIn(username, password, {
  			success: function(user) {
    			// Do stuff after successful login.
    			$('#login-modal').modal('hide');
    			$('#nav-sign-in').text('Log out');
    			$('#nav-sign-in').attr("data-target", "#");
  			},
  			error: function(user, error) {
    			// The login failed. Check error to see why.
    			alert("Error: " + error.code + " " + error.message);
  			}
		});
}


