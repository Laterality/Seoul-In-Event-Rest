"use strict";

var async = require("async");
var mysql = require("mysql");
var config = require("../config");
var util = require("./utils");


var pool = mysql.createPool(config.db);


function retrieveEvents(req, res)
{
	var result = {};
	var query = "SELECT * FROM events LIMIT 10";

	pool.query(query, function(_err, fields)
	{
		if(_err)
		{
			console.log("db query error\n", _err);
			result["result"] = "error";
			result["error"] = _err;
			return util.responseWithJson(req, res, result, 500);
		}
		result["result"] = "success";
		result["events"] = fields;
		util.responseWithJson(req, res, result, 200);
	});
}

module.exports.retrieveEvents = retrieveEvents;