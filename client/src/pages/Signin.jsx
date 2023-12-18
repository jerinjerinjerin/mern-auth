import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIp() {
  
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get the data in input
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  //data backend api get and data save to database
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      // setLoading(true);
      // setError(false);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      //set error
      const data = await res.json();
      if (data.success === false){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          
          <input type='email' placeholder='Email' id='email'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

          <input type='password' placeholder='Password' id='password'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

          <button disabled={loading} className='bg-slate-700 text-white p-3
          rounded-lg uppercase hover:opacity-95'>{loading? 'Loading...':'Sign In' }</button>
       </form>

       <div className='flex gap-3 mt-5'>
          <p>Dont Have an account?</p>
          <Link to='/sign-up'>
            <span className='text-blue-700'>Sign Up</span>
          </Link>
       </div>
       <p className='text-red-700 mt-5 text-center'>{error ?  error.message || 'something went wrong!':''}</p>

    </div>
  )
}
