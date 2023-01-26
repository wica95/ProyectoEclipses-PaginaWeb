const MapPaths = require("../models/MapPathsSchema");
const logger = require("../util/logger");


exports.mapPaths_getall = async(req, res) =>{
    const data = await MapPaths.find();
    
    res.send(data);
}

exports.mapPaths_getOne = async(req, res) =>{
    const {id} = reqParams;
    const data = await MapPaths.findOne({calendarDate: id});
}

exports.mapPaths_create = async(req, res) =>{
    const {body} = req;
    let newMapPaths = new MapPaths(body);
    try 
    {
        let response = {};
        await newMapPaths.save()
        .then((newObject) => {
            respone = newObject;
            logger.info(`Map paths created successfully: ${newObject.calendarDate}`);
        })
        .catch((err) =>{
            response = err;
            logger.error(err);
        })    
        res.send(response);
    } 
    catch (e) 
    {
        logger.error(e);
        res.send(e);
    }
}

exports.mapPaths_update = async(req, res) =>{
    const {body} = req;

    const eclipse = await MapPaths.findOne({date: body.date});
}