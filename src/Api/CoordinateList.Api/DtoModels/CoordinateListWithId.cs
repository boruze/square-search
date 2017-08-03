namespace CoordinateList.Api.DtoModels
{
    public class CoordinateListWithId : CoordinateListBase
    {
        public int Id { get; }

        public CoordinateListWithId(int id, string name)
            : base(name)
        {
            Id = id;
        }
    }
}