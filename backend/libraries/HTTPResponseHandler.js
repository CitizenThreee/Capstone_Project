class HTTPResponseHandler {
    OK(res, data) {
        res.status(200).json({
            status: 'SUCCESS',
            data
        })
    }

    Created(res, data) {
        res.status(201).json({
            status: 'CREATED',
            data
        })
    }

    BadRequest(res, error) {
        res.status(400).json({
            status: 'BAD REQUEST',
            error
        })
    }

    Unauthorized(res, error) {
        res.status(401).json({
            status: 'UNAUTHORIZED',
            error
        })
    }

    Forbidden(res, error) {
        res.status(403).json({
            status: 'FORBIDDEN',
            error
        })
    }

    NotFound(res, error) {
        res.status(404).json({
            status: 'NOT FOUND',
            error
        })
    }

    ServerError(res, error) {
        res.status(500).json({
            status: 'SERVER ERROR',
            error
        })
    }
}

module.exports = HTTPResponseHandler;