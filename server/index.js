const express = require ('express');
const app = express();


app.get('/', (req, res) => {
	res.send({ hi: 'there'});
});

//if there isn't already defined variable, use 5000 as port
const PORT = process.env.PORT || 5000;

app.listen(PORT);