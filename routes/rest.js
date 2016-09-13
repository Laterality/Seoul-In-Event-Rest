"use strict";

var express = require("express");

var rest_event = require("./event");

var router = express.Router();
module.exports = router;


router.use(function(req, res, next)
{
	console.log("request url path : ", req.path, "- ", Date.now());
	next();
}); 

router
.get("/events", function(req, res, next)
{
	rest_event.retrieveEvents(req, res);
});