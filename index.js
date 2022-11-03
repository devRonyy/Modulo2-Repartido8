const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));


//Configuración.
app.set('port', process.env.PORT || 3005)

//Middlewares 
app.use('/', require('./public/routes.js'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Routes
app.use(express.static(__dirname + "/public"));
app.get('/comentarios', (req, res) => {
    res.sendFile("../public/comentariosIndex.html")
})
app.get("/adopcion", (req, res) => {
    res.sendFile("../public/adopcion/adopcion.html")
})
app.get("/suscripcion", (req, res) => {
    res.sendFile("../public/suscripcion/Suscripcion.html")
})
app.get("/suscribed", (req, res) => {
    res.sendFile("../public/suscripcion/Suscribed.html")
})


app.listen(app.get('port'), () => {
    console.log(`Server iniciado en el puerto ${app.get('port')}`)

})



