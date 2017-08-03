using System.Collections.Generic;

namespace CoordinateList.Api.DtoModels
{
    public class CoordinateList : CoordinateListWithId
    {
        public IList<CoordinateBase> Coordinates { get; }

        public CoordinateList(int id, string name, IList<CoordinateBase> coordinates)
            : base(id, name)
        {
            Coordinates = coordinates;
        }
    }
}