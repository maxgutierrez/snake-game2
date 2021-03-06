// add pontuaçao e hanking
window.onload = function() {
  
  const bouttons = document.querySelectorAll('button')
  const score = document.querySelector('#score')

  const stage = document.querySelector('#stage')
  if (stage.getContext) {
    var ctx = stage.getContext('2d');
  }  
  document.addEventListener('keydown', keyPush)
  setInterval(game, 300); // taxa de att do game()

  const vel = 1
  var vx = 0 // vel x
  var vy = -1 // vel y
  var px = 10 // pos x
  var py = 10 // pos y
  var pr = 14 // radius
  var tp = 10 // tamanho peças (tabuleiro)
  var qp = 40 // quantidade de peças (tabuleiro)
  var ax = 10
  var ay = 19 // apple xy
  var trail = [] // = rastro
  tail = 5 // tamanho da cauda

  //direction
  var direction = up

  function game() {
    px += vx
    py += vy

    //relaçao com as paredes
    if (px < 0) {
      px = qp-1
    }
    if (px > qp-1) { // se cabeça estiver em uyma pos > que o tamanho do tabuleiro
      px = 0
    }
    if (py < 0) {
      py = qp-1
    }
    if (py > qp-1) {
      py = 0
    }

    ctx.fillStyle = 'black'// fundo
    ctx.fillRect(0,0, stage.width , stage.height)

    // ctx.fillStyle =  ' rgb(255, 255, 255)' // maçã 
    ctx.fillRect(ax*tp , ay*tp, tp, tp)
    var eat = new Image();
    eat.src = "/img/eat.png";
    eat.onload = function() {
      ctx.drawImage(eat, ax*tp-8 , ay*tp-6, 35, 35);
    }  


    for (var i = 0; i < trail.length; i++) {// iterar o rastro

      ctx.beginPath()
      ctx.arc(trail[i].x*tp+10 , trail[i].y*tp+10, pr, 0, 2*Math.PI)
      ctx.fillStyle = 'rgb(224, 148, 49)'
      ctx.fill()
      ctx.stroke()
      ctx.fillRect(trail[i].x*tp , trail[i].y*tp, tp, tp) 

      // var imagem = new Image();
      // imagem.src = "/img/imagem.png";
      // imagem.onload = function() {
      //   ctx.drawImage(imagem, trail[trail.length-1].x*tp-5 , trail[trail.length-1].y*tp-5, 30, 30);
      // }      
      
      // ctx.beginPath();// ROSTINHO DESENHADO
      // ctx.arc(trail[trail.length-1].x*tp+10 , trail[trail.length-1].y*tp+10, 10, 0, Math.PI * 2, true); // Círculo exterior
      // ctx.moveTo(trail[trail.length-1].x*tp+17 , trail[trail.length-1].y*tp+10);
      // ctx.arc(trail[trail.length-1].x*tp+10 , trail[trail.length-1].y*tp+10, 7, 0, Math.PI, false);  // Boca (sentido horário)
      // ctx.moveTo(trail[trail.length-1].x*tp+7 , trail[trail.length-1].y*tp+7);
      // ctx.arc(trail[trail.length-1].x*tp+6 , trail[trail.length-1].y*tp+7, 2, 0, Math.PI * 2, true);  // Olho esquerdo
      // ctx.moveTo(trail[trail.length-1].x*tp+16 , trail[trail.length-1].y*tp+7);      
      // ctx.arc(trail[trail.length-1].x*tp+15 , trail[trail.length-1].y*tp+7, 2, 0, Math.PI * 2, true);  // Olho direito
      // ctx.stroke()

      //MORREU
      if (trail[i].x == px && trail[i].y == py && tail != 5) {
        alert('POOOOXA!! VOCÊ MORREU KKK')
        vx = vy = 0
        px = py = 10
        tail = 5
      }      
    }

    trail.push( { x:px , y:py } )// CAMINHAR
    while (trail.length > tail) {
      trail.shift()
    }

    if (// comer
      ax==px && ay==py ||
      ax==px+1 && ay==py ||
      ax==px-1 && ay==py ||
      ax==px && ay==py+1 ||
      ax==px && ay==py-1 ||

      ax==px+2 && ay==py ||
      ax==px-2 && ay==py ||
      ax==px && ay==py+2 ||
      ax==px && ay==py-2
      ){ // se comer
      tail+= 2
      const x = y = Math.floor(Math.random()* qp)
      ax = x
      ay = y
      score.innerHTML = tail -5
    }
  }

  function keyPush(event) {
    switch (event.keyCode) {// →↓↑←
      case 37: //left
        if (direction != 'right'){
          vx = -vel
          vy = 0
          direction = 'left'
        }
        break;

      case 38: //up
        if (direction != 'down'){
          vx = 0
          vy = -vel,
          direction = 'up'
        }
        break;

      case 39: //right
        if (direction != 'left'){
          vx = vel
          vy = 0
          direction = 'right'
        }
        break;
        
      case 40: //down
        if (direction != 'up'){
          vx = 0
          vy = vel
          direction = 'down'
        }
        break;
    
      default:
        break;
    }
    switch (event.keyCode) {// WASD =================
      case 65: //left
        if (direction != 'right'){
          vx = -vel
          vy = 0
          direction = 'left'
        }
        break;
      case 87: //up
        if (direction != 'down'){
          vx = 0
          vy = -vel,
          direction = 'up'
        }
        break;
      case 68: //right
        if (direction != 'left'){
          vx = vel
          vy = 0
          direction = 'right'
        }
        break;
      case 83: //down
        if (direction != 'up'){
          vx = 0
          vy = vel
          direction = 'down'
        }
        break;
    }
  }

  bouttons.forEach(btn => {
    btn.addEventListener('click', ()=> {
      switch (btn.innerHTML) {// WASD
        case '←': //left
        if (direction != 'right'){
          vx = -vel
          vy = 0
          direction = 'left'
        }
          break;
          case '↑': //up
            if (direction != 'down'){
              vx = 0
              vy = -vel,
              direction = 'up'
            }
          break;
          case '→': //right
            if (direction != 'left'){
              vx = vel
              vy = 0
              direction = 'right'
            }
          break;
          case '↓': //down
            if (direction != 'up'){
              vx = 0
              vy = vel
              direction = 'down'
            }
          break;
      
        default:
          break;
      }
    })
  })










}