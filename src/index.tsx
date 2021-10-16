import React, { Dispatch, ReactNode, SetStateAction, useCallback } from 'react'
import { ArrowLeft, ArrowRight, Container, Item, Items, ITransitionProps, Root, Thumbnails } from './components'

interface ICarouselItem {
  item: ReactNode
}

interface ICarouselItemWithThumb extends ICarouselItem {
  thumb: ReactNode
}

export type CarouselItems = ICarouselItem[] | ICarouselItemWithThumb[]

export type CarouselArrow = ({ onClick }: { onClick: () => void }) => JSX.Element

interface ICarouselProps {
  items: CarouselItems
  selected: number
  setSelected: Dispatch<SetStateAction<number>>
  infinite?: boolean
  transition?: ITransitionProps
  arrows?: { left?: CarouselArrow; right?: CarouselArrow }
}

export function Carousel({ items, selected, setSelected, infinite, transition, arrows }: ICarouselProps) {
  const onChange = useCallback(
    (offset: number) => {
      setSelected((selected) => getSelected(selected + offset, 0, items.length - 1, infinite))
    },
    [items, setSelected]
  )

  const LeftArrow = arrows?.left || ArrowLeft
  const RightArrow = arrows?.right || ArrowRight

  return (
    <Root>
      <Container>
        <LeftArrow onClick={() => onChange(-1)} />
        <Items length={items.length} selected={selected} transition={transition}>
          {items.map((item, i) => (
            <Item key={i}>{item.item}</Item>
          ))}
        </Items>
        <RightArrow onClick={() => onChange(1)} />
      </Container>
      {hasThumbnails(items) && (
        <Thumbnails>
          {items.map((item, i) => (
            <div key={i} onClick={() => onChange(i)}>
              {item.thumb}
            </div>
          ))}
        </Thumbnails>
      )}
    </Root>
  )
}

function getSelected(selected: number, min: number, max: number, infinite?: boolean) {
  if (!infinite) return Math.max(min, Math.min(selected, max))
  if (selected < min) return max
  if (selected > max) return min
  return selected
}

function hasThumbnails(items: CarouselItems): items is ICarouselItemWithThumb[] {
  return items.every((item) => 'thumb' in item)
}
