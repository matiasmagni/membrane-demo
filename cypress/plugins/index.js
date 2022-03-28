const webpack = require('@cypress/webpack-preprocessor');
const gmail = require('gmail-tester');
const CONFIG = require('../../config.json');

module.exports = on => {
  const options = {
    webpackOptions: require('../../webpack.config.js')
  };

  on('file:preprocessor', webpack(options));

  on('task', {
    'gmail:check': async args => {
      const { from, to, subject } = args;
      const emails = await gmail.check_inbox(
        CONFIG.gmail.credentials,
        CONFIG.gmail.token,
        subject,
        from,
        to,
        10, // Poll interval (in seconds)
        30, // Maximum poll interval (in seconds). If reached, return null, indicating the completion of the task().
      );

      return emails;
    }
  });
};
