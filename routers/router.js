import { Router } from "express";
const router = Router();
import * as controller from '../controller/controller.js'

router.route('/user')
    .post(controller.addUser)
    .get(controller.getAlluser) 
router.route('/chat')
    .post(controller.saveMessage)
    .get(controller.getData) 
export default router