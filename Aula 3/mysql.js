const  mysql = require ('mysql2');

const pool = mysql.createConnection ({
    "user" :"root",
    "password" :"root",
    "database" : "idev3", 
    "host" : "localhost", 
     "port" : "3306"
})

exports.execute = (query, param = [], varPool=pool) => {
    return new Promise((resolve, reject) => {
        varPool.query(query, param, (error, result) => {
            if(error){
                reject;
            }else{
                resolve(result);
            }
        });
    });
}

exports.pool = pool;