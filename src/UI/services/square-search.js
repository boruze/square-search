const calculateDistance = (cooOne, cooTwo) =>
    Math.sqrt(Math.pow((cooOne.pointX - cooTwo.pointX), 2) + Math.pow((cooOne.pointY - cooTwo.pointY), 2));

const areTheSame = (cooOne, cooTwo) => cooOne.pointX === cooTwo.pointX && cooOne.pointY === cooTwo.pointY;

const findSquares = (coordinateList, onSquareFound) => {
    coordinateList.forEach((firstCoo) => {
        coordinateList.forEach((secondCoo) => {
            if (areTheSame(firstCoo, secondCoo)){
                continue;
            }
            const firstSecondDistance = calculateDistance(firstCoo, secondCoo);
            coordinateList.forEach((thirdCoo) => {
                if (areTheSame(firstCoo, thirdCoo) || areTheSame(secondCoo, thirdCoo)){
                    continue;
                }
                const secondThirdDistance = calculateDistance(thirdCoo, secondCoo);
                if (secondThirdDistance !== firstSecondDistance){
                    continue;
                }
                coordinateList.forEach((fourthCoo) => {
                    if (areTheSame(firstCoo, fourthCoo) || areTheSame(secondCoo, fourthCoo) || areTheSame(thirdCoo, fourthCoo)){
                        continue;
                    }
                    const fourthThirdDistance = calculateDistance(fourthCoo, thirdCoo);
                    if (secondThirdDistance !== fourthThirdDistance){
                        continue;
                    }
                    const fourthSecondDistance = calculateDistance(fourthCoo, secondCoo);
                    const firstThirdDistance = calculateDistance(firstCoo, thirdCoo);

                    if (fourthSecondDistance !== firstThirdDistance){
                        continue;
                    }
                    onSquareFound(firstCoo, secondCoo, thirdCoo, fourthCoo);
                    break; //no need to finish iterating the fourth time, if the square is  found
                }, this);
            }, this);
        }, this);
    }, this);
}