import client from '../client';

export default {
    Mutation: {
        // root, args, context, inf
        createMovie: (root, { title, year, genre }, context, info) =>
            client.movie.create({
                data: {
                    title,
                    year,
                    genre,
                },
            }),
        deleteMovie: (root, { id }, context, info) => client.movie.delete({ where: { id } }),
        updateMovie: (_, { id, year }) => client.movie.update({ where: { id }, data: { year } }),
    },
};
