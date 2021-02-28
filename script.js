const Todo = props => (
    <li>
        <input type="checkbox"  checked={props.todo.check} onChange = {props.onChang}/>
        <button onClick = {props.onDelete}>delete</button>
        <span>{props.todo.text}</span>
    </li>
)
let id=0;
class App extends React.Component {
    constructor(){
        super();
        this.state = {todos: [
                     {id: 991, text: "task1", check: false}, 
                     {id: 931, text: "task2", check: false}, 
                     {id: 961, text: "task3", check: true}]
                    };
    }
    addTODO(){
        const text = prompt("Type your todo:");
        this.setState({todos: [...this.state.todos, {id : id++, text: text, check: false}]});
    }

    delete(id){
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    changeTODO(id){
        this.setState({todos: this.state.todos.map(todo => todo.id == id ? {...todo , check: !todo.check} : todo)})
    }
    render(){
        return (
            <div>
               <h1>My TODO List</h1>
               <div>TODO count: {this.state.todos.length}</div>
               <div>Unchecked TODO count: {this.state.todos.filter(todo => !todo.check).length}</div>
               <button onClick = {() => this.addTODO()}>Add todo</button>
               <ul>
                   {this.state.todos.map(todo => <Todo 
                   onDelete = {() => this.delete(todo.id)} 
                   onChang = {() => this.changeTODO(todo.id)} 
                   todo={todo} />)}
               </ul>
            </div>
        )
    }
    
} 

ReactDOM.render(<App />, document.getElementById("root"));
