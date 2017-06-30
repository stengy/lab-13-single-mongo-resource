'use strict';

const mongoose = require('mongoose');
const Team = require('./team.js');

const memberSchema = mongoose.Schema({
  callsign: {type: String, required: true, unique: true},
  position: {type: String, required: true},
  combatRole: {type: String, required: true},
  team: {type:mongoose.Schema.Types.ObjectId, required: true, ref: 'team'},
});

memberSchema.pre('save', function(next) {
  Team.findById(this.team)
  .then(team => {
    let teamIdSet = new Set(team.members);
    teamIdSet.add(this._id);
    team.members = Array.from(teamIdSet);
    return team.save();
  })
  .then(() => next())
  .catch(() => next(new Error('validation failed because team does not exist')));
});

memberSchema.post('remove', function(doc, next){
  Team.findById(doc.team)
  .then(team => {
    team.members = team.members.filter(member => member._id !== doc._id);
    return team.save();
  })
  .then(() => next())
  .catch(next);
});


module.exports = mongoose.model('member', memberSchema);
