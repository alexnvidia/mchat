$.noConflict();
jQuery(document).ready(function(){
var ctx = document.getElementById("myChart").getContext('2d');
const n_patient_p = JSON.parse(document.getElementById('positive').textContent);
const n_patient_pc = JSON.parse(document.getElementById('positiveConfirmed').textContent);
var myChart = new Chart(ctx, {
type: 'bar',
data: {
labels: ["Positivos en el test M-CHAT-R/F", "Positivos Confirmados por un Profesional"],
datasets: [{
label: 'Número de test M-CHAT-R/F que son positivos',
data: [n_patient_p, n_patient_pc],
backgroundColor: [
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)'
],
borderColor: [
'rgba(255,99,132,1)',
'rgba(54, 162, 235, 1)'
],
borderWidth: 1
}]
},
options: {
scales: {
yAxes: [{
ticks: {
beginAtZero: true
}
}]
}
}
});
});