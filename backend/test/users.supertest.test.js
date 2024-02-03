import mongoose from 'mongoose'
import supertest from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'

const api = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL)

let userId = '65a2749a463b6e861d4f7aa8'





describe('Test CRUD de usuarios en la ruta api/users', function () {

   it('Obtener todos los usuarios mediante método GET', async () => {
        const response = await api.get('/api/users');
        expect(response.body).to.be.an('array');
    });


    it('Obtener un usuario mediante método GET', async () => {
        const response = await api.get(`/api/users/${userId}`);
        expect(response.body._id).to.be.ok;
    });


    it('Crear un usuario mediante método POST', async () => {
        const newUser = {
            first_name: 'Celeste',
            last_name: 'Galvez',
            email: 'celeste@galvez.com',
            password: 'celes123'
        };
        const response = await api.post('/api/users').send(newUser);
        expect(response.body._id).to.be.ok;
    });

    
    it('Actualizar un usuario mediante método PUT', async () => {
        const updateUser = {
            first_name: 'Maria',
            last_name: 'Valdez',
            email: 'maria@mort.com',
            password: 'maria123'
        };
        const response = await api.put(`/api/users/${userId}`).send(updateUser);
        expect(response.body._id).to.be.ok;
    });

    //5)
    it('Eliminar un usuario mediante método DELETE', async () => {
        const response = await api.delete(`/api/users/${userId}`);
        expect(response.body).to.be.an('object');
    });

});