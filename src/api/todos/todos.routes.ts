import { Router, Request, Response } from "express";
import {TodoWithId, Todos} from "./todos.model";
import * as TodoHandlers from './todos.handler'

const router = Router();

router.get('/',TodoHandlers.findAll)

export  default router