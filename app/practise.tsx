import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function Practise() {
  const width = useSharedValue(200);
  const height = useSharedValue(200);
  const backgroundColor = useSharedValue("blue");
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const startAnimation = () => {
    width.value = withTiming(Math.random() * 300, { duration: 200 });
    height.value = withTiming(Math.random() * 300, { duration: 200 });
    backgroundColor.value = withTiming(
      `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`,
      { duration: 1000 }
    );
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      backgroundColor: backgroundColor.value,
    };
  }, []);

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollOffset.value > 500 ? withTiming(1) : withTiming(0),
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Animated.ScrollView ref={scrollRef}>
          <TouchableOpacity onPress={startAnimation}>
            <Text>Start Animation</Text>
          </TouchableOpacity>
          <Animated.View style={animatedStyles} />
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={i}
              style={{
                height: 100,
                backgroundColor: `rgb(${Math.random() * 255},${
                  Math.random() * 255
                },${Math.random() * 255})`,
              }}
            />
          ))}
        </Animated.ScrollView>
      </>
      <Animated.View
        style={[
          buttonStyle,
          {
            position: "absolute",

            right: 20,
            bottom: 50,
          },
        ]}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            scrollRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }}
        >
          <Ionicons name="arrow-up" size={25} color={"white"} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
