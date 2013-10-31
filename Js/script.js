	//куфон
Cufon.replace('h1, h2, h3, h5');
	//функции
	
function sendAjax(){	
	var count = 0, countOfWrites = 7,/*добавление по countOfWrites(7) записей*/ AjaxData = {};
	return {
		checkAndSend: function(obj){
			var self = this;
			if($.isEmptyObject(obj)){
				//for(var i=0; i<countOfWrites; i++)oneMoreSomeFunction.call(new CreateAjaxData(count++));//добавление при прокрутке
				alert('ваще хуйня');
				}else{
			//проверка меню сортировки
			if(!$('ul#accordion > li').has(obj).find('a').is('a.current')){
				//здесь будет выполняться скрытие всего блока outer_shop, ВКЛЮЧАЯ меню сортировки
					$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
					$(obj).addClass("current");
						try{
						this.CreateAjaxData();
						}catch(e){
						//alert(e);
						return false;
					}	
					count = 0;
					$('div#outer_shop').children().fadeOut('slow', function(){
						if($('div#outer_shop').children().last().is(this)){
							$('div#outer_shop').children().detach();
							self.sendingAjax(count);
						}
						});
					}else{
						$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
						$(obj).addClass("current");
						try{
				this.CreateAjaxData();
				}catch(e){
					//alert(e);
					return false;
					}
						count = 1;
						//а здесь будет выполняться скрытие ТОЛЬКО товаров, НЕВКЛЮЧАЯ меню сортировки
						$('div#outer_shop').children().not('#sort_panel').fadeOut('slow', function(){
							if($('div#outer_shop').children().not('#sort_panel').last().is(this)){
								$('div#outer_shop').children('div').not('#sort_panel').detach();
								self.sendingAjax(count);
								}		
							});
						}
				}
			return true;
			},
			CreateAjaxData: function(){
		AjaxData = {
		what:$('a.current:first').attr('data-what'),
		category:(function(){
			if($('a.current:first').attr('data-what') == "category")return 'off'; else return $('a.current:first').attr('data-category');
			}()),
		key:$('a.current:first').attr('data-key'),
		data:$('a.current:first').attr('href'),
		id:$('a.current:first').attr('id'),
		invertor:(function(){
			if($('input[type=checkbox]')[0] != null || $('input[type=checkbox]')[0] != 'undefined'){
				if($('input#invertor:checkbox:checked').length == 1)return 'on';else return 'off';
			}else{
				return 'off';
				}
			}()),
		classPower:(function(){
			if($('select')[0] != null && $('select')[0] != 'undefined'){
					if($('#select_right_sort_block select').val() != 'none')return $('#select_right_sort_block select').val();else return 'off';				
				}else{
					return 'off';
					}
			}()),
		sortPrice:(function(){
			if($('#href_right_sort_block a')[0] != null && $('#href_right_sort_block a')[0] != 'undefined'){
				if($('#href_right_sort_block a').attr("data-sort") != 'none')return $('#href_right_sort_block a').attr("data-sort"); else return 'off';
			}else{
					return 'off';
					}
			}())
		};
	for(prop in AjaxData){if(AjaxData[prop] == 'undefined' || AjaxData[prop] == null)throw(prop+" = "+AjaxData[prop]+" На странице возникла ошибка, пожалуйста, перезагрузите страницу");	}
	return true;
	},
	sendingAjax: function(val){
	var self = this;
		AjaxData['currentWrite'] = val;
		AjaxData['out'] = 'count';
		$.ajax({
		url:'ajax/request.php', 
		data: AjaxData,
		dataType:'text',
		success:function(response){	
			if(response != 0){
				AjaxData['out'] = 'product';
				$.ajax({
				url:'ajax/request.php', 
				data: AjaxData,
					success:function(response){
					$(response).hide().appendTo("div#outer_shop");
					if(count == 0){if($('input[type=checkbox]')[0] == null || $('input[type=checkbox]')[0] == 'undefined')$('div#invert_right_sort_block').css({'border-right-style':'none','border-right-width':'0px','border-right-color':'none'});
					if($('select')[0] == null || $('select')[0] == 'undefined')$('#href_right_sort_block').css({'border-left-style':'none','border-left-width':'0px','border-left-color':'none','padding-left':'10px'});}
						$('#outer_shop').children().last().fadeIn("fast", function(){	
							if(count == 0 || count%countOfWrites != 0)self.sendingAjax(++count);	
						});
					},
				type:'GET',
				async:false
				});
			}
		},
		type:'GET',
		async:false
	});
		}
		};
	}

