declare module 'hast-util-select' {
  import { Node } from 'unist'
  import { Element } from 'hast'
  function select(
    selector: string,
    tree: Node,
    space?: 'svg' | 'html',
  ): Element | undefined

  function selectAll(
    selector: string,
    tree: Node,
    space?: 'svg' | 'html',
  ): Array<Element>
}
