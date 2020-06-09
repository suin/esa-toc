import { Element } from 'hast'
import fromParse5 from 'hast-util-from-parse5'
import { select, selectAll } from 'hast-util-select'
import parse5 from 'parse5'
import filter from 'unist-util-filter'
import toHtml from 'hast-util-to-html'
import toText from 'hast-util-to-text'

export type Toc = ReadonlyArray<Header>

export type Header = {
  /**
   * 見出しタグ
   */
  readonly tag: string
  /**
   * 見出しの深さ
   */
  readonly depth: 1 | 2 | 3
  /**
   * 見出しの内容(innerText)
   */
  readonly text: string
  /**
   * 見出しの内容(innerHTML)
   */
  readonly html: string
  /**
   * 見出しアンカー
   */
  readonly href: string
}

/**
 * esa.ioのHTMLから目次(table of contents)データを返す
 */
export const getToc = (html: string): Toc => {
  const ast = parse5.parseFragment(html)
  const hast = fromParse5(ast)
  const headers = selectAll(':matches(h1, h2, h3):has(a.anchor)', hast)
  return headers.map<Header>(header => {
    const anchor = select('a.anchor', header)
    const headerWithoutAnchorHast = filter<Element>(
      header,
      (node: any): node is Element => {
        return !(
          node.tagName === 'a' &&
          node?.properties?.className?.includes('anchor')
        )
      },
    )
    const html = toHtml(headerWithoutAnchorHast?.children as any, {
      entities: {
        useNamedReferences: true,
      },
    }).trim()
    const text = toText(headerWithoutAnchorHast!).trim().replace('\n', '')
    const id = (header.properties?.id ?? '') as string
    const depth = /^\d+-0-0$/.test(id) ? 1 : /^\d+-\d+-0$/.test(id) ? 2 : 3
    return {
      tag: header.tagName,
      depth,
      href: (anchor?.properties?.href ?? '') as string,
      text,
      html,
    }
  })
}
