import React, {useState, useEffect, createRef} from 'react';
import {View, SafeAreaView, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {AppText} from '../components';

import {
  AppInput,
  AppDropdown,
  AppButton,
  AppHeader,
  AppSheet,
  AppCheckBox,
  AppRadioBox,
  AppLoader,
} from '../components';
import {userSelector, tokenSelector, updateUser, updateImage} from '../redux/user';
import {getSports, sportsSelector} from '../redux/sports';
import Icon from '../assets/icons';

const EditAccount = ({navigation}) => {
  const dispatch = useDispatch();
  const sportsRef = createRef();
  const competitionRef = createRef();

  const token = useSelector(tokenSelector);
  const userData = useSelector(userSelector);
  const sportsEnum = useSelector(sportsSelector);

  useEffect(() => {
    dispatch(getSports(token));
  }, []);

  const {competition, first_name, last_name, sports, image} = userData || {};
  const [competitionLevel, setCompetition] = useState(competition || '');
  const [firstName, setFirstName] = useState(first_name || '');
  const [lastName, setLastName] = useState(last_name || '');
  const [newImage, setNewImage] = useState(image || '');
  const [imageLoader, setImageLoader] = useState(false);
  const [newSports, setNewSports] = useState(sports || []);

  const isNameChanged = first_name !== firstName;
  const isLastNameChanged = last_name !== lastName;
  const isCompetitionChanged = competition !== competitionLevel;
  const isSportsChanged = !!sports
    .filter((x) => !newSports.includes(x))
    .concat(newSports.filter((x) => !sports.includes(x))).length;
  const isImageChanged = image !== newImage;

  const containImage = !!newImage && !!!newImage.includes('default.jpg');

  const isButtonDisabled =
    !isNameChanged && !isLastNameChanged && !isCompetitionChanged && !isImageChanged && !isSportsChanged;
  const isInfoChanged = isImageChanged || isNameChanged || isLastNameChanged || isCompetitionChanged || isSportsChanged;

  const onSaveClick = () => {
    try {
      let obj = {};
      if (isSportsChanged) obj.sports = newSports.join(', ');
      if (isImageChanged) {
        dispatch(updateImage({image: newImage, token}));
      }
      if (isNameChanged) obj.firstName = firstName;
      if (isLastNameChanged) obj.lastName = lastName;
      if (isCompetitionChanged) obj.competition = competitionLevel;
      if (isInfoChanged) dispatch(updateUser({...obj, token}));
      return;
    } catch (e) {
      console.warn(e);
    }
  };

  ////////////////// IMAGE //////////////////

  const launchImageLibrary = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    setImageLoader(true);
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setImageLoader(false);
      } else if (response.error) {
        setImageLoader(false);
      } else if (response.customButton) {
        setImageLoader(false);
      } else {
        setNewImage(response.uri);
        setImageLoader(false);
      }
    });
  };
  ////////////////// IMAGE //////////////////

  const handleSportPress = (id, label, action) => {
    if (action) {
      setNewSports((oldArr) => [...oldArr, id]);
    } else {
      setNewSports((oldArr) => oldArr.filter((item) => item !== id));
    }
  };
  const handleCompetitionPress = (id) => setCompetition(id.toString());
  const printSports = () => {
    const newArray = newSports.reduce((acc, curr) => {
      const sport = sportsEnum.length && sportsEnum.find((item) => item.id === curr);
      return acc.concat(sport.sport);
    }, []);
    if (newSports.length > 3) {
      return `${newArray.splice(0, 3).join(', ')}...`;
    } else return newArray.join(', ');
  };

  const loader = imageLoader;
  if (loader) return <AppLoader />;

  return (
    <>
      <SafeAreaView>
        <AppHeader title="edit profile" navigation={navigation} />
        <View style={styles.pageContainer}>
          <ScrollView>
            <View>
              <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={launchImageLibrary}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      style={[containImage && {width: '100%', height: '100%'}]}
                      source={containImage ? {uri: newImage} : require('../assets/images/camera.png')}
                    />
                  </View>
                </TouchableOpacity>
                <AppText style={styles.addChangePhotoLabel}>{`${containImage ? 'Change photo' : 'Add photo'}`}</AppText>
              </View>
              <>
                <AppInput
                  placeholder="First name"
                  label="First name"
                  value={firstName}
                  onChange={(value) => setFirstName(value)}
                />
                <AppInput
                  placeholder="Last name"
                  label="Last name"
                  value={lastName}
                  onChange={(value) => setLastName(value)}
                />
                <AppDropdown
                  onPress={() => sportsRef.current.snapTo(0)}
                  label="Your sport"
                  valueLabel="Select your sport"
                  value={printSports()}
                />
                <AppDropdown
                  onPress={() => competitionRef.current.snapTo(0)}
                  label="Competition level"
                  valueLabel="Competition level"
                  value={COMPETITION_ENUM[competitionLevel]}
                />
              </>
            </View>
            <AppButton container={{marginBottom: 20}} disabled={isButtonDisabled} label="save" onPress={onSaveClick} />
          </ScrollView>
        </View>
      </SafeAreaView>
      <AppSheet
        children={sportsSheet(sportsRef, sportsEnum, newSports, handleSportPress)}
        snapPoints="95%"
        refTest={sportsRef}
      />
      <AppSheet
        children={competitionSheet(competitionRef, competitionLevel, handleCompetitionPress)}
        snapPoints="70%"
        refTest={competitionRef}
      />
    </>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  avatarWrapper: {
    backgroundColor: 'rgba(144, 160, 175, 0.25)',
    height: 96,
    width: 96,
    borderRadius: 96 / 2,
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pageContainer: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    height: '90%',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  addChangePhotoLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 27,
  },
});

