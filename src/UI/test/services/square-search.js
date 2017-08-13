import findUniqueSquares from "../../src/services/square-search";
import {describe, it} from "mocha";
import {expect} from "chai";
import SimpleMock from "simple-mock";

describe("findUniqueSquares", () => {
    it("calculates the number of squares in the list correctly", () => {
        //setup
        const cooList = [
            {pointX: 0, pointY: 10},
            {pointX: 0, pointY: 5},
            {pointX: 4, pointY: 10},
            {pointX: 0, pointY: 0},
            {pointX: 10, pointY: 10},
            {pointX: 2, pointY: 8},
            {pointX: 1, pointY: 4},
            {pointX: 50, pointY: 80},
            {pointX: 10, pointY: 0},
            {pointX: 1000, pointY: 10}];

        //act
        const result = findUniqueSquares(cooList, (x, y, z, w) => {return;});

        //assert
        expect(result).to.eq(1);
    });
    
    it("calls the onSquareFound, if the square is found", () => {
        //setup
        const cooList = [
            {pointX: 0, pointY: 10},
            {pointX: 0, pointY: 5},
            {pointX: 4, pointY: 10},
            {pointX: 0, pointY: 0},
            {pointX: 10, pointY: 10},
            {pointX: 2, pointY: 8},
            {pointX: 1, pointY: 4},
            {pointX: 50, pointY: 80},
            {pointX: 10, pointY: 0},
            {pointX: 1000, pointY: 10}];
        let stub = SimpleMock.stub();
        //act
        const result = findUniqueSquares(cooList, stub);

        //assert
        expect(stub.called);
    })
})