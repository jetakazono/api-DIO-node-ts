import createConnection from "../database";
import { getConnection } from "typeorm";
import { FakeData } from "../utils/FakeData/FakeData";
import { DeleteUserService } from "./DeleteUserService";


describe('DeleteUserService', () => {
    beforeAll(async () => {
        const conncetion = await createConnection();
        conncetion.runMigrations()
    })

    afterAll(async () =>{
        const conncetion = getConnection();
        await conncetion.close();
    })

    const fakedata = new FakeData();

    it('Deve retornar um array vazio qaundo o ususario for deletado ', async () =>{
        const mokeUser = await fakedata.creatUser();

        const deleteUserService = new DeleteUserService();

        const result = await deleteUserService.execute({ id: mokeUser.id })

        expect(result).toHaveLength(0)
    })
})