import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface NavigationPage {
  navigation: NativeStackNavigationProp<any, any, undefined>;
}

export interface ListModel {
  strategy: string;
}
