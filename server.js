const express = require('express')
const path = require('path')
const app = express();
 
window.localStorage.setItem('env', process.env.ENVIRONMENT || 'local');
app.use(express.static(__dirname + '/dist/caderneta-front'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/caderneta-front/index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
    console.log('Server running');
});