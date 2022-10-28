import { useState, useEffect } from "react";
import axios from "axios";

export const useProfileVisibility = (signedInUserId, otherUserId) => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [error, setError] = useState(false);
  const [canViewProfile, setCanViewProfile] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRes = await axios.get(`/api/users/${otherUserId}`);
        const profileRes = await axios.get(`/api/profile/${otherUserId}`);
        setUser(userRes.data);
        setProfile(profileRes.data);

        if (profile.isPrivate) {
          user.followers.map((u, i) => {
            if (u === signedInUserId) {
              setCanViewProfile(false);
              return;
            }
          });
        }
      } catch (err) {
        setError(true);
      }
    };
    getUser();
  }, [otherUserId]);

  return { error, canViewProfile };
};
