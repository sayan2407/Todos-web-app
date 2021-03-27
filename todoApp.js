window.onload = function () {
    //  var a = [];
    loading();
  /*  let ch = document.getElementById('selectAll') ;
    if(checkAll())
    {
       ch.checked = true ;
    }
    else 
    {
        ch.checked = false ;
    } */
    checkAgain() ;
  

}
var s = 0 ;
function checkAgain()
{
    let ch = document.getElementById('selectAll') ;
    if(checkAll())
    {
       ch.checked = true ;
    }
    else 
    {
        ch.checked = false ;
    }
}
function check()
{
    let j = 0;
    let c = document.getElementById('clear') ;
    console.log(c);
    let arr = JSON.parse(localStorage.getItem('task')) ;
    for(let i=0;i<arr.length;i++)
    {
        console.log(arr[i].completed);
        if(arr[i].completed)
        {
            j++;
        }
    }
    if(j>0)
    {
        c.innerHTML = 'clear completed' ;
      
    }
    else
    {
        c.innerHTML = '' ;
    }

}
function loading() {

    
   s=0;
    let sec =  0 ;
    let count = 0;
    var tasks = [];
    var left = document.getElementById('left');
    var list = JSON.parse(localStorage.getItem("task"));
    if (list == null) {
        localStorage.setItem("task", JSON.stringify(tasks));
    }

    console.log("list", list);

    var text = "";
    var html = "";
    if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
            // console.log(list[i].val);


            if (list[i].completed) {

                text += `<li class='list' id='list${i}' ondblclick=' doubleClick(${i},${sec})'><input class='check' id='check${i}' type='checkbox' onclick='comp(${i})' checked><del>${list[i].val}</del><span class='delSpan' id = 'del${i}' onclick='deleteItem(${i})'>\u00D7</span></li>`;
            }
            else {
                text += `<li class='list' id='list${i}' ondblclick='doubleClick(${i},${sec})'><input class='check' id='check${i}' type='checkbox' onclick='comp(${i})'>${list[i].val}<span class='delSpan' onclick='deleteItem(${i})' id = 'del${i}'>\u00D7</span></li>`;
                count++;
            }

        }
    }
    html = `<ul>${text}</ul>`;
    console.log(html);
    console.log("boom", document.getElementById('input'));
    document.getElementById('tasks-list').innerHTML = html;
    left.innerHTML = count + " items left";
    check() ;
    checkAgain() ;

}

function show(event) {
    check() ;
   
    var tasks = [];
    var ip = document.getElementById('input');
    //  console.log(event.key) ;
    if (event.key === 'Enter') {
        if (ip.value === '') {
            alert('please enter your task');
        }
        else {
            let obj = {
                val: ip.value,
                completed: false,
                del: false

            }
            tasks = JSON.parse(localStorage.getItem("task"));
            console.log(tasks);
            if (tasks === null) {
                obj = {};
                //  localStorage.setItem("task", JSON.stringify(obj));
            }
            tasks.push(obj);
            localStorage.setItem("task", JSON.stringify(tasks));

            if(s===0)
            loading() ;
            else if(s===1)
            activeList() ;
            else if(s===2)
            completeList() ;

            

            ip.value = '';

            // console.log(ip.value);
        }

    }
    checkAgain() ;

}

// all.onclick = function () {

// }
//var allTask = document.getElementById('all');
function comp(index) {
    let arr = JSON.parse(localStorage.getItem('task'));
    let ch = document.getElementById('check' + index);
    if (ch.checked) {
        arr[index].completed = true;

    }
    else {
        arr[index].completed = false;
    }
    localStorage.setItem("task", JSON.stringify(arr));
    loading();

    // alert(arr[index].val) ;
    /*  if(ch.checked)
      {
          alert(arr[index].val) ;
      }
      var completed = [] ;
      
      completed.push(arr[index]) ;
      localStorage.setItem("completed",JSON.stringify(completed)) ;
     console.log(arr[index]); */
}
function deleteItem(index) {
    let arr = JSON.parse(localStorage.getItem('task'));
    arr[index].del = true;
    arr.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(arr));
    loading();
}
function deleteItemActive(index) {
    let arr = JSON.parse(localStorage.getItem('task'));
    arr[index].del = true;
    arr.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(arr));
    activeList();
}
function deleteItemComp(index) {
    let arr = JSON.parse(localStorage.getItem('task'));
  //  arr[index].del = true;
    arr.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(arr));
    completeList();
}

