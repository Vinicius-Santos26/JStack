function sendResponse(response, statusCode, body){
  response.writeHead(statusCode, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(body));
};

module.exports = sendResponse;