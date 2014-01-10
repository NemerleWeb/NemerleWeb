
  var NemerleWeb_Rsdn_MainPage$ctor = {};
  NemerleWeb_Rsdn_MainPage$ctor[""] = function() {
    var _nw_self = this;
    NemerleWeb_Rsdn_MainPage.Instance = _nw_self;
    _nw_self.set_Search(new NemerleWeb_Rsdn_Search(""));
    _nw_self.set_Pinned(new NemerleWeb_Rsdn_Pinned(""));
    _nw_self.set_IsMobile((window.document.body.clientWidth < 1000));
    var _N_wildcard_3547_17800 = $.ajax({
  url: '/MainPage/GetTopNodes',
  type: 'POST',
  dataType: 'json',
  data: { model: '{}' },
  success: function(result) {
    var typed = nweb.utils.toTypedObject(result);
    var callback = function (nodes) {   console.log("loaded top node");
  var _N_T_temp_var_5;
  var _N_initializedObject_17790_17791 = new NemerleWeb_Rsdn_TreeNode("");
  _N_initializedObject_17790_17791.set_Children(nodes);
  _N_T_temp_var_5 = _N_initializedObject_17790_17791;
  _nw_self.set_Root(_N_T_temp_var_5) };
    if(result != null && nweb.utils.isTuple(result))
      callback.apply(undefined, typed);
    else
      callback(typed);

    nweb.invalidate();
  }
});
    var _N_wildcard_3547_17819 = $.ajax({
  url: '/MainPage/GetPopularNodes',
  type: 'POST',
  dataType: 'json',
  data: { model: '{}' },
  success: function(result) {
    var typed = nweb.utils.toTypedObject(result);
    var callback = function (nodes) {   var pinned_17806 = _nw_self.get_Pinned().GetPinned[""].call(_nw_self.get_Pinned());
  var _N_T_temp_var_6;
  var _N_initializedObject_17807_17808 = new NemerleWeb_Rsdn_TreeNode("");
  _N_initializedObject_17807_17808.set_Children(Enumerable.from(nodes).where(function (n) {   return !(Enumerable.from(pinned_17806).any(function (p) {   return (p !== n.get_Id()) })) }));
  _N_T_temp_var_6 = _N_initializedObject_17807_17808;
  _nw_self.set_Popular(_N_T_temp_var_6) };
    if(result != null && nweb.utils.isTuple(result))
      callback.apply(undefined, typed);
    else
      callback(typed);

    nweb.invalidate();
  }
})
  }
  function NemerleWeb_Rsdn_MainPage() {
    var _nw_self = this;
    _nw_self.get_PreviousState = _nw_self.get_PreviousState$$= function() {
      var _nw_self = this;
      return _nw_self._N_PreviousState_8154
    };
    _nw_self.set_PreviousState = _nw_self.set_PreviousState$$= function(value) {
      var _nw_self = this;
      _nw_self._N_PreviousState_8154 = value
    };

    _nw_self.get_CurrentState = _nw_self.get_CurrentState$$= function() {
      var _nw_self = this;
      return _nw_self._N_CurrentState_8147
    };
    _nw_self.set_CurrentState = _nw_self.set_CurrentState$$= function(value) {
      var _nw_self = this;
      _nw_self._N_CurrentState_8147 = value
    };

    _nw_self.get_IsMobile = _nw_self.get_IsMobile$$= function() {
      var _nw_self = this;
      return _nw_self._N_IsMobile_8140
    };
    _nw_self.set_IsMobile = _nw_self.set_IsMobile$$= function(value) {
      var _nw_self = this;
      _nw_self._N_IsMobile_8140 = value
    };

    _nw_self.get_CurrentView = _nw_self.get_CurrentView$$= function() {
      var _nw_self = this;
      var _nw_returnValue;
      if(_nw_self.get_IsMobile()) { 
        _nw_returnValue = "MobileView"
      } else {
        _nw_returnValue = "DesktopView"
      };
      return _nw_returnValue
    };

    _nw_self.get_SelectedNodeUrl = _nw_self.get_SelectedNodeUrl$$= function() {
      var _nw_self = this;
      var _nw_returnValue;
      var _N_T_temp_var_4 = (_nw_self.get_SelectedNode() !== null);
      if((_N_T_temp_var_4 && (typeof _nw_self.get_SelectedNode() !== "undefined"))) { 
        _nw_returnValue = _nw_self.get_SelectedNode().get_Href()
      } else {
        _nw_returnValue = ""
      };
      return _nw_returnValue
    };

    _nw_self.get_SelectedNode = _nw_self.get_SelectedNode$$= function() {
      var _nw_self = this;
      return _nw_self._N_SelectedNode_8127
    };
    _nw_self.set_SelectedNode = _nw_self.set_SelectedNode$$= function(value) {
      var _nw_self = this;
      _nw_self._N_SelectedNode_8127 = value
    };

    _nw_self.get_ActiveNodes = _nw_self.get_ActiveNodes$$= function() {
      var _nw_self = this;
      return _nw_self._N_ActiveNodes_8120
    };
    _nw_self.set_ActiveNodes = _nw_self.set_ActiveNodes$$= function(value) {
      var _nw_self = this;
      _nw_self._N_ActiveNodes_8120 = value
    };

    _nw_self.get_Search = _nw_self.get_Search$$= function() {
      var _nw_self = this;
      return _nw_self._N_Search_8113
    };
    _nw_self.set_Search = _nw_self.set_Search$$= function(value) {
      var _nw_self = this;
      _nw_self._N_Search_8113 = value
    };

    _nw_self.get_Popular = _nw_self.get_Popular$$= function() {
      var _nw_self = this;
      return _nw_self._N_Popular_8106
    };
    _nw_self.set_Popular = _nw_self.set_Popular$$= function(value) {
      var _nw_self = this;
      _nw_self._N_Popular_8106 = value
    };

    _nw_self.get_Root = _nw_self.get_Root$$= function() {
      var _nw_self = this;
      return _nw_self._N_Root_8099
    };
    _nw_self.set_Root = _nw_self.set_Root$$= function(value) {
      var _nw_self = this;
      _nw_self._N_Root_8099 = value
    };

    _nw_self.get_Pinned = _nw_self.get_Pinned$$= function() {
      var _nw_self = this;
      return _nw_self._N_Pinned_8090
    };
    _nw_self.set_Pinned = _nw_self.set_Pinned$$= function(value) {
      var _nw_self = this;
      _nw_self._N_Pinned_8090 = value
    };

    _nw_self.SelectNode = {};
    _nw_self.SelectNode$$ = {};
    _nw_self.SelectNode["NemerleWeb.Rsdn.TreeNode"] = _nw_self.SelectNode$$["NemerleWeb.Rsdn.TreeNode"] = function(node) {
      
      var getAllParents_17882 = function (node) {   var _nw_returnValue;
  var _N_T_temp_var_7 = ((node.get_Parent() !== null) && (typeof node.get_Parent() !== "undefined"));
  if((_N_T_temp_var_7 && (typeof node.get_Parent() !== "undefined"))) { 
    _nw_returnValue = [node.get_Parent()].concat(getAllParents_17882(node.get_Parent()))
  } else {
    _nw_returnValue = []
  };
  return _nw_returnValue };
      _nw_self.set_SelectedNode(node);
      _nw_self.set_ActiveNodes([node].concat(getAllParents_17882(node)));
      _nw_self.set_CurrentState(1)
    }
    _nw_self.IsActiveNode = {};
    _nw_self.IsActiveNode$$ = {};
    _nw_self.IsActiveNode["NemerleWeb.Rsdn.TreeNode"] = _nw_self.IsActiveNode$$["NemerleWeb.Rsdn.TreeNode"] = function(node) {
      
      var _nw_returnValue;
      var e1_17909 = _nw_self.get_ActiveNodes();
      var result_17910 = false;
      var _N_T_temp_var_8 = (e1_17909 !== null);
      if((_N_T_temp_var_8 && (typeof e1_17909 !== "undefined"))) { 
        result_17910 = Enumerable.from(e1_17909).any(function (n) {   return (n.get_Id() === node.get_Id()) })
      } else {

      };
      _nw_returnValue = result_17910;
      return _nw_returnValue
    }
    _nw_self.ToggleJumpList = {};
    _nw_self.ToggleJumpList$$ = {};
    _nw_self.ToggleJumpList[""] = _nw_self.ToggleJumpList$$[""] = function() {
      
      var _N_T_temp_var_9 = _nw_self.get_CurrentState();
      if((_N_T_temp_var_9 === 2)) { 
        _nw_self.set_CurrentState(_nw_self.get_PreviousState())
      } else {
        _nw_self.set_PreviousState(_nw_self.get_CurrentState());
        _nw_self.set_CurrentState(2)
      }
    }
    _nw_self.DesktopView = {};
    _nw_self.DesktopView$$ = {};
    _nw_self.DesktopView[""] = _nw_self.DesktopView$$[""] = function() {
      
      return "\r\n        <div class=\"page\">\r\n          <div class=\"left\">\r\n            <div $when(Root != null) class=\"root\">\r\n              <div template=\"$Search\" />\r\n              <div $when(string.IsNullOrEmpty(Search.SearchTerm))>\r\n                <div class=\"pinned-nodes\">\r\n                  <div template=\"$(Pinned.Node)\" />\r\n                </div>\r\n                <div template=\"$Root\" />\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"right\">\r\n            <iframe src=\"$(SelectedNodeUrl)\" frameborder=\"0\" border=\"0\" />\r\n          </div>\r\n        </div>\r\n      "
    }
    _nw_self.MobileView = {};
    _nw_self.MobileView$$ = {};
    _nw_self.MobileView[""] = _nw_self.MobileView$$[""] = function() {
      
      return "\r\n        <div class=\"mobile\">\r\n          <div class=\"mobile-toolbar\">\r\n            <span $when(CurrentState == State.Content) class=\"toggle-tree\" click=\"$(CurrentState = State.Tree)\">&lt</span>\r\n            <span $when(CurrentState == State.Tree && SelectedNode != null) class=\"toggle-tree\" click=\"$(CurrentState = State.Content)\">&gt</span>\r\n          \r\n            <span class=\"toggle-jump-list\" click=\"$(ToggleJumpList())\">jump</span>\r\n            <span $when(CurrentState == State.Content && !Pinned.IsPinned(SelectedNode)) click=\"$(Pinned.AddPinned(SelectedNode.Id))\">\r\n              pin\r\n            </span>\r\n            <span $when(CurrentState == State.Content && Pinned.IsPinned(SelectedNode)) click=\"$(Pinned.RemovePinned(SelectedNode.Id))\">\r\n              unpin\r\n            </span>\r\n          </div>\r\n          <div $when(CurrentState == State.Tree)>\r\n            <div $when(Root != null) class=\"root\">\r\n              <div template=\"$Search\" />\r\n              <div $when(string.IsNullOrEmpty(Search.SearchTerm))>\r\n                <div template=\"$Root\" />\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div visible=\"$(CurrentState == State.Content)\" class=\"mobile-right\">\r\n            <iframe src=\"$(SelectedNodeUrl)\" frameborder=\"0\" border=\"0\" />\r\n          </div>\r\n          <div $when(CurrentState == State.JumpList) class=\"jump-list\">\r\n            <div template=\"$(Pinned.Node)\" />\r\n            <div template=\"$Popular\" />\r\n          </div>\r\n        </div>\r\n      "
    }
    _nw_self.SelectNode[""] = _nw_self.SelectNode["NemerleWeb.Rsdn.TreeNode"]
    _nw_self.IsActiveNode[""] = _nw_self.IsActiveNode["NemerleWeb.Rsdn.TreeNode"]
    _nw_self._splitterAdded = false;
    _nw_self._N_PreviousState_8154 = 0;
    _nw_self._N_CurrentState_8147 = 0;
    _nw_self._N_IsMobile_8140 = false;
    _nw_self._N_SelectedNode_8127 = null;
    _nw_self._N_ActiveNodes_8120 = null;
    _nw_self._N_Search_8113 = null;
    _nw_self._N_Popular_8106 = null;
    _nw_self._N_Root_8099 = null;
    _nw_self._N_Pinned_8090 = null
    NemerleWeb_Rsdn_MainPage$ctor[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1))
    _nw_self.get_PreviousState = _nw_self.get_PreviousState$$;
    _nw_self.set_PreviousState = _nw_self.set_PreviousState$$;

    _nw_self.get_CurrentState = _nw_self.get_CurrentState$$;
    _nw_self.set_CurrentState = _nw_self.set_CurrentState$$;

    _nw_self.get_IsMobile = _nw_self.get_IsMobile$$;
    _nw_self.set_IsMobile = _nw_self.set_IsMobile$$;

    _nw_self.get_CurrentView = _nw_self.get_CurrentView$$;

    _nw_self.get_SelectedNodeUrl = _nw_self.get_SelectedNodeUrl$$;

    _nw_self.get_SelectedNode = _nw_self.get_SelectedNode$$;
    _nw_self.set_SelectedNode = _nw_self.set_SelectedNode$$;

    _nw_self.get_ActiveNodes = _nw_self.get_ActiveNodes$$;
    _nw_self.set_ActiveNodes = _nw_self.set_ActiveNodes$$;

    _nw_self.get_Search = _nw_self.get_Search$$;
    _nw_self.set_Search = _nw_self.set_Search$$;

    _nw_self.get_Popular = _nw_self.get_Popular$$;
    _nw_self.set_Popular = _nw_self.set_Popular$$;

    _nw_self.get_Root = _nw_self.get_Root$$;
    _nw_self.set_Root = _nw_self.set_Root$$;

    _nw_self.get_Pinned = _nw_self.get_Pinned$$;
    _nw_self.set_Pinned = _nw_self.set_Pinned$$;

    _nw_self.SelectNode["NemerleWeb.Rsdn.TreeNode"] = _nw_self.SelectNode$$["NemerleWeb.Rsdn.TreeNode"];
    _nw_self.IsActiveNode["NemerleWeb.Rsdn.TreeNode"] = _nw_self.IsActiveNode$$["NemerleWeb.Rsdn.TreeNode"];
    _nw_self.ToggleJumpList[""] = _nw_self.ToggleJumpList$$[""];
    _nw_self.DesktopView[""] = _nw_self.DesktopView$$[""];
    _nw_self.MobileView[""] = _nw_self.MobileView$$[""];
    _nw_self.SelectNode[""] = _nw_self.SelectNode["NemerleWeb.Rsdn.TreeNode"]
    _nw_self.IsActiveNode[""] = _nw_self.IsActiveNode["NemerleWeb.Rsdn.TreeNode"]
