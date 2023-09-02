const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const dotenv = require ("dotenv");
const multer = require ("multer");
const helmet = require ("helmet");
const morgan = require ("morgan");
const path = require ("path");
const { fileURLToPath } = require ("url");
const authRoutes = require ("./routes/auth.js");
const userRoutes = require ("./routes/users.js");
const postRoutes = require ("./routes/posts.js");
const { register } = require ("./controllers/auth.js");
const { createPost } = require ("./controllers/posts.js");
const  verifyToken  = require ("./middleware/auth.js");
const User = require ("./models/User.js");
const Post = require ("./models/Post.js");

/* CONFIGURATIONS */
// const __filename = fileURLToPath(require.meta.url);
// let __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* SERVER SETUP */

  const port = process.env.PORT || 3000;
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  
  
  