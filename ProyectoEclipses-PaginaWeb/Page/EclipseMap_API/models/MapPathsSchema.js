const mongoose = require("mongoose");
// const UTSampleSchema = require("./UTSampleSchema");

const MapPathsSchema = new mongoose.Schema({
    calendarDate:
    {
        type: Date,
        required: [true, "calendarDate is required"],
        unique: true
    },
    UTSample:
    [
        {
            UT:
            {
                type:Date,
                required:[true, "Universal time is required"]
            },
            northernLimit:
            {
                lat:
                {
                    type:Number,
                    required:[true, 'Latitud es requisito']
                },
                lng:
                {
                    type:Number,
                    required:[true, 'Longitud es requisito']
                }
            },
            southernLimit:
            {
                lat:
                {
                    type:Number,
                    required:[true, 'Latitud es requisito']
                },
                lng:
                {
                    type:Number,
                    required:[true, 'Longitud es requisito']
                }
            },
            centralLine:
            {
                lat:
                {
                    type:Number,
                    required:[true, 'Latitud es requisito']
                },
                lng:
                {
                    type:Number,
                    required:[true, 'Longitud es requisito']
                }
            },
            diamRatio:
            {
                type:Number,
                required:[true, 'Diam ratio is required']
            },
            sunAlt:
            {
                type:Number,
                required:[true, 'Sun altitude is required']
            },
            sunAzm:
            {
                type:Number,
                // required: [true, 'Sun azimuth is required']
            },
            pathWidth:
            {
                type:Number,
                required: [true, 'Path width is required']
            },
            centralDuration:
            {
                type:Number,
                required: [true, "Central duration is required"]
            }
        }
    ],
    contacts:
    [
        {
            type: Date,
            required: [true, "Contacts are required"] 
        }  
    ],
    greatestEclipse:
    {
        time:
        {
            type:Date,
            required: [true, "Greatest eclipse time is required"]
        },
        lat:
        {
            type:Number, 
            required:[true, 'Latitud es requisito'],
        },
        lng:
        {
            type:Number, 
            required:[true, 'Longitud es requisito'],
        },
        sunAlt:
        {
            type:Number,
            required:[true, 'Sun altitude is required']
        },
        sunAzm:
        {
            type: Number,
            // required: [true, "Sun azimuth is required"]
        },
        pathWidth:
        {
            type:Number,
            required:[true, 'Path width is required']
        },
        centralDuration:
        {
            type:Number,
            required:[true, 'Central duration is required']
        }
    },
    greatestDuration:
    {
        time:
        {
            type:Date,
            required: [true, "Greatest eclipse time is required"]
        },
        lat:
        {
            type:Number, 
            required:[true, 'Latitud es requisito'],
        },
        lng:
        {
            type:Number, 
            required:[true, 'Longitud es requisito'],
        },
        sunAlt:
        {
            type:Number,
            required:[true, 'Sun altitude is required']
        },
        sunAzm:
        {
            type: Number,
            // required: [true, "Sun azimuth is required"]
        },
        pathWidth:
        {
            type:Number,
            required:[true, 'Path width is required']
        },
        centralDuration:
        {
            type:Number,
            required:[true, 'Central duration is required']
        }
    }
});

const MapPaths = mongoose.model("MapPaths", MapPathsSchema);
module.exports = MapPaths;