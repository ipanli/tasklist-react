import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import file1 from './images/287.jpg';
import file2 from './images/286.jpg';
import style from './styles.styl';
import { addTodo, counterTick } from '../../redux/actions';

const Home = (props) => {
  const { todos, dispatchAddTodo, ticker, dispatchCounterTick } = props;

  const arr = [
    'user-1',
    'user-2'
  ];
    
  const add = () => dispatchAddTodo(
    `测试 Redux! 随机 id: ${Math.random().toString(36).split('.')[1]}`
  );
  const tick = () => dispatchCounterTick();

  return (
    <div>
      <div styleName="spacing">
        <h2>Redux 测试:</h2>
        <button
          type="button"
          id="add-string"
          onClick={add}
        >
          添加随机字符串存储!
        </button><span>--</span>
        <button
          type="button"
          id="add-click-count"
          onClick={tick}
        >
          点击次数: {ticker}
        </button><br />
        {todos.map((item, index) => <div key={index}>{item}</div>)}
      </div>
      <div styleName="spacing">
        <h2>路由遍历测试:</h2>
      </div>
      <div styleName="custom-grid">
        {arr.map((item, index) => 
          <div styleName="custom-cell" key={index}>
          <Link to={`/route-1/${item}`} >
            User {index+1}
          </Link>
           </div>
        )}
      </div>
      <hr />
      <div styleName="spacing">
        <h2>...还有一些其他好玩的</h2>
      </div>
      <div styleName="custom-grid">
        <figure styleName="custom-cell">
          <img src={file2} alt="Yay, kittens!" />
          <figcaption>图像热加载.</figcaption>
        </figure>
        <figure styleName="custom-cell">
          <img src={file1} alt="Yay, kittens! I'll be base64 because I am small" />
          <figcaption>小图片 base64 位</figcaption>
        </figure>
        <Link to='/404' >
           404
         </Link>
         <Link to='/github' >
            Github
         </Link>
      </div>
    </div>
  );
};

Home.propTypes = {
  todos: React.PropTypes.array.isRequired,
  ticker: React.PropTypes.number.isRequired,
  dispatchAddTodo: React.PropTypes.func.isRequired,
  dispatchCounterTick: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos,
  ticker: state.ticker,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo: text => dispatch(addTodo(text)),
  dispatchCounterTick: () => dispatch(counterTick()),
});

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Home, style));
