import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { getCurrentDate } from "../src/commonUtils";

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
                break;

              case "few clouds":
                setWeatherStatus("오늘은 조금 흐리네요.");
                break;

              case "scattered clouds":
                setWeatherStatus("구름이 많아요.");
                break;

              case "broken clouds":
                setWeatherStatus("비가 올 것 같아요. 우산을 챙겨주세요.");
                break;

              case "shower rain":
                setWeatherStatus("비가 오고 있어요. 우산은 챙기셨죠?");
                break;

              case "rain":
                setWeatherStatus("비가 오고 있어요. 우산은 챙기셨죠?");
                break;

              case "thunderstorm":
                setWeatherStatus("태풍이 오고 있어요. 외출을 자제해 주세요.");
                break;

              case "snow":
                setWeatherStatus("눈 좋아하시나요? 눈이 오고 있어요.");
                break;

              case "mist":
                setWeatherStatus("안개가 심해요. 조심하세요.");
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
      <View style={styles.box_1}>
        <Text style={styles.timeText}>{viewTime}</Text>
        <Text style={styles.dateText}>{viewDate}</Text>
      </View>
      <View style={styles.box_2}>
        <Text style={styles.statusText}>{weatherStatus}</Text>
        <Text style={styles.tempText}>{currentTemp}°C </Text>
        <View style={styles.tempUnderLine}></View>
      </View>
      <View style={styles.box_3}>
        <Text style={styles.cityText}>{currentCity}</Text>
      </View>
      <View style={styles.box_4}>
        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최저기온</Text>
          <Text style={styles.minMaxTemp}>{minTemp}°C</Text>
        </View>

        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최고기온</Text>
          <Text style={styles.minMaxTemp}>{maxTemp}°C</Text>
        </View>
      </View>
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
  },

  dateText: {
    fontSize: 18,
    color: `#636e72`,
  },

  timeText: {
    fontSize: 28,
    fontWeight: `700`,
  },

  box_2: {
    flex: 2.5,
    width: `100%`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `flex-end`,
  },

  statusText: {
    marginBottom: 100,
    color: `#999`,
    fontSize: 20,
  },

  tempText: {
    fontWeight: `500`,
    fontSize: 80,
  },

  tempUnderLine: {
    width: `70%`,
    height: 5,
    backgroundColor: `#333`,
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
    color: `#888`,
  },

  box_4: {
    flex: 2,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-around`,
  },
  box_4_box: {
    width: `40%`,
    height: `100%`,
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },

  tempGuideText: {
    fontSize: 20,
    fontWeight: `500`,
    padding: 5,
  },

  minMaxTemp: {
    fontWeight: `400`,
    fontSize: 16,
  },
});
export default TodayScreen;
