import React from 'react';

const Separator = ({ onMouseUp }) => {
  return (
    <span
      className="separator"
      onMouseUp={onMouseUp}
      role="presentation"
    ></span>
  );
};

export default Separator;
