const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");
const Dia = require("./models/Dia");
require('dotenv').config()
const dbURI = process.env.URI_KEY;
app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 9000)

// connect to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(app.get('port'), ()=> {
      `listening to port ${app.get('port')}`
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routing Mongo

app.post("/AddStudent", (req, res) => {
  console.log(req.body);
  const student = new Student({
    name: req.body.name,
    lastName: req.body.lastName,
  });
  student
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/createClass", (req, res) => {
  console.log(req.body);

  const dia = new Dia({
    Date: req.body.Date,
    Class: req.body.Class,
    Students: req.body.Students,
  });
  dia
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/allClasses", (req, res)=> {
  Dia.find().sort({'Date':-1})
  .then(response => {
    res.send(response)
  })
  .catch(err => {console.log(err)})
})


app.get("/allStudents", (req, res) => {
  Student.find().sort({'name':1})
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/Editstudent/", (req, res) => {
  const id = req.body._id;
  const filter = {
    _id: id
  }
  const updatedInfos = {
    name: req.body.name,
    lastName: req.body.lastName,
    cards: req.body.cards
  }
  Student.findOneAndUpdate(filter, updatedInfos)
  .then(result => {
    res.redirect("/")
  })
  .catch(err => {
    console.log(err);
  })
});

app.delete("/Delstudent/:id", (req, res) => {
  const id = req.params.id;
  Student.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/Infostudent/:id", (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/Search/:name", (req, res) => {
  console.log(req.params.name);
  const nameSearch = req.params.name;
  Student.find({ name: nameSearch }, (err, findings) => {
    if (err) {
      console.log(err);
    } else {
      console.log(findings);
      res.send(findings);
    }
  });
});

app.get("/", (req, res) => {
  res.send("I am connected now");
});

app.get("/about", (req, res) => {
  res.send("I am about");
});

app.use((req, res) => {
  res.send("<h2>Err.: 404 - This page does not exist</h2>");
});
