import { useState, useCallback } from "react";
import { z } from "zod/v4";
import { router } from "expo-router";
import { useAuth } from "@/shared/contexts/AuthContext";
import { ApiError } from "@/shared/api/index.api";

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
    const { login, loginLoading } = useAuth();

    const [form, setForm] = useState<LoginFormData>({
        login: "",
        password: "",
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [loginError, setLoginError] = useState<string | null>(null);

    /** Atualiza um campo do formulário e limpa o erro correspondente */
    const handleChange = useCallback((field: keyof LoginFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setLoginError(null);
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

    /** Executa o login com a API de autenticação */
    const handleLogin = useCallback(async () => {
        if (!validate()) return;

        setLoginError(null);

        try {
            await login({
                login: form.login.trim(),
                password: form.password,
            });

            // Login bem-sucedido — navega para área autenticada
            router.replace("/(authenticated)");
        } catch (error) {
            if (error instanceof ApiError) {
                setLoginError(error.message);
            } else {
                setLoginError("Erro inesperado. Tente novamente.");
            }
        }
    }, [validate, form, login]);

    return {
        form,
        errors,
        loginError,
        loginLoading,
        handleChange,
        handleLogin,
    };
};
