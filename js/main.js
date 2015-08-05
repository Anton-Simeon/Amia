jQuery(function ($) {


		//region ===== Variables =====
		var animateDuration = 600,
				tapFlag = false,
				mainCategoryListHeight,
				$sameHeightCatItem = $('[data-same-height="cat-item"]');

		//endregion

		//region ===== BasketSLide =====
		$('.basket').click( function(e) {
				var $this = $(this);
				e.preventDefault();
				e.stopPropagation();
				if (tapFlag) return;

				tapFlag = true;
				$this.toggleClass('active');
				$('.open-basket').slideToggle(300);
				$('.basket-overlay').toggle(300);
				setTimeout(function () {
						tapFlag = false;
				}, 500);
		});
		$('.basket-overlay').click(function() {
			 $('.open-basket').slideUp();
			 $('.basket').removeClass('active');
			 $('.basket-overlay').hide();
		});
		//endregion
		//region ===== ContentViewCategory DropDown =====
		var $categoryTags = $('.top-list .tags-list');

		$categoryTags.each(function(index, element) {
				$(element).find('>li').slice(0,4).addClass('visible-element');
		});

		$categoryTags.each(function(index,element) {
				var visibleCount = $(element).find('>.visible-element').length;
				if(visibleCount < 4) {
						$(element)
								.closest('.item-wrap')
								.find('.view-all')
								.hide()
						;
				}
		});
		$('.item-wrap .view-all').click(function(e) {
				var $this = $(this);
				e.preventDefault();
				$this
						.closest('.item-wrap')
						.find('li')
						.show()
				;
				$this.hide();
				$this
						.closest('.item-wrap')
						.find('.hide-tags-items')
						.show()
				;
				$sameHeightCatItem.height('auto');
				maintainSameHeight($sameHeightCatItem);
		});
		$('.item-wrap .hide-tags-items').click(function(e) {
			 var $this = $(this);
				e.preventDefault();
				$this
						.closest('.item-wrap')
						.find('li')
						.not('.visible-element')
						.hide()
				;
				$this.hide();
				$this
						.closest('.item-wrap')
						.find('.view-all')
						.show()
				;
				$sameHeightCatItem.height('auto');
				maintainSameHeight($sameHeightCatItem);
		});
		//endregion

		//region ===== SidebarDropdownMenu =====
		// var $categoriesDropdown = $('.categories-dropdown');

		// $categoriesDropdown.each(function(index, element) {
		// 	var liVar = $(element);
		// 	$(element).find('>li').not('.view-link, .view-category-item').slice(0,5).addClass('visible-element');
		// 	 liVar.find('>li').slice(0,5).addClass('visible-element');

		// 	 lengthLi = liVar.children().children('.second-categories-list.active').parent().prevAll().length;

		// 	 if(lengthLi > 5){

		// 	 }else{

		// 	 }




		// });

		// $categoriesDropdown.each(function(index,element) {
		// 		var visibleCount = $(element).find('>.visible-element').length;
		// 		if(visibleCount < 5) {
		// 				$(element)
		// 						.find('.view-link')
		// 						.hide()
		// 				;
		// 		}
		// });

		// $('.view-second-level').click(function(e) {
		// 		e.preventDefault();
		// 		$(this).closest('.categories-dropdown-menu').find('>li').show();
		// 		$(this).css('display','none');
		// 		$(this).closest('.categories-dropdown-menu').find('>.hide-second-level').css('display','block');
		// });
		// $('.hide-second-level').click(function(e) {
		// 		e.preventDefault();
		// 		$(this).closest('.categories-dropdown-menu').find('>li').not('.visible-element, .view-category-item').hide();
		// 		$(this).css('display','none');
		// 		$(this).closest('.categories-dropdown-menu').find('>.view-second-level').css('display','block');
		// });

		// $('.second-categories-dropdown').each(function(index, element) {
		// 	 $(element).find('>li').slice(0,5).addClass('visible-element');
		// });
		// $('.view-third-level').click(function(e) {
		// 		e.preventDefault();
		// 		$(this).closest('.second-categories-dropdown').find('>li').show();
		// 		$(this).css('display','none');
		// 		$(this).closest('.second-categories-dropdown').find('>.hide-third-level').css('display','block');
		// });
		// $('.hide-third-level').click(function(e) {
		// 		e.preventDefault();
		// 		$(this).closest('.second-categories-dropdown').find('>li').not('.visible-element').hide();
		// 		$(this).css('display','none');
		// 		$(this).closest('.second-categories-dropdown').find('>.view-third-level').css('display','block');
		// });

		// $('.third-categories-dropdown').each(function(index, element) {
		// 		$(element).find('>li').slice(0,5).addClass('visible-element');
		// });
		// $('.view-fourth-level').click(function(e) {
		// 		e.preventDefault();
		// 		$(this).closest('.third-categories-dropdown').find('>li').show();
		// 		$(this).css('display','none');
		// 		$(this).closest('.third-categories-dropdown').find('>.hide-fourth-level').css('display','block');
		// });
		// $('.hide-fourth-level').click(function(e) {
		// 		e.preventDefault();
		// 		$(this).closest('.third-categories-dropdown').find('>li').not('.visible-element').hide();
		// 		$(this).css('display','none');
		// 		$(this).closest('.third-categories-dropdown').find('>.view-fourth-level').css('display','block');
		// });

		// $('.categories-item').click(function(e) {
		// 		var $this = $(this),
		// 				$thisClosestArticle = $this.closest('.categories-article');

		// 		e.preventDefault();
		// 		e.stopPropagation();
		// 		if (tapFlag) return;

		// 		tapFlag = true;
		// 		$this
		// 				.toggleClass('active')
		// 		;
		// 		$thisClosestArticle
		// 				.toggleClass('active')
		// 				.find('.categories-dropdown-menu')
		// 				.slideToggle(animateDuration)
		// 		;

		// 		setTimeout(function () {
		// 				tapFlag = false;
		// 		}, 500);
		// });

		$('.categories-article ul').each(function(){
			var thisUl = $(this);
			if(thisUl.children().length > 7){

				thisUl.children().slice(0,5).addClass('visible-element');

				var viewLi = thisUl.children();

				viewLi.children('.view-all').parent().show();

			}else {
				thisUl.children(':last-child').prev().prevAll().addClass('visible-element');
			}
		});

		$('.categories-article ul a.active').each(function(){
			var thisUlActive = $(this);
			var thisUlActiveLenght = thisUlActive.parent().prevAll().length;
			if(thisUlActiveLenght > 4){
				thisUlActiveLenght = thisUlActive.parent().parent().children(':last-child').prev().prevAll(':not(.visible-element)').show();
				thisUlActiveLenght = thisUlActive.parent().parent().children(':last-child').show();
				thisUlActiveLenght = thisUlActive.parent().parent().children(':last-child').prev().hide();
			}
		});

		 
		$('.categories-article > a').click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active').next().slideUp();
			}else{
				$(this).addClass('active').next().slideDown();
			}
			return false
		});

		$('.categories-wrap .view-all').click(function(){
			var viewAll = $(this);
			viewAll.parent().next().show();
			viewAll.parent().hide();
			viewAll.parent().prevAll(':not(.visible-element)').show();
			return false
		});

		$('.categories-wrap .hide-all').click(function(){
			var hideAll = $(this);
			hideAll.parent().prev().show();
			hideAll.parent().hide();
			hideAll.parent().prev().prevAll(':not(.visible-element)').hide();
			return false
		});



		//$('.second-categories-list').click(function(e) {
		//    var $this = $(this);
		//
		//    e.preventDefault();
		//    e.stopPropagation();
		//    if (tapFlag) return;
		//
		//    tapFlag = true;
		//    $this.toggleClass('active');
		//    $this
		//        .siblings()
		//        .slideToggle(animateDuration)
		//    ;
		//    setTimeout(function () {
		//        tapFlag = false;
		//    }, 500);
		//});


		//$('.third-categories-list').click(function(e) {
		//    var $this = $(this);
		//
		//    e.preventDefault();
		//    e.stopPropagation();
		//    if (tapFlag) return;
		//
		//    tapFlag = true;
		//    $this.toggleClass('active');
		//    $this
		//        .siblings()
		//        .slideToggle(animateDuration)
		//    ;
		//    setTimeout(function () {
		//        tapFlag = false;
		//    }, 500);
		//});

		$('.filter-item h3').click( function() {
				var $this = $(this),
						$thisClosestfilter = $this.closest('.filter-item');
				if(tapFlag) return;

				tapFlag = true;
				$thisClosestfilter
						.toggleClass('active')
						.find('.checkbox-wrap')
						.slideToggle(animateDuration)
				;
				setTimeout(function () {
						tapFlag = false;
				}, 500)
		});

		$('.filter-title.open').click(function() {
				var $this = $(this);
				if (tapFlag) return;

				tapFlag = true;

				$this.hide();
				$('.filter-title.close-all').show();
				$('.filter-item, .price-title, .ratings-title').addClass('active');
				$('.checkbox-wrap, .rating-wrap, .ironslider-wrap')
						.slideDown(animateDuration)
				;

				setTimeout(function () {
						tapFlag = false;
				}, 500);
		});
		$('.filter-title.close-all').click(function() {
				var $this = $(this);
				if (tapFlag) return;

				tapFlag = true;

				$this.hide();
				$('.filter-title.open').show();
				$('.filter-item, .price-title, .ratings-title').removeClass('active');
				$('.checkbox-wrap, .rating-wrap, .ironslider-wrap')
						.slideUp(animateDuration)
				;

				setTimeout(function () {
						tapFlag = false;
				}, 500);
		});

		$('.sidebar h2').click(function () {
				var $this = $(this);
				if (tapFlag) return;

				tapFlag = true;

				$this
						.toggleClass('active')
						.siblings()
						.slideToggle(animateDuration)
				;
				setTimeout(function () {
						tapFlag = false;
				}, 500);
		});

		//endregion

		//region ===== HeaderSlidePanel =====
		$('.glyphicon-align-justify').click(function() {
				$('.sub-panel').slideToggle();
		});
		//endregion

		//region ===== IronRangeSlider =====
		$("#price-range").ionRangeSlider({
				hide_min_max: true,
				keyboard: true,
				min: 6,
				max: 615,
				from: 6,
				to: 615,
				type: 'double',
				step: 1,
				prefix: "€",
				grid: true,
				onFinish:function(){
					$("#select-pagination").val("1");
					LoadCategoryProducts();
				}
		});
		//endregion

	 // //region ===== ContentHideEffect =====
	 //$(window).resize(checkliElementsCount);
	 //
	 //
	 // checkliElementsCount();
	 //
	 //
	 // function checkliElementsCount() {
	 //     var $liElements = $('.top-list .top-list-item'),
	 //         $viewButton = $('.view-more'),
	 //         $hiddenButton = $('.hidden-button'),
	 //         $topList = $('.top-list');
	 //
	 //     if(screen.width >= 1200) {
	 //         if($liElements.length > 8) {
	 //             $viewButton.css('display','inline-block');
	 //
	 //             $viewButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $hiddenButton.css('display','inline-block');
	 //                 $topList.css('height','auto');
	 //             });
	 //
	 //             $hiddenButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $viewButton.css('display','inline-block');
	 //                 $topList.css('height', mainCategoryListHeight+10);
	 //             });
	 //         }
	 //     }
	 //     if(screen.width >= 992 && screen.width < 1200) {
	 //         if($liElements.length > 6) {
	 //             $viewButton.css('display','inline-block');
	 //
	 //             $viewButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $hiddenButton.css('display','inline-block');
	 //                 $topList.css('height','auto');
	 //             });
	 //
	 //             $hiddenButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $viewButton.css('display','inline-block');
	 //                 $topList.css('height', mainCategoryListHeight+10);
	 //             });
	 //         }
	 //     }
	 //     if(screen.width >= 421 && screen.width < 992) {
	 //         if($liElements.length > 4) {
	 //             $viewButton.css('display','inline-block');
	 //
	 //             $viewButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $hiddenButton.css('display','inline-block');
	 //                 $topList.css('height','auto');
	 //             });
	 //
	 //             $hiddenButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $viewButton.css('display','inline-block');
	 //                 $topList.css('height', mainCategoryListHeight+10);
	 //             });
	 //         }
	 //     }
	 //     if(screen.width < 421) {
	 //         if($liElements.length > 2) {
	 //             $viewButton.css('display','inline-block');
	 //
	 //             $viewButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $hiddenButton.css('display','inline-block');
	 //                 $topList.css('height','auto');
	 //             });
	 //
	 //             $hiddenButton.click(function(e) {
	 //                 e.preventDefault();
	 //
	 //                 $(this).hide();
	 //                 $viewButton.css('display','inline-block');
	 //                 $topList.css('height', mainCategoryListHeight+10);
	 //             });
	 //         }
	 //     }
	 // }
	 //
	 //
	 // //endregion

		//region ===== RatingStar =====
		$('#rating, #rating2, #rating3, #rating4, #rating5, #rating6, #rating7, #rating8').rating({
				fx: 'half',
				image: 'images/stars.png',
				loader: 'images/ajax-loader.gif',
				width: 13,
				url: 'rating.php'
		});
		//endregion

		//region ===== SidebarSLide =====
		$('.glyphicon-chevron-right').click(function() {
				$(this).hide();
				$('.sidebar').addClass('active');
				$('.glyphicon-chevron-left').show().animate({'left': '240px'}, 800);
				$('.overlay').show();
		});
		$('.glyphicon-chevron-left, .overlay').click(function() {
				$('.glyphicon-chevron-left').hide();
				$('.sidebar').removeClass('active');
				$('.glyphicon-chevron-right').show().animate({'left':'0'}, 800);
				$('.overlay').hide();
		});

		//endregion

		//region ===== scrollTop =====
		$('.glyphicon-menu-up').click(function(){
				$("body, html").animate({scrollTop:0},"slow");
		});
		//endregion

		//region ===== RecentSLider =====
		$(".recent-slider").owlCarousel({

				navigation : true, // показывать кнопки next и prev
				pagination : false,

				slideSpeed : 300,
				paginationSpeed : 400,

				items : 4,
				itemsDesktop : [1199,3],
				itemsDesktopSmall : [979,2],
				itemsTablet : false,
				itemsMobile : false


		});
		//endregion

		//region ===== SeoSlide =====
		$('.view-seo').click(function(e) {
				e.preventDefault();

				$(this).hide();
				$('.hidden-block, .hide-seo').show();
		});

		$('.hide-seo').click(function(e) {
				e.preventDefault();
				$(this).hide();
				$('.hidden-block').hide();
				$('.view-seo').show();
		});
		//endregion

		//region ===== itemListSlider =====

		$('.slider-wrap:not(.mobile-owl)').jcarousel();
		$('.slider-wrap:not(.mobile-owl) .jcarousel-prev').jcarouselControl({
				target: '-=1'
		});

		$('.slider-wrap:not(.mobile-owl) .jcarousel-next').jcarouselControl({
				target: '+=1'
		});





		var bodyWidthVar = $('body').width();
		if (bodyWidthVar > 1030){
			$('.slider-wrap.mobile-owl').jcarousel();
			$('.slider-wrap.mobile-owl .jcarousel-prev').jcarouselControl({
					target: '-=1'
			});

			$('.slider-wrap.mobile-owl .jcarousel-next').jcarouselControl({
					target: '+=1'
			});

			$('.middle-content .top-list-item').hover(function () {
				$(this).find('.slider-wrap').jcarousel('reload', {
						vertical: true
				});
			});

		}else {
			$(".mobile-owl .carouselv").owlCarousel({

				navigation : true, // показывать кнопки next и prev
				pagination : false,

				slideSpeed : 300,
				paginationSpeed : 400,

				items : 4,
				itemsDesktop : [991,5],
				itemsDesktopSmall : [850,4],
				itemsTablet : false,
				itemsMobile : false

			});
		}

		












		$('.top-list-item-style .one-slide').hover(function () {
			$(this).find('.slider-wrap').jcarousel('reload', {
					vertical: true
			});
		});


		$('.carouselv a').hover(function ( e ) {
				e.preventDefault();

				var $this = $(this),
						currentImgSrc = $this.find('img').attr('src');

				$this
						.closest('.top-list-item')
						.find('.item-info-wrap .img-wrap img')
						.attr("src", currentImgSrc)
				;
		});
		$('.carouselv a').click(function ( e ) {
				e.preventDefault();

				var $this = $(this),
						currentImgSrc = $this.find('img').attr('src');

				$this
						.closest('.top-list-item')
						.find('.item-info-wrap .img-wrap img')
						.attr("src", currentImgSrc)
				;
		});
		//endregion

		//region ===== MOdalSign =====
		$('.sign-in').click(function(e) {
				e.preventDefault();
				$('.modal-log').show().animate({'top':'50%'}, 800);
				$('.overlay').show();
		});

		$('.overlay, .glyphicon-remove').click(function() {
			 $('.modal-log').hide().css('top','0');
			 $('.overlay').hide();
		});
		//endregion

		//region ===== DisplayDropdownPagination =====
		$('.pagination-section a').click(function(e) {
				e.preventDefault();

				var $this = $(this),
						$selectedOption = $("#select-pagination").find("option:selected"),
						$selectableOption;

				if ($this.hasClass("prev")) {
						$selectableOption = $selectedOption.prev();
				} else {
						$selectableOption = $selectedOption.next();
				}


				$selectableOption.prop("selected", true);
		});
		var optionsCount = $("#select-pagination option").length;

		$("#select-pagination option").each(function (index, element) {
				var elementLabel = element.innerHTML;

				element.innerHTML = elementLabel + "/" + optionsCount;
		});

		//endregion

		//region ===== MainCarousel =====
		$("#main-slider").owlCarousel({

				navigation : false, // Show next and prev buttons
				slideSpeed : 600,
				stopOnHover: true,
				paginationSpeed : 800,
				singleItem: true,
				autoPlay: 4000,
				pagination: false


				// "singleItem:true" is a shortcut for:
				// items : 1,
				// itemsDesktop : false,
				// itemsDesktopSmall : false,
				// itemsTablet: false,
				// itemsMobile : false

		});
		//endregion


		//region ===== SameHeight =====
		maintainSameHeight($sameHeightCatItem);
		HorizontalSameHeight($('[data-same-height="horizontal-menu-item"]'));

		function maintainSameHeight($list) {
				var height = 0;

				$list.each(function () {
						var $this = $(this);
						if ($this.outerHeight() > height) {
								height = $this.outerHeight();
						}
				});

				$list.css("height", height);
				//mainCategoryListHeight = height*2+20;
				//$(".main-top-content .top-list, .top-content .top-list").height(mainCategoryListHeight);
		}


		function HorizontalSameHeight($list) {
				var height = 0;

				$list.each(function () {
						var $this = $(this);
						if ($this.outerHeight() > height) {
								height = $this.outerHeight();
						}
				});

				$list.css("height", height);
		}


		////region ===== onloadModal =====
		//
		//$(document).ready(function() {
		//   setTimeout ("$('.onload-modal').fadeIn(500);", 800);
		//   $('.ok').click(function(e) {
		//       e.preventDefault();
		//       $('.onload-modal').hide();
		//   });
		//});
		//
		////endregion


		//region ===== discountSlider =====
		$("#discount-slider").owlCarousel({
				pagination: false,
				navigation: true,

				items : 4,
				itemsDesktop : [1199,3],
				itemsDesktopSmall : [979,3],
				itemsMobile: [479,1]

		});
		//endregion

		$('.filter .input-wrap input').removeAttr('checked');
		$('.btn-category').click(function(){
				$(this).parent().toggleClass('open');
				$('.content-menu').slideToggle(400);
		});

		$(document).ready(function(){
			$("#quantity").keypress(function (e)  
				{ 
					$("#errmsg").html($("#quantity").val());     
				});
		

		});


	function positionCursor(){

		$('#call').val('+371-  -   -   ');

		var valLenghtInput, keyNumber; 

		var keyVal = true;

		// add-position-cursor

		function setSelectionRange(input, selectionStart, selectionEnd) {
		  if (input.setSelectionRange) {
		    input.focus();
		    input.setSelectionRange(selectionStart, selectionEnd);
		  }
		  else if (input.createTextRange) {
		    var range = input.createTextRange();
		    range.collapse(true);
		    range.moveEnd('character', selectionEnd);
		    range.moveStart('character', selectionStart);
		    range.select();
		  }
		}
	 
		function setCaretToPos (input, pos) {
		  setSelectionRange(input, pos, pos);
		}

		// END add-position-cursor



		function getCaretPos(obj){

		 if(obj.selectionStart) return obj.selectionStart;
			 else if (document.selection){

				var sel = document.selection.createRange();
				var clone = sel.duplicate();
				sel.collapse(tru);
				clone.moveToElementText(obj);
				clone.setEndPoint('EndToEnd', sel);

				return clone.text.length;

			 }

		 return 0;
		}

		function cleanForm() {
			valLenghtInput = getCaretPos(document.getElementById('call'));
		}

		if ($('#call').length>0)
		{
			var calVal = $('#call').val().replace(/ /g,"");
			$('#call-hidden').val(calVal);
		}

		$('#call').click(function() {
		  	cleanForm();
			$('.position-key').css('background', '#f00');	


		  	if(valLenghtInput < 5){
				setCaretToPos(document.getElementById("call"), 5);
				$('.position-key1').css('background', '#00f');
			}
		  	if(valLenghtInput > 6 && valLenghtInput < 9){
				setCaretToPos(document.getElementById("call"), 8);
				$('.position-key3').css('background', '#00f');
			}
		  	if(valLenghtInput > 10 && valLenghtInput < 13){
				setCaretToPos(document.getElementById("call"), 12);	
				$('.position-key6').css('background', '#00f');
			}
		  	if(valLenghtInput > 14){
				setCaretToPos(document.getElementById("call"), 14);	
				$('.position-key8').css('background', '#00f');
			}

			keyStatic();

		});

		function keyStatic(){
			if(valLenghtInput == 5){
				$('.position-key1').css('background', '#00f');
			}
			if(valLenghtInput == 6){
				$('.position-key2').css('background', '#00f');
			}
	
			if(valLenghtInput == 8){
				$('.position-key3').css('background', '#00f');
			}
			if(valLenghtInput == 9){
				$('.position-key4').css('background', '#00f');
			}
	
			if(valLenghtInput == 10){
				$('.position-key5').css('background', '#00f');
			}
			if(valLenghtInput == 12){
				$('.position-key6').css('background', '#00f');
			}

			if(valLenghtInput == 13){
				$('.position-key7').css('background', '#00f');
			}
			if(valLenghtInput == 14){
				$('.position-key8').css('background', '#00f');
			}
		}
		

		function funKeydown(){
			cleanForm();
			$('.position-key').css('background', '#f00');
			setTimeout(keyStatic(), 100);

		}

		var keyVal = true;

		var key;

		var a = 1;


		$('#call').keydown(function(e) {
			
			
			
			

			if(keyVal){

					
		  			
		            key = e.charCode || e.keyCode || 0;

				
					funKeydown();

				  	if (key == 39) {

		        		if(valLenghtInput == 6 || valLenghtInput == 10 || valLenghtInput == 14){
		        			setCaretToPos(document.getElementById("call"), valLenghtInput + 1);
		        		}else if(valLenghtInput > 14){
		        			return false
		        		}
		    		}
		    		if (key == 37) {
		        		if(valLenghtInput == 8 || valLenghtInput == 12){
		        			setCaretToPos(document.getElementById("call"), valLenghtInput - 1);
		        		}else if(valLenghtInput < 6){
		        			return false
		        		}
		    		}
		    		if (key == 8) {

		        		if(valLenghtInput == 8 || valLenghtInput == 12){

		        			var valKey = $(this).val();
			    			cleanForm();
			    			valKey2 = valKey.length;
			    			valLenghtOld = valLenghtInput;
			    			valKeyStart = valKey.slice(0, valLenghtInput - 2);

			    			valKeyEnd = valKey.slice(valLenghtOld, valKey2);
			    			$(this).val(valKeyStart + ' -' + valKeyEnd);

			    			setCaretToPos(document.getElementById("call"), valLenghtInput - 2);

			    			keyVal = false;

			    			return false

		        		}else if(valLenghtInput > 5){

		        			var valKey = $(this).val();
			    			cleanForm();
			    			valKey2 = valKey.length;
			    			valLenghtOld = valLenghtInput;
			    			valKeyStart = valKey.slice(0, valLenghtInput - 1);

			    			valKeyEnd = valKey.slice(valLenghtOld, valKey2);
			    			$(this).val(valKeyStart + ' ' + valKeyEnd);

			    			setCaretToPos(document.getElementById("call"), valLenghtInput - 1);

			    			keyVal = false;

			    			return false

		        		}else{

		        			return false

		        		}

		    		}

		    		if( (key >= 48 && key <= 57) || (key >= 96 && key <= 105)){
		    			if(valLenghtInput == 6 || valLenghtInput == 10){

		    				if(key == 48 || key == 96){
		    					keyNumber = 0;
		    				}
		    				if(key == 49 || key == 97){
		    					keyNumber = 1;
		    				}
		    				if (key == 50 || key == 98){
		    					keyNumber = 2;
		    				}
		    				if (key == 51 || key == 99){
		    					keyNumber = 3;
		    				}
		    				if (key == 52 || key == 100){
		    					keyNumber = 4;
		    				}
		    				if (key == 53 || key == 101){
		    					keyNumber = 5;
		    				}
		    				if (key == 54 || key == 102){
		    					keyNumber = 6;
		    				}
		    				if (key == 55 || key == 103){
		    					keyNumber = 7;
		    				}
		    				if (key == 56 || key == 104){
		    					keyNumber = 8;
		    				}
		    				if (key == 57 || key == 105){
		    					keyNumber = 9;
		    				}
		    				
			    			var valKey = $(this).val();
			    			cleanForm();
			    			valKey2 = valKey.length;
			    			valLenghtOld = valLenghtInput + 1;
			    			valKeyStart = valKey.slice(0, valLenghtInput);
			    			valKeyEnd = valKey.slice(valLenghtOld, valKey2);
			    			$(this).val(valKeyStart + keyNumber + valKeyEnd);

			    			setCaretToPos(document.getElementById("call"), valLenghtInput + 2);

			    			keyVal = false;

			    			return false
		    			}else if(valLenghtInput < 15){
		    				var valKey = $(this).val();
			    			cleanForm();
			    			valKey2 = valKey.length;
			    			valLenghtOld = valLenghtInput + 1;
			    			valKeyStart = valKey.slice(0, valLenghtInput);
			    			valKeyEnd = valKey.slice(valLenghtOld, valKey2);
			    			$(this).val(valKeyStart + valKeyEnd);

			    			setCaretToPos(document.getElementById("call"), valLenghtInput);

			    			keyVal = false;
		    			}else {
		    				return false
		    			}

	    					
		    		}else {
		    			 return (
			                key == 8 || 
			                key == 9 ||
			                key == 46 ||
			                (key >= 37 && key <= 40));
		    		}

		    	keyVal = false;

	    	}else {
	    		return false
	    	}






		});


	 	function keyValTrue() {
			keyVal = true;
		};


		$('#call').keyup(function(e) {
			keyValTrue();
			var calVal = $('#call').val().replace(/ /g,"");
			$('#call-hidden').val(calVal);
		});


	}



	positionCursor();





	/* product */

	if($('.wrapper-scroll').length != 0){
		$('.wrapper-scroll').baron({
	    	scroller: '.scroller',
	    	container: '.container-scroll',
	    	bar: '.scroller__bar'
		});
	}

	var colLiActive, colLiActivePrev, colLiLastActive;

	$('.rating-hover li').hover(function() {
		
    	$(this).addClass("active-hover");
    	$(this).prevAll().addClass("active-hover");
    	$(this).nextAll().removeClass("active-hover");

  	}, function() {

  		$(this).parent().children().removeClass("active-hover");

  	});


  	$('.rating-hover li').click(function(){
  		$(this).addClass("active");
  		$(this).prevAll().addClass("active");
  		$(this).nextAll().removeClass("active");
  		return false
  	});

  	$('.top-list-item-style-horizontal .one-slide').hover(function(){
  		var bodyWidth = $('body').width();
  		if(bodyWidth > 1140){
	  		var oneSlideOffset = $(this).offset().left;
	  		var containerWidth = $('.container').width();
	  		var distance =  (bodyWidth - containerWidth) / 2;
	  		var distanceOneSlide = oneSlideOffset - distance;
	  		if (distanceOneSlide < 30){
	  			$('.top-list-item-style-horizontal').addClass('hide-arrow-left');
	  		}
  		}

  	}, function(){
  		$('.top-list-item-style-horizontal').removeClass('hide-arrow-left');
  	});


  	$('.coment-btn-wrap .buttonGray:first-child').click(function(){
  		$(this).hide();
  		$('.writeYourReview').show();
  	});

  	$('.coment-btn-wrap .buttonGray:nth-child(2)').click(function(){
  		$(this).hide();
  		$('.column-js').children().addClass('col-sm-6').removeClass('col-sm-12');
  		$('.say-friend').show();
  		
  	});


  	// product slider
  	function colorsizeFun(){

  		var valueAttrImg = $('#colorsizeimg .colorsizeimgselcolor > div > img + input').attr('value');
  		var titleAttrImg = $('#colorsizeimg .colorsizeimgselcolor > div > img').attr('title');

  		 $('.product_image_big img').attr('src', valueAttrImg);
  		 $('.color-select').text(titleAttrImg);

  	}
  	function colorsizeFunPrice(){
  		var newpriceText = $('#colorsizeimg .colorsizeimgselcolor').find('#newprice').text(); 
  		$('#gallery1 > *').remove();
  		$('#colorsizeimg .colorsizeimgselcolor + div > div').clone().appendTo($('#gallery1')); 
  		$('#gallery1 > div:first-child').addClass('active');
  		$('#actualPrice').text(newpriceText);
  		galleryFun();
  	}
  	colorsizeFunPrice();
  	colorsizeFun();
  	$('#colorsizeimg .content-scroll > div').click(function(){
  		$('#colorsizeimg .content-scroll > .colorsizeimgselcolor').removeClass('colorsizeimgselcolor').addClass('select_products_img');
  		$(this).removeClass('select_products_img').addClass('colorsizeimgselcolor');
 		colorsizeFun();
 		colorsizeFunPrice();
  	});
  	$('#colorsizeimg .content-scroll > div').hover(function(){
  		var valueAttrImg = $(this).find(' img + input').attr('value');
  		var titleAttrImg = $(this).find(' img').attr('title');

  		$('.product_image_big img').attr('src', valueAttrImg);
  		$('.color-select').text(titleAttrImg);

  	}, function(){
  		// colorsizeFun();
  		galleryActive();
  	});
  	function galleryActive(){
  		var valueImg = $('#gallery1 .active img').next().attr('value');
  		$('.product_image_big img').attr('src', valueImg);
  	}
  	function galleryFun(){
	  	$('#gallery1 a').click(function(){
	  		$('#gallery1 > div').removeClass('active');
	  		$(this).parent().addClass('active');
	  		galleryActive();
	  		return false
	  	});
  	}
  	// end product slider


  	// dropdown size
  	$('.dropdown-link').click(function(){
  		if($(this).hasClass('active')){
  			$(this).removeClass('active').next().hide();
  		}else{
  			$(this).addClass('active').next().show();
  		}
  	});

  	$(document).mouseup(function (e) {
	    var container = $('.dropdown-link.active + div');
	    var containerLink = $('.dropdown-link.active');
	    if (container.has(e.target).length === 0 && containerLink.has(e.target).length === 0){
	        container.hide().prev().removeClass('active');
	    }
	});

	// END dropdown size

	// dropdown sosial

  	$('#socialMore').click(function(){
  		if($(this).hasClass('active')){
  			$(this).removeClass('active');
  			$('#socialContainer').hide();
  		}else{
  			$(this).addClass('active');
  			$('#socialContainer').show();
  		}
  		return false
  	});

  	$(document).mouseup(function (e) {
	    var container = $('#socialContainer');
	    var containerLink = $('#socialMore.active');
	    if (container.has(e.target).length === 0 && containerLink.has(e.target).length === 0){
	        $('#socialMore').removeClass('active');
	        $('#socialContainer').hide();
	    }
	});

	// END dropdown sosial

	$('.navbar-toggle-menu').click(function(){
		$('.navbar-toggle-content').toggleClass('active');
	})

	/* END product */

	 $('.CountryInput.form-control').click(function () {
        $('#CountryList').slideToggle('fast');
        $(this).toggleClass('active');
    });


	$('#CountryList li').click(function () {
        var chooseCountry = $(this).text();
		var chooseId = $(this).prop("id");
        $('.CountryRow .CountryInput').text(chooseCountry);
		//$('.CountryRow input').val(chooseId);
		$('#CountryList').slideToggle('fast');
        $(this).toggleClass('active');
    });

});

$(window).load(function(){
	hiddenScroll();
});
$(window).resize(function(){
	hiddenScroll();
});


function hiddenScroll(){

	var heightContainerScroll =  $('.container-scroll').outerHeight();
	var heightContentScroll =  $('.content-scroll').outerHeight();

	if(heightContainerScroll >= heightContentScroll){
		$('.wrap-wrapper-scroll').addClass('hidden-scroll');
	}else {
		$('.wrap-wrapper-scroll').removeClass('hidden-scroll');
	}

}
