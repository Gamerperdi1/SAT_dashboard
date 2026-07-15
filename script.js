const total = 472;
function actualizarGrafico(circleID, numberID, valor){
    const circle = document.getElementById(circleID);
    const number = document.getElementById(numberID);
    
    if(!circle || !number){
        console.error("No se encontró el elemento:", circleID, numberID);
        return;}
    valor = Number(valor);
    if(isNaN(valor)) valor=0;
    if(valor<0) valor=0;
    if(valor>100) valor=100;
    number.innerHTML = valor + "%";
    let offset = total - (valor/100)*total;
    circle.style.strokeDashoffset = offset;
    if(valor<30){
        circle.style.stroke="#2ecc71";
    }
    else if(valor<60){
        circle.style.stroke="#f1c40f";
    }
    else if(valor<80){
        circle.style.stroke="#e67e22";
    }
    else{
        circle.style.stroke="#e74c3c";
    }
}
actualizarGrafico(
    "circleHumedad",
    "numberHumedad",
    0
);
