// @flow
import React, { useState, useRef, useCallback, useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import './styles.css'
import clxs from 'clsx'
import Context from './context'

type Props = {
  children?: React.Node,
  onFinishedSelection: Function,
  onSelectItem: Function,
  onUnselectItem: Function,
  shouldSelectItem: Function,
  isSelectable: Function,
  squareColor: String
}

export default function SeleteArea(props: Props) {
  const {
    children,
    onFinishedSelection,
    onSelectItem,
    onUnselectItem,
    shouldSelectItem = () => true,
    isSelectable = () => true,
    squareColor
  } = props
  const ref = useRef()
  const refContainer = useRef()
  const [isSelecting, setSelecting] = useState(false)
  const [selectingItems, setItems] = useState([])
  const [registeredItems, setRegisteredItems] = useState([])
  const [boundBox, setBoundBox] = useState({ x1: 0, x2: 0, y1: 0, y2: 0 })

  const updateProps = (list = [], ref, props) => {
    list.forEach(item => {
      if (item.ref.current === ref.current) {
        if (!isEqual(item.props, props)) {
          item.props = props
        }
      }
    })
    return list
  }
  const registerSelectedItem = useCallback((ref, props) => {
    setRegisteredItems(oldItems =>
      !oldItems.find(el => el.ref.current === ref.current) ? [...oldItems, { ref, props }] : updateProps(oldItems, ref, props)
    )
  }, [])

  const registerSelectedMultiple = useCallback(list => {
    setItems(list)
  }, [])

  const setBoundsValue = useCallback(({ x1, x2, y1, y2 }) => {
    setBoundBox(old => {
      old.x1 = x1
      old.x2 = x2
      old.y1 = y1
      old.y2 = y2
      return old
    })
  }, [])

  const updateBoundBox = useCallback(
    ({ x1, x2, y1, y2 }) => {
      const smallerX = Math.min(x1, x2)
      const largerX = Math.max(x1, x2)
      const smallerY = Math.min(y1, y2)
      const largerY = Math.max(y1, y2)
      if (isNaN(smallerX) || isNaN(smallerY)) return
      if (ref.current && smallerX && smallerY) {
        ref.current.style.width = `${largerX - smallerX}px`
        ref.current.style.height = `${largerY - smallerY}px`
        ref.current.style.left = `${smallerX}px`
        ref.current.style.top = `${smallerY}px`
      }
      setBoundsValue({ x1, x2, y1, y2 })
    },
    [setBoundsValue]
  )

  const onMouseUp = useCallback(
    ev => {
      ev.stopPropagation()
      setSelecting(false)
      onFinishedSelection(selectingItems)
      if (ref.current) {
        ref.current.style.width = '0px'
        ref.current.style.height = '0px'
        ref.current.style.left = '0px'
        ref.current.style.top = '0px'
      }
      setBoundsValue({ x1: 0, x2: 0, y1: 0, y2: 0 })
    },
    [setBoundsValue, onFinishedSelection, selectingItems]
  )

  const doObjectCollide = useCallback(() => {
    if (!ref || !ref.current) return
    const { top, left, width, height } = ref.current && ref.current.getBoundingClientRect()
    const toAdd = []
    for (const item of registeredItems) {
      if (!item || !item.ref || !item.ref.current) return
      const { ref: itemRef } = item
      const { top: itemTop, left: itemLeft, width: itemWidth, height: itemHeight } = itemRef.current.getBoundingClientRect()
      if (
        itemLeft < left + width &&
        itemLeft + itemWidth > left &&
        itemTop < top + height &&
        top + height > itemTop &&
        itemTop + (itemHeight || 0) > top
      ) {
        if (shouldSelectItem(item)) {
          if (onSelectItem) onSelectItem(item)
          toAdd.push(item)
        }
      } else {
        const found = selectingItems.find(el => el.ref.current === itemRef.current)
        if (found && found.ref && isSelectable(found) && onUnselectItem) onUnselectItem(found)
      }
    }
    registerSelectedMultiple([...toAdd])
  }, [registerSelectedMultiple, registeredItems, isSelectable, onSelectItem, selectingItems, shouldSelectItem, onUnselectItem])

  const onMouseMove = useCallback(
    ev => {
      ev.stopPropagation()
      if (isSelecting) {
        updateBoundBox({ ...boundBox, x2: ev.clientX, y2: ev.clientY })
        doObjectCollide()
      }
    },
    [isSelecting, updateBoundBox, boundBox, doObjectCollide]
  )

  const onMouseDown = useCallback(
    ev => {
      const { target, ...rest } = ev
      setItems([])
      ev.stopPropagation()
      setSelecting(true)
      doObjectCollide()
      if (squareColor) {
        ref.current.style.background = squareColor
        ref.current.style.opacity = '.3'
      }
      updateBoundBox({ ...boundBox, x1: rest.clientX, y1: rest.clientY })
    },
    [updateBoundBox, boundBox, doObjectCollide, squareColor]
  )

  useEffect(() => {
    // in case the event ends outside the box
    window.onmouseup = onMouseUp
    window.onmousemove = onMouseMove
  }, [onMouseUp, onMouseMove])

  return (
    <div className={clxs('App', 'noselect')}>
      <h1>Select area component</h1>
      <div
        ref={refContainer}
        className='selectable-group'
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{
          height: 400,
          backgroundColor: '#f5f5f5',
          padding: '1rem'
        }}
      >
        <Context.Provider value={{ registerSelectedItem }}>{children}</Context.Provider>
      </div>
      <div ref={ref} className={clxs('selector', 'noselect')} style={{ cursor: 'default' }} />
    </div>
  )
}
