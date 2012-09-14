nweb = {
  go: function(model) {    
    nweb.applyBindings(model, document.body, nweb.bindings, []);
    nweb.invalidate(nweb.bindings);
  },
  applyBindings: function(model, el, bindings, loopStack, startWithSelf) {
    var applyElement = function(currentEl) {
      if(currentEl.nodeType != 1)
        return;

      if (currentEl.hasAttribute("nw-repeat")) {        
        nweb.applyRepeatBinding(model, currentEl, bindings, loopStack);
        return;
      }
      if (currentEl.hasAttribute("nw-text"))
        nweb.applyTextBinding(model, currentEl, bindings, loopStack);
      if (currentEl.hasAttribute("nw-value"))
        nweb.applyValueBinding(model, currentEl, bindings, loopStack);
      if (currentEl.hasAttribute("nw-checked"))
        nweb.applyCheckedBinding(model, currentEl, bindings, loopStack);
      if (currentEl.hasAttribute("nw-click"))
        nweb.applyClickBinding(model, currentEl, bindings, loopStack);
      if (currentEl.hasAttribute("nw-template"))
        nweb.applyTemplateBinding(model, currentEl, bindings, loopStack);
      if (currentEl.hasAttribute("nw-when")) {
        nweb.applyIfBinding(model, currentEl, bindings, loopStack, false);
        return;
      }
      if (currentEl.hasAttribute("nw-unless")) {
        nweb.applyIfBinding(model, currentEl, bindings, loopStack, true);
        return;
      }

      nweb.applyBindings(model, currentEl, bindings, loopStack, false);
    }
    if(startWithSelf)
      applyElement(el)
    for(var i = 0; i < el.childNodes.length; i++) {
      var child = el.childNodes[i];   
      applyElement(child);
    }
  },
  applyTextBinding: function(model, el, bindings, loopStack) {
    var prop = el.getAttribute("nw-text");
    var expr = nweb.parseExpression(model, prop, loopStack);
    var binding = {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        el.innerHTML = nweb.utils.htmlEncode(value);
      }
    };
    bindings.push(binding);
  },
  applyValueBinding: function(model, el, bindings, loopStack) {
    var prop = el.getAttribute("nw-value");
    var expr = nweb.parseExpression(model, prop, loopStack);
    var $el = $(el);
    var binding = {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        $el.val(value);
      }
    };

    if($el.is(":text")) {
      $el.on("keyup", function() {
        nweb.execute(function() {
          eval(expr + " = $el.val();");
        });
      });
    } else {
      $(el).change(function() {
        nweb.execute(function() {
          eval(expr + " = $el.val();");
        });
      })
    };

    bindings.push(binding);
  },
  applyCheckedBinding: function(model, el, bindings, loopStack) {
    var prop = el.getAttribute("nw-checked");
    var expr = nweb.parseExpression(model, prop, loopStack);
    var $el = $(el);
    var binding = {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        $el.prop("checked", value);
      }
    };

    $(el).change(function() {
      nweb.execute(function() {
        eval(expr + " = $el.prop('checked');");
      });
    })

    bindings.push(binding);
  },
  applyRepeatBinding: function(model, el, bindings, loopStack) {
    var repeat = /(.+)\sin\s(.+)/.exec(el.getAttribute("nw-repeat"));
    var html = el.outerHTML;    
    var expr = nweb.parseExpression(model, repeat[2], loopStack);
    el.style.display = "none";

    var binding = {
      el: el,
      generatedEls: [],
      subBindings: [],
      getValue: function() {
        return nweb.getParsedValue(model, expr, loopStack);
      },
      apply: function(value) {
        var array = value;

        for (var i = 0; i < binding.generatedEls.length; i++)
          binding.generatedEls[i].remove();

        binding.generatedEls = [];
        binding.subBindings = [];
        for (var i = 0; i < array.length; i++) {
          var newEl = $(html).removeAttr("nw-repeat");
          if(binding.generatedEls.length > 0)
            binding.generatedEls[binding.generatedEls.length - 1].after(newEl);
          else
            newEl.insertAfter(el);
          nweb.applyBindings(model, newEl[0], binding.subBindings, loopStack.concat({ name: repeat[1], val: array[i] }), true);
          binding.generatedEls.push(newEl);
        };
      }
    };
    bindings.push(binding);
  },
  applyTemplateBinding: function(model, el, bindings, loopStack) {
    var template = /(.+):\s(.+)/.exec(el.getAttribute("nw-template"));
    
    var parsedName = nweb.parseExpression(model, template[1], loopStack);
    var parsedVal = nweb.parseExpression(model, template[2], loopStack);
    var html = $("#" + nweb.getParsedValue(model, parsedName, loopStack)).html();

    var binding = {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(model, parsedVal, loopStack);
      },
      apply: function(value) {
        var prop = value;    
        $(el).html(html);
        nweb.applyBindings(prop, el, bindings, loopStack);
      }
    };
    bindings.push(binding);
  },
  applyIfBinding: function (model, el, bindings, loopStack, negate) {
      var expr = negate ? el.getAttribute("nw-unless") : el.getAttribute("nw-when");
      var expr = nweb.parseExpression(model, expr, loopStack);
      var $el = $(el);
      var prev = $el.prev();
      var parent = $el.parent();
      var binding = {
          el: el,
          getValue: function () {
              return nweb.getParsedValue(model, expr, loopStack);
          },
          apply: function (value) {
              var value = value;
              binding.subBindings = [];

              if (value == !negate) {
                  if (prev.length > 0)
                      prev.after(el);
                  else
                      parent.prepend(el);

                  nweb.applyBindings(model, el, binding.subBindings, loopStack);
              } else {
                  $el.remove();
              }
          }
      };

      $el.remove();
      bindings.push(binding);
  },
  applyClickBinding: function(model, el, bindings, loopStack) {
    var prop = el.getAttribute("nw-click");
    var parsed = nweb.parseExpression(model, prop, loopStack);
    $(el).on("click", function() {
      nweb.execute(function() {
        nweb.getParsedValue(model, parsed, loopStack);  
      })
    });
  },
  parseExpression: function(model, prop, loopStack) {
    var expr = nweb.applyLoopStackToExpr(prop, loopStack);
    return expr.replace("self.", "model.");
  },
  getParsedValue: function(model, parsedExpr, loopStack) {
    if(parsedExpr.length === 0)
      return null;
    else {      
      try {
        var val = eval(parsedExpr);
        if(nweb.utils.isFunction(val)) {
          if(loopStack.length > 0)
            return val(loopStack[loopStack.length - 1].val);
          return val();
        }
        else
          return val;
      } catch(e) {
        console.log("Error getting: " + parsedExpr);
        return null;
      }
    }
  },
  applyLoopStackToExpr: function(expr, loopStack) {
    for (var i = 0; i < loopStack.length; i++) {
      var loop = loopStack[i];
      var re = new RegExp("(\\W|^)" + loop.name + "(\\W|$)", "g");
      expr = expr.replace(re, "$1loopStack[" + i + "].val$2");
    };
    return expr;
  },
  execute: function(code) {
    code();
    nweb.invalidate(nweb.bindings);
  },
  invalidate: function(bindings) {
    if(typeof bindings === 'undefined')
      bindings = nweb.bindings;
    var changeFound;
    do {
      changeFound = false;
      for (var i = 0; i < bindings.length; i++) {
        var binding = bindings[i];
        var newValue = binding.getValue();

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
        if (binding.subBindings)
            nweb.invalidate(binding.subBindings);
      }
    } while(changeFound)
  },
  bindings: []  
};

