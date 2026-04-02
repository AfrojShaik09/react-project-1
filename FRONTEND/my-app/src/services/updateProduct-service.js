export const updateProduct = async (id, updatedData) => {
  const url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Product updated successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
