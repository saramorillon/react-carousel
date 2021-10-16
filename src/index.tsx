import React, { createRef, ReactNode, useCallback, useEffect } from 'react'
import { Arrow, Container, Item, Items, ITransitionProps, Root, Thumbnail, Thumbnails } from './components'

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
  setSelected: (selected: number) => void
  infinite?: boolean
  transition?: ITransitionProps
  arrows?: { left?: ReactNode; right?: ReactNode }
}

export function Carousel({ items, selected, setSelected, infinite, transition, arrows }: ICarouselProps) {
  const refs = items.map(() => createRef<HTMLDivElement>())

  const onChange = useCallback(
    (selected: number) => {
      setSelected(getSelected(selected, 0, items.length - 1, infinite))
    },
    [items, setSelected, infinite]
  )

  useEffect(() => {
    refs[selected]?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [refs, selected])

  return (
    <Root>
      <Container>
        <Arrow left={0} onClick={() => onChange(selected - 1)}>
          {arrows?.left || '◀'}
        </Arrow>
        <Items length={items.length} selected={selected} transition={transition}>
          {items.map((item, i) => (
            <Item key={i}>{item.item}</Item>
          ))}
        </Items>
        <Arrow right={0} onClick={() => onChange(selected + 1)}>
          {arrows?.right || '▶'}
        </Arrow>
      </Container>
      {hasThumbnails(items) && (
        <Thumbnails>
          {items.map((item, i) => (
            <Thumbnail key={i} ref={refs[i]} onClick={() => onChange(i)}>
              {item.thumb}
            </Thumbnail>
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
