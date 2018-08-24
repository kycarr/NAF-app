import React, {Component} from 'react';
import { PulseLoader } from 'react-spinners';
  


const loginButtonStyle = {
    textTransform: 'none',
    fontSize: '18px',
  };

export default class LoadingButton extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false
    };
  }

  handleClick() {
    this.setState({ isLoading: true });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLoading === false) {
      this.setState({isLoading: false});
    }
  }

  render() {
    const { isLoading } = this.state;
    if(isLoading === true) {
      return (
        <Button
          label="OK" 
          primary={true} 
          labelStyle={loginButtonStyle}
          onClick={this.loginTrigger}
        >
          {isLoading ? 'Loading...' : 'OK'}
        </Button>
      );
    }
    else{
      return <Link to={this.props.to}> </Link>
    }
  }
}
