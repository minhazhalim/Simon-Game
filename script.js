const turn = document.querySelector('#turn');
const topleft = document.querySelector('#topleft');
const topright = document.querySelector('#topright');
const bottomleft = document.querySelector('#bottomleft');
const bottomright = document.querySelector('#bottomright');
const strict = document.querySelector('#strict');
const on = document.querySelector('#on');
const start = document.querySelector('#start');
let order = [];
let playerOrder = [];
let strictMode = false;
let onMode = false;
let noise = true;
let flash;
let turnMode;
let good;
let computerTurn;
let intervalID;
let winner;
function play(){
     winner = false;
     order = [];
     playerOrder = [];
     flash = 0;
     intervalID = 0;
     turnMode = 1;
     turn.innerHTML = 1;
     good = true;
     for(var i = 0;i < 20;i++){
          order.push(Math.floor(Math.random() * 4) + 1);
     }
     computerTurn = true;
     intervalID = setInterval(gameTurn,800);
}
function one(){
     if(noise){
          let clip1 = document.getElementById('clip1');
          clip1.play();
     }
     noise = true;
     topleft.style.backgroundColor = 'lightgreen';
}
function two(){
     if(noise){
          let clip2 = document.getElementById('clip2');
          clip2.play();
     }
     noise = true;
     topright.style.backgroundColor = 'tomato';
}
function three(){
     if(noise){
          let clip3 = document.getElementById('clip3');
          clip3.play();
     }
     noise = true;
     bottomleft.style.backgroundColor = 'yellow';
}
function four(){
     if(noise){
          let clip4 = document.getElementById('clip4');
          clip4.play();
     }
     noise = true;
     bottomright.style.backgroundColor = 'lightskyblue';
}
function clearColor(){
     topleft.style.backgroundColor = 'darkgreen';
     topright.style.backgroundColor = 'darkred';
     bottomleft.style.backgroundColor = 'goldenrod';
     bottomright.style.backgroundColor = 'darkblue';
}
function flashColor(){
     topleft.style.backgroundColor = 'darkgreen';
     topright.style.backgroundColor = 'tomato';
     bottomleft.style.backgroundColor = 'yellow';
     bottomright.style.backgroundColor = 'lightskyblue';
}
function gameTurn(){
     onMode = false;
     if(flash == turnMode){
          clearInterval(intervalID);
          computerTurn = false;
          clearColor();
          onMode = true;
     }
     if(computerTurn){
          clearColor();
          setTimeout(() => {
               if(order[flash] == 1) one();
               if(order[flash] == 2) two();
               if(order[flash] == 3) three();
               if(order[flash] == 4) four();
               flash++;
          },200);
     }
}
function winGame(){
     flashColor();
     turn.innerHTML = 'WINNER!';
     onMode = false;
     winner = true;
}
function check(){
     if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]){
          good = false;
     }
     if(playerOrder.length == 3 && good){
          winGame();
     }
     if(good == false){
          flashColor();
          turn.innerHTML = 'NO!';
          setTimeout(() => {
               turn.innerHTML = turnMode;
               clearColor();
               if(strictMode){
                    play();
               }else{
                    computerTurn = true;
                    flash = 0;
                    playerOrder = [];
                    good = true;
                    intervalID = setInterval(gameTurn,800);
               }
          },800);
          noise = false;
     }
     if(turnMode == playerOrder.length && good && !winner){
          turnMode++;
          playerOrder = [];
          computerTurn = true;
          flash = 0;
          turn.innerHTML = turnMode;
          intervalID = setInterval(gameTurn,800);
     }
}
strict.addEventListener('click',(event) => {
     if(strict.checked == true){
          strictMode = true;
     }else{
          strictMode = false;
     }
});
on.addEventListener('click',(event) => {
     if(on.checked == true){
          onMode = true;
          turn.innerHTML = '-';
     }else{
          onMode = false;
          turn.innerHTML = '';
          clearColor();
          clearInterval(intervalID);
     }
});
start.addEventListener('click',(event) => {
     if(onMode || winner) play();
});
topleft.addEventListener('click',(event) => {
     if(onMode){
          playerOrder.push(1);
          check();
          one();
          if(!winner){
               setTimeout(() => {
                    clearColor();
               },300);
          }
     }
});
topright.addEventListener('click',(event) => {
     if(onMode){
          playerOrder.push(2);
          check();
          two();
          if(!winner){
               setTimeout(() => {
                    clearColor();
               },300);
          }
     }
});
bottomleft.addEventListener('click',(event) => {
     if(onMode){
          playerOrder.push(3);
          check();
          three();
          if(!winner){
               setTimeout(() => {
                    clearColor();
               },300);
          }
     }
});
bottomright.addEventListener('click',(event) => {
     if(onMode){
          playerOrder.push(4);
          check();
          four();
          if(!winner){
               setTimeout(() => {
                    clearColor();
               },300);
          }
     }
});