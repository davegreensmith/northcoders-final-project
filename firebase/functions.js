export function getInitials(fname, lname) {
  const initials = (fname[0] + lname[0]).toUpperCase();
  return initials;
}
