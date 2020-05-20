import { TextBlockView, TextBlockEdit } from './TextBlock';
import codeSVG from '@plone/volto/icons/code.svg';
import * as slateConfig from './editor/config';

import installLinkPlugin from './editor/plugins/Link';
import installCalloutPlugin from './editor/plugins/Callout';
import installVoltoProposals from './futurevolto/config';

export function applyConfig(config) {
  config.blocks.blocksConfig.slate = {
    id: 'slate',
    title: 'Slate',
    icon: codeSVG,
    group: 'text',
    view: TextBlockView,
    edit: TextBlockEdit,
    restricted: false,
    mostUsed: true,
    blockHasOwnFocusManagement: false,
    sidebarTab: 0, // the Document tab
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.settings.slate = {
    ...slateConfig,
  };

  installLinkPlugin(config);
  installCalloutPlugin(config);
  installVoltoProposals(config);

  return config;
}
