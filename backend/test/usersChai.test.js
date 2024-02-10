import mongoose from 'mongoose'
import { expect } from 'chai'
import { userModel } from '../src/models/users.models.js'

await mongoose.connect(process.env.MONGO_URL)





describe('Test CRUD Users con chai en api/users', function () {

    //1)
    it('Obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find()
     
        expect(users).not.to.be.deep.equal([]) //
    })

    //2)
    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('')
        expect(user).to.have.property('_id')
    })

    //3)
    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
            first_name: "Celeste",
            last_name: "Galvez",
            email: "Celeste@celeste.com",
            password: "1234"
        }
        const user = await userModel.create(newUser)
        expect(user).to.have.property('_id')
    })

    //4)
    it('Actualizar un usuario mediante metodo PUT', async () => {
        const udpateUser = {
            first_name: "Martina",
            last_name: "Valdez",
            email: "Martina@martina.com",
            password: "4567"
        }
        const user = await userModel.findByIdAndUpdate("", udpateUser)
        expect(user).to.have.property('_id')
    })

    //5)
    it('Eliminar un usuario mediante metodo DELETE', async () => {
        const resultado = await userModel.findByIdAndDelete("")
        expect(resultado).to.be.ok
    })
})