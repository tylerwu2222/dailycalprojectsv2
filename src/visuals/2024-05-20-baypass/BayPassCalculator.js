import React, { useState, useEffect } from 'react'

// components
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  InputAdornment
} from '@mui/material'
import {
  MapContainer,
  CircleMarker,
  Polyline,
  TileLayer,
  // Tooltip,
  Popup
} from 'react-leaflet';

// data
import BART_lines from './data/BART_lines_ordered_stops.json';
import BART_stops from './data/BART_stops_leaflet.json';
import BART_fares from './data/BART_fares.json';
// import BART_stops_ordered from './data/BART_stops_by_line_ordered.json';
// import BART_stops_leaflet

// styles
import "leaflet/dist/leaflet.css";
import './BayPassCalculator.css';


// bay pass fare option parameters
const bayPassFareMin = 200;
const bayPassFareMax = 350;
const bayPassFareIncrement = 5;
// const bayPassFareDefault = 105;
const bayPassFareDefault = 270;
let bayPassFares = [];
for (let i = bayPassFareMin; i <= bayPassFareMax; i += bayPassFareIncrement) {
  bayPassFares.push(i);
}

// line parameters
const lineNames = Object.keys(BART_lines);
// console.log('lineNames', lineNames);
// line colors (taken from official BART map)
const lineColors = [
  '#ABA682',
  '#019CDB',
  '#4EB849',
  '#FAA61A',
  '#ED1C24',
  '#FFE802',
];

const lineNameColorDict = lineNames.reduce((acc, key, index) => {
  acc[key] = lineColors[index];
  return acc;
}, {});

// stop parameters
const BART_stops_info = BART_stops.info;
// get bart stop names from stops data
let BART_stop_names = BART_stops_info.map(s => s.Name);
BART_stop_names.sort();// sort names alphabetically
// create dict of stops names to ids
let BART_stop_name_id_dict = {};
for (const obj of BART_stops_info) {
  BART_stop_name_id_dict[obj.Name] = obj.id;
}

