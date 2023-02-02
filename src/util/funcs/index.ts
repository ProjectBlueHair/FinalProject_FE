export const isEmptyObj = (obj: Object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
