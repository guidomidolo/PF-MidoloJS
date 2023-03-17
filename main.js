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



// Empieza el simulador de Home Banking
function iniciarHomeBanking() {
    let nombreUsuario = prompt("Bienvenido a Banco Coder. \n\nPor favor, ingrese su nombre de usuario: \n\n")
    let idUsuario = prompt("Por favor, ingrese su ID de usuario: \n\n")
    let saldoInicial = parseFloat("123424")

    if ((nombreUsuario == "" || idUsuario == "") || (nombreUsuario == null || idUsuario == null)) {
        alert("Debés completar ambos campos.")
        iniciarHomeBanking()
    } else {
        for (let i = 0; i < 5; i++) {
            function seleccionarOperacion() {
                let operacion = prompt(`Bienvenido, ${nombreUsuario}. \nID #${idUsuario}\n
====================================
=== ¿QUÉ OPERACIÓN DESEÁS REALIZAR? ===
1 - Consulta de saldo
2 - Extracción de efectivo en Caja de Ahorro $
3 - Depósito en Caja de Ahorro $
4 - Finalizar sesión
====================================\n\n`)


                if (operacion == 1) {
                    let seleccionarCuenta = prompt(`Seleccionar tipo de cuenta:  \n1) ${arrayNombres[0]} \n2) ${arrayNombres[1]} \n3) ${arrayNombres[2]} \n4) ${arrayNombres[3]}`);
                    switch (seleccionarCuenta) {
                        case '1':
                            alert(`Su saldo es de: ${arrayMonedas[0]}${arraySaldos[0]}`)
                            break;
                        case '2':
                            alert(`Su saldo es de: ${arrayMonedas[1]}${arraySaldos[1]}`)
                            break;
                        case '3':
                            alert(`Su saldo es de: ${arrayMonedas[2]}${arraySaldos[2]}`)
                            break;
                        case '4':
                            alert(`Su saldo es de: ${arrayMonedas[3]}${arraySaldos[3]}`)
                            break;
                        default:
                            alert('Ingrese una opción numérica válida.');
                    }
                }


                else if (operacion == 2) {
                    let montoExtraccion = parseFloat(prompt("¿Qué importe deseas retirar?"))
                    if (montoExtraccion <= arraySaldos[0]) {
                        alert(`Retiraste $${montoExtraccion} de tu ${arrayNombres[0]}.\nTu nuevo saldo ahora es de $${arraySaldos[0] - montoExtraccion}`)
                        arraySaldos[0] = arraySaldos[0] - montoExtraccion
                    }
                    else {
                        alert(`Tu saldo no es suficiente para retirar ese importe. \nEl límite máximo de extracción es $${arraySaldos[0]}`)
                    }

                }
                else if (operacion == 3) {
                    let montoDeposito = parseFloat(prompt("¿Qué importe deseas depositar?"))
                    alert(`Hiciste un depósito de $ ${montoDeposito} en tu ${arrayNombres[0]}.\nTu nuevo saldo ahora es de $${arraySaldos[0] + montoDeposito}`)
                    arraySaldos[0] = arraySaldos[0] + montoDeposito
                }
                else if (operacion == 4) {
                    alert(`Has cerrado sesión correctamente. Hasta pronto ${nombreUsuario}.`)
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