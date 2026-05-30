/* ================================= */
/* VARIABLES GENERALES */
/* ================================= */

let pantallaActual = 1;

let estrellas = 0;

const totalPantallas = 10;

/* ================================= */
/* MENSAJES DE SOFÍA */
/* ================================= */

const mensajesSofia = {

1:"¡Hola! Soy Sofía. Te acompañaré durante esta aventura.",

2:"Conoce los objetivos de este recorrido.",

3:"Leer nos ayuda a aprender cosas nuevas cada día.",

4:"Ahora descubrirás qué es la comprensión lectora.",

5:"Busca las ideas más importantes del texto.",

6:"Lee con atención y encuentra las palabras clave.",

7:"Piensa cómo se sienten los personajes.",

8:"Reflexiona sobre lo que aprendiste.",

9:"Demuestra todo lo que sabes.",

10:"¡Lo lograste! Estoy orgullosa de ti."

};

/* ================================= */
/* CAMBIAR PANTALLA */
/* ================================= */

function cambiarPantalla(numero){

document
.querySelectorAll(".pantalla")
.forEach(p=>p.classList.remove("active"));

document
.getElementById("pantalla"+numero)
.classList.add("active");

pantallaActual = numero;

actualizarBarra();

actualizarSofia();

window.scrollTo({
top:0,
behavior:"smooth"
});

}

/* ================================= */
/* BARRA DE PROGRESO */
/* ================================= */

function actualizarBarra(){

const porcentaje =
(numeroPorcentaje());

document
.getElementById("progressBar")
.style.width = porcentaje + "%";

}

function numeroPorcentaje(){

return (pantallaActual / totalPantallas) * 100;

}

/* ================================= */
/* SOFÍA */
/* ================================= */

function actualizarSofia(){

const mensaje =
document.getElementById("sofiaMessage");

if(mensaje){

mensaje.innerHTML =
mensajesSofia[pantallaActual];

}

}

/* ================================= */
/* VOZ */
/* ================================= */

function hablar(texto){

speechSynthesis.cancel();

const voz =
new SpeechSynthesisUtterance(texto);

voz.lang = "es-MX";

voz.rate = 1;

speechSynthesis.speak(voz);

}

/* ================================= */
/* NARRACIONES */
/* ================================= */

const audioIntro =
document.getElementById("audioIntro");

if(audioIntro){

audioIntro.addEventListener("click",()=>{

hablar(
"Leer nos permite aprender, imaginar, descubrir y comprender mejor el mundo que nos rodea."
);

});

}

const audioDefinicion =
document.getElementById("audioDefinicion");

if(audioDefinicion){

audioDefinicion.addEventListener("click",()=>{

hablar(
"La comprensión lectora es la capacidad de entender, interpretar y analizar la información de un texto."
);

});

}

/* ================================= */
/* SABÍAS QUE */
/* ================================= */

const datosCuriosos = [

"Leer veinte minutos al día puede ayudarte a aprender miles de palabras nuevas cada año.",

"Los lectores frecuentes suelen mejorar su memoria y concentración.",

"Leer fortalece la imaginación y la creatividad.",

"Muchos inventores y científicos fueron grandes lectores."

];

const modal =
document.getElementById("modalSabiasQue");

const btnSabias =
document.getElementById("sabiasQue");

const cerrarModal =
document.getElementById("cerrarModal");

const datoCurioso =
document.getElementById("datoCurioso");

if(btnSabias){

btnSabias.addEventListener("click",()=>{

const random =
Math.floor(
Math.random() *
datosCuriosos.length
);

datoCurioso.innerHTML =
datosCuriosos[random];

modal.style.display = "flex";

});

}

if(cerrarModal){

cerrarModal.addEventListener("click",()=>{

modal.style.display = "none";

});

}

window.addEventListener("click",(e)=>{

if(e.target === modal){

modal.style.display = "none";

}

});

/* ================================= */
/* CARRUSEL */
/* ================================= */

const slides =
document.querySelectorAll(".slide");

let slideActual = 0;

function mostrarSlide(indice){

slides.forEach(
s=>s.classList.remove("active-slide")
);

slides[indice]
.classList.add("active-slide");

}

const nextSlide =
document.getElementById("nextSlide");

