import {define, factory} from "typeorm-seeding";
import Comment from "../entities/Comment";
import User from "../entities/User";
import Movie from "../entities/Movie";

define(Comment, (faker, context: { roles: string[] }) => {
    const comment = new Comment();
    comment.text = faker.lorem.sentences();
    comment.user = factory(User)() as any;
    comment.movie = factory(Movie)() as any;
    return comment
});