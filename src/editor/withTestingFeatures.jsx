import React from 'react';

const withTestingFeatures = (slateEditorComponent) => {
  const Component = slateEditorComponent;

  return (props) => {
    // Source: https://stackoverflow.com/a/53623568/258462
    const onTestSelectWord = (val) => {
      let slateEditor =
        val.detail.parentElement.parentElement.parentElement.parentElement;

      // Events are special, can't use spread or Object.keys
      let selectEvent = {};
      for (let key in val) {
        if (key === 'currentTarget') {
          selectEvent['currentTarget'] = slateEditor;
        } else if (key === 'type') {
          selectEvent['type'] = 'select';
        } else {
          selectEvent[key] = val[key];
        }
      }

      // Make selection
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(val.detail);
      selection.removeAllRanges();
      selection.addRange(range);

      // Slate monitors DOM selection changes automatically
    };

    React.useEffect(() => {
      document.addEventListener('Test_SelectWord', onTestSelectWord);

      return () => {
        document.removeEventListener('Test_SelectWord', onTestSelectWord);
      };
    });

    return <Component {...props} />;
  };
};

export default withTestingFeatures;
