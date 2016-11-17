    import React from 'react';
    import request from 'superagent' ;
	import api from './test/stubAPI';
	import { Link } from 'react-router';

  var Specification = React.createClass({
      render: function(){
            var phone = this.props.phone ;             
            var age = phone.age.map(function(avb,index) {
              return (
                       <dd key={index}>{avb}</dd>
                     ) ;
                }) ;
            var dimensions = phone.sizeAndWeight.dimensions.map(function(dim,index) {
              return (
                        <dd key={index}>{dim}</dd>
                     ) ;
                }) ;
          var display = (
              <div>
                 <ul className="specs">
				 <p>
				<u> <b> <h2> Player Profile </h2> </b> </u>
				
				</p>
				 
                  <li >
				  
				  
                   <h4> <span><u><b>Age:</b></u></span></h4>
                    <dl>
                     
                         {age}
                    </dl>
                  </li>
				  
                  <li>
                    <h4><span><u><b>Position</b></u></span></h4>
                    <dl>
                   
                      <dd>{phone.position.type}</dd>
                    
                    </dl>
                  </li>    
                 
                  
                  <li>
                    <h4><span><u><b>Career Goals</b></u></span></h4>
                    <dl>
                      <dt>Real Madrid Goals</dt>
                      <dd>{phone.goals.realmadridgoals}</dd>
                      <dt>International Goals</dt>
                      <dd>{phone.goals.internationalgoals}</dd>
                    </dl>
                  </li>
                  <li>
                    <h4><span><u><b>Height and Weight</b></u></span></h4>
                    <dl>
                    
                          {dimensions}
                    
                    </dl>
                  </li>    
                 
                  
                  <li>
                    <h4><span><u><b>Nationality</b></u></span></h4>
                    <dd>{phone.nationality}</dd>
                  </li>              
                  </ul>  
          
            </div>
           )
            return (
                 <div>
                  {display}

              </div>
             );
      }
  });

  var Form = React.createClass({

       getInitialState: function() {
           return { query: '', subject: ''};
        },
		
       handleQueryChange: function(e) {
           this.setState({query: e.target.value});
       },
	   
       handleSubjectChange: function(e) {
           this.setState({subject: e.target.value});
       },
	   
	    handleSubmit: function(e) { {/* submit is the add button! */}
        e.preventDefault();
        var query = this.state.query.trim();
        var subject = this.state.subject.trim();
        if (!query ) {
          return;
        }
        this.props.addHandler(query,subject);
        this.setState({query: '', subject: ''});
       }, 
  
  render : function() {
           return (
		   
             <form style={{marginTop: '30px'}}>
			 
                <u><b><h3>Ask the Real Madrid player a question?</h3></b></u>
				
				<p>
				
				</p>
				
				
                <div className="form-group">
				
                  <input type="text" className="form-control" placeholder="What kind of topic is your question?" value={this.state.query} onChange={this.handleQueryChange}>
				  
				  </input>
				</div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="What do you want to ask?" value={this.state.subject} onChange={this.handleSubjectChange}>
				  </input>  
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit Question</button>
				
              </form>
			  
			    );
			
          }
		  
       });
  
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
	
    var ImagesSection = React.createClass({
		
      render: function(){
		  
            var thumbImages = this.props.phone.images.map(function(img,index) {
              return (
                  <li>
                   <img key={index} src={"/phoneSpecs/" + img}
                       alt="missing" />
                </li>
                ) ;
                } );
				
            var mainImage = (
              <div className="phone-images">
             
                   
                   
            </div>
            ) ;
			
              return (
                  <div>
                   {mainImage}
                   <h2><i>{this.props.phone.name}</i></h2>
                   <p>{this.props.phone.description}</p> 
				   
                   <ul className="phone-thumbs">
                       {thumbImages}
					   
                   </ul>
                  </div>
				  
                  );
          }
    })

    var PhoneDetail = React.createClass({
		
       getInitialState: function() {
           return { phone: null };
       },
	   
	    addQuestion : function(t,l) {
            if (api.add(t,l)) {
             this.setState({});
			}
          },
	   
      componentDidMount: function() {
		   
		   var url = '/phoneSpecs/phones/phones/' + this.props.params.id + '.json';
		   console.log(url);   
          request.get(
             url, function(err, res) {
                 window.resp = res;
				 var json = JSON.parse(res.text);
                if (this.isMounted()) {
                    this.setState({ phone : json});
          }
        }.bind(this));
      } ,
	  
      render: function(){
		  
		   var questions = _.sortBy(api.getAll(), function(question) {
         return - question;
             }
          );
		  
var display;

            var phone = this.state.phone ;
          if (phone)
		  {
           display =  (
                <div>
                   <ImagesSection phone={phone} />
                   <Specification  phone={phone} />       
                </div>
                ) ;
             }
			 else
			 {
			display = <p>No player details available </p> ; 
			 }
			 
            return (
                <div>
				
               {display}
			   
			 <QuestionsList questions={questions} />
            <li> <Form addHandler={this.addQuestion}  /> </li>
            </div>
            );
      }
    });

    export default PhoneDetail;