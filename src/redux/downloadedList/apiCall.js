import {createAsyncThunk} from '@reduxjs/toolkit';
import RNFS from 'react-native-fs';

import {processError, processResponse} from '../../services/apiHelper';

const path = (url) => `${RNFS.DocumentDirectoryPath}/${url}`;

export const getDownloads = createAsyncThunk('downloads', async () => {
  console.log('test :>> ');
  return RNFS.readFile(path('downloaded_list'), 'utf8')
    .then((response) => {
      console.log('response eeeee:>> ', response);
      const parseData = JSON.parse(response);
      const formattedData = parseData.map((item) => {
        return {...item, url: `file://${item.url}`};
      });
      return {
        statusCode: 0,
        data: formattedData,
      };
    })
    .catch((error) => {
      console.log('errorssss :>> ', error);
      return processError(error);
    });
});

// useEffect(() => {
//     getList((data) => {
//       const parseData = JSON.parse(data);
//       const formattedData = parseData.map((item) => {
//         return {...item, url: `file://${item.url}`};
//       });
//       dispatch(addList(formattedData));
//     });
//   }, [downloadTrigger]);
