using Nemerle;
using Nemerle.Collections;
using Nemerle.Text;
using Nemerle.Utility;

using System;
using System.Collections.Generic;
using System.Linq;
using NemerleWeb;

namespace NemerleWeb.Website
{
  [Unit]
  public class CSharpPage
  {
    public readonly string Name;

    public CSharpPage()
    {
        Name = "C#";
    }

    [Html]
    public string View()
    {
       return @"
         <input value=""$Name"" />
         <div>Hello, $Name</div>
       ";
    }
  }
}
