interface ITimeLineIndexProps {
  readonly data: readonly []
}

interface IWords {
  readonly word: string
  readonly weight: number
}

interface ITimeLineIndexSelectedItem {
  readonly id: string
  readonly words: readonly IWords[]
}
