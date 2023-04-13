import React from 'react'

const Auth = () => {
  return (
    <div className='flex h-screen bg-blue-500'>
        <div className="w-full max-w-xs m-auto bg-blue-100 rounded p-5">   
            <header>
                <p className="mx-auto mb-5 text-4xl text-center text-blue-500">Meyd.it</p>
            </header>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
                <form>
                    <div>
                        <label className="block mb-2 text-blue-500" for="username">Username</label>
                        <input className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300" type="text" name="username" required/>
                    </div>
                    <div>
                        <label className="block mb-2 text-blue-500" for="password">Password</label>
                        <input className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300" type="password" name="password" required/>
                    </div>
                    <div>          
                        <button className="w-full bg-blue-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="button">Login</button>
                    </div>       
                </form>
            </div>
            <footer>
                <p className='text-center'>
                    <a className="text-blue-700 hover:text-pink-700 text-sm mx-auto max-w-full" href="#">Create Account</a>
                </p>
            </footer>
        </div>
    </div>
  )
}

export default Auth