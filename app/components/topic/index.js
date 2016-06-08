import React from 'react';
import { Link ,  hashHistory} from 'react-router';
import cssModules from 'react-css-modules';
import style from './styles.styl';
import LazyLoad from 'react-lazy-load';
import Pagination from '../pagination/';

import { apiTopic } from '../api/';

// 引入Fetch
import 'whatwg-fetch';

import './p.scss';


const api = '/ShoppingGuideAPI/GetTopicItems?pageSize=50&id=391&curPage=1&_=1463998084439';

const endApi = apiTopic();





class Topic extends React.Component {


    constructor(props) {
        const { params } = props;
        const picId = params.id ? params.id : '';
        let page = params.page ? Number(params.page) : 1;
        super(props);
        this.state = {
            Id:picId,
            Page:page,
            index:page,
            size:50,
            pages:5,
            total:0,
            jumper:true,
            banner:'',
            title:'',
            data: []
        }        
    }
    
   
    
    
    GetApiData(title,Page){
      let ist = title || null;
      let listId = this.state.Id;
     
      let endApiUrl = endApi + listId + '&curPage='+ Page;
        // console.log(listId)
        // console.log(Page)
        // console.log(endApiUrl)
        fetch(endApiUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let total = data.Count* this.state.size;
                console.log(total);
                
                this.setState({
                    total:total,
                    banner:data.img,
                    title:data.title,
                    data: data.Content
                });
                
               ist ? document.title = data.title + '- Panli代购': '';

            })
            .catch((ex) => {
                console.log(ex);
            });
        
    }
 // 组件渲染后获取外界数据
    componentDidMount() {
       
        this.GetApiData(1,this.state.Page);
    }
    
    onChange (index) {
        this.setState({ 
            Page:index
         });
        let Id =  this.state.Id;
       
        
       
        
        // this.props.router.push('/')
        const path = `/list/${Id}/${index}`
        
        console.log(hashHistory);
        hashHistory.push(path)
        
        this.GetApiData(null,index );
        // RouterContext.context.route.push('/list/'+ Id +'/page/'+index); 
    }
 
  render() {
    return (
      <div styleName="Topic">
        {this.state.banner.length > 0 ? <div styleName="TopicBanner" > 
            <img src={this.state.banner} />
         </div> : <div styleName="loadsta"> </div>}
        
        {this.state.data.length > 0 ? '' : <div >加载中...</div>}
        <div styleName="TopicMain">
        {this.state.data.map((item, index) =>
          <div styleName="prolistBox" key={index}>
                <a href={`http://www.panli.com/Crawler.aspx?purl=${item.Producturl}`} target="_blank" >
                    <div styleName="thumbBox">
                    <LazyLoad height={225} offsetVertical={225}>
                        <img src={item.img} />
                    </LazyLoad>
                        
                    </div>
                    <h6 styleName="name">
                        {item.Name}
                    </h6>
                    <p styleName="price">
                        ￥{item.pric}
                    </p>
                </a>
           </div>
        )}
        </div>
        
       {this.state.total > 50 ? 
            <Pagination
            index={this.state.index}
            size={this.state.size}
            total={this.state.total}
            jumper={this.state.jumper}
            onChange={this.onChange.bind(this)} />
             : ''}

      </div>
    );
  }
}
export default cssModules(Topic, style);
