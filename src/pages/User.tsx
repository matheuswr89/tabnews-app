import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FlashList from "@shopify/flash-list/dist/FlashList";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import uuid from "react-native-uuid";
import IconsOcticons from "react-native-vector-icons/Octicons";
import EmptyList from "../components/EmptyList";
import ListItem from "../components/ListItem";
import AuthContext from "../context/AuthContext";
import ReloadContentContext from "../context/ReloadContentContext";
import { getUserContent } from "../service/contents";
import { getUser } from "../service/user";

const Tabs = createMaterialTopTabNavigator();

export default function User(props: NativeStackScreenProps<any, any>) {
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const { params }: any = useRoute();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isReload } = useContext(ReloadContentContext);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);

  useEffect(() => {
    if (!!params) {
      props.navigation.setOptions({
        headerRight: null,
      });
    }
    fetchUser(!!params ? params.name : user.username);
    loadPosts();
  }, [isReload === true]);

  const fetchUser = async (name: string) => {
    const res = await getUser(name);
    setCurrentUser(res.data);
  };

  const loadPosts = async () => {
    setLoading(true);
    getUserContent(!!params ? params.name : user?.username, page).then(
      (response) => {
        const array = response.data;
        if (array.length > 0) {
          setComments([...comments, ...array.filter((e) => !!e.parent_id)]);
          setPost([...post, ...array.filter((e) => !e.parent_id)]);
        } else {
          setLast(true);
        }

        setLoading(false);
      }
    );
    setPage(page + 1);
  };

  const onRefresh = useCallback(() => {
    setPost([]);
    setComments([]);
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
      {comments.length === 0 && post.length === 0 && <EmptyList />}
      {(post.length > 0 || comments.length > 0) && (
        <Tabs.Navigator
          key={6}
          backBehavior="none"
          screenOptions={({ route }: any) => ({
            tabBarIndicatorStyle: { backgroundColor: "#2c974b" },
            tabBarStyle: {
              paddingBottom: 5,
              backgroundColor: colors.background,
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
                  last={last}
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
                  last={last}
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

const List: any = ({
  array,
  loadPosts,
  loading,
  refreshing,
  onRefresh,
  last,
}) => {
  return (
    <View style={{ marginVertical: 8, flex: 1 }} key={`_list${uuid.v4()}`}>
      <FlashList
        keyExtractor={(item, index) => {
          return item + index.toString();
        }}
        renderItem={({ item, index }) => <ListItem index={index} post={item} />}
        data={array}
        estimatedItemSize={1000}
        onEndReached={!last && array.length > 10 ? loadPosts : null}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={() =>
          loading && !refreshing ? <ActivityIndicator size={"large"} /> : null
        }
      />
    </View>
  );
};
