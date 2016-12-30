function verticallinechartfromdata(id,chart_id,dataset,dataname) {
//	$("#"+"loader-"+chart_id).show();

	var traincolors = ['#1f77b4', '#3fb290', '#ff7f0e', '#e377c2'];
	var othercolors = ['#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];

	//toJSON
	var seriesData = {};
	//var seriesDataAdd = {};
	/*if (id=='d3-aa1') {
		seriesData = {'x':['С-Петербург – Бологое, В.Новгород', 'Москва – Н.Новгород (ФПК)', 'С-Петербург – Хельсинки', 'Адлер – Майкоп', 'Адлер-Краснодар (ФПК)'],
									'Сапсан':[110, 300, 540, 161, 80]};
	} else if (id=='d3-aa2') {
		seriesData = {'x':['С-Петербург – Бологое, В.Новгород', 'Москва – Н.Новгород (ФПК)', 'С-Петербург – Хельсинки', 'Адлер – Майкоп', 'Адлер-Краснодар (ФПК)'],
									'Ласточка':[310, 100, 40, 101, 380]};
	} else if (id=='d3-aa3') {
		seriesData = {'x':['С-Петербург – Хельсинки', 'Хельсинки - С-Петербург'],
									'Аллегро':[410, 300]};
	} else {
		seriesData = {'x':['С-Петербург – Бологое, В.Новгород', 'Москва – Н.Новгород (ФПК)', 'С-Петербург – Хельсинки', 'Адлер – Майкоп', 'Адлер-Краснодар (ФПК)'],
									'Пассажирооборот':[110, 300, 540, 161, 80]};
		var seriesDataAdd = [10, 20, 30, 40, 50];
	}*/

	var chart = c3.generate({
		data: {
			x: 'x',
			json: dataset,
      names: {
          y: dataname
      },
			/*columns: [
					['x', 'С-Петербург – Бологое, В.Новгород', 'Москва – Н.Новгород (ФПК)', 'С-Петербург – Хельсинки', 'Адлер – Майкоп', 'Адлер-Краснодар (ФПК)'],
					['Сапсан', 130, 300, 540, 161, 80]
				],*/
			type: 'bar',
			labels: true,
			labels: {
		    format: function (v, id_, i, j) {
					if (typeof seriesDataAdd !== 'undefined') {
							return v + ' (' + seriesDataAdd[i] + "%)";
					} else {
						return v;
					}
				 },
		  },
			color: function (color, d) {
				if (id=='d3-aa0') {
					return traincolors[0];
				} else if (id=='d3-aa1') {
					return traincolors[1];
				} else if (id=='d3-aa2') {
					return traincolors[2];
				} else if (id=='d3-aa3') {
					return traincolors[3];
				}else {
					return othercolors[d.index];
				}
			 }
		},
		/*color: {
		  pattern: ['#ff7f0e', '#aec7e8']
		},*/
		bindto: "#"+id,
		bar: {
			width: {
				ratio: 0.5 // this makes bar width 50% of length between ticks
			}
		},
		legend: {
		  hide: true
		},
		axis: {
			x: {
            type: 'category',
						height: 80,
						tick: {
			        rotate: -45,
							//multiline: false,
              format: function(date) {
								var str = this.api.categories()[date].substring(0, 25);
								if (this.api.categories()[date].length>25) {
									str += '...'
								}
								return str;
							}

			      }
      },
			y: {
		    show: false
		  }/*,
			rotated: true*/
		},
		onrendered: function () { /*console.log("rendered");*/ $("#"+"loader-"+chart_id).hide(); },
		onresized: function (event) { /*console.log("resized "  + event);*/ setTimeout(chart.flush,500); return false; }
	});
};
