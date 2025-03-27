elements.dinos2M1Description = {
  color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
  name: 'Dinos2M1.js',
  category: "Mods",
  behavior: behaviors.SELFDELETE,
  tool:elements.dinos2M1Description = {
  color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
  name: 'Dinos2M1.js',
  category: "Mods",
  behavior: behaviors.SELFDELETE,
  tool: function(pixel) {},
  onSelect: function(pixel) {
    let info1stMod = `Dinos2M1.js is a mod made by Zizz7 that adds dinos to sandboxels`
    alert(info1stMod)
    return
  },
},

elements.raptor= {
    color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
    behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"XX|XX|XX"
	 ],
	    properties: {
			 //visual Genetics.
			 color1: "",
			 color2:"",
			 hight:1,
			 length:1,
			 pattern:2,
			 /*
			 1:skull
			 2:boots
			 3:back cresting
			 5:polka dots
			 */
			 patternV:1,
			 //physical genetics.
			 speed:1,
			 jump:1,
			 temper1:30,
			 temper2:10,
			 //movement
			tcool:0,
         dir: 1,
			frame:0,
			 yv:0
    },
	onPlace: function(pixel){
		checkUnlock("raptor")
		let color = Math.floor(Math.random(0,2)*7);
		pixel.color2 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		color = Math.floor(Math.random(0,2)*7);
		pixel.color1 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		// pixel.color1 = ["#d4d4d4","#8f8f8f","#616161",pixel.color2][color]		
		pixel.temper1 = Math.floor(Math.random(0,2)*20)+10;
		pixel.temper2 = Gtemper = Math.floor(Math.random(0,2)*20)+10;
		pixel.speed = Math.floor(Math.random(0,2)*2)+1;
		pixel.jump = Math.floor(Math.random(0,2)*3)+1;
		pixel.hight = Math.floor(Math.random(0,2)*2);
		pixel.length = Math.floor(Math.random(0,2)*2)+1;
		pixel.pattern = Math.floor(Math.random(0,2)*5)+1;
		pixel.patternV = Math.floor(Math.random(0,2)*2);
		},
	renderer: function(pixel,ctx) {
		      let rgb = hexToRGB(pixel.color1);
            let temp1= "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
				rgb = hexToRGB(pixel.color2);
            let temp2 = "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
		let colors = [pixel.color1,temp1,pixel.color2,temp2]; 
		//body
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -1:0),pixel.y-1+pixel.hight,2,4-pixel.hight)
		drawRect(ctx,colors[(pixel.pattern == 1? 2:0)],pixel.x+(pixel.dir == 1? -1:-1),pixel.y-1+pixel.hight,3,2)
		drawRect(ctx,colors[1],pixel.x,pixel.y+1+pixel.Ghight,1,2-pixel.hight)
		if(pixel.pattern == 3) drawRect(ctx,colors[3],pixel.x+(pixel.dir == 1? -1:-1),pixel.y-1+pixel.hight,3,1)
		if(pixel.pattern == 3) drawRect(ctx,colors[3],pixel.x+(pixel.dir == 1? -1:-1),pixel.y-1+pixel.hight+pixel.patternV+1,1,1)
		if(pixel.pattern == 4) drawRect(ctx,colors[3],pixel.x+(pixel.dir == 1? -1+pixel.patternV:0-pixel.patternV),pixel.y-1+pixel.hight,2,2)
		if(pixel.pattern == 4) drawRect(ctx,colors[3],pixel.x+(pixel.dir !== 1? pixel.patternV:0-pixel.patternV),pixel.y+1-pixel.hight,1,1)
		//legs
		drawRect(ctx,colors[(pixel.pattern == 2? 3:1)],pixel.x,pixel.y+3,1,1,(Math.floor(pixel.frame)!==1?1:0))
		drawRect(ctx,colors[(pixel.pattern == 2? 2:0)],pixel.x+(pixel.dir == 1? -1:1),pixel.y+3,1,1,(Math.floor(pixel.frame)!==3?1:0))
		if(pixel.pattern == 2) drawRect(ctx,colors[(pixel.patternV == 0? 3:2)],pixel.x+(pixel.dir == 1? -1:1)*pixel.patternV,pixel.y+2,1,1,(Math.floor(pixel.frame)!==3?1:0))
		// tail
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -(pixel.length+1):2),pixel.y+2,pixel.length,1)
		drawRect(ctx,"#1b1a24",pixel.x,pixel.y+pixel.hight,1,1)
},
			tick: function(pixel) {
				let bottom = 3
				let left = 0
				let right = (pixel.dir == 1? -1:1)
				pixel.tcool=pixel.tcool-1;
				pixel.yv=Math.max(pixel.yv-1,0);
				pixel.bob=Math.abs(Math.sin(pixelTicks/2.5));
				//move & turn
				if(pixel.temper2/100>=Math.random()){
					if(isSolid(pixel.x+left,pixel.y+(bottom+1)) || isSolid(pixel.x+right,pixel.y+(bottom+1))) pixel.yv=pixel.jump
					}
				if(pixel.frame!==0)pixel.frame=((pixel.frame+0.25)%4);
				if(Math.random()>0.5) {
					if(!isSolid(pixel.x+left+(pixel.dir*pixel.speed),pixel.y+(bottom)) && !isSolid(pixel.x+right+(pixel.dir*pixel.speed),pixel.y+(bottom))) tryMove(pixel,pixel.x+(pixel.dir*pixel.speed),pixel.y);
					if(pixel.frame==0)pixel.frame=0.25
					if(isSolid(pixel.x+left,pixel.y+(bottom-1)) || isSolid(pixel.x+right,pixel.y+(bottom-1))) pixel.yv=pixel.jump
				}
				if(Math.random()>0.8 && 1>pixel.tcool) {pixel.dir = pixel.dir*-1;pixel.tcool=pixel.temper1};
				//fall
				tryMove(pixel,pixel.x,pixel.y-pixel.yv);
				if(!isSolid(pixel.x+left,pixel.y+(bottom+1)) && !isSolid(pixel.x+right,pixel.y+(bottom+1))) tryMove(pixel,pixel.x,pixel.y+1);
},
	category: "ancient life",
	maxSize: 1,
    state: "solid",
	// breakInto:"raptor_skeleton",
	    // tempHigh: 1700,
    // stateHigh: "raptor_skeleton",
	    // tempLow: -200,
    // stateLow: "raptor_skeleton",
   cooldown: defaultCooldown,
	baby:"raptor"
},


