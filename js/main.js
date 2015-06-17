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
				$('#restart').hide();

				custom.calcInit();
				
				buttonsNav.find('a').on('click', this.carousel);
				buttonsDel.on('click', this.deleteGoods);
				$(window).scroll(this.scrollFixed);
				$('div.checkboxs>input').on('change', this.editRows);
				$('#restart').on('click', this.restart);

				$('.navbar:not(:last-child)').hover(
					function() {
						var $this = $(this);
						$(this).addClass('active');
						$('.' + $this.data('submenu')).show()
					},
					function() {
						var $this = $(this);
						$(this).removeClass('active');
						$('.' + $this.data('submenu')).hide()

				});
			},

			calcInit: function () {
				contLen = $('div.goods:not(.goods__hide)').length;
				
				if (current <= 0) {current = 1};
				if (contLen === 2) {
					$( '*[class*="item_"]:not(.goods__hide)' ).css({'width': 360 });

					custom.startPosition();
				} else {
					$( '*[class*="item_"]' ).css({'width': 240 });
				};
				contLen <= 2 ? contLen = 1 : contLen -= 2;
				
				custom.lenControl();				
			},

			startPosition: function () {
				custom.transition(sliderUl, 0, 'prev');
				custom.transition(sliderUl2, 0, 'prev');
				current = 1;
			},

			restart: function ( e ) {
				e.preventDefault();

				$('.goods__hide').show().removeClass('goods__hide');
				$('#restart').hide();

				custom.startPosition();
				custom.calcInit();				
			},

			carousel: function ( e ) {
				e.preventDefault();

				console.log('carousel');

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

				container.animate({
					'left': unit ? (unit + loc) : loc
				});
			},

			lenControl: function () {
				console.log('len:' + contLen + '  current:' + current);

				if ( (current === contLen)&&(current !== 1)||(current > contLen) ) {

					buttonsNav.find('a:first-child').show();
					buttonsNav.find('a:last-child').hide();
					
				} else if ( (current === 1)&&(current < contLen) ) {

					buttonsNav.find('a:first-child').hide();
					buttonsNav.find('a:last-child').show();	

				} else if ( (current > 1)&&(current < contLen) ) {
					
					buttonsNav.find('a').show();

				} else if (contLen === 1) {

					buttonsNav.find('a').hide();
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

				var elem = $(this).parent('div').attr("class").replace(/goods /g, ''),
					rem = $('.'+elem).hide().addClass('goods__hide');

				custom.calcInit();

				$('#restart').show();
			},

			scrollFixed: function () {
				if ($(window).scrollTop()>$(".compare__head").height()+70){
					$(".compare__head").addClass("fixed");
				} else {
					$(".compare__head").removeClass("fixed");
				};
			}

			// mainMenu: function () {
			// 	$('div.submenu').hide()
			// }

		};
		custom.init();
	};
	comparePage();
});