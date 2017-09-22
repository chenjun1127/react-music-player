/**
 * Created by 0easy-23 on 2017/8/18.
 */
import React, {Component} from  'react';
export default class extends Component {
    render() {
        const {currentIndex, songlist} = this.props.location.state;
        const list = songlist.map((item, i) => {
            return (
                <li key={i} onClick={() => {
                    this.props.history.replace('/');
                    sessionStorage.setItem('index', i);
                }} className={parseFloat(currentIndex) === i ? 'active_li' : ''}>{item.songname} -- {item.singername}</li>
            )
        });
        return (
            <div className="components-song-list">
                <h1><span>当前列表</span><em onClick={this.props.history.goBack}>&times;</em></h1>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }

}