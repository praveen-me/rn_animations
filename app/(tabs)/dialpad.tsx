import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

const { width } = Dimensions.get("window");

const dialpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];

const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const _spacing = 20;

const pinLength = 4;
const pinContainerSize = width / 2;
const pinSpacing = 10;
const pinMaxSize = pinContainerSize / pinLength;
const pinSize = pinMaxSize - pinSpacing * 2;

interface IDialPadProps {
  onPress: (item: (typeof dialpad)[number]) => void;
}

function DialPad(props: IDialPadProps) {
  return (
    <FlatList
      data={dialpad}
      numColumns={3}
      style={{ flexGrow: 0 }}
      columnWrapperStyle={{ gap: _spacing }}
      contentContainerStyle={{ gap: _spacing }}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={item === ""}
          onPress={() => {
            props.onPress(item);
          }}
        >
          <View style={[styles.dialBtn, { borderWidth: item === "" ? 0 : 1 }]}>
            {item === "del" ? (
              <Ionicons
                name="backspace-outline"
                size={dialPadTextSize}
                color={"black"}
              />
            ) : (
              <Text style={styles.dialPadText}>{item}</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default function DialPadContainer() {
  const [code, setCode] = useState<number[]>([]);

  const handleDialPress = (item: (typeof dialpad)[number]) => {
    if (item === "del") {
      setCode(code.slice(0, -1));
    } else if (typeof item === "number") {
      if (code.length >= pinLength) return;
      setCode([...code, item]);
    }
  };

  console.log({ code });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: pinSpacing * 2,
          marginBottom: _spacing * 2,
          height: pinSize * 2,
          alignItems: "flex-end",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <MotiView
            key={`pin-${i}`}
            style={{
              width: pinSize,
              height: pinSize,
              borderRadius: pinSize,
              backgroundColor: "red",
            }}
            animate={{
              height: code[i] ? pinSize : 2,
            }}
            transition={{ type: "timing", duration: 300 }}
          />
        ))}
      </View>
      <DialPad onPress={handleDialPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  dialBtn: {
    width: dialPadSize,
    height: dialPadSize,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderRadius: dialPadSize / 2,
  },
  dialPadText: {
    fontSize: dialPadTextSize,
  },
});
