let assert = require('assert');
const { query } = require("../server.js");  





describe("MOCHA // CRUD // ARTICLE", () => {
    let user = {};
    
    beforeEach((done) => {
        let rand = Math.floor(Math.random() * 100);
        let values = ["bitch",  "tfxdd721", "ea@il.mfe9l", "fmepasse"]
        let sql = `INSERT INTO user (full_name, nickname, email, password) VALUES ('test${rand}', 'tutu${rand}', 'me${rand}@f.fr', 'passss')`;

        query(sql, [values], function(err, data, fields) {
            if(err) throw err;
            user.id = data.insertId;
            done();
        });
    });
    //sample
    it("SAMPLE", (done) => {
        done();
    });
    //test post
    it("POST USER", (done) => {
        let values = ["jedanmarc", "jeanddu72", "mal@dzefgr.fr", "paaswprd"];
        let sql = `INSERT INTO user (full_name, nickname, email, password) VALUES (?)`;

        query(sql, [values], function(err, data) {
            if(err) throw err;
            assert(data)
            done();
        });
    });

    //get all user
    it("get all user", (done) => {
        let sql = `SELECT * FROM user`;
        query(sql, (data, err) => {
            if (err) console.log(err);
            console.log(data);
            done();
        });
    });
    //get id user
    it("get id user", (done) => {
        let sql = `SELECT * FROM user WHERE id = 1`;

        query(sql, function(err, data) {
            if (err) throw err;
            assert(data)
            done();
        });
    });
    //edit put user
    it("put user", (done) => {
        let sql = `UPDATE user
                   SET full_name = 'bibite',
                       nickname  = 'culcul',
                       email     = 'cul@bite.couille',
                       password  = 'culbitecouille'
                    WHERE id = 1`;
        query(sql, function(err, data) {
            if (err) throw err;
            console.log(data)
            assert(data)
            done();
        });
    });
    //delete id
    it("delete id user", (done) => {
        let sql = `DELETE FROM user WHERE id = 1`
        query(sql, function(err, data, fields){
            if(err) throw err;
            assert(data);
            console.log(fields);
            console.log(data);
            done();
        })
    })
    //delete all
    it("delete all user", (done) => {
        let sql = `DELETE FROM user`;
        query(sql, function(err, data, fields) {
            if(err) throw err;
            assert(data)
            done();
        });
    });
});