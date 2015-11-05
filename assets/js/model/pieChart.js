var PieChart = function(name, features, attributes, processed_data, div) {
    this.pieChart = null;
    this.name = name || null;
    this.features = features || null;
    this.attributes = attributes || null;
    this.processed_data = processed_data || null;

    this.getPieChart = function(){
        return this.pieChart;
    };
    
    this.setPieChart = function(pieChart){
        this.pieChart = pieChart;
    };

    this.initChart(div);
};

PieChart.prototype.initChart = function(div){

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', this.attributes);
    data.addColumn('number', 'Ocorrências');
    data.addRows(this.processed_data);

    // Set chart options
    var options = {
        'title': this.name,
        'width': 350,
        'height': 250
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(div);
    chart.draw(data, options);
}