/*document.onmousemove=touchMove;
			document.onmouseup = mouseUp;
			var dragObject = null;
			var mouseOffset = null;

			var dragDiv = document.getElementById('FlagButton');
			makeDraggable(dragDiv);

			
			function touchMove(ev){
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
*/
// startXY: single point movement starting point (touch)
// dXY: single point movement displacement
// top/left0: single point movement starting point (left / top)
var startX, startY, dX, dY, top0, left0, defaultX, defaultY
var start_time, duration
var item = document.getElementById("FlagButton")
var block = document.getElementById('StatusBlock')
var check = false;
var isClose = true
defaultX = 10
defaultY = 250

function touchStart(event){
	event.preventDefault()
	if (check || event.touches.length == 0) return
	var d = new Date();
	start_time = d.getTime()
	var touch = event.touches[0]
	startX = touch.pageX
	startY = touch.pageY
	check = true
	dX, dY = 0
	top0 = parseFloat(item.style.top)
	left0 = parseFloat(item.style.left)
}

function touchMove(event) {
		event.preventDefault();
		if (!check || event.touches.length == 0) return;
		var touch = event.touches[0]
		dX = touch.pageX - startX 
		dY = touch.pageY - startY 
		item.style.webkitTransform = 'translate(' + dX + 'px, ' + dY + 'px)';
}


function touchEnd(event) {
	event.preventDefault();
	if (!check) return;
	var d = new Date();
	duration = d.getTime() - start_time
	item.style.top = top0 + dY + "px"

	if (left0 + dX > document.body.clientWidth / 2) item.style.left = 10 + "px"
	else item.style.left = 10 + "px"

	item.style.webkitTransform = 'translate(' +  0 + 'px, ' + 0 + 'px)';
	check = false

}

function touchExpand(event){
	if (duration > 100) return;
	item.style.top = defaultY + "px"
	item.style.left = defaultX + "px"
	if (isClose){
		isClose = false;
		console.log(block.style.top)
		block.style.display = 'block'
	}
	else{
		isClose = true;
		block.style.display = 'none'
	}



}

var item = document.getElementById("FlagButton")
item.addEventListener("touchstart", touchStart, false)
item.addEventListener("touchmove", touchMove, false)
item.addEventListener("touchend", touchEnd, false)
item.addEventListener("touchend", touchExpand, false)

