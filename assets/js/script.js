google.load('visualization', '1', {'packages':['corechart', 'bar', 'line', ]});

$(document).ready(function(){

	/*======================================================*/
	// MAP
	/*======================================================*/
	var app1 = new App();
	app1.initMap();

	//DEBUG MODE
	//var app1 = new App(json_data);	//json_data - DATA LOADEAD FROM FILE
	// app1.initMap();
	// window.app = app1;	//just to debug objects

	var clickedMarker = null;


	/*setTimeout(function() {
		app1.addMarkers();
		// app1.addFilter("Valores maiores que 5", "valor", "more than", 5);
		// app1.addFilter("Valores menores que 3", "valor", "less than", 3);
		// app1.addFilter("Categoria igual a 'cat3'", "categoria", "equal", "cat3");
		//app1.addFilter("Marcadores Ativos", "ativo", "equal", true);
		app1.addMapVisualization("Mapa de Calor", "heatmap");
		// app1.addMapVisualization("Linhas", "line");
		app1.addChartVisualization("Gráfico de Linha para o atributo 'valor'", "chart", "valor", "line");
		//app1.addChartVisualization("Gráfico de Pizza para o atributo 'categoria'", "chart", "categoria", "pie");
		//app1.addChartVisualization("Gráfico de Barras para o atributo 'categoria'", "chart", "categoria", "bar");
	}, 1500);*/


	
	
	/*======================================================*/
	// UI
	/*======================================================*/
	$("#nav").dropdown();


	$(".side-toggle").click(function(){

		$(".side-toggle").removeClass("active");
		$(this).addClass("active");

		var target = $(this).attr("data-target");

		if(target == "layers"){
			if(!($(".tabs.layers").hasClass("active") && $("#side-controls").hasClass("open"))){
				$(".tabs.filters").removeClass("active");
				$(".tabs.layers").addClass("active");
				$("#side-controls").addClass("open");
			}else{
				$(".side-toggle").removeClass("active");
				$("#side-controls").removeClass("open");
			}
		}else{
			if(!($(".tabs.filters").hasClass("active") && $("#side-controls").hasClass("open"))){
				$(".tabs.layers").removeClass("active");
				$(".tabs.filters").addClass("active");
				$("#side-controls").addClass("open");
			}else{
				$(".side-toggle").removeClass("active");
				$("#side-controls").removeClass("open");
			}
		}

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

			content += '<label for="inputFiltroAddName">Nome do filtro</label><input type="text" id="inputFiltroAddName">';

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

		content += '<label for="inputFilterRemove">Selecione o filtro</label><select id="inputFilterRemove">'+
				   '</div>';

		for(var i = 0; i < app1.filters.length; i++){
			console.log(app1.filters);
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
		var attribute = $("#inputVisAddChartAttribute").val();
		var attribute_line = $("#inputVisAddLineAttribute").val();
		var chart_type = $("#inputVisAddChartType").val();
		
		//app1.addMapVisualization("Mapa de Calor", "heatmap");
		// app1.addMapVisualization("Linhas", "line");
		//app1.addChartVisualization("Gráfico de Linha para o atributo 'valor'", "chart", "valor", "line");
		
		if(type !== "chart"){
			if(name != "" && type != ""){
				if(type == "heatmap"){
					app1.addMapVisualization(name, type, null);
					console.log("add heatmap");
					$("#modalClose").trigger("click");	//close modal
				}else{
					if(attribute_line != "" && attribute_line != undefined){
						app1.addMapVisualization(name, type, attribute_line);
						console.log("add line");
						$("#modalClose").trigger("click");	//close modal
					}else{
						alert("Selecione o atribute da visualização por linhas!");
					}
				}
				console.log("OK");
			}else{
				console.log("erro no form");
				alert("Preencha todos os campos!");
			}
		}else{
			if(name != "" && type != "" && attribute != "" && chart_type != ""){
				app1.addChartVisualization(name, type, attribute, chart_type);
				console.log("OK");
				$("#modalClose").trigger("click");	//close modal
			}else{
				console.log("erro no form");
				alert("Preencha todos os campos!");
			}

		}
	}

	$(document).on("change", "#inputVisAddType", function(){
		if($(this).val() == "chart"){
			var chart_type_content = '<div class="row rowChartType"><label for="inputVisAddChartType">Tipo do gráfico</label><select id="inputVisAddChartType">'+
									  	  '<option value="pie">Pizza</option>'+
									  	  '<option value="line">Linha</option>'+
									  	  '<option value="bar">Barra</option>'+
									  '</select>'+
									  '</div>';
			$(".rowVisType").after(chart_type_content);
			$("#inputVisAddChartType").trigger("change");
		}else{
			if($("#inputVisAddChartType").length > 0){
				$(".rowChartType").remove();
				$(".rowChartAttribute").remove();
			}
		}

		if($(this).val() == "line"){
			$(".rowChartType").remove();
			$(".rowChartAttribute").remove();

			var line_attribute_content = '<div class="row rowLineAttribute"><label for="inputVisAddLineAttribute">Atributo</label><select id="inputVisAddLineAttribute">';

			var line_attribute_content_options = "";

			for(var i = 0; i < app1.data.features[0].infodata.length; i++){
				line_attribute_content_options += '<option value="'+app1.data.features[0].infodata[i].name+'">'+app1.data.features[0].infodata[i].name +' ('+app1.data.features[0].infodata[i].type+')</option>';
			}

			if(line_attribute_content_options == ""){
				line_attribute_content_options = '<option value="-1">Não há atributos suportados para este tipo de gráfico.</option>'
			}else{
				line_attribute_content += line_attribute_content_options;
			}

			line_attribute_content += '</select></div>';

			$(".rowVisType").after(line_attribute_content);

		}else{
			// if($("#inputVisAddChartType").length > 0){
			// 	$(".rowChartType").remove();
			// 	$(".rowChartAttribute").remove();
			// }
		}
	});

	$(document).on("change", "#inputVisAddChartType", function(){
		$(".rowChartAttribute").remove();
		$(".rowLineAttribute").remove();

		var chart_type = $(this).val();
		console.log(chart_type);
		if($(this).val() == "pie" || $(this).val() == "line" || $(this).val() == "bar"){

			var chart_attribute_content = '<div class="row rowChartAttribute"><label for="inputVisAddChartAttribute">Atributo</label><select id="inputVisAddChartAttribute">';

			var chart_attribute_content_options = "";

			for(var i = 0; i < app1.data.features[0].infodata.length; i++){
				if(chart_type == "line"){
					if(app1.data.features[0].infodata[i].type == "number"){
						chart_attribute_content_options += '<option value="'+app1.data.features[0].infodata[i].name+'">'+app1.data.features[0].infodata[i].name +' ('+app1.data.features[0].infodata[i].type+')</option>';
					}
				}else{
					chart_attribute_content_options += '<option value="'+app1.data.features[0].infodata[i].name+'">'+app1.data.features[0].infodata[i].name +' ('+app1.data.features[0].infodata[i].type+')</option>';
				}
			}

			if(chart_attribute_content_options == ""){
				chart_attribute_content_options = '<option value="-1">Não há atributos suportados para este tipo de gráfico.</option>'
			}else{
				chart_attribute_content += chart_attribute_content_options;
			}

			chart_attribute_content += '</select></div>';

			$(".rowChartType").after(chart_attribute_content);
		}
	});
	
	$("#adicionarVisualizacao").click(function(){

		var content = '<div class="row rowVisType">';

		content += '<label for="inputVisAddName">Nome da visualização</label><input type="text" id="inputVisAddName">';

		content += '<label for="inputVisAddType">Tipo da visualização</label><select id="inputVisAddType">'+
						'<option value="heatmap">Mapa de calor</option>'+
						'<option value="chart">Gráfico</option>'+
						'<option value="line">Linha</option>'+
					'</select>'+
					'</div>';


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

		if (FileReader){
			if (window.File && window.FileReader && window.FileList && window.Blob) {

				var arquivo = document.getElementById('inputCarregarArquivo').files[0];
				// alert(arquivo);

				if (arquivo) {

					var freader = new FileReader();

			        freader.onload = function(e) {
			        	

			        	try{
			        		var file_content = e.target.result;
					        file_content = file_content.replace(/\t/g, "");	//removing tabs
							file_content = file_content.replace(/\n/g, "");	//removing new line
							// file_content = file_content.replace(/ /g, "");	//removing spaces
					        
				        	file_content = JSON.parse(file_content);

				        	app1.loadData(file_content);

							setTimeout(function() {
								app1.addMarkers();
							}, 500);
				        	
				        	app1.updateFeaturesCounter();

							console.log("LEITURA DO ARQUIVO OK");

							$("#modalClose").trigger("click");

					    }catch(e){
							alert("Erro ao ler o arquivo de entrada, verifique se seu arquite está seguindo o padrão. <br>Erro: '"+e+"'");
					    }
			      	}

			      	freader.readAsText(arquivo);


				}else{
					alert("Falha ao carregar o arquivo");
				}
			}else{
				alert("Desculpe, mas seu navegador não suporta algumas funcionalidades desta aplicação!");
			}
		}else{
			alert("Desculpe, mas seu browser não suporte esta aplicação. Atualize para uma versão mais recente!");
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

	$("#salvarApp").click(function(){
		console.log("save app");
		//save data
		//save visualizations (heatmap, graph, line)
		//save filters
	});

	$("#carregarApp").click(function(){
		console.log("load app");
		//load data file
		//load visualzations
		//load filters
	});
	/*======================================================*/
	
	//console.log(app.data.findLowestAttributeValueFeatures('valor'));
	//console.log(app.data.findLargestAttributeValueFeatures('valor'));
	//console.log(app.data.calculateAverageAttributeValue('valor'));

	//remover gráfico pelo botão
	$("body").on("click", ".chartClose", function(){
		var name = $(this).parent().attr("chart-name");
		console.log(name);
		if(name != "" && name != null){
			app1.removeVisualization(name);
			if($(this).parent().attr("chart-name") == name){
				$(this).parent().remove();
			}
		}
	});

	$("body").on("click", ".chartToggle", function(){
		var self = $(this);
		console.log($(self).parent().hasClass("open"))
		// var graph_window = $(self).siblings().not(".chartClose");
		if($(self).parent().hasClass("open")){
			$(self).parent().removeClass("open");
			$(self).siblings().not(".chartClose").css("height","45px");
		}else{
			$(self).parent().addClass("open");
			$(self).siblings().not(".chartClose").addClass("open").css("height","250px");
		}
	});


	$(".toggleLayers").on("change", function(){
		var target = $(this).val();
		if(target === "markers"){
			app1.toggleMarkers();
		} else if(target === "heatmap"){
			app1.toggleHeatmap();
		} else if(target === "chart"){
			app1.toggleCharts();
		}
	});

	$(".toggleFilters").on("change", function(){
		var filter_index = parseInt($(this).attr("id")) - 1;
		app1.toggleFilter(filter_index);
	});

});

function makeDivDraggable(div){
	$(div).draggable({
      scroll: true, 
      scrollSpeed: 100, 
      scrollSensitivity: 100,
      containment: ".map-wrap"
    });
}