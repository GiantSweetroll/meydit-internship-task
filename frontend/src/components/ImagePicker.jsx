import React from 'react'
import { useForm } from 'react-hook-form'

export const ImagePicker = ({ onImagesUploaded }) => {

    const { register } = useForm();

    const handleUploadClick = (event) => {
        fileListToBase64(event.target.files)
            .then((res) => {
                onImagesUploaded(res)
            })
      };

      // credits: https://stackoverflow.com/questions/15960508/javascript-async-readasdataurl-multiple-files
      async function fileListToBase64(fileList) {
        // create function which return resolved promise
        // with data:base64 string
        function getBase64(file) {
          const reader = new FileReader()
          return new Promise(resolve => {
            reader.onload = ev => {
              resolve(ev.target.result)
            }
            reader.readAsDataURL(file)
          })
        }
        // here will be array of promisified functions
        const promises = []
      
        // loop through fileList with for loop
        for (let i = 0; i < fileList.length; i++) {
          promises.push(getBase64(fileList[i]))
        }
      
        // array with base64 strings
        return await Promise.all(promises)
      }

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
