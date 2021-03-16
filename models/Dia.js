const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiaSchema = new Schema(
  {
    Date: {
      type: Date,
      required: true,
    },
    Class: {
      type: String,
      required: true,
    },
    Students: {
        type: Array,
        required: true,
    }
  },
  { timestamps: true }
);

const Dia = mongoose.model("Dia", DiaSchema);

module.exports = Dia;
