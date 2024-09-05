import bcrypt from 'bcrypt';

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    if (!password || !hash)
        throw new Error("Some credentials don't match");

    const result: boolean = await bcrypt.compare(password, hash);

    if (result)
        return result;
    else
        return false;
}
