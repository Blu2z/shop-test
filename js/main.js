$( document ).ready(function() {

	function comparePage() {
		var buttonsNav = $('div.compare__nav'),
		compareRow = $('.compare__row'),
		buttonsDel = $('.close'),
		radioAll = $('#radio1'),
		radioCompare = $('#radio2'),
		sliderUl = $('.compare__carousel>table'),
		sliderUl2 = $('.compare__wrap'),
		contLen,
		contWidth = 240,
		current = 1,
		totalWidth,
		loc,
		direction,
		custom = {
			init: function () {
				custom.calcInit();

				console.log('len:' + contLen + '  current:' + current);

				buttonsNav.find('a:first-child').hide();

				buttonsNav.find('a').on('click', this.carousel);
				buttonsDel.on('click', this.deleteGoods);
				$(window).scroll(this.scrollFixed);
				$('div.checkboxs>input').on('change', this.editRows);
				
			},

			calcInit: function () {
				contLen = $('div.goods').length;

				contLen < 2 ? buttonsNav.find('a').hide(): buttonsNav.find('a').show();
				
				if (contLen > 3) {
					contLen -= 3;
				}

				totalWidth = contLen * contWidth;
				
			},

			carousel: function ( e ) {
				e.preventDefault();

				direction = $(this).data('dir'),
				loc = contWidth;

				(direction === 'next') ? ++current : --current; //update current value

				custom.transition(sliderUl, loc, direction);
				custom.transition(sliderUl2, loc, direction);
				custom.lenControl();
			},

			transition: function ( container, loc, direction ) {
				var unit; // -= +=

				if (direction && loc !== 0 ) {
					unit = (direction === 'next') ? '-=' : '+=';
				};

				console.log('animate');
				container.animate({
					'left': unit ? (unit + loc) : loc
				});
			},

			lenControl: function () {
				if ( current === contLen ) {
					buttonsNav.find('a:last-child').hide();
				} else if ( current === 1 ) {
					buttonsNav.find('a:first-child').hide();
				} else if ( (current > 1)&&(current < contLen) ) {
					buttonsNav.find('a:first-child').show();
					buttonsNav.find('a:last-child').show();
				}
			},

			editRows: function () {
				if ($('#radio1').is(':checked')) {
					$('#radio2')[0].checked = false;;
					$('#radio1')[0].checked = true;
					$('.compare__row').show()
				} else {
					$('#radio1')[0].checked = false;;
					$('#radio2')[0].checked = true;
					$('.compare__row').hide()
				};
				
			},

			deleteGoods: function ( e ) {
				e.preventDefault();

				var elem = $(this).parent('div').attr("class").replace(/goods /g, '');
				var rem = $('.'+elem).remove();

				custom.calcInit();

				console.log(rem);
			},

			scrollFixed: function () {
				console.log('scrollFixed')

				if ($(window).scrollTop()>$(".compare__head").height()+70){
					$(".compare__head").addClass("fixed");
				} else {
					$(".compare__head").removeClass("fixed");
				};
			}

		};
		custom.init();
	};

	
comparePage();



	// console.log("work");
	// var sliderUl = $('.compare__carousel>table'),
	// 	sliderUl2 = $('.compare__wrap'),
	// 	// imgs = sliderUl.find('td'),
	// 	imgWidth = 240,
	// 	imgsLen = 4,
	// 	current = 1,
	// 	totalImgsWidth = 4 * 240;

	// 	$('div.compare__nav').find('a:first-child').hide();

	// $(window).scroll(function(){
 //  	if ($(window).scrollTop()>$(".compare__head").height()+70){
 //            $(".compare__head").addClass("fixed");
 //        }
 //        else
 //        {
 //            jQuery(".compare__head").removeClass("fixed");
 //        }
 //    });


		
	// $('div.compare__nav').find('a').on('click', function(e) {
	// 	e.preventDefault();
	// 	var direction = $(this).data('dir'),
	// 		loc = imgWidth;

	// 	(direction === 'next') ? ++current : --current; //update current value
		

	// 	transition(sliderUl, loc, direction);
	// 	transition(sliderUl2, loc, direction);
	// 	LenControl();
	// });

	// function transition( container, loc, direction ) {
	// 	var unit; // -= +=

	// 	if (direction && loc !== 0 ) {
	// 		unit = (direction === 'next') ? '-=' : '+=';
	// 	};
	// 	container.animate({
	// 		'left': unit ? (unit + loc) : loc
	// 	});

		
	// }

	// function LenControl () {
	// 	console.log("current:" + current);
	// 	if ( current === imgsLen ) {
	// 		$('div.compare__nav').find('a:last-child').hide();
	// 	} else if ( current === 1 ) {
	// 		$('div.compare__nav').find('a:first-child').hide();
	// 	} else if (  (current > 1)&&(current < imgsLen) ) {
	// 		$('div.compare__nav').find('a:first-child').show();
	// 		$('div.compare__nav').find('a:last-child').show();
	// 	}
	// }
});