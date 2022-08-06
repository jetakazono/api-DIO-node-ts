import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService'
import {v4 as uuid} from 'uuid';

class CreateUserController{
   async handle(req : Request, res: Response) {

        const createUserSercice = new CreateUserService();
        
        const id = uuid();  
        const name = req.body.name;
        const email = req.body.email;

        if(name.length === 0){
            return res.status(400).json({mensagem: 'Preencha todos os campos'});
        }

        const user = await createUserSercice.execute({id, name, email});
        return res.status(201).json(user);
    }
}

export { CreateUserController };