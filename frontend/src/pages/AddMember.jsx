import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
      } else {
        toast.error("Please select an image file");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age || !formData.image) {
      toast.error("Please fill in all fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("age", formData.age);
    data.append("image", formData.image);

    try {
      setLoading(true);
      const res = await axios.post("/api/admin/new/member", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Member added successfully");
      setFormData({ name: "", email: "", age: "", image: null });
    } catch (err) {
      toast.error("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Member</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />

        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full border mx-auto mt-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default AddMember;
