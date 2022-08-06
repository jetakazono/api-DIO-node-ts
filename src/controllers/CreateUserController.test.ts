import { getConnection } from 'typeorm'
import createConnection from '../database'
import {CreateUserController} from './CreateUserController'
import { Request } from 'express'
import { makeMockResponse } from '../utils/mocks/mockResponse'

describe('CreateUserController', () => {
    beforeAll(async () => { 
        const connection = await createConnection();
        await connection.runMigrations()
    })
    afterAll (async () =>{
        const connection = await getConnection()
        await connection.query('DELETE FROM users');
        await connection.close();
    })

    const createUserController = new CreateUserController()

    const response = makeMockResponse()
    
    it('Deve retornar o status 201 quando o ususario for criado',async () => {

        const request = {
            body: {
                name :'Algum usuario',
                email: 'email@email.com'
            }
        } as Request


        await createUserController.handle(request, response)
        expect(response.state.status).toBe(201);
    })
    it('Deve retornar status 400 quando o nome nao for informado', async () =>{
        const request = {
            body: {
                name :'',
                email: 'email@email.com'
            }
        } as Request

        await createUserController.handle(request, response)
        expect(response.state.status).toBe(400);
    })
    it('Deve informar status 201 quando o email nao for informado', async() =>{
        const request = {
            body: {
                name :'outro usuario',
                email: ''
            }
        } as Request

        await createUserController.handle(request, response)
        expect(response.state.status).toBe(201);
    })
})