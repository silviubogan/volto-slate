import React from 'react';

import LinkButton from './LinkButton';
import { withLinks } from './extensions';
import { LinkElement } from './render';
import { LINK } from './constants';

export default function install(config) {
  const { slate } = config.settings;

  slate.elements[LINK] = LinkElement;
  slate.extensions = [...(slate.extensions || []), withLinks];

  slate.buttons.link = (props) => <LinkButton {...props} />;
  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'link'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'link',
  ];

  return config;
}
