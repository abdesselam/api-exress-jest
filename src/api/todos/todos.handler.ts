import { NextFunction, Request, Response } from "express";
import {Todo,TodoWithId, Todos} from "./todos.model";

export async function findAll(req: Request,res: Response<TodoWithId[]>, next: NextFunction) {
    try {
        const resulte = await Todos.find();
        const todos = await resulte.toArray();
        res.json(todos);
    } catch (error) {
        next(error);
    }
    
}

export async function createOne(req: Request<{},TodoWithId,Todo>,res: Response<TodoWithId>, next: NextFunction) {
    try {
        const validateResult = await Todo.parse(req.body)
    } catch (error) {
        next(error);
    }
    
}