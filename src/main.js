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
            title:'getting acess',
            task:async ()=>{
                await fs.access('/', fs.constants.X_OK, (err) => {
                    if (err) {
                        console.log('Cannot get access', chalk.red.bold('ERROR'));
                    } else {
                        console.log('get access', chalk.green.bold('DONE'));
                    }
                });
                await fs.access('/', fs.constants.R_OK  | fs.constants.W_OK, (err) => { 
                    console.log("\n> Checking Permission for reading" + " and writing to file"); 
                if (err) 
                    console.error('No Read and Write access',chalk.red.bold('ERROR')); 
                else
                    console.log('File can be read and written',chalk.green.bold('DONE')); 
                });
            }
        },
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
            title:'installing dependancies',
            task:async ()=>{
                const oki=await execa('npm', ['i','express','cors'], {
                    cwd: l,
                });
                if (oki.failed) {
                    console.log('npm init failed',chalk.red.bold('ERROR'))
                }
                else{
                    console.log('package.json created',chalk.green.bold('DONE'))
                }
            }
        }
    ]);
    await task.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
     
}; 