// import React, {useState, useEffect, useContext} from 'react';
// import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
// import {
//   View,
//   Platform,
//   SafeAreaView,
//   TouchableOpacity,
//   // TouchableHighlight,
//   Text,
//   StyleSheet,
//   Dimensions,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {Icon} from 'react-native-elements';
// import {UserDataContext} from '../../App';

// import AppButton from './AppButton';
// import CheckBox from '@react-native-community/checkbox';
// import {updateInfo, uploadImage, updateSports} from '../services/user';

// const SelectSportMenu = (props) => {
//   const {userData, setUserData, loadUserData} = useContext(UserDataContext);

//   const {toggleCheckboxSport, sports, selectedSports, onClose, onApplyChanges, isCreateAccount} = props;
//   const sporstFormModel = sports.map((sprt) => {
//     if (
//       Array.isArray(selectedSports) &&
//       selectedSports.length > 0 &&
//       selectedSports.some((slsprt) => slsprt.sport.id === sprt.id)
//     ) {
//       return {id: sprt.id, sport: sprt.sport, value: true};
//     }
//     return {id: sprt.id, sport: sprt.sport, value: false};
//   });
//   const [toggleCheckBox, setToggleCheckBox] = useState(false);
//   const [formSports, setformSports] = useState(sporstFormModel);
//   console.log('selectedSports');
//   console.log(selectedSports);
//   useEffect(() => {
//     setformSports(sporstFormModel);
//   }, [sports, selectedSports]);
//   return (
//     <View style={styles.container}>
//       <View style={styles.menuHeaderContainer}>
//         <View
//           style={{
//             position: 'absolute',
//             left: 0,
//             top: 8,
//             zIndex: 102,
//             // backgroundColor: 'pink',
//           }}>
//           <TouchableOpacity onPress={onClose}>
//             <Icon
//               name="close-sharp"
//               type="ionicon"
//               color="black"
//               size={42}
//               // containerStyle={{position: 'absolute', left: 0, top: 8}}
//             />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.menuTitle}> Select your sport </Text>
//       </View>
//       <ScrollView style={styles.menuListContainer}>
//         {formSports.map((sport, index) => {
//           return (
//             <View key={sport.id} style={{marginRight: 5}}>
//               <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
//                 <Text style={styles.itemTitle}> {sport.sport} </Text>
//                 <TouchableWithoutFeedback
//                   onPress={() => {
//                     // console.warn(newValue);
//                     // console.log(newValue);
//                     const copy = [...formSports];
//                     copy[index].value = !copy[index].value;
//                     setformSports(copy);
//                   }}>
//                   <CheckBox
//                     // android styling:
//                     tintColors={{true: 'black'}}
//                     // ios styling
//                     onCheckColor={'black'}
//                     onFillColor={'black'}
//                     onTintColor={'black'}
//                     disabled={false}
//                     value={!!sport.value}
//                     // onValueChange={(newValue) => {
//                     //   console.warn(newValue);
//                     //   console.log(newValue);
//                     //   setformSports(formSports.splice(1, index, {id: sport.id, value: !newValue}));
//                     // }}
//                     // onChange={(newValue) => {
//                     //   console.warn(newValue);
//                     //   console.log(newValue);

//                     // }}
//                     // value={toggleCheckBox}
//                     // onValueChange={(newValue) => setToggleCheckBox(!newValue)}
//                   />
//                 </TouchableWithoutFeedback>
//               </View>
//               <Line />
//             </View>
//           );
//         })}
//       </ScrollView>
//       <View style={{marginBottom: 32, marginTop: 32}}>
//         {/* <AppButton onPress={() => onApplyClicked && onApplyClicked()} label={'apply'} /> */}
//         <AppButton
//           onPress={async () => {
//             try {
//               const selectedSportIds = formSports.filter((sp) => sp.value).map((sp) => sp.id);
//               console.log('selectedSportIds');
//               console.log(selectedSportIds);
//               // const toBeAddedSportIds = selectedSportIds.filter(
//               //   (sportId) => !selectedSports.map((pref) => pref.sport).some((sport) => sport.id === sport),
//               //   );
//               const previousSportIds =
//                 selectedSports.length > 0 ? selectedSports.map((pref) => pref.sport).map((sport) => sport.id) : [];
//               console.log('previousSportIds');
//               console.log(previousSportIds);
//               let toBeAddedSportIds = selectedSportIds.filter((x) => !previousSportIds.includes(x));
//               console.log('toBeAddedSportIds');
//               console.log(toBeAddedSportIds);
//               const toBeDeletedSportPreferenceIds = selectedSports
//                 .filter((sport) => !selectedSportIds.some((id) => sport.sport.id === id))
//                 .map((sport) => sport.id);
//               console.log('toBeDeletedSportPreferenceIds');
//               console.log(toBeDeletedSportPreferenceIds);

//               onClose();
//               if (onApplyChanges) {
//                 await onApplyChanges({toBeAddedSportIds, toBeDeletedSportPreferenceIds});
//               }
//             } catch (e) {
//               console.log('udpate sports error');
//               console.log(e);
//             }
//           }}
//           label={'apply'}
//         />
//       </View>
//     </View>
//     // <View />
//   );
// };

// // const SelectSportMenu = () => {};

// export default SelectSportMenu;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   menuTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     lineHeight: 27,
//     textAlign: 'center',
//     textTransform: 'uppercase',
//     color: '#000000',
//     // flex: 1,
//     // width:
//   },
//   menuHeaderContainer: {
//     // flexDirection: 'row',
//     height: 60,
//     justifyContent: 'center',
//     marginBottom: 32,
//     // flex: 1,
//   },
//   menuListContainer: {
//     flex: 1,
//     // backgroundColor: 'pink',
//   },
//   itemTitle: {
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//     fontSize: 16,
//     lineHeight: 18,
//     color: '#000000',
//   },
// });

// const Line = () => (
//   <View
//     style={{
//       height: 24,
//       width: '100%',
//       justifyContent: 'center',
//     }}>
//     <View
//       style={{
//         height: 1,
//         left: 4,
//         right: 4,
//         backgroundColor: 'rgba(144, 160, 175, 0.25)',
//       }}
//     />
//   </View>
// );