// elements.t_rex= {
//     color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
//     behavior: [
// 		"XX|XX|XX",
// 		"XX|XX|XX",
// 		"XX|XX|XX"
// 	 ],
// 	    properties: {
// 			 //visual Genetics.
// 			 color1: "",
// 			 color2:"",
// 			 hight:1,
// 			 length:1,
// 			 pattern:4,
// 		 		/*
// 			 1:skull
// 			 2:boots
// 			 3:back cresting
// 			 4:polka dots
// 			 */
// 			 patternV:1,
// 			 patternM1:[],
// 			 patternM2:[],
// 			 //physical genetics.
// 			 speed:1,
// 			 jump:1,
// 			 temper1:30,
// 			 temper2:10,
// 			 //movement
// 			tcool:0,
//          dir: 1,
// 			frame:0,
// 			 yv:0,
// 			 jaw:0
//     },
// 	onPlace: function(pixel){
// 		let color = Math.floor(Math.random(0,2)*7);
// 		pixel.color2 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
// 		color = Math.floor(Math.random(0,2)*7);
// 		pixel.color1 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
// 		// pixel.color1 = ["#d4d4d4","#8f8f8f","#616161",pixel.color2][color]		
// 		pixel.temper1 = Math.floor(Math.random(0,2)*20)+10;
// 		pixel.temper2 = Gtemper = Math.floor(Math.random(0,2)*20)+10;
// 		pixel.speed = Math.floor(Math.random(0,2)*2)+1;
// 		pixel.jump = Math.floor(Math.random(0,2)*3)+1;
// 		pixel.hight = Math.floor(Math.random(0,2)*2);
// 		pixel.length = Math.floor(Math.random(0,2)*2)+1;
// 		// pixel.pattern = Math.floor(Math.random(0,2)*5)+1;
// 		pixel.patternV = Math.floor(Math.random(0,2)*3)-1;
// 		if(pixel.pattern === 3){
// 													    for (var i = 0; i < 4; i++) {
// 			pixel.patternM1.push(Math.floor(Math.random(0,2)*3)+1)
// 			}
// 			}
// 				if(pixel.pattern === 4){
// 					let a = 0;
// 					let b = 0;
// // 													    for (var i = 0; i < 4; i++) {
// // a = Math.floor(Math.random(0,2)*2)+1
// // b = Math.floor(Math.random(0,2)*2)-1
// // pixel.patternM1.push([
// // 	b,a,i
// // 	])
// // 			}
// }
// 		},
// 	renderer: function(pixel,ctx) {
// 		      let rgb = hexToRGB(pixel.color1);
//             let temp1= "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
// 				rgb = hexToRGB(pixel.color2);
//             let temp2 = "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
// 		let colors = [pixel.color1,temp1,pixel.color2,temp2]; 
// 		//body
// 		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -2:-1),pixel.y+2,4,2)
// 		drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? -1:-2),pixel.y+1,4,1)
// 		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? 1:-1),pixel.y+2,1,2)
// 		//jaw
// 				drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? 1:-2),pixel.y-1-Math.floor(pixel.jaw*3),2,2)
// 				drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? 0:-1),pixel.y-1-Math.floor(pixel.jaw*2),2,2)
// 				drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? -1:0),pixel.y-1-Math.floor(pixel.jaw*1),2,2)
// 		//legs
// 		drawRect(ctx,colors[(pixel.pattern ==2? 3:1)],pixel.x+(pixel.dir == 1? 1:-1),pixel.y+4,1,1,(Math.floor(pixel.frame)!==1?1:0))
// 		drawRect(ctx,colors[(pixel.pattern ==2? 2:0)],pixel.x+(pixel.dir == 1? -1:1),pixel.y+4,1,1,(Math.floor(pixel.frame)!==3?1:0))
// 		//tail
// 		if(pixel.pattern==2) drawRect(ctx,colors[2],pixel.x+pixel.patternV*pixel.dir,pixel.y+2,1,1)
// 		drawRect(ctx,colors[(pixel.pattern ==2? 2:0)],pixel.x+(pixel.dir == 1? -3:-1),pixel.y+3,5,1)
// 				if(pixel.pattern==3) for (var i = 0; i < pixel.patternM1.length; i++) {
// 			drawRect(ctx,colors[2],pixel.x+(pixel.dir == 1? (Math.min(i-2,0)):(Math.max(3-i,1)-pixel.patternM1[i][0]))-pixel.dir,pixel.y+3-i,pixel.patternM1[i][0],1)
// 							 }
// 						if(pixel.pattern==4) for (var i = 0; i < pixel.patternM1.length; i++) {
// 			drawRect(ctx,colors[2],pixel.x+(pixel.dir == 1? (pixel.patternM1[i][0]-pixel.patternM1[i][1]):(1-pixel.patternM1[i][0]))-pixel.dir,pixel.y+2-pixel.patternM1[i][2],pixel.patternM1[i][1],pixel.patternM1[i][1])
// 							 }
// 		drawRect(ctx,"#1b1a24",pixel.x,pixel.y-Math.floor(pixel.jaw*2),1,1)
// },
// 			tick: function(pixel) {
// 				let bottom = 4
// 				let left = (pixel.dir == 1? 1:-1)
// 				let right = (pixel.dir == 1? -1:1)
// 				pixel.tcool=pixel.tcool-1;
// 				pixel.yv=Math.max(pixel.yv-1,0);
// 				pixel.jaw=Math.abs(Math.sin(pixelTicks/2.5));
// 					//move & turn
// 				if(pixel.temper2/100>=Math.random()){
// 					if(isSolid(pixel.x+left,pixel.y+(bottom+1)) || isSolid(pixel.x+right,pixel.y+(bottom+1))) pixel.yv=pixel.jump
// 					}
// 				if(pixel.frame!==0)pixel.frame=((pixel.frame+0.25)%4);
// 				if(Math.random()>0.5) {
// 					if(!isSolid(pixel.x+left+(pixel.dir*pixel.speed),pixel.y+(bottom)) && !isSolid(pixel.x+right+(pixel.dir*pixel.speed),pixel.y+(bottom))) tryMove(pixel,pixel.x+(pixel.dir*pixel.speed),pixel.y);
// 					if(pixel.frame==0)pixel.frame=0.25
// 					if(isSolid(pixel.x+left,pixel.y+(bottom-1)) || isSolid(pixel.x+right,pixel.y+(bottom-1))) pixel.yv=pixel.jump
// 				}
// 				if(Math.random()>0.8 && 1>pixel.tcool) {pixel.dir = pixel.dir*-1;pixel.tcool=pixel.temper1};
// 				//fall
// 				tryMove(pixel,pixel.x,pixel.y-pixel.yv);
// 				if(!isSolid(pixel.x+left,pixel.y+(bottom+1)) && !isSolid(pixel.x+right,pixel.y+(bottom+1))) tryMove(pixel,pixel.x,pixel.y+1);
// },
// 	category: "ancient life",
// 	maxSize: 1,
//     state: "solid",
// 	// breakInto:"raptor_skeleton",
// 	    // tempHigh: 1700,
//     // stateHigh: "raptor_skeleton",
// 	    // tempLow: -200,
//     // stateLow: "raptor_skeleton",
//    cooldown: defaultCooldown,
// 	baby:"t_rex"
// };


