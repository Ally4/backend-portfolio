import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import dotenv from 'dotenv';
import app from '../app';
import posts from '../dummydata/posts';

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


describe('Testing the posts', () => {
  it('user should not be able to  with no token ', (done) => {
    reader()
      .post('/posts')
      .send(posts[2])
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  it('user should not be able with a bad token ', (done) => {
    reader()
      .post('/posts')
      .set('Authorization', posts[0])
      .send(posts[2])
      .end((error, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  it('user should not be able to post with no data', (done) => {
    reader()
      .post('/posts')
      .set('Authorization', posts[4])
      .send(posts[0])
      .end((error, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  it('user should not be able to post with missing field', (done) => {
    reader()
      .post('/posts')
      .set('Authorization', token)
      .send(posts[1])
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  it('user should be able to post', (done) => {
    reader()
      .post('/posts')
      .set('Authorization', token)
      .send(posts[2])
      .end((error, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        id= res.body.post._id;
        done(error);
      });
    });
  it('user should be able to get all posts', (done) => {
    reader()
      .get('/posts')
      .set('Authorization', token)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        done(error);
      });
    });
  it('user should be able to get a post by id', (done) => {
    reader()
      .get(`/posts/${id}`)
      .set('Authorization', token)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        done(error);
      });
    });
  it('user should be able to update a post by id', (done) => {
    reader()
      .patch(`/posts/${id}`)
      .set('Authorization', token)
      .send(posts[2])
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
    });
  it('user should be able to delete a post by id', (done) => {
    reader()
      .delete(`/posts/${id}`)
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
  it('user should be able to delete a post by id', (done) => {
    reader()
      .delete(`/posts/${id}`)
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
