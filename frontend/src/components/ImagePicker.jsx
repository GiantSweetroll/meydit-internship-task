import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const ImagePicker = ({ onImageUploaded, onClear }) => {

    const { register } = useForm();

    const handleUploadClick = (event) => {
        onClear()
        for (var i = 0; i < event.target.files.length; i++) {
            var file = event.target.files[i];
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
                reader.onloadend = function (e) {
                    onImageUploaded(reader.result)
                };
            }
        }
      };

  return (
    <input
        accept="image/jpeg,image/png,image/tiff,image/webp"
        id="contained-button-file"
        name="logo"
        {...register('image', { required: true })}
        type="file"
        multiple="multiple"
        onChange={handleUploadClick}
    />
  )
}
