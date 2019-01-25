const assert = require('chai').assert;
const server = require('../server');
const request = require('http');

require('./learning-specialist/learningSpecialist.test.js')

// describe('Server Testing', function () {
//     it('should validate if server is running', function () {
//         return server.inject({
//                 method: 'GET',
//                 url: '/'
//             })
//             .then(
//                 function (response) {
//                     assert.deepEqual(response.statusCode, 200);
//                 }
//             )
//     })
//     it('should invalidate if server is running', function () {
//         return server.inject({
//                 method: 'GET',
//                 url: '/'
//             })
//             .then(
//                 function (response) {
//                     assert.notEqual(response.statusCode, 400);
//                 }
//             )
//     })
// })