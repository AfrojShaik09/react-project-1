export const deleteProduct = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;

  try {
    const unFormattedResponse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!unFormattedResponse.ok) {
      throw new Error(
        `Failed to delete product: ${unFormattedResponse.statusText}`,
      );
    }

    const response = await unFormattedResponse.json();
    console.log("Deleted product response:", response);
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
