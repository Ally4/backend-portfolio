import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import dotenv from 'dotenv';
import app from '../app';
import queries from '../dummydata/queries';

dotenv.config();

chai.use(chaiHttp);
chai.use(chaiThings);
const reader = () => chai.request(app);

let id; 


let token;

before((done) => {
  const admin = {
    email: 'admin@portfolio.com',
    password: 'admin1234',
  };
  chai.request(app).post('/auth/login')
    .send(admin)
    .end((_err, res) => {
      token = res.body.token;
      done();
    });
});


describe('Testing the queries', () => {
  it('user should not be able to post queries with no data', (done) => {
    reader()
      .post('/queries')
      .send(queries[0])
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
    it('user should not be able to post queries with missing field', (done) => {
    reader()
      .post('/queries')
      .set('Authorization', token)
      .send(queries[1])
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  it('user should be able to post queries', (done) => {
    reader()
      .post('/queries')
      .set('Authorization', token)
      .send(queries[2])
      .end((error, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        id= res.body.query._id;
        done(error);
      });
    });
  it('user should be able to get all queries', (done) => {
    reader()
      .get('/queries')
      .set('Authorization', token)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        done(error);
      });
    });
  it('user should be able to get a query by id', (done) => {
    reader()
      .get(`/queries/${id}`)
      .set('Authorization', token)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        done(error);
      });
    });
  it('user should be able to delete a query by id', (done) => {
    reader()
      .delete(`/queries/${id}`)
      .set('Authorization', token)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  it('user should not be able to get a query by id', (done) => {
    reader()
      .delete(`/queries/${id}`)
      .set('Authorization', token)
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  });

