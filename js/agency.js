/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(function() {
	$('.register-new-user').click(function() {
	if ($('.register-new-user').text() == "Please login") {
		$('.modal-login-btn').text('login');
		$('.login-link').fadeIn('fast');
		$('.register-new-user').text('New user please register');
	}
	else {
		$('.modal-login-btn').text('Register');
		$('.login-link').fadeOut('fast');
		$('.register-new-user').text('Please login');
	}
	});
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(function() {
	$('#pick-retailer-dropdown > li').click(function() {
		sessionStorage.setItem("RetailerName", $(this).text());
	});
});

$(function() {
	$('.clients img').click(function() {
		sessionStorage.setItem("RetailerName", $(this).attr("alt"));
	});
});

/* Html load methods*/
$('#login-modal').load('login_register.html');

/* Specific for package.html page*/
