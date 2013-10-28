<?php
define('_EXEC', 1);
require_once("action.ink");
if(isset($_REQUEST['product_id']) && !empty($_REQUEST['product_id']))echo Connect::todb()->getImageHref(trim(strip_tags($_REQUEST['product_id'])));
?>