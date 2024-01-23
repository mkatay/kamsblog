<?php
require_once "db.php";
$sql="SELECT * FROM `csucs` INNER JOIN maszo ON mazon=maszo.az WHERE 1";
$stmt=$db->query($sql);
//print_r($stmt->fetchAll());
echo json_encode($stmt->fetchAll());
?>