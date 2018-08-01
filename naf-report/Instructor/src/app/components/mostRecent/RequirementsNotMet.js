import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';


class RequirementsNotMet extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const listItems = this.props.dataByTopic.map( (element, index) => 
			<div>
			 		<li ><b>{element.name} </b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Remediation({element.major.length}) </li>
	  			 			<ul>
	  			 				{
	  			 					element.major.map((ele, i, arr) => {
			 							if(i !== arr.length - 1)
  			 								return ele + ', ';
  			 							else
  			 								return ele;
	  			 					})
	  			 				}
	  			 			</ul>
				 		<li>- Needs Minor Remediation({element.minor.length}) </li>
				 			<ul>
	  			 				{
	  			 					element.minor.map((ele, i, arr) => {
			 							if(i !== arr.length - 1)
  			 								return ele + ', ';
  			 							else
  			 								return ele;
	  			 					})
	  			 				}
				 			</ul>
						<li style={{color:'red'}}>- Critical Question Errors({element.critical.length})</li>
							<ul>
	  			 				{
	  			 					element.critical.map((ele, i, arr) => {
			 							if(i !== arr.length - 1)
  			 								return ele + ', ';
  			 							else
  			 								return ele;
	  			 					})
	  			 				}
							</ul>
			 		</ul>
			</div>
		);

		return (
		 	<ul className="requirements-list">
				{listItems}
	 		</ul>
		);
	}

}



RequirementsNotMet.propTypes = {
	byTopic: PropTypes.bool,
	dataByTopic: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			major: PropTypes.arrayOf(PropTypes.string),
			minor: PropTypes.arrayOf(PropTypes.string),
			critical: PropTypes.arrayOf(PropTypes.string)
		})
	) 
};

export default RequirementsNotMet;

/*

 				<li ><b>{element.name} </b></li>
		 		<ul className="inner-list">
  			 		<li>- Needs Major Remediation({element.major.length}) </li>
  			 			<ul>
		 						{element.major}
	 					</ul>
	 			</ul>
			 		<li ><b>Overview </b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Remediation: &#160; &#160; 11 - 
	  			 			Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
	  			 		</li>
				 		<li>- Needs Minor Remediation: &#160; &#160; 8 - 
				 			Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
				 		</li>
						<li>- Critical Question Errors: &#160; &#160; 2 - Olivia Noah - Question 1, Question 2, Isabella James - Question 4
						</li>
			 		</ul>
			 		<li ><b>Topic 02 </b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Remediation: &#160; &#160; 11 - 
	  			 			Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
	  			 		</li>
				 		<li>- Needs Minor Remediation: &#160; &#160; 8 - 
				 			Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
				 		</li>
						<li>- Critical Question Errors: &#160; &#160; 2 - Olivia Noah - Question 1, Question 2, Isabella James - Question 4
						</li>
			 		</ul>



			 		<li ><b>Topic 02 </b></li>
			 		<ul className="inner-list">
	  			 		<li>- Needs Major Remediation(11) </li>
	  			 			<ul>
	  			 				Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
	  			 			</ul>
				 		<li>- Needs Minor Remediation(8) </li>
				 			<ul>
				 				Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton
				 			</ul>
						<li style={{color:'red'}}>- Critical Question Errors(1)</li>
							<ul>
								Timmothy Alberton
							</ul>
			 		</ul>
			 <p><span>Topic 01</span></p>
			 <p><span className="topicTitle">Major Requirements(11)</span></p>
			 <p><span className="topicDescription">Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Minor Requirements(8)</span></p>
			 <p><span className="topicDescription">Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Critical Errors(1)</span></p>
			 <p><span className="topicDescription">Timmothy Alberton</span></p>
			 <p><span>Topic 02</span></p>
			 <p><span className="topicTitle">Major Requirements(11)</span></p>
			 <p><span className="topicDescription">Bob Smith, James Mason, Henry McFarlene, Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Minor Requirements(8)</span></p>
			 <p><span className="topicDescription">Janet Jonson, David Silinger, Jim  Hicks, Samuel Johson, Timmothy Alberton</span></p>
			 <p><span className="topicTitle">Critical Errors(1)</span></p>
			 <p><span className="topicDescription">Timmothy Alberton</span></p>
			 */