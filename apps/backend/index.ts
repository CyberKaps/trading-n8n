

import express from 'express';
import mongoose from 'mongoose';
import { SignupSchema } from 'common/types';
import { UserModel } from 'db/client';
import jwt from 'jsonwebtoken';
mongoose.connect(process.env.MONGO_URI!);

const JWT_SECRET = process.env.JWT_SECRET!;

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {

  const{ success, data } = SignupSchema.safeParse(req.body);
  if (!success) {
    res.status(403).json({ error: "Invalid input" });
    return;

  }

  try {
    const user = await UserModel.create({
      username: data.username,
      password: data.password,
  })
  res.json({
    id: user._id
  })
  } catch (error) {
    res.status(411).json({ message: "Username already exists" });
  }
});

app.post("/signin", async (req, res) => {
  const { success, data } = SignupSchema.safeParse(req.body);
  if (!success) {
    res.status(403).json({ error: "Invalid input" });
    return;
  }

  const user = await UserModel.findOne({
    username: data.username,
    password: data.password
  })
  if (user) {
    const token = jwt.sign({
      id: user._id,
    }, JWT_SECRET);

    res.json({ 
      id: user._id,
      token
    });
  } else {
    res.status(403).json({ 
      error: "Invalid credentials" 
    });
  }

  
});

app.post("/workflow", (req, res) => {
  
});

app.put("/workflow", (req, res) => {
  
});

app.get("/workflow/:workflowId", (req, res) => {
  
});

app.get("/workflow/executions/:workflowId", (req, res) => {
  
});

app.post("/credentials", (req, res) => {
  
});

app.get("/credentials", (req, res) => {

});

app.get("/nodes", (req, res) => {
  
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});