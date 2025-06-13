import Image from 'next/image';
import React from 'react'

const slides = [
  {
    heading: 'Seek Professional Therapy',
    description:
      'Working with a trained therapist or counselor helps war survivors process traumatic memories, develop healthy coping strategies, and regain a sense of safety and self-worth in a structured, supportive environment.',
    bgColor: 'bg-blue-100',
    img: "/resource/resources01.jpg"
  },
  {
    heading: 'Join Support Communities',
    description:
      'Support groups create a safe space where trauma survivors can share their experiences, reduce feelings of isolation, and gain strength by connecting with others who understand the emotional toll of war-related experiences.',
    bgColor: 'bg-green-100',
    img: "/resource/resources02.jpeg"
  },
  {
    heading: 'Practice Daily Mindfulness',
    description:
      'Mindfulness practices such as deep breathing, meditation, and body scanning help individuals stay grounded in the present, reduce anxiety and flashbacks, and reestablish a sense of calm in their daily lives after trauma.',
    bgColor: 'bg-yellow-100',
    img: "/img/image8.jpg"
  },
  {
    heading: 'Create a Safe Environment',
    description:
      'Rebuilding a sense of safety is crucial after war. Establishing a secure home, minimizing triggers, and engaging in routines can support emotional regulation and foster healing by reinforcing a feeling of control.',
    bgColor: 'bg-purple-100',
    img: "/resource/resources03.jpg"
  },
  {
    heading: 'Express Through Art & Writing',
    description:
      'Creative expression through art, journaling, music, or storytelling provides an outlet for emotions that may be difficult to verbalize. These methods promote healing and help survivors reclaim their voice and identity.',
    bgColor: 'bg-pink-100',
    img: "/img/image3.jpg"
  },
];

const Resources = () => {

    return (
        <div className='space-y-4 mx-4 xl:mx-24'>
            {slides.map((_, idx) => (
                <div className='p-4 bg-white rounded-xl flex'
                key={idx}
                >
                    <div className="relative shadow-lg w-[15%] h-[100px] overflow-hidden hidden md:block md:mr-4 bg-slate-500">
                        <Image src={_.img ?? "/course/subject.jpg"} alt="subjectTitle" fill className="object-cover" />
                        {/* <Image src="/resource/resources01.jpg" alt="subjectTitle" fill className="object-cover" /> */}
                    </div>
                    <div className='w-[85%]'>
                        <h2 className='text-1xl text-slate-800 font-bold rounded-xl border border-indigo-600 mb-2 p-2'>{_.heading}</h2>
                        <p className='text-slate-600'>{_.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Resources