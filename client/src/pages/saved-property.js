import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedProperty = () => {  
  const [savedProperty, setSavedProperty] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/property/savedProperty/${userID}`
        );
        setSavedProperty(response.data.savedProperty);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedProperty();
  }, []);  

  return (
    <div>
      <h1>Saved Property</h1>
      <ul>
        {savedProperty.map((property) => (
          <li key={property._id}>
            <div>
              <h2>{property.name}</h2>
            </div>
            <p>{property.description}</p>
            <img src={property.imageUrl} alt={property.name} />
            <p>Rent: {property.rent} in rupees</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
