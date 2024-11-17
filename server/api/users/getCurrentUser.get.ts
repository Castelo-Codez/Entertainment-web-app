import {getServerSession} from "#auth";
import User from "~/server/model/User";
import {connect} from "mongoose";
export default defineEventHandler(async (event) => {
    const session: any = await getServerSession(event);
    return await connect(process.env.MONGO_URL as string).then(async () => {
        if (session) {
            const {user} = session;
            const {email} = user;
            let $checkEmail = await User.findOne({email});
            if ($checkEmail) {
                const {_doc}: any = $checkEmail;
                return {
                    ..._doc,
                };
            }
            let $newEmail = await User.create({
                username: user.name,
                email: user.email,
                favMovies: [],
            });
            const {_doc}: any = $newEmail;
            return {
                ..._doc,
            };
        }
        return {
            data: null,
        };
    });
});
