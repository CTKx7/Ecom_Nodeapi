export const globalErrorHandler = (err, req, res,next)=>{
//stact
//message
const stack = err?.stack;
const statusCode =err?.statusCode ? err?.statusCode:500
const message = err?.message;

res.status(statusCode).json({
    stack,
    message
})
}

export const notFound = (req, res , next)=>{
const error = new Error(`Route ${req.originalUrl} not found`);
next(error);

}