/*
*		Client-side infinite scroll
*		Author: Tales Farias (teefars)
*		Pen: http://codepen.io/teefars/pen/jbmGpq
*/

$( document ).ready(function() {
	$(".table-results").mCustomScrollbar({
      scrollInertia: 1,
      mouseWheel:{
        scrollAmount: 30,
        preventDefault: true
      },
    	callbacks:{
        onTotalScroll :function(){
            showMoreResults(this);
        }
	    }
	});
	ajustResults();

});

function ajustResults(){

	$('.table-results').outerHeight(function(){
		resultsHeight = $(window).height() - $(this).offset().top;
		return( (resultsHeight < 325) ? 325 :  resultsHeight-30);
	});
		// hide everything that is out of bound
	$('.table-results tbody tr').filter(function(index){
		// check if the element is visible and not scrolled. 
		// Note: if you dont let a little scroll (like leaving the element height), it won't trigger the scroll event.
		return (($(this).offset().top) > ($('.table-results').height()+($('.table-results').offset().top)));
	}).hide();
}


function showMoreResults(table, showItems){
	var itemsPerScroll=10;
	showItems = showItems || 0;
	selectedTable = $(this).find(".table");

	visibleRows = $("tr:visible",table).length;

	$('tr:lt('+(visibleRows+itemsPerScroll+showItems)+')',table).show();

	if($('.table-results tbody tr:last-of-type').is(":visible")){
		$(".results-end").css("display","block");
	}
}