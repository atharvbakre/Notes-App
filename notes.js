const fs = require('fs');
const chalk = require("chalk");
const { log } = require("console");

// Add notes to JSON file
const addNotes = (title, body) => {
    notes = loadNotes();

    const duplicateNotes = notes.filter(note => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
    }else {
        console.log(chalk.red('Title already taken!'));
    }
}

// Remove notes from JSON file
const removeNote = title => {
    const notes = loadNotes();

    if(notes.length === 0){
        console.log(chalk.red('No notes found!'));
    }else{
        const newNotes = notes.filter(el => {
            if(el.title !== title) return el;
        });
        saveNotes(newNotes);
        console.log(chalk.green('Note removed!'));
    }
}

// Read a Note from JSON file
const readNotes = title => {
    const notes = loadNotes();

    if(notes.length === 0){
        console.log(chalk.red('No notes to read!'));
    }else{
        const noteToRead = notes.filter(note => note.title === title);
        console.log(chalk.blue(title));
        console.log(noteToRead[0].body);
    }
}

// List all available notes
const listNotes = () => {
    const data = loadNotes();
    if(data.length === 0) {
        console.log(chalk.red('No notes available!'));
    }else {
        console,log(chalk.inverse('Your Notes'));
        data.forEach(element => {
            console.log(element.title);
        });
    }
}

// Write notes to the JSON file 
const saveNotes = notes => {
    const data = JSON.stringify(notes);
    fs.writeFileSync('notes.json', data);
}

// Read notes from JSON file
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const data = JSON.parse(dataBuffer);
        return data;
    }catch(e) {
        return [];
    }
}

// Export the required functions to app.js
module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    readNotes: readNotes,
    listNotes: listNotes
}
