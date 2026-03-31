export const handleAddProduct = async (data) => {
  console.log(data);

  const url = "http://localhost:5000/api/products";

  try {
    const unFormattedResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!unFormattedResponse.ok) {
      throw new Error(
        `Failed to add product: ${unFormattedResponse.statusText}`
      );
    }

    const response = await unFormattedResponse.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
