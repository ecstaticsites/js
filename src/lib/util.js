export function canonicalizeFile(filename) {
  // even browsers on windows use a forward-slash in these, thank god
  let slashIdx = filename.search("/");
  if (slashIdx == -1) {
    console.error("bad thing happened, no slash in filename?", filename);
    return filename;
  }
  return filename.slice(slashIdx + 1);
}

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

export function fixedLength(str, len) {
  return str.substring(0, len).padEnd(len, "·")
}
