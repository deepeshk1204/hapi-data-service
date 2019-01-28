const assert = require('chai').assert;
const server = require('../../server');
const request = require('http');

describe('Server Testing', function () {
    it('should validate if server is running', function () {
        return server.inject({
                method: 'GET',
                url: '/concierge/ls'
            })
            .then(
                function (response) {
                    console.log(JSON.parse(response.payload))
                    assert.deepEqual(response.statusCode, 200);
                }
            )
    })
})

