/**
 * @file sandbox/dirname.js
 * @desc This demonstrates the need to define __filename and __dirname
 *      whenever an --experimental-modules or --experimental-vm-modules tag is used.
 * Apparently, __dirname and __filename are not called if the 
 * --experimental-modules or --experimental-vm-modules flag is used.
 * To fix this, w need to use fileURLToPath from url and dirname from path.
 * - https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
 * - https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
 */
import { fileURLToPath } from "url";
import { dirname } from "path";
import process, { env } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename);
console.log(__dirname);
console.log(process.argv[0]);
console.log(process.argv[1]);   // process.argv[1] returns the same output as fileURLToPath(import.meta.url)
// console.log(process.cwd());
console.log(env);
