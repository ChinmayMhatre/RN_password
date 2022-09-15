import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    ScrollView,
    TextInput,
} from "react-native";
import { ListItem } from "react-native-elements";
import { firestore } from "../firebase";

const Home = () => {
    let docs;
    let unsubscribe;
    const [isLoading, setIsLoading] = useState(false);
    const [creds, setCreds] = useState([]);
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        docs = firestore.collection("passwords");
        unsubscribe = docs.onSnapshot(getCredsData);

        return () => {
            unsubscribe();
        };
    }, []);

    const getCredsData = (querySnapshot) => {
        const creds = [];
        querySnapshot.forEach((res) => {
            const data = res.data().password;
            creds.push({
                key: res.id,
                data,
            });
        });
        setCreds(creds);
        setIsLoading(false);
    };

    const deleteCreds = (id) => {
        firestore
            .collection("passwords")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                {creds ? (
                    creds.map((res, i) => {
                        return (
                            <ListItem key={i} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.title}>
                                        {res.key}
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        {res.data}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => deleteCreds(res.key)}
                                >
                                    <Text style={styles.deleteText}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </ListItem>
                        );
                    })
                ) : (
                    <View />
                )}
            </ScrollView>

            <View style={styles.FormView}>
                <View style={styles.InputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter title"
                        onChangeText={(text) => setTitle(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.ButtonView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            firestore.collection("passwords").doc(title).set({
                                password: password,
                            });
                            setTitle("");
                            setPassword("");
                        }}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    FormView: {
        flex: 1 / 3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: "100%",
        backgroundColor: "#fff",
    },
    InputView: {
        width: "80%",
        justifyContent: "center",
        padding: 10,
    },
    deleteButton: {
        backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        elevation: 2,
    },
    deleteText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        height: 40,
        textAlign: "center",
        backgroundColor: "#f1f1f1",
        marginTop: 10,
        color: "black",
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    wrapper: {
        flex: 1 / 7,
        paddingBottom: 22,
        height: "80%",
        width: "80%",
    },
    loader: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    buttonText: {
        fontSize: 15,
        color: "white",
    },
    ButtonView: {
        width: "50%",
        marginBottom: 20,
        justifyContent: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "green",
        textAlign: "center",
    },
});
