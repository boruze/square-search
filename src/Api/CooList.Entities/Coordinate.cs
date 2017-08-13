namespace SquareSearch.Entities
{
    public class Coordinate
    {
        public int Id { get; }
        public int ListId { get; }
        public int PointX { get; }
        public int PointY { get; }

        public Coordinate(int id, int listId, int pointX, int pointY)
        {
            Id = id;
            ListId = listId;
            PointX = pointX;
            PointY = pointY;
        }
    }
}
