// ===============================
// CONFIGURACIÓN DEL SENSOR
// ===============================

const sensor = {
    nombre : "Deslizamiento del terreno",
    unidad : " mm",
    max : 20
};


document.getElementById("tituloSensor").innerHTML = sensor.nombre;


const total = 472;


// ===============================
// LECTURA DE DATOS DESDE FLASK
// ===============================

function leerDatos(){

    fetch("http://10.247.219.68:5000/datos")

    .then(response => response.json())

    .then(datos => {

        console.log("Deslizamiento recibido:", datos.deslizamiento);

        actualizarGrafico(datos.deslizamiento);

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

        console.error("No se encontraron los elementos.");

        return;

    }


    valor = Number(valor);


    if(isNaN(valor)){

        valor = 0;

    }


    number.innerHTML = valor + sensor.unidad;



    let porcentaje = (valor / sensor.max) * 100;


    if(porcentaje < 0){

        porcentaje = 0;

    }


    if(porcentaje > 100){

        porcentaje = 100;

    }



    let offset = total - (porcentaje / 100) * total;


    circle.style.strokeDashoffset = offset;



    if(porcentaje < 30){

        circle.style.stroke = "#2ecc71";   // Normal

    }

    else if(porcentaje < 60){

        circle.style.stroke = "#f1c40f";   // Advertencia

    }

    else if(porcentaje < 80){

        circle.style.stroke = "#e67e22";   // Riesgo

    }

    else{

        circle.style.stroke = "#e74c3c";   // Crítico

    }

}


// ===============================
// ACTUALIZACIÓN AUTOMÁTICA
// ===============================

leerDatos();

setInterval(leerDatos,2000);
