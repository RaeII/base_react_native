import { useColorScheme as useNativeWindColorScheme, colorScheme } from "nativewind";
import { useCallback } from "react";

type ThemeMode = "light" | "dark" | "system";

/**
 * Hook para gerenciar o tema da aplicação.
 * Fornece o tema atual, função de toggle e função para definir um tema específico.
 */
export function useTheme() {
    const { colorScheme: currentScheme, setColorScheme } = useNativeWindColorScheme();

    const isDark = currentScheme === "dark";

    const toggleTheme = useCallback(() => {
        const newTheme = isDark ? "light" : "dark";
        setColorScheme(newTheme);
    }, [isDark, setColorScheme]);

    const setTheme = useCallback((mode: ThemeMode) => {
        setColorScheme(mode);
    }, [setColorScheme]);

    return {
        /** Tema atual: "light" ou "dark" */
        colorScheme: currentScheme,
        /** Se o tema escuro está ativo */
        isDark,
        /** Alterna entre tema claro e escuro */
        toggleTheme,
        /** Define um tema específico */
        setTheme,
    };
}

/**
 * Define o tema globalmente (pode ser usado fora de componentes).
 * Útil para inicialização ou configuração de tema salvo.
 */
export function setGlobalTheme(mode: ThemeMode) {
    colorScheme.set(mode);
}
