import { is } from 'bpmn-js/lib/util/ModelUtil';

import {
  isExpanded,
  isEventSubProcess
} from 'bpmn-js/lib/util/DiUtil';

import { assign } from 'min-dash';

var REPLACE_WITH_COLLAPSED = 'replace-with-collapsed-subprocess',
    REPLACE_WITH_EXPANDED = 'replace-with-expanded-subprocess',
    EXPAND_SUBPROCESS = 'expand-subprocess';


export default function CollapseSubprocessPopupProvider(popupMenu, bpmnReplace, translate) {
  popupMenu.registerProvider('bpmn-replace', this);

  this._bpmnReplace = bpmnReplace;
  this._translate = translate;
}

CollapseSubprocessPopupProvider.$inject = [
  'popupMenu',
  'bpmnReplace',
  'translate'
];

/**
 * Get all entries from original bpmn-js provider minus the ones that allow to model
 * collapsed subprocess.
 */
CollapseSubprocessPopupProvider.prototype.getPopupMenuEntries = function(element) {
  var bpmnReplace = this._bpmnReplace,
      translate = this._translate,
      self = this;

  return function(entries) {

    var subProcessEntries = {
      'replace-with-collapsed-subprocess': {
        className: 'bpmn-icon-subprocess-collapsed',
        label: translate('Sub Process (collapsed)'),
        action: function() {
          bpmnReplace.replaceElement(element, {
            type: 'bpmn:SubProcess',
            isExpanded: false
          });
        }
      },
      'replace-with-expanded-subprocess': {
        className: 'bpmn-icon-subprocess-expanded',
        label: translate('Sub Process (expanded)'),
        action: function() {
          bpmnReplace.replaceElement(element, {
            type: 'bpmn:SubProcess',
            isExpanded: true
          });
        }
      }
    };

    if (isTask(element)) {

      delete entries[EXPAND_SUBPROCESS];

      assign(entries, subProcessEntries);

      return entries;
    }

    if (isSubProcess(element)) {

      delete entries[EXPAND_SUBPROCESS];

      if (isExpanded(element)) {
        entries[REPLACE_WITH_COLLAPSED] = subProcessEntries[REPLACE_WITH_COLLAPSED];
      } else {
        entries = self.getTaskEntries(element);

        entries[REPLACE_WITH_EXPANDED] = subProcessEntries[REPLACE_WITH_EXPANDED];
      }

      return entries;
    }

    return entries;
  };
};

CollapseSubprocessPopupProvider.prototype.getTaskEntries = function(element) {
  var bpmnReplace = this._bpmnReplace,
      translate = this._translate;

  return {
    'replace-with-task': {
      label: translate('Task'),
      className: 'bpmn-icon-task',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:Task',
          isExpanded: true
        });
      }
    },
    'replace-with-send-task': {
      label: translate('Send Task'),
      className: 'bpmn-icon-send',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:SendTask'
        });
      }
    },
    'replace-with-receive-task': {
      label: translate('Receive Task'),
      className: 'bpmn-icon-receive',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ReceiveTask'
        });
      }
    },
    'replace-with-user-task': {
      label: translate('User Task'),
      className: 'bpmn-icon-user',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:UserTask'
        });
      }
    },
    'replace-with-manual-task': {
      label: translate('Manual Task'),
      className: 'bpmn-icon-manual',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ManualTask'
        });
      }
    },
    'replace-with-rule-task': {
      label: translate('Business Rule Task'),
      className: 'bpmn-icon-business-rule',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:BusinessRuleTask'
        });
      }
    },
    'replace-with-service-task': {
      label: translate('Service Task'),
      className: 'bpmn-icon-service',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ServiceTask'
        });
      }
    },
    'replace-with-script-task': {
      label: translate('Script Task'),
      className: 'bpmn-icon-script',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ScriptTask'
        });
      }
    },
    'replace-with-call-activity': {
      label: translate('Call Activity'),
      className: 'bpmn-icon-call-activity',
      action: function() {
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:CallActivity'
        });
      }
    }
  };
};



// helper /////
function isTask(element) {
  return is(element, 'bpmn:Task');
}

function isSubProcess(element) {
  return is(element, 'bpmn:SubProcess') &&
    !is(element, 'bpmn:Transaction') &&
    !isEventSubProcess(element);
}
