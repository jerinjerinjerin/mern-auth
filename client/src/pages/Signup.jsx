import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function Signup() {
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //get the data in input
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  //data backend api get and data save to database
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      //set error
      const data = await res.json();
      setLoading(false);
      if (data.success === false){
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type='text' placeholder='Username' id='username'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

          <input type='email' placeholder='Email' id='email'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

          <input type='password' placeholder='Password' id='password'
          className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

          <button disabled={loading} className='bg-slate-700 text-white p-3
          rounded-lg uppercase hover:opacity-95'>{loading? 'Loading...':'Sign Up' }</button>
          <OAuth/>
       </form>

       <div className='flex gap-3 mt-5'>
          <p>Have an account?</p>
          <Link to='/sign-in'>
            <span className='text-blue-700'>Sign in</span>
          </Link>
       </div>
       <p className='text-red-700 mt-5 text-center'>{error && 'something went wrong'}</p>

    </div>
  )
}
