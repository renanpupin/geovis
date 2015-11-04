var BarChart = function(name, features, attributes, processed_data, div) {
    this.barChart = null;
    this.name = name || null;
    this.features = features || null;
    this.attributes = attributes || null;
    this.processed_data = processed_data || null;

    this.getBarChart = function(){
        return this.barChart;
    };
    
    this.setBarChart = function(barChart){
        this.barChart = barChart;
    };

    this.initChart(div);
};

BarChart.prototype.initChart = function(div){

      var data = new google.visualization.DataTable();
      data.addColumn('string', this.attributes);
      data.addColumn('number', 'Ocorrências');
      data.addRows(this.processed_data);

        var options = {
                      'title': this.name,
                      'width':350,
                      'height':250,
                      bar: {groupWidth: "50%"},
                      legend: { position: 'bottom', maxLines: 1 },
                      hAxis: {
                        minValue: 0
                      },
                 };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(div);
    chart.draw(data, options);
}