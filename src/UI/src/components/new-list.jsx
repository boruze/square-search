import React from "react";
import translations from "../configuration/translations";
import CoordinateInput from "./coordinate-input";
import MessageComponent from "./message";
import {Link} from 'react-router-dom';

class NewList extends React.Component {
    componentDidMount() {
        this.props.getData(this.props.match.params.id);
    }
    render() {
        // let errorContainer;
        // if (this.props.errors.size > 0){
        //     errorContainer = <ul>{this.props.errors.toArray().map((msg, index) => <li key={index}>{msg}</li>)}</ul>
        // }
        return (
            <div className="container">
            <div className="row">
                <div className="two columns"><h5>{this.props.title}</h5></div>
                <MessageComponent />
                <div className="two columns u-pull-right">
                    <Link className="button button-primary" to="/">{translations.returnToList}</Link>
                </div>
            </div>
            <form>
                <div className="row">
                    <div className="six columns">
                        <label>List name</label>
                        <input className="u-full-width" onChange={(ev) => this.props.onNameChange(ev.target.value)} value={this.props.name} type="text" placeholder={translations.listName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="one column">
                        <label>{translations.coordinates}</label>
                    </div>
                    <div className="five columns">
                        <button onClick={this.props.clearCoordinates} className="button u-pull-right">{translations.clear}</button>
                        <button className="button u-pull-right" onClick={() => document.getElementById('file').click()}>{translations.loadFromFile}</button>
                        <input type="file" id="file" onChange={(file) => this.props.loadFromFile(file)} style={{display:"none"}}/>
                        <button onClick={this.props.onNewCoordinate} className="button u-pull-right">{translations.add}</button>
                    </div>
                    <div className="six columns">
                        <label>{translations.squares}</label>
                    </div>
                </div>
            <div className="row">
                <div className="six columns">
                <div className="small-height">
                    {this.props.coordinates.toJSON().map((coordinate, key) =>
                    <div key={key} className="row">
                        <div className="four columns">
                            <input className="u-full-width" type="number" value={coordinate.pointX} placeholder="0"
                            onChange={(val) => this.props.onCoordinateChange(key, {pointX: coordinate.pointX, pointY: val.target.value})}/>
                        </div>
                        <div className="four columns">
                            <input className="u-full-width" type="number"
                            value={coordinate.pointY} placeholder="0"
                            onChange={(val) => this.props.onCoordinateChange(key, {pointX: val.target.value, pointY: coordinate.pointY})}/>
                        </div>
                        <div className="one column">
                            <button onClick={() => this.props.removeCoordinate(key)} className="button button-primary">-</button>
                        </div>
                    </div>)}
                    </div>
                </div>
               {/* <input type="file" placeholder={translations.loadFromFile} onChange={(file) => this.props.loadFromFile(file)}/>*/}
             
                <div className="six columns">
                    <div className="small-height">
                    </div>
                </div>
            </div>
            <div className="row">
                <input className="button-primary" onClick={() => this.props.onSubmitClick(this.props.id, this.props.name, this.props.coordinates)} type="submit" value="Submit"/>
            </div>
            </form>
            </div>
        );
    }
}

export default NewList;