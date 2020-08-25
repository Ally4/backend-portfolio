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




describe('Testing the posts', () => {
  it('user should not be able to  with no token ', (done) => {
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
  });
