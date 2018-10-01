import React from 'react';
import range from 'underscore'

const Symbols = props =>
	(
    
  <div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
  { (range.range(0,props.numberOfStars)).map(i =>
    <i key={i} className="fa fa-star"></i>
  )}
  </div>
  );


  export default Symbol