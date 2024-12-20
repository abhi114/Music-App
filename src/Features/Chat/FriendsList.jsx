import React from 'react';
import { View, Text, Image, Pressable, FlatList } from 'react-native';
import Animated, { FadeIn, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { MessageSquare, Circle } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const FriendListItem = ({ friend, onPress }) => {
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      style={[containerStyle, { marginHorizontal: 16, marginVertical: 8 }]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <LinearGradient
          colors={['#2A2A2A', '#1A1A1A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flexDirection: 'row',
            padding: 12,
            borderRadius: 16,
            alignItems: 'center',
          }}
        >
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: friend.avatar }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                borderWidth: 2,
                borderColor: '#333',
              }}
            />
            {friend.online && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#121212',
                  padding: 2,
                  borderRadius: 10,
                }}
              >
                <Circle size={12} fill="#4CAF50" color="#4CAF50" />
              </View>
            )}
          </View>

          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
              {friend.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{ color: '#9E9E9E', fontSize: 14, marginTop: 4 }}
            >
              {friend.lastMessage}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: '#757575', fontSize: 12 }}>
              {friend.lastMessageTime}
            </Text>
            {friend.unreadCount > 0 && (
              <View
                style={{
                  backgroundColor: '#2196F3',
                  borderRadius: 12,
                  minWidth: 24,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 4,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                  {friend.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};



const DUMMY_FRIENDS = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, how are you doing?',
    lastMessageTime: '2:30 PM',
    unreadCount: 3,
    online: true,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: "Let's catch up soon!",
    lastMessageTime: '1:45 PM',
    unreadCount: 0,
    online: true,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the help!',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    online: false,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const FriendsList = () => {
  const handleFriendPress = (friend) => {
    // Handle navigation to chat screen
    console.log('Navigate to chat with:', friend.name);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <FlatList
        data={DUMMY_FRIENDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendListItem friend={item} onPress={() => handleFriendPress(item)} />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
};

export default FriendsList;