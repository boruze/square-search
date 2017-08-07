namespace CooList.WebApi.DataAccess.Filters
{
    public enum SortBy
    {
        Creation = 1,
        Name = 2
    }

    public class PointListFilter
    {
        public int Offset { get; }
        public int Limit { get; }
        public SortBy SortBy { get; }

        public PointListFilter() : this(0, 100, SortBy.Creation) { }

        public PointListFilter(int offset, int limit, SortBy sortBy)
        {
            Offset = offset;
            Limit = limit;
            SortBy = sortBy;
        }
    }
}
