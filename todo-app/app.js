/*** assignment: todo list
1. Add options for each to do like 'Complete' and 'Delete'.

You'll need to refactor your template to include links to mark each to do as complete or delete it. Then in your data object, you'll have to modify your to dos to be objects (instead of strings in an array) with an isComplete property that is either true or false. Finally, you'll need to create methods that will handle that functionality for when users mark a to do as complete or delete it.

2. Add a Current To do template

You'll need to create a new template for a Current To do and give each to do a way to
make it the current to do item (maybe a link). While we're at it, lets change our data
object so that each to do is an object with a 'description' property that we can show
when a to do item is marked as featured. You'll need to write functions to handle
making a to do the Current To Do and reorganize your data so one to do is featured at a time.

*/


const data = {
    todos: [
        {
            newTodo: "go to sleep",
            isCompleted: false
        },
        {
            newTodo: "make dinner",
            isCompleted: false
        },
    ],
    completedTodos: []
}

// constructor for todo-list items
class TodoItem  {
    constructor(newTodo, completed) {
        this.newTodo = newTodo
        this.isCompleted = completed
    }
}


/*** let nunjucks do its thing **/

// 1. get the template source
let source = document.querySelector('#todo-list')
// 2. compile the template into a template function
let todoTemplate = nunjucks.compile(source.innerHTML)
// 3. call our template function, passing in data to render the template with:
let renderedTemplate = todoTemplate.render( data )
// 4. Add our rendered HTML to the page
document.querySelector('#app').innerHTML = renderedTemplate

// re-compile template function
function reCompile() {
    let renderedTemplate = todoTemplate.render(data)
    document.querySelector('#app').innerHTML = renderedTemplate
}


// grab app from HTML
let todoApp = document.querySelector('#app')
//console.log(todoApp)


// grab input form to add event listener
let todoForm = document.querySelector('#form')
todoForm.addEventListener('click', addTodo)

// todo list input event handler function
function addTodo( e ) {
    e.preventDefault()
    if(e.target.tagName === 'BUTTON') {
        let newTodo = document.querySelector('input').value
        if (newTodo !== '') {
            let todoItem = new TodoItem(newTodo, false)
            data.todos.push(todoItem)
            document.querySelector('input').value = ''
        }


        //console.log(data.todos)

        // // refresh list
        // reCompile();
    }
    // refresh list
    reCompile();
}

// event listener to mark as complete
todoApp.addEventListener('click', markAsComplete)

// markAsComplete event handler function
function markAsComplete ( e ) {
    e.preventDefault()
    if (e.target.tagName === 'A') {
        //console.log(e)
        let ourIndex = e.target.parentNode.dataset.index
        //console.log(ourIndex)
        let checkedTodo = e.target.parentNode.previousElementSibling

        if (!data.todos[ourIndex].isCompleted) {
            // Mark the item as completed and then move it to the Completed todos array
            data.todos[ourIndex].isCompleted = true
            let completedTodo = data.todos[ourIndex]

            //console.log(checkedTodo)


            data.completedTodos.push(completedTodo)
            //console.log(data.completedTodos)
            //data.todos.splice(ourIndex,1)
        } else {
            data.todos[ourIndex].isCompleted = !data.todos[ourIndex].isCompleted

            // this makes sure that if it is toggled back to "mark as completed", it is removed from the completed todos array
            let removeFromCompletedTodos = data.todos[ourIndex].newTodo
            for (let i = 0; i < data.completedTodos.length; i++) {
                if(removeFromCompletedTodos == data.completedTodos[i].newTodo){
                    data.completedTodos.splice(i,1)
                }
            }
        }

        // refresh list
        reCompile();
    }
}

// event listener to delete todo items
todoApp.addEventListener('click', deleteTodo)

function deleteTodo ( e ) {
    e.preventDefault()

    if (e.target.className === 'deleteButton') {
        //console.log( e )
        let ourIndex = e.target.previousElementSibling.dataset.index
        data.todos.splice(ourIndex,1)

        // refresh list
        reCompile();
    }
}

//event listeners to toggle the view completed todos button
todoApp.addEventListener('click', viewCompletedTodos)
todoApp.addEventListener('click', hideCompletedTodos)

// view completed todos event handler
function viewCompletedTodos( e ) {

    if(e.target.className === 'viewCompletedTodosBtn') {
        //console.log( e )
        let displayCompletedTodos = e.target.nextElementSibling
        //console.log(displayCompletedTodos)
        displayCompletedTodos.style.display = 'block'


    }
}

// hide todos event handler
function hideCompletedTodos ( e ) {
    if(e.target.className === 'hideCompletedTodosBtn') {
        //console.log( e )
        let hideCompletedTodoList = e.target.parentNode
        hideCompletedTodoList.style.display = 'none'

    }
}
