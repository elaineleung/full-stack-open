const mongoose = require('mongoose')

if ( process.argv[2].length<3 ) {
  console.log('You need to provide the password as an argument!')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-mwz7t.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (!process.argv[3] && !process.argv[4]) {
  Person.find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
} else {person.save().then(() => {
  console.log(`added ${name} number ${number} to the phonebook!`)
  mongoose.connection.close()
})
}
