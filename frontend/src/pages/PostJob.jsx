import React, { useState } from 'react'
import { Autocomplete, Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { ImagePicker } from '../components/ImagePicker'

const PostJob = () => {

    // TODO: Retrieve from DB
    const dummyOptions = [
        {label: 'Dress', clothingId: 1},
        {label: 'Ethnic Wear - Sari', clothingId: 2},
        {label: 'Blouse', clothingId: 3},
    ]

    const classes = {
        field: {
            marginBottom: 2,
            marginTop: 2,
            display: 'block'
        },
    }

    const [descError, setDescError] = useState(false)
    const [clothingError, setClothingError] = useState(false)
    const [imagesError, setImagesError] = useState(false)
    const [clothingType, setClothingType] = useState({label: 'Dress', clothingId: 1})
    const [images, setImages] = useState([])
    const [desc, setDesc] = useState('')
    const [budget, setBudget] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()    // So it doesnt refresh the page

        setDescError(desc == '')
        setClothingError(clothingType == null)
        setImagesError(images.length == 0)

        if (clothingType && desc && images.length > 0) {
            console.log(clothingType, desc, budget)
            // TODO: Send to backend
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
            <Autocomplete
                disablePortal
                value={clothingType}
                options={dummyOptions}
                sx={classes.field}
                renderInput={(params) => <TextField 
                    {...params} 
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
                onClear={() => setImages([])}
                onImageUploaded={(image) => {
                    const newImages = images
                    console.log(image)
                    newImages.push(image)
                    setImages(newImages)
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