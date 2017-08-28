/**
 * Created by 0easy-23 on 2017/8/18.
 */
import React, {Component} from  'react';
import ReactPlayer from 'react-player';
import classnames from 'classnames';
import '../style/input-range.css';
import {Link,Route} from 'react-router-dom';
import ListPage from './ListPage';
export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: Math.floor(Math.random() * 10), // 当前10首歌随即播放一首
            playing: false,
            value: '',
            rangeStyle: null,
            loaded: false,

        };
        this.playPause = this.playPause.bind(this);
        this.onDuration = this.onDuration.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.playPrev = this.playPrev.bind(this);
        this.playNext = this.playNext.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        /*
         * 阿里云市场提供的QQ音乐接口
         * https://market.aliyun.com/products/56928004/cmapi013180.html?spm=5176.730005.0.0.D81iaO#sku=yuncode718000000，
         * 0元使用1000次
         * */
        fetch('https://ali-qqmusic.showapi.com/top?topid=26', {
            headers: {
                Authorization: 'APPCODE f1b6ad07c1974d63b171c7c569af5584'
            }
        }).then(res => {
            return res.json()
        }).then(res => {
            this.setState({
                loaded: true,
                playing:true,
                song_list: res.showapi_res_body.pagebean.songlist.splice(0, 10),
            })
        })

    }

    playPause() {
        this.setState({
            playing: !this.state.playing
        })
    }

    onDuration(e) {
        this.setState({
            duration: this.formatTime(e),
            value: 0,
            currentTime: '00:00',
        })
    }

    onProgress(state) {
        const percent_1 = state.played * 100 + '%';
        const percent_2 = '100%';
        this.setState({
            value: state.played,
            rangeStyle: percent_1 + ' ' + percent_2,
            currentTime: state.playedSeconds ? this.formatTime(state.playedSeconds) : '00:00'
        });
        if (this.state.value === 1) {
            console.log('播放完毕');
            // 播放下一首
            this.playNext(sessionStorage.getItem('index') ? sessionStorage.getItem('index') : this.state.index);
        }
    }


    onChange(e) {
        const percent_1 = e.target.value * 100 + '%';
        const percent_2 = '100%';
        this.setState({
            playing: true,
            value: parseFloat(e.target.value),
            rangeStyle: percent_1 + ' ' + percent_2,
        });
        this.player.seekTo(parseFloat(e.target.value));
    }

    formatTime(timeTemp) {
        let m = Math.floor(timeTemp / 60);
        let s = Math.floor(timeTemp % 60);
        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    playPrev(e) {
        let eIndex = parseFloat(e.currentTarget.dataset.index);
        sessionStorage.setItem('index', eIndex - 1 < 0 ? this.state.song_list.length - 1 : eIndex - 1);
        this.setState({
            playing: true
        })
    }

    playNext(e) {
        let eIndex = typeof e === 'object' ? parseFloat(e.currentTarget.dataset.index) : parseFloat(e);
        sessionStorage.setItem('index', eIndex + 1 > 9 ? 0 : eIndex + 1);
        this.setState({
            playing: true
        })
    }

    render() {
        if (this.state.loaded) {
            const currentIndex = sessionStorage.getItem('index') ? sessionStorage.getItem('index') : this.state.index;
            const currentSong = this.state.song_list[currentIndex];
            const {url, albumpic_big, singername, songname} = currentSong;
            return (
                <div className="components-box">
                    <p className="links">
                        <Link to={{pathname:"/list",state:{songlist:this.state.song_list,currentIndex:currentIndex}}}>我的私人音乐坊</Link>
                    </p>
                    <ReactPlayer url={url} style={{display: 'none'}} playing={this.state.playing} controls={true} ref={player => { this.player = player}} onProgress={this.onProgress} onDuration={this.onDuration}/>
                    <div className="components-player">
                        <div className="components-album">
                            <div className={classnames('ablum-pic', this.state.playing ? 'playing' : 'paused')}
                                 style={{background: `url(${albumpic_big}) center center`, backgroundSize: 'cover'}}>
                            </div>
                        </div>
                        <div className="ablum-title">
                            <p>{songname}</p>
                            <p>{singername}</p>
                        </div>
                        <div className="components-player-control">
                            <div className="player-time">
                                <div className="time_left">{this.state.currentTime}</div>
                                <div className="player-range">
                                    <input type='range' min={0} max={1} step='any' value={this.state.value || '0'}
                                           style={{background: this.props.background, backgroundSize: this.state.rangeStyle}} onChange={this.onChange}/>
                                </div>
                                <div className="time_right">{this.state.duration}</div>
                            </div>
                            <div className="player-btn">
                                <a href="javascript:;" onClick={this.playPrev} data-index={currentIndex} className="play-prev"></a>
                                <a href="javascript:;" onClick={this.playPause} className={classnames('play-control', this.state.playing ? 'play-control-pause' : '')}></a>
                                <a href="javascript:;" onClick={this.playNext} data-index={currentIndex} className="play-next"></a>
                            </div>
                        </div>
                    </div>
                    <Route path='/:id' component={ListPage}/>
                </div>
            )
        } else {
            return (
                <div className="loading">加载数据中....</div>
            )
        }

    }

}
Player.defaultProps = {
    background: '-webkit-linear-gradient(#ea6248, #ea6248) no-repeat, #ddd'
};