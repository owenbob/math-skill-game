import React from 'react'
import { Button} from 'react-bootstrap';

const Buttons = (props) =>{
	let button;
  	switch(props.answerIsCorrect){
    	case true:
      	button =
        <button  className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check"></i>
        </button>
      	break;
      case false:
      	button = 
        <button  className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>
      	break;
      default:
      	button = 
        <Button   
            className="btn btn-primary" 
            disabled={props.selectedNumbers.length === 0}
            onClick={props.checkAnswer}
            >
            =							
            </Button >
      	break;
    }
	return(
  <div className="col-2">
  {button}
  <br/><br/>
  <Button 
  	className="btn btn-warning btn-sm" 
    onClick={props.reDraw}
    disabled={props.reDraws===0}
    >
  <i className="fa fa-refresh"></i>
  {props.reDraws}
	</Button >
  </div>
  );
}

export default Buttons