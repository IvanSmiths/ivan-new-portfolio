import React, { createContext, useState } from 'react';

export const CursorContext = createContext({
  size: 'small',
  setSize: () => {},
  visible: false,
  setVisible: () => {},
  scrollHint: true,
  setScrollHint: () => {}
});
export default function CursorManager(props) {
  const [size, setSize] = useState('small');
  const [visible, setVisible] = useState(false);
  const [scrollHint, setScrollHint] = useState(true);

  return (
    <CursorContext.Provider value={{ size, setSize, visible, setVisible, setScrollHint, scrollHint }}>
      {props.children}
    </CursorContext.Provider>
  );
}
