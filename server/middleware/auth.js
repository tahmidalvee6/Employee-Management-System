import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized access" });
        }
        const token = authHeader.split(' ')[1];
        const session = jwt.verify(token, process.env.JWT_SECRET);

        if(!session) {
            return res.status(401).json({ error: "Unauthorized access" });
        }
        req.user = session;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
}


export const protectAdmin = (req, res, next) => {
    if(req.user?.role !== "ADMIN") {
        return res.status(403).json({ error: "Access denied. Not an admin." });
    }
    next();

}