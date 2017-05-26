/*			____    ____  __   _______  __       _______   __   ___________    ____    .___________.    ___       __  ___  _______  __    __    ______   .___  ___.  _______ 
			\   \  /   / |  | |   ____||  |     |       \ |  | |   ____\   \  /   /    |           |   /   \     |  |/  / |   ____||  |  |  |  /  __  \  |   \/   | |   ____|
			 \   \/   /  |  | |  |__   |  |     |  .--.  ||  | |  |__   \   \/   /     `---|  |----`  /  ^  \    |  '  /  |  |__   |  |__|  | |  |  |  | |  \  /  | |  |__   
			  \_    _/   |  | |   __|  |  |     |  |  |  ||  | |   __|   \_    _/          |  |      /  /_\  \   |    <   |   __|  |   __   | |  |  |  | |  |\/|  | |   __|  
				|  |     |  | |  |____ |  `----.|  '--'  ||  | |  |        |  |            |  |     /  _____  \  |  .  \  |  |____ |  |  |  | |  `--'  | |  |  |  | |  |____ 
				|__|     |__| |_______||_______||_______/ |__| |__|        |__|            |__|    /__/     \__\ |__|\__\ |_______||__|  |__|  \______/  |__|  |__| |_______|
																																											 
										.___  ___.  _______  __    __   _______   __              .______   .______       __    __  .__   __.                                                            
										|   \/   | |   ____||  |  |  | |       \ |  |             |   _  \  |   _  \     |  |  |  | |  \ |  |                                                            
										|  \  /  | |  |__   |  |__|  | |  .--.  ||  |             |  |_)  | |  |_)  |    |  |  |  | |   \|  |                                                            
										|  |\/|  | |   __|  |   __   | |  |  |  ||  |             |   _  <  |      /     |  |  |  | |  . `  |                                                            
										|  |  |  | |  |____ |  |  |  | |  '--'  ||  |             |  |_)  | |  |\  \----.|  `--'  | |  |\   |                                                            
										|__|  |__| |_______||__|  |__| |_______/ |__|             |______/  | _| `._____| \______/  |__| \__|    
*/
	
	
    window.onload = function() {

		
			var w = window;
			
		
		// We take all the UI element from the page in order to use it later.
		 slider_size = document.getElementById("size");
		 choosed_size = document.getElementById("size").value;
		 text_size = document.getElementById("text-size");
		 changeColorButton = document.getElementById("changeBackground");
		 
		 // We set the background default color to black.
		 backgroundColor = "rgb(0,0,0)"; 
		 
		// Initialise an empty canvas and place it on the page with the window size.
		var canvas = document.getElementById("canvas");
		canvas.width = w.innerWidth;
		canvas.height = w.innerHeight;
		var context = canvas.getContext("2d");
		
		// Inital starting position
		var posX = 20, 
		posY = canvas.height / 2;
		
		// Set up object to contain projectiles and set some default values
		 projectiles = {},
		projectileIndex = 0,
		settings = {
			density: 1,
			projectileSize: 10,
			startingX: canvas.width / 2,
			startingY: canvas.height / 4,
			gravity: 0.5,	// The gravity coefficient
			maxLife: 300, // The duration the projectile will be displayed.
			groundLevel: canvas.height , // Position of the ground on the Y-axis.
			leftWall: 0, // Position of the left wall on the X-axis.
			rightWall: canvas.width // Position of the right wall on the X-axis.
		};
		
		// Generate some pseudo-random angles
		var seedsX = [];
		var seedsY = [];
		var maxAngles = 100;
		var currentAngle = 0;

		function seedAngles() {
			seedsX = [];
			seedsY = [];
			for (var i = 0; i < maxAngles; i++) {
				seedsX.push(Math.random() * 20 - 10);
				seedsY.push(Math.random() * 30 - 10);
			}
		}

		// Start off with 100 angles ready to go
		seedAngles();
		

		// Set up a function to create multiple projectiles
		function Projectile() {
			if (currentAngle !== maxAngles) {
				
				
				// Establish starting positions and velocities
				this.x = settings.startingX;
				this.y = settings.startingY;

				this.vx = seedsX[currentAngle];
				this.vy = seedsY[currentAngle];
				
				// Choosing a random color for the projectile
				this.color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")"; 
				
				/*
				* We get the current value of the size slider and 
				* we set the size of the projectile. The little trick is to increment 
				* and decrement the value we get from the slider because it's not seen 
				* as an integer at first. This forces the cast into an integer.
				*/				
				var sizeCreation = document.getElementById("size").value;
				sizeCreation++;
				sizeCreation--;
				this.size = sizeCreation;
				
				currentAngle++;

				// Add new projectile to the index
				// Object used as it's simpler to manage that an array
				projectileIndex ++;
				projectiles[projectileIndex] = this;
				this.id = projectileIndex;
				this.life = 0;
				this.maxLife = settings.maxLife;
			} else {
				// We did choose the 100 random angles we generated so we generate 100 others and we start again setting the currentAngle to 0.
				console.log('Generating more seed angles');
				seedAngles();
				currentAngle = 0;
			}
		}
		

		// Some prototype methods for the projectile's "draw" function
		Projectile.prototype.draw = function() {
			// We move the projectile for its next position
			this.x += this.vx;
			this.y += this.vy;
			var sizeLocal = this.size;
        
			// Give the projectile some bounce
			if ((this.y + sizeLocal) > settings.groundLevel) {
			  this.vy *= -0.6; // We slow down the ball on the Y axis and change the direction of the velocity vector to the opposite side since it touched the ground.
			  this.vx *= 0.75; // We slow down the ball on the X axis each time it touches the ground.
			  this.y = settings.groundLevel - sizeLocal; // We change the Y position of the projectile in order that it doesn't go through the ground.
			}

        // Determine whether to bounce the projectile off a wall
			if (this.x - (sizeLocal) <= settings.leftWall) {
				// Here, it touched the left wall so we'll orient the velocity vector X on the opposite direction and we set the position of the projectile in order that it doesn't go through the wall.
				this.vx *= -1;
				this.x = settings.leftWall + (sizeLocal);
			}

			if (this.x + (sizeLocal) >= settings.rightWall) {
				// Here, it touched the left wall so we'll orient the velocity vector X on the opposite direction and we set the position of the projectile in order that it doesn't go through the wall.
				this.vx *= -1;
				this.x = settings.rightWall - sizeLocal;
			}

			// Adjust for gravity
			this.vy += settings.gravity;

			// We increment the age of the projectile
			this.life++;

			// If the projectile is older than expected, we delete it
			if (this.life >= this.maxLife) {
				delete projectiles[this.id];
			}

			// Create the shapes
			
			context.beginPath();
			
			// We are going to create a random color RGB for the projectile
			var red = Math.floor(Math.random() * 255);
			var green = Math.floor(Math.random() * 255);
			var blue = Math.floor(Math.random() * 255);
			
			if(document.getElementById("checkbox2").checked){
				document.getElementById("text-multicolor").innerHTML = "Multicolor Mode <br> ON";
				context.fillStyle="rgb(" + red + "," + green + "," + blue + ")";
			}
			else{
				document.getElementById("text-multicolor").innerHTML = "Multicolor Mode <br> OFF";
				context.fillStyle= this.color;
			}
			
			
			// Draws a circle, representation of the projectile, with the good projectileSize just in the position of the projectile.
			context.arc(this.x, this.y, sizeLocal, 0, Math.PI*2, true); 
			context.closePath();
			context.fill();
		}
	  
		
        
		
		setInterval(function() {
			
			// We refresh the display on the UI for the Projectile Size
			choosed_size = document.getElementById("size").value;
			text_size.innerHTML = "Size: "+ choosed_size;
			
			// We choose the color we're going to use to fill the background.
			context.fillStyle = backgroundColor;
			
			if(!document.getElementById("checkbox").checked){
				document.getElementById("text-trace").innerHTML = "Trace Mode <br> OFF";
				//If the Trace Mode is OFF, we print back the background in order to cover the previous positions of the projectiles.
				context.fillRect(0, 0, canvas.width, canvas.height);
			}
			else{
				document.getElementById("text-trace").innerHTML = "Trace Mode <br> ON";
			}
			
			
			
			// Draw the projectiles
			for (var i in projectiles) {
			  projectiles[i].draw();
			}
			
		}, 30);
		
		changeColorButton.onclick = function(){
			if(document.getElementById("checkbox").checked){
				// We cannot change the background color while being in the Trace mode because it would erase the traces of every projectile.
				alert("Set Trace Mode to OFF in order to change the background color.");
			}
			else{
				backgroundColor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")"; 
			}
			
		}
		
		
		canvas.addEventListener('click', function(event) {
			// When the user click on the screen, we take the coordonates of the click and we use them as starting point for the new projectile that we're about to fire.
			var clickX = event.clientX;
			var clickY = event.clientY;
			settings.startingX = clickX;
			settings.startingY = clickY;
			new Projectile(); //instanciate a new projectile and add it to the projectiles array.
		}, false);
		

    };