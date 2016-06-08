'use strict';
/**
 * 以仓库位基础 列表组件
 * 2016年06月07日09:20:59
 * By Julian
 */

import React, { Component, PropTypes }  from 'react';
import { Link ,  hashHistory}           from 'react-router';
import classnames                       from 'classnames';
import cssModules                       from 'react-css-modules';
import style                            from './styles.styl';


class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: props.data
    };
    // this.setInput = this.setInput.bind(this);
  }

  handleChange (item) {
    console.log(item)

    let iNumber = item.number
    let sendUser = item.user.full_name
    let receiveUser = item.assignee.full_name
    let gitusername = this.props.state.gitusername
    let gitreponame = this.props.state.gitreponame

     $.ajax({
            url: "/api/remindedtask",
            type: 'POST',
            data: {
                iNumber: iNumber,
                sendUser: sendUser,
                receiveUser: receiveUser,
                gitusername: gitusername,
                gitreponame: gitreponame,
            },
            success: function(data) {
                if (data == 1) {
                    alert("提醒发送失败，发送人不能为空");
                } else if (data == 2) {
                    alert("提醒发送失败，创建人不能为空。");
                } else if (data == 3) {
                    alert("已向" + receiveUser + "成功发送提醒。");
                }

            }
        });


    // fetch('/api/remindedtask', {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         iNumber: iNumber,
    //         sendUser: sendUser,
    //         receiveUser: receiveUser,
    //         gitusername: gitusername,
    //         gitreponame: gitreponame,

    //     })
    // })

  }

  render () {
    //   console.log(this.state.data)

      return(
          <div styleName="tablelist">
            <table className="ui selectable celled right aligned table" >
                <thead className="left aligned">
                    <tr>
                        <th>TaskID</th>
                        <th>TaskName</th>
                        <th>当前状态</th>
                        <th>创建人</th>
                        <th>接收人</th>
                        <th>创建日期</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((item, index) =>    
                    <tr className="left aligned" key={index}>
                        <td key={item.number}>
                            <div className="ui ribbon label"></div># {item.number}</td>
                        <td><a href={item.number} target="_blank">{item.title}</a></td>
                        <td> {item.state == 'open' ? '开启中' :'已关闭'} </td>
                        <td>{item.user.full_name}</td>
                        <td>{item.assignee.full_name}</td>
                        <td>{item.created_at}</td>
                        <td>
                            <div className="ui mini buttons">
                                <button  onClick={this.handleChange.bind(this, item)} className="ui mini positive button"  > 提醒</button>
                                <div className="or"></div>
                                <button className="ui mini button" onclick="alert('此功能尚未开通。。。')">关闭</button>
                            </div>
                        </td>
                    </tr>
                      )}
                </tbody>
            </table>
          </div>
      )
  }
}

export default cssModules(List, style);