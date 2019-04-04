import React, {
    Component
} from 'react'
import 'react-dat-gui/build/react-dat-gui.css';
import DatGui, {
    DatBoolean,
    DatColor,
    DatNumber,
    DatString,
    DatFolder
} from 'react-dat-gui';

export default class Gui extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(data) {
        this.props.onGuiChange(data);
    }

    render() {
        const data = this.props.data;
        return ( 
            <DatGui
                data = {
                    data
                }
                onUpdate = {
                    this.handleUpdate
                } 
                >
                <DatFolder title = 'MyAwesomeFolder' >
                    <DatString path = 'package' label = 'Package' />
                    <DatNumber path = 'power' label = 'Power' />
                    <DatBoolean path = 'isAwesome' label = 'Awesome?' />
                    <DatColor path = 'feelsLike' label = 'Feels Like' />
                </DatFolder> 
            </DatGui>
        )
    }
}