elements.bronto= {
    color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
    behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"XX|XX|XX"
	 ],
	    properties: {
			 //visual Genetics.
			 color1: "",
			 color2:"",
			 hight:1,
			 length:1,
			 pattern:5,
			 /*
			 1:skull
			 2:boots
			 3:back cresting
			 4stripes
			 5:polka dots
			 */
			 patternV:1,
			 //physical genetics.
			 speed:1,
			 jump:1,
			 temper1:30,
			 temper2:10,
			 //movement
			tcool:0,
         dir: 1,
			frame:0,
			 yv:0,
			 bob:0
    },
	onPlace: function(pixel){
		let color = Math.floor(Math.random(0,2)*7);
		pixel.color2 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		color = Math.floor(Math.random(0,2)*7);
		pixel.color1 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		// pixel.color1 = ["#d4d4d4","#8f8f8f","#616161",pixel.color2][color]		
		pixel.temper1 = Math.floor(Math.random(0,2)*20)+10;
		pixel.temper2 = Gtemper = Math.floor(Math.random(0,2)*20)+10;
		pixel.speed = Math.floor(Math.random(0,2)*2)+1;
		pixel.jump = Math.floor(Math.random(0,2)*1)+1;
		pixel.hight = Math.floor(Math.random(0,2)*2);
		pixel.length = Math.floor(Math.random(0,2)*2)+1;
		pixel.pattern = Math.floor(Math.random(0,2)*5)+1;
		pixel.patternV = Math.floor(Math.random(0,2)*2);
		},
	renderer: function(pixel,ctx) {
		      let rgb = hexToRGB(pixel.color1);
            let temp1= "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
				rgb = hexToRGB(pixel.color2);
            let temp2 = "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
		let colors = [pixel.color1,temp1,pixel.color2,temp2]; 
		//body
		drawRect(ctx,colors[0],pixel.x-2,pixel.y+3,5,2)
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? 0:-3),pixel.y-1-Math.floor(pixel.length*2)+pixel.hight,4,3)
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? 0:-2),pixel.y+2-Math.floor(pixel.length*2)+pixel.hight,3,3+Math.floor(pixel.length*2-pixel.hight))
		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? 2:-2),pixel.y+2-Math.floor(pixel.length*2)+pixel.hight,1,3+Math.floor(pixel.length*2-pixel.hight))
		//legs
		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? -1:-2),pixel.y+5,1,1,(Math.floor(pixel.frame)!==1?1:0))
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -2:-1),pixel.y+5,1,1,(Math.floor(pixel.frame)!==3?1:0))
		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? 2:1),pixel.y+5,1,1,(Math.floor(pixel.frame)!==1?1:0))
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? 1:2),pixel.y+5,1,1,(Math.floor(pixel.frame)!==3?1:0))
		//tail
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -3:3),pixel.y+4,1,1)
		drawRect(ctx,"#1b1a24",pixel.x+(pixel.dir == 1? 1:-1),pixel.y-Math.floor(pixel.length*2)+pixel.hight,1,1)
},
			tick: function(pixel) {
				let bottom = 5
				let left = (pixel.dir == 1? 2:-2)
				let right = (pixel.dir == 1? -2:2)
				pixel.tcool=pixel.tcool-1;
				pixel.yv=Math.max(pixel.yv-1,0);
				pixel.bob=Math.abs(Math.sin(pixelTicks/2.5));
				//move & turn
				if(pixel.temper2/100>=Math.random()){
					if(isSolid(pixel.x+left,pixel.y+(bottom+1)) || isSolid(pixel.x+right,pixel.y+(bottom+1))) pixel.yv=pixel.jump
					}
				if(pixel.frame!==0)pixel.frame=((pixel.frame+0.25)%4);
				if(Math.random()>0.5) {
					if(!isSolid(pixel.x+left+(pixel.dir*pixel.speed),pixel.y+(bottom)) && !isSolid(pixel.x+right+(pixel.dir*pixel.speed),pixel.y+(bottom))) tryMove(pixel,pixel.x+(pixel.dir*pixel.speed),pixel.y);
					if(pixel.frame==0)pixel.frame=0.25
					if(isSolid(pixel.x+left,pixel.y+(bottom-1)) || isSolid(pixel.x+right,pixel.y+(bottom-1))) pixel.yv=pixel.jump
				}
				if(Math.random()>0.8 && 1>pixel.tcool) {pixel.dir = pixel.dir*-1;pixel.tcool=pixel.temper1};
				//fall
				tryMove(pixel,pixel.x,pixel.y-pixel.yv);
				if(!isSolid(pixel.x+left,pixel.y+(bottom+1)) && !isSolid(pixel.x+right,pixel.y+(bottom+1))) tryMove(pixel,pixel.x,pixel.y+1);
},
	category: "ancient life",
	maxSize: 1,
    state: "solid",
	// breakInto:"raptor_skeleton",
	    // tempHigh: 1700,
    // stateHigh: "raptor_skeleton",
	    // tempLow: -200,
    // stateLow: "raptor_skeleton",
   cooldown: defaultCooldown,
	baby:"bronto"
};

        function drawRect(ctx,color,x,y,width,hight,opacity=1) {
            if (color) { ctx.fillStyle = color; }
            if (ctx.globalAlpha !== opacity) { ctx.globalAlpha = opacity; }
            ctx.fillRect(canvasCoord(x), canvasCoord(y), pixelSize*width, pixelSize*hight);
        }

        function isSolid(x, y, ignoreBounds=false) {
            if (outOfBounds(x,y)) {
                return true;
            }
			  if(pixelMap[x][y] === undefined) return false;
			  if(elements[pixelMap[x][y].element].state === "solid") return  true;
			  return false
        }

 function(pixel) {},
  onSelect: function(pixel) {
    let info1stMod = `Dinos2M1.js is a mod made by Zizz7 that adds dinos to sandboxels`
    alert(info1stMod)
    return
  },
};

