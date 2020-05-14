import cx from 'classnames';
import React from 'react';
import { Icon } from '@plone/volto/components';
import { Button as UIButton } from 'semantic-ui-react';

const Button = React.forwardRef(
  ({ className, active, reversed, icon, style, ...props }, ref) => {
    style = {
      ...style,
      display: 'inline-block',
      cursor: 'pointer',
      // color: reversed
      //   ? active
      //     ? 'white'
      //     : '#888'
      //   : active
      //   ? ' black'
      //   : '#888',
    };
    return (
      <UIButton
        {...props}
        active={active}
        ref={ref}
        style={style}
        className={cx(className)}
        size="mini"
      >
        {icon ? <Icon name={icon} size="24px" /> : 'no-icon'}
      </UIButton>
    );
  },
);

export default Button;
