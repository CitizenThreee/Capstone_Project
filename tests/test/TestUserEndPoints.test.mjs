import request from 'supertest';
import { expect } from 'chai';
import app from '../../backend/server.js';

describe('Endpoint Testing', () => {
    // Test for signin
    describe('POST /users/signin', () => {
        it('should sign in a user with valid credentials', (done) => {
            request(app)
                .post('/users/signin')
                .send({ email: 'albeisly@gmail.com', password: 'abc12' }) // Replace with existing user credentials
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });

        it('should return 404 for non-existent user', (done) => {
            request(app)
                .post('/users/signin')
                .send({ email: 'nonexistent@example.com', password: 'password1' })
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return 400 for missing credentials', (done) => {
            request(app)
                .post('/users/signin')
                .send({ email: 'test@example.com' }) // Missing password
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    // Test for createUser
    describe('POST /users', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/users')
                .send({ email: 'newuser2@example.com', cEmail: 'newuser2@example.com', password: 'password1', cPassword: 'password1', fname: 'John', lname: 'Doe', phone: '1234567890', location: 'Somewhere' })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });

        it('should return 400 for invalid user input', (done) => {
            request(app)
                .post('/users')
                .send({ email: 'newuser@example.com' }) // Missing other required fields
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    // Test for getUser
    describe('GET /users/:userId', () => {
        it('should get a specific user', (done) => {
            const userId = '668f7b3a268b7495f89c76fb'; // Replace with a valid userId
            request(app)
                .get(`/users/${userId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });
    });

    // Test for updateUser
    describe('PUT /users/:userId', () => {
        it('should update a specific user', (done) => {
            const userId = '668f7b3a268b7495f89c76fb'; // Replace with a valid userId
            request(app)
                .put(`/users/${userId}`)
                .send({ fname: 'Jane' }) // Update first name
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data.fname).to.equal('Jane');
                    done();
                });
        });
    });

    // Test for deleteUser
    describe('DELETE /users/:userId', () => {
        /*it('should delete a specific user', (done) => {
            const userId = '668f82ae2d5596f32e99a330'; // Replace with a valid userId
            request(app)
                .delete(`/users/${userId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('data');
                    done();
                });
        }); */
    });
  });