$(document).ready(function(){

	function carrega(){
		var xhr = new XMLHttpRequest();
		xhr.open('GET','http://localhost:8080/api');

		xhr.onload = function(){
			if(xhr.status === 200){
				var data = $.parseJSON(xhr.responseText);
				var c = 0;
				for(var i = 0; i < data.length; i++){
					c = c+1;
					$('#pessoas').append(

						'<tbody>'+
							'<tr style="text-align: center;">'+
								'<td>'+ c +'</td>'+
								'<td>'+data[i].nome+'</td>'+
								'<td>'+data[i].sobrenome+'</td>'+
								'<td>'+data[i].participacoes+'%'+'</td>'+
							'</tr>'+
						'</tbody>'
			
					);
				}
			}
		}
		xhr.send();
	}

	carrega();

	$('#btn-enviar').click(function(){

		// criar um formData
		var formData = new FormData();

		var nome = document.getElementById('nome').value;
		var sobrenome = document.getElementById('sobrenome').value;
		var participacoes = document.getElementById('participacoes').value;

		formData.append('nome', nome);
		formData.append('sobrenome', sobrenome);
		formData.append('participacoes', participacoes);

		if(nome == '' || sobrenome == '' || participacoes == ''){
			alert('TODOS OS CAMPOS SÃO OBRIGATORIOS !!!');
		} else {
			//criar xmlhttprequest
			var xhr = new XMLHttpRequest();

			// fazer o envio do nosso request
			xhr.open("POST", "http://localhost:8080/api");

			xhr.send(formData);

			xhr.onload = function(){
				if(xhr.status === 200){
					window.location.href = '/';
				}
			}
		}

	});

});


Vue.component('ga-tabela', {
	props:['titulos'],
	template: '<table border="1" class="tabela">'+
					'<thead>'+
						'<tr>'+
							'<th style="text-align: center;" v-for="titulo in titulos">{{ titulo }}</th>'+
						'</tr>'+
					'</thead>'+
				'</table>'
});
			
var app = new Vue({
	el:"#app",
	data:{
		H2: 'CADASTRE-SE',
		H3: 'DADOS',
		P1: 'Para se cadastrar, preencha o formulário',
		P2: 'Informações dos dados abaixo',
		participacoes: null,
		head: ['	','Nome','Sobrenome','Participações']
	}

});

function cor_random(){
				
	var color = '#';

	var digits = [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
	];

	for(var i = 0; i < 6; i++){
		var index = Math.floor(Math.random()*14);
		color += digits[index];
	}

	return color;

}

var chartData = [];
$(function(){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/api',
		dataType: 'json',
		success : function(data) {
			chartData = data;

			var ctx = document.getElementById('chart');

			var grafico = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: [
								
					],
					datasets: [{
					    data: [],
					    backgroundColor: []
					}]
				}
			});

			for (var i = 0; i < chartData.length; i++) {
				grafico.data.labels[i] = chartData[i].nome;
			}

			for (var i = 0; i < chartData.length; i++) {
				grafico.data.datasets[0].data[i] = chartData[i].participacoes;
			}

			for (var i = 0; i < chartData.length; i++) {
				grafico.data.datasets[0].backgroundColor[i] = cor_random();
			}

			grafico.update();				   	

		}

	});

});