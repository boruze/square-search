namespace CoordinateList.Api.DtoModels
{
    public class CoordinateListBase
    {
        public string Name { get; }

        public CoordinateListBase(string name)
        {
            Name = name;
        }
    }
}