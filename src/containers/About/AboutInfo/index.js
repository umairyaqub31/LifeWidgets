import * as React from 'react';
import { Text, TouchableOpacity, View, ScrollView  } from 'react-native';
import styles from './styles';
import { Avatar, Divider } from 'react-native-paper';
import { Fontisto , FontAwesome, MaterialIcons, FontAwesome5,AntDesign } from '@expo/vector-icons';
import colors from "../../../config/color/color";



  
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
    return (
        <View style={styles.container}>
            <ScrollView style ={styles.scrolledview}>
                <View>
                    <View style={styles.editHeading}>
                        <Text style={styles.heading}>Basic Info</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('BasicInfo')}>
                            <Text style={styles.primarytext}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.listContainer}>
                        <View style={styles.chipOpacity}>
                            <FontAwesome5 name="user-alt" size={22} color={colors.black} />
                        </View>       
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>Male</Text>
                                <Text style={styles.textGray}>Gender</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                        <View style={styles.chipOpacity}>
                            <MaterialIcons name="speaker-notes" size={22} color={colors.black} />
                        </View>       
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>English</Text>
                                <Text style={styles.textGray}>Languages</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                        <View style={styles.chipOpacity}>
                            <FontAwesome5 name="birthday-cake" size={22} color={colors.black} />
                        </View> 
                        <View style={[styles.listContainerRight,styles.noBorder,styles.noPadding]}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>September 2, 1995</Text>
                                <Text style={styles.textGray}>Birthday</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider style={styles.separator}/>
                <View>
                    <View style={styles.editHeading}>
                        <Text style={styles.heading}>Contact Info</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ContactInfo')}>
                            <Text style={styles.primarytext}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.listContainer}>
                        <View style={styles.chipOpacity}>
                            <FontAwesome name="phone" size={22} color={colors.black} />
                        </View>       
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>+44 235 158 465</Text>
                                <Text style={styles.textGray}>Mobile</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                        <View style={styles.chipOpacity}>
                            <MaterialIcons name="email" size={22} color={colors.black} />
                        </View> 
                        <View style={[styles.listContainerRight,styles.noBorder,styles.noPadding]}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>admin@gmail.com</Text>
                                <Text style={styles.textGray}>Email</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider style={styles.separator}/>
                <View>
                    <View style={styles.editHeading}>
                        <Text style={styles.heading}>Relationship</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('RelationshipInfo')}>
                            <Text style={styles.primarytext}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.listContainer}>
                        <View style={styles.chipOpacity}>
                            <FontAwesome5 name="hand-holding-heart" size={22} color={colors.black}/>
                        </View>       
                        <View style={[styles.listContainerRight,styles.noBorder,styles.noPadding]}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>Married since January 20, 2019</Text>
                                <View style={styles.reslationShipStatus}>
                                    <Fontisto style={styles.statusIcon} name="earth" size={12} color={colors.gray} />
                                    <Text style={styles.textGray}>Public</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider style={styles.separator}/>
                <View>
                    <View style={styles.editHeading}>
                        <Text style={styles.heading}>Bars</Text>
                        <TouchableOpacity>
                            <Text style={styles.primarytext}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.listContainer}>
                        <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/surgery_operation_hospital_216179.jpg'}} />      
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>Late-Night Club.</Text>
                                <Text style={styles.textGray}>Montana, USA</Text>
                                <Text style={styles.textGray}>Visited on August 3, 2012</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                    <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/young_lovers_at_a_lighthouse_200318.jpg'}} />       
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>BrewDog Tap</Text>
                                <Text style={styles.textGray}>Canal Winchester, OH, USA</Text>
                                <Text style={styles.textGray}>Visited on January 3, 2015</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                         <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/stock_photo_new_york_city_panorama_02_170749.jpg'}} />
                        <View style={[styles.listContainerRight,styles.noBorder,styles.noPadding]}>
                            <View style={styles.listtitleContainer}>
                            <Text style={styles.titleBold}>Bill's Bar & Burger</Text>
                                <Text style={styles.textGray}>New York, NY, USA</Text>
                                <Text style={styles.textGray}>Visited on January 3, 2018</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider style={styles.separator}/>
                <View>
                    <View style={styles.editHeading}>
                        <Text style={styles.heading}>Groups</Text>
                        <TouchableOpacity>
                            <Text style={styles.primarytext}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.listContainer}>
                        <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/sad_child_at_a_stone_wall_205292.jpg'}} />      
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>Kids Communication Group</Text>
                                <Text style={styles.textGray}>3.8k Members</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                    <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/stock_market_514592.jpg'}} />       
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>Marketing </Text>
                                <Text style={styles.textGray}>4.5k Members</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                         <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/woman_holding_video_camera_188626.jpg'}} />
                        <View style={[styles.listContainerRight,styles.noBorder,styles.noPadding]}>
                            <View style={styles.listtitleContainer}>
                            <Text style={styles.titleBold}>Graphics,Video Eidtor Group</Text>
                                <Text style={styles.textGray}>1,235 Members</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider style={styles.separator}/>
                <View>
                    <View style={styles.editHeading}>
                        <Text style={styles.heading}>favourite</Text>
                        <TouchableOpacity>
                            <Text style={styles.primarytext}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.listContainer}>
                        <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/oil_painting_185637.jpg'}} />      
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>Lama Koshi</Text>
                                <Text style={styles.textGray}>21 mutual friends</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                    <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/highquality_pictures_face_paint_children_167990.jpg'}} />       
                        <View style={styles.listContainerRight}>
                            <View style={styles.listtitleContainer}>
                                <Text style={styles.titleBold}>Noan James </Text>
                                <Text style={styles.textGray}>91 mutual friends</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                         <Avatar.Image style={styles.avatarImage} size={42} source={{uri:'https://images.all-free-download.com/images/graphiclarge/girl_laugh_face_215748.jpg'}} />
                        <View style={[styles.listContainerRight,styles.noBorder,styles.noPadding]}>
                            <View style={styles.listtitleContainer}>
                            <Text style={styles.titleBold}>Memata Moan</Text>
                            <Text style={styles.textGray}>221 mutual friends</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Divider style={styles.separator}/>
            </ScrollView>
        </View>
    );
    }
}

export default About;