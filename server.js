const express = require('express');
const { projectManagerRouter } = require('./routes/projectRoutes');


const app = express();

app.use(express.json())
app.use('/projects', projectManagerRouter)

app.use((err,req,res,next)=>{
    res.json({Error: err})
})

app.listen(4500,()=>{
    console.log('server running on port 4500')
})