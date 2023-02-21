const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const apple = {
    type: 'apple',
    color: "rgb(252, 3, 3)",
    coors_x: Math.random()*499,
    coors_y: Math.random()*499,
    width: 10,
    height: 10
}
function newApple() {
    apple.coors_x = Math.random() * 500;
    apple.coors_y = Math.random() * 500;
}

const players = [
    {
        type: 'player',
        color: "rgb(69, 252, 3)",
        coors_x: 10,
        coors_y: 10,
        width: 50,
        height: 50,
        vlc: 5,
        achviments: 0
    }
]

// Detecção da tecla sendo pressionadas
document.body.addEventListener("keydown", ({ key }) => {
    const me = players.find(Element => Element.type == "player");
    if (key == "ArrowRight") {
        me.coors_x += 2.5 * me.vlc;
    }
    if (key == "ArrowLeft") {
        me.coors_x -= 2.5 * me.vlc;
    }
    if (key == "ArrowUp") {
        me.coors_y -= 2.5 * me.vlc;
    }
    if (key == "ArrowDown") {
        me.coors_y += 2.5 * me.vlc;
    }
});

// Colisão para fora do mapa
function collision(ent) {
    if (ent.coors_x+ent.width > 500) { ent.coors_x = 499-ent.width }
    if (ent.coors_x < 0) { ent.coors_x = 0 }
    if (ent.coors_y+ent.height > 500) { ent.coors_y = 499-ent.height }
    if (ent.coors_y < 0) { ent.coors_y = 0 }
}

function getTheApple() {
    players.forEach(element => {
        if(apple.coors_x >= element.coors_x && apple.coors_x <= element.coors_x+element.width) {
            if (apple.coors_y >= element.coors_y && apple.coors_y <= element.coors_y+element.height) {
                // positivo, achou a apple
                newApple()
                const me = players.find(ent => element.type == "player")
                me.achviments += 1
                rank();
            }
        }
    });
}

function rank() {
    const screen = document.querySelector(".rank");
    for (let i=0; i < players.length; i++) {
        screen.innerHTML = `<p>${i+1}. ${players[i].type} - ${players[i].achviments}</p>`
    }
}

// Desenhando personagens e objetos
function draw() {
    players.forEach(ent => {
        ctx.fillStyle = ent.color;
        ctx.fillRect(ent.coors_x, ent.coors_y, ent.width, ent.height);
        collision(ent);
    });
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.coors_x, apple.coors_y, apple.width, apple.height);
    
    collision(apple);
    getTheApple();
}

function game(timestamp) {
    ctx.clearRect(0,0,500,500);
    draw()
    window.requestAnimationFrame(game)
}
window.requestAnimationFrame(game)