elements.raptor= {
    color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
    behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"XX|XX|XX"
	 ],
	    properties: {
			 //visual Genetics.
			 color1: "",
			 color2:"",
			 hight:1,
			 length:1,
			 pattern:2,
			 /*
			 1:skull
			 2:boots
			 3:back cresting
			 5:polka dots
			 */
			 patternV:1,
			 //physical genetics.
			 speed:1,
			 jump:1,
			 temper1:30,
			 temper2:10,
			 //movement
			tcool:0,
         dir: 1,
			frame:0,
			 yv:0
    },
	onPlace: function(pixel){
		checkUnlock("raptor")
		let color = Math.floor(Math.random(0,2)*7);
		pixel.color2 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		color = Math.floor(Math.random(0,2)*7);
		pixel.color1 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		// pixel.color1 = ["#d4d4d4","#8f8f8f","#616161",pixel.color2][color]		
		pixel.temper1 = Math.floor(Math.random(0,2)*20)+10;
		pixel.temper2 = Gtemper = Math.floor(Math.random(0,2)*20)+10;
		pixel.speed = Math.floor(Math.random(0,2)*2)+1;
		pixel.jump = Math.floor(Math.random(0,2)*3)+1;
		pixel.hight = Math.floor(Math.random(0,2)*2);
		pixel.length = Math.floor(Math.random(0,2)*2)+1;
		pixel.pattern = Math.floor(Math.random(0,2)*5)+1;
		pixel.patternV = Math.floor(Math.random(0,2)*2);
		},
	renderer: function(pixel,ctx) {
		      let rgb = hexToRGB(pixel.color1);
            let temp1= "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
				rgb = hexToRGB(pixel.color2);
            let temp2 = "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
		let colors = [pixel.color1,temp1,pixel.color2,temp2]; 
		//body
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -1:0),pixel.y-1+pixel.hight,2,4-pixel.hight)
		drawRect(ctx,colors[(pixel.pattern == 1? 2:0)],pixel.x+(pixel.dir == 1? -1:-1),pixel.y-1+pixel.hight,3,2)
		drawRect(ctx,colors[1],pixel.x,pixel.y+1+pixel.Ghight,1,2-pixel.hight)
		if(pixel.pattern == 3) drawRect(ctx,colors[3],pixel.x+(pixel.dir == 1? -1:-1),pixel.y-1+pixel.hight,3,1)
		if(pixel.pattern == 3) drawRect(ctx,colors[3],pixel.x+(pixel.dir == 1? -1:-1),pixel.y-1+pixel.hight+pixel.patternV+1,1,1)
		if(pixel.pattern == 4) drawRect(ctx,colors[3],pixel.x+(pixel.dir == 1? -1+pixel.patternV:0-pixel.patternV),pixel.y-1+pixel.hight,2,2)
		if(pixel.pattern == 4) drawRect(ctx,colors[3],pixel.x+(pixel.dir !== 1? pixel.patternV:0-pixel.patternV),pixel.y+1-pixel.hight,1,1)
		//legs
		drawRect(ctx,colors[(pixel.pattern == 2? 3:1)],pixel.x,pixel.y+3,1,1,(Math.floor(pixel.frame)!==1?1:0))
		drawRect(ctx,colors[(pixel.pattern == 2? 2:0)],pixel.x+(pixel.dir == 1? -1:1),pixel.y+3,1,1,(Math.floor(pixel.frame)!==3?1:0))
		if(pixel.pattern == 2) drawRect(ctx,colors[(pixel.patternV == 0? 3:2)],pixel.x+(pixel.dir == 1? -1:1)*pixel.patternV,pixel.y+2,1,1,(Math.floor(pixel.frame)!==3?1:0))
		// tail
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -(pixel.length+1):2),pixel.y+2,pixel.length,1)
		drawRect(ctx,"#1b1a24",pixel.x,pixel.y+pixel.hight,1,1)
},
			tick: function(pixel) {
				let bottom = 3
				let left = 0
				let right = (pixel.dir == 1? -1:1)
				pixel.tcool=pixel.tcool-1;
				pixel.yv=Math.max(pixel.yv-1,0);
				pixel.bob=Math.abs(Math.sin(pixelTicks/2.5));
				//move & turn
				if(pixel.temper2/100>=Math.random()){
					if(isSolid(pixel.x+left,pixel.y+(bottom+1)) || isSolid(pixel.x+right,pixel.y+(bottom+1))) pixel.yv=pixel.jump
					}
				if(pixel.frame!==0)pixel.frame=((pixel.frame+0.25)%4);
				if(Math.random()>0.5) {
					if(!isSolid(pixel.x+left+(pixel.dir*pixel.speed),pixel.y+(bottom)) && !isSolid(pixel.x+right+(pixel.dir*pixel.speed),pixel.y+(bottom))) tryMove(pixel,pixel.x+(pixel.dir*pixel.speed),pixel.y);
					if(pixel.frame==0)pixel.frame=0.25
					if(isSolid(pixel.x+left,pixel.y+(bottom-1)) || isSolid(pixel.x+right,pixel.y+(bottom-1))) pixel.yv=pixel.jump
				}
				if(Math.random()>0.8 && 1>pixel.tcool) {pixel.dir = pixel.dir*-1;pixel.tcool=pixel.temper1};
				//fall
				tryMove(pixel,pixel.x,pixel.y-pixel.yv);
				if(!isSolid(pixel.x+left,pixel.y+(bottom+1)) && !isSolid(pixel.x+right,pixel.y+(bottom+1))) tryMove(pixel,pixel.x,pixel.y+1);
},
	category: "ancient life",
	maxSize: 1,
    state: "solid",
	// breakInto:"raptor_skeleton",
	    // tempHigh: 1700,
    // stateHigh: "raptor_skeleton",
	    // tempLow: -200,
    // stateLow: "raptor_skeleton",
   cooldown: defaultCooldown,
	baby:"raptor"
};


