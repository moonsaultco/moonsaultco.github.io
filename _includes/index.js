// going to use cash a lightweight jquery alternative
// https://github.com/kenwheeler/cash#fnafter
$(function(){

var pulseList = ["/img/pulse/a-home.jpeg", "/img/pulse/e-solar.jpeg", "/img/pulse/c-size.jpeg", "/img/pulse/d-mobile.jpeg"],
homeList = ["/img/myhome/a-explore.jpeg", "/img/myhome/b-energy.png"],
revelList = ["/img/revel/c-details.png",  "/img/revel/b-results.png",  "/img/revel/d-mobile.png"],
commList = ["/img/comm/a-home.jpeg", "/img/comm/b-about.png", "/img/comm/c-offset.png", "/img/comm/d-mobile.png"];


$('html').addClass('dom-loaded');
swapIndex = 0;
swapDelay = 9000;
//swapTestimonials();
setTimeout(swapTestimonials, swapDelay);

//showTestimonial();
//$('.img-switch').on('click', bloop())
$('.img-switch').on('click', function(e) {
   // console.log($(this));
 	switchImage($(this));
 	e.preventDefault();
}); 

function switchImage(clickedNode) {
 	//console.log(clickedNode);
 	//console.log($(clickedNode).children());

 	var targetFlag = clickedNode.attr('data-id'),
 	thisImage = $(clickedNode).children(),
 	listIndex = thisImage.attr('data-count'),
 	nextIndex, newSrc, targetList;

 	if (targetFlag == 'myhome') targetList = homeList;
 	if (targetFlag == 'pulse') targetList = pulseList;
 	if (targetFlag == 'revel') targetList = revelList;
 	if (targetFlag == 'comm') targetList = commList;


 	if (targetList.length > 1) {

 		nextIndex = parseInt(listIndex) + 1;
 		if (nextIndex == targetList.length) nextIndex = 0;

 		newSrc = targetList[nextIndex];

 		thisImage.addClass('fade-out');
 		//thisImage.removeClass('fade-in');

 		setTimeout(function(){
 			thisImage.attr('src', newSrc );
 			thisImage.attr('data-count', nextIndex );
 		}, 500);


 		setTimeout(function(){
 			//thisImage.addClass('fade-in');
 			thisImage.removeClass('fade-out');
 		}, 750);


 	}
}

function swapTestimonials() {
 	var elementCollection = $('.testimonials .wrap').children();
 	//console.log("swapIndex " + swapIndex);

 	// using hidden to keep the move from off-screen-left to off-screen-right
 	// from being vissible
 	$('.testimonial.hidden').removeClass('hidden');

 	$(elementCollection[swapIndex]).addClass('off-screen-left');
 	var nextItem = swapIndex+1
 	if (nextItem == elementCollection.length) {nextItem = 0};
 	//console.log("nextItem " + nextItem);
 	$(elementCollection[nextItem]).removeClass('off-screen-right');

 	setTimeout(function() {
 	  $('.off-screen-left').addClass('hidden');
 	  $('.off-screen-left').addClass('off-screen-right');
 	  $('.off-screen-left').removeClass('off-screen-left');
 	}, 1000);

 	swapIndex++;
 	if (swapIndex == elementCollection.length) {swapIndex = 0};

 	setTimeout(swapTestimonials, swapDelay);
}



});
