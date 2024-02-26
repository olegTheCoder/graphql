const express = require('express');
const cors = require('cors');
const schema = require('./schema');
const { graphqlHTTP } = require('express-graphql');
const PORT = 4000;
const users = [
  { id: 1, username: 'Oleg', age: 34 },
  { id: 2, username: 'Vasya', age: 35 },
  { id: 3, username: 'Roma', age: 33 },
];

const app = express();

app.use(cors());

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === Number(id));
  },
  createUser: ({ input }) => {
    const newUser = { id: Date.now(), ...input };
    users.push(newUser);
    return newUser;
  },
};

app.use('/graphql', graphqlHTTP({ graphiql: true, schema, rootValue: root }));

app.listen(PORT, () => console.log(`server is working on port ${PORT}`));
