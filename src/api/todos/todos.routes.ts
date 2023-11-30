import { Router, Request, Response } from "express";
import Todo from "./todos.model";

const router = Router();

router.get<{},Todo[]>('/',(req: Request,res: Response<Todo[]>)=>{
    res.json([{
        content: "Learn TypeScript",
        done: true,
    }]);
})

export  default router