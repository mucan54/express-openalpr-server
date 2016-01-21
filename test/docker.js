// test/docker.js
const url = process.env.URL ? process.env.URL : false;
const supertest = require('supertest');
const api = supertest(url);
const path = require('path');
const test = require('tape');
const base64Img = require('base64-img');

if (!url) {
  return console.log('Please spesify an url');
}

test('POST /plates', t => {

  base64Img.base64( 
  path.join(__dirname, 'norwegian-plate.jpg'), 
  (err, image) => {  
    if (err) { 
      t.fail(err);
      t.end();
    } else {
      api
      .post('/plates')
      .send({
        image:image,
        country_code: 'eu',
        pattern_code: 'no'
      })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          t.fail(err);
          t.end();
        } else {
          t.ok(res.body, 'It should have a response body');
          t.equals(res.body.plate, 'DP49829', 'It should return a correct plate number');
          t.end();
        }
      });
    }
}); 
  
});

// Ensure we get the proper 404 when trying to GET an unknown route
test('GET unknown route', t => {
  api
  .get(`/${Math.random() * 10}`)
  .expect(404)
  .end((err, res) => {
    if (err) {
      t.fail(err);
      t.end();
    } else {
      t.end();
    }
  });
});