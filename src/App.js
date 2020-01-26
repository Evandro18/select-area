import React, { useState, useRef, useCallback, useEffect } from "react";
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import "./styles.css";
import clxs from 'clsx'
import List from "./listComponent";
import Context from "./context";
export default function App() {
  const ref = useRef();
  const refContainer = useRef();
  const [isSelecting, setSelecting] = useState(false)
  const [selectingItems, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([])
  const [boundBox, setBoundBox] = useState({x1: 0, x2: 0, y1: 0, y2: 0 })

  const updateProps = (list = [], ref, props) => {
    list.forEach((item) => {
      if (item.ref.current === ref.current) {
        if (!isEqual(item.props, props)) {
          item.props = props
        }
      }
    })
    return list
  }
  const registerSelectedItem = useCallback((ref, props) => {
    setSelectedItems(oldItems => !oldItems.find(el => el.ref.current === ref.current) ? [...oldItems, { ref, props }] : updateProps(oldItems, ref, props))
  }, [])

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

  const doObjectCollide = useCallback(() => {
    const { top, left, width, height } = ref.current && ref.current.getBoundingClientRect()
    const items = selectedItems.filter(item => {
      if (!item || !item.ref || !item.ref.current) return false
      const { ref } = item
      const { top: itemTop, left: itemLeft, width: itemWidth, height: itemHeight } = ref.current.getBoundingClientRect()
      if (itemLeft < left + width &&
        itemLeft + itemWidth > left &&
        itemTop < top + height &&
        top + height > itemTop &&
        itemTop + (itemHeight || 0) > top){
          return true
        }
        return false
    })
    registerSelectedMultiple(items)
  }, [registerSelectedMultiple, selectedItems])

  const verifyCollide = debounce(doObjectCollide, 300)

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
    ev.stopPropagation();
    if (isSelecting) {
      verifyCollide()
      updateBoundBox({...boundBox, x2: ev.clientX, y2: ev.clientY})
    }
  }, [isSelecting, updateBoundBox, boundBox, verifyCollide])

  const onMouseDown = useCallback(ev => {
    const { target, ...rest } = ev
    setItems([])
    ev.stopPropagation();
    setSelecting(true)
    verifyCollide()
    updateBoundBox({ ...boundBox, x1: rest.clientX, y1: rest.clientY })
  }, [updateBoundBox, boundBox, verifyCollide])

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
        {selectingItems && selectingItems.map((el, i) => (
          <span key={i} style={{ fontSize: 16, fontWeight: 'bold', margin: '2rem'}}>{el.props.value}</span>
        ))}
      </div>

      <div ref={ref} className={clxs('selector', 'noselect')} style={{ cursor: 'default' }}/>
    </div>
  );
}
