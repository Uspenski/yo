<?php
header("Content-type: text/html; charset=utf-8");
define('_EXEC', 1);
require_once("action.ink");
if($_GET['key']){
	if(!Connect::todb()->verify_key($_GET['data'], $_GET['key']))return;
	if($_GET['currentWrite'] != 0)Connect::todb()->checkTheRequest(array(
	"out"=>$_GET['out'],
	"what"=>$_GET['what'],
	"category"=>$_GET['category'],
	"id"=>$_GET['id'],
	"invertor"=>$_GET['invertor'],
	"classPower"=>$_GET['classPower'],
	"sortPrice"=>$_GET['sortPrice'],
	"currentWrite"=>$_GET['currentWrite']
	));else{
		if($_GET['out'] == 'count')echo 1;else {
	$what = $_GET['what'];
	$id = $_GET['id'];
	$currentWrite = $_GET['currentWrite'];
	$sortBy = $_GET['sortBy'];
	$dom = new DOMDocument();
		$sort_panel = $dom->createElement('div');
		$sort_panel->setAttribute("id", "sort_panel");
		//надпись "сортировка:"
		$sortings = $dom->createElement('span');
		$sortings->setAttribute('id', 'sort_panel_left_block');
		$text = $dom->createTextNode('Сортировка:');
		$sortings->appendChild($text);
		$sort_panel->appendChild($sortings);
		//элементы панели сортировки товаров:
		$sortings = $dom->createElement('div');
		$sortings->setAttribute('id', 'sort_panel_right_block');
		//форма
		$form = $dom->createElement('form');
		$form->setAttribute("action", "ajax/request.php");
		$form->setAttribute("method","POST");	
		//надпись "инвертор: "
		$div = $dom->createElement('div');
		$div->setAttribute("id", "invert_right_sort_block");
		if(Connect::todb()->tryInvert($id)){
			$a = $dom->createElement('a');
			$a->setAttribute("href", "shop/invertor");
			$text = $dom->createTextNode("инвертор:");
			$a->appendChild($text);
			$div->appendChild($a);		
			//чекбокс
			$input = $dom->createElement("input");
			$input->setAttribute("type", "checkbox");
			$input->setAttribute("id", "invertor");
			$input->setAttribute("name", "invert");	
			$div->appendChild($input);
			}
		$form->appendChild($div);
		//селект
		$div = $dom->createElement('div');
		$div->setAttribute("id", "select_right_sort_block");
		if(Connect::todb()->tryPower($id)){
			$select = $dom->createElement("select");
			$option = $dom->createElement("option");
			$option->setAttribute("value", "none");
			$text = $dom->createTextNode("класс энергопотребления");
			$option->appendChild($text);
			$select->appendChild($option);
			Connect::todb()->getPower($id, &$select, $dom);
			$div->appendChild($select);
			}
		$form->appendChild($div);
		//ссылка сортировки по цене
		$div = $dom->createElement('div');
		$div->setAttribute("id", "href_right_sort_block");
		$a = $dom->createElement('a');
		$a->setAttribute("href", "shop/price");
		$a->setAttribute("data-sort", "none");
		$text = $dom->createTextNode("цена:");
		$a->appendChild($text);
		$div->appendChild($a);
		$form->appendChild($div);
		$sort_panel->appendChild($form);
		$sort_panel->appendChild($sortings);
		$dom->appendChild($sort_panel);
	//Connect::todb()->importElementsA($dom, 'mag', &$dom);
	echo $dom->saveXML();
	}}
	};
if($_GET['give_me_characts_on_id'])Connect::todb()->give_me_characts($_GET['give_me_characts_on_id'], 'more');
if($_GET['give_to_me_of_less_characts'])Connect::todb()->give_me_characts($_GET['give_to_me_of_less_characts'], 'less');
//не забыть о проблеме, появляющейся при отсутствии баз
?>