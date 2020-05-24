const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attackSchema = new Schema(
  {
    _id: String,
    description: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
    },
    x_mitre_platforms: {
      type: [String],
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

function addAttacks(path) {
  const data = require(path);

  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    // phase_name

    var attack = new Attack(obj.objects[0]);
    const phase_name = obj.objects[0].kill_chain_phases[0].phase_name;
    attack.phase_name = phase_name;
    attack._id = attack.id;
    attack.save((err) => {
      if (err) {
      }
    });
  }
}

addAttacks('../merged_file.json');

module.exports = Attack;
