import React from 'react';
import MarkButton from './components/MarkButton';
import BlockButton from './components/BlockButton';
import Separator from './components/Separator';

import boldIcon from '@plone/volto/icons/bold.svg';
import codeIcon from '@plone/volto/icons/code.svg';
import headingIcon from '@plone/volto/icons/heading.svg';
import italicIcon from '@plone/volto/icons/italic.svg';
import listBulletIcon from '@plone/volto/icons/list-bullet.svg';
import listNumberedIcon from '@plone/volto/icons/list-numbered.svg';
import quoteIcon from '@plone/volto/icons/quote.svg';
import subheadingIcon from '@plone/volto/icons/subheading.svg';
import underlineIcon from '@plone/volto/icons/underline.svg';

const customButtons = {};

export function registerCustomButton(name, element, onMouseUp) {
  element.onMouseUp = onMouseUp;
  customButtons[name] = element;
}

export function getAvailableButton(name, onMouseUp) {
  const btns = {
    bold: <MarkButton format="bold" icon={boldIcon} onMouseUp={onMouseUp} />,
    italic: (
      <MarkButton format="italic" icon={italicIcon} onMouseUp={onMouseUp} />
    ),
    underline: (
      <MarkButton
        format="underline"
        icon={underlineIcon}
        onMouseUp={onMouseUp}
      />
    ),
    code: <MarkButton format="code" icon={codeIcon} onMouseUp={onMouseUp} />,
    'heading-two': (
      <BlockButton
        format="heading-two"
        icon={headingIcon}
        onMouseUp={onMouseUp}
      />
    ),
    'heading-three': (
      <BlockButton
        format="heading-three"
        icon={subheadingIcon}
        onMouseUp={onMouseUp}
      />
    ),
    blockquote: (
      <BlockButton
        format="block-quote"
        icon={quoteIcon}
        onMouseUp={onMouseUp}
      />
    ),
    'numbered-list': (
      <BlockButton
        format="numbered-list"
        icon={listNumberedIcon}
        onMouseUp={onMouseUp}
      />
    ),
    'bulleted-list': (
      <BlockButton
        format="bulleted-list"
        icon={listBulletIcon}
        onMouseUp={onMouseUp}
      />
    ),
    separator: <Separator onMouseUp={onMouseUp} />,
  };

  return customButtons[name] || btns[name];
}

export const defaultToolbarButtons = [
  'bold',
  'italic',
  'underline',
  'separator',
  'heading-two',
  'heading-three',
  'separator',
  'numbered-list',
  'bulleted-list',
  'blockquote',
];

export let toolbarButtons = [...defaultToolbarButtons];

export let expandedToolbarButtons = [...defaultToolbarButtons];

export const decorators = [];

export const hotkeys = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  // TODO: more hotkeys, including from plugins!
};

export const listTypes = ['numbered-list', 'bulleted-list'];

export const availableLeafs = {
  bold: ({ children }) => {
    return <strong>{children}</strong>;
  },
  code: ({ children }) => {
    return <code>{children}</code>;
  },
  italic: ({ children }) => <em>{children}</em>,
  underline: ({ children }) => <u>{children}</u>,
};

export const leafs = ['bold', 'code', 'italic', 'underline'];
