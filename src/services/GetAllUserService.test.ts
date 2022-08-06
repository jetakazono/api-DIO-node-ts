import { getConnection } from "typeorm";
import createConnection  from "../database";
import { GetAllUserService } from "./GetAllUserService";
import { FakeData }  from '../utils/FakeData/FakeData'

describe('GetAllUserService', () =>{
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query('DELETE FROM users')
        await connection.close()
    }) 

    const fakeData = new FakeData();

    it('Deve retornar todos os usuarios cadastrados', async () => {

        await fakeData.excute()
        const expectedResponse = [
            {
                name:'um nome',
                email:'email@email.com'
            },
            {
                name:'oto nome',
                email:''
            }
        ]
        const getAllUserService = new GetAllUserService();

        const result = await getAllUserService.execute();
        expect(result).toMatchObject(expectedResponse)

    })
})