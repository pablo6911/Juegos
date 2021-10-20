/* --------------------declaramos las variables globales------------- */
let palabraSeleccionada = '',
        concordancia=[],
        intentos=6,
        fallos=0;

/* ----------seleccionamos y escogemos una palabra de la constante creado en palabra.js */
function selecionarPalabra(palabras){
    let totalPalabras =palabras.length-1,
    /*Math.random() escogemos una solo palabra*/
        rand =(Math.random()*totalPalabras).toFixed(0)
        /* seleccionmos la palabra */
        /*toLowerCase la convertimosa minusculas para poder hacer la comparacion */
    palabraSeleccionada=palabras[rand].toLowerCase()
    /* mostramos en consola */
    console.log(palabraSeleccionada)
    /* llamamos la funcion  */
    pintarPalabra(palabraSeleccionada)
}

/* funcion clave; se utiliza para poder bloquear la letra seleccionado (seleccionamos a y la bloquea para no poder seleccionarla de nuevo) */
function chequear(event){
    comprobarLetra(event.target.textContent)
}

function pintarPalabra(palabra){
    let str='',
        letras = palabra.split('')
    
    letras.forEach((l, i) => {
        if(concordancia.includes(l)){
            str+= `<div class="oculto">${l}</div>`
        }else{
            concordancia[i]="_"
            str += `<div class="oculto">?</div>`
        }
    });
    document.getElementById("word").innerHTML=str
}

/* creamos las letras */
function abc(){
    /* codigo ascci */
    let a=97,
        z=123,
        letras = document.getElementById("letras")

    for(let l=a;l<z;l++){
        /* esta funcion optiene el caracter  y lo almacena en char */
        const char =String.fromCharCode(l)
        /* optenemos todas las letras */
        let letra = document.createElement('div')
        letra.classList.add('abc', 'bg-secondary', 'text-primary', 'manito')
        letra.setAttribute('id','letra-'+char)
        letra.textContent=char
        /*le  agregamos una escucha de evento click y llamamos a la funcion que ya esta creada chequear para bloquear la letra*/
        /*la funcion chequear tiene que estar creada antes para que funcione */
        letra.addEventListener('click', chequear)

        letras.appendChild(letra)
    }
}


function comprobarLetra(char){
    let letra=document.getElementById('letra-'+char)

    if(palabraSeleccionada.indexOf(char) !=-1){
        for(let i=0;i<palabraSeleccionada.length;i++){
            if(palabraSeleccionada[i]==char) concordancia[i]=char
        }

        pintarPalabra(palabraSeleccionada)

        letra.classList.remove("bg-secondary","text-primary")
        letra.classList.add("bg-primary")
    }else{
        intentos--;
        fallos++;
        letra.classList.toggle("bg-secondary","text-primary")
        letra.classList.add("bg-error","text-light")
        document.getElementById("palo").src=`img/${fallos}.jpg`
    }

    letra.classList.toggle("manito")
    letra.removeEventListener('click', chequear)

    comprobarPalabra()
}


function comprobarPalabra(){
    /* si los intentos son iguales a (0) no hay mas forma de continuar */
    if(intentos==0){
        alert('Perdiste, Inicia de nuevo')
        /* recargamos la pagina */
        window.location.reload()
        /* en lo contrario decimos que lla gano si han seleccionado todas las palabra (si este caracter lla no existe concordancia.indexOf("_") ==-1)) */
    }else if(concordancia.indexOf("_") ==-1){
        /* mostramos imagen ganadora */
        document.getElementById("palo").src='img/win.gif';
        alert('Haz ganado, vuelve a iniciar')
        /* recargamos la pagina */
        window.location.reload()
    }
}

/* pasamos el argumento selecionarPalabra que tiene todas la palabras */
/* Inicia todo para empezar a jugar */
function start(){
    /* llamamos la const (words) de palabras.js  */
    selecionarPalabra(words)
    /* crea el abecederio */
    abc()
}
/* llamamos la funcion para arrancar el programa */
start()