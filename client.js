import { PineconeClient } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
dotenv.config()

const pinecone = new PineconeClient();
await pinecone.init({
  environment: `${process.env.ENVIRONMENT}`,
  apiKey: `${process.env.API_KEY}`,
});

// await pinecone.createIndex({
//     createRequest: {
//       name: "example-index",
//       dimension: 1024,
//     },
// });

const index = pinecone.Index("example-index");
const upsertRequest = {
  vectors: [
    {
      id: "vec1",
      values: [0.1, 0.2, 0.3, 0.4],
      metadata: {
        genre: "drama",
      },
    },
    {
      id: "vec2",
      values: [0.2, 0.3, 0.4, 0.5],
      metadata: {
        genre: "action",
      },
    },
  ],
  namespace: "example-namespace",
};
const upsertResponse = await index.upsert({ upsertRequest });

const indexDescription = await pinecone.describeIndex({
    indexName: "example-index",
});

console.log(upsertResponse);
console.log(indexDescription);