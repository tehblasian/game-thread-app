import React from 'react';
import PropTypes from 'prop-types';

var styles = {
	content: {
		textAlign: 'center',
		fontSize: '40px',
		fontWeight: '100',
	}
};

class Loading extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			text: props.text
		};
	}
	
	componentDidMount(){
		var stopper = this.props.text + '...';
		this.interval = window.setInterval(function(){
			if(this.state.text === stopper){
				this.setState(function(){
					return {
						text: this.props.text
					}
				});
			}
			else{
				this.setState(function(prevState){
					return {
						text: prevState.text + '.'
					}
				});
			}
		}.bind(this), this.props.speed);
	}
	
	componentWillUnmount(){
		window.clearInterval(this.interval);
	}
	
	render(){
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		)
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
}

//set default text to loading
Loading.defaultProps = {
	text: 'Loading',
	speed: 300,
}

module.exports = Loading;