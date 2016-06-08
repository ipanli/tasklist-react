'use strict';

//   index={int}         // 当前页码，默认为 1
//   size={int}          // 每页显示条数，默认为 20
//   pages={int}         // 显示的页码数， 默认为 10
//   total={int}         // 总条目数，默认为 0
//   jumper={bool}       // 是否可以输入页码，默认为 false
//   mini={bool}         // 是否简化版本
//   onChange={function} // 页码点击时触发事件，参数为页码

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { forEach } from '../utils/objects';
import cssModules from 'react-css-modules';
import style from './styles.styl';


class Pagination extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: props.index
    };
    this.setInput = this.setInput.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.index !== this.props.index) {
      this.setState({ index: nextProps.index });
    }
  }

  getIndex () {
    return this.state.index;
  }

  setIndex (index) {
    index = parseInt(index);
    this.setState({index});
  }

  setInput (event) {
    event.preventDefault();
    let { total, size, index, pages } = this.props;
    let max = Math.ceil(total / size);
    let value = this.refs.input.value;
    value = parseInt(value);
    if (isNaN(value)) {
      return;
    }
    if (value < 1) {
      this.handleChange(1);
      return;
    }
    if (value > max) {
      this.handleChange(max);
      return;
    }

    this.setIndex(value);
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleChange (index) {
    this.setIndex(index);
    if (this.refs.input) {
      this.refs.input.value = index;
    }
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  getPages () {
    let { total, size, index, pages } = this.props;
    let max = Math.ceil(total / size),
        left,
        right,
        span = pages || 10;

    // bad thing...
    pages = [];

    if (index > max) {
      index = max;
    }

    left = index - Math.floor(span / 2) + 1;
    if (left < 1) {
      left = 1;
    }
    right = left + span - 2;
    if (right >= max) {
      right = max;
      left = right - span + 2;
      if (left < 1) {
        left = 1;
      }
    } else {
      right -= left > 1 ? 1 : 0;
    }

    // push first
    if (left > 1) {
      pages.push(1);
    }
    if (left > 2) {
      pages.push('<..');
    }
    for (let i = left; i < right + 1; i++) {
      pages.push(i);
    }
    if (right < max - 1) {
      pages.push('..>');
    }
    // push last
    if (right < max) {
      pages.push(max);
    }

    return {pages, max};
  }

  render () {
    let index = this.state.index,
        {mini} = this.props,
        {pages, max} = this.getPages(),
        items = [];

    // Previous
    items.push(
      <li key="previous" onClick={index <= 1 ? null : this.handleChange.bind(this, index - 1)} className={classnames('previous', { disabled: index <= 1 })}>
        <a><span>上一页</span></a>
      </li>
    );

    if (mini) {
      items.push(
        <form key="i" onSubmit={this.setInput}>
          <input ref="input" defaultValue={this.state.index} type="text" className="rct-form-control" />
        </form>
      );
      items.push(<span key="s"> / {max}</span>);
    } else {
      forEach(pages, function (i) {
        if (i === '<..' || i === '..>') {
          items.push(<li key={i} className="sep"><span>...</span></li>);
        } else {
          items.push(
            <li onClick={this.handleChange.bind(this, i)} className={classnames({ active: i === index })} key={i}>
              <a>{i}</a>
            </li>
          );
        }
      }, this);
    }

    // Next
    items.push(
      <li key="next" onClick={index >= max ? null : this.handleChange.bind(this, index + 1)} className={classnames('next', { disabled: index >= max })}>
        <a><span>下一页</span></a>
      </li>
    );

    let className = classnames(
      this.props.className,
      'rct-pagination-wrap',
      { 'rct-pagination-mini': mini }
    );
    return (
      <div style={this.props.style} className={className}>
        <ul className="rct-pagination">
          {items}
        </ul>
        {
          this.props.jumper && !mini &&
          <form onSubmit={this.setInput}>
            <div className="rct-input-group">
              <i>到第</i>
              <input ref="input" defaultValue={this.state.index} type="text" className="rct-form-control" />
              <i>页</i>
              <span onClick={this.setInput} className="addon">Go</span>
            </div>
          </form>
        }
      </div>
    );
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  jumper: PropTypes.bool,
  mini: PropTypes.bool,
  onChange: PropTypes.func,
  pages: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  total: PropTypes.number
};

Pagination.defaultProps = {
  index: 1,
  pages: 10,
  size: 20,
  total: 0
};

export default cssModules(Pagination, style);