export interface Paste {
    id: String,
    title: String,
    author: String,
    date: String,
    content: String,
    url: String
}
export interface Props {
    paste: Paste
}