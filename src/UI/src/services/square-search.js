const calculateDistance = (cooOne, cooTwo) =>
    Math.sqrt(Math.pow((cooOne.pointX - cooTwo.pointX), 2) + Math.pow((cooOne.pointY - cooTwo.pointY), 2));

const areTheSame = (cooOne, cooTwo) => cooOne.pointX === cooTwo.pointX && cooOne.pointY === cooTwo.pointY;

let foundSquares = [];

const doesSquareRepeat = (cooOne, cooTwo, cooThree, cooFour) => {
    
}

const findSquares = (coordinateList, onSquareFound) => {
    let totalSquareCount = 0;
    for (var i = 0; i < coordinateList.length; i++) {
        for (var j = 0; j < coordinateList.length; j++) {
            if (i === j) {
                continue;
            }
            const firstSecondDist = calculateDistance(coordinateList[i], coordinateList[j]);
            for (var k = 0; k < coordinateList.length; k++) {
                if (i === k || j === k) {
                    continue;
                }
                const secondThirdDist = calculateDistance(coordinateList[j], coordinateList[k]);
                if (secondThirdDist !== firstSecondDist){
                    continue;
                }
                for (var l = 0; l < coordinateList.length; l++)  {
                    if (i === l || j === l || k === l) {
                            continue;
                    }
                    const fourthThirdDist = calculateDistance(coordinateList[k], coordinateList[l]);
                    if (secondThirdDist !== fourthThirdDist){
                        continue;
                    }
                    const fourthSecondDist = calculateDistance(coordinateList[l], coordinateList[j]);
                    const firstThirdDist = calculateDistance(coordinateList[i], coordinateList[k]);

                    if (fourthSecondDist !== firstThirdDist){
                        continue;
                    }
                    onNewSquareFound(coordinateList[i], coordinateList[j], coordinateList[k], coordinateList[l]);
                    totalSquareCount++;
                    break; //no need to finish iterating the fourth time, if the square is found
                };
            };
        };
    };
    return totalSquareCount;
}

export default findSquares;