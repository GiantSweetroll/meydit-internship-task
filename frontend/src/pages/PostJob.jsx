import React, { useState } from 'react'
import { Autocomplete, Box, Button, Container, InputAdornment, TextField, Typography, ImageList, ImageListItem } from '@mui/material'
import { ImagePicker } from '../components/ImagePicker'
import { registerUser, postJob } from '../controllers/backendController'
import { useStateContext } from '../contexts/ContextProvider'
import { uploadImage } from '../controllers/firebaseController'

const PostJob = () => {
    
    const classes = {
        field: {
            marginBottom: 2,
            marginTop: 2,
            display: 'block'
        },
    }

    const { clothingTypes } = useStateContext()
    const [descError, setDescError] = useState(false)
    const [clothingError, setClothingError] = useState(false)
    const [imagesError, setImagesError] = useState(false)
    const [clothingType, setClothingType] = useState(null)
    const [images, setImages] = useState([])
    const [imagesURI, setImagesURI] = useState([])
    const [desc, setDesc] = useState('')
    const [budget, setBudget] = useState('')
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false)
    const [postal, setPostal] = useState('')
    const [postalError, setPostalError] = useState(false)
    const [stateAddr, setStateAddr] = useState('')
    const [stateAddrError, setStateAddrError] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState('')

    const handleImageUpload = async (images) => {
        const promises = []
        const urls = []
        for (const image of images) {

            // rename file
            const fname = image.name
            const fileExt = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2)
            const rNum = Math.floor(Math.random() * 100)
            const dateStr = (new Date()).toString()
            var newFileName = `${rNum}-${dateStr}-${fname}.${fileExt}`
            const newImage = new File([image], newFileName)

            promises.push(new Promise((resolve, reject) => {
                uploadImage(newImage).then((res) => {
                    urls.push(res)
                    resolve()
                }).catch((err) => {
                    console.log(err)
                    reject()
                })
            }))
        }

        await Promise.all(promises)

        return urls
    }

    const handleSubmit = async (e) => {
        e.preventDefault()    // So it doesnt refresh the page

        setAddressError(address === '')
        setFirstNameError(firstName === '')
        setEmailError(email === '')
        setPhoneError(phone === '')
        setPostalError(postal === '')
        setStateAddrError(stateAddr === '')
        setDescError(desc === '')
        setClothingError(clothingType === null)
        setImagesError(images.length === 0)
        setUploadError('')

        if (clothingType 
            && desc 
            && images.length > 0
            && firstName
            && phone
            && email
            && postal
            && stateAddr
        ) {
            setUploading(true)
            await registerUser({
                firstname: firstName,
                lastname: lastName,
                phone: phone,
                email: email,
                address: address,
                postal: postal,
                state: stateAddr,
                password: 'password123' // just use dummy password
            }).then(async (res) => {
                const userId = res.user.id

                // upload images to firebase 
                const imgUrls = await handleImageUpload(images)

                return await postJob({
                    userId: userId,
                    clothingId: clothingType.clothingId,
                    description: desc,
                    statusId: 1,
                    images: imgUrls,
                    budget: budget,
                    datePosted: (new Date()).toISOString(),
                }).then((res2) => {
                    alert('Job posted!')
                    setUploading(false)
                    // refresh page
                    window.location.reload(false)
                })
            }).catch((err) => {
                console.log(err)
                setUploading(false)
                setUploadError('Unable to post job, please try again')
                throw err
            })
        }
    }

    const readImageURIs = async (images) => {
        // here will be array of promisified functions
        const promises = []
      
        // loop through fileList with for loop
        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader()
            promises.push(new Promise(resolve => {
                reader.readAsDataURL(images[i])
                reader.onloadend = function(ev) {
                    resolve(reader.result)
                }
              })
            )
        }
      
        // array with base64 strings
        return await Promise.all(promises)
    }

  return (
    <Container>
        <Typography
            variant='h6'
            color='textSecondary'
            component='h2'
            gutterBottom
        >
            Post a Job
        </Typography>

        <form
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}
        >
            <div className='xs:flex md:grid md:grid-cols-2 md:gap-x-5 md:items-stretch'>
                <TextField
                    label="First Name"
                    variant='outlined'
                    color='secondary'
                    required
                    sx={classes.field}
                    error={firstNameError}
                    fullWidth
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />
                <TextField
                    label="Last Name"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    sx={classes.field}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                />
            </div>
            <div className='xs:flex md:grid md:grid-cols-2 md:gap-x-5 md:items-stretch'>
                <TextField
                    label="Phone"
                    variant='outlined'
                    color='secondary'
                    required
                    sx={classes.field}
                    error={phoneError}
                    type='number'
                    fullWidth
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                />
                <TextField
                    label="Email"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    type='email'
                    error={emailError}
                    sx={classes.field}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
            </div>
            <TextField
                label="Address"
                variant='outlined'
                color='secondary'
                fullWidth
                required
                error={addressError}
                sx={classes.field}
                onChange={(e) => {
                    setAddress(e.target.value)
                }}
            />
            <div className='xs:flex md:grid md:grid-cols-2 md:gap-x-5 md:items-stretch'>
                <TextField
                    label="Postcode"
                    variant='outlined'
                    color='secondary'
                    required
                    sx={classes.field}
                    error={postalError}
                    type='number'
                    fullWidth
                    onChange={(e) => {
                        setPostal(e.target.value)
                    }}
                />
                <TextField
                    label="State"
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    error={stateAddrError}
                    sx={classes.field}
                    onChange={(e) => {
                        setStateAddr(e.target.value)
                    }}
                />
            </div>
            <Autocomplete
                disablePortal
                value={clothingType}
                options={clothingTypes}
                sx={classes.field}
                renderInput={(params) => <TextField 
                    {...params} 
                    required
                    label="Type of Clothing" 
                    error={clothingError}
                />}
                isOptionEqualToValue={(option, value) => option.clothingId === value.clothingId}
                onChange={(event, value) => {
                    setClothingType(value)
                }}
            />
            <TextField
                label="Description"
                variant='outlined'
                color='secondary'
                fullWidth
                multiline
                minRows={4}
                value={desc}
                required
                sx={classes.field}
                error={descError}
                onChange={(e) => {
                    setDesc(e.target.value)
                }}
            />

            {/* Upload images */}
            <Typography
                variant='body'
                color='textSecondary'
                component='h2'
                gutterBottom
            >
                Upload images of the type of clothing you want made
            </Typography>
            <ImagePicker
                onImagesUploaded={(uploadedImages) => {
                    setImages(uploadedImages)

                    readImageURIs(uploadedImages)
                        .then((res) => {
                            setImagesURI(res)
                        })
                }}
            />
            {imagesError? <Typography
                color='error'
                sx={{
                    marginTop: '5px'
                }}
            >
                Please upload at least one image
            </Typography> : null}
            <ImageList 
                cols={3}
                sx={{
                    paddingTop: '20px'
                }}
            >
                {imagesURI.map((item, index) => {
                    return <ImageListItem key={index}>
                        <img
                        src={item}
                        alt=''
                        loading="lazy"
                        />
                    </ImageListItem>
                })}
            </ImageList>

            <TextField
                className='mb-4'
                label="Budget (Optional)"
                variant='outlined'
                value={budget}
                color='secondary'
                fullWidth
                sx={{
                    marginTop: '30px',
                    marginBottom: '20px'
                }}
                type='number'
                InputProps={{
                    startAdornment: <InputAdornment position="start">A$</InputAdornment>,
                }}
                onChange={(e) => {
                    setBudget(e.target.value)
                }}
            />

            <Box textAlign='center'>
                <Button
                    disabled={uploading}
                    type='submit'
                    color='secondary'
                    variant='contained'
                    sx={{
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                >
                    {uploading? "Uploading..." : "Post"}
                </Button>
            </Box>
            <Box textAlign='center'>
                {uploadError? <Typography
                    color='error'
                    sx={{
                        marginTop: '5px'
                    }}
                >
                    {uploadError}
                </Typography> : null}
            </Box>
        </form>

    </Container>
  )
}

export default PostJob