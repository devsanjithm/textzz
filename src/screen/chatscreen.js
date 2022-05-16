import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Alert, ImageBackground, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../navigator/Authprovider";
import Loading from "./loading";

function chatscreen({ route }) {
    const { id } = route.params;
    const { userinfo, setUserinfo } = useContext(AuthContext);
    const { searchkey, setSearchkey } = useContext(AuthContext);
    const { onlinecheck, setonlinecheck } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [listMessage, setListMessage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOnline, setonline] = useState("");
    const [iscount, setcount] = useState(1);
    const [val, setval] = useState(0);
    const [groupchatid, setGroupchatid] = useState("");
    const [contenth, Setcontenth] = useState(1);
    const [inputValue1, setInputValue1] = useState("");
    var chatid = "";
    var cupp = id;
    var removeListener = "";
    var anotherlisterner = "";
    var isonline = "";
    const [mme, setMee] = useState();
    const imgurl = "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";
    const currentUser = userinfo.id
    useEffect(() => {
        setSearchkey(0);
        setLoading(true)
        if (val === 0) {
            setval(1);
            nnew();

        } else {
            cupp = id;
            nnew();
        }
        return () => {
            if (removeListener) {
                removeListener();
                anotherlisterner();
                console.log("loged");
                if (isonline === "user1") {
                    firestore().collection("messages").doc(chatid).set({ user1: "false" }, { merge: true })
                        .then(() => {
                            console.log("updated");
                        }).catch((e) => {
                            console.log(e);
                        })
                } else {
                    firestore().collection("messages").doc(chatid).set({ user2: "false" }, { merge: true })
                        .then(() => {
                            console.log("updated");
                        }).catch((e) => {
                            console.log(e);
                        })
                }
            }
        }
    }, [])




    async function nnew() {
        if (removeListener) {
            removeListener();
        }
        if (
            hashString(currentUser) <=
            hashString(cupp)
        ) {
            setGroupchatid(`${currentUser}-${cupp}`)
            chatid = `${currentUser}-${cupp}`;
            firestore().collection("messages").doc(chatid).set({ user1: "true" }, { merge: true })
                .then(() => {
                    console.log("updated");
                }).catch((e) => {
                    console.log(e);
                })
            isonline = "user1";
        } else {
            setGroupchatid(`${cupp}-${currentUser}`)
            chatid = `${cupp}-${currentUser}`;
            firestore().collection("messages").doc(chatid).set({ user2: "true" }, { merge: true })
                .then(() => {
                    console.log("updated");
                }).catch((e) => {
                    console.log(e);
                })

            isonline = "user2";
        }
        setListMessage([])
        //const nstub =collection(firestore(),"messages", chatid,chatid)

        removeListener = firestore().collection("messages").doc(chatid).collection(chatid)
            .onSnapshot((querySnapshot) => {


                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();

                    const data = {
                        content: '',
                        ...firebaseData
                    };

                    return data;

                });
                setListMessage(messages);
                setLoading(false);
            });

        firestore().collection("home").doc(currentUser).collection("userlist").doc(cupp)
            .set({ count: 0 }, { merge: true }).then((s) => {
                console.log(s);
            }).catch((e) => {
                console.log("up")
                console.log(e);
            })

        anotherlisterner = firestore().collection("messages").doc(chatid)
            .onSnapshot((snap) => {
                if (isonline === "user2") {
                    var data = snap.data().user1;
                    if (data === "true") {
                        setonline(1);
                        setonlinecheck(1);
                        setcount(1);
                    } else {
                        setonline(0);
                        setonlinecheck(0);
                    }
                } else {
                    var data = snap.data().user2;
                    if (data === "true") {
                        setonline(1);
                        setonlinecheck(1);
                        setcount(1)
                    } else {
                        setonline(0);
                        setonlinecheck(0);
                    }
                }
            })


    }



    function hashString(str) {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash // Convert to 32bit integer
        }
        return hash
    }


    function renderListMessage() {
        var checkdate = "";
        function timestamp(lmtime) {
            const s = moment(Number(lmtime)).format('LT');
            const date = moment(Number(lmtime)).format('LL');
            if (checkdate !== date) {
                checkdate = date;
                viewListMessage.push(<View style={styles.date}>
                    <Text style={{ color: "gray" }}>{date}</Text>
                </View>)
            }
            return s;
        }
        function deletemessage(timestamp, content) {
            Alert.alert(
                '',
                'Delete message ?',
                [
                    { text: 'NO', onPress: () => console.log("no pressed") },
                    {
                        text: 'YES', onPress: () => {

                            Setcontenth(0);
                            firestore().collection("messages").doc(groupchatid).collection(groupchatid)
                                .doc(timestamp).set({ content: "" }, { merge: true }).then(() => {
                                    console.log('Message deleted!');
                                });
                        }
                    },
                ]
            );

        }

        if (listMessage.length > 0) {

            var viewListMessage = [];
            var firstmessagedate = listMessage[0].timestamp;
            const date = moment(Number(firstmessagedate)).format('LL');
            checkdate = date;
            viewListMessage.push(<View style={styles.date}>
                <Text style={{ color: "gray" }}>{date}</Text>
            </View>)

            listMessage.forEach((item, index) => {
                if (item.idFrom === currentUser) {
                    // Item right (my message)

                    if (item.type === 0) {
                        viewListMessage.push(
                            <TouchableOpacity onLongPress={() => {
                                deletemessage(item.timestamp, item.content);
                            }}
                                delayLongPress={1000}>
                                <View style={styles.messageme} key={index}>
                                    <View>
                                        <Text style={[item.content ? styles.message2 : styles.message1deleted]}>{item.content ? item.content : "message deleted"}</Text>
                                        <View style={{ alignSelf: "flex-end", marginRight: 3, marginBottom: 4, paddingLeft: 7 }}>
                                            <Text style={{ fontSize: 8 }}>{timestamp(item.timestamp)}</Text></View>
                                    </View>
                                </View>
                            </TouchableOpacity>


                        )
                    }

                } else {
                    // Item left (peer message)
                    if (item.type === 0) {
                        viewListMessage.push(

                            <View style={styles.messagefrom} key={index}>
                                <View>
                                    <Text style={[item.content ? styles.message1 : styles.message1deleted]}>{item.content ? item.content : "message deleted"}</Text>
                                    <View style={{ alignSelf: "flex-start", marginLeft: 3, marginBottom: 4, paddingRight: 7 }}>
                                        <Text style={{ fontSize: 8 }}>{timestamp(item.timestamp)}</Text></View>
                                </View>
                            </View>

                        )

                    }
                }
            })
            return viewListMessage
        }
    }




    const onSendMessage = async (content, type) => {
        Setcontenth(1);

        if (listMessage.length === 0) {
            var img = "";
            var name = "";
            await firestore().collection("users").doc(cupp).get()
                .then((doc) => {
                    console.log(doc.data())
                    img = doc.data().AvatarURL;
                    name = doc.data().Displayname;
                });
            await firestore()
                .collection("home")
                .doc(currentUser)
                .collection("userlist")
                .doc(cupp)
                .set({ latestmessage: "", id: cupp, Displayname: name, AvartarURL: img })
                .then(() => {
                    console.log("created data")
                }).catch((e) => {
                    console.log(e);
                })

            await firestore()
                .collection("home")
                .doc(cupp)
                .collection("userlist")
                .doc(currentUser)
                .set({
                    latestmessage: "", id: userinfo.id, Displayname: userinfo.Displayname,
                    AvartarURL: userinfo.AvatarURL
                })
                .then(() => {
                    console.log("craeted data")
                })
                .catch((e) => {
                    console.log(e);
                })
            console.log("ended")
        }

        if (content.trim() === '') {
            return
        }

        const timestamp = moment().valueOf().toString();

        const itemMessage = {
            idFrom: currentUser,
            idTo: cupp,
            timestamp: timestamp,
            content: content.trim(),
            type: type
        }

        firestore()
            .collection("home")
            .doc(currentUser)
            .collection("userlist")
            .doc(cupp)
            .set({
                latestmessage: {
                    content,
                    createdAt: timestamp
                }
            }, { merge: true })
            .then(() => {
                console.log("latestmessage updated")
            })
            .catch((e) => {
                console.log(e);
            })
        firestore()
            .collection("home")
            .doc(cupp)
            .collection("userlist")
            .doc(currentUser)
            .set({
                latestmessage: {
                    content,
                    createdAt: timestamp
                }
            }, { merge: true })
            .then(() => {
                console.log("latestmessage updated")
            })
            .catch((e) => {
                console.log(e);
            })
        firestore()
            .collection("messages")
            .doc(groupchatid)
            .collection(groupchatid)
            .doc(timestamp)
            .set(itemMessage)
            .then(() => {
                if (!(isOnline)) {
                    setcount(iscount + 1);
                }
            })
            .catch(err => {
                console.log(err.message);
                setInputValue(content)
            })
        if (!(isOnline)) {
            firestore().collection("home").doc(cupp).collection("userlist").doc(currentUser)
                .set({ count: iscount }, { merge: true }).then((s) => {
                    console.log("count added");
                }).catch((e) => {
                    console.log("down");
                    console.log(e);
                })
        }
    }

    function onKeyboardPress(event) {

        if (event.key === 'Enter') {
            onSendMessage(inputValue, 0);
            setInputValue("");
        }

    }


    return (
        <View style={styles.container}>

            <Loading loading={loading} />
            <ImageBackground resizeMode="cover" style={styles.image}
                source={{ uri: imgurl }}
            >
                <ScrollView ref={el => setMee(el)}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        if (contenth) {
                            mme.scrollToEnd({ animated: false });
                        }
                    }}
                >
                    {renderListMessage()}

                </ScrollView>

                <View style={styles.textbtn}>
                    <View style={styles.textbox}>
                        <TextInput
                            keyboardType="default"
                            value={inputValue}
                            placeholder="Type your message..."
                            onChangeText={text => setInputValue(text)}
                            style={styles.inputbox}
                            onKeyPress={() => {
                                onKeyboardPress
                                mme.scrollToEnd()
                            }}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={() => {
                            onSendMessage(inputValue, 0)
                            setInputValue("")
                        }}>
                            <Icon name="send"

                                size={30} color="#fff" /></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    messageme: {
        flex: 1,
        backgroundColor: "#e3f2fd",
        margin: 10,
        alignSelf: "flex-end",
        borderTopStartRadius: 12,
        borderBottomLeftRadius: 12,
        borderTopRightRadius: 12,
        elevation: 2,
        flexDirection: "column"
    },
    date: {
        backgroundColor: "#fff",
        marginTop: 7,
        padding: 5,
        borderRadius: 10,
        alignSelf: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    messagefrom: {
        flex: 1,
        elevation: 2,
        margin: 10,
        backgroundColor: "#fff",
        alignSelf: "flex-start",
        borderTopStartRadius: 12,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        flexDirection: "column"
    },
    message1: {
        marginRight: 3,
        padding: 7,
        paddingBottom: 3,
        color: "#263238",
        fontSize: 16,
    },
    message1deleted: {
        marginRight: 3,
        padding: 7,
        paddingBottom: 3,
        color: "grey",
        fontSize: 14,
    },
    message2: {
        marginRight: 3,
        padding: 7,
        paddingBottom: 3,
        color: "#263238",
        fontSize: 16,
    },
    textbtn: {
        flexDirection: "row",
        marginBottom: 5,
        padding: 10,
        alignItems: "center"
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: "#1e88e5",
        elevation: 2
    },
    textbox: {
        flex: 1,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 35,
        backgroundColor: "#fff",
        marginRight: 10,
        elevation: 2
    },
    inputbox: {
        paddingLeft: 25,
    },
    topbox: {
        width: '100%',
        height: 10,
        paddingBottom: 15,
        backgroundColor: "#fff"
    },
});
export default chatscreen;