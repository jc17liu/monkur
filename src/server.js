import app from './app';

const PORT = process.env.PORT || 18080;

const server = app.listen(PORT, () => {
  console.log(' App is running at port %d', PORT);
});

export default server;
