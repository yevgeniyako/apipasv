import supertest from 'supertest';
import { expect } from 'chai';

import { config } from 'dotenv';
config();

describe('auth', function() {
    const request = supertest(process.env.BASE_URL);
    it('successful log in', function() {
        request
            .post('/auth')
            .send({ login: process.env.LOGIN, password: process.env.PASSWORD })
            .send({ login: 'adminius', password: 'supers3cret' })
            .end(function(err, res) {
                expect(res.statusCode).to.eq(200);
                expect(res.body.token).not.to.be.undefined;
            });
    });

it('log in with wrong credentials should return error', function() {
    request
        .post('/auth')
        .send({ login: 'wrong', password: 'wrong' })
        .end(function(err, res) {
            expect(res.statusCode).to.eq(404);
            expect(res.body.message).to.eq('Wrong login or password.');
        });
    })
});

