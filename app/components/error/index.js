import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import style from './styles.styl';

const Error = (props) => {
  const { params } = props;
  return (
    <div styleName="Error">
      页面不存在 <Link to="/">[返回]</Link>
    </div>
  );
};

Error.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default cssModules(Error, style);