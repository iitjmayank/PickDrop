
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
$('#footer').load('footer.html');

/* Specific for package.html page*/
