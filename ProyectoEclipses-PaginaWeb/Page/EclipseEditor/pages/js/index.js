var eclipseData = 
{
    calendarDate : "11/08/2022",
    UTSample: 
    [],
    contacts: 
    [
        "11/08/2022 00:00:00",
        "11/08/2022 00:00:00",
        "11/08/2022 00:00:00",
        "11/08/2022 00:00:00"
    ],
    greatestEclipse:
    {
        time: "11/08/2022 00:00:00",
        lat: 0,
        lng: 0,
        sunAlt: 0,
        sunAzm: 0,
        pathWidth: 0,
        centralDuration: 0
    },
    greatestDuration:
    {
        time: "11/08/2022 00:00:00",
        lat: 0,
        lng: 0,
        sunAlt: 0,
        sunAzm: 0,
        pathWidth: 0,
        centralDuration: 0
    }
}

let UTSampArr = [];

$(document).ready(function() 
{
    $("#converter-form").submit(function(e)
    {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        let geoCoordinates = DMStoDecimal
        (
            data["lat-deg-converter-input"], data["lat-min-converter-input"], data["lat-sec-converter-input"], $("#lat-card-converter-input").val(), 
            data["lng-deg-converter-input"], data["lng-min-converter-input"], data["lng-sec-converter-input"], $("#lng-card-converter-input").val()
        );

        $("#lat-result").val(geoCoordinates.lat);
        $("#lng-result").val(geoCoordinates.lng);
    })
        
    $("#conversion-result-form").submit(function(e)
    {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
    });

    $("#btn-set-north").click(function()
    {
        $("#ut-sample-north-lat").val($("#lat-result").val());
        $("#ut-sample-north-lng").val($("#lng-result").val());
    });

    $("#btn-set-south").click(function()
    {
        $("#ut-sample-south-lat").val($("#lat-result").val());
        $("#ut-sample-south-lng").val($("#lng-result").val());
    });

    $("#btn-set-center").click(function()
    {
        $("#ut-sample-center-lat").val($("#lat-result").val());
        $("#ut-sample-center-lng").val($("#lng-result").val());
    });

    $("#ut-form").submit(function(e)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        let samp =  
        {
            UT: data["ut-time-input"],
            northernLimit:
            {
                lat: data["ut-sample-north-lat"],
                lng: data["ut-sample-north-lng"]
            },
            southernLimit: 
            {
                lat: data["ut-sample-south-lat"],
                lng: data["ut-sample-south-lng"]
            },
            centralLine: 
            {
                lat: data["ut-sample-center-lat"],
                lng: data["ut-sample-center-lng"]
            },
            diamRatio: data["diameter-ratio-input"],
            sunAlt: data["sun-altitude-input"],
            sunAzm: data["sun-azimuth-input"],
            pathWidth: data["path-width-input"],
            centralDuration: +data["central-line-duration-minutes-input"] * 60000 + +data["central-line-duration-seconds-input"]*1000
        }

        UTSampArr.push(samp);

        refreshUTSamples(UTSampArr);
    });

    $("#submit-eclipse-btn").click(function(e)
    {
        e.preventDefault();

        eclipseData.calendarDate = $("#input-calendarDate").val(); //La fecha se formatea hasta abajo para permitirle al resto de los datos usar las funciones de la clase 'Date'

        UTSampArr.forEach(e => 
        {
            e.UT = `${eclipseData.calendarDate.split("T")[0]} ${e.UT.split(" ")[0]}`;
        });
            
        eclipseData.UTSample = UTSampArr;
        
        eclipseData.contacts = 
        [
            `${eclipseData.calendarDate.split("T")[0]} ${$("#input-U1").val()}`, 
            `${eclipseData.calendarDate.split("T")[0]} ${$("#input-U2").val()}`, 
            `${eclipseData.calendarDate.split("T")[0]} ${$("#input-U3").val()}`, 
            `${eclipseData.calendarDate.split("T")[0]} ${$("#input-U4").val()}`
        ];

        eclipseData.greatestEclipse = 
        {
            time: `${eclipseData.calendarDate.split("T")[0]} ${$("#greatest-eclipse-time-input").val()}`,
            lat: $("#greatest-eclipse-lat-input").val(),
            lng: $("#greatest-eclipse-lng-input").val(),
            sunAlt: $("#greatest-eclipse-sunAlt-input").val(),
            sunAzm: $("#greatest-eclipse-sunAzm-input").val(),
            pathWidth: $("#greatest-eclipse-pathWidth-input").val(),
            centralDuration: $("#greatest-eclipse-centralDuration-input").val()    
        }
        eclipseData.greatestDuration = 
        {
            time: `${eclipseData.calendarDate.split("T")[0]} ${$("#greatest-duration-time-input").val()}`,
            lat: $("#greatest-duration-lat-input").val(),
            lng: $("#greatest-duration-lng-input").val(),
            sunAlt: $("#greatest-duration-sunAlt-input").val(),
            sunAzm: $("#greatest-duration-sunAzm-input").val(),
            pathWidth: $("#greatest-duration-pathWidth-input").val(),
            centralDuration: $("#greatest-duration-centralDuration-input").val()
        }

        eclipseData.calendarDate = eclipseData.calendarDate.toString();

        if(InsertInfo(eclipseData))
            alert("Éxito!");
    });

    $("#log-btn").click(function(e)
    {
        readTextDataNASA($("#ut-text-input").val());
    })
});

