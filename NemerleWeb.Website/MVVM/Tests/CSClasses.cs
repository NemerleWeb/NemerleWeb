using NemerleWeb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace NemerleWeb.Website.Tests
{
	[Unit]
	public class FieldsInitializationCS
	{
		public int Field = 1;
		public readonly int ReadonlyField = 2;
	}

	[Unit]
	public class ConstructorFieldsInitializationCS
	{
		public int Field;
		public readonly int ReadonlyField;

		public ConstructorFieldsInitializationCS()
		{
			this.Field = 1;
			this.ReadonlyField = 2;
		}
	}
}