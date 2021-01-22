import fs from 'fs';
const process = require('process'); 
import path from 'path';
import execa from 'execa';
import { projectInstall } from 'pkg-install';
import chalk from 'chalk';
import Listr from 'listr';

export async function cliLogic(folderName){
    let l;
    
    const task=new Listr([
        {
            title:'creating folder',
            task:async ()=>{
                if(folderName!='.'){
                    await fs.mkdir(path.join(process.cwd(), folderName[0]), (err) => { 
                        if (err) { 
                            return console.error('cannot make folder',chalk.red.bold('ERROR')); 
                        } 
                        console.log('Directory created successfully!',chalk.green.bold('DONE')); 
                        l=path.join(process.cwd(), folderName[0]);
                    }); 
                }
                else{
                    console.log('oki')
                }
            }
        },
        {
            title:'git init',
            task:async ()=>{
                 const result=await execa('git', ['init'], {
                    cwd: l,
                });
                if (result.failed) {
                    console.log('git init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('git inited',chalk.green.bold('DONE'))
                }            
            }
        },
        {
            title:'npm init',
            task:async ()=>{
                const oki=await execa('npm', ['init','--yes'], {
                    cwd: l,
                });
                if (oki.failed) {
                    console.log('npm init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('package.json created',chalk.green.bold('DONE'))
                }
            }
        },
        {
            title:'installing dependancies for backend',
            task:async ()=>{
                const oki=await execa('npm', ['i','express'], {
                    cwd: l,
                });
                if (oki.failed) {
                    console.log('npm init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('package.json created',chalk.green.bold('DONE'))
                }
            }
        },
        {
            title:'installing express and cors',
            task:async ()=>{
                const oki=await execa('npm', ['i','cors'], {
                    cwd: l,
                });
                if (oki.failed) {
                    console.log('npm init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('package.json created',chalk.green.bold('DONE'))
                }
            }
        },
        {
            title:'installing mongoose',
            task:async ()=>{
                const oki=await execa('npm', ['i','mongoose'], {
                    cwd: l,
                });
                if (oki.failed) {
                    console.log('npm init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('package.json created',chalk.green.bold('DONE'))
                }
            }
        },
        {
            title:'installing body-parser and query-string',
            task:async ()=>{
                const oki=await execa('npm', ['i','body-parser','query-string'], {
                    cwd: l,
                });
                if (oki.failed) {
                    console.log('npm init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('package.json created',chalk.green.bold('DONE'))
                }
            }
        },
        {
            title:'SETTING UP FRONTEND',
            task:async ()=>{
                console.log('',chalk.blue.bold('SETTING UP FRONTEND'))
            }
        },
        {
            title:'installing body-parser and query-string',
            task:async ()=>{
                const oki=await execa('create-react-app', ['client'], {
                    cwd: l,
                });
                if (oki.failed) {
                    console.log('npm init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('package.json created',chalk.green.bold('DONE'))
                }
            }
        },
        

    ]);
    await task.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
    console.log(chalk.blue.bold('now you can go with mern'));
    return true;
     
}; 