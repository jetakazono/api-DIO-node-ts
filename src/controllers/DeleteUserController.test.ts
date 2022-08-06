import createConncetion from '../database';
import { getConnection } from "typeorm";
import { makeMockRequest } from '../utils/mocks/mockRequest';
import { makeMockResponse } from '../utils/mocks/mockResponse';
import { FakeData } from '../utils/FakeData/FakeData';
import { DeleteUserController } from './DeleteUserController';

describe('DeleteUserController', () => {

    beforeAll(async () => {
        const connection = await createConncetion();
        connection.runMigrations();
    })

    afterAll(async () => {
        const conncetion = getConnection()
        conncetion.close()
    })

    const fakeData = new FakeData();

    it('Deve retornar status 404 quando o usuario for deletado', async() =>{

        const mockUser = await fakeData.creatUser();

        const deleteUserController = new DeleteUserController();

        const request = makeMockRequest({
            params:{
                id: mockUser.id
            }
        });

        const response = makeMockResponse();

        await deleteUserController.handle(request, response)
    })
})
