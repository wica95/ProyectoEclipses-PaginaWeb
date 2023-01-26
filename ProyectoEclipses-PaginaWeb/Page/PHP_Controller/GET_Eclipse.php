<?php

    include "Functions.php";

    $date = $_GET["date"];
    $eclipse = GET_Eclipse($date);

    $eclipseUTs = GET_EclipseUTs($date);

    $eclipse["UTSample"] = $eclipseUTs;
    echo json_encode($eclipse);

