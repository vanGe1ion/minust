<?php

$host = $_SERVER['SERVER_ADDR'];
$user = "root";
$pass = "";
$db = "minust";

if($_POST["ParentId"] == "null")
    $query = "SELECT Id, ParentId, Name, Code FROM classifier WHERE ParentId is null ORDER BY RowId";
else
    $query = "SELECT Id, ParentId, Name, Code FROM classifier WHERE ParentId = '". $_POST["ParentId"] ."' ORDER BY RowId";

$connection = mysqli_connect($host, $user, $pass, $db);

$queryResult = mysqli_query($connection, $query);


$result = array();
while($res = mysqli_fetch_array($queryResult)){
    $rescount = count($res)/2;
    for($i = 0; $i < $rescount; ++$i)
        unset($res[$i]);
    array_push($result, $res);
}


echo json_encode($result);