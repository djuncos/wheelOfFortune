// $("#idOne").hide(000)


$("#idTwo").fadeOut(000)

$("#idTwo").fadeIn(4000)

$(document).ready( function(){

	$( "#idTwo" ).click(function() {
 		 $( "#idThree" ).animate({
    right: "+=50",
  }, 5000, function() {
    // Animation complete.
  });
});

	var $title = $("#title")

	$title.keyup(function () {
	
	
	    var $titleVal = $title.val()
	    

	    console.log($titleVal)

		

		$.ajax({
	  		url: "http://www.omdbapi.com/?",


	  		data: {
	    		t: $titleVal,
	  		},
			dataType: "jsonp",
			success: function(response) {

				console.log(response.Poster)

				$("#genre").html(response.Genre)

				$("#posterImg").attr("src", response.Poster);
			},
			error: function() {
				console.log("Not good!")
		  	}



		  })

		



	})

})



















$("#idOne").click(timed)


function timed(){

	setTimeout(function(){ animateHeader(); }, 5000)

}



//  degrees = 90

// $("#idOne").click(function() {
// 	$(this).css({
// 		"transform": 'rotate('+ degrees + 'deg)'
// 	})

// 	degrees += 90
// })


function animateHeader() {
	$("#idOne").animate({

	left: "+=800",
	top: "+=500",
	"font-size": "+=50"

} , 3000)
}

