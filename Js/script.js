	//куфон
Cufon.replace('h1, h2, h3, h5');
	//функции
function CreateAjaxData(count){
this.AjaxData = {
		what:$('a.current:first').attr('data-what'),
		category:(function(){
			if($('a.current:first').attr('data-what') == "category")return 'off'; else return $('a.current:first').attr('data-category');
			}()),
		currentWrite:count,
		getpanel:(function(){
			if($('div#sort_panel')[0] == null || $('div#sort_panel')[0] == 'undefined')return 'yes'; else return 'off';
			}()),
		key:$('a.current:first').attr('data-key'),
		data:$('a.current:first').attr('href'),
		id:$('a.current:first').attr('id'),
		invertor:(function(){
			if($('input[type=checkbox]')[0] != null && $('input[type=checkbox]')[0] != 'undefined'){
				if($('input#check:checkbox:checked').length == 1)return 'on';else return 'off';
			}else{
				return 'off';
				}
			}()),
		classPower:(function(){
			if($('select')[0] != null && $('select')[0] != 'undefined'){
					if($('#select_right_sort_block select') != 'none')return $('#select_right_sort_block select').val();else return 'off';
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
	/*for(prop in AjaxData){
		if(AjaxData[prop] == 'undefined' || AjaxData[prop] == null){
			alert(AjaxData[prop]+" На странице возникла неустранимая ошибка, пожалуйста, перезагрузите страницу");
			return false;
			}
		}*/
	}

function sendAjax(){
	//var  AjaxData = createAjaxData(count);	
	var count = 0, countOfWrites = 7,/*добавление по countOfWrites(7) записей*/ cacheElement = null, sendingAjax = function(){
		$.ajax({
		url:'ajax/request.php', 
		data: this.AjaxData,
		success:function(response){
			$(response).hide().appendTo("div#outer_shop");
			$('#outer_shop').children().last().fadeIn("fast", function(){
				if(count%countOfWrites != 0){sendingAjax.call(new CreateAjaxData(++count)); alert('sendingAjax:true = '+count);}else alert('sendingAjax:false = '+count);
				});
			},
		type:'GET',
		async:false
	});
		}

	return {
		checkAndSend: function(obj){
			if($.isEmptyObject(obj)){
				//for(var i=0; i<countOfWrites; i++)oneMoreSomeFunction.call(new CreateAjaxData(count++));//добавление при прокрутке
				alert('ваще хуйня');
				}else{
			//проверка меню сортировки
			if(!$('ul#accordion > li').has(obj).find('a').is('a.current')){
				//здесь будет выполняться скрытие всего блока outer_shop, ВКЛЮЧАЯ меню сортировки
				//alert('всё очистить');
					$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
					$(obj).addClass("current");
					count = 0;	
					//cacheElement = $('div#outer_shop').children();
					$('div#outer_shop').children().fadeOut('slow', function(){
						$('div#outer_shop').children().detach();
						sendingAjax.call(new CreateAjaxData(++count));	
						alert('checkAndSend:sended = '+count);
						});
					}else{
						$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
						$(obj).addClass("current");
						//alert('добавить');
						count = 1;
						//а здесь будет выполняться скрытие ТОЛЬКО товаров, НЕВКЛЮЧАЯ меню сортировки
						$('div#outer_shop').children().filter('div#product_out').fadeOut('slow', function(){
							$('div#outer_shop').children('div').filter('#product_out').detach();
							sendingAjax.call(new CreateAjaxData(++count));	
							});
						}
			//подготовка данных для ajax
			//отправка Ajax'a
				}
			alert('checkAndSend = '+count);
			if($('input[type=checkbox]')[0] == null || $('input[type=checkbox]')[0] == 'undefined')$('div#invert_right_sort_block').css({'border-right-style':'none','border-right-width':'0px','border-right-color':'none'});
			if($('select')[0] == null || $('select')[0] == 'undefined')$('#href_right_sort_block').css({'border-left-style':'none','border-left-width':'0px','border-left-color':'none','padding-left':'10px'});	
			return true;
			}
		};
	}

$(document).ready(function() {
	var ajaxus = sendAjax();
	//var counter = get_count();
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
	counter.set_count();
	$('div#product_out').fadeOut('fast',function(){
		$('div').detach('#product_out');});
	if(!sendAjax(counter.get))return false;
	});
	
//изменение значения 'select'
$('#outer_shop').on('change', '#select_right_sort_block select', function(){
	$('div#product_out').fadeOut('fast',function(){
		$('div').detach('#product_out');});
	if(!sendAjax(counter.get))return false;
	//alert($(this).val());
	});
	
//клик по ссылке "цена:"
$('#outer_shop').on('click', '#href_right_sort_block a', function(){
	counter.set_count();
	$('div#product_out').fadeOut('fast',function(){
		$('div').detach('#product_out');});
	if(!sendAjax(counter.get))return false;
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
	return false;
	});
	//открытие пункта сплит-систем при загрузке страницы магазина
if(document.getElementById("split_system"))document.getElementById("split_system").click();
//if(document.getElementById("Electrolux"))document.getElementById("Electrolux").click();
});