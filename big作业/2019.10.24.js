/*
* @Author: 边晨广
* @Date:   2019-12-24 21:01:03
* @Last Modified by:   边晨广
* @Last Modified time: 2019-12-24 21:47:48
*/
var xl2=document.getElementById("xl2");
xl2.setAttribute("onclick", "");
var box=document.getElementById('box');
var slider=document.getElementById('slider');
function next(){
		if(isMoving){
			return;
		}
		isMoving=true;
		index++;
		navChange();
		animate(slider,{left:-1200*index},function(){
			if(index===6){
				slider.style.left="-1200px";
				index=1;
			}
			isMoving=false;
		});			
	}
	var timer=setInterval(next,3000);
	box.onmouseover=function(){
		clearInterval(timer);;
	}
	box.onmouseout=function(){
		timer=setInterval(next,2000);
	}


function navChange(){
		for (var i = 0; i<oNavlist.length; i++) {
			oNavlist[i].className=' ';
		}
		if(index===6){
			oNavlist[0].className='active';
		}else if(index===0){
			oNavlist[4].className='active';
		}else{
			oNavlist[index-1].className='active';
		}
	}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var isStop =true;
		for(var attr in json){
			var now =0;
			if(attr=='opacity'){
				 now= parseInt(getStyle(obj,attr)*100);
			}else{
				 now= parseInt(getStyle(obj,attr));
			}
			var now =parseInt(getStyle(obj,attr));
				var speed = (json[attr]-now)/8;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				var current =now +speed;
				if(attr=='opacity'){
					obj.style.opacity=current/100;
				}else{
					obj.style[attr]=current+"px"; 
				}				
				if(json[attr]!==current){
					isStop =false;
				}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	},30)
}