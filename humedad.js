// ===============================
// CONFIGURACIÓN DEL SENSOR
// ===============================

const sensor = {
    nombre: "Humedad del suelo",
    unidad: "%",
    max: 50
};

document.getElementById("tituloSensor").innerHTML = sensor.nombre;


const total = 472;


// ===============================
// LECTURA DE FLASK
// ===============================

function leerDatos(){

    fetch("http://10.247.219.68:5000/datos")
    
    .then(response => response.json())

    .then(datos => {

        console.log("Humedad recibida:", datos.humedad);

        actualizarGrafico(datos.humedad);

    })

    .catch(error => {

        console.error("Error conectando con Flask:", error);

    });

}


// ===============================
// ACTUALIZACIÓN DE GRÁFICA
// ===============================

function actualizarGrafico(valor){

    const circle = document.getElementById("progressCircle");
    const number = document.getElementById("number");


    if(!circle || !number){

        console.error("No existen elementos de gráfica");

        return;

    }


    valor = Number(valor);


    if(isNaN(valor)){

        valor = 0;

    }


    number.innerHTML = valor + " " + sensor.unidad;


    let porcentaje = (valor / sensor.max) * 100;


    porcentaje = Math.max(0, Math.min(100, porcentaje));


    let offset = total - (porcentaje / 100) * total;


    circle.style.strokeDashoffset = offset;



    if(porcentaje < 30){

        circle.style.stroke = "#2ecc71";

    }

    else if(porcentaje < 60){

        circle.style.stroke = "#f1c40f";

    }

    else if(porcentaje < 80){

        circle.style.stroke = "#e67e22";

    }

    else{

        circle.style.stroke = "#e74c3c";

    }

}


// ===============================
// ACTUALIZACIÓN AUTOMÁTICA
// ===============================

// Primera lectura
leerDatos();


// Actualizar cada 2 segundos
setInterval(leerDatos,2000);
