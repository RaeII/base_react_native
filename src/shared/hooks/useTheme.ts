import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme, colorScheme } from "nativewind";
import { useCallback, useEffect, useRef } from "react";

type ThemeMode = "light" | "dark" | "system";
const THEME_STORAGE_KEY = "@base_app_theme_mode";

/**
 * Hook para gerenciar o tema da aplicação.
 * Fornece o tema atual, função de toggle e função para definir um tema específico.
 */
export function useTheme() {
    const { colorScheme: currentScheme, setColorScheme } = useNativeWindColorScheme();
    const hasInitializedTheme = useRef(false);

    const isDark = currentScheme === "dark";

    useEffect(() => {
        if (hasInitializedTheme.current) return;
        hasInitializedTheme.current = true;

        const initializeTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme === "light" || savedTheme === "dark") {
                    setColorScheme(savedTheme);
                    return;
                }
            } catch (error) {
                console.error("Erro ao recuperar tema salvo:", error);
            }

            // Sem tema salvo, respeita automaticamente o tema do sistema.
            setColorScheme("system");
        };

        void initializeTheme();
    }, [setColorScheme]);

    const toggleTheme = useCallback(() => {
        const newTheme = isDark ? "light" : "dark";
        setColorScheme(newTheme);
        AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme).catch((error) => {
            console.error("Erro ao salvar tema:", error);
        });
    }, [isDark, setColorScheme]);

    const setTheme = useCallback((mode: ThemeMode) => {
        setColorScheme(mode);
        if (mode === "system") {
            AsyncStorage.removeItem(THEME_STORAGE_KEY).catch((error) => {
                console.error("Erro ao remover tema salvo:", error);
            });
            return;
        }
        AsyncStorage.setItem(THEME_STORAGE_KEY, mode).catch((error) => {
            console.error("Erro ao salvar tema:", error);
        });
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
