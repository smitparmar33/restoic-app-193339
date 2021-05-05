import RNFS from 'react-native-fs';

const path = (url) => `${RNFS.DocumentDirectoryPath}/${url}`;

const writeFile = (url, text) => {
  RNFS.writeFile(path(url), text, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!', success);
    })
    .catch((err) => {
      console.log('RNFS ERROR', err.message);
    });
};

const readFile = (url, success, error) => {
  RNFS.readFile(path(url), 'utf8')
    .then((data) => {
      success && success(data);
    })
    .catch((err) => {
      error && error(err);
    });
};

const unlink = (url, success, error) => {
  console.log('url :>> ', url);
  RNFS.unlink(url)
    .then((data) => {
      success && success(data);
      console.log('data :>> ', data);
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log('err :>> ', err);
      error && error(err);
    });
};

const unlinkAll = () => {
  readDir((data) => {
    data.map((item) => {
      console.log('item.path :>> ', item.path);
      return unlink(item.path);
    });
  });
};

const downloadFile = (fromUrl, toFile, started, progress, finished, error) => {
  RNFS.downloadFile({
    fromUrl: fromUrl,
    toFile: path(toFile),
    begin: (res) => started && started(res),
    progress: (res) => progress && progress(res),
  })
    .promise.then((data) => {
      finished && finished(data);
    })
    .catch((err) => {
      error && error(err);
    });
};

const readDir = (success) => {
  RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((data) => {
      success && success(data);
    })
    .catch((err) => {
      error('readDir err', err);
    });
};

export {writeFile, unlink, readFile, downloadFile, path, readDir, unlinkAll};
