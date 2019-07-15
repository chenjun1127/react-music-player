/**
 * Created by 0easy-23 on 2017/8/18.
 */
import React, {Component} from  'react';
import {HashRouter} from 'react-router-dom';
import Header from './containers/Header';
import Player from './containers/Player';
import './style/main';
import { hot } from 'react-hot-loader/root';

class Root extends Component {
    render() {
        return (
            <div className="components-container">
                <Header/>
                <HashRouter>
                    <Player/>
                </HashRouter>
            </div>
        )
    }
}

export default hot(Root);