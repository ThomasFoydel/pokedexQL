import { ApolloServer } from 'apollo-server-express';
import express from 'express';
const PORT = process.env.PORT || 4000;
import { resolvers } from './models/resolvers';
import { typeDefs } from './models/typeDefs';
import path from 'path';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
} else {
  app.use(express.static('client/public'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
  });
}

app.listen({ port: PORT }, () =>
  console.log(`server listening on port: ${PORT}`)
);