import React, { Component } from 'react';
import { connect } from 'react-redux'
import ScoreBoardItem from '../../components/scoreboardItem';
import {actFetchUsersRequest} from './../../actions/index'

class ScoreBoardPage extends Component {

    
    componentWillMount(){
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
        let { history } = this.props;
        if(user === null){
            history.push('/login');
        }else if (user.name === 'admin' && user.studentId === 'Hit2018') {
            history.push('/scoreboard');
        } else {
            history.push('/');
        }
    }
    componentDidMount(){
        this.props.fetchAllUsers()
    }
    
    render() {
        let count = 0;
        const timePlay = setInterval(() => {
            count++;
            if(count%2===0){
                this.props.fetchAllUsers()
            }
            if (count === 60) {
                clearInterval(timePlay);
                
            }
        }, 1000);
        let {users} = this.props;
        users.sort((a,b)=>{
            if(a.point > b.point)
                return -1;
            return 1;
        });
        let elemScore = users.map((user,index)=>{
            return <ScoreBoardItem 
                key={index}
                index={index}
                user={user}
            />
        })
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                
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
                    </tbody>
                </table>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchAllUsers: () => {
            dispatch(actFetchUsersRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoardPage);
