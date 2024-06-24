const assert = require('assert');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Adjust the path as necessary
const User = require('../models/User');

chai.use(chaiHttp);

describe('Users API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  /**
   * Test the GET route
   */
  describe('GET /worko/user', () => {
    it('It should GET all the users', (done) => {
      chai.request(app)
        .get('/worko/user')
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.strictEqual(Array.isArray(res.body.users), true);
          assert.strictEqual(res.body.users.length, 0);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe('GET /worko/user/:userId', () => {
    it('It should GET a user by ID', (done) => {
      const user = new User({ email: 'test@test.com', name: 'Test User', age: 30, city: 'Test City', zipCode: '12345' });
      user.save((err, savedUser) => {
        chai.request(app)
          .get(`/worko/user/${savedUser.id}`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.user._id, savedUser.id);
            assert.strictEqual(res.body.user.email, savedUser.email);
            assert.strictEqual(res.body.user.name, savedUser.name);
            assert.strictEqual(res.body.user.age, savedUser.age);
            assert.strictEqual(res.body.user.city, savedUser.city);
            assert.strictEqual(res.body.user.zipCode, savedUser.zipCode);
            done();
          });
      });
    });
  });

  /**
   * Test the POST route
   */
  describe('POST /worko/user', () => {
    it('It should POST a new user', (done) => {
      const newUser = {
        email: 'test@test.com',
        name: 'Test User',
        age: 30,
        city: 'Test City',
        zipCode: '12345'
      };
      chai.request(app)
        .post('/worko/user')
        .send(newUser)
        .end((err, res) => {
          assert.strictEqual(res.status, 201);
          assert.strictEqual(res.body.email, newUser.email);
          assert.strictEqual(res.body.name, newUser.name);
          assert.strictEqual(res.body.age, newUser.age);
          assert.strictEqual(res.body.city, newUser.city);
          assert.strictEqual(res.body.zipCode, newUser.zipCode);
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  describe('PUT /worko/user/:userId', () => {
    it('It should UPDATE a user given the ID', (done) => {
      const user = new User({ email: 'test@test.com', name: 'Test User', age: 30, city: 'Test City', zipCode: '12345' });
      user.save((err, savedUser) => {
        chai.request(app)
          .put(`/worko/user/${savedUser.id}`)
          .send({
            email: 'updated@test.com',
            name: 'Updated User',
            age: 35,
            city: 'Updated City',
            zipCode: '54321'
          })
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.email, 'updated@test.com');
            assert.strictEqual(res.body.name, 'Updated User');
            assert.strictEqual(res.body.age, 35);
            assert.strictEqual(res.body.city, 'Updated City');
            assert.strictEqual(res.body.zipCode, '54321');
            done();
          });
      });
    });
  });

  /**
   * Test the DELETE route
   */
  describe('DELETE /worko/user/:userId', () => {
    it('It should DELETE a user given the ID', (done) => {
      const user = new User({ email: 'test@test.com', name: 'Test User', age: 30, city: 'Test City', zipCode: '12345' });
      user.save((err, savedUser) => {
        chai.request(app)
          .delete(`/worko/user/${savedUser.id}`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.msg, 'User deleted successfully');
            done();
          });
      });
    });
  });
});
