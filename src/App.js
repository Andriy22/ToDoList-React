import React, { Component } from 'react';
import './App.css';

let todoItems = [];
todoItems.push({index:1, value: "To do home task from Math", done:false});
todoItems.push({index:2, value: "Learn Docker", done:false});
todoItems.push({index:3, value: "Solve all problems in a hole world", done:false});
todoItems.push({index:4, value: "Become Older", done:false});

class ToDoList extends Component{

  render(){
    var todoItems = this.props.items.map((item,index) => {
      return (<ToDoListItem key={index} item={item} index={index} 
                            removeItem={this.props.removeItem}
                            MarkDone={this.props.MarkDone}/>);
    })
    return (
      <ul className="list-group">
        {todoItems}
      </ul>
    );
  }


}


class ToDoListItem extends Component{

  constructor(props){
    super(props);
    this.onClickCLose = this.onClickCLose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  onClickCLose(){
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone(){
    var index = parseInt(this.props.index);
    this.props.MarkDone(index);
  }
  render(){
    let todoClass = this.props.item.done? "done" : 'undone';
    return(
      <li className="list-group-item">
         <div className={todoClass}>
         <span className="glyphicon glyphicon-ok icon" 
               aria-hidden="true"
               onClick={this.onClickDone}>
         </span>
         <p>{this.props.item.value}</p>
         <button type="button" 
                 className="close"
                 onClick={this.onClickCLose}>&times;</button>
         </div>
      </li>
    );
  };

}

class ToDoForm extends Component{

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event){

    event.preventDefault();

    let newItemValue = this.refs.itemName.value;
    if(newItemValue)
    {
      this.props.addItem(newItemValue);
      this.refs.form.reset();
    }
  }
  render(){
     return(
       <form ref="form" 
             onSubmit={this.onSubmit} 
             className="form-inline">
       <input type="text" 
             ref="itemName" 
             placeholder="add new task..." 
             className="form-control"></input>
      <button type="submit" 
              className="btn btn-default">Add</button>
       
       </form>
     );
  };
}

class ToDoHeader extends Component {
  render(){
    return <h1>Hello User from TODO LisT!</h1>
  }
}

class TodoApp extends Component{
  constructor(props)
  {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.MarkDone = this.MarkDone.bind(this);
    this.state = {todoItems : todoItems};
  }
  addItem(todoItem){
     todoItems.unshift({
       index : todoItems.length+1,
       value : todoItem.newItemValue,
       done : false 
     });
     this.setState({todoItems : todoItems});
  }
  removeItem(itemIndex){
    todoItems.splice(itemIndex,1);
    this.setState({todoItems : todoItems});
  }
  MarkDone(itemIndex)
  {
    let item = todoItems[itemIndex];
    todoItems.splice(itemIndex,1);
    item.done=!item.done;
    item.done ? todoItems.push(item) : todoItems.unshift(item);
    this.setState({todoItems : todoItems});
  }
  render(){
    return(
      <div id = "main">
      <ToDoHeader></ToDoHeader>
      <ToDoList items = {this.props.initItems} 
                removeItem={this.removeItem}
                MarkDone={this.MarkDone}></ToDoList>
      <ToDoForm addItem = {this.addItem}></ToDoForm>

      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
          return <TodoApp initItems = {todoItems}></TodoApp>
      </div>
    );
  }
}

export default App;
