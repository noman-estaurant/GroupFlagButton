document.onmousemove=mouseMove;
			document.onmouseup = mouseUp;
			var dragObject = null;
			var mouseOffset = null;

			var dragDiv = document.getElementById('FlagButton');
			makeDraggable(dragDiv);

			
			function mouseMove(ev){
				ev = ev || window.event;
				var mousePos = mouseCoords(ev);
				if (dragObject){
					dragObject.style.position = 'absolute';
					dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
					dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
					return false;
				}
			}
			
			function getMouseOffset(target, ev){
			  ev = ev || window.event;
			  var docPos = getPosition(target);
			  var mousePos = mouseCoords(ev);
			  return {x: mousePos.x - docPos.x, y: mousePos.y - docPos.y};
			}
			
			function getPosition(e){
			  var left = 0;
			  var top = 0;
			  while(e.offsetParent){
				left += e.offsetLeft;
				top += e.offsetTop;
				e = e.offsetParent;
			  }
			  left += e.offsetLeft;
			  top += e.offsetTop;
			  return {x: left, y: top};
			}
			
			function mouseUp(ev){
			  if(parseInt(dragObject != null && dragObject.style.left, 10) <  document.body.clientWidth / 2) dragObject.style.left = 0;
			  else if (dragObject != null) dragObject.style.left = document.body.clientWidth - 90 + 'px';
			  dragObject = null;
			}

			function makeDraggable(item){
			  if(!item) return;
			  item.onmousedown = function(ev){
				dragObject = this;
				mouseOffset = getMouseOffset(this, ev);
				return false;
			  }
			}

			function mouseCoords(ev){
			  if (ev.pageX || ev.pageY){
				return {x:ev.pageX, y:ev.pageY};
			  }
			  return{
				x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
				y: ev.clientY + document.body.scrollTop - document.body.clientTop
			  };
			}
