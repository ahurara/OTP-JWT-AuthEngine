import { Router } from "express";

const router = Router();


//POST methods
router.route('/register').post((req, res)=>{    
    res.json('register route')
})


//GET methods



//PUT methods


export default router;
