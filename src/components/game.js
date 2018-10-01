import React from 'react';
import '../App.css'
import range from 'underscore'

import Numbers from './numbers';
import Symbols from './symbols';
import  Buttons from './buttons';
import Answer from './answers';
import DoneFrame from'./doneframe';

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

export default Game;