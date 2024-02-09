import React, { useState } from 'react';
import { useInterval } from '../../../../utils';

function Thumb(props) {
  const {
    thumb_key,
    snap_tick,
    bar_ref,
    thumb_ref,
    n_ticks,
    thumb_on_mouse_down,
  } = props;
  const [pos, set_pos] = useState(0);
  let my_width;
  let bar_start;
  let bar_width;
  useInterval(() => {
    my_width = thumb_ref.current.getBoundingClientRect().width;
    bar_start = bar_ref.current.getBoundingClientRect().left + window.scrollX;
    bar_width = bar_ref.current.getBoundingClientRect().width;
    set_pos(
      bar_start +
        (snap_tick * bar_width) / (n_ticks - 1) -
        Math.floor(my_width / 2)
    );
  }, 10);
  return (
    <div
      className={thumb_key}
      ref={thumb_ref}
      style={{
        zIndex: '2',
        height: '30px',
        width: '30px',
        position: 'absolute',
        left: pos + 'px',
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseDown={e => thumb_on_mouse_down(e, thumb_key)}
    >
      <div
        className="thumb_visual"
        style={{
          height: '25px',
          width: '5px',
          backgroundColor: 'gray',
        }}
      ></div>
    </div>
  );
}

export default Thumb;
