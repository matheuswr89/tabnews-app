import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import IconsOcticons from "react-native-vector-icons/Octicons";
import EmptyList from "../components/EmptyList";
import ListItem from "../components/ListItem";
import AuthContext from "../context/AuthContext";
import { getUserContent } from "../service/contents";
import { getUser } from "../service/user";

const Tabs = createMaterialTopTabNavigator();

export default function User(props: NativeStackScreenProps<any, any>) {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<any>(user);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const { params }: any = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const perPage = 20;

  let post = [],
    comments = [];

  useEffect(() => {
    if (!!params) {
      fetchUser(params.name);
      props.navigation.setOptions({
        headerRight: null,
      });
    }
    loadPosts();
  }, []);

  const fetchUser = async (name: string) => {
    const res = await getUser(name);
    setCurrentUser(res.data);
  };

  if (content) {
    content.map((c) => (!c.parent_id ? post.push(c) : comments.push(c)));
  }

  const loadPosts = async () => {
    setLoading(true);
    const page =
      content.length === 0 ? 1 : Math.floor(content.length / perPage) + 1;
    getUserContent(!!params ? params.name : user?.username, page, perPage).then(
      (response) => {
        setContent([...content, ...response.data]);
        setLoading(false);
      }
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts().then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={{ height: "100%", paddingVertical: 10 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: colors.text, fontSize: 20 }}>
          {currentUser?.username}
        </Text>
        <Text style={{ color: colors.text }}>{currentUser?.email}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: colors.text, marginRight: 10 }}>
            <IconsOcticons name="square-fill" color="rgb(9, 105, 218)" />{" "}
            {currentUser?.tabcoins}
          </Text>
          <Text style={{ color: colors.text }}>
            <IconsOcticons name="square-fill" color="rgb(45, 164, 78)" />{" "}
            {currentUser?.tabcash}
          </Text>
        </View>
      </View>
      {loading && !refreshing && <ActivityIndicator size={"large"} />}
      {(post.length > 0 || comments.length > 0) && (
        <Tabs.Navigator
          key={6}
          backBehavior="none"
          screenOptions={({ route }: any) => ({
            tabBarStyle: {
              paddingBottom: 5,
              backgroundColor: colors.background,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              margin: 0,
              padding: 0,
              width: 1000,
            },
          })}
        >
          {post.length > 0 && (
            <Tabs.Screen
              name={`Post (${post.length})`}
              children={() => (
                <List
                  array={post}
                  loadPosts={loadPosts}
                  loading={loading}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  key="list1"
                />
              )}
            />
          )}
          {comments.length > 0 && (
            <Tabs.Screen
              name={`Comentários (${comments.length})`}
              children={() => (
                <List
                  array={comments}
                  loadPosts={loadPosts}
                  loading={loading}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  key="list1"
                />
              )}
            />
          )}
        </Tabs.Navigator>
      )}
    </View>
  );
}

const List: any = ({ array, loadPosts, loading, refreshing, onRefresh }) => {
  return (
    <View style={{ marginVertical: 8, flex: 1 }} key={`_list${uuid.v4()}`}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={array}
        keyExtractor={(item) => `list${item.id}${uuid.v4()}`}
        renderItem={({ item, index }) => <ListItem index={index} post={item} />}
        onEndReached={array.length > 9 ? loadPosts : null}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          loading && !refreshing ? <ActivityIndicator size={"large"} /> : null
        }
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
};
