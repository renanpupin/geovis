var PieChart = function(data, attributes) {
    this.chart = null;
    this.data = data || null;

    this.getChart = function(){
        return this.chart;
    };
    
    this.setChart = function(chart){
        this.chart = chart;
    };

    this.initChart();
};

PieChart.prototype.initChart = function(){
        //console.log(this.data);
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
}

//PieChart.prototype = new Chart();
//PieChart.prototype.constructor = PieChart;