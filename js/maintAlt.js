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

// Guardo el array de cuentas en el LocalStorage
function guardarCuentasLS(arrayCuentas) {
    localStorage.setItem("cuentas", JSON.stringify(arrayCuentas));
}

function cargarCuentasLS() {
    return JSON.parse(localStorage.getItem("cuentas")) || [];
}

guardarCuentasLS(arrayCuentas);


// Creo un nuevo array teniendo en cuenta solo el valor numérico (saldo)
const arraySaldos = arrayCuentas.map(cuenta => cuenta.saldo);

// Creo un nuevo array teniendo en cuenta solo el tipo de divisa (moneda)
const arrayMonedas = arrayCuentas.map(cuenta => cuenta.moneda);

// Creo un nuevo array teniendo en cuenta solo el nombre
const arrayNombres = arrayCuentas.map(cuenta => cuenta.nombre);

// Función para cerrar sesión 
function logOut(){
    //Resetear el formulario:
    formularioLogin.reset();
    Swal.fire({
        title: 'Cerraste sesión.',
        text: 'Si deseás volver a acceder, ingresá nuevamente tus datos.',
        icon: 'error',
        confirmButtonText: 'Entendido, hasta pronto.'
      })
    iniciarSimulador();

}
////////////////////////////////////////////////////////////////////////////////////////////////////

// Empieza el simulador de Home Banking

// Modelo el HTML via DOM > creo login
function iniciarSimulador(){
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = `<div class="column mt-5 mb-5">                              
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
                <button class="btn btn-primary btn-dark" onclick="guardarCliente();">Acceder</button>
                </div>
            </div>
        </form>
    </div>`
}

function guardarCliente(){
    const nombreCliente = document.getElementById("nombreCliente").value;
    const idCliente = document.getElementById("idCliente").value;
    const cliente = new Cliente(nombreCliente, idCliente);
    localStorage.setItem("cliente", JSON.stringify(cliente));
    opcionesMenu();
}



// Modelo el HTML via DOM > creo menu de opciones
function opcionesMenu(){
    const cliente = JSON.parse(localStorage.getItem("cliente")) || {};
    document.getElementById("mainContainer").innerHTML =
    
    `   <div class="col-mb-3 mt-5">
            <div class="d-flex row gap-1 col-6 mx-auto mb-4 text-center justify-content-center">
                <h4 class="pb-4">Bienvenido,<br/> ${cliente.nombreCliente} - ID #${cliente.idCliente}</h4>
                <h4 class="pb-4">¿QUÉ OPERACIÓN DESEÁS REALIZAR?</h4>
                <button type="button" class="btn btn-outline-secondary w-50" onclick="consultarSaldo();">Consulta de saldo</button></p>
                <button type="button" class="btn btn-outline-secondary w-50 onclick" <button onclick="mostrarFormulario()">Extracción de efectivo en Caja de Ahorro $</button></p>
                <button type="button" class="btn btn-outline-secondary w-50 disabled">Depósito en Caja de Ahorro $</button></p>
                <button type="button" class="btn btn-outline-secondary w-50 disabled">Últimos movimientos</button></p>
                <button type="button" class="btn btn-outline-secondary w-50" onclick="logOut();">Finalizar sesión</button></p>
            </div>
        </div>`
}

iniciarSimulador();


//Voy a crear una clase que se denomine cliente para instanciar objetos, que voy a tomar del formulario.
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
const identificacion = document.getElementById("idCliente");

// Crear el objeto cliente:
const clienteNuevo = new Cliente (nombre.value, identificacion.value);
arrayClientes.push(clienteNuevo);
opcionesMenu();

guardarClientesLS(arrayClientes);

})



// Creo función para consultar el saldo
function consultarSaldo() {
    const cuentas = cargarCuentasLS(); //4 cuentas
    let crearLinea = "";
    
    for (cuenta of cuentas) {
        crearLinea += `   <div class="column mt-5 mb-5">
                            <div class="d-grid gap-1 col-6 mx-auto mb-4">
                                <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tipo de Cuenta</th>
                                    <th scope="col">Moneda</th>
                                    <th scope="col">Saldo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>${cuenta.nombre}</td>
                                    <td>${cuenta.moneda}</td>
                                    <td>${cuenta.saldo}</td>
                                    
                                </tr>
                                </tbody>
                                </table>  
                            </div>
    </div>`;
    }

    document.getElementById("mainContainer").innerHTML = `<div class="column mt-5">
    <div class="d-grid gap-1 col-6 mx-auto mb-4 text-center"><h3>Consulta de saldos</h3></div></div> ${crearLinea}                             <div class="d-grid gap-1 col-6 mx-auto mb-4">
    <button class="btn btn-dark" onclick="opcionesMenu();">Volver al menú anterior</button>
    </div>`;

    
}

function mostrarFormulario() {
    mainContainer.innerHTML = `<div class="column mt-5 mb-5">                              
        <form id="formularioLogin">
            <div class="text-center mb-5">
                <h3>Extracción en Caja de Ahorro en $.</h3>
                <h5>Ingrese el monto solicitado.</h5>
            </div>

            <div class="d-grid gap-1 col-6 mx-auto mb-5">
                <input type="number" class="form-control" id="montoExtraccion" placeholder="Ejemplo: 5819238" required>
            </div>
            <div class="col-mb-3">
                <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary btn-dark" onclick="confirmarExtraccion();">Confirmar extracción</button>
                <button class="mt-3 btn btn-dark" onclick="opcionesMenu();">Volver al menú anterior</button>
                </div>
            </div>
        </form>
    </div>`
}
  
  function confirmarExtraccion() {
    e.preventDefault();
    // Obtener el valor ingresado en el input y convertirlo a un número
    const cantidadRetiro = Number(document.querySelector('input').value);
    
    // Calcular el saldo disponible después de la extracción
    const saldoActual = 111500;
    const saldoDisponible = saldoActual - cantidadRetiro;
    
  // Obtener el elemento p para mostrar el saldo disponible y actualizar su contenido
  const pSaldoDisponible = document.getElementById("saldoDisponible");
  pSaldoDisponible.textContent = `Saldo disponible: $${saldoDisponible}`;
  
  mainContainer.innerHTML = `<div class="column mt-5 mb-5">                              
  <form id="formularioLogin">
      <div class="col-mb-3">
          <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-primary btn-dark" onclick="confirmarExtraccion();">Confirmar extracción</button>
          <button class="mt-3 btn btn-dark" onclick="opcionesMenu();">Volver al menú anterior</button>
          <p id="saldoDisponible"></p> <!-- Agrega un elemento p para mostrar el saldo disponible -->
          </div>
      </div>
  </form>
</div>`
}


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