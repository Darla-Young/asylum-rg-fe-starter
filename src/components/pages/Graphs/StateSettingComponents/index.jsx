import React from 'react';
import GraphWrapper from '../GraphsPage';
import 'antd/dist/antd.css';

function OfficeRoute(props) {
  const { set_view, set_office, office } = props;
  console.log('OfficeRoute', office);
  return (
    <div
      className="office-route"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <GraphWrapper
        set_view={set_view}
        set_office={set_office}
        office={office}
      />
    </div>
  );
}

export default OfficeRoute;
