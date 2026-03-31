export const getAverageRatingService = async (vehicleId) => {
  // Updated URL to use route parameter
  const url = `http://localhost:4000/api/user/AverageRating/${vehicleId}`;

  try {
    const unFormattedResponse = await fetch(url);

    // Check if the response is not okay
    if (!unFormattedResponse.ok) {
      // Handle 404 error specifically
      if (unFormattedResponse.status === 404) {
        console.error(`Vehicle with ID ${vehicleId} not found`);
        return null; // Return null for non-existent vehicle
      }
      // Throw other HTTP errors
      throw new Error(`HTTP error! Status: ${unFormattedResponse.status}`);
    }

    // Parse the JSON response
    const response = await unFormattedResponse.json();

    // Safely return the average rating
    return response.data?.averageRating || null;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching average rating:", error);
    return null; // Return null in case of an error
  }
};
