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
// import RadioButtonRN from 'radio-buttons-react-native';

// const competitionLevelMap = [
//   // {id: '0', label: 'Choose Competition Level'},
//   {id: '1', label: 'High School'},
//   {id: '2', label: 'College'},
//   {id: '3', label: 'Professional'},
//   {id: '4', label: 'Recreational'},
//   {id: '5', label: 'Other'},
// ];

// const SelectCompetitionLevelMenu = (props) => {
//   const {onClose, onApplyClicked, updateInfo, isCreateAccount, competitionId} = props;
//   const {userData, setUserData, loadUserData} = useContext(UserDataContext);
//   console.log('userData.competition');
//   console.log(userData.competition);
//   const [formCompLevelId, setformCompLevelId] = useState(null);
//   const [newCompLevelId, setnewCompLevelId] = useState(null);

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
//         <Text style={styles.menuTitle}> Competition level </Text>
//       </View>
//       <ScrollView style={styles.menuListContainer}>
//         {(userData.competition || isCreateAccount) && (
//           <RadioButtonRN
//             activeColor={'black'}
//             initial={isCreateAccount ? 1 : Number(userData.competition)}
//             data={competitionLevelMap}
//             // selectedBtn={(e) => console.log(e)}
//             selectedBtn={(e) => setnewCompLevelId(Number(e.id))}
//           />
//         )}
//         {competitionId && (
//           <RadioButtonRN
//             activeColor={'black'}
//             initial={competitionId}
//             data={competitionLevelMap}
//             // selectedBtn={(e) => console.log(e)}
//             selectedBtn={(e) => setnewCompLevelId(Number(e.id))}
//           />
//         )}
//       </ScrollView>

//       <View style={{marginBottom: 32, marginTop: 32}}>
//         {/* <AppButton onPress={() => onApplyClicked && onApplyClicked()} label={'apply'} /> */}
//         <AppButton
//           onPress={async () => {
//             try {
//               onClose();
//               if (onApplyClicked) {
//                 await onApplyClicked({newCompLevelId});
//               }
//             } catch (e) {
//               console.log('error');
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

// export default SelectCompetitionLevelMenu;

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
