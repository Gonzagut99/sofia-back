import { envs } from "../../config"
import { registerAs } from "@nestjs/config"

export default registerAs(
    'google',
    () => ({
        clientID: envs.googleClientId,
        clientSecret: envs.googleClientSecret,
        callbackURL: envs.googleCallbackUrl,
    })
)

