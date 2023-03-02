import { Router } from "express";
import { userModel } from "../models/user.js";

const routerUser = Router()

routerUser.get("/", async(req, res)=>{
    try{
        const users = await userModel.find()
        res.send({resultado: 'success', users: users})
    }catch(error){
        res.send("error en consulta de usuarios, mensaje:", error.message)
    }
})

export default routerUser