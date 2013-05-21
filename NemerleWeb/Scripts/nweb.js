"use strict";

var nweb = {
  go: function (model, tpl, dest, fromDebugger) {
    if (nweb.debugger && !fromDebugger)
      nweb.debugger(model);
    
    var template = tpl ? tpl : nweb.utils.getTemplateName(model, "View");
    var destination = dest ? dest : "#nweb-start";
    var body = $(destination).html($("#" + template).html())[0];
    
    nweb.applyBindings(model, body, nweb.bindings, []);
    nweb.invalidate(nweb.bindings);
  },
  binds: function(name) {
    var binds = {
      "nw-repeat": nweb.getRepeatBinding,
      "nw-text": nweb.getTextBinding,
      "nw-html": nweb.getHtmlBinding,
      "nw-value": nweb.getValueBinding,
      "nw-checked": nweb.getCheckedBinding,
      "nw-template": nweb.getTemplateBinding,
      "nw-when": nweb.getWhenBinding,
      "nw-unless": nweb.getUnlessBinding,
      "nw-css": nweb.getCssBinding,
      "nw-attr": nweb.getAttrBinding,
      "nw-style": nweb.getStyleBinding,
      "nw-visible": nweb.getVisibleBinding,
      "nw-disable": nweb.getDisableBinding,
      "nw-enable": nweb.getEnableBinding,
      "nw-click": nweb.getClickBinding,
      "nw-submit": nweb.getSubmitBinding,
      "nw-events": nweb.getEventsBinding,
      "nw-event": nweb.getEventBinding
    };
    return binds[name];
  },
  doesAllowMultipleBindings: function (attrName) {
    return attrName === "nw-css" ||
      attrName === "nw-style" ||
      attrName === "nw-event" ||
      attrName === "nw-attr";
  },
  applyBindings: function (model, el, bindings, loopStack, isInsideTemplate) {
    if (!el)
      throw "Argument null or undefined exception: el in applyBindings";
    if(el.nodeType != 1)
      return;
    
    var attrs = nweb.utils.getElementAttributes(el);

    for(var i = 0; i < attrs.length; i++) {
      var attrName = attrs[i].nodeName;
        
      if (attrName === "nw-text" && el.tagName.toUpperCase() === "TEXTAREA")
          attrName = "nw-value";
        
      if (attrName.indexOf("nw-") === 0) {
        var binder = nweb.binds(attrName);
        
        if(typeof binder === 'undefined')
          throw "Unrecognized nw-* attribute: " + attrName;
        
        if(!el.__nw_is_repeat && !el.__nw_is_template) {
          var attrValue = attrs[i].nodeValue;
          
          if (nweb.doesAllowMultipleBindings(attrName)) {
            var matches = attrValue.match(/[^\s,]([^,]+):\s([^,]+)/g);
            for (var k = 0; k < matches.length; k++) {
              var b = binder(model, el, bindings, loopStack, matches[k]);
              if (typeof b !== 'undefined')
                bindings.push(b);
            }
          } else {
            var binding = binder(model, el, bindings, loopStack, attrValue);
            if (typeof binding !== 'undefined')
              bindings.push(binding);
          }
        }        
      }
    }

    for(var j = attrs.length - 1; j >= 0; j--)
      if(attrs[j].nodeName.indexOf("nw-") === 0)
        el.removeAttribute(attrs[j].nodeName);
    
    if(el.__nw_is_template /*&& !isInsideTemplate*/)
      return;

    for(var l = 0; l < el.childNodes.length; l++)
      nweb.applyBindings(model, el.childNodes[l], bindings, loopStack);
  },
  getTextBinding: function(model, el, bindings, loopStack, attrVal) {
    var expr = nweb.parseExpression(model, attrVal, loopStack);
    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        el.innerHTML = nweb.utils.htmlEncode(value);
      }
    };
  },
  getHtmlBinding: function(model, el, bindings, loopStack, attrVal) {
    var expr = nweb.parseExpression(model, attrVal, loopStack);
    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        el.innerHTML = value;
      }
    };
  },
  getCssBinding: function(model, el, bindings, loopStack, attrVal) {
    var css = /(.+):\s(.+)/.exec(attrVal);
    var expr = nweb.parseExpression(model, css[2], loopStack);
    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        if(value)
          $(el).addClass(css[1]);
        else
          $(el).removeClass(css[1]);
      }
    };
  },
  getAttrBinding: function (model, el, bindings, loopStack, attrVal) {
    var attr = /(.+):\s(.+)/.exec(attrVal);
    var expr = nweb.parseExpression(model, attr[2], loopStack);
    return {
      el: el,
      getValue: function () {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function (value) {
        el[attr[1]] = value;
      }
    };
  },
  getStyleBinding: function(model, el, bindings, loopStack, attrVal) {
    var style = /(.+):\s(.+)/.exec(attrVal);
    var expr = nweb.parseExpression(model, style[2], loopStack);
    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {        
        $(el).css(style[1], value);
      }
    };
  },
  getVisibleBinding: function(model, el, bindings, loopStack, attrVal) {    
    var expr = nweb.parseExpression(model, attrVal, loopStack);
    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {        
        if(value)
          $(el).show();
        else
          $(el).hide();
      }
    };
  },
  getDisableBinding: function(model, el, bindings, loopStack, attrVal, isEnable) {
    var expr = nweb.parseExpression(model, attrVal, loopStack);
    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {        
        $(el).prop("disabled", value && !isEnable);
      }
    };
  },
  getEnableBinding: function(model, el, bindings, loopStack, attrVal) {    
    return nweb.getDisableBinding(model, el, bindings, loopStack, attrVal, true);
  },
  getValueBinding: function(model, el, bindings, loopStack, attrVal) {
    var expr = nweb.parseExpression(model, attrVal, loopStack);
    var $el = $(el);
    if($el.is(":text")) {
      $el.on("keyup", function() {
        nweb.execute(function() {
            eval(nweb.utils.makeAssignExpression(expr, "$el.val()"));
        });
      });
    } else if(el.tagName.toUpperCase() === "TEXTAREA") {
      $(el).keyup(function () {
        var val = this.value;
        nweb.execute(function () {
          eval(nweb.utils.makeAssignExpression(expr, "val"));
        });
      });
    } else {
      $(el).change(function() {
        nweb.execute(function() {
          var newVal = nweb.getValue(el);
          eval(nweb.utils.makeAssignExpression(expr, "newVal"));
        });
      });
    };

    $el.val(eval(expr));
    
    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function (value) {
        nweb.setValue($el[0], value);        
      }
    };
  },
  getCheckedBinding: function(model, el, bindings, loopStack, attrVal) {
    var expr = nweb.parseExpression(model, attrVal, loopStack);
    var $el = $(el);

    $(el).change(function() {
      nweb.execute(function() {
          eval(nweb.utils.makeAssignExpression(expr, "$el.prop('checked')"));
      });
    });

    return {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        $el.prop("checked", value);
      }
    };
  },
  getRepeatBinding: function(model, el, bindings, loopStack, attrVal) {
    var $el = $(el);
    var repeat = /(.+)\sin\s(.+)/.exec(attrVal);
    var html = el.outerHTML;    
    var expr = nweb.parseExpression(model, repeat[2], loopStack);
    var isExprTuple = false;
    var tupleDecls = [];
    
    if (repeat[1].indexOf("{") == 0) {
      isExprTuple = true;
      var tupleObj = JSON.parse(repeat[1]);
      for (var k in tupleObj)
        if (tupleObj.hasOwnProperty(k))
          tupleDecls.push(tupleObj[k]);
    }

    //$el = nweb.utils.replaceWith($el, $("<!-- repeat " + expr + " -->"));
    $el.html("<!-- repeat " + expr + " -->");
    el.__nw_is_template = true;
    el.__nw_is_repeat = true;

    var binding = {
      el: el,
      generatedEls: [],
      subBindings: [],
      getValue: function() {
          var ret = nweb.getParsedValue(model, expr, loopStack);

          if (ret != undefined && ret != null && ret.toArray)
              return ret.toArray();
          else
              return ret;
      },
      apply: function(value) {
        var array = value;

        for (var j = 0; j < binding.generatedEls.length; j++)
          binding.generatedEls[j].remove();

        binding.generatedEls = [];
        binding.subBindings = [];

        if (array == null)
          return;

        for (var i = array.length - 1; i >= 0; i--) {
          var $newEl = $(html).removeAttr("nw-repeat");
          
          $newEl.insertAfter($el);

          if (isExprTuple) {
            var tupleLoopStack = loopStack;
            for (var t = 0; t < tupleDecls.length; t++)
              tupleLoopStack = tupleLoopStack.concat({ name: tupleDecls[t], val: array[i][t] });
            nweb.applyBindings(model, $newEl[0], binding.subBindings, tupleLoopStack, true);
          } else {
            nweb.applyBindings(model, $newEl[0], binding.subBindings, loopStack.concat({ name: repeat[1], val: array[i] }), true);
          }
          
          
          binding.generatedEls.push($newEl);
        };
      }
    };
    return binding;
  },
  getTemplateBinding: function(model, el, bindings, loopStack, attrVal) {
    var $el = $(el);
    var template = /(.+):\s(.+)/.exec(attrVal);
    var parsedVal;

    if(!template) {
      template = /(.+)/.exec(el.getAttribute("nw-template"));
      parsedVal = model;
    } else {
      parsedVal = nweb.parseExpression(model, template[2], loopStack);
    }

    var parsedName = nweb.parseExpression(model, template[1], loopStack);    
    var html = $("#" + nweb.getParsedValue(model, parsedName, loopStack)).html();
    el.__nw_is_template = true;

    var binding = {
      el: $el,
      subBindings: [],
      getValue: function() {
        return nweb.getParsedValue(model, parsedVal, loopStack);
      },
      apply: function(value) {
        $el = nweb.utils.replaceWith($el, $(html).removeAttr("nw-template"));
                
        nweb.eraseGeneratedElements(binding);

        jQuery.each($el, function (i, e) {
          nweb.applyBindings(value, e, binding.subBindings = [], loopStack, true);
        });
      }
    };
    return binding;
  },
  getWhenBinding: function (model, el, bindings, loopStack, attrVal, isUnless) {
    var $el = $(el);
    var expr = nweb.parseExpression(model, attrVal, loopStack);        
    var html = el.outerHTML;
    
    $el = nweb.utils.replaceWith($el, $("<!-- " + expr + " -->"));
    el.__nw_is_template = true;

    var binding = {
      el: el,
      subBindings: [],
      getValue: function () {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function (value) {
        binding.subBindings = [];

        if (value && !isUnless) {
          $el = nweb.utils.replaceWith($el, $(html));

          if(isUnless)
            $el.removeAttr("nw-unless");
          else
            $el.removeAttr("nw-when");

          nweb.applyBindings(model, $el[0], binding.subBindings, loopStack, true);
        } else {
          $el.hide();
        }
      }
    };
    return binding;
  },
  getUnlessBinding: function (model, el, bindings, loopStack, attrVal) {
    return getWhenBinding(model, el, bindings, loopStack, attrVal, true);
  },
  getClickBinding: function(model, el, bindings, loopStack, attrVal) {
    var parsed = nweb.parseExpression(model, attrVal, loopStack);
    $(el).on("click", function() {
      nweb.execute(function() {
        nweb.getParsedValue(model, parsed, loopStack);
      });
    });
  },
  getSubmitBinding: function(model, el, bindings, loopStack, attrVal) {
    var parsed = nweb.parseExpression(model, attrVal, loopStack);
    $(el).on("submit", function() {
      nweb.execute(function() {
        nweb.getParsedValue(model, parsed, loopStack);
      });
    });
  },
  getEventsBinding: function(model, el, bindings, loopStack, attrVal) {
    var parsed = nweb.parseExpression(model, attrVal, loopStack);
    var method = nweb.getParsedValue(model, parsed, loopStack, el);
    method.apply(el);
  },
  getEventBinding: function(model, el, bindings, loopStack, attrVal) {
    var event = /(.+):\s(.+)/.exec(attrVal);
    var methodString = nweb.parseExpression(model, event[2], loopStack);
    var method = nweb.getParsedValue(model, methodString, loopStack, el);
    $(el).bind(event[1], function (e) { nweb.invalidate(); method(e); nweb.invalidate(); });
  },
  isWordCharacter: function(chr) {
    return (chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z') || chr === '_';
  },
  /// Replace all loopStack[i].name identifiers to loopStack[<index>]
  applyLoopStackToExpr: function(expr, loopStack) {
    for (var i = loopStack.length - 1; i >= 0; i--) {
      var loop = loopStack[i];

      // The code below does this
      //var re = new RegExp("(\\W|^)" + loop.name + "(\\W|$)", "g");
      //expr = expr.replace(re, "$1loopStack[" + i + "].val$2");
      
      var loopName = loop.name;
      var loopNameLen = loopName.length;
      
      for (var index = 0, exprLen = expr.length; index < exprLen;) {
        // Find loopName
        index = expr.indexOf(loopName, index);
        if (index === -1) {
          break;
        }

        // Check if we found identifier
        var indexEnd = index + loopNameLen;
        if ((index === 0 || !nweb.isWordCharacter(expr[index - 1])) &&
          (indexEnd === exprLen || !nweb.isWordCharacter(expr[indexEnd]))) {

          // Replace
          var replaceString = "loopStack[" + i + "].val";
          expr = expr.substring(0, index) + replaceString + expr.substring(indexEnd);
          
          // Update index and exprLen
          index += replaceString.length;
          exprLen = expr.length;
        } else {
          index = indexEnd;
        }
      }
    };
    return expr;
  },
  parseExpression: function(model, expr, loopStack) {
    if(expr == "self")
      return "model";
    var e = nweb.applyLoopStackToExpr(expr, loopStack);
    return e.replace(/self\./g, "model.");
  },
  parsedValueCache: {},
  getParsedValue: function(model, parsedExpr, loopStack, returnFunction) {
    if(parsedExpr.length === 0)
      return null;
    else {
      try {
        var cachedFunc = nweb.parsedValueCache[parsedExpr];
        var val;

        if (!cachedFunc) {
          var newFunc = eval("(function(model, loopStack) { return " + parsedExpr + "; } )");
          nweb.parsedValueCache[parsedExpr] = newFunc;
          val = newFunc(model, loopStack);
        } else {
          val = cachedFunc(model, loopStack);
        }

        if(nweb.utils.isFunction(val) && !returnFunction) {
          if(loopStack.length > 0)
            return val(loopStack[loopStack.length - 1].val);
          return val();
        }
        else
          return val;
      } catch (e) {
        console.error("Error evaluating: " + parsedExpr + " " + e);
        return undefined;
      }
    }
  },
  eraseGeneratedElements: function (binding) {
    if(!!binding.generatedEls)
      for (var j = 0; j < binding.generatedEls.length; j++)
        binding.generatedEls[j].remove();
    if (!!binding.subBindings)
      for (var j = 0; j < binding.subBindings.length; j++)
        nweb.eraseGeneratedElements(binding.subBindings[j]);
  },
  execute: function(code) {
    code();
    nweb.invalidate(nweb.bindings);
  },
  invalidationCount: 0,
  invalidate: function(bindings, indent, selfCall) {
    if(typeof bindings === 'undefined')
      bindings = nweb.bindings;
    nweb.invalidationCount++;
    
    indent = !!indent ? indent : "";
    // TODO: Remove
    if(false)
      console.log(indent + nweb.invalidationCount++);

    var changeFound;

    do {
      changeFound = false;
      for (var i = bindings.length - 1; i >= 0; i--) {
        var binding = bindings[i];
        var newValue = binding.getValue();

        if(typeof newValue === 'undefined')
          continue;

        if(nweb.utils.isArray(newValue)) {
          if(!binding.oldValue || !nweb.utils.areArraysEqual(newValue, binding.oldValue)) {
            changeFound = true;
            binding.apply(newValue);
          }
          binding.oldValue = newValue.slice();
        } else {
          if(binding.oldValue !== newValue) {
            changeFound = true;
            binding.apply(newValue);
            binding.oldValue = newValue;
          }
        }

        if (binding.subBindings) {
          changeFound |= nweb.invalidate(binding.subBindings, indent + "  ", true);
        }
      }
      //Repeat only on top level, so every binding will be invalidated exactly once per invalidation cycle
    } while (changeFound && !selfCall) 
    
    return changeFound;
  },
  savePosition: function($el) {
      $el[0].__nw_prev = $el.prev();
      $el[0].__nw_parent = $el.parent();      
  },
  restoreInSavedPosition: function($el) {    
    if ($el[0].__nw_prev.length > 0)
        $el[0].__nw_prev.after($el);
    else
        $el[0].__nw_parent.prepend($el);
  },
  getValue: function(el) {
    if(el.tagName === "SELECT") {
      var selected = $("option:selected", el)[0];
      if(selected)
        return selected[nweb.dataKey];
      return $("option", el)[0][nweb.dataKey];
    } else {
      return $(el).val();
    }
  },
  setValue: function(el, val) {
    if(el.tagName === "SELECT") {
      var toSelect = $("option", el).filter(function() {
        return this[nweb.dataKey] == val;
      }).prop("selected", false);
      toSelect.prop("selected", true);
    } else if(el.tagName === "OPTION") {
      el[nweb.dataKey] = val;
    } else {
      var $el = $(el);
      if($el.val() != val)
        $el.val(val);
    }
  },
  dataKey: "__nw_value_data",
  bindings: []  
};

nweb.utils = {
    isArray: function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },    
    isFunction: function(obj) {
        return obj && { }.toString.call(obj) === '[object Function]';
    },
    firstProperty: function(obj) {
        for(var v in obj) return v;
    },
    toTypedObject: function (obj) {
        if (obj != null && !!obj.$type) {
          var typename = obj.$type.replace(/\./g, "_").replace(/\+/g, "_").replace(/(.+),.+/g, "$1");
          
          if (nweb.utils.isTuple(obj)) {
            var tuple = [];
            for (var field in obj) {
              var match = field.match(/Field(\d+)/);
              if (match) {
                tuple[match[1]] = nweb.utils.toTypedObject(obj[field]);
              }
            }
            
            return tuple;
          }
          
          var typenameCtor = typename + '$ctor';
          var hasTypenameCtor = typeof window[typenameCtor] !== "undefined";
          var newObj = new window[typename](hasTypenameCtor ? nweb.utils.firstProperty(window[typenameCtor]) : '');

          for (var p in obj) {
            var propSetter = "set_" + p;
            if (obj.hasOwnProperty(p)) {
              if (newObj.hasOwnProperty(propSetter) && typeof newObj[propSetter] === "function")
                newObj[propSetter](nweb.utils.toTypedObject(obj[p]));
              else if (newObj.hasOwnProperty(p))
                newObj[p] = nweb.utils.toTypedObject(obj[p]);
            }
          }
          return newObj;
        }
        if (obj instanceof Array) {
            var newArr = [];
            for (var i = 0, l = obj.length; i < l; newArr.push(nweb.utils.toTypedObject(obj[i++]))) ;
            return newArr;
        }
        return obj;
    },
    getObjectType: function(obj) {
      return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1];
    },
    isTuple: function(obj) {
      return !!obj.$type && obj.$type.indexOf('Nemerle.Builtins.Tuple`') === 0;
    },
    normalizeObjectForServer: function (obj) {
      if (nweb.utils.getObjectType(obj) !== "Object" || obj === null)
        return obj;

      var excludedFields = [];
      var meta = obj["__nweb_meta"];
      if (meta !== null && typeof meta !== 'undefined') {
        for (var i = 0; i < meta.properties.length; i++) {
          var property = meta.properties[i];
          if (property.attrs.indexOf("ClientOnly") != -1)
            excludedFields.push("get_" + property.name);
        }
        
        for (var i = 0; i < meta.fields.length; i++) {
          var field = meta.fields[i];
          if (field.attrs.indexOf("ClientOnly") != -1)
            excludedFields.push(field.name);
        }

        excludedFields.push("__nweb_meta");
      }

      var result = {};
      var isFunction = function (m) {
        var isGeneratedMethod = nweb.utils.getObjectType(m) === 'Object' && nweb.utils.getObjectType(m[""]) === 'Function';
        var isNormalFunction = nweb.utils.getObjectType(m) === 'Function';
        return isGeneratedMethod || isNormalFunction;
      };

      for (var member in obj) {
        if (obj.hasOwnProperty(member) && member.indexOf('_N_') != 0 && excludedFields.indexOf(member) === -1) {
          if (nweb.utils.getObjectType(obj[member]) === 'Function' && member.indexOf("get_") === 0)
            result[member.substr(4)] = nweb.utils.normalizeObjectForServer(obj[member]());
          else if(!isFunction(obj[member]))
            result[member] = nweb.utils.normalizeObjectForServer(obj[member]);
        }
      }
      return result;
    },
    getTemplateName: function(model, viewName) {
        if (!model)
            throw "Model passed in template() cannot be null or undefined. Make sure, you initialized members that are used in templating.";

        return nweb.utils.getConstructorName(model) + "_" + viewName;
    },
    getConstructorName: function(model) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(model.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    },
    htmlEncode: function(value) {
        return $('<div/>').text(value).html();
    },
    htmlDecode: function(value) {
        return $('<div/>').html(value).text();
    },
    getElementAttributes: function(el) {
        var arr = [];
        for (var i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
            arr.push(attrs[i]);
        }
        arr.sort(function (a, b) {
          if (a.nodeName === "nw-repeat")
            return -2;
          if (a.nodeName === "nw-when" || a.nodeName === "nw-unless")
            return -1;
          return 1;
        });
        return arr;
    },
    replaceWith: function($el, $newEl) {
        $el.replaceWith($newEl);
        return $newEl;
    },
    makeAssignExpression: function(expr, value) {
        var m = /(get_([^\.]+))\(\)$/;;
        var setExpr = expr.replace(m, "set_$2");

        if (expr == setExpr)
            return expr + " = " + value + ";";
        else
            return setExpr + "(" + value + ");";
    },
    getFieldsAndProperties: function (model) {
      var result = [];
      var meta = model.__nweb_meta;
      
      if (meta) {
        var usedProps = {};
        for (var p = 0; p < meta.properties.length; p++) {
          var val = model["get_" + meta.properties[p].name]();
          
          usedProps[meta.properties[p].name] = '';

          result.push({ name: meta.properties[p].name, val: val });
        }
        for (var f = 0; f < meta.fields.length; f++) {
          var m = meta.fields[f].name.match(/_N_(.+)_\d+/);
          
          if(!(m.length === 2 && usedProps[m[1]] === ''))
            result.push({ name: meta.fields[f].name, val: model[meta.fields[f].name] });
        }
        
      } else {
        for (var k in model)
          if(model.hasOwnProperty(k))
            result.push({ name: k, val: model[k] });
      }
      
      return result;
    },
    loadTemplate: function(modelName) {
      
    }
};

