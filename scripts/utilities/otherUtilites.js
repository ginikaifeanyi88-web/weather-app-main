export function isAlphaOrComma(str) {
  return /^[a-zA-Z, ]+$/.test(str);
}