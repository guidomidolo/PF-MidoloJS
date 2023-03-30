// Utilizo un constructor para crear los distintos tipos de cuentas
class tipoDeCuenta {
    constructor(nombre, moneda, saldo) {
        this.nombre = nombre;
        this.moneda = moneda;
        this.saldo = saldo;
    }
}

// Creo los distintos tipos de cuentas 
const cajaDeAhorroPesos = new tipoDeCuenta("Caja de Ahorro en $", "$", 500000);
const cuentaCorrientePesos = new tipoDeCuenta("Cuenta Corriente en $", "$", 150000);
const cajaDeAhorroDolares = new tipoDeCuenta("Caja de Ahorro en U$D", "U$D", 5000);
const cuentaCorrienteDolares = new tipoDeCuenta("Cuenta Corriente en U$D", "U$D", 0);

// Creo un array con el listado de cuentas
const arrayCuentas = [cajaDeAhorroPesos, cajaDeAhorroDolares, cuentaCorrientePesos, cuentaCorrienteDolares]

// Creo un nuevo array teniendo en cuenta solo el valor numérico (saldo)
const arraySaldos = arrayCuentas.map(cuenta => cuenta.saldo);

// Creo un nuevo array teniendo en cuenta solo el tipo de divisa (moneda)
const arrayMonedas = arrayCuentas.map(cuenta => cuenta.moneda);

// Creo un nuevo array teniendo en cuenta solo el nombre
const arrayNombres = arrayCuentas.map(cuenta => cuenta.nombre);


////////////////////////////////////////////////////////////////////////////////////////////////////

// Empieza el simulador de Home Banking
function iniciarSimulador(){
    const mainContainer = document.getElementById("mainContainer");
mainContainer.innerHTML = `<div class="column mt-5">
                                <form id="formularioLogin">
                                <div class="text-center mb-5">
                                    <h1>Bienvenido a Coderbank, su banco de confianza.</h1>
                                    <h3 class>Ingrese sus datos para iniciar sesión.</h3>
                                </div>
                                <div class="d-grid gap-1 col-6 mx-auto mb-4">
                                    <label for="nombreCliente" class="form-label">Nombre completo</label>
                                    <input type="text" class="form-control" id="nombreCliente" placeholder="Ejemplo: John Doe" required>
                                </div>
                                <div class="d-grid gap-1 col-6 mx-auto mb-5">
                                    <label for="idCliente" class="form-label">ID #</label>
                                    <input type="number" class="form-control" id="idCliente" placeholder="Ejemplo: 5819238" required>
                                </div>
                                <div class="col-mb-3">
                                    <div class="d-grid gap-2 col-6 mx-auto">
                                    <button class="btn btn-primary btn-dark">Acceder</button>
                                    </div>
                                </div>
                                </form>
                            </div>`
}


//Voy a crear una clase que se denomine cliente para instanciar objetos, que voy a tomar del formulario.
iniciarSimulador();
class Cliente {
    constructor(nombreCliente,idCliente){
        this.nombreCliente=nombreCliente;
        this.idCliente=idCliente;
    }

}

//Creo un array vacío que almacene los datos de los clientes ingresados por medio de un push. 
const arrayClientes = [];

//Vinculo el formulario

const formularioLogin = document.getElementById("formularioLogin");

//Trabajo con el formulario, tomo sus datos, creo un objeto y luego almaceno esos datos en el array vacío. 

formularioLogin.addEventListener("submit", (e)=>{
const nombre = document.getElementById("nombreCliente");

// Crear el objeto cliente:

const clienteNuevo = new Cliente (nombre.value);


arrayClientes.push(clienteNuevo);
console.log(arrayClientes);

localStorage.setItem('arrayClientes', JSON.stringify(arrayClientes));
let arrayLS = JSON.parse(localStorage.getItem('arrayClientes'));


// Modelo el HTML via DOM > creo menu de opciones
    mainContainer.innerHTML =
                            `   <div class="column mt-5">
                                    <div class="d-grid gap-1 col-6 mx-auto mb-4 text-center">
                                        <h4 class="pb-4">Bienvenido, ${JSON.stringify(arrayLS)} </h4>
                                        <h4 class="pb-4">¿QUÉ OPERACIÓN DESEÁS REALIZAR?</h4>
                                        <p>  <button type="button" class="btn btn-outline-secondary" onclick="consultarSaldo();">1 - Consulta de saldo</button></p>
                                        <p>  <button type="button" class="btn btn-outline-secondary">2 - Extracción de efectivo en Caja de Ahorro $</button></p>
                                        <p><button type="button" class="btn btn-outline-secondary">3 - Depósito en Caja de Ahorro $</button></p>
                                        <p><button type="button" class="btn btn-outline-secondary">4 - Últimos movimientos</button></p>
                                        <p><button type="button" class="btn btn-outline-secondary" onclick="iniciarSimulador();">5 - Finalizar sesión</button></p>
                                    </div>
                                </div>`
})

