<?php

require "Functions.php";

$data = json_decode(file_get_contents('php://input'), true);
var_dump($data);

// $GE_Time = $data["greatestEclipse"]["time"];
// $GE_Lat = $data["greatestEclipse"]["lat"];
// $GE_Lng = $data["greatestEclipse"]["lng"];
// $GE_sunAlt = $data["greatestEclipse"]["sunAlt"];
// $GE_sunAzm = $data["greatestEclipse"]["sunAzm"];
// $GE_pathWidth = $data["greatestEclipse"]["pathWidth"];
// $GE_centralDuration = $data["greatestEclipse"]["centralDuration"];

// $GD_Time = $data["greatestDuration"]["time"];
// $GD_Lat = $data["greatestDuration"]["lat"];
// $GD_Lng = $data["greatestDuration"]["lng"];
// $GD_sunAlt = $data["greatestDuration"]["sunAlt"];
// $GD_sunAzm = $data["greatestDuration"]["sunAzm"];
// $GD_pathWidth = $data["greatestDuration"]["pathWidth"];
// $GD_centralDuration = $data["greatestDuration"]["centralDuration"];

// $calendarDate = $data["calendarDate"];
// $U1 = $data["contacts"]["0"];
// $U2 = $data["contacts"]["1"];
// $U3 = $data["contacts"]["2"];
// $U4 = $data["contacts"]["3"];

// $eclipse = POST_Eclipse($GE_Time, $GE_Lat, $GE_Lng, $GE_sunAlt, $GE_sunAzm, $GE_pathWidth, $GE_centralDuration, $GD_Time, $GD_Lat, $GD_Lng, $GD_sunAlt, $GD_sunAzm, $GD_pathWidth, $GD_centralDuration, $calendarDate, $U1, $U2, $U3, $U4);

// echo $eclipse[0];

// foreach($data["UTSample"] as $ut)
// {
//     POST_UT($eclipse[0], $ut["UT"], $ut["northernLimit"]["lat"], $ut["northernLimit"]["lng"], $ut["southernLimit"]["lat"], $ut["southernLimit"]["lng"], $ut["centralLine"]["lat"], $ut["centralLine"]["lng"], $ut["diamRatio"], $ut["sunAlt"], $ut["sunAzm"], $ut["pathWidth"], $ut["centralDuration"]);
// }