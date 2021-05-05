export const downloadedListSelector = (state) => state.downloadedList.list;
export const checkIsTrackDownloaded = (id) => (state) =>
  !!state.downloadedList.list.find((item) => item?.id?.toString() === id?.toString());
export const downloadLoadingSelector = (state) => state.downloadedList.loading;
