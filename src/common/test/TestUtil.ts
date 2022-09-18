/* eslint-disable prettier/prettier */
import { User } from "../../user/user.entity";

export default class TestUtil{
    static giveAMeValidUser(): User{
        const user = new User();
        user.email = "valid@gmail.com",
        user.name = "Gabriel",
        user.id = "1"
        return user
    }
}