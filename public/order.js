$(document).ready(function(){
	var today = new Date();
	var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五","星期六"];
	var Monthtext=today.getMonth();
	var year=today.getFullYear();
	//var Month=parseInt(Monthtext)+1;
	var days=30;
	var people=[
		["请选择姓名"],
		["",""],
		["",""],
		["",""],
		["",""],
		["",""],
		["",""],
		["",""]
	];
	$("#depart").get(0).selectedIndex=0;
	$.ajax({
		type:'get',
		url:'./date',
		async:false,
		dataType:'json',
		success:function(data) {
			//alert(data[0].year);
			Monthtext=data[0].month;
			year=data[0].year;

			var orderdate="&nbsp;&nbsp;&nbsp;预定"+year+"年"+Monthtext+"月";
			$("#date").html(orderdate);	

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
	});
	var Month=parseInt(Monthtext);
	//var orderdate="&nbsp;&nbsp;&nbsp;预定"+year+"年"+Monthtext+"月";
	//$("#date").html(orderdate);	
	$("#depart").change(function(){
		var x=$("#depart").get(0).selectedIndex;
		$.ajax({
			type:'post',
			url:'./select',
			data:{'depart':$("#depart option:selected").text()},
			async:false,
			dataType:'json',
			success:function(data) {
				for(var j=0;j<data.length;j++){
					people[x][j]=data[j].people;
					//alert(data[0].depart);
				}
				//alert(people[1]);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
		});
		$("#depart option").each(function(i){
			//alert("ok");
			//	$(this).click(function(){
			if($(this).is(":selected")){
				//alert("ok2");
				var dPeople=people[i];
				$(".name").empty();
				for(var j=0;j<dPeople.length;j++){
					//alert("ok3");
					var PeopleHtml="<option>"+dPeople[j]+"</option>";
					$(".name").append(PeopleHtml);
				}

				//	});
			}
		});
	});
	function getDays(year,Month){
		var days;
		if(Month==2){
			days=year%4==0?29:28;



		}else if((Month==1)||(Month==3)||(Month==5)||(Month==7)||(Month==8)||(Month==10)||(Month==12)){
			days=31;
		}else{
			days=30;
		}
		return days;
	}
	$(function(){
		/**
		if(Month==2){
			days=year%4==0?29:28;



		}else if((Month==1)||(Month==3)||(Month==5)||(Month==7)||(Month==8)||(Month==10)||(Month==12)){
			days=31;
		}else{
			days=30;
		}
		**/
		days=getDays(year,Month);
		for(var i=1;i<days+1;i++){
			var text=Month.toString();
			var ddate=i.toString();

			text=year+"/"+text+"/"+ddate;
			//var t=$("tr").children().eq(4).text();
			$("#ordertable").find("tr").children().eq(i*4).html(text);
			var wdate=new Date(text);
			var week=wdate.getDay();
			$("#ordertable").find("tr").children().eq(i*4+1).html(weekDay[week]);
			if(week==0){
				$("#ordertable").find("tr").children().eq(i*4+0).css("background-color","#bbb");
				$("#ordertable").find("tr").children().eq(i*4+1).css("background-color","#bbb");
				$("#ordertable").find("tr").children().eq(i*4+2).css("background-color","#bbb");
				$("#ordertable").find("tr").children().eq(i*4+3).css("background-color","#bbb");
			}
			var input="<input type='checkbox' name='lunch' value='"+ddate+"'>";
			$("#ordertable").find("tr").children().eq(i*4+2).html(input);
			input="<input type='checkbox' name='dinner' value='"+ddate+"'>";
			$("#ordertable").find("tr").children().eq(i*4+3).html(input);

			//alert(t);
		}

	});
	$("#lunchAll").change(function() {
		if($("#lunchAll").is(':checked')){
			for(var i=0;i<days;i++){
				$("#ordertable").find("td").children().eq(i*4+2).prop("checked", true);
				$("#ordertable").find("td").children().eq(i*4+0).prop("checked", true);
			}
		}
		else{
			for(var i=0;i<days;i++){
				$("#ordertable").find("td").children().eq(i*4+0).prop("checked", false);
				$("#ordertable").find("td").children().eq(i*4+2).prop("checked", false);
			}
		}
	});
	$("#dinnerAll").click(function() {
		if($("#dinnerAll").is(':checked')){
			for(var i=0;i<days;i++){
				$("#ordertable").find("td").children().eq(i*4+1).prop("checked", true);
				$("#ordertable").find("td").children().eq(i*4+3).prop("checked", true);
			}
		}
		else{
			for(var i=0;i<days;i++){
				$("#ordertable").find("td").children().eq(i*4+1).prop("checked", false);
				$("#ordertable").find("td").children().eq(i*4+3).prop("checked", false);
			}
		}
	});
	$("#order").click(function() {
		if($("#depart").get(0).selectedIndex!=0){
			if($("#people option:selected").text()==""){
				alert("请选择部门和姓名");
				return false;
			}
			var ask="你是"+$("#people option:selected").text()+"吗?如果不是请点击取消";
			if(	confirm(ask)){
				//confirm($("#people option:selected").text()+"？");
				var dataForm=$("form").serializeArray();
				//$(dataForm).attr("year","2016");
				//dataForm.month="2016";
				//	alert(dataForm[0].name);
				dataForm.push({name:"year",value:year});
				dataForm.push({name:"month",value:Monthtext});
				$.ajax({
					type:'post',
					url:'./order',
					//data:$("form").serializeArray(),
					data:dataForm,
					async:false,
					dataType :'text',
					//	contentType: 'application/json',
					success:function(data) {
						// your code
						alert(data);
						//alert("提交成功,请到查询页查看结果");
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert(XMLHttpRequest.status);
						alert(XMLHttpRequest.readyState);
						alert(textStatus);
					},
				});
			}
		}else{
			alert("请选择部门和姓名");
		}
		return false;
	});
	$("#search").click(function() {
		if($("#depart").get(0).selectedIndex!=0){
			if($("#people option:selected").text()==""){
				alert("请选择部门和姓名");
				return false;
			}
			$.ajax({
				type:'post',
				url:'./search',
				data:$("form").serialize(),
				async:false,
				dataType:'json',
				success:function(data) {
					//alert(data.lunch[1]);
					if($("#tablesearch tr").length==1){
						for(var i=1;i<days+1;i++){
							var newRow = "<tr style=\"background:white;\"><td></td><td></td><td></td><td></td></tr>";
							$("#tablesearch tr:last").after(newRow);
						}
					}
					//****/
					for(var i=1;i<days+1;i++){
						var text=Month.toString();
						var ddate=i.toString();
						text=year+"/"+text+"/"+ddate;
						$("#tablesearch").find("tr").children().eq(i*4).html(text);
						var week=new Date(text).getDay();
						$("#tablesearch").find("tr").children().eq(i*4+1).html(weekDay[week]);
						if(week==0){
							$("#tablesearch").find("tr").children().eq(i*4+0).css("background-color","#bbb");
							$("#tablesearch").find("tr").children().eq(i*4+1).css("background-color","#bbb");
							$("#tablesearch").find("tr").children().eq(i*4+2).css("background-color","#bbb");
							$("#tablesearch").find("tr").children().eq(i*4+3).css("background-color","#bbb");
						}
						//var input="<input type='checkbox' name='lunch' value='"+ddate+"'>";
						var input="&#32;";
						if(data.lunch!=null){
							for(var k=0;k<data.lunch.length;k++){
								if(i.toString()==data.lunch[k]){
									input="&#10004";
									break;
								}else{
									input="&#32;";

								}
							}
						}else{
						}
						$("#tablesearch").find("tr").children().eq(i*4+2).html(input);
						input="&#32;";
						if(data.dinner!=null){
							for(var k=0;k<data.dinner.length;k++){
								if(i.toString()==data.dinner[k]){
									input="&#10004";
									break;
								}else{
									input="&#32;";

								}
							}}

							$("#tablesearch").find("tr").children().eq(i*4+3).html(input);

							//alert(t);
					}
					//**/
					// your code
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus);
				},

			});
		}else{
			alert("请选择部门和姓名");
		}
		return false;
	});
	//	$("#order").click(function(){
	//		alert("ok");
	//	});
	$("#addpeople").click(function(){
		//alert("ok");
		//alert($("#addForm").serialize());
		if($.trim($("#nameCheck").val())==''){
			alert("姓名不能为空");
			return false;
		}
		$("#nameCheck").val(($.trim($("#nameCheck").val())));
		$.ajax({
			type:'post',
			url:'./addPeople',
			data:$("#addForm").serialize(),
			async:false,
			dataType:'text',
			success:function(data) {
				alert(data);
			}
		});

	});
	$("#delpeople").click(function(){
		//alert("ok");
		//alert($("#addForm").serialize());
		if($.trim($("#nameCheck").val())==''){
			alert("姓名不能为空");
			return false;
		}
		$("#nameCheck").val(($.trim($("#nameCheck").val())));
		$.ajax({
			type:'post',
			url:'./delPeople',
			data:$("#addForm").serialize(),
			async:false,
			dataType:'text',
			success:function(data) {
				alert(data);
			}
		});

	});
	$("#setDate").click(function(){
		//alert("ok");
		//alert($("#addForm").serialize());
		$.ajax({
			type:'post',
			url:'./date',
			data:$("#setDateForm").serialize(),
			async:false,
			dataType:'text',
			success:function(data) {
				alert(data);
			}
		});

	});
	function sortDepart(a,b){
		return a.depart>b.depart;
		//	return a.people-b.people;
		//return a.localeCompare(b);
		//	return a.depart.localeCompare(b.a);
	}
	$("#tj").click(function(){
		//alert("ok");
		//alert($("#addForm").serialize());
		var n=getDays($("#year").val(),$("#month").val());
		$("#tabletj1 tbody").find("tr:gt(0)").children().text("");
		$("#tabletj2 tbody").find("tr:gt(0)").children().text("");
		//$("#tabletj2 tdbody").empty();

		$.ajax({
			type:'post',
			url:'./searchPeople',
			//data:,
			async:false,
			dataType:'json',
			success:function(data) {
				data.sort(sortDepart);
				//var b=JSON.stringify(data);
				//alert(b);
				//alert(JSON.stringify(data));
				//$("#tabletj1").find("tbody").empty();
				//	alert($("#tabletj1 tr").length);
				if($("#tabletj1 tr").length==1){
					for(var i=0;i<data.length+1;i++){
						var newRow = "<tr style=\"background:white;\"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
						//$("#tabletj1 tr:last").after(newRow);
						//$("#tabletj2 tr:last").after(newRow);
						$("#tabletj1 tbody").append(newRow);
						$("#tabletj1 tbody").append(newRow);
						$("#tabletj1 tbody").append(newRow);
						$("#tabletj2 tbody").append(newRow);
						$("#tabletj2 tbody").append(newRow);
						$("#tabletj2 tbody").append(newRow);
					}
				}
				$("#tabletj1").find("tr").children().eq(13*(1)+0).text("/");
				$("#tabletj1").find("tr").children().eq(13*(1+data.length+1)+0).text("/");
				$("#tabletj1").find("tr").children().eq(13*(1+data.length+1)+1).text("/");
				$("#tabletj1").find("tr").children().eq(13*(1+2*(data.length+1))+1).text("/");
				$("#tabletj1").find("tr").children().eq(13*(1)+1).text("/");
				for(var i=0;i<11;i++){
					var dateText=$("#year").val()+"/"+$("#month").val()+"/"+(i+1).toString();
					var weekN=new Date(dateText).getDay();
					dateText=dateText+"<br>"+weekDay[weekN];

					$("#tabletj1").find("tr").children().eq(13*(1)+2+i).html(dateText);
					$("#tabletj2").find("tr").children().eq(13*(1)+2+i).html(dateText);
					var dateText=$("#year").val()+"/"+$("#month").val()+"/"+(i+1+11).toString();
					var weekN=new Date(dateText).getDay();
					dateText=dateText+"<br>"+weekDay[weekN];
					$("#tabletj1").find("tr").children().eq(13*(1+data.length+1)+2+i).html(dateText);
					$("#tabletj2").find("tr").children().eq(13*(1+data.length+1)+2+i).html(dateText);
					if((i+22)<n){
						var dateText=$("#year").val()+"/"+$("#month").val()+"/"+(i+1+22).toString();
						var weekN=new Date(dateText).getDay();
						dateText=dateText+"<br>"+weekDay[weekN];
						$("#tabletj1").find("tr").children().eq(13*(1+2*(data.length+1))+2+i).html(dateText);
						$("#tabletj2").find("tr").children().eq(13*(1+2*(data.length+1))+2+i).html(dateText);

					}
				}
				for(var i=0;i<data.length;i++){
					$("#tabletj1").find("tr").children().eq(13*(i+2)+0).text(data[i].depart);
					$("#tabletj1").find("tr").children().eq(13*(i+2+data.length+1)+0).text(data[i].depart);
					$("#tabletj1").find("tr").children().eq(13*(i+2+2*(data.length+1))+0).text(data[i].depart);
					$("#tabletj1").find("tr").children().eq(13*(i+2)+1).text(data[i].people);
					$("#tabletj1").find("tr").children().eq(13*(i+2+data.length+1)+1).text(data[i].people);
					$("#tabletj1").find("tr").children().eq(13*(i+2+2*(data.length+1))+1).text(data[i].people);
					$("#tabletj2").find("tr").children().eq(13*(i+2)+0).text(data[i].depart);
					$("#tabletj2").find("tr").children().eq(13*(i+2+data.length+1)+0).text(data[i].depart);
					$("#tabletj2").find("tr").children().eq(13*(i+2+2*(data.length+1))+0).text(data[i].depart);
					$("#tabletj2").find("tr").children().eq(13*(i+2)+1).text(data[i].people);
					$("#tabletj2").find("tr").children().eq(13*(i+2+data.length+1)+1).text(data[i].people);
					$("#tabletj2").find("tr").children().eq(13*(i+2+2*(data.length+1))+1).text(data[i].people);
				}
				$.ajax({
					type:'post',
					url:'./tj',
					data:$("#setDateForm").serialize(),
					async:false,
					dataType:'json',
					success:function(bata) {
						//var b=JSON.stringify(data);
						//alert(bata);
						$.each(bata, function (n, value) {  
							//alert(n + ' ' + value.people);
							//	alert(data.length);
							for(var i=0;i<data.length;i++){

								//	alert($("#tabletj1").find("tr").children().eq(13*(i+2)+1).text());

								if($("#tabletj1").find("tr").children().eq(13*(i+2)+1).text()==value.people){
									//alert(value.people);
									if(value.lunch!=null){
										if(typeof(value.lunch)=="string"){
											var lunchInt=parseInt(value.lunch);
											$("#tabletj1").find("tr").children().eq(13*(i+2)+1+lunchInt).html("&#10004");
										}
										else{

											for(var j=0;j<value.lunch.length;j++){
												var lunchInt=parseInt(value.lunch[j]);
												if(lunchInt>22){
													$("#tabletj1").find("tr").children().eq(13*(i+2+2*(data.length+1))+1+lunchInt-22).html("&#10004");
												}else if(lunchInt>11){
													$("#tabletj1").find("tr").children().eq(13*(i+2+data.length+1)+1+lunchInt-11).html("&#10004");
												}else{
													$("#tabletj1").find("tr").children().eq(13*(i+2)+1+lunchInt).html("&#10004");
												}
											}
										}
									}
									if(value.dinner!=null){
										if(typeof(value.lunch)=="string"){
											var lunchInt=parseInt(value.dinner);
											$("#tabletj2").find("tr").children().eq(13*(i+2)+1+lunchInt).html("&#10004");
										}
										else{

											for(var j=0;j<value.dinner.length;j++){
												var lunchInt=parseInt(value.dinner[j]);
												if(lunchInt>22){
													$("#tabletj2").find("tr").children().eq(13*(i+2+2*(data.length+1))+1+lunchInt-22).html("&#10004");
												}else if(lunchInt>11){
													$("#tabletj2").find("tr").children().eq(13*(i+2+data.length+1)+1+lunchInt-11).html("&#10004");
												}else{
													$("#tabletj2").find("tr").children().eq(13*(i+2)+1+lunchInt).html("&#10004");
												}
											}
										}
									}

								}


							}
						});
					}
				});
				//}

		}
	});


});


})
