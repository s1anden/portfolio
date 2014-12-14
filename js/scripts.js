$(".navLink").on('click', function(event) {
	$(".navLink").removeClass("clicked");
	$(this).addClass("clicked");
})