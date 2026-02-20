import { useState, useCallback } from "react";
import { z } from "zod/v4";

/** Schema de validação do formulário de login */
const loginSchema = z.object({
    login: z
        .string()
        .min(1, "Usuário ou e-mail é obrigatório"),
    password: z
        .string()
        .min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

/** Tipo dos erros de validação por campo */
type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export const useLoginModel = () => {
    const [form, setForm] = useState<LoginFormData>({
        login: "",
        password: "",
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});

    /** Atualiza um campo do formulário e limpa o erro correspondente */
    const handleChange = useCallback((field: keyof LoginFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }, []);

    /** Valida o formulário e retorna se é válido */
    const validate = useCallback((): boolean => {
        const result = loginSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors: LoginFormErrors = {};

            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof LoginFormData;
                if (!fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            }

            setErrors(fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    }, [form]);

    /** Executa o login (placeholder para futura integração) */
    const handleLogin = useCallback(() => {
        if (!validate()) return;

        // TODO: Integrar com API de autenticação
        console.log("Login válido:", form);
    }, [validate, form]);

    return {
        form,
        errors,
        handleChange,
        handleLogin,
    };
};
