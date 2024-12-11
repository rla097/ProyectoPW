const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/save-user', (req, res) => {
    const user = req.body;
    const filePath = './public/users.json';

    fs.readFile(filePath, (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        users.push(user);
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving user data');
            }
            res.send('User data saved successfully');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});