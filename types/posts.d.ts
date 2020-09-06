interface IItem {
    id: string,
    words: IWordsItem[]
}
interface IWordsItem {
    word: string,
    weight: number
}