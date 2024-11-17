import {getServerSession} from "#auth";
import User from "~/server/model/User";

export default defineEventHandler(async (event) => {
    let id = getRouterParam(event, "id");
    if (id) {
           await User.findOneAndUpdate(
        {
            "favMovies.id": +id,
        },
        {
            $pull: {
                favMovies: {
                    id: +id,
                },
            },
        }
    ); return 200;
    }
   
});
