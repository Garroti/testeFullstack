module.exports.home = function(application, req, res){
	res.render('index', {validacao : {}, dados : {}});
}

/*module.exports.cadastrar = function(application, req, res){

	req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('sobrenome', 'Sobrenome não pode ser vazio').notEmpty();
	req.assert('partipacoes', 'Partipações não pode ser vazio').notEmpty();

	var erros = req.getValidationResult();

	erros.then(function(result) {
    	if (!result.isEmpty()) {
    		res.render("index", {validacao : result.array(), dados : dados});
      		return;
    	}

    });

}*/