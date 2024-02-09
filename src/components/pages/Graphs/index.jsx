import { connect } from 'react-redux';
import { useHistory, Route } from 'react-router-dom';
import { setVisualizationData } from '../../../state/actionCreators';
import GraphWrapper from './GraphsPage';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { colors } from '../../../styles/data_vis_colors';

const { Option } = Select;
const { background_color } = colors;

const mapStateToProps = state => {
  return {
    office: state.vizReducer.currentOffice,
    offices: state.vizReducer.offices,
    view: state.vizReducer.view,
  };
};

function GraphsContainer(props) {
  const { office, offices, view } = props;
  const history = useHistory();

  const handle_office_select = value => {
    setVisualizationData(
      view === 'office-heat-map' ? 'time-series' : view,
      value
    );
    history.push(
      `/graphs/${value}/${view === 'office-heat-map' ? 'time-series' : view}`
    );
  };

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
            {Object.keys(offices).map((office, idx) => (
              <Option key={idx} value={office}>
                {office}
              </Option>
            ))}
          </Select>
        </div>
        <Route
          path="/graphs/"
          component={() => GraphWrapper({ view, office })}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(GraphsContainer);
