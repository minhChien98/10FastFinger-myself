import React, { Component } from 'react';
import { connect } from 'react-redux'
import context from './../../config/content'
import { Link } from 'react-router-dom'
import { actFetchUsersRequest, actUpdateUserRequest } from './../../actions/index'
import ScoreBoardItem from './../../components/scoreboardItem'

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: 0,
            name: '',
            studentId: '',
            content: context,
            curentText: {},
            arrText: [],
            point: -1,
            correctWord: 0,
            errorWord: 0,
            time: 60
        }
    }

    componentWillMount() {
        this.props.fetchAllUsers();
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        let { history } = this.props;
        if (user === null) {
            history.push('/login');
        } else if (user.name === 'admin' && user.studentId === 'Hit2018') {
            history.push('/scoreboard');
        } else {
            this.setState({
                _id: user._id,
                name: user.name,
                studentId: user.studentId
            })
            history.push('/');
        }
    }


    componentDidMount() {

        var contextItem = this.state.content.split(" ").map((item, index) => {
            return {
                text: item,
                index,
                status: 0
            }
        });
        this.setState({ arrText: contextItem })
        this.setState({ curentText: contextItem[0] });
        let count = 0;
        let check = 0;
        let countAll = 0;
        let countErrorWord = 0;
        let countCorrectWord = 0;
        document.querySelector('#input-text-js').addEventListener('keyup', e => {
            check++;
            if (e.keyCode !== 8 && e.keyCode !== 32 && e.keyCode !== 231) {
                countAll++;
            }
            if (check === 1) {
                const timePlay = setInterval(() => {
                    let { time } = this.state;
                    let point = 0;
                    time--;
                    count++;
                    this.setState({
                        time: time
                    })
                    if (count % 2 === 0) {
                        point = ((countAll) / 5 - this.state.errorWord) / (count / 60);
                        point = parseInt(point);
                        this.setState({ point: point });
                        let userUpdate = {
                            _id: this.state._id,
                            point: this.state.point,
                            correctWord: this.state.correctWord,
                            errorWord: this.state.errorWord
                        }
                        this.props.updateUser(userUpdate);
                        this.props.fetchAllUsers();
                    }
                    if (count === 60) {

                        clearInterval(timePlay);
                        // this.state.arrText.forEach(element => {
                        //     if(element.status==1){
                        //         point++;
                        //     }
                        // });
                        point = (countAll) / 5 - this.state.errorWord;
                        point = parseInt(point);
                        this.setState({ point: point });
                        document.querySelector('#input-text-js').disabled = true;
                        let userUpdate = {
                            _id: this.state._id,
                            point: this.state.point,
                            correctWord: this.state.correctWord,
                            errorWord: this.state.errorWord
                        }
                        this.props.updateUser(userUpdate);
                        this.props.fetchAllUsers();
                    }
                }, 1000);
            }
            if (e.keyCode === 32) {
                const inputText = e.target.value.trim();
                const { curentText, arrText } = this.state;
                if (inputText === curentText.text) {
                    arrText[curentText.index].status = 1;
                    countCorrectWord++;
                    this.setState({
                        correctWord: countCorrectWord
                    });
                } else {
                    countErrorWord++;
                    this.setState({
                        errorWord: countErrorWord
                    });
                    arrText[curentText.index].status = -1;
                }
                this.setState({ arrText: arrText });
                this.setState({ curentText: arrText[curentText.index + 1] });

                e.target.value = "";

            }
        })
    }

    logout = () => {
        localStorage.removeItem("user");
    }



    render() {
        // 0 chua lam gi, 1 dung , -1 sai
        const { arrText, curentText, point, correctWord, errorWord, time } = this.state;
        let showConent = (data) => {
            return data.slice(curentText.index > 5 ? curentText.index - 5 : 0, curentText.index + 10).map(item => {
                if (item.index === curentText.index) {
                    return (
                        <span key={item.index}>
                            <span style={{ background: '#BDBDBD', borderRadius: '5px', fontSize: '20px' }} >
                                {item.text}
                            </span> <span>{" "}</span>
                        </span>
                    )
                } else {
                    if (item.status === 0) {
                        return (
                            <span style={{ fontSize: '20px' }} key={item.index}>
                                {item.text + " "}
                            </span>
                        )
                    } else if (item.status === 1) {
                        return (
                            <span style={{ color: '#00FF00', fontSize: '20px' }} key={item.index}>
                                {item.text + " "}
                            </span>
                        )
                    } else {
                        return (
                            <span style={{ color: 'red', fontSize: '20px' }} key={item.index}>
                                {item.text + " "}
                            </span>
                        )
                    }
                }

            })
        }

        let showResult = (point, correctWord, errorWord) => {
            return point !== -1 ? (
                <div className="row">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <h3 className="panel-title">Kết quả</h3>
                        </div>
                        <div className="panel-body">
                            <p>Điểm của bạn là :<strong>{point}</strong> WPM</p>
                            <p>Bạn gõ đúng : {correctWord} từ </p>
                            <p>Bạn gõ sai : {errorWord} từ </p>
                        </div>
                    </div>
                </div>
            ) : "";
        }

        let showTime = (time) => {
            return <button className="btn btn-primary">{time}</button>
        }


        let { users } = this.props;
        users.sort((a, b) => {
            if (a.point > b.point)
                return -1;
            return 1;
        });
        let elemAcc = users.map((user, index) => {
            if (user._id === this.state._id) {
                if (index < 5)
                    return ''
                else if (index === 5) {
                    return <ScoreBoardItem
                        key={index}
                        index={index}
                        user={user}
                        background={'#00FF00'}
                    />
                }
                else {
                    return <React.Fragment>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <ScoreBoardItem
                            key={index}
                            index={index}
                            user={user}
                            background={'#00FF00'}
                        />
                    </React.Fragment>
                }
            }
            return '';

        })
        users = users.slice(0, 5);
        let elemScore = users.map((user, index) => {
            if (user._id === this.state._id) {
                return <ScoreBoardItem
                    key={index}
                    index={index}
                    user={user}
                    background={'#00FF00'}
                />
            } else {
                return <ScoreBoardItem
                    key={index}
                    index={index}
                    user={user}
                    background={'none'}
                />
            }

        })
        return (


            <div>
                <div className="row">
                    <div className="panel panel-success">
                        <div className="panel-body">
                            Chào mừng bạn <strong>{this.state.name}</strong> đã đến với bài thi!&nbsp;&nbsp;
                            <Link to='/login' onClick={this.logout} className="btn btn-primary" >Đăng xuất</Link>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                        <div className="panel panel-success">
                            <div className="panel-body">
                                {showConent(arrText)}
                            </div>
                        </div>
                        <input id="input-text-js" type="text" className="form-control" />
                        {showTime(time)}
                        {showResult(point, correctWord, errorWord)}
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <table className="table table-bordered table-hover">
                            <thead style={{ background: '#2ECCFA' }}>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Số điểm</th>
                                    <th>Số từ đúng</th>
                                    <th>Số từ sai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elemScore}
                                {elemAcc}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllUsers: () => {
            dispatch(actFetchUsersRequest());
        },
        updateUser: user => {
            dispatch(actUpdateUserRequest(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
