import React from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import { XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { debounce } from 'lodash'

const dowehaveEmail = async (resolve , inputValue)=>{
  const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`)
  const isUser = data.find(({email})=> email === inputValue )
  console.log(isUser)
  resolve( isUser ? false : true)
}

const dowehaveEmailDebounced = debounce(dowehaveEmail , 300)

const schema = yup.object().shape({
  name:yup.string().min(3, 'must be at least 3 characters long').required(),
  email:yup.string().test('email' , 'email is already in use', async(inputvalue)=>{
    return new Promise(resolve => dowehaveEmailDebounced(resolve , inputvalue))
  }).email().required(),
  password:yup.string().min(6, 'must be at least 6 characters long').required(),
  confirmpassword:yup.string().required().oneOf([yup.ref('password')] , 'Passwords must match')
})

const RegisterPage = () => {

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='-mt-32'>
      <h1 className='text-4xl text-center mb-4'>Register</h1>
        <Formik 
        initialValues={{
          name:"",
          email:"",
          password:"",
          confirmpassword:""
        }}
        validationSchema={schema}
        onSubmit={async(values , {resetForm}) => {
           await axios.post('/user/register' , {
            name:values.name,
            email:values.email,
            password:values.password
          })
 
          resetForm({values:""})
        }}
        >
          {({values , handleChange , handleBlur , handleSubmit , isValid , errors , touched }) =>{

    return (<form className='max-w-md mx-auto' onSubmit={handleSubmit}>
      <input type="text"  name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder='john doe' style={{borderColor: (errors.name && touched.name) ? 'red' : 'inherit'}}/>
      {(errors.name && touched.name) && <div className='flex gap-2 -mt-2 text-red-600 items-center '>
            <span><XMarkIcon className='h-4'/></span>
            <span className='text-sm'>{errors.name}</span>
        </div>
      }

      <input type="email"  name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='your@gmail.com' style={{borderColor: (errors.email && touched.email) ? 'red' : 'inherit'}}/>
      {(errors.email && touched.email) && <div className='flex gap-2 -mt-2 text-red-600 items-center '>
            <span><XMarkIcon className='h-4'/></span>
            <span className='text-sm'>{errors.email}</span>
        </div>
      }

      <input type="password"  name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder='password' style={{borderColor: (errors.password && touched.password) ? 'red' : 'inherit'}}/>
      {(errors.password && touched.password) && <div className='flex gap-2 -mt-2 text-red-600 items-center '>
            <span><XMarkIcon className='h-4'/></span>
            <span className='text-sm'>{errors.password}</span>
        </div>
      }

      <input type="password"  name="confirmpassword" value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} placeholder='confirm password' style={{borderColor: (errors.confirmpassword && touched.confirmpassword) ? 'red' : 'inherit'}}/>
      {(errors.confirmpassword && touched.confirmpassword) && <div className='flex gap-2 -mt-2 text-red-600 items-center '>
            <span><XMarkIcon className='h-4'/></span>
            <span className='text-sm'>{errors.confirmpassword}</span>
        </div>
      }

      <button disabled={!isValid} type='submit' lassName={`primary ${isValid ? 'cursor-pointer' : 'cursor-not-allowed'}`}>Register</button>   
      <div className="text-center py-2 text-gray-500">
        Already a memeber?
        <Link className='underline text-black' to="/login">Login</Link>
      </div>       
    </form>)
          }}
  
        </Formik>
      </div>
    </div>
  )
}

export default RegisterPage
