{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "function buildMetadata(sample) {\n",
    "    var metadataSelector = d3.select('#sample-metadata');\n",
    "\n",
    "    d3.json(`/metadata/${sample}`).then( data =>{\n",
    "      metadataSelector.html(\"\");\n",
    "      console.log(Object.entries(data));\n",
    "      Object.entries(data).forEach(([key,value]) =>{\n",
    "        metadataSelector\n",
    "          .append('p').text(`${key} : ${value}`)\n",
    "          .append('hr')\n",
    "      });\n",
    "      })\n",
    "}\n",
    "\n",
    "function pieChart(data) {\n",
    "    console.log(data);\n",
    "    let labels = data.otu_ids.slice(0,10);\n",
    "    let values = data.sample_values.slice(0,10);\n",
    "    let hovertext = data.otu_labels.slice(0,10);\n",
    "\n",
    "    let trace = [{\n",
    "      values : values,\n",
    "      labels : labels,\n",
    "      type : \"pie\",\n",
    "      textposition: \"inside\",\n",
    "      hovertext : hovertext\n",
    "    }];\n",
    "\n",
    "    let layout = {\n",
    "        title: '<b> Belly Button Pie Chart </b>',\n",
    "        plot_bgcolor: 'rgba(0, 0, 0, 0)',\n",
    "        paper_bgcolor: 'rgba(0, 0, 0, 0)',\n",
    "    };\n",
    "\n",
    "    Plotly.newPlot('pie', trace , layout, {responsive: true});\n",
    "}\n",
    "\n",
    "function bubbleChart(data) {\n",
    "  let x = data.otu_ids;\n",
    "  let y = data.sample_values;\n",
    "  let markersize = data.sample_values;\n",
    "  let markercolors = data.otu_ids;\n",
    "  let textvalues = data.otu_labels;\n",
    "\n",
    "  let trace =[{\n",
    "    x: x,\n",
    "    y: y,\n",
    "    mode: 'markers',\n",
    "    marker: {\n",
    "      size: markersize,\n",
    "      color: markercolors,\n",
    "    },\n",
    "    text: textvalues\n",
    "  }];\n",
    "\n",
    "  let layout ={\n",
    "    title:\"<b> Belly Button Bubble Chart </b>\",\n",
    "    xaxis: {\n",
    "      title: 'OTU ID',\n",
    "    },\n",
    "    yaxis: {\n",
    "      title: 'Sample Value'\n",
    "    },\n",
    "    width:1100,\n",
    "    plot_bgcolor: 'rgba(0, 0, 0, 0)',\n",
    "    paper_bgcolor: 'rgba(0, 0, 0, 0)',\n",
    "  };\n",
    "\n",
    "  Plotly.newPlot('bubble', trace, layout, {responsive: true});\n",
    "}\n",
    "\n",
    "function gaugeChart(data) {\n",
    "  // Enter a speed between 0 and 180\n",
    "  let degree = parseInt(data.WFREQ) * (180/10);\n",
    "\n",
    "  let level = degree;\n",
    "\n",
    "  // Trig to calc meter point\n",
    "  let degrees = 180 - level,\n",
    "       radius = .5;\n",
    "  let radians = degrees * Math.PI / 180;\n",
    "  let x = radius * Math.cos(radians);\n",
    "  let y = radius * Math.sin(radians);\n",
    "\n",
    "  // Path: may have to change to create a better triangle\n",
    "  let mainPath = 'M -.0 -0.025 L .0 0.025 L ',\n",
    "       pathX = String(x),\n",
    "       space = ' ',\n",
    "       pathY = String(y),\n",
    "       pathEnd = ' Z';\n",
    "  let path = mainPath.concat(pathX,space,pathY,pathEnd);\n",
    "\n",
    "  let trace = [{ type: 'scatter',\n",
    "     x: [0], y:[0],\n",
    "      marker: {size: 28, color:'850000'},\n",
    "      showlegend: false,\n",
    "      name: 'WASH FREQ',\n",
    "      text: data.WFREQ,\n",
    "      hoverinfo: 'text+name'},\n",
    "    { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],\n",
    "    rotation: 90,\n",
    "    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],\n",
    "    textinfo: 'text',\n",
    "    textposition:'inside',\n",
    "    textfont:{\n",
    "      size : 16,\n",
    "      },\n",
    "    marker: {colors:['rgba(6, 51, 0, .5)', 'rgba(9, 77, 0, .5)', \n",
    "                           'rgba(12, 102, 0 ,.5)', 'rgba(14, 127, 0, .5)',\n",
    "                           'rgba(110, 154, 22, .5)','rgba(170, 202, 42, .5)', \n",
    "                           'rgba(202, 209, 95, .5)','rgba(210, 206, 145, .5)', \n",
    "                           'rgba(232, 226, 202, .5)','rgba(255, 255, 255, 0)'\n",
    "                    ]},\n",
    "    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],\n",
    "    hoverinfo: 'text',\n",
    "    hole: .5,\n",
    "    type: 'pie',\n",
    "    showlegend: false\n",
    "  }];\n",
    "\n",
    "  let layout = {\n",
    "    shapes:[{\n",
    "        type: 'path',\n",
    "        path: path,\n",
    "        fillcolor: '850000',\n",
    "        line: {\n",
    "          color: '850000'\n",
    "        }\n",
    "      }],\n",
    "\n",
    "    title: '<b> Belly Button Washing Frequency</b> <br> Scrub Per Week',\n",
    "    xaxis: {zeroline:false, showticklabels:false,\n",
    "               showgrid: false, range: [-1, 1]},\n",
    "    yaxis: {zeroline:false, showticklabels:false,\n",
    "               showgrid: false, range: [-1, 1]},\n",
    "    plot_bgcolor: 'rgba(0, 0, 0, 0)',\n",
    "    paper_bgcolor: 'rgba(0, 0, 0, 0)',\n",
    "  };\n",
    "\n",
    "  Plotly.newPlot('gauge', trace, layout, {responsive: true});\n",
    "}\n",
    "\n",
    "\n",
    "function buildCharts(sample) {\n",
    "\n",
    "    d3.json(`/wfreq/${sample}`).then ( wdata =>\n",
    "      // ## Gauge Chart ##\n",
    "      gaugeChart(wdata)\n",
    "    );\n",
    "\n",
    "    d3.json(`/samples/${sample}`).then( data =>{\n",
    "      // ## Pie Chart ##\n",
    "      pieChart(data);\n",
    "      // ## Bubble Chart ##\n",
    "      bubbleChart(data);\n",
    "    });\n",
    "\n",
    "\n",
    "   \n",
    "}\n",
    "\n",
    "function init() {\n",
    "  // Grab a reference to the dropdown select element\n",
    "  var selector = d3.select(\"#selDataset\");\n",
    "\n",
    "  // Use the list of sample names to populate the select options\n",
    "  d3.json(\"/names\").then((sampleNames) => {\n",
    "    sampleNames.forEach((sample) => {\n",
    "      selector\n",
    "        .append(\"option\")\n",
    "        .text(sample)\n",
    "        .property(\"value\", sample);\n",
    "    });\n",
    "\n",
    "    // Use the first sample from the list to build the initial plots\n",
    "    const firstSample = sampleNames[0];\n",
    "    buildCharts(firstSample);\n",
    "    buildMetadata(firstSample);\n",
    "  });\n",
    "}\n",
    "\n",
    "function optionChanged(newSample) {\n",
    "  // Fetch new data each time a new sample is selected\n",
    "  buildCharts(newSample);\n",
    "  buildMetadata(newSample);\n",
    "}\n",
    "\n",
    "// Initialize the dashboard\n",
    "init();"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.3"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
