import React, { useEffect, useState } from 'react'

import axios from 'axios';

import ListPlaylist from "./ListPlaylist";


function Profile() {
    const userId = localStorage.getItem("userId");
    // console.log("id" + userId);
    const [userData, setUserData] = useState({});
    const [playListData, setPlayListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9000/api/users/getprofile", { params: { id: userId } });
                setUserData(response.data);  // Update state with fetched data
                const playlistRes = await axios.get(`http://localhost:9000/api/playlist/${userId}`);
                setPlayListData(playlistRes.data);
                // console.log(playlistRes)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userId]); 



   
// //    console.log(userData);
//    console.log(playListData);
  return (
    <div>
        <div>
            Name:{userData.name};
            Email:{userData.email}
            <div className='playlist-container'>
                <h3>Playlists:</h3>
                 {/* {playListData.map((list) => (
                    list.movies.map((movieId) => (
                        <ListPlaylist key={movieId} id = {movieId}/>
                    ))
                 ))} */}
            </div>
        </div>
    </div>
  )
}

export default Profile