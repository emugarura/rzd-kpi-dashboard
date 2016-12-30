var isLocalDebug = true;

function drawCharts(d_start,d_end,p_Type) {
	//1 Выполнение расписания движения по станциям посадки и высадки
	$("div[id*='loader-']").show();

	$.ajax({
	  url: isLocalDebug ? 'data/1.json' : '/pls/tcl/ais_ref.dyn_graph.graph_do13',
		data: {
        'p_periodType': p_Type,
        'p_dateStart': d_start,
				'p_dateEnd': d_end
    },
	  dataType: 'json',
		success: function (data) {
				/*
				key
				0 - Сапсан
				1 - Аллегро
				2 - Ласточка (дальн)
				3 - Ласточка (приг)
				*/

				//console.log(data);
				$.each(data, function(key, val) {
					console.log('graph_do13 for ' + val.trg_name);
					var seriesData = {};
					var seriesX = [];
					var seriesY = [];

					$('#aa'+ key + '_badge').html('<h4>' + val.trg_name + '</h4> <span class="badge big">' + val.trg_proc + '%</span>')

					$.each(val.trg_area, function(k, v) {
		        seriesX.push(v.area_name);
						seriesY.push(v.val_count);
		      });
					//console.log(seriesX);
					//console.log(seriesY);
					seriesData = {"x": seriesX,
												"y": seriesY
											}
					//console.log(seriesData);
					linechartfromdata('d3-aa'+ key,'aa'+key,seriesData,val.trg_name);
	      });
		},
	      error: function (xhr, ajaxOptions, thrownError) {
					$("div[id*='loader-aa']").hide();
	        console.log('graph_do13 ' + xhr.status);
	        console.log('graph_do13 ' + thrownError);
	      }
	});

	//2 Пассажирооборот
	$.ajax({
		url: isLocalDebug ? 'data/2.json' : '/pls/tcl/ais_ref.dyn_graph.graph_pass',
		data: {
        'p_periodType': p_Type,
        'p_dateStart': d_start,
				'p_dateEnd': d_end
    },
	  dataType: 'json',
		success: function (data) {
				/*
				key
				0 - Сапсан
				1 - Аллегро
				2 - Ласточка (дальн)
				3 - Ласточка (приг)
				*/

				//console.log(data);
				var seriesData = {};
				var seriesX = [];
				var seriesY = [];
				var seriesZ = [];
				//для пригородных
				var seriesDataL = {};
				var seriesXL = [];
				var seriesYL = [];
				var seriesZL = [];

				$.each(data, function(key, val) {
					console.log('graph_pass for ' + val.trg_name);
					if (val.trg_name != 'Lastochka (suburban)') {
						$.each(val.trg_area, function(k, v) {
							seriesX.push(v.area_name);
							seriesY.push(v.val_count);
							seriesZ.push(v.val_proc);
						});
					} else {
						$.each(val.trg_area, function(k, v) {
							seriesXL.push(v.area_name);
							seriesYL.push(v.val_count);
							seriesZL.push(v.val_proc);
						});
					}

	      });
				// console.log('Дальнее');
				// console.log(seriesX);
				// console.log(seriesY);
				seriesData = {"x": seriesX,
											"y": seriesY
										}
				seriesData = {"data": seriesData,
											"labels": seriesZ
										}
				//console.log(seriesData);
				linechartfromdata('d3-bb0','bb0',seriesData,'Long-distance');

				//console.log('Пригородное');
				//console.log(seriesXL);
				//console.log(seriesYL);
				seriesDataL = {"x": seriesXL,
											"y": seriesYL
										}
				seriesDataL = {"data": seriesDataL,
											"labels": seriesZL
										}
				//console.log(seriesDataL);
				linechartfromdata('d3-bb1','bb1',seriesDataL,'Suburban');
		},
	      error: function (xhr, ajaxOptions, thrownError) {
					$("div[id*='loader-bb']").hide();
	        console.log('graph_pass ' + xhr.status);
	        console.log('graph_pass ' + thrownError);
	      }
	});

	//3 удельное количество жалоб
	$.ajax({
		url: isLocalDebug ? 'data/3.json' : '/pls/tcl/ais_ref.dyn_graph.graph_remark',
		data: {
        'p_periodType': p_Type,
        'p_dateStart': d_start,
				'p_dateEnd': d_end
    },
	  dataType: 'json',
		success: function (data) {
				console.log('graph_remark');
				var seriesData = [];

				$.each(data, function(key, val) {
					seriesData[val.remark_name]  = val.remark_count;
	      });

				piechartfromdata('d3-cc0','cc0',seriesData);
		},
	      error: function (xhr, ajaxOptions, thrownError) {
					$("div[id*='loader-cc']").hide();
	        console.log('graph_remark ' + xhr.status);
	        console.log('graph_remark ' + thrownError);
	      }
	});

	//4 Использование вместимости
	$.ajax({
		url: isLocalDebug ? 'data/4.json' : '/pls/tcl/ais_ref.dyn_graph.graph_capacity',
		data: {
        'p_periodType': p_Type,
        'p_dateStart': d_start,
				'p_dateEnd': d_end
    },
	  dataType: 'json',
		success: function (data) {
			console.log('graph_capacity');
			var seriesData = {};
			var seriesX = [];
			var seriesY = [];

			$.each(data, function(key, val) {
				seriesX.push(val.trg_name);
				seriesY.push(val.val_proc);
			});

			//console.log(seriesX);
			//console.log(seriesY);
			seriesData = {"x": seriesX,
										"Use of capacity": seriesY
									}
			//console.log(seriesData);
			groupedchartfromdata('d3-dd4','dd4',seriesData,Math.min.apply(null,seriesY));
	  },
	  error: function (xhr, ajaxOptions, thrownError) {
			$("div[id*='loader-dd']").hide();
	    console.log('graph_capacity ' + xhr.status);
	    console.log('graph_capacity ' + thrownError);
	  }
	});

	//2a Количество нарушений безопасности движения
	$.ajax({
		url: isLocalDebug ? 'data/2a.json' : '/pls/tcl/ais_ref.dyn_graph.graph_faultexpl',
		data: {
        'p_periodType': p_Type,
        'p_dateStart': d_start,
				'p_dateEnd': d_end
    },
	  dataType: 'json',
		success: function (data) {
				console.log('graph_faultexpl');
				var seriesData = [];

				$.each(data, function(key, val) {
					seriesData[val.fs_name]  = val.fs_proc;
	      });

				piechartfromdata('d3-2a','2a',seriesData);
		},
	      error: function (xhr, ajaxOptions, thrownError) {
					$("div[id*='loader-2a']").hide();
	        console.log('graph_faultexpl ' + xhr.status);
	        console.log('graph_faultexpl ' + thrownError);
	      }
	});

	//2b Удельное количество случаев некорректной работы
	$.ajax({
		url: isLocalDebug ? 'data/2b.json' : '/pls/tcl/ais_ref.dyn_graph.graph_incorrOper',
		data: {
        'p_periodType': p_Type,
        'p_dateStart': d_start,
				'p_dateEnd': d_end
    },
	  dataType: 'json',
		success: function (data) {
				/*
				key
				0 - Сапсан
				1 - Аллегро
				2 - Ласточка (дальн)
				*/

				//console.log(data);
				$.each(data, function(key, val) {
					console.log('graph_incorrOper for ' + val.trg_name);
					var seriesData = {};
					var seriesX = [];
					var seriesY = [];

					$.each(val.trg_area, function(k, v) {
		        seriesX.push(v.fs_name);
						seriesY.push(v.fs_sum);
		      });
					//console.log(seriesX);
					//console.log(seriesY);
					seriesData = {"x": seriesX,
												"y": seriesY
											}
					//console.log(seriesData);
					verticallinechartfromdata('d3-2b'+ key,'2b'+ key,seriesData,val.trg_name);
	      });
		},
	      error: function (xhr, ajaxOptions, thrownError) {
					$("div[id*='loader-2b']").hide();
	        console.log('graph_incorrOper ' + xhr.status);
	        console.log('graph_incorrOper ' + thrownError);
	      }
	});

	//3a Выручка, начисленная по перевозочным видам деятельности
	$.ajax({
		url: isLocalDebug ? 'data/3a.json' : '/pls/tcl/ais_ref.dyn_graph.graph_sum',
		data: {
        'p_periodType': p_Type,
        'p_dateStart': d_start,
				'p_dateEnd': d_end
    },
	  dataType: 'json',
		success: function (data) {
				/*
				key
				0 - Сапсан
				1 - Аллегро
				2 - Ласточка (дальн)
				3 - Ласточка (приг)
				*/

				console.log('graph_sum');
				var seriesData = {};
				var seriesX = [];
				var seriesY = [];
				var seriesZ = []; //for labels
				//для пригородных
				var seriesDataL = {};
				var seriesXL = [];
				var seriesYL = [];
				var seriesZL = [];

				$.each(data, function(key, val) {
					//console.log('makin 3a chart for ' + val.trg_name);

					if (val.trg_name != undefined) {
						if (val.trg_name != 'Lastochka (suburban)') {
							seriesX.push(val.trg_name);
							seriesY.push(val.trg_sum);
							seriesZ.push(val.trg_proc);

						} else {
							seriesXL.push(val.trg_name);
							seriesYL.push(val.trg_sum);
							seriesZL.push(val.trg_proc);
						}
					} else {
						//allD_proc
						$('#3a0_badge').html('<h4>Long-distance</h4> <span class="badge big">' + val.allD_proc + '%</span>')
						//allP_procc
						$('#3a1_badge').html('<h4>Suburban</h4> <span class="badge big">' + val.allP_procc + '%</span>')
					}
	      });

				//console.log(seriesX);
				//console.log(seriesY);
				seriesData = {"x": seriesX,
											"y": seriesY
										}
				seriesData = {"data": seriesData,
											"labels": seriesZ
										}
				//console.log(seriesData);
				linechartfromdata('d3-3a0','3a0',seriesData,'Long-distance');

				//console.log('Пригородное');
				//console.log(seriesXL);
				//console.log(seriesYL);
				seriesDataL = {"x": seriesXL,
											"y": seriesYL
										}
				seriesDataL = {"data": seriesDataL,
											"labels": seriesZL
										}
				//console.log(seriesDataL);
				linechartfromdata('d3-3a1','3a1',seriesDataL,'Suburban');

		},
	      error: function (xhr, ajaxOptions, thrownError) {
					$("div[id*='loader-3a']").hide();
	        console.log('graph_sum ' + xhr.status);
	        console.log('graph_sum ' + thrownError);
	      }
	});
}

