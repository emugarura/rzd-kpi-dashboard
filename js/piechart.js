function piechartfromdata(id,chart_id,dataset) {
//	$("#"+"loader-"+chart_id).show();
	var piecolors = ['#ED1C24', '#FF7F27', '#22B14C', '#00A2E8'];

	var chart = c3.generate({
	  data: {
			json: dataset,
      /*columns: [
          ['Благодарности', 30],
          ['Жалобы', 120],
					['Обращения', 420]
      ],*/
      type : 'pie',
			color: function (color, d) {
				if (d=='Complaint') {
					return piecolors[0];
				} else if (d=='Suggestion') {
					return piecolors[1];
				} else if (d=='Gratitude') {
					return piecolors[2];
				} else if (d=='Appeal') {
					return piecolors[3];
				} else {
					return color;
				}
			}
	  },
		pie: {
	      label: {
	          format: function (value, ratio, id_) {
	              return value;
	          }
	      }
	  },
	  legend: {
	      position: 'bottom',
	  },
		bindto: "#"+id,
		onrendered: function () { /*console.log("rendered");*/ $("#"+"loader-"+chart_id).hide(); },
		onresized: function (event) { /*console.log("resized "  + event);*/ setTimeout(chart.flush,500); return false; }
	});
}
