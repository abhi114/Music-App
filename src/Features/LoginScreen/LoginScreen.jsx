// AuthScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  FadeOutDown,
  FadeOutUp
} from 'react-native-reanimated';
import { Music, MessageCircle, Mail, Lock, User, ArrowRight, Github } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
          contentContainerClassName="flex-grow justify-center"
          className="flex-1"
        >
          <View className="p-6 flex-1 justify-center">
            {/* Logo and App Name */}
            <Animated.View 
              entering={FadeInDown.duration(1000)}
              className="items-center space-y-4 mb-8"
            >
              
              <Text className="text-2xl font-bold text-white">Harmony Chatting</Text>
              <Text className="text-2xl font-bold text-white">With</Text>
              <View style={{flexDirection:'row'}} className="space-x-1">
                <Music size={20} color="#A855F7" />
              <Text className="text-2xl font-bold text-amber-300">AN Music</Text>
              <MessageCircle size={20} color="#3B82F6" />
              </View>
              <Text className="text-gray-400 text-center">
                {isLogin ? 'Welcome back! Sign in to continue' : 'Create an account to get started'}
              </Text>
            </Animated.View>

            {/* Auth Form */}
            <Animated.View 
              entering={FadeInUp.duration(1000).delay(200)}
              className="bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <View className="space-y-4">
                {!isLogin && (
                  <Animated.View
                    entering={FadeInDown}
                    exiting={FadeOutUp}
                  >
                    <Text className="text-sm font-medium text-gray-300 mb-2">Username</Text>
                    <View className="relative">
                      <View className="absolute top-4 left-3 z-10">
                        <User size={20} color="#9CA3AF" />
                      </View>
                      <TextInput
                        className="bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg w-full"
                        placeholder="Enter your username"
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  </Animated.View>
                )}

                <View>
                  <Text className="text-sm font-medium text-gray-300 mb-2">Email</Text>
                  <View className="relative">
                    <View className="absolute top-4 left-3 z-10">
                      <Mail size={20} color="#9CA3AF" />
                    </View>
                    <TextInput
                      className="bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg w-full"
                      placeholder="Enter your email"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-300 mb-2">Password</Text>
                  <View className="relative">
                    <View className="absolute top-4 left-3 z-10">
                      <Lock size={20} color="#9CA3AF" />
                    </View>
                    <TextInput
                      className="bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg w-full"
                      placeholder="Enter your password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry
                    />
                  </View>
                </View>

                {!isLogin && (
                  <Animated.View
                    entering={FadeInDown}
                    exiting={FadeOutUp}
                  >
                    <Text className="text-sm font-medium text-gray-300 mb-2">Confirm Password</Text>
                    <View className="relative">
                      <View className="absolute top-4 left-3 z-10">
                        <Lock size={20} color="#9CA3AF" />
                      </View>
                      <TextInput
                        className="bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg w-full"
                        placeholder="Confirm your password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                      />
                    </View>
                  </Animated.View>
                )}

                <TouchableOpacity 
                  activeOpacity={0.8}
                  className="mt-4"
                >
                  <LinearGradient
                    colors={['#A855F7', '#3B82F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="rounded-lg py-4 px-6 flex-row items-center justify-center"
                  >
                    <Text className="text-white font-medium text-center">
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Text>
                    <ArrowRight className="ml-2" size={20} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>

                <View className="my-6 flex-row items-center">
                  <View className="flex-1 h-[1px] bg-gray-600" />
                  <Text className="mx-4 text-gray-400">Or continue with</Text>
                  <View className="flex-1 h-[1px] bg-gray-600" />
                </View>

                <TouchableOpacity 
                  activeOpacity={0.8}
                  className="bg-gray-700 rounded-lg py-4 px-6 flex-row items-center justify-center"
                >
                  <Github size={20} color="#FFF" />
                  <Text className="text-white font-medium ml-2">Continue with GitHub</Text>
                </TouchableOpacity>

                <View className="mt-6 flex-row justify-center">
                  <Text className="text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </Text>
                  <TouchableOpacity onPress={toggleForm}>
                    <Text className="text-purple-400 font-medium">
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;