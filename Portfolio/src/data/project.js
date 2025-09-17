import images from "../Images";

// "All", "Full-stack projects", "Front-end projects"

const projectData = [
  //Full-Stack Projects
  {
    title: "HomeScape",
    category: "Full-stack projects",
    images: [
      images.homescape1,
      images.homescape2,
      images.homescape3,
      images.homescape4,
      images.homescape5,
    ],
    live: "https://your-homescape.onrender.com/listings",
    repo: "https://github.com/Anurag-Singh-0/your-homescape",
    video: "https://youtu.be/4NycctwY91w?si=eFhMr5jMyGe5DPCe",
    alt: "HomeScape",
    desc: `HomeScape is a responsive full-stack web application built with the MVC architecture. It allows users to browse, review, and manage property listings. It features secure user authentication, session management, and a dynamic UI that adapts to all screen sizes.

    Features ->

    User Authentication: Login & Register securely with Passport.js and bcrypt
    Listings Management: Users can create, view, edit, and delete listings (only when logged in)
    Location Display: Each listing shows the property location on the page
    Review System: Authenticated users can add multiple reviews for each listing

    Authorization Control -> 

    Only logged-in users can create, edit, or delete listings or reviews
    Unauthorized actions are blocked with error messages
       
    RESTful Routing and MVC project structure
    Built using Express.js, Node.js, MongoDB, and Mongoose
    Search Listings: Users can search for listings by their exact title name
    Modular routing for listings, reviews, and user routes
    MongoDB Atlas for remote database management
    Session Management with secure cookies and express-session
    Flash messaging with connect-flash
    MongoDB session store using connect-mongo
    Clean codebase with middlewares and utilities
    Server-side rendering with EJS and ejs-mate
    Fully responsive design (works on mobile, tablet, and desktop)
    After logging in, the user can view his profile

    Tech Stack -> 

    Frontend: HTML, CSS, Bootstrap, EJS, Responsive Design
    Backend: Node.js, Js, Express.js
    Database: MongoDB Atlas with Mongoose
    Authentication: Passport.js with Local Strategy
    Middlewares Used: express-session, connect-flash, connect-mongo, passport, passport-local, method-override, dotenv (for environment variable management), Custom error handling (ExpressError)`,
  },

  //Front-End Projects
  {
    title: "React Password Generator",
    category: "Front-end projects",
    images: [images.rpgLaptop, images.rpgMobile, images.rpgLaptop],
    live: "https://react-password-generator01.netlify.app/",
    repo: "https://github.com/Anurag-Singh-0/React-password-generator",
    video: "https://www.instagram.com/reel/DLxKEu5P-aw/?igsh=bG5nY2FkbXByOWpn",
    alt: "Password Generator",
    desc: `React Random Password Generator A powerful and minimal random password generator built with React. This project utilizes essential React hooks such as useState, useEffect useCallback, and useRef to provide a seamless password generation experience. 💡

      Features ->
      
      Auto-generates a secure 8-character password when the site loads
      Customize password length using a range slider
      Option to include numbers
      Option to include special characters
      One-click copy to clipboard
      Built entirely with React and modern hooks`,
  },

  {
    title: "QR Code Generator",
    category: "Front-end projects",
    images: [
      images.qrcodeLaptop,
      images.qrcodeLaptop,
      images.qrcodeMobile,
      images.qrcodeIPad,
    ],
    live: "https://qr-code-generator-anurag.vercel.app/",
    repo: "https://github.com/Anurag-Singh-0/QR-Code",
    video:
      "https://www.instagram.com/reel/DIbcG9ds94t/?igsh=MXZ2cHowaG8weGpybw==",
    alt: "QR Code",
    desc: `A simple and clean QR Code Generator built with HTML, CSS, and JavaScript. Enter any text or URL and instantly generate a QR code that you can also download to your device.

    Features ->

    Generate QR code for any text or URL
    QR image appears instantly with smooth transition
    Fully responsive for mobile and tablet devices
    Input validation with shake animation for empty input`,
  },

  {
    title: "Age Calculator",
    category: "Front-end projects",
    images: [
      images.agelaptop,
      images.agelaptop,
      images.agemobile,
      images.agemobile,
    ],
    live: "https://agecalculatorwebapp.vercel.app/",
    repo: "https://github.com/Anurag-Singh-0/Age-Calculator",
    video:
      "https://www.instagram.com/reel/DIJVP4uBybo/?igsh=MXc1bnB2ZnR5NXdhMg==",
    alt: "Age Calculator",
    desc: `This is a simple and responsive Age Calculator built using HTML, CSS, and JavaScript. It calculates the exact age in years, months, and days from the date of birth entered by the user.

    Features ->
    
    User-friendly date input
    Accurate calculation of age including years, months & days
    Instant output on button click
    Responsive design (when styled properly)
    Lightweight and beginner-friendly

    Tech Stack ->

    HTML – For the structure of the app
    CSS – For styling (you can customize it)
    JavaScript – For date calculations and interactivity`,
  },

  {
    title: "Old Portfolio",
    category: "Front-end projects",
    images: [
      images.oldportfolioLaptop,
      images.oldportfolioLaptop,
      images.oldportfolioipad,
      images.oldportfoliomobile,
    ],
    live: "https://anurag-portfolio-theta.vercel.app/",
    repo: "https://github.com/Anurag-Singh-0/Anurag-portfolio",
    video: "https://youtu.be/SbVmJ8quCWU?si=hEJULxVIlm6FTKSJ",
    alt: "Old Portfolio",
    desc: `It's my old portfolio, if you have time check this out,`,
  },
];

export default projectData;
