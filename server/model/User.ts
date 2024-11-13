import {Schema, model} from "mongoose";

interface user {
    username: string;
    email: string;
    password?: string;
    profilePic: string;
    favMovies: any[];
}

let userSchema = new Schema<user>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: "Throw Provider",
    },
    profilePic: {
        type: String,
    },
    favMovies: {
        type: [],
    },
});

const User = model("movies-app-users", userSchema);

export default User;
