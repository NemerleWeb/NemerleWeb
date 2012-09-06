using NemerleWeb;
using System.Linq;
using System.Collections.Generic;

namespace NemerleWeb.Samples
{
  [JsModel]
  partial class NameListCSharpViewModel
  {
    List<string> Names { get; set; }
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
    
    public NameListCSharpViewModel()
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
  }
}
