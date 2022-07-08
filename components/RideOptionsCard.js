import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber-X",
    multiplier: 1.8,
    image: "http://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber-XL",
    multiplier: 2,
    image: "http://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber-LUX",
    multiplier: 2.5,
    image: "http://links.papareact.com/7pf",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow -mt-2`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center justify-between -mt-4 px-8 ${
              id === selected?.id && "bg-gray-200"
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} away</Text>
            </View>
            <Text style={tw`text-xl font-bold`}>
              ₹
              {Math.round(travelTimeInformation?.duration?.value * multiplier) /
                10}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          style={tw`bg-black py-3 w-4/5 mx-auto mb-2 ${
            !selected && "bg-gray-300"
          }`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
