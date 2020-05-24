const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attackSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    id: {
      type: String,
    },
    x_mitre_platforms: {
      type: String,
    },
    x_mitre_detection: {
      type: String,
    },
    phase_name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Attack = mongoose.model('Attack', attackSchema);

module.exports = Attack;
