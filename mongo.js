const mongoose = require("mongoose");

const argvLength = process.argv.length;

switch (argvLength) {
  case 2:
    // MISSING PASSWORD

    console.log("Please enter the password");
    process.exit(1);

  case 3:
  case 5:
    // DO CONNECTION TO MONGODB

    const password = process.argv[2];
    const uri = `mongodb+srv://phonebook-server:${password}@cluster0.ihho6.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.set("strictQuery", false);
    mongoose.connect(uri);

    // CREATE SCHEMA AND MODEL
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Person = mongoose.model("Person", personSchema);

    // SELECT OPTIONS, GET ELEMENTS OR POST ELEMENTS
    if (argvLength === 3) {
      // DO FIND
      console.log("Phonebook:");

      Person.find({}).then((persons) => {
        persons.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    } else if (argvLength === 5) {
      // DO SAVE
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      person.save().then((result) => {
        console.log("Person saved");
        console.log(result);
        mongoose.connection.close();
      });
    }
    break;

  default:
    // INVALID CASES

    if (argvLength > 5) {
      // WRONG NUMBER OF ARGUMENTS
      console.log("Invalid number of arguments");
      console.log("If the person's name has spaces, use double quotes");
      process.exit(1);
    } else {
      // MISSING DETAILS
      console.log("Missing details");
      console.log("Please make sure to provide the person's name and number");
      process.exit(1);
    }
}
