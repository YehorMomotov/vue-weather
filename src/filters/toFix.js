export default function toFix(value) {
  if (Number.isInteger(value)) {
    return value;
  } else {
    value = parseFloat(value);

    return value.toFixed(1);
  }
}
