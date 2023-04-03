import { app } from "./app";

const port = parseInt(process.env.PORT) || 80;
app.listen({ port: port }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});

app.get('/', async (request, response) => {
  response.send('Yummy Products');
});