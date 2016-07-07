$(document).ready(function(){
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
		var today = new Date();
		var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五","星期六"];
		var text=today.getMonth();
		var year=today.getFullYear();
		var Month=parseInt(text)+1;
		var days=30;
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
		$("tr").children().eq(i*4).html(text);
		var week=new Date(text).getDay();
		$("tr").children().eq(i*4+1).html(weekDay[week]);
		if(week==0){
			$("tr").children().eq(i*4+0).css("background-color","#bbb");
			$("tr").children().eq(i*4+1).css("background-color","#bbb");
			$("tr").children().eq(i*4+2).css("background-color","#bbb");
			$("tr").children().eq(i*4+3).css("background-color","#bbb");
		}
		var input="<input type='checkbox' name='lunch' value='"+ddate+"'>";
		$("tr").children().eq(i*4+2).html(input);
		input="<input type='checkbox' name='dinner' value='"+ddate+"'>";
		$("tr").children().eq(i*4+3).html(input);

		//alert(t);
		}

	});
	$("#order").click(function() {
		  alert($('form').serialize());
		    return false;
	});
//	$("#order").click(function(){
//		alert("ok");
//	});


})
