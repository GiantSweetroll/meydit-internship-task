import React from 'react'
import Button from './Button'

const AuthComponent = ({ bgColor, color, size, text, borderRadius }) => {
  return (
    <div>
        <h1>Welcome to Meyd.it</h1>
        <h2>Slogan Minim anim sit pariatur qui dolor.</h2>
        <Button
            text="Hello there"
            color="#4567DA"
            bgColor="#123DA5"
            borderRadius="12px"
            size="md"
        />
    </div>
  )
}

export default AuthComponent