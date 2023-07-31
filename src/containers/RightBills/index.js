import * as React from 'react';
import { Text, View,  ScrollView } from 'react-native';
import styles from './styles';



class RightBills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrolledview}> 
              <Text style={styles.heading}>Life Widgets Bill of Rights</Text>
              <View style={styles.listContainer}>
                <View style={styles.list}>
                  <Text style={styles.text}>1.</Text>
                  <Text style={[styles.text,styles.rulesText]}>We will never sell your data to any person, company, or entity! </Text>
                </View>
                <View style={styles.list}>
                  <Text style={styles.text}>2.</Text>
                  <Text style={[styles.text,styles.rulesText]}>We strongly believe in the United States Constitutional First Amendment that allows free speech and will never censor your voice or opinions. However, we will not tolerate hate groups, threats, racism, sexual harassment or bullying. Nor will we tolerate nudity, solicitation of prostitution, redirects to pornographic material, and the endangerment of underage individuals.  Those breaking this rule will be warned and could face possible banishment. Life Widgets will also fully cooperate with law enforcement should any acts become criminal.</Text>
                </View>

                <View style={styles.list}>
                  <Text style={styles.text}>3.</Text>
                  <Text style={[styles.text,styles.rulesText]}>Our goal is to help you stay connected with the people who matter in your life, but it is not our goal to keep you addicted to our software.  We will often encourage you to logout and focus on the people around you.  </Text>
                </View>

                <View style={styles.list}>
                  <Text style={styles.text}>4.</Text>
                  <Text style={[styles.text,styles.rulesText]}>We dislike third party companies who charge an exorbitant fee to interject themselves between customers and businesses.  We will be releasing widgets that focus on connecting consumers and businesses for a fee that is a fraction of what others may charge.</Text>
                </View>


                <View style={styles.list}>
                  <Text style={styles.text}>5.</Text>
                  <Text style={[styles.text,styles.rulesText]}>You have a right to your political and religious affiliations; we just ask that you respect the rights of those who do not align with yours.  We are all part of one big community, let us put forth an effort to get along with one another. The media and politicians will continue attempting to divide us, but our community can help conquer that agenda.</Text>
                </View>

                <View style={styles.list}>
                  <Text style={styles.text}>6.</Text>
                  <Text style={[styles.text,styles.rulesText]}>We will never listen to your conversations, track you, or build marketing profiles based on your online habits.</Text>
                </View>

                <View style={styles.list}>
                  <Text style={styles.text}>7.</Text>
                  <Text style={[styles.text,styles.rulesText]}>Should you ever decided to leave our platform, we will provide you with a button to download your data and delete your account.</Text>
                </View>

                <View style={styles.list}>
                  <Text style={styles.text}>8.</Text>
                  <Text style={[styles.text,styles.rulesText]}>We will do everything in our power to keep your data securely protected.  In the event of an unforeseen data breach, we will notify you immediately should a breach occur.</Text>
                </View>

                <View style={styles.list}>
                  <Text style={styles.text}>9.</Text>
                  <Text style={[styles.text,styles.rulesText]}>We welcome your comments and suggestions.  Our goal is to provide our users with a superior platform that makes your life easier and more enjoyable!</Text>
                </View>

                <View style={styles.list}>
                  <Text style={styles.text}>10.</Text>
                  <Text style={[styles.text,styles.rulesText]}>As Life Widgets expands, we will keep you informed of any changes to our platform and how those changes may affect you.  This platform was built by ordinary people who have grown tired of greedy big tech corporations.  Big Tech has forgotten that each of us is important and that we matter. Life Widgets is your opportunity to help change big tech forever.  We welcome you to our community and we will always have your best interest at heart!</Text>
                </View>
              </View>
         
          </ScrollView>
        </View>
      );
  }
}

export default RightBills;