function refreshUTSamples(arr)
{
    $(".ut-sample-element").remove();
    arr.forEach(e => 
    {
        $("#ut-samples-container").append(UTElement(e));
    });
}

function UTElement(info)
{
    let mainDiv =  document.createElement("DIV");
    mainDiv.classList.add("ut-sample-element");

    let UTSpan = document.createElement("SPAN");
    let UTSmall = document.createElement("SMALL");
    UTSmall.innerHTML = info.UT;
    UTSpan.append(UTSmall);
    mainDiv.append(UTSpan);
    
    let northernLimitSpan = document.createElement("SPAN");
    let northernLimitSmall = document.createElement("SMALL");
    northernLimitSmall.innerHTML = `Lat: ${info.northernLimit.lat} Lng: ${info.northernLimit.lng}`;
    northernLimitSpan.append(northernLimitSmall);
    mainDiv.append(northernLimitSpan);
    
    let southernLimitSpan = document.createElement("SPAN");
    let southernLimitSmall = document.createElement("SMALL");
    southernLimitSmall.innerHTML = `Lat: ${info.southernLimit.lat} Lng: ${info.southernLimit.lng}`;
    southernLimitSpan.append(southernLimitSmall);
    mainDiv.append(southernLimitSpan);

    let centralLineSpan = document.createElement("SPAN");
    let centralLineSmall = document.createElement("SMALL");
    centralLineSmall.innerHTML = `Lat: ${info.centralLine.lat} Lng: ${info.centralLine.lng}`;
    centralLineSpan.append(centralLineSmall);
    mainDiv.append(centralLineSpan);

    let diamRatioSpan = document.createElement("SPAN");
    let diamRatioSmall = document.createElement("SMALL");
    diamRatioSmall.innerHTML = info.diamRatio;
    diamRatioSpan.append(diamRatioSmall);
    mainDiv.append(diamRatioSpan);

    let sunAltSpan = document.createElement("SPAN");
    let sunAltSmall = document.createElement("SMALL");
    sunAltSmall.innerHTML = info.sunAlt;
    sunAltSpan.append(sunAltSmall);
    mainDiv.append(sunAltSpan);
    
    let sunAzmSpan = document.createElement("SPAN");
    let sunAzmSmall = document.createElement("SMALL");
    sunAzmSmall = info.sunAzm;
    sunAzmSpan.append(sunAzmSmall);
    mainDiv.append(sunAzmSpan);
    
    let pathWidthSpan = document.createElement("SPAN");
    let pathWidthSmall = document.createElement("SMALL");
    pathWidthSmall = info.pathWidth;
    pathWidthSpan.append(pathWidthSmall);
    mainDiv.append(pathWidthSpan);
    
    let centralDurationSpan = document.createElement("SPAN");
    let centralDurationSmall = document.createElement("SMALL");
    centralDurationSmall = info.centralDuration;
    centralDurationSpan.append(centralDurationSmall);
    mainDiv.append(centralDurationSpan);

    return mainDiv;
}

function InsertInfo(info)
{
    console.log(JSON.stringify(info));

    console.log(JSON.stringify(info));
    $.ajax({
        url: 'http://localhost:5000/api/MapPaths',
        type: 'POST',
        data: JSON.stringify(info),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, textStatus, jqXHR)
        {
            console.log(`${textStatus}: ${data}`);
            if(textStatus == 200)
            {
                alert("Fine fine fine verigud verigud verigud");
            }
            else
            {
                alert("Fallamos :(");
            }
            return true;
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert("Fallamos :(");
            console.log(`${textStatus}: ${errorThrown}`);
            return false;
        },
    });
}

