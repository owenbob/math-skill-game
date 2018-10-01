import React from 'react';
import range from 'underscore'


const Numbers= (props) =>{
    const numberClassName =(number) =>{
    if(props.usedNumbers.indexOf(number)>=0) {
        return "used";
    }
    if(props.selectedNumbers.indexOf(number)>=0) {
        return "selected";
    }
    }
        return(
    <div className="card text-center">
        <div>
        {Number.list.map((number,i)=> 
        <span key={i} className={numberClassName(number)}
        onClick={()=>props.selectNumber(number)}>
        {number}
        </span>
        )
        }
        </div>
    </div>
    )
    };
Number.list = range.range(1,10)

export default Numbers