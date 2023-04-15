import { app } from "./app";
import { constants } from "./config/constants";

app.listen({ port: constants.PORT , host: constants.HOST }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});

