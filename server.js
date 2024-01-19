const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbFilePath = path.join(__dirname, 'db/db.json');

function readDbFile() {
    const notesRaw = fs.readFileSync(dbFilePath);
    return JSON.parse(notesRaw);
}

function writeDbFile(notes) {
    fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2));
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));