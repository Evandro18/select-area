import React, { useState, useRef, useCallback, useEffect } from "react";
import "./styles.css";
import List from "./listComponent";
// import WithRef from "./WithRef";
import Context from "./context";
export default function App() {
  const ref = useRef();
  const refContainer = useRef();
  const [isSelecting, setSelecting] = useState(false)
  const [selectedItems, setItems] = useState([]);
  const [typedItems, setTypedItems] = useState([]);
  const [boundBox, setBoundBox] = useState({x1: 0, x2: 0, y1: 0, y2: 0 })
  const registerSelectedItem = useCallback((ref, props) => {
    setTypedItems(oldItems => !oldItems.find(el => el.ref.current === ref.current) ? [...oldItems, {ref, props}] : oldItems)
  }, []);

  const registerSelected = useCallback(({ref, props}) => {
    setItems(oldItems => !oldItems.find(el => el.ref.current === ref.current) ? [...oldItems, {ref, props}] : oldItems);
  }, []);

  const setBoundsValue = useCallback(({ x1, x2, y1, y2 }) => {
    setBoundBox(old => {
      old.x1 = x1
      old.x2 = x2
      old.y1 = y1
      old.y2 = y2
      return old
    })
  }, [])

  const updateBoundBox = useCallback(({ x1, x2, y1, y2 }) => {
    const smallerX = Math.min(x1, x2)
    const largerX = Math.max(x1, x2)
    const smallerY = Math.min(y1, y2)
    const largerY = Math.max(y1, y2)
    if (isNaN(smallerX)|| isNaN(smallerY)) return
    if (ref.current && smallerX && smallerY) {
      ref.current.style.width = `${largerX - smallerX}px`
      ref.current.style.height = `${largerY - smallerY}px`
      ref.current.style.left = `${smallerX}px`
      ref.current.style.top = `${smallerY}px`
    }
    setBoundsValue({ x1, x2, y1, y2 })
  }, [setBoundsValue])

  const onMouseUp = useCallback(ev => {
    ev.stopPropagation();
    setSelecting(false)
    // setItems([])
    if (ref.current) {
      ref.current.style.width = '0px'
      ref.current.style.height = '0px'
      ref.current.style.left = '0px'
      ref.current.style.top = '0px'
    }
    setBoundsValue({ x1: 0, x2: 0, y1: 0, y2: 0 })
  }, [setBoundsValue])

  const onMouseMove = useCallback((ev) => {
    const { target } = ev
    ev.stopPropagation();
    if (isSelecting) {
      updateBoundBox({...boundBox, x2: ev.clientX, y2: ev.clientY})
      const found = typedItems.find(el => el.ref.current === target);
      if (found) {
        registerSelected({ ref: found.ref, props: found.props });
      }
    }
  }, [isSelecting, updateBoundBox, registerSelected, boundBox, typedItems])

  const onMouseDown = useCallback(ev => {
    const { target, ...rest } = ev
    setItems([])
    ev.stopPropagation();
    setSelecting(true)
    const found = typedItems.find(el => el.ref.current === target);
    if (found) registerSelected({ ref: found.ref, props: found.props });
    updateBoundBox({ ...boundBox, x1: rest.clientX, y1: rest.clientY })
  }, [updateBoundBox, registerSelected, boundBox, typedItems])

  useEffect(() => {
    // in case the event ends outside the box
    window.onmouseup = onMouseUp;
    window.onmousemove = onMouseMove;
  }, [onMouseUp, onMouseMove]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div
        ref={refContainer}
        className="selectable-group"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{
          height: 400,
          backgroundColor: '#f5f5f5',
          padding: '1rem'
        }}
      >
        <Context.Provider value={{ registerSelectedItem }}>
          <List />
        </Context.Provider>
      </div>
      <div>
        <span style={{fontSize: 18}}>Item selecionados: </span>
        {!isSelecting && selectedItems.map((el, i) => (
          <span key={i} style={{ fontSize: 16, fontWeight: 'bold', margin: '2rem'}}>{el.props.value}</span>
        ))}
      </div>

      <div ref={ref} className="selector" style={{ cursor: 'default' }}/>
    </div>
  );
}
