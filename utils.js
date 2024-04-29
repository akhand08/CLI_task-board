
//  dependencies

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs"
import { type } from "node:os";

//  module wrapper

const utils = {};



utils.currentDirectory = fileURLToPath(import.meta.url);
utils.baseDirectory = path.dirname(utils.currentDirectory);


utils.createStore = () => {

    fs.open(path.join(utils.baseDirectory, "taskStore" + ".json"), "wx", (err, fd) => {
        if(!err) {
            fs.close(fd, (err2) => {
                if(!err2) {

                }
                else {

                }
            })
        }
    } )
    
}


utils.updateStore = (taskList) => {


    fs.open(path.join(utils.baseDirectory, "taskStore" + ".json"),  "r+", (err, fd) => {

        

        let stringyfiedTaskList = JSON.stringify(taskList);

        fs.appendFile(fd, stringyfiedTaskList, (err) => {
            if(!err) {

                fs.close(fd, (err) => {
                    if(!err){

                    }
                    else {
                        
                    }
                })

            }
            else {
                
            }
        } )

    })
}




utils.parseFromStore = () => {

    try {
        let data = fs.readFileSync(path.join(utils.baseDirectory, "taskStore" + ".json"), "utf-8");
        return JSON.parse(data);
    }
    catch(err) {
        return false;
    }


}



export default utils;
