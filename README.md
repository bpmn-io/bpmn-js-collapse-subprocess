# bpmn-js collapse subprocess

A bpmn-js extension that re-enables to collapse sub process via replace menu.

## Installation

Install via [npm](http://npmjs.com/).

```bash
npm install bpmn-js-collapse-subprocess
```

Add as additional module to [bpmn-js](https://github.com/bpmn-io/bpmn-js).

### Modeler

```javascript
var BpmnModeler = require('bpmn-js/lib/Modeler');
var collapseSubprocessModule = require('bpmn-js-collapse-subprocess');

var modeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    collapseSubprocessModule
  ]
});
```

### Viewer

This extension is useless for the Viewer as it changes modeling actions.

## Licence

MIT
