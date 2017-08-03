using System.Collections.Generic;
using FluentValidation;
using CoordinateList.Api.DtoModels;

namespace CoordinateList.Api.Validators
{
    public class CoordinateListValidator : AbstractValidator<CoordinateList.Api.DtoModels.CoordinateList>
    {
        public const int MaxCoordinateCount = 10000;

        public CoordinateListValidator()
        {
            RuleFor(l => l.Coordinates)
                .Must(c => c.Count < MaxCoordinateCount)
                .Must(c => c.Count == new HashSet<CoordinateBase>(c, new CoordinateEqualityComparer()).Count)
                .SetCollectionValidator(new CoordinateValidator());
        }
    }
}