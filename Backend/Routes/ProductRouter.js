const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();



router.get('/', ensureAuthenticated, (req,res)=>{


    res.status(200).json([
        {
            name:"lava agni 3",
            price:10000
        },{
        name: "iphone 14 pro max",
        price:100000}
    ])
})

module.exports = router;