google.load('visualization', '1', {'packages':['corechart']});

$(document).ready(function(){

	/*======================================================*/
	var app1 = new App(json_data);	//json_data - DATA LOADEAD FROM FILE

	var clickedMarker = null;

	app1.initMap();

	setTimeout(function() {
		app1.addMarkers();
	}, 1500);

	app1.addMapVisualization("Mapa de Calor", "heatmap");

	// app1.addMapVisualization("Linhas", "line");
	//app1.addChartVisualization("Gráfico", "chart", "pie");
	
	/*======================================================*/



	$(".layers-toggle").click(function(){
		$("#layer-control").toggleClass("open");
	});


	function adicionarVisualizacao(){
		var name = $("#inputVisAddName").val();
		var type = $("#inputVisAddType").val();

		if(name != "" && type != ""){
			app1.addMapVisualization(name, type);
			console.log("OK");
		}else{
			console.log("erro no form");
		}

	}

	$("#adicionarVisualizacao").click(function(){

		var content = '';

		content += '<label for="inputVisAddName">Nome da visualização</label><input type="text" id="inputVisAddName">';

		content += '<label for="inputVisAddType">Tipo da visualização</label><select id="inputVisAddType">'+
						'<option value="heatmap">Mapa de calor</option>'+
						'<option value="chart">Gráfico</option>'+
						'<option value="line">Linha</option>'+
					'</select>';

		$( "#modal" ).Modal({
			"title": "Adicionar Visualização",
			"content": content,
			"size": "small",
			"onConfirm": adicionarVisualizacao,
			"closeButtonText": "CANCELAR",
			"confirmButtonText": "ADICIONAR"
		});
	});


	function removerVisualizacao(){

		var selectedVis = $("#inputVisRemove").val();

		if(selectedVis != ""){
			app1.removeVisualization(selectedVis);
			console.log("OK");
		}else{
			console.log("erro ao remover");
		}

	}

	$("#removerVisualizacao").click(function(){

		var content = '';

		content += '<label for="inputVisRemove">Seleciona a visualização</label><select id="inputVisRemove">';

		for(var i = 0; i < app1.visualizations.length; i++){
			content += '<option value="'+app1.visualizations[i].name+'">'+app1.visualizations[i].name+'</option>';
		}

		content += '</select>';

		$( "#modal" ).Modal({
			"title": "Remover Visualização",
			"content": content,
			"size": "small",
			"onConfirm": removerVisualizacao,
			"closeButtonText": "CANCELAR",
			"confirmButtonText": "REMOVER"
		});
	});

	function carregarDados(){

		if(visualizations != ""){

			var arquivo_json = $("#inputCarregarArquivo").val();

			//upload and verify null file here

			app1 = new App(arquivo_json);
			app1.initMap();

			setTimeout(function() {
				app1.addMarkers();
			}, 1500);

			console.log("OK");
		}else{
			console.log("erro ao carregar os dados");
		}

	}

	$("#carregarDados").click(function(){

		var content = '<label for="inputCarregarArquivo">Selecione o arquivo</label><input type="file" id="inputCarregarArquivo" accept=".json">';

		$( "#modal" ).Modal({
			"title": "Remover Visualização",
			"content": content,
			"size": "small",
			"onConfirm": carregarDados,
			"closeButtonText": "CANCELAR",
			"confirmButtonText": "REMOVER"
		});
	});

});