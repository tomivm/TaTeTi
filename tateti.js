const { exit } = require("process");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// tablero: DEFINIR EL TAD (tipo abstracto de dato)

var TABLERO = [["_","_","_"],["_","_","_"],["_","_","_"]];
var ocupados = [];
var ficha = 'X';

// modulracionacion: todas las funciones que hacen al proyecto

function dibujar(tabla){
    console.clear();
    for(var i = 0 ; i < tabla.length ;i++)    
    console.log(tabla[i].join('|')); 
}

function cambiarJugador (){
    if (ficha == 'X'){
        ficha = 'O';
    }else{
        ficha = 'X';
    }
}

function disponibilidad(dato,ficha){
    ocupados.push(dato);
            switch(dato){
                case 'exit': return 'exit' ;
                case '1' : TABLERO [2][0] = ficha;
                    break;
                case '2' : TABLERO [2][1] = ficha;
                    break;
                case '3' : TABLERO [2][2] = ficha;
                    break;
                case '4' : TABLERO [1][0] = ficha;
                    break;  
                case '5' : TABLERO [1][1] = ficha;
                    break;    
                case '6' : TABLERO [1][2] = ficha;                       
                    break;
                case '7' : TABLERO [0][0] = ficha;
                    break; 
                case '8' : TABLERO [0][1] = ficha;
                    break;
                case '9' : TABLERO [0][2] = ficha;
                    break;                     
                default : ocupados.pop(); 
                        return 'invalido';
            }    
        return 'valido'    
}

function hayGanador (ficha,tabla){
    //console.log (TABLERO.join());
    let diagonal = [];
    
    let diagonalInv = [];
    let col=3
    for(var i = 0; i < tabla.length; i++){    
        if (tabla[i].join() == ficha + ','+ ficha + ',' + ficha){ // se fija si hay 3 en linea en la fila
            return 1;
        }
        let columna = [];
        for(let fila = 0; fila < 3; fila++){ //se fija si hay 3 en linea en la columna
            columna.push(tabla[fila][i]);
        }
        if (columna.join() == ficha + ','+ ficha + ',' + ficha){ 
            return 1;
        }
        diagonal.push(tabla[i][i]);
        
        col--; //se fija si hay 3 en diagonal invertida
        diagonalInv.push(tabla[i][col]);

    }
    console.log(diagonal);
    if (diagonal.join() == ficha + ','+ ficha + ',' + ficha){
        return 1;
    }
    if (diagonalInv.join() == ficha + ','+ ficha + ',' + ficha){
        return 1;
    }
}

function reiniciarJuego(){
    TABLERO = [["_","_","_"],["_","_","_"],["_","_","_"]];
    ocupados = [];
    ficha = 'X'
    dibujar(TABLERO);
    console.log('juegue '+ ficha);    
}
// juego : software (interactuan la modulari[csz]acion)


const start = async () =>{
    dibujar(TABLERO);
    console.log('juegue '+ ficha);
    for await (const dato of rl) { 
        if(ocupados.includes(dato)){
            console.log("La casilla esta ocupada, seleccione otra");
        }else{
            let estado = disponibilidad(dato,ficha);
            switch (estado){
                case 'exit':console.log('Fin del juego'); return 'exit';
                case 'valido': dibujar(TABLERO);
                    if(hayGanador(ficha,TABLERO)){ 
                        console.log("¡El jugador " + ficha + " gano el juego!");
                        console.log("quiere jugar de nuevo?/r/n")
                        console.log("escriba 's' o 'n'")
                        for await (const dato of rl) {
                            if (dato == 's'){
                                reiniciarJuego();
                                //como hago para uq salga del primer for, pero no del segundo?
                            }else if ('n'){
                                console.log('ola');
                                return 'exit';
                            }
                        }     
                    }
                    cambiarJugador();
                    break;
                case 'invalido': console.log('la casilla es invalida, seleccione otra'); break;
            }
        } 

        if(TABLERO[0].includes('_')||TABLERO[1].includes('_')||TABLERO[2].includes('_')){ //no anda, deberia ir negado
            console.log('juegue '+ ficha);
        }else{
            console.log('empate')
            reiniciarJuego();
        }       
    }
}

start();