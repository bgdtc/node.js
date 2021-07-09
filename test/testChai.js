// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // import to server.js

chai.use(chaiHttp)

describe('CHAI // CONTROLLER // ARTICLE', () => {

  // Test POST
  it(' ChaiRouter // POST ARTICLE', (done) => {
    // req.body
    const body = {
      title: 'méga pute',
      content: 'grosse pute',
      description: 'alkapute',
      checked: "on",
      author_id: '1'
    }
    // on lance la requete
    chai.request(app)
    // on défini le type de requête: post et sur quelle route
      .post('/api/v1/article')
      // il s'agit d'un formulaire
      .type('form')
      // on envoie le body 
      .send(body)
      .then(res => {
        if (res) {
          console.log(res.body.dbArticle)
          // res.body.dbArticle.should.be.a('array')
          // res.body.dbArticle[0].title.should.be.a('string')
          done();
          
        }
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
      .set("Accept", "application/json")
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
  it('GET AVIS', (done) => {
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