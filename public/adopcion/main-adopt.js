const server = "http://localhost:3005/adopciones" //llamamos la api que estamos renderizando dentro de nustro servidor.
async function setImage() { //seguidamente creamos una funcion asincrona para renderizalo en el html
    const response = await fetch(server) //renderizamos la api que nos envia nuestro server
    const data = await response.json() //por las dudas renderizamos en .json nuevamente
    data.forEach(element => { //creamos un loop foreach para poder renderizar cada una de las imagenes
        let img = document.createElement("img"); //creamos el elemento img en el html usando javascript
        img.src = element.image.url; //le agregamos src a nuestro elemento y renderizamos por la url de cada img
        img.className = ("img-perros") //le agregamos una clase a nuestro elemento img

        let h2 = document.createElement("h2")  //Creamos el elemento h2 en el html usando javascript
        h2.innerHTML = "Raza: " + element.name + "<br/>" + " Edad: " + element.life_span //renderizamos el nombre y la edad de cada perro.

        let cardsCont = document.getElementById("cards") //llamamos a el div del html ya creado.
        let creaDiv = document.createElement("div"); //Creamos un div en el html  
        creaDiv.setAttribute('class', element.name); //le damos una class card-adopt al div creado anteriormente
        creaDiv.classList.add('cards-Razas')

        let select = document.getElementById("raza"); //obtenemos el select con el id 
        let option = document.createElement("option") //creamos una variable con el elemento option
        option.setAttribute('class', 'option-select') //le agregamos la clase option-select al option
        option.setAttribute('value', element.id)
        option.innerHTML = element.name //le pasamos los datos name de la api para renderizarlo por "raza"

        let button = document.createElement('button')
        button.setAttribute('class', 'btn-adopt')
        button.innerText = "Addopt me";

        let parrafo = document.createElement("p");
        parrafo.setAttribute('class', 'texto-p');
        parrafo.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam natus excepturi odio nesciunt tempora odit! Rem, recusandae. Numquam consequuntur ullam, laboriosam"

        
        select.appendChild(option) //renderizamos el option en el select
        cardsCont.appendChild(creaDiv) //renderizamos el div creado con javascript dentro del div ya creado en el index
        creaDiv.appendChild(img) //lo renderizamos en el html.
        creaDiv.appendChild(h2)// renderizamos el h2
        creaDiv.appendChild(parrafo)
        creaDiv.appendChild(button)
    
    });
}
setImage() //llamamos a la funcion para renderizar las imagenes

//Comienza el Filtrado por razas.
async function filtros() {
    var selectFilter = document.getElementById('raza');
    var filtro = selectFilter.value ;
    const response = await fetch(server + '/' + filtro)
    const datos = await response.json()
    console.log(datos)
    datos.forEach(datosNuevos => {
        let cardNueva = document.getElementById('cards-razas')
        let imgNueva = document.getElementById('img-nueva')
        
          imgNueva.src = datosNuevos.url;
          imgNueva.classList.add('img-perros')
          cardNueva.appendChild(imgNueva)
    })


   

    let cardNueva = document.getElementById('cards-razas')
    let cards = document.getElementById("cards")
    cards.className = ('cards-none')
    if (filtro == 0) {
        cards.className= ('cards')
        cardNueva.className =('cards-none')
    }
    
    if (filtro != 0 ){
        cardNueva.className = ('card-nueva')
    }
    
}