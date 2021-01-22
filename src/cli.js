import arg from 'arg';
import inquirer from 'inquirer';
import {cliLogic} from './main.js'

export async function cli(args) {
    cliLogic(args.slice(2));
}