console.log("Lets Write Js");

//get the times and date
let date = new Date()

//access all the times and dates
let year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
let hours = date.getHours()
let minutes = date.getMinutes()
let ampm = 'AM'


//variable for add counting
let count = 0;
let result = 0;

//variable for completed tasks counting
let complete = 0;
let completed = 0;

//access all the images
let BlankImg = "blank.png"
let RightImg = "Right.png"
let CloseImg = "close.png"

//access the addTask div from html file
let addTask = document.getElementById("add")
addTask.append(0);

//access the completedTask div from html file
let completeTask = document.getElementById("complete")
completeTask.append(0);

//function of toggle The list Theme
function Toggle_Theme() {
    //toggle the theme
    document.body.classList.toggle("light-theme")
    //access the circle button
    let circle = document.getElementById("Themecircle")
    //this if else statement check to move the circle in the button
    if (circle.style.left == "25px") {
        circle.style.left = 0;
    }
    else {
        circle.style.left = "25px";
    }
}

//This all are listening the event of click to Toggle the Theme.
Theme.addEventListener("click", Toggle_Theme)
Themecircle.addEventListener("click", Toggle_Theme)


//function for add all task in ul
function addTasks() {
    //access the input button and value
    let input = document.getElementById("Input").value
    if (input) {

        {   //show how many tasks i have added
            addTask.innerHTML = "";
            count = count + 1;
            result = count
            addTask.append(result)
        }

        //Create the li
        const li = document.createElement("li")

        //create the checkbox image
        const blank = document.createElement("img")
        blank.id = "Blank"
        blank.src = BlankImg;

        //listen the checkbox for check or uncheck
        blank.addEventListener("click", () => {
            //completeTask.innerHTML = "";

            if (blank.src.includes(BlankImg)) {
                blank.src = RightImg;
                {   //show how many tasks have completed
                    complete = complete + 1
                    completed = complete
                    completeTask.innerHTML = (completed)
                }
            }
            else {
                blank.src = BlankImg;
                {   //when the completed task became incomplete(checked became unchecked) then it reduce 1 task
                    complete = complete - 1
                    completed = complete
                    completeTask.innerHTML = (completed)
                }
            }

        })

        //create the task div
        const task = document.createElement("div")
        task.id = "task"
        task.innerHTML = input;

        //create the time div
        const Time = document.createElement("div")
        Time.id = "time"

        {    //this if-else to check the time is in am or pm
            if (hours >= 12) {
                ampm = 'PM'
            }
            else {
                ampm = 'AM'
            }
        }
        {   //this if statement to plus a 0 before the minutes when the minutes in one digit
            if (minutes < 10) {
                // let date = new Date()
                // minutes = date.getMinutes()
                minutes = '0' + minutes;
            }

        }
        //pass all the value of hours, minutes, and am or pm 
        const times = `${hours}:${minutes} ${ampm}`
        //pass the value of day month and year
        const date = `${day}/${month}/${year}`
        //show the final time
        Time.innerHTML = times + " -- " + date;

        //create close image
        const close = document.createElement("img")
        close.id = "closeli"
        close.src = CloseImg

        //listen the close btn and delete the li
        close.addEventListener("click", () => {
            li.remove();

            {   //if i remove any task then 1 task remove from the ul list and show the result
                addTask.innerHTML = "";
                count = count - 1;
                result = count;
                addTask.append(result)
            }
            if (blank.src.includes(RightImg)) {
                //when the checked task became closed/removed then reduce 1 task and 1 completed from the counting
                complete = complete - 1
                completed = complete
                completeTask.innerHTML = (completed)
            }
            alert((input) + " Task is deleted!")
        })

        // append in li all the elements which i have created before
        li.appendChild(blank)
        li.appendChild(task)
        li.appendChild(Time)
        li.appendChild(close)

        //access the ul from the html file
        const ul = document.getElementById("ul")
        //appen the li in the ul
        ul.appendChild(li)
    }

}


// access the input bar
let input = document.getElementById("Input")
//add tasks using enter key in keyboard
input.addEventListener("keydown", () => {
    if (event.key === "Enter") {
        addTasks()
    }
})

//add tasks using Add button
Add.addEventListener("click", () => {
    addTasks()
})

//the button listen the click event 
ClearInput.addEventListener("click", () => {
    //access the input button
    let input = document.getElementById("Input")
    if (input) {
        //clear the input bar
        input.value = "";
    }
})

//delete button listen the click event
Delete.addEventListener("click", () => {
    //clear the all lists of ul
    document.getElementById("ul").innerHTML = "";
    completeTask.innerHTML = "0";
    complete = 0;
    addTask.innerHTML = "0";
    count = 0;
    let input = document.getElementById("Input")
    input.value = "";
    alert("Your all Tasks deleted!")
})

save.addEventListener("click", () => {
    const ul = document.getElementById("ul");
    const lis = ul.querySelectorAll("li");

    const todosToSave = [];

    lis.forEach(li => {
        const taskText = li.querySelector("#task").innerText;
        const timeText = li.querySelector("#time").innerText;
        const isCompleted = li.querySelector("img").src.includes("Right.png");

        todosToSave.push({
            text: taskText,
            time: timeText,
            completed: isCompleted,
            savedAt: new Date().toISOString()
        });
    });

    localStorage.setItem("savedTodos", JSON.stringify(todosToSave));

    alert("Tasks saved successfully!");
});


filter.addEventListener("change", () => {
    let ul = document.getElementById("ul")
    let tasks = ul.querySelectorAll("li")

    tasks.forEach(task => {
        const img = task.querySelector("img"); // assuming one image per li

        if (filter.value === "all") {
            task.style.display = "flex"; // show all
        }
        else if (filter.value === "Completed") {
            if (img.src.endsWith("/Right.png")) {
                task.style.display = "flex"; // show completed
                ul.prepend(task); // optional if you want to move them to top
            } else {
                task.style.display = "none"; // hide not completed
            }
        }
    })

})
