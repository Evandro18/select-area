import React from 'react'
import Item from './item'
const week = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']
const countries = ['Brasil', 'Argentina', 'Holando', 'Paraguuai', 'Uruguai']

export default function ListComponent() {
  return (
    <div>
      <div className='container'>
        {week.map((item, i) => (
          <Item value={item} key={i} />
        ))}
      </div>
      <div className='container'>
        {countries.map((item, i) => (
          <Item value={item} key={i} />
        ))}
      </div>
    </div>
  )
}
