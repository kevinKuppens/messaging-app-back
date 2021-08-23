import { json } from 'body-parser';
import Express from 'express';
import Database from './database';
import { UsersRoutes } from './Routes/users.routes';
import { config } from 'dotenv';
import { AuthRouter } from './Routes/aut.routes';
import Repositories from './repositories';
import { AdminRouter } from './Routes/admin.routes';
import { RequestRouter } from './Routes/request.routes';
import { ConversationRouter } from './Routes/conversation.routes';
import cors from 'cors';

config({
    path: 'variables.env'
})
const app = Express();
app.use(cors())
app.use(json());

app.use(AdminRouter);
app.use(UsersRoutes);
app.use(AuthRouter);
app.use(RequestRouter);
app.use(ConversationRouter);



const initApplicationServer = async () => {
    try {
        const db = await Database.initDatabase();
        if (db) {
            Repositories.initRepositories();
            app.listen(process.env.PORT, () => {
                console.log(`App is running on http://localhost:${process.env.PORT}`)
            })
        } else {
            console.log("Error while loading application");
        }
    } catch (e) {
        console.log(e);
    }
}

initApplicationServer();