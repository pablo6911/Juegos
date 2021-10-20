/* -------------Creamos las constantes -------------------- */
/* obtenemos el elementos del html */
//ponemos si el jugador a ganado o la partida a quedado en empate
const statusDisplay = document.querySelector('.game-notification'),
    //  gameState es la posicion que el jugador pone en la casilla y tambien para saber si la partida quedo en empate o el ganador
    gameState = ['', '', '', '', '', '', '', '', ''],
    //son todas la posibilidades y combinaciones que hay para ganar, empatar o perder la partida
    winnings = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    //funciones y se van llamando respecto a cada caso de ganar empatar operder
    winMessage = () => `El jugador ${currentPlayer} ha ganado`,
    drawMessage = () => `La partida a quedado empatada`,
    currentPlayerTrun = () => `Turno del jugador ${currentPlayer}`

/* -----------------------------Variables----------------- */
//gameActive ->significa que se sige jugndo y que ninguno a ganado
let gameActive = true,
    //currentPlayer ->a que gugador le toca el turno
    currentPlayer = 'O' //'Jugador 1'

/* ------------------------------funciones--------------- */
//main donde se empiza el juego
function main() {
    //currentPlayerTrun mostramos el turno del jugador actual
    handleStatusDisplay(currentPlayerTrun())
    listeners()
}

main()

//handleStatusDisplay mostramos el resultado del juego
function handleStatusDisplay(message) {
    // va hacer el resultado de las funciones winMessage,drawMessage,currentPlayerTrun
    statusDisplay.innerHTML = message
}
//listeners nos ayuda a mantener mas organizado el codigo
function listeners() {
    //click invocamos al contenerdor principal
    //handleCellClick manejaremos y detectamos  en que celda se da el click
    document.querySelector('.game-container').addEventListener('click', handleCellClick)
        //reetablecemos el juego
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame)

}

function handleCellClick(clickedEvent) {
    //guardamos la etiqueta html que le dimosclick
    const clickedCell = clickedEvent.target
        //detectamos a que celda le dimos click
    if (clickedCell.classList.contains('game-cell')) {
        //clickedCellIndex(posicion en el que le damos click) llamamos a todos los hijos de clickedCell comensamos llamando al padre y posteriormente tenemos la celda hija
        //Array.from losconvertimos a arrays
        //indexOf optenemos el elemento indice posteriormente al que le dimos click
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        console.log(clickedCellIndex)
            //usamos la constante gameState
            //!gameActive si esta vacio entosces return
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return
        }
        //si queremos que haga algo (pasandoole el elemento que hemos optenido y su indice)
        hadleCellPlaed(clickedCell, clickedCellIndex)
            //estaremos revisando si el jugador gano empato o si no pasa nada
        handleResultValidation()
    }
    console.log(clickedCell)
}
//funcion restablecer
function handleRestartGame() {
    gameActive = true
    currentPlayer = 'O'
        //retablecemos gameState
    restartGameState()
        //dira el turno del jugado
    handleStatusDisplay(currentPlayerTrun())
        //limpiamos cada una de las celdas y empieza de nuevo
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerText = '')
}

function restartGameState() {
    let i = gameState.length
        //tenemos todos los elementos y los vacimos cuando detecte numeros negativos
    while (i--) {
        gameState[i] = ''
    }
}


function hadleCellPlaed(clickedCell, clickedCellIndex) {
    //en la posicion de clickedCellIndex guardamos currentPlarye
    gameState[clickedCellIndex] = currentPlayer
        //ponemos el simbolo de (x) (o)
    clickedCell.innerHTML = currentPlayer
}

function handleResultValidation() {
    //saver si algunjugador a ganado
    let roundWon = false
        //veremos si algunas de las condiciones de winnings se cumplen para saber el resultado
    for (let i = 0; i < winnings.length; i++) {
        //almacenaremosla posicion actual del ciclo y despues laganadora si no se cumple ninguna condicion el juego sige
        const winCondition = winnings[i]
            //accedemos al array gameState en la posicion 0
        let position1 = gameState[winCondition[0]]
        let position2 = gameState[winCondition[1]]
        let position3 = gameState[winCondition[2]]
            //no hay ganador en estas pociciones y el juego continua
        if (position1 === '' || position2 === '' || position3 === '') {
            continue
        }
        //ya sabemos el ganador
        if (position1 === position2 && position2 === position3) {
            roundWon = true
            break;
        }
    }
    //ganador y no damos mas opciones de movidas
    //roundWon comprobamos si la variable es positiva true, 
    if (roundWon) {
        //lo mostramos como mensaje
        handleStatusDisplay(winMessage())
            //ya no queremos que los jugadores opciones de juego, si es que ya nagaron
        gameActive = false
        return
    }
    //empate
    //reundDraw comprobamos si existe alguna posicion vacia en gameState, si existe significa que aun no han empatado
    //includes verifica si es ture o false(si no existen comillas vacias significa que hay empate)
    let reundDraw = !gameState.includes('')
    if (reundDraw) {
        handleStatusDisplay(drawMessage())
        gameActive = false
        return
    }
    //cambiamos turno de jugador
    //si las condiciones no se cumplen le damos el turno al siguiente jugador
    handlerPlayerChange()
}

function handlerPlayerChange() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
        //cambiamos el turno del jugador
    handleStatusDisplay(currentPlayerTrun())
}