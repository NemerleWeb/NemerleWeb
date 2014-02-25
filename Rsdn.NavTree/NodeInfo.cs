namespace Rsdn.NavTree
{
	public class NodeInfo
    {
        public string ID { get; private set; }
        public string DisplayName { get; private set; }
        public string ImageClassName { get; private set; }
        public string Url { get; private set; }
        public SortOrder SortOrder { get; private set; }
        public bool LoadOnDemand { get; private set; }

		public NodeInfo(
			string id,
			string displayName,
			string imageClassName,
			string url,
			SortOrder sortOrder = SortOrder.Normal,
			bool loadOnDemand = false)
		{
            ID = id;
            DisplayName = displayName;
            ImageClassName = imageClassName;
            Url = url;
            SortOrder = sortOrder;
            LoadOnDemand = loadOnDemand;
		}
	}
}