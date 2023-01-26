const News = require("../models/NewsSchema");
const logger = require("../util/logger");

exports.news_getAll = async(req, res) =>
{
    const data = await News.find();  
    res.send(data);
};

exports.news_getOne = async(req, res) =>
{
    const data = await News.findOne({_id: req.id});
    res.send(data);
}

exports.news_create = async(req, res) =>
{
    const {body} = req;
    let newNews = new News(body);

    try
    {
        let response = {};
        await newNews.save()
        .then((newObject) =>
        {
            response = newObject;
            logger.info(`News created successfully: ${newObject.header}`);
        })
        .catch((err)=>
        {
            response = err;
            logger.error(err);
        });
        res.send(response);
    }
    catch(error)
    {
        logger.error(error);
        res.send(error);
    }
}