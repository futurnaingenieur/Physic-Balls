window.onload=function(){function j(){f=[],g=[];for(var a=0;a<h;a++)f.push(20*Math.random()-10),g.push(30*Math.random()-10)}function k(){if(i!==h){this.x=settings.startingX,this.y=settings.startingY,this.vx=f[i],this.vy=g[i],this.color="rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+")";var a=document.getElementById("size").value;a++,a--,this.size=a,i++,projectileIndex++,projectiles[projectileIndex]=this,this.id=projectileIndex,this.life=0,this.maxLife=settings.maxLife}else console.log("Generating more seed angles"),j(),i=0}var a=window;slider_size=document.getElementById("size"),choosed_size=document.getElementById("size").value,text_size=document.getElementById("text-size"),changeColorButton=document.getElementById("changeBackground"),backgroundColor="rgb(0,0,0)";var b=document.getElementById("canvas");b.width=a.innerWidth,b.height=a.innerHeight;var c=b.getContext("2d");b.height/2;projectiles={},projectileIndex=0,settings={density:1,projectileSize:10,startingX:b.width/2,startingY:b.height/4,gravity:.5,maxLife:300,groundLevel:b.height,leftWall:0,rightWall:b.width};var f=[],g=[],h=100,i=0;j(),k.prototype.draw=function(){this.x+=this.vx,this.y+=this.vy;var a=this.size;this.y+a>settings.groundLevel&&(this.vy*=-.6,this.vx*=.75,this.y=settings.groundLevel-a),this.x-a<=settings.leftWall&&(this.vx*=-1,this.x=settings.leftWall+a),this.x+a>=settings.rightWall&&(this.vx*=-1,this.x=settings.rightWall-a),this.vy+=settings.gravity,this.life++,this.life>=this.maxLife&&delete projectiles[this.id],c.beginPath();var b=Math.floor(255*Math.random()),d=Math.floor(255*Math.random()),e=Math.floor(255*Math.random());document.getElementById("checkbox2").checked?(document.getElementById("text-multicolor").innerHTML="Multicolor Mode <br> ON",c.fillStyle="rgb("+b+","+d+","+e+")"):(document.getElementById("text-multicolor").innerHTML="Multicolor Mode <br> OFF",c.fillStyle=this.color),c.arc(this.x,this.y,a,0,2*Math.PI,!0),c.closePath(),c.fill()},setInterval(function(){choosed_size=document.getElementById("size").value,text_size.innerHTML="Size: "+choosed_size,c.fillStyle=backgroundColor,document.getElementById("checkbox").checked?document.getElementById("text-trace").innerHTML="Trace Mode <br> ON":(document.getElementById("text-trace").innerHTML="Trace Mode <br> OFF",c.fillRect(0,0,b.width,b.height));for(var a in projectiles)projectiles[a].draw()},30),changeColorButton.onclick=function(){document.getElementById("checkbox").checked?alert("Set Trace Mode to OFF in order to change the background color."):backgroundColor="rgb("+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+")"},b.addEventListener("click",function(a){var b=a.clientX,c=a.clientY;settings.startingX=b,settings.startingY=c,new k},!1)};