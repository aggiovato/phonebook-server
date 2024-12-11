// This middleware logs the request

const morgan = require("morgan");

// Add a new token
morgan.token("body", (req, res) => {
  return req.method === "POST" ? `> ${JSON.stringify(req.body)}` : "";
});

const morganLogger = morgan((tokens, req, res) => {
  const log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `- ${tokens["response-time"](req, res)} ms`,
  ];

  const body = tokens.body(req, res);
  if (body) log.push(body);

  return log.join(" ");
});

module.exports = morganLogger;
