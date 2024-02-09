import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CitizenshipMap from './StateSettingComponents/Views/CitizenshipMap';
import OfficeHeatMap from './StateSettingComponents/Views/OfficeHeatMap';
import TimeSeries from './StateSettingComponents/Views/TimeSeries';
import YearLimitsSelect from './StateSettingComponents/Years/YearLimitsSelect';
import ViewSelect from './StateSettingComponents/Views/ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
// import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  let { view, office, dispatch } = props;
  const history = useHistory();

  const mapDisplay = view => {
    switch (view) {
      case 'time-series':
        return <TimeSeries office={office} />;
      case 'office-heat-map':
        return <OfficeHeatMap />;
      case 'citizenship':
        return <CitizenshipMap office={office} />;
      default:
        break;
    }
  };

  const updateState = (/*years,*/ view, office, stateSettingCallback) => {
    const url = 'https://hrf-asylum-be-b.herokuapp.com/cases';

    axios
      .get(`${url}/fiscalSummary` /**{params: {from: years[0], to: years[1]}}*/)
      .then(result => {
        console.log('fiscal summary', result);
        stateSettingCallback(view, office, result.data);
      })
      .catch(err => console.error(err));

    axios
      .get(`${url}/citizenshipSummary`)
      .then(result => console.log('citizenship summary', result))
      .catch(err => console.log(err));
  };

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
    history.push(`/graphs/`);
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {mapDisplay(view)}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateState={updateState}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
