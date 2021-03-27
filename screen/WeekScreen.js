import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

const WEATHER_API_KEY = `6cee116a4c0358ba4e4c62b654c4748d`;

const WeekScreen = () => {
  const [data0Date, setData0Date] = useState();
  const [data1Date, setData1Date] = useState();
  const [data2Date, setData2Date] = useState();
  const [data3Date, setData3Date] = useState();
  const [data4Date, setData4Date] = useState();

  const [tab, setTab] = useState(0);

  const [btnName0, setBtnName0] = useState();
  const [btnFlag0, setBtnFlag0] = useState(true);

  const [btnName1, setBtnName1] = useState();
  const [btnFlag1, setBtnFlag1] = useState(true);

  const [btnName2, setBtnName2] = useState();
  const [btnFlag2, setBtnFlag2] = useState(true);

  const [btnName3, setBtnName3] = useState();
  const [btnFlag3, setBtnFlag3] = useState(true);

  const [btnName4, setBtnName4] = useState();
  const [btnFlag4, setBtnFlag4] = useState(true);

  const btnClickHandler = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg_S(`Permission to access location was denied`);
          return;
        }

        const locData = await Location.getCurrentPositionAsync({});

        const weather = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            console.log(json.list[0]);

            const now = new Date();

            const data0 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data1 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data2 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data3 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            now.setDate(now.getDate() + 1);
            const data4 = `${now.getFullYear()}-${
              now.getMonth() + 1 < 10
                ? `0` + (now.getMonth() + 1)
                : now.getMonth + 1
            }-${now.getDate() < 10 ? `0` + now.getDate() : now.getDate()}`;

            let arr0 = [];
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let arr4 = [];

            json.list.map((data) => {
              const compareData = data.dt_txt.split(` `)[0];

              switch (compareData) {
                case data0:
                  const prevData = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };
                  arr0.push(prevData);

                  break;
                case data1:
                  const prevData1 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };
                  arr1.push(prevData1);

                  break;

                case data2:
                  const prevData2 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };
                  arr2.push(prevData2);

                  break;

                case data3:
                  const prevData3 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };
                  arr3.push(prevData3);

                  break;
                case data4:
                  const prevData4 = {
                    temp: String(data.main.temp).split(`.`)[0],
                    dateTime: data.dt_txt,
                  };
                  arr4.push(prevData4);

                  break;
              }
            });
            setData0Date(arr0);
            setData1Date(arr1);
            setData2Date(arr2);
            setData3Date(arr3);
            setData4Date(arr4);
          });
      } catch (e) {
        console.log(e);
        alert("데이터를 불러올 수 없습니다.");
      }
    })();
  }, []);

  if (data0Date) {
    if (btnFlag0) {
      setBtnName0(String(data0Date[0].dateTime).substring(5, 10));
      setBtnFlag0(false);
    }
  }
  if (data1Date) {
    if (btnFlag1) {
      setBtnName1(String(data1Date[0].dateTime).substring(5, 10));
      setBtnFlag1(false);
    }
  }
  if (data2Date) {
    if (btnFlag2) {
      setBtnName2(String(data2Date[0].dateTime).substring(5, 10));
      setBtnFlag2(false);
    }
  }
  if (data3Date) {
    if (btnFlag3) {
      setBtnName3(String(data3Date[0].dateTime).substring(5, 10));
      setBtnFlag3(false);
    }
  }
  if (data4Date) {
    if (btnFlag4) {
      setBtnName4(String(data4Date[0].dateTime).substring(5, 10));
      setBtnFlag4(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        {btnName0 && (
          <TouchableOpacity
            onPressOut={() => btnClickHandler(0)}
            style={tab === 0 ? styles.activeBtn : styles.standardBtn}
          >
            <Text style={styles.btnTxt}>{btnName0}</Text>
          </TouchableOpacity>
        )}

        {btnName1 && (
          <TouchableOpacity
            onPressOut={() => btnClickHandler(1)}
            style={tab === 1 ? styles.activeBtn : styles.standardBtn}
          >
            <Text style={styles.btnTxt}>{btnName1}</Text>
          </TouchableOpacity>
        )}

        {btnName2 && (
          <TouchableOpacity
            onPressOut={() => btnClickHandler(2)}
            style={tab === 2 ? styles.activeBtn : styles.standardBtn}
          >
            <Text style={styles.btnTxt}>{btnName2}</Text>
          </TouchableOpacity>
        )}

        {btnName3 && (
          <TouchableOpacity
            onPressOut={() => btnClickHandler(3)}
            style={tab === 3 ? styles.activeBtn : styles.standardBtn}
          >
            <Text style={styles.btnTxt}>{btnName3}</Text>
          </TouchableOpacity>
        )}

        {btnName4 && (
          <TouchableOpacity
            onPressOut={() => btnClickHandler(4)}
            style={tab === 4 ? styles.activeBtn : styles.standardBtn}
          >
            <Text style={styles.btnTxt}>{btnName4}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.box2}>
        {tab === 0 && <Text>1111</Text>}
        {tab === 1 && <Text>2222</Text>}
        {tab === 2 && <Text>3333</Text>}
        {tab === 3 && <Text>4444</Text>}
        {tab === 4 && <Text>5555</Text>}
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
  box1: {
    flex: 1,
    width: `100%`,
    alignItems: `center`,
    justifyContent: `space-around`,
    flexDirection: `row`,
  },

  box2: {
    flex: 4,
    width: `100%`,
  },

  standardBtn: {
    width: `19%`,
    height: 35,
    backgroundColor: `#D6A2E8`,

    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 7,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.1,

    elevation: 18,
  },

  btnTxt: {
    color: `#fff`,
  },

  activeBtn: {
    width: `19%`,
    height: 35,
    backgroundColor: `#82589F`,

    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 7,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.1,

    elevation: 18,
  },
});

export default WeekScreen;
