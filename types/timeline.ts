export interface IWordItem {
  readonly word: string
  readonly weight: number
}

export interface ITimelineIndexDropdownItem {
  id: string
  words: IWordItem[]
}

export interface ITimeLineIndexProps {
  readonly data: ITimelineIndexDropdownItem[]
}
