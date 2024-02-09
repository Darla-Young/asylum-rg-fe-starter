import React from 'react';
import TableInnerSquare from './TableInnerSquare';

function SubTable(props) {
  const { dataObject, rowHeight } = props;
  return (
    <div
      className="sub-table"
      style={{
        display: 'flex',
        flex: '1',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {Object.entries(dataObject).map((entry, idx) => {
        return (
          <div
            className="sub-table-inner"
            style={{
              display: 'flex',
              flex: '1',
              overflow: 'hidden',
            }}
          >
            <TableInnerSquare rowHeight={rowHeight} innerData={entry[0]} />
            <TableInnerSquare rowHeight={rowHeight} innerData={entry[1]} />
          </div>
        );
      })}
    </div>
  );
}

export default SubTable;
