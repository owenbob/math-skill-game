import React from 'react';
import range from 'underscore'

const Symbols = props =>
	(
  <div>
  <link rel="stylesheet" href={props.iconStyle}/>
  { (range.range(0,props.numberOfStars)).map(i =>
    <i key={i} className="fa fa-star"></i>
  )}
  </div>
  );

  export default Symbols