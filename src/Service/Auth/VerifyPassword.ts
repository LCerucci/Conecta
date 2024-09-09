import bcrypt from 'bcrypt';
import { MatchPassword } from '../../Error/Auth/AuthError';

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    if (!password || !hash)
        throw new MatchPassword("Falha ao verificar password.", "Os campos estão vazios ou não batem.");

    const result: boolean = await bcrypt.compare(password, hash);

    if (result)
        return result;
    else
        return false;
}
