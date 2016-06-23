// Setting up all requirements for the tool
const moment = require('moment');
const colors = require('colors');
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
exports.writer = (title, data, status, consoleMethod) => {
  // Sets up all information to be displayed with colors on console.
  const obj = JSON.stringify(data);
  const now = moment().format();
  const seperator = '\n=================================================\n'.info;
  const output = seperator + ('[' + now + ']: ').good + title.header + seperator;

  if (consoleMethod === 'log') {
    /* eslint-disable */
    console.log(output, colors.data(obj), status);
    /* eslint-enable */
  } else if (consoleMethod === 'error') {
    /* eslint-disable */
    console.error(output, colors.error(obj), status);
    /* eslint-enable */
  } else if (consoleMethod === 'warn') {
    /* eslint-disable */
    console.warn(output, colors.header(obj), status);
    /* eslint-enable */
  } else {
    /* eslint-disable */
    console.error(colors.error('You have passed a invalid method'));
    /* eslint-enable */
  }
};

// The Dubugging functionality
// checks either empty, undefined, or correct formatting
exports.debug = (data) => {
  // setting up local variables
  let info;
  let passing = true;
  if (process.env.DEBUG) {
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
      this.writer('Data Check ?', data, logstatus.error, 'error');
      return null;
    } // end if/else

    // Sets up the response for either empty or correct data
    if (passing === true) {
      logstatus = '\nData was empty.\n';
      info = this.writer('Data Check -', data, logstatus.error, 'error');
    } else {
      logstatus = '\nData was passed correctly.\n';
      info = this.writer('Data Check +', data, logstatus.good, 'log');
    } // end if/else
  }
  return info;
};
