<?php
	$data=array(
		0=>array(
			"img"=>"images/t1.png",
			"title"=>"tesst1"
		),
		1=>array(
			"img"=>"images/t2.jpg",
			"title"=>"tesst3"
		),
		2=>array(
			"img"=>"images/t3.png",
			"title"=>"tesst3"
		)
	);

	$i=$_GET["id"];
	if(!isset($data[$i])) exit(0);
	exit(json_encode(array("total"=>count($data),"row"=>$data[$i])));
?>