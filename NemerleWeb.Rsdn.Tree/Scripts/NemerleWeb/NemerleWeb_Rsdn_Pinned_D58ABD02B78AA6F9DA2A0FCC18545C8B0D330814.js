
  var NemerleWeb_Rsdn_Pinned$ctor = {};
  NemerleWeb_Rsdn_Pinned$ctor[""] = function() {
    var _nw_self = this;
    _nw_self.set_Node(new NemerleWeb_Rsdn_TreeNode(""));
    _nw_self.UpdatePinned[""].call(_nw_self)
  }
  function NemerleWeb_Rsdn_Pinned() {
    var _nw_self = this;
    _nw_self.get_Node = _nw_self.get_Node$$= function() {
      var _nw_self = this;
      return _nw_self._N_Node_8265
    };
    _nw_self.set_Node = _nw_self.set_Node$$= function(value) {
      var _nw_self = this;
      _nw_self._N_Node_8265 = value
    };

    _nw_self.UpdatePinned = {};
    _nw_self.UpdatePinned$$ = {};
    _nw_self.UpdatePinned[""] = _nw_self.UpdatePinned$$[""] = function() {
      
      var _N_wildcard_3547_18328 = $.ajax({
  url: '/Pinned/LoadByIds',
  type: 'POST',
  dataType: 'json',
  data: { model: '{ids: ' + JSON.stringify(nweb.utils.normalizeObjectForServer(_nw_self.GetPinned[""].call(_nw_self))) + '}' },
  success: function(result) {
    var typed = nweb.utils.toTypedObject(result);
    var callback = function (nodes) {   _nw_self.get_Node().set_Children(nodes) };
    if(result != null && nweb.utils.isTuple(result))
      callback.apply(undefined, typed);
    else
      callback(typed);

    nweb.invalidate();
  }
})
    }
    _nw_self.AddPinned = {};
    _nw_self.AddPinned$$ = {};
    _nw_self.AddPinned["System.String"] = _nw_self.AddPinned$$["System.String"] = function(id) {
      
      _nw_self._cookieCache = null;
      var pinned_18358 = nweb.getCookie("pinned");
      var _N_T_temp_var_12 = (pinned_18358 === null);
      if((_N_T_temp_var_12 || (typeof pinned_18358 === "undefined"))) { 
        nweb.setCookie("pinned", id, 360)
      } else {
        nweb.setCookie("pinned", pinned_18358.concat(",").toString().concat(id), 360)
      };
      _nw_self.UpdatePinned[""].call(_nw_self)
    }
    _nw_self.RemovePinned = {};
    _nw_self.RemovePinned$$ = {};
    _nw_self.RemovePinned["System.String"] = _nw_self.RemovePinned$$["System.String"] = function(id) {
      
      _nw_self._cookieCache = null;
      var pinned_18369 = nweb.getCookie("pinned");
      var _N_T_temp_var_13 = (pinned_18369 !== null);
      if((_N_T_temp_var_13 && (typeof pinned_18369 !== "undefined"))) { 
        nweb.setCookie("pinned", pinned_18369.replace(RegExp(",?".concat(id), "g"), ""), 360)
      } else {

      };
      _nw_self.UpdatePinned[""].call(_nw_self)
    }
    _nw_self.GetPinned = {};
    _nw_self.GetPinned$$ = {};
    _nw_self.GetPinned[""] = _nw_self.GetPinned$$[""] = function() {
      
      var _nw_returnValue;
      var pinnedStr_18431;
      var _N_T_temp_var_14 = (_nw_self._cookieCache !== null);
      if((_N_T_temp_var_14 && (typeof _nw_self._cookieCache !== "undefined"))) { 
        pinnedStr_18431 = _nw_self._cookieCache
      } else {
        pinnedStr_18431 = nweb.getCookie("pinned")
      };
      var _N_T_temp_var_15 = (pinnedStr_18431 === null);
      if((_N_T_temp_var_15 || (typeof pinnedStr_18431 === "undefined"))) { 
        _nw_returnValue = []
      } else {
        str_18432 = pinnedStr_18431;
        _nw_returnValue = str_18432.split([","])
      };
      return _nw_returnValue
    }
    _nw_self.IsPinned = {};
    _nw_self.IsPinned$$ = {};
    _nw_self.IsPinned["NemerleWeb.Rsdn.TreeNode"] = _nw_self.IsPinned$$["NemerleWeb.Rsdn.TreeNode"] = function(node) {
      
      return Enumerable.from(_nw_self.GetPinned[""].call(_nw_self)).any(function (id) {   return (id === node.get_Id()) })
    }
    _nw_self.AddPinned[""] = _nw_self.AddPinned["System.String"]
    _nw_self.RemovePinned[""] = _nw_self.RemovePinned["System.String"]
    _nw_self.IsPinned[""] = _nw_self.IsPinned["NemerleWeb.Rsdn.TreeNode"]
    _nw_self._cookieCache = null;
    _nw_self._N_Node_8265 = null
    NemerleWeb_Rsdn_Pinned$ctor[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1))
    _nw_self.get_Node = _nw_self.get_Node$$;
    _nw_self.set_Node = _nw_self.set_Node$$;

    _nw_self.UpdatePinned[""] = _nw_self.UpdatePinned$$[""];
    _nw_self.AddPinned["System.String"] = _nw_self.AddPinned$$["System.String"];
    _nw_self.RemovePinned["System.String"] = _nw_self.RemovePinned$$["System.String"];
    _nw_self.GetPinned[""] = _nw_self.GetPinned$$[""];
    _nw_self.IsPinned["NemerleWeb.Rsdn.TreeNode"] = _nw_self.IsPinned$$["NemerleWeb.Rsdn.TreeNode"];
    _nw_self.AddPinned[""] = _nw_self.AddPinned["System.String"]
    _nw_self.RemovePinned[""] = _nw_self.RemovePinned["System.String"]
    _nw_self.IsPinned[""] = _nw_self.IsPinned["NemerleWeb.Rsdn.TreeNode"]
///SignalR///
    _nw_self.__nweb_meta = {
      properties: [{ name: "Node", attrs: [''], ValueType: false }],
      fields:     [{ name: "_cookieCache", attrs: [''], ValueType: false },{ name: "_N_Node_8265", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: false }],
      methods:    []
    };

  }





