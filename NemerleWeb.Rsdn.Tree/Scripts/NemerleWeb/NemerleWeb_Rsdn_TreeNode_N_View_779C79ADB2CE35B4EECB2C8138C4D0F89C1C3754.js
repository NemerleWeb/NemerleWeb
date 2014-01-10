<div nw-foreach="c_8519 in $_nw_self.get_Children()" nw-style-margin-left="$(c_8519.get_Depth() * 6)" class="node" nw-css-selected-search-result="$c_8519.get_IsSelected()" >    
             <a nw-click="$c_8519.CaptionClick[''].call(c_8519)" nw-href="$'http://www.rsdn.ru'.concat(c_8519.get_Href())" nw-css-with-children="$c_8519.get_HasChildren()" >        
                 <img class="node-icon" nw-src="$c_8519.get_IconUrl()" >        </img>       
                 <span class="node-caption" nw-css-is-active="$NemerleWeb_Rsdn_MainPage.Instance.IsActiveNode['NemerleWeb.Rsdn.TreeNode'].call(NemerleWeb_Rsdn_MainPage.Instance, c_8519)" >            
               <span nw-text="$c_8519.get_Caption()" />         
                 </span>       
                 <div nw-when="$!(c_8519.get_HasChildren())" nw-click="$c_8519.TogglePin[''].call(c_8519)" class="node-pin" nw-css-pinned="$_nw_self.IsPinnedNode['NemerleWeb.Rsdn.TreeNode'].call(_nw_self, c_8519)" >        </div>       
             </a>     
             <div nw-when="$c_8519.get_IsLoading()" class="node-loading" >        
            Загрузка, пожалуйста подождите...
             </div>     
             <div nw-when="var _nw_returnValue;if(c_8519.get_IsOpened()) {   _nw_returnValue = ((_nw_self.get_Children() !== null) && (typeof _nw_self.get_Children() !== 'undefined'))} else {  _nw_returnValue = false};return _nw_returnValue" >        
                 <div nw-template="$c_8519" >        </div>       
             </div>     
         </div> 