import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateProperty = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [property, setProperty] = useState({
    name: "",
    description: "",
    address: "",
    imageUrl: "",
    rent: "",
    userOwner: userID,
  });
  

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/property",
        { ...property },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Property Created");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error creating property");
    }
  };

  return (
    <div className="create-property">
      <h2>Create Property</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
       name="name"
       value={property.name}
       onChange={handleChange}
      />

     <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={property.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={property.address}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={property.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="rent">Rent</label>
        <input
          type="number"
          id="rent"
          name="rent"
          value={property.rent}
          onChange={handleChange}
        />
        <button type="submit">Create Property</button>
      </form>
    </div>
  );
};

