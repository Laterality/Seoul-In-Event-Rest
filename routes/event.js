"use strict";

var async = require("async");
var mysql = require("mysql");
var config = require("../config");
var util = require("./utils");


var pool = mysql.createPool(config.db);

/**
 * 게시물 조회 API
 * 
 * Path : /api/events
 * Method : GET
 * 
 * Request
 * @query.from : 전달된 값보다 큰 cultcode 만 조회(기본값 0)
 * @query.limit : 조회 결과의 상위 일부를 반환(기본값 10)
 * @query.genre : 조회할 장르 (기본값 없음)
 * @query.subjcode : subjcode로 조회
 * 
 */
function retrieveEvents(req, res)
{
	var result = {};
	var limit = req.query.limit ? Number(req.query.limit) : 10;
	var from = req.query.from ? req.query.from : 0;
	var genre = req.query.genre;
	var subjcode = req.query.subjcode;
	var query = "SELECT * FROM events ";

	// make query
	query += "WHERE cultcode > ? ";
	if(genre) query += "AND codename=? ";
	if(subjcode) query += "AND subjcode=? ";
	query += "LIMIT ?";
	query += ";";
	var conds = [];
	conds.push(from);
	if(genre){conds.push(genre);}
	if(subjcode){conds.push(subjcode);}
	conds.push(limit);

	pool.query(query, conds, function(_err, fields)
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