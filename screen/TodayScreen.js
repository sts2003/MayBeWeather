import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import { getCurrentDate } from "../src/commonUtils";
import { LinearGradient } from "expo-linear-gradient";
import TypeWriter from "react-native-typewriter";

const WEATHER_API_KEY = `6cee116a4c0358ba4e4c62b654c4748d`;

const TodayScreen = () => {
  const [location_S, setLocation_S] = useState(null);
  const [errorMsg_S, setErrorMsg_S] = useState(null);

  const [viewDate, setViewDate] = useState(`0000. 00. 00 (0)`);
  const [viewTime, setViewTime] = useState(`00:00`);

  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentCity, setCurrentCity] = useState(``);

  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);

  const [weatherStatus, setWeatherStatus] = useState(``);

  const [weatherImage, setWeatherImage] = useState(null);

  setInterval(() => {
    const { currentDate, currentTime } = getCurrentDate();

    setViewDate(currentDate);
    setViewTime(currentTime);
  }, 1000);

  useEffect(() => {
    const { currentDate, currentTime } = getCurrentDate();

    setViewDate(currentDate);
    setViewTime(currentTime);

    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg_S(`Permission to access location was denied`);
        return;
      }

      const locData = await Location.getCurrentPositionAsync({});
      setLocation_S(locData);

      try {
        const weather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            console.log(json);

            const temp = String(json.main.temp).split(".")[0];
            const minTemp = String(json.main.temp_min).split(".")[0];
            const maxTemp = String(json.main.temp_max).split(".")[0];

            setCurrentCity(json.name);
            setCurrentTemp(temp);

            setMinTemp(minTemp);
            setMaxTemp(maxTemp);

            const status = json.weather[0].description;

            switch (status) {
              case "clear sky":
                setWeatherStatus("날씨가 좋아요. 외출은 어때요?");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fsun.png?alt=media&token=f9e51fb1-ffc7-41c2-ad7e-c81568f031e2"
                );
                break;

              case "moderate rain":
                setWeatherStatus("비가 와요. 우산은 챙기셨죠?");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fraining.png?alt=media&token=29a8baa5-bc64-4508-bbf2-d969196e3e7d"
                );
                break;

              case "few clouds":
                setWeatherStatus("오늘은 조금 흐리네요.");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fcloud.png?alt=media&token=5ddc1f81-484b-44f2-82bb-0d1527a9e240"
                );
                break;

              case "scattered clouds":
                setWeatherStatus("구름이 많아요.");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fcloud.png?alt=media&token=5ddc1f81-484b-44f2-82bb-0d1527a9e240"
                );
                break;

              case "broken clouds":
                setWeatherStatus("비가 올 것 같아요. 우산을 챙겨주세요.");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fbroken%20cloud.png?alt=media&token=8a810611-d719-4b9f-841b-bee13f857dde"
                );
                break;

              case "shower rain":
                setWeatherStatus("비가 오고 있어요. 우산은 챙기셨죠?");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fraining.png?alt=media&token=29a8baa5-bc64-4508-bbf2-d969196e3e7d"
                );
                break;

              case "rain":
                setWeatherStatus("비가 오고 있어요. 우산은 챙기셨죠?");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fraining.png?alt=media&token=29a8baa5-bc64-4508-bbf2-d969196e3e7d"
                );
                break;

              case "thunderstorm":
                setWeatherStatus("태풍이 오고 있어요. 외출을 자제해 주세요.");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fthunder.png?alt=media&token=fc48868e-109d-4e51-9283-01b9d4f0b103"
                );
                break;

              case "snow":
                setWeatherStatus("눈 좋아하시나요? 눈이 오고 있어요.");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fsnow.png?alt=media&token=418d58c4-a05b-490c-966d-5859fa1d0bca"
                );
                break;

              case "mist":
                setWeatherStatus("안개가 심해요. 조심하세요.");
                setWeatherImage(
                  "https://firebasestorage.googleapis.com/v0/b/leafsts-fileserver.appspot.com/o/eduWeather%2Fhaze.png?alt=media&token=c284373f-19af-45b4-9beb-76b3f72eaef8"
                );
                break;
            }
          });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.g_box} colors={[`#4568DC`, `#B06AB3`]}>
        <View style={styles.box_1}>
          <Text style={styles.timeText}>{viewTime}</Text>
          <Text style={styles.dateText}>{viewDate}</Text>
        </View>
        <View style={styles.box_2}>
          {weatherImage && (
            <Image
              style={styles.weatherImg}
              source={{
                uri: weatherImage,
              }}
            />
          )}

          <Text style={styles.statusText}>
            <TypeWriter typing={1}>{weatherStatus}</TypeWriter>
          </Text>
          <Text style={styles.tempText}>{currentTemp}°C </Text>
          <View style={styles.tempUnderLine}></View>
        </View>
        <View style={styles.box_3}>
          <Text style={styles.cityText}>{currentCity}</Text>
        </View>
        <View style={styles.box_4}>
          {/* <LinearGradient style={styles.g_box} colors={[`#74ebd5`, `#ACB6E5`]}> */}
          {/* <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText1}>최고기온</Text>
          <Text style={styles.minMaxTemp}>{maxTemp}°C</Text>
        </View>
        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText2}>최저기온</Text>
          <Text style={styles.minMaxTemp}>{minTemp}°C</Text>
        </View> */}
          {/* </LinearGradient> */}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  box_1: {
    flex: 2,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    marginBottom: 100,
  },

  dateText: {
    fontSize: 18,
    color: `#fff`,
  },

  timeText: {
    fontSize: 28,
    fontWeight: `700`,
    color: `#fff`,
  },

  box_2: {
    flex: 2.5,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `flex-end`,
  },

  weatherImg: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },

  statusText: {
    marginBottom: 20,
    color: `#fff`,
    fontSize: 16,
  },

  tempText: {
    fontWeight: `500`,
    fontSize: 80,
    marginBottom: 5,
    color: `#fff`,
  },

  tempUnderLine: {
    width: `70%`,
    height: 1,
    backgroundColor: `#fff`,
    borderRadius: 20,
    marginTop: -10,
  },

  box_3: {
    flex: 1,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `flex-start`,
  },

  cityText: {
    fontSize: 20,
    fontWeight: `500`,
    color: `#fff`,
  },

  box_4: {
    flex: 2,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-around`,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: `#A7BFE8`,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  g_box: {
    width: `100%`,
    height: `100%`,
  },
  box_4_box: {
    width: `40%`,
    height: `100%`,
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },

  tempGuideText1: {
    fontSize: 20,
    fontWeight: `500`,
    padding: 5,
    color: "red",
  },
  tempGuideText2: {
    fontSize: 20,
    fontWeight: `500`,
    padding: 5,
    color: "blue",
  },

  minMaxTemp: {
    fontWeight: `400`,
    fontSize: 16,
  },
});
export default TodayScreen;
