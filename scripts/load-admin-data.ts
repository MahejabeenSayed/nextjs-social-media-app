import { dbClient } from "@/db"
import bcrypt from "bcrypt"


async function loadAdminUser(username:string , password:string) {
    console.log("adding admin user" , username , password)

    const client = await dbClient()
    await client.connect()

    const hashConst = 10;
    const hash =await bcrypt.hash("strings123" , hashConst)

    await client.query("insert  into public.users (username,password,is_admin) values ($1,$2,$3)" , [username , hash , true])
    await client.end()
}


const user = process.argv[2]
const password = process.argv[3]

loadAdminUser(user , password)