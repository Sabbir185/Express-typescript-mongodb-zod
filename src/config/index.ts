import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    db_string: process.env.DB_STRING,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
