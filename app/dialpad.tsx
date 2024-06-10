import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import randomColor from "randomcolor";
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

const primaryColor = randomColor();

const _colors = {
  primary: primaryColor,
  secondaryColor: randomColor({
    hue: primaryColor,
    luminosity: "dark",
  }),
};

interface IDialPadProps {
  onPress: (item: (typeof dialpad)[number]) => void;
}

function RenderItem({
  item,
  onPress,
}: {
  item: ListRenderItem<string | number>;
  onPress: (item: (typeof dialpad)[number]) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.dialBtn}
      onPress={() => onPress(item)}
      disabled={!item}
    >
      <Text style={styles.dialPadText}>{item}</Text>
    </TouchableOpacity>
  );
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
      renderItem={RenderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

interface IRenderPinProps {
  selected: boolean;
}
function RenderPin(props: IRenderPinProps) {
  return (
    <MotiView
      style={styles.pin}
      animate={{
        height: props.selected ? pinSize : 2,
        backgroundColor: props.selected
          ? _colors.secondaryColor
          : `${_colors.secondaryColor}66`,
        marginBottom: props.selected ? pinSize / 2 : 0,
      }}
      transition={{ type: "timing", duration: 200 }}
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
          <RenderPin key={`pin-${i}`} selected={Boolean(code[i])} />
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
    backgroundColor: _colors.primary,
  },
  dialBtn: {
    width: dialPadSize,
    height: dialPadSize,
    justifyContent: "center",
    alignItems: "center",
    borderColor: _colors.secondaryColor,
    borderRadius: dialPadSize / 2,
  },
  dialPadText: {
    fontSize: dialPadTextSize,
    color: _colors.secondaryColor,
  },
  pin: {
    width: pinSize,
    height: pinSize,
    borderRadius: pinSize,
    backgroundColor: _colors.secondaryColor,
  },
});