nweb.utils = {
  isArray: function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
  areArraysEqual: function(a1, a2) {    
    return JSON.stringify(a1) == JSON.stringify(a2);
  },
  isFunction: function(obj) {    
    return obj && {}.toString.call(obj) == '[object Function]';
  },
  toTypedObject: function (obj) {
      if (typeof obj === "string") {
          try {
              obj = JSON.parse(obj);
          } catch (e) {
          }
      }

      if (!!obj.$type) {
          var typename = obj.$type.replace(/\./g, "_").replace(/\+/g, "_").replace(/(.+),.+/g, "$1");
          var newObj = eval('new ' + typename + '()');
          for (var p in obj) {
              if (obj.hasOwnProperty(p) && newObj.hasOwnProperty(p)) {
                  if (typeof newObj[p] === "function")
                      newObj[p](nweb.utils.toTypedObject(obj[p]));
                  else
                      newObj[p] = nweb.utils.toTypedObject(obj[p]);
              }
          }
          return newObj;
      }
      if (obj instanceof Array) {
          var newArr = [];
          for (var i = 0, l = obj.length; i < l; newArr.push(nweb.utils.toTypedObject(obj[i++])));
          return newArr;
      }
      return obj;
  },
  getTemplateName: function (model, viewName) {
      if (!model)
          return "";

      return nweb.utils.getConstructorName(model) + "__" + viewName;
  },
  getConstructorName: function (model) {
      var funcNameRegex = /function (.{1,})\(/;
      var results = (funcNameRegex).exec(model.constructor.toString());
      return (results && results.length > 1) ? results[1] : "";
  },
  htmlEncode: function(value){
    return $('<div/>').text(value).html();
  },
  htmlDecode: function(value) {
    return $('<div/>').html(value).text();
  }
}

Array.prototype.getEnumerator = function () {
    this.__enumeratorIndex = -1;
    this.Current = null;
    return this;
}

Array.prototype.dispose = Array.prototype.getEnumerator;

Array.prototype.moveNext = function () {
    if (typeof this.__enumeratorIndex === 'undefined')
        this.__enumeratorIndex = -1;
    this.__enumeratorIndex++;
    this.Current = this[this.__enumeratorIndex];
    return this.__enumeratorIndex < this.length;
}

Array.prototype.current = function () {
    return this[this.__enumeratorIndex];
}

Array.prototype.hd = function () {
    return this[0];
}

Array.prototype.tl = function () {
    return this.splice(1);
}

Array.prototype.Head = Array.prototype.hd;
Array.prototype.Tail = Array.prototype.tl;