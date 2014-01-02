nweb.debugger = function (model) {
  var panelHtml = "<div class='nweb-debug-panel' style='position: absolute; left:0px; top: 0px; width: 200px; background-color: #ccc;'>" +
                  "  <div class='nweb-debug-toggle' style='padding-left: 10px; height: 20px; line-height: 20px; font-size: 12px; color: white; background-color: #333;'>NWeb Debugger</div>" +
                  "  <div class='nweb-debug-container' style='padding: 5px; font-size: 14px;'></div>" +
                  "</div>";
  var panelHidden = true;  
  var panel = $(panelHtml).appendTo($('body'));

  $(window).resize(function() {
    panel.height($(window).height());
  }).trigger('resize');

  $(".nweb-debug-toggle").click(function() {
    togglePanel();
  });
  
  var template = "<div class='nweb-debug-model' style='margin-left: 10px'>" +
                 "  <div nw-foreach='member in model.members'>" +
                 "    <span class='nweb-debug-name' nw-click='member.toggle()' nw-text='member.name' style='font-weight: bold; cursor: pointer;'/>: " +
                 "    <span class='nweb-debug-val' nw-text='member.value' style='font-size: 12px'/>" +
                 "    <div nw-when='member.isOpened'>" +
                 "      <div nw-template='\"nweb_debugger_template\": member'/>" +
                 "    </div>" +
                 "  </div>" +
                 "</div>";

  $('body').append("<script type='text/html' id='nweb_debugger_template'>" +
                      template +
                   "</script>");

  var wrap = function (name, obj, depth) {
    var getMembers = function () {
      if (nweb.utils.getObjectType(obj) == 'Object') {
        return $.map(nweb.utils.getFieldsAndProperties(obj), function(e, i) {
          return wrap(e.name, e.val, depth + 1);
        });
      } else if (nweb.utils.getObjectType(obj) == 'Array') {
        return $.map(obj, function(e, i) {
          return wrap(i, e, depth + 1);
        });
      }
      return [];
    };
    
    var getValue = function() {
      if (nweb.utils.getObjectType(obj) == 'Object')
        return '{}';
      else if (nweb.utils.getObjectType(obj) == 'Array')
        return '[]';
      else
        return obj;
    };
    
    return {
      name: name,
      value: getValue,
      members: getMembers,
      depth: depth,
      obj: obj,
      isOpened: depth <= 1,
      toggle: function () {
        this.isOpened = !this.isOpened;
      }
    };
  };
  
  nweb.go(wrap('', { Main: model }, 0), "nweb_debugger_template", ".nweb-debug-container", true);

  hidePanel();
  
  function togglePanel() {
    if(!panelHidden) {
      hidePanel();
    } else {
      showPanel();
    }
  }
  
  function hidePanel() {
    panel.offset({ left: -panel.width() + 10, top: 0 });
    panelHidden = true;
  }

  function showPanel() {
    panel.offset({ left: 0, top: 0 });
    panelHidden = false;
  }
};