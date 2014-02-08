namespace Rsdn.NavTree
{
	public class NodeInfo
	{
		private readonly string _id;
		private readonly string _displayName;
		private readonly string _imageUrl;
		private readonly string _url;
		private readonly SortOrder _sortOrder;
		private readonly bool _loadOnDemand;

		public NodeInfo(
			string id,
			string displayName,
			string imageUrl,
			string url,
			SortOrder sortOrder = SortOrder.Normal,
			bool loadOnDemand = false)
		{
			_id = id;
			_displayName = displayName;
			_imageUrl = imageUrl;
			_url = url;
			_sortOrder = sortOrder;
			_loadOnDemand = loadOnDemand;
		}

		public string ID
		{
			get { return _id; }
		}

		public string DisplayName
		{
			get { return _displayName; }
		}

		public string ImageUrl
		{
			get { return _imageUrl; }
		}

		public string Url
		{
			get { return _url; }
		}

		public SortOrder SortOrder
		{
			get { return _sortOrder; }
		}

		public bool LoadOnDemand
		{
			get { return _loadOnDemand; }
		}
	}
}