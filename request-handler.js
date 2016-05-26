var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
// var util = require('../lib/utility');

var db = require('/db/config');
var User = require('/db/models/user');

exports.loginForm = function(req, res) {
	res.render('login');
};

exports.loginUser = function(req, res) {

};

exports.logoutUser = function(req, res) {

};