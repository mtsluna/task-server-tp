const errorMiddleware = (err, req, res, next) => {
    res
        .status(500)
        .send({
            error: {
                message: err.message
            }
        })
}

export default errorMiddleware;
