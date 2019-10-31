import CollapseSubprocessPopupProvider from './CollapseSubprocessPopupProvider';


export default {
  __depends__: [
    'popupMenu',
    'bpmnReplace'
  ],
  __init__: [ 'collapseSubprocessPopupProvider' ],
  collapseSubprocessPopupProvider: [ 'type', CollapseSubprocessPopupProvider ]
};