///SignalR///
    _nw_self.__nweb_meta = {
      properties: [{ name: "PreviousState", attrs: [''], ValueType: true },{ name: "CurrentState", attrs: [''], ValueType: true },{ name: "IsMobile", attrs: [''], ValueType: true },{ name: "CurrentView", attrs: [''], ValueType: false },{ name: "SelectedNodeUrl", attrs: [''], ValueType: false },{ name: "SelectedNode", attrs: [''], ValueType: false },{ name: "ActiveNodes", attrs: [''], ValueType: false },{ name: "Search", attrs: [''], ValueType: false },{ name: "Popular", attrs: [''], ValueType: false },{ name: "Root", attrs: [''], ValueType: false },{ name: "Pinned", attrs: [''], ValueType: false }],
      fields:     [{ name: "_splitterAdded", attrs: [''], ValueType: true },{ name: "_N_PreviousState_8154", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: true },{ name: "_N_CurrentState_8147", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: true },{ name: "_N_IsMobile_8140", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: true },{ name: "_N_SelectedNode_8127", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: false },{ name: "_N_ActiveNodes_8120", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: false },{ name: "_N_Search_8113", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: false },{ name: "_N_Popular_8106", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: false },{ name: "_N_Root_8099", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: false },{ name: "_N_Pinned_8090", attrs: ['System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.Never)','System.Runtime.CompilerServices.CompilerGenerated'], ValueType: false }],
      methods:    []
    };

  }

  NemerleWeb_Rsdn_MainPage.Instance = null




