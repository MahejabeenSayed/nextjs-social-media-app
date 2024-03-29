import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"
import { dbClient } from "@/db";


async function loadFakeFunction(numUsers: number = 10) {
  const client =  await dbClient()

  await client.connect();

  try {
    await client.query("begin");
    for (let i = 0; i < numUsers; i++) {
        const hashConst = 10;
        const hash =await bcrypt.hash("strings123" , hashConst)
      await client.query(
        "insert into public.users (username,password,avatar) values ($1,$2,$3)",
        [faker.internet.userName(), hash, faker.image.avatar()]
      );
    }

    const res = await client.query("select id from public.users order by created_at desc limit $1" , [numUsers])

    console.log(res.rows)

    for(const row of res.rows) {
        for(let i=0; i < Math.ceil(Math.random() * 15); i++) {
            await client.query("insert into public.posts (user_id , content) values ($1,$2)" , 
            [row.id , faker.lorem.sentences()])
        }
    }

    //populate follows table

    for (const row1 of res.rows){
        for(const row2 of res.rows) {
            if(row1.id !== row2.id){
                if(Math.random() > 0.5) {
                    await client.query("insert into public.follows (user_id , follower_id) values ($1,$2)", [row1.id , row2.id])
                }
            }
        }
    }

    await client.query("commit");
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    await client.end();
  }
}

const users = parseInt(process.argv[2]) | 5;
loadFakeFunction(users);
