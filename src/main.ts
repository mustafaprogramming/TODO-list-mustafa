#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from 'chalk';

console.log(chalk.greenBright.bold(`<===============================================>`));
console.log(chalk.blueBright.bold(`\n\tWelcome To Mustafa - TODO List\n`));
console.log(chalk.greenBright.bold(`<===============================================>`));

let todolist:string[]=[];
let continuation=true;
const addTask=async ()=>{
    let todotask = await inquirer.prompt([
        {
            name:'task',
            type:"input",
            message:chalk.rgb(252, 90, 3).bold('Enter Your Task: '),
        }
    ]);
    todolist.push(todotask.task);
    console.log(chalk.greenBright(`\n[${chalk.yellowBright.bold.italic(todotask.task)}] added successfully into the list!`+chalk.rgb(154, 255, 38)(` [Use the `+ chalk.yellowBright.bold(`{View Todo List}`) +` Option to see the Updated List]\n`)))
}
const updateList=async ()=>{
    let index=await inquirer.prompt([
        {
            type:'number',
            name:"no",
            message:chalk.rgb(252, 90, 3).bold(`Enter the Index Number of the Task You want to Update: `),
        },
        {
            type:'input',
            name:"updatedtask",
            message:chalk.rgb(252, 90, 3).bold(`Now enter the updated Task: `),
        }
    ]);
    if(index.no<1||index.no>todolist.length||Number.isNaN(index.no)){
        console.log(chalk.redBright.bold(`<<===Please Enter a Valid Number!!===>>`))
    }else{
    todolist[index.no-1]=index.updatedtask;
    console.log(chalk.rgb(154, 255, 38)(`\nTask at Index No ${index.no} has been updated to `+chalk.blueBright.bold(`"${index.updatedtask}". `)+`[Use the `+ chalk.yellowBright.bold(`{View Todo List}`) +` Option to see the Updated List]\n`));
    }
}
const Delete=async()=>{
    let index=await inquirer.prompt([
        {
            type:'number',
            name:"no",
            message:chalk.rgb(252, 90, 3).bold(`Enter the Index Number of the Task You want to Update: `),
        }
    ]);
    if(index.no<1||index.no>todolist.length||Number.isNaN(index.no)){
        console.log(chalk.redBright.bold(`<<===Please Enter a Valid Number!!===>>`))
    }else{
        todolist.splice(index.no-1,1);
        console.log(chalk.rgb(154, 255, 38)(`\nTask at Index No ${index.no} has been Deleted. `+`[Use the `+ chalk.yellowBright.bold(`{View Todo List}`) +` Option to see the Updated List]\n`));
    }
}
const view_todo_list=async()=>{
    let count=0;
    console.log(chalk.blueBright.bold.underline(`\n\tYour Todo List: \n`)+"\n"+todolist.map((task)=>{
        count++
        let correctedtask=task[0].toUpperCase()+task.slice(1)
        return chalk.yellowBright.bold(`(${count}) `)+chalk.greenBright.italic(correctedtask)+'.';
    }).join('\n'));
}
const Exit=async()=>{
    console.log(chalk.redBright.bold(`<=== EXITED ===>`))
    continuation=false;
}
const main =async()=>{
    while(continuation){
        let option=await inquirer.prompt([
            {
                type:"list",
                name:"selected",
                message:chalk.rgb(252, 90, 3).bold('Choose an option: '),
                choices:[chalk.rgb(255, 189, 36)("Add Task"),chalk.rgb(255, 189, 36)("Update Task"),chalk.rgb(255, 189, 36)("Delete Task"),chalk.rgb(255, 189, 36).bold("View Todo List"),chalk.redBright.bold("Exit")]
            }
        ])
        if(option.selected===chalk.rgb(255, 189, 36)("Add Task")){
            await addTask();
        }else if(option.selected===chalk.rgb(255, 189, 36)("Update Task")){
            await view_todo_list();
            await updateList();
        }else if(option.selected===chalk.rgb(255, 189, 36)("Delete Task")){
            await view_todo_list();
            await Delete();
        }else if(option.selected===chalk.rgb(255, 189, 36).bold("View Todo List")){
            await view_todo_list();
        }else{
            await Exit();
        }
}
}
main();






