const COMPETITION_ARRAY = [
  {id: 1, label: 'High School'},
  {id: 2, label: 'College'},
  {id: 3, label: 'Professional'},
  {id: 4, label: 'Recreational'},
  {id: 5, label: 'Other'},
];

const COMPETITION_ENUM = {
  1: 'High School',
  2: 'College',
  3: 'Professional',
  4: 'Recreational',
  5: 'Other',
};

const sportsSheet = (sportsRef, sportsEnum, sportsIds, handleSportPress) => (
  <View style={{padding: 20, paddingBottom: 50, justifyContent: 'space-between', height: '100%'}}>
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 32,
        marginBottom: 20,
      }}>
      <TouchableOpacity onPress={() => sportsRef.current.snapTo(1)}>
        <Image source={Icon.close} />
      </TouchableOpacity>
      <AppText style={{fontSize: 18, fontWeight: '600', textTransform: 'uppercase'}}>Select your sport</AppText>
      <View></View>
    </View>
    <ScrollView
      persistentScrollbar={true}
      style={{paddingRight: 10, marginBottom: 40}}
      showsVerticalScrollIndicator={true}>
      {(sportsEnum || []).map((item, key) => (
        <AppCheckBox
          labelKey="sport"
          key={key}
          onPress={handleSportPress}
          item={item}
          checked={sportsIds?.find((id) => id === item.id)}
        />
      ))}
    </ScrollView>
    <AppButton label="apply" onPress={() => sportsRef.current.snapTo(1)} />
  </View>
);

const competitionSheet = (competitionRef, competitionLevel, handleCompetitionPress) => (
  <View
    style={{
      padding: 20,
      paddingBottom: 50,
      justifyContent: 'space-between',
      height: '100%',
    }}>
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 32,
        marginBottom: 20,
      }}>
      <TouchableOpacity onPress={() => competitionRef.current.snapTo(1)}>
        <Image source={Icon.close} />
      </TouchableOpacity>
      <AppText style={{fontSize: 18, fontWeight: '600', textTransform: 'uppercase'}}>Competition level</AppText>
      <View></View>
    </View>
    <ScrollView
      persistentScrollbar={true}
      style={{paddingRight: 10, marginBottom: 40}}
      showsVerticalScrollIndicator={true}>
      {(COMPETITION_ARRAY || []).map((item, key) => (
        <AppRadioBox key={key} onPress={handleCompetitionPress} item={item} checked={competitionLevel == item.id} />
      ))}
    </ScrollView>
    <AppButton label="apply" onPress={() => competitionRef.current.snapTo(1)} />
  </View>
);
