jQuery(document).ready(function($) {
//gnav fixed
var gnav = $('#gnav');
var gnav_top = gnav.offset().top;
var body = $('body');
$(window).scroll(function () {
	if($(window).scrollTop() >= gnav_top) {
		gnav.addClass('gnav_fixed');
		body.css('margin-top','60px');
	} else {
		gnav.removeClass('gnav_fixed');
		body.css('margin-top','0px');
	}
});

//gnav scroll
$('.scroll').click(function(event){
	event.preventDefault();
	var url = this.href;
	var parts = url.split('#');
	var target = parts[1];
	var target_offset = $('#'+target).offset();
	var target_top = target_offset.top - 60;
	$('html, body').animate({scrollTop:target_top}, 1500, 'easeOutQuint');
});

//page top scroll
$('#gnav .scroll_top').click(function(){
	$('html, body').animate({'scrollTop': 0 }, 1500, 'easeOutQuint');
	return false;
});

//rollover fade
$('a img').hover(
	function(){
		$(this).stop().fadeTo(200, 0.6);
	},
	function(){
		$(this).stop().fadeTo(200, 1.0);
});

//colorbox
$('#menu a').colorbox({
	maxWidth:'90%',
	maxHeight:'90%'
});

//bxslider
$('#slider ul').bxSlider({
	auto: true,
	pause: 7000,
	speed: 3000,
	mode: 'fade',
	pager: false,
	touchEnabled: true,
	responsive: false
});
});
