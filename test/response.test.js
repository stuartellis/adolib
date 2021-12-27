'use strict';

const assert = require('assert');

const response = require('../src/response');

describe('response#validateData()', function() {
  
  it('should return response if response has data', async function() {
    const reply = { data: 'anything' };
    const validatedReply = await response.validateData(reply);
    assert.deepEqual(validatedReply, reply);
  });

  it('should reject if response does not have data', async function() {
    const reply = {};
    const validatedReply = () => response.validateData(reply).error();
    assert.rejects(validatedReply, reply);
  });

});

describe('response#validateStatus()', function() {
  const successCodes = [200, 201, 204];

  successCodes.forEach((code) => {
    it(`should return response if status is ${code}`, async function() {
      const reply = { status: code };
      const validatedReply = await response.validateStatus(reply);
      assert.deepEqual(validatedReply, reply);
    });
  });

  const errorCodes = [401, 403, 404, 500];

  errorCodes.forEach((code) => {
    it(`should reject if status is ${code}`, async function() {
      const reply = { status: code, config: { method: 'GET', url: 'https://example.com' } };
      const validatedReply = () => response.validateStatus(reply).error();
      assert.rejects(validatedReply, reply);
    });
  });

});
