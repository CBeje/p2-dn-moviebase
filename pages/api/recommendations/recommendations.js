import History from "models/History";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const history = await History.aggregate([{ $sample: { size: 1 } }]);
  if (history.length > 0) {
    res.status(200).json(...history);
  } else {
    const similarMovie = Math.floor(Math.random() * 10000);
    res.status(200).json({
      id: similarMovie,
    });
  }
}
