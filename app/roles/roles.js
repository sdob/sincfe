function makeComposableRole(role) {
  const composableRole = {
    ...role,
    // x.or(y) allows the route if profile holds role x or role y (or both)
    or: (otherRole) => ({
      ...role,
      name: `${role.name} || ${otherRole.name}`,
      isHeldBy: profile => role.isHeldBy(profile) || otherRole.isHeldBy(profile),
    }),
  };
  return composableRole;
}

const Administrator = makeComposableRole({
  name: 'Administrator',
  isHeldBy: member => member && member.is_staff,
});

const DiveOfficer = makeComposableRole({
  name: 'Dive Officer',
  isHeldBy: member => member && member.readable_committee_positions.includes('Dive Officer'),
});

const Member = makeComposableRole({
  name: 'Member',
  isHeldBy: member => member && member.id,
});


export {
  Administrator,
  DiveOfficer,
  Member,
};
