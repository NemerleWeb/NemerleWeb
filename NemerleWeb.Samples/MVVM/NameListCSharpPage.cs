using NemerleWeb;
using NemerleWeb.Macros;
using System.Linq;
using System.Collections.Generic;

namespace NemerleWeb.Samples
{
  [Unit]
  partial class NameListCSharpPage
  {
    List<string> Names = new List<string>();
    string SearchPattern { get; set; }    
    List<string> FilteredNames
    {
      get
      {
        if(SearchPattern == null)
          return Names;
        else
        {
          var result = new List<string>();
          foreach(var name in Names)
            if(name.ToUpper().Contains(SearchPattern.ToUpper()))
              result.Add(name);
          return result;
        }
      }
    }    
    
    public NameListCSharpPage()
    {
      server.GetNames(l => { Names = l; });
    }
    
    public class Server
    {
      public List<string> GetNames()
      {
        return Helpers.GetNames().ToList();
      }
    }

    [Html]
    public string View()
    {
        return @"
        <div>
          <h3>List of names</h3>
          Filter: <input value=""$SearchPattern"" />
          <div class=""name-list"">
            <span $foreach(n in FilteredNames)>
              $(n + "", "")
            </span>
          </div>
        </div>
      ";
    }
  }
}
