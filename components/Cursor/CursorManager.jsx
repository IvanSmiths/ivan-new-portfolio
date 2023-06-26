import React, { createContext, useState } from 'react';

export const CursorContext = createContext({
  size: 'small',
  setSize: () => {},
  visible: false,
  setVisible: () => {},
});
export default function CursorManager(props) {
  const [size, setSize] = useState('small');
  const [visible, setVisible] = useState(false);
  return (
    <CursorContext.Provider value={{ size, setSize, visible, setVisible }}>
      {props.children}
    </CursorContext.Provider>
  );
}
