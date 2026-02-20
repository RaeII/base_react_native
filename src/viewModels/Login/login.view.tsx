import { FC } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useLoginModel } from "./login.model";

export const LoginView: FC<ReturnType<typeof useLoginModel>> = ({
    form,
    errors,
    handleChange,
    handleLogin,
}) => {
    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerClassName="flex-1 justify-center"
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center px-8">
                    {/* Header */}
                    <View className="items-center mb-12">
                        <Text className="text-3xl font-bold text-white">
                            Bem-vindo
                        </Text>
                        <Text className="text-base text-slate-400 mt-2">
                            Entre na sua conta para continuar
                        </Text>
                    </View>

                    {/* Formulário */}
                    <View className="gap-5">
                        {/* Input Usuário ou E-mail */}
                        <View>
                            <Input
                                label="Usuário ou e-mail"
                                labelClasses="text-slate-300"
                                inputClasses="text-white"
                                placeholder="Digite seu usuário ou e-mail"
                                placeholderTextColor="#64748b"
                                value={form.login}
                                onChangeText={(value) => handleChange("login", value)}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            {errors.login && (
                                <Text className="text-red-400 text-sm mt-1">
                                    {errors.login}
                                </Text>
                            )}
                        </View>

                        {/* Input Senha */}
                        <View>
                            <Input
                                label="Senha"
                                labelClasses="text-slate-300"
                                inputClasses="text-white"
                                placeholder="Digite sua senha"
                                placeholderTextColor="#64748b"
                                value={form.password}
                                onChangeText={(value) => handleChange("password", value)}
                                secureTextEntry
                            />
                            {errors.password && (
                                <Text className="text-red-400 text-sm mt-1">
                                    {errors.password}
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Botão Login */}
                    <View className="mt-8">
                        <Button
                            label="Entrar"
                            size="lg"
                            onPress={handleLogin}
                            className="w-full"
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
