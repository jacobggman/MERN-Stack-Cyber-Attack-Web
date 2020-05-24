const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var DEFAULT_VALUE = 'NA',

const attackSchema = new Schema(
  {
    name: {
      type: String,
      default: DEFAULT_VALUE,
    },
    description: {
      type: String,
      default: DEFAULT_VALUE,
    },
    id: {
      type: String,
      unique: true,
      default: DEFAULT_VALUE,
    },
    x_mitre_platforms: {
      type: [String],
      default: DEFAULT_VALUE,
    },
    x_mitre_detection: {
      type: String,
      default: DEFAULT_VALUE,
    },
    phase_name: {
      type: String,
      default: DEFAULT_VALUE,
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
    attack.save((err) => {
      if (err) {
        throw err;
      }
    });
  }
}

addAttacks('../merged_file.json');

module.exports = Attack;
