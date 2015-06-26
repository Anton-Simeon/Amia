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
    var $categoriesDropdown = $('.categories-dropdown');

    $categoriesDropdown.each(function(index, element) {
      var liVar = $(element);
      $(element).find('>li').not('.view-link, .view-category-item').slice(0,5).addClass('visible-element');
       liVar.find('>li').slice(0,5).addClass('visible-element');
       liVar.children().children('.second-categories-list.active').parent().parent().children(':not(.view-second-level)').css('display', 'list-item');
       liVar.children().children('.second-categories-list.active').parent().parent().children('.view-second-level').css('display', 'none');
    });

    $categoriesDropdown.each(function(index,element) {
        var visibleCount = $(element).find('>.visible-element').length;
        if(visibleCount < 5) {
            $(element)
                .find('.view-link')
                .hide()
            ;
        }
    });

    $('.view-second-level').click(function(e) {
        e.preventDefault();
        $(this).closest('.categories-dropdown-menu').find('>li').show();
        $(this).css('display','none');
        $(this).closest('.categories-dropdown-menu').find('>.hide-second-level').css('display','block');
    });
    $('.hide-second-level').click(function(e) {
        e.preventDefault();
        $(this).closest('.categories-dropdown-menu').find('>li').not('.visible-element, .view-category-item').hide();
        $(this).css('display','none');
        $(this).closest('.categories-dropdown-menu').find('>.view-second-level').css('display','block');
    });

    $('.second-categories-dropdown').each(function(index, element) {
       $(element).find('>li').slice(0,5).addClass('visible-element');
    });
    $('.view-third-level').click(function(e) {
        e.preventDefault();
        $(this).closest('.second-categories-dropdown').find('>li').show();
        $(this).css('display','none');
        $(this).closest('.second-categories-dropdown').find('>.hide-third-level').css('display','block');
    });
    $('.hide-third-level').click(function(e) {
        e.preventDefault();
        $(this).closest('.second-categories-dropdown').find('>li').not('.visible-element').hide();
        $(this).css('display','none');
        $(this).closest('.second-categories-dropdown').find('>.view-third-level').css('display','block');
    });

    $('.third-categories-dropdown').each(function(index, element) {
        $(element).find('>li').slice(0,5).addClass('visible-element');
    });
    $('.view-fourth-level').click(function(e) {
        e.preventDefault();
        $(this).closest('.third-categories-dropdown').find('>li').show();
        $(this).css('display','none');
        $(this).closest('.third-categories-dropdown').find('>.hide-fourth-level').css('display','block');
    });
    $('.hide-fourth-level').click(function(e) {
        e.preventDefault();
        $(this).closest('.third-categories-dropdown').find('>li').not('.visible-element').hide();
        $(this).css('display','none');
        $(this).closest('.third-categories-dropdown').find('>.view-fourth-level').css('display','block');
    });

    $('.categories-item').click(function(e) {
        var $this = $(this),
            $thisClosestArticle = $this.closest('.categories-article');

        e.preventDefault();
        e.stopPropagation();
        if (tapFlag) return;

        tapFlag = true;
        $this
            .toggleClass('active')
        ;
        $thisClosestArticle
            .toggleClass('active')
            .find('.categories-dropdown-menu')
            .slideToggle(animateDuration)
        ;

        setTimeout(function () {
            tapFlag = false;
        }, 500);
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
        grid: true
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
    $('.slider-wrap').jcarousel();

    $('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
    });

    $('.middle-content .top-list-item').hover(function () {
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

        console.log($selectableOption);

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

});