elements.t_rex= {
    color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
    behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"XX|XX|XX"
	 ],
	    properties: {
			 //visual Genetics.
			 color1: "",
			 color2:"",
			 hight:1,
			 length:1,
			 pattern:4,
		 		/*
			 1:skull
			 2:boots
			 3:back cresting
			 4:polka dots
			 */
			 patternV:1,
			 patternM1:[],
			 patternM2:[],
			 //physical genetics.
			 speed:1,
			 jump:1,
			 temper1:30,
			 temper2:10,
			 //movement
			tcool:0,
         dir: 1,
			frame:0,
			 yv:0,
			 jaw:0
    },
	onPlace: function(pixel){
		let color = Math.floor(Math.random(0,2)*7);
		pixel.color2 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		color = Math.floor(Math.random(0,2)*7);
		pixel.color1 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		// pixel.color1 = ["#d4d4d4","#8f8f8f","#616161",pixel.color2][color]		
		pixel.temper1 = Math.floor(Math.random(0,2)*20)+10;
		pixel.temper2 = Gtemper = Math.floor(Math.random(0,2)*20)+10;
		pixel.speed = Math.floor(Math.random(0,2)*2)+1;
		pixel.jump = Math.floor(Math.random(0,2)*3)+1;
		pixel.hight = Math.floor(Math.random(0,2)*2);
		pixel.length = Math.floor(Math.random(0,2)*2)+1;
		// pixel.pattern = Math.floor(Math.random(0,2)*5)+1;
		pixel.patternV = Math.floor(Math.random(0,2)*3)-1;
		if(pixel.pattern === 3){
													    for (var i = 0; i < 4; i++) {
			pixel.patternM1.push(Math.floor(Math.random(0,2)*3)+1)
			}
			}
				if(pixel.pattern === 4){
pixel.patternM1.push([
	-1,
	])
			}
		},
	renderer: function(pixel,ctx) {
		      let rgb = hexToRGB(pixel.color1);
            let temp1= "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
				rgb = hexToRGB(pixel.color2);
            let temp2 = "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
		let colors = [pixel.color1,temp1,pixel.color2,temp2]; 
		//body
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -2:-1),pixel.y+2,4,2)
		drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? -1:-2),pixel.y+1,4,1)
		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? 1:-1),pixel.y+2,1,2)
		//jaw
				drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? 1:-2),pixel.y-1-Math.floor(pixel.jaw*3),2,2)
				drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? 0:-1),pixel.y-1-Math.floor(pixel.jaw*2),2,2)
				drawRect(ctx,colors[(pixel.pattern ==1? 2:0)],pixel.x+(pixel.dir == 1? -1:0),pixel.y-1-Math.floor(pixel.jaw*1),2,2)
		//legs
		drawRect(ctx,colors[(pixel.pattern ==2? 3:1)],pixel.x+(pixel.dir == 1? 1:-1),pixel.y+4,1,1,(Math.floor(pixel.frame)!==1?1:0))
		drawRect(ctx,colors[(pixel.pattern ==2? 2:0)],pixel.x+(pixel.dir == 1? -1:1),pixel.y+4,1,1,(Math.floor(pixel.frame)!==3?1:0))
		//tail
		if(pixel.pattern==2) drawRect(ctx,colors[2],pixel.x+pixel.patternV*pixel.dir,pixel.y+2,1,1)
		drawRect(ctx,colors[(pixel.pattern ==2? 2:0)],pixel.x+(pixel.dir == 1? -3:-1),pixel.y+3,5,1)
				if(pixel.pattern==3) for (var i = 0; i < pixel.patternM1.length; i++) {
			drawRect(ctx,colors[2],pixel.x+(pixel.dir == 1? (Math.min(i-2,0)):(Math.max(3-i,1)-pixel.patternM1[i][0]))-pixel.dir,pixel.y+3-i,pixel.patternM1[i][0],1)
							 }
						if(pixel.pattern==4) for (var i = 0; i < pixel.patternM1.length; i++) {
			drawRect(ctx,colors[2],pixel.x+(pixel.dir == 1? (pixel.patternM1[i][0]-pixel.patternM1[i][1]):(1-pixel.patternM1[i][0]))-pixel.dir,pixel.y+2-pixel.patternM1[i][2],pixel.patternM1[i][1],pixel.patternM1[i][1])
							 }
		drawRect(ctx,"#1b1a24",pixel.x,pixel.y-Math.floor(pixel.jaw*2),1,1)
},
			tick: function(pixel) {
				let bottom = 4
				let left = (pixel.dir == 1? 1:-1)
				let right = (pixel.dir == 1? -1:1)
				pixel.tcool=pixel.tcool-1;
				pixel.yv=Math.max(pixel.yv-1,0);
				pixel.jaw=Math.abs(Math.sin(pixelTicks/2.5));
					//move & turn
				if(pixel.temper2/100>=Math.random()){
					if(isSolid(pixel.x+left,pixel.y+(bottom+1)) || isSolid(pixel.x+right,pixel.y+(bottom+1))) pixel.yv=pixel.jump
					}
				if(pixel.frame!==0)pixel.frame=((pixel.frame+0.25)%4);
				if(Math.random()>0.5) {
					if(!isSolid(pixel.x+left+(pixel.dir*pixel.speed),pixel.y+(bottom)) && !isSolid(pixel.x+right+(pixel.dir*pixel.speed),pixel.y+(bottom))) tryMove(pixel,pixel.x+(pixel.dir*pixel.speed),pixel.y);
					if(pixel.frame==0)pixel.frame=0.25
					if(isSolid(pixel.x+left,pixel.y+(bottom-1)) || isSolid(pixel.x+right,pixel.y+(bottom-1))) pixel.yv=pixel.jump
				}
				if(Math.random()>0.8 && 1>pixel.tcool) {pixel.dir = pixel.dir*-1;pixel.tcool=pixel.temper1};
				//fall
				tryMove(pixel,pixel.x,pixel.y-pixel.yv);
				if(!isSolid(pixel.x+left,pixel.y+(bottom+1)) && !isSolid(pixel.x+right,pixel.y+(bottom+1))) tryMove(pixel,pixel.x,pixel.y+1);
},
	category: "ancient life",
	maxSize: 1,
    state: "solid",
	// breakInto:"raptor_skeleton",
	    // tempHigh: 1700,
    // stateHigh: "raptor_skeleton",
	    // tempLow: -200,
    // stateLow: "raptor_skeleton",
   cooldown: defaultCooldown,
	baby:"t_rex"
};


