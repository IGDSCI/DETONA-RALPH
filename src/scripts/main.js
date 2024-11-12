const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#value-life"),
        finalScore: document.querySelector("#final-score"),
        gameOver: document.querySelector("#game-over"),
        restartGame: document.querySelector("#restart-game"),
    },
    values: {
        result: 0,
        hitPosition: 0,
        currentTime: 61,
        playerLife: 3,
        hitPositionLife: 0,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.view.finalScore.textContent = 'SCORE: ' + state.values.result
        state.view.gameOver.classList.remove("disable")
        state.view.gameOver.classList.add("activate")
    }
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove('enemy');
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    state.values.hitPosition = randomSquare.id
    state.values.hitPositionLife = randomSquare.id
    randomSquare.classList.add('enemy');
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener('click', ()=>{
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null
            } else if (square.id != state.values.hitPositionLife){
                state.values.playerLife--
                state.view.life.innerHTML = 'x' + state.values.playerLife;
                if(state.values.playerLife <= 0){
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    state.view.finalScore.textContent = 'SCORE: ' + state.values.result
                    state.view.gameOver.classList.remove("disable")
                    state.view.gameOver.classList.add("activate")
                }
            }
        })
    })
}

state.view.restartGame.addEventListener('click', ()=>{
    state.values.playerLife = 3;
    state.values.currentTime = 61;
    state.values.result = 0;
    state.view.life.innerHTML = 'x' + state.values.playerLife;
    state.view.score.innerHTML = state.values.result
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.view.gameOver.classList.remove("activate");
    state.view.gameOver.classList.add("disable");
})

function main(){
    addListenerHitBox()
    state.view.gameOver.classList.add("disable");
}

main();