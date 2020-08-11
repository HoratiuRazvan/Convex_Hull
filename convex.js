
window.onload = function()
{
	var spPointX;
	var spPointY;
	var xCoordinates = [];
	var yCoordinates = [];
	var canvas = document.getElementById("myCanvas");
	var axis = canvas.getContext("2d");
	axis.beginPath();
	axis.moveTo(300,0);
	axis.lineTo(300,600);
	axis.stroke();
	axis.beginPath();
	axis.moveTo(0,300);
	axis.lineTo(600,300);
	axis.stroke();
	var a = [];
	var m = [];
	
	window.onclick=function(e){
		if( e.pageX > 0 && e.pageX < 600 && e.pageY < 600 && e.pageY > 0 )
		{
			var div_coord = document.createElement("div");
			div_coord.class = "div";
			var x_x = (e.pageX - 300) / 30;
			var y_y = (-e.pageY + 300) / 30;
			div_coord.innerHTML = x_x.toPrecision(5) + "," + y_y.toPrecision(5);
			div_coord.style.position = "absolute";
			//Setam corect coordonatele. Inmultim cu 10 coordonatele pentru a nu obtine puncte prea apropiate.
			xCoordinates.push(parseFloat(x_x.toPrecision(5)));
			yCoordinates.push(parseFloat(y_y.toPrecision(5)));
			var goodX = 300 - parseFloat(x_x.toPrecision(5))*30;
			var goodY = 300 - parseFloat(y_y.toPrecision(5))*30;
			div_coord.style.left = 600 - goodX + "px";
			div_coord.style.top = goodY + "px";
			div_coord.style.border="1px solid grey";
			div_coord.setAttribute("class","dot");
			div_coord.style.backgroundColor="green";
			document.body.appendChild(div_coord);
		}
	}
	
	
	document.getElementById("addDot").onclick = function()
	{
		var x = parseFloat(document.getElementById("textboxX").value);
		var y = parseFloat(document.getElementById("textboxY").value);
		var div_coord = document.createElement("div");
		div_coord.class = "div";
		div_coord.innerHTML = x + "," + y;
		div_coord.style.position = "absolute";
		//Setam corect coordonatele. Inmultim cu 10 coordonatele pentru a nu obtine puncte prea apropiate.
		xCoordinates.push(x);
		yCoordinates.push(y);
		var goodX = 300-x*30;
		var goodY = 300-y*30;
		div_coord.style.left = 600-goodX + "px";
		div_coord.style.top = goodY + "px";
		div_coord.style.border="1px solid grey";
		div_coord.setAttribute("class","dot");
		div_coord.style.backgroundColor="green";
		document.body.appendChild(div_coord);
	}
	document.getElementById("addSpecialDot").onclick = function()
	{
		var x = parseFloat(document.getElementById("textboxX").value);
		var y = parseFloat(document.getElementById("textboxY").value);
		var div_coord = document.createElement("div");
		div_coord.innerHTML = x + "," + y;
		div_coord.style.position = "absolute";
		spPointX = x;
		spPointY = y;
		var goodX = 300-x*30;
		var goodY = 300-y*30;
		div_coord.style.left = 600-goodX + "px";
		div_coord.style.top = goodY + "px";
		div_coord.style.border="1px solid grey";
		div_coord.style.backgroundColor="yellow	";
		div_coord.setAttribute("class","dot");
		div_coord.setAttribute("id","specialDot");
		document.body.appendChild(div_coord);
	}
	document.getElementById("resetAll").onclick = function()
	{
		var toRemove = document.getElementById("specialDot");
		if ( toRemove != null)
		toRemove.parentNode.removeChild(toRemove);
		a = [];
		m = [];
		xCoordinates = [];
		yCoordinates = [];
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		var divToRemove = document.getElementsByClassName("dot");
		while(divToRemove[0] != null)
			divToRemove[0].parentNode.removeChild(divToRemove[0]);
		
		axis.beginPath();
		axis.moveTo(300,0);
		axis.lineTo(300,600);
		axis.stroke();
		axis.beginPath();
		axis.moveTo(0,300);
		axis.lineTo(600,300);
		axis.stroke();		
	}
	document.getElementById("hideDots").onclick = function()
	{
		var dots = document.getElementsByClassName("dot");
		if(dots[0] != null && dots[0].style.display != "none")
			for(var i = 0; i < dots.length; i++)
				dots[i].style.display = "none";
		else
			for(var i = 0; i < dots.length; i++)
				dots[i].style.display = "inline";
		axis.strokeStyle = "#ff0000";
		axis.beginPath();
		axis.moveTo(spPointX*30 + 310, -spPointY*30 + 310);
		axis.lineTo(spPointX*30 + 290, -spPointY*30 + 290);
		axis.stroke();
		axis.beginPath();
		axis.moveTo(spPointX*30 + 290, -spPointY*30 + 310);
		axis.lineTo(spPointX*30 + 310, -spPointY*30 + 290);
		axis.stroke();
	}
	document.getElementById("resetGP").onclick = function()
	{
		var toRemove = document.getElementById("specialDot");
		if ( toRemove != null)
		toRemove.parentNode.removeChild(toRemove);
		a = [];
		m = [];
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		axis.beginPath();
		axis.moveTo(300,0);
		axis.lineTo(300,600);
		axis.stroke();
		axis.beginPath();
		axis.moveTo(0,300);
		axis.lineTo(600,300);
		axis.stroke();
		
	}
	document.getElementById("drawGraph").onclick = function()
	{
		var i,j;
		for(i = 0; i<yCoordinates.length;i++)
			for(j = i+1;j<yCoordinates.length;j++)
				if(yCoordinates[j]>yCoordinates[i])
				{
					var aux = yCoordinates[j];
					yCoordinates[j] = yCoordinates[i];
					yCoordinates[i] = aux;
					aux = xCoordinates[j]; 
					xCoordinates[j] = xCoordinates[i];
					xCoordinates[i] = aux;
				}
		m.push(0);
		for(i = 1; i<yCoordinates.length;i++)
			if( xCoordinates[i] - xCoordinates[0] >= -0.000005 && xCoordinates[i] - xCoordinates[0] <= 0.000005 )
			m.push(Number.MAX_SAFE_INTEGER);
			else
			m.push((yCoordinates[i]-yCoordinates[0])/(xCoordinates[i]-xCoordinates[0]));
		var z;
		for(i = 1; i <yCoordinates.length;i++)
			for(j = i+1;j<yCoordinates.length;j++)
				if(m[j]<m[i])
				{
					var aux = yCoordinates[j];
					yCoordinates[j] = yCoordinates[i];
					yCoordinates[i] = aux;
					aux = xCoordinates[j]; 
					xCoordinates[j] = xCoordinates[i];
					xCoordinates[i] = aux;
					aux = m[i];
					m[i] = m[j];
					m[j] = aux;
				}var putFirst = false;
		for(i = 1; i<m.length-1;i++)
		{
			if((m[i+1] > 0 && m[i]<0) || (m[i]>0 && m[i+1]<0))
			{
				putFirst = true;
				axis.beginPath();
				axis.moveTo(mapp(xCoordinates[0],"x"),mapp(yCoordinates[0],"y"));
				axis.lineTo(mapp(xCoordinates[i],"x"),mapp(yCoordinates[i],"y"));
				axis.stroke();
				a[i] = a[m.length*i] = 1;
				axis.beginPath();
				axis.moveTo(mapp(xCoordinates[0],"x"),mapp(yCoordinates[0],"y"));
				axis.lineTo(mapp(xCoordinates[i+1],"x"),mapp(yCoordinates[i+1],"y"));
				axis.stroke();
				a[i+1] = a[(i+1)*m.length] = 1;
			}
			else
			{
				axis.beginPath();
				axis.moveTo(mapp(xCoordinates[i],"x"),mapp(yCoordinates[i],"y"));
				axis.lineTo(mapp(xCoordinates[i + 1],"x"),mapp(yCoordinates[i + 1],"y"));
				axis.stroke();
				a[i*m.length+i+1] = a[(i+1)*m.length+i] = 1;
			}
		}
		if(putFirst ==true)
		{
			axis.beginPath();
			axis.moveTo(mapp(xCoordinates[1],"x"),mapp(yCoordinates[1],"y"));
			axis.lineTo(mapp(xCoordinates[i],"x"),mapp(yCoordinates[i],"y"));
			axis.stroke();
			a[i*m.length+1] = a[m.length+i] = 1;
		}
		else
		{
			axis.beginPath();
			axis.moveTo(mapp(xCoordinates[0],"x"),mapp(yCoordinates[0],"y"));
			axis.lineTo(mapp(xCoordinates[i],"x"),mapp(yCoordinates[i],"y"));
			axis.stroke();
			a[i] = a[i*m.length] = 1;
			axis.beginPath();
			axis.moveTo(mapp(xCoordinates[0],"x"),mapp(yCoordinates[0],"y"));
			axis.lineTo(mapp(xCoordinates[1],"x"),mapp(yCoordinates[1],"y"));
			axis.stroke();
			a[1] = a[m.length] = 1;
		}
	}
	document.getElementById("findAnswer").onclick = function()
	{
		var isOnFrontier = false;
		for ( var i = 0; i < xCoordinates.length; i++)
			if ( spPointX - xCoordinates[i] >= -0.000005 && spPointX - xCoordinates[i] <= 0.000005 &&
				spPointY - yCoordinates[i] >= -0.000005 && spPointY - yCoordinates[i] <= 0.000005)
			isOnFrontier = true;
		if ( isOnFrontier == true )
			alert( "It's on the frontier!!!" );
		else
		{
			var middlePointX = 0;
			var middlePointY = 0;
			for(var i = 0; i < xCoordinates.length; i++)
			{
				middlePointX += xCoordinates[i];
				middlePointY += yCoordinates[i];
			}		
			middlePointX /= xCoordinates.length;
			middlePointY /= xCoordinates.length;
			var areaFigure = 0;
			var areaSpFigure = 0;
			for(i = 0; i<m.length;i++)
				for(j = 0; j<m.length;j++)
					if(a[i*m.length+j] == 1 || a[i+j*m.length] == 1)
					{
						var aF = areaTriangle(middlePointX,xCoordinates[i],xCoordinates[j],middlePointY,yCoordinates[i],yCoordinates[j]);
						var aSF = areaTriangle(spPointX,xCoordinates[i],xCoordinates[j],spPointY,yCoordinates[i],yCoordinates[j]);
						if( aSF <= 0.000005 && aSF >= -0.000005)
							isOnFrontier = true;
						a[i*m.length+j] = a[i+j*m.length] = 0;
						areaFigure   +=  aF;
						areaSpFigure += aSF;
					}
			if(isOnFrontier == true )
				alert("It's on the frontier.");
			else if(areaFigure - areaSpFigure >-0.00005 && areaFigure-areaSpFigure<0.00005)
				alert("INSIDE");
			else
				alert("OUTSIDE");
		}
	}
	
}

function areaTriangle(x1 , x2, x3 , y1 , y2 , y3)
{
	var aa = distance(x1,x2,y1,y2);
	var bb = distance(x2,x3,y2,y3);
	var cc = distance(x3,x1,y3,y1);
	var p = (aa+bb+cc)/2;
	return Math.sqrt(p*(p-aa)*(p-bb)*(p-cc));
}

function distance (x1 , x2 , y1 , y2)
{
	return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

function mapp(x,y)
{
	if ( y == 'x' )
	{
		return 300 + 30*x;
	}
	else
	{
		return 300 - 30*x;
	}
}