const prevSlide =
document.getElementById("prevSlide");

if(nextSlide){

nextSlide.addEventListener("click",()=>{

slideActual++;

if(slideActual >= slides.length){

slideActual = 0;

}

mostrarSlide(slideActual);

});

}

if(prevSlide){

prevSlide.addEventListener("click",()=>{

slideActual--;

if(slideActual < 0){

slideActual =
slides.length - 1;

}

mostrarSlide(slideActual);

});

}

/* ================================= */
/* IDEAS PRINCIPALES */
/* ================================= */

const frases =
document.querySelectorAll(".frase");

frases.forEach(frase=>{

frase.addEventListener("click",()=>{

frase.classList.toggle(
"seleccionada"
);

});

});

const verificarIdeas =
document.getElementById(
"verificarIdeas"
);

if(verificarIdeas){

verificarIdeas.addEventListener(
"click",
()=>{

let correcto = true;

frases.forEach(frase=>{

const seleccionada =
frase.classList.contains(
"seleccionada"
);

const esCorrecta =
frase.dataset.correct
=== "true";

if(seleccionada !== esCorrecta){

correcto = false;

}

});

const resultado =
document.getElementById(
"resultadoIdeas"
);

if(correcto){

resultado.innerHTML =
"⭐ ¡Excelente! Identificaste correctamente la idea principal.";

resultado.style.color =
"green";

estrellas++;

}else{

resultado.innerHTML =
"❌ Inténtalo nuevamente.";

resultado.style.color =
"red";

}

});

}

/* ================================= */
/* PALABRAS CLAVE */
/* ================================= */

const palabras =
document.querySelectorAll(
".palabra-clave"
);

palabras.forEach(p=>{

p.addEventListener("click",()=>{

p.classList.toggle(
"palabra-seleccionada"
);

});

});

const revisarPalabras =
document.getElementById(
"revisarPalabras"
);

if(revisarPalabras){

revisarPalabras.addEventListener(
"click",
()=>{

let seleccionadas =
document.querySelectorAll(
".palabra-seleccionada"
).length;

if(seleccionadas >= 4){

alert(
"⭐ Excelente selección de palabras clave."
);

estrellas++;

}else{

alert(
"Intenta identificar más palabras importantes."
);

}

});

}


let palabrasEncontradas = 0;
// Ahora el juego busca las 10 palabras clave del cuento largo
const totalPalabrasClave = 10; 

function evaluarPalabra(elemento) {
    // Si la palabra ya fue encontrada (está en verde), ignorar nuevos clics
    if (elemento.classList.contains('bien')) return;

    if (elemento.classList.contains('correcta')) {
        elemento.classList.remove('incorrecta');
        elemento.classList.add('bien');
        
        palabrasEncontradas++;
        document.getElementById('contador-claves').innerText = palabrasEncontradas;
        
        console.log("¡Excelente! Encontraste una palabra clave.");

        // Condición de éxito al juntar las 10 palabras
        if (palabrasEncontradas === totalPalabrasClave) {
            setTimeout(() => {
                alert("¡Felicidades, maestro de la lectura! Has explorado toda la historia, encontrado las 10 palabras clave y completado este desafío con éxito.");
                // Aquí colocas la función que tengas para cambiar de pantalla en tu proyecto
                // pasarSiguientePantalla();
            }, 600);
        }
    } else if (elemento.classList.contains('incorrecta')) {
        elemento.classList.add('mal');
        
        // El color rojo de error desaparece en 1 segundo para permitir reintentar
        setTimeout(() => {
            elemento.classList.remove('mal');
        }, 1000);
    }
}


/* ================================= */
/* DRAG & DROP */
/* ================================= */

const dragItems =
document.querySelectorAll(
".drag-item"
);

const dropZone =
document.querySelector(
".drop-zone"
);

let itemArrastrado = null;

dragItems.forEach(item=>{

item.addEventListener(
"dragstart",
()=>{

itemArrastrado = item;

});

});

if(dropZone){

dropZone.addEventListener(
"dragover",
e=>{

e.preventDefault();

});

dropZone.addEventListener(
"drop",
e=>{

e.preventDefault();

dropZone.appendChild(
itemArrastrado
);

});

}

