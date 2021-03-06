//var totalWidth = 0;
//$('#container').children('.item').each(function(){
//   totalWidth += $(this).outerWidth();
//});

//$('#container').width(totalWidth);



$(document).ready(function() {  
    // Stuff here  

	var container = $('#work-container .lazy, #work-container .item, #work-container .item .description'),
		headerHeight = $('header').height();
	
	// adjust height on load
	$(document).ready(function() {
		container.height(innerHeight - 300);
	});

	$(window).resize(function() {
		changeHeight();
	});
	
	function changeHeight(){
		if ( $('#work-container').hasClass('no-resize')){
				// Nothing happens
			}
		else {
		$(container).height(innerHeight - 300);
		}
	}
	
	

	//////////////////////////////////////// MENUS //////////////////////////////////////////

	var $secondary = $(".secondary");
	var $cat_digital = $('.secondary #digital > a')
	var $digital_list = $("#digital-list");
	var $cat_print = $('.secondary #print > a')
	var $print_list = $("#print-list");
	var $cat_branding = $('.secondary #branding > a')
	var $branding_list = $("#branding-list");

	// SHOW/HIDE SECONDARY
	$('.primary #work').hover(function() {
		$secondary.slideDown(200);
	});

	$('header').click(function() {
		$secondary.slideUp(200);
	});


	// SHOW/HIDE PRINT
	$cat_digital.hover(function() {
		$digital_list.slideDown(200),
		$branding_list.slideUp(300),
		$print_list.slideUp(300),

		$(this).addClass("active");
		$cat_branding.removeClass("active");
		$cat_print.removeClass("active");

	});

	$cat_digital.click(function(e) {
		e.stopPropagation();
	});

	$("header").click(function() {
		$digital_list.slideUp(200),
		$cat_digital.removeClass("active");
	});


	// SHOW/HIDE BRANDING
	$cat_branding.hover(function() {
		$branding_list.slideDown(200),
		$digital_list.slideUp(300),
		$print_list.slideUp(300),

		$(this).addClass("active"),
		$cat_digital.removeClass("active");
		$cat_print.removeClass("active");

	});


	$("header").click(function() {
		$branding_list.slideUp(200);
		$cat_branding.removeClass("active");
	});

	// SHOW/HIDE PRINT
	$cat_print.hover(function() {
		$print_list.slideDown(200),
		$digital_list.slideUp(300),
		$branding_list.slideUp(300),

		$(this).addClass("active");
		$cat_digital.removeClass("active");
		$cat_branding.removeClass("active");
	});

	$cat_print.click(function(e) {
		e.stopPropagation();
	});

	$(".tertiary li a").click(function(e) {
		e.stopPropagation();
	});

	$("header").click(function() {
		$print_list.slideUp(200);
		$cat_print.removeClass("active");
	});




	// PRVENT DEFAULT ON CLICK TO KEEP MENUS OPEN 
	/*$(".primary #work > li").click(function(e) {
		e.preventDefault();
	});

	$(".primary #work > li > a").click(function(e) {
		e.preventDefault();
	});*/



	//////////////////////////////////// AJAX LOAD /////////////////////////////////////  

	 // Check for hash value in URL  
    var hash = window.location.hash.substr(1);  
    var href = $('.tertiary li a').each(function(){  
        var href = $(this).attr('href');  
        if(hash==href.substr(0,href.length-5)){  
            var toLoad = hash+'.html #main';  
            $('#main').load(toLoad)  
        }   
    });  
      
    $('#nav li a').click(function(){  
      
    var toLoad = $(this).attr('href')+' #main';  
    $('#main').hide('fast',loadContent);  
    $('#load').remove();  
    $('#wrapper').append('<span id="load">LOADING...</span>');  
    $('#load').fadeIn('normal');  
    window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);  
    function loadContent() {  
        $('#main').load(toLoad,'',showNewContent())  
    }  
    function showNewContent() {  
        $('#main').show('normal',hideLoader());  
    }  
    function hideLoader() {  
        $('#load').fadeOut('normal');  
    }  
    return false;  
      
    });  

	////////////////////////////////// ACTIVE NAV ITEM ///////////////////////////////////  

	$(function(){
       $("a").each(function(){
               if ($(this).attr("href") == window.location.pathname){
                       $(this).addClass("active");
               }
       });
	});


	////////////////////////////////// PREV/NEXT WORK ///////////////////////////////////  
$('.tertiary li a').click(function() {
 
  	/* 
		Each menu option has a custom attribute called 'data-load' which indicates what the link wants to load 
		Ref: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.dataset
		*/
		var load = $(this).attr('data-load');
 
		$.ajax({
			type: 'POST',
			url: '/index/load-menu',
			success: function(response) { 
		    	 // Put the results we get back from the ajax receiver into the results div
				$('#main').html(response);
			},
			data: {
				// Pass data to the ajax receiver
				choice: choice,
			},
		}); // end Ajax setup
 
	});


});  // eod





	/////////////////////////////// WORK EXPAND/CONTRACT ////////////////////////////////

	/* MOVE WORK CONTAINER WHEN MENU EXPANDED
	$(".secondary li").hover(function () {
		$('#work-container').animate({
			marginTop: "300px"
		});
	});

	$("html").click(function () {
		$('#work-container').animate({
			marginTop: "250px"
		});
	});


	/* SCROLL HEADER+WORK UP VERSION 1
	$(function(){
		$('header').data('size','big');
	});

	$(window).scroll(function(){
		var $nav = $('header');
		if ($('body').scrollTop() > 30) {
			if ($nav.data('size') == 'big') {
				$nav.data('size','small').stop().animate({
					paddingTop:'4em'
				}, 300),
				$('#social').slideUp(400);
			}
		} else {
			if ($nav.data('size') == 'small') {
				$nav.data('size','big').stop().animate({
					paddingTop:'12em'
				}, 300),
				$('#social').slideDown();
			}  
		}
	});

/* SCROLL HEADER+WORK UP VERSION 2
$(document).on("scroll",function(){
    if($("body").scrollTop()>30){
        $("header").removeClass("expand").addClass("shrink"),
        $('#social').slideUp(400);
    } else{
        $("header").removeClass("shrink").addClass("expand"),
        $('#social').slideDown(400);
    }
}); */
