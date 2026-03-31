export const fetchProducts = async () => {
  const url = "http://localhost:5000/api/products";

  try {
    const unFormattedResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const response = await unFormattedResponse.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};
