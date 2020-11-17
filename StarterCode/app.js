function dropdownmenu() {
  d3.json("samples.json").then(function (data) {
    var samplenames = data.names;
    // console.log(samplenames);
    var location = d3.select("#selDataset");
    samplenames.forEach((x) => {
      location.append("option").text(x).property("value", x);
    });
    var firstid = samplenames[0];
    buildmetadatatables(firstid);
    buildcharts(firstid);
  });
}
function buildmetadatatables(sampleid) {
  d3.json("samples.json").then(function (data) {
    var tableinfo = data.metadata;
    console.log(tableinfo);
    var location = d3.select("#sample-metadata");
    var filterdata = tableinfo.filter((x) => x.id == sampleid);
    console.log(filterdata[0]);
    location.html("");
    Object.entries(filterdata[0]).forEach(function ([key, value]) {
      var row = location.append("tr");
      row.append("td").html(`${key}:`);
      row.append("td").html(`${value}`);
    
    });
  });
}

function buildcharts(sampleid) {
    d3.json("samples.json").then(function (data) {
        var tableinfo = data.samples;
        console.log(tableinfo);
        var filterdata = tableinfo.filter((x) => x.id == sampleid);
        console.log(filterdata[0]);
        var otu_ids = filterdata[0].otu_ids
        var sample_values = filterdata[0].sample_values
        var otu_labels = filterdata[0].otu_labels


        var trace_1 = {y:otu_ids.slice(0,10).map(x => `Otu ${x}`), 
          x:sample_values.slice(0,10),
          text:otu_labels.slice(0,10),
          type:"bar",
          orientation: "h"}

        var bar_data = [trace_1]
        var bar_layout = {title: "bar_chart"}
        Plotly.newPlot("bar", bar_data, bar_layout)
        
        var trace_2 = {x:otu_ids, 
          y:sample_values,
          text:otu_labels,
          mode: "markers", 
          marker: {
            size: sample_values,
            color: otu_ids}
          }

        var bubble_data = [trace_2]
        var bubble_layout = {title: "bubble_chart"}
        Plotly.newPlot("bubble", bubble_data, bubble_layout)
        });
};



// Will use in above:
// otu_ids as x
// sample_values as y

function optionChanged(newsampleid) {
  buildmetadatatables(newsampleid);
  buildcharts(newsampleid);
}
dropdownmenu();
