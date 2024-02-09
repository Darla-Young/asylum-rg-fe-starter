import React from 'react';
import { colors } from '../../../../styles/data_vis_colors';

const { background_color } = colors;

function TableInnerSquare(props) {
  const { innerData, rowHeight } = props;
  return (
    <div
      className="table-inner-square"
      style={{
        backgroundColor: background_color,
        border: '1px solid lightgray',
        height: rowHeight,
        overflow: 'hidden',
        padding: '2%',
        width: '100%',
        flex: '1',
      }}
    >
      {innerData}
    </div>
  );
}

export default TableInnerSquare;
