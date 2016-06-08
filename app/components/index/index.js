import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import style from './styles.styl';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index:1,
            banner:'',
            title:'',
            data: []
        }        
    }
   
    
 // 组件渲染后获取外界数据
    componentDidMount() {
        
    }
    
    
 
  render() {
    return (
      <div styleName="Index">
        <Link to={`/list/391`} >
            听说架构改版了  (•̀ᴗ•́)و ̑̑    走 (￣y▽￣)~*捂嘴偷笑  去瞧瞧 (*^__^*) 嘻嘻……
          </Link>
      </div>
    );
  }
}
export default cssModules(Index, style);
