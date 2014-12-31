// connect with parse.com 
Parse.initialize("bXkP2s23KZh0HNmKCRUlczT6oVADedZm1aw9Jj0r", "pxjEtmnNSkAQwJARrv5j4BrmeaylUelBp7jJwodG");

var navSignIn = $('#nav-sign-in');
var currentUser = Parse.User.current();
if (currentUser) {
	navSignIn.text('log out');
}
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