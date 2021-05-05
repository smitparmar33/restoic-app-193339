import {writeFile, unlink, readFile, downloadFile, path} from './rnfs';

const downloadTrack = (track, started, progress, finished, error) => {
  const {url, thumbnail, id, small_thumbnail} = track;
  console.log('small_thumbnail :>> ', small_thumbnail);
  //download track
  downloadFile(url, `${id}.mp3`, started, progress, finished, error);
  downloadFile(thumbnail, `${id}.png`, started, progress, () => {}, error);
  downloadFile(small_thumbnail, `small_${id}.png`, started, progress, () => {}, error);

  //   //set track with downloaded links
  const newTrack = {
    ...track,
    ...{thumbnail: path(`${id}.png`)},
    ...{small_thumbnail: path(`small_${id}.png`)},
    ...{url: path(`${id}.mp3`)},
  };

  //get downloaded list
  readFile(
    'downloaded_list',
    (get_list) => {
      a(get_list);
    },
    () => {
      a();
    },
  );
  const a = (get_list) => {
    let parsed_list = [];
    if (get_list) {
      parsed_list = JSON.parse(get_list);
    }
    //add new track
    parsed_list.push(newTrack);

    //stringify list
    const stringify_list = JSON.stringify(parsed_list);

    //set new list
    writeFile('downloaded_list', stringify_list, finished);
  };
  //parse list
};

const getList = (action) => {
  readFile('downloaded_list', (data) => {
    action(data);
  });
};

//////////////////////////////////////////////////////////

const downloadList = (array, onFinish, id = 0) => {
  if (id < array.length) {
    downloadTrack(
      array[id],
      () => {},
      () => {},
      () => {
        downloadList(array, onFinish, id + 1);
        onFinish && onFinish(id + 1);
      },
      () => {},
    );
  } else {
    console.log('DOWNLOAD CATEGORY FINISHED');
  }
};

export {downloadTrack, getList, downloadList, removeTract};

const removeTract = (trackId, finished) => {
  unlink(`${trackId}.mp3`);
  unlink(`${trackId}.png`);
  unlink(`small_${trackId}.png`);
  readFile(
    'downloaded_list',
    (get_list) => {
      callback(get_list);
    },
    () => {
      callback();
    },
  );
  const callback = (get_list) => {
    let parsed_list = [];
    if (get_list) {
      parsed_list = JSON.parse(get_list);
    }
    const new_list = parsed_list.filter((item) => item.id.toString() !== trackId.toString());
    const stringify_list = JSON.stringify(new_list);

    writeFile('downloaded_list', stringify_list);
    finished && finished();
  };
};
