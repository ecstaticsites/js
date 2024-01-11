import bb, { bar, donut } from 'billboard.js';
import dayjs from 'dayjs';
import { fixedLength } from './util.js'

// this function is kinda mystifying to me even though I wrote it
// seems to work for both categorical and timeseries data
// so I'm just gonna leave it alone for now
function influxToBillboard(influx) {

  if (influx["results"] === undefined) {
    return [];
  }

  // todo, any kind of error handling around this
  let series = influx["results"][0]["series"];

  let names = series.map((s) => Object.values(s["tags"])[0]);
  names = names.map((n) => (n == "") ? "(none)" : fixedLength(n, 15));

  let values = series.map((s) => s["values"].map((v) => v[1]));
  names.forEach((name, index) => values[index].unshift(name));

  let ticks = series.map((s) => s["values"].map((v) => v[0]))[0];
  ticks.unshift("x");

  return [ticks, ...values]
}

function timeseriesData(influx) {

  let columns = influxToBillboard(influx);

  return {
    "x" : "x",
    "columns": columns,
    "groups": [columns.map(x => x[0])],
    "type": bar(),
  }
}

function categoricalData(influx) {

  let columns = influxToBillboard(influx);

  return {
    "x" : "x",
    "columns": columns,
    "groups": [columns.map(x => x[0])],
    "type": donut(),
  }
}

function timeseriesAxis(bucketby) {
  return {
    "x": {
      "type": "timeseries",
      // "label": {
      //   "text": "Your X Axis",
      //   "position": "outer-center",
      // },
      "tick": {
        "format": (s) => dayjs.unix(s).format((bucketby == "1h") ? 'H:mm' : 'MMM D'),
      },
    },
    "y": {
      "tick": {
        "format": (s) => (Math.floor(s) === s) ? Math.floor(s) : "",
      },
      "label": {
        "text": "Site Hits",
        "position": "outer-middle",
      },
    },
  }
}

export function renderBillboard(chartId, variety, bucketby, influx) {
  if (variety == "timeseries") {
    return {
      "bindto": `#${chartId}`,
      "data": timeseriesData(influx),
      "axis": timeseriesAxis(bucketby),
      "legend": {
        "show": true,
      },
    }
  } else if (variety == "donut") {
    return {
      "bindto": `#${chartId}`,
      "data": categoricalData(influx),
      "axis": timeseriesAxis(bucketby),
      "legend": {
        "show": true,
        "position": "right",
      },
      "donut": {
        "expand": false,
        "label": {
          "show": false,
        },
      },
    }
  }
}
