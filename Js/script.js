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

function Create_obj_of_characts(){
	this.current = new Object();
	this.newer = new Object();
	}

Create_obj_of_characts.prototype.update_objects = function(obj_ct){
	this.newer = {'obj': $(obj_ct).parents("#product_out"), 'id':$(obj_ct).attr('id')};
	if(
	$('#outer_shop').children('#product_out').filter('.current')[0] != null && 
	$('#outer_shop').children('#product_out').filter('.current')[0] != 'undefined'){
		this.current = {
			'obj':$('#outer_shop').children('#product_out').filter('.current'), 
			'id':$('#outer_shop').children('#product_out').filter('.current').find('#right_shop_block_a > a').attr('id')}
			}else this.current = new Object();
	return {'current': this.current, 'newer':this.newer};
}

function what_should_I_do(){
	var me = this;
if($(me.current['obj']).is($(me.newer['obj'])))close_characts.call(me.newer);else open_characts.call(me.newer); 
/*if(!$.isEmptyObject(me.current)){
	if($(me.current['obj']).is($(me.newer['obj']))){
	close_characts.call(me.newer);	
		}else{
			open_characts.call(me.newer);
			close_characts.call(me.current);
			}
	}else open_characts.call(me.newer);*/
}//function what_should_I_do(){

function close_characts(){
	var me = this;
$($(me['obj']).find('p')).fadeOut('fast', function(){		
		if($(me['obj']).find('p').last().is(this)){
		//отправка Ajax'a
		$.get('ajax/request.php', {'give_to_me_of_less_characts':me['id']}, function(response){
			$(me['obj']).find('#right_shop_block_a > a').fadeOut('fast', function(){
				$(me['obj']).find('#right_shop_block_a > a').text('Просмотреть характеристики...').fadeIn('fast');
				});//fadeOut('fast', function(){
			$(response).hide().insertBefore($(me['obj']).find("#right_shop_block_empty"));
			$(me['obj']).animate({height: '182px'}, 'fast', 'swing', function(){
				$(me['obj']).find('p').show('fast', function(){
					$(me['obj']).removeClass('current');
					});//show('fast', function(){
				});//animate({height: size_of_block+'px'}, 'fast', 'swing', function(){
			});//$.get('ajax/request.php', {'give_to_me_of_less_characts':this['id']}, function(response){
			}//if($(me['obj']).find('p').last().is(this)){
		$(this).detach();
		})
	}

function open_characts(){
	var me = this;
$($(me['obj']).find('p')).fadeOut('fast', function(){		
	if($(me['obj']).find('p').last().is(this)){
		//отправка Ajax'a
		$.get('ajax/request.php', {'give_me_characts_on_id':me['id']}, function(response){
			$(me['obj']).find('#right_shop_block_a > a').fadeOut('fast', function(){
				$(me['obj']).find('#right_shop_block_a > a').text('Скрыть характеристики...').fadeIn('fast');
				});//fadeOut('fast', function(){
			$(response).hide().insertBefore($(me['obj']).find("#right_shop_block_empty"));
			var size_of_block = 56+($(me['obj']).find('p').length)*15;
			$(me['obj']).animate({height: size_of_block+'px'}, 'fast', 'swing', function(){
				$(me['obj']).find('p').show('fast', function(){
					$(me['obj']).addClass('current');
					});//show('fast', function(){
				});//animate({height: size_of_block+'px'}, 'fast', 'swing', function(){
			});//$.get('ajax/request.php', {'give_me_characts_on_id':this['id']}, function(response){
			}//if($(me['obj']).find('p').last().is(this)){
		$(this).detach();
	});//fadeOut('fast', function()
	}

$(document).ready(function() {
	var ajaxus = sendAjax();
	var obj_of_characts = new Create_obj_of_characts();
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
	what_should_I_do.call(obj_of_characts.update_objects($(this)));		
	return false;
	});
//открытие пункта сплит-систем при загрузке страницы магазина
if(document.getElementById("split_system"))document.getElementById("split_system").click();
});