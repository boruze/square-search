using System.Collections.Generic;

public class CoordinateList: CoordinateListWithId {
    public IEnumerable<CoordinateBase> Coordinates { get; }

    public CoordinateList(int id, string name, IEnumerable<CoordinateBase> coordinates)
        :base (id, name) {
            Coordinates = coordinates;
    }
}