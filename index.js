import {stdin,stdout} from "process";
import readline from 'readline/promises';
import{ sql } from "./constants/db.js"


const r1 =readline.createInterface({
    input:stdin,
    output:stdout
});

async function readVal (p) {
    let res=await r1.question (p);
    return res;
}

async function showMenu () {
    const res = await readVal ("1.show available users \n2.creat a new user \n3.Delete user\n4.Exit \nchoose an option:");
    return res;
}
async function createUser () {
    const name = await readVal ("Enter name:");
    const username = await readVal ("Enter username:");
    const email = await readVal ("Enter email:");
    const day = Number(await readVal("Enter day in dob:"))
    const month =Number(await readVal("Enter month in dob(1 - 12):"));
    const year = Number(await readVal("Enter year in dob: "));
    const dob = new Date (year,month -1, day =1); //month is 0 indexed in JS Date object
    return {name,username,email,dob: dob.toDateString()}
}
async function main () {
let loop =true;

do{
    const option = Number(await showMenu());
try{
    switch(option){
        case 1:{
            //get all users and display
            const users =await sql 'SELECT * FROM users;';
            console.log("\nAvailable users:");

            if(users.length === 0){
                console.log("No users found.\n");
                break;
            }
            users.forEach ((userInfo,index)=>{
                console.log('${index + 1} : ${JSON.stringify(users)}');
            });
            console.log ("\n");
            breaks;
        }
        case=2:{
            //create new user
            console.log("Creat new user");
            const user = await createUser();
            await sql 'INSERT INTO users (name,dob,username,email)
VALUES(${user.name},${user.dob},${user.username},${user.email})';
            console.log("user added successfully!\n")
            break;
        }
        case 3:{
            //Delete user
            console.log("Delete user");
            const username = await readVal("Enter username of user to delete:");
            await sql 'DELETE FROM users WHERE username = ${username};';
            console.log("user successfully deleted.\n");
            break;
        }
        case 4:{
            //Exit
            loop =false;
            console.log("Exiting...\n");
            break;
        }
        default :{
            //invalid option
            console.log("invalid option\n");
        }
    }}
    catch(err) {
        console.error("An error occured: ",err);
        console.log{"\n"};
    }
    }while(loop)
    process.exit(0)
    }
    await main()