// Creo función para consultar el saldo
function consultarSaldo() {
    mainContainer.innerHTML =
                            `   <div class="column mt-5">
                                    <div class="d-grid gap-1 col-6 mx-auto mb-4 text-center">
                                        <h4 class="pb-4">Consulta de saldos</h4>
                                        <p>${arrayNombres[0]}: ${arrayMonedas[0]}${arraySaldos[0]}</p>
                                        <p>${arrayNombres[1]}: ${arrayMonedas[1]}${arraySaldos[1]}</p>
                                        <p>${arrayNombres[2]}: ${arrayMonedas[2]}${arraySaldos[2]}</p>
                                        <p>${arrayNombres[3]}: ${arrayMonedas[3]}${arraySaldos[3]}</p>
                                        <p><button type="button" class="btn btn-outline-secondary" onclick="iniciarSimulador();">Volver al menú anterior</button></p>
                                    </div>
                            </div>`
    
}





    // //Resetear el formulario:
    // formularioLogin.reset();





//     if ((formularioLogin.nombre == "" || formularioLogin.identificacion == "") || (formularioLogin.nombre == null || formularioLogin.identificacion == null)) {
//         alert("Debés completar ambos campos.")
//     } else {
//         for (let i = 0; i < 100; i++) {
//             function seleccionarOperacion() {
//                 let operacion = prompt(`Bienvenido, ${nombreCliente}. \nID #${idCliente}\n
// ====================================
// === ¿QUÉ OPERACIÓN DESEÁS REALIZAR? ===
// 1 - Consulta de saldo
// 2 - Extracción de efectivo en Caja de Ahorro $
// 3 - Depósito en Caja de Ahorro $
// 4 - Últimos movimientos
// 5 - Finalizar sesión
// ====================================\n\n`)}}} 


//                 if (operacion == 1) {
//                     let seleccionarCuenta = prompt(`Seleccionar tipo de cuenta:  \n1) ${arrayNombres[0]} \n2) ${arrayNombres[1]} \n3) ${arrayNombres[2]} \n4) ${arrayNombres[3]}`);
//                     switch (seleccionarCuenta) {
//                         case '1':
//                             alert(`Su saldo es de: ${arrayMonedas[0]}${arraySaldos[0]}`)
//                             break;
//                         case '2':
//                             alert(`Su saldo es de: ${arrayMonedas[1]}${arraySaldos[1]}`)
//                             break;
//                         case '3':
//                             alert(`Su saldo es de: ${arrayMonedas[2]}${arraySaldos[2]}`)
//                             break;
//                         case '4':
//                             alert(`Su saldo es de: ${arrayMonedas[3]}${arraySaldos[3]}`)
//                             break;
//                         default:
//                             alert('Ingrese una opción numérica válida.');
//                     }
//                 }


//                 else if (operacion == 2) {
//                     let montoExtraccion = parseFloat(prompt("¿Qué importe deseas retirar?"))
//                     if (montoExtraccion <= arraySaldos[0]) {
//                         alert(`Retiraste $${montoExtraccion} de tu ${arrayNombres[0]}.\nTu nuevo saldo ahora es de $${arraySaldos[0] - montoExtraccion}`)
//                         arraySaldos[0] = arraySaldos[0] - montoExtraccion
//                         arrayOperacionesRelizadas.push(' Extracción');
//                         console.log(arrayOperacionesRelizadas);
//                     }
//                     else {
//                         alert(`Tu saldo no es suficiente para retirar ese importe. \nEl límite máximo de extracción es $${arraySaldos[0]}`)
//                     }

//                 }
//                 else if (operacion == 3) {
//                     let montoDeposito = parseFloat(prompt("¿Qué importe deseas depositar?"))
//                     alert(`Hiciste un depósito de $ ${montoDeposito} en tu ${arrayNombres[0]}.\nTu nuevo saldo ahora es de $${arraySaldos[0] + montoDeposito}`)
//                     arraySaldos[0] = arraySaldos[0] + montoDeposito
//                     arrayOperacionesRelizadas.push(' Depósito');
//                         console.log(arrayOperacionesRelizadas);
                        
//                 }
//                 else if (operacion == 4) {
//                     alert(arrayOperacionesRelizadas);                
//                 }
//                 else if (operacion == 5) {
//                     alert(`Has cerrado sesión correctamente. Hasta pronto ${nombreUsuario}.`)
//                     localStorage.clear();
//                     iniciarHomeBanking()

//                 }                
//                 else {
//                     alert("Opción incorrecta, volvé a intentarlo.")
//                 }
//             }
//             seleccionarOperacion()
//         }
//     }