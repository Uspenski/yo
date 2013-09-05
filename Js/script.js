	//куфон
Cufon.replace('h1, h2, h3, h5');
	//функции
function CreateAjaxData(count){
return {
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
	}

function sendAjax(count, obj){
	//var  AjaxData = createAjaxData(count);	
	var count = 0;
	var countOfWrites = 7;//добавление по countOfWrites(7) записей
	if($('input[type=checkbox]')[0] == null || $('input[type=checkbox]')[0] == 'undefined')$('div#invert_right_sort_block').css({'border-right-style':'none','border-right-width':'0px','border-right-color':'none'});
	if($('select')[0] == null || $('select')[0] == 'undefined')$('#href_right_sort_block').css({'border-left-style':'none','border-left-width':'0px','border-left-color':'none','padding-left':'10px'});
	return {
		someFunction: function(obj){
			if($.isEmptyObject(obj)){
				for(var i=0; i<countOfWrites; i++)oneMoreSomeFunction.call(new CreateAjaxData(count++));//добавление при прокрутке
				}else{
			//проверка меню сортировки
			if(obj.attr('data-what') == "category" && ($('a.current:first') != obj || !obj.children().is($('a.current:first')))){
				//здесь будет выполняться скрытие всего блока outer_shop, ВКЛЮЧАЯ меню сортировки
					count = 0;
					$('*').fadeOut('slow', function(){
						for(var i=0; i<countOfWrites; i++)oneMoreSomeFunction.call(new CreateAjaxData(count++));
						});
					}else{
						count = 1;
						//а здесь будет выполняться скрытие ТОЛЬКО товаров, НЕВКЛЮЧАЯ меню сортировки
						$('*').fadeOut('slow', function(){
							for(var i=0; i<countOfWrites; i++)oneMoreSomeFunction.call(new CreateAjaxData(count++));
							});
						}
			//подготовка данных для ajax
			//отправка Ajax'a
				}
			}
		};
	}

function oneMoreSomeFunction(){
	//Обращение к элементам будет происходить через this, т.к. она будет вызвана методом call
		$.ajax({
		url:'ajax/request.php', 
		data: AjaxData,
		success:function(response){},
		type:'GET',
		async:false
	});
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
	
	//$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
	//$(this).addClass("current");
	//if(!sendAjax(counter.get, $(this)))return false;
	if(!ajaxus.someFunction($(this)))return false;
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