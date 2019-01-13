
 function addItem() {

// add event istener to the checkbox element

    var item = document.getElementById('input').value;    

    if(item == ''){
        document.getElementById("demo").innerHTML = "Todo can't be an empty !";
        setTimeout(() => {
            document.getElementById("demo").innerHTML = "";
        },2000);

        return false;
    }
    if(!item.trim().length){
        document.getElementById("demo").innerHTML = "TODO can'be whitespaces!";
        setTimeout(() => {
            document.getElementById("demo").innerHTML = "";
        },2000);
       
        return false;
    }
    // create text node of input value
    var todoNode = document.createTextNode(item);
    // create ul
    var ul = document.getElementById('todoList');
    //create list
    var li = document.createElement('li');
    li.setAttribute('class','listItem');

    // create checkbox
    var myCheckBox = document.createElement('input');
    myCheckBox.type = 'checkbox';
    //set attribute
    myCheckBox.setAttribute('id','checkBox');

    // create label
    var label = document.createElement('label');
    label.setAttribute('id','todoLabel');
    label.setAttribute('for', 'item')  // optional since no attribute have been set to label in html

//////////////////////////////////////////////////////////

// make an object and store in local storage so on refereshing the page 
// it could fetch all the added todos.
    var currentDate = getCurrentDate();
    var localTime = new Date().toLocaleTimeString();;

const myTodos = {
    isChecked : false,
    // uId:uId,
    todo : item,
    getCurrentDate: currentDate,
    getLocalTime: localTime,
    timeStamp: Math.floor(Date.now() / 1000)                // for time stamp
}
var x = showOnTheWebPage(myTodos);
if(x) {
    
document.getElementById("demo").innerHTML = "Successfully Added to your TODO";
setTimeout(() => {
    document.getElementById("demo").innerHTML = "";
},2000); 
}
// else {
//     document.getElementById("demo").innerHTML = "Error Occurs !";
// setTimeout(() => {
//     document.getElementById("demo").innerHTML = "";
// },2000); 
//  return false;
// }

// object to string
const strTodo = JSON.stringify(myTodos);
var key = item;         // making key as todo value itself
localStorage.setItem(key,strTodo);
 
  
// addding EVENT LISTENER for accessing checkbox value when checkbox changes
  /*
   document.getElementById("checkBox").addEventListener("click", function(event) {

   var str =  localStorage.getItem(myTodos.todo);    // returns as string
   var obj = JSON.parse(str);   // str to obj
   obj.isChecked = !obj.isChecked;
   var strTodo = JSON.stringify(obj);
   localStorage.setItem(key,strTodo);

  });
   */
    return true;
}

function getCurrentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today =  dd + '/' + mm + '/' + yyyy;
        return today;
    }

function fetchFromLocalStorage() {    

    // fetch from local storage
    var len = localStorage.length;

    for ( var i = 0; i<len ; i++ ) {
        var myStrTodo = localStorage.getItem( localStorage.key( i ));
        objTodos = JSON.parse(myStrTodo);

       // Now show these all to the web
        showOnTheWebPage(objTodos);
    }

}
function showOnTheWebPage(objTodos) {

   var checkedSign = objTodos.isChecked;
   var todoItem = objTodos.todo;
   var currentDate = objTodos.getCurrentDate;
   var todayDate = getCurrentDate();
   if(todayDate == currentDate)
   currentDate = "Today";

   var localTime = objTodos.getLocalTime;


 // create text node of input value
 var todoNode = document.createTextNode(todoItem);
 // create ul
 var ul = document.getElementById('todoList');
 //create list
 var li = document.createElement('li');
 li.setAttribute('class','listItem');

 // create checkbox
 var myCheckBox = document.createElement('input');
 myCheckBox.type = 'checkbox';
 //set attribute
 myCheckBox.setAttribute('id','checkBox');
//  myCheckBox.setAttribute('id',objTodos.uId);

 myCheckBox.checked = checkedSign;

 // create label
 var label = document.createElement('label');
 label.setAttribute('id','todoLabel');


 //  addding date and time 

 var label2 = document.createElement('label');                   // create <label> </label> element
 label2.setAttribute('id','dateAndTime');      // id= dateAndTime   <label id = dateAndTime>    </label>
 var b = document.createElement('b');    // <b> </b>
 var timeTextNode = document.createTextNode(localTime);   // text node having local time 
    
    b.appendChild(timeTextNode);       //<b> 11:20:02 pm </>          // for example
    label2.appendChild(b);    //        <label> <b> ...... </b>     </label>
    var dateTextNode = document.createTextNode(',' + currentDate);
    label2.appendChild(dateTextNode); 
     
li.appendChild(myCheckBox);
label.appendChild(todoNode);
li.appendChild(label);
li.appendChild(label2);

ul.insertBefore(li,ul.childNodes[0]);



// CHECK FOR ERROR 
// .......................................
// ...............................

input.value = '';         // clear input text

 li.className = 'visual';

// addding EVENT LISTENER for accessing checkbox value when checkbox changes
  
   document.getElementById("checkBox").addEventListener("click", function(event) {

   var str =  localStorage.getItem(objTodos.todo);    // returns as string
   var obj = JSON.parse(str);   // str to obj
   obj.isChecked = !obj.isChecked;
   var strTodo = JSON.stringify(obj);
   localStorage.setItem(objTodos.todo,strTodo);

  });

return true;

}

function removeItem() {

    var ul = document.getElementById("todoList");
    var li = document.getElementsByTagName('li')
    var len = li.length;
     console.log('total list from remove func = ' + len);

     if(!len) {
        document.getElementById("demo").innerHTML = "No completed Task!";
        
        setTimeout(() => {
            document.getElementById("demo").innerHTML = "";
        },2000);

        return false;
     }
     var count = 0;
     for(let index = 0; index < len ;index++)
     while(li[index] && li[index].children[0].checked){
         count++;

        ul.removeChild(li[index]);
    }

    if(!count)
    {
        document.getElementById("demo").innerHTML = "No completed Task!";
        setTimeout(() => {
            document.getElementById("demo").innerHTML = "";
        },2000);
        return false;
    }
    document.getElementById("demo").innerHTML = "Successfully Removed All Done Task";
    setTimeout(() => {
        document.getElementById("demo").innerHTML = "";
    },2000);
  
// ALso remove from local storage

  // fetch from local storage
  var len = localStorage.length;

  for ( var i = 0; i<len ; i++ ) {
      var key = localStorage.key( i );
      var myStrTodo = localStorage.getItem(key);
      objTodos = JSON.parse(myStrTodo);

      while(localStorage.key(i) && (objTodos.isChecked == true)) {
       // alert(localStorage.key(i));
        localStorage.removeItem(localStorage.key(i));
         myStrTodo = localStorage.getItem(localStorage.key(i));
         objTodos = JSON.parse(myStrTodo);
        
    }
    
} 
return true;
}