/* ================================= */
/* QUIZ */
/* ================================= */

const preguntas = [

{
pregunta:
"¿Qué es la comprensión lectora?",

opciones:[
"Leer rápido",
"Entender lo que se lee",
"Copiar textos",
"Memorizar palabras"
],

correcta:1
},

{
pregunta:
"¿Qué es una idea principal?",

opciones:[
"Un detalle pequeño",
"La información más importante",
"Una imagen",
"Un dibujo"
],

correcta:1
},

{
pregunta:
"¿Quién era el protagonista del cuento?",

opciones:[
"Pedro",
"Mateo",
"Ana",
"Sofía"
],

correcta:1
},

{
pregunta:
"¿Qué encontró Mateo?",

opciones:[
"Una pelota",
"Una nota",
"Una bicicleta",
"Un mapa"
],

correcta:1
},

{
pregunta:
"¿Qué enseñaba la nota?",

opciones:[
"Mentir",
"Pelear",
"Esforzarse",
"Esconderse"
],

correcta:2
},

{
pregunta:
"¿Por qué es importante leer?",

opciones:[
"Porque sí",
"Para aprender",
"Para correr",
"Para dormir"
],

correcta:1
},

{
pregunta:
"¿Qué ayuda a identificar una idea principal?",

opciones:[
"Lo más importante",
"Un detalle",
"Un dibujo",
"Un color"
],

correcta:0
},

{
pregunta:
"¿Qué palabra era clave en el cuento?",

opciones:[
"Esfuerzo",
"Mesa",
"Lápiz",
"Ventana"
],

correcta:0
},

{
pregunta:
"¿Qué hizo Mateo?",

opciones:[
"Ayudó a su comunidad",
"Rompió el árbol",
"Mintió",
"Huyó"
],

correcta:0
},

{
pregunta:
"¿Qué enseñanza dejó el cuento?",

opciones:[
"El esfuerzo ayuda a lograr metas",
"No estudiar",
"No ayudar",
"Rendirse"
],

correcta:0
}

];

/* ================================= */
/* CREAR QUIZ */
/* ================================= */

const quizContainer =
document.getElementById(
"quizContainer"
);

if(quizContainer){

let html = "";

preguntas.forEach(
(p,index)=>{

html +=
`
<div class="pregunta">

<h3>
${index+1}. ${p.pregunta}
</h3>
`;

p.opciones.forEach(
(op,i)=>{

html +=
`
<div class="opcion">
<label>

<input
type="radio"
name="pregunta${index}"
value="${i}"
>

${op}

</label>
</div>
`;

});

html += "</div><hr>";

});

html +=
`
<button id="finalizarQuiz">
Finalizar evaluación
</button>
`;

quizContainer.innerHTML =
html;

setTimeout(()=>{

document
.getElementById(
"finalizarQuiz"
)
.addEventListener(
"click",
calificarQuiz
);

},100);

}

/* ================================= */
/* CALIFICAR QUIZ */
/* ================================= */

function calificarQuiz(){

let aciertos = 0;

preguntas.forEach(
(p,index)=>{

const seleccion =
document.querySelector(
`input[name="pregunta${index}"]:checked`
);

if(seleccion){

if(
parseInt(
seleccion.value
)
=== p.correcta
){

aciertos++;

}

}

});

const resultado =
document.getElementById(
"quizResultado"
);

resultado.innerHTML =

`
<h2>
Puntuación:
${aciertos}/10
</h2>
`;

if(aciertos >= 8){

estrellas += 3;

}
else if(aciertos >= 5){

estrellas += 2;

}
else{

estrellas += 1;

}

mostrarEstrellasFinales();

}

/* ================================= */
/* ESTRELLAS */
/* ================================= */

function mostrarEstrellasFinales(){

const contenedor =
document.getElementById(
"estrellasFinales"
);

if(!contenedor) return;

let html = "";

for(let i=0;i<estrellas;i++){

html += "⭐";

}

contenedor.innerHTML =

`
<h3>
Estrellas obtenidas
</h3>

<div class="estrellas">
${html}
</div>
`;

}

/* ================================= */
/* INICIO */
/* ================================= */

actualizarBarra();

actualizarSofia();