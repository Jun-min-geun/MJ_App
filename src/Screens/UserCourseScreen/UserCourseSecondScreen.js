import {
  Keyboard,
  StyleSheet,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { useNavigation, useRoute  } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button, Overlay, Icon, Input, BottomSheet, ListItem} from '@rneui/themed';
import { AuthRoutes } from '../../Navigations/routes';

const UserCourseSecondScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const dataReceived = route.params?.data || {};
  const [year, setYear] = useState(dataReceived.years);
  const [semester, setSemester] = useState(dataReceived.semesters);
  const [visible, setVisible] = useState(false);
  const [visibleGrade, setVisibleGrade] = useState(false);
  const [grade, setGrade] = useState("--");

      const [data, setData] = useState([]);


const toggleOverlay = () => {
  setVisible(!visible);
};

const toggleOverlayGrade = () => {
  setVisibleGrade(!visibleGrade);
};

useEffect( () => {

  axios.get(`http://192.168.200.128:8080/user/user/device/${Constants.installationId}`)
.then(response => {
  const userId = response.data.data.userId;

  console.log(userId);
  
  axios.get(`http://192.168.200.128:8080/grade/${userId}/1/1학기`)
  .then(response => {
    const data = response.data;
    console.log(data);
    const objects = [];
    console.log("됨");
  })
  .catch(error => {
    console.log(error.response.data)
    
    console.log("안됨");
  });

})
.catch(error => {
  console.log(error);
});
})

  // function CreditScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled={false}
      behavior={Platform.select({ ios: 'padding' })}
    >
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.timetable}>
            <View style={styles.timetablename}>
              <Text style={styles.timetablenametext}>{year}학년 {semester}학기 시간표</Text>
            </View>
            <View style={styles.timetablecourse}>

                  <View
                  style={[
                    styles.contentBackground,
                    styles.totalCredit,
                    styles.rowWrapper,
                  ]}
                  >
                    <Text numberOfLines={1} style={styles.CurrentCreditTitle}>절차적사고와 프로그래밍</Text>
                    <Text style={styles.CurrentCreditdetail}>3학점</Text>
                    <TouchableOpacity style={styles.button} onPress={toggleOverlayGrade}>
                      <Text style={styles.buttonText}>{grade}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* {data.map((item) => (
                  <View
                  style={[
                    styles.contentBackground,
                    styles.totalCredit,
                    styles.rowWrapper,
                  ]}
                  >
                    <Text numberOfLines={1} style={styles.CurrentCreditTitle}>{item.courseName}</Text>
                    <Text style={styles.CurrentCreditdetail}>{item.credit}</Text>
                    <TouchableOpacity style={styles.button} onPress={toggleOverlayGrade}>
                      <Text style={styles.buttonText}>{item.grade}</Text>
                    </TouchableOpacity>
                  </View>
                ))} */}

            </View>
              <Button
                  title="강의 추가하기"
                  buttonStyle={{
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                  }}
                  containerStyle={{
                    width: wp('90%'),
                    height: hp('9%'),
                  }}
                  titleStyle={{ fontWeight: 'bold' }}
                  onPress={toggleOverlay}
                />
              <Overlay overlayStyle={{ width: wp('90%')}} isVisible={visible} onBackdropPress={toggleOverlay}>
              <Input placeholder='강의 제목 입력'/>
              <Input placeholder='학점 입력'/>
              <Button
                buttonStyle={{
                  backgroundColor: 'black',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                }}
                title="저장하기"
                onPress={toggleOverlay}
              />
            </Overlay>
            <Button
                  title="되돌아가기"
                  buttonStyle={{
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                  }}
                  containerStyle={{
                    width: wp('90%'),
                    height: hp('9%'),

                  }}
                  titleStyle={{ fontWeight: 'bold' }}
                  onPress={() => navigation.navigate(AuthRoutes.USERTIMETABLE, {data: { years: 1,
                    semesters: 1}})}
                />
          </View>
{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Overlay overlayStyle={{ width: wp('90%')}} isVisible={visibleGrade} onBackdropPress={toggleOverlayGrade}>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-stars'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>A+</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-hearts'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>A</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-squint'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>A-</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-wink'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>B+</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
             name='grin-alt'
             type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>B</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
             name='grin'
             type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>B-</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-squint-tears'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>C+</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-tears'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>C</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-beam-sweat'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>C-</Text>
            </View>
            </TouchableOpacity><TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-tongue-wink'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>D+</Text>
            </View>
            </TouchableOpacity><TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grin-tongue'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>D</Text>
            </View>
            </TouchableOpacity><TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='grimace'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>D-</Text>
            </View>
            </TouchableOpacity><TouchableOpacity>
            <View style={styles.vertical}>
              <Icon style={styles.Icon}
              name='ghost'
              type='font-awesome-5'
              color='black'
              />
              <Text style={styles.gradeText}>F</Text>
            </View>
            </TouchableOpacity>
            </Overlay>
{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        </View>
      </Pressable>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 'auto',
  },
  timetablename: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:  hp('3%'),
    width: wp('90%'),
    height: hp('5%'),
    borderBottomWidth: 1,
    paddingBottom: hp('2%')
  },
  timetablenametext: {
    fontSize: 20,
    fontWeight: '700',
  },
  timetable: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('90%'),
  },
  timetablecourse: {
    alignItems: 'center',
    minHeight: hp('60%'),
    maxHeight: hp('60%'),
    width: wp('90%'),
    marginVertical: hp('2%'),
    borderBottomWidth: 1
  },
  CurrentCreditTitle: {
    right: wp('16%'),
    fontSize: 20,
    fontWeight: '700',
    maxWidth:  wp('40%'),
  },
  CurrentCreditdetail: {
    right: wp('6%'),
    fontSize: 20,
    fontWeight: '700',
    maxWidth:  wp('20%'),
  },
  buttonText: {
    right: wp('-10%'),
    fontSize: 20,
    fontWeight: '900',
    maxWidth:  wp('20%'),
  },
  contentBackground: {
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1
  },
  totalCredit: {
    top: hp('2%'),
    width: wp('90%'),
    height: hp('8%'),
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWrapper: {
    flexDirection: 'row',
  },
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f6f6f6',
    height: hp('5%'),
  },
  gradeText: {
    right:  wp('0%'),
    fontSize: 20,
    fontWeight: 'bold'
  },
  
});
export default UserCourseSecondScreen;
