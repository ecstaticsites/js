import bb, { bar, donut } from 'billboard.js';
import dayjs from 'dayjs';
import { fixedLength } from './util.js'

function influxToBillboard(influx) {

  if (Object.keys(influx).length == 0) {
    return []
  }

  // this is no good! CH does not send all 24 datapoints with zeroes
  // so we'll need to write a little JS to generate ticks from the bounds
  let firstGroupKey = Object.keys(influx)[0]
  let firstGroup = influx[firstGroupKey]
  let ticks = firstGroup.map((x) => x["Time"]);
  let ticksRow = ["x", ...ticks]
  console.log(ticksRow)

  let values = [];
  for (const [groupKey, points] of Object.entries(influx)) {
    let hits = points.map((x) => x["Hits"]);
    let row = [groupKey, ...hits]
    values.push(row)
  }

  return [ticksRow, ...values]
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
        "format": (s) => dayjs.unix(s).format((bucketby == "hour") ? 'H:mm' : 'MMM D'),
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
