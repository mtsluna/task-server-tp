import defaultRouter from "./api/infrastructure/routes/index"
const express = require("express");
const morgan = require('morgan')
const cors = require('cors');

const router = express();

const port = process.env.PORT || 8080;

router.use(cors());
router.listen(port, () => {
    console.log(`Server listen on port: ${port}`);
    router.use(express.json())
    router.use(morgan("dev"))
    router.use('/api', defaultRouter)
})
