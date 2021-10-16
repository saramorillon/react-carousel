import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Carousel, CarouselItems } from '../src'

const items: CarouselItems = new Array(100).fill(0).map((_, i) => ({
  item: <Item />,
  thumb: <Thumbnail name={i.toString()} />,
}))

function App() {
  const [selected, setSelected] = useState(0)
  return (
    <>
      <input
        type="number"
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        min={0}
        max={items.length - 1}
      />
      <Carousel items={items} selected={selected} setSelected={setSelected} />
    </>
  )
}

function Item() {
  return <img src="https://picsum.photos/200/300" />
}

function Thumbnail({ name }: { name: string }) {
  return <div style={{ textAlign: 'center' }}>{name}</div>
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
