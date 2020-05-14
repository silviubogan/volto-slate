import isHotkey from 'is-hotkey';
import cx from 'classnames';

import { createEditor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';

import { initialValue } from '../constants';
import { Element, Leaf } from '../render';
import Toolbar from './Toolbar';
import ExpandedToolbar from './ExpandedToolbar';
import { toggleMark } from '../utils';
import { settings } from '~/config';

const SlateEditor = ({
  selected,
  value,
  onChange,
  data,
  block,
  useExpandToolbar,
  placeholder,
  onKeyDown,
}) => {
  const [showToolbar, setShowToolbar] = useState(false);

  const outerDivRef = useRef(null);

  const renderElement = useCallback((props) => {
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const { slate } = settings;

  // wrap editor with new functionality. While Slate calls them plugins, we
  // use decorator to avoid confusion. A Volto Slate editor plugins adds more
  // functionality: buttons, new elements, etc.
  //
  // Each decorator is a simple
  // mutator function with signature: editor => editor
  // See https://docs.slatejs.org/concepts/07-plugins and
  // https://docs.slatejs.org/concepts/06-editor
  //
  const editor = useMemo(
    () =>
      (slate.decorators || []).reduce(
        (acc, apply) => apply(acc),
        withHistory(withReact(createEditor())),
      ),
    [slate.decorators],
  );

  useEffect(() => {
    if (selected) {
      ReactEditor.focus(editor);
    } else {
      ReactEditor.blur(editor);
    }
  }, [editor, selected]);

  return (
    <div
      ref={outerDivRef}
      className={cx('slate-editor', { 'show-toolbar': showToolbar, selected })}
    >
      <Slate editor={editor} value={value || initialValue} onChange={onChange}>
        {!showToolbar && (
          <Toolbar
            onToggle={() => setShowToolbar(!showToolbar)}
            mainToolbarShown={showToolbar}
            showMasterToggleButton={useExpandToolbar}
          />
        )}
        <div
          className={cx('toolbar-wrapper', { active: showToolbar && selected })}
        >
          {selected && showToolbar && (
            <ExpandedToolbar
              showMasterToggleButton={useExpandToolbar}
              onToggle={() => setShowToolbar(!showToolbar())}
              mainToolbarShown={showToolbar}
            />
          )}
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          spellCheck
          onKeyDown={(event) => {
            let wasHotkey = false;

            for (const hotkey in slate.hotkeys) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = slate.hotkeys[hotkey];
                toggleMark(editor, mark);
                wasHotkey = true;
              }
            }

            if (wasHotkey) {
              return;
            }

            return onKeyDown(editor, event);
          }}
        />
      </Slate>
    </div>
  );
};

export default SlateEditor;
