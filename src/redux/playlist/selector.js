export const playlistSelector = (state) => state.playlist.playlist;

export const currentTrackSelector = (state) =>
  state.playlist.playlist.find((item) => item.id === state.playlist.currentTrack) || null;

export const nextTrackSelector = (state) => {
  const current = currentTrackSelector(state);
  const playlist = playlistSelector(state);
  const index = playlist.indexOf(current);
  return playlist[index + 1];
};
