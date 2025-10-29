export const errorHandler = (err, req, res, next) =>{
    console.log(err);
    const status = err.status || 500;
    res.status(403).json({error: err.message || "Server Error"});
}