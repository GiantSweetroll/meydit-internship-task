import React, { useState } from 'react'
import { Autocomplete, Button, Container, TextField, Typography, Card, CardActionArea, CardContent, Fab, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { AddPhotoAlternate } from '@mui/icons-material'

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
        }
    }

    const [titleError, setTitleError] = useState(false)
    const { register,handleSubmit,reset } = useForm();
    const [uploadState, setUploadState] = useState("initial");
    const [image, setImage] = useState("");

    const handleUploadClick = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = function (e) {
            setImage(reader.result);
            setUploadState("uploaded");
          };
        }
      };
    
      const handleResetClick = (event) => {
        setImage(null);
        setUploadState("initial");
        reset({ logo: null });
      };
    
      const onUpload = (data) => {
        console.log(data.logo[0])
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

            <Card>
                <CardContent>
                <Grid container justify="center" alignItems="center">
                    <input
                        accept="image/jpeg,image/png,image/tiff,image/webp"
                        // className={classes.input}
                        id="contained-button-file"
                        name="logo"
                        {...register('test', { required: true })}
                        type="file"
                        onChange={handleUploadClick}
                    />
                        <label
                            htmlFor="contained-button-file"
                            className={uploadState === "uploaded" ? classes.input : null}
                        >
                    <Fab component="span" className={classes.button}>
                        <AddPhotoAlternate />
                    </Fab>
                    </label>
                </Grid>
                </CardContent>
                {uploadState === "uploaded" && (
                    <CardActionArea onClick={handleResetClick}>
                        <img className={classes.logo} src={image} alt="LOGO" />
                    </CardActionArea>
                )}
            </Card>

            <TextField
                className='mb-4'
                label="Budget (Optional)"
                variant='outlined'
                color='secondary'
                fullWidth
                sx={classes.field}
                error={titleError}
            />

            <Button
                type='submit'
                color='secondary'
                variant='contained'
            >
                Post
            </Button>
        </form>

    </Container>
  )
}

export default PostJob