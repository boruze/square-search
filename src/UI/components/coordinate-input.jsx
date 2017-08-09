import React from "react";
import translations from "../configuration/translations";


class CoordinateInput extends React.Component {
    render() {
        return (<div>
            <input type="number"
                max={99999999}
                placeholder={translations.pointX}
                value={this.props.pointX}
                onChange={(val) => this.props.onCoordinateChange(this.props.index, {pointX: val.target.value, pointY: this.props.pointY})} />
            <input type="number"
                max={99999999}
                placeholder={translations.pointY}
                value={this.props.pointY}
                onChange={(val) => this.props.onCoordinateChange(this.props.index, {pointX: this.props.pointX, pointY: val.target.value})} />
        </div>);
    }
}

export default CoordinateInput;