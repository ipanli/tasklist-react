import React, { Component, PropTypes } from 'react';
import { Link ,  hashHistory} from 'react-router';
import classnames from 'classnames';
import cssModules from 'react-css-modules';
import style from './styles.styl';



class Page extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pageid: props.pageid,
            pageLink: props.pageLink
        };
        // this.setInput = this.setInput.bind(this);
    }
    onChange (index) {
        console.log(index);
    }
    
    handleChange (index) {
        // this.setIndex(index);
       
        if (this.props.onChange) {
            this.props.onChange(index);
        }
    }
    render () {

        let pageArr = [];

        for(var i = 1;i<=10;i++){
            pageArr.push(i)
        }

        return(
            <div id="pageids" className="ui buttons">
                {pageArr.map((item, index) =>  
                          <button  onClick={this.handleChange.bind(this, item)}  className="ui button" key={index}> {item}</button>
                )}
                
            </div>   
        )


    }

}


export default cssModules(Page, style);
