import React from 'react';
import "./Sayhi.css";
import ContactForm from './ContactForm';
function conversation() {
// in the component that renders the button
const handleScrollToContact = () => {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
{/* <button onClick={handleScrollToContact}>Start a Conversation</button> */}
// 
  return (
    
    <div className='conversation'>
      
        <h1>Get in touch with me</h1>
        <h1>say <span>Hi!</span> </h1>
        {/* <button className='msg'>START A CONVERSTAION</button> */}
        <button className='msg' onClick={handleScrollToContact}>Start a Conversation</button>


    </div>
  )
}

export default conversation