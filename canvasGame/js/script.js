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

const players = [
    {
        type: 'player',
        color: "rgb(69, 252, 3)",
        coors_x: 10,
        coors_y: 10,
        width: 50,
        height: 50,
        vlc: 5
    }
]


document.body.addEventListener("keydown", ({ key }) => {
    const me = players.find(Element => Element.type == "player");
    if (key == "ArrowRight") {
        me.coors_x += 5 * me.vlc;
    }
    if (key == "ArrowLeft") {
        me.coors_x -= 5 * me.vlc;
    }
    if (key == "ArrowUp") {
        me.coors_y -= 5 * me.vlc;
    }
    if (key == "ArrowDown") {
        me.coors_y += 5 * me.vlc;
    }
});

function collision(ent) {
    if (ent.coors_x+ent.width > 500) { ent.coors_x = 499-ent.width }
    if (ent.coors_x < 0) { ent.coors_x = 0 }
    if (ent.coors_y+ent.height > 500) { ent.coors_y = 499-ent.height }
    if (ent.coors_y < 0) { ent.coors_y = 0 }
}

function draw() {
    players.forEach(ent => {
        ctx.fillStyle = ent.color;
        ctx.fillRect(ent.coors_x, ent.coors_y, ent.width, ent.height);
        collision(ent);
    });
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.coors_x, apple.coors_y, apple.width, apple.height);
    collision(apple);
}

function game(timestamp) {
    ctx.clearRect(0,0,500,500);
    draw()
    window.requestAnimationFrame(game)
}
window.requestAnimationFrame(game)