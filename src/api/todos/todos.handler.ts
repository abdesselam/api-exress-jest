import { Request, Response } from "express";
import {TodoWithId, Todos} from "./todos.model";

export async function findAll(req: Request,res: Response<TodoWithId[]>) {
    const resulte = await Todos.find();
    const todos = await resulte.toArray();
    res.json(todos);
}