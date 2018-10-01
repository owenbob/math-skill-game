import React from 'react';
import './App.css';
import range from 'underscore'
import { Button} from 'react-bootstrap';

const Symbols = props =>
	(
    
  <div>
  <link rel="stylesheet" href={props.iconStyle}/>
  { (range.range(0,props.numberOfStars)).map(i =>
    <i key={i} className="fa fa-star"></i>
  )}
  </div>
  );


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

const Answer = (props) =>{
	return(
  <div className="col-5">
  {props.selectedNumbers.map((number,i) =>
  	<span key={i} onClick={()=>props.unselectedNumber(number)}
    >{number}</span>
  )}
  </div>
  );
}

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

const DoneFrame = (props) =>{
	return(

  <div className="text-center">
  <h2>{props.doneStatus}</h2>
  <button 
  	className="btn btn-secondary"
    onClick={props.resetGame}
  >
  Play Again
  </button>
  </div>
  );
}

const possibleCombinationSum = (arr, n) => {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

class Game extends React.Component{
	static randomNumber =()=> 1 + Math.floor(Math.random()*9);
	static initialState = () =>({
      selectedNumbers:[],
      randomNumberOfStars:Game.randomNumber(),
      answerIsCorrect: null,
      usedNumbers:[],
      reDraws: 5,
      doneStatus:null,
      iconStyleRef:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
      bootStrap:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
  })
  state = Game.initialState();
  resetGame = () => this.setState(Game.initialState());
  selectNumber=(clickedNumber)=>{
    if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){ return;}
    this.setState(prevState => ({
    answerIsCorrect:null,
    selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
    
  }));
  }
  unselectNumber = (clickedNumber) =>{
  this.setState(prevState=> ({
  	answerIsCorrect:null,
  	selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
  
  }));
  }
  checkAnswer = () => {
  const { selectedNumbers, randomNumberOfStars } = this.state;
  const result = selectedNumbers.reduce((acc,n) => acc + n, 0);
  const bool = result === randomNumberOfStars? true : false; 
  this.setState({
  	answerIsCorrect: bool,
  });
  
  }
  acceptAnswer =()=>{
  	this.setState(prevState =>({
    usedNumbers:prevState.usedNumbers.concat(prevState.selectedNumbers),
  	selectedNumbers:[],
    answerIsCorrect: null,
		randomNumberOfStars:Game.randomNumber()
    }),this.updateDoneStatus);
  
  }
  reDraw =() =>{
  	if(this.state.reDraws === 0){return;}
  	this.setState(prevState =>({
    	randomNumberOfStars:Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers:[],
      reDraws:prevState.reDraws - 1
    }),this.updateDoneStatus);
  }
  
  
  
	possibleSolutions = ({ randomNumberOfStars,usedNumbers }) => {
	const possibleNumbers = range(1,10).filter(number => 
	usedNumbers.IndexOf(number) === 1
	);
	return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
	}
  
  updateDoneStatus = () =>{
  	this.setState(prevState => {
    if (prevState.usedNumbers.length === 9){
    return { doneStatus:"Done! Nice"};
    }
    if(prevState.reDraws === 0 && !this.possibleSolutions(prevState)){
    return {doneStatus:"Game Over!"};
    } 
    });
  }
  
render(){
	const { 
    selectedNumbers,
    randomNumberOfStars,
    answerIsCorrect,
    usedNumbers,
    reDraws,
    doneStatus,
    iconStyleRef
  } =this.state
	return(
  
  <div className="game_div">
    <h3 className="h3">Play Nine</h3>
    <hr />
    <div className="stars_div">
        <Symbols  
            numberOfStars={randomNumberOfStars}
            iconStyle={iconStyleRef}
         />
    </div>
    <div className="buttons_div">
        <Buttons 
          selectedNumbers={selectedNumbers}
          checkAnswer={this.checkAnswer}
          answerIsCorrect={answerIsCorrect}
          acceptAnswer={this.acceptAnswer}
          reDraw={this.reDraw}
          reDraws={reDraws}
        />
    </div>
    <div className="answer_div">
        <Answer 
          selectedNumbers={selectedNumbers}
          unselectedNumber={this.unselectNumber}
        />
    </div>
    <br/>
    <div className="numbers_div">
      {doneStatus?
      <DoneFrame 
        doneStatus={doneStatus}
        resetGame={this.resetGame}
        />:
      <Numbers 
        selectedNumbers = {selectedNumbers}
        selectNumber = {this.selectNumber}
        usedNumbers ={usedNumbers}
      />
      }
    </div>
  </div>
  
  )
};
}

class App extends React.Component{ 
  render(){
    return(
    <div className="center">
    <Game />
    </div>
    )
  };
}

export default App;
