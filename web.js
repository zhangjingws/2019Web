/*
* @Author: lenovo
* @Date:   2019-12-15 10:46:05
* @Last Modified by:   lenovo
* @Last Modified time: 2019-12-15 10:53:04
*/
		var word = document.getElementById("div1");
		window.onload = function(){
			setInterval(function(){
				var now = parseInt(getStyle(word,"right"));
				if (now == 1000) {
					word.style.right = '-200px';
				}
				else{
					word.style.right = now+1+"px";
				}
			},50)
		}
		function getStyle(obj,attr){
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			}
			else{
				return getComputedStyle(obj,null)[attr];
			}
		}

		var box = document.getElementById("box");
		var photo = document.getElementById("photo");
		var photor = document.getElementById("photor");
		var point = document.getElementById("point").children;
		var left = document.getElementById("left");
		var right = document.getElementById("right");
		var flag = 1;
		var timer;
		var isStop = 1;

		//移到下一张图片
		function next(){
			if (isStop === 1) {
				isStop = 0 ; 
				flag++;
				pointChange();
				animate(photo,{left:-1200*flag},function(){
					if (flag === 6) {
						photo.style.left = "-1200px";
						flag = 1;
					}
					isStop = 1;
				});
			}	
		}

		//移到前一张图片
		function prev(){
			if (isStop === 1) {
				isStop = 0;
				flag--;
				pointChange();
				animate(photo,{left:-1200*flag},function(){
					if (flag === 0) {
						photo.style.left = "-6000px";
						flag = 5;
					}
					isStop = 1;
				});
			}
		}
		
		//轮播图计时器
		var timer = setInterval(next,3000);

		//鼠标进入后出现
		box.onmouseover = function(){
			animate(left,{opacity:50});
			animate(right,{opacity:50});
			clearInterval(timer);
		}

		//h鼠标画出后消失
		box.onmouseout = function(){
			animate(left,{opacity:0});
			animate(right,{opacity:0});
			timer = setInterval(next,3000);
		}

		//左右点击
		left.onclick = prev;
		right.onclick = next;

		//圆
		var i = 0;
		while(i < point.length){
			point[i].idx = i;
			point[i].onclick = function(){
				flag = this.idx +1;
				pointChange(); 
				animate(photo,{left:-1200*flag})
			}
			i++;
		}

		//圆变色
		function pointChange (){
			for (var i =0 ; i < point.length; i++) {
				point[i].className = '';
			}
			if (flag === 6) {
				point[0].className = "move";
			}
			else if(flag === 0){
				point[4].className = "move";
			}
			else{
				point[flag-1].className = "move";
			}	
		}