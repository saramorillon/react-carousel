import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Carousel, CarouselItems } from '../src'

describe('Carousel', () => {
  it('should render each item', () => {
    const items: CarouselItems = [{ item: <>Toto</> }, { item: <>Tutu</> }]
    render(<Carousel items={items} selected={0} setSelected={jest.fn()} />)
    expect(screen.getByText('Toto')).toBeInTheDocument()
    expect(screen.getByText('Tutu')).toBeInTheDocument()
  })

  it('should render each thumbnail', () => {
    const items: CarouselItems = [
      { item: <>Toto</>, thumb: () => <>Toto thumb</> },
      { item: <>Tutu</>, thumb: () => <>Tutu thumb</> },
    ]
    render(<Carousel items={items} selected={0} setSelected={jest.fn()} />)
    expect(screen.getByText('Toto thumb')).toBeInTheDocument()
    expect(screen.getByText('Tutu thumb')).toBeInTheDocument()
  })

  it('should render custom left arrow', () => {
    render(<Carousel items={[]} selected={0} setSelected={jest.fn()} arrows={{ left: 'Left arrow' }} />)
    expect(screen.getByText('Left arrow')).toBeInTheDocument()
    expect(screen.getByText('▶')).toBeInTheDocument()
  })

  it('should render custom right arrow', () => {
    render(<Carousel items={[]} selected={0} setSelected={jest.fn()} arrows={{ right: 'Right arrow' }} />)
    expect(screen.getByText('Right arrow')).toBeInTheDocument()
    expect(screen.getByText('◀')).toBeInTheDocument()
  })

  it('should select previous item when clicking on left arrow', () => {
    const items: CarouselItems = [{ item: <>Toto</> }, { item: <>Tutu</> }]
    const setSelected = jest.fn()
    render(<Carousel items={items} selected={1} setSelected={setSelected} />)
    fireEvent.click(screen.getByText('◀'))
    expect(setSelected).toHaveBeenCalledWith(0)
  })

  it('should select previous item when clicking on custom left arrow', () => {
    const items: CarouselItems = [{ item: <>Toto</> }, { item: <>Tutu</> }]
    const setSelected = jest.fn()
    render(<Carousel items={items} selected={1} setSelected={setSelected} arrows={{ left: 'Left arrow' }} />)
    fireEvent.click(screen.getByText('Left arrow'))
    expect(setSelected).toHaveBeenCalledWith(0)
  })

  it('should select next item when clicking on right arrow', () => {
    const items: CarouselItems = [{ item: <>Toto</> }, { item: <>Tutu</> }]
    const setSelected = jest.fn()
    render(<Carousel items={items} selected={0} setSelected={setSelected} />)
    fireEvent.click(screen.getByText('▶'))
    expect(setSelected).toHaveBeenCalledWith(1)
  })

  it('should select next item when clicking on custom right arrow', () => {
    const items: CarouselItems = [{ item: <>Toto</> }, { item: <>Tutu</> }]
    const setSelected = jest.fn()
    render(<Carousel items={items} selected={0} setSelected={setSelected} arrows={{ right: 'Right arrow' }} />)
    fireEvent.click(screen.getByText('Right arrow'))
    expect(setSelected).toHaveBeenCalledWith(1)
  })

  it('should select item when clicking on thumbnail', () => {
    const items: CarouselItems = [
      { item: <>Toto</>, thumb: () => <>Toto thumb</> },
      { item: <>Tutu</>, thumb: () => <>Tutu thumb</> },
    ]
    const setSelected = jest.fn()
    render(<Carousel items={items} selected={0} setSelected={setSelected} />)
    fireEvent.click(screen.getByText('Tutu thumb'))
    expect(setSelected).toHaveBeenCalledWith(1)
  })

  it('should not scroll to thumbnail on render', () => {
    const items: CarouselItems = [
      { item: <>Toto</>, thumb: () => <>Toto thumb</> },
      { item: <>Tutu</>, thumb: () => <>Tutu thumb</> },
    ]
    const setSelected = jest.fn()
    render(<Carousel items={items} selected={0} setSelected={setSelected} />)
    expect(HTMLDivElement.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('should scroll to thumbnail when changing selected', () => {
    const items: CarouselItems = [
      { item: <>Toto</>, thumb: () => <>Toto thumb</> },
      { item: <>Tutu</>, thumb: () => <>Tutu thumb</> },
    ]
    const setSelected = jest.fn()
    render(<Carousel items={items} selected={0} setSelected={setSelected} />)
    fireEvent.click(screen.getByText('Tutu thumb'))
    expect(screen.getByText('Tutu thumb').scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  })
})
