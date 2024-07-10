import bb, { bar, donut } from 'billboard.js';
import dayjs from 'dayjs';
import { fixedLength } from './util.js'

function generateAxis(start, stop, step) {

  let axis = []
  let current = start

  while (current < stop) {
    axis.push(current)
    current += step
  }

  return axis
}

function influxToBillboard(influx, startUnix, endUnix, bucketby) {

  if (Object.keys(influx).length == 0) {
    return []
  }

  let step = (bucketby == "hour") ? 3600 : 86400;
  let ticks = generateAxis(startUnix, endUnix, step);
  let ticksWithLabel = ["x", ...ticks];

  // so, this part is fun
  // the response from clickhouse won't have an entry for every time slot
  // (that's why we create a "full" x-axis just above)
  // then, for every time slot in the full axis, we need to check the CH response
  // to see if there's a value for that time slot
  // and add that value to the row if so, and 0 otherwise, to make a full row
  let values = [];
  for (const [groupKey, points] of Object.entries(influx)) {
    let row = [];
    let pointIndex = 0;
    for (var tickIndex = 0; tickIndex < ticks.length; tickIndex++) {
      if (points[pointIndex] !== undefined && points[pointIndex]["Time"] == ticks[tickIndex]) {
        row.push(points[pointIndex]["Hits"]);
        pointIndex += 1
      } else {
        row.push(0);
      }
    }
    let rowWithLabel = [groupKey, ...row]
    values.push(rowWithLabel)
  }

  return [ticksWithLabel, ...values]
}

function timeseriesData(influx, startUnix, endUnix, bucketby) {

  let columns = influxToBillboard(influx, startUnix, endUnix, bucketby);

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

export function renderBillboard(chartId, variety, startUnix, endUnix, bucketby, influx) {
  if (variety == "timeseries") {
    return {
      "bindto": `#${chartId}`,
      "data": timeseriesData(influx, startUnix, endUnix, bucketby),
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
