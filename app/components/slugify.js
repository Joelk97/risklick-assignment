export default function (string, separator = "-") {
  // Returns a slug for a given string (needed for the blog titles)
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