/*
function give_me_characts(arr){
	$.get('ajax/request.php', {'give_me_characts_on_id':arr['id']}, function(response){
		$(arr['obj']).find('#right_shop_block_a > a').fadeOut('fast', function(){
			$(arr['obj']).find('#right_shop_block_a > a').text('Скрыть характеристики...').fadeIn('fast');
			});
		$(response).hide().insertBefore($(arr['obj']).find("#right_shop_block_empty"));
		var size_of_block = 56+($(arr['obj']).find('p').length)*15;
		$(arr['obj']).animate({height: size_of_block+'px'}, 'fast', 'swing', function(){
			$(arr['obj']).find('p').show('fast');
		});
		});
	}
	
function give_to_me_of_less_characts(arr){
	$.get('ajax/request.php', {'give_to_me_of_less_characts':arr['id']}, function(response){
		$(arr['obj']).find('#right_shop_block_a > a').fadeOut('fast', function(){
			$(arr['obj']).find('#right_shop_block_a > a').text('Просмотреть характеристики...').fadeIn('fast');
			});
		$(response).hide().insertBefore($(arr['obj']).find("#right_shop_block_empty"));
		$(arr['obj']).animate({height: '182px'}, 'fast', 'swing', function(){
			$(arr['obj']).find('p').show('fast');
		});
		});
	}
	
function give_to_me_of_less_characts(obj){
	$.get('ajax/request.php', {'give_to_me_of_less_characts':obj['id']}, function(response){
		$(obj['obj']).animate({height: '182px'}, 'fast', 'swing', function(){
			 
			});
		});
	}
*/


$(document).ready(function() {
	var ajaxus = sendAjax();
	//слайдшоу
$("#slides").zAccordion({startingSlide: 0,slideWidth: 700,auto: true,speed: 1000,tabWidth: 50,timeout: 6000,width: 800,height: 400,/*trigger: "mouseover",*/slideClass: "frame",slideOpenClass: "frame-open",slideClosedClass: "frame-closed",easing: "easeOutCirc"});
	//вертикальное меню
$('#accordion').dcAccordion({/*eventType: 'click',autoClose: true,saveState: true,disableLink: true,speed: 'slow',showCount: true,autoExpand: true,cookie	: 'dcjq-accordion',classExpand	 : 'dcjq-current-parent',*/eventType: 'click',autoClose: true,saveState: false,disableLink: false,showCount: false,speed: 'slow'});
	//присвоение статуса current для навигации
onload = function () {for(var lnk = document.links, j = 0; j < lnk.length; j++)if(lnk[j].href == document.URL) lnk[j].parentNode.className = 'current';}
	//события
$('a[href^="http://"]').attr("target", "_blank");//если вначале ссылки присутствует "http://", т.е. ссылка на сторонний сайт - открывает её в новом окне

//СОБЫТИЯ ДЛЯ AJAX!!!!

//клик по категории в меню
$('#accordion').on('click', 'a', function(){
	if(!ajaxus.checkAndSend($(this)))return false;
	return false;
	});
	
//клик по ссылке "инвертор" - перенаправляет на чекбокс
$('#outer_shop').on('click', '#invert_right_sort_block a', function(){
$('#invert_right_sort_block input[type=checkbox]').click();
	return false;
	});

//клик по чекбоксу
$('#outer_shop').on('click', '#invert_right_sort_block input[type=checkbox]', function(){
if(!ajaxus.checkAndSend($('a.current:first')))return false;
	});
	
//изменение значения 'select'
$('#outer_shop').on('change', '#select_right_sort_block select', function(){
	if(!ajaxus.checkAndSend($('a.current:first')))return false;
	});
	
//клик по ссылке "цена:"
$('#outer_shop').on('click', '#href_right_sort_block a', function(){
	switch ($(this).attr("data-sort")){
		case "none":{	
			$(this).attr("data-sort", "down");
			$("#href_right_sort_block").css({
			"background":"url(CSS/images/green-arrow-down.png) no-repeat 0 center",
			"background-position":"60px -10px"
			});
			break;
			}
		case "down":{
			$(this).attr("data-sort", "up");
			$("#href_right_sort_block").css({
			"background":"url(CSS/images/green-arrow-up.png) no-repeat 0 center",
			"background-position":"60px -10px"
			});
			break;
			}
		case "up":{
			$(this).attr("data-sort", "none");
			$("#href_right_sort_block").css({
			"background":"url(CSS/images/green-arrow-up-down.png) no-repeat 0 center",
			"background-position":"60px -10px"
			});
			break;
			}
		}
	if(!ajaxus.checkAndSend($('a.current:first')))return false;
	return false;
	});

//клик по характеристикам
$('#outer_shop').on('click', '#right_shop_block_a > a', function(){
	/*
	var arr = new Array(), obj = $(this).parents("#product_out").find("p");
	arr['id'] = $(this).attr('id');
	arr['obj'] = $(this).parents("#product_out");
	$(obj).fadeOut('fast', function(){
		$(this).detach();
		if($(obj).last().is(this)){
			if($('#outer_shop').children('#product_out').is('.current'))give_to_me_of_less_characts({
				'id':$('.current').find('#right_shop_block_a > a').attr('id'),
				'obj':$('.current'),
				'arr':arr
				});else{
					arr['obj'].addClass("current");
					give_me_characts(arr);
					}
			};
		});*/		
	return false;
	});
	//открытие пункта сплит-систем при загрузке страницы магазина
if(document.getElementById("split_system"))document.getElementById("split_system").click();
});