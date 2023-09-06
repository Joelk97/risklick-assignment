export default function (string, separator = "-") {
  return string
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[^\w\-]+/g, "")
    .replace(/\_/g, separator)
    .replace(/\-\-+/g, separator)
    .replace(/\-$/g, "");
}
