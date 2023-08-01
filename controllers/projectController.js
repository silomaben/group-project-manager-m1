const {v4} = require('uuid');
const mssql = require ('mssql');
const { createProjectsTable } = require('../Database/Tables/createTables');
const { sqlConfig } = require('../config/config');


const projects = [];

// class project{
//     constructor(id,title,decription,startdate,enddate,status){
//         this.id = id
//         this.title = title
//         this.decription = decription
//         this.startdate = startdate
//         this.enddate = enddate
//         this.status = status
//     }
// }

const createNewProject = async (req,res)=>{
    try {

        console.log("inside");

        createProjectsTable()
        const id = v4();
        const currentTime = new Date();
        const {title,description,enddate} = req.body

        const pool = await mssql.connect(sqlConfig)

        console.log(id);

        if(pool.connected){
            const result = await pool.request()
            .input('id',mssql.VarChar, id)
            .input('title', mssql.VarChar,title)
            .input('description', mssql.VarChar, description)
            .input('startdate', mssql.Date, currentTime)
            .input('enddate', mssql.Date, enddate)
            .execute('createNoteProcedure')

            if(result.rowsAffected==1){
                return res.json({
                    message: "Project created successfully"
                })
            }else{
                return res.json({message: "Project creation failed"})
            }

        }

        // const newNote = new notebook(id,note_title,content,currentTime);

        // notes.push(newNote)

        res.json({
            message: "Note created sucessfully",
            note: newNote
        })
        
    } catch (error) {
        
    }
}


const viewOneProject = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
const viewAllProjects = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
const updateProject = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
const deleteProject = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    createNewProject,
    viewAllProjects,
    viewOneProject,
    updateProject,
}