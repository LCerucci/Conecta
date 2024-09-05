import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    try {
        if (!password)
            throw new Error('message');

        const saltRounds: number = 10;
        const hashPassword: string = await bcrypt.hash(password, saltRounds);

        return hashPassword;
    } catch (err) {
        throw new Error('meesage');
    }
}
