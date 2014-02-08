namespace Rsdn.NavTree
{
    public class NodeData
    {
        private readonly string _provider;
        private readonly NodeInfo _info;

        public NodeData(string provider, NodeInfo info)
        {
            _provider = provider;
            _info = info;
        }

        public string Provider
        {
            get { return _provider; }
        }

        public NodeInfo Info
        {
            get { return _info; }
        }
    }
}