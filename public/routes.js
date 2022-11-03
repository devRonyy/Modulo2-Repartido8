const express = require('express');
const router = express.Router()
const path = require('path')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //aca agregamos las constantes del fetch para poder usar el node-fetch
const api = "https://api.thedogapi.com/v1/breeds?limit=15&page=0"



router.get("/adopcion", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/adopcion/adopcion.html"))
  });
  
  router.get('/adopciones/:id', async (req, res)=> {
    const params = req.params
    async function setImageDog(){
      const response = await fetch('https://api.thedogapi.com/v1/images/search?breed_ids=' + params.id); //hacemos un fetch de la api para que nos de la api en formato como estaria en server
      const data = await response.json(); //pasamos la api a formato json 
      return data;
    }
    const response = await setImageDog()
    res.json(response)
  
  })
  
  router.get('/adopciones', (req, res) => {
    async function Setimagenes() { //creamos una funcion async para poder renderizar la api en formato json.
      const response = await fetch(api); //hacemos un fetch de la api para que nos de la api en formato como estaria en server
      const data = await response.json(); //pasamos la api a formato json 
      res.json(data) //renderizamos la api en data en formato json 
    }
    Setimagenes() //llamos al funcion que creamos el async para que funcione lo que este dentro
  })

  //router comentarios
router.get('/comentarios', (req, res) =>{
    res.sendFile(path.join(__dirname, "../public/comentarios/comentariosIndex.html"))
})

router.post('/comentarios',(req, res)=>{
    const nombre = req.body.nombre
    const comentario = req.body.comentario
  const date = new Date();
        const output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    res.json({Mensaje:` <div class = "nombre" > ${nombre}  <img src="../huella.png" class="img-coment"> </div> <div class = "comentario" > ${comentario} </div> <div class = "fecha"> ${output} </div> <div class="eliminar"><button type="button" onClick="eliminarDiv(this)"  class="btn">❌</button></div>`})
})

//router suscripcion.

router.get('/suscripcion', (req, res) =>{
  res.sendFile(path.join(__dirname, "../public/suscripcion/Suscripcion.html"))
})

router.post('/suscripcion', (req, res) =>{
  res.sendFile(path.join(__dirname, "../public/suscripcion/Suscribed.html"))
})

router.get('/error404', (req, res) =>{
  res.sendFile(path.join(__dirname, "../public/error404/error404.html"))
})

module.exports = router
