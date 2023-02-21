const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

players = [
    {
        color: "rgb(69, 252, 3)",
        coors_x: 10,
        coors_y: 10,
        width: 50,
        height: 50
    }
]

function draw() {
    players.forEach(ent => {
        ctx.fillStyle = ent.color;
        ctx.fillRect(ent.coors_x, ent.coors_y, ent.width, ent.height);
    });
}

function game(timestamp) {
    ctx.clearRect(0,0,500,500);
    draw()
    window.requestAnimationFrame(game)
}
window.requestAnimationFrame(game)