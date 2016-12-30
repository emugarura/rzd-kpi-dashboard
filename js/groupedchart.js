function groupedchartfromdata(id,chart_id,dataset,axisMinVal) {
//	$("#"+"loader-"+chart_id).show();
	var traincolors = ['#1f77b4', '#3fb290', '#ff7f0e', '#e377c2'];
	var othercolors = ['#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];

	var chart = c3.generate({
		data: {
			x: 'x',
			json: dataset,
			type: 'bar',
			color: function (color, d) {
				if (d.x==0) {
					return traincolors[0];
				} else if (d.x==1) {
					return traincolors[1];
				} else if (d.x==2) {
					return traincolors[2];
				} else {
					return '#9edae5';
				}
			 },
			labels: true,
			labels: {
		    format: function (v, id_, i, j) { return v + "%"; },
		  }
		},
		legend: {
		  hide: true
		},
		bindto: "#"+id,
		bar: {
			width: {
				ratio: 0.5 // this makes bar width 50% of length between ticks
			}
		},
		axis: {
			x: {
            type: 'category'
	    },
			y: {
						max: 98,
						min: axisMinVal-2
			},
			rotated: true
		},

    tooltip: {
        format: {
						name: function () { return 'Use of capacity'; },
            value: function (value, ratio, id) {
                return value + "%";
            }
        }
    },
		onrendered: function () { /*console.log("rendered");*/ $("#"+"loader-"+chart_id).hide(); },
		onresized: function (event) { /*console.log("resized "  + event);*/ setTimeout(chart.flush,500); return false; }
	});
}
