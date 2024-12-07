const renderLinks = (arr) => {
  const BASE_URL = "/api/persons/";
  return arr
    .map((x) => `<a href="${BASE_URL}${x.id}">person ${x.id}</a>`)
    .join("<br />");
};

const renderHomepage = (persons) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phonebook API</title>
</head>
<body>
  <h1>Welcome to the Phonebook API</h1>
  <p>This is the home page for the Phonebook API service.</p>

  <h2>Endpoints</h2>
  <ul>
    <li><h4><a href="/api/persons">/api/persons</a> - Get all people</h4></li>
    <li><h4><a href="/info">/info</a> - Get information about the Phonebook</h4></li>
    <li><h4><a href="/api/persons/1">/api/persons/:id</a> - Get a person by ID (person with id=1 in this case)</h4></li>
    <div>
      <h4>Try it out</h4>
      <p>Click on the links below to get information about a person:</p>
      ${renderLinks(persons)}
    </div>
  </ul>
</body>
</html>
`;

module.exports = renderHomepage;