elements.bronto= {
    color: ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"],
    behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"XX|XX|XX"
	 ],
	    properties: {
			 //visual Genetics.
			 color1: "",
			 color2:"",
			 hight:1,
			 length:1,
			 pattern:5,
			 /*
			 1:skull
			 2:boots
			 3:back cresting
			 4stripes
			 5:polka dots
			 */
			 patternV:1,
			 //physical genetics.
			 speed:1,
			 jump:1,
			 temper1:30,
			 temper2:10,
			 //movement
			tcool:0,
         dir: 1,
			frame:0,
			 yv:0,
			 bob:0
    },
	onPlace: function(pixel){
		let color = Math.floor(Math.random(0,2)*7);
		pixel.color2 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		color = Math.floor(Math.random(0,2)*7);
		pixel.color1 = ["#ea4335","#ff6d01","#fbbc04","#34a853","#46bdc6","#4285f4","#a835ea"][color]		
		// pixel.color1 = ["#d4d4d4","#8f8f8f","#616161",pixel.color2][color]		
		pixel.temper1 = Math.floor(Math.random(0,2)*20)+10;
		pixel.temper2 = Gtemper = Math.floor(Math.random(0,2)*20)+10;
		pixel.speed = Math.floor(Math.random(0,2)*2)+1;
		pixel.jump = Math.floor(Math.random(0,2)*1)+1;
		pixel.hight = Math.floor(Math.random(0,2)*2);
		pixel.length = Math.floor(Math.random(0,2)*2)+1;
		pixel.pattern = Math.floor(Math.random(0,2)*5)+1;
		pixel.patternV = Math.floor(Math.random(0,2)*2);
		},
	renderer: function(pixel,ctx) {
		      let rgb = hexToRGB(pixel.color1);
            let temp1= "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
				rgb = hexToRGB(pixel.color2);
            let temp2 = "rgb("+(rgb.r-20)+","+(rgb.g-20)+","+(rgb.b-20)+")";
		let colors = [pixel.color1,temp1,pixel.color2,temp2]; 
		//body
		drawRect(ctx,colors[0],pixel.x-2,pixel.y+3,5,2)
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? 0:-3),pixel.y-1-Math.floor(pixel.length*2)+pixel.hight,4,3)
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? 0:-2),pixel.y+2-Math.floor(pixel.length*2)+pixel.hight,3,3+Math.floor(pixel.length*2-pixel.hight))
		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? 2:-2),pixel.y+2-Math.floor(pixel.length*2)+pixel.hight,1,3+Math.floor(pixel.length*2-pixel.hight))
		//legs
		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? -1:-2),pixel.y+5,1,1,(Math.floor(pixel.frame)!==1?1:0))
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -2:-1),pixel.y+5,1,1,(Math.floor(pixel.frame)!==3?1:0))
		drawRect(ctx,colors[1],pixel.x+(pixel.dir == 1? 2:1),pixel.y+5,1,1,(Math.floor(pixel.frame)!==1?1:0))
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? 1:2),pixel.y+5,1,1,(Math.floor(pixel.frame)!==3?1:0))
		//tail
		drawRect(ctx,colors[0],pixel.x+(pixel.dir == 1? -3:3),pixel.y+4,1,1)
		drawRect(ctx,"#1b1a24",pixel.x+(pixel.dir == 1? 1:-1),pixel.y-Math.floor(pixel.length*2)+pixel.hight,1,1)
},
			tick: function(pixel) {
				let bottom = 5
				let left = (pixel.dir == 1? 2:-2)
				let right = (pixel.dir == 1? -2:2)
				pixel.tcool=pixel.tcool-1;
				pixel.yv=Math.max(pixel.yv-1,0);
				pixel.bob=Math.abs(Math.sin(pixelTicks/2.5));
				//move & turn
				if(pixel.temper2/100>=Math.random()){
					if(isSolid(pixel.x+left,pixel.y+(bottom+1)) || isSolid(pixel.x+right,pixel.y+(bottom+1))) pixel.yv=pixel.jump
					}
				if(pixel.frame!==0)pixel.frame=((pixel.frame+0.25)%4);
				if(Math.random()>0.5) {
					if(!isSolid(pixel.x+left+(pixel.dir*pixel.speed),pixel.y+(bottom)) && !isSolid(pixel.x+right+(pixel.dir*pixel.speed),pixel.y+(bottom))) tryMove(pixel,pixel.x+(pixel.dir*pixel.speed),pixel.y);
					if(pixel.frame==0)pixel.frame=0.25
					if(isSolid(pixel.x+left,pixel.y+(bottom-1)) || isSolid(pixel.x+right,pixel.y+(bottom-1))) pixel.yv=pixel.jump
				}
				if(Math.random()>0.8 && 1>pixel.tcool) {pixel.dir = pixel.dir*-1;pixel.tcool=pixel.temper1};
				//fall
				tryMove(pixel,pixel.x,pixel.y-pixel.yv);
				if(!isSolid(pixel.x+left,pixel.y+(bottom+1)) && !isSolid(pixel.x+right,pixel.y+(bottom+1))) tryMove(pixel,pixel.x,pixel.y+1);
},
	category: "ancient life",
	maxSize: 1,
    state: "solid",
	// breakInto:"raptor_skeleton",
	    // tempHigh: 1700,
    // stateHigh: "raptor_skeleton",
	    // tempLow: -200,
    // stateLow: "raptor_skeleton",
   cooldown: defaultCooldown,
	baby:"bronto"
};

        function drawRect(ctx,color,x,y,width,hight,opacity=1) {
            if (color) { ctx.fillStyle = color; }
            if (ctx.globalAlpha !== opacity) { ctx.globalAlpha = opacity; }
            ctx.fillRect(canvasCoord(x), canvasCoord(y), pixelSize*width, pixelSize*hight);
        }

        function isSolid(x, y, ignoreBounds=false) {
            if (outOfBounds(x,y)) {
                return true;
            }
			  if(pixelMap[x][y] === undefined) return false;
			  if(elements[pixelMap[x][y].element].state === "solid") return  true;
			  return false
        }


