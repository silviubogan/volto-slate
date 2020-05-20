import React from 'react';
import { useSlate } from 'slate-react';

import { isMarkActive, toggleMark } from '../utils';
import Button from './Button';

const MarkButton = ({ format, icon, onMouseUp }) => {
  const editor = useSlate();

  return (
    <Button
      onMouseUp={onMouseUp}
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      icon={icon}
    />
  );
};

export default MarkButton;
