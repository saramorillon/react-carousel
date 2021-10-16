import React, { createRef, ReactNode, useCallback, useEffect } from 'react'
import './index.css'

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
  arrows?: { left?: ReactNode; right?: ReactNode }
}

export function Carousel({ items, selected, setSelected, infinite, arrows }: ICarouselProps) {
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
    <div className="rc-root">
      <div className="rc-viewbox">
        <div className="rc-arrow" style={{ left: 0 }} onClick={() => onChange(selected - 1)}>
          {arrows?.left || '◀'}
        </div>
        <div
          className="rc-items"
          style={{ width: `calc(100% * ${length})`, transform: `translateX(-${(selected / length) * 100}%)` }}
        >
          {items.map((item, i) => (
            <div className="rc-item" key={i}>
              {item.item}
            </div>
          ))}
        </div>
        <div className="rc-arrow" style={{ right: 0 }} onClick={() => onChange(selected + 1)}>
          {arrows?.right || '▶'}
        </div>
      </div>
      {hasThumbnails(items) && (
        <div className="thumbnails">
          {items.map((item, i) => (
            <div className="thumbnail" key={i} ref={refs[i]} onClick={() => onChange(i)}>
              {item.thumb}
            </div>
          ))}
        </div>
      )}
    </div>
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
