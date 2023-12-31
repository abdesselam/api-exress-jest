import { NextFunction, Request, Response } from "express";
import {Todo,TodoWithId, Todos} from "./todos.model";
import {InsertOneResult} from 'mongodb'
import { ZodError } from "zod";
import {ObjectId} from 'mongodb'
import { ParamsWithId } from "../../interfaces/ParamsWithId";

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
        const insertResult = await Todos.insertOne(req.body);
        if(!insertResult.acknowledged) throw new Error('Error insering todo.')
        res.json({
            _id: insertResult.insertedId,
            ...req.body
        });
    } catch (error) {
        next(error);
    }
    
}

export async function findOne(req: Request<ParamsWithId,TodoWithId,{}>,res: Response<TodoWithId>, next: NextFunction) {
    try {
        const result = await Todos.findOne({
            _id: new ObjectId(req.params.id)
        })
        if(!result){
            res.status(404);
            throw new Error(`Todo with id ${req.params.id} not found.`)
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
}