function readTextDataNASA(text)
{
    let tempUT = text.split(/\r?\n|\r|\n/g);
    let UTs = [];
    tempUT.forEach(e => 
    {
        if(e !== null && e !== undefined && !Number.isNaN(e) && e !== "")
        {
            let tempRow = [];
            e.split(" ").forEach(c => 
            {
                if(c != null && c != undefined && !Number.isNaN(c) && c != '' && c != ' ')
                {
                    tempRow.push(c);
                }
            });
            UTs.push(tempRow);
        }
    });

    tempUT = [];

    UTs.forEach(e => 
    {
        let northLimiLatDMS = readCoordinate(`${e[1]} ${e[2]}`);
        let northLimiLngDMS = readCoordinate(`${e[3]} ${e[4]}`);
        let northLim = DMStoDecimal(northLimiLatDMS.deg, northLimiLatDMS.min, northLimiLatDMS.sec, northLimiLatDMS.dir, northLimiLngDMS.deg, northLimiLngDMS.min, northLimiLngDMS.sec, northLimiLngDMS.dir);
        
        let southLimiLatDMS = readCoordinate(`${e[5]} ${e[6]}`);
        let southLimiLngDMS = readCoordinate(`${e[7]} ${e[8]}`);
        let southLim = DMStoDecimal(southLimiLatDMS.deg, southLimiLatDMS.min, southLimiLatDMS.sec, southLimiLatDMS.dir, southLimiLngDMS.deg, southLimiLngDMS.min, southLimiLngDMS.sec, southLimiLngDMS.dir);
        
        let centralLimiLatDMS = readCoordinate(`${e[9]} ${e[10]}`);
        let centralLimiLngDMS = readCoordinate(`${e[11]} ${e[12]}`);
        let centralLim = DMStoDecimal(centralLimiLatDMS.deg, centralLimiLatDMS.min, centralLimiLatDMS.sec, centralLimiLatDMS.dir, centralLimiLngDMS.deg, centralLimiLngDMS.min, centralLimiLngDMS.sec, centralLimiLngDMS.dir);
        
        let samp = 
        {
            UT: e[0],
            northernLimit:
            {
                // lat: `${e[1]} ${e[2]}`,
                // lng: `${e[3]} ${e[4]}`
                lat: northLim.lat,
                lng: northLim.lng
            },
            southernLimit: 
            {
                lat: southLim.lat,// lat: `${e[5]} ${e[6]}`,
                lng: southLim.lng// lng: `${e[7]} ${e[8]}`
            },
            centralLine: 
            {
                lat: centralLim.lat,// lat: `${e[9]} ${e[10]}`,
                lng: centralLim.lng// lng: `${e[11]} ${e[12]}`
            },
            diamRatio: e[13],
            sunAlt: e[14],
            sunAzm: isNaN(e[15]) ? null : e[15],
            pathWidth: e[16],
            centralDuration: +e[17].split("m")[0] * 60000 + +(e[17].split("m")[1].slice(0, -1) * 1000)  //+data["central-line-duration-minutes-input"] * 60000 + +data["central-line-duration-seconds-input"]*1000
        } 
        tempUT.push(samp);
    });

    UTSampArr = tempUT;
    // console.log(UTSampArr);
    refreshUTSamples(UTSampArr);
}

function DMStoDecimal(latDeg, latMin, latSec, latDir, lngDeg, lngMin, lngSec, lngDir)
{
    let totalLatDec = +latDeg + +latMin/60 + +latSec/3600;
    let totalLngDec = +lngDeg + +lngMin/60 + +lngSec/3600;

    let roundLatDec = Math.round((totalLatDec + Number.EPSILON) * 100000) / 100000;
    let roundLngDec = Math.round((totalLngDec + Number.EPSILON) * 100000) / 100000;

    // $("#lat-result").val(totalLatDec);
    // $("#lng-result").val(totalLngDec);
    
    // totalLatDec = latDir == "N" ? totalLatDec : totalLatDec * -1; 
    // totalLngDec = lngDir == "W" ? totalLngDec * -1 : totalLngDec; 
    
    totalLatDec = latDir == "N" ? roundLatDec : roundLatDec * -1; 
    totalLngDec = lngDir == "E" ? roundLngDec : roundLngDec * -1; 

    let res = 
    {
        lat: totalLatDec,
        lng: totalLngDec
    }

    return res;
}

function readCoordinate(info)
{
    let res = 
    {
        deg: +info.split(" ")[0],
        min: +info.split(" ")[1].split(".")[0],
        // sec: info.split(" ")[1].slice(".")[1].slice(0, -1),
        sec: +info.split(" ")[1].split(".")[1].slice(0, -1),
        dir: info.charAt(info.length -1)
    }
    if(res.dir == "W" || res.dir == "E")
    {
        // console.log(`deg: ${res.deg} min: ${res.min} sec: ${res.sec} dir: ${res.dir}`);
    }
    return res;
}
