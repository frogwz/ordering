$(document).ready(function(){
	var today = new Date();
	var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五","星期六"];
	var text=today.getMonth();
	var year=today.getFullYear();
	var Month=parseInt(text)+1;
	var days=30;
		$("#depart").get(0).selectedIndex=0;
	$("#depart").change(function(){
		var people=[
			["请选择姓名"],
			["张三","李四"],
			["孙悟空","唐僧"],
			["陈一","小明"]
		];
		$("#depart option").each(function(i){
			$(this).click(function(){
				var dPeople=people[i];
				$(".name").empty();
				for(var j=0;j<dPeople.length;j++){
					var PeopleHtml="<option>"+dPeople[j]+"</option>";
					$(".name").append(PeopleHtml);
				}

			});
		});
	});
	$(function(){
		//	var today = new Date();
		//	var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五","星期六"];
		//	var text=today.getMonth();
		//	var year=today.getFullYear();
		//	var Month=parseInt(text)+1;
		//	var days=30;
		if(Month==2){
			days=year%4==0?29:28;



		}else if((Month==1)||(Month==3)||(Month==5)||(Month==7)||(Month==8)||(Month==10)||(Month==12)){
			days=31;
		}else{
			days=30;
		}
		for(var i=1;i<days+1;i++){
			text=Month.toString();
			var ddate=i.toString();
			text=year+"-"+text+"-"+ddate;
			//var t=$("tr").children().eq(4).text();
			$("#ordertable").find("tr").children().eq(i*4).html(text);
			var week=new Date(text).getDay();
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
			var ask="你是"+$("#people option:selected").text()+"吗?如果不是请点击取消";
		if(	confirm(ask)){
			//confirm($("#people option:selected").text()+"？");
		$.ajax({
			type:'post',
			url:'./order',
			data:$("form").serialize(),
			async:false,
			dataType :'text',
			//	contentType: 'application/json',
			success:function(data) {
				// your code
				//alert(data);
				alert("提交成功,请到查询页查看结果");
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
		$.ajax({
			type:'post',
			url:'./search',
			data:$("form").serialize(),
			async:false,
			dataType:'json',
			//dataType:'text',
			//	contentType:'application/json',
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
					text=Month.toString();
					var ddate=i.toString();
					text=year+"-"+text+"-"+ddate;
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


})
