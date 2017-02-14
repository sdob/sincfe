export default function getMemberRoles(member) {
  if (!member) return [];
  const roles = member.readable_committee_positions || [];
  if (member.is_staff) {
    roles.push('Administrator');
  }
  return roles;
}
