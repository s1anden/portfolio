var currProj = null;

$(function() {
	$(".navLink").click(function(event) {
		$(".navLink").removeClass("clicked");
		$(this).addClass("clicked");
	});

	$("#mobile-nav").click(function(event) {
		$("#navList").toggleClass("show");
	});

	var mq = window.matchMedia("@media all and (max-width: 600px)");
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
		// find width of photos, pass to gallery function to get fixed width gallery
		// how to determine height?
		// Also will need to reload current open project on resize
		return false;
	});

	$("#formSubmit").click(function() {
		// Send me an email somehow?
	});

	$(".expand-proj").click(function(e) {
		$(currProj).find('.desc-pictures').empty();
		$(currProj).slideUp();
		currProj = "#" + $(this).parents("li.project").first().data("proj");
		$(currProj).slideDown();
		generateGallery(currProj);

		$('html,body').animate({
        scrollTop: $("#placeholder").offset().top});
	});

	$(window).resize(function() {
		if (currProj) {
			generateGallery(currProj);
		}
	});

	$(".fancybox").fancybox({padding:0, margin:[100,20,20,20]});
});

// Close navList if click outside div
function clickOutside(e) {
	var container = $("#navList");

    if ((!container.is(e.target) && !$("#mobile-nav").is(e.target))) // if the target of the click isn't the container...
    {
        container.removeClass("show");
    }
}

function generateGallery(project) {
  var images = {'#femivin':{dir:'images/projects/femivin/',
					images:['home.png', 'travel1.png', 'travel2.png', 'shop.png'],
					dimensions:[{ height: 1196, width: 2520 },
										{ height: 1252, width: 766 },
										{ height: 1254, width: 766 },
										{ height: 1252, width: 2524 }]},
			'#yelp':{dir:'images/projects/yelp/',
					images:['home.png','process.jpg','interests.png'],
					dimensions:[{ height: 1262, width: 2534 },
										{ height: 1064, width: 1500 },
										{ height: 1262, width: 2534 }]},
			'#amazon':{dir:'images/projects/amazon/',
					images:['kindle-logo.jpg', 'kindle-user.jpg', 'emr-logo.png'],
					dimensions:[{ height: 197, width: 735 },
										{ height: 550, width: 480 },
										{ height: 312, width: 600 }]},
			'#chuck':{dir:'images/projects/chuck/',
					images:['chuck.jpg', 'register.png'],
					dimensions:[{ height: 532, width: 800 },
										{ height: 1238, width: 2210 }]},
			'#ridealong':{dir:'images/projects/ridealong/',
					images:['driver-feed.png', 'spec.png', 'passenger-request.png', 'dashboard.jpg'],
					dimensions:[{ height: 1136, width: 640 },
										{ height: 3586, width: 5542 },
										{ height: 568, width: 320 },
										{ height: 3884, width: 5336 }]},
			'#spotify':{dir:'images/projects/spotify/',
					images:['home.png', 'artist.png'],
					dimensions:[{ height: 1264, width: 2556 },
										{ height: 1264, width: 2556 }]}};
  var width = $(project).find('.desc-pictures').first().width();
  console.log(width);
  var rows = layoutFrames(images[project].dimensions, width, 300, 10);
  console.log(rows);
  var index = 0;
  var gallery = $(project).find(".desc-pictures").first();
  gallery.empty();

  // Add all of the images to the gallery
  rows.forEach(function(row, rowIndex) {
	row.forEach(function(image, imgIndex) {
		var pathname = images[project].dir + images[project].images[index];
	  gallery.append("<div style='width:" + (image.width) + "px; height:" + (image.height) + "px; margin-bottom:10px;' class='frame'></div>")
	  gallery.find(".frame").last().append("<a class='fancybox' rel='group' href='" + pathname + "'><img src='" + pathname + "' /></a>");

	  if (imgIndex != 0) {
	    gallery.find(".frame").last().css("margin-left", "9px");
	  }
	  index++;
    });
  });
}