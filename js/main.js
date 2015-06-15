(function($){
	var sliderUl = $('.compare__carousel>table'),
		// imgs = sliderUl.find('td'),
		imgWidth = 250,
		imgsLen = 4,
		current = 1,
		totalImgsWidth = 4 * 250;

	$('#slider-nav').show().find('button').on('click', function() {
		var direction = $(this).data('dir'),
			loc = imgWidth;

		(direction === 'next') ? ++current : --current; //update current value
		
		//if first image
		if ( current === 0 ) {
			current = imgsLen;
			loc = totalImgsWidth - imgWidth;
			direction = 'next';
		} else if ( current -1 === imgsLen ) {
			current = 1;
			loc = 0;
		}

		transition(sliderUl, loc, direction);
	});

	function transition( container, loc, direction ) {
		var unit; // -= +=

		if (direction && loc !== 0 ) {
			unit = (direction === 'next') ? '-=' : '+=';
		};
		container.animate({
			'left': unit ? (unit + loc) : loc
		});
	}


})(jQuery);