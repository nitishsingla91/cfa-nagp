import './addtodo.component.js';
import './list.component.js';


//Custom Component implementation
const template = document.createElement('template');
template.innerHTML = `
<main class="container">
  <todo-list ref="list"></todo-list>
  <add-todo></add-todo>
</main>
`;

let LIST;
let id;

class Main extends HTMLElement {

    
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

    
    }
  connectedCallback() {
  
    this.refs = {
      form: this._shadowRoot.querySelector('add-todo'),
      list: this._shadowRoot.querySelector('todo-list'),
    }
    this.refs.form.props = {
      onSubmit: this.addTask.bind(this),
    }

    let data =  localStorage.getItem("TODO");

    if(data){
  
        this.LIST = JSON.parse(data);
        this.id = this.LIST.length;
      
      }else{
        this.LIST = [];
        this.id = 0;
      }
    
    this.refs.form.render();
    this.refs.list.render();
  }

  render() {
    this.dom.innerHTML = template;
  }

  addTask(task) {

    this.refs.list.addItem(task.text,this.id);

    this.LIST.push({
        name : task.text,
        id : this.id,
        done : false,
        trash : false
     });
     localStorage.setItem("TODO", JSON.stringify(this.LIST));
     this.id++;
   
  }
}

export default Main;


