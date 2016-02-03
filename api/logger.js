var winston = require('winston');

module.exports = new winston.Logger({
  exitOnError: false,
  transports: [
    // Log to console, with color.
    new winston.transports.Console({
      colorize: true
    }),

    // Log to file. Use 'less' or 'tail -f' to view colorized logs.
    //
    // This transport is not necessary when using docker since docker logs
    // all output to rolling json files automatically. Try `docker logs <id>`
    //new winston.transports.File({
      //json: false,
      //colorize: true,
      //filename: '/docker/server.log'
    //})
  ]
});
