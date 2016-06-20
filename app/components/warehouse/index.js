import React from 'react';
import { Link ,  hashHistory} from 'react-router';
import cssModules from 'react-css-modules';
import style from './styles.styl';
import LazyLoad from 'react-lazy-load';
import Page from '../Page/';

import List from './list';
import Select from './select';

// 引入Fetch
import 'whatwg-fetch';

import './p.scss';

import '../ajax/index.js';



class Topic extends React.Component {


    constructor(props) {
        const { params } = props;
        let use = params.gitusername ? params.gitusername : 'SoftwareTest';
        let repo = params.gitreponame ? params.gitreponame : 'Panli';
        let pid = params.pageid ? Number(params.pageid) : 1;
        super(props);
        this.state = {
            gitusername:use,
            gitreponame:repo,
            pageid:pid,
            show:false,
            load:1,
            warJson:[],
            data: []
        }        
    }

    
    
    GetApiData(gitusername,gitreponame,pageid){

     
      let endApiUrl = '/api/getissues?gitusername='+ gitusername +'&gitreponame='+ gitreponame +'&pageid='+pageid;

        fetch(endApiUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.length > 0){
                    this.setState({
                        data: data,
                        load:2
                    });
                }else{
                    this.setState({
                        load:0
                    });
                }
                
                
            })
            .catch((ex) => {
                console.log(ex);
            });
        
    }
 // 组件渲染后获取外界数据
    componentDidMount() {

        let gitusername = this.props.params.gitusername ? this.props.params.gitusername : 'SoftwareTest';
        let gitreponame = this.props.params.gitreponame ? this.props.params.gitreponame : 'Panli';
       
        this.GetApiData(gitusername,gitreponame,this.state.pageid);
    }
    onSelect (data) {


        this.setState({ 
            pageid:1,
            gitusername:data.user,
            gitreponame:data.name,
            show:false
         });


        const path = `/warehouse/${data.user}/${data.name}/1`
        
       
        hashHistory.push(path)
        
        this.GetApiData(data.user,data.name,1 );


    }

    onShow (data) {
        this.setState({
            show: !data
        });

    }

    onChange (index) {
        this.setState({ 
            pageid:index
         });

        let gitusername = this.state.gitusername;
        let gitreponame = this.state.gitreponame;
       
        const path = `/warehouse/${gitusername}/${gitreponame}/${index}`
        
       
        hashHistory.push(path)
        
        this.GetApiData(gitusername,gitreponame,index );

    }
 
  render() {
      let Loading;

      if(this.state.load ==1){
          Loading = () => {
              return(
                  <div className="loading-box">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                  </div>
                
              )
            }
      }else if(this.state.load  == 0){
          Loading = () => {
              return(
                  <div>
                    加载失败,没有数据了哦
                  </div>
              )
          }
      }else{
          Loading = () => {
              
          } 
      }


    return (
      <div>
        <Select onSelect={this.onSelect.bind(this)} onShow={this.onShow.bind(this)} onName={this.state.gitreponame} show={this.state.show} />
        <div styleName="appbox">
             {Loading()}
            <div >
            {this.state.data.map((item, index) =>
            <div key={index}>
                {item.Name}
            </div>
            )}
            </div>
            <List data={this.state.data} state={this.state} />
                <Page
                onChange={this.onChange.bind(this)} />
        </div>
      </div>
    );
  }
}
export default cssModules(Topic, style);