function activeList() {
    let sec = 1 ;
    let left = document.getElementById('left');
    let count = 0;
    let arr = JSON.parse(localStorage.getItem('task'));
    let text = "";
    let html = "";
    for (let i = 0; i < arr.length; i++) {
        console.log();
        if (!arr[i].completed) {
            count++;
            text += `<li class='list' id='list${i}' ondblclick= 'doubleClick(${i},${sec})'><input class='check' id='check${i}' type='checkbox' onclick='compActive(${i})'>${arr[i].val}<span class='delSpan' onclick='deleteItemActive(${i})' id = 'del${i}'>\u00D7</span></li>`;
        }
    }
    html = `<ul>${text}</ul>`;
    document.getElementById('tasks-list').innerHTML = html;
    left.innerHTML = count + " items left";
    check() ;
    checkAgain() ;
}
function completeList() {
    let sec = 3 ;
    let left = document.getElementById('left');
    let count = 0;
    let arr = JSON.parse(localStorage.getItem('task'));
    let text = "";
    let html = "";
    for (let i = 0; i < arr.length; i++) {

        if (arr[i].completed) {
            text += `<li class='list' id='list${i}'  ondblclick= 'doubleClick(${i},${sec})'><input class='check' id='check${i}' type='checkbox' onclick='compCompled(${i})' checked><del>${arr[i].val}</del><span class='delSpan' onclick='deleteItemComp(${i})' id = 'del${i}'>\u00D7</span></li>`;
        }
        else {
            count++;
        }
    }
    html = `<ul>${text}</ul>`;
    document.getElementById('tasks-list').innerHTML = html;
    left.innerHTML = count + " items left";
    check() ;
    checkAgain() ;
}
function compCompled(index) {
    let arr = JSON.parse(localStorage.getItem('task'));
    let ch = document.getElementById('check' + index);
    if (ch.checked) {
        arr[index].completed = true;

    }
    else {
        arr[index].completed = false;
    }
    localStorage.setItem("task", JSON.stringify(arr));
    completeList();

}
function compActive(index) {
    let arr = JSON.parse(localStorage.getItem('task'));
    let ch = document.getElementById('check' + index);
    if (ch.checked) {
        arr[index].completed = true;

    }
    else {
        arr[index].completed = false;
    }
    localStorage.setItem("task", JSON.stringify(arr));
    activeList();
}
function allClick() {
    let allT = document.getElementById('allA');
    let activeT = document.getElementById('activeA');
    let compT = document.getElementById('compA');

    allT.style.backgroundColor = '#4CAF50';
    allT.style.color = 'white';

    compT.style.color = 'blue';
    compT.style.backgroundColor = 'unset';

    activeT.style.color = 'blue';
    activeT.style.backgroundColor = 'unset';

    loading();
  

}

function activeClick() {
    // alert('msmj') ;
    s=1;
    let allT = document.getElementById('allA');
    let activeT = document.getElementById('activeA');
    let compT = document.getElementById('compA');

    activeT.style.backgroundColor = '#4CAF50';
    activeT.style.color = 'white';

    allT.style.color = 'blue';
    allT.style.backgroundColor = 'unset';

    compT.style.color = 'blue';
    compT.style.backgroundColor = 'unset';
    activeList();
   
}
function completeClick() {
    s=2;
    let allT = document.getElementById('allA');
    let activeT = document.getElementById('activeA');
    let compT = document.getElementById('compA');

    compT.style.backgroundColor = '#4CAF50';
    compT.style.color = 'white';

    allT.style.color = 'blue';
    allT.style.backgroundColor = 'unset';

    activeT.style.color = 'blue';
    activeT.style.backgroundColor = 'unset';
    completeList();
   
}
function doubleClick(index,section) {
    if(section === 0)
    {
        loading() ;
    }
    else if(section === 1)
    {
        activeList() ;
    }
    else 
    {
        completeList() ;
    }
    let arr = JSON.parse(localStorage.getItem('task'));
    let l = document.getElementById('list' + index);
    let ip = `<input type="text" id='ip${index}' value='${arr[index].val}' class='ip'>`
    // ip.onkeypress = "update";
    l.innerHTML = ip;
    document.getElementById('ip' + index).addEventListener("keyup", function (event) {
        update(event,index,section)
    });
  // console.log(arr[index].val);
}

function update(event,index,section) {
    console.log(event);
    let up = document.getElementById('ip' + index);
    if (event.key === 'Enter') {
        let v = up.value ;
        if(v==='')
        {
            deleteItem(index) ;
        }
        else 
        {
            let arr = JSON.parse(localStorage.getItem('task')) ;
            arr[index].val = v ;
            localStorage.setItem('task',JSON.stringify(arr)) ;

        }
        if(section === 0)
        loading();
        else if(section === 1)
        activeList() ;
        else 
        completeList() ;
        
    }
}
function clearCompleted()
{
    let newArray = [] ;
    let arr = JSON.parse(localStorage.getItem('task')) ;
    for(let i=0;i<arr.length;i++)
    {
        console.log("mango", i);
        if(!arr[i].completed)
        {
            newArray.push(arr[i]);

        }
    }
   
    localStorage.setItem('task',JSON.stringify(newArray)) ;

    if(s===0)
    loading() ;
    else if(s===1)
    activeList() ;
    else 
    completeList() ;
}
function selectAll(choice)
{
    let arr = JSON.parse(localStorage.getItem('task')) ;
    for(let i=0;i<arr.length;i++)
    {
        if(choice===0)
        arr[i].completed = true ;
        else
        arr[i].completed = false ;
    }
    localStorage.setItem('task',JSON.stringify(arr)) ;
    if(s==0)
    loading() ;
    else if(s==1)
    activeList() ;
    else 
    completeList() ;

}
function selAll()
{
    let ch = document.getElementById('selectAll') ;
    if(ch.checked)
    {
        selectAll(0) ;
    }
    else 
    {
        selectAll(1) ;
    }
   
}
function checkAll()
{
    let arr = JSON.parse(localStorage.getItem('task')) ;
    if(arr.length == 0)
    return false ;
    for(let i=0;i<arr.length;i++)
    {
        if(!arr[i].completed)
        {
            return false ;
        }
    }
    return true ;
}


