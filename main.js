function iniciarHomeBanking() {
    let nombreUsuario = prompt("Bienvenido a Banco Coder. \n\nPor favor, ingrese su nombre de usuario: \n\n")
    let idUsuario = prompt("Por favor, ingrese su ID de usuario: \n\n")
    let saldoInicial = parseFloat("123424")

// Utilizo un constructor para crear los distintos tipos de cuentas
    class tipoDeCuenta {
        constructor(nombre, moneda, saldo) {
            this.nombre = nombre;
            this.moneda = moneda;
            this.saldo = saldo;
        }
    }

// Creo los distintos tipos de cuentas 
    const cajaDeAhorroPesos = new tipoDeCuenta ("Caja de Ahorro en $", "$", 500000);
    const cuentaCorrientePesos = new tipoDeCuenta ("Cuenta Corriente en $", "$", 150000);
    const cajaDeAhorroDolares = new tipoDeCuenta ("Caja de Ahorro en U$D", "U$D", 5000);
    const cuentaCorrienteDolares = new tipoDeCuenta ("Cuenta Corriente en U$D", "U$D", 2500);


// Creo un array con el listado de cuentas

const arrayCuentas = [cajaDeAhorroPesos, cajaDeAhorroDolares, cuentaCorrientePesos, cuentaCorrienteDolares]

console.log(arrayCuentas);
// Empieza el simulador de Home Banking
    if ((nombreUsuario == "" || idUsuario == "") || (nombreUsuario == null || idUsuario == null)) {
        alert("Debés completar ambos campos.")
        iniciarHomeBanking()
    } else {
        for (let i = 0; i < 5; i++) {
            function seleccionarOperacion() {
                let operacion = prompt("Bienvenido, " + nombreUsuario + ". \n" + "ID #" + idUsuario +
                    "\n\n" + "====================================" +
                    "\n" + "=== ¿QUÉ OPERACIÓN DESEÁS REALIZAR? ===" +
                    "\n" + "1 - Consulta de saldo" +
                    "\n" + "2 - Extracción de efectivo" +
                    "\n" + "3 - Depósito" +
                    "\n" + "4 - Finalizar sesión" +
                    "\n" + "====================================" + "\n\n")


                if (operacion == 1) {
                    let seleccionarCuenta = prompt(`Seleccionar tipo de cuenta:  \n1) ${cajaDeAhorroPesos.nombre} \n2) ${cajaDeAhorroDolares.nombre} \n3) ${cuentaCorrientePesos.nombre} \n4) ${cuentaCorrienteDolares.nombre}`); 
                    switch (seleccionarCuenta) {
                        case '1':
                            alert(`Su saldo es de: ${cajaDeAhorroPesos.moneda}${cajaDeAhorroPesos.saldo}`)
                            break;
                        case '2':
                            alert(`Su saldo es de: ${cajaDeAhorroDolares.moneda}${cajaDeAhorroDolares.saldo}`)
                            break;
                        case '3':
                            alert(`Su saldo es de: ${cuentaCorrientePesos.moneda}${cuentaCorrientePesos.saldo}`)
                            break;
                        case '4':
                            alert(`Su saldo es de: ${cuentaCorrienteDolares.moneda}${cuentaCorrienteDolares.saldo}`)
                            break;
                        default:
                          alert('Ingrese una opción numérica válida.');
                      }
                }

                else if (operacion == 2) {
                    let montoExtraccion = parseFloat(prompt("¿Qué importe deseas retirar?"))
                    if (montoExtraccion <= saldoInicial) {
                        alert("Retiraste $" + montoExtraccion + " de tu Caja de Ahorros." + "\n" + "Tu nuevo saldo ahora es de $" + (saldoInicial - montoExtraccion))
                        saldoInicial = saldoInicial - montoExtraccion
                    }
                    else {
                        alert("Tu saldo no es suficiente para retirar ese importe. \nEl límite máximo de extracción es $" + saldoInicial)
                    }

                }
                else if (operacion == 3) {
                    let montoDeposito = parseFloat(prompt("¿Qué importe deseas depositar?"))
                    alert("Hiciste un depósito de $" + montoDeposito + " en tu Caja de Ahorros." + "\n" + "Tu nuevo saldo ahora es de $" + (saldoInicial + montoDeposito))
                    saldoInicial = saldoInicial + montoDeposito
                }
                else if (operacion == 4) {
                    alert("Has cerrado sesión correctamente. Hasta pronto " + nombreUsuario + ".")
                    iniciarHomeBanking()

                }
                else {
                    alert("Opción incorrecta, volvé a intentarlo.")
                }
            }
            seleccionarOperacion()
        }
    }
}