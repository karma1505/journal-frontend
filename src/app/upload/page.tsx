"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { API_ENDPOINTS } from "../../config/api";

export default function UploadBlog() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishDate: new Date().toISOString().split("T")[0],
  });
  const [requestMethod, setRequestMethod] = useState("POST");
  const [entryId, setEntryId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let url: string = API_ENDPOINTS.ENTRIES;
      const method = requestMethod;
      
      // Add ID to URL for PATCH and DELETE
      if ((requestMethod === 'PATCH' || requestMethod === 'DELETE') && entryId) {
        url = API_ENDPOINTS.ENTRY_BY_ID(parseInt(entryId)) as string;
      }
      
      // For DELETE, no body needed
      if (requestMethod === 'DELETE') {
        const response = await fetch(url, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('Blog entry deleted successfully!');
          resetForm();
        } else {
          const error = await response.json();
          alert(`Error deleting blog entry: ${error.detail || 'Unknown error'}`);
        }
        return;
      }
      
      // For POST and PATCH, create FormData
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      
      // Add image file if selected
      const fileInput = fileInputRef.current;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formDataToSend.append('image', fileInput.files[0]);
      }
      
      // Send to backend API
      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`Blog entry ${requestMethod === 'POST' ? 'created' : 'updated'} successfully:`, result);
        
        resetForm();
        alert(`Blog entry ${requestMethod === 'POST' ? 'created' : 'updated'} successfully!`);
      } else {
        const error = await response.json();
        console.error(`Error ${requestMethod === 'POST' ? 'creating' : 'updating'} blog entry:`, error);
        alert(`Error ${requestMethod === 'POST' ? 'creating' : 'updating'} blog entry. Please try again.`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check if the backend server is running.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      publishDate: new Date().toISOString().split("T")[0],
    });
    setPreview(null);
    setFileName(null);
    setEntryId("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-16 px-4 text-gray-700"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Management</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Request Method Dropdown */}
        <div>
          <label htmlFor="requestMethod" className="block text-sm font-medium mb-2">
            Request Method
          </label>
          <select
            id="requestMethod"
            value={requestMethod}
            onChange={(e) => setRequestMethod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="POST">POST - Create New Entry</option>
            <option value="PATCH">PATCH - Update Existing Entry</option>
            <option value="DELETE">DELETE - Delete Entry</option>
          </select>
        </div>

        {/* Entry ID Input (for PATCH and DELETE) */}
        {(requestMethod === 'PATCH' || requestMethod === 'DELETE') && (
          <div>
            <label htmlFor="entryId" className="block text-sm font-medium mb-2">
              Entry ID
            </label>
            <input
              type="number"
              id="entryId"
              required
              value={entryId}
              onChange={(e) => setEntryId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Enter the ID of the entry to update/delete"
            />
          </div>
        )}
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
            placeholder="Enter your blog title..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Cover Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <div className="space-y-1 text-center w-full">
              {preview ? (
                <div className="w-full">
                  <div className="relative w-full aspect-video max-w-lg mx-auto mb-4">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium truncate max-w-xs">{fileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium mb-2">
            Publish Date
          </label>
          <input
            type="date"
            id="publishDate"
            value={formData.publishDate}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          />
        </div>

        {/* Content Input */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Blog Content
          </label>
          <textarea
            id="content"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-gray-700 placeholder-gray-500"
            placeholder="Write your blog content here..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            requestMethod === 'DELETE' 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {requestMethod === 'POST' && 'Create Blog Post'}
          {requestMethod === 'PATCH' && 'Update Blog Post'}
          {requestMethod === 'DELETE' && 'Delete Blog Post'}
        </motion.button>
      </form>
    </motion.main>
  );
}