declare module 'hast-util-to-text' {
  import { Node } from 'unist'
  function toText(node: Node): string
  export = toText
}
