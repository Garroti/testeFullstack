var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var multiparty = require('connect-multiparty');
var mongodb = require('mongodb');

var app = express();

app.set('view engine', 'ejs');
app.set('views', '../teste_fullstack/app/views');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(multiparty());
app.use(function(req, res, next){

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();

});

var port = 8080;

app.listen(port);

var db = new mongodb.Db(
	'testeFullstack',
	new mongodb.Server('localhost', 27018, {}),
	{}
);

console.log('Servidor API HTTP ' + port);

app.get('/', function(req, res){
	res.send({msg : 'Ola'});
});

app.post('/api', function(req, res){

	var dados = req.body;

	db.open(function(erro, mongoclient){
		mongoclient.collection('pessoas', function(erro, collection){
			collection.insert(dados, function(erro, records){
				if(erro){
					res.status(400).json({});
				} else {
					res.json({'status' : 'inclusão realizada com sucesso'});
				}
				mongoclient.close();
			});
		});
	});

});

app.get('/api', function(req, res){

	db.open( function(erro, mongoclient){
		mongoclient.collection('pessoas', function(erro, collection){
			collection.find().toArray(function(erro, results){
				if(erro){
					res.json(erro);
				} else{
					res.json(results);
				}
				mongoclient.close();
			});
		});
	});

});














