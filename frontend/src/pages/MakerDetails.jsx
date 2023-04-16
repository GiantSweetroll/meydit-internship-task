import React, { useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Box, Button, Container, ImageList, ImageListItem, InputAdornment, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getJobImages, sendQuote } from '../controllers/backendController'
import { getObject } from '@syncfusion/ej2-react-grids'

export const MakerDetails = () => {

  const { selectedJobDetails } = useStateContext()
  const [price, setPrice] = useState('')
  const [comments, setComments] = useState('')
  const [priceError, setPriceError] = useState(false)
  const [images, setImages] = useState([])
  const data = selectedJobDetails
  const navigate = useNavigate()

  async function getImages() {
    const result = await getJobImages(selectedJobDetails.id)
    setImages(result)
  }

  useEffect(() => {
    getImages().then((_) => console.log('images retrieved'))
  }, [])

  const ItemText = ({ text, align = 'left', color = 'textPrimary' }) => (
    <Typography
      variant='body'
      component='h2'
      fontWeight='bold'
      color={color}
      align={align}
    >
      {text}
    </Typography>
  )
  const ContentText = ({ text, align = 'left', color = 'textSecondary' }) => (
    <Typography
      variant='body'
      component='body'
      align={align}
      color={color}
    >
      {text}
    </Typography>
  )

  const handleSubmit = async (e) => {
      e.preventDefault()    // So it doesnt refresh the page

      setPriceError(price === '')
      
      if (price) {
        sendQuote({
          makerId: 1,   // because no sign in, just use 1
          jobId: selectedJobDetails.id,
          price: price,
          comments: comments
        }).then((res) => {
          alert('Quotation sent!')
          navigate('/maker')
        }).catch((err) => console.log(err) )
      }
  }

  return (
    <Container>

      {/* Header */}
      <div className='flex w-full'>
        {/* Posted By */}
        <div>
          <ItemText
            text='Posted by:'
          />
          <ContentText
            text={`${data.firstName}  ${data.lastName}`}
            color='textPrimary'
          />
          <ContentText
            text={data.location}
          />
        </div>
        {/* Budget */}
        <div className='flex-grow'>
          <ItemText
            text='Budget'
            align='right'
          />
          <ContentText
            text={data.budget === undefined || data.budget === null? "Unspecified" : `A$ ${data.budget}`}
            color='textPrimary'
            align='right'
          />
        </div>
      </div>

      <div className='m-20' />

      {/* Type of clothing */}
      <div className='flex w-full'>
        <ItemText
          text='Type of Clothing'
        />
        <div className='flex-grow'>
          <ContentText
            text={data.clothingType}
            align='right'
          />
        </div>
      </div>

      <div className='m-9' />

      {/* Description */}
      <ItemText
        text='Description'
      />
      <ContentText 
        text={data.desc}
      />

      <div className='m-9'/>

      {/* Example images */}
      <ItemText
        text='Examples'
      />
      <ImageList 
        cols={3}
      >
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item.imgStr}
              srcSet={item.imgStr}
              alt=''
              loading="lazy"
            />
          </ImageListItem>
      ))}
    </ImageList>

    <div className='m-9'/>

    {/* Send a quotation */}
    <ItemText
      text='Send a quotation'
    />
    <form
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <TextField
          label="Price"
          variant='outlined'
          color='secondary'
          sx={{
              marginTop: '30px',
              marginBottom: '20px'
          }}
          type='number'
          required
          error={priceError}
          InputProps={{
              startAdornment: <InputAdornment position="start">A$</InputAdornment>,
          }}
          onChange={(e) => {
              setPrice(e.target.value)
          }}
      />
      <TextField
          label="Comments"
          variant='outlined'
          color='secondary'
          fullWidth
          multiline
          minRows={4}
          onChange={(e) => {
              setComments(e.target.value)
          }}
      />
      <Box textAlign='right'>
          <Button
              type='submit'
              color='secondary'
              variant='contained'
              sx={{
                  marginTop: '15px',
                  paddingLeft: 8,
                  paddingRight: 8
              }}
          >
              Send
          </Button>
      </Box>
    </form>

    </Container>
  )
}
