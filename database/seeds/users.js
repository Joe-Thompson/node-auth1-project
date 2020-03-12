exports.seed = async (knex) => {
    await knex('users').truncate();
    await knex('users').insert([
        {username: 'Joe', password: '123'},
        {username: 'Tawne', password: '456'},
        {username: 'Katie', password: '789'},
        {username: 'Brain', password: '147'},
        {username: 'Tim', password: '369'}
    ])
};
