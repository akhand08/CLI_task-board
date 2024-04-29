


// dependencies

import * as p from "@clack/prompts";
import colors  from "picocolors";
import utils from "./utils.js";

utils.createStore();

let taskListFromStore = utils.parseFromStore();

// let list = utils.parseFromStore();

async function main(){
    
    let toDoList  = taskListFromStore ? taskListFromStore : [];

    console.clear();
    p.intro(`${colors.green("Ninja ToDo App")}`);


    while(true) {



        async function EditTask(taskTitle, operation) {
    
            let index = toDoList.findIndex(task => task["title"] === taskTitle);
            

            switch(operation) {
                case "ct":
                    let newTitle = await p.text({message: "New Title of Your Task"});
                    toDoList[index]["title"] = newTitle;
                    break;
                case "cd":
                    let newDescription = await p.text({message: "New Description of Your Task"});
                    toDoList[index]["description"] = newDescription;
                    break;
                case "dt":
                    toDoList.splice(index, 1);
                    break;
            }

            utils.updateStore(toDoList);

        }

        let categories = await p.select({
            message: "Choose Your Options",
            options: [
                { value: "show", label: "Show the List"},
                { value: "add",  label: "Add to the List"},
                { value: "quit", label: "Quit from App"},
            ]
        })



        switch(categories) {
            case "show":
                let taskTitle = "";
                taskTitle = await p.select({
                    message: colors.bgMagenta("List of all ToDo Task"),
                    options: [ ...toDoList.map((task) => {
                        return {value: task.title , label: task.title};
                    }),
                    {value: "back", label: colors.red("Go Back to Categories")}
                    ]
                });

                if (taskTitle === "back") {
                    break;
                } 
                else {
                    let editOperation = await p.select({
                        message: colors.bgBlue("What changes do you want to make? "),
                        options: [
                            {value: "ct", label: "Change Title"},
                            {value: "cd", label: "Change Description"},
                            {value: "dt", label: "Delete Task"},
                        ]
                    })
                    
                    await EditTask(taskTitle, editOperation);


                }
                break;


            case "add": await p.group(
                {
                    title: () => p.text({ message: colors.bgGreen("Write your task title")}),
                    description: () => p.text({message: colors.bgGreen("Write description of the task")}),
    
                    function ( {results}) {
                        toDoList.push({
                            "title": results.title,
                            "description": results.description,
                            "state": "pending"
                        })

                        utils.updateStore(toDoList);
                    }

                    
    
                })
                break;

            case "quit":
                
                p.outro(colors.red("Quitting from Ninja ToDO App"));
                process.exit(1);
                
        }

    }




    


}

main();

