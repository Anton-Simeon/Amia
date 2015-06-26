	function ShowMessageDialog()
	{
		$("#MessageDialog").dialog({
			title: TitleMessageDialog,
			modal: true,
			draggable: true,
			buttons: [
				{
					
					text: "OK",
					click: function() {
						$( this ).dialog( "close" );
						$('.ui-dialog .ui-dialog-titlebar').css('display','none')
					}
				}
			]
		});
		$("#MessageDialog").css('padding','5px 10px');
		$("#MessageDialog").css('min-height','100px');
		$('.ui-dialog .ui-dialog-titlebar').css('display','block')
	}
	
	function FormatProductName(name)
	{
		if (name.length > 75)
		{
			name = name.substr(0,75);
			pos = name.indexOf(" ");
			//console.log(name);
			curpos=0
			while ( pos != -1 ) 
			{
			   pos = name.indexOf(" ",pos+1);
			   if ( pos != -1 ) curpos=pos;
				// console.log('step '+pos);
			}										
			if (curpos != 0)
			{
				name = name.substr(0, curpos) + "...";
			}	
		}	
		return name;
	}
	function checkUserInfo(showAlert) {
		var rnd = Math.random();
		var uri = "/" + langCode  + "/check_user_info.asp?rnd=" + rnd;
		
		$.ajax({
			type: "GET",
			cache: false,
			dataType: 'json',
			url: uri,
			success: function (data, textStatus, jqXHR) {
				if (data.error) 
				{
					
				}
				else
				{
					if (data.email == "non")
					{
						$("#loginPanel .logIn").show();
						$("#loginPanel .logOut").hide();
					}
					else
					{
						$("#loginPanel .logIn").hide();
						$("#loginPanel .logOut").show();
						$("#loginPanel .userEmail").text(data.email);
					}

					formatCart(data.items, data.sumprice, data.itemscount, data.carttotalcount, data.countlabel, showAlert)
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("checkUserInfo:" + textStatus);
			}
		});
		console.log('checkUserInfo');
    }


	function formatCart(items, totalPrice, count, totalcount, countlabel, showAlert)
	{
		totalPrice=totalPrice.replace('€','');
		console.log("tprice "+totalPrice+' count: '+totalcount);
		var html = "";
		$.each(items, function(i, item) {
			if (showAlert == 1)
			{
				var stockLevel = parseInt(item.stocklevel);
				var quantity = parseInt($(".inputQuatity").val());
				if (!isNaN(stockLevel) && !isNaN(quantity) && stockLevel < quantity)
				{
					$(".inputQuatity").val(stockLevel);
					var msg = langstocklevel + "(" + stockLevel + ") - " + item.name;
					alert(msg);
				}
			}
			html = html + "<li class=\"ItemCart\">";
			html = html + "<div class=\"imageBlock\"><img src=\"" + item.image + "\" alt=\"" + item.name + "\"></div>";
			html = html + "<div class=\"nameBlock\">";
			html = html + "<div class=\"quantity\">" + item.quantity + "x</div>";
			html = html + "<div class=\"itemName\">" + item.link + "</div>";
			html = html + "<div class=\"itemPrice\">" + item.price + "</div>";
			html = html + "</div>"
			html = html + "<div class=\"delete\"><a rel=\"" + (i + 1)+ "\" class=\"deleteItemPrevCart\"></a></div>";
			html = html + "</li>"
		});
		$(".subtotalSum").text('€'+totalPrice);
		// $(".cartItemsPrice").text(totalPrice);
		$("#popUpCart ul").html(html);
		
		var itemsCount = parseInt(totalcount);
		var cartSumHtml;
		if (isNaN(itemsCount) || itemsCount == 0)
		{
			$("#showItems").hide();
			$("#hideItems").show();
			//cartSumHtml = "<span>NO ITEMS</span>";
		}
		else
		{
			$("#showItems").show();
			$("#hideItems").hide();	
			$("#itemsCnt").text(itemsCount);	
			$("#itemsCntLabel").text(countlabel);
			//cartSumHtml = "<span>" + itemsCount + (itemsCount == 1 ? " ITEM" : " ITEMS") + " / </span><span class=\"cartItemsPrice\">" + totalPrice + "</span>";
		}
		
		$(".deleteItemPrevCart").click(function (event) {
			event.preventDefault();
			
			var rel = parseInt(String($(this).attr("rel")));
			if (!isNaN(rel))
			{
			
				deleteItem(rel, $(this).closest('.ItemCart'));
			}
			return false;
		});		
		
		$(".cartItemsPriceBlock").html(cartSumHtml);

	    // Cart popup
		var itemsCnt = parseInt($("#itemsCnt").text());

		if (!isNaN(itemsCnt) && itemsCnt > 0)
		{
			
			$('.cartItemsPriceBlock').click(function () {
				$('.popUpCart').slideToggle('fast');
				$(this).toggleClass('active');
			});
		}
		
		var left = $(".cartItemsPriceBlock").position().left;
		$("#popUpCart").css("left", "" + left + "px");

		
	}	
	
	function deleteItem(rel, obj)
	{

		var item_id = rel;
		console.log(item_id);

		$("#shopaddtocartoperationtop").attr('name', 'ReCalculate');
		$("#shopaddtocartoperationtop").attr('value', 'ReCalculate');
		$("#shopaddtocartoperation2top").attr('name', 'selected' + item_id);
		$("#shopaddtocartoperation2top").attr('value', 'yes');

		$("#MessageDialog").html(MessageDeleteFromCart);
		ShowMessageDialog();
		
		$.ajax( {
			type: "POST",
			url: $('#formshopaddtocarttop').attr( 'action' ),
			data: $('#formshopaddtocarttop').serialize(),
			success: function( response ) {
				//obj.remove();
				//alert(response);
				checkUserInfo();
				if ($("tr[class=ItemsListRow]").eq(0).length>0){ClearCartRow(item_id);}
			}
		});
		$("#shopaddtocartoperationtop").attr('name', '');
		$("#shopaddtocartoperationtop").attr('value', '');
		$("#shopaddtocartoperation2top").attr('name', '');
		$("#shopaddtocartoperation2top").attr('value', '');

        //$(this).closest('.ItemsListRow').remove();
		

	
	}



	$(function() {
	
		$(".popularCategories,.otherCategories").css("display","block");
		$("#productInformationTabs").css("display","block");
		var pageIdx = parseInt(sessionStorage["pageIdx"]);
		if (isNaN(pageIdx))
		{
			sessionStorage["pageIdx"] = 0;
			pageIdx = 0;
		}
		else
		{
			pageIdx++;
			sessionStorage["pageIdx"] = pageIdx;
		}
		sessionStorage[pageIdx] = window.location.pathname;
	});
	
	$(function() {	
		var d1 = new Date();
		var year1 = d1.getFullYear() - 18;
		d1.setFullYear(year1);
		$("input[name=strBirthday]").datepicker({changeMonth: true, changeYear: true, yearRange: '1934:2012', defaultDate: d1 });
		$("input[name=strBirthday]").keydown(function() { return false; });
		$("input[name=strBirthday]").bind("paste", function(){ return false; } );
		if (langCode == "ru")
		{
			$("input[name=strBirthday]").datepicker($.datepicker.regional[ "ru" ]);
		}
		else
		{
			$("input[name=strBirthday]").datepicker($.datepicker.regional[ "lv" ]);
		}
		
	});
	
	
$(function () {
	//resetSteps();



	$.ajaxSetup({
		beforeSend:function(){
			// show gif here, eg:
			$("#loading").show();
		},
		complete:function(){
			// hide gif here, eg:
			$("#loading").hide();
		}
	});

    $("#verticalTabs").tabs({
        event: "mouseover",
        create: function (event, ui) {
            hideSubCategoryMenu();
            $('#verticalTabs').hover(function () {

            }, function () {
                hideSubCategoryMenu();
            });
        }
    }).addClass("ui-tabs-vertical ui-helper-clearfix");
    //$("#verticalTabs li").removeClass("ui-corner-top").addClass("ui-corner-left");

    function hideSubCategoryMenu() {
        $('#verticalTabs > ul > li a').hover(function () {
            //$(this).closest('li').addClass('ui-tabs-active').addClass('ui-state-active').attr('tabindex', '0').attr('aria-selected', true);
            $(this).closest('li').addClass('ui-tabs-active ui-state-active');
            var aria = $(this).closest('li').attr('aria-labelledby');
            $('div[aria-labelledby=' + aria + ']').show();
        });
        $('#verticalTabs .ui-tabs-panel').hide();
        $('#verticalTabs li.ui-tabs-active').removeClass('ui-tabs-active');
        $('#verticalTabs li.ui-state-active').removeClass('ui-state-active');
        //$('#verticalTabs > div').attr('aria-expanded', false).attr('aria-hidden', true);
        //$('#verticalTabs > ul > li').attr('tabindex', '-1').attr('aria-selected',false);
    }
	
	/* Top Menu*/
	var firstcategory_li="";
	var flagCategory = 0;
	$("#verticalTabsTop").tabs({
        event: "mouseover",
        create: function (event, ui) {
            hideSubCategoryMenuTop();
            $('#verticalTabsTop').hover(function () {
				

            }, function () {
                hideSubCategoryMenuTop();
            });
        }
    }).addClass("ui-tabs-vertical ui-helper-clearfix");
	
	$("#verticalTabsTop").tabs({ selected: 1 });
	
	
    function hideSubCategoryMenuTop() {
        $('#verticalTabsTop > ul > li a').hover(function () {
            //$(this).closest('li').addClass('ui-tabs-active').addClass('ui-state-active').attr('tabindex', '0').attr('aria-selected', true);
            $(this).closest('li').addClass('ui-tabs-active ui-state-active');
            var aria = $(this).closest('li').attr('aria-labelledby');
            $('div[aria-labelledby=' + aria + ']').show();
			if (firstcategory_li.length>0)
			{
			if (($(this).parent().get(0)==firstcategory_li.get(0)) && (flagCategory==1))
			{
				firstcategory_li.css("backgroundPosition", "-291px 0px");
				$(this).css("color","#464646");
			}
			}
			
        },
		function()
		{
			if ($(this).parent().get(0)==firstcategory_li.get(0))
			{
				firstcategory_li.css("backgroundPosition", "0px 0px");
				$(this).css("color","#fff");
			}
		}
		);
        $('#verticalTabsTop .ui-tabs-panel').hide();
        $('#verticalTabsTop li.ui-tabs-active').removeClass('ui-tabs-active');
        $('#verticalTabsTop li.ui-state-active').removeClass('ui-state-active');
        //$('#verticalTabs > div').attr('aria-expanded', false).attr('aria-hidden', true);
        //$('#verticalTabs > ul > li').attr('tabindex', '-1').attr('aria-selected',false);
    }
	

	/** **/
		var catname;
		var catnumber;
		var catbg;
		var oldcatcontent;
		var oldcatbg;
		var newcatcontent;
		oldcatcontent =$("#categorymenu >div  > ul").html();
		oldcatbg =$("#categorymenu").attr("style");
	    $('#verticalTabsTop1 > ul > li').hover(function () {
			catname=$(this).attr('class').replace("-sel","")
			catnumber=$(this).attr('id')
			catbg=$("#verticalTabsTop-"+catnumber).attr('style').replace("none","block");
			console.log(catname)
			$("#categorymenu").attr("style",catbg);
			newcatcontent=$("#verticalTabsTop-"+catnumber+" >div  > ul").html();
			$("#categorymenu >div  > ul").html(newcatcontent);
        },
		function()
		{			
		});
		
	    $('#shopByCategoryMenu1').hover(function () 
		{
        },
		function()
		{		
			$("#categorymenu").attr("style",oldcatbg);
			$("#categorymenu >div  > ul").html(oldcatcontent);
		});
	

    /*Item on Sale mark*/
    $('.saleItem').find('.itemCell').append('<img class="saleIco" src="/images/saleIco.png">');

    /*Viewed items gallery*/
    $('#viewedItemsGallery').scrollbox({
        direction: 'h'
    });

    $('#viewedItemsShowBack').click(function () {
        $('#viewedItemsGallery').trigger('backward');
    });

    $('#viewedItemsShowForward').click(function () {
        $('#viewedItemsGallery').trigger('forward');
    });
    /*crossSellingCart items gallery*/
    $('#crossellCartGallery').scrollbox({
        direction: 'h'
    });

    $('#crossSellingCartShowBack').click(function () {
        $('#crossellCartGallery').trigger('backward');
    });

    $('#crossSellingCartShowForward').click(function () {
        $('#crossellCartGallery').trigger('forward');
    });	


	/*popup products gallery*/
    $('#popupProductsGallery1').scrollbox({
        direction: 'h'
    });

    $('#popupProductsShowBack1').click(function () {
        $('#popupProductsGallery1').trigger('forward');
    });

    $('#popupProductsShowForward1').click(function () {
        $('#popupProductsGallery1').trigger('backward');
    });
	
	
	$('#popupProductsGallery2').scrollbox({
        direction: 'h'
    });

    $('#popupProductsShowBack2').click(function () {
        $('#popupProductsGallery2').trigger('backward');
    });

    $('#popupProductsShowForward2').click(function () {
        $('#popupProductsGallery2').trigger('forward');
    });
	
	
	$('#popupProductsGallery3').scrollbox({
        direction: 'h'
    });

    $('#popupProductsShowBack3').click(function () {
        $('#popupProductsGallery3').trigger('backward');
    });

    $('#popupProductsShowForward3').click(function () {
        $('#popupProductsGallery3').trigger('forward');
    });

    /*Hot items gallery, Also viewed gallery*/
    $('#hotItemsGallery').scrollbox({
        direction: 'h'
    });

    $('#hotItemsShowBack').click(function () {
        $('#hotItemsGallery').trigger('backward');
    });

    $('#hotItemsShowForward').click(function () {
        $('#hotItemsGallery').trigger('forward');
    });

    /*Filtered items gallery*/
    /*$('#filteredGallery, #filteredGallery2').scrollbox({
        direction: 'h'
    });*/

    $('#filteredItemsShowBack').click(function () {
        //$('#filteredGallery, #filteredGallery2').trigger('backward');
		var pageNum = parseInt($("#pageNum").text());
		if (isNaN(pageNum))
		{
			pageNum = 1;
		}
		pageNum--;
		if (pageNum < 1)
		{
			pageNum = 1;
		}
		$("#pageNum").text(pageNum);
		$(".selectPage").text(pageNum);
		updateParamsInUrl();	
		updateProductsCount();
    });

    $('#filteredItemsShowForward').click(function () {
        //$('#filteredGallery, #filteredGallery2').trigger('forward');
		var pageNum = parseInt($("#pageNum").text());
		if (isNaN(pageNum))
		{
			pageNum = 1;
		}
		var pagesCount = parseInt($("#pagesCount").text());
		if (isNaN(pagesCount))
		{
			pagesCount = pageNum;
		}
		pageNum++;
		if (pageNum > pagesCount)
		{
			pageNum = pagesCount;
		}
		$("#pageNum").text(pageNum);
		updateParamsInUrl();	
		updateProductsCount();
    });

    /**/
    var a = 1;
    secureSlide();
    function secureSlide() {
        if (a == 0) {
            $('.payWay1').hide();
            $('.payWay2').show();
            a = 1;
            setTimeout(function () {
                secureSlide();
            }, 4000);
        } else {
            $('.payWay1').show();
            $('.payWay2').hide();
            a = 0;
            setTimeout(function () {
                secureSlide();
            }, 4000);
        }
    }
    /**/

    $('.logOutBtn').hover(
        function () {
            $('.logOut').addClass("logoutHover");
        }, function () {
            $('.logOut').removeClass("logoutHover");
        }
    );
    /*Search*/
    $('.labelSearch').on('click', function () {
        $(this).toggleClass('active');
        $('.popUpSearch').slideToggle('fast');
    });
	
		$(".searchBlock ul.listItem li a").click( function() {
		var searchCategoryId = String($(this).attr("id")).replace("search_cat_", "");
		var searchCategoryDesc = $(this).html();
		$("#id").val(searchCategoryId);		
		$(".labelSearch").html(searchCategoryDesc + "<span class=\"ico\"></span>");		
		$('.labelSearch').toggleClass('active');
		$('.popUpSearch').slideToggle('fast');
	});
	

    /**/
    $('#IWantToSubscribe').change(function () {
        if ($(this).is(':checked')) {
            $('.subscribeDetails').fadeIn('fast');
        } else {
            $('.subscribeDetails').fadeOut('fast');
        }
    });

    /**/
	var d = new Date();
	var year = d.getFullYear() - 18;
	d.setFullYear(year);
	
    $("#dateOfBirth").datepicker({
        changeMonth: true,
        changeYear: true,
		/*minDate: new Date(1950,1,1),*/
		yearRange: '1934:2012',
		defaultDate: d
    });


    /**/
    $('.subscribeGenderButton').on('click', function () {
        $('.subscribeBottomWrapper').slideDown('fast');
    });

    /**/

    $('#selectable').find('span').click(function () {
        $('#selectable').find('span').removeClass('ui-selected');
        $(this).addClass('ui-selected');
    });

    /**/
    $("#productInformationTabs").tabs();

    /**/

    $(".light_box_category").dialog({
        autoOpen: false,
        width: 990,
        closeOnEscape: true,
        modal: true,
        resizable: false,
        show: {
            effect: "blind",
            duration: 500
        },
        hide: {
            effect: "blind",
            duration: 500
        },
        open: function (event, ui) {
            $('.close').click(function () {
                $(".light_box_category").dialog("close");
            });
        }
    });
	/*
    $(".block_4").click(function () {
        $(".sleepNewbornsPopup").dialog("open");
    });
*/
    // My Orders Page
    $('.OrderItemsTd .OrderItems').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.ItemsListCheckout').find('.ItemsListCheckoutHead .quantity, .ItemsListCheckoutHead .price').fadeToggle();
        $(this).closest('.myOrdersBlock').find('.ItemsListCheckoutItems').slideToggle('fast');
    });

    $('.DelveryDetaisHead .DelveryDetais').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.myOrdersBlock').find('.DelveryDetaisTable').slideToggle('fast');
    });

    $('.OrdersList .myOrdersBlock:gt(0)').each(function () {
        $(this).addClass('notactive');
        $(this).find('.ItemsListCheckoutItems, .DelveryDetaisTable').css('display', 'none');
        $(this).closest('.myOrdersBlock').find('.ItemsListCheckoutHead .quantity, .ItemsListCheckoutHead .price').css('display', 'none');
    });

    $('.OrdersList .myOrdersBlock').first().find('.OrderItems, .DelveryDetais').addClass('active');

    // Cart
	/*
    $('.ItemsListCheckout .deleteItem').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.ItemsListRow').remove();
    });
	*/
    $('.linkForgotPassword').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.checkoutOptiosBlock').hide();
        $('.checkoutOptiosBlock.forgotPassword').fadeIn();
    });

	$('.linkLogin').on('click', function (e) {
        e.preventDefault();
        $('.checkoutOptiosBlock').hide();
		$('.checkoutOptiosBlock:first').fadeIn();
    });

