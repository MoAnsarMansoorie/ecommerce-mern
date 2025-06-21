import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets.js';
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text=2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis officia, incidunt officiis, itaque fugiat, dignissimos eaque libero corporis dolore delectus voluptates quia unde laudantium iure repellat labore nam distinctio esse odio temporibus similique molestias provident nesciunt ducimus? Eum, natus. Veniam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rem dolorum recusandae placeat veritatis consequatur reprehenderit doloremque optio! Ad minima harum itaque incidunt reiciendis animi eum laborum labore commodi blanditiis.</p>
          <b>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis quod quas asperiores dolores odit officia praesentium veritatis inventore labore. Voluptatem consectetur illo hic quisquam.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis molestias perferendis sunt hic, at consequatur!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab beatae porro mollitia ipsam voluptatum at!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab beatae porro mollitia ipsam voluptatum at!</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About