if (nweb.debugger) {
    nweb.utils.areArraysEqual = function(l, r) {
        if (l.length != r.length)
            return false;
        return JSON.stringify(l) === JSON.stringify(r);
    };
} else {
    nweb.utils.areArraysEqual = function(l, r) {
        if (r.length !== l.length)
            return false;
        for (var i = 0, len = l.length; i < len; i++)
            if (l[i] !== r[i])
                return false;
        return true;
    };
}

Array.prototype.getEnumerator = function() {
    this.__enumeratorIndex = -1;
    this.Current = null;
    this.get_Current = function() {
      return this.Current;
    };
    return this;
};

Array.prototype.dispose = Array.prototype.getEnumerator;

Array.prototype.moveNext = function() {
    if (typeof this.__enumeratorIndex === 'undefined')
        this.__enumeratorIndex = -1;
    this.Current = this[this.__enumeratorIndex++];
    return this.__enumeratorIndex < this.length;
};

Array.prototype.current = function() {
    return this[this.__enumeratorIndex];
};

Array.prototype.hd = function() {
    return this[0];
};

Array.prototype.tl = function() {
    return this.slice(1);
};

Array.prototype.Head = Array.prototype.hd;
Array.prototype.Tail = Array.prototype.tl;

Array.prototype.remove = function() {
    var what, ax;
    while (arguments.length && this.length) {
        what = arguments[--arguments.length];
        while ((ax = this.indexOf(what)) != -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (what, i) {
        i = i || 0;
        while (i < this.length) {
            if (this[i] === what) return i;
            ++i;
        }
        return -1;
    };
}

// Implement Object.keys for browser which doesn't support
Object.keys = Object.keys || (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
        DontEnums = [ 
            'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty',
            'isPrototypeOf', 'propertyIsEnumerable', 'constructor'
        ],
        DontEnumsLength = DontEnums.length;

    return function (o) {
        if (typeof o !== "object" && typeof o !== "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");

        var result = [];
        for (var name in o) {
            if (hasOwnProperty.call(o, name))
                result.push(name);
        }

        if (hasDontEnumBug) {
            for (var i = 0; i < DontEnumsLength; i++) {
                if (hasOwnProperty.call(o, DontEnums[i]))
                    result.push(DontEnums[i]);
            }   
        }

        return result;
    };
})();

String.prototype.getEnumerator = function () {
    this.__enumeratorIndex = -1;
    this.Current = null;
    this.get_Current = function() {
      return this.Current;
    };
    return this;
};

String.prototype.dispose = String.prototype.getEnumerator;

String.prototype.moveNext = function () {
    if (typeof this.__enumeratorIndex === 'undefined')
        this.__enumeratorIndex = -1;
    this.__enumeratorIndex++;
    this.Current = this[this.__enumeratorIndex];
    return this.__enumeratorIndex < this.length;
};

String.prototype.current = function () {
    return this[this.__enumeratorIndex];
};

// TODO: Maybe move
var Nemerle_Utility_Identity_$A$$B$_ = {
    Instance: function (x) {
        return x;
    }
};

function Nemerle_Core_Some_$T$__$T$_(sig, val) {
  this.val = val;
  this._N_GetVariantCode = function () {
    return 1;
  };
}

function Nemerle_Core_None_$T$__$T$_() {
  this._N_GetVariantCode = function () {
    return 0;
  };
}

Nemerle_Core_None_$T$__$T$_._N_constant_object = new Nemerle_Core_None_$T$__$T$_();

function Nemerle_Core_option_$T$__$T$_(sig, val) {
  this.val = val;
}

function System_Text_StringBuilder() {
    this.string = "";

    this.get_Length = function (newLength) {
        return this.string.length;
    };

    this.set_Length = function (newLength) {
        if (newLength < 0) throw "Length must be positive";

        if (this.string.length > newLength)
            this.string = this.string.substring(0, newLength);        
    };

    this.Append = function (s) {
        if (typeof s === "object" && ("ToString" in s) &&
            typeof s.ToString === "object" && nweb.utils.isFunction(s.ToString[""]))
            this.string += s.ToString[""].call(s);
        else
            this.string += s;
        return this;
    };

    this.AppendLine = function(s) {
      switch (arguments.length) {
      case 0:
        return this.Append("\n");
      case 1:
        return this.Append(s).Append("\n");
      default:
        throw "Invalid number of parameters";
      }
    };

    this.ToString = function() {
      return this.string;
    };
}

// This is not constructor, call directly without 'new'.
function System_String() {
    if (nweb.utils.isArray(arguments[0]))
        return arguments[0].join("");
    else
        return arguments[0];
}

// This is not constructor, call directly without 'new'.
function System_Collections_Generic_List(arg) {
    if (typeof arg === typeof 0)
        return [];
    else
        return Enumerable.from(arg).toArray();
}

// This is not constructor, call directly without 'new'.
function System_Collections_Generic_Stack(arg) {
    if (typeof arg === typeof 0)
        return [];
    else
        return Enumerable.from(arg).toArray();
}

function System_ArgumentNullException(paramName, message) {
    this.paramName = paramName;
    this.message = message;
}

var System_Environment = {};
System_Environment.get_NewLine = function() {
  return "\n";
};

nweb.collection = {
    areArrayEqual : function(arr1, arr2) {
        if (arr1.length != arr2.length)
            return false;

        for (var i = 0; i < arr1.length; i++)
            if (arr1[i] != arr2[i])
                return false;

        return true;
    }
};

nweb.templateCollection = { };