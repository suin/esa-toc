import fs from 'fs'
import glob from 'glob-all'
import fromParse5 from 'hast-util-from-parse5'
import { select } from 'hast-util-select'
import toHtml from 'hast-util-to-html'
import toText from 'hast-util-to-text'
import parse5 from 'parse5'
import path from 'path'
import { getToc } from '.'

type TestCase = [
  string,
  {
    readonly input: string
    readonly output: object
  },
]

const getTestCases = (): ReadonlyArray<TestCase> =>
  glob.sync([`${__dirname}/sampleHTMLs/*.html`]).map<TestCase>(file => {
    const doc = fs.readFileSync(file).toString('utf8')
    const ast = parse5.parseFragment(doc)
    const hast = fromParse5(ast)
    const inputHast = select('#input', hast)
    const input = toHtml(inputHast!.children)
    const outputHast = select('#output', hast)
    const output = JSON.parse(toText(outputHast!))
    return [path.basename(file), { input, output }]
  })

describe('esa-toc', () => {
  test.each(getTestCases())('getToc: %s', (_, { input, output }) => {
    const toc = getToc(input)
    expect(toc).toMatchObject(output)
  })
})
