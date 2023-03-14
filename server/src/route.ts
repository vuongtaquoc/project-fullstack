export const route = (server) => {
  server.get('/', (req, res, next) => {
    res.send({
      hello: 'world'
    });
  });
};