$(".input-daterange").datepicker({
	format: "dd.mm.yyyy",
	language: "ru",
	todayBtn: "linked",
	autoclose: true,
	todayHighlight: true
});

//Set time interval
var now = new Date();
var yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1, 10);
console.info( "NOW " + now + " YERSERDAY " + yesterday);
$("#date_start").datepicker("setUTCDate", yesterday/*yesterday*/);
$("#date_end").datepicker("setUTCDate", yesterday);

$( "#chart_params" ).on( "click", function( event ) {
  console.info("CLICK");
  event.preventDefault();
	$(this).prop('disabled', true);
  $("div[id*='d3-']").empty();
	$("td[id*='_badge']").empty();

  //$( "#loader" ).show();
  //$( "#loader" ).hide();

  var date_start,
	  date_end,
		selected_period,
		periodType;

	date_start = $("#date_start").val();
	date_end = $("#date_end").val();
	//sys_location = $("#sys_location").val();
	//sys_location_name = $("#sys_location_name").val();
	selected_period = $("#selPeriod").val();

	if (selected_period == '0') {
		periodType = 1;
	} else if (selected_period == '1' || selected_period == '2') {
		periodType = 2;
	} else if (selected_period == '3' || selected_period == '4') {
		periodType = 3;
	} else {
		periodType = 4;
	}

	console.info("date_start=" + date_start );
	console.info( "date_end=" +  date_end );
	console.info("selected_period=" + selected_period );
	console.info("periodType=" + periodType );

	// drawlinechart3("d3-1",1,date_start,date_end,sys_location,sys_location_name);
	// drawlinechart3("d3-2",2,date_start,date_end,sys_location,sys_location_name);
	// drawlinechart3("d3-3",3,date_start,date_end,sys_location,sys_location_name);
	// drawlinechart3("d3-4",4,date_start,date_end,sys_location,sys_location_name);
	// drawlinechart3("d3-5",5,date_start,date_end,sys_location,sys_location_name);
	//здесь рисуем графики
	drawCharts(date_start,date_end,periodType);


  // добавляем ноль к дате или месяцу
  function addZero(i) {
	return (i < 10)? "0" + i: i;
  }
  // форматируем для oracle
  function formatDate(date) {
	if (date == -1) {
		console.info( "formatDate return " + date );
		return date;
	} else {
		var dd = addZero(date.getDate());
		var mm = addZero(date.getMonth()+1);
		var y = date.getFullYear();
		var formatted = dd + "." + mm + "." + y;

		console.info( "formatDate " + formatted );
		return formatted;
	}
  }

  $(this).prop('disabled', false);

  /*
	console.info("FINAL DATES TO ORACLE " + date_start + " - " + date_end );

	if (date_start != -1) {
		date_start = $("#date_start").datepicker('getUTCDate');
		console.info( "getUTCDate " + date_start );
	}

	if (date_end != -1) {
		date_end = $("#date_end").datepicker('getUTCDate');
		console.info( "getUTCDate " + date_end );
	}

	date_start = formatDate(date_start);
	date_end = formatDate(date_end);

	console.info("FINAL DATES TO ORACLE " + date_start + " - " + date_end );*/
});
//console.log( "period.js loaded" );
