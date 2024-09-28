import jwt from "jsonwebtoken"

export function generateToken(payload) {
    const secret = "3928jjnndjfks998kd.sdf"
    const token = jwt.sign({ payload }, secret, { expiresIn: "1h" })
    return token;
}
export function verifyToken(token) {
     const secret = "3928jjnndjfks998kd.sdf"
    const decoded = jwt.verify(token, secret,function auth(err,decoded){
        if(err){
            return false
        }else{
            return true
        }
    })
    return decoded
}   