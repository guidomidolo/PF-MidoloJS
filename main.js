function iniciarHomeBanking() {
    let nombreUsuario = prompt("Bienvenido a Banco Coder. \n\nPor favor, ingrese su nombre de usuario: \n\n")
    let idUsuario = prompt("Por favor, ingrese su ID de usuario: \n\n")
    let saldoInicial = parseFloat("123424")
    console.log(idUsuario + nombreUsuario)

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
                    alert("Su saldo es de: $" + saldoInicial)
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