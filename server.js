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

app.get('/api/notes', (req, res) => {
    const notes = readDbFile();
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = readDbFile();


newNote.id = Date.now().toString();
    notes.push(newNote);

    writeDbFile(notes);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const notes = readDbFile();
    const filteredNotes = notes.filter((note) => note.id !== noteId);

    writeDbFile(filteredNotes);
    res.json({ msg: 'Note deleted' });
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));