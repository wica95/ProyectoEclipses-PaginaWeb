<?php
    // Create connection
    // $db = mysqli_connect("localhost","root","SolarSystem2324","eclipses", 3306) or die("Connection error".mysqli_error($db));
    // $db = mysqli_connect("localhost","root","SolarSystem2324","eclipses", 3306);

    date_default_timezone_set('America/Monterrey');
    $host="localhost";
    $port=3306;
    $socket="";
    $user="root";
    $password="SolarSystem2324";
    $dbname="eclipses";

    $db = new mysqli($host, $user, $password, $dbname, $port)
    or die ('Could not connect to the database server' . mysqli_connect_error());
    // if(!$db)
    // {
    //     echo "Database not found :o";
    // }
    // else
    // {
    //     echo"Database found";
    // }
    //$con->close();
