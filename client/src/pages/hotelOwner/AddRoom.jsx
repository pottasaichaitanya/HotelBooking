// import {useState } from 'react'
// import Title from '../../components/Title';
// import { assets } from '../../assets/assets'
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';
// const AddRoom = () => {
//   const { axios, getToken } = useAppContext();
//   const [images, setImages] = useState({
//     1: null,
//     2: null,
//     3: null,
//     4: null
//   });
//   const [inputs, setInputs] = useState({
//     roomType: '',
//     pricePerNight: 0,
//     amenities: {
//       'Free Wifi': false,
//       'Free Breakfast': false,
//       'Room Service': false,
//       'Pool Access': false,
//       'Mountain View': false
//     },
//   });
//   const [loading, setLoading] = useState(false);
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     if (!inputs.roomType || !inputs.pricePerNight || !inputs.amenities || !Object.values(images).some(image => image)) {
//       toast.error('Please fill all the fields and upload at least one image.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('roomType', inputs.roomType);
//       formData.append('pricePerNight', inputs.pricePerNight);
//       const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
//       formData.append('amenities', JSON.stringify(amenities));
//       Object.keys(images).forEach((key) => {
//         if (images[key]) {
//           formData.append(`images`, images[key]);
//         }
//       });
//       const { data } = await axios.post('/api/room/', formData, {
//         headers: {
//           Authorization: `Bearer ${getToken()}`
//         }
//       });
//       if (data.success) {
//         toast.success(data.message);
//         setImages({
//           1: null,
//           2: null,
//           3: null,
//           4: null
//         });
//         setInputs({
//           roomType: '',
//           pricePerNight: 0,
//           amenities: {
//             'Free Wifi': false,
//             'Free Breakfast': false,
//             'Room Service': false,
//             'Pool Access': false,
//             'Mountain View': false
//           },
//         });
//       }
//       else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   return (
//     <form onSubmit={onSubmitHandler}>
//       <Title title='Add New Room' align='left' font='outfit' subtitle='Fill  in the details carefully and enter the room information below.' />
//       {/* Upload rea For Images */}
//       <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
//         {
//           Object.keys(images).map((key) => (
//             <label htmlFor={`roomImage${key}`} key={key}>
//               Upload Image {key}
//               <img className='max-h-13 cursor-pointer opacity-80'
//                 src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
//                 alt=" " />
//               <input type="file" id={`roomImage${key}`} accept="image/*" hidden onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })} />
//             </label>
//           ))
//         }
//       </div>
//       <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
//         <div className='flex-1 max-w-48'>
//           <p className='text-gray-800 mt-4'>Room Type</p>
//           <select className='w-full p-2 border border-gray-300 rounded' value={inputs.roomType} onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}>
//             <option value="">Select Room Type</option>
//             <option value="Single Bed">Single Bed</option>
//             <option value="Double Bed">Double Bed</option>
//             <option value="Luxury Room">Luxury Room</option>
//             <option value="Family Suite">Family Suite</option>
//           </select>
//         </div>
//       </div>
//       <div>
//         <p className='mt-4 text-gray-800'>Price <span className='text-xs'>/night</span></p>
//         <input type="number" className='w-full p-2 border border-gray-300 rounded p-2 w-24' value={inputs.pricePerNight} onChange={(e) => setInputs({ ...inputs, pricePerNight: e.target.value })} />
//       </div>
//       <p className='text-gray-800 mt-4'>Amenties</p>
//       <div>
//         {Object.keys(inputs.amenities).map((amenity, index) => {
//           return (
//             <div key={index} >
//               <input type="checkbox" id={`amenities${index + 1}`} checked={inputs.amenities[amenity]} onChange={() => setInputs({ ...inputs, amenities: { ...inputs.amenities, [amenity]: !inputs.amenities[amenity] } })} />

//               <label htmlFor={`amenities${index + 1}`} className='ml-2 text-gray-700'>{amenity}</label>
//             </div>
//           )
//         })}
//       </div>
//       <button type='submit' className='bg-blue-500 text-white px-8 rounded mt-8 cursor-pointer' disabled={loading} >{loading ? 'Adding Room...' : 'Add Room'}</button>

//     </form>
//   )
// }

// export default AddRoom
import { useState } from 'react';
import { useFormik } from 'formik';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      roomType: '',
      pricePerNight: 0,
      amenities: {
        'Free Wifi': false,
        'Free Breakfast': false,
        'Room Service': false,
        'Pool Access': false,
        'Mountain View': false
      }
    },
    onSubmit: async (values, { resetForm }) => {
      const token = await getToken();
      console.log('token:', token);
      if (!Object.values(images).some(img => img)) {
        toast.error('Please upload at least one image.');
        return;
      }

      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('roomType', values.roomType);
        formData.append('pricePerNight', values.pricePerNight);
        const selectedAmenities = Object.keys(values.amenities).filter(key => values.amenities[key]);
        formData.append('amenities', JSON.stringify(selectedAmenities));
        Object.values(images).forEach((img) => {
          if (img) formData.append('images', img);
        });

        const { data } = await axios.post('/api/room/', formData, {
          headers: { Authorization: `Bearer ${await getToken()}` }
        });

        if (data.success) {
          toast.success(data.message);
          resetForm();
          setImages({ 1: null, 2: null, 3: null, 4: null });
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Title title='Add New Room' align='left' font='outfit' subtitle='Fill in the details carefully and enter the room information below.' />

      {/* Upload Images */}
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            Upload Image {key}
            <img
              className='max-h-13 cursor-pointer opacity-80'
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt="room preview"
            />
            <input
              type="file"
              id={`roomImage${key}`}
              accept="image/*"
              hidden
              onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>

      {/* Room Type */}
      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select
            className='w-full p-2 border border-gray-300 rounded'
            name="roomType"
            value={formik.values.roomType}
            onChange={formik.handleChange}
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div>
        <p className='mt-4 text-gray-800'>Price <span className='text-xs'>/night</span></p>
        <input
          type="number"
          className='w-full p-2 border border-gray-300 rounded p-2 w-24'
          name="pricePerNight"
          value={formik.values.pricePerNight}
          onChange={formik.handleChange}
        />
      </div>

      {/* Amenities */}
      <p className='text-gray-800 mt-4'>Amenities</p>
      <div>
        {Object.keys(formik.values.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenity-${index}`}
              name={`amenities.${amenity}`}
              checked={formik.values.amenities[amenity]}
              onChange={formik.handleChange}
            />
            <label htmlFor={`amenity-${index}`} className='ml-2 text-gray-700'>{amenity}</label>
          </div>
        ))}
      </div>

      <button type='submit' className='bg-blue-500 text-white px-8 rounded mt-8 cursor-pointer' disabled={loading}>
        {loading ? 'Adding Room...' : 'Add Room'}
      </button>
    </form>
  );
};

export default AddRoom;