export default function BayPassCalculator() {
  // const [operator, setOperator] = useState('BART');
  const [isMobile, setIsMobile] = useState(false);

  // input states
  const [frequency, setFrequency] = useState('1');
  const [origin, setOrigin] = useState('Downtown Berkeley');
  const [destination, setDestination] = useState('Embarcadero');
  const [roundTrip, setRoundTrip] = useState(true);

  // output states
  const [fare, setFare] = useState(2.3); // weekly fare cost w/o BayPass
  const [bayPassAnnualFare, setBayPassAnnualFare] = useState(bayPassFareDefault); // Bay Pass annual cost
  const [bayPassWeeklyFare, setBayPassWeeklyFare] = useState(bayPassFareDefault / 52); // Bay Pass weekly cost
  const [amountSaved, setAmountSaved] = useState(0);
  const [worthIt, setWorthIt] = useState(false);
  // path states
  const [tripPathCoordinates, setTripPathCoordinates] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);

  // plotting parameters
  const centerLat = (BART_stops.minLat + BART_stops.maxLat) / 2;
  const distanceLat = BART_stops.maxLat - BART_stops.minLat;
  const bufferLat = distanceLat * 0.25;
  // const bufferLat = 0;
  const centerLong = (BART_stops.minLong + BART_stops.maxLong) / 2;
  const distanceLong = BART_stops.maxLong - BART_stops.minLong;
  const bufferLong = distanceLong * 0.25;
  // const bufferLong = 0;

  // EFFECTS
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // when origin, destination, or frequency changes, update non-BayPass fare
  useEffect(() => {
    // calculated fare = fare for one trip * frequency * round_trip or not
    const calculatedFare = Math.round(BART_fares[origin][destination] * frequency * (+roundTrip + 1) * 100) / 100;
    setFare(calculatedFare);
  }, [origin, destination, frequency, roundTrip]);

  // when BayPass annual fare changes, update BayPass weekly fare
  useEffect(() => {
    const num_weeks = 52;
    const calculatedFare = Math.round(bayPassAnnualFare / num_weeks * 100) / 100;
    setBayPassWeeklyFare(calculatedFare);
  }, [bayPassAnnualFare]);

  // when fare or bay pass weekly fare changes, check if still worth (and amount saved)
  useEffect(() => {
    const calculatedDifference = Math.round((fare - bayPassWeeklyFare) * 100) / 100;
    setAmountSaved(calculatedDifference);
    setWorthIt(bayPassWeeklyFare <= fare);
  }, [fare, bayPassWeeklyFare]);

  // function that finds all stops between stop1 (ID) and stop2 (ID) for line (name)
  const findBetweenStops = (line, stop1, stop2) => {
    const selectedLineStops = BART_lines[line];
    // console.log('finding between stops for', line, 'between', stop1, 'and', stop2, 'from', selectedLineStops);
    // get stops in order
    const index1 = selectedLineStops.indexOf(stop1);
    const index2 = selectedLineStops.indexOf(stop2);
    const startIndex = Math.min(index1, index2);
    const endIndex = Math.max(index1, index2);
    const stopSequence = selectedLineStops.slice(startIndex, endIndex + 1);
    // console.log('found stop sequence', stopSequence);
    return stopSequence;
  }

  // algorithm that finds shortest path between start and end stations
  function findShortestPath(startStation, endStation) {
    const priorityQueue = [{ path: [startStation], distance: 0, lines: new Set() }];
    const visited = new Set([startStation]);
    let shortestPath = null;

    while (priorityQueue.length > 0) {
      const { path, distance, lines } = priorityQueue.shift();
      const currentStation = path[path.length - 1];

      if (currentStation === endStation) {
        if (!shortestPath || distance < shortestPath.distance) {
          shortestPath = { path, distance, lines: Array.from(lines) }; // Convert Set to array
        }
        continue;
      }

      for (const line in BART_lines) {
        if (BART_lines[line].includes(currentStation)) {
          const currentIndex = BART_lines[line].indexOf(currentStation);
          const nextStations = [];

          // Add previous station if exists
          if (currentIndex > 0) {
            nextStations.push(BART_lines[line][currentIndex - 1]);
          }

          // Add next station if exists
          if (currentIndex < BART_lines[line].length - 1) {
            nextStations.push(BART_lines[line][currentIndex + 1]);
          }

          for (const nextStation of nextStations) {
            if (!visited.has(nextStation)) {
              const newPath = [...path, nextStation];
              const newDistance = distance + 1; // Assuming equal weight for all edges
              const newLines = new Set(lines); // Create a new set with existing lines
              newLines.add(line); // Add the current line to the set
              priorityQueue.push({ path: newPath, distance: newDistance, lines: newLines });
              visited.add(nextStation);
            }
          }
        }
      }
    }

    if (shortestPath) {
      const segmentedPath = shortestPath.lines.map(line => {
        const stops = shortestPath.path.filter(station => BART_lines[line].includes(station));
        return { line, stops };
      });
      return segmentedPath;
    } else {
      return null;
    }
  }

  // when origin or destination changes, update tripPathCoordinates
  useEffect(() => {
    // find path from origin to destination
    const findPath = () => {
      let originID = BART_stop_name_id_dict[origin];
      let destinationID = BART_stop_name_id_dict[destination];
      // if origin + destination same, no path
      if (originID === destinationID) {
        setSelectedLines([]);
        setTripPathCoordinates([]);
        setFare(0);
      }
      // otherwise draw path
      else {
        // first check if can draw path with one line
        const linesWithOriginDestination = Object.entries(BART_lines)
          .filter(([line, stops]) => stops.includes(originID))
          .filter(([line, stops]) => stops.includes(destinationID))
          .map(([line, stops]) => line);
        // if so, use that line
        let selectedLines, coordinatesSequences;
        if (linesWithOriginDestination.length > 0) {
          selectedLines = [linesWithOriginDestination[0]];
          const stopSequence = findBetweenStops(selectedLines, originID, destinationID);
          // get coordinates and set to drawn path array
          coordinatesSequences = [stopSequence.map(stop => {
            const coords = BART_stops_info.find(obj => obj.id === stop)['Location']
            return [coords.Latitude, coords.Longitude].map(str => Number(str))
          })];
        }
        // else, find shortest path with 2 lines
        else {
          const sharedLines = findShortestPath(originID, destinationID);
          // console.log('shortest path', sharedLines);
          selectedLines = sharedLines.map(segment => segment.line);
          coordinatesSequences = sharedLines.map(segment => segment.stops).map((stops) => {
            return stops.map(stop => {
              const coords = BART_stops_info.find(obj => obj.id === stop)['Location']
              // console.log('coords', coords);
              return [coords.Latitude, coords.Longitude].map(str => Number(str))
            })
          });
        }
        // console.log('sl', selectedLines);
        // console.log('cs', coordinatesSequences);
        setSelectedLines(selectedLines);
        setTripPathCoordinates(coordinatesSequences);

      }
    }
    findPath();
  }, [origin, destination]);

  const BayPassControls = () => {
    return (
      <div className='bp-controls-div'>
        {/* operator */}
        {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Operator</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={operator}
            onChange={(e) => { setOperator(e.target.value) }}
            label="Operator"
          >
            <MenuItem value={'AC'}>AC Transit</MenuItem>
            <MenuItem value={'BART'}>Bay Area Rapid Transit (BART)</MenuItem>
          </Select>
        </FormControl> */}

        {/* frequency */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Trip frequency</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            label="Frequency"
          >
            <MenuItem value={'0.25'}>One per month</MenuItem>
            <MenuItem value={'0.5'}>Two per month</MenuItem>
            <MenuItem value={'1'}>One per week</MenuItem>
            <MenuItem value={'2'}>Two per week</MenuItem>
            <MenuItem value={'3'}>Three per week</MenuItem>
            <MenuItem value={'4'}>Four per week</MenuItem>
            <MenuItem value={'5'}>Five per week</MenuItem>
            <MenuItem value={'6'}>Six per week</MenuItem>
            <MenuItem value={'7'}>Daily</MenuItem>
          </Select>
        </FormControl>

        {/* trip origin */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Origin</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            label="Origin"
          >
            {BART_stop_names.map(name => <MenuItem value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>

        {/* trip destination */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Destination</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            label="Destination"
          >
            {BART_stop_names.map(name => <MenuItem value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControlLabel
          // value={roundTrip}
          control={<Checkbox
            checked={roundTrip}
            onChange={() => { setRoundTrip(!roundTrip) }}
          />}
          label="Round trip?"
          labelPlacement="start"
        />

        {/* calculated fare */}
        <div className="bp-fare-output">
          <div className='bp-fare-output-grid'>
            <p>Weekly cost without BayPass: </p>
            <p><b>${fare}</b></p>
            <p>Weekly cost with BayPass: </p>
            <p><b>${bayPassWeeklyFare}</b></p>
            <p>Each week, you would {worthIt ? <>save</> : <>lose</>}:</p>
            <p><b className={worthIt ? 'green-text' : 'red-text'}>${worthIt ? amountSaved : -amountSaved}</b></p>
          </div>

          <p>Bay Pass {worthIt ? <b className='green-text'>would</b> : <b className='red-text'>would not</b>} be worth it. {fare === 0 ? <span>(but you should go out more!)</span> : null}</p>
        </div>

        <div>
          <p className='bp-map-note'><b>Note:</b> The $270 reference point for BayPass is based on the current <a href="https://campuslifeserviceshome.ucsf.edu/transportation/faq-student-transit-pass" target='_blank'>transit fee</a> for UCSF students.</p>
          <p className='bp-map-about-data'><b>About the data:</b> The data was obtained from <a href="https://511.org/open-data" target="_blank">511.org</a> and <a href="https://www.transit.wiki/BART_fares" target='_blank'>tranist.wiki</a>.</p>
        </div>

      </div>)
  };

  const BayPassMap = () => {
    return (
      <div className='bp-map-div'>
        {/* MAP VIZ */}
        {
          <MapContainer
            scrollWheelZoom={false}
            dragging={isMobile ? false : true}
            minZoom={9}
            zoom={isMobile ? 9 : 10}
            center={[centerLat, centerLong]}
            bounds={[
              [
                BART_stops.minLat - bufferLat,
                BART_stops.minLong - bufferLong
              ],
              [
                BART_stops.maxLat + bufferLat,
                BART_stops.maxLong + bufferLong
              ]
            ]}
          >
            {/* create plot for points to appear on */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
            />
            {/* BART stops */}
            {BART_stops_info.map((stop, k) => {
              // console.log('location', stop['Location']['Latitude'])
              return (
                // <g className={k + '-circle'}>
                <CircleMarker
                  key={k}
                  center={[stop['Location']['Latitude'], stop['Location']['Longitude']]}
                  radius={4}
                  stroke={true}
                  weight={1}
                  fill={true}
                  color='#000'
                  opacity={0.9}
                  fillColor={'#000'}
                  data={stop}
                >
                  {/* point hover popup */}
                  <Popup>
                    <div style={{ fontWeight: 500, fontSize: '16px' }}>
                      <p><span
                      // style={{ color: valuation_color_dict[stop['Building Type']][100000] }}
                      >{stop['Name']}</span>
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
                // </g>
              )
            })
            }
            {/* BART lines */}
            {selectedLines.map((line, index) => {
              return <Polyline pathOptions={{ color: lineNameColorDict[line] }} positions={tripPathCoordinates[index]} />
            })
            }
          </MapContainer>
        }
      </div>
    );
  };


  return (
    <div className='bp-calculator-div' id='bp-calculator-div'>
      <div className='bp-title-div'>
        <h2>BayPass Fare Calculator for BART</h2>
        {/* <h4>Is it worth it?</h4> */}
      </div>
      <p>
        <span>Enter your riding habits to see if a </span>
        {<FormControl>
          <TextField
            // label="Bay Pass Annual Cost"
            id="standard-select"
            select
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            value={bayPassAnnualFare}
            // step={5}
            onChange={(e) => setBayPassAnnualFare(e.target.value)}
            variant="standard"
            size="small"
          >
            {bayPassFares.map((fare) => (
              <MenuItem key={fare} value={fare}>
                {fare}
              </MenuItem >
            ))}
          </TextField>
        </FormControl>}
        <span> per year BayPass would be worth purchasing.</span></p>
      <div className='bp-calculator-viz-div'>
        {/* interactive map */}
        <BayPassMap />
        {/* map inputs */}
        <BayPassControls />
      </div>
    </div >

  )
}
