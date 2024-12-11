function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var sexo = document.getElementById("sexo").value;
    var fechaNacimiento = document.getElementById("anio").value + "-" + document.getElementById("mes").value + "-" + document.getElementById("dia").value;
    var telefono = document.getElementById("telefono").value;
    var tarjeta = document.getElementById("tarjeta").value;
    
    if (nombre == "" || apellidos == "" || sexo == "" || telefono == "" || tarjeta == "" || fechaNacimiento.includes("undefined")) {
        alert("Completa todos los campos antes de proceder");
        return false;
    }
    return true;
}

function toggleSection(id) {
    var section = document.getElementById(id);
    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

var ticketCount = 0;
var ticketPrice = 5000;
var ticketsDisponibles = localStorage.getItem('ticketsDisponibles') || 200;

function changeTicketCount(change) {
    ticketCount += change;
    if (ticketCount < 0) ticketCount = 0;
    if (ticketCount > 10) ticketCount = 10;
    document.getElementById("ticketCount").innerText = ticketCount;
    document.getElementById("totalPrice").innerText = "$" + (ticketCount * ticketPrice).toLocaleString() + ".00";
}

function saveTicketInfo() {
    localStorage.setItem('ticketCount', ticketCount);
    localStorage.setItem('totalPrice', ticketCount * ticketPrice);
}

function loadTicketInfo() {
    var ticketCount = localStorage.getItem('ticketCount') || 0;
    var totalPrice = localStorage.getItem('totalPrice') || 0;
    document.getElementById("ticketCountDisplay").innerText = ticketCount;
    document.getElementById("totalPriceDisplay").innerText = "$" + parseInt(totalPrice).toLocaleString() + ".00";
}

function actualizarMeses() {
    var mesSelect = document.getElementById("mes");
    mesSelect.innerHTML = "";
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        mesSelect.appendChild(option);
    }
    actualizarDias();
}

function actualizarDias() {
    var anio = document.getElementById("anio").value;
    var mes = document.getElementById("mes").value;
    var diaSelect = document.getElementById("dia");
    diaSelect.innerHTML = "";
    var diasEnMes = new Date(anio, mes, 0).getDate();
    for (var i = 1; i <= diasEnMes; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        diaSelect.appendChild(option);
    }
}

function cargarAnios() {
    var anioSelect = document.getElementById("anio");
    var anioActual = new Date().getFullYear();
    for (var i = anioActual; i >= 1900; i--) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        anioSelect.appendChild(option);
    }
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("mes").innerHTML = "";
    document.getElementById("dia").innerHTML = "";
    document.getElementById("telefono").value = "";
    document.getElementById("tarjeta").value = "";
}

function comprarTickets() {
    if (!validarFormulario()) {
        return;
    }

    var ticketsComprados = parseInt(localStorage.getItem('ticketCount')) || 0;
    ticketsDisponibles -= ticketsComprados;
    if (ticketsDisponibles < 0) ticketsDisponibles = 0;
    localStorage.setItem('ticketsDisponibles', ticketsDisponibles);

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        sexo: document.getElementById("sexo").value,
        fechaNacimiento: document.getElementById("anio").value + "-" + document.getElementById("mes").value + "-" + document.getElementById("dia").value,
        telefono: document.getElementById("telefono").value,
        tarjeta: document.getElementById("tarjeta").value,
        ticketsComprados: ticketsComprados,
        totalPrice: ticketsComprados * ticketPrice
    };
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Tickets comprados exitosamente. Tickets disponibles: " + ticketsDisponibles);

    // Llama a la función para limpiar el formulario
    limpiarFormulario();
}

window.onload = function() {
    loadTicketInfo();
    cargarAnios();
    document.getElementById("ticketsDisponibles").innerText = ticketsDisponibles;
};