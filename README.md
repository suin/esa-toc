# @suin/esa-toc

このライブラリは esa.io の HTML から目次(table of contents)データを生成する関数を提供します。

## インストール

```bash
yarn add @suin/esa-toc
# or
npm install @suin/esa-toc
```

## 使い方

```typescript
import { getToc } from '@suin/esa-toc'

const html = `<h1 data-sourcepos="1:1-1:12" id="1-0-0" name="1-0-0">
              <a class="anchor" id="見出し1" name="%E8%A6%8B%E5%87%BA%E3%81%971" href="#%E8%A6%8B%E5%87%BA%E3%81%971" data-position="1-0-0"><i class="fa fa-link"></i><span class="hidden" data-text="見出し1"> &gt; 見出し1</span></a>見出し1</h1>
              <h2 data-sourcepos="2:1-2:13" id="1-1-0" name="1-1-0">
              <a class="anchor" id="見出し2" name="%E8%A6%8B%E5%87%BA%E3%81%972" href="#%E8%A6%8B%E5%87%BA%E3%81%972" data-position="1-1-0"><i class="fa fa-link"></i><span class="hidden" data-text="見出し2"> &gt; 見出し2</span></a>見出し2</h2>
              <h3 data-sourcepos="3:1-3:14" id="1-1-1" name="1-1-1">
              <a class="anchor" id="見出し3" name="%E8%A6%8B%E5%87%BA%E3%81%973" href="#%E8%A6%8B%E5%87%BA%E3%81%973" data-position="1-1-1"><i class="fa fa-link"></i><span class="hidden" data-text="見出し3"> &gt; 見出し3</span></a>見出し3</h3>
              `
const toc = getToc(html)
console.log(toc)
```

↓

```json
[
  {
    "tag": "h1",
    "depth": 1,
    "text": "見出し1",
    "href": "#%E8%A6%8B%E5%87%BA%E3%81%971"
  },
  {
    "tag": "h2",
    "depth": 2,
    "text": "見出し2",
    "href": "#%E8%A6%8B%E5%87%BA%E3%81%972"
  },
  {
    "tag": "h3",
    "depth": 3,
    "text": "見出し3",
    "href": "#%E8%A6%8B%E5%87%BA%E3%81%973"
  }
]
```

## 仕様

- esa.io の仕様に合わせて、h1, h2, h3 のみ対応しています。h4 以下は未対応。
- h1 の直下に h3 が来る場合、h3 の`depth`は`3`になります。
