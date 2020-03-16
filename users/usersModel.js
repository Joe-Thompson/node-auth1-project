const db = require('../database/config');
const bcrypt = require('bcryptjs');

module.exports = {
    add,
    find,
    findBy,
    findById,
};

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14);
    const [ id ] = await db('users').insert(user);
    return findById(id)
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first()
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}

function find() {
    return db('users').select('username', 'password')
}

