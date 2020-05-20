import cx from 'classnames';
import React from 'react';

const Menu = React.forwardRef(({ className, onMouseUp, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cx(className, 'slate-menu')}
      onMouseUp={onMouseUp}
      role="menu"
      tabIndex={0}
    ></div>
  );
});

export default Menu;
