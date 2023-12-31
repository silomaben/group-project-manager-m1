const mssql = require ('mssql');
const { sqlConfig } = require('../config/config');

const completeProject = async(req,res)=>{
    try {
        const {project_id, user_id} = req.body
        const currentTime = new Date();

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const pool_result = await pool.request()
            .input('project_id',mssql.VarChar, project_id)
            .input('user_id', mssql.VarChar,user_id)
            .execute('completeProjectProc')

            console.log(pool_result);


            // if(pool_result.rowsAffected == 1){
            //     return res.json({
            //         message: "Project status in now completed"
            //     })
            // }else{
            //     return res.json({message: "Project status update failed"})
            // }
    
        }

        return res.json({
            message: "Project status in now completed"})

        
    } catch (error) {
        return res.json({Error: error.message})
    }
}


module.exports = {
    completeProject
}