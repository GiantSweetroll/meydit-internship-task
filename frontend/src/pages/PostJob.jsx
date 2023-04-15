import React, { useState } from 'react'
import { Autocomplete, Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { ImagePicker } from '../components/ImagePicker'
import { registerUser, postJob } from '../controllers/backendController'
import { useStateContext } from '../contexts/ContextProvider'

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

        if (clothingType 
            && desc 
            && images.length > 0
            && firstName
            && phone
            && email
            && postal
            && stateAddr
        ) {
            await registerUser({
                firstname: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                address: address,
                postal: postal,
                state: stateAddr,
                password: 'password123' // just use dummy password
            }).then(async (res) => {
                const userId = res.user.id
                await postJob({
                    userId: userId,
                    clothingId: clothingType.clothingId,
                    description: desc,
                    statusId: 1,
                    images: images,
                    budget: budget
                }).then((res2) => {
                    // refresh page
                    window.location.reload(false)
                }).catch((err) => {throw err})
            }).catch((err) => {throw err})
        }
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
                    label="Types of Clothing" 
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
                    type='submit'
                    color='secondary'
                    variant='contained'
                    sx={{
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                >
                    Post
                </Button>
            </Box>
        </form>

    </Container>
  )
}

export default PostJob