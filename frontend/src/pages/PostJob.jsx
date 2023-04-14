import React, { useState } from 'react'
import { Autocomplete, Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { ImagePicker } from '../components/ImagePicker'

const PostJob = () => {

    // TODO: Retrieve from DB
    const dummyOptions = [
        {label: 'Dress'},
        {label: 'Ethnic Wear - Sari'},
        {label: 'Blouse'},
    ]

    const classes = {
        field: {
            marginBottom: 2,
            marginTop: 2,
            display: 'block'
        },
    }

    const [titleError, setTitleError] = useState(false)
    const [images, setImages] = useState([])

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
            onSubmit={(e) => {}}
        >
            <Autocomplete
                disablePortal
                options={dummyOptions}
                sx={classes.field}
                renderInput={(params) => <TextField {...params} label="Types of Clothing" />}
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
                error={titleError}
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
                    newImages.push(image)
                    setImages(newImages)
                }}
            />

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
            />

            <Box textAlign='center'>
                <Button
                    type='submit'
                    color='secondary'
                    variant='contained'
                >
                    Post
                </Button>
            </Box>
        </form>

    </Container>
  )
}

export default PostJob