import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // Import star icon
import Buttons from "../../newComponents/NewButton/index";
import { useParams, useNavigate } from "react-router-dom";
import PopUp from "../../newComponents/NewPopUp/index";
import { VehicleContext } from "../../context/VehicleContextProvider";
import { vehicleDetailsService } from "../../services/vehicle-details.service";
import { newBookingConfirmation } from "../../services/booking-confirmation.service";
import NewRating from "../../newComponents/NewRating";
import Textarea from "../../components/Textarea/Textarea";
import ImageUpload from "../../components/ImageUpload/Index"; // Import ImageUpload component

const VehicleDetails = () => {
  const { vehicleId, bookingId } = useParams();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { pickupDate, returnDate } = useContext(VehicleContext);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [ratingsData, setRatingsData] = useState({
    totalRatings: 0,
    averageRating: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [reviews, setReviews] = useState([]);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, description: "" });
  const [images, setImages] = useState([]); // Track uploaded images
  const [imageFiles, setImageFiles] = useState([]); // Track image files

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const details = await vehicleDetailsService(vehicleId);
      if (details) {
        setVehicleDetails(details);

        const exampleRatings = {
          5: 120,
          4: 50,
          3: 30,
          2: 15,
          1: 5,
        };

        const exampleReviews = [
          // Add example reviews here
        ];

        const totalRatings = Object.values(exampleRatings).reduce(
          (acc, count) => acc + count,
          0
        );
        const averageRating =
          totalRatings > 0
            ? (
                Object.entries(exampleRatings).reduce(
                  (acc, [stars, count]) => acc + stars * count,
                  0
                ) / totalRatings
              ).toFixed(1)
            : 0;

        setRatingsData({
          totalRatings,
          averageRating,
          breakdown: exampleRatings,
        });

        setReviews(exampleReviews);
      } else {
        console.error("No vehicle details found for this ID.");
      }
    };

    fetchVehicleDetails();
  }, [vehicleId]);

  const handleImagesUploaded = (uploadedImages, uploadedFiles) => {
    setNewReview((prev) => ({ ...prev, images: uploadedImages }));
  };

  const totalHours =
    pickupDate && returnDate && vehicleDetails.rentPricePerHour
      ? Math.max(
          0,
          Math.abs(new Date(returnDate) - new Date(pickupDate)) /
            (1000 * 60 * 60)
        )
      : 0;

  const totalRent = totalHours * (vehicleDetails.rentPricePerHour || 0);

  const handleBookClick = () => {
    setIsPopupOpen(true);
  };

  const confirmBooking = async () => {
    setIsPopupOpen(false);

    const newBooking = {
      bookingId: parseInt(bookingId),
      bookingStatus: "Booked",
      bookingDate: new Date().toISOString(),
      vehicleIdReference: vehicleId,
      vehicleDetails: {
        VehicleId: vehicleId,
        type: vehicleDetails.type,
        brand: vehicleDetails.brand,
        model: vehicleDetails.model,
        rentPricePerHour: vehicleDetails.rentPricePerHour,
      },
      pickupDate: pickupDate,
      returnDate: returnDate,
      totalHours,
      totalRent,
    };

    try {
      newBookingConfirmation(newBooking).then((response) => {
        if (response.error) {
          console.error("Error confirming booking:", response.error);
        } else {
          navigate("/user/booking-confirmation", {
            state: { BookingNew: response },
          });
        }
      });
    } catch (error) {
      console.error("Error during booking confirmation:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/user/vehicle-list");
  };

  if (!vehicleDetails || !vehicleDetails.VehicleId) {
    return <div>No vehicle details available.</div>;
  }

  const handleAddReview = () => {
    setReviews((prev) => [
      {
        name: "New User",
        photo: "https://via.placeholder.com/50",
        date: new Date().toLocaleDateString(),
        ...newReview,
      },
      ...prev,
    ]);
    setIsReviewPopupOpen(false);
    setNewReview({ rating: 0, description: "" });
    setImages([]); // Clear uploaded images
    setImageFiles([]); // Clear image files
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex w-full px-10 pt-6">
        <div className="w-1/2 p-4">
          <img
            src={vehicleDetails.imagePath}
            alt={`${vehicleDetails.brand} ${vehicleDetails.model}`}
            className="w-full h-full object-cover rounded-lg shadow-md"
            style={{ maxHeight: "450px" }}
          />
        </div>

        <div
          className="w-1/2 p-8 bg-white shadow-lg rounded-lg flex flex-col"
          style={{ maxHeight: "450px", overflowY: "auto" }}
        >
          <h2 className="text-3xl font-bold mb-3">{vehicleDetails.model}</h2>
          <p className="text-md mb-2">
            <strong>Brand:</strong> {vehicleDetails.brand}
          </p>
          <p className="text-md mb-2">
            <strong>Category:</strong> {vehicleDetails.category}
          </p>
          <p className="text-md mb-2">
            <strong>Transmission:</strong> {vehicleDetails.transmission}
          </p>
          <p className="text-md mb-2">
            <strong>Fuel Type:</strong> {vehicleDetails.fuelType}
          </p>
          <p className="text-md mb-2">
            <strong>Description:</strong> {vehicleDetails.description}
          </p>
          <hr className="my-4 border-gray-300" />
          <p className="text-md mb-2">
            <strong>Rent Per Hour:</strong> ₹{vehicleDetails.rentPricePerHour}
            /hour
          </p>
          <p className="text-md mb-2">
            <strong>Pick Up Date:</strong> {pickupDate}
          </p>
          <p className="text-md mb-2">
            <strong>Return Date:</strong> {returnDate}
          </p>
          <p className="text-md mb-2">
            <strong>Total Hours:</strong> {totalHours}
          </p>
          <p className="text-md mb-2">
            <strong>Total Rent:</strong> ₹{totalRent.toFixed(2)}
          </p>
          <div className="mt-4 flex justify-center space-x-12">
            <Buttons label="BACK" type="tertiary" onClick={handleBackClick} />
            <Buttons label="BOOK" type="primary" onClick={handleBookClick} />
          </div>
        </div>
      </main>

      <section className="bg-white shadow-lg rounded-lg mt-4 mx-auto p-8 w-[90%] max-w-[1200px]">
        <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>
        <div className="flex justify-between items-center">
          <div className="w-1/2 flex flex-col items-center">
            <h3 className="text-4xl font-bold text-black-500 mb-2">
              {ratingsData.averageRating} / 5
            </h3>
            <p className="text-md text-gray-600">
              {ratingsData.totalRatings} Ratings
            </p>
          </div>

          <div className="w-1/2 pl-16">
            {[...Object.entries(ratingsData.breakdown)]
              .reverse()
              .map(([stars, count]) => (
                <div key={stars} className="flex items-center mb-2">
                  <span className="mr-2 flex items-center">
                    {Array.from({ length: stars }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </span>
                  <div className="w-64 bg-gray-200 h-3 rounded">
                    <div
                      className="bg-yellow-500 h-3 rounded"
                      style={{
                        width: `${(count / ratingsData.totalRatings) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="ml-4">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap space-x-4 space-y-2">
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex w-full md:w-1/2 lg:w-1/3 p-4 border rounded-lg shadow-lg bg-gray-50"
                >
                  <div className="w-1/4">
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="w-14 h-14 rounded-full"
                    />
                  </div>
                  <div className="w-3/4 pl-4">
                    <h3 className="font-bold">{review.name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p>{review.description}</p>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            className="mt-4 text-lg text-blue-500 underline"
            onClick={() => setIsReviewPopupOpen(true)}
          >
            Add a Review
          </button>
        </div>
      </section>

      {isReviewPopupOpen && (
        <PopUp onClose={() => setIsReviewPopupOpen(false)}>
          <div className="w-full p-8 space-y-4">
            <h2 className="text-2xl font-bold">Add a Review</h2>
            <NewRating
              rating={newReview.rating}
              setRating={(rating) => setNewReview({ ...newReview, rating })}
            />
            <Textarea
              label="Review"
              value={newReview.description}
              onChange={(e) =>
                setNewReview({ ...newReview, description: e.target.value })
              }
              placeholder="Write a review"
            />
            <ImageUpload
              onImagesUploaded={handleImagesUploaded}
              onFilesUploaded={(files) => setImageFiles(files)}
              uploadedImages={images}
              uploadedFiles={imageFiles}
            />
            <div className="flex justify-between">
              <Buttons
                label="Cancel"
                type="tertiary"
                onClick={() => setIsReviewPopupOpen(false)}
              />
              <Buttons
                label="Submit"
                type="primary"
                onClick={handleAddReview}
              />
            </div>
          </div>
        </PopUp>
      )}

      {isPopupOpen && (
        <PopUp onClose={() => setIsPopupOpen(false)}>
          <div className="w-full p-8 space-y-4">
            <h2 className="text-2xl font-bold">Booking Confirmation</h2>
            <p>Your booking details are ready to be confirmed.</p>
            <div className="flex justify-between">
              <Buttons
                label="Cancel"
                type="tertiary"
                onClick={() => setIsPopupOpen(false)}
              />
              <Buttons
                label="Confirm"
                type="primary"
                onClick={confirmBooking}
              />
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default VehicleDetails;
