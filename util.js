const fs= require('fs')
const chalk= require('chalk')
const { Console } = require('console')


//add new note to file
const addNote= (title,body)=>{
var notes= loadNotes()
const duplicateNote= notes.filter((note)=>{
    return note.title==title;
})

if(duplicateNote.length==0){
    notes.push({
        title:title, 
        body: body})
        
        saveNotes(notes)
        console.log(chalk.green.inverse("New Note added"))
    }
else{
        console.log(chalk.red.inverse("note title already taken"))
    }

}

//load notes from file
var loadNotes=()=>{

    try{
    var dataBuffer=fs.readFileSync('Note.json')
    jsonStr= dataBuffer.toString();
    var jsonData= JSON.parse(jsonStr)
    return jsonData
    }
    catch(e){
        return [];
    }
}

//save the notes to file
var saveNotes=(jsonArr)=>{

   var noteData= JSON.stringify(jsonArr); 

   fs.writeFileSync('Note.json',noteData);

   console.log(chalk.green.inverse("Note Saved"))

}



// to remove notes
var removeNote=(title)=>{
var notes= loadNotes()
var notestoKeep=notes.filter((note)=>{
return note.title!=title
})

if(notestoKeep.length!=notes.length){
    console.log(chalk.green.inverse("removing note- "+ title))
    saveNotes(notestoKeep)
}
else{
    console.log(chalk.red.inverse("No Note found with title- "+ title))
}   
   
}


var readNote=(title)=>{

   var notes =loadNotes()
   var noteToRead=notes.find((note)=>note.title==title)

if(noteToRead){

    console.log(chalk.green("Title: "+ noteToRead.title +"\n"))
    console.log("Body: " + noteToRead.body)
}
else{

    console.log(chalk.red.inverse("Note not found"))
}

}

var listNote=()=>{

    const notes=loadNotes()

    notes.forEach((note)=>{
        console.log("Your Notes:-") 

        console.log(chalk.blue(note.title))
        console.log(chalk.white(note.body))
    
    })
}

module.exports= {

    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}

