function draw() {
    const canvas = document.getElementsByTagName("canvas")[0];
    const cvs = canvas.getContext("2d");
    let move = false
    const players = {
            x: 20,
            y: 20,
            w: 50, 
            h: 50
    }


    function desenhar() {
        cvs.fillStyle = "rgb(75, 212, 59)"
        cvs.fillRect(players.x, players.y, players.w, players.h);
    }
    function limparTela() {
        cvs.fillStyle = "rgb(255,255,255)";    
        cvs.beginPath();
        cvs.rect(0, 0, 500, 500);
        cvs.closePath();
        cvs.fill();
    }


    function atualizar() {
        limparTela()
        desenhar();
    }

    
    canvas.addEventListener("click", (event) => {
        players.x = event.screenX - (1034+players.w/2);
        players.y = event.screenY - (70+players.h/2);
        atualizar();
    })

    // Mostrar coordenadas
    function showMe(event) {
        var coo = document.getElementsByClassName("coords")[0];
        coo.innerHTML = `x: ${event.screenX} - y: ${event.screenY}`
    }
    canvas.addEventListener("mousemove", (event) => showMe(event));
    atualizar();
}