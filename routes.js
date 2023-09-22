const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url, method);

  switch (url) {
    case "/":
      return handleRootRoute(req, res);
    case "/users":
      return handleUsersRoute(req, res);
    default:
      break;
  }

  if (url === "/create_user" && method == "POST") {
    return handleCreateUserPost(req, res);
  }
};

function handleCreateUserPost(req, res) {

  //empty bucket to collect the request post data.
  const body = [];

  //'on' method on request will listen for event and executes associated callback when event occured.
  //we are interested in 'data' and 'end' event, 'data' events triggers when there is data in the stream.
  //'end' triggers when stream of data in request is finishes.

  req.on("data", (data) => {
    body.push(data);
  });
  return req.on("end", () => {
    //concat method collects all the received data chunk by chunk basis into one.
    const parsedBody = Buffer.concat(body).toString();
    const userName = parsedBody.split("=")[1];
    console.log("username : " + userName);

    res.setHeader("Content-Type", "text/html");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  });
}

function handleUsersRoute(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  res.write("<html>");
  res.write("<head><title>Welcome to My Page</title></head>");
  res.write("<body>");
  res.write("<h1>Users</h1>");
  res.write("<ul>");
  for (let i = 0; i < 5; i++) {
    res.write(`<li>Users : ${i}</li>`);
  }
  res.write("</ul>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
}

const handleRootRoute = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Welcome to My Page</title></head>");
  res.write("<body>");
  res.write("<h1>Hello there!</h1>");
  res.write("<h3>Welcome to my NodeJs page.</h3>");
  res.write("<h4>Enter your name</h4>");
  res.write("<form action='/create_user' method= 'post'>");
  res.write("<input type = text name = 'username'>");
  res.write("<button type = 'submit'>Send</button>");
  res.write("</form>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
};

module.exports = {
  handler: requestHandler,
};
