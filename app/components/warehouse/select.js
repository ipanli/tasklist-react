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

const warehoseJson = '/static/data/warehose.json';


class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      data: []
    };
    // this.setInput = this.setInput.bind(this);
  }

      
  GetApiJson (){

         fetch(warehoseJson)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    data: data
                });
              
                
            })
            .catch((ex) => {
                console.log(ex);
       });

  }

  // 组件渲染后获取外界数据
    componentDidMount() {
       
        this.GetApiJson();
    }

  handleChange (data) {
    if (this.props.onShow) {
            this.props.onShow(data);
        }

  }

  onSelect (data){

    if (this.props.onSelect) {
            this.props.onSelect(data);
        }
  }

  render () {
    //   console.log(this.state.data)


      return(
            <div className="ui floating dropdown labeled search icon button" onClick={this.handleChange.bind(this,this.props.show)} >
                <i className="world icon"></i>
                <span className="click-text" >{this.props.onName ? this.props.onName :'请选择任务源'}</span>
                <div className={this.props.show ? 'menu show' : 'menu'} >
                {this.state.data.map((item, index) =>   
                    <div className="item" onClick={this.onSelect.bind(this, item)} data-value={item.user} key={index}>{item.name}</div>
                )}
                </div>
            </div>
      )
  }
}

export default cssModules(List, style);