import React from 'react';

function Tick(props) {
  const { value } = props;
  return (
    <div
      className="vertical-bar-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '30px',
        transform: 'translateY(5px)',
      }}
    >
      <div
        style={{
          borderRight: '1.5px solid green',
          height: '100%',
          width: '0px',
        }}
      ></div>
      <p
        style={{
          lineHeight: '0px',
          fontSize: '0.75rem',
          height: '0px',
          width: '0px',
          transform: 'translate(-10px,10px)',
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default Tick;
