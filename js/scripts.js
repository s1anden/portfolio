$(function() {
	$(".navLink").click(function(event) {
		$(".navLink").removeClass("clicked");
		$(this).addClass("clicked");
	});

	$("#mobile-nav").click(function(event) {
		$("#navList").toggleClass("show");
	});

	var mq = window.matchMedia('@media all and (max-width: 600px)');
	if(mq.matches) {
	    // the width of browser is more then 600px
	} else {
	    // the width of browser is less then 600px
	    $(document).mouseup(clickOutside);
	}

	mq.addListener(function(changed) {
	    if(changed.matches) {
	        // the width of browser is more then 600px
	        $(document).mouseup(function(e) {});
	    } else {
	        // the width of browser is less then 600px
	    	$(document).mouseup(clickOutside);
	    }
	});

	$(".expand-proj").click(function() {
		$(this).parents("li.project").find(".project-desc").slideToggle();
		return false;
	});
});

// Close navList if click outside div
function clickOutside(e) {
	var container = $("#navList");

    if ((!container.is(e.target) && !$("#mobile-nav").is(e.target))) // if the target of the click isn't the container...
    {
        container.removeClass("show");
    }
}