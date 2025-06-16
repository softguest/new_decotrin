import { time } from 'console';
import { on } from 'events';
import { has } from 'markdown-it/lib/common/utils.mjs';
import Image from 'next/image';
import { it, after, only } from 'node:test';
import React from 'react'

const slides = [
  {
    heading: 'Why is forgiveness so important to emotional recovery from trauma and how do you get there?',
    description:'Forgiveness is an essential component of being able to attain mental, relational, physical and spiritual well-being. It means forgiving yourself and forgiving those who have caused your trauma, thereby creating space for more positive thoughts.

Forgiveness can be both a psychological and a spiritual journey.

People who are not able to forgive remain hostile. They continue to ruminate about their pain and are unable to accept, and eventually, let go of it. Research shows that after forgiveness, negative feelings decline and positive emotions take their place. Resolving anger, hurt, shame and fear generates positive emotions like empathy, understanding and compassion.

In our work with children with attachment disorder and their families, forgiveness occurs when the individuals are no longer controlled by their negative emotions.

A 4-Stage Process
This occurs through a four-stage process:

Experience and express anger directly. These feelings need to be dealt with openly and honestly. Suppressing them and remaining angry, consciously or unconsciously, prevents both grieving and forgiveness.
Genuinely acknowledge and take the time to grieve the loss that is part of your trauma experience.
Come to terms with or accept the loss without distorted perceptions or unrealistic fantasies. Integrate the losses that were experienced into your life.
Make the conscious decision to forgive and move toward the future with new personal resources, skills, meanings and positive relationships. 
By becoming aware of your negative feelings, expressing them openly and honestly and making the conscious decision to forgive, you will be able to move forward, understand the offending person better and feel empathy and compassion for them.

This, however, does not mean that an individual who is not ready to forgive should be pushed or pressured into forgiveness. Forgiveness can only happen if the trauma experience has been fully processed, understood and accepted. Each individual needs to be given the time to go through every stage. Forgiveness also does not mean condoning or forgetting about behavior that was so harmful.

The benefits of forgiveness to our well-being are numerous. Individuals who forgive experience increased hopefulness, improved spiritual connection and increased self-confidence – with corresponding enhancements to physical and mental health, according to the research. Forgiveness is linked to stronger adult romantic relationships and increases in marital satisfaction, emotional closeness and commitment to the relationship. A study of divorced mothers shows that women who forgave their ex-husbands were less anxious and depressed and became better parents than those who could not forgive. Other research shows people who scored high on forgiveness scales had significantly lower levels of blood pressure, anxiety and depression. 

So Make forgiveness part of your healing. You will be healthier and feel better.',
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