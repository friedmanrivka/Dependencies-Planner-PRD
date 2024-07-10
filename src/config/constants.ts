const currentYear = new Date().getFullYear();
const quarter1 = new Date(currentYear, 0, 1);
const quarter2 = new Date(currentYear, 3, 1);
const quarter3 = new Date(currentYear, 6, 1);
const quarter4 = new Date(currentYear, 9, 1);

export {
  quarter1,
  quarter2,
  quarter3,
  quarter4
};