import React, { useEffect, useRef } from 'react'
import './styles.css'
import useSelectRegister from './contextHook'

export default function ItemComponent(props) {
  const { registerSelectedItem } = useSelectRegister()
  const { value } = props
  const ref = useRef('item')

  useEffect(() => {
    if (ref.current) {
      registerSelectedItem(ref, props)
    }
  }, [ref, registerSelectedItem, props])

  return (
    <div
      className='item'
      ref={ref}
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        width: '10%',
        backgroundColor: '#7080A0',
        margin: '1rem'
      }}
    >
      {value}
    </div>
  )
}
