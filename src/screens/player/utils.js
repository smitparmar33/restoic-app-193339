//   const toggleFavoriteTrack = useCallback(() => {
//     if (nowPlaying === undefined) {
//       return;
//     }
//     setUpdatingFavorite(true);
//     AsyncStorage.getItem('@token').then((value) => {
//       fetch('https://restoic-app-19339.botics.co/api/v1/favorites/', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Token ${value}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           track: nowPlaying.id,
//         }),
//       })
//         .then((response) => {
//           console.log(nowPlaying);
//           if (response.status === 201) {
//           } else {
//             setIsFavorite(!isFavorite);
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//           setIsFavorite(!isFavorite);
//         })
//         .finally(() => {
//           setUpdatingFavorite(false);
//         });
//     });
//   }, [nowPlaying, tracks, index, isFavorite, setIsFavorite, setUpdatingFavorite]);
