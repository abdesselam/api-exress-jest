import { Router,Request,Response,NextFunction} from "express";

import * as TodoHandlers from './todos.handler'
import { Todo, TodoWithId } from "./todos.model";
import { AnyZodObject, ZodError } from "zod";

const router = Router();

interface RequestValidators {
    params?: AnyZodObject,
    body?: AnyZodObject,
    query?: AnyZodObject,
}

function validateRequest(validators: RequestValidators){
return async(req: Request, res: Response ,next: NextFunction)=>{
    try {
        if (validators.params){
            req.params = await validators.params.parseAsync(req.params);
        }
        if (validators.body){
            req.body = await validators.body.parseAsync(req.body);
        }
        if (validators.query){
            req.query = await validators.query.parseAsync(req.query);
        }
        next();
    } catch (error) {
        if (error instanceof ZodError){
            res.status(422);
    }
        next(error)
    }
}
}

router.get('/',TodoHandlers.findAll);
router.post('/',TodoHandlers.createOne);

export  default router