/*
    $('input[name="byz_chk_method_code"]').change(function () {
        if ( ! $('#formDelivery input[name="byz_chk_method_code"]').last().is(':checked')) {
            $('.AddressInfo').show();
            $('.MapInfo').hide();
            $('.colCommentsUser .myInformationRow').removeClass('fromOffice');
        }
        else if ($('#formDelivery input[name="byz_chk_method_code"]').last().is(":checked")) {
            $('.MapInfo').show();
            $('.AddressInfo').hide();
            $('.colCommentsUser .myInformationRow').addClass('fromOffice');
        }
    });
*/
	/*
    if ($('#DeliverybyCourier').is(':checked')) {
        $('.AddressInfo').show();
        $('.MapInfo').hide();
        $('.colCommentsUser .myInformationRow').removeClass('fromOffice');
    }
    else if ($("#TakeFromOffice").is(":checked")) {
        $('.MapInfo').show();
        $('.AddressInfo').hide();
        $('.colCommentsUser .myInformationRow').addClass('fromOffice');
    }
	*/


    $('#PurchasebyCompanyCheck').change(function () {
        if ($('#PurchasebyCompanyCheck').is(':checked')) {
            $('.PurchasebyCompanyFields').show();
        }
        else {
            $('.PurchasebyCompanyFields').hide();
        }
    });

    if ($('#PurchasebyCompanyCheck').is(':checked')) {
        $('.PurchasebyCompanyFields').show();
    }
    else {
        $('.PurchasebyCompanyFields').hide();
    }


	/*
    $('#PayCash, #InternetBanking, #CreditDebitCard').change(function () {
        if ($('#PayCash').is(':checked')) {
            $('.PayCash').show();
            $('.InternetBanking').hide();
            $('.CreditCard').hide();
        }
        else if ($("#InternetBanking").is(":checked")) {
            $('.InternetBanking').show();
            $('.PayCash').hide();
            $('.CreditCard').hide();
        }
        else if ($("#CreditDebitCard").is(":checked")) {
            $('.CreditCard').show();
            $('.PayCash').hide();
            $('.InternetBanking').hide();
        }
    });

    if ($('#PayCash').is(':checked')) {
        $('.PayCash').show();
        $('.InternetBanking').hide();
        $('.CreditCard').hide();
    }
    else if ($("#InternetBanking").is(":checked")) {
        $('.InternetBanking').show();
        $('.PayCash').hide();
        $('.CreditCard').hide();
    }
    else if ($("#CreditDebitCard").is(":checked")) {
        $('.CreditCard').show();
        $('.PayCash').hide();
        $('.InternetBanking').hide();
    }
	*/

    /**//*Filter slider*//**/
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [50, 500],
        step: 1,
        slide: function (event, ui) {
            //$("#priceFrom").val("�" + ui.values[0]);
            //$("#priceTo").val("�" + ui.values[1]);
            $("#priceFrom").text(ui.values[0]);
            $("#priceTo").text(ui.values[1]);
        }
    });
    //$("#priceFrom").val("�" + $("#slider-range").slider("values", 0));
    //$("#priceTo").val("�" + $("#slider-range").slider("values", 1));
    $("#priceFrom").text($("#slider-range").slider("values", 0));
    $("#priceTo").text($("#slider-range").slider("values", 1));
	
	
	$("#slider-range").slider({
			change: function(event, ui) { 
				$("#pageNum").text('1');
				$('.selectPage').text("1");
				updateParamsInUrl();
				updatePriceInUrl(ui.values[0], ui.values[1]);
				updateProductsCount();
		} 
	});

	$("#priceFrom").mouseup(function() { 
		alert();
	});
	

    /**/
    $('.writeReviewBtn').click(function () {
        $('.writeReviewBtnBlock').hide();
        $('.writeYourReview').show();
		//
    });
	
	var showedItems = 3;
	// show more rating items
	$("#xallowratingproducts .loadMore span").click(function() { 
		showedItems += 3;
		var i;
		for (i = 1; i <= showedItems; i++)
		{
			$(".customersReviews #comment_" + i).removeClass("hidden");
		}
	});
	
	$("#yourRating ul li").click( function() { 
		$("#yourRating ul li").removeClass("marked");
		$(this).addClass("marked");
		$("#yourRating #rating").val($(this).data("value"));
	});	

	
	$('#postReviewBtn').click(function () {
		var rnd = Math.random();
		var rating = $("#yourRating #rating").val();
		var name = $("#reviewerName").val();
		var comment = $("#reviewerComment").val();
		var uri = "/" + langCode  + "/shopreviewadd.asp?rnd=" + rnd;
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd < 10) {
			dd='0' + dd
		} 
		if(mm < 10) {
			mm='0' + mm
		} 
		today = mm + '/' + dd + '/'+yyyy;
		
		
		var params = { "isajax": "1", "id": document.User.productid.value, "RatingStars": rating, "RatingName": name, "RatingComment": comment, "securityCode": $("#securityCode").val() , "CAPTCHA_Postback": "true" };
		$.ajax({
			type: "POST",
			cache: false,
			dataType: 'json',
			url: uri,
			data: params,
			success: function (data, textStatus, jqXHR) {
				if (data.error) 
				{
					$("#ratingErrors").html(String(data.error).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"));
					document.getElementById('CAPTCHA').src='/captcha/captcha_image_frame_reviewproduct.asp?'+Date();
				}
				else
				{
					$('.writeYourReview').hide();
					$('.reviewSuccess').show();
					var review = rating;
					var newItemHtml = "<tr id=\"comment_0\"><td><div class=\"rating\"><ul>";
					for (var i = 1; i <= 5; i++)
					{
						newItemHtml += "<li";
						markedOne = ""
						if (review >= i) newItemHtml += " class=\"marked\"";
						newItemHtml += "></li>";
					}
					newItemHtml += "</ul></div><p class=\"reviewUserName\">" + name + "</p>";
					newItemHtml += "<p>" + today + "</p>";
					newItemHtml += "</td><td>";
					newItemHtml += "<p class=\"reviewText\">" + comment + "</p>";
					newItemHtml += "<p><span>Was this review helpful?</span><span class=\"helpful\">0</span><span class=\"unhelpful\">0</span></p>";
					newItemHtml += "</td></tr>";
	
					$(".customersReviews").prepend(newItemHtml);
					
				}
				
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			}
		})
    });

    /**/
    // Counter
    $('.buttonQuantityDown').click(function () {
        var $input = $(this).parent().find('.inputQuatity');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
		
        return false;
    });
    $('.buttonQuantityUp').click(function () {
        var $input = $(this).parent().find('.inputQuatity');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
		
        //return false;
    });


    $('.stepName').click(function () {
		if($(this).parent().hasClass('notActive'))
			return;
        $('.stepBlock').each(function () {
            $(this).removeClass('stepBlockActive');
        });
		if($('.stepBlock.stepBlockActive').length==0)
	        $(this).closest('.stepBlock').addClass('stepBlockActive');
    });

    //
    $('.CountryRow .CountryInput').click(function () {
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

    $('.block_selecting .block_of_selecting_size').click(function () {
        $('#listSize').slideToggle('fast');
        $(this).toggleClass('active');
    });
/*
    $('#listSize li').click(function () {
        var chooseSize = $(this).text();
        $('#selectedSize').attr("data-value", $(this).data("value"));
		$('#selectedSize').text(chooseSize);
		$('#listSize').slideToggle('fast');
		colorSizeChanged()
    });
*/
	var currentOrder, itemsPerPage
   
    // Filter
    $('.filterPrice').click(function () {
        $('#filterPriceList').slideToggle('fast');
        $(this).toggleClass('active');
    });

    $('#filterPriceList li').click(function () {
        var chooseFilterText = $(this).text();
		var chooseFilterId = $(this).attr("data-value");
		currentOrder = chooseFilterId;
        $('.filterPrice').text(chooseFilterText);
		$("#currentFilter").val(chooseFilterId);
		$('#filterPriceList').slideToggle('fast');
		$("#pageNum").text('1');
		$('.selectPage').text("1");		
		updateParamsInUrl();	
		updateProductsCount();
    });

    $('.filterPerPage').click(function () {
        $('#filterPerPageList').slideToggle('fast');
        $(this).toggleClass('active');
    });

    $('#filterPerPageList li').click(function () {
        var choosePerPage = $(this).text();
		itemsPerPage = choosePerPage;
		$("#pageNum").text('1');
		$('.selectPage').text("1");		
        $('.filterPerPage').text(choosePerPage);
		$("#itemsPerPage").val(choosePerPage);
		$('#filterPerPageList').slideToggle('fast');
		updateParamsInUrl();	
		updateProductsCount();
    });
	
	

    $('.inputFilterProperties').click(function () {
        if ($('.inputFilterProperties').not(this).hasClass('active')) {
            $('.inputFilterProperties').not(this).removeClass('active');
            $('.inputFilterPropertiesList').not(this).hide();
        }
        $(this).next('.inputFilterPropertiesList').slideToggle('fast');
        $(this).toggleClass('active');
    });
	
	$(".inputFilterPropertiesList").mouseleave(function(event) {
		event.preventDefault();
		$(this).hide('fast');
	});
	
	$('.selectPage').click(function () {
		$('#selectPageList').slideToggle('fast');
        /*$(this).toggleClass('active');*/
    });

    $('#selectPageList li').click(function () {
		var pageNum = parseInt($(this).text());
		if (isNaN(pageNum))
		{
			pageNum = 1;
		}
		var pagesCount = parseInt($("#pagesCount").text());
		if (isNaN(pagesCount))
		{
			pagesCount = pageNum;
		}
		if (pageNum > pagesCount)
		{
			pageNum = pagesCount;
		}
		$("#pageNum").text(pageNum);
		

		//itemsPerPage = choosePerPage;
        $('.selectPage').text(pageNum);
		$('#selectPageList').hide();
		updateParamsInUrl();	
		updateProductsCount();
    });
	
	function updatePriceInUrl(minPrice, maxPrice)
	{
		var pageKey = window.location.pathname;
		var pos = pageKey.lastIndexOf("/");
		var pos1 = pageKey.lastIndexOf(".asp");
		if (pos != -1 && pos1 != -1 & pos + 1 < pos1)
		{
			pageKey = pageKey.substr(pos + 1, pos1 - pos - 1);
		}
		
		if (window.location.hash.match(/(^#|&)minprice=/g))
		{
			window.location.hash = window.location.hash.replace(/((^#|&)minprice=)\d+/g, '$1' + minPrice);
			//window.location.hash = window.location.hash.replace(/((^#|&)minprice=)\d+/g, '$1' + minPrice);
			//history.replaceState( {key: pageKey}, 'Title', window.location.href.replace(/((^#|&)minprice=)\d+/g, '$1' + minPrice));
		}
		else {
			if (window.location.hash.length > 1)
			{
				history.pushState( {key: pageKey}, 'Title', window.location.href + '&minprice=' + minPrice)
				//saveStep(2);
				//window.location.hash += '&minprice=' + minPrice;
			}
			else
			{
				history.pushState( {key: pageKey}, 'Title', window.location.href + '#minprice=' + minPrice)
				//saveStep(3);
				//window.location.hash = 'minprice=' + minPrice;
			}
		}
		
		if (window.location.hash.match(/(^#|&)maxprice=/g))
		{
			window.location.hash = window.location.hash.replace(/((^#|&)maxprice=)\d+/g, '$1' + maxPrice);
			//window.location.hash = window.location.hash.replace(/((^#|&)maxprice=)\d+/g, '$1' + maxPrice);
			//history.replaceState( {key: pageKey}, 'Title', window.location.href.replace(/((^#|&)maxprice=)\d+/g, '$1' + maxPrice));
		}
		else {
			if (window.location.hash.length > 1)
			{
				history.pushState( {key: pageKey}, 'Title', window.location.href + '&maxprice=' + maxPrice);
				//saveStep(5);
				//window.location.hash += '&maxprice=' + maxPrice;
			}
			else
			{
				history.pushState( {key: pageKey}, 'Title', window.location.href + '#maxprice=' + maxPrice);
				//saveStep(6);
				//window.location.hash = 'maxprice=' + maxPrice;
			}
		}		
	}

	function updateParamsInUrl()
	{	
		var pageKey = window.location.pathname;
		var pos = pageKey.lastIndexOf("/");
		var pos1 = pageKey.lastIndexOf(".asp");
		if (pos != -1 && pos1 != -1 & pos + 1 < pos1)
		{
			pageKey = pageKey.substr(pos + 1, pos1 - pos - 1);
		}
		
		if ($(".filterPerPage").length > 0)
		{
			var choosePerPage = parseInt($(".filterPerPage").text());
			if (!isNaN(choosePerPage))
			{
				itemsPerPage = choosePerPage;
				if (window.location.hash.match(/(^#|&)pagesize=/g))
				{
					window.location.hash = window.location.hash.replace(/((^#|&)pagesize=)\d+/g, '$1' + choosePerPage);
					//window.location.hash = window.location.hash.replace(/((^#|&)pagesize=)\d+/g, '$1' + choosePerPage);
					//history.replaceState( {key: pageKey}, 'Title', window.location.href.replace(/((^#|&)pagesize=)\d+/g, '$1' + choosePerPage));
				}
				else 
				{
					if (window.location.hash.length > 1)
					{
						history.pushState( {key: pageKey}, 'Title', window.location.href + '&pagesize=' + choosePerPage);
						//saveStep(8);
						//window.location.hash += '&pagesize=' + choosePerPage;
					}
					else
					{
						history.pushState( {key: pageKey}, 'Title', window.location.href + '#pagesize=' + choosePerPage);
						//saveStep(9);
						//window.location.hash = 'pagesize=' + choosePerPage;
					}
				}
			}
		};
		
		if ($("#pageNum").length > 0)
		{
			var pageNum = parseInt($("#pageNum").text());
			if (isNaN(pageNum))
			{
				pageNum = 1;
			}
			
			if (window.location.hash.match(/(^#|&)page=/g))
			{
				window.location.hash = window.location.hash.replace(/((^#|&)page=)\d+/g, '$1' + pageNum);
				//history.pushState( {foo: 'bar'}, 'Title', window.location.href + window.location.hash + '&pagesize=' + choosePerPage)
				//history.replaceState( {key: pageKey}, 'Title', window.location.href.replace(/((^#|&)page=)\d+/g, '$1' + pageNum));
			}
			else {
				if (window.location.hash.length > 1)
				{
					//window.location.hash += '&page=' + pageNum;
					history.pushState( {key: pageKey}, 'Title', window.location.href + '&page=' + pageNum);
					//saveStep(11);
				}
				else
				{
					//window.location.hash = 'page=' + pageNum;
					history.pushState( {key: pageKey}, 'Title', window.location.href + '#page=' + pageNum);
					//saveStep(12);
				}
			}
		};
		
		if ($("#currentFilter").length > 0)
		{
			var sortOrder = $("#currentFilter").val();
			if (window.location.hash.match(/(^#|&)sortorder=/g))
			{
				window.location.hash = window.location.hash.replace(/((^#|&)sortorder=)[a-z]+/g, '$1' + sortOrder);
				//window.location.hash = window.location.hash.replace(/((^#|&)sortorder=)[a-z]+/g, '$1' + sortOrder);
				//history.replaceState( {key: pageKey}, 'Title', window.location.href.replace(/((^#|&)sortorder=)\d+/g, '$1' + sortOrder));
			}
			else {
				if (window.location.hash.length > 1)
				{
					//window.location.hash += '&sortorder=' + sortOrder;
					history.pushState( {key: pageKey}, 'Title', window.location.href + '&sortorder=' + sortOrder);
					//saveStep(14);
				}
				else
				{
					//window.location.hash = 'sortorder=' + sortOrder;
					history.pushState( {key: pageKey}, 'Title', window.location.href + '#sortorder=' + sortOrder);
					//saveStep(15);
				}
			}
		}
	}
	
	
	
   var filterState = {};
	
   $('[data-role="category-products"]').each(function (i, el) {
        if ($(el).data('search'))
            return;

        var filters = $(el).find('.filter .head').map(function (i, f) {
            return {
                name: $(f).data('filter'),
                el: $(f)
            };
        });

		
		var pageKey = window.location.pathname;
		var pos = pageKey.lastIndexOf("/");
		var pos1 = pageKey.lastIndexOf(".asp");
		if (pos != -1 && pos1 != -1 & pos + 1 < pos1)
		{
			pageKey = pageKey.substr(pos + 1, pos1 - pos - 1);
		}
		
		
		
		// Filters
		$('.flCheck').each(function () {
			if ($(this).is(':checked')) {
				$(this).closest('.filterPropBlock').find('.activeFilter').addClass('current');
			}
		});
		$('.flCheck').change(function () {

			var checkLenght = $(this).closest('.filterPropBlock').find('.flCheck:checked').length;
			if (checkLenght > 0) {
				$(this).closest('.filterPropBlock').find('.activeFilter').addClass('current');
			} else {
				$(this).closest('.filterPropBlock').find('.activeFilter').removeClass('current');
			}
		});

		
		$('.activeFilter').click(function () {
			$(this).closest('.filterPropBlock').find('.flCheck').each(function () {
			
				 //   $(el).find('form.filter ul.oneFacet').on('click', function(e) {
				var $li = $(this).closest('li');

				var name = $li.find('label').data('value');
				var fileterName = $li.closest('.head').data('filter');
				
				if (fileterName) {
				
					var checked = ($li.find('input').is(":checked"));

					if (checked) {
						if (filterState[fileterName])
						{
							var index = filterState[fileterName].indexOf(name);
							if (index != -1)
								filterState[fileterName].splice(index, 1);
							if (!filterState[fileterName].length) {
								delete filterState[fileterName];
							}
						}
					}
					
				}
				$(this).removeProp("checked");
			});
			
			var options = getFilterHashOptions();
			currentPageNumber = 1;
			var selectedSortOrder = $("#currentFilter").val();
			var choosePerPage = parseInt($(".filterPerPage").text());
			if (isNaN(choosePerPage))
			{
				choosePerPage = currentPageNumber;
			}
			
			var hash = "page=" + currentPageNumber + "&pagesize=" + choosePerPage + "&sortorder=" + selectedSortOrder;
			
			//var minPrice = parseInt($("#priceFrom").text());
			//if (!isNaN(minPrice))
			//{
			//	hash += "&minprice=" + minPrice;
			//}
			//var maxPrice = parseInt($("#priceTo").text());
			//if (!isNaN(maxPrice))
			//{
			//	hash += "&maxprice=" + maxPrice;
			//}
			
			hash += options.codes.length ? ('&' + options.codes + '&' + options.filters.join('&')) : '';

			//window.location.hash = hash;
			var url = window.location.href;
			var pos = url.lastIndexOf("#");
			if (pos != -1)
			{
				url = url.substr(0, pos);
			}
			history.pushState( {key: pageKey}, 'Title', url + "#" + hash);
			//saveStep(16);
			updateProductsCount();
			
			$(this).closest('.filterPropBlock').find('.activeFilter').removeClass('current');
			return false;
		});
		// Filters end

    $('#FilterSale li').click(function () {
		$('#FilterSale').slideToggle('fast');
        $("#salediff").val($(this).val());
        $("#defaultpercentvalue").text($(this).text());
		SetFilters();
		updateProductsCount();

    });
    $('#FilterSale').click(function () {
		$('#FilterSale').slideToggle('fast');


    });
	
function SetFiltersBind()	
{

		$('.flCheck').each(function () {
			if ($(this).is(':checked')) {
				$(this).closest('.filterPropBlock').find('.activeFilter').addClass('current');
			}
		});
		$('.flCheck').change(function () {

			var checkLenght = $(this).closest('.filterPropBlock').find('.flCheck:checked').length;
			if (checkLenght > 0) {
				$(this).closest('.filterPropBlock').find('.activeFilter').addClass('current');
			} else {
				$(this).closest('.filterPropBlock').find('.activeFilter').removeClass('current');
			}
		});


		$('.customCheckbox').find('li').on("click",function () {
		
            var $li = $(this).closest('li');
            var name = $li.find('label').data('value');
            var fileterName = $li.closest('.head').data('filter');


	
			if (fileterName) {
				var checked = ($li.find('input').is(":checked"));
				console.log(checked);
                if (checked) {
                    if (!filterState[fileterName])
                        filterState[fileterName] = [];
                    filterState[fileterName].push(name);
					console.log("noindex");

                } else {
                    var index = filterState[fileterName].indexOf(name);
					console.log("index"+index);
                    if (index != -1)
                        filterState[fileterName].splice(index, 1);
					else{
					/** workaround if translation are identical for different filter **/
						var nameParts = String(name).split("$");
						if (nameParts.length > 0)
						{
							var i;
							for(i in nameParts)
							{
								var index = filterState[fileterName].indexOf(nameParts[i]);
								if (index != -1)
									filterState[fileterName].splice(index, 1);
							}							
						}
					}
                    if (!filterState[fileterName].length) {
                        delete filterState[fileterName];
                    }
					
                }
				updateProductsCount();	
            }

				

            var options = getFilterHashOptions();
            currentPageNumber = 1;
			var selectedSortOrder = $("#currentFilter").val();
			var choosePerPage = parseInt($(".filterPerPage").text());
			if (isNaN(choosePerPage))
			{
				choosePerPage = currentPageNumber;
			}
            var hash = "page=" + currentPageNumber + "&pagesize=" + choosePerPage + "&sortorder=" + selectedSortOrder;
            hash += options.codes.length ? ('&' + options.codes + '&' + options.filters.join('&')) : '';

            //window.location.hash = hash;
			var url = window.location.href;
			var pos = url.lastIndexOf("#");
			if (pos != -1)
			{
				url = url.substr(0, pos);
			}
			history.pushState( {key: pageKey}, 'Title', url + "#" + hash);
			//saveStep(17);
	});	
}
	
		
	function setSetFiltersData(data,filternumber)
	{
		var str_filter='';
		var str_filterhide='';
		var str='';
		var countfiltervalue=0;
		var i=0;
		var showitems=20
		var totalcount=0;				
		var items = [];
		totalcount=parseInt(data.totalcount);
		if (eval(totalcount)<eval(showitems)) showitems=totalcount;
		for (i=0;i<totalcount;i++)
		{
			str='<input id="chk_'+data.items[i].name+'" type="checkbox" class="flCheck" value="'+data.items[i].name+'"><label for="chk_'+data.items[i].name+'" data-value="'+data.items[i].name+'">'+data.items[i].name+'</label>';
			if (items.indexOf(str)==-1) 
			{
				items[countfiltervalue]=str;
				countfiltervalue++;
			}
		}
		totalcount=countfiltervalue;
		console.log("countfiltervalue: "+countfiltervalue)
		if (totalcount<11)
		{
			str_filter='<ul class="customCheckbox oneFacet">'
			for (i=0;i<totalcount;i++)
			{
				str_filter=str_filter+'<li>'+items[i]+'</li>';
			}
			$("#showmorefilter"+filternumber).css("display","none");
		}
		else
		{
			var columnsCnt = 4 
			if ((totalcount/5)<3) columnsCnt=3;
			rowsCnt = Math.ceil((totalcount) / 4)
			var idx = 0
			var flagcountf=0
			for (idxX = 0; idxX<columnsCnt;idxX++)
			{
				str_filter=str_filter+'<ul class="customCheckbox oneFacet">'
				for (idxY = 1;idxY<=5;idxY++)
				{
					if (eval(idx) >= showitems)
					{
						flagcountf=1
						break;
					}
					if (flagcountf==0)
					{
						str_filter=str_filter+'<li>' + items[idx] + '</li>';
						
					}	
					idx ++;
				}
				str_filter=str_filter+ "</ul>"
			}
					
			for (idxX = 0; idxX<columnsCnt;idxX++)
			{
				if (idx >= totalcount) {break;}
				str_filterhide =str_filterhide+'<ul class="customCheckbox oneFacet">'
				for (idxY = 0; idxY<rowsCnt;idxY++)
				{
					str_filterhide = str_filterhide+'<li>' + items[idx] + '</li>'
					idx ++;
					if (idx >= totalcount) {break;}
				}
				str_filterhide=str_filterhide+ '</ul>';
			}
					
			if (eval(idx)>showitems) { $("#showmorefilter"+filternumber).css("display","block");} else {$("#showmorefilter"+filternumber).css("display","none");}

		}
				
		$("#vs"+filternumber).html(str_filter);
		$("#hs"+filternumber).html(str_filterhide);
	}
    
	function SetFilters()
	{
		if ($("#salediff").length==0) return;
	    var url="/get_sales_filters.asp?salediff="+$("#salediff").val()
		$.ajax({
			type: "GET",
			cache: false,
			dataType: 'json',
			url: url,
			success: function (data, textStatus, jqXHR) {

				var a=data.mfg;
				setSetFiltersData(a,"1")
				a=data.color;
				setSetFiltersData(a,"4")
				a=data.size;
				setSetFiltersData(a,"5")
				SetFiltersBind();
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("checkUserInfo:" + textStatus);
			}
		});
	   
	}
		
		
		if (window.location.hash.match(/(^#|&)pagesize=\d+/g))
		{
			var itemsPerPage = String(window.location.hash.match(/(^#|&)pagesize=\d+/g)).replace(/(^#|&)pagesize=/g, "");
			choosePerPage = itemsPerPage;
			$(".filterPerPage").text(itemsPerPage);
		}
/* 			else
		{
			$(".filterPerPage").text("10");
		} */

		if (window.location.hash.match(/(^#|&)page=\d+/g))
		{
			var pageNum = String(window.location.hash.match(/(^#|&)page=\d+/g)).replace(/(^#|&)page=/g, "");
			$("#pageNum").text(pageNum);
			$(".selectPage").text(pageNum);
		}
		else
		{
			//$("#pageNum").text("1");
			$(".selectPage").text("1");
		}
		
		if (window.location.hash.match(/((^#|&)sortorder=)[a-z]+/g))
		{
			var id = String(window.location.hash.match(/((^#|&)sortorder=)[a-z]+/g)).replace(/(^#|&)sortorder=/g, "");
			if (id.length > 0)
			{
				currentOrder = id;
				$("#currentFilter").val(id);

				$("#filterPriceList ul li").each(function () {
					if ($(this).attr("data-value") == id) {
						$(".filterPrice").text($(this).text());
					}
				});
			}
		}
		
		if (window.location.hash.match(/(^#|&)minprice=\d+/g) && window.location.hash.match(/(^#|&)maxprice=\d+/g))
		{
			var minPrice = parseInt(String(window.location.hash.match(/(^#|&)minprice=\d+/g)).replace(/(^#|&)minprice=/g, ""));
			var maxPrice = parseInt(String(window.location.hash.match(/(^#|&)maxprice=\d+/g)).replace(/(^#|&)maxprice=/g, ""));
			if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice < maxPrice)
			{
				$("#slider-range").slider( {values: [minPrice, maxPrice] });
				$("#priceFrom").text(minPrice);
				$("#priceTo").text(maxPrice);
			}
			else
			{
				var min = $("#slider-range").slider("min");
				var max = $("#slider-range").slider("max");
				$("#slider-range").slider( {values: [min, max] });
				$("#priceFrom").text(min);
				$("#priceTo").text(max);
			}
		}

		updateParamsInUrl();
			

        if (window.location.hash.match(/(^#|&)filtercodes=/gi)) {
			$(".filtersBlock .flCheck").removeProp("checked");
			//$(this).closest('.filterPropBlock').find('.activeFilter').addClass('current');
			$('.filtersBlock .activeFilter').removeClass('current');
            var uriFilters = window.location.hash.replace(/(^#|.*&)filtercodes=([a-z,]+).*/g, '$2').split(',');
			
            $.each(uriFilters, function (i, filterName) {
                if (window.location.hash.match(new RegExp("(^#|&)" + filterName + (i + 1) + "="))) {
                    var selectedFilters = decodeURIComponent(window.location.hash.replace(new RegExp("(^#|.*&)" + filterName + (i + 1) + "=([^&]+).*"), '$2').replace(/\+/g, '%20')).split('$');

                    filterState[filterName] = selectedFilters;

                    var selectedList = $(el).find('.filter-list-selected ul');

                    filters
                        .filter(function(i, f) {
                            return f.name == filterName;
                        })[0].el
                        .find('li label')
                        .filter(function(i, f) {
							var partOfValue = String($(f).data('value')).split("$")[0];
                            return selectedFilters.indexOf($(f).data('value')) != -1 || selectedFilters.indexOf(partOfValue) != -1;
                        }).each(function(i, item) {
						
							$(item).closest('.filterPropBlock').find('.activeFilter').addClass('current');
                            $(item).closest('li').find('input.flCheck').prop("checked", true);
                        });

                }
            });
        }
		
		if (window.location.hash.match(/(^#|&)keyword=/gi)) {
            var keyword = window.location.hash.replace(/(^#|.*&)keyword=([a-zA-Zа-яА-Я,\+]+).*/g, '$2');
			$("input[name=keyword]").val(keyword.replace(/\+/gi, " "));
		}
		
		updateProductsCount();

        var getFilterHashOptions = function () {
            var attrs = [];
            $.each(filterState, function(key, value) {
                attrs.push({
                    key: key,
                    value: value.join('$')
                });
            });
            var filtercodes = $.makeArray($(attrs).map(function(i, a) {
                return a.key;
            }));
            
            return {
                codes: filtercodes.length ? 'filtercodes=' + filtercodes.join(',') : '',
                filters: $.makeArray(attrs.map(function (a, i) {
                    return a.key + (i + 1) + '=' + a.value;
                }))
            };
        };
		

        $(el).find('form.filter ul.oneFacet').on('click', function(e) {
		
            var $li = $(e.target).closest('li');

            var name = $li.find('label').data('value');
            var fileterName = $li.closest('.head').data('filter');

			if (fileterName) {
			
				var checked = ($li.find('input').is(":checked"));
                if (checked) {
                    if (!filterState[fileterName])
                        filterState[fileterName] = [];
                    filterState[fileterName].push(name);

                } else {
                    var index = filterState[fileterName].indexOf(name);
                    if (index != -1)
                        filterState[fileterName].splice(index, 1);
					else{
					/** workaround if translation are identical for different filter **/
						var nameParts = String(name).split("$");
						if (nameParts.length > 0)
						{
							var i;
							for(i in nameParts)
							{
								var index = filterState[fileterName].indexOf(nameParts[i]);
								if (index != -1)
									filterState[fileterName].splice(index, 1);
							}							
						}
					}
                    if (!filterState[fileterName].length) {
                        delete filterState[fileterName];
                    }
                }
				updateProductsCount();
            }

            var options = getFilterHashOptions();
            currentPageNumber = 1;
			var selectedSortOrder = $("#currentFilter").val();
			var choosePerPage = parseInt($(".filterPerPage").text());
			if (isNaN(choosePerPage))
			{
				choosePerPage = currentPageNumber;
			}
            var hash = "page=" + currentPageNumber + "&pagesize=" + choosePerPage + "&sortorder=" + selectedSortOrder;
			//var minPrice = parseInt($("#priceFrom").text());
			//if (!isNaN(minPrice))
			//{
			//	hash += "&minprice=" + minPrice;
			//}
			//var maxPrice = parseInt($("#priceTo").text());
			//if (!isNaN(maxPrice))
			//{
			//	hash += "&maxprice=" + maxPrice;
			//}
            hash += options.codes.length ? ('&' + options.codes + '&' + options.filters.join('&')) : '';

            //window.location.hash = hash;
			var url = window.location.href;
			var pos = url.lastIndexOf("#");
			if (pos != -1)
			{
				url = url.substr(0, pos);
			}
			history.pushState( {key: pageKey}, 'Title', url + "#" + hash);
			//saveStep(17);
			$("#pageNum").text('1');
			$('.selectPage').text("1");

		})
		
		
		
	$("#CategoriesFilter li").click(function () {

		$("#CategoriesFilter li").css("text-decoration","none");
		$("#CategoriesFilter li").css("font-weight","normal");
		
		$(this).css("text-decoration","underline");
		$(this).css("font-weight","bold");
		$("#Category_ID").val(($(this).attr('value')));
		updateProductsCount();
	});


	SetFilters();
	
		
     });    

	var xhr;

		
		
	function getImageCss(imgSrc)
	{
		var img = new Image();
		img.src = imgSrc;
		var h = parseInt(img.height);
		var w = parseInt(img.width);
		var imageCss = "";
		if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0)
		{

			var k = 150 / 110;
			var k1 = w / h;

			if (k1 > k)
			{
				imageCss = "width:150px;";
				var h1 = parseInt(h * 150 / w);
				imageCss = "width:150px;height:" + h1 + "px;";
				if (!isNaN(h1) && h1 > 0)
				{
					var m = parseInt((110 - h1) / 2);
					imageCss = imageCss + "margin-top:" + m + "px;"
				}
			}
			else
			{									
				imageCss = "height:110px;";
			}
		}
		else
		{
			imageCss = "max-width:150px; max-height:110px;";
		}
		//imageCss = "style='" & imageCss & "'";
		return imageCss;
	}
	
	
	function updateProductsCount()
	{
		var templateNode = $($('#category-product-template').html().replace(/\s+/g, ' ').replace(/>\s</g, '><').trim());
		var listNodeContainer = $('[data-role="category-products"] #filteredGallery');
		//var listNode2 = $('[data-role="category-products"] #filteredGallery2 ul');
		var itemIdx = 0;
		console.log('updateProductsCount');
	
		if ($(".filterPerPage").length > 0)
		{
			var choosePerPage = parseInt($(".filterPerPage").text());
			if (!isNaN(choosePerPage))
			{
				//console.log('choosePerPage :'+$(".filterPerPage").length);
				
				var uri = window.location.href.replace('#', '?');
				
				if (xhr && xhr.readystate != 4) {
					xhr.abort();
				}
				uri = String(window.location.href);
				if (uri.indexOf("?static=1&") != -1 || uri.indexOf("&static=1&") != -1)
				{
					uri = uri.replace("static=1&", "");
				}
				else if (uri.indexOf("?static=1") != -1)
				{
					uri = uri.replace("?static=1", "");
				}
				
				//var ps=uri.indexOf('?');
				//if (ps==-1) ps=uri.indexOf('#');
				var ps=uri.indexOf('#');
				
				if (ps==-1) ps=uri.indexOf('#');
				ps=ps+1
				var count = eval(uri.length)
				var request=uri.substring(ps,count)
				
				//uri="/productcategory_handler.asp"+"?"+request+'&category_id='+Category_ID
				uri="/" + langCode  +"/productcategory_handler.asp?category_id="+Category_ID+"&"+request
				if ($("#Category_ID").length>0)
				{
					uri="/" + langCode  +"/productcategory_handler.asp?category_id="+$("#Category_ID").val()+"&"+request
				}
				if ($("#salediff").length>0)
				{
					//alert($("#salediff").val())
					uri=uri+"&salediff="+$("#salediff").val();

				}
				xhr = $.ajax({
					type: "GET",
					cache: false,
					dataType: 'json',
					url: uri,
					success: function (data, textStatus, jqXHR) {
					
						//listNode.html('');
						//listNode2.html('');
						$("#selectPageList ul").html("");
						listNodeContainer.html('');
						if ($("#foundcounts").length>0) $("#foundcounts").html(data.results);
						if (data.pages) 
						{
							$("#pagesCount").text(data.pages);
							var currPageNum = parseInt($("#pageNum").text());
							if (!isNaN(currPageNum) && currPageNum > data.pages)
							{
								currPageNum = 1;
								$("#pageNum").text(currPageNum);
								updateParamsInUrl();
							}
							$(".selectPage").text(currPageNum);
						
							var i = 1
							//$(".selectPage").text(1);
							for(i = 1; i<= data.pages; i++)
							{
								$("#selectPageList ul").append("<li data-value=\"" + i + "\">" + i + "</li>");
							}
							
							
							$('#selectPageList li').click(function () {
								var pageNum = parseInt($(this).text());
								if (isNaN(pageNum))
								{
									pageNum = 1;
								}
								var pagesCount = parseInt($("#pagesCount").text());
								if (isNaN(pagesCount))
								{
									pagesCount = pageNum;
								}
								if (pageNum > pagesCount)
								{
									pageNum = 1;
								}
								$("#pageNum").text(pageNum);
								

								//itemsPerPage = choosePerPage;
								$('.selectPage').text(pageNum);
								updateParamsInUrl();	
								updateProductsCount();
							});
							
						}
						
						
						var minPrice = parseInt(data.minPrice);
						var maxPrice = parseInt(data.maxPrice);
						if (!isNaN(minPrice) && !isNaN(maxPrice))
						{
							$("#slider-range").slider( {min: minPrice, max: maxPrice /*, values: [data.minPrice, data.maxPrice]*/ });
							if (!window.location.hash.match(/(^#|&)minprice=/g) && !window.location.hash.match(/(^#|&)maxprice=/g))
							{
								//updatePriceInUrl(data.minPrice, data.maxPrice);
								$("#slider-range").slider( {values: [minPrice, maxPrice] });
								$("#priceFrom").text(minPrice);
								$("#priceTo").text(maxPrice);
							}
						}
						var listNode;
						var count=0;
						if (data && data.items) {
							//if (data.items.length) {

								var xHeight = 0;
								
								$(data.items).each(function(i, item) {
									count++;
									var node = templateNode.clone(true);
									var imgsrc='';
									node.find('a').attr({
										'href': item.uri
									});
									
									var name = String(item.name);
									name = FormatProductName(name);
									if (item.img=='images/no-image.gif') {imgsrc='/images/no-image.gif';} else {imgsrc=item.img;}
									
									node.find('.newItemImage img').attr("src", imgsrc );
									
									var imageCss = getImageCss(item.img);

									node.find('.newItemImage img').attr("style", imageCss);
									node.find('.newItemImage img').attr("title", item.name);
									node.find('.newItemImage img').attr("alt", item.name);
									node.find('.newItemName').html(name);
									node.find('.newItemActualPrice').text(String(item.price).replace(".", ","));
									
									if (item.isdiscount == "true")
									{
										node.find('.newItemOldPrice').text(item.retailprice);
									
									}
									if ((item.issale == "true") && ($("#salediff").length==0))
									{
										node.addClass("saleItem");
									}
									if (item.sale!=undefined)
									{
										node.find('#cellsalevalue').text(item.sale);
									}									

									/*
									if (itemIdx % 5 == 0)
									{
										node.appendTo(listNode);
									}
									else
									{
										node.appendTo(listNode2);
									}
									*/
									
									if (itemIdx % 5 == 0)
									{
										if (itemIdx > 0)
										{
											listNode.appendTo(listNodeContainer);
										}
										listNode = $("<ul>");
									}
									node.appendTo(listNode);
									
									itemIdx++;
/*
									var height = node.outerHeight();
									if (height > xHeight) {
										xHeight = height;
									}
*/
								});
								if ((itemIdx % 5 != 1 || data.items.length % 5 == 1) && "" + listNode != "undefined")
								{
									listNode.appendTo(listNodeContainer);
								}

								//listNode.find('li').height(xHeight);
							//}
						}
						/*
						var flagover=0
						$('#filteredGallery ul li div.overContainer').hover(function () {
							$(this).find('div.itemCellover').css('display','block');
							$(this).find('p.newItemName').css('display','none');
							$(this).find('div.newItemPrice').css('display','none');
						}, function () {

							$(this).find('div.itemCellover').css('display','none');
							$(this).find('p.newItemName').css('display','block');
							$(this).find('div.newItemPrice').css('display','block');
							//obj.css('height','250px');
							//obj.css('z-index','0');

							if (flagover==1)
							{
								$(this).find('#listColorOver').slideToggle('fast');
								flagover=0;
							}
						});
					
						$('.block_of_selecting_color, .block_of_selecting_input').click(function () {
							$(this).parent().find('#listColorOver').slideToggle('fast');
							colli=250+($(this).parent().find('#listColorOver').find('ul').find('li').length-3)*20;
							//obj=$(this).parent().parent().parent().parent().parent();
							//obj.css('height',colli+'px');
							//obj.css('z-index','5');
							flagover=1
						});

						$('#listColorOver li').click(function () {
							
							var chooseColor = $(this).text();
							var chooseColorValue = $(this).data("value");

							$(this).parents('div').find('#selectedColor').text(chooseColor);
							$(this).parents('div').find('#colorSizeValue').val(chooseColorValue);
							$(this).parents('div').find('#listColorOver').slideToggle('fast');
							flagover=0;

						});										
						
						*/
						if (count==0)
						{
							listNodeContainer.html("<div id='NotFoundProduct'>"+ NotFoundProductMessage +"</div>");
						}
						//$('.account h3').text(data.welcomeText);
						//$('.account').css('display', 'block');
						//$('.smcart .items h3').text(data.itemsInCart);

					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus);
					}
				});
			}
		}	
	}
	
	$("#newArrivalsTable tr td .itemCell .newItemImage img").each( function() {
		var src = $(this).attr("src");
		var style = getImageCss(src);
		$(this).attr("style", style);
	});
	
	$("#filteredGallery .itemCell .newItemImage img").each( function() {
		var src = $(this).attr("src");
		var style = getImageCss(src);
		$(this).attr("style", style);
		console.log(style);
	});	


	// Popup ctrl benefits

/*
	$('.benefits div.benefit').hover(
		function(event)
			{
				var w=parseInt($(this).css('height'))
				//$('.errfirefox').css('height',$('.popup_class td').css('height'))
				//(this).find('.mypopup').css('padding-bottom',w+17)
				//var i=$(this).index()
				$(this).find('.mypopup').fadeIn()
			},
		function()
			{
				var i=$(this).index()
				$('.mypopup').eq(i).fadeOut()
			}
		)
*/
	//

	

    $(document).bind('click', function (e) {
        var listCountry = $("#CountryList"),
            inputCountry = $('.CountryInput'),
            inputColor = $('.block_selecting .block_of_selecting_color'),
            listColor = $('#listColor'),
            inputSize = $('.block_selecting .block_of_selecting_size'),
            listSize = $('#listSize'),

            inputPerPage = $('.filterPerPage'),
            listPerPage = $('#filterPerPageList'),
            inputPriceList = $('.filterPrice'),
            listPriceList = $('#filterPriceList'),

            inputFilterProperties = $('.inputFilterProperties'),
            listFilterProperties = $('.inputFilterPropertiesList'),

            buttonCart = $('.cartItemsPriceBlock'),
            popUpCartList = $('.popUpCart');
            popUpDeleteButt = $('.deleteItemPrevCart'),
			shopByCategoryMenu = $('#shopByCategoryMenu'),
			shopByCategory = $("#shopByCategory span.arrowdown"),
			labelSearch = $('.labelSearch'),
			popUpSearch = $('.popUpSearch'),
			socialContainer = $('#socialContainer'),
			socialMore = $("#socialMore"),
			searchPopup = $('#searchPopup'),
			itemsCnt1 = parseInt($("#itemsCnt").text()),
			selectPage = $(".selectPage"),
			selectPageList = $("#selectPageList");
			
			idsearchall=$('#idsearchall');
			
			

		if (!listCountry.is(e.target) && listCountry.has(e.target).length === 0 && !inputCountry.is(e.target) && inputCountry.has(e.target).length === 0) {
            listCountry.hide();
            $('.CountryInput').removeClass('active');
        }
        if (!inputColor.is(e.target) && inputColor.has(e.target).length === 0 && !listColor.is(e.target) && listColor.has(e.target).length === 0) {
            listColor.hide();
            $('.block_selecting .block_of_selecting_color').removeClass('active');
        }
        if (!inputSize.is(e.target) && inputSize.has(e.target).length === 0 && !listSize.is(e.target) && listSize.has(e.target).length === 0) {
            listSize.hide();
            $('.block_selecting .block_of_selecting_size').removeClass('active');
        }
        if (!inputPerPage.is(e.target) && inputPerPage.has(e.target).length === 0 && !listPerPage.is(e.target) && listPerPage.has(e.target).length === 0) {
            listPerPage.hide();
            $('.filterPerPage').removeClass('active');
        }
        if (!inputPriceList.is(e.target) && inputPriceList.has(e.target).length === 0 && !listPriceList.is(e.target) && listPriceList.has(e.target).length === 0) {
            listPriceList.hide();
            $('.filterPrice').removeClass('active');
        }
        if (!inputFilterProperties.is(e.target) && inputFilterProperties.has(e.target).length === 0 && !listFilterProperties.is(e.target) && listFilterProperties.has(e.target).length === 0) {
            listFilterProperties.hide();
            $('.inputFilterProperties').removeClass('active');
        }

		if (!isNaN(itemsCnt1) && itemsCnt1 > 0)
		{
			if (!buttonCart.is(e.target) && buttonCart.has(e.target).length === 0 && !popUpCartList.is(e.target) && popUpCartList.has(e.target).length === 0 && !popUpDeleteButt.is(e.target) && popUpDeleteButt.has(e.target).length === 0) {
				popUpCartList.hide();
				$('.cartItemsPriceBlock').removeClass('active');
			}
			/*else 
			{
				
			$('.popUpCart').slideToggle('fast');
			$(this).toggleClass('active');
				$('.cartItemsPriceBlock').addClass('active');
				
				
				popUpCartList.show(); 
				alert("show");
			}*/
		}
		
		 if (!shopByCategoryMenu.is(e.target) && !shopByCategory.is(e.target)) {
            shopByCategoryMenu.hide();
        } 
		
		if (!labelSearch.is(e.target) && !popUpSearch.is(e.target)) {
            popUpSearch.hide();
			labelSearch.removeClass('active');
        }
		
		if (!socialContainer.is(e.target) && socialContainer.has(e.target).length === 0 && !socialMore.is(e.target) && socialMore.has(e.target).length === 0) {
            socialContainer.hide();
        }
		
		if (!searchPopup.is(e.target) && !searchPopup.is(e.target)) {
            searchPopup.hide();
        } 
		
		if (!selectPageList.is(e.target) && !selectPage.is(e.target)) {
            selectPageList.hide();
        } 
		
    });

    /*Product page top gallery*/

    $('.product_image_small').click(function () {
		var nameimgsrc;
		var img_source;
		img_source="#middle_"+this.id;
        $('.product_image_small').removeClass('show');
        $(this).addClass('show');
		nameimgsrc="#bigpicture_"+this.id;
        var imageUrl = $(img_source).val(); //$(nameimgsrc).val();
		var imageTitle = $(this).find("img").attr("title");
		var imageAlt = $(this).find("img").attr("alt");
        $('.product_image_big img').attr('src', imageUrl);
		$('.product_image_big img').attr('title', imageTitle);
		$('.product_image_big img').attr('alt', imageAlt);
		//var ez = $('#zoomphoto').data('elevateZoom');	
		//ez.swaptheimage(imageUrl, $(nameimgsrc).val());
		//$('.zoomWindow').css('background-image', 'url(:'+$(nameimgsrc).val()+')');
		//alert($('.zoomWindow').css('background-image')); alert($(nameimgsrc).val())
		//alert("bigpicture"+this.id)
    });

	
	
	$("ul.chooseLanguage li span").click(function() {
		var currLang = String($(this).attr("id")).replace("lang_", "");
		var newUrl = document.URL.replace('/lv/', '/' + currLang + '/').replace('/ru/', '/' + currLang + '/').replace('/en/', '/' + currLang + '/'); 
		if (newUrl.indexOf('/' + currLang + '/') == -1) {
			window.location.pathname = '/' + currLang + window.location.pathname;
		} 
		else 
		{
			window.location.href = newUrl;
		}
	});
	
	
	$("#shopByCategory span.arrowdown")
		.click(function() { 
			var l = $(".byCategoryTitle").offset().left;
			$("#shopByCategoryMenu").css("left", "" + l + "px");
			$("#shopByCategoryMenu").css('display','block');
			var firstcategory=$("#verticalTabsTop").find("ul").find("li").first().find("a");
			firstcategory.trigger("mouseenter");
			firstcategory_li=$("#verticalTabsTop").find("ul").find("li").first();
			firstcategory_li.css("backgroundPosition", "-291px 0px");
			firstcategory.css("color","#464646");
			flagCategory=1;
			//console.log();
			//alert($(".byCategoryTitle").offset().left);
		});
	$(window).resize(function() {
		var l = $(".byCategoryTitle").offset().left;
		$("#shopByCategoryMenu").css("left", "" + l + "px");
	});
		/*
	$("#shopByCategoryMenu")
		.hover(function() {
			$(this).show();
		}, function() {
			$(this).hide();
		});
		*/
		
	var currentLoaded = 10;
	$("#loadMoreProducts").click(function () {
		var rnd = Math.random();
		var uri = "/" + langCode  + "/products_handler.asp?from=" + currentLoaded + "&count=5&rnd=" + rnd;
		
		$.ajax({
			type: "GET",
			cache: false,
			dataType: 'json',
			url: uri,
			success: function (data, textStatus, jqXHR) {
				if (data.error) 
				{
					
				}
				else
				{
					var html = "<tr>"
					$.each(data.products.items, function(i, item) {
						var imageCss = getImageCss(item.image);
						html = html + "<td>"
						html = html + "<div class=\"itemCell" + (item.issale == "true" ? " saleItem" : "") + "\">";
						html = html + "<a href=\"" + item.url + "\">"
						html = html + "<div class=\"newItemImage\"><img alt=\"" + item.fullname + "\" src=\"" + item.image + "\" style=\"" + imageCss + "\"/></div>";
						html = html + "<p class=\"newItemName\">" + item.name + "</p>";
						html = html + "<div class=\"newItemPrice\">";
						html = html + "<span class=\"newItemActualPrice\">" + String(item.price).replace(".", ",") + "</span>";
						if (item.isdiscount == "true")
						{
							html = html + "<span class=\"newItemOldPrice\">" + item.retailprice + "</span>";
						}
						html = html + "</div>";
						html = html + "</a>";
						html = html + "</div>"
						html = html + "</td>";
					});
					html = html + "<tr>";
					$('#newArrivalsTable tr:last').after(html);
					currentLoaded += 5;
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			}
		})
    });
	
	$(document).ready(function() {
		checkUserInfo();
		getRecentlyViewed();
		$(".prices").css("visibility", "visible");
		$("#id").val(0);
				
	});
	

	$('#socialMore').on('click', function () {
        $('#socialContainer').slideToggle('fast');
    });
	
	$("#socialContainer ul li a").on('click', function () {
		$('#socialContainer').slideToggle('fast');
	})
	

	
	$("#searchForm").on("submit", function(e){
		e.preventDefault();
		//alert($(this).attr("action"));
		//alert($(this).serialize());
		var url = $(this).attr("action") + "#" + $(this).serialize();
		location.href = url;
		updateProductsCount();
	});
	
	if ($("#crossSeillingBlock ul li").length > 4)
	{
		$('#crossSeillingBlock').scrollbox({
			direction: 'h'
		});
		
		$('#crossSellingShowBack').click(function () {
			$('#crossSeillingBlock').trigger('backward');
		});

		$('#crossSellingShowForward').click(function () {
			$('#crossSeillingBlock').trigger('forward');
		});
	}

	if ($("#alsoBoughtBlock ul li").length > 4)
	{
		$('#alsoBoughtBlock').scrollbox({
			direction: 'h'
		});
		
		$('#alsoBoughtShowBack').click(function () {
			$('#alsoBoughtBlock').trigger('backward');
		});

		$('#alsoBoughtShowForward').click(function () {
			$('#alsoBoughtBlock').trigger('forward');
		});
	}
	
	$('.helpful').click(function () {
		if ($("#ausf"+this.name).attr('onlick')=='return false;') return;	
		SetReviewRating(this.name,'help');
		$("#ausf"+this.name).attr('onlick','return false;');
		$("#aunh"+this.name).attr('onlick','return false;');
	});
	
	$('.unhelpful').click(function () {
		if ($("#aunh"+this.name).attr('onlick')=='return false;') return;	
		SetReviewRating(this.name,'unhelp');
		$("#ausf"+this.name).attr('onlick','return false;');
		$("#aunh"+this.name).attr('onlick','return false;');
	});

	$('.block_4').click(function () {

		var rnd = Math.random();
		var namegalery='#ul'+this.name+' '
		
		var uri="/" + langCode  + "/productsbanner_handler.asp?idbaner="+this.name+"&rnd=" + rnd;
		$.ajax({
			type: "POST",
			cache: false,
			dataType: 'json',
			url: uri,
			success: function (data, textStatus, jqXHR) {
				if (data.error) 
				{
					
				}
				else
				{
					var html = ""
					$.each(data.items, function(i, item) {
						var imageCss = getImageCss(item.image);
						html = html + "<li>"
						html = html + "<a href=\"" + item.url + "\">"
						html = html + "<div class=\"itemCell" + (item.issale == "true" ? " saleItem" : "") + "\">";
						html = html + "<div class=\"newItemImage\"><img alt=\"" + item.fullname + "\" src=\"" + item.image + "\" style=\"" + imageCss + "\"/></div>";
						html = html + "<p class=\"newItemName\">" + item.name + "</p>";
						html = html + "<div class=\"newItemPrice\">";
						html = html + "<span class=\"newItemActualPrice\">" + item.price + "</span>";
						if (item.isdiscount == "true")
						{
							html = html + "<span class=\"newItemOldPrice\">" + item.retailprice + "</span>";
						}
						html = html + "</div>";
						html = html + "</div>"
						html = html + "</td>";
						html = html + "</a>";
					});
					$(namegalery).html(html);
					currentLoaded += 5;
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			}
		})	
	
	
		//$('#popup_'+this.name).dialog({modal: true,draggable: true});
		
		$('#popup_'+this.name).dialog('open');
		//$('#popupProductsGallery42 ul').html('vovan');
	});



	
	function SetReviewRating(id,direction)
	{
		var curvaluehelp=0;
		var curvalueunhelp=0;
		var valuehelp=0;
		var valueunhelp=0;
		
		if (direction=='help')
		{
			curvaluehelp=eval($("#ausf"+id).html())+1;	
			valuehelp=1;
			$("#ausf"+id).html(curvaluehelp.toString());
		}
		if (direction=='unhelp')
		{
			curvalueunhelp=eval($("#aunh"+id).html())+1;	
			valueunhelp	=1;
			$("#aunh"+id).html(curvalueunhelp.toString());
		}
		var rnd = Math.random();
		var uri = "/" + langCode  + "/shopreviewratingadd.asp?rnd=" + rnd;
		
		
		var params = { "isajax": "1", "id": id, "countsus": valuehelp, "countuns": valueunhelp};
		$.ajax({
			type: "GET",
			cache: false,
			dataType: 'json',
			url: uri,
			data: params,
			url: uri,

			success: function (data, textStatus, jqXHR) {
						
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("SetReviewRating:" + textStatus);
			}
		});



		}
	
	
	function getRecentlyViewed() {
		var rnd = Math.random();

		var uri = "/" + langCode  + "/products_handler.asp?isrecentlyviewed=1&rnd=" + rnd;
		
		$.ajax({
			type: "GET",
			cache: false,
			dataType: 'json',
			url: uri,
			success: function (data, textStatus, jqXHR) {
				if (data.error) 
				{
					console.log("error:" + data.error);
				}
				else
				{
					$("#viewedItemsGallery ul").html("");
					$("#IDviewedItemsBlock").html(data.products.BlockName);
					$.each(data.products.items, function(i, item) {
					
						var name = String(item.name);
						name=FormatProductName(name);
							
									

						
						var imageCss = getImageCss(item.image);
						var html = "<li>"
						html = html + "<a href=\"" + item.url + "\">";
						html = html + "<div class=\"itemCell" + (item.issale == "true" ? " saleItem" : "") + "\">";
						html = html + "<div class=\"newItemImage\">";
						html = html + "<img src=\"" + item.image + "\" style=\"" + imageCss + "\" />";
						html = html + "</div>";
						html = html + "<p class=\"newItemName\">" + name + "</p>";
						html = html + "<div class=\"newItemPrice\">";
						html = html + "<span class=\"newItemActualPrice\">" + String(item.price).replace(".", ",") + "</span>"
						if (item.isdiscount == "true")
						{
							html = html + "<span class=\"newItemOldPrice\">" + item.retailprice + "</span>";
						}
						html = html + "</div>";
						html = html + "</div>";
						html = html + "</a>";
						html = html + "</li>";
						$("#viewedItemsGallery ul").append(html);						
					});
					$("#recentlyViewed").show();
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			}
		})
    }
	
	// search
	
	$('#search').keyup(function(){
		var searchField = $('#search').val();
		if (searchField.length > 2)
		{
			var rnd = Math.random();
			var count;
			count=0;
			var catId = $("#id").val();
			var uri = "/" + langCode  + "/search_handler.asp?keyword=" + searchField + "&category=" + catId + "&rnd=" + rnd;
			$.ajax({
				type: "GET",
				cache: false,
				dataType: 'json',
				url: uri,
				success: function (data, textStatus, jqXHR) {
					if (data.items.length > 0)
					{
						var output = '<table class="searchresult" cellspacing="0" cellpadding="0" width="100%">';
						$.each(data.items, function(key, val) {
							output += '<tr>';
							output += '<td><img src="' + val.img + '" /></td>';
							output += '<td><a href="' + val.url + '">' + val.name + '</a></td>'						
							output += '<td><b>'+ val.price + '</b></td>'						
							output += '</tr>';
							count++;
						});
						if (count==5)
						{
							output += '<tr align="center"><td colspan="3"><a href="#" id="idsearchall">'+ProductAllResultMessage+'</a></td></tr>';
						}
						output += '</table>';
						$('#searchPopup').html(output);
						$('#searchPopup').css("display", "block");
						$('#idsearchall').click(function(){
							$('#searchForm').submit();
						});
					}
					else
					{
						$('#searchPopup').html("");
						$('#searchPopup').css("display", "none");
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});
		}
	});
	//clear filters
	$("#clear_filter").click(function() { 
		$("#pageNum").text('1');
		$('.selectPage').text("1");	
		var parentFilters=$('.filterPropBlock').find('.current').parents('div.filterPropBlock');
		parentFilters.find('.customCheckbox').find('li').find('input.flCheck').prop("checked", false);
		$('.filterPropBlock').find('.activeFilter').removeClass('current');
		var url = window.location.href;
		var pos = url.lastIndexOf("#");
		if (pos != -1)
		{
				url = url.substr(0, pos);
		}
		//alert(url)
		var pageKey = window.location.pathname;
		var pos = pageKey.lastIndexOf("/");
		var pos1 = pageKey.lastIndexOf(".asp");
		if (pos != -1 && pos1 != -1 & pos + 1 < pos1)
		{
			pageKey = pageKey.substr(pos + 1, pos1 - pos - 1);
		}
		
			currentPageNumber = 1;
			var selectedSortOrder = $("#currentFilter").val();
			var choosePerPage = parseInt($(".filterPerPage").text());
			if (isNaN(choosePerPage))
			{
				choosePerPage = currentPageNumber;
			}
			
			var hash = "page=" + currentPageNumber + "&pagesize=" + choosePerPage + "&sortorder=" + selectedSortOrder;		
			history.pushState( {key: pageKey}, 'Title', url + "#" + hash);
			//saveStep(16);
			
			if (Object.keys(filterState).length>0)
			{
				for(i = 0; i< Object.keys(filterState).length; i++)
				{delete filterState[Object.keys(filterState)[i]];}
							
			}
			updateProductsCount();
			
	});
	
	
	
});

var pageIdx = 0;
var currPagePath = "";
$(document).ready(function() { 
	currPagePath = window.location.pathname;
	pageIdx = 0;
	$("#seomaintextshow").click(
		function() { 
			$("#seotexthide").toggle();
			$("#seomaintextshow").css('display','none');
			$("#seomaintexthide").css('display','block');
		}	
	);
	$("#seomaintexthide").click(
		function() { 
			$("#seotexthide").toggle();
			$("#seomaintextshow").css('display','block');
			$("#seomaintexthide").css('display','none');
		}	
	);
	//alert(currPagePath);
	$("#cot_tl_pop").css('z-index','1000');
	
	
	function ShowDeliveryMessage()
	{
		$("#DeliveryMessage").dialog({
			title: DeliveryMessage_Title,
			modal: true,
			draggable: true,
			width:800,
			maxHeight:450,
			buttons: [
				{
					
					text: "OK",
					click: function() {
						$( this ).dialog( "close" );
						$('.ui-dialog .ui-dialog-titlebar').css('display','none')
					}
				}
			]
		});
		$("#DeliveryMessage").css('padding','5px 10px');
		$('.ui-dialog .ui-dialog-titlebar').css('display','block')

	}
	function ShowRightsMessage()
	{
		$("#RightsMessage").dialog({
			title: RightsMessage_Title,
			modal: true,
			draggable: true,
			width:800,
			maxHeight:450,
			buttons: [
				{
					
					text: "OK",
					click: function() {
						$( this ).dialog( "close" );
						$('.ui-dialog .ui-dialog-titlebar').css('display','none')
					}
				}
			]
		});
		$("#RightsMessage").css('padding','5px 10px');
		$('.ui-dialog .ui-dialog-titlebar').css('display','block')

	}
	
	$("#buttonRightsMessage").click(	function () {
		ShowRightsMessage();
	});
	
	$("#buttonShowDelivery").click(	function () {
		ShowDeliveryMessage();
	});	
	
});


/*
$(function() {
	var pageIdx = parseInt(sessionStorage["pageIdx"]);
	if (isNaN(pageIdx))
	{
		sessionStorage["pageIdx"] = 0;
		pageIdx = 0;
	}
	else
	{
		pageIdx++;
		sessionStorage["pageIdx"] = pageIdx;
	}
	sessionStorage[pageIdx] = window.location.pathname;
});

function getStep() {

	var key = getPageKey();
	var pageIdx = sessionStorage[key]
	if (!isNaN(pageIdx))
	{
		return pageIdx;
	}
	return 0;
};

function saveStep(idx) {
	//alert(idx);
	var key = getPageKey();
	//alert(key);
	var pageIdx = sessionStorage[key]
	if (isNaN(pageIdx))
	{
		sessionStorage[key] = 1;
		pageIdx = 1;
	}
	else
	{
		pageIdx++;
		sessionStorage[key] = pageIdx;
	}
}

function resetSteps() {
	
	var key = getPageKey();
	//alert(key);
	sessionStorage[key] = 0
}

function getPageKey()
{
	var pageKey = window.location.pathname;
	var pos = pageKey.lastIndexOf("/");
	var pos1 = pageKey.lastIndexOf(".asp");
	if (pos1 == "")
	{
		return "";
	}
	if (pos != -1 && pos1 != -1 & pos + 1 < pos1)
	{
		pageKey = pageKey.substr(pos + 1, pos1 - pos - 1);
	}
	console.log("getPageKey");

	return pageKey;
}


/*
$(window).on('popstate', function() {
   window.history.back();
});
*/
function gotolink(link)
{
	location.href = link;
}

function displayMoreColors(obj,showLabel, hideLabel)
{
	if ($("#hs"+obj).is(":visible"))
	{
		$("#hs"+obj).hide();
		$("#hval"+obj).text(showLabel);
	}
	else
	{
		$("#hs"+obj).show();
		$("#hval"+obj).text(hideLabel);	
	}
}
function displayMoreFilter(showLabel, hideLabel)
{
	if ($("#filtersblockhide").is(":visible"))
	{
		$("#filtersblockhide").hide();
		$("#afilterhidebutton").text(showLabel);
	}
	else
	{
		$("#filtersblockhide").show();
		$("#afilterhidebutton").text(hideLabel);	
	}
}

var checkResult = "";
var notInStock = false;
var messageIsShown = false;

function checkAvailability(waitMsg, notInStockMsg, errorCheckAvailabilityMsg, callback) { 
	/**/
	if (checkResult == "wait")
	{
		return;
	}
    /**/
    var cId = $("#productid").val();

    var uri = "/" + langCode  + "/asos/check_product_availability.asp?catalogid=" + cId;
	checkResult = "wait";
    $.ajax({type: "GET", 
		cache: false, 
		dataType: 'json', 
		url: uri,
        success: function (data, textStatus, jqXHR)
        {
            
            if (data.error) {
				//alert(errorCheckAvailabilityMsg);
                console.log("checkAvailability error: " + data.error);
				//callback();
            } 
            else {
                var cstock = parseInt(data.cstock);
                if (!isNaN(cstock) && cstock <= 0) {
					if (!messageIsShown)
					{
						$("#MessageDialog").html(notInStockMsg);
						ShowMessageDialog();
						messageIsShown = true;
					}
					notInStock = true;
                }
            }
			//alert(data.cstock);
			callback();
			checkResult = "";
        },
        error: function(jqXHR, textStatus, errorThrown) {
			//alert(errorCheckAvailabilityMsg );
            console.log("checkAvailability error 1: " + textStatus);
            //callback();
			checkResult = "";
			callback();
        }
    });
	//callback();
};
