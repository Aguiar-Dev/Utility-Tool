/* global beforeEach:true afterEach:true */
/* eslint no-undef: "error" */

// Unit Test Dependancies and Requires
const chai = require('chai');
chai.use(require('chai-fs'));
const expect = require('chai').expect;
const util = require('../src/util');
const sinon = require('sinon');

// Setting up global variables
let call;

// Describe Unit Testing
describe('Utility Tool Testing', () => {
  // Before Each Test run...
  beforeEach(() => {
    call = sinon.spy(util, 'log');
  });
  // After Each Test run...
  afterEach(() => {
    call.restore();
  });

  // Test for empty objects through debug
  it('| Should console log data was empty object', (done) => {
    // Passing in empty array (can be empty object as well)
    util.debug([]);
    expect(call.args[0][2]).to.contain('Data was empty.');
    done();
  }); // end empty test

  // Test for undefined data through debug
  it('| Should console log data was undefined object', (done) => {
    // No data is passed into the debug tool
    util.debug();
    expect(call.args[0][2]).to.contain('Data was undefined.');
    done();
  }); // end undefined test

  // Test for succesful data passed in through debug
  it('| Should console log data was passed correctly', (done) => {
    // Passing in object (can be array of objects, array of items, string, etc.)
    util.debug({ apple: 'pie' });
    expect(call.args[0][2]).to.contain('Data was passed correctly.');
    done();
  }); // end succesful data test
});
