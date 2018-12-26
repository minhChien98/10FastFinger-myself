import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actFetchUsersRequest, actAddUserRequest } from '../../actions';
import ScoreBoardItem from '../../components/scoreboardItem';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            name: '',
            studentId: '',
            point:0,
            correctWord:0,
            errorWord:0
        }
    }

    componentWillMount() {
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
        this.props.fetchAllUsers();
    }


    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { history } = this.props;
        let { name, studentId } = this.state;
        let { users } = this.props;
        let check = 0;
        let user;
        if (name === 'admin' && studentId === 'Hit2018') {
            user = {
                name: name,
                studentId: studentId
            }
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/scoreboard');
        } else {
            users.forEach(element => {
                if (element.studentId === studentId) {
                    user = element;
                    check = 1;
                }

            });
            if (check === 0) {
                //add to users
                if (this.state.name === '')
                    return alert("Bạn chưa nhập tên!");
                this.props.addUser(this.state);
                setTimeout(()=>{
                    let user = localStorage.getItem('user');
                    user = JSON.parse(user);
                    if(user === null){
                        history.push('/login');
                    }else if (user.name === 'admin' && user.studentId === 'Hit2018') {
                        history.push('/scoreboard');
                    } else {
                        history.push('/');
                    }
                },150)
                
            } else {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/')
            }
            history.push('/')
        }

    }

    render() {
        let {users} = this.props;
        users.sort((a,b)=>{
            if(a.point > b.point)
                return -1;
            return 1;
        });
        users = users.slice(0,10)
        let elemScore = users.map((user,index)=>{
            return <ScoreBoardItem 
                key={index}
                index={index}
                user={user}
            />
        })
        return (
            <React.Fragment>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Đăng nhập</h3>
                        </div>
                        <div className="panel panel-body">

                            <form onSubmit={this.onSubmit} >
                                <div className="form-group">
                                    <div className="form-group">
                                        <label>Mã sinh viên</label>
                                        <input type="text" className="form-control" name="studentId" onChange={this.onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Họ và tên</label>
                                        <input type="text" className="form-control" name="name" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Đăng nhập</button>
                                        &nbsp;
                                        <button type="reset" className="btn btn-danger">Reset</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <table className="table table-bordered table-hover">
                        <thead  style={{ background: '#2ECCFA' }}>
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
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
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
        addUser: user => {
            dispatch(actAddUserRequest(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
