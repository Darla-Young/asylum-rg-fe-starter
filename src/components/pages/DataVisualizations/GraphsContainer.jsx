import React, { useState, useRef, useLayoutEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import AllOfficesRoute from './AllOfficesRoute';
import SingleOfficeRoute from './SingleOfficeRoute';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { colors } from '../../../styles/data_vis_colors';
import {
  resetVisualizationQuery,
  setAsylumOfficeFilter,
} from '../../../state/actionCreators';
import { connect } from 'react-redux';

const { Option } = Select;
const { background_color } = colors;

const mapStateToProps = state => {
  return {
    office: state.filterReducer.asylumOffice,
  };
};

function GraphsContainer(props) {
  const { dispatch, office } = props;
  const [view, set_view] = useState('time-series');
  const history = useHistory();
  const firstUpdate = useRef(true);
  const offices = [
    'All Offices',
    'Los Angeles, CA',
    'San Francisco, CA',
    'New York, NY',
    'Houston, TX',
    'Chicago, IL',
    'Newark, NJ',
    'Arlington, VA',
    'Boston, MA',
    'Miami, FL',
    'New Orleans, LA',
  ];

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  });

  async function handle_office_select(value) {
    if (view === 'office-heat-map') {
      set_view('time-series');
    }

    if (value === 'All Offices') {
      dispatch(resetVisualizationQuery(view, value));
      await dispatch(setAsylumOfficeFilter(value));
      history.push(`/graphs/all/${view}`);
    } else {
      await dispatch(setAsylumOfficeFilter(value));
      history.push(`/graphs/${office}/${view}`);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: background_color,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginRight: '17.4%',
            height: '10vh',
            alignItems: 'center',
          }}
        >
          <Select
            style={{
              marginRight: '115px',
            }}
            placeholder="Select an Asylum Office"
            onSelect={value => handle_office_select(value)}
          >
            {offices.map((office, idx) => {
              return (
                <Option key={idx} value={office}>
                  {office}
                </Option>
              );
            })}
          </Select>
        </div>
        <Switch>
          <Route
            exact
            path="/graphs/"
            component={() => AllOfficesRoute({ set_view })}
          />
          <Route
            path="/graphs/all/:view"
            component={() => AllOfficesRoute({ set_view })}
          />
          <Route
            path="/graphs/:office/:view"
            component={() => SingleOfficeRoute({ set_view })}
          />
        </Switch>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(GraphsContainer);
