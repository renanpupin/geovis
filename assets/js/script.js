google.load('visualization', '1', {'packages':['corechart', 'bar', 'line', ]});

$(document).ready(function(){

	/*======================================================*/
	// MAP
	/*======================================================*/
	var app1 = new App(json_data);	//json_data - DATA LOADEAD FROM FILE
	window.app = app1;

	var clickedMarker = null;

	app1.initMap();

	setTimeout(function() {
		app1.addMarkers();
		// app1.addFilter("Valores maiores que 5", "valor", "more than", 5);
		// app1.addFilter("Valores menores que 3", "valor", "less than", 3);
		// app1.addFilter("Categoria igual a 'cat3'", "categoria", "equal", "cat3");
		//app1.addFilter("Marcadores Ativos", "ativo", "equal", true);
		app1.addMapVisualization("Mapa de Calor", "heatmap");
		// app1.addMapVisualization("Linhas", "line");
		app1.addChartVisualization("Gráfico de Linha para o atributo 'valor'", "chart", "valor", "line");
		app1.addChartVisualization("Gráfico de Pizza para o atributo 'categoria'", "chart", "categoria", "pie");
		app1.addChartVisualization("Gráfico de Barras para o atributo 'categoria'", "chart", "categoria", "bar");
	}, 1500);


	
	
	/*======================================================*/
	// UI
	/*======================================================*/
	$("#nav").dropdown();


	$(".layers-toggle").click(function(){
		$("#layer-control").toggleClass("open");
	});

	function adicionarFiltro(){
		var name = $("#inputFiltroAddName").val();
		var attribute = $("#inputFiltroAddAttribute").val();
		var condition = $("#inputFiltroAddCondition").val();
		var value = $("#inputFiltroAddValue").val();

		if(name != "" && attribute != "" && condition != "" && value != ""){
			app1.addFilter(name, attribute, condition, value);
			console.log("OK");
			$("#modal").removeClass("open");
		}else{
			console.log("erro no form");
		}
	}

	$("#adicionarFiltro").click(function(){

		if(app1.data.features.length > 0){
			var content = '<div class="row">';

			content += '<label for="inputFiltroAddAttribute">Atributo</label><select id="inputFiltroAddAttribute">';

			for(var i = 0; i < app1.data.features[0].infodata.length; i++){
				content += '<option value="'+app1.data.features[0].infodata[i].name+'">'+app1.data.features[0].infodata[i].name+'</option>';
			}

			content += '</select>';
			
			content += '<label for="inputFiltroAddCondition">Condição</label><select id="inputFiltroAddCondition">'+
							'<option value="more than">Maior que (>)</option>'+
							'<option value="less than">Menor que (<)</option>'+
							'<option value="equal">Igual (=)</option>'+
						'</select>';
			
			content += '<label for="inputFiltroAddValue">Valor</label><input type="text" id="inputFiltroAddValue">';
			//more than average value

			content += '</div>';

			$( "#modal" ).Modal({
				"title": "Adicionar Filtro",
				"content": content,
				"size": "small",
				"onConfirm": adicionarFiltro,
				"closeButtonText": "CANCELAR",
				"confirmButtonText": "ADICIONAR"
			});
		}else{
			console.log("carregue os dados primeiro");
		}
	});

	function removerFiltro(){

		var selectedFilter = $("#inputFilterRemove").val();

		if(selectedFilter != "" && selectedFilter != null){
			app1.removeFilter(selectedFilter);
			$('option:selected', "#inputFilterRemove").remove();
			console.log("OK");
		}else{
			console.log("erro ao remover");
		}

	}

	$("#removerFiltro").click(function(){

		var content = '<div class="row">';

		content += '<label for="inputFilterRemove">Seleciona o filtro</label><select id="inputFilterRemove">'+
				   '</div>';

		for(var i = 0; i < app1.filters.length; i++){
			content += '<option value="'+app1.filters[i].name+'">'+app1.filters[i].name+'</option>';
		}

		content += '</select>';

		$( "#modal" ).Modal({
			"title": "Remover Filtro",
			"content": content,
			"size": "small",
			"onConfirm": removerFiltro,
			"closeButtonText": "CANCELAR",
			"confirmButtonText": "REMOVER"
		});
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

		var content = '<div class="row rowVisType">';

		content += '<label for="inputVisAddName">Nome da visualização</label><input type="text" id="inputVisAddName">';

		content += '<label for="inputVisAddType">Tipo da visualização</label><select id="inputVisAddType">'+
						'<option value="heatmap">Mapa de calor</option>'+
						'<option value="chart">Gráfico</option>'+
						'<option value="line">Linha</option>'+
					'</select>'+
					'</div>';

		$(document).on("change", "#inputVisAddType", function(){
			if($(this).val() == "chart"){
				var chart_type_content = '<div class="row rowChartType"><label for="inputVisAddChartType">Tipo do gráfico</label><select id="inputVisAddChartType">'+
										  	  '<option value="pie">Pizza</option>'+
										  	  '<option value="line">Linha</option>'+
										  	  '<option value="bar">Barra</option>'+
										  '</select>'+
										  '</div>';
				$(".rowVisType").after(chart_type_content);
			}else{
				if($("#inputVisAddChartType").length > 0){
					$(".rowChartType").remove();
				}
			}
		});

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

		if(selectedVis != "" && selectedVis != null){
			app1.removeVisualization(selectedVis);
			$('option:selected', "#inputVisRemove").remove();
			$(".chartDiv").each(function(){
				if($(this).attr("chart-name") == selectedVis){
					$(this).remove();
				}
			});
			console.log("OK");
		}else{
			console.log("erro ao remover");
		}

	}

	$("#removerVisualizacao").click(function(){

		var content = '<div class="row">';

		content += '<label for="inputVisRemove">Seleciona a visualização</label><select id="inputVisRemove">'+
				   '</div>';

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

		var arquivo_json = $("#inputCarregarArquivo").val();

		if(arquivo_json != "" && arquivo_json != null){

			// LOAD JSON FROM FILE: http://jsfiddle.net/L85h4p96/

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

		var content = '<div class="row"><label for="inputCarregarArquivo">Selecione o arquivo</label><input type="file" id="inputCarregarArquivo" accept=".json"></div>';

		$( "#modal" ).Modal({
			"title": "Carregar Dados",
			"content": content,
			"size": "small",
			"onConfirm": carregarDados,
			"closeButtonText": "CANCELAR",
			"confirmButtonText": "CARREGAR"
		});
	});
	/*======================================================*/
	
	//console.log(app.data.findLowestAttributeValueFeatures('valor'));
	//console.log(app.data.findLargestAttributeValueFeatures('valor'));
	//console.log(app.data.calculateAverageAttributeValue('valor'));

});

function layerVis(layer){
	if(layer === "markers"){
		app.toggleMarkers();
	} else if(layer === "heatmap"){
		app.toggleHeatmap();
	}
}

function makeDivDraggable(div){
	$(div).draggable({
      scroll: true, 
      scrollSpeed: 100, 
      scrollSensitivity: 100,
      containment: ".map-wrap"
    });
}