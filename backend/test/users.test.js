import mongoose from "mongoose";
import { userModel } from '../src/models/users.models.js';
import Assert from 'assert'
import 'dotenv/config'

const assert = Assert.strict

await mongoose.connect(process.env.MONGO_URL)

describe('Test CRUD de Usuarios en la ruta api/users', function () {
   
    before(() => {
        console.log("Arrancando el test")
    })

   
    beforeEach(() => {
        console.log("Comienza test!")
    })
    
   
    it('Obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find()
        assert.strictEqual(Array.isArray(users), true)
    })

   
    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('65522f69703b5ce26b637e3e')
   
        assert.ok(user._id)
    })

   
    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
            first_name: "Celeste",
            last_name: "Galvez",
            email: "celeste@galvez.com",
            password: "celes123"
        }
        const user = await userModel.create(newUser)
        assert.ok(user._id)
    })
    
   
    it('Actualizar un usuario mediante metodo PUT', async () => {
        const udpateUser = {
            first_name: "Maria",
            last_name: "Valdez",
            email: "maria@mort.com",
            password: "mort123"
        }
        const user = await userModel.findByIdAndUpdate("65a276c0128afe2aa9472c70", udpateUser)
        assert.ok(user._id)
    })
    
   
    it('Eliminar un usuario mediante metodo DELETE', async () => {
        const resultado = await userModel.findByIdAndDelete("65a2749a463b6e861d4f7aa8")
        assert.strictEqual(typeof resultado, 'object')
    })
})