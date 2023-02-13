import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import { XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const schema = yup.object().shape({
  email:yup.string().email().required(),
  password:yup.string().min(6, 'must be at least 6 characters long').required()
})

const LoginPage = () => {

  const navigate = useNavigate()
   const { setUser } = useContext(UserContext)


  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='-mt-32'>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
          <Formik 
          initialValues={{
            email:"",
            password:""
          }}
          validationSchema={schema}
          onSubmit={async(values, {resetForm})=>{
           const {data} =  await axios.post('/user/login' , {
              email:values.email,
              password:values.password
            },
            {withCredentials:true}
            )

            resetForm({values:""})
            setUser(data)
            navigate('/')
          }}

          >
            {({ values ,handleBlur , handleChange ,  handleSubmit , isValid , errors , touched })=>{
          return (
          <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder='your@gmail.com' onBlur={handleBlur} value={values.email} onChange={handleChange} style={{borderColor: (errors.email && touched.email) ? 'red' : 'inherit'}}/>
          {(errors.email && touched.email) && <div className='flex gap-2 -mt-2 text-red-600 items-center '>
            <span><XMarkIcon className='h-4'/></span>
            <span className='text-sm'>{errors.email}</span>
        </div>
      }
          <input type="password" name="password" placeholder='password' value={values.password} onBlur={handleBlur} onChange={handleChange} style={{borderColor: (errors.password && touched.password) ? 'red' : 'inherit'}} />
          {(errors.password && touched.password) && <div className='flex gap-2 -mt-2 text-red-600 items-center '>
            <span><XMarkIcon className='h-4'/></span>
            <span className='text-sm'>{errors.password}</span>
        </div>
      }

          <button disabled={!isValid} type='submit' className={`primary ${isValid ? 'cursor-pointer' : 'cursor-not-allowed'}`}>Login</button>   
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className='underline text-black' to="/register">Register Now</Link>
          </div>       
        </form>)
        }}
        </Formik>
      </div>
    </div>
  )
}
 
export default LoginPage
