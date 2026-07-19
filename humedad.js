fetch("http://10.247.219.68:5000/datos")
.then(response => response.json())
.then(datos => {

    console.log("Datos recibidos:");
    console.log(datos);

    // Tomar el valor de humedad del JSON
    actualizarGrafico(datos.humedad);

})
.catch(error => {
    console.error("Error al conectar con Flask:", error);
});


// configuración del sensor
const sensor = {
    nombre : "Humedad del suelo",
    unidad : "%",
    max : 50
};

document.getElementById("tituloSensor").innerHTML = sensor.nombre;


const total = 472;


function actualizarGrafico(valor){

    const circle = document.getElementById("progressCircle");
    const number = document.getElementById("number");

    if(!circle || !number){
        console.error("No se encontraron los elementos.");
        return;
    }


    valor = Number(valor);

    if(isNaN(valor))
        valor = 0;


    number.innerHTML = valor + " " + sensor.unidad;


    let porcentaje = (valor/sensor.max)*100;


    if(porcentaje < 0)
        porcentaje = 0;

    if(porcentaje > 100)
        porcentaje = 100;


    let offset = total-(porcentaje/100)*total;


    circle.style.strokeDashoffset = offset;


    if(porcentaje < 30){
        circle.style.stroke="#2ecc71";
    }
    else if(porcentaje < 60){
        circle.style.stroke="#f1c40f";
    }
    else if(porcentaje < 80){
        circle.style.stroke="#e67e22";
    }
    else{
        circle.style.stroke="#e74c3c";
    }

}
