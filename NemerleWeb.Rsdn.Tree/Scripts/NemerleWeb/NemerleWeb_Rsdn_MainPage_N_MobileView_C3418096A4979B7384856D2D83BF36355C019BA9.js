<div class="mobile" >    
             <div class="mobile-toolbar" >        
                 <span nw-when="$(_nw_self.get_CurrentState() === 1)" class="toggle-tree" nw-click="$_nw_self.set_CurrentState(0)" >            &lt     </span>       
                 <span nw-when="var _nw_returnValue;var _N_T_temp_var_1 = _nw_self.get_CurrentState();if((_N_T_temp_var_1 === 0)) {   _nw_returnValue = ((_nw_self.get_SelectedNode() !== null) && (typeof _nw_self.get_SelectedNode() !== 'undefined'))} else {  _nw_returnValue = false};return _nw_returnValue" class="toggle-tree" nw-click="$_nw_self.set_CurrentState(1)" >            &gt     </span>       
          
                 <span class="toggle-jump-list" nw-click="$_nw_self.ToggleJumpList[''].call(_nw_self)" >            jump     </span>       
                 <span nw-when="var _nw_returnValue;var _N_T_temp_var_2 = _nw_self.get_CurrentState();if((_N_T_temp_var_2 === 1)) {   _nw_returnValue = !(_nw_self.get_Pinned().IsPinned['NemerleWeb.Rsdn.TreeNode'].call(_nw_self.get_Pinned(), _nw_self.get_SelectedNode()))} else {  _nw_returnValue = false};return _nw_returnValue" nw-click="$_nw_self.get_Pinned().AddPinned['System.String'].call(_nw_self.get_Pinned(), _nw_self.get_SelectedNode().get_Id())" >            
              pin
                 </span>       
                 <span nw-when="var _nw_returnValue;var _N_T_temp_var_3 = _nw_self.get_CurrentState();if((_N_T_temp_var_3 === 1)) {   _nw_returnValue = _nw_self.get_Pinned().IsPinned['NemerleWeb.Rsdn.TreeNode'].call(_nw_self.get_Pinned(), _nw_self.get_SelectedNode())} else {  _nw_returnValue = false};return _nw_returnValue" nw-click="$_nw_self.get_Pinned().RemovePinned['System.String'].call(_nw_self.get_Pinned(), _nw_self.get_SelectedNode().get_Id())" >            
              unpin
                 </span>       
             </div>     
             <div nw-when="$(_nw_self.get_CurrentState() === 0)" >        
                 <div nw-when="$((_nw_self.get_Root() !== null) && (typeof _nw_self.get_Root() !== 'undefined'))" class="root" >            
                     <div nw-template="$_nw_self.get_Search()" >            </div>         
                     <div nw-when="$(((_nw_self.get_Search().get_SearchTerm() === null) || (typeof _nw_self.get_Search().get_SearchTerm() === 'undefined')) || (_nw_self.get_Search().get_SearchTerm() === ''))" >                
                         <div nw-template="$_nw_self.get_Root()" >                </div>           
                     </div>         
                 </div>       
             </div>     
             <div nw-visible="$(_nw_self.get_CurrentState() === 1)" class="mobile-right" >        
                 <iframe nw-src="$_nw_self.get_SelectedNodeUrl()" frameborder="0" border="0" >        </iframe>       
             </div>     
             <div nw-when="$(_nw_self.get_CurrentState() === 2)" class="jump-list" >        
                 <div nw-template="$_nw_self.get_Pinned().get_Node()" >        </div>       
                 <div nw-template="$_nw_self.get_Popular()" >        </div>       
             </div>     
         </div> 