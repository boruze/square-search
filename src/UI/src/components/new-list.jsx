import React from "react";
import translations from "../configuration/translations";
import CoordinateInput from "./coordinate-input";

class NewList extends React.Component {
    componentDidMount() {
        this.props.getData(this.props.match.params.id);
    }
    render() {
        let errorContainer;
        if (this.props.errors.size > 0){
            errorContainer = <ul>{this.props.errors.toArray().map((msg, index) => <li key={index}>{msg}</li>)}</ul>
        }
        
        return (
            <div>
                {errorContainer}
                <input type="text" placeholder={translations.listName} value={this.props.name}
                    onChange={(ev) => this.props.onNameChange(ev.target.value)}/>
                <ul>
                {this.props.coordinates.toJSON().map((coordinate, key) =>
                    <li key={key}>
                        <CoordinateInput
                            pointX={coordinate.pointX}
                            pointY={coordinate.pointY}
                            index={key}
                            onCoordinateChange={this.props.onCoordinateChange}/>
                        <span onClick={() => this.props.removeCoordinate(key)}>{translations.remove}</span>
                    </li>)}
                </ul>
                <span onClick={this.props.onNewCoordinate}>{translations.add}</span>
                <span onClick={this.props.clearCoordinates}>{translations.clear}</span>
                <input type="file" placeholder={translations.loadFromFile} onChange={(file) => this.props.loadFromFile(file)}/>
                <button type="submit" onClick={() => this.props.onSubmitClick(this.props.id, this.props.name, this.props.coordinates)}>Submit</button>
            </div>
        );
    }
}

export default NewList;