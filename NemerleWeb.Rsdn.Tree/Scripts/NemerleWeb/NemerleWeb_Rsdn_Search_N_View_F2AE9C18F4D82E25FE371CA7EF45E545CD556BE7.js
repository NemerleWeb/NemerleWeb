<div class="search-bar" >    
             <input id="search-input" nw-value="$_nw_self.get_SearchTerm()" >    </input>     
         </div> <div nw-when="$!((((_nw_self.get_SearchTerm() === null) || (typeof _nw_self.get_SearchTerm() === 'undefined')) || (_nw_self.get_SearchTerm() === '')))" class="search-results" >     
             <a href="#" nw-click="$_nw_self.ToggleForums[''].call(_nw_self)" >        
                 <h3 class="search-cat-header" >            Forums ( <span nw-text="$_nw_self.SearchResultsForums.get_Children().length" />         )     </h3>       
             </a>     
             <div nw-when="$_nw_self._showForums" >        
                 <div nw-template="$_nw_self.SearchResultsForums" >        </div>       
             </div>     
          
             <a href="#" nw-click="$_nw_self.ToggleArticles[''].call(_nw_self)" >        
                 <h3 class="search-cat-header" >            Articles ( <span nw-text="$_nw_self.SearchResultsArticles.get_Children().length" />         )     </h3>       
             </a>     
             <div nw-when="$_nw_self._showArticles" >        
                 <div nw-template="$_nw_self.SearchResultsArticles" >        </div>       
             </div>     
          
             <a href="#" nw-click="$_nw_self.ToggleOthers[''].call(_nw_self)" >        
                 <h3 class="search-cat-header" >            Others ( <span nw-text="$_nw_self.SearchResultsOthers.get_Children().length" />         )     </h3>       
             </a>     
             <div nw-when="$_nw_self._showOthers" >        
                 <div nw-template="$_nw_self.SearchResultsOthers" >        </div>       
             </div>     
         </div> 