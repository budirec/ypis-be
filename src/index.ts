import { app } from "./app";

app.listen({ port: process.env.PORT, host: process.env.HOST }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});

app.get('/status', async (request, response) => {
  response.send({status: 'OK'});
});