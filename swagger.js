const swaggerDefinitions = require("./swaggerToMongoose");
const swaggerAutogen = require("swagger-autogen")();
const User = require("./models/user");
const Review = require("./models/review");
const Destination = require("./models/destination");
const Photo = require("./models/photo");

const doc = {
  info: {
    title: "Users API",
    description: "DESC Users API",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
  definitions: {
      user: {
          gitHubId: "22334454",
          username: "username",
          email: "username@jelly.com",
          profileUrl: "https://hello.com",
          destinationPhotos: [],
          userPhotos: [],
          reviews: []
      },
      photo: {
        title: "The Parade",
        imgUrl: "https://placecats.com/neo_banana/300/200",
        imgAlt: "Two dogs named Neo and Banana",
        description: "Photo of Neo and Banana such good boys"
      },
      destination: {
        photo: [],
        city: "Rome",
        country: "Italy",
        photos: [],
        description: "The capital city of Italy, famous for its nearly 3,000 years of globally influential art, architecture, and culture.",
        tourismSpots: [],
        reviews: []
      },
      review: {
        comments: "Very Good!",
        stars: 4,
        username: "JumpingJelly"
      }
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
