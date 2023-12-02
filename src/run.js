window.onload=function()
{
  document.addEventListener('visibilitychange',function(e)
  {
    var isActive=!document.hidden;
    if(!isActive)
    document.title='🤪 Come Back Soon! 👈';
    else
    document.title="🤟 Snake Water and Gun 🥳";
  });
};
let scores=JSON.parse(localStorage.getItem('scores'))||{
  win:0,
  lose:0, 
  draw:0
};
let result;
let isAutoPlaying=false;
let intervalId;
function autoPlay()
{
  if(!isAutoPlaying){
  intervalId=setInterval(()=>{
    const playerMove=pickComputerMove();
    playGame(playerMove);
  },1000);
  isAutoPlaying=true;
  document.querySelector('.auto-btn').innerHTML='Stop Play';
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    document.querySelector('.auto-btn').innerHTML='Auto Play';
  }
}
function pickComputerMove()
{
  const randomNumber=Math.random();
  let a;
  if(randomNumber>=0 && randomNumber<1/3)
    a='rock';
  else if(randomNumber>=1/3 && randomNumber<2/3)
    a='paper';
  else
    a='scissor';
  return a;
}
function playGame(b)
{
  a=pickComputerMove();
  if(b=='rock')
  {
    if(a==b){
      result='draw';
      output='draw 👍'
    }
    else if(a=='scissor'){
      result='win';
      output='win 🥳👏';
    }
    else{
      result='lose'
      output='lose  👎 😦';
    }
  }
  else if(b=='paper')
  {
    if(a==b){
      result='draw';
      output='draw 👍'
    }
    else if(a=='rock'){
      result='win';
      output='win 🥳👏';
    }
    else{
      result='lose'
      output='lose  👎 😦';
    }
  }
  else
  {
    if(a==b){
      result='draw';
      output='draw 👍'
    }
    else if(a=='paper'){
      result='win';
      output='win 🥳👏';
    }
    else{
      result='lose'
      output='lose 👎 😦';
    }
  }
  if(result==='draw')
  document.getElementById("pa").innerHTML =''+output;
  else
  document.getElementById("pa").innerHTML ='You '+output;
  document.getElementById("move").innerHTML 
  =`You <img class="move-img" src="img/${b}-emoji.png"><img class="move-img" src="img/${a}-emoji.png"> Computer`;
  if(result==='win')
    scores.win++;
  else if(result=='lose')
    scores.lose++;
  else
    scores.draw++;
  localStorage.setItem('scores',JSON.stringify(scores));
  document.getElementById("score").innerHTML='Wins: '+scores.win+', Lose: '+scores.lose+', draws: '+scores.draw+'.';
}
document.querySelector('.rock-btn').addEventListener('click',()=>
{
  playGame('rock');
});
document.querySelector('.paper-btn').addEventListener('click',()=>
{
  playGame('paper');
});
document.querySelector('.scissor-btn').addEventListener('click',()=>
{
  playGame('scissor');
});
document.body.addEventListener('keydown',(event)=>
{
  if(event.key==='r')
  playGame('rock');
  else if(event.key==='p')
  playGame('paper');
  else if(event.key==='s')
  playGame('scissor');
});
function reset()
{
  localStorage.removeItem('scores');
  scores.win=0;
  scores.lose=0;
  scores.draw=0;
  document.getElementById("score").innerHTML='Wins: '+scores.win+', Lose: '+scores.lose+', draws: '+scores.draw+'.';
}
