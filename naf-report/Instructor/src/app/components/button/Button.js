// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';
import cx         from 'classnames';
const Button = ({
  type,
  onClick,
  children,
  onHover
}) => {
  return (

          <li className="dropdown tasks-menu" style={{listStyle: 'none'}}>
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown">
              {
                <button
                  type="button"
                  onClick={ onClick }
                  onHover={ onHover }
                  className={
                    cx({
                      btn: true,
                      'btn-default': type === 'default',
                      'btn-primary': type === 'primary',
                      'btn-success': type === 'success',
                      'btn-info':    type === 'info',
                      'btn-warning': type === 'warning',
                      'btn-danger':  type === 'danger',
                      'btn-custom':  type === 'custom'
                    })
                  }>
                  {  children }
                </button>
              }
            </a>
            <ul className="dropdown-menu">
              <li className="header" style={{marginLeft: '15px', width: '350px'}}>
                You have 9 tasks
              </li>
            </ul>
          </li>

  );
};

Button.propTypes = {
  children: PropTypes.node,
  type:     PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  onClick:  PropTypes.func,
  onHover:  PropTypes.func
};

Button.defaultProps = {
  type: 'default'
};

export default Button;
