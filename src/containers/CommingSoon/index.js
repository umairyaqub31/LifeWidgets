import * as React from 'react';
import { Text, TouchableOpacity, View,  ScrollView,TextInput,Image,KeyboardAvoidingView, Alert,Button } from 'react-native';
import styles from './styles';

class CommingSoon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          behavior: 'position'
        };
        this.feedBackData = '';
    }

   submitFeedBack = () => {
     console.log(this.feedBackData);
     if (this.feedBackData.length > 3) {
       Alert.alert("Thank You","Feedback received.", [{text: "OK", onPress: () => this.props.navigation.goBack()}])
     } else {
       Alert.alert("Error","Feedback is required")
     }
   }
   setFeedbackData = (text) => {

        this.feedBackData = text;
   }

    render() {
      let soonWidget = this.props.route.params.soonWidget;
      const images = {
          Banks: require('../../../assets/images/Bank.png'),
          Restaurants: require('../../../assets/images/Restaurant.png'),
          Cars: require('../../../assets/images/Cars.png'),
          Apartments: require('../../../assets/images/Apartments.png'),
          Homes: require('../../../assets/images/Homes.png'),
          Vacation: require('../../../assets/images/Vacation.png'),
          Jobs: require('../../../assets/images/Jobs.png'),
          Advertising: require('../../../assets/images/Advertising.png'),
          Events: require('../../../assets/images/Events.png'),
          Calendar: require('../../../assets/images/Calendar.png'),
          Social_Seller: require('../../../assets/images/Social_Seller.png'),
          MyCRM: require('../../../assets/images/MyCRM.png')

      }
      let widgetImage = images[soonWidget];
      return (

          <ScrollView contentContainerStyle={styles.scrolledview} keyboardDismissMode="on-drag">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <View>
          <Image
             style={{ width: '100%', maxHeight: 140 }}
            source={widgetImage}
          />
            <Text style={styles.text}>
              {(() => {
                  switch (soonWidget) {
                  case "Banks": return  "We are currently looking for an established money transfer application to allow users and businesses to exchange currency.  If you are an established business in this field, we would appreciate hearing from you.  Please fill out the form below.";
                  case "Restaurants": return  "We believe small business owners should not have to pay thousands of dollars for an online reservation tool.  In 2021 we will be launching a reservation tool for restaurants.  Our platform will start off free and eventually we will charge $99 per month for all the reservations your establishment can handle. If you would like to be notified when we launch, please fill out the form below.";
                  case "Cars": return  "We believe dealerships pay way too much for current third-party sites that advertise your products.  These third-party companies also do not have your best interest at heart.  We plan to allow your dealership to advertise your entire inventory to our users for a fee that is a fraction of what you are currently paying.  Look for a launch in Summer of 2021.  If you would like to be notified when we launch, please fill out the form below.";
                  case "Apartments": return "Need to advertise an apartment for rent, we are going to accept all apartment listings from apartment complexes to individuals.  We will start off as a free listing service and once we have gained market traction, apartment complexes will pay a minimal fee to advertise. Look for a launch in Summer of 2021.  If you would like to be notified when we launch, please fill out the form below.";
                  case "Homes": return "Realtors and individuals will be allowed to list homes on our site.  We will start off as a free listing service and once we have gained market traction, sellers will pay a minimal fee to advertise.  Look for a launch in Summer of 2021.  If you would like to be notified when we launch, please fill out the form below.";
                  case "Vacation": return "Have a vacation property you would like to advertise?  We plan to launch a listing and reservation tool by Summer of 2021.  Our fees will be a fraction of the fees you are currently paying with traditional listing services.  If you would like to be notified when we launch, please fill out the form below.";
                  case "Jobs": return "Employers and applicants are going to love our job listing service!  Go ahead and create a company profile on Life Widgets and we will notify you when our jobs widget launches in Summer of 2021.";
                  case "Advertising": return "Life Widgets advertising is going to be easy to setup and we plan to maximize your ROI in a way never seen before.  Stay tuned for a solution that is going to get change the way you think about advertising.  Go ahead and create a company profile on Life Widgets and we will notify you when our advertising launches in Spring/Summer of 2021.";
                  case "Events": return "The Life Widgets event planner will let businesses and individuals create events of any size.  Want to sell tickets to your event, not a problem, we will be offering a system that will be tied directly to our money transfer application.  Look for a launch in Summer of 2021.";
                  case "Calendar": return "The Life Widgets calendar will encompass all social and business needs of our user base.  Look for a launch in Spring of 2021.";
                  case "Social_Seller": return "The Life Widgets social seller program will be a unique way for businesses and social influencers to connect for the sole purpose of creating sales.  Look for a launch in Summer of 2021.  In the meantime, future socials sellers should be building their friend network as businesses will be looking to do business with those who have a large friend base.";
                  case "MyCRM": return "The Life Widgets CRM platform will be a unique and customized for each business segment.  As we launch different widgets, each business segment will be provided with an easy-to-use tool that will allow your business to interact with potential clients as they connect with you through the life Widgets application.  This widget will be launching throughout 2021.";
                  }
            })()}
            </Text>
              <TextInput
                multiline
                placeholder="Feedback or Suggestions"
                style={styles.textInput}
                onChangeText={this.setFeedbackData}
              />
              <TouchableOpacity style={styles.fillBtn} disabled={true} >
                 <Button color="white" title="Send" onPress={this.submitFeedBack.bind(this)}/>
               </TouchableOpacity>
          </View>
              </KeyboardAvoidingView>
          </ScrollView>

      );
  }
}

export default CommingSoon;
