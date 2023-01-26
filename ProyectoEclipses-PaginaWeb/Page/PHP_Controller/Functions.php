<?php

session_start(); 

function GET_Eclipse($date)
{
    try
    {
        require "./MySQL.php";
 
        $query = "CALL SP_GetEclipseByDate('".$date."');";
        $request = mysqli_query($db, $query);
        $eclipse = mysqli_fetch_assoc($request);
        // ...
        return $eclipse;
    }
    catch(Throwable $th)
    {
        var_dump($th);
        return $db->error;
    }

}

function GET_EclipseUTs($date)
{
    try
    {
        require "./MySQL.php";

        $query = "CALL SP_GetEclipseUTsByDate('".$date."');";
        $request = mysqli_query($db, $query);
        $UTs = []; 
        $i = 0;
        while($row = mysqli_fetch_assoc($request))
        {
            $UTs[$i] = $row;
            $i++;
        }

        return $UTs;
    }
    catch(Throwable $th)
    {
        var_dump($th);
        return $db->$error;   
    }
}

function GETALL_Eclipses()
{
    try
    {
        require "./MySQL.php";
    
        $query = "CALL SP_GetEclipses();";
        $request = mysqli_query($db, $query);
        $eclipses = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($request))
        {
            $eclipses[$i] = $row;
            // ...
            $i++;
        } 
    
        return $eclipses;
    }
    catch(Throwable $th)
    {
        var_dump($th);
        return $db->error;
    }
}

function POST_Eclipse($GE_Time, $GE_lat, $GE_lng, $GE_sunAlt, $GE_sunAzm, $GE_pathWidth, $GE_centralDuration, $GD_Time, $GD_lat, $GD_lng, $GD_sunAlt, $GD_sunAzm, $GD_pathWidth, $GD_centralDuration,$calendarDate, $U1, $U2, $U3, $U4)
{
    try
    {
        require "./MySQL.php";

        $query = "CALL SP_CreateEclipse('".$GE_Time."', ".$GE_lat.", ".$GE_lng.", ".$GE_sunAlt.", ".$GE_sunAzm.", ".$GE_pathWidth.", ".$GE_centralDuration.", '".$GD_Time."', ".$GD_lat.", ".$GD_lng.", ".$GD_sunAlt.", ".$GD_sunAzm.", ".$GD_pathWidth.", ".$GD_centralDuration.", '".$calendarDate."', '".$U1."', '".$U2."', '".$U3."', '".$U4."');";
        $request = mysqli_query($db, $query);
        $row = mysqli_fetch_row($request);
        return $row;
    }
    catch(Throwable $th)
    {
        var_dump($th);
        return $db->error;
    }
    
}

function POST_UT($eclipse, $daytime, $northernLimitLat, $northernLimitLng, $southernLimitLat, $southernLimitLng, $centralLineLat, $centralLineLng, $diamRatio, $sunAlt, $sunAzm, $pathWidth, $centralDuration)
{
    try
    {
        require "./MySQL.php";
        if($sunAzm == null)
        {
            $sunAzm = "null";
        }
        $query = "CALL SP_InsertUT(".$eclipse.", '".$daytime."', ".$northernLimitLat.", ".$northernLimitLng.", ".$southernLimitLat.", ".$southernLimitLng.", ".$centralLineLat.", ".$centralLineLng.", ".$diamRatio.", ".$sunAlt.", ".$sunAzm.", ".$pathWidth.", ".$centralDuration.");";
        $request = mysqli_query($db, $query);
        // $row = mysqli_fetch_row($request);
        // return $row;
        return true;
    }
    catch(Throwable $th)
    {
        var_dump($th);
        return $db->error;
    }

}