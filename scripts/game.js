let canvas;
let world;
let keyboard = new Keyboard();
let soundEnabled;
let isGameOver = false;

function init(){
    if(isGameOver){
        gameOver();
        showOverlay('game_over', 'canvas_id');
    }
    canvas = document.getElementById('canvas_id');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39){keyboard.RIGHT = true;}
    if(e.keyCode == 37){keyboard.LEFT = true;}
    if(e.keyCode == 38){keyboard.UP = true;}
    if(e.keyCode == 40){keyboard.DOWN = true;}
    if(e.keyCode == 32){keyboard.SPACE = true;}
    if(e.keyCode == 68){keyboard.D = true;}
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38){
        keyboard.UP = false;
    }

    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68){
        keyboard.D = false;
    }
});

document.addEventListener("gameover", () => {
    showOverlay('canvas_id', 'game_over');
    isGameOver = true;
});

function showOverlay(idRemove, idAdd){
    document.getElementById(idRemove).classList.remove('visible');
    document.getElementById(idRemove).classList.add('invisible');
    document.getElementById(idAdd).classList.remove('invisible');
    document.getElementById(idAdd).classList.add('visible');
}

function gameOver(){
    world.intervalObj.forEach(obj => {
        if(typeof obj.resetInterval === 'function'){
            obj.resetInterval();
        }else if(obj instanceof Level){
            obj.enemies.forEach(enemy => {
                if(typeof enemy.resetInterval === 'function'){
                    enemy.resetInterval();
                }
            });
            obj.clouds.forEach(cloud => {
                if(typeof cloud.resetInterval === 'function'){
                    cloud.resetInterval();
                }
            });
        }
    });

    world.intervalObj.length = 0;
}