import rateLimit from "../config/upstash.js";

// Custom Middleware
const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await rateLimit.limit("my-limit-key");
        if(!success) return res.status(429).json({message: "To many Bad requests."});
        next();
    } catch (error) {
        console.log("Rate limit error",error);
        next(error);
    }
}

export default rateLimiter;