let assert = require('assert');
// const { query } = require('express');
const { query } = require("../server.js");



describe("MOCHA // CRUD // ARTICLE", () => {
    let user = {};
    let id = 0;
   
    beforeEach(async()  => {
        let rand = Math.floor(Math.random() * 100);
        let sql = `INSERT INTO user (full_name, nickname, email, password) VALUES ('test${rand}', 'tutu${rand}', 'me${rand}@f.fr', 'passss')`;
        const User = await query(sql);
        assert.ok(User.insertId)
        const userID = await query(`SELECT * FROM user WHERE id = ${ User.insertId }`)
        user = userID[0]
        // console.log(user)
        assert.strictEqual(userID[0].full_name, `test${rand}`)
        assert.strictEqual(userID[0].nickname, `tutu${rand}`)
        assert.strictEqual(userID[0].email, `me${rand}@f.fr`)
        assert.strictEqual(userID[0].password, "passss")
    });
    //sample
    it("SAMPLE", (done) => {
        done();
    });
    // test post
    it("POST USER", async() => {
        let values = ["jedanmarc", "jeanddu72", "mal@dzefgr.fr", "paaswprd"];
        let sql = `INSERT INTO user (full_name, nickname, email, password) VALUES (?)`;

        const user = await query(sql, [values]);
        assert.ok(user);
        const userID = await query(`SELECT * FROM user WHERE id = ${user.insertId}`);
        assert.strictEqual(userID[0].full_name, "jedanmarc")
        assert.strictEqual(userID[0].nickname, "jeanddu72")
        assert.strictEqual(userID[0].email, "mal@dzefgr.fr")
        assert.strictEqual(userID[0].password, "paaswprd")

    });

    //get all user
    it("get all user", async() => {
        let sql = `SELECT * FROM user`;
        const listUser = await query(sql);
        assert.ok(listUser);

        const user = await query(`SELECT * FROM user`);
        assert.strictEqual(user.length > 0, true);
    });
    //get id user
    it("get id user", async() => {
        let sql = `SELECT * FROM user WHERE id = 1`;
        const userID = await query(sql);
        assert.ok(userID)
    });
    //edit put user
    it("put user", async() => {
        let sql = `UPDATE user
                   SET full_name = 'bibite',
                       nickname  = 'culcul',
                       email     = 'cul@bite.couille',
                       password  = 'culbitecouille'
                    WHERE id = 1`;
        const user = await query(sql);
        const userID = await query(`SELECT * FROM user WHERE id = 1`)
        assert.ok(userID)
        console.log(user)
        assert.ok(user)
        assert.strictEqual(userID[0].full_name, "bibite")
        assert.strictEqual(userID[0].nickname, "culcul")
        assert.strictEqual(userID[0].email, "cul@bite.couille")
        assert.strictEqual(userID[0].password, "culbitecouille")

    });
    //delete id
    it("delete id user", async () => {
        let sql = `DELETE FROM user WHERE id = 1`
        await query(sql);
        const userID = await query(`SELECT * FROM user WHERE id = 1`);
        assert.ok(userID);
        assert.strictEqual(userID.length, 0); 
    });
    //delete all
    it("delete all user", async() => {
        let sql = `DELETE FROM user`;
        const user = await query(sql);
        const listUser = await query(`SELECT * FROM user`);
        assert.strictEqual(listUser.length, 0);
    });
});