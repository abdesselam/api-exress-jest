import { NextFunction, Request, Response } from "express";
import {Todo,TodoWithId, Todos} from "./todos.model";
import {InsertOneResult} from 'mongodb'

export async function findAll(req: Request,res: Response<TodoWithId[]>, next: NextFunction) {
    try {
        const resulte = await Todos.find();
        const todos = await resulte.toArray();
        res.json(todos);
    } catch (error) {
        next(error);
    }
    
}

export async function createOne(req: Request<{},InsertOneResult<Todo>,Todo>,res: Response<InsertOneResult<Todo>>, next: NextFunction) {
    try {
        const validateResult = await Todo.parse(req.body)
        const insertResult = await Todos.insertOne(validateResult)
        res.json(insertResult);
    } catch (error) {
        next(error);
    }
    
}