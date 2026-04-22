export const getAverageRatingService = async (vehicleId) => {
  const url = `http://localhost:4000/api/user/AverageRating/${vehicleId}`;

  try {
    const unFormattedResponse = await fetch(url);

    if (!unFormattedResponse.ok) {
      if (unFormattedResponse.status === 404) {
        console.error(`Vehicle with ID ${vehicleId} not found`);
        return null;
      }

      throw new Error(`HTTP error! Status: ${unFormattedResponse.status}`);
    }

    const response = await unFormattedResponse.json();

    return response.data?.averageRating || null;
  } catch (error) {
    console.error("Error fetching average rating:", error);
    return null;
  }
};
