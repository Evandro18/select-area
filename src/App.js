import React, { useState } from 'react'
import SelectArea from './SelectArea'
import List from './listComponent'

export default function App() {
  const [selectedItems, setSelectedItems] = useState([])
  const onSelectingColor = '#c6ffb3'
  const defaultColor = '#7080A0'
  function onFinishedSelection(items) {
    items.forEach(item => {
      const { ref } = item
      if (ref && ref.current) ref.current.style.background = defaultColor
    })
    setSelectedItems(items)
  }
  function onSelectItem(item) {
    const { ref } = item
    if (ref && ref.current) ref.current.style.background = onSelectingColor
  }

  function onUnselectItem(item) {
    const { ref } = item
    if (ref && ref.current) ref.current.style.background = defaultColor
  }

  return (
    <>
      <SelectArea
        onFinishedSelection={onFinishedSelection}
        squareColor='blue'
        onSelectItem={onSelectItem}
        onUnselectItem={onUnselectItem}
      >
        <List />
      </SelectArea>
      <div>
        <span style={{ fontSize: 18 }}>Item selecionados: </span>
        {selectedItems &&
          selectedItems.map((el, i) => (
            <span key={i} style={{ fontSize: 16, fontWeight: 'bold', margin: '2rem' }}>
              {el.props.value}
            </span>
          ))}
      </div>
    </>
  )
}
