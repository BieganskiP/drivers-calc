import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TabIcon = ({ name, color, focused, label }: any) => {
  return (
    <View className="items-center justify-center gap-2">
      <Icon name={name} size={24} color={color} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {label}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="calculator"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="calculator"
              color={color}
              focused={focused}
              label="Oblicz"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="bookmark"
              color={color}
              focused={focused}
              label="Zapisane"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="cog"
              color={color}
              focused={focused}
              label="Ustawienia"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
