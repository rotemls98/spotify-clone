import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { usePopper } from "react-popper";
import menuStyles from "./menu.module.css";

export default function Menu({ options, referenceElement, className, open, onClose, children }) {
  const [popperElement, setPopperElement] = useState(null);
  const popper = useRef();
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    options
  );

  useEffect(() => {
    popper.current = popperElement;
  }, [popperElement]);

  useEffect(() => {
      if (open) {
        const handleClose = (e) => {
            const { target } = e;
            if (!popper.current.contains(target)) {
                e.stopPropogation && e.stopPropogation();
                onClose();
            }
        }  
        document.addEventListener('click', handleClose);
        document.addEventListener('contextmenu', handleClose);
          
        return () => {
            document.removeEventListener('click', handleClose);
            document.removeEventListener('contextmenu', handleClose);
        }
      }
  }, [onClose, open])

  return open && ReactDOM.createPortal(
    <div  
      ref={setPopperElement}
      className={classnames(menuStyles.menu, className)}
      style={styles.popper}
      {...attributes.popper}
    >
      {children}
    </div>,
    document.getElementById("root")
  );
}
