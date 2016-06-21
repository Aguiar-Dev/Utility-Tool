/* global beforeEach:true afterEach:true */
/* eslint no-undef: "error" */

// Unit Test Dependancies and Requires
const chai = require('chai');
chai.use(require('chai-fs'));
const expect = require('chai').expect;
const util = require('../src/util');
const sinon = require('sinon');
const fs = require('fs');
const rimraf = require('rimraf');

// Setting up global variables
const path = './log/';
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

  // Test for 'log' directory creation
  it('| Should create the log dir if dir !exist', (done) => {
    // rimraf module to delete log directory for test
    rimraf(path, (err) => {
      if (err) throw err;

      // Create new dir through the util.log then verify that is exists
      util.log('Log dir !exist', '', '\nCreating log dir.\n');
      expect(path).to.be.a.directory();
      done();
    });
  }); // end dir test

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

  // Test for console logs export to logfile
  it('| Should export to logs file', (done) => {
    // Setup test data
    const test = 'Hello';
    util.debug(test);

    // Use FS module to read logfile and search for the test data
    fs.readFile(path + 'logfile.log', 'utf8', (err, data) => {
      if (err) throw err;
      expect(data).to.contain(test);
      done();
    });
    // Erase all test data from logfile
    fs.writeFile(path + 'logfile.log', '', (err) => {
      if (err) throw err;
    });
  }); // end export logs test
});
