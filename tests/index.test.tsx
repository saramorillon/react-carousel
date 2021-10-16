import { render, screen } from '@testing-library/react'
import React from 'react'
import { Carousel } from '../src'

describe('Carousel', () => {
  it('should render each item', () => {
    const items = [{ item: <>Toto</> }, { item: <>Tutu</> }]
    render(<Carousel items={items} selected={0} setSelected={jest.fn()} />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
    expect(screen.getByText('Tutu')).toBeInTheDocument()
  })

  it('should render each thumbnail', () => {
    const items = [
      { item: <>Toto</>, thumb: <>Toto thumb</> },
      { item: <>Tutu</>, thumb: <>Tutu thumb</> },
    ]
    render(<Carousel items={items} selected={0} setSelected={jest.fn()} />)
    expect(screen.getByText('Toto thumb')).toBeInTheDocument()
    expect(screen.getByText('Tutu thumb')).toBeInTheDocument()
  })

  it('should render custom left arrow', () => {
    render(<Carousel items={[]} selected={0} setSelected={jest.fn()} arrows={{ left: () => <>Left arrow</> }} />)
    expect(screen.getByText('Left arrow')).toBeInTheDocument()
    expect(screen.getByText('▶')).toBeInTheDocument()
  })

  it('should render custom right arrow', () => {
    render(<Carousel items={[]} selected={0} setSelected={jest.fn()} arrows={{ right: () => <>Right arrow</> }} />)
    expect(screen.getByText('Right arrow')).toBeInTheDocument()
    expect(screen.getByText('◀')).toBeInTheDocument()
  })
})
