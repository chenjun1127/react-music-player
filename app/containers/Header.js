/**
 * Created by 0easy-23 on 2017/8/18.
 */
import React, {Component} from  'react';
import logo from '../images/logo.png';
export default class extends Component {
    render() {
        return (
            <div className="components-header">
                <img src={logo} alt="logo"/>
                <h1>React Music Player</h1>
            </div>
        )
    }

}