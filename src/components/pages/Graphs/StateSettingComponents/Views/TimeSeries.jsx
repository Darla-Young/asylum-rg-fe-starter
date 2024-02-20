import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';
import Table from '../../TableComponents/Table';
import { colors } from '../../../../../styles/data_vis_colors';

const { background_color } = colors;

const mapStateToProps = state => {
  let { office } = state;

  if (!office) office = 'All Offices';

  return {
    timeSeriesData: state.vizReducer.office.timeSeriesData,
  };
};

function TimeSeries(props) {
  const { office, timeSeriesData } = props;
  const currentYear = new Date().getFullYear();
  const [plotlyGraphAxis, setPlotlyGraphAxis] = useState({
    x: [2015, currentYear],
    y: [],
  });
  const [rowsForTable, setRowsForTable] = useState([]);
  useEffect(() => {
    if (timeSeriesData['dataObject'] !== undefined) {
      setPlotlyGraphAxis({
        x: timeSeriesData['dataObject']['xYears'],
        y: timeSeriesData['dataObject']['yTotalPercentGranteds'],
      });
    } else {
      setPlotlyGraphAxis({ x: [2015, currentYear], y: [] });
    }
    if (timeSeriesData.rowsForTable === undefined) {
      setRowsForTable([]);
    } else {
      setRowsForTable(timeSeriesData.rowsForTable);
    }
  }, []);

  const columnsForTable = [
    'Fiscal Year',
    'Total Cases',
    '% Granted',
    '% Admin Close / Dismissal',
    '% Denied',
  ];

  return (
    <div
      className="time-series-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
      }}
    >
      <p>Showing: Time series data for USCIS Asylum Office - ({office})</p>
      <Plot
        data={[
          {
            x: plotlyGraphAxis['x'],
            y: plotlyGraphAxis['y'],
            type: 'scatter',
            mode: 'lines+markers',
            // setting these explicitly so they are easy to change later:
            yMax: 1,
            dy: 1,
            dx: 1,
          },
        ]}
        layout={{
          title:
            office === 'All Offices'
              ? 'Asylum Grant Rate for All USCIS Asylum Offices Over Time'
              : `Asylum Grant Rate for the ${office} Asylum Office Over Time`,
          height: 500,
          width: 700,
          yaxis: {
            range: [0, 100],
            title: `Asylum Grant Rate %`,
            autotick: false,
            dtick: 10,
          },
          xaxis: {
            range: [
              plotlyGraphAxis['x'][0],
              plotlyGraphAxis['x'][plotlyGraphAxis['x'].length - 1],
            ],
            title: `Fiscal Year`,
          },
          paper_bgcolor: background_color,
          hoverlabel: {
            bordercolor: background_color,
          },
        }}
      />
      <p>Table view</p>
      <Table
        columns={columnsForTable}
        rows={rowsForTable}
        tableWidth={'100%'}
        rowHeight={'50px'}
      />
    </div>
  );
}

export default connect(mapStateToProps)(TimeSeries);
