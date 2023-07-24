export const addFavorite = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"))["jwtToken"];
      const url = `${process.env.REACT_APP_API_BASE_URL}/users/favorite/${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("An error occurred while retrieving the playlist:", error);
    }
  };
  