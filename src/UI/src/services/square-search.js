const calculateDistance = (cooOne, cooTwo) =>
    Math.sqrt(Math.pow((cooOne.pointX - cooTwo.pointX), 2) + Math.pow((cooOne.pointY - cooTwo.pointY), 2));

const areTheSame = (cooOne, cooTwo) => cooOne.pointX === cooTwo.pointX && cooOne.pointY === cooTwo.pointY;
const doesSquareContain = (square, coordinate) =>
    areTheSame(square.cooOne, coordinate)
    || areTheSame(square.cooTwo, coordinate)
    || areTheSame(square.cooThree, coordinate)
    || areTheSame(square.cooFour, coordinate);

let foundSquares = [];

const doesSquareRepeat = (s) => {
    const result = foundSquares.length > 0 && foundSquares.every(square => {
        return doesSquareContain(square, s.cooOne)
            && doesSquareContain(square, s.cooTwo)
            && doesSquareContain(square, s.cooThree)
            && doesSquareContain(square, s.cooFour)
    });
    if (!result){
        foundSquares.push(s)
    }
    return result;
}

const findUniqueSquares = (coordinateList, onNewSquareFound) => {
    foundSquares = [];
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
                    const fourthFirstDist = calculateDistance(coordinateList[l], coordinateList[i]);
                    if (fourthFirstDist !== fourthThirdDist){
                        continue;
                    }
                    const fourthSecondDist = calculateDistance(coordinateList[l], coordinateList[j]);
                    const firstThirdDist = calculateDistance(coordinateList[i], coordinateList[k]);

                    if (fourthSecondDist !== firstThirdDist){
                        continue;
                    }
                    const square = {
                        cooOne: coordinateList[i],
                        cooTwo:  coordinateList[j],
                        cooThree: coordinateList[k],
                        cooFour: coordinateList[l]
                    };
                    if (doesSquareRepeat(square)){
                        break;
                    }
                    onNewSquareFound(square);
                    
                    totalSquareCount++;
                    break; //no need to finish iterating the fourth time, if the square is found
                };
            };
        };
    };
    return totalSquareCount;
}

const findUniqueSquaresPromise = (coordinates, onSquareFound) => {
    return new Promise((resolve, reject) => {
        let count = findUniqueSquares(coordinates, onSquareFound);
        resolve(count);
    });
}

export default findUniqueSquaresPromise;