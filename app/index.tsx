import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView>
      <View>
        <Link href={"/practise"}>Practise</Link>
        <Link href={"/dialpad"}>DialPad</Link>
      </View>
    </SafeAreaView>
  );
}
