const {AbilityBuilder, Ability} = require('@casl/ability');
const User = require('../models/user');

function defineAbilitiesFor(user) {
  const {can, cannot, rules} = new AbilityBuilder(Ability);
  can('read', 'all');
  cannot('read', User);
  can('manage', 'all', {_profiles: ['admin']});
  return new Ability(rules);
}

module.exports = defineAbilitiesFor;
