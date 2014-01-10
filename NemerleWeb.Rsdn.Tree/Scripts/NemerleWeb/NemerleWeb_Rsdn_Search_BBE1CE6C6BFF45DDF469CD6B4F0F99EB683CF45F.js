
  var NemerleWeb_Rsdn_Search$ctor = {};
  NemerleWeb_Rsdn_Search$ctor[""] = function() {
    var _nw_self = this;
    var _N_T_temp_var_18;
    var _N_initializedObject_18533_18534 = new NemerleWeb_Rsdn_TreeNode("");
    _N_initializedObject_18533_18534.set_Children([]);
    _N_T_temp_var_18 = _N_initializedObject_18533_18534;
    _nw_self.SearchResultsForums = _N_T_temp_var_18;
    var _N_T_temp_var_19;
    var _N_initializedObject_18535_18536 = new NemerleWeb_Rsdn_TreeNode("");
    _N_initializedObject_18535_18536.set_Children([]);
    _N_T_temp_var_19 = _N_initializedObject_18535_18536;
    _nw_self.SearchResultsArticles = _N_T_temp_var_19;
    var _N_T_temp_var_20;
    var _N_initializedObject_18537_18538 = new NemerleWeb_Rsdn_TreeNode("");
    _N_initializedObject_18537_18538.set_Children([]);
    _N_T_temp_var_20 = _N_initializedObject_18537_18538;
    _nw_self.SearchResultsOthers = _N_T_temp_var_20
  }
  function NemerleWeb_Rsdn_Search() {
    var _nw_self = this;
    _nw_self.get_SearchTerm = _nw_self.get_SearchTerm$$= function() {
      var _nw_self = this;
      return _nw_self._searchTerm
    };
    _nw_self.set_SearchTerm = _nw_self.set_SearchTerm$$= function(value) {
      var _nw_self = this;
      window.clearTimeout(_nw_self._timeoutVar18484);
      _nw_self._timeoutVar18484 = window.setTimeout(function () {   if((_nw_self._searchTerm !== value)) { 
    _nw_self._searchTerm = value;
    _nw_self.Search["System.String"].call(_nw_self, value)
  } else {

  };
  nweb.invalidate() }, 500, null)
    };

    _nw_self.Search = {};
    _nw_self.Search$$ = {};
    _nw_self.Search["System.String"] = _nw_self.Search$$["System.String"] = function(term) {
      
      _nw_self.ClearResults[""].call(_nw_self);
      if(!((((term === null) || (typeof term === "undefined")) || (term === "")))) { 
        var _N_wildcard_3547_18776 = $.ajax({
  url: '/Search/Search',
  type: 'POST',
  dataType: 'json',
  data: { model: '{term: ' + JSON.stringify(nweb.utils.normalizeObjectForServer(term)) + '}' },
  success: function(result) {
    var typed = nweb.utils.toTypedObject(result);
    var callback = function (nodes) {   var _N_wildcard_3547_18548 = console.log(nodes.length);
  var cached_collection_18769 = nodes;
  var index_18770 = 0;
  var loop_18773 = function () {   var _N_T_temp_var_24 = "__lbl__15";
  __gotoSwitchLoop: while(true) {

    switch(_N_T_temp_var_24) {
      case "__lbl__15":
        if((index_18770 < cached_collection_18769.length)) { 
          _N_T_temp_var_24 = "__lbl__13";
          continue __gotoSwitchLoop
        } else {
          _N_T_temp_var_24 = "__lbl__14";
          continue __gotoSwitchLoop
        };
        break __gotoSwitchLoop;
      break;
      case "__lbl__14":
        break __gotoSwitchLoop;
      break;
      case "__lbl__13":
        node_18775 = cached_collection_18769[index_18770];
        var _N_T_temp_var_23 = node_18775.get_Icon();
        if((_N_T_temp_var_23 === "fr")) { 
          _N_T_temp_var_24 = "__lbl__3";
          continue __gotoSwitchLoop
        } else {
          _N_T_temp_var_24 = "__lbl__10";
          continue __gotoSwitchLoop
        };
        _N_T_temp_var_24 = "__lbl__2";
        continue __gotoSwitchLoop
      break;
      case "__lbl__10":
        var _N_T_temp_var_22 = node_18775.get_Icon();
        if((_N_T_temp_var_22 === "qna")) { 
          _N_T_temp_var_24 = "__lbl__4";
          continue __gotoSwitchLoop
        } else {
          _N_T_temp_var_24 = "__lbl__8";
          continue __gotoSwitchLoop
        };
        _N_T_temp_var_24 = "__lbl__2";
        continue __gotoSwitchLoop
      break;
      case "__lbl__8":
        var _N_T_temp_var_21 = node_18775.get_Icon();
        if((_N_T_temp_var_21 === "at")) { 
          _N_T_temp_var_24 = "__lbl__5";
          continue __gotoSwitchLoop
        } else {
          _N_T_temp_var_24 = "__lbl__6";
          continue __gotoSwitchLoop
        };
        _N_T_temp_var_24 = "__lbl__2";
        continue __gotoSwitchLoop
      break;
      case "__lbl__6":
        _nw_self.SearchResultsOthers.get_Children().push(node_18775);
        _N_T_temp_var_24 = "__lbl__2";
        continue __gotoSwitchLoop
      break;
      case "__lbl__5":
        _N_T_temp_var_24 = "__lbl__4";
        continue __gotoSwitchLoop;
        _N_T_temp_var_24 = "__lbl__2";
        continue __gotoSwitchLoop
      break;
      case "__lbl__4":
        _nw_self.SearchResultsArticles.get_Children().push(node_18775);
        _N_T_temp_var_24 = "__lbl__2";
        continue __gotoSwitchLoop
      break;
      case "__lbl__3":
        _nw_self.SearchResultsForums.get_Children().push(node_18775);
        _N_T_temp_var_24 = "__lbl__2";
        continue __gotoSwitchLoop
      break;
      case "__lbl__2":
        index_18770 = ++(index_18770);
        loop_18773();
        break __gotoSwitchLoop;
      break;
    default:

    }
  }
 };
  loop_18773() };
    if(result != null && nweb.utils.isTuple(result))
      callback.apply(undefined, typed);
    else
      callback(typed);

    nweb.invalidate();
  }
})
      } else {

      }
    }
    _nw_self.ClearResults = {};
    _nw_self.ClearResults$$ = {};
    _nw_self.ClearResults[""] = _nw_self.ClearResults$$[""] = function() {
      
      _nw_self.SearchResultsForums.get_Children().length = 0;
      _nw_self.SearchResultsArticles.get_Children().length = 0;
      _nw_self.SearchResultsOthers.get_Children().length = 0
    }
    _nw_self.ToggleForums = {};
    _nw_self.ToggleForums$$ = {};
    _nw_self.ToggleForums[""] = _nw_self.ToggleForums$$[""] = function() {
      
      _nw_self._showForums = !(_nw_self._showForums)
    }
    _nw_self.ToggleArticles = {};
    _nw_self.ToggleArticles$$ = {};
    _nw_self.ToggleArticles[""] = _nw_self.ToggleArticles$$[""] = function() {
      
      _nw_self._showArticles = !(_nw_self._showArticles)
    }
    _nw_self.ToggleOthers = {};
    _nw_self.ToggleOthers$$ = {};
    _nw_self.ToggleOthers[""] = _nw_self.ToggleOthers$$[""] = function() {
      
      _nw_self._showOthers = !(_nw_self._showOthers)
    }
    _nw_self.Search[""] = _nw_self.Search["System.String"]
    _nw_self._timeoutVar18484 = 0;
    _nw_self._searchTerm = null;
    _nw_self._showOthers = false;
    _nw_self._showArticles = false;
    _nw_self._showForums = true;
    _nw_self.SearchResultsOthers = null;
    _nw_self.SearchResultsArticles = null;
    _nw_self.SearchResultsForums = null
    NemerleWeb_Rsdn_Search$ctor[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1))
    _nw_self.get_SearchTerm = _nw_self.get_SearchTerm$$;
    _nw_self.set_SearchTerm = _nw_self.set_SearchTerm$$;

    _nw_self.Search["System.String"] = _nw_self.Search$$["System.String"];
    _nw_self.ClearResults[""] = _nw_self.ClearResults$$[""];
    _nw_self.ToggleForums[""] = _nw_self.ToggleForums$$[""];
    _nw_self.ToggleArticles[""] = _nw_self.ToggleArticles$$[""];
    _nw_self.ToggleOthers[""] = _nw_self.ToggleOthers$$[""];
    _nw_self.Search[""] = _nw_self.Search["System.String"]
