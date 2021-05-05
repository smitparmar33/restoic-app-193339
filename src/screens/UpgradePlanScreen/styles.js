import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  pageContainer: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    position: 'relative',
  },
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 24,
    padding: 4,
    zIndex: 1000,
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 120,
  },
  title: {
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 18,
    marginTop: 5,
    letterSpacing: -0.17,
  },
  benefitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  benefitDesc: {
    maxWidth: 280,
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 10,
  },
  benefitIcon: {
    marginRight: 21,
  },
  planWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  planBox: {
    width: 154,
    height: 219,
    margin: 5,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  planBoxAnnually: {
    height: 244,
  },
  planBoxDesc: {
    paddingTop: 33,
    paddingHorizontal: 15,
  },
  planValue: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#E83A1F',
    alignItems: 'center',
  },
  planValueText: {
    color: '#FFFFFF',
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
    width: '100%',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBoxTitle: {
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
  },
  planTitle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 12,
    color: '#90A0AF',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  planPrice: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  planDesc: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  activeTitle: {
    color: '#E83A1F',
  },
  activeDesc: {
    color: '#E83A1F',
  },
  planDescAnnually: {
    marginTop: 10,
  },
  activeBorder: {
    borderColor: '#E83A1F',
  },
  activeBackground: {
    backgroundColor: '#E83A1F',
  },
  infoBox: {
    marginBottom: 15,
  },
  infoDesc: {
    color: '#90A0AF',
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 12,
    marginVertical: 5,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
  },
});