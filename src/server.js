import app from './app';

const server = app.listen(process.env.PORT, () => {
  console.log(' App is running at port %d', process.env.PORT);
});

export default server;
