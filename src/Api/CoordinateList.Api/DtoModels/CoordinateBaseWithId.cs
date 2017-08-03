namespace CoordinateList.Api.DtoModels
{
    public class CoordinateBaseWithId : CoordinateBase
    {
        public int Id { get; }
        public CoordinateBaseWithId(int id, int pointX, int pointY) : base(pointX, pointY)
        {
            Id = id;
        }
    }
}