import React from 'react';
import { useSlate } from 'slate-react';

import { isBlockActive, toggleBlock } from '../utils';
import Button from './Button';

const BlockButton = ({ format, icon, onMouseUp }) => {
  const editor = useSlate();

  return (
    <Button
      onMouseUp={onMouseUp}
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      icon={icon}
    />
  );
};

export default BlockButton;
