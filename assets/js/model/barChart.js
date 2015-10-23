var BarChart = function(features, attributes) {
    this.barChart = null;
    this.features = features || null;
    this.attributes = attributes || null;

    this.getBarChart = function(){
        return this.barChart;
    };
    
    this.setBarChart = function(barChart){
        this.barChart = barChart;
    };

    this.initChart();
};

BarChart.prototype.initChart = function(){
    var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses', 'Profit'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350]
        ]);

        var options = {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          bars: 'horizontal' // Required for Material Bar Charts.
        };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}