import React from "react";

const About = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-base-100 text-base-content">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          About <span className="text-primary">Scholarship Hub</span>
        </h2>

        {/* Intro */}
        <p className="text-lg leading-relaxed mb-6 text-justify">
          <strong>Scholarship Hub</strong> একটি অনলাইন প্ল্যাটফর্ম যা শিক্ষার্থীদের
          জন্য স্কলারশিপ খুঁজে পাওয়া, সহজে আবেদন করা এবং তাদের একাডেমিক স্বপ্ন পূরণে
          সহায়তা করার জন্য তৈরি করা হয়েছে। এই ওয়েবসাইটে শিক্ষার্থীরা তাদের
          প্রয়োজন অনুযায়ী বিভিন্ন বিশ্ববিদ্যালয়ের স্কলারশিপ খুঁজে নিতে পারে এবং
          অনলাইনে আবেদন জমা দিতে পারে।
        </p>

        {/* Mission */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">আমাদের মিশন</h3>
          <p className="text-justify leading-relaxed">
            বাংলাদেশের ও আন্তর্জাতিক শিক্ষার্থীদের জন্য স্কলারশিপ খোঁজা একটি বড়
            চ্যালেঞ্জ। আমাদের মিশন হলো এই প্রক্রিয়াকে সহজ করা, যাতে প্রতিটি
            শিক্ষার্থী সঠিক সময়ে সঠিক তথ্য পায় এবং সুযোগ থেকে বঞ্চিত না হয়।
          </p>
        </div>

        {/* How it works */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">কীভাবে এই প্ল্যাটফর্ম কাজ করে</h3>
          <ul className="list-disc pl-6 space-y-2 text-justify">
            <li>শিক্ষার্থীরা সহজেই বিভিন্ন বিশ্ববিদ্যালয়ের স্কলারশিপ খুঁজে পায়।</li>
            <li>আবেদন ফর্ম পূরণ করে অনলাইনে সাবমিট করতে পারে।</li>
            <li>Moderator আবেদন যাচাই করে Feedback বা Review দিতে পারে।</li>
            <li>Admin স্কলারশিপ ম্যানেজ, ইউজার ম্যানেজ ও অ্যানালিটিক্স দেখতে পারে।</li>
            <li>Payment সিস্টেমের মাধ্যমে Application Fee বা Service Fee জমা দেয়া যায়।</li>
          </ul>
        </div>

        {/* Importance */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">কেন এটি গুরুত্বপূর্ণ?</h3>
          <p className="text-justify leading-relaxed">
            প্রতি বছর হাজার হাজার শিক্ষার্থী সঠিক তথ্যের অভাবে স্কলারশিপের সুযোগ
            হারায়। Scholarship Hub সেই সমস্যার সমাধান দেয়। এখানে তথ্য এক জায়গায়
            সাজানো থাকে, ফলে শিক্ষার্থীরা সময় বাঁচাতে পারে এবং দ্রুত আবেদন করতে
            পারে।
          </p>
        </div>

        {/* Closing */}
        <div className="text-center">
          <p className="text-lg font-medium">
            🎓 <span className="text-primary">Scholarship Hub</span> – 
            প্রতিটি শিক্ষার্থীর জন্য সঠিক সুযোগ পৌঁছে দেওয়ার প্রতিশ্রুতি।
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
