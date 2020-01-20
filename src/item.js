import React, { useEffect, useRef, useContext } from "react";
import "./styles.css";
import Context from "./context";

export default function ItemComponent(props) {
  const { value } = props;
  const ref = useRef("item");
  const { registerSelectedItem } = useContext(Context);

  useEffect(() => {
    if (ref.current) {
      registerSelectedItem(ref, props)
    }
  }, [ref, registerSelectedItem, props]);

  return (
    <div className="item" ref={ref} style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100px', width: '10%', backgroundColor: '#7080A0', margin: '1rem'}}>
      {value}
    </div>
  );
}
