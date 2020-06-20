const fs= require('fs')
const yargs = require('yargs')
const chalk= require('chalk')
const { demandOption } = require('yargs')
//const { argv } = require('process')
var util= require('./util.js')
const { argv } = require('process')

// Add,remove,list,read

yargs.command({
    command: 'add',
    describe: 'adds a note',
    builder: {
        title:{
            describe:'Note title',
            demandOption:true,
            type: 'string'
        },
        body:{
            describe: 'note body',
            demandOption:true,
            type: 'string'
        }

        },
    
    handler(argv){
        //console.log("adding note" +argv.title)
        util.addNote(argv.title,argv.body)
    }
    
})

yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title:{
            decribe: 'note title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        util.removeNote(argv.title)
     }
})


yargs.command({
    command: 'list',
    describe: 'lists all the notes',
    handler() {
        util.listNote(argv.title)
    }
})


yargs.command({
    command: 'read',
    describe: 'reads your notes',
    builder: {
        title:{
            decribe: 'title of note to be read',
            demandOption: true,
            type: 'string'
            }
        },
    handler(argv) {
        util.readNote(argv.title)
    }
})

 yargs.parse()