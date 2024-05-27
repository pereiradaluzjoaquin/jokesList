import mongoose, { ObjectId, Schema } from "mongoose";

export type Joke = {
  _id: ObjectId;
  setup: string;
  punchline: string;
  type: string;
  rating: number;
};

const JokeSchema = new Schema<Joke>({
  setup: { type: String, required: true },
  punchline: { type: String, required: true },
  type: { type: String, required: true },
  rating: { type: Number, required: true },
});

const JokeModel = mongoose.models.Joke || mongoose.model("Joke", JokeSchema);

export default JokeModel;
