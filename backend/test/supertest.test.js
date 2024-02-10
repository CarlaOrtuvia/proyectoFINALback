import mongoose from 'mongoose'
import supertest from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'
//Lo comento porque no tengo un archivo "__dirname.js". Este lo utilizó el profesor para poder subir una imagen. Yo debería importar "path.js"
//import __dirname from '../src/__dirname.js'

const requester = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL)









describe('Test Users Session api/session', function () {
    let cookie = {}

    //1) Registrar/Crear un nuevo usuario para agregarlo a la base de datos
    it("Ruta: api/session/register con metodo POST", async () => {
        const newUser = {
            first_name: "Celeste",
            last_name: "Galvez",
            email: "Celeste@celeste.com",
            password: "1234"
        }
        const { _body } = await requester.post('/api/sessions/register').send(newUser)
        expect(_body.payload).to.be.ok
    })

    //2) Iniciar sesión
    it("Ruta: api/session/login con metodo POST", async () => {
        const user = {
            email: "Celeste@celeste.com",
            password: "1234"
        }
        const resultado = await requester.post('/api/sessions/login').send(user)
        const cookieResult = resultado.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok
        //clave = valor
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }
        expect(cookie.name).to.be.ok.and.equal('coderCookie')
        expect(cookie.value).to.be.ok
    })

    //3) Verificar que el correo en la respuesta de la API sea igual al proporcionado por el usuario
    it("Ruta: api/session/current con metodo GET", async () => {
        const { _body } = await requester.get('/api/sessions/current')
            .set('Cookie', [`${cookie.name} = ${cookie.value}`])
        console.log(_body.payload)
        expect(_body.payload.email).to.be.equal('Celeste@celeste.com')
    })

})