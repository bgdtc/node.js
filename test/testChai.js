// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const app = require('../server'); // import to server.js
const path = require('path')

chai.use(chaiHttp)

describe('CHAI // CONTROLLER // ARTICLE', () => {

  // à faire en sql
  // beforeEach((done) => {
  //   Article.deleteOne({}, (err) => { 
  //     done();           
  //   });
  // });



  // Test POST
  it(' ChaiRouter // POST ARTICLE', (done) => {
    const body = {
      title: 'méga pute',
      content: 'grosse pute',
      description: 'pute',
      checked: "on",
      author_id: '1'
    }
    chai.request(app)
      .post('/api/v1/article')
      .type('form')
      .send(body)
      .then(res => {
        done();
        console.log(res.body)
      })


  })


  //  Test Put
  it(' ChaiRouter // Put Article', (done) => {
    const body = {
      title: 'Améga pute',
      content: 'Agrosse pute',
      description: 'Apute',
      checked: "on",
      author_id: '1'
    }

    chai.request(app)
      .put('/api/v1/article/65')
      .type('form')
      .set("Acccept", "application/json")
      .send(body)
      .then(res => {
        done();
        console.log(res.body)
      })


  })
  // TEST DELETE
  it(' ChaiRouter // Delete Article', (done) => {
    chai.request(app)
      .delete('/api/v1/article/65')
      .set("Accept", "application/json")
      .then(res => {
        done();
        console.log(res.body)
      })

  })

});

describe('CHAI // CONTROLLER // AVIS', () => {
  //TEST GET
  it('GET ARTICLE', (done) => {
    chai.request(app)
      .get('/api/v1/avis')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200);
        // res.should.be.a('array');
        done();
      });
  })
});