![](./demo.gif)
- - -

## 次のような出力が基本的には対象です

```javascript
import pino from 'pino'

const log = pino()

log.info('任意のobject %o', {
  foo: 'bar',
})
```
