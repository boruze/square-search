using System.Collections.Generic;
using FluentValidation;
using SquareSearch.Api.DtoModels;

namespace SquareSearch.Api.Validators
{
    public class CoordinateListValidator : AbstractValidator<CoordinateList>
    {
        public const int MaxCoordinateCount = 10000;

        public CoordinateListValidator()
        {
            RuleFor(l => l.Name)
                .NotEmpty();
            RuleFor(l => l.Coordinates)
                .Must(c => c.Count < MaxCoordinateCount)
                .Must(c => c.Count == new HashSet<Coordinate>(c, new CoordinateEqualityComparer()).Count)
                .SetCollectionValidator(new CoordinateValidator());
        }
    }
}