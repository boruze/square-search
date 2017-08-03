using CoordinateList.Api.DtoModels;
using FluentValidation;

namespace CoordinateList.Api.Validators
{
    public class CoordinateValidator : AbstractValidator<CoordinateBase>
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