import Book from "../models/bookModel.js";
import Review from "../models/reviewModel.js";
import { generateMongoFilterFromPrompt } from "../langchain/queryAgent.js";


function convertNumericStrings(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertNumericStrings);
  } else if (typeof obj === "object" && obj !== null) {
    const result = {};
    for (const key in obj) {
      const value = obj[key];
      result[key] = convertNumericStrings(value);
    }
    return result;
  } else if (typeof obj === "string" && !isNaN(obj)) {
    return Number(obj);
  }
  return obj;
}



export const chatToDb = async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  try {
    const rawResponse = await generateMongoFilterFromPrompt(prompt);
    console.log("Raw model response:", rawResponse);

    let query;
    const jsonStr = rawResponse
    .replace(/^```json\s*/, '')    // remove starting ```json (and optional spaces)
    .replace(/```$/, '')           // remove trailing ```
    .trim();

    console.log(jsonStr)
    try {
        query = JSON.parse(jsonStr);
    } catch (err) {
      console.log(query)
      console.error("Failed to parse JSON:", err);
      return res.status(400).json({ message: "Invalid JSON returned by model." });
    }

    if (!query.collection || !query.filter) {
      return res.status(400).json({ message: "Invalid query structure." });
    }

    // Convert numeric strings
     query.filter = convertNumericStrings(query.filter);
     console.log("after filter" , query.filter);

    let data;
    if (query.collection === "Book") {
      data = await Book.find(query.filter);
    } else if (query.collection === "Review") {
      data = await Review.find(query.filter).populate("bookId");
    } else {
      return res.status(400).json({ message: "Unknown collection." });
    }

    res.json({status:true , message:"query process successfully" , data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status:false , message: "Internal Server Error" , data:{}});
  }
}

