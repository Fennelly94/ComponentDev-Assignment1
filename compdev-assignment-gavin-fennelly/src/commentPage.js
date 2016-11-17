    import React from 'react';
    import _ from 'lodash';
    import api from './test/stubAPI';
	import { Link } from 'react-router'; 



   var QuestionItem = React.createClass({
		
			getInitialState : function() {
               return {
				   
                status : '',
                query: this.props.question.query,
                subject: this.props.question.subjectaddress,
               } ;
            },
		
        render : function() {
			
            var lineStyle = {
                 fontSize: '20px', marginLeft: '10px'  };
            var cursor = { cursor: 'pointer' } ;

			var line ;
			
               line = <span >
			     
			   <dl>
			   <dt>{this.props.question.subject}</dt>
			   {this.props.question.query}
			   </dl>
			   
			   <br></br>

			   </span>;
			   
            return (
              <div >
			  
			   <span style={lineStyle} >{line}<span>
  
                  </span>
                </span>

              </div>  
        );
        }
       }) ;
	   
	  var QuestionsList = React.createClass({
        render : function() {
			
          var items = this.props.questions.map(function(question,index) {
             return <QuestionItem key={index} question={question} 
						addHandler={this.props.addHandler} /> ;
            }.bind(this) )
          return (
            <div>
			     <Link to={'/commentPage/'}>Comments</Link>
                  {items}
                  </div>
            );
        }
    }) ; 
	

   