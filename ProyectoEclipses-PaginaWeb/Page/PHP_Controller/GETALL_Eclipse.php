<?php

require "Functions.php";

$eclipse = GETALL_Eclipses();
echo json_encode($eclipse);