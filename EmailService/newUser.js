const ejs = require("ejs");
const mssql = require("mssql");
const { sendMail } = require("../Helpers/email");
const { sqlConfig } = require("../config/config");

const welcomeAboard = async (user) => {
  const pool = await mssql.connect(sqlConfig);

  if (pool.connected) {
    console.log("connected connected to db");
    const users = (
      await pool
        .request()
        .query(`SELECT email FROM usersTable WHERE issent = 0`)
    ).recordset;
    console.log(users);

    for (let user of users) {
      ejs.renderFile(
        "./Templates/welcomeUser.ejs",
        { email: user.email },
        async (err, html) => {
          const message = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Welcome Aboard",
            html,
          };
          try {
            
            await sendMail(message);
            await pool
              .request()
              .query(
                `UPDATE usersTable SET issent = 1 WHERE email = '${user.email}'`
              );
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  }else{
    console.log('not connected to db');
  }
};

module.exports = {
  welcomeAboard,
};

