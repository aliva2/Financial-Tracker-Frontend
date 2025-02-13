import axios from "../../api/axios";

export const analyzeExpense = async (category, amount) => {
  const BACKEND_API_URL = "http://ec2-13-49-248-73.eu-north-1.compute.amazonaws.com/api/ai";

  try {
    if (!category || isNaN(Number(amount))) {
      console.error("Invalid input: category or amount is missing or incorrect");
      return "Invalid input";
    }

    const numericAmount = Number(amount);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No JWT token found, user might not be authenticated");
      return "User not authenticated";
    }

    console.log(`Sending request to backend: ${BACKEND_API_URL}`);
    console.log(`Request payload: category=${category}, amount=${numericAmount}`);

    const response = await axios.post(
      BACKEND_API_URL,
      { category, amount: numericAmount },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Received response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    return "Error while getting information";
  }
};
