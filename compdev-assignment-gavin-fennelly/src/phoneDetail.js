    import React from 'react';
    import request from 'superagent' ; 

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
              <img src={"/phoneSpecs/" + this.props.phone.images[0]} 
                    alt={this.props.phone.name}
                    className="phone" />
            </div>
            ) ;
			
              return (
                  <div>
                   {mainImage}
                   <h1>{this.props.phone.name}</h1>
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
	   
       componentDidMount: function() {
          request.get(
             '/phoneSpecs/phones/phones/' + this.props.params.id + '.json', function(err, res) {
                 var json = JSON.parse(res.text);
                if (this.isMounted()) {
                    this.setState({ phone : json});
          }
        }.bind(this));
      } ,
	  
      render: function(){
console.log(phone);
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
			display = <p>No phone details</p> ; 
			 }
			 
            return (
                <div>
              {display}
            </div>
            );
      }
    });

    export default PhoneDetail;