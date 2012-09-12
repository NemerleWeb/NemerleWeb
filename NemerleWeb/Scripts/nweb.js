nweb = {
  go: function(model) {    
    nweb.applyBindings(model, document.body, nweb.bindings, []);
    nweb.invalidate(nweb.bindings);
  },
  applyBindings: function(model, el, bindings, loopStack) {
    for(var i = 0; i < el.childNodes.length; i++) {
      var child = el.childNodes[i];      
      if(child.nodeType != 1)
        continue;

      if(child.hasAttribute("nw-text")) {
        nweb.applyTextBinding(model, child, bindings, loopStack);
      } else if(child.hasAttribute("nw-value")) {
        nweb.applyValueBinding(model, child, bindings, loopStack);
      } else if(child.hasAttribute("nw-click")) {
        nweb.applyClickBinding(model, child, bindings, loopStack);
      } else if(child.hasAttribute("nw-repeat")) {
        nweb.applyRepeatBinding(model, child, bindings, loopStack);
        continue;        
      } else if(child.hasAttribute("nw-template")) {
        nweb.applyTemplateBinding(model, child, bindings, loopStack);
      } else if(child.hasAttribute("nw-if")) {

      }
      nweb.applyBindings(model, child, bindings, loopStack);
    }
  },
  applyTextBinding: function(model, el, bindings, loopStack) {
    var prop = el.getAttribute("nw-text");
    var parsed = nweb.parseExpression(model, prop, loopStack);
    var binding = {
      el: el,
      getValue: function() {
        var val = nweb.getParsedValue(parsed);
        if(nweb.utils.isFunction(val))
          return parsed.model[parsed.prop]();
        else
          return val;
      },
      apply: function() {
        el.innerHTML = binding.getValue();
      }
    };
    bindings.push(binding);
  },
  applyValueBinding: function(model, el, bindings, loopStack) {
    var prop = el.getAttribute("nw-value");
    var parsed = nweb.parseExpression(model, prop, loopStack);
    var binding = {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(parsed);
      },
      apply: function() {
        var $el = $(el);
        if($el.is(":text")) {
          $el.on("keyup", function() {
            nweb.execute(function() {
              eval("parsed.model." + parsed.prop + " = $(el).val();");
            });
          });
        } else {
          $(el).change(function() {
            nweb.execute(function() {
              eval("parsed.model." + parsed.prop + " = $(el).val();");
            });
          })
        }
        $el.val(binding.getValue());
      }
    };
    bindings.push(binding);
  },
  applyRepeatBinding: function(model, el, bindings, loopStack) {
    var repeat = /(.+)\sin\s(.+)/.exec(el.getAttribute("nw-repeat"));
    var html = el.outerHTML;    
    var parsed = nweb.parseExpression(model, repeat[2], loopStack);
    el.style.display = "none";

    var binding = {
      el: el,
      generatedEls: [],
      bindings: [],
      getValue: function() {
        return nweb.getParsedValue(parsed);
      },
      apply: function() {
        var array = binding.getValue();

        for (var i = 0; i < binding.generatedEls.length; i++)
          $(binding.generatedEls[i]).remove();

        binding.bindings = [];

        for (var i = 0; i < array.length; i++) {
          var newEl = $(html).removeAttr("nw-repeat")
                             .insertAfter(el);
          nweb.applyBindings(model, newEl[0], binding.bindings, loopStack.concat({name: repeat[1], val: array[i]}));
          binding.generatedEls.push(newEl[0]);
        };
      }
    };
    bindings.push(binding);
  },
  applyTemplateBinding: function(model, el, bindings, loopStack) {
    var template = /(.+):\s(.+)/.exec(el.getAttribute("nw-template"));
    var html = $("#" + template[1]).html();
    var parsed = nweb.parseExpression(model, template[2], loopStack);
    var binding = {
      el: el,
      getValue: function() {
        return nweb.getParsedValue(parsed);
      },
      apply: function() {
        var prop = binding.getValue();    
        $(el).html(html);
        nweb.applyBindings(prop, el, bindings, loopStack);
      }
    };
    bindings.push(binding);
  },
  parseExpression: function(model, prop, loopStack) {
    for (var i = 0; i < loopStack.length; i++)
      if(prop.indexOf(loopStack[i].name) == 0)
        return { 
          model: loopStack[i].val,
          prop: prop.substr(2)
        };
    return {
      model: model,
      prop: prop
    }
  },
  getParsedValue: function(parsedExpr) {
    if(parsedExpr.prop.length === 0)
      return parsedExpr.model;
    else 
      return eval("parsedExpr.model." + parsedExpr.prop);
  },
  applyClickBinding: function(model, el, bindings, loopStack) {
    var prop = el.getAttribute("nw-click");
    var parsed = nweb.parseExpression(model, prop, loopStack);
    $(el).on("click", function() {
      nweb.execute(function() {
        eval("parsed.model." + parsed.prop + "()");  
      })
    });
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
            binding.apply();
          }

          binding.oldValue = newValue.slice();
          nweb.invalidate(binding.bindings);
        } else {
          if(binding.oldValue !== newValue) {
            changeFound = true;
            binding.apply();
            binding.oldValue = newValue;
          }
        }        
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
    if(a1.length !== a2.length)
      return false;
    for (var i = 0; i < a1.length; i++)
      if(a1[i] !== a2[i])
        return false;
    return true;
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
