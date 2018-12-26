import React, { Component } from 'react';

class ScoreBoardItem extends Component {


    render() {
        let {user,index,background} = this.props;
        return (

            <tr style={{ background:`${background}` }}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.point}</td>
                <td>{user.correctWord}</td>
                <td>{user.errorWord}</td>
            </tr>

        );
    }
}

export default ScoreBoardItem;
