import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [properties, setProperties] = useState([]);
  const [savedProperty, setSavedProperty] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3001/property");
        setProperties(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/property/savedProperty/ids/${userID}`
        );
        setSavedProperty(response.data.savedProperty);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
    fetchSavedProperty();
  }, []);

  const saveProperty = async (propertyID) => {
    try {
      const response = await axios.put("http://localhost:3001/property", {
        propertyID,
        userID,
      });
      setSavedProperty(response.data.savedProperty);
    } catch (err) {
      console.log(err);
    }
  };

  const isPropertySaved = (id) => savedProperty.includes(id);

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            <div>
              <h2>{property.name}</h2>
              <button
                onClick={() => saveProperty(property._id)}
                disabled={isPropertySaved(property._id)}
              >
                {isPropertySaved(property._id) ? "Saved" : "Save"}
              </button>
            </div>
            <img src={property.imageUrl} alt={property.name} />
            <p>Rent: {property.rent} rupees</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
