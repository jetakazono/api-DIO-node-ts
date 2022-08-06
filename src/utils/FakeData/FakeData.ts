import {CreateUserService} from '../../services/CreateUserService';
import {v4 as uuid} from 'uuid';

class FakeData{
    
    createUserService = new CreateUserService();

    async excute(){

        await this.createUserService.execute({
            id:uuid(),
            name:'um nome',
            email:'email@email.com'
        })
        await this.createUserService.execute({
            id:uuid(),
            name:'oto nome',
            email:''
        }) 
    }

    async creatUser(){
       const user = await this.createUserService.execute({
            id:uuid(),
            name:'um nome',
            email:'email@email.com'
        })
        return user
    }
}

export{FakeData}