import { Property } from 'csstype'
import styled from 'styled-components'

export const Root = styled.div({
  overflow: 'hidden',
})

export const Container = styled.div({
  position: 'relative',
})

export const Arrow = styled.div(
  {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '2rem',
    opacity: 0,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease-out',
    zIndex: 2,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: 1,
    },
  },
  ({ left, right }: { left?: Property.Left; right?: Property.Right }) => ({ left, right })
)

export interface ITransitionProps {
  duration?: Property.TransitionDuration
  timingFunction: Property.TransitionTimingFunction
}

export const Items = styled.div(
  {
    display: 'flex',
  },
  ({ length, selected, transition }: { length: number; selected: number; transition?: ITransitionProps }) => ({
    transition: 'all 0.2s ease-out',
    transitionProperty: 'all',
    transitionDuration: transition?.duration || '0.2s',
    transitionTimingFunction: transition?.timingFunction || 'ease-out',
    width: `calc(100% * ${length})`,
    transform: `translateX(-${(selected / length) * 100}%)`,
  })
)

export const Item = styled.div({
  width: '100%',
})

export const Thumbnails = styled.div({
  display: 'flex',
  overflow: 'auto',
})

export const Thumbnail = styled.div({
  cursor: 'pointer',
  margin: '0 1rem',
})
