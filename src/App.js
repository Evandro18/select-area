import React, { useState, useRef, useCallback, useEffect } from "react";
import "./styles.css";
import clxs from 'clsx'
import List from "./listComponent";
import Context from "./context";
export default function App() {
  const ref = useRef();
  const refContainer = useRef();
  const [isSelecting, setSelecting] = useState(false)
  const [selectingItems, setItems] = useState([]);
  const [typedItems, setTypedItems] = useState([]);
  const [boundBox, setBoundBox] = useState({x1: 0, x2: 0, y1: 0, y2: 0 })
  const registerSelectedItem = useCallback((ref, props) => {
    setTypedItems(oldItems => !oldItems.find(el => el.ref.current === ref.current) ? [...oldItems, {ref, props}] : oldItems)
  }, []);

  const registerSelected = useCallback(({ref, props}) => {
    setItems(oldItems => !oldItems.find(el => el.ref.current === ref.current) ? [...oldItems, {ref, props}] : oldItems);
  }, []);

  const registerSelectedMultiple = useCallback((list) => {
    setItems(list);
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

  const doObjectCollide = () => {
    const { offsetTop: top, offsetLeft: left, offsetWidth: width, offsetHeight: height } = ref.current && ref.current
    const items = typedItems.filter(item => {
      if (!item || !item.ref || !item.ref.current) return false
      const { ref } = item
      const { offsetTop: itemTop, offsetLeft: itemLeft, offsetWidth: itemWidth, offsetHeight: itemHeigth } = ref.current
      if (itemLeft < left + width &&
        itemLeft + itemWidth > left &&
        itemTop < top + height &&
        top + height > itemTop){
          return true
        }
        return false
    })
    registerSelectedMultiple(items)
  }

  const onMouseUp = useCallback(ev => {
    ev.stopPropagation();
    setSelecting(false)
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
      doObjectCollide()
      updateBoundBox({...boundBox, x2: ev.clientX, y2: ev.clientY})
    }
  }, [isSelecting, updateBoundBox, registerSelected, boundBox, typedItems])

  const onMouseDown = useCallback(ev => {
    const { target, ...rest } = ev
    setItems([])
    ev.stopPropagation();
    setSelecting(true)
    doObjectCollide()
    updateBoundBox({ ...boundBox, x1: rest.clientX, y1: rest.clientY })
  }, [updateBoundBox, registerSelected, boundBox, typedItems])

  useEffect(() => {
    // in case the event ends outside the box
    window.onmouseup = onMouseUp;
    window.onmousemove = onMouseMove;
  }, [onMouseUp, onMouseMove]);

  return (
    <div className={clxs('App', 'noselect')}>
      <h1>Select area component</h1>
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
        {!isSelecting && selectingItems.map((el, i) => (
          <span key={i} style={{ fontSize: 16, fontWeight: 'bold', margin: '2rem'}}>{el.props.value}</span>
        ))}
      </div>

      <div ref={ref} className={clxs('selector', 'noselect')} style={{ cursor: 'default' }}/>
    </div>
  );
}
