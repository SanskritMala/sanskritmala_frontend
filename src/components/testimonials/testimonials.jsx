import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Amit Sharma",
      position: "Student",
      message:
        "The Sanskrit courses offered here are comprehensive and easy to follow. I've gained a deeper understanding of the language, and the study materials are excellent.",
      image:
        "https://res.cloudinary.com/drcmiptb8/image/upload/v1728908802/sfd0bm2tr0k8klahvqcq.jpg",
    },
    {
      id: 2,
      name: "Priya Desai",
      position: "Student",
      message:
        "The study notes and books have been extremely helpful in my Sanskrit studies. The platform is well-organized and provides great learning resources.",
      image:
        "https://res.cloudinary.com/drcmiptb8/image/upload/v1728808748/bxvqod8rivftoivj90ii.jpg",
    },
    {
      id: 3,
      name: "Rahul Gupta",
      position: "Researcher",
      message:
        "I have been using the Sanskrit books and notes for my research, and they have been invaluable. The detailed explanations and structured content make learning much easier.",
      image:
        "https://res.cloudinary.com/drcmiptb8/image/upload/v1728808880/iohaf96cul3wwbcpplvs.jpg",
    },
  ];
  

  return (
    <section className="bg-gray-100 text-black py-12 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-blue1 text-center mb-8">What Our Students Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonialsData.map((e) => (
          <div
            key={e.id}
            className="bg-gray-200 p-6 rounded-lg shadow-xl max-w-xs w-full flex flex-col items-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mb-4 overflow-hidden rounded-full border-4 border-blue1">
              <img
                src={e.image}
                alt={e.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base md:text-lg text-black italic mb-4">"{e.message}"</p>
            <div className="text-center">
              <p className="font-semibold text-gray-800 text-base md:text-lg">{e.name}</p>
              <p className="text-gray-700 text-sm md:text-base">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
