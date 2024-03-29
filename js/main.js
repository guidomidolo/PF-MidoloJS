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

function mostrarFormulario(){
    document.getElementById("mainContainer").innerHTML = `
        <div class="column mt-5 mb-5">                              
            <form id="formularioExtraccion">
                <div class="text-center mb-5">
                    <h1>Extracción de caja de ahorro en $</h1>
                    <h3>Ingrese el monto que desea extraer y presione el botón "Extraer".</h3>
                </div>
                <div class="d-grid gap-1 col-6 mx-auto mb-4">
                    <label for="montoAExtraer" class="form-label">Monto a extraer:</label>
                    <input type="number" class="form-control" id="montoAExtraer" placeholder="Ejemplo: 1000" required>
                </div>
                <div class="col-mb-3">
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-primary btn-dark" id="extraerBtn">Extraer</button>
                        <button class="btn btn-dark" onclick="opcionesMenu();">Volver al menú anterior</button>
                    </div>
                </div>
            </form>
        </div>`;

    // Escuchar el evento de clic en el botón "Extraer" y llamar a la función correspondiente
    const extraerBtn = document.getElementById("extraerBtn");
    extraerBtn.addEventListener("click", extraerCajaAhorro);
}

// Función para extraer dinero de la caja de ahorro en $
function extraerCajaAhorro(event) {
    event.preventDefault(); // Detener la acción predeterminada del botón en el formulario

    const montoAExtraer = parseInt(document.getElementById("montoAExtraer").value);

    // Validar que el monto a extraer no sea mayor que el saldo disponible
    if (montoAExtraer > cajaDeAhorroPesos.saldo) {
        Swal.fire({
            title: "Error",
            text: "No puede extraer un monto mayor al saldo disponible en la cuenta.",
            icon: "error",
            confirmButtonText: "Entendido",
        });

    } else if (montoAExtraer === 0) {
        Swal.fire({
            title: "Error",
            text: "No es posible extraer monto 0.",
            icon: "error",
            confirmButtonText: "Entendido",
        });
    
    } else {
        cajaDeAhorroPesos.saldo -= montoAExtraer;
        guardarCuentasLS(arrayCuentas);
        Swal.fire({
            title: "¡Listo!",
            text: `Ha extraído ${cajaDeAhorroPesos.moneda}${montoAExtraer} de su ${cajaDeAhorroPesos.nombre}. Su saldo actualizado es ${cajaDeAhorroPesos.moneda}${cajaDeAhorroPesos.saldo}.`,
            icon: "success",
            confirmButtonText: "Entendido",
        });
    }
}

