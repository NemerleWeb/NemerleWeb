<div class="page" >    
             <div class="left" >        
                 <div nw-when="$((_nw_self.get_Root() !== null) && (typeof _nw_self.get_Root() !== 'undefined'))" class="root" >            
                     <div nw-template="$_nw_self.get_Search()" >            </div>         
                     <div nw-when="$(((_nw_self.get_Search().get_SearchTerm() === null) || (typeof _nw_self.get_Search().get_SearchTerm() === 'undefined')) || (_nw_self.get_Search().get_SearchTerm() === ''))" >                
                         <div class="pinned-nodes" >                    
                             <div nw-template="$_nw_self.get_Pinned().get_Node()" >                    </div>             
                         </div>           
                         <div nw-template="$_nw_self.get_Root()" >                </div>           
                     </div>         
                 </div>       
             </div>     
             <div class="right" >        
                 <iframe nw-src="$_nw_self.get_SelectedNodeUrl()" frameborder="0" border="0" >        </iframe>       
             </div>     
         </div> 