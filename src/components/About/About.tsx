import React from 'react';

const About = () => {
  return (
    <div
      id="about"
      className="mx-auto max-w-3xl bg-slate-600 h-fit rounded-2xl mb-0 z-[1] relative"
    >
      <div className="rounded-t-2xl bg-white bg-head-img bg-bottom bg-no-repeat-y bg-cover text-center h-[100px] w-full flex flex-row justify-center items-center text-2xl font-bold">
        <h3 className="bg-white rounded-xl w-fit h-fit py-2 px-4">About</h3>
      </div>
      <div className="p-5">
        <p className="text-white">
          We are passionate about travelling and want to find you the perfect
          spot on your travels! Our site makes it easier for you to find the
          perfect location to rest your head. Whether you are in a tent,
          campervan or just after a room, we’ve got an easy to use method for
          finding you somewhere to stop. You could want a 5* stop with all the
          amenities or a patch of grass near to town, we’ve got you covered!
        </p>
        <p className="text-white">
          All you need to do it tap your location into the search box above and
          bingo! You’ll have all the stops around your location, tap on one to
          get a bit more info! You can also tap the location button to get all
          the stops around you!
        </p>
      </div>
    </div>
  );
};

export default About;
