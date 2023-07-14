const express = require('express');
const { loginRoute, userRoute, categoryRoute, blogPostRoute } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', blogPostRoute);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJFbWFpbCI6Imxld2lzaGFtaWx0b25AZ21haWwuY29tIn0sImlhdCI6MTY4OTM0NzA4MCwiZXhwIjoxNjg5OTUxODgwfQ.CJFSDcqkfASirIEEYNSPB6zoj7KTZJRwRXubfI-m_cw

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
