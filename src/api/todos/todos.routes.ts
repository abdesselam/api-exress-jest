import { Router, Request, Response } from "express";
import {TodoWithId, Todos} from "./todos.model";

const router = Router();

router.get('/',async (req: Request,res: Response<TodoWithId[]>)=>{
    const resulte = await Todos.find();
    const todos = await resulte.toArray();
    res.json(todos)
})

export  default router