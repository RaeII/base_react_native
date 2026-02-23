import { FC } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useLoginModel } from "./login.model";

export const LoginView: FC<ReturnType<typeof useLoginModel>> = ({
    form,
    errors,
    loginError,
    loginLoading,
    handleChange,
    handleLogin,
}) => {
    return (
        <KeyboardAvoidingView
            className="flex-1 bg-background"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerClassName="flex-1 justify-center items-center"
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center px-8 w-full max-w-md">
                    {/* Header */}
                    <View className="items-center mb-12">
                        <Text className="text-3xl font-bold text-foreground">
                            Bem-vindo
                        </Text>
                        <Text className="text-base text-muted-foreground mt-2">
                            Entre na sua conta para continuar
                        </Text>
                    </View>

                    {/* Erro geral do login */}
                    {loginError && (
                        <View className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                            <Text className="text-destructive text-sm text-center">
                                {loginError}
                            </Text>
                        </View>
                    )}

                    {/* Formulário */}
                    <View className="gap-5">
                        {/* Input Usuário ou E-mail */}
                        <View>
                            <Input
                                label="Usuário ou e-mail"
                                placeholder="Digite seu usuário ou e-mail"
                                value={form.login}
                                onChangeText={(value) => handleChange("login", value)}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                editable={!loginLoading}
                            />
                            {errors.login && (
                                <Text className="text-destructive text-sm mt-1">
                                    {errors.login}
                                </Text>
                            )}
                        </View>

                        {/* Input Senha */}
                        <View>
                            <Input
                                label="Senha"
                                placeholder="Digite sua senha"
                                value={form.password}
                                onChangeText={(value) => handleChange("password", value)}
                                secureTextEntry
                                editable={!loginLoading}
                            />
                            {errors.password && (
                                <Text className="text-destructive text-sm mt-1">
                                    {errors.password}
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Botão Login */}
                    <View className="mt-8">
                        <Button
                            label={loginLoading ? "Entrando..." : "Entrar"}
                            size="lg"
                            onPress={handleLogin}
                            className="w-full"
                            disabled={loginLoading}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
