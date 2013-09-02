	//функции
function sendAjax(count){
	var data = {
		what:$('a.current:first').attr('data-what'),
		category:(function(){
			if($('a.current:first').attr('data-what') == "category")return 'off'; else return $('a.current:first').attr('data-category');
			}),
		currentWrite:count(),
		key:$('a.current:first').attr('data-key'),
		data:$('a.current:first').attr('href'),
		id:$('a.current:first').attr('id'),
		invertor:(function(){
			if($('input[type=checkbox]')[0] != null && $('input[type=checkbox]')[0] != 'undefined'){
				if($('input#check:checkbox:checked').length == 1)return 'on';else return 'off';
			}else{
				return 'off';
				}
			}),
		classPower:(function(){
			if($('select')[0] != null && $('select')[0] != 'undefined'){
					if($('#select_right_sort_block select') != 'none')return $('#select_right_sort_block select').val();else return 'off';
				}else{
					return 'off';
					}
			}),
		sortPrice:(function(){
			if($('#href_right_sort_block a').attr("data-sort") != 'none')return $('#href_right_sort_block a').attr("data-sort"); else return 'off';
			})
		};
	for(prop in data){if(data[prop] == 'undefined' || data[prop] == null){
		alert(prop+" На странице возникла неустранимая ошибка, пожалуйста, перезагрузите страницу");
		return false;
		}}
	//$('div#outer_shop').empty();
	return true;
	}
function create_production(obj){
	for(var i=0; i<7; i++)$.ajax({
		url:'ajax/request.php', 
		data:{
			what:obj.what,
			category:obj.category,
			currentWrite:obj.currentWrite(),
			//sortBy:null,
			key:obj.key,
			data:obj.data,
			id:obj.id
			},
		success:function(response){$('div#outer_shop').append(response)},
		type:'GET',
		async:false
	});
	$('div#outer_shop').fadeIn("slow");
	if($('input[type=checkbox]')[0] == null || $('input[type=checkbox]')[0] == 'undefined')$('#invert_right_sort_block').css({'border-right-style':'none','border-right-width':'0px','border-right-color':'none'});
	if($('select')[0] == null || $('select')[0] == 'undefined')$('#href_right_sort_block').css({'border-left-style':'none','border-left-width':'0px','border-left-color':'none','padding-left':'10px'});
	}
function get_count(){
	var n = 0;
	return {get:function(){return n++;},set_count:function(){n = 0;}}
	}
	//куфон
Cufon.replace('h1, h2, h3, h5');	
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
//$('a.catalog, .dcjq-current-parent ul li a').click(function(){
$('#accordion a').on('click', function(){
	counter.set_count();
	$('.graphite .accordion a, .graphite .accordion ul li a').removeClass("current");
	//$('div#outer_shop').hide("fast");
	$('div#outer_shop').empty();
	if($(this).attr('data-what') == 'category'){
		create_production({
		what:$(this).attr('data-what'),
		category:$(this).attr('data-category'),
		currentWrite:counter.get,
		key:$(this).attr('data-key'),
		data:$(this).attr('href'),
		id:$(this).attr('id')
		});
		}else{
		create_production({
		what:$(this).attr('data-what'),
		category:$(this).attr('data-category'),
		currentWrite:counter.get,
		//sortBy:null
		key:$(this).attr('data-key'),
		data:$(this).attr('href'),
		id:$(this).attr('id')
		});
		}
	$(this).addClass("current");
	return false;
	});	
	//открытие пункта сплит-систем при загрузке страницы магазина
if(document.getElementById("split_system"))document.getElementById("split_system").click();
	//события выведенных ajax'ом данных
$('#outer_shop').on('click', '#outer_shop', function(){
	//запрос к серверу с выборкой
	});
$('#outer_shop').on('change', '#select_right_sort_block select', function(){
	alert($(this).val());
	});
$('#outer_shop').on('click', '#invert_right_sort_block a', function(){
	$('#invert_right_sort_block input[type=checkbox]').click();
	return false;
	});
$('#outer_shop').on('click', '#href_right_sort_block a', function(){
	counter.set_count();
	//alert($('a.current:first').attr("data-what"));
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
	//если на странице нет чекбокса с инвертором
if($('input[type=checkbox]')[0] == null || $('input[type=checkbox]')[0] == 'undefined')$('#invert_right_sort_block').css({
	'border-right-style':'none',
	'border-right-width':'0px',
	'border-right-color':'none'});
	else $('#invert_right_sort_block').css({
	'border-right-style':'solid',
	'border-right-width':'1px',
	'border-right-color':'#e9e9e9'});
	//если на странице нет селекта
if($('select')[0] == null || $('select')[0] == 'undefined')$('#href_right_sort_block').css({
	'border-left-style':'none',
	'border-left-width':'0px',
	'border-left-color':'none',
	'padding-left':'10px'});
	else $('#href_right_sort_block').css({
	'border-left-style':'solid',
	'border-left-width':'1px',
	'border-left-color':'#e9e9e9',
	'padding-left':'9px'});
});