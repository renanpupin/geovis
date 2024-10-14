var LineChart = function(name, features, attributes, processed_data, div) {
    this.lineChart = null;
    this.name = name || null;
    this.features = features || null;
    this.attributes = attributes || null;
    this.processed_data = processed_data || null;

    this.getLineChart = function(){
        return this.lineChart;
    };
    
    this.setLineChart = function(lineChart){
        this.lineChart = lineChart;
    };

    this.cleanChartDataNullIndex();

    this.initChart(div);
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

LineChart.prototype.cleanChartDataNullIndex = function(){
  this.processed_data.clean(undefined);
  console.log(this.processed_data);
};

LineChart.prototype.initChart = function(div){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Id');
    data.addColumn('number', this.attributes);
    data.addColumn('number', 'Média');
    data.addColumn({'type': 'string', 'role': 'tooltip'});
    data.addRows(this.processed_data);

      var options = {
        'title': this.name,
        'width':350,
        'height':250,
        legend: {
          position: 'bottom', 
          maxLines: 1
        },
        hAxis: {
          minValue: 0
        },
        vAxis: {title: this.attributes},
        series: {
          1: {
            legend: 'none'
              // tooltip: {isHtml: true},
          }
        }
      };

    var chart = new google.visualization.LineChart(div);
    chart.draw(data, options);
};