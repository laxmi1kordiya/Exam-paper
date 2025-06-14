import { Router } from "express";
import router from "../backend/routes/index.js";
// import clientProvider from "../../utils/clientProvider.js";
// import router from "../backend/routes/index.js";

const userRoutes = Router();

userRoutes.get("/api", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  res.status(200).json(sendData);
});

userRoutes.post("/api", (req, res) => {
  res.status(200).json(req.body);
});

// userRoutes.get("/api/gql", async (req, res) => {
//   //false for offline session, true for online session
//   const { client } = await clientProvider.graphqlClient({
//     req,
//     res,
//     isOnline: false,
//   });

//   const shop = await client.query({
//     data: `{
//       shop {
//         name
//       }
//     }`,
//   });

//   res.status(200).send(shop);
// });

userRoutes.use("/api", router); //Verify user route requests

export default userRoutes;
