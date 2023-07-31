import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

class AllEvents extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    render(){
        return(
            <View style={styles.container}>
         
                    <ImageBackground
                        style={styles.coverImage}
                        imageStyle={{ borderBottomLeftRadius:30,borderBottomRightRadius:30, }}
                        source={require("../../../../assets/images/bar.jpg")} >
                        <Text style={styles.coverTitle}>Attending</Text>
                    </ImageBackground>
                    <ScrollView style={styles.scrolledview}>
                            <View style={styles.spacingXL} />
                   
                        <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity
                                    style={[
                                    styles.boxShadow,
                                    styles.roundedContainer,
                                    styles.eventsContainer,
                                    ]}
                                >
                                    <Image
                                    source={require("../../../../assets/images/bar.jpg")}
                                    style={styles.eventsBanner}
                                    />
                                    <View style={styles.eventBody}>
                                    <View style={styles.listInline}>
                                        <Text style={styles.graytext}>
                                        Friday, 28/2021
                                        </Text>
                                        {/* <View style={styles.dot} /> */}
                                        {/* <Text style={styles.graytext}>At 12pm</Text> */}
                                    </View>
                                    <Text style={styles.textBold} numberOfLines={2}>
                                        Festival
                                    </Text>
                                    <View style={styles.spacing} />
                                    <View style={styles.imageGridOverlay}>
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />

                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>
                                        150 Interested
                                        </Text>
                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>22 Going</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity> 
                                                
                                <TouchableOpacity
                                    style={[
                                    styles.boxShadow,
                                    styles.roundedContainer,
                                    styles.eventsContainer,
                                    ]}
                                >
                                    <Image
                                    source={require("../../../../assets/images/bar.jpg")}
                                    style={styles.eventsBanner}
                                    />
                                    <View style={styles.eventBody}>
                                    <View style={styles.listInline}>
                                        <Text style={styles.graytext}>
                                        Friday, 28/2021
                                        </Text>
                                        {/* <View style={styles.dot} /> */}
                                        {/* <Text style={styles.graytext}>At 12pm</Text> */}
                                    </View>
                                    <Text style={styles.textBold} numberOfLines={2}>
                                        Festival
                                    </Text>
                                    <View style={styles.spacing} />
                                    <View style={styles.imageGridOverlay}>
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />

                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>
                                        150 Interested
                                        </Text>
                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>22 Going</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity> 
                                <TouchableOpacity
                                    style={[
                                    styles.boxShadow,
                                    styles.roundedContainer,
                                    styles.eventsContainer,
                                    ]}
                                >
                                    <Image
                                    source={require("../../../../assets/images/bar.jpg")}
                                    style={styles.eventsBanner}
                                    />
                                    <View style={styles.eventBody}>
                                    <View style={styles.listInline}>
                                        <Text style={styles.graytext}>
                                        Friday, 28/2021
                                        </Text>
                                        {/* <View style={styles.dot} /> */}
                                        {/* <Text style={styles.graytext}>At 12pm</Text> */}
                                    </View>
                                    <Text style={styles.textBold} numberOfLines={2}>
                                        Festival
                                    </Text>
                                    <View style={styles.spacing} />
                                    <View style={styles.imageGridOverlay}>
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />

                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>
                                        150 Interested
                                        </Text>
                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>22 Going</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity> 
                        <TouchableOpacity
                                    style={[
                                    styles.boxShadow,
                                    styles.roundedContainer,
                                    styles.eventsContainer,
                                    ]}
                                >
                                    <Image
                                    source={require("../../../../assets/images/bar.jpg")}
                                    style={styles.eventsBanner}
                                    />
                                    <View style={styles.eventBody}>
                                    <View style={styles.listInline}>
                                        <Text style={styles.graytext}>
                                        Friday, 28/2021
                                        </Text>
                                        {/* <View style={styles.dot} /> */}
                                        {/* <Text style={styles.graytext}>At 12pm</Text> */}
                                    </View>
                                    <Text style={styles.textBold} numberOfLines={2}>
                                        Festival
                                    </Text>
                                    <View style={styles.spacing} />
                                    <View style={styles.imageGridOverlay}>
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />
                                            <Image
                                                source={require("../../../../assets/images/bar.jpg")}
                                                style={styles.imageOverlay}
                                            />

                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>
                                        150 Interested
                                        </Text>
                                        <View style={styles.dot} />
                                        <Text style={styles.graytext}>22 Going</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity> 
                        

                         </ScrollView>
                </ScrollView>
             </View>
        )
    }
}

export default AllEvents;