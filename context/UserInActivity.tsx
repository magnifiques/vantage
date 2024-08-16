import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const recordStartTime = async () => {
  try {
    const startTime = Date.now();
    await AsyncStorage.setItem("startTime", startTime.toString());
  } catch (error) {
    console.error("Failed to record start time:", error);
  }
};

export const UserInActivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);

  const router = useRouter();

  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log("🚀 ~ handleAppStateChange ~ nextAppState", nextAppState);

    if (nextAppState === "background") {
      await recordStartTime();
    } else if (nextAppState === "active" && appState.current === "background") {
      try {
        const startTime = await AsyncStorage.getItem("startTime");
        const elapsed = Date.now() - (startTime ? parseInt(startTime, 10) : 0);
        console.log("🚀 ~ handleAppStateChange ~ elapsed:", elapsed);

        if (elapsed > 200 && isSignedIn) {
          // Ensure isSignedIn is defined
          console.log("working");
          router.replace("/authenticated/(modals)/lock");
        }
      } catch (error) {
        console.error("Failed to get start time from AsyncStorage:", error);
      }
    }
    appState.current = nextAppState;
  };
  return children;
};
