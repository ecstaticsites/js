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

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}
