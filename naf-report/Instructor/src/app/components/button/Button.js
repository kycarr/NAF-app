// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';
import cx         from 'classnames';
const Button = ({
  type,
  onClick,
  children,
  onHover,
  identifier,
  content
}) => {

  let result = []
  let ele;
  let printTrainee = false
  if(identifier === 'FINISHED') {
    for(let i = 0; i < content.length; i++) {
      if(content[i].timeStarted != "NOT COMPLETE") {
        result.push(content[i].traineeName);
      }
    }
    printTrainee = true
  }
  else if(identifier === 'NOTSTART') {
    for(let i = 0; i < content.length; i++) {
      if(content[i].timeStarted === "NOT COMPLETE") {
        result.push(content[i].traineeName);
      }
    }
    printTrainee = true
  }
  else if(identifier === 'NOTCOMPLETE') {
    for(let i = 0; i < content.length; i++) {
      if(content[i].timeCompleted === "NOT COMPLETE") {
        result.push(content[i].traineeName);
      }
    }
    printTrainee = true
  }
  else if(identifier === 'PASS') {
    let pass = 0;
    let fail = 0;
    let total = 0;
    for(let i = 0; i < content.length; i++) {
        if(content[i].timeCompleted === "NOT COMPLETE") {
            continue;
        }
        if(content[i].result === 'PASS') {
            pass++;
        }
        else if(content[i].result === 'FAIL') {
            fail++;
        }
        total++;
    }
    result.push("# Pass: " + pass);
    result.push("# Fail: " + fail);
    result.push("# Took Test: " + total);
  }

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
                {
                    printTrainee ? 
                        (
                            <li>
                                Trainee: 
                            </li> 
                        ) :
                        (
                            <div> </div>
                        )
                }
                {
                    result.map(ele => {
                        return (
                            <li className="header" style={{marginLeft: '15px', width: '350px'}}>
                                - {ele}
                            </li>
                            );
                    })
                }

            </ul>
          </li>

  );
};

Button.propTypes = {
  children: PropTypes.node,
  type:     PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  onClick:  PropTypes.func,
  onHover:  PropTypes.func,
  identifier: PropTypes.string,
  content:  PropTypes.array
};

Button.defaultProps = {
  type: 'default'
};

export default Button;
