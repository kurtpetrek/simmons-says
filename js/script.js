var playerMoves = [];
var compMoves = [];
var playerTurn = false;
var round = 0;

function rndmNum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function compTurn(){
  var place = 0;
  playerMoves = [];
  compMoves.push(rndmNum(1, 4));
  var moveIt = setInterval(function(){
    if(compMoves[place] === 1) {
      animateLeftArm();
    } else if(compMoves[place] === 2) {
      animateRightArm();
    } else if(compMoves[place] === 3) {
      animateLeftLeg();
    } else if(compMoves[place] === 4) {
      animateRightLeg();
    }
    place++;
    if(place >= compMoves.length){
      clearInterval(moveIt);
      document.querySelector('#coach').innerHTML = 'Your Turn!'
      playerTurn = true;
    }
  }, 1000);
}

document.querySelector('.image-container').addEventListener('click', function(e){
  if(playerTurn){
    if(e.target.classList.contains('left-arm')){
      animateLeftArm();
      playerMoves.push(1);
    }
    if(e.target.classList.contains('right-arm')){
      animateRightArm();
      playerMoves.push(2);
    }
    if(e.target.classList.contains('left-leg')){
      animateLeftLeg();
      playerMoves.push(3);
    }
    if(e.target.classList.contains('right-leg')){
      animateRightLeg();
      playerMoves.push(4);
    }
    if(playerMoves.length === compMoves.length){
      playerTurn = false;
      checkSequence();
    }
  }
},false);

function checkSequence() {
  for(let x = 0; x < compMoves.length; x++){
    if(compMoves[x] !== playerMoves[x]){
      document.querySelector('#coach').innerHTML = 'No Dice!';
      playerMoves = [];
      compMoves = [];
      var btn = document.createElement('p');
      btn.innerHTML = 'Retry?';
      btn.setAttribute('id', 'retry');
      btn.addEventListener('click', startOver, false);
      document.body.appendChild(btn);
      return false;
    }
  }
  document.querySelector('#coach').innerHTML = `Nice Work, here's some more!`;
  round++;
  document.querySelector('#score').innerHTML = round;
  setTimeout(compTurn, 500);
}

function startOver(){
  round = 0;
  document.querySelector('#score').innerHTML = round;
  document.body.removeChild(document.querySelector('#retry'));
  document.querySelector('#coach').innerHTML = 'My Turn!'
  compTurn();
}

function animateLeftArm(){
  document.querySelector('.left-arm').classList.add('move-left-arm');
  setTimeout(function(){
    document.querySelector('.left-arm').classList.remove('move-left-arm');
  }, 900);
}

function animateRightArm(){
  document.querySelector('.right-arm').classList.add('move-right-arm');
  setTimeout(function(){
    document.querySelector('.right-arm').classList.remove('move-right-arm');
  }, 900);
}

function animateLeftLeg(){
  document.querySelector('.left-leg').classList.add('move-left-leg');
  setTimeout(function(){
    document.querySelector('.left-leg').classList.remove('move-left-leg');
  }, 900);
}

function animateRightLeg(){
  document.querySelector('.right-leg').classList.add('move-right-leg');
  setTimeout(function(){
    document.querySelector('.right-leg').classList.remove('move-right-leg');
  }, 900);
}

compTurn();