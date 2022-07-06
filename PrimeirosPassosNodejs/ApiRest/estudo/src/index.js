const http = require('http');
const { URL } = require('url');

const bodyParser = require('./helpers/bodyParser');
const sendResponse = require('./helpers/sendResponse');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(`Endpoint: ${parsedUrl.pathname} | Method: ${request.method}`);

  // pegando parametro da url
  let { pathname } = parsedUrl;
  let id = null;

  const splittedPathname = pathname.split('/').filter(Boolean);

  if (splittedPathname.length > 1) {
    pathname = `/${splittedPathname[0]}/:id`;
    id = splittedPathname[1];
  }

  // verificando se a rota é valida
  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if (route) {
    // injetando query params
    request.query = Object.fromEntries(parsedUrl.searchParams);
    // injetando parametro da url
    request.params = { id };

    //injetando funcao para retorno da response
    response.send = (statusCode, body) => sendResponse(response, statusCode, body);

    if (['POST', 'PUT'].includes(request.method)) {
      //Capturando e injetando o body das request de post e put
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () => console.log('Server started at http://localhost:3000'));