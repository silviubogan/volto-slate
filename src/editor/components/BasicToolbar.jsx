import cx from 'classnames';
import React from 'react';
import Menu from './Menu';

const BasicToolbar = React.forwardRef(
  ({ className, onMouseUp, ...props }, ref) => {
    return (
      <Menu
        {...props}
        ref={ref}
        className={cx(className, 'slate-toolbar')}
        onMouseUp={onMouseUp}
      />
    );
  },
);

export default BasicToolbar;
