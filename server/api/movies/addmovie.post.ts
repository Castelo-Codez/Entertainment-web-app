import User from "~/server/model/User";
import {getServerSession} from "#auth";
export default defineEventHandler(async (event) => {
    let body = await readBody(event);
    const session = await getServerSession(event);
    const {user}: any = session;
    await User.findOneAndUpdate(
        {
            email: user.email,
        },
        {
            $push: {
                favMovies: body,
            },
        }
    );
    return 200;
});
