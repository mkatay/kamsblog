<?php
require_once "db.php";
$sql="SELECT maszo. nev FROM `csucs` INNER JOIN maszo ON mazon=maszo.az WHERE 1 group by maszo.nev";
$stmt=$db->query($sql);
//print_r($stmt->fetchAll());
echo json_encode($stmt->fetchAll());
?>