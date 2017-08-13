using SquareSearch.Api.DtoModels;
using FluentValidation;

namespace SquareSearch.Api.Validators
{
    public class CoordinateValidator : AbstractValidator<Coordinate>
    {
        public const int largestCoordinate = 5000;
        public const int smallestCoordinate = -5000;
        public CoordinateValidator()
        {
            RuleFor(c => c.PointX)
                .Must(p => p < largestCoordinate && p > smallestCoordinate);
            RuleFor(c => c.PointY)
                .Must(p => p <= largestCoordinate && p >= smallestCoordinate);
        }
    }
}