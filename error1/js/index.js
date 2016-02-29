
window.addEventListener('resize', function() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

// Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
    canvas:canvas,
    options: {
      wireframes: false,
      background: '#ffffff'
    }
  }
});

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

// some settings
var offset =50,
    wallOptions = { 
      isStatic: true
    };

// add some invisible some walls to the world
World.add(engine.world, [
  // Bodies.rectangle(400, -offset, 1000 + 2 * offset, 50, wallOptions),
  Bodies.rectangle(580, 680 + offset, 1000 + 2 * offset, 50, wallOptions),
  // Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, wallOptions),
  // Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, wallOptions)
]);

//create a stack
var stack = Composites.stack(6, 3, 10, 2, 0, 0, function(x, y, column, row) {
  
 if (Math.random() > 0.5) {
    return Bodies.rectangle(x, y, 40, 100, {
      render: {   
         fillStyle: "#4285F4",
         strokeStyle: "#4285F4",
         lineWidth: 3,
        // sprite: {
        //   texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/box-grape-blue.png'
        // }
      }
    });
  } else if (Math.random() > 0.92) {
    return Bodies.rectangle(x, y, 40, 500,  {
      render: {         
         fillStyle: "#0F9D58",
         strokeStyle: "#0F9D58",
         lineWidth: 3,
                            // searchbar
        // sprite: {
        //   texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/box-grape-red.png'
        // }
      }
    });
  } else if  (Math.random() > 0.8) {
    return Bodies.circle(x, y, 34, {
      density: 0.0005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.06,
      render: {     
         fillStyle: '#DB4437',
         strokeStyle: '#DB4437',
         lineWidth: 3,
 
        // sprite: {
        //   texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-grape-green.png'
        // }
      }
    });
  } else {
    return Bodies.rectangle(x, y, 60, 30, {
      density: 0.0005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.06,
      render: {   
         fillStyle: '#F4B400',
         strokeStyle: '#F4B400',
         lineWidth: 3,
    
        // sprite: {
        //   texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-grape.png'
        // }
      }
    });
  }
});

// add the stack to the world
World.add(engine.world, stack);

// run the engine
Engine.run(engine);