export function influxToBillboard(raw) {

  if( raw["results"] === undefined ) {
      return [];
  }

  // todo, any kind of error handling around this
  let series = raw["results"][0]["series"];


  let names = series.map((s) => Object.values(s["tags"])[0]);
  names = names.map((n) => (n == "") ? "(none)" : n);
  let values = series.map((s) => s["values"].map((v) => v[1]));
  names.forEach((name, index) => values[index].unshift(name));

  let ticks = series.map((s) => s["values"].map((v) => v[0]))[0];
  ticks.unshift("x");

  return [ticks, ...values]
}

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
