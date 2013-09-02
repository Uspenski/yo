	//куфон
Cufon.replace('h1, h2, h3, h5');

	//функции
function sendAjax(count){
	var AjaxData = {
		what:$('a.current:first').attr('data-what'),
		category:(function(){
			if($('a.current:first').attr('data-what') == "category")return 'off'; else return $('a.current:first').attr('data-category');
			}()),
		currentWrite:count(),
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
	for(prop in AjaxData){
		if(AjaxData[prop] == 'undefined' || AjaxData[prop] == null){
			alert(AjaxData[prop]+" На странице возникла неустранимая ошибка, пожалуйста, перезагрузите страницу");
			return false;
			}
		}
	//$('div#outer_shop').empty();
	for(var i=0; i<7; i++){
		
	$.ajax({
		url:'ajax/request.php', 
		data: AjaxData,
		success:function(response){
			/*
			if($('div#sort_panel')[0] == null || $('div#sort_panel')[0] == 'undefined'){
			$('div#outer_shop').fadeOut('fast', function(){
			$('div#outer_shop').append(response).fadeIn('slow');
			});
			}else{
			$('div#product_out').fadeOut('fast', function(){
			//if($('div#product_out')[0] != null && $('div#product_out')[0] != 'undefined')alert('ok');
			//$('div#outer_shop').append(response);
			//$('div#product_out').fadeIn('slow');
			//$('div#outer_shop').append(response).fadeIn('slow');
			$('div#outer_shop').append(response).fadeIn('slow');
			});	
			
				}*/
			$('div#outer_shop').append(response).fadeIn('slow');
			},
		type:'GET',
		async:false
	});
	AjaxData.currentWrite = count();
	}
	if($('input[type=checkbox]')[0] == null || $('input[type=checkbox]')[0] == 'undefined')$('div#invert_right_sort_block').css({'border-right-style':'none','border-right-width':'0px','border-right-color':'none'});
	if($('select')[0] == null || $('select')[0] == 'undefined')$('#href_right_sort_block').css({'border-left-style':'none','border-left-width':'0px','border-left-color':'none','padding-left':'10px'});
	return true;
	}

function get_count(){
	var n = 0;
	return {get:function(){return n++;},set_count:function(){n = 0;}}
	}

$(document).ready(function() {
	var counter = get_count();
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
	counter.set_count();
	if($(this).attr('data-what') == 'category' && $('a.current:first').attr('data-what') != 'category' && $(this).attr('id') == $('a.current:first').attr('data-category')){
		//если ткнутая ссылка - категория И текущая(current) ссылка - не категория И ткнутая ссылка является подкатегорией текущей(current)- то не обновлять панель параметров сортировки, т.к. сортируем тоже самое, что и было
		$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
		$(this).addClass("current");
		$('div#product_out').fadeOut('fast',function(){
		$('div').detach('#product_out');});
		}else{
		//иначе - 
		if($(this).attr('data-what') == 'category' && $('a.current:first').attr('data-what') == 'category' && $(this)[0] == $('a.current:first')[0]){
			//если ткнутая ссылка категории является текущей(т.е. юзер ткнул в тикущую ссылку) - сортировку оставить прежней
			$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
			$(this).addClass("current");
			//$('div#product_out').fadeOut('fast',function(){
			$('div').detach('#product_out');//});
				}else{
			$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
			$(this).addClass("current");
			if($(this).attr('data-what') == 'category')$('div#outer_shop').empty(); else {
				$('div#product_out').fadeOut('fast',function(){
				$('div').detach('#product_out');});}	
			}
		}
	if(!sendAjax(counter.get))return false;
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
});