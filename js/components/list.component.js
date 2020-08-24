const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet"  href="css/style.css" >
<link rel="stylesheet" href="css/font-awesome.css">
<div class="content">
<ul id="list" ref="list">
   
</ul>
</div>
`;

//Claasses names
const CHECK = "fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST;
let id ;
class List extends HTMLElement {

 constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.innerHTML = template;
    this.todoList = this._shadowRoot.querySelector('ul');
  
}

  connectedCallback() {

  }

  render() {
  

    let data =  localStorage.getItem("TODO");

    if(data){
  
        this.LIST = JSON.parse(data);
        this.id = this.LIST.length;
        this.loadList(this.LIST,this.todoList);
      
      }else{
        this.LIST = [];
        this.id = 0;
      }

     
      this.todoList.addEventListener("click", function(event){
        const  element = event.target; 
        const elementJob = element.attributes.job.value;
      
        if(elementJob == "complete"){

          element.classList.toggle(CHECK);
    
          element.classList.toggle(UNCHECK);
      
          element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
      
          this.LIST[element.id].done = this.LIST[element.id].done ? false : true;
      
        }else if(elementJob == "delete"){
             element.parentNode.parentNode.removeChild(element.parentNode);

             this.LIST[element.id].trash = true;
         }
      
         localStorage.setItem("TODO", JSON.stringify(this.LIST));
      
      });    
      
  }



  // load List to Interface
 loadList(array,list){

    array.forEach(function(item){
       
     
         const toDo = item.name;
         const id =  item.id;
         const trash = item.trash;
         const done = item.done; 

         if(trash){ return; }
  
       
         const DONE = done ? CHECK : UNCHECK;
         const LINE = done ? LINE_THROUGH : "";
     
     
         const items =   ` <li class="item">
         <i class="fa ${DONE} co" job="complete" id=${id}> </i>
         <p class="text ${LINE}">${toDo}</p>
         <i class="fa fa-trash-o de" job="delete" id=${id}> </i>
         </li>
         `;             
     
         const position = "beforeend";
     
         
         list.insertAdjacentHTML(position,items);

    });
}
  
// Complete To Do
 completeToDo(element){

    element.classList.toggle(CHECK);
    
    element.classList.toggle(UNCHECK);

    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    this.LIST[element.id].done = this.LIST[element.id].done ? false : true;

}

//Remove To DO
 removeToDO(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    this.LIST[element.id].trash = true;
}

// target the items created dynamically
addItem(toDo,id){
   this.addToDo(toDo,id,false,false,this.todoList)
}

// add Item to List
addToDo(toDo,id,done,trash,list){

    if(trash){ return; }
  
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const items =   ` <li class="item">
    <i class="fa ${DONE} co" job="complete" id=${id}> </i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id=${id}> </i>
    </li>
    `;             

    const position = "beforeend";
    
    list.insertAdjacentHTML(position,items);
}

}

window.customElements.define('todo-list', List);