///SignalR///
    _nw_self.__nweb_meta = {
      properties: [{ name: "SearchTerm", attrs: [''], ValueType: false }],
      fields:     [{ name: "_timeoutVar18484", attrs: [''], ValueType: true },{ name: "_searchTerm", attrs: [''], ValueType: false },{ name: "_showOthers", attrs: [''], ValueType: true },{ name: "_showArticles", attrs: [''], ValueType: true },{ name: "_showForums", attrs: [''], ValueType: true },{ name: "SearchResultsOthers", attrs: [''], ValueType: false },{ name: "SearchResultsArticles", attrs: [''], ValueType: false },{ name: "SearchResultsForums", attrs: [''], ValueType: false }],
      methods:    []
    };

  }


  NemerleWeb_Rsdn_Search.SelectNode = {};
  NemerleWeb_Rsdn_Search.SelectNode$$ = {};
  NemerleWeb_Rsdn_Search.SelectNode["NemerleWeb.Rsdn.TreeNode"] = NemerleWeb_Rsdn_Search.SelectNode$$["NemerleWeb.Rsdn.TreeNode"] = function(node) {
    var _nw_self = this;
    NemerleWeb_Rsdn_MainPage.Instance.SelectNode["NemerleWeb.Rsdn.TreeNode"].call(NemerleWeb_Rsdn_MainPage.Instance, node)
  }
  NemerleWeb_Rsdn_Search.SelectNode[""] = NemerleWeb_Rsdn_Search.SelectNode["NemerleWeb.Rsdn.TreeNode"]

