import bcrypt from 'bcrypt';
import { GenHashPassword } from '../../Error/Auth/AuthError';

export async function hashPassword(password: string): Promise<string> {
    try {
        if (!password)
            throw new GenHashPassword("Falha ao gerar o hash.", "Verifique se existe o parâmetro foi passado corretamente.");

        const saltRounds: number = 10;
        const hashPassword: string = await bcrypt.hash(password, saltRounds);

        return hashPassword;
    } catch (err) {
        throw new GenHashPassword("Erro ao gerar hash (desconhecido).", "verifique o fluxo até hashPassword.");
    }
}
