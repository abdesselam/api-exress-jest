import { NextFunction, Request, Response } from "express";
import {Todo,TodoWithId, Todos} from "./todos.model";
import {InsertOneResult} from 'mongodb'
import { ZodError } from "zod";

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
        const validateResult = await Todo.parseAsync(req.body);
        const insertResult = await Todos.insertOne(validateResult);
        if(!insertResult.acknowledged) throw new Error('Error insering todo.')
        res.json({
            _id: insertResult.insertedId,
            ...validateResult
        });
    } catch (error) {
        next(error);
    }
    
}