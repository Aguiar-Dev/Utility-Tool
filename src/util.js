// Setting up all requirements for the tool
const moment = require('moment');
const colors = require('colors');
const fs = require('fs');
const dir = './log';
let logstatus;

// Setting local colors theme for the logging
colors.setTheme({
  info: 'green',
  good: 'blue',
  header: 'yellow',
  error: 'red',
  data: 'cyan',
});

// The Logging functionality of the utility tool (meant to substitute console.log)
exports.log = (title, data, status) => {
  // Sets up all information to be displayed with colors on console.
  const obj = JSON.stringify(data);
  const now = moment().format();
  let seperator = '\n=================================================\n'.info;
  let output = seperator + ('[' + now + ']: ').good + title.header + seperator;

  /* eslint-disable */
  console.log(output, colors.data(obj), status);
  /* eslint-enable */

  // Creates Logs folder if it does not already exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Resets all data to original values, without color modifications
  seperator = '\n=================================================\n';
  output = seperator + '[' + now + ']: ' + title + seperator;
  const log = output + obj + logstatus;
  // Appends the log to the log.txt file
  fs.appendFile('log/logfile.log', log, (err) => {
    /* istanbul ignore if */
    if (err) throw err;
  });
};

// The Dubugging functionality
// checks either empty, undefined, or correct formatting
exports.debug = (data) => {
  // setting up local variables
  let info;
  let passing = true;

  // Check if data passed is undefined or not
  if (data !== undefined) {
    // if Checks if data passed is empty / Else if checks for data in the correct format
    if (Object.keys(data).length === 0 || data.length === 0) {
      passing = true;
    } else if (Object.keys(data).length > 0 || data.length > 0) {
      passing = false;
    } // end if/else
  } else {
    // Setting up the undefined data response
    logstatus = '\nData was undefined.\n';
    this.log('Data Check ?', data, '\nData was undefined.\n'.error);
    return null;
  } // end if/else

  // Sets up the response for either empty or correct data
  if (passing === true) {
    logstatus = '\nData was empty.\n';
    info = this.log('Data Check -', data, '\nData was empty.\n'.error);
  } else {
    logstatus = '\nData was passed correctly.\n';
    info = this.log('Data Check +', data, '\nData was passed correctly.\n'.good);
  } // end if/else
  return info;
};
