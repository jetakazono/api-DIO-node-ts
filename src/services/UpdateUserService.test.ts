import  createConnection  from '../database';
import { getConnection } from 'typeorm';
import {UpdateUserService} from './UpdateUserService';
import { FakeData } from '../utils/FakeData/FakeData'

describe('UpdateUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query('DELETE FROM users');
        await connection.close();
    })

    const fakeData = new FakeData();

    it('Deve editar nome do usuario', async () =>{
       const mockUser = await fakeData.creatUser();

        const updateUserService = new UpdateUserService();

        const result = await updateUserService.excute({
            id:mockUser.id,
            name:'mudei o nome'
        });

        expect(result).toHaveLength(0);
    })

})