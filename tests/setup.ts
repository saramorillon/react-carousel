import '@testing-library/jest-dom'

beforeEach(() => {
  HTMLElement.prototype.scrollIntoView = jest.fn()
})
